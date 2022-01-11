//================================ React Native Imported Files ======================================//

import React, {useEffect, useState} from 'react';
import {
    View,
    Text,
    FlatList,
    StatusBar,
    ScrollView,
    TouchableOpacity,
} from 'react-native';
import AsyncStorage from "@react-native-async-storage/async-storage";
import {widthPercentageToDP} from 'react-native-responsive-screen';
import {CommonActions, useIsFocused} from '@react-navigation/native';
import {useDispatch, useSelector} from "react-redux";
import Toast from 'react-native-simple-toast';

//================================ Local Imported Files ======================================//

import styles from './style';
import colors from '../../../assets/colors/colors';
import images from "../../../assets/images/images";
import ApiHelper from '../../../api/ApiHelper';
import {CREDIT_CARD, MY_TAB} from '../../../constants/navigators';
import AppLoading from '../../../components/AppLoading';
import Button from '../../../components/Button/Button';
import AppHeader from '../../../components/AppHeader';
import Yearly from '../../../assets/images/yearly.svg';
import Free from '../../../assets/images/free.svg';
import Tick from '../../../assets/images/tick.svg';
import Monthly from '../../../assets/images/monthly.svg';
import LIFETIME from '../../../assets/images/LIFETIME.svg';
import * as ApiDataActions from "../../../../redux/store/actions/ApiData";

