//================================ React Native Imported Files ======================================//

import React, {useEffect, useState} from 'react';
import {
    View,
    Text,
    FlatList,
    StatusBar,
} from 'react-native';
import {useSelector} from "react-redux";
import moment from "moment";

//================================ Local Imported Files ======================================//

import styles from './style';
import colors from "../../assets/colors/colors";
import images from "../../assets/images/images";
import AppHeader from "../../components/AppHeader";
import ApiHelper from "../../api/ApiHelper";
import AppLoading from "../../components/AppLoading";
import NotificationComponent from "../../components/NotificationComponent";
import {widthPercentageToDP as wp} from "react-native-responsive-screen";


const NotificationScreen = (props) => {

    const token = useSelector(state => state.ApiData.token);
    let [notification,setNotification] = useState([])
    let [page,setPage] = useState(1)
    const [loading,setLoading] = useState(false)


    useEffect(() => {
        setPage(1);
        setNotification([])
        getNotifications();
    },[])


    const getNotifications = () => {
        setLoading(true);
        ApiHelper.getNotifications(token,page,(response) => {
            if(response.isSuccess){
                if(response.response.data.code === 200){
                    // console.log('DATA',response.response.data.data.docs)
                    setNotification(notification = page === 1 ? response.response.data.data.docs : [...notification, ...response.response.data.data.docs]);
                    setLoading(false);
                }
            }else {
                setLoading(false);
                console.log('Response',response.response.data)
            }
        })
    }


    const renderItems = (item,index) => {
        let date = moment(item.createdAt).format('DD/MM/YYYY');
        let time = moment(item.createdAt).format('HH:mm')
        return(
            <NotificationComponent
                name={item.Notification?.username}
                title={item.Notification?.title}
                isSeen={item.isseen}
                profile={item.Notification?.profileurl}
                time={time}
                date={date}
                onPress={() => onPressItems(item,index)}
            />
        )
    }


    const onPressItems = (item,index) => {
        ApiHelper.getNotificationsSeen(token,item.id,(response) => {
            if(response.isSuccess){
                if(response.response.data.code === 200){
                    let newArray=notification;
                    newArray[index].isseen = !item.isseen;
                    setNotification(() => {
                        return[...newArray];
                    });
                }
            }else {
                setLoading(false);
                console.log('Response',response.response.data)
            }
        })
    }


    const LoadMoreRandomData = () => {
        setPage(page = page + 1);
        getNotifications();
    }


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
            <View style={styles.listView}>
                <FlatList
                    data={notification}
                    extraData={notification}
                    onEndReachedThreshold={0}
                    onEndReached={() => LoadMoreRandomData()}
                    ListEmptyComponent={() => {
                        return (
                            <View style={styles.emptySection}>
                                <Text style={[styles.headerTextStyle, {fontSize: wp(5)}]}>No Record Found</Text>
                            </View>
                        )
                    }}
                    ListHeaderComponent={() => {
                        return(
                            <View style={styles.headerStyle}>
                                <Text style={styles.headerTextStyle}>Notifications</Text>
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

export default NotificationScreen;
