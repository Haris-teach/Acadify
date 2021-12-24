//================================ React Native Imported Files ======================================//

import React, {useEffect, useRef, useState} from 'react';
import {
    View,
    Text,
    StatusBar,
    TextInput,
    ScrollView,
    Platform,
    Keyboard,
    KeyboardAvoidingView,
    TouchableOpacity,
    FlatList,
} from 'react-native';
import {useSelector} from "react-redux";
import Toast from "react-native-simple-toast";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import DropDownPicker from 'react-native-dropdown-picker';
import {heightPercentageToDP as hp, widthPercentageToDP as wp} from 'react-native-responsive-screen';
import {Swipeable} from 'react-native-gesture-handler';
import {useIsFocused} from "@react-navigation/native";
import SliderText from '../../../../vendor/react-native-slider-text';
import moment, {now} from "moment";

//================================ Local Imported Files ======================================//

import styles from './style';
import colors from '../../../assets/colors/colors';
import ApiHelper from "../../../api/ApiHelper";
import images from "../../../assets/images/images";
import Button from '../../../components/Button/Button';
import AppLoading from "../../../components/AppLoading";
import DateImage from "../../../assets/images/date.svg";
import AddSign from "../../../assets/images/addIcon.svg";
import DeleteSign from "../../../assets/images/delete.svg";
import AppHeader from "../../../components/AppHeader";


