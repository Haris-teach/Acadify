import * as React from 'react';
import {StyleSheet} from 'react-native';
import {
    heightPercentageToDP as hp,
    widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import colors from '../../../../assets/colors/colors';
import fonts from '../../../../assets/fonts/fonts';

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: colors.app_background,
    },
    headerView:{
        height: hp(10),
        width: wp(100),
    },
    imageView: {
        height: hp(60),
        width: wp(100),
        justifyContent: 'center',
        alignItems: 'center',
    },
    headingView: {
        height: hp(8),
        width: wp(100),
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-between',
        paddingHorizontal: wp(5),
    },
    headingText: {
        fontWeight:'700',
        fontSize: wp(6.2),
        color: colors.white,
        fontFamily: fonts.regular,
    },
    inputView:{
        height: hp(100),
        width: wp(100),
        alignItems:'center',
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
        paddingHorizontal:wp(5),
        fontFamily:fonts.regular,
        fontWeight:'500',
        color:colors.white
    },
    dateView:{
        height:hp(6),
        width:wp(15),
        justifyContent:'center',
        alignItems:'flex-end',
    },
    dateViewStyle:{
        marginTop:wp(3),
        height:hp(6),
        width:wp(90),
        borderRadius:wp(5),
        backgroundColor:colors.image_background,
        paddingHorizontal:wp(5),
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-between',
        borderWidth:0,
    },
    placeHolderText:{
        fontFamily:fonts.regular,
        fontWeight:'500',
        color:colors.inputColor
    },
    buttonView: {
        height: hp(21),
        width: wp(100),
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        zIndex:-1
    },
    btnView: {
        height: hp(20),
        width: wp(45),
        justifyContent: 'center',
        alignItems: 'center',
    },
    containerStyle: {
    },
});

export default styles;
