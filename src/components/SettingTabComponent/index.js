//================================ React Native Imported Files ======================================//

import React, {useState} from "react";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";
import { View, StyleSheet, TouchableOpacity, Text } from "react-native";

//================================ Local Imported Files ======================================//

import colors from "../../assets/colors/colors";
import fonts from "../../assets/fonts/fonts";
import Profile from "../../assets/images/user.svg";
import Bill from "../../assets/images/bill.svg";
import Plan from "../../assets/images/plan.svg";
import Payment from "../../assets/images/payment.svg";
import Task from "../../assets/images/task.svg";
import Help from "../../assets/images/help.svg";
import SignOut from "../../assets/images/signout.svg";
import Shield from "../../assets/images/shield.svg";


const SettingTabComponent = (props) => {

    const [index,setIndex] = useState('');

    return (
        <TouchableOpacity
            style={index !== props.index ? styles.container : [styles.container,{backgroundColor:'#1F1F1F',borderRadius:wp(6)}]}
            onPress={() =>  props.onPressCard()}
        >
            <View style={styles.imageView}>
                {props.title === 'Profile' ? <Profile/> : null}
                {props.title === 'Billing' ? <Bill/> : null}
                {props.title === 'Payment & Subscription' ? <Plan/> : null}
                {props.title === 'Payment Methods' ? <Payment/> : null}
                {props.title === 'Task' ? <Task/> : null}
                {props.title === 'Help' ? <Help/> : null}
                {props.title === 'Sign out' ? <SignOut/> : null}
                {props.title === 'Password Update' ? <Shield/> : null}
            </View>
            <View style={styles.nameView}>
                <Text style={[styles.nameText, { fontSize: wp(5) }]} numberOfLines={1}>
                    {props.title}
                </Text>
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        height: hp(6),
        width: wp(90),
        marginVertical: wp(2),
        borderRadius: wp(3),
        alignSelf:'center',
        alignItems: "center",
        flexDirection: "row",
    },
    imageView: {
        height: hp(6),
        width: wp(15),
        justifyContent: "center",
        alignItems: "center",
    },
    imageValue: {
        height: hp(8),
        width: hp(8),
        borderRadius: hp(8),
        resizeMode: "cover",
    },
    nameView: {
        height: hp(6),
        width: wp(50),
        justifyContent: "center",
        alignItems: "flex-start",
    },
    nameText: {
        fontFamily:fonts.regular,
        fontWeight:'400',
        fontSize: wp(4),
        width:wp(70),
        color: colors.white,
    },
});

export default SettingTabComponent;
