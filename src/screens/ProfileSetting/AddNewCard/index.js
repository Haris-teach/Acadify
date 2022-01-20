//================================ React Native Imported Files ======================================//

import React, {useState} from 'react';
import {
    View,
    Text,
    Platform,
    StatusBar,
    ScrollView,
    ImageBackground,
    KeyboardAvoidingView,
} from 'react-native';
import {TextInput} from 'react-native-paper';
import Toast from 'react-native-simple-toast';
import {
    heightPercentageToDP as hp,
    widthPercentageToDP  as wp,
} from 'react-native-responsive-screen';
import {useSelector} from "react-redux";

//================================ Local Imported Files ======================================//

import styles from './style';
import colors from '../../../assets/colors/colors';
import fonts from '../../../assets/fonts/fonts';
import images from '../../../assets/images/images';
import ApiHelper from '../../../api/ApiHelper';
import Button from '../../../components/Button/Button';
import AppHeader from '../../../components/AppHeader';
import AppLoading from '../../../components/AppLoading';


const AddNewCardScreen = props => {

    const tokens = useSelector((state) => state.ApiData.token);
    const [cardNumber, setCardNumber] = useState('');
    const [cvc, setCvc] = useState('');
    const [expiryDate, setExpiryDate] = useState('');
    const [name, setName] = useState('');
    const [cvcLength, setCvcLength] = useState(4);
    const [loading, setLoading] = useState(false);


    const onPay = () => {
        if (cardNumber.length < 14) {
            Toast.show('Invalid card number', Toast.LONG);
        } else if (expiryDate.length < 5) {
            Toast.show('Invalid expiry date', Toast.LONG);
        } else if (cvc < cvcLength) {
            Toast.show('Invalid cvc', Toast.LONG);
        } else {
            onPayApi();
        }
    };


    const onPayApi = async () => {
        setLoading(true);
        let data = expiryDate.split('/');
        let token = await ApiHelper.getToken(
            `${data.firstName} ${data.lastName}`,
            cardNumber,
            cvc,
            data[0],
            data[1],
        );
        if (token.error) {
            setLoading(false);
            setTimeout(() => {
                Toast.show(token.error.message,Toast.LONG);
            },200)
        }else{
            setLoading(true);
            ApiHelper.consoleBox('Token', token.id);
            addNewCard(token.id)
        }
    };


    const addNewCard = (id) => {
        ApiHelper.addCard(tokens,id,name,(response) => {
            if(response.isSuccess){
                if(response.response.data.code === 200){
                    ApiHelper.consoleBox('Add card response ===>',response.response)
                    setLoading(false)
                    setTimeout(() =>{
                        Toast.show('Card Added Successfully',Toast.LONG)
                    },200)
                    props.navigation.goBack()
                }
            }else{
                ApiHelper.consoleBox('response.response',response.response)
                setLoading(false);
            }
        })
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
                                            fontSize: 18,
                                            fontWeight: '600',
                                            width: wp(40),
                                        },
                                    ]}
                                    numberOfLines={1}>
                                    {name}
                                </Text>
                            </View>
                            <View style={styles.rightBox}/>
                        </View>
                        <View style={styles.cardNumberView}>
                            <Text
                                style={[
                                    styles.nameText,
                                    {marginTop: wp(1), fontSize: 18, fontWeight: '600'},
                                ]}>
                                {/***** **** **** {cardNumber.slice(15, 19)}*/}
                                {cardNumber}
                            </Text>
                        </View>
                        <View style={styles.expiryDate}>
                            <View style={styles.dataView}>
                                <Text
                                    style={[styles.nameText, {fontSize: 14, fontWeight: '600'}]}>
                                    {expiryDate}
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
                        <TextInput
                            style={[styles.inputText, {alignSelf: 'center'}]}
                            label="Name"
                            mode={'outlined'}
                            placeholder={'Name'}
                            selectionColor={colors.white}
                            theme={{
                                roundness: 6,
                                colors: {
                                    primary: colors.inputFocus,
                                    placeholder: colors.white,
                                    text: colors.white,
                                },
                                fonts: {
                                    regular: {
                                        fontFamily: fonts.regular,
                                    },
                                },
                            }}
                            outlineColor={colors.app_border}
                            underlineColorAndroid="transparent"
                            onChangeText={name => setName(name)}
                            value={name}
                        />
                    </View>
                    <View style={styles.inputSection}>
                        <TextInput
                            style={[styles.inputText, {alignSelf: 'center'}]}
                            label="Card Number"
                            mode={'outlined'}
                            placeholder={'Number'}
                            selectionColor={colors.white}
                            theme={{
                                roundness: 6,
                                colors: {
                                    primary: colors.inputFocus,
                                    placeholder: colors.white,
                                    text: colors.white,
                                },
                                fonts: {
                                    regular: {
                                        fontFamily: fonts.regular,
                                    },
                                },
                            }}
                            outlineColor={colors.app_border}
                            underlineColorAndroid="transparent"
                            onChangeText={card => {
                                // let cardNumber = card
                                //   .replace(/\s?/g, '')
                                //   .replace(/(\d{4})/g, '$1 ')
                                //   .trim();
                                // setCardNumber(cardNumber);
                                if (card.length > cardNumber.length) {
                                    if (
                                        card.length === 4 ||
                                        card.length === 9 ||
                                        card.length === 14
                                    ) {
                                        setCardNumber(card + ' ');
                                    } else {
                                        setCardNumber(card);
                                    }
                                } else {
                                    if (cardNumber[cardNumber.length - 2] === ' ') {
                                        setCardNumber(card.slice(0, card.length - 2));
                                    } else if (cardNumber[cardNumber.length - 1] === ' ') {
                                        setCardNumber(card.slice(0, card.length - 1));
                                    } else {
                                        setCardNumber(card);
                                    }
                                }
                            }}
                            maxLength={19}
                            keyboardType={'numeric'}
                            value={cardNumber}
                        />
                    </View>
                    <View
                        style={[
                            styles.inputSection,
                            {
                                marginTop:hp(1),
                                flexDirection: 'row',
                                height: hp(9),
                                justifyContent: 'center',
                            },
                        ]}>
                        <TextInput
                            style={[styles.inputText, {width: wp(40)}]}
                            label="Expiry date"
                            mode={'outlined'}
                            placeholder={'MM / YY'}
                            selectionColor={colors.white}
                            theme={{
                                roundness: 6,
                                colors: {
                                    primary: colors.inputFocus,
                                    placeholder: colors.white,
                                    text: colors.white,
                                },
                                fonts: {
                                    regular: {
                                        fontFamily: fonts.regular,
                                    },
                                },
                            }}
                            outlineColor={colors.app_border}
                            underlineColorAndroid="transparent"
                            onChangeText={expiry => {
                                if (expiry.length > expiryDate.length) {
                                    if (expiry.length === 2) {
                                        setExpiryDate(expiry + '/');
                                    } else {
                                        setExpiryDate(expiry);
                                    }
                                } else {
                                    setExpiryDate(expiry);
                                }
                            }}
                            keyboardType={'numeric'}
                            maxLength={5}
                            value={expiryDate}
                        />
                        <TextInput
                            style={[
                                styles.inputText,
                                {
                                    width: wp(40),
                                    marginLeft: wp(5),
                                },
                            ]}
                            label="CVC"
                            mode={'outlined'}
                            placeholder={'Enter'}
                            selectionColor={colors.white}
                            theme={{
                                roundness: 6,
                                colors: {
                                    primary: colors.inputFocus,
                                    placeholder: colors.white,
                                    text: colors.white,
                                },
                                fonts: {
                                    regular: {
                                        fontFamily: fonts.regular,
                                    },
                                },
                            }}
                            outlineColor={colors.app_border}
                            underlineColorAndroid="transparent"
                            maxLength={cvcLength}
                            keyboardType={'numeric'}
                            onChangeText={cvc => setCvc(cvc)}
                            value={cvc}
                        />
                    </View>
                </View>
                <View style={styles.buttonView}>
                    <View style={styles.btnView}>
                        <Button
                            width={wp(40)}
                            buttonText={'Cancel'}
                            bgColor={colors.card_background}
                            onPress={() => props.navigation.goBack()}
                        />
                    </View>
                    <View style={styles.btnView}>
                        <Button
                            width={wp(40)}
                            buttonText={'Add'}
                            bgColor={colors.white}
                            borderColor={colors.white}
                            textColor={colors.black}
                            onPress={() => onPay()}
                        />
                    </View>
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    );
};

export default AddNewCardScreen;
