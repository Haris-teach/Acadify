//================================ React Native Imported Files ======================================//

import React, { useEffect } from "react";
import {
    View,
    Text,
    Modal,
    FlatList,
    TouchableOpacity,
} from "react-native";
import { useState } from "react";
import { useSelector } from "react-redux";
import Toast from "react-native-simple-toast";
import {heightPercentageToDP as hp, widthPercentageToDP as wp} from "react-native-responsive-screen";
import moment from "moment";

//================================ Local Imported Files ======================================//

import styles from "./style";
import ApiHelper from "../../../api/ApiHelper";
import AppLoading from "../../../components/AppLoading";
import Search from "../../../assets/images/searchBackground.svg";
import DropArrow from "../../../assets/images/dropdown.svg";
import Add from "../../../assets/images/addIcon.svg";
import Refresh from "../../../assets/images/refresh.svg";
import CourseDropdown from "../../../components/CourseDropDwon";
import ForumMainComponent from "../../../components/ForumMainComponent";
import Button from "../../../components/Button/Button";
import {PLAN_SCREEN} from "../../../constants/navigators";


const ForumListing = ({navigation}) => {

    const token = useSelector((state) => state.ApiData.token);
    let forum = useSelector(state => state.ApiData.forum);
    const [loading, setLoading] = useState(false);
    const [dropModal, setDropModal] = useState(false);
    const [lockModal, setLockModal] = useState(false);
    let [page, setPage] = useState(1);
    let [pageLength, pagePageLength] = useState(1);
    let [coursesData, setCoursesData]   = useState([]);
    let [catText, setCatText] = useState('All Forum');
    let dropText = [
        {
            id:0,
            name:'All Forum'
        },
        {
            id:1,
            name:'Open'
        },
        {
            id:2,
            name:'Close'
        },
    ];


    useEffect(() => {
        return navigation.addListener('focus', () => {
            if(forum){
                setLockModal(false)
                setCatText('All Forum');
                setPage(1);
                getAllResources();
            } else {
                setLockModal(true)
            }
        });
    }, [navigation]);


    const getAllResources = () => {
        setLoading(true);
        ApiHelper.getAllForum(token, (response) => {
            if (response.isSuccess) {
                if (response.response.data.code === 200) {
                    console.log("Success of Forum ==>", response.response.data);
                    setCoursesData(response.response.data.data.docs);
                    pagePageLength(response.response.data.data.pages);
                    setLoading(false);
                } else {
                    console.log("Error inner ==>", response.response.data);
                }
            } else {
                setLoading(false);
                console.log("Error ==>", response.response);
            }
        });
    };


    const onSelectType = (text) => {
        let url;
        if(text === 'All Forum'){
            getAllResources();
        } else if(text === 'Open'){
            url = '/api/v1/forum/getall/?key=1';
        } else if(text === 'Close'){
            url = '/api/v1/forum/getall/?key=0';
        }
        setLoading(true);
        ApiHelper.getResourceTypes(token,url, (response) => {
            if (response.isSuccess) {
                if (response.response.data.code === 200) {
                    console.log("Success ==>", response.response.data);
                    setCoursesData(response.response.data.data.docs);
                    setLoading(false);
                } else {
                    console.log("Error inner ==>", response.response.data);
                }
            } else {
                setLoading(false);
                console.log("Error ==>", response.response);
            }
        });
    };


    const renderResourceItems = (item,index) => {
        let date = moment(item.createdAt).format('DD/MM/YYYY');
        let time = moment(item.createdAt).format('hh:mm');
        return (
            <ForumMainComponent
                id={item.id}
                title={item.title}
                image={item.User.profilePictureURL}
                url={item.contentUrl}
                date={date}
                time={time}
                index={index}
                likes={item.ForumLikes}
                reply={item.Replies}
                question={item.question}
                onPressContent={(title,value) => console.log(title,value)}
            />
        );
    }


    const LoadMoreRandomData = () => {
        if(page < pageLength) {
            setPage(page = page + 1);
            setMoreData();
        }
    }


    const setMoreData = () => {
        // setLoading(true);
        // ApiHelper.getResourceData(token,page,(response) => {
        //     if (response.isSuccess) {
        //       setCoursesData(coursesData = page === 2 ? response.response.data.data.docs : [...coursesData, ...response.response.data.data.docs]);
        //       setLoading(false);
        //   }else{
        //     setLoading(false);
        //         console.log('Response error',response.response)
        //   }
        // })
    }


    return (
        <View style={styles.mainContainer}>
            {AppLoading.renderLoading(loading)}

            <View style={styles.container}>
                {lockModal === false ?
                    <FlatList
                    data={coursesData}
                    extraData={coursesData}
                    onEndReachedThreshold={0}
                    onEndReached={() => LoadMoreRandomData()}
                    keyExtractor={(item) => item.id}
                    ListHeaderComponent={() => {
                        return(
                            <View style={styles.upperView}>
                                <TouchableOpacity style={styles.headerStyle}  onPress={() => setDropModal(!dropModal)}>
                                    <Text style={styles.headerTextStyle}>{catText}</Text>
                                    <View style={styles.dropArrow}>
                                        <DropArrow/>
                                    </View>
                                </TouchableOpacity>
                                <View style={styles.filterIcons}>
                                    <TouchableOpacity activeOpacity={0.7} onPress={() => console.log('Searched')}>
                                        <Search/>
                                    </TouchableOpacity>
                                    <TouchableOpacity activeOpacity={0.7} onPress={() => console.log('Refresh')}>
                                        <Refresh/>
                                    </TouchableOpacity>
                                    <TouchableOpacity activeOpacity={0.7} onPress={() => console.log('Add New')}>
                                        <Add/>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        )
                    }}
                    renderItem={({item,index}) => renderResourceItems(item,index)}
                />:
                    <View style={styles.upgradePlan}>
                        <Text style={[styles.headerTextStyle,{fontSize:wp(6),fontWeight:'500',textAlign:'center'}]}>Upgrade Your Plan To Get Access</Text>
                        <View style={{marginTop:hp(2)}}>
                            <Button
                                buttonText={'UPGRADE PLAN'}
                                width={wp(50)}
                                onPress={() => navigation.navigate(PLAN_SCREEN,{fromChange:true})}
                            />
                        </View>
                    </View>}
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

export default ForumListing;
