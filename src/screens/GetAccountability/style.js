import * as React from 'react';
import {StyleSheet} from 'react-native';
import {
    heightPercentageToDP as hp,
    widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import colors from "../../assets/colors/colors";
import fonts from "../../assets/fonts/fonts";

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: colors.app_background,
    },
    headerView:{
        flex:0.1
    },
    listView:{
        flex:0.8,
    },
    upperView:{
        height:hp(10),
        width:wp(100),
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
    }

});

export default styles;
