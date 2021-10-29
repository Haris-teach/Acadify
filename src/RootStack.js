//================================ React Native Imported Files ======================================//

import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {heightPercentageToDP as hp,widthPercentageToDP as wp} from "react-native-responsive-screen";

//================================ Local Imported Files ======================================//

import colors from "./assets/colors/colors";
import LoginScreen from './screens/Auth/LoginScreen';
import SignUpScreen from './screens/Auth/SignUpScreen';
import ForgotPasswordScreen from './screens/Auth/ForgotPassword';
import LandingScreen from './screens/Auth/LandingScreen';
import {
    ADD_CARD,
    CREDIT_CARD,
    FORGOT_PASSWORD,
    HOME_SCREEN,
    LANDING_SCREEN,
    LOGIN_SCREEN, MY_TABS,
    PLAN_SCREEN,
    SIGNUP_SCREEN,
} from './constants/navigators';
import PlanScreen from './screens/Auth/PlanScreen';
import HomeScreen from './screens/HomeScren/HomeScreen';
import CardScreen from './screens/Auth/CardScreen';
import AddCardScreen from './screens/Auth/AddCardScreen';
import DashboardScreen from './screens/DashboardScreen';
import HomeActive from './assets/images/home_active.svg';
import HomeInActive from './assets/images/home_inactive.svg';
import PlayActive from './assets/images/play_active.svg';
import PlayInActive from './assets/images/play_inactive.svg';
import MessageActive from './assets/images/message_active.svg';
import MessageInActive from './assets/images/message_inactive.svg';
import SettingActive from './assets/images/setting_active.svg';
import SettingInActive from './assets/images/setting_inactive.svg';


const Tab = createBottomTabNavigator();
const MyTabs = () => {
  return (
      <Tab.Navigator
          initialRouteName={'Home'}
          screenOptions={{
              headerShown:false,
              tabBarShowLabel:false,
              tabBarStyle: {
                  backgroundColor: colors.bottom_tabs,
                  height: hp(10),
                  width:wp(80),
                  borderRadius: wp(10),
                  alignSelf:'center',
                  position: 'absolute',
                  left: wp(10),
                  bottom: 0,
                  right: 0,
                  borderWidth: 0,
                  borderTopWidth: 0,
             },
          }}>
        <Tab.Screen
            name="Home"
            component={DashboardScreen}
            options={{
              tabBarIcon: ({focused}) =>
                  focused ? <HomeActive /> : <HomeInActive />,
            }}
        />
        <Tab.Screen
            name="Play"
            component={DashboardScreen}
            options={{
              tabBarIcon: ({focused}) =>
                  focused ? <PlayActive /> : <PlayInActive />,
            }}
        />
        <Tab.Screen
            name="Chat"
            component={DashboardScreen}
            options={{
              tabBarIcon: ({focused}) =>
                  focused ? <MessageActive /> : <MessageInActive />,
            }}
        />
        <Tab.Screen
            name="Settings"
            component={DashboardScreen}
            options={{
              tabBarIcon: ({focused}) =>
                  focused ? <SettingActive /> : <SettingInActive />,
            }}
        />
      </Tab.Navigator>
  );
};

const RootStack = createNativeStackNavigator();
const Stack = () => {
  return (
    <NavigationContainer>
      <RootStack.Navigator
        initialRouteName={MY_TABS}
        screenOptions={{
          headerShown: false,
        }}>
          <RootStack.Screen name={LANDING_SCREEN} component={LandingScreen} />
          <RootStack.Screen name={LOGIN_SCREEN} component={LoginScreen} />
          <RootStack.Screen name={SIGNUP_SCREEN} component={SignUpScreen} />
          <RootStack.Screen name={PLAN_SCREEN} component={PlanScreen} />
          <RootStack.Screen name={HOME_SCREEN} component={HomeScreen} />
          <RootStack.Screen name={CREDIT_CARD} component={CardScreen} />
          <RootStack.Screen name={ADD_CARD} component={AddCardScreen} />
          <RootStack.Screen name={FORGOT_PASSWORD} component={ForgotPasswordScreen}/>
          <RootStack.Screen name={MY_TABS} component={MyTabs} />
      </RootStack.Navigator>
    </NavigationContainer>
  );
};

export default Stack;
