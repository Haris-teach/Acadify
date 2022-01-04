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
    },
    headerView: {
        height: hp(10),
        width: wp(100),
    },
    cardStyle: {
        height: hp(30),
        width: Platform.OS === 'ios' ? hp(50) : hp(60),
    },
    imageView: {
        height: hp(35),
        width: wp(100),
        justifyContent: 'center',
        alignItems: 'center',
    },
    inputView: {
        height: hp(45),
        width: wp(100),
        borderTopRightRadius:wp(12),
        borderTopLeftRadius:wp(12),
        backgroundColor:colors.card_background
    },
    cardTextView:{
        height: hp(10),
        width: wp(100),
        justifyContent: 'center',
    },
    inputSection: {
        marginTop:hp(1),
        height: hp(8),
        width: wp(100),
        backgroundColor:colors.card_background
    },
    inputText: {
        width: wp(85),
        backgroundColor: colors.card_background,
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
        height: hp(13),
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
    nameView: {
        height: hp(12),
        width: wp(100),
        flexDirection: 'row',
    },
    leftBox: {
        height: hp(12),
        width: wp(70),
        paddingLeft: wp(23),
        justifyContent: 'flex-end',
    },
    rightBox: {
        height: hp(12),
        width: wp(30),
        justifyContent: 'flex-end',
    },
    nameText: {
        fontSize: 14,
        fontFamily: fonts.semi,
        fontWeight: '500',
        color: '#464646',
    },
    buttonView: {
        height: hp(10),
        width: wp(100),
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        backgroundColor:colors.card_background
    },
    btnView: {
        height: hp(10),
        width: wp(45),
        alignItems: 'center',
    },
    cardNumberView: {
        height: hp(8),
        width: wp(100),
        paddingTop:hp(3),
        paddingLeft: wp(23),
    },
    expiryDate: {
        height: hp(8),
        width: wp(100),
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
    },
    dataView: {
        height: hp(8),
        width: wp(50),
        paddingTop:hp(2),
        alignItems: 'center',
        paddingLeft: wp(10),
    },
    cardText:{
        fontSize: 24,
        paddingLeft:wp(10),
        color:colors.white,
        fontFamily:fonts.semi
    }
});

export default styles;
