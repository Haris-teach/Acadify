import * as React from 'react';
import {Platform, StyleSheet} from 'react-native';
import {
    heightPercentageToDP as hp,
    widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import colors from '../../../assets/colors/colors';
import fonts from '../../../assets/fonts/fonts';

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: colors.app_background,
    },
    headerView: {
        height: hp(10),
        width: wp(100),
    },
    cardStyle: {
        height: hp(30),
        width: Platform.OS === 'ios' ? hp(50) : hp(60),
    },
    imageView: {
        height: hp(35),
        width: wp(100),
        justifyContent: 'center',
        alignItems: 'center',
    },
    inputView: {
        maxHeight: hp(500),
        width: wp(100),
    },
    cardTextView:{
        height: hp(8),
        width: wp(100),
        justifyContent: 'center',
    },
    inputSection: {
        maxHeight: hp(500),
        width: wp(100),
        justifyContent:'center',
        alignItems:'center',
    },
    bottomView: {
        height: hp(13),
        width: wp(100),
        justifyContent: 'center',
        alignItems: 'center',
    },
    nameView: {
        height: hp(12),
        width: wp(100),
        flexDirection: 'row',
    },
    leftBox: {
        height: hp(12),
        width: wp(70),
        paddingLeft: wp(23),
        justifyContent: 'flex-end',
    },
    rightBox: {
        height: hp(12),
        width: wp(30),
        justifyContent: 'flex-end',
    },
    nameText: {
        fontSize: 14,
        fontFamily: fonts.semi,
        fontWeight: '500',
        color: '#464646',
    },
    buttonView: {
        height: hp(10),
        width: wp(100),
        justifyContent:'center',
        alignItems:'center',
    },
    cardNumberView: {
        height: hp(8),
        width: wp(100),
        paddingTop:hp(3),
        paddingLeft: wp(23),
    },
    expiryDate: {
        height: hp(8),
        width: wp(100),
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
    },
    dataView: {
        height: hp(8),
        width: wp(50),
        paddingTop:hp(2),
        alignItems: 'center',
        paddingLeft: wp(10),
    },
    cardText:{
        fontSize: wp(6),
        paddingLeft:wp(10),
        color:colors.white,
        fontFamily:fonts.semi
    },
    leftActionView: {
        height:hp(4.5),
        width:wp(25),
        borderRadius:wp(3),
        marginLeft:wp(2),
        justifyContent:'center',
        alignItems:'center',
        alignSelf:'center',
        flexDirection:'row',
        backgroundColor:'red'
    },
    deleteButton:{
        fontWeight:'700',
        fontSize:wp(4),
        color:colors.white,
        paddingLeft:wp(2)
    },
    mainTabView:{
        width:wp(100),
        justifyContent:'center',
        alignItems:'center',
    },
    cardView:{
        height:hp(8),
        width:wp(90),
        backgroundColor:colors.image_background,
        marginVertical:wp(1),
        borderRadius:wp(4),
        alignItems:'center',
        flexDirection:'row',
    }
});

export default styles;
