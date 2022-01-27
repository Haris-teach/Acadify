//================================ React Native Imported Files ======================================//

import React, {useEffect, useState} from 'react';
import {
    View,
    Text,
    FlatList,
    StatusBar,
    ScrollView,
    RefreshControl,
    TouchableOpacity,
} from 'react-native';
import {
    widthPercentageToDP,
    widthPercentageToDP as wp
} from "react-native-responsive-screen";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import {useIsFocused} from "@react-navigation/native";
import {useDispatch, useSelector} from "react-redux";
import Toast from "react-native-simple-toast";
import moment from "moment";

//================================ Local Imported Files ======================================//

import styles from './style';
import colors from '../../../assets/colors/colors';
import ApiHelper from "../../../api/ApiHelper";
import images from "../../../assets/images/images";
import AppLoading from "../../../components/AppLoading";
import AppHeader from "../../../components/AppHeader";
import DateImage from "../../../assets/images/date.svg";
import * as ApiDataActions from "../../../../redux/store/actions/ApiData";
import Yearly from "../../../assets/images/yearly.svg";
import Monthly from "../../../assets/images/monthly.svg";
import LIFETIME from "../../../assets/images/LIFETIME.svg";
import Free from "../../../assets/images/free.svg";
import Button from "../../../components/Button/Button";
import Tick from "../../../assets/images/tick.svg";
import BillComponent from "../../../components/BillingComponent";

let page = 1;

