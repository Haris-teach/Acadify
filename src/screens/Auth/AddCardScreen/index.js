//================================ React Native Imported Files ======================================//

import React, {useState} from 'react';
import {
  View,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  StatusBar,
  ImageBackground,
  Text,
} from 'react-native';
import {TextInput} from 'react-native-paper';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {useSelector} from 'react-redux';
import Toast from 'react-native-simple-toast';
import moment from 'moment';

//================================ Local Imported Files ======================================//

import styles from './style';
import colors from '../../../assets/colors/colors';
import fonts from '../../../assets/fonts/fonts';
import images from '../../../assets/images/images';
import ApiHelper from '../../../api/ApiHelper';
import Button from '../../../components/Button/Button';
import AppHeader from '../../../components/AppHeader';
import AppLoading from '../../../components/AppLoading';

const AddCardScreen = props => {
  const data = useSelector(state => state.ApiData.signUpData);
  const [cardNumber, setCardNumber] = useState('');
  const [cvc, setCvc] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvcLength, setCvcLength] = useState(3);
  const [loading, setLoading] = useState(false);

  const onPay = () => {
    if (cardNumber.length < 19) {
      Toast.show('Invalid card number', Toast.LONG);
    } else if (expiryDate.length < 5) {
      Toast.show('Invalid expiry date', Toast.LONG);
    } else if (cvc < cvcLength) {
      Toast.show('Invalid expiry date', Toast.LONG);
    } else {
      onPayApi();
    }
  };

  const onPayApi = async () => {
    setLoading(false);
    let data = expiryDate.split('/');
    console.log('cardNumber', cardNumber);
    let token = await ApiHelper.getToken(
      data.userName,
      cardNumber,
      cvc,
      data[0],
      data[1],
    );
    if (token.id !== undefined) {
      setLoading(false);
      console.log('Token', token.id);
    }
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
          <AppHeader title={'Add Credit Card'} />
        </View>
        <View style={styles.imageView}>
          <ImageBackground source={images.card_icon} style={styles.cardStyle}>
            <View style={styles.nameView}>
              <View style={styles.leftBox}>
                <Text style={styles.nameText}>Name</Text>
                <Text
                  style={[
                    styles.nameText,
                    {
                      marginTop: wp(1),
                      fontSize: 18,
                      fontWeight: '600',
                      width: wp(40),
                    },
                  ]}
                  numberOfLines={1}>
                  Hassan Inayat
                </Text>
              </View>
              <View style={styles.rightBox}>
                <Text style={[styles.nameText, {color: '#7E7E7E'}]}>Price</Text>
                <Text
                  style={[
                    styles.nameText,
                    {marginTop: wp(1), fontSize: 18, fontWeight: '600'},
                  ]}>
                  $ 90.00
                </Text>
              </View>
            </View>
            <View style={styles.cardNumberView}>
              <Text
                style={[
                  styles.nameText,
                  {marginTop: wp(1), fontSize: 18, fontWeight: '600'},
                ]}>
                **** **** **** {cardNumber.slice(15, 19)}
              </Text>
            </View>
            <View style={styles.expiryDate}>
              <View style={styles.dataView}>
                <Text
                  style={[styles.nameText, {fontSize: 14, fontWeight: '600'}]}>
                  {expiryDate}
                </Text>
              </View>
              <View style={styles.dataView}>
                <Text>09/22</Text>
              </View>
            </View>
          </ImageBackground>
        </View>
        <View style={styles.inputView}>
          <View style={styles.inputSection}>
            <TextInput
              style={[styles.inputText, {alignSelf: 'center'}]}
              label="Card Number"
              mode={'outlined'}
              placeholder={'Number'}
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
              onChangeText={card => {
                // let cardNumber = card
                //   .replace(/\s?/g, '')
                //   .replace(/(\d{4})/g, '$1 ')
                //   .trim();
                // setCardNumber(cardNumber);
                if (card.length > cardNumber.length) {
                  if (
                    card.length === 4 ||
                    card.length === 9 ||
                    card.length === 14
                  ) {
                    setCardNumber(card + ' ');
                  } else {
                    setCardNumber(card);
                  }
                } else {
                  if (cardNumber[cardNumber.length - 2] === ' ') {
                    setCardNumber(card.slice(0, card.length - 2));
                  } else if (cardNumber[cardNumber.length - 1] === ' ') {
                    setCardNumber(card.slice(0, card.length - 1));
                  } else {
                    setCardNumber(card);
                  }
                }
              }}
              maxLength={19}
              keyboardType={'numeric'}
              value={cardNumber}
            />
          </View>
          <View
            style={[
              styles.inputSection,
              {
                flexDirection: 'row',
                height: hp(9),
                marginTop: hp(2),
              },
            ]}>
            <TextInput
              style={[styles.inputText, {width: wp(40)}]}
              label="Expiry date"
              mode={'outlined'}
              placeholder={'MM / YY'}
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
              onChangeText={expiry => {
                if (expiry.length > expiryDate.length) {
                  if (expiry.length === 2) {
                    setExpiryDate(expiry + '/');
                  } else {
                    setExpiryDate(expiry);
                  }
                } else {
                  setExpiryDate(expiry);
                }
              }}
              keyboardType={'numeric'}
              maxLength={5}
              value={expiryDate}
            />
            <TextInput
              style={[
                styles.inputText,
                {
                  width: wp(40),
                  marginLeft: wp(5),
                },
              ]}
              label="CVC"
              mode={'outlined'}
              placeholder={'Enter'}
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
              maxLength={cvcLength}
              keyboardType={'numeric'}
              onChangeText={cvc => setCvc(cvc)}
              value={cvc}
            />
          </View>
        </View>
        <View style={styles.buttonView}>
          <View style={styles.btnView}>
            <Button
              width={wp(40)}
              buttonText={'No'}
              onPress={() => props.navigation.goBack()}
            />
          </View>
          <View style={styles.btnView}>
            <Button
              width={wp(40)}
              buttonText={'Pay'}
              bgColor={colors.white}
              borderColor={colors.white}
              textColor={colors.black}
              onPress={() => onPay()}
            />
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default AddCardScreen;
