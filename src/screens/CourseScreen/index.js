//================================ React Native Imported Files ======================================//

import React, {useEffect, useState} from 'react';
import {ScrollView, StatusBar, View, Text, Image,LogBox} from 'react-native';
import {widthPercentageToDP as wp,heightPercentageToDP as hp} from "react-native-responsive-screen";
import {useSelector} from "react-redux";
import Carousel from 'react-native-snap-carousel';
import {useIsFocused} from "@react-navigation/native";
import RenderHtml from 'react-native-render-html';
import Video from 'react-native-video';
import moment from "moment";

//================================ Local Imported Files ======================================//

import styles from './style';
import colors from "../../assets/colors/colors";
import fonts from "../../assets/fonts/fonts";
import images from "../../assets/images/images";
import ApiHelper from "../../api/ApiHelper";
import AppHeaderNative from "../../components/AppHeaderNative";
import AppLoading from "../../components/AppLoading";
import CourseView from "../../components/CourseView";
import AccountabilityComponent from "../../components/AccountablitiyCheck";
import ResourceComponent from "../../components/ResourceComponent";
import ForumComponent from "../../components/ForumCardDesign";
import LiveComponent from "../../components/LiveComponent";

LogBox.ignoreAllLogs(true);
const CourseScreen = props => {

    const isFocused = useIsFocused();
    let userData = useSelector(state => state.ApiData.loginData);
    const token = useSelector(state => state.ApiData.token);
    const [loading,setLoading] = useState(false);
    const [hasImage,setHasImage] = useState(false);
    const [announcement,setAnnouncement] = useState('');
    const [items,setItems] = useState([]);
    const [accountItems,setAccountItems] = useState([]);
    const [resourceItems,setResourceItems] = useState([]);
    const [forumItems,setForumItems] = useState([]);
    const [liveItems,setLiveItems] = useState([])


    useEffect(() => {
        getAnnouncements();
        getDashboardData();
    }, [isFocused]);


    const getAnnouncements = () => {
        setLoading(true);
        ApiHelper.getAnnouncements(token,(resp) => {
            if(resp.isSuccess){
                if(resp.response.data.code === 200){
                    console.log('Announcements',resp.response.data.data)
                    VideoCheck(resp.response.data.data)
                }
            }else{
                console.log('Error',resp.response)
                // setLoading(false);
            }
        })
    }


    const getDashboardData = () => {
        ApiHelper.getDashboardData(token,(resp) => {
            if(resp.isSuccess){
                setLoading(false);
                console.log('Response',resp.response.data)
                setItems(resp.response.data.courses)
                setAccountItems(resp.response.data.accountability)
                setResourceItems(resp.response.data.resources)
                setForumItems(resp.response.data.forum)
                setLiveItems(resp.response.data.livetraining)
            }else{
                setLoading(false);
            }
        })
    }


    const VideoCheck = (url) => {
        if (!url.contentUrl) {
            return;
        }
        const ext = url.contentUrl.slice(url.contentUrl.lastIndexOf(".") + 1);
        if (ext === "mp4" || ext === "mkv") {
            setHasImage(false);
            setAnnouncement(url)
        }else{
            setHasImage(true);
            setAnnouncement(url)
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


    const _renderForumItems = (item) => {
        let date = moment(item.createdAt).format('DD/MM/YYYY');
        let time = moment(item.createdAt).format('HH:mm')
        return (
            <ForumComponent
                image={item.User.profilePictureURL}
                name={item.User.username}
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
        }else{
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
                    leftIconPath={true}
                    rightIconOnePath={true}
                    onLeftIconPress={() => props.navigation.openDrawer()}
                    onRightIconPress={() => console.log('Data on Ring')}
                />
            </View>
            {loading ? null : (
                <ScrollView style={styles.bodyView} showsVerticalScrollIndicator={false}>
                    <View style={styles.userDetailView}>
                        <View style={styles.nameView}>
                            <Text style={styles.userNameText} numberOfLines={1}>{userData.user.username} !</Text>
                            <Text style={[styles.userNameText,{fontSize:wp(4),marginTop:wp(2),fontFamily:fonts.regular,fontWeight:'400',width:wp(40),color:colors.sub_heading}]}>What would you like to learn today?</Text>
                        </View>
                        <View style={styles.imageView}>
                            {/*<Image source={userData.user.profilePictureURL === 'null' ? images.placeHolder : {uri: userData.user.profilePictureURL}} style={styles.imageStyle}/>*/}
                            <Image source={images.profile_placeHolder} style={styles.imageStyle}/>
                        </View>
                    </View>

                    <View style={styles.announcementView}>
                        <View style={styles.announceUpperView}>
                            {hasImage ? <Image source={images.profile_placeHolder} style={styles.announceImage}/>:
                                <Video
                                    source={{uri: announcement.contentUrl}}
                                    controls={true}
                                    repeat={true}
                                    muted={true}
                                    style={styles.backgroundVideo}
                                    resizeMode={'cover'}
                                />}
                        </View>
                        <View style={styles.announceTextView}>

                            <View style={styles.announceView}>
                                <Text style={styles.userNameText}>Announcements</Text>
                                <Text style={[styles.userNameText,{fontSize:wp(4),marginTop:wp(2),fontFamily:fonts.semi,fontWeight:'400',width:wp(80),color:colors.button_text}]} numberOfLines={2}>{announcement.title}</Text>
                            </View>

                            <View style={styles.descriptionText}>
                                <RenderHtml
                                    contentWidth={wp(90)}
                                    source={{html: `<div style="color: white; font-size: 13px"> ${announcement.description}</div>`}}
                                />
                            </View>
                            <View style={styles.bottomWidth}/>
                        </View>
                    </View>

                    {items.length > 0 && <View style={styles.courseView}>
                        <View style={styles.courseTitle}>
                            <Text style={[styles.userNameText,styles.headerText]}>Courses</Text>
                            <Text style={[styles.userNameText,styles.showAll]} onPress={() => console.log('Pressed')}>Show all</Text>
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
                    </View>}

                    {accountItems.length > 0 && <View style={[styles.courseView,{height:hp(23)}]}>
                        <View style={styles.courseTitle}>
                            <Text style={[styles.userNameText,styles.headerText]}>Accountability</Text>
                            <Text style={[styles.userNameText,styles.showAll]} onPress={() => console.log('Pressed')}>Show all</Text>
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
                    </View>}

                    {liveItems.length > 0 && <View style={styles.courseView}>
                        <View style={styles.courseTitle}>
                            <Text style={[styles.userNameText,styles.headerText]}>Live Training</Text>
                            <Text style={[styles.userNameText,styles.showAll]} onPress={() => console.log('Pressed')}>Show all</Text>
                        </View>
                        <View style={styles.videoSection}>
                            <Carousel
                                data={liveItems}
                                keyExtractor={(item) => item.id}
                                renderItem={({item}) => _renderLiveItems(item)}
                                autoplay={true}
                                activeSlideAlignment={'start'}
                                loop={true}
                                sliderWidth={wp(90)}
                                itemWidth={liveItems.length > 1 ? wp(43) : wp(90)}
                            />
                        </View>
                    </View>}

                    {resourceItems.length > 0 && <View style={[styles.courseView,{height:hp(25)}]}>
                        <View style={styles.courseTitle}>
                            <Text style={[styles.userNameText,styles.headerText]}>Resources</Text>
                            <Text style={[styles.userNameText,styles.showAll]} onPress={() => console.log('Pressed')}>Show all</Text>
                        </View>
                        <View style={styles.videoSection}>
                            <Carousel
                                data={resourceItems}
                                keyExtractor={(item) => item.id}
                                layout={'tinder'}
                                renderItem={({item}) => _renderResourceItems(item)}
                                autoplay={true}
                                activeSlideAlignment={'start'}
                                loop={true}
                                sliderWidth={wp(90)}
                                itemWidth={wp(90)}
                            />
                        </View>
                    </View>}

                    {forumItems.length > 0 && <View style={[styles.courseView,{height:hp(23)}]}>
                        <View style={styles.courseTitle}>
                            <Text style={[styles.userNameText,styles.headerText]}>Forum</Text>
                            <Text style={[styles.userNameText,styles.showAll]} onPress={() => console.log('Pressed')}>Show all</Text>
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
                    </View>}

                </ScrollView>
            )}
        </View>
    );
};

export default CourseScreen;
