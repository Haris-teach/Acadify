//================================ React Native Imported Files ======================================//

import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  StatusBar,
} from 'react-native';
import {TextInput} from 'react-native-paper';
import {heightPercentageToDP} from 'react-native-responsive-screen';
import Toast from 'react-native-simple-toast';

//================================ Local Imported Files ======================================//

import styles from './style';
import colors from '../../../assets/colors/colors';
import fonts from '../../../assets/fonts/fonts';
import Button from '../../../components/Button/Button';
import ForgotLogo from '../../../assets/images/forgot.svg';
import AppHeader from '../../../components/AppHeader';
import images from '../../../assets/images/images';

const ForgotPasswordScreen = props => {
  const [email, setEmail] = useState('');

  return (
    <KeyboardAvoidingView
      style={styles.mainContainer}
      behavior={Platform.OS === 'ios' ? 'padding' : null}>
      <StatusBar backgroundColor={colors.app_background} />
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
          <ForgotLogo height={heightPercentageToDP(40)} />
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
              onChangeText={text => setEmail(text)}
              value={email}
            />
          </View>
        </View>
        <View style={styles.bottomView}>
          <Button
            buttonText={'Send Email'}
            onPress={() => console.log('Email Sent')}
          />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default ForgotPasswordScreen;
