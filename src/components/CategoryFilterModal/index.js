//================================ React Native Imported Files ======================================//

import React, {useState} from "react";
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import {View, Text, StyleSheet, TouchableOpacity, FlatList} from "react-native";

//================================ Local Imported Files ======================================//

import colors from "../../assets/colors/colors";
import fonts from "../../assets/fonts/fonts";


const CategoryFilterModal = (props) => {

    const _renderCategoryItems = (item,index) => {
        return(
            <TouchableOpacity
                activeOpacity={0.7}
                style={props.index === index ? [styles.sectionView,{backgroundColor:colors.button_text}] : styles.sectionView}
                onPress={() => {
                    props.onSelect(item,index)
                }}
            >
                <Text style={[styles.headingText,{fontSize:wp(3.6),fontWeight:'400'}]}>{item.name}</Text>
            </TouchableOpacity>
        )
    }


    return (
        <TouchableOpacity
            style={styles.mainContainer}
            activeOpacity={1}
            onPress={() => props.onPressClose()}
        >
            <View style={styles.container}>
                {/*<View style={styles.headingView}>*/}
                {/*    <Text style={styles.headingText}>All Categories</Text>*/}
                {/*</View>*/}
                <View style={styles.listView}>
                    <FlatList
                        data={props.catData}
                        extraData={props.catData}
                        nestedScrollEnabled={true}
                        keyExtractor={(item) => item.id}
                        renderItem={({item,index}) => _renderCategoryItems(item,index)}
                    />
                </View>
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        paddingTop:hp(11),
        alignItems:'flex-end',
        paddingRight:-wp(10),
    },
    container: {
        maxHeight: hp(30),
        width: wp(50),
        backgroundColor: colors.image_background,
        shadowColor: colors.button_text,
        shadowOpacity: 0.8,
        shadowOffset: {
            height: 0.5,
            width: 0.5
        },
    },
    // headingView:{
    //     height: hp(8),
    //     width: wp(50),
    //     justifyContent:"center",
    //     paddingHorizontal:wp(7),
    // },
    headingText:{
        fontFamily:fonts.regular,
        fontWeight:'500',
        fontSize:wp(5),
        color:colors.white
    },
    listView:{
        maxHeight: hp(30),
    },
    sectionView:{
        height: hp(4.2),
        width: wp(50),
        justifyContent:"center",
        paddingLeft:wp(3),
        backgroundColor:colors.image_background
    },
});

export default CategoryFilterModal;
