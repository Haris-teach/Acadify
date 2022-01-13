//================================ React Native Imported Files ======================================//

import React, {useEffect, useState} from 'react';
import {
    ActivityIndicator,
    ImageBackground,
    RefreshControl,
    ScrollView,
    StatusBar,
    Platform,
    LogBox,
    Text,
    View
} from 'react-native';
import {heightPercentageToDP as hp, widthPercentageToDP as wp} from "react-native-responsive-screen";
import Carousel from 'react-native-snap-carousel';
import {useDispatch, useSelector} from "react-redux";
import RenderHtml from 'react-native-render-html';
import Video from 'react-native-video';
import moment from "moment";

//================================ Local Imported Files ======================================//

import styles from './style';
import colors from "../../assets/colors/colors";
import fonts from "../../assets/fonts/fonts";
import images from "../../assets/images/images";
import ApiHelper from "../../api/ApiHelper";
import {
    GET_ACCOUNTABILITY,
    DASHBOARD_SCREEN,
    ALL_RESOURCES,
    NOTIFICATION,
    LIVE_EVENTS,
    FORUM,
    JOURNEY,
    SETTINGS, TASK_LISTING,
} from "../../constants/navigators";
import AppHeaderNative from "../../components/AppHeaderNative";
import AppLoading from "../../components/AppLoading";
import CourseView from "../../components/CourseView";
import AccountabilityComponent from "../../components/AccountablitiyCheck";
import ResourceComponent from "../../components/ResourceComponent";
import ForumComponent from "../../components/ForumCardDesign";
import LiveComponent from "../../components/LiveComponent";
import FeatureComponent from "../../components/FeaturedView";
import * as ApiDataActions from "../../../redux/store/actions/ApiData";

