//================================ React Native Imported Files ======================================//

import React from "react";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";
import {View, StyleSheet, Text, TouchableOpacity} from "react-native";

//================================ Local Imported Files ======================================//

import colors from "../../assets/colors/colors";
import fonts from "../../assets/fonts/fonts";
import Calendar from "../../assets/images/calendar.svg";


const TaskComponent = (props) => {

    return (
        <TouchableOpacity
            style={ styles.container}
            activeOpacity={0.7}
            onPress={() => props.onPressTask()}
        >
            <View style={[styles.headingView,{paddingHorizontal:wp(3)}]}>
                <Text style={[styles.titleText,{fontSize:wp(4),width:wp(84)}]} numberOfLines={2}>{props.title}</Text>
            </View>
            <View style={[styles.headingView,{flexDirection:'row',alignItems:'center',justifyContent:'space-between',width:wp(84)}]}>
                <Text style={[styles.titleText,{fontSize:wp(3.6),fontWeight:'400',width:wp(25),color:colors.inputColor,}]}>{props.status}</Text>
                <Text style={[styles.titleText,{fontSize:wp(3.6),fontWeight:'400',color:colors.inputColor,width:wp(25)}]}>{props.priority}</Text>
                <View style={[styles.dateView,{width:wp(24)}]}>
                    <Calendar height={12} width={12}/>
                    <Text style={[styles.titleText,{fontSize:12,marginLeft:wp(1)}]}>{props.dueDate}</Text>
                </View>
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        height: hp(10),
        width: wp(90),
        marginBottom: wp(2),
        borderBottomWidth:0.25,
        borderBottomColor:'#929292',
        paddingHorizontal:wp(2),
        alignSelf:"center",
        alignItems:'center',
    },
    headingView:{
        height:hp(5),
        width:wp(90),
        justifyContent:'center',
    },
    dateView:{
        height:hp(3),
        width:wp(18),
        borderRadius:wp(3),
        paddingHorizontal:wp(2),
        backgroundColor:colors.date_background,
        flexDirection:'row',
        alignItems:'center',
    },
    numberView:{
        height:hp(6),
        width:hp(6),
        borderRadius:hp(2),
        backgroundColor:colors.image_background,
        justifyContent:"center",
        alignItems:'center',
    },
    titleText:{
        fontWeight:'500',
        color:colors.white,
        fontFamily:fonts.regular,
    },
    imageView: {
        height: hp(10),
        width: wp(30),
        justifyContent:'flex-end',
        alignItems:'center',
    },
    calView: {
        height: hp(10),
        width: wp(31),
        justifyContent:'flex-end',
        alignItems:'center',
    },
});

export default TaskComponent;
