//================================ React Native Imported Files ======================================//

import React, {useState} from 'react';
import {
    View,
    Text,
    StatusBar,
    TextInput,
    ScrollView,
    KeyboardAvoidingView,
    TouchableOpacity,
    Platform,
    Keyboard,
} from 'react-native';
import {useSelector} from "react-redux";
import Toast from "react-native-simple-toast";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import DropDownPicker from 'react-native-dropdown-picker';
import {heightPercentageToDP as hp, widthPercentageToDP as wp} from 'react-native-responsive-screen';
import moment from "moment";

//================================ Local Imported Files ======================================//

import styles from './style';
import colors from '../../../../assets/colors/colors';
import ApiHelper from "../../../../api/ApiHelper";
import images from "../../../../assets/images/images";
import Button from '../../../../components/Button/Button';
import AppLoading from "../../../../components/AppLoading";
import DateImage from "../../../../assets/images/date.svg";
import AppHeader from "../../../../components/AppHeader";
import EditIcon from "../../../../assets/images/delete-Icon.svg";

const EditTask = props => {

    let Data = props.route.params.item;
    const token = useSelector(state => state.ApiData.token);
    const [title,setTitle]               = useState(Data.title);
    const [description,setDescription]   = useState(Data.description);
    const [status, setStatus]            = useState(Data.status);
    const [priority, setPriority]        = useState(Data.priority);
    const [date,setDate]                 = useState(moment(Data.startDate).format('MM/DD/YYYY'));
    const [endDate,setEndDate]           = useState(moment(Data.dueDate).format('MM/DD/YYYY'));
    const [isDisable,setIsDisable]       = useState(false);
    const [loading,setLoading]           = useState(false);
    const [dateModal,setDateModal]       = useState(false);
    const [endDateModal,setEndDateModal] = useState(false);
    const [open, setOpen]                = useState(false);
    const [openPriority, setOpenPriority]= useState(false);
    const items = [
        {
            id: 0,
            label: 'High',
            value: 'High'
        },
        {
            id: 1,
            label: 'Medium',
            value: 'Medium'
        },
        {
            id: 2,
            label: 'Low',
            value: 'Low'
        }
    ];
    const priorityItems = [
        {
            id: 0,
            label: 'Active',
            value: 'Active'
        },
        {
            id: 1,
            label: 'Completed',
            value: 'Completed'
        },
        {
            id: 2,
            label: 'Inactive',
            value: 'Inactive'
        },
        {
            id: 3,
            label: 'Pending',
            value: 'Pending'
        }
    ];


    const onPressSave = () => {
        let testAddress = /^[^-\s][a-zA-Z_\s-]+$/;
        if(title === '' || title === ' '){
            setIsDisable(false);
            Toast.show('Please Enter Task Name',Toast.LONG)
        } else if (testAddress.test(title) !== true) {
            Toast.show('Please Enter Valid Task Name', Toast.LONG);
        } else if(status === 'Select status'){
            setIsDisable(false);
            Toast.show('Please Select Status',Toast.LONG)
        } else if(priority === 'Select priority'){
            setIsDisable(false);
            Toast.show('Please Select Priority',Toast.LONG)
        } else if (description === '' || description === ' '){
            setIsDisable(false);
            Toast.show('Please Enter Description',Toast.LONG)
        } else if (testAddress.test(description) !== true) {
            Toast.show('Please Enter Valid Description', Toast.LONG);
        } else if(date === 'MM/DD/YYYY'){
            setIsDisable(false);
            Toast.show('Please Select Start Date',Toast.LONG)
        } else if(endDate === 'MM/DD/YYYY'){
            setIsDisable(false);
            Toast.show('Please Select Due Date',Toast.LONG)
        }  else {
            onSaveApi();
        }
    }


    const onSaveApi = () => {
        setLoading(true);
        ApiHelper.createGoal(token,title,status,priority,description,date,endDate,(response) => {
            if(response.isSuccess){
                // console.log('Data',response.response.data)
                if(response.response.data.code === 201){
                    setLoading(false);
                    Keyboard.dismiss();
                    setTitle('');
                    setDescription('');
                    setTimeout(() => {
                        Toast.show('Task Successfully Created',Toast.LONG)
                    },200)
                    props.navigation.goBack();
                }
            }else {
                setLoading(false);
                setIsDisable(false);
                console.log('Response',response.response.response.data.error)
            }
        })
    };


    const onConfirmDate = (value) => {
        let finalDate = moment(value).format("MM/DD/YYYY");
        setDate(finalDate);
        setDateModal(false);
    };


    const onCancelDate = () => {
        setDateModal(false);
    };


    const onConfirmEndDate = (value) => {
        let finalDate = moment(value).format("MM/DD/YYYY");
        setEndDate(finalDate);
        setEndDateModal(false);
    };


    const onCancelEndDate = () => {
        setEndDateModal(false);
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
                    <Text style={styles.headingText}>View Task</Text>
                    <TouchableOpacity
                        activeOpacity={0.7}
                        onPress={() => console.log('Delete')}
                    >
                        <EditIcon/>
                    </TouchableOpacity>
                </View>
                <View style={styles.inputView}>
                    <View style={styles.inputBox}>
                        <Text style={styles.titleText}>Task name</Text>
                        <TextInput
                            placeholder={'Enter Task name'}
                            style={styles.inputStyle}
                            placeholderTextColor={colors.inputColor}
                            onChangeText={(text) => setTitle(text)}
                            value={title}
                        />
                    </View>
                    <View style={styles.inputBox}>
                        <Text style={styles.titleText}>Task status</Text>
                        <DropDownPicker
                            style={styles.dateViewStyle}
                            open={open}
                            items={items}
                            setOpen={setOpen}
                            placeholder={status}
                            value={status}
                            placeholderStyle={{color:colors.inputColor}}
                            showArrowIcon={true}
                            closeAfterSelecting={true}
                            showTickIcon={false}
                            zIndex={9999}
                            dropDownContainerStyle={{backgroundColor:colors.image_background,marginTop:hp(2),borderColor:'transparent',borderTopStartRadius:hp(1),borderTopEndRadius:hp(1),zIndex:1}}
                            arrowIconStyle={{tintColor:colors.white,height:25,width:25}}
                            listItemLabelStyle={{color:colors.white}}
                            containerStyle={styles.containerStyle}
                            textStyle={{color:colors.black}}
                            labelStyle={{color:colors.white}}
                            setValue={setStatus}
                        />
                    </View>
                    <View style={styles.inputBox}>
                        <Text style={styles.titleText}>Priority</Text>
                        <DropDownPicker
                            style={styles.dateViewStyle}
                            open={openPriority}
                            items={priorityItems}
                            setOpen={setOpenPriority}
                            placeholder={priority}
                            value={priority}
                            placeholderStyle={{color:colors.inputColor}}
                            showArrowIcon={true}
                            closeAfterSelecting={true}
                            showTickIcon={false}
                            zIndex={888}
                            dropDownContainerStyle={{backgroundColor:colors.image_background,marginTop:hp(2),borderColor:'transparent',borderTopStartRadius:hp(1),borderTopEndRadius:hp(1),zIndex:0}}
                            arrowIconStyle={{tintColor:colors.white,height:25,width:25}}
                            listItemLabelStyle={{color:colors.white}}
                            containerStyle={styles.containerStyle}
                            textStyle={{color:colors.black}}
                            labelStyle={{color:colors.white}}
                            setValue={setPriority}
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
                    <View style={[styles.inputBox,{height:hp(12),marginTop:wp(2)}]} >
                        <Text style={styles.titleText}>Start Date</Text>
                        <TouchableOpacity style={styles.dateViewStyle} activeOpacity={0.7} onPress={() => setDateModal(!dateModal)}>
                            <Text style={date === 'MM/DD/YYYY' ? styles.placeHolderText : [styles.placeHolderText,{color:colors.white}]}>{date}</Text>
                            <TouchableOpacity style={styles.dateView} activeOpacity={0.7} onPress={() => setDateModal(!dateModal)}>
                                <DateImage/>
                            </TouchableOpacity>
                        </TouchableOpacity>
                    </View>
                    <View style={[styles.inputBox,{height:hp(12),marginTop:wp(2)}]} >
                        <Text style={styles.titleText}>Due Date</Text>
                        <TouchableOpacity style={styles.dateViewStyle} activeOpacity={0.7} onPress={() => setEndDateModal(!endDateModal)}>
                            <Text style={endDate === 'MM/DD/YYYY' ? styles.placeHolderText : [styles.placeHolderText,{color:colors.white}]}>{endDate}</Text>
                            <TouchableOpacity style={styles.dateView} activeOpacity={0.7} onPress={() => setEndDateModal(!endDateModal)}>
                                <DateImage/>
                            </TouchableOpacity>
                        </TouchableOpacity>
                    </View>


                    <View style={styles.buttonView}>
                        <View style={styles.btnView}>
                            <Button
                                width={wp(40)}
                                buttonText={Data.status === 'COMPLETED' ? 'Cancel' : 'Complete' }
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
                        minimumDate={new Date()}
                        onConfirm={(value) => onConfirmDate(value)}
                        onCancel={() => onCancelDate()}
                    />
                    <DateTimePickerModal
                        isVisible={endDateModal}
                        mode={"date"}
                        minimumDate={new Date()}
                        timePickerModeAndroid={"clock"}
                        onConfirm={(value) => onConfirmEndDate(value)}
                        onCancel={() => onCancelEndDate()}
                    />
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    );
};

export default EditTask;
