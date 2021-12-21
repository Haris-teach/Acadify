//================================ React Native Imported Files ======================================//

import React, { useEffect } from "react";
import {
    View,
    Text,
    TouchableOpacity,
    FlatList,
    Modal
} from "react-native";
import { useState } from "react";
import { useSelector } from "react-redux";
import {useIsFocused} from "@react-navigation/native";
import Model from "react-native-modal";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";

//================================ Local Imported Files ======================================//

import styles from "./style";
import ApiHelper from "../../../api/ApiHelper";
import {COURSE_DETAILS} from "../../../constants/navigators";
import AppLoading from "../../../components/AppLoading";
import Search from "../../../assets/images/searchBackground.svg";
import Filter from "../../../assets/images/filterBackground.svg";
import DropArrow from "../../../assets/images/dropdown.svg";
import CourseCard from "../../../components/CourseCard/CourseCard";
import CategoryFilterModal from "../../../components/CategoryFilterModal";
import CourseDropdown from "../../../components/CourseDropDwon";
import Button from "../../../components/Button/Button";


const DashboardScreen = (props) => {

  const isFocused = useIsFocused();
  const token = useSelector((state) => state.ApiData.token);
  let course = useSelector(state => state.ApiData.course);
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [dropModal, setDropModal] = useState(false);
  const [lockModal, setLockModal] = useState(false);
  let [coursesData, setCoursesData] = useState([]);
  let [page, setPage] = useState(1);
  let [categoryData, setCategoryData] = useState([]);
  let [catText, setCatText] = useState('All Courses');
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


  useEffect(() => {
    if(course){
      setCatText('All Courses');
      setPage(1);
      getUserProfile();
      getCategories();
    } else {
      setLockModal(true);
    }
  }, [isFocused]);


  const getUserProfile = () => {
    setLoading(true);
    let tempArray = [];
    ApiHelper.getCoursesData(token,page,(response) => {
      if (response.isSuccess) {
        if (response.response.data.code === 200) {
          console.log('Data',response.response.data)
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
          setCoursesData(tempArray);
          setLoading(false);
        } else {
          console.log("Error inner ==>", response.response.data);
        }
      } else {
        setLoading(false);
        console.log("Error in ==>", response.response.response);
      }
    });
  };


  const getCategories = () => {
    setLoading(true);
    ApiHelper.getCategories(token,'COURSES', (response) => {
      if (response.isSuccess) {
        setLoading(false);
        if (response.response.data.code === 200) {
          setCategoryData(response.response.data.data)
        } else {
        }
      } else {
        setLoading(false);
        console.log("Error in ==>", response.response);
      }
    });
  };


  const onSelectType = (text) => {
    let url;
    let tempArray = [];
    if(text === 'All Courses'){
      getUserProfile();
    } else if(text === 'Paid Courses'){
      url = '/api/v1/courses/?isFree=0';
    } else if(text === 'Free Courses'){
      url = '/api/v1/courses/?isFree=1';
    } else if(text === 'Enrolled Courses'){
      url = '/api/v1/courses/?notenrolled=yes';
    }
    setLoading(true);
    ApiHelper.getCourseTypes(token,url, (response) => {
      if (response.isSuccess) {
        if (response.response.data.code === 200) {
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

          setCoursesData(tempArray);
          setLoading(false);
          console.log('Data ===>',response.response.data)
        } else {
        }
      } else {
        setLoading(false);
        console.log("Error in ==>", response.response.data);
      }
    });
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
    setPage(page = page + 1);
    setMoreData();
  }


  const setMoreData = () => {
    // setLoading(true);
    // let tempArray = [];
    // ApiHelper.getCoursesData(token,page,(response) => {
    //   if (response.isSuccess) {
    //     // setCategoryExtraData(coursesData = page === 2 ? response.response.data.data.docs : [...coursesData, ...response.response.data.data.docs]);
    //     response.response.data.data.docs?.map((value) => {
    //       if (value.CoursePayeds.length > 0) {
    //       if (value.CoursePayeds[0].paid === true) {
    //         tempArray.push({
    //           isLock: false,
    //           id: value.id,
    //           catName: value.Category.name,
    //           title: value.title,
    //           image: value.imageURL,
    //           price: value.Courseprices[0].price
    //         })
    //       } else {
    //         tempArray.push({
    //           isLock: true,
    //           id: value.id,
    //           catName: value.Category.name,
    //           title: value.title,
    //           image: value.imageURL,
    //           price: value.CoursePayeds[0].price
    //         })
    //       }
    //     } else {
    //       tempArray.push({
    //         isLock: true,
    //         id: value.id,
    //         catName: value.Category.name,
    //         title: value.title,
    //         image: value.imageURL,
    //         price: value.Courseprices[0].price
    //       })
    //     }
    //   })
    //     console.log('te')
    //     setCoursesData(coursesData = page === 2 ? response.response.data.data.docs : [...coursesData, ...tempArray]);
    //     setLoading(false);
    //   }else{
    //     setLoading(false);
    //   }
    // })
  }


  const onCatSelect = (value) => {
    console.log('Value',value)
  }


  return (
    <View style={styles.mainContainer}>
      {AppLoading.renderLoading(loading)}
        <View style={styles.container}>
          {lockModal === false ? <FlatList
              data={coursesData}
              extraData={coursesData}
              onEndReachedThreshold={0}
              onEndReached={() => LoadMoreRandomData()}
              keyExtractor={(item) => item.id}
              ListEmptyComponent={() => {
                return (
                    <View style={styles.emptySection}>
                      <Text style={[styles.headerTextStyle, {fontSize: wp(5)}]}>No Courses Found</Text>
                    </View>
                )
              }}
              ListHeaderComponent={() => {
                return (
                    <View style={styles.upperView}>
                      <TouchableOpacity style={styles.headerStyle} onPress={() => setDropModal(!dropModal)}>
                        <Text style={styles.headerTextStyle}>{catText}</Text>
                        <View style={styles.dropArrow}>
                          <DropArrow/>
                        </View>
                      </TouchableOpacity>
                      <View style={styles.filterIcons}>
                        <TouchableOpacity activeOpacity={0.7} onPress={() => console.log('Searched')}>
                          <Search/>
                        </TouchableOpacity>
                        <TouchableOpacity activeOpacity={0.7} onPress={() => {
                          console.log('Pressed')
                          // setModalVisible(!modalVisible)
                        }}>
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
                      onPress={() => console.log('Plan Upgrade')}
                  />
                </View>
              </View>
          }
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
            onSelect={(value) => {
              setModalVisible(!modalVisible)
              onCatSelect(value);
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
