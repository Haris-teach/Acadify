//================================ React Native Imported Files ======================================//

import React, { useEffect } from "react";
import {
    View,
    Text,
    Modal,
    Alert,
    Linking,
    FlatList,
    Platform,
    TouchableOpacity,
    PermissionsAndroid,
} from "react-native";
import { useState } from "react";
import { useSelector } from "react-redux";
import Toast from "react-native-simple-toast";
import {useIsFocused} from "@react-navigation/native";
import {
    heightPercentageToDP as hp,
    widthPercentageToDP as wp
} from "react-native-responsive-screen";
import RNFetchBlob from 'rn-fetch-blob';
import Model from "react-native-modal";
import moment from "moment";

//================================ Local Imported Files ======================================//

import styles from "./style";
import ApiHelper from "../../../api/ApiHelper";
import {BUY_RESOURCES, PLAN_SCREEN} from "../../../constants/navigators";
import AppLoading from "../../../components/AppLoading";
import Search from "../../../assets/images/searchBackground.svg";
import Filter from "../../../assets/images/filterBackground.svg";
import DropArrow from "../../../assets/images/dropdown.svg";
import CourseDropdown from "../../../components/CourseDropDwon";
import CategoryFilterModal from "../../../components/CategoryFilterModal";
import ResourceCard from "../../../components/ResourcesCard";
import Button from "../../../components/Button/Button";

let title='';
let categoryId='';
let isFreeKey='';
let isFree='';
let page = 1;

