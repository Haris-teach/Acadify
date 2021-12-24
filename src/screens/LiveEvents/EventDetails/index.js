//================================ React Native Imported Files ======================================//

import React,{useState,useEffect} from "react";
import {
    View,
    Text,
    TouchableOpacity,
    ScrollView,
    SectionList,
    StatusBar,
    ActivityIndicator,
    ImageBackground,
} from "react-native";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";
import {useSelector} from "react-redux";
import Toast from "react-native-simple-toast";
import Clipboard from '@react-native-clipboard/clipboard';

//================================ Local Imported Files ======================================//

import styles from "./style";
import images from "../../../assets/images/images";
import colors from "../../../assets/colors/colors";
import fonts from "../../../assets/fonts/fonts";
import ApiHelper from "../../../api/ApiHelper";
import {CREDIT_CARD} from "../../../constants/navigators";
import AppHeader from "../../../components/AppHeader";
import Share from "../../../assets/images/share.svg";
import Button from "../../../components/Button/Button";
import AppLoading from "../../../components/AppLoading";
import CourseContentView from "../../../components/CourseContentListComponent";


const EventDetailScreen = (props) => {

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



    const _onPressButton = () => {
        if(coursePrice > 0){
            props.navigation.navigate(CREDIT_CARD,{
                fromCourse:true,
                price:coursePrice
            })
        } else {
            subscribeFreeCourse();
        }
    }


    const subscribeFreeCourse = () => {
        setLoading(true)
        let object = JSON.stringify({
            "courseid": courseDetails.id
        });
        ApiHelper.enrollCourse(token,object,(resp) => {
            if(resp.isSuccess){
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


    const copyToClipboard = () => {
        // Clipboard.setString(`${code}`);
        Toast.show("Link Copied", Toast.LONG);
    };


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
                                onLeftIconPress={() => props.navigation.goBack()}
                            />
                        </View>

                        <View style={styles.cardDetail}>
                            <View style={styles.headingView}>
                                <Text style={styles.titleText} numberOfLines={1}>{courseDetails.title}</Text>
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
                                    {/*<Text style={[styles.titleText,{fontSize:wp(3.4),color:colors.greyTxt,fontFamily:fonts.regular,fontWeight:'300',width:wp(62)}]} numberOfLines={2}>{courseDetails.createdby}</Text>*/}
                                    {/*<Text style={[styles.titleText,{fontSize:wp(4),color:colors.button_text}]} numberOfLines={2}>{coursePrice > 0 ? `$ ${coursePrice/100}.00` : 'Free'}</Text>*/}
                                </View>
                            </View>
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
export default EventDetailScreen;
