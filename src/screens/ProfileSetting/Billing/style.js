import * as React from 'react';
import {StyleSheet} from 'react-native';
import {
    heightPercentageToDP as hp,
    widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import colors from '../../../assets/colors/colors';
import fonts from "../../../assets/fonts/fonts";

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: colors.app_background,
    },
    headerView:{
        flex:0.1
    },
    headingView: {
        height:hp(25),
        justifyContent:'center',
    },
    inputBox:{
        height: hp(10),
        width: wp(100),
        paddingHorizontal: wp(5),
    },
    titleText:{
        fontFamily:fonts.regular,
        fontWeight:'500',
        color:colors.white,
        fontSize:wp(3.8)
    },
    dateView:{
        height:hp(6),
        width:wp(15),
        justifyContent:'center',
        alignItems:'flex-end',
    },
    dateViewStyle:{
        marginTop:wp(2),
        height:hp(6),
        width:wp(90),
        borderRadius:wp(5),
        backgroundColor:colors.image_background,
        paddingHorizontal:wp(5),
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-between',
        borderWidth:0
    },
    placeHolderText:{
        fontFamily:fonts.regular,
        fontWeight:'500',
        color:colors.inputColor
    },
    inputView:{
        flex:0.65,
        alignItems:'center'
    },

});

export default styles;
