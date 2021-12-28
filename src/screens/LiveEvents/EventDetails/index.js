//================================ React Native Imported Files ======================================//

import React, {useEffect, useState} from "react";
import {
    View,
    Text,
    ScrollView,
    StatusBar,
    ActivityIndicator,
    ImageBackground,
    TouchableOpacity, Linking, LogBox,
} from "react-native";
import {
    widthPercentageToDP as wp,
} from "react-native-responsive-screen";
import {useSelector} from "react-redux";
import Toast from "react-native-simple-toast";
import Clipboard from '@react-native-clipboard/clipboard';
import moment from "moment";
import {useIsFocused} from "@react-navigation/native";

//================================ Local Imported Files ======================================//

import styles from "./style";
import images from "../../../assets/images/images";
import colors from "../../../assets/colors/colors";
import fonts from "../../../assets/fonts/fonts";
import ApiHelper from "../../../api/ApiHelper";
import {CREDIT_CARD} from "../../../constants/navigators";
import AppHeader from "../../../components/AppHeader";
import Share from "../../../assets/images/copyLink.svg";
import Button from "../../../components/Button/Button";
import AppLoading from "../../../components/AppLoading";

const EventDetailScreen = (props) => {

    const isFocused = useIsFocused();
    const token = useSelector((state) => state.ApiData.token);
    const [loading,setLoading] = useState(false);
    const [courseDetails,setCourseDetails] = useState('');
    const [coursePrice,setCoursePrice]     = useState('');
    const [btnTitle,setBtnTitle]           = useState('');
    const [isDisabled,setIsDisabled]       = useState(false);
    const [showBtn,setShowBtn]             = useState(true);

    const [isLoaded,setIsLoaded] = useState(false);
    const [isError,setIsError]   = useState(false);


    useEffect(() => {
        if(props.route.params !== undefined){
            setCourseDetails(props.route.params.item)
            if(props.route.params.item.isLock){
                setBtnTitle('Buy Now')
                setCoursePrice(props.route.params.item.price)
                setShowBtn(true)
            } else {
                setCoursePrice(props.route.params.item.price)
                setShowBtn(false)
            }
        }
    }, [isFocused]);


    const _onPressButton = () => {
        setIsDisabled(true)
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
                setIsDisabled(false)
                console.log('Error',resp.response.response)
            }
        })
    }


    const copyToClipboard = () => {
        Clipboard.setString(`${courseDetails.link}`);
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
                                        source={courseDetails.image === '' ? images.placeHolder : {uri: courseDetails.image}}
                                        style={styles.imageStyles}
                                        imageStyle={styles.imageStyles}
                                        onLoadEnd={() => setIsLoaded(true)}
                                        onError={() => setIsError(true)}
                                    >
                                        {
                                            (isLoaded && !isError) ? null :
                                               !isError &&
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
                                    <Text style={[styles.titleText,{fontSize:wp(3.6),width:wp(80)}]} numberOfLines={2}>{courseDetails.description}</Text>
                                </View>
                                <View style={styles.lowerTitleView}>
                                    <Text style={[styles.titleText,{fontSize:wp(3.4),color:colors.greyTxt,fontFamily:fonts.regular,fontWeight:'700',width:wp(60)}]} numberOfLines={2}>{moment(courseDetails.startDate).format('ddd')}, {courseDetails.date} - {moment(courseDetails.startDate).format('HH:mm')}</Text>
                                    <Text style={[styles.titleText,{fontSize:wp(4),color:colors.button_text,width:wp(20),textAlign:'right',}]} numberOfLines={2}>{coursePrice > 0 ? `$ ${coursePrice/100}.00` : 'Free'}</Text>
                                </View>
                            </View>
                        </View>

                        <View style={styles.sectionView}>
                            <View style={styles.contentHeading}>
                                <Text style={styles.titleText} numberOfLines={1}>Event Link</Text>
                                {showBtn ? null :
                                    <TouchableOpacity
                                        style={styles.backView}
                                        activeOpacity={0.7}
                                        onPress={() => copyToClipboard()}
                                    >
                                        <Share height={40} width={40}/>
                                    </TouchableOpacity>}
                            </View>
                            <View style={styles.linkView}>
                                {showBtn !== true ?
                                    <View style={styles.linkTextView}>
                                        <Text style={[styles.titleText, {fontSize: wp(4)}]}
                                              onPress={() => Linking.openURL(courseDetails.link)}>{courseDetails.link}
                                        </Text>
                                    </View> :
                                    <Text style={[styles.titleText, {fontSize: wp(4)}]}>Buy This Event And Get The Joining Link
                                    </Text>
                                }
                            </View>
                        </View>

                    </ScrollView>
                </View>)}

            {showBtn === true && loading !== true ? <View style={styles.btnView}>
                <Button
                    disabled={isDisabled}
                    buttonText={btnTitle}
                    onPress={() => _onPressButton()}
                />
            </View> : null}
        </View>
    );

};
export default EventDetailScreen;
