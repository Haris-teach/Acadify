//================================ React Native Imported Files ======================================//

import React, {useEffect, useState} from 'react';
import {
    View,
    Text,
    FlatList,
    TouchableOpacity
} from 'react-native';
import {useSelector} from "react-redux";
import {useIsFocused} from "@react-navigation/native";
import moment from "moment";

//================================ Local Imported Files ======================================//

import styles from './style';
import {ADD_GOAL} from "../../constants/navigators";
import ApiHelper from "../../api/ApiHelper";
import Add from "../../assets/images/addIcon.svg";
import AppHeaderNative from "../../components/AppHeaderNative";
import AppLoading from "../../components/AppLoading";
import Search from "../../assets/images/searchBackground.svg";
import Filter from "../../assets/images/filterBackground.svg";
import AccountabilityComponent from "../../components/AccountablitiyCheck";


const GetAccountability = (props) => {

    const isFocused = useIsFocused();
    const token = useSelector(state => state.ApiData.token);
    const [loading,setLoading] = useState(false);
    const [data,setData] = useState([])


    useEffect(() => {
        getGoals()
    }, [isFocused]);



    const getGoals = () => {
        setLoading(true);
        ApiHelper.getGoals(token,(response) => {
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
        return(
            <AccountabilityComponent
                id={item.id}
                index={index}
                progress={item.progress}
                title={item.title}
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
                    onLeftIconPress={() => props.navigation.openDrawer()}
                    onRightIconPress={() => console.log('Data on Ring')}
                />
            </View>
            <View style={styles.listView}>
                <FlatList
                    data={data}
                    extraData={data}
                    ListHeaderComponent={() => {
                        return(
                            <View style={styles.upperView}>
                                <View style={styles.headerStyle}>
                                    <Text style={styles.headerTextStyle}>Accountability</Text>
                                    <View style={styles.filterIcons}>
                                        <TouchableOpacity activeOpacity={0.7} onPress={() => console.log('Searched')}>
                                            <Search/>
                                        </TouchableOpacity>
                                        <TouchableOpacity activeOpacity={0.7} onPress={() =>  console.log('Filter')}>
                                            <Filter/>
                                        </TouchableOpacity>
                                        <TouchableOpacity activeOpacity={0.7} onPress={() => props.navigation.navigate(ADD_GOAL)}>
                                            <Add/>
                                        </TouchableOpacity>
                                    </View>
                                </View>
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

export default GetAccountability;
