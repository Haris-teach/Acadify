//================================ React Native Imported Files ======================================//

import React,{useState,useEffect} from "react";
import {
    View,
    Text,
    Linking,
    FlatList,
    Platform,
    StatusBar,
    ScrollView,
    ImageBackground,
    ActivityIndicator,
} from "react-native";
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
    const [title,setTitle]        = useState('');
    const [cardData,setCardData]  = useState([]);
    const [Data,setData]          = useState('');
    const [isLoaded,setIsLoaded] = useState(false);
    const [isError,setIsError] = useState(false);
    const [isShowActivity,setIsShowActivity] = useState(true);


    useEffect(() => {
        setData(props.route.params.section.data[0]);
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
        if(item.contentType === 'text' || item.contentType === 'link' || item.contentType === 'application'){
            Linking.openURL(item.videoURL)
        } else {
            setData(item)
        }
    }


    const renderVideo = (item) => {
        return(
            <Video
                source={{uri: item}}
                controls={Platform.OS === 'ios'}
                repeat={true}
                muted={true}
                style={{width:wp(95), height:hp(25)}}
                playInBackground={false}
                resizeMode={'cover'}
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
                    {Data.contentType !== 'text' && Data.contentType !== 'link' && Data.contentType !== 'application' &&
                    <View style={styles.videoSection}>
                        {Data.contentType === 'image' ?
                            <View style={{justifyContent:'center',alignItems:'center'}}>
                                <ImageBackground
                                    source={{uri: Data.videoURL}}
                                    style={{height:hp(28),justifyContent:'center',alignItems:'center',width:wp(95)}}
                                    imageStyle={{height:hp(32),justifyContent:'center',alignItems:'center',width:wp(95)}}
                                    resizeMode={'cover'}
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
                                </ImageBackground>
                            </View> :
                            (Data.contentType === 'video' ?
                                <View style={{height:hp(32),justifyContent:'center',alignItems:'center',width:wp(100)}}>
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
