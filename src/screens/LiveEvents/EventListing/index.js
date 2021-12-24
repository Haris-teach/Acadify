//================================ React Native Imported Files ======================================//

import React, { useEffect } from "react";
import {
    View,
    Text,
    TouchableOpacity,
    FlatList,
    Modal, StatusBar
} from "react-native";
import { useState } from "react";
import { useSelector } from "react-redux";
import {useIsFocused} from "@react-navigation/native";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";
import moment from "moment";

//================================ Local Imported Files ======================================//

import styles from "./style";
import ApiHelper from "../../../api/ApiHelper";
import AppLoading from "../../../components/AppLoading";
import Search from "../../../assets/images/searchBackground.svg";
import Filter from "../../../assets/images/filterBackground.svg";
import DropArrow from "../../../assets/images/dropdown.svg";
import Button from "../../../components/Button/Button";
import CourseDropdown from "../../../components/CourseDropDwon";
import LiveEvent from "../../../components/LiveEvent";


const LiveEvents = (props) => {

    const isFocused = useIsFocused();
    const token = useSelector((state) => state.ApiData.token);
    let zoom = useSelector(state => state.ApiData.zoom);
    const [loading, setLoading] = useState(false);
    const [dropModal, setDropModal] = useState(false);
    const [lockModal, setLockModal] = useState(false);
    let [coursesData, setCoursesData] = useState([]);
    let [page, setPage] = useState(1);
    let [catText, setCatText] = useState('Live Events');
    let dropText = [
        {
            id:0,
            name:'Live Events'
        },
        {
            id:1,
            name:'Past Events'
        },
        {
            id:2,
            name:'Upcoming Events'
        },
    ];


    useEffect(() => {
        if(zoom){
            setCatText('Live Events');
            setPage(1);
            getLiveEvents('live');
        } else {
            setLockModal(true);
        }
    }, [isFocused]);


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
        if(text === 'Live Events'){
            getLiveEvents('live')
        } else if(text === 'Past Events'){
            getLiveEvents('past')
        } else if(text === 'Upcoming Events'){
            getLiveEvents('schedule')
        }
    };


    const renderCourseItems = (item,index) => {
        let month = moment(item.startDate).format('MM/DD/YYYY')
        return (
            <LiveEvent
                description={item.description}
                startDate={item.startDate}
                isLock={item.isLock}
                imgUri={item.image}
                title={item.title}
                price={item.price}
                date={item.date}
                month={month}
                onPressCourse={() => console.log('Data')}
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
            <StatusBar hidden={true}/>
            <View style={styles.container}>
                {lockModal === false ?
                    <FlatList
                        data={coursesData}
                        extraData={coursesData}
                        onEndReachedThreshold={0}
                        onEndReached={() => LoadMoreRandomData()}
                        keyExtractor={(item) => item.id}
                        // ListEmptyComponent={() => {
                        //     return (
                        //         <View style={styles.emptySection}>
                        //             <Text style={[styles.headerTextStyle, {fontSize: wp(5)}]}>No Events Found</Text>
                        //         </View>
                        //     )
                        // }}
                        ListHeaderComponent={() => {
                            return (
                                <View style={styles.upperView}>
                                    <TouchableOpacity style={styles.headerStyle} onPress={() => setDropModal(!dropModal)}>
                                        <Text style={styles.headerTextStyle}>{catText}</Text>
                                        <View style={styles.dropArrow}>
                                            <DropArrow/>
                                        </View>
                                    </TouchableOpacity>
                                    {/*<View style={styles.filterIcons}>*/}
                                    {/*    <TouchableOpacity activeOpacity={0.7} onPress={() => console.log('Searched')}>*/}
                                    {/*        <Search/>*/}
                                    {/*    </TouchableOpacity>*/}
                                    {/*    <TouchableOpacity activeOpacity={0.7} onPress={() => {*/}
                                    {/*        console.log('Pressed')*/}
                                    {/*        // setModalVisible(!modalVisible)*/}
                                    {/*    }}>*/}
                                    {/*        <Filter/>*/}
                                    {/*    </TouchableOpacity>*/}
                                    {/*</View>*/}
                                </View>
                            )
                        }}
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


            <Modal
                animationType={'none'}
                transparent={true}
                visible={dropModal}
                onRequestClose={() => setDropModal(!dropModal)}
            >
                <CourseDropdown
                    onPressClose={() => setDropModal(!dropModal)}
                    text={dropText}
                    fromCourse={false}
                    onSelect={(text) => {
                        setCatText(text)
                        setDropModal(!dropModal)
                        onSelectType(text)
                    }}
                />
            </Modal>

        </View>
    );
};

export default LiveEvents;
