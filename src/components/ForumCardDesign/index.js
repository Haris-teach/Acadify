//================================ React Native Imported Files ======================================//

import React from "react";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";
import {View, StyleSheet, Text, Image} from "react-native";

//================================ Local Imported Files ======================================//

import colors from "../../assets/colors/colors";
import fonts from "../../assets/fonts/fonts";
import Clock from "../../assets/images/clock_gold.svg";
import Calendar from "../../assets/images/calendar_gold.svg";
import images from "../../assets/images/images";


const ForumComponent = (props) => {
    return (
        <View style={styles.container}>
            <View style={styles.upperImageView}>
                <View style={styles.userDetails}>
                    <Image source={props.image !== 'null' ? {uri:props.image} : images.placeHolder } style={styles.userImage}/>
                    <Text style={[styles.textStyle,{width:wp(20),paddingLeft:5}]} numberOfLines={1}>{props.name}</Text>
                </View>
                <View style={styles.dateMainView}>
                    <View style={styles.dateView}>
                        <Clock height={12} width={12}/>
                        <Text style={[styles.titleText,{fontSize:12,marginLeft:wp(2)}]}>{props.time}</Text>
                    </View>
                    <View style={[styles.dateView,{width:wp(24)}]}>
                        <Calendar height={12} width={12}/>
                        <Text style={[styles.titleText,{fontSize:12,marginLeft:wp(1)}]}>{props.date}</Text>
                    </View>
                </View>
            </View>
            <View style={styles.descriptionView}>
                <Text style={[styles.textStyle,{color:colors.greyTxt}]} numberOfLines={3}>{props.title}</Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        height: hp(17),
        width: wp(90),
        borderRadius:wp(7),
        backgroundColor:colors.image_background
    },
    upperImageView:{
        height: hp(8),
        width: wp(90),
        flexDirection:'row',
        alignItems:'center',
    },
    userDetails:{
        height: hp(8),
        width: wp(40),
        justifyContent:'center',
        flexDirection:'row',
        alignItems:'center',
    },
    userImage: {
        height:hp(5),
        width: hp(5),
        borderRadius:hp(5),
        resizeMode:'cover'
    },
    descriptionView:{
        height: hp(9),
        width: wp(90),
        paddingTop:hp(1),
        paddingHorizontal:wp(6),
    },
    textStyle:{
        fontFamily:fonts.regular,
        fontWeight:'400',
        color:colors.white,
        fontSize:wp(3.8)
    },
    dateMainView:{
        height: hp(8),
        width: wp(50),
        justifyContent:'center',
        flexDirection:'row',
        alignItems:'center',
    },
    dateView:{
        height:hp(3),
        width:wp(18),
        borderRadius:wp(3),
        marginRight:wp(1),
        paddingHorizontal:wp(2),
        backgroundColor:colors.date_background,
        flexDirection:'row',
        alignItems:'center',
    },
    titleText:{
        width:wp(40),
        fontSize:16,
        fontWeight:'500',
        color:colors.white,
        fontFamily:fonts.semi,
    },
});

export default ForumComponent;
