//================================ React Native Imported Files ======================================//

import React, {useEffect, useState} from 'react';
import {View, Text, StatusBar} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

//================================ Local Imported Files ======================================//

import styles from './style';
import colors from '../../../assets/colors/colors';
import fonts from '../../../assets/fonts/fonts';
import {ADD_CARD, DASHBOARD_SCREEN} from '../../../constants/navigators';
import images from "../../../assets/images/images";
import Button from '../../../components/Button/Button';
import CreditCard from '../../../assets/images/credit_card.svg';
import AppHeader from "../../../components/AppHeader";
import ApiHelper from "../../../api/ApiHelper";
import Toast from "react-native-simple-toast";
import {useSelector} from "react-redux";
import AppLoading from "../../../components/AppLoading";


const CardScreen = props => {

    const token = useSelector((state) => state.ApiData.token);
    const [planName,setPlanName] = useState('');
    const [title,setTitle] = useState('');
    const [loading,setLoading] = useState(false);

    useEffect(() => {
       if(props.route.params.fromSignUp === true){
           setPlanName(props.route.params.planName.amount);
           setTitle('plan');
       } else if (props.route.params.fromCourse === true){
           setPlanName(props.route.params.price)
           setTitle('course');
       }
    }, []);


    const onPressYes = () => {
        if(props.route.params.fromSignUp === true) {
            props.navigation.navigate(ADD_CARD, {
                planName: props.route.params.planName,
            });
        } else if(props.route.params.fromCourse === true){
            subscribeFreeCourse()
        }
    };


    const subscribeFreeCourse = () => {
        setLoading(true)
        let url = '/api/v1/courses/enroll';
        let object = JSON.stringify({
            "courseid": props.route.params.courseId
        });
        ApiHelper.enrollCourse(token,object,url,(resp) => {
            if(resp.isSuccess){
                setLoading(false);
                setTimeout(() => {
                    Toast.show('Successfully Subscribe',Toast.LONG);
                },300)
                props.navigation.navigate(DASHBOARD_SCREEN)
            }else{
                setLoading(false);
                console.log('Error',resp.response.response)
                setTimeout(() => {
                    Toast.show(resp.response.response.data.message,Toast.LONG)
                },200)
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
          Are you sure you want to purchase this {title}?
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

export default CardScreen;
