//================================ React Native Imported Files ======================================//

import * as React from 'react';
import 'react-native-gesture-handler';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {heightPercentageToDP as hp,widthPercentageToDP as wp} from "react-native-responsive-screen";
import {createDrawerNavigator, DrawerContentScrollView, DrawerItem} from "@react-navigation/drawer";
import {Image, ImageBackground, Text, TouchableOpacity, View} from "react-native";

//================================ Local Imported Files ======================================//

import colors from "./assets/colors/colors";
import images from "./assets/images/images";
import styles from './style';
import LoginScreen from './screens/Auth/LoginScreen';
import SignUpScreen from './screens/Auth/SignUpScreen';
import ForgotPasswordScreen from './screens/Auth/ForgotPassword';
import LandingScreen from './screens/Auth/LandingScreen';
import {
    ADD_CARD,
    CREDIT_CARD, EDIT_PROFILE_SCREEN,
    FORGOT_PASSWORD,
    LANDING_SCREEN,
    LOGIN_SCREEN, MY_TABS, OPEN_DRAWER,
    PLAN_SCREEN, PROFILE_SCREEN,
    SIGNUP_SCREEN,
} from './constants/navigators';
import PlanScreen from './screens/Auth/PlanScreen';
import CardScreen from './screens/Auth/CardScreen';
import AddCardScreen from './screens/Auth/AddCardScreen';
import DashboardScreen from './screens/DashboardScreen';
import SettingScreen from "./screens/SettingScreen";
import ProfileScreen from "./screens/ProfileScreen";
import EditProfileScreen from "./screens/EditProfile";
import HomeActive from './assets/images/home_active.svg';
import HomeInActive from './assets/images/home_inactive.svg';
import PlayActive from './assets/images/play_active.svg';
import PlayInActive from './assets/images/play_inactive.svg';
import MessageActive from './assets/images/message_active.svg';
import MessageInActive from './assets/images/message_inactive.svg';
import SettingActive from './assets/images/setting_active.svg';
import SettingInActive from './assets/images/setting_inactive.svg';

let homeFocus = true,
    accountFocus = false,
    myCartFocus = false,
    trackOrderFocus = false,
    orderHistoryFocus = false,
    settingsScreenFocus = false,
    rateScreenFocus = false,
    menuScreenFocus = false,
    logoutScreenFocus = false;


const CustomDrawerContent = (props) => {
    return (
        <DrawerContentScrollView {...props}>
        <View style={styles.drawerMainContainer}>
            <ImageBackground
                style={styles.backgroundImageContainer}
                source={images.back_icon}>
                <View style={styles.userInfoContainer}>
                    <View
                        style={styles.userImageContainer}
                        onPress={() => props.navigation.navigate('ProfileScreen')}>
                        <Image
                            source={{uri: images.card_icon}}
                            style={styles.userProfileImage}
                        />
                    </View>
                    <TouchableOpacity style={styles.userTextContainer}>
                        <Text style={styles.userNameText}>
                            Hi
                        </Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.drawerItemsContainer}>
                    <DrawerItem
                        label={() => (
                            <Text
                                style={[
                                    styles.drawerItemLabelText,
                                    {color: homeFocus ? colors.white : colors.black},
                                ]}>
                                {'Dashboard'}
                            </Text>
                        )}
                        icon={() => (
                            <Image
                                source={
                                    homeFocus ? images.back_icon : images.card_icon
                                }
                                style={styles.drawerItemImage}
                            />
                        )}
                        onPress={() => {
                            (homeFocus = true),
                                (accountFocus = false),
                                (myCartFocus = false),
                                (trackOrderFocus = false),
                                (orderHistoryFocus = false),
                                (settingsScreenFocus = false),
                                (rateScreenFocus = false),
                                (menuScreenFocus = false),
                                (logoutScreenFocus = false);
                            props.navigation.navigate('Dashboard');
                        }}
                    />

                    <DrawerItem
                        style={styles.drawerItemStyles}
                        label={() => (
                            <Text
                                style={[
                                    styles.drawerItemLabelText,
                                    {color: accountFocus ? colors.white : colors.black},
                                ]}>
                                {'Live training'}
                            </Text>
                        )}
                        icon={() => (
                            <Image
                                source={
                                    accountFocus
                                        ? images.card_icon
                                        : images.back_icon
                                }
                                style={styles.drawerItemImage}
                            />
                        )}
                        onPress={() => {
                            (homeFocus = false),
                                (accountFocus = true),
                                (myCartFocus = false),
                                (trackOrderFocus = false),
                                (orderHistoryFocus = false),
                                (settingsScreenFocus = false),
                                (rateScreenFocus = false),
                                (menuScreenFocus = false),
                                (logoutScreenFocus = false),
                                props.navigation.navigate('Like');
                        }}
                    />

                </View>
            </ImageBackground>
        </View>
        </DrawerContentScrollView>
    );

}


const Drawer = createDrawerNavigator();
function DrawerNav (){
    return (
        <Drawer.Navigator
            screenOptions={{
                headerShown:false
            }}
            drawerContent={(props) => <CustomDrawerContent {...props} />}>
            {/*<Drawer.Screen name="Dashboard" component={DashboardScreen} />*/}
            {/*<Drawer.Screen name="Like" component={SettingScreen} />*/}
        </Drawer.Navigator>
    );
}


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
            component={SettingScreen}
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
        initialRouteName={LANDING_SCREEN}
        screenOptions={{
          headerShown: false,
        }}>
          <RootStack.Screen name={LANDING_SCREEN} component={LandingScreen} />
          <RootStack.Screen name={LOGIN_SCREEN} component={LoginScreen} />
          <RootStack.Screen name={SIGNUP_SCREEN} component={SignUpScreen} />
          <RootStack.Screen name={PLAN_SCREEN} component={PlanScreen} />
          <RootStack.Screen name={CREDIT_CARD} component={CardScreen} />
          <RootStack.Screen name={ADD_CARD} component={AddCardScreen} />
          <RootStack.Screen name={FORGOT_PASSWORD} component={ForgotPasswordScreen}/>
          <RootStack.Screen name={MY_TABS} component={MyTabs} />
          <RootStack.Screen name={PROFILE_SCREEN} component={ProfileScreen} />
          <RootStack.Screen name={EDIT_PROFILE_SCREEN} component={EditProfileScreen} />
          <RootStack.Screen name={OPEN_DRAWER} component={DrawerNav} />
      </RootStack.Navigator>
    </NavigationContainer>
  );
};

export default Stack;
