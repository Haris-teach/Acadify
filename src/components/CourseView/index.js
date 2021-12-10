//================================ React Native Imported Files ======================================//

import React, {useState} from "react";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";
import {View, StyleSheet, Text, ImageBackground, ActivityIndicator} from "react-native";

//================================ Local Imported Files ======================================//

import colors from "../../assets/colors/colors";
import fonts from "../../assets/fonts/fonts";
import LockIcon from "../../assets/images/lock_course.svg";

const CourseView = (props) => {

    const [isLoaded,setIsLoaded] = useState(false);
    const [isError,setIsError] = useState(false);
    const [isShowActivity,setIsShowActivity] = useState(true);

    return (
        <View style={[styles.container,{width:props.width}]}>
            <View style={[styles.imageSection,{width:props.width}]}>
                <ImageBackground
                    source={{uri:props.image}}
                    style={styles.imageStyle}
                    imageStyle={styles.imageStyle}
                    onLoadEnd={() => setIsLoaded(true)}
                    onError={() => setIsError(true)}
                >
                    {props.isLock ? <LockIcon height={45} width={45}/> : null}
                    {
                        (isLoaded && !isError) ? null :
                            (isShowActivity && !isError) &&
                            <ActivityIndicator
                                size={'small'}
                                color={colors.button_text}
                            />
                    }
                </ImageBackground>
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
        justifyContent:'center',
        alignItems:'center'
    }
});

export default CourseView;
