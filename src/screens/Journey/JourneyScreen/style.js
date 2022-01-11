import * as React from 'react';
import {StyleSheet} from 'react-native';
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
    },
    headerView:{
        flex:0.1
    },
    listView:{
        flex:0.9,
        justifyContent:'center',
        alignItems:'center',
    },
    upperView:{
        height:hp(10),
        width:wp(100),
    },
    headerStyle:{
        height:hp(5),
        width:wp(100),
        paddingHorizontal:wp(7.5),
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
    },
    activityView:{
        height:hp(5),
        width:wp(100),
        paddingHorizontal:wp(7.5),
        justifyContent:'center',
    },
    activityText:{
        fontSize:wp(4.2),
        color:colors.white,
        fontFamily:fonts.semi
    },
    emptySection:{
        height:hp(60),
        justifyContent:'center',
        alignItems:'center',
    },
    headerTextStyle:{
        fontFamily:fonts.semi,
        fontWeight:'700',
        color:colors.white,
        fontSize:24
    },
    upgradePlan:{
        height:hp(90),
        width:wp(100),
        justifyContent:"center",
        alignItems:'center',
    },
});

export default styles;
