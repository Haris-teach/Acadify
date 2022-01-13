//================================ React Native Imported Files ======================================//

import React, {useEffect, useState} from 'react';
import {
    View,
    Text,
    FlatList,
    StatusBar,
    TouchableOpacity, TextInput, Image,
} from 'react-native';
import {useSelector} from "react-redux";
import {useIsFocused} from "@react-navigation/native";
import {heightPercentageToDP as hp, widthPercentageToDP as wp} from "react-native-responsive-screen";
import {AnimatedCircularProgress} from "react-native-circular-progress";
import Model from "react-native-modal";
import moment from "moment";

//================================ Local Imported Files ======================================//

import styles from './style';
import {ADD_GOAL, EDIT_ACCOUNTABILITY, PLAN_SCREEN} from "../../../constants/navigators";
import ApiHelper from "../../../api/ApiHelper";
import colors from "../../../assets/colors/colors";
import images from "../../../assets/images/images";
import CommonStyle from "../../../CommonStyle";
import Add from "../../../assets/images/addIcon.svg";
import AppLoading from "../../../components/AppLoading";
import Search from "../../../assets/images/searchBackground.svg";
import Filter from "../../../assets/images/filterBackground.svg";
import DropDown from "../../../assets/images/dropdown-gold.svg";
import UpDrop from "../../../assets/images/arrow_upward.svg";
import UnSelect from "../../../assets/images/unselectBox.svg";
import Grouped from "../../../assets/images/selected.svg";
import GroupIcon from "../../../assets/images/group.svg";
import Button from "../../../components/Button/Button";
import CategoryFilterModal from "../../../components/CategoryFilterModal";
import SearchIcon from "../../../assets/images/search.svg";


let title='';
let categoryId='';
let page = 1;

