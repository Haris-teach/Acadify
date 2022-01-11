//================================ React Native Imported Files ======================================//

import React, {useState} from "react";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";
import {View, StyleSheet, Text, Image} from "react-native";

//================================ Local Imported Files ======================================//

import colors from "../../assets/colors/colors";
import fonts from "../../assets/fonts/fonts";
import images from "../../assets/images/images";
import Calendar from "../../assets/images/calendar_gold.svg";
import Clock from "../../assets/images/clock_gold.svg";
import Reply from "../../assets/images/replyColor.svg";
import Like from "../../assets/images/likeColor.svg";


const ForumMainComponent = (props) => {

    const [index,setIndex] = useState('');

    const onPress = (value) => {
        props.onPressCard()
    }

    return (
        <View style={index !== props.index ? styles.container : [styles.container,{backgroundColor:'#1F1F1F',borderRadius:wp(6)}]}>

            <View style={styles.headingView}>
                <Image source={props.image !== null ? {uri:props.image} : images.placeHolder} style={{height:hp(4),width:hp(4),resizeMode:'cover',borderRadius:hp(4)}}/>
                <Text style={[styles.titleText,{paddingLeft:wp(2),alignSelf:'center',width:wp(29)}]} numberOfLines={1}>{props.title}</Text>
                <View style={styles.dateView}>
                    <Clock height={12} width={12}/>
                    <Text style={[styles.titleText,{fontSize:12,marginLeft:wp(2)}]}>{props.time}</Text>
                </View>
                <View style={[styles.dateView,{marginLeft:wp(1),width:wp(24),alignSelf:'center'}]}>
                    <Calendar height={12} width={12}/>
                    <Text style={[styles.titleText,{fontSize:12,marginLeft:wp(1)}]}>{props.date}</Text>
                </View>
            </View>

            <View style={styles.headingCenterView}>
                <View style={{ height:hp(9),width:wp(80),justifyContent:"center"}}>
                    <Text style={[styles.titleText,{paddingLeft:wp(2),fontWeight:'700',width:wp(60)}]} numberOfLines={1}>{props.title}</Text>
                    <Text style={[styles.titleText,{paddingLeft:wp(2),fontWeight:'700',color:'#D1D1D1',width:wp(60)}]} numberOfLines={2}>{props.question}</Text>
                </View>
            </View>

            <View style={styles.imageView}>
                <View style={[styles.dateView,{height:hp(3.5),width:wp(30)}]}>
                    <Reply height={16} width={16}/>
                    <Text style={[styles.titleText,{fontSize:wp(4),color:'#A5A5A5',fontWeight:'700',marginLeft:wp(1.5),width:wp(20)}]} numberOfLines={1}>{props.reply.length} Replies</Text>
                </View>
                <View style={[styles.dateView,{marginLeft:wp(2),height:hp(3.5),width:wp(25)}]}>
                    <Like height={16} width={16}/>
                    <Text style={[styles.titleText,{fontSize:wp(4),color:'#A5A5A5',fontWeight:'700',marginLeft:wp(1.5),width:wp(15)}]} numberOfLines={1}>{props.likes.length} Likes</Text>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        alignSelf:'center',
        borderBottomWidth:0.25,
        width: wp(90),
        borderBottomColor:'#929292',
        height: hp(19),
        borderRadius:wp(4),
        marginVertical: wp(2),
        backgroundColor:colors.image_background
    },
    headingView:{
        flexDirection:'row',
        alignItems:'center',
        height:hp(6),
        width:wp(90),
        paddingHorizontal:wp(5),
    },
    headingCenterView:{
        flexDirection:'row',
        alignItems:'center',
        height:hp(8),
        width:wp(90),
        paddingHorizontal:wp(5),
    },
    titleText:{
        width:wp(40),
        fontSize:16,
        fontWeight:'500',
        color:colors.white,
        fontFamily:fonts.semi,
    },
    dateView:{
        flexDirection:'row',
        alignItems:'center',
        height:hp(3),
        width:wp(18),
        borderRadius:wp(3),
        paddingHorizontal:wp(2),
        backgroundColor:colors.date_background,
    },
    imageView: {
        height: hp(4),
        width: wp(90),
        paddingHorizontal:wp(1),
        alignItems: "center",
        justifyContent:'center',
        flexDirection:'row'
    },

});

export default ForumMainComponent;
