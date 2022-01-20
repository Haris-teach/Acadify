//================================ React Native Imported Files ======================================//

import React,{useState,useEffect} from "react";
import {
    View,
    Text,
    Image,
    Linking,
    FlatList,
    Platform,
    StatusBar,
    ScrollView,
} from "react-native";
import {useSelector} from "react-redux";
import Video from "react-native-video";
import {
    heightPercentageToDP as hp,
    widthPercentageToDP as wp
} from "react-native-responsive-screen";

//================================ Local Imported Files ======================================//

import styles from "./style";
import images from "../../../assets/images/images";
import colors from "../../../assets/colors/colors";
import ApiHelper from "../../../api/ApiHelper";
import AppHeader from "../../../components/AppHeader";
import CourseContentView from "../../../components/CourseContentListComponent";

const CourseContentPlay = (props) => {

    ApiHelper.consoleBox('Props',props.route.params.section.data)
    const token = useSelector((state) => state.ApiData.token);
    const [title,setTitle]        = useState('');
    const [cardData,setCardData]  = useState([]);
    const [Data,setData]          = useState('');


    useEffect(() => {
        setData(props.route.params.section.data[1]);
        setTitle(props.route.params.section.title);
        setCardData(props.route.params.section.data);
    },[])


    const _renderContent = (item) => {
        return(
            <CourseContentView
                isDisable={false}
                image={item.imageURL}
                title={item.title}
                description={item.description}
                onPressContent={() => onCardContentPress(item)}
            />
        )
    }


    const onCardContentPress = (item) => {
        if(item.contentType === 'text' || item.contentType === 'link'){
            Linking.openURL(item.videoURL)
        }else {
            setData(item)
        }
    }


    const renderVideo = (item) => {
        ApiHelper.consoleBox('Data ==>',props.route.params.section.data[1].videoURL)
        return(
            <Video
                source={{uri: 'https://www.youtube.com/watch?v=QM2RTUBq8jc'}}
                controls={Platform.OS === 'ios'}
                repeat={true}
                muted={true}
                style={styles.backgroundVideo}
                playInBackground={false}
                resizeMode={'cover'}
                // poster={require('../../../assets/images/dummy.png')}
                // onBuffer={() => alert()}
            />
        )
    }


    return (
        <View style={styles.mainContainer}>
            <StatusBar backgroundColor={colors.image_background} />
            <ScrollView
                style={styles.mainContainer}
                showsVerticalScrollIndicator={false}
                bounces={false}
            >
                <View style={styles.headerView}>
                    <AppHeader
                        leftIconPath={images.back_icon}
                        onLeftIconPress={() => props.navigation.goBack()}
                    />
                </View>

                <View style={styles.cardDetail}>
                    <View style={styles.headingView}>
                        <Text style={styles.titleText} numberOfLines={1}>{title}</Text>
                    </View>
                    {Data.contentType !== 'text' && Data.contentType !== 'link' &&
                    <View style={styles.videoSection}>
                        {Data.contentType === 'image' ?
                            <Image source={{uri: Data.videoURL}} style={styles.announceImage}/> :
                            (Data.contentType === 'video' ?

                                <View style={{height:hp(32),width:wp(100)}}>
                                    <Text style={{color:'white'}}>{Data.videoURL}</Text>
                                    {renderVideo(Data.videoURL)}
                                  </View>

                                :null)}
                    </View>}
                </View>
                <View style={styles.sectionView}>
                    <FlatList
                        data={cardData}
                        keyExtractor={(item) => item.id}
                        showsVerticalScrollIndicator={false}
                        ListHeaderComponent={() => {
                            return(
                                <View style={styles.contentHeading}>
                                    <Text style={styles.titleText} numberOfLines={1}>Content Upload</Text>
                                </View>
                            )}
                        }
                        renderItem={({ item }) => _renderContent(item)}
                    />
                </View>
            </ScrollView>
        </View>
    );

};
export default CourseContentPlay;
