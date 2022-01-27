//================================ React Native Imported Files ======================================//

import React from "react";
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import {View, Text, TouchableOpacity, StyleSheet, Platform} from "react-native";

//================================ Local Imported Files ======================================//

import colors from "../../assets/colors/colors";
import fonts from "../../assets/fonts/fonts";


const CourseDropdown = (props) => {

    return (
        <TouchableOpacity
            activeOpacity={1}
            style={styles.mainContainer}
            onPress={() => props.onPressClose()}
        >
            <View style={styles.container}>
                <TouchableOpacity
                    activeOpacity={0.7}
                    style={styles.sectionView}
                    onPress={() => props.onSelect(props.text[0].name)}
                >
                    <Text style={styles.headingText}>{props.text[0].name}</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    activeOpacity={0.7}
                    style={styles.sectionView}
                    onPress={() => props.onSelect(props.text[1].name)}
                >
                    <Text style={styles.headingText}>{props.text[1].name}</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    activeOpacity={0.7}
                    style={styles.sectionView}
                    onPress={() => props.onSelect(props.text[2].name)}
                >
                    <Text style={styles.headingText}>{props.text[2].name}</Text>
                </TouchableOpacity>

                {props.fromCourse ? <TouchableOpacity
                    activeOpacity={0.7}
                    style={styles.sectionView}
                    onPress={() => props.onSelect(props.text[3].name)}
                >
                    <Text style={styles.headingText}>{props.text[3].name}</Text>
                </TouchableOpacity> : null}
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        paddingTop:Platform.OS === 'ios' ? hp(13) : hp(8),
        paddingLeft:wp(10),
    },
    container: {
        maxHeight: hp(18),
        width: wp(40),
        backgroundColor:colors.image_background,
        shadowColor: colors.button_text,
        shadowOpacity: 0.8,
        shadowOffset: {
            height: 0.5,
            width: 0.5
        },
        elevation:10
    },
    sectionView:{
        height: hp(4.5),
        width: wp(40),
        justifyContent:"center",
        paddingLeft:wp(3),
        backgroundColor:colors.image_background
    },
    headingText:{
        fontFamily:fonts.regular,
        fontWeight:'400',
        fontSize:wp(3.6),
        color:colors.white
    },
    listView:{

    }
});

export default CourseDropdown;
