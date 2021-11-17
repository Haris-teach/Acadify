import React, { useEffect } from "react";
import { DrawerContentScrollView } from "@react-navigation/drawer";
import { Text, StyleSheet, TouchableOpacity } from "react-native";
import Live from "../../assets/images/live.svg";
import RenchBold from "../../assets/images/renchbold.svg";
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

import { useState } from "react";
import {
  ADD_GOAL,
  COURSE_SCREEN,
  DASHBOARD_SCREEN,
  GET_ACCOUNTABILITY,
  JOURNEY,
  SETTINGS,
} from "../../constants/navigators";
import { height_screen } from "../../utils/Dimentions";
import { useSelector } from "react-redux";

const MenuBar = (props) => {

  const [home, setHome] = useState(true);
  const [live, setLive] = useState(false);
  const [course, setCourse] = useState(false);
  const [accountibility, setAccountibility] = useState(false);
  const [resources, setResources] = useState(false);
  const [journey, setJourney] = useState(false);
  const [forum, setForum] = useState(false);
  const [links, setLinks] = useState(false);
  const [chat, setChat] = useState(false);
  const [gear, setGear] = useState(false);

  const onHome = () => {
    setHome(true);
    setLive(false);
    setCourse(false);
    setAccountibility(false);
    setResources(false);
    setJourney(false);
    setForum(false);
    setLinks(false);
    setChat(false);
    setGear(false);
    props.navigation.navigate(COURSE_SCREEN);
  };
  const onLive = () => {
    setHome(false);
    setLive(true);
    setCourse(false);
    setAccountibility(false);
    setResources(false);
    setJourney(false);
    setForum(false);
    setLinks(false);
    setChat(false);
    setGear(false);
  };
  const onSettings = () => {
    setHome(false);
    setLive(false);
    setCourse(false);
    setAccountibility(true);
    setResources(false);
    setJourney(false);
    setForum(false);
    setLinks(false);
    setGear(false);
    props.navigation.navigate(GET_ACCOUNTABILITY);
  };
  const onCourse = () => {
    setHome(false);
    setLive(false);
    setCourse(true);
    setAccountibility(false);
    setResources(false);
    setJourney(false);
    setForum(false);
    setLinks(false);
    setChat(false);
    setGear(false);
    props.navigation.navigate(DASHBOARD_SCREEN);
  };
  const onResource = () => {
    setHome(false);
    setLive(false);
    setCourse(false);
    setAccountibility(false);
    setResources(true);
    setJourney(false);
    setForum(false);
    setLinks(false);
  };
  const onJourney = () => {
    setHome(false);
    setLive(false);
    setCourse(false);
    setAccountibility(false);
    setResources(false);
    setJourney(true);
    setForum(false);
    setLinks(false);
    setChat(false);
    setGear(false);
    props.navigation.navigate(JOURNEY);
  };
  const onForum = () => {
    setHome(false);
    setLive(false);
    setCourse(false);
    setAccountibility(false);
    setResources(false);
    setJourney(false);
    setForum(true);
    setLinks(false);
    setChat(false);
    setGear(false);
  };
  const onChat = () => {
    setHome(false);
    setLive(false);
    setCourse(false);
    setAccountibility(false);
    setResources(false);
    setJourney(false);
    setForum(false);
    setLinks(false);
    setGear(false);
    setChat(true);
  };
  const onGear = () => {
    setHome(false);
    setLive(false);
    setCourse(false);
    setAccountibility(false);
    setResources(false);
    setJourney(false);
    setForum(false);
    setLinks(false);
    setChat(false);
    setGear("settings");
    props.navigation.navigate(SETTINGS);
  };


  return (
      <DrawerContentScrollView {...props} showsVerticalScrollIndicator={false}>
        <TouchableOpacity
            onPress={() => onHome()}
            style={
              home === true ? styles.activeIconHolder2 : styles.iconHolder2
            }
        >
          { home === true ? <HomeBold /> : <Home />}
          <Text style={styles.txt}>Dashboard</Text>
        </TouchableOpacity>
        <TouchableOpacity
            onPress={() => onLive()}
            style={live ? styles.activeIconHolder : styles.iconHolder}
        >
          {live ? <LiveBold /> : <Live />}
          <Text style={styles.txt}>Live Training</Text>
        </TouchableOpacity>
        <TouchableOpacity
            onPress={() => onCourse()}
            style={course ? styles.activeIconHolder : styles.iconHolder}
        >
          {course ? <CoursesBold /> : <Second />}
          <Text style={styles.txt}>Course</Text>
        </TouchableOpacity>
        <TouchableOpacity
            onPress={() => onSettings()}
            style={accountibility ? styles.activeIconHolder : styles.iconHolder}
        >
          {accountibility ? <TrophyBold /> : <Trophy />}
          <Text style={styles.txt}>Accountability</Text>
        </TouchableOpacity>
        <TouchableOpacity
            onPress={() => onResource()}
            style={resources ? styles.activeIconHolder : styles.iconHolder}
        >
          {resources ? <RenchBold /> : <Settings />}
          <Text style={styles.txt}>Resources</Text>
        </TouchableOpacity>
        <TouchableOpacity
            onPress={() => onJourney()}
            style={journey ? styles.activeIconHolder : styles.iconHolder}
        >
          {journey ? <BagBold /> : <Bag />}
          <Text style={styles.txt}>Journey</Text>
        </TouchableOpacity>
        <TouchableOpacity
            onPress={() => onForum()}
            style={forum ? styles.activeIconHolder : styles.iconHolder}
        >
          {forum ? (
              <Msg height={25} width={25} />
          ) : (
              <ChatBold height={25} width={25} />
          )}
          <Text style={styles.txt}>Forum</Text>
        </TouchableOpacity>
        <TouchableOpacity
            onPress={() => onChat()}
            style={chat ? styles.activeIconHolder : styles.iconHolder}
        >
          {chat ? <MyChatBold /> : <Chat />}
          <Text style={styles.txt}>Chat</Text>
        </TouchableOpacity>
        <TouchableOpacity
            onPress={() => onGear()}
            style={gear ? styles.activeIconHolder : styles.iconHolder}
        >
          {gear ? <SettingsBold /> : <Gear height={28} width={28} />}
          <Text style={styles.txt}>Settings</Text>
        </TouchableOpacity>
      </DrawerContentScrollView>
  );
};
const styles = StyleSheet.create({
  iconHolder2: {
    justifyContent: "center",
    alignItems: "center",
  },
  activeIconHolder2: {
    justifyContent: "center",
    alignItems: "center",
    borderLeftWidth: 8,
    borderLeftColor: "#B7A675",
    width: 100,
  },
  iconHolder: {
    marginTop: height_screen < 675 ? 25 : 30,
    justifyContent: "center",
    alignItems: "center",
  },
  activeIconHolder: {
    marginTop: height_screen < 675 ? 25 : 30,
    justifyContent: "center",
    alignItems: "center",
    borderLeftColor: "#B7A675",
    borderLeftWidth: 8,
    width: 100,
  },
  txt: { color: "white", fontSize: 10, marginTop: 3 },
});

export default MenuBar;
