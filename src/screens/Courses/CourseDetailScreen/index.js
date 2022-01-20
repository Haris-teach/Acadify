//================================ React Native Imported Files ======================================//

import React,{useState,useEffect} from "react";
import {
    View,
    Text,
    StatusBar,
    ScrollView,
    SectionList,
    ImageBackground,
    ActivityIndicator,
} from "react-native";
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp
} from "react-native-responsive-screen";
import {useSelector} from "react-redux";
import Toast from "react-native-simple-toast";

//================================ Local Imported Files ======================================//

import styles from "./style";
import images from "../../../assets/images/images";
import colors from "../../../assets/colors/colors";
import fonts from "../../../assets/fonts/fonts";
import ApiHelper from "../../../api/ApiHelper";
import {COURSE_CONTENT_PLAY, CREDIT_CARD} from "../../../constants/navigators";
import AppHeader from "../../../components/AppHeader";
import Button from "../../../components/Button/Button";
import AppLoading from "../../../components/AppLoading";
import CourseContentView from "../../../components/CourseContentListComponent";

const CourseDetailScreen = ({navigation,route}) => {

    const token = useSelector((state) => state.ApiData.token);
    const [loading,setLoading] = useState(false);
    const [courseDetails,setCourseDetails] = useState('');
    const [coursePrice,setCoursePrice]     = useState('');
    const [btnTitle,setBtnTitle]           = useState('');
    const [courseTitleData,setContentData] = useState([]);
    const [isDisabled,setIsDisabled]       = useState(true);
    const [showBtn,setShowBtn]             = useState(true);

    const [isLoaded,setIsLoaded] = useState(false);
    const [isError,setIsError]   = useState(false);
    const [isShowActivity,setIsShowActivity] = useState(true);


    useEffect(() => {
        return navigation.addListener('focus', () => {
            getSingleCourse();
        });
    },[navigation])


    const _renderContent = (item,section) => {
        return(
            <CourseContentView
                isDisable={isDisabled}
                image={item.imageURL}
                title={item.title}
                description={item.description}
                // onPressContent={() => console.log('Section Data',section)}
                onPressContent={() => navigation.navigate(COURSE_CONTENT_PLAY,{courseDetails:courseDetails,section})}
            />
        )
    }


    const getSingleCourse = () => {
        setLoading(true);
        let tempArray = [];
        ApiHelper.getSingleCourse(token,route.params.courseId,(response) => {
            if (response.isSuccess) {
                if(response.response.data.code === 200){
                    ApiHelper.consoleBox('SingleCourse ===>',response.response.data.data)
                    response.response.data.data.CourseSections?.map((value) => {
                        tempArray.push({
                            id:value.id,
                            title:value.title,
                            data:value.CourseContents,
                            description:value.description
                        })
                    })
                    setContentData(tempArray);
                    if(response.response.data.data.CoursePayeds.length > 0){
                        if(response.response.data.data.CoursePayeds[0].paid){
                            setIsDisabled(false)
                            setCoursePrice(response.response.data.data.Courseprices[0].price);
                            setShowBtn(false)
                            setCourseDetails(response.response.data.data);
                            setLoading(false)
                        }else{
                            setIsDisabled(true);
                            setCoursePrice(response.response.data.data.CoursePayeds[0].price);
                            setBtnTitle('Subscribe Course')
                            setShowBtn(true)
                            setLoading(false)
                            setCourseDetails(response.response.data.data);
                        }
                    }else{
                        if(response.response.data.data.Courseprices[0].price > 0){
                            setCourseDetails(response.response.data.data);
                            setCoursePrice(response.response.data.data.Courseprices[0].price);
                            setBtnTitle('Buy Now')
                            setShowBtn(true)
                            setLoading(false);
                        }else{
                            setCourseDetails(response.response.data.data);
                            setCoursePrice(response.response.data.data.Courseprices[0].price);
                            setBtnTitle('Subscribe Course')
                            setShowBtn(true)
                            setLoading(false);
                        }
                    }
                }
            }else{
                setLoading(false)
                ApiHelper.consoleBox('Course Error',response.response.response);
            }
        })
    }


    const _onPressButton = () => {
        if(coursePrice > 0){
            navigation.navigate(CREDIT_CARD,{
                fromCourse:true,
                price:coursePrice,
                courseId:courseDetails.id
            })
        } else {
            subscribeFreeCourse();
        }
    }


    const subscribeFreeCourse = () => {
        setLoading(true)
        let url = '/api/v1/courses/enroll';
        let object = JSON.stringify({
            "courseid": courseDetails.id
        });
        ApiHelper.enrollCourse(token,object,url,(resp) => {
            if(resp.isSuccess){
                setLoading(false);
                setLoading(false);
                setTimeout(() => {
                    Toast.show('Successfully Subscribe',Toast.LONG);
                },200)
                setShowBtn(false)
                setIsDisabled(false)
            }else{
                setLoading(false);
                console.log('Error',resp.response.response)
            }
        })
    }


    return (
        <View style={styles.mainContainer}>
            <StatusBar backgroundColor={colors.image_background} />
            {AppLoading.renderLoading(loading)}
            {loading ? null : (
                <View style={showBtn ? styles.scrollSpace : [styles.scrollSpace,{flex:1}]}>
                    <ScrollView
                        showsVerticalScrollIndicator={false}
                        bounces={false}
                    >
                        <View style={styles.headerView}>
                            <AppHeader
                                leftIconPath={images.back_icon}
                                backgroundColor={colors.image_background}
                                onLeftIconPress={() => navigation.goBack()}
                            />
                        </View>

                        <View style={styles.cardDetail}>
                            <View style={styles.headingView}>
                                <Text style={styles.titleText} numberOfLines={1}>{courseDetails.title}</Text>
                                {/*<TouchableOpacity*/}
                                {/*    activeOpacity={0.7}*/}
                                {/*    onPress={() => copyToClipboard()}*/}
                                {/*>*/}
                                {/*    <Share/>*/}
                                {/*</TouchableOpacity>*/}
                            </View>
                            <View style={styles.imageSection}>
                                <View style={styles.imageView}>
                                    <ImageBackground
                                        source={courseDetails.imageURL === '' ? images.placeHolder : {uri: courseDetails.imageURL}}
                                        style={styles.imageStyles}
                                        imageStyle={styles.imageStyles}
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
                                </View>
                            </View>
                            <View style={styles.textSection}>
                                <View style={styles.upperTitleView}>
                                    <Text style={[styles.titleText,{fontSize:wp(3.6)}]} numberOfLines={2}>{courseDetails.description}</Text>
                                </View>
                                <View style={styles.lowerTitleView}>
                                    <Text style={[styles.titleText,{fontSize:wp(3.4),color:colors.greyTxt,fontFamily:fonts.regular,fontWeight:'300',width:wp(62)}]} numberOfLines={2}>{courseDetails.createdby}</Text>
                                    <Text style={[styles.titleText,{fontSize:wp(4),color:colors.button_text}]} numberOfLines={2}>{coursePrice > 0 ? `$ ${coursePrice/100}.00` : 'Free'}</Text>
                                </View>
                            </View>
                        </View>


                        <View style={styles.sectionView}>
                            <SectionList
                                sections={courseTitleData}
                                keyExtractor={(item) => item.id}
                                scrollEnabled={false}
                                showsVerticalScrollIndicator={false}
                                ListEmptyComponent={() => {
                                    return(
                                        <View style={styles.emptySection}>
                                            <Text style={[styles.titleText,{fontSize:wp(4),width:wp(100),textAlign:'center'}]}>This Course has no Content</Text>
                                        </View>
                                    )
                                }}
                                ListHeaderComponent={() => {
                                    return(
                                        <View style={styles.contentHeading}>
                                            <Text style={styles.titleText} numberOfLines={1}>Content List</Text>
                                        </View>
                                    )
                                }}
                                renderItem={({ item,section }) => _renderContent(item,section)}
                                renderSectionHeader={({ section: { title } }) =>
                                    <View style={[styles.contentHeading,{height:hp(4)}]}>
                                        <Text style={[styles.titleText,{fontSize:wp(4),fontWeight:'400'}]}>{title}</Text>
                                    </View>
                                }
                            />
                        </View>

                    </ScrollView>
                </View>)}

            {showBtn === true && loading !== true ? <View style={styles.btnView}>
                <Button
                    buttonText={btnTitle}
                    onPress={() => _onPressButton()}
                />
                </View> : null}
        </View>
    );

};
export default CourseDetailScreen;
