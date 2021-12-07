//================================ React Native Imported Files ======================================//

import React from "react";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";
import { View, StyleSheet, Text } from "react-native";

//================================ Local Imported Files ======================================//

import colors from "../../assets/colors/colors";
import fonts from "../../assets/fonts/fonts";


const TaskComponent = (props) => {

    return (
        <View style={ styles.container}>
            <View style={styles.headingView}>
                <Text style={[styles.titleText,{fontSize:wp(4)}]} numberOfLines={2}>Title</Text>
                {/*<Text style={[styles.titleText,{fontSize:wp(3.8),marginTop:wp(2),fontWeight:'400',color:colors.inputColor}]}>Completed</Text>*/}
            </View>
            <View style={[styles.headingView,{width:wp(30)}]}>
                {/*<Text style={[styles.titleText,{fontSize:wp(4)}]} numberOfLines={2}></Text>*/}
                <Text style={[styles.titleText,{fontSize:wp(3.8),marginTop:wp(2),fontWeight:'400',color:colors.inputColor}]}>Completed</Text>
            </View>
            <View style={styles.calView}>
                <Text style={[styles.titleText,{width:wp(30),paddingLeft:wp(2),fontSize:wp(4), color:colors.white,fontWeight:'500'}]} numberOfLines={1}>{props.date}</Text>
            </View>
        </View>
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
        backgroundColor:'red'
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
        fontFamily:fonts.semi,
    },
    imageView: {
        height: hp(10),
        width: wp(30),
        justifyContent:'flex-end',
        alignItems:'center',
        backgroundColor:'red'
    },
    calView: {
        height: hp(10),
        width: wp(31),
        justifyContent:'flex-end',
        alignItems:'center',
        backgroundColor:'yellow'
    },
});

export default TaskComponent;
