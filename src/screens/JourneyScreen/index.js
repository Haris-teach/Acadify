//================================ React Native Imported Files ======================================//

import React, {useEffect, useState} from 'react';
import {
    View,
    Text,
    FlatList,
    TouchableOpacity
} from 'react-native';
import {useSelector} from "react-redux";
import moment from "moment";
import {useIsFocused} from "@react-navigation/native";

//================================ Local Imported Files ======================================//

import styles from './style';
import {ADD_JOURNEY} from "../../constants/navigators";
import ApiHelper from "../../api/ApiHelper";
import JourneyComponent from "../../components/JourneyComponent";
import Add from "../../assets/images/addIcon.svg";
import AppHeaderNative from "../../components/AppHeaderNative";
import AppLoading from "../../components/AppLoading";


const JourneyScreen = (props) => {

    const isFocused = useIsFocused();
    const token = useSelector(state => state.ApiData.token);
    const [loading,setLoading] = useState(false);
    const [data,setData] = useState([])


    useEffect(() => {
       getJourney()
    }, [isFocused]);


    const getJourney = () => {
        setLoading(true);
        ApiHelper.getJourney(token,(response) => {
            if(response.isSuccess){
                if(response.response.data.code === 200){
                    console.log('Response',response.response.data.data.docs)
                    setData(response.response.data.data.docs)
                    setLoading(false);
                }
            }else {
                setLoading(false);
                console.log('Response',response.response)
            }
        })
    }


    const renderItems = (item,index) => {
        let date = moment(item.createdAt).format('DD/MM/YYYY');
        let time = moment(item.createdAt).format('HH:MM')
        return(
            <JourneyComponent
                id={item.id}
                index={index}
                title={item.title}
                time={time}
                date={date}
                description={item.description}
            />
        )
    }


    return (
        <View style={styles.mainContainer}>
            {AppLoading.renderLoading(loading)}
            <View style={styles.headerView}>
                <AppHeaderNative
                    leftIconPath={true}
                    rightIconOnePath={true}
                    onLeftIconPress={() => console.log('Drawer')}
                    onRightIconPress={() => console.log('Data on Ring')}
                />
            </View>
            <View style={styles.listView}>
                <FlatList
                    data={data}
                    extraData={data}
                    ListHeaderComponent={() => {
                        return(
                            <View style={styles.headerStyle}>
                                <Text style={styles.headerTextStyle}>Journey</Text>
                                <TouchableOpacity activeOpacity={0.7} onPress={() => props.navigation.navigate(ADD_JOURNEY)}>
                                    <Add/>
                                </TouchableOpacity>
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

export default JourneyScreen;
