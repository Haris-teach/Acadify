//================================ React Native Imported Files ======================================//

import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";
import { createDrawerNavigator } from "@react-navigation/drawer";

//================================ Local Imported Files ======================================//

import colors from "./assets/colors/colors";
import LoginScreen from "./screens/Auth/LoginScreen";
import SignUpScreen from "./screens/Auth/SignUpScreen";
import ForgotPasswordScreen from "./screens/Auth/ForgotPassword";
import LandingScreen from "./screens/Auth/LandingScreen";
import {
  ADD_CARD,
  CREDIT_CARD,
  EDIT_PROFILE_SCREEN,
  FORGOT_PASSWORD,
  LANDING_SCREEN,
  LOGIN_SCREEN,
  MY_TABS,
  PLAN_SCREEN,
  PROFILE_SCREEN,
  SIGNUP_SCREEN,
} from "./constants/navigators";
import PlanScreen from "./screens/Auth/PlanScreen";
import CardScreen from "./screens/Auth/CardScreen";
import AddCardScreen from "./screens/Auth/AddCardScreen";
import DashboardScreen from "./screens/DashboardScreen";
import SettingScreen from "./screens/SettingScreen";
import HomeActive from "./assets/images/home_active.svg";
import HomeInActive from "./assets/images/home_inactive.svg";
import PlayActive from "./assets/images/play_active.svg";
import PlayInActive from "./assets/images/play_inactive.svg";
import MessageActive from "./assets/images/message_active.svg";
import MessageInActive from "./assets/images/message_inactive.svg";
import SettingActive from "./assets/images/setting_active.svg";
import SettingInActive from "./assets/images/setting_inactive.svg";
import ProfileScreen from "./screens/ProfileScreen";
import EditProfileScreen from "./screens/EditProfile";
import MenuBar from "./components/MenuBar";

const Tab = createBottomTabNavigator();
const MyTabs = () => {
  return (
    <Tab.Navigator
      initialRouteName={"Home"}
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          backgroundColor: colors.bottom_tabs,
          height: hp(10),
          width: wp(80),
          borderRadius: wp(10),
          alignSelf: "center",
          position: "absolute",
          left: wp(10),
          bottom: 0,
          right: 0,
          borderWidth: 0,
          borderTopWidth: 0,
        },
      }}
    >
      <Tab.Screen
        name="Home"
        component={DashboardScreen}
        options={{
          tabBarIcon: ({ focused }) =>
            focused ? <HomeActive /> : <HomeInActive />,
        }}
      />
      <Tab.Screen
        name="Play"
        component={DashboardScreen}
        options={{
          tabBarIcon: ({ focused }) =>
            focused ? <PlayActive /> : <PlayInActive />,
        }}
      />
      <Tab.Screen
        name="Chat"
        component={DashboardScreen}
        options={{
          tabBarIcon: ({ focused }) =>
            focused ? <MessageActive /> : <MessageInActive />,
        }}
      />
      <Tab.Screen
        name="Settings"
        component={SettingScreen}
        options={{
          tabBarIcon: ({ focused }) =>
            focused ? <SettingActive /> : <SettingInActive />,
        }}
      />
    </Tab.Navigator>
  );
};

const RootStack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

const MyNewStack = () => {
  return (
    <RootStack.Navigator
      initialRouteName={LANDING_SCREEN}
      screenOptions={{
        headerShown: false,
      }}
    >
      <RootStack.Screen name={LANDING_SCREEN} component={LandingScreen} />
      <RootStack.Screen name={LOGIN_SCREEN} component={LoginScreen} />
      <RootStack.Screen name={SIGNUP_SCREEN} component={SignUpScreen} />
      <RootStack.Screen name={PLAN_SCREEN} component={PlanScreen} />
      <RootStack.Screen name={CREDIT_CARD} component={CardScreen} />
      <RootStack.Screen name={ADD_CARD} component={AddCardScreen} />
      <RootStack.Screen
        name={FORGOT_PASSWORD}
        component={ForgotPasswordScreen}
      />
      <RootStack.Screen name={MY_TABS} component={MyTabs} />
      <RootStack.Screen name={PROFILE_SCREEN} component={ProfileScreen} />
      <RootStack.Screen
        name={EDIT_PROFILE_SCREEN}
        component={EditProfileScreen}
      />
    </RootStack.Navigator>
  );
};

const Stack = () => {
  return (
    <NavigationContainer>
      <Drawer.Navigator
        screenOptions={{
          headerShown: false,
          drawerPosition: "left",
          drawerType: "front",
          drawerActiveTintColor: "red",
          drawerStyle: {
            drawerBackgroundColor: "#0000FF",
            backgroundColor: "rgba(36, 37, 41, 0.62)",
            width: 100,
            height: 600,
            marginTop: 110,
            borderTopRightRadius: 60,
            borderBottomRightRadius: 60,
          },
        }}
        drawerContent={(props) => <MenuBar {...props} />}
      >
        <Drawer.Screen name="Feed" component={MyNewStack} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
};

export default Stack;
