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
  headerView: {
    height: hp(10),
    width: wp(100),
  },
  welcomeText: {
    color: colors.white,
    fontFamily: fonts.bold,
    fontSize: wp(9),
    position: 'absolute',
    top: Platform.OS === 'android' ? hp(10) : Platform.Version >= '14.5' ? hp(5) : null,
    left: wp(7),
    width: wp(60),
  },
  imageView: {
    height: hp(40),
    width: wp(100),
    justifyContent: 'flex-end',
    marginLeft: wp(16),
  },
  inputView: {
    height: hp(60),
    width: wp(100),
    justifyContent: 'center',
  },
  inputSection: {
    height: hp(10),
    width: wp(100),
    justifyContent: 'center',
  },
  inputText: {
    alignSelf: 'center',
    width: wp(85),
    backgroundColor: colors.app_background,
    borderWidth: 0,
    borderColor: colors.app_background,
    color: colors.white,
    borderRadius: wp(2),
  },
  forgotPassword: {
    height: hp(5),
    width: wp(70),
    marginHorizontal: wp(7),
    alignSelf: 'flex-end',
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  forgotPasswordText: {
    fontSize: wp(3.8),
    fontWeight: '700',
    fontFamily: fonts.regular,
    color: colors.white,
  },
  bottomView: {
    height: hp(24),
    width: wp(100),
    justifyContent: 'center',
    alignItems: 'center',
  },
  noAccountView: {
    height: hp(10),
    width: wp(100),
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  noAccountText: {
    color: colors.no_account,
    fontSize: wp(4),
    fontFamily: fonts.regular,
  },
  signUpText: {
    color: colors.white,
    fontSize: wp(4),
    fontFamily: fonts.semi,
  },
  numberView:{
    alignSelf: 'center',
    width: wp(85),
    backgroundColor: colors.app_background,
    borderWidth: 1,
    borderColor: colors.app_border,
    color: colors.white,
    borderRadius: wp(2),
    height: hp(7.5),
  }

});

export default styles;
