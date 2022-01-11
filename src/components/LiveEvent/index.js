//================================ React Native Imported Files ======================================//

import React, {useState} from "react";
import {StyleSheet, ImageBackground, Text, TouchableOpacity, View, ActivityIndicator} from "react-native";
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from "react-native-responsive-screen";

//================================ Local Imported Files ======================================//

import colors from "../../assets/colors/colors";
import fonts from "../../assets/fonts/fonts";
import LockIcon from "../../assets/images/lock_course_copy.svg";
import PlayIcon from "../../assets/images/play_copy.svg";

const LiveEvent = (props) => {

    const [isLoaded,setIsLoaded] = useState(false);
    const [isError,setIsError] = useState(false);

    return (
        <TouchableOpacity
            activeOpacity={0.7} style={styles.container}
            onPress={() => props.onPressCourse()}
        >
            <ImageBackground
                imageStyle={styles.imageView}
                style={styles.imageView}
                source={{ uri: props.imgUri }}
                onLoadEnd={() => setIsLoaded(true)}
                onError={() => setIsError(true)}
            >
                {
                    (isLoaded && !isError) ? null :
                        !isError &&
                        <ActivityIndicator
                            size={'small'}
                            color={colors.button_text}
                        />
                }
            </ImageBackground>

            <View style={{ justifyContent: "space-evenly",marginLeft: wp(3),width:wp(55),paddingVertical:wp(5)}}>
                <View style={{justifyContent:'space-between',flexDirection:'row',alignItems:'center',paddingRight:wp(5)}}>
                    <Text style={styles.text} numberOfLines={1}>{props.title.charAt(0).toUpperCase() + props.title.slice(1)}</Text>
                    {props.isLock === true ? <LockIcon height={25} width={25}/> : <PlayIcon height={25} width={25}/>}
                </View>
                <Text style={[styles.text, {fontWeight:'700',fontSize: wp(4),color: colors.sub_heading}]} numberOfLines={1}>{props.day}, {props.date} - {props.time}</Text>
                <Text style={{width:wp(50) ,color: colors.greyTxt}} numberOfLines={2}>{props.description}</Text>
            </View>

        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        width: wp(90),
        height: hp(15),
        flexDirection: "row",
        alignSelf:'center',
        marginVertical:wp(2),
        borderRadius: wp(6),
        backgroundColor: colors.image_background,
    },
    imageView: {
        borderRadius: wp(6),
        height: hp(15),
        width: hp(15),
        justifyContent:'center',
        alignItems:'center',
    },
    text: {
        width:wp(43),
        fontSize:wp(4),
        fontFamily:fonts.semi,
        color: colors.white,
        fontWeight: "700",
    },
});

export default LiveEvent;
