//================================ React Native Imported Files ======================================//

import React from 'react';
import {StatusBar, View} from 'react-native';

//================================ Local Imported Files ======================================//

import styles from './style';
import AppHeaderNative from "../../components/AppHeaderNative";
import colors from "../../assets/colors/colors";

const CourseScreen = props => {

    return (
        <View style={styles.mainContainer}>
            <StatusBar backgroundColor={colors.app_background} />
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

export default CourseScreen;