const PlanScreen = props => {

    const dispatch = useDispatch();
    const isFocused = useIsFocused();
    const data = useSelector(state => state.ApiData.signUpData);
    const token = useSelector(state => state.ApiData.token);
    const [loading, setLoading] = useState(false);
    const [packages, setPackages] = useState('');
    const [indexFeature, setIndexFeature] = useState('');
    const [stripeId, setStripeId] = useState('');
    const [planName, setPlaneName] = useState('');
    const [setIndex, setIndexValue] = useState(0);
    const [isVisible, setVisible] = useState(false);
    const [packageData,setPackageData] = useState('');


    useEffect(() => {
        getPlans();
    }, [isFocused]);


    const getPlans = () => {
    setLoading(true);
    ApiHelper.onGetPlan(response => {
      if (response.isSuccess) {
        setLoading(false);
        if (response.response.data.code === 200) {
          console.log('Response ===>', response.response.data);
          setIndexValue(0);
            setPackageData(response.response.data.result[0].name)
            setPackages(response.response.data.result[0].Stripes);
            setIndexFeature(response.response.data.result[0].Stripes[0].Rights);
          setPlaneName(response.response.data.result[0].Stripes[0]);
          setStripeId(
            response.response.data.result[0].Stripes[0].id,
          );
          setVisible(true);
        }
      } else {
        setLoading(false);
      }
    });
  };

    const onPressPlan = (item, index) => {
        setIndexValue(index);
        setIndexFeature(item.Rights);
        setStripeId(item.id);
        setPlaneName(item);
    };


    const renderItemsFeature = (item, index) => {
        return (
            <View style={styles.miniContainer}>
                <Tick height={25} width={25} />
                <Text style={styles.featureInnerText}>{item.access}</Text>
            </View>
        );
    };


    const onChoose = () => {
        if (planName.interval !== 'free') {
            props.navigation.navigate(CREDIT_CARD, {
                planName,
                fromSignUp:true
            });
        } else {
            setLoading(true);
            ApiHelper.onSignUpApi(stripeId, data, response => {
                if (response.isSuccess) {
                    if (response.response.data.code === 200) {
                        dispatch(ApiDataActions.SetUserToken(response.response.data.data.token));
                        dispatch(ApiDataActions.SetLoginData(response.response.data.data));
                        setData(JSON.stringify(response.response.data.data));
                        setLoading(false);
                        props.navigation.dispatch(
                            CommonActions.reset({
                                index: 0,
                                routes: [{name: MY_TAB}],
                            }),
                        );
                    } else {
                        setLoading(false);
                        console.log('Error ==>', response.response);
                        setTimeout(() => {
                            Toast.show(response.response.data.error.email, Toast.LONG);
                        },200)
                    }
                } else {
                    setLoading(false);
                    console.log('Error ==>', response.response);
                }
            });
        }
    };


    const updatePlan = () => {
        setLoading(true);
        clearData();
        let url='/api/v1/stripe/change_plan';
        let data = JSON.stringify({
            'StripeId':stripeId
        })
        ApiHelper.onChangePlan(token,data,url,response => {
            if (response.isSuccess) {
                if (response.response.data.code === 200) {
                    setLoading(false);
                    console.log('Success of Change Plan ==>', response.response.data.data);
                    dispatch(ApiDataActions.SetUserToken(response.response.data.data.token));
                    dispatch(ApiDataActions.SetLoginData(response.response.data.data));
                    setRights(response.response.data.data);
                    setTimeout(() => {
                        Toast.show('Plan Successfully Updated...', Toast.LONG);
                    },200)
                    props.navigation.goBack();
                } else {
                    setLoading(false);
                    console.log('Error ==>', response.response);
                    setTimeout(() => {
                        Toast.show(response.response.data.error.email, Toast.LONG);
                    },200)
                }
            } else {
                setLoading(false);
                setTimeout(() => {
                    Toast.show(response.response.response.data.message, Toast.LONG);
                },200)
                console.log('Error ===>', response.response.response.data.message);
            }
        });
    }


    const setRights = (data) => {
        if(data.user.UserRights.length > 0){
            data.user.UserRights.map((value) => {
                if(value.access === 'resources'){
                    dispatch(ApiDataActions.SetUserResource(true));
                } else if(value.access === 'goals'){
                    dispatch(ApiDataActions.SetUserGoal(true));
                } else if(value.access === 'journey'){
                    dispatch(ApiDataActions.SetUserJourney(true));
                } else if(value.access === 'courses'){
                    dispatch(ApiDataActions.SetUserCourse(true));
                } else if(value.access === 'zoom'){
                    dispatch(ApiDataActions.SetUserZoom(true));
                } else if(value.access === 'forum'){
                    dispatch(ApiDataActions.SetUserForum(true));
                }
            })
        }
    }


    const clearData = () => {
        dispatch(ApiDataActions.SetUserResource(false));
        dispatch(ApiDataActions.SetUserGoal(false));
        dispatch(ApiDataActions.SetUserJourney(false));
        dispatch(ApiDataActions.SetUserCourse(false));
        dispatch(ApiDataActions.SetUserZoom(false));
        dispatch(ApiDataActions.SetUserForum(false));
    }


    const renderItems = (item, index) => {
        return (
            <TouchableOpacity
                style={
                    setIndex !== index
                        ? styles.container :
                        [
                            styles.container,
                            {borderWidth: 2, borderColor: colors.button_text},
                        ]
                }
                activeOpacity={0.7}
                onPress={() => onPressPlan(item, index)}>
                <View style={styles.imageView}>
                    {item.interval === 'year' ? <Yearly height={45} width={45} /> : null}
                    {item.interval === 'month' ? <Monthly /> : null}
                    {item.interval === 'lifetime' ? (
                        <LIFETIME height={45} width={45} />
                    ) : null}
                    {item.interval === 'free' ? <Free height={45} width={45} /> : null}
                </View>
                <View style={styles.nameView}>
                    <Text style={styles.nameText}>{item.interval}</Text>
                </View>
                <View style={styles.priceView}>
                    <Text style={styles.dollarSign}>$</Text>
                    <Text style={styles.priceValue}>{item.amount / 100}</Text>
                </View>
            </TouchableOpacity>
        );
    };


    const setData = async(value) => {
        try {
            await AsyncStorage.setItem('user',value);
        }catch (error) {
            console.log('Error',error)
        }
    }


  return (
    <ScrollView
      style={styles.mainContainer}
      showsVerticalScrollIndicator={false}>
        {AppLoading.renderLoading(loading)}
      <StatusBar backgroundColor={colors.app_background} />
        <View style={styles.headerView}>
            <AppHeader
                title={props.route.params.fromChange ? 'Change Plan' : 'Payment Plan'}
                leftIconPath={images.back_icon}
                onLeftIconPress={() => props.navigation.goBack()}
            />
      </View>
      <View style={styles.headingView}>
        <Text style={styles.headingText}>
          The Place You can learn Every Thing
        </Text>
        <Text style={styles.subHeadingText}>{packageData} Pricing Plan</Text>
      </View>
      <View style={styles.planView}>
        <FlatList
          data={packages}
          extraData={packages}
          horizontal={true}
          keyExtractor={item => item.id}
          showsHorizontalScrollIndicator={false}
          renderItem={({item, index}) => renderItems(item, index)}
          nestedScrollEnabled={true}
        />
      </View>
      {isVisible ? (
        <View style={styles.featureViewText}>
          <Text style={styles.headingFeatureText}>Featured</Text>
        </View>
      ) : null}
      <View style={styles.featureView}>
          <FlatList
            data={indexFeature}
            extraData={indexFeature}
            keyExtractor={item => item.id}
            showsVerticalScrollIndicator={false}
            renderItem={({item, index}) => renderItemsFeature(item, index)}
          />
      </View>
      {isVisible ? (
        <View style={styles.buttonView}>
            <View style={styles.btnView}>
                <Button
                    width={widthPercentageToDP(40)}
                    buttonText={'Cancel'}
                    onPress={() => props.navigation.goBack()}
                />
            </View>

          <View style={styles.btnView}>
            <Button
              width={widthPercentageToDP(40)}
              buttonText={props.route.params.fromChange ? 'Update' : 'Choose Plan'}
              bgColor={colors.white}
              borderColor={colors.white}
              textColor={colors.black}
              onPress={() => props.route.params.fromChange ? updatePlan() : onChoose()}
            />
          </View>
        </View>
      ) : null}
    </ScrollView>
  );
};

export default PlanScreen;
