//================================ React Native Imported Files ======================================//

import React from "react";
import {StyleSheet,ImageBackground, Text, TouchableOpacity, View} from "react-native";
import {heightPercentageToDP as hp, widthPercentageToDP as wp} from "react-native-responsive-screen";

//================================ Local Imported Files ======================================//

import colors from "../../assets/colors/colors";
import fonts from "../../assets/fonts/fonts";
import Download from "../../assets/images/download-Light.svg";
import Link from "../../assets/images/link.svg";
import Lock from "../../assets/images/lock-Filled.svg";


const ResourceComponent = (props) => {

    const checkTerms = () => {
        if(props.type === 'DOCUMENTS' && props.pay.length > 0 && props.pay[0].paid === true ){
            props.onPressContent(props,'download')
        } else if (props.type === 'DOCUMENTS' && props.pay.length > 0 && props.pay[0].paid === false){
            props.onPressContent(props,props.pay[0].price / 100)
        } else if (props.type === 'DOCUMENTS' && props.pay.length < 1 && props.price[0].isFree === true){
            props.onPressContent(props,'download')
        } else if (props.type === 'DOCUMENTS' && props.pay.length < 1 && props.price[0].isFree === false){
            props.onPressContent(props,props.price[0].price / 100)
        } else if (props.type === 'SERVICES'){
            props.onPressContent(props,'link')
        }
    }


    return (
        <TouchableOpacity
            activeOpacity={0.7}
            style={styles.container}
            disabled={props.isDisable}
            onPress={() => checkTerms()}
        >
            <View style={styles.imageSection}>
                <ImageBackground
                    imageStyle={styles.imageView}
                    style={styles.imageView}
                    source={{ uri: props.imgUri }}
                />
            </View>
            <View style={styles.textMainView}>
                <Text style={styles.text} numberOfLines={2}>{props.title}</Text>
                {props.type === 'DOCUMENTS' && (props.pay.length > 0 && props.pay[0].paid === true ?<View style={styles.iconView}>
                    <Download height={20} width={20}/>
                    <Text style={{paddingLeft: wp(2), color: colors.greyTxt,fontFamily:fonts.semi, marginTop: wp(1.2)}}
                          numberOfLines={2}>Download</Text>
                </View> : null)}
                {props.type === 'DOCUMENTS' && (props.pay.length > 0 && props.pay[0].paid === false ?<View style={styles.iconView}>
                    <Lock height={18} width={18}/>
                    <Text style={{paddingLeft: wp(2), color: colors.white,fontFamily:fonts.semi, marginTop: wp(1.2)}}
                          numberOfLines={2}>US ${props.pay[0].price / 100}.00</Text>
                </View> : null)}
                {props.type === 'DOCUMENTS' && (props.pay.length < 1 && props.price[0].isFree === false ? <View style={styles.iconView}>
                    <Lock height={18} width={18}/>
                    <Text style={{paddingLeft: wp(2), color: colors.white,fontFamily:fonts.semi, marginTop: wp(1.2)}}
                          numberOfLines={2}>US ${props.price[0].price / 100}.00</Text>
                </View> : null)}
                {props.type === 'DOCUMENTS' && (props.pay.length < 1 && props.price[0].isFree === true ? <View style={styles.iconView}>
                    <Download height={18} width={18}/>
                    <Text style={{paddingLeft: wp(2), color: colors.greyTxt,fontFamily:fonts.semi, marginTop: wp(1.2)}}
                          numberOfLines={2}>Download</Text>
                </View> : null)}
                {props.type === 'SERVICES' ? <View style={styles.iconView}>
                    <Link height={18} width={18}/>
                    <Text style={{paddingLeft: wp(2), color: colors.greyTxt,fontFamily:fonts.semi, marginTop: wp(1.2)}}
                          numberOfLines={2}>Link</Text>
                </View> : null}
            </View>

        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        height: hp(14),
        width: wp(90),
        borderColor: '#929292',
        borderBottomWidth:0.25,
        flexDirection: "row",
        alignSelf:'center',
        justifyContent:'center',
        alignItems:'center',
    },
    imageSection:{
        height: hp(13),
        width: wp(25),
        justifyContent:'center',
        alignItems:'center',
    },
    imageView: {
        height: hp(9),
        width: hp(9),
        borderRadius: wp(6),
        justifyContent:'center',
        alignItems:'center'
    },
    textMainView:{
        justifyContent: "center",
        marginLeft: wp(3),
        width:wp(60),
        paddingVertical:wp(2)
    },
    text: {
        width:wp(58),
        color: colors.white,
        fontSize:wp(4),
        fontFamily:fonts.semi,
    },
    iconView:{
        marginTop:wp(2),
        height:hp(3),
        flexDirection:'row',
        alignItems:'center',
    }
});

export default ResourceComponent;
