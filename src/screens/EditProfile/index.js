//================================ React Native Imported Files ======================================//

import React, {useState} from 'react';
import {
    View,
    ScrollView,
    KeyboardAvoidingView,
    Platform,
    StatusBar, Image, TouchableOpacity,
} from 'react-native';
import {TextInput} from 'react-native-paper';
import {useDispatch} from 'react-redux';
import {heightPercentageToDP as hp} from "react-native-responsive-screen";
import Toast from 'react-native-simple-toast';
import {launchImageLibrary} from "react-native-image-picker";
import {CommonActions} from "@react-navigation/native";

//================================ Local Imported Files ======================================//

import styles from './style';
import colors from '../../assets/colors/colors';
import fonts from '../../assets/fonts/fonts';
import images from '../../assets/images/images';
import {MY_TABS} from '../../constants/navigators';
import ApiHelper from "../../api/ApiHelper";
import AppLoading from "../../components/AppLoading";
import Camera from "../../assets/images/camera.svg";
import Button from "../../components/Button/Button";
import AppHeader from '../../components/AppHeader';
import * as ApiDataActions from '../../../redux/store/actions/ApiData';


const EditProfileScreen = props => {

    let user  = props.route.params;
    const dispatch = useDispatch();
    const [firstName, setFirstName] = useState(user.userResponse.user.firstName);
    const [lastName, setLastName] = useState(user.userResponse.user.lastName);
    const [email, setEmail] = useState(user.userResponse.user.email);
    const [description, setDescription] = useState(user.userResponse.user.description);
    const [phoneNumber, setPhoneNumber] = useState(user.userResponse.user.phone);
    const [profileImage, setProfileImage] = useState(user.userResponse.user.profilePictureURL);
    const [loading, setLoading] = useState(false);

    const [image,setImage] = useState('');
    const [hasImage,setHasImage] = useState(false);

    const [oldPassword,setOldPassword] = useState('');
    const [newPassword,setNewPassword] = useState('');
    const [confirmPassword,setConfirmPassword] = useState('');


    const onPressSignUp = () => {
        let testAddress = /^[^-\s][a-zA-Z_\s-]+$/;
        if (firstName === '' || firstName === ' ') {
            Toast.show('Please Enter First Name', Toast.LONG);
        } else if (testAddress.test(firstName) !== true) {
            Toast.show('Please Enter Valid First Name', Toast.LONG);
        } else if (lastName === '' || lastName === ' ') {
            Toast.show('Please Enter Last Name', Toast.LONG);
        } else if (testAddress.test(lastName) !== true) {
            Toast.show('Please Enter Valid Last Name', Toast.LONG);
        } else if (phoneNumber === '' || phoneNumber === ' ') {
            Toast.show('Please Enter Phone Number', Toast.LONG);
        } else if (phoneNumber.length < 11) {
            Toast.show('PhoneNumber must have 11 digits long', Toast.LONG);
        } else if(hasImage){
            if((oldPassword !== ' ') || (newPassword !== '') || (confirmPassword !== '')){

            }else {
                let image = {
                    uri: image.uri,
                    type: image.type,
                    name: image.fileName
                };
                let values = {
                    firstName:firstName,
                    lastName:lastName,
                    description: description,
                    email: email,
                    profilePictureURL:image
                };
                onUpdateDetails(values);
            }
        }else{
            if((oldPassword !== ' ') || (newPassword !== '') || (confirmPassword !== '')){

            }else {
                let values = {
                    firstName:firstName,
                    lastName:lastName,
                    description: description,
                    email: email
                };
                onUpdateDetails(values);
            }
        }
    };


    const ImagePickerFromGallery = () => {
        let options = {
            mediaType: "photo",
            selectionLimit: 1,
        };
        launchImageLibrary(options, (res) => {
            if (res.didCancel) {
                console.log("User cancelled image picker");
            } else if (res.errorMessage) {
                console.log("ImagePicker Error: ", res.errorMessage);
            } else {
                setImage(res.assets[0])
                setHasImage(true)
            }
        });
    };


    const onUpdateDetails = () => {
        setLoading(true);
        ApiHelper.onLoginApi(email, password, response => {
            if (response.isSuccess) {
                dispatch(ApiDataActions.SetLoginData(response.response.data.data));
                setLoading(false);
                console.log('DATA', response);
                if (response.response.data.status === 200) {
                    console.log('Success ===>', response.response.data.data);
                    dispatch(ApiDataActions.SetLoginData(response.response.data.data));
                    dispatch(ApiDataActions.SetUserToken(response.response.data.data.token));
                    props.navigation.dispatch(
                        CommonActions.reset({
                            index: 0,
                            routes: [{name: MY_TABS}],
                        }),
                    );
                    setPassword('');
                    setEmail('');
                } else {
                    setTimeout(() => {
                        Toast.show(response.response.data.message, Toast.LONG);
                    }, 200);
                }
            } else {
                setLoading(false);
                console.log('Error ==>', response.response);
            }
        });
    };


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
                        title={'Edit Profile'}
                        leftIconPath={images.back_icon}
                        onLeftIconPress={() => props.navigation.goBack()}
                    />
                </View>
                <View style={styles.imageBackground}>
                    <View style={styles.imageStyle}>
                        <Image source={hasImage ? {uri: image.uri} : (profileImage !== '/' ? {uri:profileImage} : images.placeHolder)} style={styles.imageStyle} />
                        <TouchableOpacity activeOpacity={0.7} style={styles.editView} onPress={() => ImagePickerFromGallery()}>
                            <Camera height={22} width={22}/>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={styles.inputView}>
                    <View style={styles.inputSection}>
                        <TextInput
                            style={styles.inputText}
                            label="First Name"
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
                            onChangeText={text => setFirstName(text)}
                            value={firstName}
                        />
                    </View>
                    <View style={styles.inputSection}>
                        <TextInput
                            style={styles.inputText}
                            label="Last Name"
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
                            onChangeText={text => setLastName(text)}
                            value={lastName}
                        />
                    </View>
                    <View style={styles.inputSection}>
                        <TextInput
                            style={styles.inputText}
                            label="Email"
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
                            keyboardType={'email-address'}
                            autoCapitalize={'none'}
                            editable={false}
                            underlineColorAndroid="transparent"
                            onChangeText={text => setEmail(text)}
                            value={email}
                        />
                    </View>

                    <View style={styles.inputSection}>
                        <TextInput
                            style={styles.inputText}
                            label="Phone Number"
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
                            maxLength={11}
                            outlineColor={colors.app_border}
                            keyboardType={'phone-pad'}
                            underlineColorAndroid="transparent"
                            onChangeText={text => setPhoneNumber(text)}
                            value={phoneNumber}
                        />
                    </View>
                    <View style={styles.inputSection}>
                        <TextInput
                            style={styles.inputText}
                            label="Old Password"
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
                            autoCapitalize={'none'}
                            underlineColorAndroid="transparent"
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
                            autoCapitalize={'none'}
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
                            autoCapitalize={'none'}
                            underlineColorAndroid="transparent"
                            onChangeText={text => setConfirmPassword(text)}
                            value={confirmPassword}
                        />
                    </View>
                    <View style={[styles.inputSection,{height:hp(17)}]}>
                        <TextInput
                            style={[styles.inputText,{height:hp(15)}]}
                            label="Description"
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
                            multiline={true}
                            textAlignVertical={'top'}
                            outlineColor={colors.app_border}
                            underlineColorAndroid="transparent"
                            onChangeText={description => setDescription(description)}
                            value={description}
                        />
                    </View>
                </View>
                <View style={styles.bottomView}>
                    <Button buttonText={'Edit'} onPress={() => onPressSignUp()} />
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    );
};

export default EditProfileScreen;
