//================================ React Native Imported Files ======================================//

import React, {useEffect, useState} from 'react';
import {
    View,
    StatusBar,
    Platform,
    TouchableOpacity,
    FlatList, Text,
} from 'react-native';
import {useSelector} from "react-redux";
import {useIsFocused} from "@react-navigation/native";
import {heightPercentageToDP as hp, widthPercentageToDP as wp} from "react-native-responsive-screen";
import moment from "moment";

//================================ Local Imported Files ======================================//

import styles from './style';
import colors from '../../../assets/colors/colors';
import ApiHelper from "../../../api/ApiHelper";
import images from "../../../assets/images/images";
import AppLoading from "../../../components/AppLoading";
import Calendar from "../../../assets/images/calendar_back.svg";
import AppHeader from "../../../components/AppHeader";
import BillComponent from "../../../components/BillingComponent";
import DateImage from "../../../assets/images/date.svg";
import DateTimePickerModal from "react-native-modal-datetime-picker";


const BillingListing = props => {

    const isFocused = useIsFocused();
    const token = useSelector(state => state.ApiData.token);
    const [loading,setLoading]         = useState(false);
    const [dateModal,setDateModal]     = useState(false);
    const [disableModal,setDisable]    = useState(true);
    const [date,setDate]               = useState('MM/DD/YYYY');
    const [items, setItems]            = useState([
        {
            id:0,
            tNumber:'301',
            name:'Test 2',
            pType:'Documents',
            charges:'2800',
            date:'12/03/2021'
        },
        {
            id:1,
            tNumber:'231',
            name:'Test 1',
            pType:'Courses',
            charges:'1000',
            date:'12/03/2021'
        }
    ]);


    useEffect(() => {
        // getTasks();
    },[isFocused])


    const getTasks = () => {
        setLoading(true);
        ApiHelper.getCategories(token,'ACCOUNTABILITY',(response) => {
            if(response.isSuccess){
                if(response.response.data.code === 200){
                    setLoading(false);
                }
            }else {
                setLoading(false);
                console.log('Response',response.response)
            }
        })
    }


    const _renderTasksItems = (item) => {
        let date = moment().format("MM/DD/YYYY");
        return(
            <BillComponent
                tNumber={item.tNumber}
                name={item.name}
                pType={item.pType}
                charges={item.charges}
                date={item.date}
            />
        )
    }


    const onConfirmDate = (value) => {
        let finalDate = moment(value).format("MM/DD/YYYY");
        setDate(finalDate);
        setDateModal(false);
    };


    const onCancelDate = () => {
        setDateModal(false);
    };


    return (
        <View style={styles.mainContainer}>
            <StatusBar backgroundColor={colors.app_background} />
            {AppLoading.renderLoading(loading)}
            <View style={styles.headerView}>
                <AppHeader
                    title={'Billing'}
                    leftIconPath={images.back_icon}
                    onLeftIconPress={() => props.navigation.goBack()}
                />
            </View>

            <View style={styles.inputView}>
                <FlatList
                    data={items}
                    extraData={items}
                    showsVerticalScrollIndicator={false}
                    keyExtractor={(item) => item.id}
                    stickyHeaderIndices={[1]}
                    ListHeaderComponent={() => {
                        return(
                            <View style={styles.headingView}>
                                <View style={styles.inputBox}>
                                    <Text style={styles.titleText}>Start Date</Text>
                                    <TouchableOpacity style={styles.dateViewStyle} activeOpacity={0.7} onPress={() => setDateModal(!dateModal)}>
                                        <Text style={date === 'MM/DD/YYYY' ? styles.placeHolderText : [styles.placeHolderText,{color:colors.white}]}>{date}</Text>
                                        <TouchableOpacity style={styles.dateView} activeOpacity={0.7} onPress={() => setDateModal(true)}>
                                            <DateImage/>
                                        </TouchableOpacity>
                                    </TouchableOpacity>
                                </View>
                                <View style={[styles.inputBox,{marginTop:wp(2)}]}>
                                    <Text style={styles.titleText}>End Date</Text>
                                    <TouchableOpacity style={styles.dateViewStyle} disabled={disableModal} activeOpacity={0.7} onPress={() => setDateModal(!dateModal)}>
                                        <Text style={date === 'MM/DD/YYYY' ? styles.placeHolderText : [styles.placeHolderText,{color:colors.white}]}>{date}</Text>
                                        <TouchableOpacity style={styles.dateView} disabled={disableModal} activeOpacity={0.7} onPress={() => setDateModal(true)}>
                                            <DateImage/>
                                        </TouchableOpacity>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        )
                    }}
                    renderItem={({item}) => _renderTasksItems(item)}
                />
            </View>
            <DateTimePickerModal
                isVisible={dateModal}
                mode={"date"}
                timePickerModeAndroid={"clock"}
                onConfirm={(value) => onConfirmDate(value)}
                onCancel={() => onCancelDate()}
            />
        </View>
    );
};

export default BillingListing;
