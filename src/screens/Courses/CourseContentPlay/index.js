//================================ React Native Imported Files ======================================//

import React,{useState,useEffect} from "react";
import {
    View,
    Text,
    ScrollView,
    StatusBar,
    FlatList,
    Image,
    Platform, Linking,
} from "react-native";
import {useSelector} from "react-redux";
import Video from "react-native-video";

//================================ Local Imported Files ======================================//

import styles from "./style";
import images from "../../../assets/images/images";
import colors from "../../../assets/colors/colors";
import AppHeader from "../../../components/AppHeader";
import CourseContentView from "../../../components/CourseContentListComponent";

const CourseContentPlay = (props) => {

    const token = useSelector((state) => state.ApiData.token);
    const [title,setTitle]        = useState('');
    const [cardData,setCardData]  = useState([]);
    const [Data,setData]           = useState('');


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
        if(item.contentType === 'text'){
            Linking.openURL(item.videoURL)
        }else {
            console.log('Item',item);
            setData(item)
        }
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
                            {Data.contentType !== 'text' && <View style={styles.videoSection}>
                                {Data.contentType === 'image' ?
                                    // <Text>{Data.videoURL}</Text>
                                    <Image source={{uri: Data.videoURL}} style={styles.announceImage}/>
                                    :
                                    (Data.contentType === 'video' &&
                                        <Video
                                            source={{uri: Data.videoURL}}
                                            controls={Platform.OS === 'ios'}
                                            repeat={true}
                                            muted={true}
                                            style={styles.backgroundVideo}
                                            playInBackground={false}
                                            resizeMode={'cover'}
                                        />
                                    )}
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
