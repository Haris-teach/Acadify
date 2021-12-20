//================================ React Native Imported Files ======================================//

import React, {useEffect, useState} from 'react';
import {
    View,
    StatusBar,
    TouchableOpacity,
    FlatList, Text,
} from 'react-native';
import {useSelector} from "react-redux";
import {useIsFocused} from "@react-navigation/native";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";
import moment from "moment";

//================================ Local Imported Files ======================================//

import styles from './style';
import colors from '../../../../assets/colors/colors';
import ApiHelper from "../../../../api/ApiHelper";
import images from "../../../../assets/images/images";
import {CREATE_TASK, EDIT_TASK,CALENDAR_TASK} from "../../../../constants/navigators";
import AppLoading from "../../../../components/AppLoading";
import Calendar from "../../../../assets/images/calendar_back.svg";
import AppHeader from "../../../../components/AppHeader";
import Add from "../../../../assets/images/addIcon.svg";
import TasksComponent from "../../../../components/TasksComponent";


const TaskListing = props => {

    const isFocused = useIsFocused();
    const token = useSelector(state => state.ApiData.token);
    const [loading,setLoading]         = useState(false);
    const [items, setItems]            = useState([]);


    useEffect(() => {
        getTasks();
    },[isFocused])


    const getTasks = () => {
        setLoading(true);
        ApiHelper.getUserTasks(token,(response) => {
            if(response.isSuccess){
                console.log('data',response.response);
                if(response.response.data.code === 200){
                    setItems(response.response.data.data);
                    setLoading(false);
                }
            }else {
                setLoading(false);
                console.log('Response',response.response)
            }
        })
    }


    const _renderTasksItems = (item) => {
        let date = moment(item.dueDate).format('DD/MM/YYYY');
        return(
            <TasksComponent
                title={item.title}
                priority={item.priority}
                status={item.status}
                dueDate={date}
                onPressTask={() => props.navigation.navigate(EDIT_TASK,{item})}
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
                <TouchableOpacity activeOpacity={0.7} onPress={() => props.navigation.navigate(CALENDAR_TASK)}>
                    <Calendar/>
                </TouchableOpacity>
                <TouchableOpacity activeOpacity={0.7} style={{paddingLeft: wp(3)}} onPress={() => props.navigation.navigate(CREATE_TASK)}>
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
                    ListEmptyComponent={() => {
                        return (
                            <View style={styles.emptySection}>
                                <Text style={[styles.headerTextStyle, {fontSize: wp(5)}]}>No Task Found</Text>
                            </View>
                        )
                    }}
                />
            </View>
        </View>
    );
};

export default TaskListing;
