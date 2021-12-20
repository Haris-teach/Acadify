//================================ React Native Imported Files ======================================//

import React from 'react';
import {
    View,
    StatusBar,
    TouchableOpacity,
    FlatList,
    Text,
} from 'react-native';
import {widthPercentageToDP as wp} from "react-native-responsive-screen";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import AsyncStorage from "@react-native-async-storage/async-storage";
import moment from "moment";

//================================ Local Imported Files ======================================//

import styles from './style';
import colors from '../../../assets/colors/colors';
import ApiHelper from "../../../api/ApiHelper";
import images from "../../../assets/images/images";
import AppLoading from "../../../components/AppLoading";
import AppHeader from "../../../components/AppHeader";
import DateImage from "../../../assets/images/date.svg";
import BillComponent from "../../../components/BillingComponent";


class BillingListing extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            token:'',
            loading:false,
            dateModal:false,
            endDateModal:false,
            date:'MM/DD/YYYY',
            endDate:'MM/DD/YYYY',
            start_date:'',
            end_date:'',
            items:[]
        }
    }


    componentDidMount() {
        this.focusListner = this.props.navigation.addListener("focus", () => {
            this.getUserToken();
        })
    }


    componentWillUnmount() {
        this.focusListner();
    }


    getUserToken = () => {
        this.setState({loading: true});
        try {
             AsyncStorage.getItem('token').then((resp) => {
                 if(resp){
                     this.setState({token:resp},() => {
                         this.getTasks();
                     })
                 }
             })
        }catch (e) {
            this.setState({loading: false});
            console.log('Error',error)
        }
    }


     getTasks = () => {
         this.setState({loading: true});
        ApiHelper.getTasks(this.state.token,this.state.start_date,this.state.end_date,(response) => {
            if(response.isSuccess){
                console.log('Response',response.response.data)
                if(response.response.data.code === 201){
                    this.setState({loading: false,items: response.response.data.data.docs});
                }
            }else {
                this.setState({loading: false});
                console.log('Response',response.response)
            }
        })
    }


     _renderTasksItems = (item,index) => {
        let date = moment(item.createdAt).format("MM/DD/YYYY");
        return(
            <BillComponent
                tNumber={item.id}
                name={item.item}
                pType={item.paymentType}
                charges={item.amount}
                date={date}
                length={this.state.items.length}
                index={index}
            />
        )
    }


     onConfirmDate = (value) => {
        let finalDateNew = moment(value).format("YYYY-MM-DD h:mm:ss");
        let finalDate = moment(value).format("MM/DD/YYYY");
        this.setState({date: finalDate,start_date: finalDateNew,dateModal: false},() => {
            this.checkDate();
        });
    };


     onCancelDate = () => {
        this.setState({dateModal: false})
    };


     onConfirmEndDate = (value) => {
        let finalDateNew = moment(value).format("YYYY-MM-DD h:mm:ss");
        let finalDate = moment(value).format("MM/DD/YYYY");
         this.setState({endDate: finalDate,end_date: finalDateNew,endDateModal: false},() =>{
             this.checkDate();
         });
    };


     onCancelEndDate = () => {
       this.setState({endDateModal: false})
    };


     checkDate = () => {
        let start = moment(this.state.start_date).format('YYYY-MM-DD')
        let end = moment(this.state.endDate).format('YYYY-MM-DD');
        if(this.state.start_date !== '' && this.state.end_date !== ''){
            if (start > end) {
                alert('End Date must be greater or Equal to Start Date!')
            } else if (start === end) {
                this.getTasks();
            } else if (end >= end) {
                this.getTasks();
            }
        }
    }


    render() {
        return (
            <View style={styles.mainContainer}>
                <StatusBar backgroundColor={colors.app_background}/>
                {AppLoading.renderLoading(this.state.loading)}
                <View style={styles.headerView}>
                    <AppHeader
                        title={'Billing'}
                        leftIconPath={images.back_icon}
                        onLeftIconPress={() => this.props.navigation.goBack()}
                    />
                </View>
                <View style={styles.headingView}>
                    <View style={styles.inputBox}>
                        <Text style={styles.titleText}>Start Date</Text>
                        <TouchableOpacity
                            style={styles.dateViewStyle}
                            activeOpacity={0.7}
                            onPress={() => this.setState({dateModal: !this.state.dateModal})}
                        >
                            <Text style={this.state.date === 'MM/DD/YYYY' ? styles.placeHolderText : [styles.placeHolderText, {color: colors.white}]}>{this.state.date}</Text>
                            <TouchableOpacity
                                style={styles.dateView}
                                activeOpacity={0.7}
                                onPress={() => this.setState({dateModal: !this.state.dateModal})}
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
                            onPress={() => this.setState({endDateModal: !this.state.endDateModal})}
                        >
                            <Text style={this.state.endDate === 'MM/DD/YYYY' ? styles.placeHolderText : [styles.placeHolderText, {color: colors.white}]}>{this.state.endDate}</Text>
                            <TouchableOpacity
                                style={styles.dateView}
                                activeOpacity={0.7}
                                onPress={() => this.setState({endDateModal:true})}
                            >
                                <DateImage/>
                            </TouchableOpacity>
                        </TouchableOpacity>
                    </View>
                </View>

                <View style={styles.inputView}>
                    <FlatList
                        data={this.state.items}
                        extraData={this.state.items}
                        showsVerticalScrollIndicator={false}
                        keyExtractor={(item) => item.id}
                        renderItem={({item, index}) => this._renderTasksItems(item, index)}
                        ListEmptyComponent={() => {
                            return (
                                <View style={styles.emptySection}>
                                    <Text style={[styles.headerTextStyle, {fontSize: wp(5)}]}>No Record Found</Text>
                                </View>
                            )
                        }}
                    />
                </View>
                <DateTimePickerModal
                    isVisible={this.state.dateModal}
                    mode={"date"}
                    timePickerModeAndroid={"clock"}
                    maximumDate={new Date()}
                    onConfirm={(value) => this.onConfirmDate(value)}
                    onCancel={() => this.onCancelDate()}
                />
                <DateTimePickerModal
                    isVisible={this.state.endDateModal}
                    mode={"date"}
                    maximumDate={new Date()}
                    timePickerModeAndroid={"clock"}
                    onConfirm={(value) => this.onConfirmEndDate(value)}
                    onCancel={() => this.onCancelEndDate()}
                />
            </View>
        );
    }
};

export default BillingListing;
