//================================ React Native Imported Files ======================================//

import React, {useState} from 'react';
import {
    View,
    Text,
    Alert,
    FlatList,
    StatusBar,
} from 'react-native';
import {useDispatch} from 'react-redux';
import {CommonActions} from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

//================================ Local Imported Files ======================================//

import styles from './style';
import SettingTabComponent from "../../../components/SettingTabComponent";
import {
    BILLING_LISTING,
    PASSWORD_UPDATE,
    PAYMENT_SCREEN,
    PROFILE_SCREEN,
    LOGIN_SCREEN,
} from "../../../constants/navigators";
import colors from "../../../assets/colors/colors";
import images from "../../../assets/images/images";
import * as ApiDataActions from "../../../../redux/store/actions/ApiData";
import AppHeader from "../../../components/AppHeader";


const SettingScreen = (props) => {

    const dispatch = useDispatch();
    const [data,setData] = useState([
        {
            id:0,
            title:'Profile',
        },
        {
            id:1,
            title:'Payment & Subscription'
        },
        {
            id:2,
            title:'Payment Methods'
        },
        {
            id:3,
            title:'Password Update'
        },
        {
            id:4,
            title:'Sign out'
        },
    ])


    const renderItems = (item,index) => {
        return(
            <SettingTabComponent
                id={item.id}
                index={index}
                title={item.title}
                onPressCard={() => onPressCard(item)}
            />
        )
    }


    const onPressCard = (item) => {
        if(item.id === 0){
            props.navigation.navigate(PROFILE_SCREEN)
        } else if(item.id === 1){
            props.navigation.navigate(BILLING_LISTING)
        } else if(item.id === 2){
            props.navigation.navigate(PAYMENT_SCREEN)
        } else if(item.id === 3){
            props.navigation.navigate(PASSWORD_UPDATE)
        } else if(item.id === 4){
            onSignOut();
        }
    }


    const onSignOut = () => {
        Alert.alert(
            "Sign out",
            "Are you sure you want to Sign out?",
            [
                {
                    text: "No",
                    onPress: () => console.log("Cancel Pressed"),
                    style: "cancel"
                },
                {
                    text: "Yes",
                    onPress: () => {
                        props.navigation.dispatch(
                            CommonActions.reset({
                                index: 0,
                                routes: [{name: LOGIN_SCREEN}],
                            }),
                        );
                        AsyncStorage.clear();
                        dispatch(ApiDataActions.SetLoginData(''));
                        dispatch(ApiDataActions.SetUserResource(false));
                        dispatch(ApiDataActions.SetUserGoal(false));
                        dispatch(ApiDataActions.SetUserJourney(false));
                        dispatch(ApiDataActions.SetUserCourse(false));
                        dispatch(ApiDataActions.SetUserZoom(false));
                        dispatch(ApiDataActions.SetUserForum(false));
                        dispatch(ApiDataActions.SetDashboard(false));
                    }
                },
            ]
        );
    }



    return (
        <View style={styles.mainContainer}>
            <StatusBar backgroundColor={colors.app_background} />
            <View style={styles.headerView}>
                <AppHeader
                    leftIconPath={images.back_icon}
                    onLeftIconPress={() => props.navigation.goBack()}
                />
            </View>
            <View style={styles.listView}>
                <FlatList
                    data={data}
                    extraData={data}
                    ListHeaderComponent={() => {
                        return(
                            <View style={styles.headerStyle}>
                                <Text style={styles.headerTextStyle}>Account Settings</Text>
                            </View>
                        )
                    }}
                    keyExtractor={(item) => item.id}
                    renderItem={({item,index}) => renderItems(item,index)}
                />
            </View>
        </View>
    );
};

export default SettingScreen;
