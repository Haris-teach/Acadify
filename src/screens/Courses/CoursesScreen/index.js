//================================ React Native Imported Files ======================================//

import React, { useEffect } from "react";
import {
  View,
  Text,
  Modal,
  Image,
  FlatList,
  TextInput,
  TouchableOpacity,
  ActionSheetIOS
} from "react-native";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useIsFocused } from "@react-navigation/native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from "react-native-responsive-screen";
import Model from "react-native-modal";
import * as Animatable from 'react-native-animatable';

//================================ Local Imported Files ======================================//

import styles from "./style";
import ApiHelper from "../../../api/ApiHelper";
import {COURSE_DETAILS, PLAN_SCREEN} from "../../../constants/navigators";
import images from "../../../assets/images/images";
import AppLoading from "../../../components/AppLoading";
import Search from "../../../assets/images/searchBackground.svg";
import Filter from "../../../assets/images/filterBackground.svg";
import DropArrow from "../../../assets/images/dropdown.svg";
import Button from "../../../components/Button/Button";
import SearchIcon from "../../../assets/images/search.svg";
import CourseCard from "../../../components/CourseCard/CourseCard";
import CategoryFilterModal from "../../../components/CategoryFilterModal";
import CourseDropdown from "../../../components/CourseDropDwon";

let title='';
let categoryId='';
let isFreeKey='';
let isFree='';
let page = 1;

