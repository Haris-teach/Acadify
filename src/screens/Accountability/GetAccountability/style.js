import * as React from 'react';
import {Platform, StyleSheet} from 'react-native';
import {
    heightPercentageToDP as hp,
    widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import colors from "../../../assets/colors/colors";
import fonts from "../../../assets/fonts/fonts";

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: colors.app_background,
        paddingTop:Platform.OS === 'ios' ? hp(5) : null
    },
    listView:{
        flex:0.9,
    },
    upperView:{
        height:hp(10),
        width:wp(100),
    },
    emptySection:{
        height:hp(70),
        justifyContent:'center',
        alignItems:'center',
    },
    headerStyle:{
        height:hp(10),
        width:wp(100),
        paddingHorizontal:wp(7.5),
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
    },
    filterIcons:{
        height:hp(10),
        width:wp(30),
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-between',
    },
    activityView:{
        height:hp(5),
        width:wp(100),
        paddingHorizontal:wp(7.5),
    },
    activityText:{
        fontSize:14,
        color:colors.white,
        fontFamily:fonts.semi
    },
    headerTextStyle:{
        fontFamily:fonts.semi,
        fontWeight:'700',
        color:colors.white,
        fontSize:24
    },
    container: {
        maxHeight: hp(100),
        width: wp(90),
        marginVertical: wp(2),
        alignSelf:'center',
        borderRadius:wp(7),
        backgroundColor:colors.image_background
    },
    rightView:{
        height:hp(15),
        width:wp(56),
        paddingLeft:wp(6),
        justifyContent:'center',
    },
    titleUpperText:{
        height:hp(4),
        width:wp(44),
        flexDirection:'row',
        alignItems:'center',
    },
    titleText:{
        fontSize:wp(3.8),
        fontWeight:'500',
        color:colors.white,
        fontFamily:fonts.semi,
        marginTop:6,
    },
    imageView: {
        height: hp(15),
        width: wp(34),
        flexDirection:'row',
        justifyContent: "center",
    },
    roundCircle:{
        height: hp(15),
        width: wp(20),
        justifyContent: "center",
    },
    dropArrow:{
        height: hp(4),
        width: wp(12),
        justifyContent: "flex-end",
        alignItems:'flex-start',
    },
    innerContainer:{
     flexDirection:'row'
    },
    flatListView:{
        maxHeight:hp(100),
        borderBottomLeftRadius:wp(7),
        borderBottomRightRadius:wp(7),
        alignItems:'center',
    },
    tickView:{
        height:hp(5),
        width:wp(85),
        paddingHorizontal:wp(5),
        alignItems:'center',
        flexDirection:'row',
        marginVertical:wp(1),
    },
    tickIcon:{
        height:hp(5),
        width:wp(10),
        justifyContent:'center',
    },
    textView:{
        height:hp(5),
        width:wp(65),
        justifyContent:'center',
    },
    listText:{
        fontSize:wp(4),
        width:wp(65),
        color:colors.white,
        fontWeight:'500',
        fontFamily:fonts.regular
    },
    upperLine:{
        height:hp(1),
        width:wp(75),
        borderTopColor:colors.button_text,
        borderTopWidth:0.3,
    },
    upgradePlan:{
        height:hp(90),
        width:wp(100),
        justifyContent:"center",
        alignItems:'center',
    }


});

export default styles;
