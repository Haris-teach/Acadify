//================================ React Native Imported Files ======================================//

import React, {useState} from 'react';
import {
    Text,
    View,
    StatusBar,
} from 'react-native';

//================================ Local Imported Files ======================================//

import styles from './style';
import colors from '../../../assets/colors/colors';
import images from "../../../assets/images/images";
import CommonStyle from "../../../CommonStyle";
import AppLoading from "../../../components/AppLoading";
import AppHeader from "../../../components/AppHeader";


const ChatThreadListing = props => {

    const [loading,setLoading] = useState(false);

    return (
        <View style={styles.mainContainer}>
            <StatusBar backgroundColor={colors.app_background} />
            {AppLoading.renderLoading(loading)}
            <View style={styles.headerView}>
                <AppHeader
                    leftIconPath={images.back_icon}
                    onLeftIconPress={() => props.navigation.goBack()}
                />
            </View>
            <View style={styles.inputView}>
                <Text style={CommonStyle.headerTextStyle}>Coming Soon...</Text>
            </View>
        </View>
    );
};

export default ChatThreadListing;
