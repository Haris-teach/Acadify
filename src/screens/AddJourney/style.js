import * as React from 'react';
import {StyleSheet} from 'react-native';
import {
    heightPercentageToDP as hp,
    widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import colors from '../../assets/colors/colors';
import fonts from '../../assets/fonts/fonts';

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: colors.app_background,
    },
    headerView:{
        height: hp(10),
        width: wp(100),
    },
    headingView: {
        height: hp(10),
        width: wp(100),
        justifyContent:'center',
    },
    headingText: {
        fontWeight: '700',
        fontSize: 24,
        color: colors.white,
        fontFamily: fonts.regular,
        paddingHorizontal: wp(5),
    },
    inputView:{
        height: hp(60),
        width: wp(100),
    },
    inputBox:{
        height: hp(12),
        width: wp(100),
        paddingHorizontal: wp(5),
    },
    titleText:{
        fontFamily:fonts.regular,
        fontWeight:'500',
        color:colors.white,
        fontSize:14
    },
    inputStyle:{
        marginTop:wp(3),
        height:hp(6),
        width:wp(90),
        borderRadius:wp(5),
        backgroundColor:colors.image_background,
        paddingLeft:wp(5),
        fontFamily:fonts.regular,
        fontWeight:'500',
        color:colors.white
    },
    buttonView: {
        height: hp(20),
        width: wp(100),
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
    },
    btnView: {
        width: wp(45),
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default styles;
