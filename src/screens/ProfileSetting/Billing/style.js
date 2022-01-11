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
        flex:0.25,
        justifyContent:'center',
    },
    inputBox:{
        height: hp(10),
        width: wp(100),
        paddingHorizontal: wp(5),
    },
    upperView:{
       flex:0.06,
        width:wp(90),
        marginTop:hp(1),
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        alignSelf:'center',
        backgroundColor:colors.image_background,
        borderRadius:wp(9),
    },
    headerStyle:{
        height:hp(6),
        width:wp(45),
        justifyContent:'center',
        alignItems:"center",
        borderRadius:wp(9),
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
        alignItems:'center',
    },
    emptySection:{
        height:hp(50),
        justifyContent:'center',
        alignItems:'center',
    },
    headerTextStyle:{
        fontFamily:fonts.semi,
        fontWeight:'700',
        color:colors.white,
        fontSize:wp(4)
    },



    headingNewView: {
        height: hp(20),
        width: wp(100),
        justifyContent: 'center',
        paddingLeft: wp(10),
    },
    headingText: {
        fontFamily: fonts.semi,
        fontWeight: '700',
        color: colors.white,
        fontSize: hp(3),
        width: wp(70),
    },
    subHeadingText: {
        marginTop: wp(3),
        fontFamily: fonts.regular,
        fontWeight: '400',
        color: colors.button_text,
        fontSize: wp(4.4),
        width: wp(70),
    },
    planView: {
        height: hp(22),
        width: wp(100),
    },
    container: {
        height: hp(20),
        width: wp(30),
        marginHorizontal: wp(2),
        borderRadius: wp(3),
        alignSelf: 'center',
        backgroundColor: colors.plan_color,
    },
    imageView: {
        height: hp(8),
        width: wp(29),
        borderTopLeftRadius: wp(3),
        borderTopRightRadius: wp(3),
        justifyContent: 'center',
        paddingLeft: wp(3),
    },
    imageValue: {
        height: hp(7),
        width: hp(7),
        borderRadius: wp(4),
        justifyContent: 'center',
        alignItems: 'flex-start',
        resizeMode: 'cover',
    },
    nameView: {
        height: hp(3),
        width: wp(29),
        justifyContent: 'center',
        alignItems: 'center',
    },
    nameText: {
        fontSize: wp(3.8),
        color: colors.white,
        fontWeight: '500',
        fontFamily: fonts.semi,
    },
    priceView: {
        height: hp(9),
        width: wp(29),
        borderBottomLeftRadius: wp(3),
        borderBottomRightRadius: wp(3),
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    dollarSign: {
        height: hp(5.5),
        fontSize: wp(5),
        fontFamily: fonts.regular,
        alignSelf: 'flex-end',
        color: 'rgba(255, 255, 255, 0.7)',
    },
    priceValue: {
        fontSize: wp(9),
        fontFamily: fonts.bold,
        color: 'rgba(255, 255, 255, 0.7)',
    },
    featureViewText: {
        height: hp(8),
        width: wp(100),
        paddingHorizontal: wp(8),
    },
    headingFeatureText: {
        paddingTop: hp(3),
        fontFamily: fonts.semi,
        fontWeight: '500',
        fontSize: wp(6),
        color: colors.white,
    },
    featureView: {
        justifyContent: 'center',
    },
    miniContainer: {
        height: hp(5),
        width: wp(100),
        marginVertical: wp(1),
        borderRadius: wp(3),
        paddingLeft: wp(10),
        alignItems: 'center',
        flexDirection: 'row',
    },
    featureInnerText: {
        paddingLeft: wp(5),
        fontSize: wp(4.2),
        fontWeight: '500',
        fontFamily: fonts.regular,
        color: '#BDBCBD',
    },
    buttonView: {
        height: hp(20),
        width: wp(100),
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
    },
    btnView: {
        height: hp(20),
        width: wp(45),
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default styles;
