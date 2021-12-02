import * as React from 'react';
import {StyleSheet} from 'react-native';
import {
    heightPercentageToDP as hp,
    widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import colors from '../../../../assets/colors/colors';

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: colors.app_background,
    },
    headerView:{
        flex:0.1
    },
    headingView: {
        height:hp(8),
        paddingHorizontal: wp(5),
        alignItems:'center',
        justifyContent:'flex-end',
        flexDirection:'row',
    },
    inputView:{
        flex:0.9,
        alignItems:'center',
    },
});

export default styles;
