//================================ React Native Imported Files ======================================//

import React,{useState} from 'react';
import {
    View,
    Text,
    StatusBar,
    TextInput,
    Platform,
    ScrollView,
    KeyboardAvoidingView,
    Keyboard,
    TouchableOpacity,
    FlatList,
    LogBox
} from 'react-native';
import {useSelector} from "react-redux";
import Toast from "react-native-simple-toast";
import Slider from "@react-native-community/slider";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import DropDownPicker from 'react-native-dropdown-picker';
import {heightPercentageToDP as hp, widthPercentageToDP as wp} from 'react-native-responsive-screen';
import {Swipeable} from 'react-native-gesture-handler';
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

const AddGoal = props => {

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
    const [items, setItems]            = useState([
        {
            id:0,
            label: '5 Seconds',
            value: '5 Seconds'
        },
        {
            id:1,
            label: '10 Seconds',
            value: '10 Seconds'
        },
        {
            id:2,
            label: '20 Seconds',
            value: '20 Seconds'
        },
        {
            id:3,
            label: '30 Seconds',
            value: '30 Seconds'
        },
        {
            id:4,
            label: '1 Minute',
            value: '1 Minute'
        },
        {
            id:5,
            label: '10 Minutes',
            value: '10 Minutes'
        },
        {
            id:6,
            label: 'Add Custom',
            value: 'Add Custom'
        }
    ]);


    const onPressSave = () => {
        checkList.map((value) => {
            if(value.name === ''){
                alert(value)
            }
        })
        // if(title === '' || title === ' '){
        //     setIsDisable(false);
        //     Toast.show('Please Enter Title',Toast.LONG)
        // } else if (description === '' || description === ' '){
        //     setIsDisable(false);
        //     Toast.show('Please Enter Description',Toast.LONG)
        // } else {
        //     setIsDisable(true);
        //     onSaveApi()
        // }
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
                            style={[styles.inputStyle,{height:hp(15),paddingTop:wp(5)}]}
                            placeholderTextColor={colors.inputColor}
                            multiline={true}
                            textAlignVertical={'top'}
                            onChangeText={(text) => setDescription(text)}
                            value={description}
                        />
                    </View>
                    <View style={styles.inputBox}>
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
                    <View style={[styles.inputBox,{height:hp(12),zIndex:-1}]}>
                        <Text style={styles.titleText}>Progress</Text>
                        <Slider
                            style={styles.sliderView}
                            minimumValue={0}
                            maximumValue={100}
                            step={1}
                            minimumTrackTintColor={colors.button_text}
                            maximumTrackTintColor={colors.image_background}
                            thumbTintColor={colors.button_text}
                            onValueChange={(value) => setProgress(value)}
                        />
                        <View style={styles.progressView}>
                            <Text style={[styles.placeHolderText,{color:colors.white}]}>{progress}%</Text>
                            <Text style={[styles.placeHolderText,{color:colors.white}]}>100%</Text>
                        </View>
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
                    timePickerModeAndroid={"clock"}
                    onConfirm={(value) => onConfirmDate(value)}
                    onCancel={() => onCancelDate()}
                />
            </ScrollView>
        </KeyboardAvoidingView>
    );
};

export default AddGoal;
