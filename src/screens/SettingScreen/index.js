//================================ React Native Imported Files ======================================//

import React, {useState} from 'react';
import {
    View,
    Text,
    FlatList,
    Alert,
} from 'react-native';
import {useDispatch} from 'react-redux';

//================================ Local Imported Files ======================================//

import styles from './style';
import SettingTabComponent from "../../components/SettingTabComponent";
import AppHeader from "../../components/AppHeader";
import {CommonActions} from "@react-navigation/native";
import {LOGIN_SCREEN, PROFILE_SCREEN} from "../../constants/navigators";
import * as ApiDataActions from "../../../redux/store/actions/ApiData";


const SettingScreen = props => {

    const dispatch = useDispatch();
    const [data,setData] = useState([
        {
            id:0,
            title:'Profile',
        },
        {
            id:1,
            title:'Billing'
        },
        {
            id:2,
            title:'Change Plan'
        },
        {
            id:3,
            title:'Payment Methods'
        },
        {
            id:4,
            title:'Task'
        },
        {
            id:5,
            title:'Help'
        },
        {
            id:6,
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

        } else if(item.id === 2){

        } else if(item.id === 3){

        } else if(item.id === 4){

        } else if(item.id === 5){

        } else if(item.id === 6){
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
                        dispatch(ApiDataActions.SetLoginData(''));
                        props.navigation.dispatch(
                            CommonActions.reset({
                                index: 0,
                                routes: [{name: LOGIN_SCREEN}],
                            }),
                        );
                    }
                },
            ]
        );
    }


    return (
        <View style={styles.mainContainer}>
            <View style={styles.headerView}>

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
