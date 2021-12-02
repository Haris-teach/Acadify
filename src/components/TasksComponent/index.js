//================================ React Native Imported Files ======================================//

import React from "react";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";
import { View, StyleSheet, Text } from "react-native";

//================================ Local Imported Files ======================================//

import colors from "../../assets/colors/colors";
import fonts from "../../assets/fonts/fonts";

const TasksComponent = (props) => {

    return (
        <View style={ styles.container}>
            <View style={styles.headingView}>
                <Text style={styles.titleText} numberOfLines={1}>props.title</Text>
            </View>
            <View style={styles.imageView}>
                <Text style={[styles.titleText,{width:wp(35),fontSize:wp(3.6),color:colors.inputColor,fontWeight:'400'}]}>props.description</Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        height: hp(10),
        width: wp(85),
        marginVertical: wp(2),
        borderBottomWidth:0.25,
        borderBottomColor:'#929292',
        justifyContent:'flex-end',
        paddingHorizontal:wp(2),
    },
    headingView:{
        height:hp(4),
        width:wp(81),
        justifyContent:'flex-end',
    },
    titleText:{
        width:wp(40),
        fontSize:16,
        fontWeight:'500',
        color:colors.white,
        fontFamily:fonts.semi,
    },
    imageView: {
        height: hp(5),
        width: wp(81),
        justifyContent:'center'
    },

});

export default TasksComponent;
