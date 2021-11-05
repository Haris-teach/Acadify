import React from "react";
import {
  createDrawerNavigator,
  DrawerContentScrollView,
} from "@react-navigation/drawer";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import Live from "../../assets/images/live.svg";
import Settings from "../../assets/images/settings.svg";
import Bag from "../../assets/images/bag.svg";
import Trophy from "../../assets/images/trophy.svg";
import Second from "../../assets/images/second.svg";
import Home from "../../assets/images/home.svg";
import Globe from "../../assets/images/globe.svg";
import Msg from "../../assets/images/msg.svg";
import { useState } from "react";
import { height_screen } from "../../utils/Dimentions";

const MenuBar = (props) => {
  const [home, setHome] = useState(false);
  const [live, setLive] = useState(false);
  const [course, setCourse] = useState(false);
  const [accountibility, setAccountibility] = useState(false);
  const [resources, setResources] = useState(false);
  const [journey, setJourney] = useState(false);
  const [forum, setForum] = useState(false);
  const [links, setLinks] = useState(false);

  const onHome = () => {
    console.log("height", height_screen);
    setHome(true);
    setLive(false);
    setCourse(false);
    setAccountibility(false);
    setResources(false);
    setJourney(false);
    setForum(false);
    setLinks(false);
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
  };
  const onLinks = () => {
    setHome(false);
    setLive(false);
    setCourse(false);
    setAccountibility(false);
    setResources(false);
    setJourney(false);
    setForum(false);
    setLinks(true);
  };
  return (
    <DrawerContentScrollView {...props} showsVerticalScrollIndicator={false}>
      <View
        style={{
          alignItems: "center",
        }}
      >
        <TouchableOpacity
          onPress={() => onHome()}
          style={home ? styles.activeIconHolder2 : styles.iconHolder2}
        >
          <Home />
          <Text style={styles.txt}>Dashboard</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => onLive()}
          style={live ? styles.activeIconHolder : styles.iconHolder}
        >
          <Live />
          <Text style={styles.txt}>Live Training</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => onCourse()}
          style={course ? styles.activeIconHolder : styles.iconHolder}
        >
          <Second />
          <Text style={styles.txt}>Course</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => onSettings()}
          style={accountibility ? styles.activeIconHolder : styles.iconHolder}
        >
          <Trophy />
          <Text style={styles.txt}>Accountibility</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => onResource()}
          style={resources ? styles.activeIconHolder : styles.iconHolder}
        >
          <Settings />
          <Text style={styles.txt}>Resources</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => onJourney()}
          style={journey ? styles.activeIconHolder : styles.iconHolder}
        >
          <Bag />
          <Text style={styles.txt}>Journey</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => onForum()}
          style={forum ? styles.activeIconHolder : styles.iconHolder}
        >
          <Msg />
          <Text style={styles.txt}>Forum</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => onLinks()}
          style={links ? styles.activeIconHolder : styles.iconHolder}
        >
          <Globe />
          <Text style={styles.txt}>Links</Text>
        </TouchableOpacity>
      </View>
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
    marginTop: 30,
    justifyContent: "center",
    alignItems: "center",
  },
  activeIconHolder: {
    marginTop: 30,
    justifyContent: "center",
    alignItems: "center",
    borderLeftColor: "#B7A675",
    borderLeftWidth: 8,
    width: 100,
  },
  txt: { color: "white", fontSize: 10, marginTop: 3 },
});

export default MenuBar;
