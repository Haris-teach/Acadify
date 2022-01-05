//================================ React Native Imported Files ======================================//

import React, {useEffect, useState} from 'react';
import {
    Text,
    View,
    Image,
    FlatList,
    Platform,
    StatusBar,
    ScrollView,
    ImageBackground,
    TouchableOpacity,
    KeyboardAvoidingView,
} from 'react-native';
import {
    heightPercentageToDP as hp,
    widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {useSelector} from 'react-redux';
import {useIsFocused} from "@react-navigation/native";
import {Swipeable} from "react-native-gesture-handler";
import Toast from 'react-native-simple-toast';

//================================ Local Imported Files ======================================//

import styles from './style';
import colors from '../../../assets/colors/colors';
import images from '../../../assets/images/images';
import ApiHelper from '../../../api/ApiHelper';
import fonts from "../../../assets/fonts/fonts";
import Button from '../../../components/Button/Button';
import AppHeader from '../../../components/AppHeader';
import AppLoading from '../../../components/AppLoading';
import Check from '../../../assets/images/check.svg';
import UnCheck from '../../../assets/images/uncheck.svg';
import DeleteWhite from "../../../assets/images/binwhite.svg";
import {ADD_NEW_CARD_SCREEN} from "../../../constants/navigators";

const PaymentScreen = props => {

    const isFocused = useIsFocused();
    const token = useSelector(state => state.ApiData.token);
    const [loading, setLoading]   = useState(false);
    const [cardData, setCardData] = useState([]);
    const [selectedItemData, setSelectedItemData] = useState('');
    const [selectedIndex, setSelectedIndex] = useState(0);


    useEffect(() => {
        getCards();
    },[isFocused])


    const getCards = () => {
        setLoading(true);
        ApiHelper.getCardsData(token, response => {
            if (response.isSuccess) {
                setLoading(false);
                if (response.response.data.code === 200) {
                   // console.log('Response Data ===>',response.response.data.card.data)
                    setCardData(response.response.data.card.data)
                    setSelectedItemData(response.response.data.card?.data[0])
                    setLoading(false);
                } else {
                    console.log('Error inner ==>', response.response.data);
                    Toast.show(response.response.data.error.email, Toast.LONG);
                }
            } else {
                setLoading(false);
                console.log('Error ==>', response.response);
            }
        });
    }


    const onDelete = (item,indexes) => {
        const filteredData = cardData.filter((value,index) => index !== indexes);
        setCardData(filteredData);
        deleteCard(item)
    }


    const deleteCard = (item) => {
        setLoading(true)
        let url = `/api/v1/users/deletecard/${item.id}`
        let method = 'DELETE';
        ApiHelper.changeDefault(token, url,method,response => {
            if (response.isSuccess) {
                setLoading(false);
                if (response.response.data.code === 200) {
                    setLoading(false);
                    setTimeout(() => {
                        Toast.show('Card Successfully Deleted...', Toast.LONG);
                    },200)
                } else {
                    console.log('Error inner ==>', response.response.data);
                    Toast.show(response.response.data.error.email, Toast.LONG);
                }
            } else {
                setLoading(false);
                console.log('Error ==>', response.response);
            }
        });
    }


    const leftAction = (item,index) => {
        return(
            <TouchableOpacity style={styles.leftActionView} activeOpacity={0.7} onPress={() => onDelete(item,index)}>
                <DeleteWhite height={16} width={18}/>
                <Text style={styles.deleteButton}>Delete</Text>
            </TouchableOpacity>
        )
    }


    const onMakeDefault = (item) => {
       setLoading(true);
       let url = `/api/v1/users/change_default_card/${item.id}`;
        let method = 'PUT';
        ApiHelper.changeDefault(token, url,method,response => {
            if (response.isSuccess) {
                setLoading(false);
                if (response.response.data.code === 200) {
                    setLoading(false);
                    setTimeout(() => {
                        Toast.show('Default card successfully updated...', Toast.LONG);
                    },200)
                } else {
                    console.log('Error inner ==>', response.response.data);
                    Toast.show(response.response.data.error.email, Toast.LONG);
                }
            } else {
                setLoading(false);
                console.log('Error ==>', response.response);
            }
        });
    }


    const _renderCardItem = (item,index) => {
       return(
           <Swipeable
               key={item.id}
               renderRightActions = {() => selectedIndex === index ? null : leftAction(item,index)}
               onSwipeableRightOpen = {() => console.log('Open')}
           >
          <TouchableOpacity
              style={styles.cardView}
              activeOpacity={0.8}
              onPress={() => {
                  setSelectedIndex(index)
                  setSelectedItemData(item)
                  onMakeDefault(item)
              }}
          >
              <View style={{height:hp(10),width:wp(10),justifyContent:"center",alignItems:'center'}}>
                  {selectedIndex === index ? <Check height={15} width={15}/> : <UnCheck height={15} width={15}/>}
              </View>
              <View style={{height:hp(10),width:wp(60),justifyContent:"center",paddingLeft:wp(5)}}>
                  {item.name !== null &&
                    <Text style={{fontWeight: '400', fontSize: wp(4), fontFamily: fonts.regular, color: colors.white}} numberOfLines={1}>{item.name}</Text>
                  }
                  <Text style={{fontWeight:'400',fontSize:wp(4),fontFamily:fonts.regular,color:colors.white,marginTop:wp(2)}} numberOfLines={1}>**** **** **** {item.last4}</Text>
              </View>
              <View style={{height:hp(10),width:wp(20),justifyContent:"center",alignItems:'center'}}>
                  <Image source={item.brand === 'Visa' && images.visa || item.brand === 'MasterCard' && images.master || item.brand === 'American Express' && images.american || images.dummy} style={{height:'40%',width:'70%',resizeMode:'cover'}}/>
              </View>
          </TouchableOpacity>
           </Swipeable>
       )
    }


    return (
        <KeyboardAvoidingView
            style={styles.mainContainer}
            behavior={Platform.OS === 'ios' ? 'padding' : null}>
            <StatusBar backgroundColor={colors.app_background} />
            {AppLoading.renderLoading(loading)}
            <ScrollView
                style={styles.mainContainer}
                showsVerticalScrollIndicator={false}>
                <View style={styles.headerView}>
                    <AppHeader
                        title={'Add Credit Card'}
                        leftIconPath={images.back_icon}
                        onLeftIconPress={() => props.navigation.goBack()}
                    />
                </View>
                <View style={styles.imageView}>
                    <ImageBackground source={images.card_icon} style={styles.cardStyle}>
                        <View style={styles.nameView}>
                            <View style={styles.leftBox}>
                                <Text style={styles.nameText}>Name</Text>
                                <Text
                                    style={[
                                        styles.nameText,
                                        {
                                            marginTop: wp(1),
                                            fontSize: wp(4.4),
                                            fontWeight: '600',
                                            width: wp(40),
                                        },
                                    ]}
                                    numberOfLines={1}>
                                    {selectedItemData.name}
                                </Text>
                            </View>
                        </View>
                        <View style={styles.cardNumberView}>
                            <Text
                                style={[
                                    styles.nameText,
                                    {marginTop: wp(1), fontSize: 18, fontWeight: '600'},
                                ]}>
                                **** **** **** {selectedItemData.last4}
                            </Text>
                        </View>
                        <View style={styles.expiryDate}>
                            <View style={styles.dataView}>
                                <Text
                                    style={[styles.nameText, {fontSize: 14, fontWeight: '600'}]}>
                                    {selectedItemData.exp_month}/{selectedItemData.exp_year}
                                </Text>
                            </View>
                            <View style={styles.dataView}/>
                        </View>
                    </ImageBackground>
                </View>
                <View style={styles.inputView}>
                    <View style={styles.cardTextView}>
                        <Text style={styles.cardText}>Card Detail</Text>
                    </View>
                    <View style={styles.inputSection}>
                        <FlatList
                            data={cardData}
                            extraData={cardData}
                            showsVerticalScrollIndicator={false}
                            keyExtractor={(item) => item.id}
                            renderItem={({item,index}) => _renderCardItem(item,index)}
                        />
                    </View>
                </View>
                {!loading && <View style={styles.buttonView}>
                    <Button
                        buttonText={'Add new card'}
                        onPress={() => props.navigation.navigate(ADD_NEW_CARD_SCREEN)}
                    />
                </View>}
            </ScrollView>
        </KeyboardAvoidingView>
    );
};

export default PaymentScreen;
