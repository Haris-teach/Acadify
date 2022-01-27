//================================ React Native Imported Files ======================================//

import React from "react";
import {
    Platform,
    StatusBar,
    View,
    KeyboardAvoidingView, ScrollView
} from "react-native";
import { useState } from "react";
import { useSelector } from "react-redux";
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from "react-native-responsive-screen";

//================================ Local Imported Files ======================================//

import styles from "./style";
import CommonStyles from "../../../CommonStyle";
import images from "../../../assets/images/images";
import colors from "../../../assets/colors/colors";
import AppLoading from "../../../components/AppLoading";
import AppHeader from "../../../components/AppHeader";


const ForumDetailListing = ({navigation}) => {

    const token = useSelector((state) => state.ApiData.token);
    let forum = useSelector(state => state.ApiData.forum);
    const [loading, setLoading] = useState(false);


    return (
        <KeyboardAvoidingView
            style={styles.mainContainer}
            behavior={Platform.OS === 'ios' ? 'padding' : null}>
            <StatusBar backgroundColor={colors.image_background} />
            {AppLoading.renderLoading(loading)}
            <ScrollView
                style={[styles.mainContainer,{paddingTop:0}]}>
            <View style={CommonStyles.headerScrollView}>
                <AppHeader
                    leftIconPath={images.back_icon}
                    backgroundColor={colors.image_background}
                    onLeftIconPress={() => navigation.goBack()}
                />
            </View>
            <View style={{height:hp(25),width:wp(100),borderBottomLeftRadius:wp(12),borderBottomRightRadius:wp(12),backgroundColor:colors.image_background}}>

            </View>
            </ScrollView>
        </KeyboardAvoidingView>
    );
};

export default ForumDetailListing;
