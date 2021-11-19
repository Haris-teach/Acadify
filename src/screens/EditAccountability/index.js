//================================ React Native Imported Files ======================================//

import React, {useEffect, useState} from 'react';
import {
    View,
    Text,
    StatusBar,
    TextInput,
    Platform,
    Keyboard,
    ScrollView,
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
import SliderText from 'react-native-slider-text';
import moment from "moment";

//================================ Local Imported Files ======================================//

import styles from './style';
import colors from '../../assets/colors/colors';
import ApiHelper from "../../api/ApiHelper";
import Button from '../../components/Button/Button';
import AppLoading from "../../components/AppLoading";
import DateImage from "../../assets/images/date.svg";
import AddSign from "../../assets/images/addIcon.svg";
import DeleteSign from "../../assets/images/delete.svg";
import EditIcon from "../../assets/images/delete-Icon.svg";
import AppHeader from "../../components/AppHeader";
import images from "../../assets/images/images";


const EditAccountability = props => {

    let data = props.route.params.item;
    let propDate = moment(data.dateCompleted).format("MM/DD/YYYY");

    const isFocused = useIsFocused();
    const token = useSelector(state => state.ApiData.token);
    const [progress,setProgress]       = useState(data.progress);
    const [title,setTitle]             = useState(data.title);
    const [description,setDescription] = useState(data.description);
    const [value, setValue]            = useState(data.Category.name);
    const [date,setDate]               = useState(propDate);
    const [isDisable,setIsDisable]     = useState(false);
    const [loading,setLoading]         = useState(false);
    const [dateModal,setDateModal]     = useState(false);
    const [open, setOpen]              = useState(false);
    const [checkList, setCheckList]    = useState(data.ChecklistItems);
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
                    console.log(response.response.data.data)
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
        let checkValue = false;
        if(title === '' || title === ' '){
            setIsDisable(false);
            Toast.show('Please Enter Title',Toast.LONG)
        } else if (description === '' || description === ' '){
            setIsDisable(false);
            Toast.show('Please Enter Description',Toast.LONG)
        } else if(date === 'MM/DD/YYYY'){
            setIsDisable(false);
            Toast.show('Please Enter Target Date',Toast.LONG)
        } else if(value === 'Choose Category'){
            setIsDisable(false);
            Toast.show('Please Select Category',Toast.LONG)
        } else if(progress === 0){
            setIsDisable(false);
            Toast.show('Please Select Progress',Toast.LONG)
        } else {
            if(checkList.length > 0){
                checkList.map((value) => {
                    if(value.name === ''){
                        checkValue = true;
                    }
                })
                if(checkValue){
                    setIsDisable(false);
                    Toast.show('Please Enter Checklist Name',Toast.LONG)
                }else{
                    alert()
                }
            }else{
                alert()
            }
        }
    }


    const onSaveApi = () => {
        setLoading(true);
        ApiHelper.newJourney(token,title,description,(response) => {
            if(response.isSuccess){
                if(response.response.data.code === 200){
                    setLoading(false);
                    Keyboard.dismiss();
                    setTitle('');
                    setDescription('');
                    setTimeout(() => {
                        Toast.show('Journey Successfully Created',Toast.LONG)
                    },200)
                    props.navigation.goBack();
                }
            }else {
                setLoading(false);
                setIsDisable(false);
                console.log('Response',response.response)
            }
        })
    };


    const onDelete = (item,indexes) => {
        const filteredData = checkList.filter((value,index) => index !== indexes);
        const filtered = textInputs.filter((value,index) => index !== indexes);
        setCheckList(filteredData);
        setTextInputs(filtered)
    }


    const onAddNewList = () => {
        if(checkList.length < 1){
            let tempArray = [];
            tempArray.push({
                name:'',
                status:false
            })
            setCheckList(tempArray)
        }else if(checkList.length > 0){
            let tempArray = [];
            tempArray.push({
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
        const Textdata = [...checkList];
        Textdata[index].name = value;
        setTextInputs(Textdata)
    }


    const renderItems = (item,index) => {
        return(
            <Swipeable
                renderRightActions = {() => leftAction(item,index)}
                onSwipeableRightOpen = {() => console.log('Open')}
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
                    <Text style={styles.headingText}>Edit Your Goal</Text>
                    <TouchableOpacity activeOpacity={0.7} onPress={() => console.log('On Press Delete')}>
                        <EditIcon/>
                    </TouchableOpacity>
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
                            style={[styles.inputStyle,{height:hp(15),paddingTop:wp(5)}]}
                            placeholderTextColor={colors.inputColor}
                            multiline={true}
                            textAlignVertical={'top'}
                            onChangeText={(text) => setDescription(text)}
                            value={description}
                        />
                    </View>
                    <View style={[styles.inputBox,{height:hp(12),marginTop:wp(2)}]}>
                        <Text style={styles.titleText}>Target Date</Text>
                        <View style={styles.dateViewStyle}>
                            <Text style={date === 'MM/DD/YYYY' ? styles.placeHolderText : [styles.placeHolderText,{color:colors.white}]}>{date}</Text>
                            <TouchableOpacity style={styles.dateView} activeOpacity={0.7} onPress={() => setDateModal(true)}>
                                <DateImage/>
                            </TouchableOpacity>
                        </View>
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
                    <View style={[styles.inputBox,{height:hp(15),zIndex:-1}]}>
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
                                sliderValue={progress}
                                value={progress}
                            />
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
                    <View style={[styles.inputBox,{height:hp(5),zIndex:-1}]}>
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
                            buttonText={'Update'}
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
                    timePickerModeAndroid={"clock"}
                    onConfirm={(value) => onConfirmDate(value)}
                    onCancel={() => onCancelDate()}
                />
            </ScrollView>
        </KeyboardAvoidingView>
    );
};

export default EditAccountability;