const GetAccountability = (props) => {

    const isFocused = useIsFocused();
    const token = useSelector(state => state.ApiData.token);
    let goal = useSelector(state => state.ApiData.goal);
    const [loading,setLoading] = useState(false);
    const [data,setData] = useState([])
    const [lockModal, setLockModal] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);
    const [search, setSearch] = useState(false);
    let [categoryData, setCategoryData] = useState([]);

    const [selectedIndex,setSelectedIndex] = useState('');
    const [selectedItem,setSelectedItem]   = useState('');
    let [select, setSelect] = useState(0);


    useEffect(() => {
        if(goal){
            setLockModal(false)
            setSelectedIndex('')
            getGoals(true);
            getCategories();
        } else {
            setLockModal(true)
        }
    }, [isFocused]);


    const getGoals = (bool) => {
        setLoading(bool);
        ApiHelper.getGoals(token,(response) => {
            if(response.isSuccess){
                if(response.response.data.code === 200){
                    console.log('Data',response.response.data.data.docs)
                    setData(response.response.data.data.docs)
                    setLoading(false);
                }
            }else {
                setLoading(false);
                console.log('Response',response.response)
            }
        })
    }


    const getCategories = () => {
        let accountArray = [{
            id:0,
            name:'All Categories'
        }];
        ApiHelper.getCategories(token,'ACCOUNTABILITY', (response) => {
            if (response.isSuccess) {
                if (response.response.data.code === 200) {
                    response.response.data.data.map((value) =>{
                        accountArray.push({
                            id:value.id,
                            name:value.name
                        })
                    })
                    setCategoryData(accountArray)
                } else {
                }
            } else {
                console.log("Error in ==>", response.response);
            }
        });
    };


    const onCatSelect = (value,index) => {
        console.log('Name',value,index)
        if(value.name === 'All Categories'){
            categoryId='';
            setSelect(index)
            getGoals(true);
        } else {
            categoryId=value.id;
            setSelect(index)
            getGoals(true);
        }
    }


    const renderCheckBox = (item,index) => {
        return(
            <TouchableOpacity style={styles.tickView} onPress={() => onChangeStatus(item,index)} activeOpacity={0.7}>
                <TouchableOpacity style={styles.tickIcon} onPress={() => onChangeStatus(item,index)} activeOpacity={0.7}>
                    {item.status === false ? <UnSelect height={20} width={20}/> : <Grouped height={20} width={20}/>}
                </TouchableOpacity>
                <View style={styles.textView}>
                    <Text style={item.status === false ? styles.listText : [styles.listText,{color:colors.checklist_item,textDecorationLine:'line-through'}]} numberOfLines={1}>{item.name}</Text>
                </View>
            </TouchableOpacity>
        )
    }


    const onChangeStatus = (item,index) => {
        setLoading(true);
        ApiHelper.changeSingleGoalStatus(token,item.id,(response) => {
            if(response.isSuccess){
                if(response.response.data.code === 200){
                    let newArray=data;
                    newArray[selectedIndex].ChecklistItems[index].status = !item.status;
                    setData(() => {
                        return[...newArray];
                    });
                    setLoading(false);
                    // console.log('data',response.response.data)
                }
            }else {
                setLoading(false);
                console.log('Response',response.response.response)
            }
        })
    }


    const onPressOpen = (item,index) => {
        if(selectedIndex === index){
            setSelectedIndex('')
            setSelectedItem('')
        }else{
            setSelectedIndex(index)
            setSelectedItem(item)
        }
    }


    return (
        <View style={styles.mainContainer}>
            {AppLoading.renderLoading(loading)}
            <StatusBar backgroundColor={colors.app_background} />
            <View style={styles.listView}>
                {lockModal === false ?
                    <FlatList
                        data={data}
                        extraData={data}
                        ListHeaderComponent={() => {
                        return(
                            <View style={styles.upperView}>
                                <View style={styles.headerStyle}>
                                    {!search ? <Text style={styles.headerTextStyle}>Accountability</Text> : null}
                                    <View style={styles.filterIcons}>
                                        {!search ?
                                            <TouchableOpacity activeOpacity={0.7} onPress={() => setSearch(!search)}>
                                                <Search/>
                                            </TouchableOpacity>:
                                            <View style={[CommonStyle.searchText,{marginLeft:wp(3),width:wp(60)}]}>
                                                <SearchIcon/>
                                                <TextInput
                                                    style={{width:wp(45),color:'white',paddingHorizontal:wp(3),height:hp(4.5)}}
                                                    onChangeText={(e) => console.log(e)}
                                                    value={title}
                                                />
                                                <TouchableOpacity
                                                    style={{height:hp(4.5),justifyContent:'center'}}
                                                    onPress={() => setSearch(false)}
                                                >
                                                    <Image source={images.crossImage} style={{height:hp(2),width:wp(5),resizeMode:'cover'}}/>
                                                </TouchableOpacity>
                                            </View>
                                        }
                                        <TouchableOpacity activeOpacity={0.7} onPress={() => setModalVisible(!modalVisible)}>
                                            <Filter/>
                                        </TouchableOpacity>
                                        <TouchableOpacity
                                            activeOpacity={0.7}
                                            style={{marginLeft: search ? wp(2) : null}}
                                            onPress={() => props.navigation.navigate(ADD_GOAL)}
                                        >
                                            <Add/>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </View>
                        )
                    }}
                    keyExtractor={(item) => item.id}
                    renderItem={({item,index}) => {
                        let date = moment(item.dateCompleted).format('MM/DD/YYYY');
                        return(
                            <TouchableOpacity style={index !== props.index ? styles.container : [styles.container,{backgroundColor:'#1F1F1F',borderRadius:wp(6)}]} activeOpacity={0.7} onPress={() => props.navigation.navigate(EDIT_ACCOUNTABILITY,{item})}>
                                <View style={styles.innerContainer}>
                                    <View style={styles.rightView}>
                                        <View style={styles.titleUpperText}>
                                            <Text style={styles.titleText} numberOfLines={1}>{item.title}</Text>
                                            <View style={{paddingLeft:wp(2),justifyContent:'center',alignItems:"center",marginTop:wp(1)}}>
                                                {item.isCreatedByAdmin ?  <GroupIcon height={18} width={18}/> : null}
                                            </View>
                                        </View>
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
                                        <TouchableOpacity style={styles.dropArrow} activeOpacity={0.7} onPress={() => item.ChecklistItems.length > 0 ? onPressOpen(item,index) : null}>
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
                /> :
                    <View style={styles.upgradePlan}>
                        <Text style={[styles.headerTextStyle,{fontSize:wp(6),fontWeight:'500',textAlign:'center'}]}>Upgrade Your Plan To Get Access</Text>
                    <View style={{marginTop:hp(2)}}>
                        <Button
                            buttonText={'UPGRADE PLAN'}
                            width={wp(50)}
                            onPress={() => props.navigation.navigate(PLAN_SCREEN,{fromChange:true})}
                        />
                    </View>
                </View>}
            </View>

            <Model
                animationIn="zoomIn"
                animationOut="zoomOut"
                transparent={true}
                isVisible={modalVisible}
                onBackdropPress={() => setModalVisible(!modalVisible)}
            >
                <CategoryFilterModal
                    onPressClose={() => setModalVisible(!modalVisible)}
                    catData={categoryData}
                    index={select}
                    onSelect={(value,index) => {
                        setModalVisible(!modalVisible)
                        onCatSelect(value,index);
                    }}
                />
            </Model>
        </View>
    );
};

export default GetAccountability;