const DashboardScreen = (props) => {

  const isFocused = useIsFocused();
  const token = useSelector((state) => state.ApiData.token);
  let course = useSelector(state => state.ApiData.course);
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [dropModal, setDropModal] = useState(false);
  const [lockModal, setLockModal] = useState(false);
  let [coursesData, setCoursesData] = useState([]);
  let [categoryData, setCategoryData] = useState([]);
  let [catText, setCatText] = useState('All Courses');
  let [select, setSelect] = useState(0);
  let [pageLength, setPageLength] = useState(0);
  let dropText = [
    {
      id:0,
      name:'All Courses'
    },
    {
      id:1,
      name:'Paid Courses'
    },
    {
      id:2,
      name:'Free Courses'
    },
    {
      id:3,
      name:'Enrolled Courses'
    }
  ];

  let [search, setSearch] = useState(false);


  useEffect(() => {
    if(course){
      setLockModal(false)
      setCatText('All Courses');
      setSearch(false)
      page = 1;
      title='';
      categoryId='';
      isFreeKey='';
      isFree='';
      setCoursesData([])
      getUserProfile(true);
      getCategories();
    } else {
      setLockModal(true);
    }
  }, [isFocused]);


  const getUserProfile = (bool) => {
    setLoading(bool);
    let tempArray = [];
    let url = `/api/v1/courses/?page=${page}&size=10&${isFreeKey}=${isFree}&categoryId=${categoryId}&title=%${title}%`;
    ApiHelper.getCoursesData(token,url,(response) => {
      if (response.isSuccess) {
        if (response.response.data.code === 200) {
          ApiHelper.consoleBox("data ==>", response.response.data);
          response.response.data.data.docs.map((value) => {
            if(value.CoursePayeds.length > 0){
              if(value.CoursePayeds[0].paid === true){
                tempArray.push({
                  isLock:false,
                  id:value.id,
                  catName:value.Category.name,
                  title:value.title,
                  image:value.imageURL,
                  price:value.Courseprices[0].price
                })
              }else{
                tempArray.push({
                  isLock:true,
                  id:value.id,
                  catName:value.Category.name,
                  title:value.title,
                  image:value.imageURL,
                  price:value.CoursePayeds[0].price
                })
              }
            } else {
              tempArray.push({
                isLock:true,
                id:value.id,
                catName:value.Category.name,
                title:value.title,
                image:value.imageURL,
                price:value.Courseprices[0].price
              })
            }
          })
          setPageLength(response.response.data.data.pages)
          setCoursesData(tempArray);
          setLoading(false);
        } else {
          ApiHelper.consoleBox("Error inner ==>", response.response.data);
        }
      } else {
        setLoading(false);
        ApiHelper.consoleBox("Error inner ==>", response.data);
      }
    });
  };


  const getCategories = () => {
    setLoading(true);
    let accountArray = [{
      id:0,
      name:'All Categories'
    }];
    ApiHelper.getCategories(token,'COURSES', (response) => {
      if (response.isSuccess) {
        setLoading(false);
        if (response.response.data.code === 200) {
          response.response.data.data.map((value) => {
            accountArray.push({
              id:value.id,
              name:value.name
            })
          })
          setCategoryData(accountArray)
        } else {
        }
      } else {
        setLoading(false);
        ApiHelper.consoleBox("Error in course Category ==>", response.response);
      }
    });
  };


  const onSelectType = (text) => {
    if(text === 'All Courses'){
      setCoursesData([])
      isFreeKey='';
      isFree='';
      getUserProfile(true);
    } else if(text === 'Paid Courses'){
      setCoursesData([])
      isFreeKey='isFree';
      isFree='0';
      getUserProfile(true);
    } else if(text === 'Free Courses'){
      setCoursesData([])
      isFreeKey='isFree'
      isFree='1';
      getUserProfile(true);
    } else if(text === 'Enrolled Courses'){
      setCoursesData([])
      isFreeKey='notenrolled'
      isFree='yes';
      getUserProfile(true);
    }
  };


  const renderCourseItems = (item,index) => {
    return (
        <CourseCard
            isLock={item.isLock}
            title={item.title}
            createdBy={item.catName}
            imgUri={item.image}
            price={item.price}
            onPressCourse={() => props.navigation.navigate(COURSE_DETAILS,{courseId:item.id})}
        />
    );
  }


  const LoadMoreRandomData = () => {
    if(page < pageLength){
      page = page + 1;
      getUserProfile(true);
    }
  }


  const onCatSelect = (value,index) => {
    if(value.name === 'All Categories'){
      categoryId='';
      setSelect(index)
      getUserProfile(true);
    } else {
      categoryId=value.id;
      setSelect(index)
      getUserProfile(true);
    }
  }


  const openValue = (text) => {
      title = text;
      getUserProfile(false);
  }


  const data = () => {
      ActionSheetIOS.showActionSheetWithOptions(
          {
            options: ["Cancel", "Generate number", "Reset"],
            destructiveButtonIndex: 2,
            cancelButtonIndex: 0,
            userInterfaceStyle: 'dark'
          }, buttonIndex => {
            if (buttonIndex === 0) {
              // cancel action
            } else if (buttonIndex === 1) {
              // setResult(Math.floor(Math.random() * 100) + 1);
            } else if (buttonIndex === 2) {
              // setResult("🔮");
            }
          });
  }


  return (
    <View style={styles.mainContainer}>
      {AppLoading.renderLoading(loading)}
        <View style={styles.container}>
          {lockModal === false ?
              <FlatList
                  data={coursesData}
                  extraData={coursesData}
                  onEndReachedThreshold={0}
                  onEndReached={() => LoadMoreRandomData()}
                  keyExtractor={(item) => item.id}
                  ListHeaderComponent={() => {
                    return (
                        <View style={styles.upperView}>
                          {!search ?
                              <TouchableOpacity style={styles.headerStyle} onPress={() => setDropModal(!dropModal)}>
                                <Text style={styles.headerTextStyle}>{catText}</Text>
                                <View style={styles.dropArrow}>
                                  <DropArrow/>
                                </View>
                              </TouchableOpacity> :
                              <View style={styles.searchText}>
                                <SearchIcon/>
                                <TextInput
                                    style={{width:wp(50),color:'white',paddingHorizontal:wp(3),height:hp(4.5)}}
                                    onChangeText={(e) => openValue(e)}
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
                      <View style={styles.filterIcons}>
                        {!search && <TouchableOpacity
                            activeOpacity={0.7}
                            onPress={() => setSearch(true)}
                        >
                          <Search/>
                        </TouchableOpacity>}
                        <TouchableOpacity activeOpacity={0.7} onPress={() => setModalVisible(!modalVisible)}>
                          <Filter/>
                        </TouchableOpacity>
                      </View>
                    </View>
                )
              }}
              renderItem={({item, index}) => renderCourseItems(item, index)}
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
              </View>
          }
        </View>

      <Model
          animationIn="zoomInUp"
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

      <Modal
          animationType={'none'}
          transparent={true}
          visible={dropModal}
          onRequestClose={() => setDropModal(!dropModal)}
      >
        <CourseDropdown
            onPressClose={() => setDropModal(!dropModal)}
            text={dropText}
            fromCourse={true}
            onSelect={(text) => {
              setCatText(text)
              setDropModal(!dropModal)
              onSelectType(text)
            }}
        />
      </Modal>

    </View>
  );
};

export default DashboardScreen;
