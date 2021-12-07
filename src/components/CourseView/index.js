//================================ React Native Imported Files ======================================//

import React from "react";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";
import {View, StyleSheet, Text, Image} from "react-native";

//================================ Local Imported Files ======================================//

import colors from "../../assets/colors/colors";
import fonts from "../../assets/fonts/fonts";

const CourseView = (props) => {

    return (
        <View style={[styles.container,{width:props.width}]}>
            <View style={[styles.imageSection,{width:props.width}]}>
                <Image source={{uri:props.image}} style={styles.imageStyle}/>
            </View>
            <View style={[styles.textView,{width:props.width}]}>
                <Text style={styles.nameText} numberOfLines={2}>{props.name}</Text>
                <Text style={[styles.nameText,{color:colors.greyTxt,fontWeight:'300',marginTop:2}]} numberOfLines={1}>{props.ownName}</Text>
                {/*<Text style={[styles.nameText,{color:colors.course_screen,fontWeight:'400'}]} numberOfLines={1}>({props.value})</Text>*/}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        height: hp(20),
        width: wp(42),
        alignSelf:'center',
        borderRadius:wp(6),
    },
    imageSection:{
        height: hp(13),
        width: wp(42),
        borderTopLeftRadius:wp(6),
        borderTopRightRadius:wp(6),
    },
    textView:{
        height: hp(7),
        width: wp(42),
        justifyContent:'center',
        paddingHorizontal:wp(4),
        backgroundColor:colors.image_background,
        borderBottomLeftRadius:wp(6),
        borderBottomRightRadius:wp(6),
    },
    nameText:{
        fontFamily:fonts.regular,
        fontWeight:'500',
        fontSize:wp(3.2),
        color:colors.white
    },
    imageStyle:{
        height:'100%',
        width:'100%',
        borderTopLeftRadius:wp(6),
        borderTopRightRadius:wp(6),
    }
});

export default CourseView;
