//================================ React Native Imported Files ======================================//

import React, { useEffect } from "react";
import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { useState } from "react";
import { Picker } from "@react-native-picker/picker";
import { useSelector } from "react-redux";
import {heightPercentageToDP, widthPercentageToDP} from "react-native-responsive-screen";
import {useIsFocused} from "@react-navigation/native";

//================================ Local Imported Files ======================================//

import styles from "./style";
import Search from "../../assets/images/search.svg";
import Filter from "../../assets/images/filter.svg";
import Drop from "../../assets/images/dropdown.svg";
import CourseCard from "../../components/CourseCard/CourseCard";
import colors from "../../assets/colors/colors";
import ApiHelper from "../../api/ApiHelper";
import AppHeaderNative from "../../components/AppHeaderNative";
import AppLoading from "../../components/AppLoading";


const DashboardScreen = (props) => {

  const isFocused = useIsFocused();
  const [toggle, setToggle] = useState(true);
  const [selectedLanguage, setSelectedLanguage] = useState();
  const [visible, setVisible] = useState(false);
  const token = useSelector((state) => state.ApiData.token);
  const [loading, setLoading] = useState(false);
  const [coursesData, setCoursesData] = useState();


  const getUserProfile = (props) => {
    setLoading(true);
    ApiHelper.getCoursesData(token, (response) => {
      if (response.isSuccess) {
        setLoading(false);
        if (response.response.data.code === 200) {
          setCoursesData(response.response.data.data.docs);
        } else {
          console.log("Error inner ==>", response.response.data);
        }
      } else {
        setLoading(false);
        console.log("Error ==>", response.response);
      }
    });
  };

  useEffect(() => {
    getUserProfile();
  }, [isFocused]);

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
            width: 180,
            justifyContent: "center",
            position: "absolute",
            top: 110,
            left: 20,
          }}
          itemStyle={{
            backgroundColor: colors.image_background,
            color: "#ddd",
            fontSize: 18,
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
      {toggle ? (
        <View style={styles.container}>
          <FlatList
            data={coursesData}
            extraData={coursesData}
            keyExtractor={(itm, ind) => ind.toString()}
            ListHeaderComponent={() => {
              return(
                  <View style={{ flexDirection: "row", justifyContent: "space-between" ,alignItems:'center',paddingHorizontal:widthPercentageToDP(4),height:heightPercentageToDP(10)}}>
                    <View style={{ flexDirection: "row" }}>
                      <Text style={styles.topHeading}>All Courses</Text>
                      <TouchableOpacity
                          onPress={() => console.log('data')}
                          // onPress={() => setVisible(!visible)}
                          style={{  marginTop:10,marginLeft: 7 }}
                      >
                        <Drop />
                      </TouchableOpacity>
                    </View>

                    <View style={{ flexDirection: "row" }}>
                      <TouchableOpacity style={styles.iconHolder}>
                        <Search />
                      </TouchableOpacity>
                      <TouchableOpacity
                          // onPress={() => setToggle(!toggle)}
                          onPress={() => console.log('Data')}
                          style={[
                            styles.iconHolder,
                            {
                              marginLeft: 7,
                              marginRight: 3,
                            },
                          ]}
                      >
                        <Filter />
                      </TouchableOpacity>
                    </View>
                  </View>
              )
            }}
            renderItem={(item, index) => {
              return (
                <TouchableOpacity style={styles.innerContainer}>
                  <CourseCard
                      isLock={true}
                      title={item.item.title}
                      createdBy={item.item.createdby}
                      imgUri={item.item.imageURL}
                  />
                </TouchableOpacity>
              );
            }}
          />
        </View>
      ) : (
        <View style={styles.mainContainer}>
          <View style={{ flex: 1, alignItems: "center" }}>
            <View style={styles.headingView}>
              <Text style={{ color: "white", fontSize: 18 }}>
                All Categories
              </Text>
            </View>
            <View style={styles.headingView}>
              <Text style={styles.listText}>Finance and Accounting</Text>
              <Text style={styles.listText}>Business</Text>
              <Text style={styles.listText}>Finance and Accounting</Text>
              <Text style={styles.listText}>It and Software</Text>
              <Text style={styles.listText}>Finance and Accounting</Text>
              <Text style={styles.listText}>Personal Software</Text>
            </View>
          </View>
        </View>
      )}
    </View>
  );
};

export default DashboardScreen;
