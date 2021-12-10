//================================ React Native Imported Files ======================================//

import React,{ useState } from "react";
import { DrawerContentScrollView } from "@react-navigation/drawer";
import {Text, StyleSheet, TouchableOpacity, View, Platform} from "react-native";
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from "react-native-responsive-screen";

//================================ Local Imported Files ======================================//

import WrenchBold from "../../assets/images/renchbold.svg";
import Settings from "../../assets/images/settings.svg";
import BagBold from "../../assets/images/bagBold.svg";
import Bag from "../../assets/images/bag.svg";
import Trophy from "../../assets/images/trophy.svg";
import Home from "../../assets/images/home.svg";
import Msg from "../../assets/images/forumBold1.svg";
import LiveBold from "../../assets/images/509.svg";
import Second from "../../assets/images/second.svg";
import CoursesBold from "../../assets/images/566.svg";
import TrophyBold from "../../assets/images/tophyBold.svg";
import HomeBold from "../../assets/images/home-bold.svg";
import ChatBold from "../../assets/images/msg-1.svg";
import SettingsBold from "../../assets/images/settingsBold.svg";
import Gear from "../../assets/images/settingsInactive.svg";
import Chat from "../../assets/images/935.svg";
import MyChatBold from "../../assets/images/Subtract.svg";
import Live from "../../assets/images/live.svg";
import {
  ALL_RESOURCES,
  COURSE_SCREEN,
  DASHBOARD_SCREEN,
  GET_ACCOUNTABILITY,
  JOURNEY,
  SETTINGS,
} from "../../constants/navigators";
import { height_screen } from "../../utils/Dimentions";
import colors from "../../assets/colors/colors";
import fonts from "../../assets/fonts/fonts";


