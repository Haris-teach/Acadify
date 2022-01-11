//================================ React Native Imported Files ======================================//

import React, {useState} from "react";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";
import { View, StyleSheet, Text } from "react-native";

//================================ Local Imported Files ======================================//

import colors from "../../assets/colors/colors";
import fonts from "../../assets/fonts/fonts";
import Clock from "../../assets/images/clock.svg";
import Calendar from "../../assets/images/calendar.svg";

const JourneyComponent = (props) => {

    const [index,setIndex] = useState('');

    const onPress = (value) => {
        props.onPressCard()
    }

    return (
        <View style={index !== props.index ? [styles.container,{borderBottomWidth:props.index === props.length - 1 ? 0 : 0.25}] : [styles.container,{backgroundColor:'#1F1F1F',borderRadius:wp(6)}]}>
            <View style={styles.headingView}>
                <Text style={styles.titleText} numberOfLines={1}>{props.title}</Text>
                <View style={styles.dateView}>
                    <Clock height={12} width={12}/>
                    <Text style={[styles.titleText,{fontSize:12,marginLeft:wp(2)}]}>{props.time}</Text>
                </View>
                <View style={[styles.dateView,{width:wp(24)}]}>
                    <Calendar height={12} width={12}/>
                    <Text style={[styles.titleText,{fontSize:12,marginLeft:wp(1)}]}>{props.date}</Text>
                </View>
            </View>
            <View style={styles.imageView}>
                <Text style={[styles.titleText,{width:wp(83),fontSize:12,color:colors.date_text}]} >{props.description}</Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        height: hp(13),
        width: wp(85),
        marginVertical: wp(2),
        borderBottomWidth:0.25,
        borderBottomColor:'#929292',
        alignSelf:'center',
    },
    headingView:{
        height:hp(4),
        width:wp(85),
        paddingHorizontal:wp(1),
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
    imageView: {
        height: hp(8),
        width: wp(85),
        paddingHorizontal:wp(1),
        justifyContent: "center",
    },

});

export default JourneyComponent;
