//================================ React Native Imported Files ======================================//

import React, {useEffect, useState} from "react";
import {FlatList, Text, TouchableOpacity, View,} from "react-native";
import {useSelector} from "react-redux";
import {heightPercentageToDP as hp, widthPercentageToDP as wp} from "react-native-responsive-screen";
import moment from "moment";

//================================ Local Imported Files ======================================//

import styles from "./style";
import ApiHelper from "../../../api/ApiHelper";
import colors from "../../../assets/colors/colors";
import {EVENTS_DETAILS} from "../../../constants/navigators";
import AppLoading from "../../../components/AppLoading";
import Button from "../../../components/Button/Button";
import LiveEvent from "../../../components/LiveEvent";


const LiveEvents = ({navigation}) => {

    const token = useSelector((state) => state.ApiData.token);
    let zoom = useSelector(state => state.ApiData.zoom);
    const [loading, setLoading] = useState(false);
    const [lockModal, setLockModal] = useState(false);
    let [coursesData, setCoursesData] = useState([]);
    let [page, setPage] = useState(1);
    let [catText, setCatText] = useState('Live');


    useEffect(() => {
        return navigation.addListener('focus', () => {
            if (zoom) {
                setCatText('Live');
                setPage(1);
                getLiveEvents('live');
            } else {
                setLockModal(true);
            }
        });
    }, [navigation]);


    const getLiveEvents = (type) => {
        setLoading(true);
        let tempArray = [];
        let url=`/api/v1/zoom/getAll?type=${type}`;
        ApiHelper.getEvents(token,url,(response) => {
            if (response.isSuccess) {
                if (response.response.data.code === 200) {
                    console.log('Events ==>',response.response.data)
                    response.response.data.data.docs.map((value) => {
                        if(value.Zoomprices[0].isFree === true){
                            tempArray.push({
                                isLock:false,
                                id:value.id,
                                title:value.title,
                                date:value.date,
                                link:value.link,
                                description:value.description,
                                image:value.thumbnailURL,
                                price:value.Zoomprices[0].price,
                                startDate:value.startDate
                            })
                        }else{
                            if(value.ZoomUsers.length > 0 && value.ZoomUsers[0].paid){
                                tempArray.push({
                                    isLock:false,
                                    id:value.id,
                                    title:value.title,
                                    date:value.date,
                                    link:value.link,
                                    description:value.description,
                                    image:value.thumbnailURL,
                                    price:value.Zoomprices[0].price,
                                    startDate:value.startDate
                                })
                            }else{
                                tempArray.push({
                                    isLock:true,
                                    id:value.id,
                                    title:value.title,
                                    date:value.date,
                                    link:value.link,
                                    description:value.description,
                                    image:value.thumbnailURL,
                                    price:value.Zoomprices[0].price,
                                    startDate:value.startDate
                                })
                            }
                        }
                    })
                    setCoursesData(tempArray);
                    setLoading(false);
                } else {
                    console.log("Error inner ==>", response.response.data);
                }
            } else {
                setLoading(false);
                console.log("Error in ==>", response.response.response);
            }
        });
    };


    const onSelectType = (text) => {
        if(text === 'Live'){
            setCatText('Live');
            getLiveEvents('live')
        } else if(text === 'Past'){
            setCatText('Past')
            getLiveEvents('past')
        } else if(text === 'Upcoming'){
            setCatText('Upcoming')
            getLiveEvents('schedule')
        }
    };


    const renderCourseItems = (item,index) => {
        let month = moment(item.startDate).format('MM/DD/YYYY')
        let day = moment(item.startDate).format('ddd')
        let time = moment(item.startDate).format('HH:mm')
        return (
            <LiveEvent
                description={item.description}
                startDate={item.startDate}
                isLock={item.isLock}
                imgUri={item.image}
                title={item.title}
                price={item.price}
                date={item.date}
                day={day}
                time={time}
                month={month}
                onPressCourse={() => navigation.navigate(EVENTS_DETAILS,{item})}
            />
        );
    }


    const LoadMoreRandomData = () => {
        setPage(page = page + 1);
        setMoreData();
    }


    const setMoreData = () => {

    }


    return (
        <View style={styles.mainContainer}>
            {AppLoading.renderLoading(loading)}
            <View style={styles.headingView}>
                <Text style={styles.headingText}>Live Events</Text>
            </View>
            {lockModal === false ? <View style={styles.upperView}>
                <TouchableOpacity
                    style={catText === 'Live' ? [styles.headerStyle, {backgroundColor: colors.button_text}] : styles.headerStyle}
                    onPress={() => onSelectType('Live')}
                >
                    <Text
                        style={catText === 'Live' ? [styles.headerTextStyle, {color: colors.white}] : styles.headerTextStyle}>Live</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={catText === 'Past' ? [styles.headerStyle, {backgroundColor: colors.button_text}] : styles.headerStyle}
                    onPress={() => onSelectType('Past')}
                >
                    <Text
                        style={catText === 'Past' ? [styles.headerTextStyle, {color: colors.white}] : styles.headerTextStyle}>Past</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={catText === 'Upcoming' ? [styles.headerStyle, {backgroundColor: colors.button_text}] : styles.headerStyle}
                    onPress={() => onSelectType('Upcoming')}
                >
                    <Text
                        style={catText === 'Upcoming' ? [styles.headerTextStyle, {color: colors.white}] : styles.headerTextStyle}>Upcoming</Text>
                </TouchableOpacity>
            </View> : null}
            <View style={styles.container}>
                {lockModal === false ?
                    <FlatList
                        data={coursesData}
                        extraData={coursesData}
                        onEndReachedThreshold={0}
                        onEndReached={() => LoadMoreRandomData()}
                        keyExtractor={(item) => item.id}
                        renderItem={({item, index}) => renderCourseItems(item, index)}
                    /> :
                    <View style={styles.upgradePlan}>
                        <Text style={[styles.headerTextStyle,{fontSize:wp(6),fontWeight:'500',textAlign:'center'}]}>Upgrade Your Plan To Get Access</Text>
                        <View style={{marginTop:hp(2)}}>
                            <Button
                                buttonText={'UPGRADE PLAN'}
                                width={wp(50)}
                                onPress={() => console.log('Plan Upgrade')}
                            />
                        </View>
                    </View>
                }
            </View>

        </View>
    );
};

export default LiveEvents;
