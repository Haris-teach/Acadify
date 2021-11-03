//================================ React Native Imported Files ======================================//

import React, {useEffect, useState} from 'react';
import {
    View,
    ImageBackground,
    ScrollView,
    KeyboardAvoidingView,
    Platform,
    StatusBar, Image,
} from 'react-native';
import {TextInput} from 'react-native-paper';
import {useDispatch, useSelector} from 'react-redux';
import {heightPercentageToDP as hp} from "react-native-responsive-screen";
import Toast from 'react-native-simple-toast';

//================================ Local Imported Files ======================================//

import Button from "../../components/Button/Button";
import styles from './style';
import colors from '../../assets/colors/colors';
import fonts from '../../assets/fonts/fonts';
import AppHeader from '../../components/AppHeader';
import images from '../../assets/images/images';
import {EDIT_PROFILE_SCREEN} from '../../constants/navigators';
import ApiHelper from "../../api/ApiHelper";
import AppLoading from "../../components/AppLoading";
import {useIsFocused} from "@react-navigation/native";

const ProfileScreen = props => {

    const isFocused = useIsFocused();
    const token = useSelector(state => state.ApiData.token);
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [description, setDescription] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [profileImage, setProfileImage] = useState('');
    const [loading, setLoading] = useState(false);
    const [userResponse, setUserResponse] = useState('');


    useEffect(() => {
        getUserProfile()
    },[isFocused])


    const getUserProfile = () => {
        setLoading(true);
        ApiHelper.getUserProfile(token,(response) => {
            if (response.isSuccess) {
                setLoading(false);
                if (response.response.data.code === 200) {
                    console.log('Success of user profile ===>', response.response.data);
                    setFirstName(response.response.data.user.firstName)
                    setLastName(response.response.data.user.lastName)
                    setEmail(response.response.data.user.email)
                    setPhoneNumber(response.response.data.user.phone)
                    setProfileImage(response.response.data.user.profilePictureURL)
                    setUserResponse(response.response.data)
                } else {
                    console.log('Error inner ==>', response.response);
                    Toast.show(response.response.data.error.email, Toast.LONG);
                }
            } else {
                setLoading(false);
                console.log('Error ==>', response.response);
            }
        })
    }


    const onPressEdit = () => {
        props.navigation.navigate(EDIT_PROFILE_SCREEN,{
            userResponse
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
                      title={'Profile'}
                      leftIconPath={images.back_icon}
                      onLeftIconPress={() => props.navigation.goBack()}
                  />
                </View>
                <View style={styles.imageBackground}>
                    <View style={styles.imageStyle}>
                        <Image source={profileImage !== '/' ? {uri:profileImage} : images.placeHolder} style={styles.imageStyle} />
                        {/*<View style={styles.editView}>*/}
                        {/*    <Camera height={22} width={22}/>*/}
                        {/*</View>*/}
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
                            editable={false}
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
                            editable={false}
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
                            editable={false}
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
                            editable={false}
                            onChangeText={description => setDescription(description)}
                            value={description}
                        />
                    </View>
                </View>
                <View style={styles.bottomView}>
                    <Button buttonText={'Edit'} onPress={() => onPressEdit()} />
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    );
};

export default ProfileScreen;
