//================================ React Native Imported Files ======================================//

import React, {useState} from 'react';
import {
  View,
  Text,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  StatusBar,
} from 'react-native';
import {TextInput} from 'react-native-paper';
import Toast from 'react-native-simple-toast';
import {heightPercentageToDP as hp} from 'react-native-responsive-screen';

//================================ Local Imported Files ======================================//

import styles from './style';
import colors from '../../../assets/colors/colors';
import fonts from '../../../assets/fonts/fonts';
import images from '../../../assets/images/images';
import Button from '../../../components/Button/Button';
import ForgotLogo from '../../../assets/images/forgot.svg';
import AppHeader from '../../../components/AppHeader';
import AppLoading from "../../../components/AppLoading";
import ApiHelper from "../../../api/ApiHelper";


const ForgotPasswordScreen = props => {

  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const onEmailSent = () => {
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (email === "" || email === " ") {
      Toast.show("Please Enter Email", Toast.LONG);
    } else if (reg.test(email) !== true) {
      Toast.show("Please Enter Valid Email", Toast.LONG);
    } else {
      onSendEmail();
    }
  }


  const onSendEmail = () => {
    setLoading(true);
    ApiHelper.sendForgotEmail(email,response => {
      if (response.isSuccess) {
        if (response.response.data.code === 200) {
          setLoading(false)
          console.log('Response ===>', response.response.data);
          setTimeout(() => {
            Toast.show(response.response.data.message,Toast.LONG)
          },200)
          props.navigation.goBack();
        }
      } else {
        setLoading(false);
        setTimeout(() => {
          Toast.show(response.response.response.data.error,Toast.LONG)
        },200)
        console.log('Error ===>', response.response.response.data.error);
      }
    });
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
            leftIconPath={images.back_icon}
            onLeftIconPress={() => props.navigation.goBack()}
          />
        </View>
        <View style={styles.imageView}>
          <ForgotLogo height={hp(40)} />
        </View>
        <Text style={styles.welcomeText}>Forgot Password?</Text>
        <View style={styles.inputView}>
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
              underlineColorAndroid="transparent"
              autoCapitalize={"none"}
              onChangeText={text => setEmail(text)}
              value={email}
            />
          </View>
        </View>
        <View style={styles.bottomView}>
          <Button
            buttonText={'Send Email'}
            onPress={() => onEmailSent()}
          />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default ForgotPasswordScreen;
