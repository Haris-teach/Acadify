//================================ React Native Imported Files ======================================//

import React, {useState} from "react";
import {StyleSheet, ImageBackground, Text, TouchableOpacity, View, ActivityIndicator} from "react-native";
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from "react-native-responsive-screen";

//================================ Local Imported Files ======================================//

import colors from "../../assets/colors/colors";
import fonts from "../../assets/fonts/fonts";
import LockIcon from "../../assets/images/lock_course.svg";
import PlayIcon from "../../assets/images/play.svg";


const LiveEvent = (props) => {

    const [isLoaded,setIsLoaded] = useState(false);
    const [isError,setIsError] = useState(false);
    const [isShowActivity,setIsShowActivity] = useState(true);

    return (
        <TouchableOpacity activeOpacity={0.7} style={styles.container} onPress={() => props.onPressCourse()}>
            <ImageBackground
                blurRadius={2}
                imageStyle={styles.imageView}
                style={styles.imageView}
                source={{ uri: props.imgUri }}
                onLoadEnd={() => setIsLoaded(true)}
                onError={() => setIsError(true)}
            >
                {props.isLock === true && isLoaded !== false ? <LockIcon height={45} width={45}/> : <PlayIcon height={45} width={45}/>}
                {
                    (isLoaded && !isError) ? null :
                        (isShowActivity && !isError) &&
                        <ActivityIndicator
                            size={'small'}
                            color={colors.button_text}
                        />
                }
            </ImageBackground>

            <View style={{ justifyContent: "space-evenly", marginLeft: wp(3), width:wp(60),paddingVertical:wp(2)}}>
                <Text style={styles.text} numberOfLines={2}>{props.title} </Text>
                <Text style={{width:wp(50) ,color: colors.greyTxt }} numberOfLines={2}>{props.description}</Text>
                <Text style={[styles.text, {fontWeight:'700',fontSize: wp(4) }]} numberOfLines={1}>{props.month}</Text>
                {/*<Text style={[styles.text, { fontWeight: "700", fontSize: wp(5) }]} numberOfLines={1}>{props.price > 0 ? `$ ${props.price/100}` : 'Free' }</Text>*/}
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
        width:wp(50),
        fontSize:wp(4),
        fontFamily:fonts.semi,
        color: colors.white,
        fontWeight: "500",
    },
});

export default LiveEvent;