const MenuBar = (props) => {

  const [home, setHome] = useState(true);
  const [live, setLive] = useState(false);
  const [course, setCourse] = useState(false);
  const [accountability, setAccountability] = useState(false);
  const [resources, setResources] = useState(false);
  const [journey, setJourney] = useState(false);
  const [forum, setForum] = useState(false);
  const [chat, setChat] = useState(false);
  const [gear, setGear] = useState(false);

  const onHome = () => {
    setHome(true);
    setLive(false);
    setCourse(false);
    setAccountability(false);
    setResources(false);
    setJourney(false);
    setForum(false);
    setChat(false);
    setGear(false);
    props.navigation.navigate(COURSE_SCREEN);
  };
  const onLive = () => {
    setHome(false);
    setLive(true);
    setCourse(false);
    setAccountability(false);
    setResources(false);
    setJourney(false);
    setForum(false);
    setChat(false);
    setGear(false);
  };
  const onSettings = () => {
    setHome(false);
    setLive(false);
    setCourse(false);
    setAccountability(true);
    setResources(false);
    setJourney(false);
    setForum(false);
    setChat(false);
    setGear(false);
    props.navigation.navigate(GET_ACCOUNTABILITY);
  };
  const onCourse = () => {
    setHome(false);
    setLive(false);
    setCourse(true);
    setAccountability(false);
    setResources(false);
    setJourney(false);
    setForum(false);
    setChat(false);
    setGear(false);
    props.navigation.navigate(DASHBOARD_SCREEN);
  };
  const onResource = () => {
    setHome(false);
    setLive(false);
    setCourse(false);
    setAccountability(false);
    setResources(true);
    setJourney(false);
    setForum(false);
    setChat(false);
    setGear(false);
    props.navigation.navigate(ALL_RESOURCES);
  };
  const onJourney = () => {
    setHome(false);
    setLive(false);
    setCourse(false);
    setAccountability(false);
    setResources(false);
    setJourney(true);
    setForum(false);
    setChat(false);
    setGear(false);
    props.navigation.navigate(JOURNEY);
  };
  const onForum = () => {
    setHome(false);
    setLive(false);
    setCourse(false);
    setAccountability(false);
    setResources(false);
    setJourney(false);
    setForum(true);
    setChat(false);
    setGear(false);
  };
  const onChat = () => {
    setHome(false);
    setLive(false);
    setCourse(false);
    setAccountability(false);
    setResources(false);
    setJourney(false);
    setForum(false);
    setGear(false);
    setChat(true);
  };
  const onGear = () => {
    setHome(false);
    setLive(false);
    setCourse(false);
    setAccountability(false);
    setResources(false);
    setJourney(false);
    setForum(false);
    setChat(false);
    setGear(true);
    props.navigation.navigate(SETTINGS);
  };


  return (
      <DrawerContentScrollView {...props} showsVerticalScrollIndicator={false}>
        <TouchableOpacity
            onPress={() => onHome()}
            style={[styles.activeIconHolder2,{marginTop: height_screen < 675 ? 25 : Platform.OS === 'android' ?  hp(5) : -hp(1)}]}
        >
          <View style={home ? styles.focusLine : [styles.focusLine,{backgroundColor:'transparent'}]}/>
          <View style={styles.iconView}>
            { home ? <HomeBold /> : <Home />}
            <Text style={styles.txt}>Dashboard</Text>
          </View>

        </TouchableOpacity>
        <TouchableOpacity
            onPress={() => onLive()}
            style={[styles.activeIconHolder2,{marginTop: height_screen < 675 ? 30 :Platform.OS === 'android' ?  hp(2) : 7}]}
        >
          <View style={live ? styles.focusLine : [styles.focusLine,{backgroundColor:'transparent'}]}/>
          <View style={styles.iconView}>
            {live ? <LiveBold /> : <Live />}
            <Text style={styles.txt}>Live Training</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
            onPress={() => onCourse()}
            style={[styles.activeIconHolder2,{marginTop: height_screen < 675 ? 25 : Platform.OS === 'android' ?  hp(2) : 7}]}
        >
          <View style={course ? styles.focusLine : [styles.focusLine,{backgroundColor:'transparent'}]}/>
          <View style={styles.iconView}>
            {course ? <CoursesBold /> : <Second />}
            <Text style={styles.txt}>Course</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
            onPress={() => onSettings()}
            style={[styles.activeIconHolder2,{marginTop: height_screen < 675 ? 25 : Platform.OS === 'android' ?  hp(2) : 8}]}
        >
          <View style={accountability ? styles.focusLine : [styles.focusLine,{backgroundColor:'transparent'}]}/>
          <View style={styles.iconView}>
            {accountability ? <TrophyBold /> : <Trophy />}
            <Text style={styles.txt}>Accountability</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
            onPress={() => onResource()}
            style={[styles.activeIconHolder2,{marginTop: height_screen < 675 ? 25 : Platform.OS === 'android' ?  hp(2) : 7}]}
        >
          <View style={resources ? styles.focusLine : [styles.focusLine,{backgroundColor:'transparent'}]}/>
          <View style={styles.iconView}>
            {resources ? <WrenchBold /> : <Settings />}
            <Text style={styles.txt}>Resources</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
            onPress={() => onJourney()}
            style={[styles.activeIconHolder2,{marginTop: height_screen < 675 ? 25 :Platform.OS === 'android' ?  hp(2) : 7}]}
        >
          <View style={journey ? styles.focusLine : [styles.focusLine,{backgroundColor:'transparent'}]}/>
          <View style={styles.iconView}>
            {journey ? <BagBold /> : <Bag />}
            <Text style={styles.txt}>Journey</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
            onPress={() => onForum()}
            style={[styles.activeIconHolder2,{marginTop: height_screen < 675 ? 25 :Platform.OS === 'android' ?  hp(2) : 7}]}
        >
          <View style={forum ? styles.focusLine : [styles.focusLine,{backgroundColor:'transparent'}]}/>
          <View style={styles.iconView}>
            {forum ? <Msg height={27} width={27} /> : <ChatBold height={27} width={27} />}
            <Text style={styles.txt}>Forum</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
            onPress={() => onChat()}
            style={[styles.activeIconHolder2,{marginTop: height_screen < 675 ? 25 : Platform.OS === 'android' ?  hp(2) : 7}]}
        >
          <View style={chat ? styles.focusLine : [styles.focusLine,{backgroundColor:'transparent'}]}/>
          <View style={styles.iconView}>
            {chat ? <MyChatBold height={25} width={25}/> : <Chat height={25} width={25}/>}
            <Text style={styles.txt}>Chat</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
            onPress={() => onGear()}
            style={[styles.activeIconHolder2,{marginTop: height_screen < 675 ? 25 : Platform.OS === 'android' ?  hp(2) : 7}]}
        >
          <View style={gear ? styles.focusLine : [styles.focusLine,{backgroundColor:'transparent'}]}/>
          <View style={styles.iconView}>
            {gear ? <SettingsBold height={25} width={25}/> : <Gear height={25} width={25} />}
            <Text style={styles.txt}>Settings</Text>
          </View>
        </TouchableOpacity>
      </DrawerContentScrollView>
  );
};
const styles = StyleSheet.create({
  activeIconHolder2: {
    alignItems: "center",
    flexDirection:'row',
    height:hp(6),
  },
  iconView:{
    width:wp(22),
    justifyContent: "center",
    alignItems: "center",
  },
  focusLine:{
    borderRadius:wp(2),
    height:hp(5.3),
    width:wp(2),
    backgroundColor:colors.button_text
  },
  // iconHolder: {
  //   marginTop: height_screen < 675 ? 25 : 30,
  //   justifyContent: "center",
  //   alignItems: "center",
  // },
  // activeIconHolder: {
  //   marginTop: height_screen < 675 ? 25 : 30,
  //   justifyContent: "center",
  //   alignItems: "center",
  //   borderLeftColor: "#B7A675",
  //   borderLeftWidth: 8,
  //   width: 100,
  // },
  txt: {
    color: colors.white,
    fontFamily:fonts.regular,
    fontSize: wp(2.5),
    marginTop: 4
  },
});

export default MenuBar;
