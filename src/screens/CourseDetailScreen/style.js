import * as React from "react";
import {Platform, StyleSheet} from "react-native";
import {
    heightPercentageToDP as hp,
    widthPercentageToDP as wp,
} from "react-native-responsive-screen";
import colors from "../../assets/colors/colors";
import fonts from "../../assets/fonts/fonts";

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: colors.app_background,
    },
    scrollSpace:{
        flex:0.9,
        marginBottom:hp(2)
    },
    headerView:{
        height: hp(10),
        width: wp(100),
    },
    cardDetail: {
        width: wp(100),
        maxHeight: hp(41),
        backgroundColor: colors.image_background,
        borderRadius: hp(6),
        borderTopLeftRadius: 0,
        borderTopRightRadius: 0,
    },
    headingView:{
        height:hp(8),
        width:wp(100),
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        paddingHorizontal:wp(5),
    },
    titleText:{
        fontSize:wp(6),
        width:wp(70),
        color:colors.white,
        fontWeight:'700',
        fontFamily:fonts.semi,
    },
    imageSection:{
        height:hp(22),
        width:wp(100),
        justifyContent:'center',
        alignItems:'center',
    },
    imageView:{
        height:hp(20),
        width:wp(80),
        borderRadius:wp(5),
    },
    imageStyles: {
        width:'100%',
        height:'100%',
        resizeMode:'stretch',
        borderRadius:wp(5),
    },
    textSection:{
        maxHeight:hp(10),
        width:wp(80),
        alignItems:'center',
        alignSelf:'center',
    },
    upperTitleView:{
        maxHeight:hp(5),
        width:wp(80),
    },
    lowerTitleView:{
        height:hp(5),
        width:wp(80),
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
    },
    contentHeading:{
        height:hp(10),
        width:wp(100),
        paddingHorizontal:wp(5),
        justifyContent:'center',
    },
    btnView:{
        flex:0.1,
        alignItems:'center',
    },
    sectionView:{
      width:wp(100),
      justifyContent:'center',
      alignItems:'center',
    },


    cardImg: {
        marginTop: hp("3%"),
        width: wp("84%"),
        height: hp("19%"),
        borderRadius: hp(2),
        alignSelf: "center",
    },
    underImage: {
        width: wp("84%"),
        alignSelf: "center",
    },
    lowerTitle: {
        color: "#FFFFFF",
        fontWeight: "700",
        fontSize: hp("2.5"),
        paddingTop: hp("1%"),
    },
    name: {
        color: "#D1D1D1",
        paddingVertical: hp("0.5%"),
        fontSize: hp(1.7),
        fontWeight: "300",
    },
    studentEnroll: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    student: {
        fontWeight: "700",
        color: "#A4A2A2",
        fontSize: 12,
    },
    lastView: {
        marginTop: hp(2),
    },
    contentText: {
        color: "#FFFFFF",
        fontWeight: "bold",
        fontSize: hp("3"),
        paddingLeft: wp(5.3),
        paddingTop: hp("3.3"),
    },
    lastSection: {
        width: wp("88%"),
        height: hp(12),
        alignSelf: "center",
        marginTop: hp(2),
        backgroundColor: "#1F1F1F",
        borderRadius: hp(2.3),
        flexDirection: "row",
    },
    test: {
        color: "#FFFFFF",
        paddingLeft: wp(5.3),
        paddingTop: hp(1.5),
        fontSize: hp(2.3),
    },
    lastCard: {
        width: wp(80),
        height: hp(10),
    },

    basicInfo: {
        paddingLeft: wp(4),
        paddingTop: hp(1.7),
        flexDirection: "column",
    },
    titleOne: {
        color: "#FFFFFF",
        fontSize: hp(1.7),
        fontWeight: "bold",
    },
    descriptionText: {
        color: "#D1D1D1",
        fontSize: Platform.OS === "ios" ? hp(1.8) : hp(1.9),
        paddingTop: hp(0.7),
        width: wp(50),
        height: hp(5.5),
    },
    button: {
        width: 290,
        height: 42,
        borderWidth: 1,
        borderColor: "#6A6A6A",
        justifyContent: "center",
        alignContent: "center",
        alignSelf: "center",
    },
    btnText: {
        color: "#B7A675",
        alignSelf: "center",
    },
    buttonBuy: {
        alignItems: "center",
        marginTop: hp(1.3),
    },
});
export default styles;
