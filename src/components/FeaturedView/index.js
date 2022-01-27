//================================ React Native Imported Files ======================================//

import React, {useState} from "react";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";
import {View, StyleSheet, Text, ImageBackground, ActivityIndicator} from "react-native";

//================================ Local Imported Files ======================================//

import colors from "../../assets/colors/colors";
import fonts from "../../assets/fonts/fonts";
import Play from "../../assets/images/play_card.svg";

const FeatureComponent = (props) => {

    const [isLoaded,setIsLoaded] = useState(false);
    const [isError,setIsError] = useState(false);
    const [isShowActivity,setIsShowActivity] = useState(true);

    return (
        <View style={styles.container}>
            <View style={styles.upperImageView}>
                <ImageBackground
                    resizeMode={'contain'}
                    borderRadius={wp(7)}
                    source={{uri: props.image}}
                    style={styles.imageViewStyle}
                    imageStyle={styles.imageViewStyle}
                    onLoadEnd={() => setIsLoaded(true)}
                    onError={() => setIsError(true)}
                >
                    {isLoaded !== true ? null : <Play height={40} width={40}/>}
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
            <View style={styles.descriptionView}>
                <Text style={styles.textStyle} numberOfLines={1}>{props.description}</Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        height: hp(16),
        width: wp(90),
        borderRadius:wp(7),
        backgroundColor:colors.image_background
    },
    upperImageView:{
        height: hp(12),
        width: wp(90),
    },
    imageViewStyle: {
        height:'100%',
        width: '100%',
        borderRadius:wp(7),
        justifyContent:'center',
        alignItems:'center'
    },
    descriptionView:{
        height: hp(4),
        width: wp(90),
        justifyContent:'center',
        paddingHorizontal:wp(5),
    },
    textStyle:{
        fontFamily:fonts.regular,
        fontWeight:'400',
        color:colors.white,
        fontSize:wp(3.8)
    }
});

export default FeatureComponent;
