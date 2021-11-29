//================================ React Native Imported Files ======================================//

import React,{useState,useEffect} from "react";
import {
    View,
    Text,
    ScrollView,
    StatusBar,
    FlatList,
    Image,
    Platform,
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


    useEffect(() => {
        setTitle(props.route.params.courseDetails.title);
        setCardData(props.route.params.section.data);
    },[])


    const _renderContent = (item) => {
        return(
            <CourseContentView
                isDisable={false}
                image={item.imageURL}
                title={item.title}
                description={item.description}
                onPressContent={() => console.log('Card',item)}
            />
        )
    }


    return (
        <View style={styles.mainContainer}>
            <StatusBar backgroundColor={colors.image_background} />
                {/*<View style={styles.scrollSpace}>*/}
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
                            <View style={styles.videoSection}>
                                {/*{hasImage ? <Image source={{uri: announcement.contentUrl}} style={styles.announceImage}/> :*/}
                                {/*    <Video*/}
                                {/*        source={{uri: announcement.contentUrl}}*/}
                                {/*        controls={Platform.OS === 'ios'}*/}
                                {/*        repeat={true}*/}
                                {/*        muted={true}*/}
                                {/*        style={styles.backgroundVideo}*/}
                                {/*        playInBackground={false}*/}
                                {/*        resizeMode={'cover'}*/}
                                {/*    />*/}
                                {/*}*/}
                            </View>
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
                {/*</View>*/}
        </View>
    );

};
export default CourseContentPlay;