const AddGoal = props => {

    const isFocused = useIsFocused();
    const swipeRef = useRef();
    const token = useSelector(state => state.ApiData.token);
    const [progress,setProgress]       = useState(0);
    const [title,setTitle]             = useState('');
    const [description,setDescription] = useState('');
    const [value, setValue]            = useState('Choose Category');
    const [date,setDate]               = useState('MM/DD/YYYY');
    const [isDisable,setIsDisable]     = useState(false);
    const [loading,setLoading]         = useState(false);
    const [dateModal,setDateModal]     = useState(false);
    const [open, setOpen]              = useState(false);
    const [checkList, setCheckList]    = useState([]);
    const [textInputs, setTextInputs]  = useState([]);
    const [items, setItems]            = useState([]);


    useEffect(() => {
        getCategories();
    },[isFocused])


    const getCategories = () => {
        setLoading(true);
        let tempArray = [];
        ApiHelper.getCategories(token,'ACCOUNTABILITY',(response) => {
            if(response.isSuccess){
                if(response.response.data.code === 200){
                    response.response.data.data.forEach((value) => {
                        tempArray.push({
                            id: value.id,
                            label: value.name,
                            value: value.name
                        })
                    })
                    setItems(tempArray);
                    setLoading(false);
                }
            }else {
                setLoading(false);
                setIsDisable(false);
                console.log('Response',response.response)
            }
        })
    }


    const onPressSave = () => {
        // let testAddress = /^[^-\s][a-zA-Z_\s-]+$/;
        let testAddress = /^[^-\s][a-zA-Z0-9_\s-]+$/;
        let checkValue = false;
        if(title === '' || title === ' '){
            setIsDisable(false);
            Toast.show('Please Enter Title',Toast.LONG)
        } else if (testAddress.test(title) !== true) {
            Toast.show('Please Enter Valid Title', Toast.LONG);
        } else if (description === '' || description === ' '){
            setIsDisable(false);
            Toast.show('Please Enter Description',Toast.LONG)
        } else if (testAddress.test(description) !== true) {
            Toast.show('Please Enter Valid Description', Toast.LONG);
        } else if(date === 'MM/DD/YYYY'){
            setIsDisable(false);
            Toast.show('Please Enter Target Date',Toast.LONG)
        } else if(value === 'Choose Category'){
            setIsDisable(false);
            Toast.show('Please Select Category',Toast.LONG)
        }
        // else if(progress === 0){
        //     setIsDisable(false);
        //     Toast.show('Please Select Progress',Toast.LONG)
        // }
        else {
            setIsDisable(true);
            if(checkList.length > 0){
                checkList.map((value) => {
                    if(value.name === '' || testAddress.test(value.name) !== true){
                       checkValue = true;
                    }
                })
                if(checkValue){
                    setIsDisable(false);
                    Toast.show('Please Enter Valid Checklist Title',Toast.LONG)
                }else{
                    for (let i = 0; i < items.length; i++) {
                        if (items[i].value === value) {
                            onSaveApi(items[i].id)
                        }
                    }
                }
            }else{
                for (let i = 0; i < items.length; i++) {
                    if (items[i].value === value) {
                        onSaveApi(items[i].id)
                    }
                }
            }
        }
    }


    const onSaveApi = (id) => {
        setLoading(true);
        ApiHelper.createGoal(token,title,description,id,progress,date,checkList,(response) => {
            if(response.isSuccess){
                // console.log('Data',response.response.data)
                if(response.response.data.code === 201){
                    setLoading(false);
                    Keyboard.dismiss();
                    setTitle('');
                    setDescription('');
                    setTimeout(() => {
                        Toast.show('Goal Successfully Created',Toast.LONG)
                    },200)
                    props.navigation.goBack();
                }
            }else {
                setLoading(false);
                setIsDisable(false);
                setTimeout(() => {
                    Toast.show(response.response.response.data.error,Toast.LONG)
                },200)
                console.log('Response',response.response.response.data.error)
            }
        })
    };


    const onDelete = (item,indexes) => {
        const filteredData = checkList.filter((value,index) => index !== indexes);
        const filtered = textInputs.filter((value,index) => index !== indexes);
        setCheckList(filteredData);
        setTextInputs(filtered);
    }


    const onAddNewList = () => {
        if(checkList.length < 1){
            let tempArray = [];
            tempArray.push({
                id:now(),
                name:'',
                status:false
            })
            setCheckList(tempArray)
        }else if(checkList.length > 0){
            let tempArray = [];
            tempArray.push({
                id:now(),
                name:'',
                status:false
            })
            checkList.map((value) => {
                tempArray.push(value)
            })
            setCheckList(tempArray)
        }
    }


    const leftAction = (item,index) => {
        return(
            <TouchableOpacity style={styles.leftActionView} activeOpacity={0.7} onPress={() => onDelete(item,index)}>
                <DeleteSign/>
            </TouchableOpacity>
        )
    }


    const updateState = (index,value) => {
        const textData = [...checkList];
        textData[index].name = value;
        setTextInputs(textData)
    }


    const renderItems = (item,index) => {
        return(
            <Swipeable
                ref={swipeRef}
                key={item.id}
                renderRightActions = {() => leftAction(item,index)}
                onSwipeableRightOpen = {() => console.log('Data')}
            >
            <View style={styles.listView}>
                <TextInput
                    style={styles.inputListView}
                    placeholder={'Enter title'}
                    placeholderTextColor={colors.inputColor}
                    onChangeText={(text) => updateState(index,text)}
                    value={checkList[index].name}
                />
            </View>
            </Swipeable>
        )
    }


    const onConfirmDate = (value) => {
        let finalDate = moment(value).format("MM/DD/YYYY");
        setDate(finalDate);
        setDateModal(false);
    };


    const onCancelDate = () => {
        setDateModal(false);
    };


    return (
        <KeyboardAvoidingView
            style={styles.mainContainer}
            behavior={Platform.OS === 'ios' ? 'padding' : null}>
                <StatusBar backgroundColor={colors.app_background} />
            {AppLoading.renderLoading(loading)}
            <ScrollView
                style={[styles.mainContainer,{paddingTop:0}]}
                showsVerticalScrollIndicator={false}>
                <View style={styles.headerView}>
                    <AppHeader
                        leftIconPath={images.back_icon}
                        onLeftIconPress={() => props.navigation.goBack()}
                    />
                </View>
                <View style={styles.headingView}>
                    <Text style={styles.headingText}>Create Your Goal</Text>
                </View>
                <View style={styles.inputView}>
                    <View style={styles.inputBox}>
                        <Text style={styles.titleText}>Title</Text>
                        <TextInput
                            placeholder={'Enter your title here'}
                            style={styles.inputStyle}
                            placeholderTextColor={colors.inputColor}
                            onChangeText={(text) => setTitle(text)}
                            value={title}
                        />
                    </View>
                    <View style={[styles.inputBox,{height:hp(20)}]}>
                        <Text style={styles.titleText}>Description</Text>
                        <TextInput
                            placeholder={'Enter your description here'}
                            style={[styles.inputStyle,{height:hp(15),paddingTop:wp(5),paddingBottom:wp(5)}]}
                            placeholderTextColor={colors.inputColor}
                            multiline={true}
                            textAlignVertical={'top'}
                            onChangeText={(text) => setDescription(text)}
                            value={description}
                        />
                    </View>
                    <View style={[styles.inputBox,{height:hp(12),marginTop:wp(2)}]} >
                        <Text style={styles.titleText}>Target Date</Text>
                        <TouchableOpacity style={styles.dateViewStyle} activeOpacity={0.7} onPress={() => setDateModal(!dateModal)}>
                            <Text style={date === 'MM/DD/YYYY' ? styles.placeHolderText : [styles.placeHolderText,{color:colors.white}]}>{date}</Text>
                            <TouchableOpacity style={styles.dateView} activeOpacity={0.7} onPress={() => setDateModal(!dateModal)}>
                                <DateImage/>
                            </TouchableOpacity>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.inputBox}>
                        <Text style={styles.titleText}>Category</Text>
                            <DropDownPicker
                                style={styles.dateViewStyle}
                                open={open}
                                items={items}
                                setOpen={setOpen}
                                placeholder={value}
                                value={value}
                                placeholderStyle={{color:colors.inputColor}}
                                showArrowIcon={true}
                                closeAfterSelecting={true}
                                showTickIcon={false}
                                zIndex={9999}
                                dropDownContainerStyle={{backgroundColor:colors.image_background,marginTop:hp(2),borderColor:'transparent',borderTopStartRadius:hp(1),borderTopEndRadius:hp(1),zIndex:0}}
                                arrowIconStyle={{tintColor:colors.white,height:25,width:25}}
                                listItemLabelStyle={{color:colors.white}}
                                containerStyle={styles.containerStyle}
                                textStyle={{color:colors.black}}
                                labelStyle={{color:colors.white}}
                                setValue={setValue}
                            />
                    </View>
                    <View style={[styles.inputBox,{height:hp(14),zIndex:-1}]}>
                        <Text style={styles.titleText}>Progress</Text>
                        <View style={styles.sliderView}>
                            <SliderText
                                maximumValue={100}
                                minimumTrackTintColor={colors.button_text}
                                maximumTrackTintColor={colors.inputColor}
                                stepValue={1}
                                thumbTintColor={colors.button_text}
                                customCountStyle={{color:colors.white,fontSize:10}}
                                customLabelStyle={{color:colors.white,fontSize:wp(4)}}
                                minimumValueLabel="0%"
                                maximumValueLabel="100%"
                                onValueChange={(id) => setProgress(id)}
                                sliderValue={progress} />
                        </View>

                        {/*<Slider*/}
                        {/*    style={styles.sliderView}*/}
                        {/*    minimumValue={0}*/}
                        {/*    maximumValue={100}*/}
                        {/*    step={1}*/}
                        {/*    minimumTrackTintColor={colors.button_text}*/}
                        {/*    maximumTrackTintColor={colors.image_background}*/}
                        {/*    thumbTintColor={colors.button_text}*/}
                        {/*    onValueChange={(value) => setProgress(value)}*/}
                        {/*/>*/}
                        {/*<View style={styles.progressView}>*/}
                        {/*    <Text style={[styles.placeHolderText,{color:colors.white}]}>{progress}%</Text>*/}
                        {/*    <Text style={[styles.placeHolderText,{color:colors.white}]}>100%</Text>*/}
                        {/*</View>*/}

                    </View>
                    <View style={[styles.inputBox,{height:hp(4),zIndex:-1}]}>
                        <View style={styles.checkListView}>
                            <Text style={styles.titleText}>Checklist</Text>
                            <TouchableOpacity activeOpacity={0.7} onPress={() => onAddNewList()}>
                                <AddSign height={25} width={25}/>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
                {checkList.length > 0 && <View style={styles.flatListView}>
                    <FlatList
                        data={checkList}
                        extraData={checkList}
                        showsVerticalScrollIndicator={false}
                        keyExtractor={(item, index) => index}
                        renderItem={({item,index}) => renderItems(item,index)}
                    />
                </View>}
                <View style={styles.buttonView}>
                    <View style={styles.btnView}>
                        <Button
                            width={wp(40)}
                            buttonText={'Cancel'}
                            onPress={() => props.navigation.goBack()}
                        />
                    </View>
                    <View style={styles.btnView}>
                        <Button
                            width={wp(40)}
                            buttonText={'Save'}
                            bgColor={colors.white}
                            borderColor={colors.white}
                            textColor={colors.black}
                            disabled={isDisable}
                            onPress={() => onPressSave()}
                        />
                    </View>
                </View>
                <DateTimePickerModal
                    isVisible={dateModal}
                    mode={"date"}
                    minimumDate={new Date()}
                    timePickerModeAndroid={"clock"}
                    onConfirm={(value) => onConfirmDate(value)}
                    onCancel={() => onCancelDate()}
                />
            </ScrollView>
        </KeyboardAvoidingView>
    );
};

export default AddGoal;
