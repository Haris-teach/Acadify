//================================ React Native Imported Files ======================================//

import React from "react";
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
        // return(
        //
        // )
    }


    return (
        <View style={styles.mainContainer}>
            <View style={styles.container}>
                <View style={styles.headingView}>
                    <Text style={styles.headingText}>All Categories</Text>
                </View>
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
        </View>
    );
};

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: "rgba(0,0,0,0.5)",
        justifyContent:'center',
        alignItems:'center',
    },
    container: {
        height: hp(50),
        width: wp(90),
        backgroundColor: colors.image_background,
        borderRadius: wp(9),
    },
    headingView:{
        height: hp(8),
        width: wp(90),
        justifyContent:"center",
        paddingHorizontal:wp(7),
    },
    headingText:{
        fontFamily:fonts.regular,
        fontWeight:'500',
        fontSize:wp(5),
        color:colors.white
    },
    listView:{

    }
});

export default CategoryFilterModal;
