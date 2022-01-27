//================================ React Native Imported Files ======================================//

import React, {useEffect, useState} from 'react';
import {View, Text, StatusBar} from 'react-native';
import {
    heightPercentageToDP as hp,
    widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import Toast from "react-native-simple-toast";
import {useSelector} from "react-redux";

//================================ Local Imported Files ======================================//

import styles from './style';
import colors from '../../../assets/colors/colors';
import fonts from '../../../assets/fonts/fonts';
import images from "../../../assets/images/images";
import ApiHelper from "../../../api/ApiHelper";
import {ADD_NEW_CARD_SCREEN, LIVE_EVENTS} from "../../../constants/navigators";
import Button from '../../../components/Button/Button';
import CreditCard from '../../../assets/images/credit_card.svg';
import AppHeader from "../../../components/AppHeader";
import AppLoading from "../../../components/AppLoading";


const ResourceBuyScreen = props => {

    const token = useSelector((state) => state.ApiData.token);
    let userData = useSelector(state => state.ApiData.loginData);
    const [planName,setPlanName] = useState('');
    const [title,setTitle] = useState('');
    const [loading,setLoading] = useState(false);


    useEffect(() => {
        if(props.route.params.fromResource === true){
            setPlanName(props.route.params.price)
            setTitle('document');
        } else if(props.route.params.fromEvent === true){
            setPlanName(props.route.params.price)
            setTitle('event');
        }
    }, []);


    const onPressYes = () => {
        if(userData.card !== null){
            if(props.route.params.fromResource === true) {
                let url = '/api/v1/resources/documentbuy';
                let object = JSON.stringify({
                    "resource_id": props.route.params.resourceId
                });
                subscribeFreeCourse(url,object);
            } else if(props.route.params.fromEvent === true){
                let url = '/api/v1/zoom/join';
                let object = JSON.stringify({
                    "id": props.route.params.eventId
                });
                subscribeFreeCourse(url,object);
            }
        } else {
            props.navigation.navigate(ADD_NEW_CARD_SCREEN)
        }
    };


    const subscribeFreeCourse = (url,object) => {
        setLoading(true)
        ApiHelper.enrollCourse(token,object,url,(resp) => {
            if(resp.isSuccess){
                console.log('response',resp.response)
                setLoading(false);
                if(resp.response.data.code === 200 || resp.response.data.code === 201){
                    setTimeout(() => {
                        Toast.show('Successfully Subscribe',Toast.LONG);
                    },1000)
                    {props.route.params.fromEvent ? props.navigation.navigate(LIVE_EVENTS) : props.navigation.goBack()}
                } else if(resp.response.data.code === 400) {
                    setTimeout(() => {
                        Toast.show(resp.response.data.error, Toast.LONG);
                    },200)
                }
            }else{
                setLoading(false);
                console.log('Error',resp.response.response)
                if(resp.response.response.data.code === 400) {
                    setTimeout(() => {
                        Toast.show(resp.response.response.data.error, Toast.LONG);
                    },200)
                } else {
                    setTimeout(() => {
                        Toast.show(resp.response.response.data.message,Toast.LONG)
                    },200)
                }
            }
        })
    }


    return (
        <View style={styles.mainContainer}>
            {AppLoading.renderLoading(loading)}
            <StatusBar backgroundColor={colors.app_background} />
            <View style={styles.headerView}>
                <AppHeader
                    leftIconPath={images.back_icon}
                    onLeftIconPress={() => props.navigation.goBack()}
                />
            </View>
            <View style={styles.imageView}>
                <CreditCard height={350} width={350}/>
            </View>
            <View style={styles.headingView}>
                <Text style={styles.headingText}>Credit/Debit Card</Text>
            </View>
            <View style={styles.subHeadingView}>
                <Text style={styles.subHeadingText}>
                    {title === 'document' ? `Are you sure you want to purchase this ${title}?` : `Are you sure you want to buy this ${title}?`}
                </Text>
            </View>
            <View style={[styles.subHeadingView, {height: hp(5)}]}>
                <Text style={[styles.headingText, {fontFamily: fonts.regular}]}>
                    $ {planName / 100}.00
                </Text>
            </View>
            <View style={styles.buttonView}>
                <View style={styles.btnView}>
                    <Button
                        width={wp(40)}
                        buttonText={'No'}
                        onPress={() => props.navigation.goBack()}
                    />
                </View>
                <View style={styles.btnView}>
                    <Button
                        width={wp(40)}
                        buttonText={'Yes'}
                        bgColor={colors.white}
                        borderColor={colors.white}
                        textColor={colors.black}
                        onPress={() => onPressYes()}
                    />
                </View>
            </View>
        </View>
    );
};

export default ResourceBuyScreen;
