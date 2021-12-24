//================================ React Native Imported Files ======================================//

import React,{useEffect} from 'react';
import {View} from 'react-native';

//================================ Local Imported Files ======================================//

import styles from './style';
import Splash from "../../../assets/images/splash.svg";
import {LANDING_SCREEN} from "../../../constants/navigators";


const SplashScreen = props => {

    useEffect(() => {
        setTimeout(() => {
            getUser();
        },1000)
    },[])


    const getUser = () => {
        props.navigation.navigate(LANDING_SCREEN);
    }


    return (
        <View style={styles.mainContainer}>
            <Splash/>
        </View>
    );
};

export default SplashScreen;
