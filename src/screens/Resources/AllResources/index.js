//================================ React Native Imported Files ======================================//

import React, { useEffect } from "react";
import {
    View,
    Text,
    TouchableOpacity,
    FlatList,
    Modal,
    Platform,
    Linking
} from "react-native";
import { useState } from "react";
import { useSelector } from "react-redux";
import {useIsFocused} from "@react-navigation/native";
import Toast from "react-native-simple-toast";
import RNFetchBlob from 'rn-fetch-blob'
import moment from "moment";

//================================ Local Imported Files ======================================//

import styles from "./style";
import ApiHelper from "../../../api/ApiHelper";
import AppHeaderNative from "../../../components/AppHeaderNative";
import AppLoading from "../../../components/AppLoading";
import Search from "../../../assets/images/searchBackground.svg";
import Filter from "../../../assets/images/filterBackground.svg";
import DropArrow from "../../../assets/images/dropdown.svg";
import CourseDropdown from "../../../components/CourseDropDwon";
import {BUY_RESOURCES, CREDIT_CARD} from "../../../constants/navigators";
import CategoryFilterModal from "../../../components/CategoryFilterModal";
import ResourceCard from "../../../components/ResourcesCard";

const AllResourcesScreen = (props) => {

    const isFocused = useIsFocused();
    const token = useSelector((state) => state.ApiData.token);
    const [loading, setLoading] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);
    const [dropModal, setDropModal] = useState(false);
    let [page, setPage] = useState(1);
    let [pageLength, pagePageLength] = useState(1);
    let [categoryData, setCategoryData] = useState([]);
    let [coursesData, setCoursesData]   = useState([]);
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
        ApiHelper.getResourceData(token, (response) => {
            if (response.isSuccess) {
                if (response.response.data.code === 200) {
                    console.log("Error ==>", response.response.data);
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


    const getCategories = () => {
        setLoading(true);
        ApiHelper.getCategories(token,'RESOURCES', (response) => {
            if (response.isSuccess) {
                if (response.response.data.code === 200) {
                    setCategoryData(response.response.data.data)
                    setLoading(false)
                } else {
                }
            } else {
                setLoading(false);
                console.log("Error ==>", response.response);
            }
        });
    };


    const downloadDocument = (items,value) => {
        if(value === 'download'){
            // console.log('Data ===>',items)
            Toast.show('Downloading ...',Toast.LONG);
            var date = new Date();
            let linking = items.url.split(' ');
            const { dirs: {DownloadDir, DocumentDir} } = RNFetchBlob.fs;
            const {config} = RNFetchBlob;
            const isIOS = Platform.OS === "ios";
            const aPath = Platform.select({ios: DocumentDir, android: DownloadDir});
            const fPath = aPath + '/' + Math.floor(date.getTime() + date.getSeconds() / 2)+'.docs';

            const configOptions = Platform.select({
                ios: {
                    fileCache: true,
                    path: fPath,
                    notification: true,
                },

                android: {
                    fileCache: false,
                    addAndroidDownloads: {
                        useDownloadManager: true,
                        notification: true,
                        path: fPath,
                        title: linking[0],
                        description: 'Downloading docs...',
                    }
                },
            });

            if (isIOS) {
                config(configOptions)
                    .fetch('GET', linking[0])
                    .then((res) => {
                        setTimeout(() => {
                            RNFetchBlob.ios.openDocument(res.data);
                        }, 300);

                    })
                    .catch((errorMessage) => {
                        Toast.show(errorMessage,Toast.LONG);
                    });
            } else {
                config(configOptions)
                    .fetch('GET', linking[0])
                    .then((res) => {
                        // RNFetchBlob.android.actionViewIntent(res.path());
                        Toast.show('File download successfully',Toast.LONG);
                    })
                    .catch((errorMessage, statusCode) => {
                        Toast.show(errorMessage,Toast.LONG);
                    });
            }
            // const { fs } = RNFetchBlob;
            // let linking = items.url.split(' ');
            // RNFetchBlob
            //     .config({
            //         fileCache : true,
            //         addAndroidDownloads: {
            //             useDownloadManager: true,
            //             notification: true,
            //             title: items.title,
            //             path: Platform.OS === "ios" ? fs.dirs.DocumentDir : fs.dirs.DCIMDir + "/me_" + "." + 'DOCS',
            //             description: "Downloading file.",
            //         },
            //     })
            //     .fetch('GET', linking[0], {
            //     })
            //     .then((res) => {
            //         console.log('Downloaded ====>', res.path())
            //     })
            //     .catch((error) => {
            //         console.log('error', error)
            //     })
        } else if (value === 'link'){
            Linking.openURL(items.url)
        } else if (value > 0){
            props.navigation.navigate(BUY_RESOURCES,{
                fromResource: true,
                price: value * 100
            })
        }
    };


    const onSelectType = (text) => {
        let url;
        if(text === 'All Resources'){
            getAllResources();
        } else if(text === 'Services'){
            url = '/api/v1/resources/?size=30&resourceType=SERVICES';
        } else if(text === 'Documents'){
            url = '/api/v1/resources/?size=30&resourceType=DOCUMENTS';
        }
        setLoading(true);
        ApiHelper.getResourceTypes(token,url, (response) => {
            if (response.isSuccess) {
                if (response.response.data.code === 200) {
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


    const renderResourceItems = (item) => {
        let date = moment(item.createdAt).format('DD/MM/YYYY');
        return (
            <ResourceCard
                title={item.title}
                imgUri={item.imageUrl}
                url={item.contentUrl}
                type={item.resourceType}
                price={item.Documentprices}
                pay={item.DocumentPayeds}
                createdAt={date}
                onPressContent={(title,value) => downloadDocument(title,value)}
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
                    renderItem={({item}) => renderResourceItems(item)}
                />
            </View>

            {/*<Model*/}
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
            {/*</Model>*/}

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
