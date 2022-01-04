//================================ React Native Imported Files ======================================//

import React, {useState} from 'react';
import {
    View,
    ScrollView,
    KeyboardAvoidingView,
    Platform,
    StatusBar,
    Image,
    TouchableOpacity,
    Keyboard,
} from 'react-native';
import {TextInput} from 'react-native-paper';
import {useDispatch, useSelector} from 'react-redux';
import {heightPercentageToDP as hp} from "react-native-responsive-screen";
import Toast from 'react-native-simple-toast';
import {launchImageLibrary} from "react-native-image-picker";

//================================ Local Imported Files ======================================//

import styles from './style';
import colors from '../../../assets/colors/colors';
import fonts from '../../../assets/fonts/fonts';
import images from '../../../assets/images/images';
import ApiHelper from "../../../api/ApiHelper";
import AppLoading from "../../../components/AppLoading";
import Camera from "../../../assets/images/camera.svg";
import Button from "../../../components/Button/Button";
import AppHeader from '../../../components/AppHeader';
import * as ApiDataActions from '../../../../redux/store/actions/ApiData';

const EditProfileScreen = props => {

    let user  = props.route.params;
    const dispatch = useDispatch();
    const token = useSelector(state => state.ApiData.token);
    const [firstName, setFirstName] = useState(user.userResponse.user.firstName);
    const [lastName, setLastName] = useState(user.userResponse.user.lastName);
    const [email, setEmail] = useState(user.userResponse.user.email);
    const [description, setDescription] = useState(user.userResponse.user.description);
    const [phoneNumber, setPhoneNumber] = useState(user.userResponse.user.phone);
    const [profileImage, setProfileImage] = useState(user.userResponse.user.profilePictureURL);
    const [loading, setLoading] = useState(false);

    const [image,setImage] = useState('');
    const [hasImage,setHasImage] = useState(false);


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
            createUrl();
        }else{
            let values = {
                firstName:firstName,
                lastName:lastName,
                phone:phoneNumber,
                description: description,
                email: email
            };
            onUpdateDetails(values);
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
                const image = {
                    uri: res.assets[0].uri,
                    type: res.assets[0].type,
                    name: res.assets[0].fileName,
                };
                console.log("ImagePicker",image);
                setImage(image)
                setHasImage(true);
            }
        });
    };


    const createUrl = () => {
        ApiHelper.createImageUrl(token,image.type,image.fileName,(response) => {
            if(response.isSuccess){
                setLoading(false);
                if(response.response.data.code === 200){
                    console.log('Success Data URL ===>',response.response.data.data.url)
                    let values = {
                        firstName:firstName,
                        lastName:lastName,
                        description: description,
                        email: email,
                        phone:phoneNumber,
                        profilePictureURL:response.response.data.data.url
                    };
                    onUpdateDetails(values);
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


    const onUpdateDetails = (userData) => {
        setLoading(true);
        let value;
        if(hasImage){
             value = JSON.stringify({
                'description':userData.description,
                'firstName': userData.firstName,
                'lastName': userData.lastName,
                'phone': userData.phone,
                'profilePictureURL': userData.profilePictureURL
            });
        }else {
            value = JSON.stringify({
                'description':userData.description,
                'firstName': userData.firstName,
                'lastName': userData.lastName,
                'phone': userData.phone,
            });
        }

        ApiHelper.updateProfile(token,value,(response) => {
            if(response.isSuccess){
                setLoading(false);
                if(response.response.data.code === 200){
                    console.log('Success Data ===>',response.response)
                    dispatch(ApiDataActions.SetUserToken(response.response.data.token));
                    Keyboard.dismiss()
                    setTimeout(() => {
                        Toast.show('Profile Updated Successfully',Toast.LONG)
                    },200)
                    props.navigation.goBack();
                }
            }else{
                setLoading(false);
                console.log('False Data ===>',response.response.response)
                setTimeout(() => {
                    Toast.show(response.response.response.data.message,Toast.LONG)
                },200)
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
                        <Image
                            source={hasImage ? {uri: image.uri} : images.placeHolder}
                            style={styles.imageStyle}
                        />
                        {/*<Image source={hasImage ? {uri: image.uri} : (profileImage !== 'null' ? {uri:profileImage} : images.placeHolder)} style={styles.imageStyle} />*/}
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
                            maxLength={15}
                            outlineColor={colors.app_border}
                            keyboardType={'phone-pad'}
                            underlineColorAndroid="transparent"
                            onChangeText={text => setPhoneNumber(text)}
                            value={phoneNumber}
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
                    <Button buttonText={'Save'} onPress={() => onPressSignUp()} />
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    );
};

export default EditProfileScreen;
