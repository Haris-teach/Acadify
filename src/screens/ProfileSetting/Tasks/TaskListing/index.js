//================================ React Native Imported Files ======================================//

import React, {useEffect, useState} from 'react';
import {
    View,
    StatusBar,
    Platform,
    ScrollView,
    KeyboardAvoidingView,
    TouchableOpacity,
    FlatList,
} from 'react-native';
import {useSelector} from "react-redux";
import {useIsFocused} from "@react-navigation/native";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";

//================================ Local Imported Files ======================================//

import styles from './style';
import colors from '../../../../assets/colors/colors';
import ApiHelper from "../../../../api/ApiHelper";
import images from "../../../../assets/images/images";
import {ADD_GOAL} from "../../../../constants/navigators";
import AppLoading from "../../../../components/AppLoading";
import Calendar from "../../../../assets/images/calendar_back.svg";
import AppHeader from "../../../../components/AppHeader";
import Add from "../../../../assets/images/addIcon.svg";
import TasksComponent from "../../../../components/TasksComponent";


const TaskListing = props => {

    const isFocused = useIsFocused();
    const token = useSelector(state => state.ApiData.token);
    const [loading,setLoading]         = useState(false);
    const [items, setItems]            = useState([
        {
            id:0,
        },
        {
            id:1,

        }
    ]);


    useEffect(() => {
        // getTasks();
    },[isFocused])


    const getTasks = () => {
        setLoading(true);
        ApiHelper.getCategories(token,'ACCOUNTABILITY',(response) => {
            if(response.isSuccess){
                if(response.response.data.code === 200){
                    setLoading(false);
                }
            }else {
                setLoading(false);
                console.log('Response',response.response)
            }
        })
    }


    const _renderTasksItems = (item) => {
        return(
            <TasksComponent

            />
        )
    }


    return (
        <View style={styles.mainContainer}>
            <StatusBar backgroundColor={colors.app_background} />
            {AppLoading.renderLoading(loading)}
            <View style={styles.headerView}>
                <AppHeader
                    title={'Task'}
                    leftIconPath={images.back_icon}
                    onLeftIconPress={() => props.navigation.goBack()}
                />
            </View>
            <View style={styles.headingView}>
                <TouchableOpacity activeOpacity={0.7} onPress={() => console.log('Pressed')}>
                    <Calendar/>
                </TouchableOpacity>
                <TouchableOpacity activeOpacity={0.7} style={{paddingLeft: wp(3)}} onPress={() => props.navigation.navigate(ADD_GOAL)}>
                    <Add/>
                </TouchableOpacity>
            </View>
            <View style={styles.inputView}>
                <FlatList
                    data={items}
                    extraData={items}
                    showsVerticalScrollIndicator={false}
                    keyExtractor={(item) => item.id}
                    renderItem={({item}) => _renderTasksItems(item)}
                />
            </View>
        </View>
    );
};

export default TaskListing;
