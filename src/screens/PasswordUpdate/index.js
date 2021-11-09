//================================ React Native Imported Files ======================================//

import React, {useEffect, useState} from 'react';
import {
    View,
    ScrollView,
    KeyboardAvoidingView,
    Platform,
    StatusBar, Keyboard,
} from 'react-native';
import {TextInput} from 'react-native-paper';
import {useDispatch, useSelector} from 'react-redux';
import Toast from 'react-native-simple-toast';

//================================ Local Imported Files ======================================//

import Button from "../../components/Button/Button";
import AppHeader from '../../components/AppHeader';
import AppLoading from "../../components/AppLoading";
import styles from './style';
import colors from '../../assets/colors/colors';
import fonts from '../../assets/fonts/fonts';
import images from '../../assets/images/images';
import ApiHelper from "../../api/ApiHelper";


const PasswordUpdate = props => {

    const token = useSelector(state => state.ApiData.token);
    const dispatch = useDispatch();
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword]   = useState('');
    const [confirmPassword, setConfirmPassword]   = useState('');
    const [userResponse, setUserResponse]   = useState('');
    const [loading, setLoading] = useState(false);


    useEffect(() => {
       getUserProfile();
    }, []);


    const getUserProfile = () => {
        ApiHelper.getUserProfile(token,(response) => {
            if (response.isSuccess) {
                if (response.response.data.code === 200) {
                    setUserResponse(response.response.data)
                } else {
                    console.log('Error inner ==>', response.response);
                    Toast.show(response.response.data.error.email, Toast.LONG);
                }
            } else {
                console.log('Error ==>', response.response);
            }
        })
    }


    const onPressUpdate = () => {
        let password_Reg =
            /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[_#?!@$%^&*-]).{6,}$/;
        if (oldPassword === '' || oldPassword === ' ') {
            Toast.show('Please Enter Your Current Password', Toast.LONG);
        } else if(newPassword === '' || newPassword === ' '){
            Toast.show('Please Enter Your New Password', Toast.LONG);
        } else if (password_Reg.test(newPassword) !== true) {
            Toast.show(
                'Password must contain uppercase, lowercase letters, digits, special characters and 8 characters long',
                Toast.LONG,
            );
        } else if (newPassword.length < 8) {
            Toast.show('Password must have 8 characters long', Toast.LONG);
        } else if(confirmPassword === '' || confirmPassword === ' '){
            Toast.show('Please Confirm Your Password', Toast.LONG);
        } else if (password_Reg.test(confirmPassword) !== true) {
            Toast.show(
                'Password must contain uppercase, lowercase letters, digits, special characters and 8 characters long',
                Toast.LONG,
            );
        } else if (confirmPassword.length < 8) {
            Toast.show('Password must have 8 characters long', Toast.LONG);
        } else if(newPassword !== confirmPassword){
    Toast.show('Password Not Matched', Toast.LONG);
        }else{
            onUpdateApi()
        }
    }


    const onUpdateApi = () => {
        setLoading(true);
        let value = JSON.stringify({
            'newpass':newPassword,
            'prevpass': oldPassword
        });
       ApiHelper.updateProfile(token,value,(response) => {
            if(response.isSuccess){
                setLoading(false);
                if(response.response.data.code === 200){
                    console.log('Success Data ===>',response.response)
                    Keyboard.dismiss()
                    setTimeout(() => {
                        Toast.show('Password Updated Successfully',Toast.LONG)
                    },200)
                    props.navigation.goBack()
                }
            }else{
                setLoading(false);
                console.log('False Data ===>',response.response.response)
                setTimeout(() => {
                    Toast.show(response.response.response.data.message,Toast.LONG)
                },200)
            }
       })
    }


    return (
        <KeyboardAvoidingView
            style={styles.mainContainer}
            behavior={Platform.OS === 'ios' ? 'padding' : null}>
            <StatusBar backgroundColor={colors.app_background} />
            {AppLoading.renderLoading(loading)}
            <ScrollView
                style={styles.mainContainer}
                showsVerticalScrollIndicator={false}>
                <View style={styles.headerView}>
                    <AppHeader
                        title={'Update Password'}
                        leftIconPath={images.back_icon}
                        onLeftIconPress={() => props.navigation.goBack()}
                    />
                </View>
                <View style={styles.inputView}>
                    <View style={styles.inputSection}>
                        <TextInput
                            style={styles.inputText}
                            label="Current Password"
                            mode={'outlined'}
                            selectionColor={colors.white}
                            theme={{
                                roundness: 6,
                                colors: {
                                    primary: colors.inputFocus,
                                    placeholder: colors.white,
                                    text: colors.white,
                                },
                                fonts: {
                                    regular: {
                                        fontFamily: fonts.regular,
                                    },
                                },
                            }}
                            outlineColor={colors.app_border}
                            underlineColorAndroid="transparent"
                            secureTextEntry={true}
                            onChangeText={text => setOldPassword(text)}
                            value={oldPassword}
                        />
                    </View>


                    <View style={styles.inputSection}>
                        <TextInput
                            style={styles.inputText}
                            label="New Password"
                            mode={'outlined'}
                            selectionColor={colors.white}
                            theme={{
                                roundness: 6,
                                colors: {
                                    primary: colors.inputFocus,
                                    placeholder: colors.white,
                                    text: colors.white,
                                },
                                fonts: {
                                    regular: {
                                        fontFamily: fonts.regular,
                                    },
                                },
                            }}
                            outlineColor={colors.app_border}
                            secureTextEntry={true}
                            underlineColorAndroid="transparent"
                            onChangeText={text => setNewPassword(text)}
                            value={newPassword}
                        />
                    </View>
                    <View style={styles.inputSection}>
                        <TextInput
                            style={styles.inputText}
                            label="Confirm Password"
                            mode={'outlined'}
                            selectionColor={colors.white}
                            theme={{
                                roundness: 6,
                                colors: {
                                    primary: colors.inputFocus,
                                    placeholder: colors.white,
                                    text: colors.white,
                                },
                                fonts: {
                                    regular: {
                                        fontFamily: fonts.regular,
                                    },
                                },
                            }}
                            outlineColor={colors.app_border}
                            underlineColorAndroid="transparent"
                            secureTextEntry={true}
                            onChangeText={description => setConfirmPassword(description)}
                            value={confirmPassword}
                        />
                    </View>
                </View>
                <View style={styles.bottomView}>
                    <Button buttonText={'Update'} onPress={() => onPressUpdate()} />
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    );
};

export default PasswordUpdate;
