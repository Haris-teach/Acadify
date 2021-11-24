//================================ React Native Imported Files ======================================//

import React from "react";
import {StyleSheet,ImageBackground, Text, TouchableOpacity, View} from "react-native";
import {heightPercentageToDP as hp, widthPercentageToDP as wp} from "react-native-responsive-screen";

//================================ Local Imported Files ======================================//

import colors from "../../assets/colors/colors";
import fonts from "../../assets/fonts/fonts";

const CourseContentView = (props) => {
    return (
        <TouchableOpacity
            activeOpacity={0.7}
            style={styles.container}
            disabled={props.isDisable}
            onPress={() => props.onPressContent()}
        >
            <ImageBackground
                imageStyle={styles.imageView}
                style={styles.imageView}
                source={{ uri: props.image }}
            />
            <View style={styles.textMainView}>
                <Text style={styles.text} numberOfLines={2}>{props.title}</Text>
                <Text style={{ width:wp(50),color: colors.greyTxt,marginTop:wp(2)}} numberOfLines={2}>{props.description}</Text>
            </View>

        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        width: wp(90),
        height: hp(12),
        backgroundColor: colors.image_background,
        borderRadius: wp(6),
        flexDirection: "row",
        alignSelf:'center',
        marginVertical:wp(2)
    },
    imageView: {
        height: hp(12),
        width: hp(13),
        borderRadius: wp(6),
        justifyContent:'center',
        alignItems:'center'
    },
    textMainView:{
        justifyContent: "center",
        marginLeft: wp(3),
        width:wp(60),
        paddingVertical:wp(2)
    },
    text: {
        width:wp(58),
        color: colors.white,
        fontWeight: "700",
        fontSize:wp(4),
        fontFamily:fonts.semi,
    },
});

export default CourseContentView;
