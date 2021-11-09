import * as React from 'react';
import {Platform, StyleSheet} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import colors from '../../../assets/colors/colors';
import fonts from '../../../assets/fonts/fonts';

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: colors.app_background,
    paddingTop: Platform.OS === 'ios' ? hp(5) : null,
  },
  imageStyle: {
    height: hp(100),
    width: hp(52),
    resizeMode: 'contain',
    alignSelf: 'center',
    justifyContent: 'flex-end',
  },
  logoView: {
    flex: 0.25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoText: {
    marginTop: hp(2),
    fontSize: wp(6),
    fontFamily: fonts.regular,
    fontWeight: '700',
    color: colors.button_text,
  },
  bottomView: {
    flex: 0.15,
    marginBottom: Platform.OS === 'ios' ? hp(3) : null,
    // justifyContent: 'center',
    marginTop:hp(4),
    alignItems: 'center',
  },
});

export default styles;
