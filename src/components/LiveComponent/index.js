//================================ React Native Imported Files ======================================//

import React from "react";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";
import {View, StyleSheet, Text, ImageBackground} from "react-native";

//================================ Local Imported Files ======================================//

import colors from "../../assets/colors/colors";
import fonts from "../../assets/fonts/fonts";
import LiveIcon from "../../assets/images/Live_btn.svg";

const LiveComponent = (props) => {

    return (
        <View style={[styles.container,{width:props.width}]}>
            <View style={[styles.imageSection,{width:props.width}]}>
                <ImageBackground
                    borderRadius={wp(6)}
                    source={{uri:props.image}}
                    style={styles.imageStyle}
                >
                    <View style={[styles.liveView,{width:props.width}]}>
                        <LiveIcon height={15} width={15}/>
                        <Text style={styles.liveText}>Live</Text>
                    </View>
                </ImageBackground>
            </View>
            <View style={[styles.textView,{width:props.width}]}>
                <Text style={styles.nameText} numberOfLines={1}>{props.title}</Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        height: hp(18),
        width: wp(42),
        borderRadius:wp(6),
    },
    imageSection:{
        height: hp(13),
        width: wp(42),
        borderTopLeftRadius:wp(6),
        borderTopRightRadius:wp(6),
        backgroundColor:colors.image_background
    },
    textView:{
        height: hp(5),
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
    },
    liveView:{
        height:hp(6),
        width:wp(42),
        flexDirection:'row',
        alignItems:'center',
        paddingLeft:wp(3),
    },
    liveText:{
        paddingLeft:wp(1),
        fontFamily:fonts.regular,
        fontWeight:'500',
        color:colors.white,
        fontSize:wp(4)
    }
});

export default LiveComponent;
