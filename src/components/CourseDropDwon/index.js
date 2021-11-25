//================================ React Native Imported Files ======================================//

import React from "react";
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import {View, Text, TouchableOpacity, StyleSheet} from "react-native";

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
                    onPress={() => props.onSelect('All Courses')}
                >
                    <Text style={styles.headingText}>All Courses</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    activeOpacity={0.7}
                    style={styles.sectionView}
                    onPress={() => props.onSelect('Paid Courses')}
                >
                    <Text style={styles.headingText}>Paid Courses</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    activeOpacity={0.7}
                    style={styles.sectionView}
                    onPress={() => props.onSelect('Free Courses')}
                >
                    <Text style={styles.headingText}>Free Courses</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    activeOpacity={0.7}
                    style={styles.sectionView}
                    onPress={() => props.onSelect('Enrolled Courses')}
                >
                    <Text style={styles.headingText}>Enrolled Courses</Text>
                </TouchableOpacity>
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        paddingTop:hp(18),
        paddingLeft:wp(10),
    },
    container: {
        height: hp(18),
        width: wp(40),
        borderRadius: wp(2),
        backgroundColor:colors.image_background,
        shadowColor: colors.button_text,
        shadowOpacity: 0.8,
        shadowOffset: {
            height: 0.5,
            width: 0.5
        },
    },
    sectionView:{
        height: hp(4.5),
        width: wp(40),
        justifyContent:"center",
        alignItems:'center',
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