const AllResourcesScreen = ({navigation}) => {

    const isFocused = useIsFocused();
    const token = useSelector((state) => state.ApiData.token);
    let resource = useSelector(state => state.ApiData.resource);
    const [loading, setLoading] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);
    const [dropModal, setDropModal] = useState(false);
    const [lockModal, setLockModal] = useState(false);
    let [pageLength, setPageLength] = useState(1);
    let [categoryData, setCategoryData] = useState([]);
    let [coursesData, setCoursesData]   = useState([]);
    let [catText, setCatText] = useState('All Resources');
    let [select, setSelect] = useState(0);
    let [search, setSearch] = useState(false);
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
        // return navigation.addListener('focus', () => {
            if(resource) {
                setLockModal(false);
                setCatText('All Resources');
                 title='';
                 categoryId='';
                 isFreeKey='';
                 isFree='';
                 page = 1;
                getAllResources(true,false);
                getCategories();
            } else {
                setLockModal(true);
            }
        // });
    }, [isFocused]);


    const getAllResources = (bool, doRefresh) => {
        setLoading(bool);
        let url = `/api/v1/resources/?size=100&page=${page}&${isFreeKey}=${isFree}&categoryId=${categoryId}&title=%${title}%`
        ApiHelper.getResourceData(token, url,(response) => {
            if (response.isSuccess) {
                console.log('Data',response)
                if (response.response.data.code === 200) {
                    ApiHelper.consoleBox("Success of Resources ==>", response.response.data);
                    if(doRefresh)
                    {
                        setCoursesData(response.response.data.data.docs);
                        setPageLength(1);
                    }
                    else
                    {
                        setCoursesData(response.response.data.data.docs);
                        setPageLength(response.response.data.data.pages);
                    }

                    setLoading(false);
                } else {
                    console.log("Error inner ==>", response.response.data);
                }
            } else {
                setLoading(false);
                console.log("Error ==>", response.response.response);
                if(response.response.response.status === 401){
                    // navigation.dispatch(
                    //     CommonActions.reset({
                    //         index: 0,
                    //         routes: [{name: LOGIN_SCREEN}],
                    //     }),
                    // );
                    Toast.show('Session Expired...',Toast.LONG);
                }
            }
        });
    };


    const getCategories = () => {
        setLoading(true);
        let accountArray = [{
            id:0,
            name:'All Categories'
        }];
        ApiHelper.getCategories(token,'RESOURCES', (response) => {
            if (response.isSuccess) {
                if (response.response.data.code === 200) {
                    response.response.data.data.map((value) =>{
                        accountArray.push({
                            id:value.id,
                            name:value.name
                        })
                    })
                    setCategoryData(accountArray)
                    setLoading(false)
                } else {
                }
            } else {
                setLoading(false);
                console.log("Error ==>", response.response);
            }
        });
    };


    const downloadFile = (items,value) => {
        if(value === 'download'){
            Toast.show('Downloading ...',Toast.LONG);
            var date = new Date();
            let linking = items.url.split(' ');
            const { dirs: {DownloadDir, DocumentDir} } = RNFetchBlob.fs;
            const {config} = RNFetchBlob;
            const isIOS = Platform.OS === "ios";
            const aPath = Platform.select({ios: DocumentDir, android: DownloadDir});
            const fPath = aPath + '/' + Math.floor(date.getTime() + date.getSeconds() / 2)+`.${items.contentType}`;

            const configOptions = Platform.select({
                ios: {
                    fileCache: true,
                    path: fPath,
                    notification: true,
                },

                android: {
                    addAndroidDownloads: {
                        fileCache: true,
                        useDownloadManager: true,
                        notification: true,
                        path: fPath,
                        title: linking[0],
                        description: 'Downloading file...',
                        overwrite : true,
                        indicator:true
                    }
                },
            });

            if (isIOS) {
                config(configOptions)
                    .fetch('GET', linking[0])
                    .then((res) => {
                        console.log('Downloaded ====>', res.path())
                        setTimeout(() => {
                            RNFetchBlob.ios.openDocument(res.data);
                        }, 300);

                    })
                    .catch((errorMessage) => {
                        Toast.show('Download Failed',Toast.LONG);
                    });
            }
        } else if (value === 'link'){
            Linking.openURL(items.url)
        } else if (value > 0){
            navigation.navigate(BUY_RESOURCES,{
                fromResource: true,
                price: value * 100,
                resourceId: items.id,
            })
        }
    };


    const checkPermission = async (title,value) => {
        if (Platform.OS === 'ios') {
            downloadFile(title,value);
        } else {
            if (value === 'download') {
                try {
                    const granted = await PermissionsAndroid.request(
                        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
                        {
                            title: 'Storage Permission Required',
                            message:
                                'Acadify needs access to your storage to download File',
                        }
                    );
                    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                        downloadAndroidFile(title, value);
                        console.log('Storage Permission Granted.');
                    } else {
                        Alert.alert('Error', 'Storage Permission Not Granted');
                    }
                } catch (err) {
                    console.log("++++" + err);
                }
            } else if (value === 'link') {
                Linking.openURL(title.url)
            } else if (value > 0) {
                navigation.navigate(BUY_RESOURCES, {
                    fromResource: true,
                    price: value * 100,
                    resourceId: title.id,
                })
            }
        }
    };


    const downloadAndroidFile = (title,value) => {
        Toast.show('Downloading ...',Toast.LONG);
        let date = new Date();
        let FILE_URL = title.url;
        let file_ext = getFileExtention(FILE_URL);
        file_ext = '.' + file_ext[0];
        const { config, fs } = RNFetchBlob;
        let RootDir = fs.dirs.DownloadDir;
        let options = {
            fileCache: true,
            addAndroidDownloads: {
                path:
                    RootDir+
                    '/file_' +
                    Math.floor(date.getTime() + date.getSeconds() / 2) +
                    file_ext,
                description: 'downloading file...',
                notification: true,
                title:title.url,
                useDownloadManager: true,
            },
        };
        config(options)
            .fetch('GET', FILE_URL)
            .then(res => {
                console.log('File Download response ==> ', JSON.stringify(res));
            });
    };


    const getFileExtention = fileUrl => {
        return /[.]/.exec(fileUrl) ?
            /[^.]+$/.exec(fileUrl) : undefined;
    };


    const onSelectType = (text) => {
        setCoursesData([])
        let doRefresh = false;
        if(text === 'All Resources'){
            if(isFree!='')
            {
                doRefresh = true;
            }
            isFreeKey= ''
            isFree= ''
            page = 1;
            getAllResources(true, doRefresh);
        } else if(text === 'Services'){
            if(isFree!='SERVICES')
            {
                doRefresh = true;
            }

            isFreeKey='resourceType'
            isFree='SERVICES'
            page = 1;
            getAllResources(true, doRefresh);
        } else if(text === 'Documents'){
            if(isFree!='DOCUMENTS')
            {
                doRefresh = true;
            }
            isFreeKey='resourceType'
            isFree='DOCUMENTS'
            page = 1;
            getAllResources(true, doRefresh);
        }
    };


    const renderResourceItems = (item,index) => {
        let date = moment(item.createdAt).format('DD/MM/YYYY');
        return (
            <ResourceCard
                id={item.id}
                title={item.title}
                imgUri={item.imageUrl}
                url={item.contentUrl}
                type={item.resourceType}
                price={item.Documentprices}
                pay={item.DocumentPayeds}
                length={coursesData.length}
                createdAt={date}
                index={index}
                contentType={item.contentType}
                onPressContent={(title,value) => checkPermission(title,value)}
            />
        );
    }


    const LoadMoreRandomData = () => {
        if(page < pageLength) {
            page = page + 1;
            getAllResources(true,false)
        }
    }


    const onCatSelect = (value,index) => {
        if(value.name === 'All Categories'){
            categoryId='';
            setSelect(index)
            page = 1;
            setCoursesData([])
            getAllResources(true);
        } else {
            categoryId=value.id;
            setSelect(index)
            page = 1;
            setCoursesData([])
            getAllResources(true);
        }
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
                                {/*<View style={styles.filterIcons}>*/}
                                {/*    <TouchableOpacity activeOpacity={0.7} onPress={() => console.log('Searched')}>*/}
                                {/*        <Search/>*/}
                                {/*    </TouchableOpacity>*/}
                                {/*    <TouchableOpacity*/}
                                {/*        activeOpacity={0.7}*/}
                                {/*        onPress={() => setModalVisible(!modalVisible)}*/}
                                {/*    >*/}
                                {/*        <Filter/>*/}
                                {/*    </TouchableOpacity>*/}
                                {/*</View>*/}
                            </View>
                        )
                    }}
                    renderItem={({item,index}) => renderResourceItems(item,index)}
                /> :
                    <View style={styles.upgradePlan}>
                        <Text style={[styles.headerTextStyle,{fontSize:wp(6),fontWeight:'500',textAlign:'center'}]}>Upgrade Your Plan To Get Access</Text>
                        <View style={{marginTop:hp(2)}}>
                            <Button
                                buttonText={'UPGRADE PLAN'}
                                width={wp(50)}
                                onPress={() => navigation.navigate(PLAN_SCREEN,{fromChange:true})}
                            />
                        </View>
                    </View>
                }
            </View>

            <Model
                animationIn="zoomIn"
                animationOut="zoomOut"
                transparent={true}
                isVisible={modalVisible}
                onBackdropPress={() => setModalVisible(!modalVisible)}
            >
              <CategoryFilterModal
                  onPressClose={() => setModalVisible(!modalVisible)}
                  catData={categoryData}
                  index={select}
                  onSelect={(value,index) => {
                      setModalVisible(!modalVisible)
                      onCatSelect(value,index);
                  }}
              />
            </Model>

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