const BillingListing = (props) => {

    const isFocused = useIsFocused();
    const dispatch = useDispatch();
    const token = useSelector(state => state.ApiData.token);
    const [loading,setLoading] = useState(false);
    const [dateModal,setDateModal] = useState(false);
    const [endDateModal,setEndDateModal] = useState(false);
    const [darkMode,setDarkMode] = useState(false);
    const [date,setDate] = useState('MM/DD/YYYY');
    const [endDate,setEndDate] = useState('MM/DD/YYYY');
    const [start_date,setStart_Date] = useState('');
    const [end_date,setEnd_Date] = useState('');
    const [title,setTitle] = useState('Billing');
    const [items,setItems] = useState([]);
    const [packageData,setPackageData] = useState('');

    const [catText,setCatText] = useState('bill');

    const [packages, setPackages] = useState('');
    const [indexFeature, setIndexFeature] = useState('');
    const [stripeId, setStripeId] = useState('');
    const [planName, setPlaneName] = useState('');
    const [setIndex, setIndexValue] = useState(0);
    const [pagesLength, setPagesLength] = useState(0);
    const [isVisible, setVisible] = useState(false);


    useEffect(() => {
        setDate('MM/DD/YYYY')
        setEndDate('MM/DD/YYYY')
        setStart_Date('')
        setEnd_Date('')
        page = 1;
        setCatText('bill')
        getTasks();
    },[isFocused])


     const getTasks = () => {
       setLoading(true)
         let url = `/api/v1/payment?start_date=${start_date}&end_date=${end_date}&size=20&page=${page}`;
         ApiHelper.getTasks(token,url,(response) => {
            if(response.isSuccess){
                ApiHelper.consoleBox('Billing success ===>',response.response.data)
                if(response.response.data.code === 201){
                    setLoading(false)
                    setItems([...items, ...response.response.data.data.docs])
                    setPagesLength(response.response.data.data.pages)
                }
            }else {
                setLoading(false)
                ApiHelper.consoleBox('Billing Error ===>',response.response)
            }
        })
    }


    const getPlans = () => {
        setLoading(true);
        ApiHelper.onGetPlan(response => {
            if (response.isSuccess) {
                setLoading(false);
                if (response.response.data.code === 200) {
                    ApiHelper.consoleBox('Response ===>', response.response.data);
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


    const updatePlan = () => {
        setLoading(true);
        clearData(false);
        let url='/api/v1/stripe/change_plan';
        let data = JSON.stringify({
            'StripeId':stripeId
        })
        ApiHelper.onChangePlan(token,data,url,response => {
            if (response.isSuccess) {
                if (response.response.data.code === 200) {
                    setLoading(false);
                    ApiHelper.consoleBox('Success of Change Plan ==>', response.response.data);
                    dispatch(ApiDataActions.SetUserToken(response.response.data.data.token));
                    dispatch(ApiDataActions.SetLoginData(response.response.data.data));
                    setRights(response.response.data.data);
                    setTimeout(() => {
                        Toast.show('Plan Successfully Updated...', Toast.LONG);
                        // props.navigation.goBack();
                    },200)
                } else {
                    setLoading(false);
                    ApiHelper.consoleBox('Error ==>', response.response);
                    setTimeout(() => {
                        Toast.show(response.response.data.error.email, Toast.LONG);
                    },200)
                }
            } else {
                setLoading(false);
                setTimeout(() => {
                    Toast.show(response.response.response.data.message, Toast.LONG);
                },200)
                ApiHelper.consoleBox('Error ===>', response.response.response.data.message);
            }
        });
    }


     const _renderTasksItems = (item,index) => {
        let date = moment(item.createdAt).format("MM/DD/YYYY");
        return(
            <BillComponent
                tNumber={item.id}
                name={item.item}
                pType={item.paymentType}
                charges={item.amount}
                date={date}
                length={items.length}
                index={index}
            />
        )
    }


    const renderItemsFeature = (item, index) => {
        return (
            <View style={styles.miniContainer}>
                <Tick height={25} width={25} />
                <Text style={styles.featureInnerText}>{item.access}</Text>
            </View>
        );
    };


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
        } else {
            clearData(true);
        }
    }


    const clearData = (value) => {
        dispatch(ApiDataActions.SetUserResource(value));
        dispatch(ApiDataActions.SetUserGoal(value));
        dispatch(ApiDataActions.SetUserJourney(value));
        dispatch(ApiDataActions.SetUserCourse(value));
        dispatch(ApiDataActions.SetUserZoom(value));
        dispatch(ApiDataActions.SetUserForum(value));
    }


    const getRefreshTasks = () => {
        setLoading(true)
        ApiHelper.getRefreshTasks(token,start_date,end_date,page,(response) => {
            if(response.isSuccess){
                ApiHelper.consoleBox('Billing success ===>',response.response.data)
                if(response.response.data.code === 201){
                    setLoading(false)
                    setItems(response.response.data.data.docs)
                    page = 1;
                    setStart_Date('')
                    setEnd_Date('')
                    setDate('MM/DD/YYYY')
                    setEndDate('MM/DD/YYYY')
                }
            }else {
                setLoading(false)
                ApiHelper.consoleBox('Billing Error ===>',response.response)
            }
        })
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


    const onConfirmDate = (value) => {
        let finalDateNew = moment(value).format("YYYY-MM-DD h:mm:ss");
        let finalDate = moment(value).format("MM/DD/YYYY");
         setDate(finalDate)
         setStart_Date(finalDateNew)
         setDateModal(false)
    };


     const onCancelDate = () => {
        setDateModal(false)
    };


    useEffect(() => {
        checkDate();
    },[start_date,end_date])


    const onConfirmEndDate = (value) => {
        let finalDateNew = moment(value).format("YYYY-MM-DD h:mm:ss");
        let finalDate = moment(value).format("MM/DD/YYYY");
         setEndDate(finalDate)
         setEnd_Date(finalDateNew)
         setEndDateModal(false)
    };


     const onCancelEndDate = () => {
         setEndDateModal(false)
    };


     const checkDate = () => {
        let start = moment(start_date).format('YYYY-MM-DD')
        let end = moment(end_date).format('YYYY-MM-DD');
        if(start_date !== '' && end_date !== ''){
            if (start > end) {
                alert('End Date must be greater or Equal to Start Date!')
            } else if (start === end) {
                getTasks();
            } else if (end >= end) {
                getTasks();
            }
        }
    }


    const LoadMoreRandomData = () => {
         if(page < pagesLength){
             page = page + 1
             getTasks();
         }
     }


        return (
            <View style={styles.mainContainer}>
                <StatusBar backgroundColor={colors.app_background}/>
                {AppLoading.renderLoading(loading)}
                <View style={styles.headerView}>
                    <AppHeader
                        // title={title}
                        leftIconPath={images.back_icon}
                        onLeftIconPress={() => props.navigation.goBack()}
                    />
                </View>
                <View style={styles.upperView}>
                    <TouchableOpacity
                        style={catText === 'bill' ? [styles.headerStyle, {backgroundColor: colors.button_text}] : styles.headerStyle}
                        onPress={() => {
                            setTitle('Billing')
                            setCatText('bill')
                            getTasks();
                        }}
                    >
                        <Text
                            style={catText === 'bill' ? [styles.headerTextStyle, {color: colors.white}] : styles.headerTextStyle}>Billing</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={catText === 'plan' ? [styles.headerStyle, {backgroundColor: colors.button_text}] : styles.headerStyle}
                        onPress={() => {
                            setTitle('Change Plan')
                            setCatText('plan')
                            getPlans();
                        }}
                    >
                        <Text
                            style={catText === 'plan' ? [styles.headerTextStyle, {color: colors.white}] : styles.headerTextStyle}>Change Plan</Text>
                    </TouchableOpacity>
                </View>
                {catText === 'bill' &&<View style={styles.headingView}>
                    <View style={styles.inputBox}>
                        <Text style={styles.titleText}>Start Date</Text>
                        <TouchableOpacity
                            style={styles.dateViewStyle}
                            activeOpacity={0.7}
                            onPress={() => setDateModal(!dateModal)}
                        >
                            <Text
                                style={date === 'MM/DD/YYYY' ? styles.placeHolderText : [styles.placeHolderText, {color: colors.white}]}>{date}</Text>
                            <TouchableOpacity
                                style={styles.dateView}
                                activeOpacity={0.7}
                                onPress={() => setDateModal(!dateModal)}
                            >
                                <DateImage/>
                            </TouchableOpacity>
                        </TouchableOpacity>
                    </View>
                    <View style={[styles.inputBox, {marginTop: wp(2)}]}>
                        <Text style={styles.titleText}>End Date</Text>
                        <TouchableOpacity
                            style={styles.dateViewStyle}
                            activeOpacity={0.7}
                            onPress={() => setEndDateModal(!endDateModal)}
                        >
                            <Text
                                style={endDate === 'MM/DD/YYYY' ? styles.placeHolderText : [styles.placeHolderText, {color: colors.white}]}>{endDate}</Text>
                            <TouchableOpacity
                                style={styles.dateView}
                                activeOpacity={0.7}
                                onPress={() => setEndDateModal(!endDateModal)}
                            >
                                <DateImage/>
                            </TouchableOpacity>
                        </TouchableOpacity>
                    </View>
                </View>}

                <View style={[styles.inputView,{flex:catText === 'bill' ? 0.59 : 0.84}]}>
                    {catText === 'bill' &&
                    <FlatList
                        data={items}
                        extraData={items}
                        onEndReachedThreshold={0}
                        onEndReached={() => LoadMoreRandomData()}
                        showsVerticalScrollIndicator={false}
                        refreshControl={
                            <RefreshControl
                                colors={['transparent']}
                                style={{backgroundColor: 'transparent'}}
                                progressBackgroundColor='transparent'
                                refreshing={loading}
                                onRefresh={() => {
                                    getRefreshTasks()
                                }}
                                tintColor={'transparent'}
                            />
                        }
                        keyExtractor={(item) => item.id}
                        renderItem={({item, index}) => _renderTasksItems(item, index)}
                        ListEmptyComponent={() => {
                            return (
                                <View style={styles.emptySection}>
                                    <Text style={[styles.headerTextStyle, {fontSize: wp(5)}]}>No Record Found</Text>
                                </View>
                            )
                        }}
                    />}

                    <ScrollView>
                        {catText === 'plan' && <View style={styles.headingNewView}>
                            <Text style={styles.headingText}>
                                The Place You can learn Every Thing
                            </Text>
                            <Text style={styles.subHeadingText}>{packageData} Pricing Plan</Text>
                        </View>}
                        {catText === 'plan' &&<View style={styles.planView}>
                        <FlatList
                            data={packages}
                            extraData={packages}
                            horizontal={true}
                            keyExtractor={item => item.id}
                            showsHorizontalScrollIndicator={false}
                            renderItem={({item, index}) => renderItems(item, index)}
                            nestedScrollEnabled={true}
                        />
                    </View>}
                    {isVisible === true && catText === 'plan' ? (
                        <View style={styles.featureViewText}>
                            <Text style={styles.headingFeatureText}>Featured</Text>
                        </View>
                    ) : null}
                        {catText === 'plan' && <View style={styles.featureView}>
                            <FlatList
                                data={indexFeature}
                                extraData={indexFeature}
                                keyExtractor={item => item.id}
                                showsVerticalScrollIndicator={false}
                                renderItem={({item, index}) => renderItemsFeature(item, index)}
                            />
                        </View>}
                    {isVisible === true && catText === 'plan' ? (
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
                                    buttonText={'Update'}
                                    bgColor={colors.white}
                                    borderColor={colors.white}
                                    textColor={colors.black}
                                    onPress={() => updatePlan()}
                                    // onPress={() => props.navigation.goBack()}
                                />
                            </View>
                        </View>
                    ) : null}
                    </ScrollView>
                </View>
                <DateTimePickerModal
                    isVisible={dateModal}
                    mode={"date"}
                    timePickerModeAndroid={"clock"}
                    maximumDate={new Date()}
                    // isDarkModeEnabled={darkMode}
                    onConfirm={(value) => onConfirmDate(value)}
                    onCancel={() => onCancelDate()}
                />
                <DateTimePickerModal
                    isVisible={endDateModal}
                    mode={"date"}
                    maximumDate={new Date()}
                    timePickerModeAndroid={"clock"}
                    onConfirm={(value) => onConfirmEndDate(value)}
                    onCancel={() => onCancelEndDate()}
                />
            </View>
        );

};

export default BillingListing;
