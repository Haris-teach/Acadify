//================================ React Native Imported Files ======================================//

import React, {useEffect, useState} from 'react';
import {
    View,
    Text,
    FlatList,
    TouchableOpacity,
    StatusBar,
} from 'react-native';
import {useSelector} from "react-redux";
import {useIsFocused} from "@react-navigation/native";
import {widthPercentageToDP as wp} from "react-native-responsive-screen";
import {AnimatedCircularProgress} from "react-native-circular-progress";
import Toast from "react-native-simple-toast";
import moment from "moment";

//================================ Local Imported Files ======================================//

import styles from './style';
import {ADD_GOAL, EDIT_ACCOUNTABILITY} from "../../../constants/navigators";
import ApiHelper from "../../../api/ApiHelper";
import colors from "../../../assets/colors/colors";
import Add from "../../../assets/images/addIcon.svg";
import AppHeaderNative from "../../../components/AppHeaderNative";
import AppLoading from "../../../components/AppLoading";
import Search from "../../../assets/images/searchBackground.svg";
import Filter from "../../../assets/images/filterBackground.svg";
import DropDown from "../../../assets/images/dropdown-gold.svg";
import UpDrop from "../../../assets/images/arrow_upward.svg";
import UnSelect from "../../../assets/images/unselectBox.svg";
import Grouped from "../../../assets/images/selected.svg";

const GetAccountability = (props) => {

    const isFocused = useIsFocused();
    const token = useSelector(state => state.ApiData.token);
    const [loading,setLoading] = useState(false);
    const [data,setData] = useState([])
    const [selectedIndex,setSelectedIndex] = useState('');


    useEffect(() => {
        setSelectedIndex('')
        getGoals();
    }, [isFocused]);


    const getGoals = () => {
        setLoading(true);
        ApiHelper.getGoals(token,(response) => {
            if(response.isSuccess){
                if(response.response.data.code === 200){
                    setData(response.response.data.data.docs)
                    setLoading(false);
                }
            }else {
                setLoading(false);
                console.log('Response',response.response)
            }
        })
    }


    const renderItems = (item,index) => {
    //     let date = moment(item.createdAt).format('DD/MM/YYYY');
    //     return(
    //         <AccountabilityComponent
    //             id={item.id}
    //             index={index}
    //             progress={item.progress}
    //             title={item.title}
    //             date={date}
    //             description={item.description}
    //         />
    //     )
    }


    const renderCheckBox = (item,index) => {
        return(
            <View style={styles.tickView}>
                <TouchableOpacity style={styles.tickIcon} onPress={() => onChangeStatus(item,index)} activeOpacity={0.7}>
                    {item.status === false ? <UnSelect height={20} width={20}/> : <Grouped height={20} width={20}/>}
                </TouchableOpacity>
                <View style={styles.textView}>
                    <Text style={item.status === false ? styles.listText : [styles.listText,{color:colors.checklist_item,textDecorationLine:'line-through'}]} numberOfLines={1}>{item.name}</Text>
                </View>
            </View>
        )
    }


    const onChangeStatus = (item,index) => {
        setLoading(true);
        ApiHelper.changeSingleGoalStatus(token,item.id,(response) => {
            if(response.isSuccess){
                if(response.response.data.code === 200){
                    setLoading(false);
                    // console.log('data',response.response.data)
                }
            }else {
                setLoading(false);
                console.log('Response',response.response.response)
            }
        })
    }


    const onPressOpen = (index) => {
        if(selectedIndex === index){
            setSelectedIndex('')
        }else{
            setSelectedIndex(index)
        }
    }


    return (
        <View style={styles.mainContainer}>
            {AppLoading.renderLoading(loading)}
            <StatusBar backgroundColor={colors.app_background} />
            <View style={styles.headerView}>
                <AppHeaderNative
                    leftIconPath={true}
                    rightIconOnePath={true}
                    onLeftIconPress={() => props.navigation.openDrawer()}
                    onRightIconPress={() => console.log('Data on Ring')}
                />
            </View>
            <View style={styles.listView}>
                <FlatList
                    data={data}
                    extraData={data}
                    ListHeaderComponent={() => {
                        return(
                            <View style={styles.upperView}>
                                <View style={styles.headerStyle}>
                                    <Text style={styles.headerTextStyle}>Accountability</Text>
                                    <View style={styles.filterIcons}>
                                        <TouchableOpacity activeOpacity={0.7} onPress={() => console.log('Searched')}>
                                            <Search/>
                                        </TouchableOpacity>
                                        <TouchableOpacity activeOpacity={0.7} onPress={() =>  console.log('Filter')}>
                                            <Filter/>
                                        </TouchableOpacity>
                                        <TouchableOpacity activeOpacity={0.7} onPress={() => props.navigation.navigate(ADD_GOAL)}>
                                            <Add/>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </View>
                        )
                    }}
                    keyExtractor={(item) => item.id}
                    renderItem={({item,index}) => {
                        let date = moment(item.createdAt).format('DD/MM/YYYY');
                        return(
                            <TouchableOpacity style={index !== props.index ? styles.container : [styles.container,{backgroundColor:'#1F1F1F',borderRadius:wp(6)}]} activeOpacity={0.7} onPress={() => props.navigation.navigate(EDIT_ACCOUNTABILITY,{item})}>
                                <View style={styles.innerContainer}>
                                    <View style={styles.rightView}>
                                        <Text style={styles.titleText} numberOfLines={1}>{item.title}</Text>
                                        <Text style={[styles.titleText,{fontSize:wp(3.6)}]} numberOfLines={1}>{item.description}</Text>
                                        <Text style={[styles.titleText,{width:wp(50),color:colors.inputColor}]} numberOfLines={1}>Target Date:<Text style={[styles.titleText,{color:colors.greyTxt}]} numberOfLines={1}> {date}</Text></Text>
                                    </View>
                                    <View style={styles.imageView}>
                                        <View style={styles.roundCircle}>
                                            <AnimatedCircularProgress
                                                size={75}
                                                width={6}
                                                fill={item.progress}
                                                rotation={0}
                                                lineCap={'round'}
                                                tintColor={colors.button_text}
                                                backgroundColor={colors.black}>
                                                {
                                                    (fill) => (
                                                        <Text style={{color:colors.white}}>
                                                            { item.progress }%
                                                        </Text>
                                                    )
                                                }
                                            </AnimatedCircularProgress>
                                        </View>
                                        <TouchableOpacity style={styles.dropArrow} activeOpacity={0.7} onPress={() => item.ChecklistItems.length > 0 ? onPressOpen(index) : null}>
                                            {selectedIndex === index ? <UpDrop height={20} width={20}/> : <DropDown height={20} width={20}/>}
                                        </TouchableOpacity>
                                    </View>
                                </View>
                                {item.ChecklistItems.length > 0 && ( selectedIndex === index ? <View style={styles.flatListView}>
                                    <View style={styles.upperLine}/>
                                    <FlatList
                                        data={item.ChecklistItems}
                                        extraData={item.ChecklistItems}
                                        keyExtractor={(item) => item.id}
                                        renderItem={({item,index}) => renderCheckBox(item,index)}
                                    />
                                </View> : null )}
                            </TouchableOpacity>
                        )
                    }}
                />
            </View>
        </View>
    );
};

export default GetAccountability;
