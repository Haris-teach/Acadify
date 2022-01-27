import * as React from "react";
import {StyleSheet} from "react-native";
import {
    heightPercentageToDP as hp,
    widthPercentageToDP as wp,
} from "react-native-responsive-screen";
import colors from "../../../assets/colors/colors";
import fonts from "../../../assets/fonts/fonts";

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: colors.app_background,
    },
    scrollSpace:{
        flex:1,
    },
    headerView:{
        height: hp(10),
        width: wp(100),
    },
    cardDetail: {
        width: wp(100),
        maxHeight: hp(41),
        backgroundColor: colors.app_background,
        borderRadius: hp(6),
        borderTopLeftRadius: 0,
        borderTopRightRadius: 0,
    },
    headingView:{
        height:hp(8),
        width:wp(100),
        justifyContent:'center',
        paddingHorizontal:wp(5),
    },
    titleText:{
        fontSize:wp(6),
        width:wp(70),
        color:colors.white,
        fontWeight:'700',
        fontFamily:fonts.semi,
    },
    videoSection:{
        height:hp(32),
        width:wp(100),
        // justifyContent:'center',
        // alignItems:'center',
    },
    sectionView:{
      width:wp(100),
        paddingBottom:hp(2)
    },
    contentHeading:{
        height:hp(10),
        width:wp(100),
        paddingHorizontal:wp(5),
        justifyContent:'center',
    },

});
export default styles;
