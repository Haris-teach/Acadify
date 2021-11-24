//================================ React Native Imported Files ======================================//

import React, { useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { useState } from "react";
import { Picker } from "@react-native-picker/picker";
import { useSelector } from "react-redux";
import {heightPercentageToDP as hp, widthPercentageToDP as wp} from "react-native-responsive-screen";
import {useIsFocused} from "@react-navigation/native";
import Modal from "react-native-modal";

//================================ Local Imported Files ======================================//

import styles from "./style";
import colors from "../../assets/colors/colors";
import ApiHelper from "../../api/ApiHelper";
import AppHeaderNative from "../../components/AppHeaderNative";
import AppLoading from "../../components/AppLoading";
import Search from "../../assets/images/searchBackground.svg";
import Filter from "../../assets/images/filterBackground.svg";
import DropArrow from "../../assets/images/dropdown.svg";
import CourseCard from "../../components/CourseCard/CourseCard";
import CategoryFilterModal from "../../components/CategoryFilterModal";
import {COURSE_DETAILS} from "../../constants/navigators";


const DashboardScreen = (props) => {

  const isFocused = useIsFocused();
  const token = useSelector((state) => state.ApiData.token);
  const [selectedLanguage, setSelectedLanguage] = useState();
  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  let [coursesData, setCoursesData] = useState([]);
  let [page, setPage] = useState(1);
  let [categoryData, setCategoryData] = useState([]);

  let [catText, setCatText] = useState('All Courses');


  const getUserProfile = () => {
    setLoading(true);
    let tempArray = [];
    ApiHelper.getCoursesData(token,page, (response) => {
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
        console.log("Error ==>", response.response);
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
        console.log("Error ==>", response.response);
      }
    });
  };


  useEffect(() => {
    setPage(1);
    getUserProfile();
    getCategories();
  }, [isFocused]);


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


  return (
    <View style={styles.mainContainer}>
      {AppLoading.renderLoading(loading)}
      <View style={styles.headerView}>
        <AppHeaderNative
          leftIconPath={true}
          rightIconOnePath={true}
          onLeftIconPress={() => props.navigation.openDrawer()}
          onRightIconPress={() => console.log('Data on Ring')}
        />
      </View>

      {visible ? (
        <Picker
          style={{
            zIndex: 1000,
            width: wp(40),
            height:hp(30),
            justifyContent: "center",
            position: "absolute",
            top: 110,
            left: 20,
          }}
          itemStyle={{
            backgroundColor: colors.image_background,
            color: "#ddd",
            fontSize: wp(4),
          }}
          selectedValue={selectedLanguage}
          onValueChange={(itemValue, itemIndex) =>
            setSelectedLanguage(itemValue)
          }
        >
          <Picker.Item label="All Courses" value="All Courses" />
          <Picker.Item label="Free Courses" value="Free Courses" />
          <Picker.Item label="Paid Courses" value="Paid Courses" />
          <Picker.Item label="Enrolled Courses" value="Enrolled Courses" />
        </Picker>
      ) : null}
        <View style={styles.container}>
          <FlatList
            data={coursesData}
            extraData={coursesData}
            onEndReachedThreshold={0}
            onEndReached={() => LoadMoreRandomData()}
            keyExtractor={(item) => item.id}
            ListHeaderComponent={() => {
              return(
                  <View style={styles.upperView}>
                    <View style={styles.headerStyle}>
                      <Text style={styles.headerTextStyle}>{catText}</Text>
                      <TouchableOpacity
                        activeOpacity={0.7}
                        style={styles.dropArrow}
                        onPress={() => console.log('Data')}
                      >
                        <DropArrow/>
                      </TouchableOpacity>
                    </View>
                    <View style={styles.filterIcons}>
                      <TouchableOpacity activeOpacity={0.7} onPress={() => console.log('Searched')}>
                        <Search/>
                      </TouchableOpacity>
                      <TouchableOpacity activeOpacity={0.7} onPress={() => console.log('Pressed')}>
                        <Filter/>
                      </TouchableOpacity>
                    </View>
                  </View>
              )
            }}
            renderItem={({item, index}) => renderCourseItems(item,index)}
          />
        </View>

      <Modal
          animationIn="zoomIn"
          animationOut="zoomOut"
          transparent={true}
          isVisible={modalVisible}
          onBackdropPress={() => setModalVisible(!modalVisible)}
      >
        <CategoryFilterModal
            onPressClose={() => setModalVisible(!modalVisible)}
            catData={categoryData}
        />
      </Modal>

    </View>
  );
};

export default DashboardScreen;
