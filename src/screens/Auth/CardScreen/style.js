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
  imageView: {
    height: hp(60),
    width: wp(100),
    justifyContent: 'center',
    alignItems: 'center',
  },
  headingView: {
    height: hp(6),
    width: wp(100),
  },
  headingText: {
    fontWeight: '700',
    fontSize: 24,
    color: colors.white,
    fontFamily: fonts.regular,
    paddingLeft: wp(5),
  },
  subHeadingView: {
    height: hp(8),
    width: wp(100),
  },
  subHeadingText: {
    fontWeight: '400',
    fontSize: 18,
    color: colors.white,
    fontFamily: fonts.regular,
    paddingLeft: wp(5),
  },
  buttonView: {
    height: hp(21),
    width: wp(100),
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  btnView: {
    height: hp(20),
    width: wp(45),
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default styles;
