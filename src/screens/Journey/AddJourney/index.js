//================================ React Native Imported Files ======================================//

import React,{useState} from 'react';
import {View, Text, StatusBar, TextInput, Platform, ScrollView, KeyboardAvoidingView, Keyboard} from 'react-native';
import {heightPercentageToDP as hp, widthPercentageToDP as wp} from 'react-native-responsive-screen';
import {useSelector} from "react-redux";
import Toast from "react-native-simple-toast";

//================================ Local Imported Files ======================================//

import styles from './style';
import colors from '../../../assets/colors/colors';
import Button from '../../../components/Button/Button';
import AppLoading from "../../../components/AppLoading";
import ApiHelper from "../../../api/ApiHelper";
import AppHeader from "../../../components/AppHeader";
import images from "../../../assets/images/images";

const AddJourney = props => {

    const token = useSelector(state => state.ApiData.token);
    const [title,setTitle]             = useState('');
    const [description,setDescription] = useState('');
    const [isDisable,setIsDisable] = useState(false);
    const [loading,setLoading] = useState(false);


    const onPressSave = () => {
        let testAddress = /^[^-\s][a-zA-Z_\s-]+$/;
        if(title === '' || title === ' '){
            setIsDisable(false);
            Toast.show('Please Enter Title',Toast.LONG)
        } else if (testAddress.test(title) !== true) {
            Toast.show('Please Enter Valid Title', Toast.LONG);
        } else if (description === '' || description === ' '){
            setIsDisable(false);
            Toast.show('Please Enter Description',Toast.LONG)
        }else if (testAddress.test(description) !== true) {
            Toast.show('Please Enter Valid Description',Toast.LONG)
        } else {
            setIsDisable(true);
            onSaveApi()
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
                <Text style={styles.headingText}>Create Activity</Text>
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
            </View>
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
            </ScrollView>
        </KeyboardAvoidingView>
    );
};

export default AddJourney;
