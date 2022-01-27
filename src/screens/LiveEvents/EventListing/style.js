import * as React from "react";
import {Platform, StyleSheet} from "react-native";
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
        paddingTop:Platform.OS === 'ios' ? hp(5) : null
    },
    container:{
        flex:0.88,
        paddingTop:hp(1),
    },
    emptySection:{
        height:hp(80),
        justifyContent:'center',
        alignItems:'center'
    },
    dropArrow:{
        height:hp(5),
        marginLeft:wp(2),
        justifyContent:'center',
    },
    innerContainer: {
        marginVertical: wp(2),
        width: wp(93),
        alignSelf:'center'
    },
    upperView:{
        height:hp(6),
        width:wp(95),
        alignSelf:'center',
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        backgroundColor:colors.image_background,
        borderRadius:wp(9)
    },
    headingView:{
        height:hp(8),
        width:wp(100),
        justifyContent:'center',
    },
    headingText: {
        fontWeight:'700',
        fontSize: wp(6.2),
        color: colors.white,
        fontFamily: fonts.regular,
        paddingHorizontal: wp(5),
    },
    headerStyle:{
        height:hp(6),
        width:wp(30),
        justifyContent:'center',
        alignItems:"center",
        borderRadius:wp(9),
    },
    filterIcons:{
        height:hp(10),
        width:wp(20),
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-between',
    },
    headerTextStyle:{
        fontFamily:fonts.semi,
        fontWeight:'600',
        color:colors.white,
        fontSize:wp(4)
    },
    headingContainer: {
        height: hp(8),
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    listText: {
        color: colors.white,
    },
    dropStyle:{
        position:'absolute',
        top:hp(18),
        left:wp(10),
    },
    dateViewStyle:{
        height:hp(10),
        width:wp(40),
        borderRadius:wp(5),
        backgroundColor:colors.image_background,
        alignItems:'center',
        justifyContent:'space-between',
        borderWidth:0
    },
    containerStyle: {
    },
    upgradePlan:{
        height:hp(90),
        width:wp(100),
        justifyContent:"center",
        alignItems:'center',
    }
});

export default styles;
