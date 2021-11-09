//================================ React Native Imported Files ======================================//

import React, {useState} from "react";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";
import {View, StyleSheet, Text, TouchableOpacity} from "react-native";
import { AnimatedCircularProgress } from 'react-native-circular-progress';

//================================ Local Imported Files ======================================//

import colors from "../../assets/colors/colors";
import fonts from "../../assets/fonts/fonts";
import DropDown from "../../assets/images/dropdown-gold.svg";


const AccountabilityComponent = (props) => {

    const [index,setIndex] = useState('');

    const onPress = (value) => {
        props.onPressCard()
    }

    return (
        <View style={index !== props.index ? styles.container : [styles.container,{backgroundColor:'#1F1F1F',borderRadius:wp(6)}]}>
            <View style={styles.rightView}>
                <Text style={styles.titleText} numberOfLines={1}>{props.title}</Text>
                <Text style={[styles.titleText,{fontSize:wp(3.6)}]} numberOfLines={1}>{props.description}</Text>
                <Text style={[styles.titleText,{width:wp(50),color:colors.inputColor}]} numberOfLines={1}>Target Date:<Text style={[styles.titleText,{color:colors.greyTxt}]} numberOfLines={1}> {props.date}</Text></Text>
            </View>
            <View style={styles.imageView}>
                <View style={styles.roundCircle}>
                    <AnimatedCircularProgress
                        size={75}
                        width={6}
                        fill={10}
                        rotation={0}
                        lineCap={'round'}
                        tintColor={colors.button_text}
                        backgroundColor={colors.black}>
                        {
                            (fill) => (
                                <Text style={{color:colors.white}}>
                                    { props.progress }%
                                </Text>
                            )
                        }
                    </AnimatedCircularProgress>
                </View>
                <TouchableOpacity style={styles.dropArrow} activeOpacity={0.7} onPress={() => console.log('Pressed')}>
                    <DropDown height={20} width={20}/>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        height: hp(15),
        width: wp(90),
        marginVertical: wp(2),
        alignSelf:'center',
        flexDirection:'row',
        borderRadius:wp(7),
        backgroundColor:colors.image_background
    },
    rightView:{
        height:hp(15),
        width:wp(56),
        paddingLeft:wp(6),
        justifyContent:'center',
    },
    titleText:{
        width:wp(47),
        fontSize:wp(3.8),
        fontWeight:'500',
        color:colors.white,
        fontFamily:fonts.semi,
        marginTop:6,
    },
    imageView: {
        height: hp(15),
        width: wp(34),
        flexDirection:'row',
        justifyContent: "center",
    },
    roundCircle:{
        height: hp(15),
        width: wp(20),
        justifyContent: "center",
    },
    dropArrow:{
        height: hp(4),
        width: wp(12),
        justifyContent: "flex-end",
        alignItems:'flex-start',
    }

});

export default AccountabilityComponent;
