import * as React from 'react';
import {StyleSheet} from 'react-native';
import {
    heightPercentageToDP as hp,
    widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import colors from "../../../assets/colors/colors";
const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: colors.app_background,
    },
    headerView: {
        height: hp(10),
        width: wp(100),
    },
    inputView: {
        height: hp(70),
        width: wp(100),
        paddingTop:hp(10),
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
    bottomView: {
        height: hp(20),
        width: wp(100),
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default styles;
