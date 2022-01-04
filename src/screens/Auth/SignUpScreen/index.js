//================================ React Native Imported Files ======================================//

import React, {useEffect, useRef, useState} from 'react';
import {
  View,
  Text,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  StatusBar,
} from 'react-native';
import {TextInput} from 'react-native-paper';
import {useDispatch} from 'react-redux';
import {widthPercentageToDP as wp} from "react-native-responsive-screen";
import PhoneInput from "react-native-phone-number-input";

//================================ Local Imported Files ======================================//

import Button from '../../../components/Button/Button';
import SignUpLogo from '../../../assets/images/Signup.svg';
import colors from '../../../assets/colors/colors';
import fonts from '../../../assets/fonts/fonts';
import Toast from 'react-native-simple-toast';
import styles from './style';
import AppHeader from '../../../components/AppHeader';
import {LOGIN_SCREEN, PLAN_SCREEN} from '../../../constants/navigators';
import * as ApiDataActions from '../../../../redux/store/actions/ApiData';

const SignUpScreen = props => {

  const dispatch = useDispatch();
  const phoneInput = useRef();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName]   = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [formattedValue, setFormattedValue] = useState('');
  const [valid, setValid] = useState(false);
  const [showMessage, setShowMessage] = useState(false);


  const onPressSignUp = () => {
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    let testAddress = /^[^-\s][a-zA-Z_\s-]+$/;
    let password_Reg =
      /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[_#?!@$%^&*-]).{6,}$/;
    const checkValid = phoneInput.current?.isValidNumber(phoneNumber);
    setShowMessage(true);
    setValid(checkValid ? checkValid : false)

    if (firstName === '' || firstName === ' ') {
      Toast.show('Please Enter First Name', Toast.LONG);
    } else if (testAddress.test(firstName) !== true) {
      Toast.show('Please Enter Valid First Name', Toast.LONG);
    } else if (lastName === '' || lastName === ' ') {
      Toast.show('Please Enter Last Name', Toast.LONG);
    } else if (testAddress.test(lastName) !== true) {
      Toast.show('Please Enter Valid Last Name', Toast.LONG);
    } else if (email === '' || email === ' ') {
      Toast.show('Please Enter Email', Toast.LONG);
    } else if (reg.test(email) !== true) {
      Toast.show('Please Enter Valid Email', Toast.LONG);
    } else if (password === '' || password === ' ') {
      Toast.show('Please Enter Password', Toast.LONG);
    } else if (password_Reg.test(password) !== true) {
      Toast.show(
        'Password must contain uppercase, lowercase letters, digits, special characters and 8 characters long',
        Toast.LONG,
      );
    } else if (password.length < 8) {
      Toast.show('Password must have 8 characters long', Toast.LONG);
    } else if (phoneNumber === '' || phoneNumber === ' ') {
      Toast.show('Please Enter Phone Number', Toast.LONG);
    } else if(phoneNumber.length < 11){
      Toast.show('Please Enter Valid Phone Number', Toast.LONG);
    }
    // else if (valid === false) {
    //   Toast.show('Please Enter Valid Phone Number', Toast.LONG);
    // }
    else {
      let data = {
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: password,
        userName: `${firstName} ${lastName}`,
        phoneNumber: phoneNumber,
      };
      dispatch(ApiDataActions.SetSignUpData(data));
      props.navigation.navigate(PLAN_SCREEN,{fromChange:false});
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.mainContainer}
      behavior={Platform.OS === 'ios' ? 'padding' : null}>
      <StatusBar backgroundColor={colors.app_background} />
      <ScrollView
        style={[styles.mainContainer,{paddingTop:0}]}
        showsVerticalScrollIndicator={false}>
        {/*<View style={styles.headerView}>*/}
        {/*  <AppHeader*/}
        {/*    leftIconPath={images.back_icon}*/}
        {/*    onLeftIconPress={() => props.navigation.goBack()}*/}
        {/*  />*/}
        {/*</View>*/}
        <View style={styles.imageView}>
          <SignUpLogo />
        </View>
        <Text style={styles.welcomeText}>Create Account</Text>
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
              underlineColorAndroid="transparent"
              onChangeText={text => setEmail(text)}
              value={email}
            />
          </View>
          <View style={styles.inputSection}>
            <TextInput
              style={styles.inputText}
              label="Password"
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
              onChangeText={text => setPassword(text)}
              value={password}
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
                outlineColor={colors.app_border}
                maxLength={15}
                keyboardType={'phone-pad'}
                underlineColorAndroid="transparent"
                onChangeText={text => setPhoneNumber(text)}
                value={phoneNumber}
            />
            {/*<PhoneInput*/}
            {/*    ref={phoneInput}*/}
            {/*    defaultValue={phoneNumber}*/}
            {/*    defaultCode="US"*/}
            {/*    layout="first"*/}
            {/*    onChangeText={(text) => {*/}
            {/*      setPhoneNumber(text);*/}
            {/*    }}*/}
            {/*    onChangeFormattedText={(text) => {*/}
            {/*      setFormattedValue(text);*/}
            {/*    }}*/}
            {/*    disableArrowIcon={true}*/}
            {/*    textContainerStyle={{backgroundColor:colors.app_background,borderRadius:wp(2)}}*/}
            {/*    codeTextStyle={{color:colors.white}}*/}
            {/*    textInputProps={{color:colors.white,placeholderTextColor:colors.white,maxLength:11}}*/}
            {/*    containerStyle={styles.numberView}*/}
            {/*/>*/}
          </View>
        </View>
        <View style={styles.bottomView}>
          <Button buttonText={'Sign Up'} onPress={() => onPressSignUp()}/>
          <View style={styles.noAccountView}>
            <Text style={styles.noAccountText}>Already have an Account? </Text>
            <Text
              style={styles.signUpText}
              onPress={() => props.navigation.navigate(LOGIN_SCREEN)}>
              Sign In
            </Text>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default SignUpScreen;
