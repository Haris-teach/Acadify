//================================ React Native Imported Files ======================================//

import React from "react";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";
import {View, StyleSheet, Text, ImageBackground} from "react-native";

//================================ Local Imported Files ======================================//

import colors from "../../assets/colors/colors";
import fonts from "../../assets/fonts/fonts";
import Play from "../../assets/images/play_card.svg";

const FeatureComponent = (props) => {
    return (
        <View style={styles.container}>
            <View style={styles.upperImageView}>
                <ImageBackground
                    resizeMode={'contain'}
                    borderRadius={wp(7)}
                    source={{uri: props.image}}
                    style={styles.imageViewStyle}
                >
                    <Play height={40} width={40}/>
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
