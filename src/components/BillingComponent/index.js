//================================ React Native Imported Files ======================================//

import React from "react";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";
import { View, StyleSheet, Text } from "react-native";

//================================ Local Imported Files ======================================//

import colors from "../../assets/colors/colors";
import fonts from "../../assets/fonts/fonts";
import Price from "../../assets/images/billPrice.svg";
import Calendar from "../../assets/images/calendar.svg";


const BillComponent = (props) => {

    return (
        <View style={ styles.container}>
            <View style={styles.headingView}>
                <View style={styles.numberView}>
                    <Text style={[styles.titleText,{fontSize:wp(4)}]}>{props.tNumber}</Text>
                </View>
            </View>
            <View style={styles.imageView}>
                <Text style={[styles.titleText,{width:wp(38),fontSize:wp(3.6),color:colors.white,fontWeight:'700'}]} numberOfLines={2}>{props.name}</Text>
                <Text style={[styles.titleText,{width:wp(38),fontSize:wp(3.5),color:colors.white,fontWeight:'400',marginTop:wp(1)}]} numberOfLines={1}>{props.pType}</Text>
            </View>
            <View style={styles.calView}>
                <View style={styles.priceTagView}>
                    <Price height={20} width={20}/>
                    <Text style={[styles.titleText,{width:wp(30),paddingLeft:wp(2),fontSize:wp(4), color:colors.white,fontWeight:'500'}]} numberOfLines={1}>{props.charges > 0 ? props.charges / 100 : props.charges } $</Text>
                </View>
                <View style={[styles.priceTagView,{marginTop:wp(1)}]}>
                    <Calendar height={18} width={18}/>
                    <Text style={[styles.titleText,{width:wp(30),paddingLeft:wp(2),fontSize:wp(4), color:colors.white,fontWeight:'500'}]} numberOfLines={1}>{props.date}</Text>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        height: hp(10),
        width: wp(90),
        marginBottom: wp(2),
        borderBottomWidth:0.25,
        borderBottomColor:'#929292',
        paddingHorizontal:wp(2),
        alignSelf:"center",
        flexDirection:'row',
        alignItems:'center'
    },
    headingView:{
        height:hp(10),
        width:wp(15),
        justifyContent:'center',
        alignItems:'center',
    },
    numberView:{
        height:hp(6),
        width:hp(6),
        borderRadius:hp(2),
        backgroundColor:colors.image_background,
        justifyContent:"center",
        alignItems:'center',
    },
    titleText:{
        fontWeight:'500',
        color:colors.white,
        fontFamily:fonts.semi,
    },
    imageView: {
        height: hp(10),
        width: wp(42),
        justifyContent:'center',
        alignItems:'center',
    },
    calView: {
        height: hp(10),
        width: wp(28),
        justifyContent:'center',
    },
    priceTagView:{
        flexDirection:'row',
        alignItems:'center'
    }

});

export default BillComponent;
