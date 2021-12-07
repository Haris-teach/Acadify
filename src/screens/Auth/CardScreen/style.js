import React from 'react';
import {StyleSheet} from 'react-native';
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
  },
  headerView:{
    height:hp(10),
    width:wp(100)
  },
  imageView: {
    height: hp(50),
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
    fontSize: wp(4.4),
    color: colors.white,
    fontFamily: fonts.regular,
    paddingHorizontal: wp(5),
  },
  buttonView: {
    height: hp(20),
    width: wp(100),
    justifyContent: 'center',
    flexDirection: 'row',
  },
  btnView: {
    width: wp(45),
    justifyContent:'center',
    alignItems: 'center',
  },
});

export default styles;
