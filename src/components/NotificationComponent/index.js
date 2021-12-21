//================================ React Native Imported Files ======================================//

import React from "react";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";
import {StyleSheet, View, Text, Image, TouchableOpacity} from "react-native";

//================================ Local Imported Files ======================================//

import colors from "../../assets/colors/colors";
import fonts from "../../assets/fonts/fonts";
import images from "../../assets/images/images";
import Clock from "../../assets/images/clock.svg";
import Calendar from "../../assets/images/calendar.svg";


const NotificationComponent = (props) => {

    return (
        <TouchableOpacity
            style={props.isSeen ? styles.container : [styles.container,{backgroundColor:'#232428',borderRadius:wp(6)}]}
            activeOpacity={0.7}
            disabled={props.isSeen}
            onPress={() => props.onPress()}
        >
            <View style={styles.leftView}>
                <View style={[styles.circle,{backgroundColor:props.isSeen ? '#8B8B8B' : colors.button_text}]}/>
            </View>
            <View style={styles.imageView}>
               <Image source={props.profile === '' ? images.placeHolder : {uri: props.profile}} style={styles.imageStyle}/>
            </View>
            <View style={styles.mainHeading}>
                <View style={styles.headingView}>
                    <Text style={props.isSeen ? [styles.titleText,{fontWeight:'400',fontFamily:fonts.regular}] : [styles.titleText,{fontWeight:'700',fontFamily:fonts.bold,color:colors.button_text}]} numberOfLines={1}>{props.name}</Text>
                    <View style={[styles.dateView,{width:wp(16)}]}>
                        <Clock height={12} width={12}/>
                        <Text style={[styles.titleText,{fontSize:12,marginLeft:wp(2)}]}>{props.time}</Text>
                    </View>
                    <View style={[styles.dateView,{width:wp(23)}]}>
                        <Calendar height={12} width={12}/>
                        <Text style={[styles.titleText,{fontSize:12,marginLeft:wp(1)}]}>{props.date}</Text>
                    </View>
                </View>
                <View style={styles.rightView}>
                    <Text style={[styles.titleText,{width:wp(64),fontSize:12,color:colors.greyTxt}]}numberOfLines={1} >{props.title}</Text>
                </View>
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        height: hp(10),
        width: wp(90),
        marginVertical: wp(1),
        borderRadius:wp(3),
        alignSelf:'center',
        flexDirection:'row',
    },
    leftView:{
        height: hp(10),
        width: wp(6),
        justifyContent:'center',
        alignItems:'center',
    },
    circle:{
        height:hp(1),
        width:hp(1),
        borderRadius:hp(1),
        backgroundColor:'#8B8B8B'
    },
    imageView: {
        height: hp(10),
        width: wp(18),
        justifyContent: "center",
        paddingLeft:wp(1),
    },
    imageStyle: {
        height: hp(7),
        width: hp(7),
        borderRadius:wp(3),
        resizeMode:'cover'
    },
    mainHeading:{
        height: hp(10),
        width: wp(66),
    },
    headingView:{
        height:hp(5),
        width:wp(64),
        flexDirection:'row',
        alignItems:'flex-end',
    },
    rightView:{
        height:hp(5),
        width:wp(66),
        flexDirection:'row',
        alignItems:'center',
    },
    titleText:{
        width:wp(23),
        fontSize:wp(4),
        fontWeight:'500',
        color:colors.white,
        fontFamily:fonts.semi,
    },
    dateView:{
        height:hp(2),
        width:wp(18),
        borderRadius:wp(3),
        marginRight:wp(1),
        paddingHorizontal:wp(2),
        backgroundColor:colors.date_background,
        flexDirection:'row',
        alignItems:'center',
    },

});

export default NotificationComponent;
