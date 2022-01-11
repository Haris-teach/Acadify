//================================ React Native Imported Files ======================================//

import React,{useEffect} from 'react';
import {StatusBar, View} from 'react-native';
import {useDispatch} from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {CommonActions} from "@react-navigation/native";
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from "react-native-responsive-screen";

//================================ Local Imported Files ======================================//

import styles from './style';
import Splash from "../../../assets/images/splash.svg";
import {LANDING_SCREEN, LOGIN_SCREEN, MY_TAB} from "../../../constants/navigators";
import * as ApiDataActions from "../../../../redux/store/actions/ApiData";


const SplashScreen = props => {

    const dispatch = useDispatch();

    useEffect(() => {
        setTimeout(() => {
            props.navigation.dispatch(
                CommonActions.reset({
                    index: 0,
                    routes: [{ name: LOGIN_SCREEN }],
                })
            );
            // getUser();
        },1000)
    },[])


    const getUser = () => {
        AsyncStorage.getItem('user').then((resp) => {
            let value = JSON.parse(resp);
            if(resp){
                dispatch(ApiDataActions.SetLoginData(value));
                dispatch(ApiDataActions.SetUserToken(value.token));
                props.navigation.dispatch(
                    CommonActions.reset({
                        index: 0,
                        routes: [{ name: MY_TAB }],
                    })
                );
            } else {
                props.navigation.dispatch(
                    CommonActions.reset({
                        index: 0,
                        routes: [{ name: LOGIN_SCREEN }],
                    })
                );
            }
        })
    }


    return (
        <View style={styles.mainContainer}>
            <StatusBar hidden={true}/>
            <Splash height={hp(100)} width={wp(100)}/>
        </View>
    );

};

export default SplashScreen;
