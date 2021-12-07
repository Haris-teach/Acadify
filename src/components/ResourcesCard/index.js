//================================ React Native Imported Files ======================================//

import React, {useState} from "react";
import {StyleSheet, Text, TouchableOpacity, View, ImageBackground, ActivityIndicator} from "react-native";
import {heightPercentageToDP as hp, widthPercentageToDP as wp} from "react-native-responsive-screen";

//================================ Local Imported Files ======================================//

import colors from "../../assets/colors/colors";
import fonts from "../../assets/fonts/fonts";
import Download from "../../assets/images/download-Light.svg";
import Link from "../../assets/images/link.svg";
import Lock from "../../assets/images/lock-Filled.svg";
import Calendar from "../../assets/images/calendar.svg";


const ResourceCard = (props) => {

    const [isLoaded,setIsLoaded] = useState(false);
    const [isError,setIsError] = useState(false);
    const [isShowActivity,setIsShowActivity] = useState(true);

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
                    source={{uri: props.imgUri}}
                    onLoadEnd={() => setIsLoaded(true)}
                    onError={() => setIsError(true)}
                >
                    {
                        (isLoaded && !isError) ? null :
                            (isShowActivity && !isError) &&
                            <ActivityIndicator
                                size={'small'}
                                color={colors.button_text}
                            />
                    }
                </ImageBackground>
            </View>

            <View style={styles.textMainView}>
                <View style={styles.upperViewText}>
                    <Text style={styles.text} numberOfLines={2}>{props.title}</Text>
                    <View style={[styles.dateView,{width:wp(24)}]}>
                        <Calendar height={12} width={12}/>
                        <Text style={[styles.titleText,{fontSize:12,marginLeft:wp(1)}]}>{props.createdAt}</Text>
                    </View>
                </View>
                {props.type === 'DOCUMENTS' && (props.pay.length > 0 && props.pay[0].paid === true ?<View style={styles.iconView}>
                    <Download height={20} width={20}/>
                    <Text style={{paddingLeft: wp(2), color: colors.greyTxt,fontFamily:fonts.semi,marginTop: wp(1.2)}}
                          numberOfLines={2}>Download</Text>
                </View> : null)}
                {props.type === 'DOCUMENTS' && (props.pay.length > 0 && props.pay[0].paid === false ?<View style={styles.iconView}>
                    <Lock height={18} width={18}/>
                    <Text style={{paddingLeft: wp(2), color: colors.white,fontFamily:fonts.semi,marginTop: wp(1.2)}}
                          numberOfLines={2}>US ${props.pay[0].price / 100}.00</Text>
                </View> : null)}
                {props.type === 'DOCUMENTS' && (props.pay.length < 1 && props.price[0]?.isFree === false ? <View style={styles.iconView}>
                    <Lock height={18} width={18}/>
                    <Text style={{paddingLeft: wp(2), color: colors.white,fontFamily:fonts.semi,marginTop: wp(1.2)}}
                          numberOfLines={2}>US ${props.price[0].price / 100}.00</Text>
                </View> : null)}
                {props.type === 'DOCUMENTS' && (props.pay.length < 1 && props.price[0]?.isFree === true ? <View style={styles.iconView}>
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
        width: wp(20),
        justifyContent:'center',
        alignItems:'flex-start',
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
        width:wp(65),
        paddingVertical:wp(2)
    },
    upperViewText:{
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
    },
    text: {
        width:wp(42),
        color: colors.white,
        fontSize:wp(4),
        fontFamily:fonts.semi,
    },
    iconView:{
        marginTop:wp(2),
        height:hp(3),
        flexDirection:'row',
        alignItems:'center',
    },
    titleText:{
        width:wp(40),
        fontSize:16,
        fontWeight:'500',
        color:colors.white,
        fontFamily:fonts.semi,
    },
    dateView:{
        height:hp(3),
        width:wp(18),
        borderRadius:wp(3),
        marginRight:wp(1),
        paddingHorizontal:wp(2),
        backgroundColor:colors.date_background,
        flexDirection:'row',
        alignItems:'center',
    },
});

export default ResourceCard;
