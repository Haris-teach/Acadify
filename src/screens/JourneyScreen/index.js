//================================ React Native Imported Files ======================================//

import React, {useEffect, useState} from 'react';
import {
    View,
    Text,
    FlatList,
    TouchableOpacity
} from 'react-native';
import {useSelector} from "react-redux";
import Toast from "react-native-simple-toast";

//================================ Local Imported Files ======================================//

import styles from './style';
import Add from "../../assets/images/addIcon.svg";
import AppHeaderNative from "../../components/AppHeaderNative";
import {ADD_JOURNEY} from "../../constants/navigators";
import SettingTabComponent from "../../components/SettingTabComponent";
import ApiHelper from "../../api/ApiHelper";
import AppLoading from "../../components/AppLoading";


const JourneyScreen = (props) => {

    const token = useSelector(state => state.ApiData.token);
    const [loading,setLoading] = useState(false);
    const [data,setData] = useState([
        {
            id:0,
            title:'Profile',
        },

    ])


    useEffect(() => {
       getJourney()
    }, []);


    const getJourney = () => {
        setLoading(true);
        ApiHelper.getJourney(token,(response) => {
            if(response.isSuccess){
                if(response.response.data.code === 200){
                    console.log('Response',response.response)
                    setLoading(false);
                    setTimeout(() => {
                        Toast.show('Journey Successfully Created',Toast.LONG)
                    },200)
                }
            }else {
                setLoading(false);
                console.log('Response',response.response)
            }
        })
    }


    const renderItems = (item,index) => {
        return(
            <SettingTabComponent
                id={item.id}
                index={index}
                title={item.title}
                onPressCard={() => console.log(item)}
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
