import * as React from 'react';
import {Platform, StyleSheet} from 'react-native';
import {
    heightPercentageToDP as hp,
    widthPercentageToDP as wp
} from 'react-native-responsive-screen';
import colors from "../../assets/colors/colors";
import fonts from "../../assets/fonts/fonts";

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: colors.app_background,
        paddingTop:Platform.OS === 'ios' ? hp(5) : null
    },
    headerView:{
        flex:0.07
    },
    bodyView:{
        flex:0.83,
    },
    userDetailView:{
        height:hp(15),
        width:wp(100),
        flexDirection:'row',
        alignItems:'center',
        paddingHorizontal:wp(5),
    },
    nameView:{
        height:hp(15),
        width:wp(60),
        justifyContent:'center',
        paddingLeft:wp(2),
    },
    userNameText:{
        fontSize:wp(6),
        color:colors.white,
        fontFamily:fonts.semi
    },
    imageView:{
        height:hp(15),
        width:wp(30),
        justifyContent:'center',
        alignItems:'center',
    },
    imageStyle:{
        height:hp(9),
        width:hp(9),
        borderRadius:hp(2),
        resizeMode:'cover',
        justifyContent:'center',
        alignItems:'center'
    },
    announcementView:{
        maxHeight:hp(220),
        width:wp(100),
        alignSelf:'center',
    },
    announceUpperView:{
        height:hp(20),
        width:wp(100),
        alignItems:'center',
    },
    announceImage:{
        height: hp(30),
        width: wp(95),
        resizeMode:'cover',
    },
    announceTextView:{
        maxHeight:hp(220),
        width:wp(100),
        paddingBottom:hp(2),
        justifyContent:'center',
    },
    announceView:{
        height:hp(5),
        width:wp(100),
        justifyContent:'flex-end',
        paddingHorizontal:wp(10),
    },
    descriptionText:{
        maxHeight:hp(200),
        width:wp(100),
        paddingHorizontal:wp(10),
    },
    courseView:{
        height:hp(28),
        width:wp(100),
        alignItems:'center',
    },
    courseTitle:{
        height:hp(6),
        width:wp(85),
        justifyContent:'space-between',
        alignItems:'center',
        flexDirection:'row',
    },
    videoSection:{
        height:hp(20),
        width:wp(90),
    },
    container: {
        maxHeight: hp(40),
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
    titleText:{
        width:wp(47),
        fontSize:wp(3.8),
        fontWeight:'500',
        color:colors.white,
        fontFamily:fonts.semi,
        marginTop:6,
    },
    imageInnerView: {
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
        maxHeight:hp(25),
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
    headerText:{
        fontSize: wp(4.2),
        fontFamily: fonts.regular,
        fontWeight: '500',
        color: colors.white
    },
    showAll:{
        fontSize: wp(3),
        fontFamily: fonts.regular,
        fontWeight: '400',
        color: colors.white
    },
    backgroundVideo:{
        height:'100%',
        width:wp(90),
    },
    bottomWidth:{
        height:0.5,
        width:wp(80),
        alignSelf:'center',
        backgroundColor:colors.button_text
    }
});

export default styles;
