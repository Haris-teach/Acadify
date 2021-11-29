//================================ React Native Imported Files ======================================//

import React, { useEffect } from "react";
import {
    View,
    Text,
    TouchableOpacity,
    FlatList,
    Modal, Platform, Linking
} from "react-native";
import { useState } from "react";
import { useSelector } from "react-redux";
import {useIsFocused} from "@react-navigation/native";
import Toast from "react-native-simple-toast";
import RNFetchBlob from 'rn-fetch-blob'

//================================ Local Imported Files ======================================//

import styles from "./style";
import ApiHelper from "../../../api/ApiHelper";
import AppHeaderNative from "../../../components/AppHeaderNative";
import AppLoading from "../../../components/AppLoading";
import Search from "../../../assets/images/searchBackground.svg";
import Filter from "../../../assets/images/filterBackground.svg";
import DropArrow from "../../../assets/images/dropdown.svg";
import CourseDropdown from "../../../components/CourseDropDwon";
import ResourceComponent from "../../../components/ResourceComponent";


const AllResourcesScreen = (props) => {

    const isFocused = useIsFocused();
    const token = useSelector((state) => state.ApiData.token);
    const [loading, setLoading] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);
    const [dropModal, setDropModal] = useState(false);
    let [coursesData, setCoursesData] = useState([]);
    let [page, setPage] = useState(1);
    let [categoryData, setCategoryData] = useState([]);
    let [catText, setCatText] = useState('All Resources');
    let dropText = [
        {
            id:0,
            name:'All Resources'
        },
        {
            id:1,
            name:'Services'
        },
        {
            id:2,
            name:'Documents'
        },
    ];


    useEffect(() => {
        setCatText('All Resources');
        setPage(1);
        getAllResources();
        getCategories();
    }, [isFocused]);


    const getAllResources = () => {
        setLoading(true);
        ApiHelper.getResourceData(token,page, (response) => {
            if (response.isSuccess) {
                if (response.response.data.code === 200) {
                    // console.log('Resources ===>',response.response.data.data.docs)
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


    const getCategories = () => {
        setLoading(true);
        ApiHelper.getCategories(token,'RESOURCES', (response) => {
            if (response.isSuccess) {
                setLoading(false);
                if (response.response.data.code === 200) {
                    setLoading(false)
                    setCategoryData(response.response.data.data)
                } else {
                }
            } else {
                setLoading(false);
                console.log("Error ==>", response.response);
            }
        });
    };


    const downloadDocument = (items) => {
        if(items.type === 'DOCUMENTS'){
            const { fs } = RNFetchBlob;
            let linking = items.url.split(' ');
            RNFetchBlob
                .config({
                    fileCache : true,
                    autorename: false,
                    addAndroidDownloads: {
                        useDownloadManager: true,
                        notification: true,
                        title: 'title',
                        path: Platform.OS === "ios" ? fs.dirs.DocumentDir : fs.dirs.DCIMDir + "/me_" + "." + 'DOCS',
                        description: "Downloading file.",
                    },
                })
                .fetch('GET', linking[0], {
                })
                .then((res) => {
                    console.log('Downloaded ====>', res.path())
                })
                .catch((error) => {
                    console.log('error', error)
                })
        } else if (items.type === 'SERVICES'){
            Linking.openURL(items.url)
        }
    };


    const onSelectType = (text) => {
        let url;
        if(text === 'All Resources'){
            getAllResources();
        } else if(text === 'Services'){
            url = '/api/v1/resources/?resourceType=SERVICES';
        } else if(text === 'Documents'){
            url = '/api/v1/resources/?resourceType=DOCUMENTS';
        }
        setLoading(true);
        ApiHelper.getResourceTypes(token,url, (response) => {
            if (response.isSuccess) {
                if (response.response.data.code === 200) {
                    console.log('Resources types ===>',response.response.data.data.docs)
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


    const renderCourseItems = (item) => {
        return (
            <ResourceComponent
                title={item.title}
                imgUri={item.imageUrl}
                url={item.contentUrl}
                type={item.resourceType}
                price={item.Documentprices}
                pay={item.DocumentPayeds}
                onPressContent={(title) => downloadDocument(title)}
            />
        );
    }


    const LoadMoreRandomData = () => {
        setPage(page = page + 1);
        setMoreData();
    }


    const setMoreData = () => {
        // setLoading(true);
        // let tempArray = [];
        // ApiHelper.getCoursesData(token,page,(response) => {
        //   if (response.isSuccess) {
        //     // setCategoryExtraData(coursesData = page === 2 ? response.response.data.data.docs : [...coursesData, ...response.response.data.data.docs]);
        //     response.response.data.data.docs?.map((value) => {
        //       if (value.CoursePayeds.length > 0) {
        //       if (value.CoursePayeds[0].paid === true) {
        //         tempArray.push({
        //           isLock: false,
        //           id: value.id,
        //           catName: value.Category.name,
        //           title: value.title,
        //           image: value.imageURL,
        //           price: value.Courseprices[0].price
        //         })
        //       } else {
        //         tempArray.push({
        //           isLock: true,
        //           id: value.id,
        //           catName: value.Category.name,
        //           title: value.title,
        //           image: value.imageURL,
        //           price: value.CoursePayeds[0].price
        //         })
        //       }
        //     } else {
        //       tempArray.push({
        //         isLock: true,
        //         id: value.id,
        //         catName: value.Category.name,
        //         title: value.title,
        //         image: value.imageURL,
        //         price: value.Courseprices[0].price
        //       })
        //     }
        //   })
        //     console.log('te')
        //     setCoursesData(coursesData = page === 2 ? response.response.data.data.docs : [...coursesData, ...tempArray]);
        //     setLoading(false);
        //   }else{
        //     setLoading(false);
        //   }
        // })
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

            <View style={styles.container}>
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
                                    <TouchableOpacity activeOpacity={0.7} onPress={() => console.log('Pressed')}>
                                        <Filter/>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        )
                    }}
                    renderItem={({item, index}) => renderCourseItems(item,index)}
                />
            </View>

            {/*<Modal*/}
            {/*    animationIn="zoomIn"*/}
            {/*    animationOut="zoomOut"*/}
            {/*    transparent={true}*/}
            {/*    isVisible={modalVisible}*/}
            {/*    onBackdropPress={() => setModalVisible(!modalVisible)}*/}
            {/*>*/}
            {/*  <CategoryFilterModal*/}
            {/*      onPressClose={() => setModalVisible(!modalVisible)}*/}
            {/*      catData={categoryData}*/}
            {/*  />*/}
            {/*</Modal>*/}

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

export default AllResourcesScreen;
