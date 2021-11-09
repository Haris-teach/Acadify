//================================ React Native Imported Files ======================================//

import React from 'react';
import {View} from 'react-native';

//================================ Local Imported Files ======================================//

import styles from './style';
import AppHeaderNative from "../../components/AppHeaderNative";

const VideoScreen = props => {

    return (
        <View style={styles.mainContainer}>
            <View style={styles.headerView}>
                <AppHeaderNative
                    leftIconPath={true}
                    rightIconOnePath={true}
                    onLeftIconPress={() => props.navigation.openDrawer()}
                    onRightIconPress={() => console.log('Data on Ring')}
                />
            </View>
        </View>
    );
};

export default VideoScreen;