LogBox.ignoreAllLogs(true);
const CourseScreen = ({navigation}) => {

    const dispatch = useDispatch();
    let userData = useSelector(state => state.ApiData.loginData);
    const token = useSelector(state => state.ApiData.token);
    const dashboard = useSelector(state => state.ApiData.dashboard);
    const [loading,setLoading] = useState(false);
    const [hasImage,setHasImage] = useState(false);
    const [noUrl, setNoUrl] = useState(false);
    const [announcement,setAnnouncement] = useState('');
    const [items,setItems] = useState([]);
    const [accountItems,setAccountItems] = useState([]);
    const [resourceItems,setResourceItems] = useState([]);
    const [forumItems,setForumItems] = useState([]);
    const [liveItems,setLiveItems] = useState([]);
    const [sortData,setSortData] = useState([]);
    const [video,setVideos] = useState([]);
    const [announceTest,setAnnounceTest] = useState([]);

    const [isLoaded,setIsLoaded] = useState(false);
    const [isError,setIsError] = useState(false);
    const [isShowActivity,setIsShowActivity] = useState(true);

    const [isLoadeds,setIsLoadeds] = useState(false);
    const [isErrors,setIsErrors] = useState(false);


    useEffect(() => {
        // return navigation.addListener('focus', () => {
            getAnnouncements();
            getDashboardData();
        // });
    }, []);


    const onRefresh = () => {
        getAnnouncements();
        getDashboardData();
    }


    const getAnnouncements = () => {
        setLoading(!dashboard);
        setLoading(true);
        ApiHelper.getAnnouncements(token,(resp) => {
            if(resp.isSuccess){
                if(resp.response.data.code === 200){
                    videoCheck(resp.response.data.data)
                }
            }else{
                console.log('Error',resp.response)
            }
        })
    }


    const getDashboardData = () => {
        ApiHelper.getDashboardData(token,(resp) => {
            if(resp.isSuccess){
                setLoading(false);
                ApiHelper.consoleBox('message',resp)
                setSortData(resp.response.data.data)
                setItems(resp.response.data.courses)
                setAccountItems(resp.response.data.accountability)
                setResourceItems(resp.response.data.resources)
                setForumItems(resp.response.data.forum)
                setLiveItems(resp.response.data.livetraining)
                setVideos(resp.response.data.videos)
                setAnnounceTest(resp.response.data.announcement)
                dispatch(ApiDataActions.SetDashboard(true));
            }else{
                setLoading(false);
            }
        })
    }


    const videoCheck = (url) => {
        if (!url.contentUrl) {
           setNoUrl(true);
        }
        const ext = url.contentUrl.slice(url.contentUrl.lastIndexOf(".") + 1);
        if (ext === "mp4" || ext === "mkv") {
            setHasImage(false);
            setAnnouncement(url)
        }else{
            setAnnouncement(url)
            setHasImage(true);
        }
    };


    const _renderItems = (item) => {
        if(items.length > 1){
            return (
                <CourseView
                    name={item.title}
                    image={item.imageURL}
                    value={''}
                    width={wp(45)}
                    ownName={item.createdby}
                />
            )
        }else{
            return(
                <CourseView
                    name={item.title}
                    image={item.imageURL}
                    value={''}
                    width={wp(90)}
                    ownName={item.createdby}
                />
            )
        }
    }


    const _renderAccountabilityItems = (item) => {
        let date = moment(item.createdAt).format('DD/MM/YYYY');
        return(
            <AccountabilityComponent
                title={item.title}
                description={item.description}
                progress={item.progress}
                date={date}
            />
        )
    }


    const _renderResourceItems = (item) => {
        return (
            <ResourceComponent
                image={item.imageUrl}
                description={item.title}
            />
        )
    }


    const _renderFeatureItems = (item) => {
        return (
            <FeatureComponent
                image={item.thumbnailURL}
                description={item.title}
            />
        )
    }


    const _renderForumItems = (item) => {
        let date = moment(item.createdAt).format('DD/MM/YYYY');
        let time = moment(item.createdAt).format('HH:mm')
        return (
            <ForumComponent
                image={item.User?.profilePictureURL}
                name={item.User?.username}
                title={item.question}
                date={date}
                time={time}
            />
        )
    }


    const _renderLiveItems = (item) => {
        if(liveItems.length > 1){
            return (
                <LiveComponent
                    width={wp(43)}
                    image={item.thumbnailURL}
                    title={item.title}
                />
            )
        }else if(liveItems.length === 1){
            return (
                <LiveComponent
                    width={wp(90)}
                    image={item.thumbnailURL}
                    title={item.title}
                />
            )
        }
    }


    return (
        <View style={styles.mainContainer}>
            <StatusBar backgroundColor={colors.app_background} />
            {AppLoading.renderLoading(loading)}
            <View style={styles.headerView}>
                <AppHeaderNative
                    onPressTask={() => navigation.navigate(TASK_LISTING)}
                    onPressSetting={() => navigation.navigate(SETTINGS)}
                    onPressJourney={() => navigation.navigate(JOURNEY)}
                    onPressChat={() => console.log('Chat Pressed')}
                    onPressRing={() => navigation.navigate(NOTIFICATION)}
                />
            </View>
            {loading ? null : (
                <ScrollView
                    style={[styles.bodyView,{marginBottom:hp(7)}]}
                    showsVerticalScrollIndicator={false}
                    refreshControl={
                        <RefreshControl
                            colors={['transparent']}
                            style={{backgroundColor: 'transparent'}}
                            progressBackgroundColor='transparent'
                            refreshing={loading}
                            onRefresh={onRefresh}
                            tintColor={'transparent'}
                        />
                    }
                >
                    <View style={styles.userDetailView}>
                        <View style={styles.nameView}>
                            <Text style={styles.userNameText} numberOfLines={1}>{userData.user.firstName} {userData.user.lastName}</Text>
                            <Text style={[styles.userNameText,{fontSize:wp(4),marginTop:wp(2),fontFamily:fonts.regular,fontWeight:'400',width:wp(40),color:colors.sub_heading}]}>What would you like to learn today?</Text>
                        </View>
                        <View style={styles.imageView}>
                            <ImageBackground
                                source={userData.user.profilePictureURL === 'null' ? images.placeHolder : {uri: userData.user.profilePictureURL}}
                                style={styles.imageStyle}
                                imageStyle={styles.imageStyle}
                                onLoadEnd={() => setIsLoadeds(true)}
                                onError={() => setIsErrors(true)}
                            >
                                {
                                    (isLoadeds && !isErrors) ? null :
                                        !isError &&
                                        <ActivityIndicator
                                            size={'small'}
                                            color={colors.button_text}
                                        />
                                }
                            </ImageBackground>
                            {/*<Image source={images.profile_placeHolder} style={styles.imageStyle}/>*/}
                        </View>
                    </View>

                    {announceTest.length > 0 && <View style={styles.announcementView}>
                        {noUrl === false ? <View style={styles.announceUpperView}>
                            {hasImage ?
                                <ImageBackground
                                    source={{uri: announcement.contentUrl}}
                                    style={styles.announceImage}
                                    imageStyle={styles.announceImage}
                                    onLoadEnd={() => setIsLoaded(true)}
                                    onError={() => setIsError(true)}
                                >
                                    {
                                        (isLoaded && !isError) ? null :
                                            (isShowActivity && !isError) &&
                                            <ActivityIndicator
                                                size={'small'}
                                                color={colors.button_text}
                                            />
                                    }
                                </ImageBackground> :
                                <Video
                                    source={{uri: announcement.contentUrl}}
                                    controls={Platform.OS === 'ios'}
                                    repeat={true}
                                    muted={true}
                                    style={styles.backgroundVideo}
                                    playInBackground={false}
                                    resizeMode={'cover'}
                                />
                            }
                        </View> : null}
                        <View style={styles.announceTextView}>
                            <View style={styles.announceView}>
                                <Text style={styles.userNameText}>Announcements</Text>
                                {/*<Text style={[styles.userNameText, {*/}
                                {/*    fontSize: wp(4),*/}
                                {/*    marginTop: wp(2),*/}
                                {/*    fontFamily: fonts.semi,*/}
                                {/*    fontWeight: '400',*/}
                                {/*    width: wp(80),*/}
                                {/*    color: colors.button_text*/}
                                {/*}]} numberOfLines={2}>{announcement.title}</Text>*/}
                            </View>

                            {announcement.description !== "" && <View style={styles.descriptionText}>
                                <RenderHtml
                                    contentWidth={wp(90)}
                                    source={{html: `<div style="color: white; font-size: 13px"> ${announcement.description}</div>`}}
                                />
                            </View>}
                            <View style={styles.bottomWidth}/>
                        </View>
                    </View>}

                    {sortData && sortData.map((value) => {
                        if(value.name === 'livetraining' && value.itemCount > 0 && liveItems.length > 0 ){
                            return(
                                <View style={[styles.courseView,{height:hp(25)}]}>
                                    <View style={styles.courseTitle}>
                                        <Text style={[styles.userNameText,styles.headerText]}>Live Events</Text>
                                        <Text style={[styles.userNameText,styles.showAll]} onPress={() => navigation.navigate(LIVE_EVENTS)}>Show all</Text>
                                    </View>
                                    <View style={styles.videoSection}>
                                        <Carousel
                                            data={liveItems}
                                            keyExtractor={(item) => item.id}
                                            renderItem={({item}) => _renderLiveItems(item)}
                                            autoplay={true}
                                            // activeSlideAlignment={'start'}
                                            loop={true}
                                            sliderWidth={wp(90)}
                                            itemWidth={wp(43)}
                                        />
                                    </View>
                                </View>
                            )
                        }else if(value.name === 'accountability' && value.itemCount > 0 && accountItems.length > 0){
                            return(
                                 <View style={[styles.courseView,{height:hp(25)}]}>
                                        <View style={styles.courseTitle}>
                                            <Text style={[styles.userNameText,styles.headerText]}>Accountability</Text>
                                            <Text style={[styles.userNameText,styles.showAll]} onPress={() => navigation.navigate(GET_ACCOUNTABILITY)}>Show all</Text>
                                        </View>
                                        <View style={styles.videoSection}>
                                            <Carousel
                                                data={accountItems}
                                                keyExtractor={(item) => item.id}
                                                renderItem={({item}) => _renderAccountabilityItems(item)}
                                                autoplay={true}
                                                activeSlideAlignment={'start'}
                                                loop={true}
                                                sliderWidth={wp(90)}
                                                itemWidth={wp(90)}
                                            />
                                        </View>
                                 </View>
                            )
                        }else if(value.name === 'resources' && value.itemCount > 0 && resourceItems.length > 0){
                            return (
                               <View style={[styles.courseView,{height:hp(25)}]}>
                                   <View style={styles.courseTitle}>
                                       <Text style={[styles.userNameText,styles.headerText]}>Resources</Text>
                                       <Text style={[styles.userNameText,styles.showAll]} onPress={() => navigation.navigate(ALL_RESOURCES)}>Show all</Text>
                                   </View>
                                   <View style={styles.videoSection}>
                                       <Carousel
                                           data={resourceItems}
                                           keyExtractor={(item) => item.id}
                                           renderItem={({item}) => _renderResourceItems(item)}
                                           autoplay={true}
                                           activeSlideAlignment={'start'}
                                           loop={true}
                                           sliderWidth={wp(90)}
                                           itemWidth={wp(90)}
                                       />
                                   </View>
                               </View>
                            )
                        } else if(value.name === 'forum' && value.itemCount > 0 && forumItems.length > 0){
                            return(
                                <View style={[styles.courseView,{height:hp(25)}]}>
                                    <View style={styles.courseTitle}>
                                        <Text style={[styles.userNameText,styles.headerText]}>Forum</Text>
                                        <Text style={[styles.userNameText,styles.showAll]} onPress={() => navigation.navigate(FORUM)}>Show all</Text>
                                    </View>
                                    <View style={styles.videoSection}>
                                        <Carousel
                                            data={forumItems}
                                            keyExtractor={(item) => item.id}
                                            renderItem={({item}) => _renderForumItems(item)}
                                            autoplay={true}
                                            activeSlideAlignment={'start'}
                                            loop={true}
                                            sliderWidth={wp(90)}
                                            itemWidth={wp(90)}
                                        />
                                    </View>
                                </View>
                            )
                        } else if(value.name === 'courses' && value.itemCount > 0 && items.length > 0 ){
                            return (
                                <View style={styles.courseView}>
                                    <View style={styles.courseTitle}>
                                        <Text style={[styles.userNameText,styles.headerText]}>Courses</Text>
                                        <Text style={[styles.userNameText,styles.showAll]} onPress={() => navigation.navigate(DASHBOARD_SCREEN)}>Show all</Text>
                                    </View>
                                    <View style={styles.videoSection}>
                                        <Carousel
                                            data={items}
                                            keyExtractor={(item) => item.id}
                                            renderItem={({item}) => _renderItems(item)}
                                            autoplay={true}
                                            activeSlideAlignment={'center'}
                                            loop={true}
                                            sliderWidth={wp(90)}
                                            itemWidth={items.length > 1 ? wp(45) : wp(90)}
                                        />
                                    </View>
                                </View>

                            )
                        }else if(value.name === 'videos' && value.itemCount > 0 && video.length > 0 ){
                            return (
                                <View style={[styles.courseView,{height:hp(25)}]}>
                                    <View style={styles.courseTitle}>
                                        <Text style={[styles.userNameText,styles.headerText]}>Featured Video</Text>
                                        <Text style={[styles.userNameText,styles.showAll]} onPress={() => console.log('Pressed')}>Show all</Text>
                                    </View>
                                    <View style={styles.videoSection}>
                                        <Carousel
                                            data={video}
                                            keyExtractor={(item) => item.id}
                                            renderItem={({item}) => _renderFeatureItems(item)}
                                            autoplay={true}
                                            loop={true}
                                            sliderWidth={wp(90)}
                                            itemWidth={ wp(90)}
                                        />
                                    </View>
                                </View>
                            )
                        }
                    })}
                </ScrollView>
            )}
        </View>
    );
};

export default CourseScreen;
