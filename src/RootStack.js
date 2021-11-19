//================================ React Native Imported Files ======================================//

import * as React from "react";
import "react-native-gesture-handler";
import {
    NavigationContainer,
    useNavigationContainerRef,
} from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createDrawerNavigator } from "@react-navigation/drawer";

//================================ Local Imported Files ======================================//

import { height_screen } from "./utils/Dimentions";
import JourneyScreen from "./screens/JourneyScreen";
import LoginScreen from "./screens/Auth/LoginScreen";
import SignUpScreen from "./screens/Auth/SignUpScreen";
import ForgotPasswordScreen from "./screens/Auth/ForgotPassword";
import LandingScreen from "./screens/Auth/LandingScreen";
import {
    ADD_CARD,
    ADD_GOAL,
    ADD_JOURNEY,
    COURSE_SCREEN,
    CREDIT_CARD,
    DASHBOARD_SCREEN,
    EDIT_ACCOUNTABILITY,
    EDIT_PROFILE_SCREEN,
    FORGOT_PASSWORD,
    GET_ACCOUNTABILITY,
    JOURNEY,
    LANDING_SCREEN,
    LOGIN_SCREEN,
    MY_DRAWER,
    PASSWORD_UPDATE,
    PLAN_SCREEN,
    PROFILE_SCREEN,
    SETTINGS,
    SIGNUP_SCREEN,
    VIDEO_SCREEN,
} from "./constants/navigators";
import PlanScreen from "./screens/Auth/PlanScreen";
import CardScreen from "./screens/Auth/CardScreen";
import AddCardScreen from "./screens/Auth/AddCardScreen";
import DashboardScreen from "./screens/DashboardScreen";
import SettingScreen from "./screens/SettingScreen";
import ProfileScreen from "./screens/ProfileScreen";
import AddJourney from "./screens/AddJourney";
import PasswordUpdate from "./screens/PasswordUpdate";
import VideoScreen from "./screens/VideoScreen";
import CourseScreen from "./screens/CourseScreen";
import AddGoal from "./screens/CreateGoal";
import EditProfileScreen from "./screens/EditProfile";
import GetAccountability from "./screens/GetAccountability";
import MenuBar from "./components/MenuBar";
import EditAccountability from "./screens/EditAccountability";


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
            <RootStack.Screen name={DASHBOARD_SCREEN} component={DashboardScreen} />
            <RootStack.Screen name={LOGIN_SCREEN} component={LoginScreen} />
            <RootStack.Screen name={SIGNUP_SCREEN} component={SignUpScreen} />
            <RootStack.Screen name={PLAN_SCREEN} component={PlanScreen} />
            <RootStack.Screen name={CREDIT_CARD} component={CardScreen} />
            <RootStack.Screen name={ADD_CARD} component={AddCardScreen} />
            <RootStack.Screen name={FORGOT_PASSWORD} component={ForgotPasswordScreen}/>
            <RootStack.Screen name={MY_DRAWER} component={MyDrawer} />
            <RootStack.Screen name={PROFILE_SCREEN} component={ProfileScreen} />
            <RootStack.Screen name={EDIT_PROFILE_SCREEN} component={EditProfileScreen}/>
            <RootStack.Screen name={ADD_JOURNEY} component={AddJourney} />
            <RootStack.Screen name={JOURNEY} component={JourneyScreen} />
            <RootStack.Screen name={PASSWORD_UPDATE} component={PasswordUpdate} />
            <RootStack.Screen name={VIDEO_SCREEN} component={VideoScreen} />
            <RootStack.Screen name={COURSE_SCREEN} component={CourseScreen} />
            <RootStack.Screen name={ADD_GOAL} component={AddGoal} />
            <RootStack.Screen name={GET_ACCOUNTABILITY} component={GetAccountability}/>
            <RootStack.Screen name={EDIT_ACCOUNTABILITY} component={EditAccountability}/>
        </RootStack.Navigator>
    );
};

const MyDrawer = () => {
    return (
        <Drawer.Navigator
            initialRouteName={COURSE_SCREEN}
            screenOptions={{
                drawerActiveTintColor: "rgba(36, 37, 41, 0.62)",
                headerShown: false,
                drawerPosition: "left",
                drawerType: "front",
                drawerStyle: {
                    backgroundColor: "rgba(36, 37, 41, 0.62)",
                    width: 90,
                    height: height_screen < 675 ? 635 : 620,
                    marginTop: height_screen < 675 ? 15 : 90,
                    borderTopRightRadius: 60,
                    borderBottomRightRadius: 60,
                },
                drawerItemStyle: {
                    width: 90,
                },
                drawerLabelStyle: { display: "none" },
            }}
            drawerContent={(props) => <MenuBar {...props} />}
        >
            <Drawer.Screen name={COURSE_SCREEN} component={CourseScreen} />
            <Drawer.Screen name={DASHBOARD_SCREEN} component={DashboardScreen} />
            <Drawer.Screen name={GET_ACCOUNTABILITY} component={GetAccountability} />
            <Drawer.Screen name={JOURNEY} component={JourneyScreen} />
            <Drawer.Screen name={SETTINGS} component={SettingScreen} />

        </Drawer.Navigator>
    );
};

const Stack = () => {
    const navigationRef = useNavigationContainerRef();

    return (
        <NavigationContainer
            ref={navigationRef}
            onReady={() => {
                console.log("curren - - ", navigationRef.getCurrentRoute().name);
            }}
        >
            <MyNewStack />
        </NavigationContainer>
    );
};

export default Stack;


// // //================================ React Native Imported Files ======================================//
// //
// // import * as React from 'react';
// // import 'react-native-gesture-handler';
// // import {NavigationContainer} from '@react-navigation/native';
// // import {createNativeStackNavigator} from '@react-navigation/native-stack';
// // import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// // import {createDrawerNavigator} from "@react-navigation/drawer";
// // import {heightPercentageToDP as hp,widthPercentageToDP as wp} from "react-native-responsive-screen";
// //
// // //================================ Local Imported Files ======================================//
// //
// // import colors from "./assets/colors/colors";
// // import { height_screen } from "./utils/Dimentions";
// // import JourneyScreen from "./screens/JourneyScreen";
// // import LoginScreen from "./screens/Auth/LoginScreen";
// // import SignUpScreen from "./screens/Auth/SignUpScreen";
// // import ForgotPasswordScreen from "./screens/Auth/ForgotPassword";
// // import LandingScreen from "./screens/Auth/LandingScreen";
// // import {
// //     ADD_CARD,
// //     ADD_GOAL,
// //     ADD_JOURNEY,
// //     COURSE_SCREEN,
// //     CREDIT_CARD,
// //     DASHBOARD_SCREEN, EDIT_ACCOUNTABILITY,
// //     EDIT_PROFILE_SCREEN,
// //     FORGOT_PASSWORD,
// //     GET_ACCOUNTABILITY,
// //     JOURNEY,
// //     LANDING_SCREEN,
// //     LOGIN_SCREEN,
// //     MY_TABS,
// //     PASSWORD_UPDATE,
// //     PLAN_SCREEN,
// //     PROFILE_SCREEN,
// //     SIGNUP_SCREEN,
// //     VIDEO_SCREEN,
// // } from "./constants/navigators";
// // import PlanScreen from "./screens/Auth/PlanScreen";
// // import CardScreen from "./screens/Auth/CardScreen";
// // import AddCardScreen from "./screens/Auth/AddCardScreen";
// // import DashboardScreen from "./screens/DashboardScreen";
// // import SettingScreen from "./screens/SettingScreen";
// // import ProfileScreen from "./screens/ProfileScreen";
// // import EditProfileScreen from "./screens/EditProfile";
// // import MenuBar from "./components/MenuBar";
// // import AddJourney from "./screens/AddJourney";
// // import PasswordUpdate from "./screens/PasswordUpdate";
// // import VideoScreen from "./screens/VideoScreen";
// // import CourseScreen from "./screens/CourseScreen";
// // import AddGoal from "./screens/CreateGoal";
// // import GetAccountability from "./screens/GetAccountability";
// // import EditAccountability from "./screens/EditAccountability";
// // import HomeActive from "./assets/images/DashboardActive.svg";
// // import HomeInActive from "./assets/images/DashboardInActive.svg";
// // import PlayActive from "./assets/images/play_active.svg";
// // import PlayInActive from "./assets/images/play_inactive.svg";
// // import MessageActive from "./assets/images/message_active.svg";
// // import MessageInActive from "./assets/images/message_inactive.svg";
// // import SettingActive from "./assets/images/setting_active.svg";
// // import SettingInActive from "./assets/images/setting_inactive.svg";
// //
// // const Tab = createBottomTabNavigator();
// // const MyTabs = () => {
// //   return (
// //       <Tab.Navigator
// //           initialRouteName={'Home'}
// //           screenOptions={{
// //               headerShown:false,
// //               tabBarShowLabel:false,
// //               tabBarStyle: {
// //                   backgroundColor: colors.bottom_tabs,
// //                   height: hp(10),
// //                   width:wp(80),
// //                   borderRadius: wp(10),
// //                   alignSelf:'center',
// //                   position: 'absolute',
// //                   left: wp(10),
// //                   bottom: 0,
// //                   right: 0,
// //                   borderWidth: 0,
// //                   borderTopWidth: 0,
// //              },
// //           }}>
// //         <Tab.Screen
// //             name="Home"
// //             component={CourseScreen}
// //             options={{
// //               tabBarIcon: ({focused}) =>
// //                   focused ? <HomeActive /> : <HomeInActive />,
// //             }}
// //         />
// //         <Tab.Screen
// //             name="Play"
// //             component={VideoScreen}
// //             options={{
// //               tabBarIcon: ({focused}) =>
// //                   focused ? <PlayActive /> : <PlayInActive />,
// //             }}
// //         />
// //         <Tab.Screen
// //             name="Chat"
// //             component={VideoScreen}
// //             options={{
// //               tabBarIcon: ({focused}) =>
// //                   focused ? <MessageActive /> : <MessageInActive />,
// //             }}
// //         />
// //         <Tab.Screen
// //             name="Settings"
// //             component={SettingScreen}
// //             options={{
// //               tabBarIcon: ({focused}) =>
// //                   focused ? <SettingActive /> : <SettingInActive />,
// //             }}
// //         />
// //       </Tab.Navigator>
// //   );
// // };
// //
// // const RootStack = createNativeStackNavigator();
// // const Drawer = createDrawerNavigator();
// // const MyNewStack = () => {
// //   return (
// //     <RootStack.Navigator
// //       initialRouteName={LANDING_SCREEN}
// //       screenOptions={{
// //         headerShown: false,
// //       }}
// //     >
// //         <RootStack.Screen name={LANDING_SCREEN} component={LandingScreen} />
// //         <RootStack.Screen name={DASHBOARD_SCREEN} component={DashboardScreen} />
// //         <RootStack.Screen name={LOGIN_SCREEN} component={LoginScreen} />
// //         <RootStack.Screen name={SIGNUP_SCREEN} component={SignUpScreen} />
// //         <RootStack.Screen name={PLAN_SCREEN} component={PlanScreen} />
// //         <RootStack.Screen name={CREDIT_CARD} component={CardScreen} />
// //         <RootStack.Screen name={ADD_CARD} component={AddCardScreen} />
// //         <RootStack.Screen name={FORGOT_PASSWORD} component={ForgotPasswordScreen}/>
// //         <RootStack.Screen name={MY_TABS} component={MyTabs} />
// //         <RootStack.Screen name={PROFILE_SCREEN} component={ProfileScreen} />
// //         <RootStack.Screen name={EDIT_PROFILE_SCREEN} component={EditProfileScreen}/>
// //         <RootStack.Screen name={ADD_JOURNEY} component={AddJourney}/>
// //         <RootStack.Screen name={JOURNEY} component={JourneyScreen}/>
// //         <RootStack.Screen name={PASSWORD_UPDATE} component={PasswordUpdate}/>
// //         <RootStack.Screen name={VIDEO_SCREEN} component={VideoScreen}/>
// //         <RootStack.Screen name={COURSE_SCREEN} component={CourseScreen}/>
// //         <RootStack.Screen name={ADD_GOAL} component={AddGoal}/>
// //         <RootStack.Screen name={GET_ACCOUNTABILITY} component={GetAccountability}/>
// //         <RootStack.Screen name={EDIT_ACCOUNTABILITY} component={EditAccountability}/>
// //     </RootStack.Navigator>
// //   );
// // };
// //
// //
// // const Stack = () => {
// //   return (
// //     <NavigationContainer>
// //         <Drawer.Navigator
// //             screenOptions={{
// //                 headerShown: false,
// //                 drawerPosition: "left",
// //                 drawerType: "front",
// //                 drawerStyle: {
// //                     backgroundColor: "rgba(36, 37, 41, 0.62)",
// //                     width: 90,
// //                     height: height_screen < 675 ? 550 : 660,
// //                     marginTop: height_screen < 675 ? 60 : 80,
// //                     borderTopRightRadius: 60,
// //                     borderBottomRightRadius: 60,
// //                 },
// //             }}
// //             drawerContent={(props) => <MenuBar {...props} />}
// //         >
// //             <Drawer.Screen name="Feed" component={MyNewStack} />
// //         </Drawer.Navigator>
// //     </NavigationContainer>
// //   );
// // };
// //
// // export default Stack;
//
//
// //================================ React Native Imported Files ======================================//
//
// import * as React from "react";
// import "react-native-gesture-handler";
// import {
//     NavigationContainer,
//     useNavigationContainerRef,
// } from "@react-navigation/native";
// import { createNativeStackNavigator } from "@react-navigation/native-stack";
// import { createDrawerNavigator } from "@react-navigation/drawer";
// import { StyleSheet, Text, View } from "react-native";
//
// //================================ Local Imported Files ======================================//
//
// import { height_screen } from "./utils/Dimentions";
// import JourneyScreen from "./screens/JourneyScreen";
// import LoginScreen from "./screens/Auth/LoginScreen";
// import SignUpScreen from "./screens/Auth/SignUpScreen";
// import ForgotPasswordScreen from "./screens/Auth/ForgotPassword";
// import LandingScreen from "./screens/Auth/LandingScreen";
// import {
//     ADD_CARD,
//     ADD_GOAL,
//     ADD_JOURNEY,
//     COURSE_SCREEN,
//     CREDIT_CARD,
//     DASHBOARD_SCREEN, EDIT_ACCOUNTABILITY,
//     EDIT_PROFILE_SCREEN,
//     FORGOT_PASSWORD,
//     GET_ACCOUNTABILITY,
//     JOURNEY,
//     LANDING_SCREEN,
//     LOGIN_SCREEN,
//     MY_DRAWER,
//     PASSWORD_UPDATE,
//     PLAN_SCREEN,
//     PROFILE_SCREEN,
//     SIGNUP_SCREEN,
//     VIDEO_SCREEN,
// } from "./constants/navigators";
// import PlanScreen from "./screens/Auth/PlanScreen";
// import CardScreen from "./screens/Auth/CardScreen";
// import AddCardScreen from "./screens/Auth/AddCardScreen";
// import DashboardScreen from "./screens/DashboardScreen";
// import SettingScreen from "./screens/SettingScreen";
// import ProfileScreen from "./screens/ProfileScreen";
// import AddJourney from "./screens/AddJourney";
// import PasswordUpdate from "./screens/PasswordUpdate";
// import VideoScreen from "./screens/VideoScreen";
// import CourseScreen from "./screens/CourseScreen";
// import AddGoal from "./screens/CreateGoal";
// import EditProfileScreen from "./screens/EditProfile";
// import EditAccountability from "./screens/EditAccountability";
// import GetAccountability from "./screens/GetAccountability";
// import HomeBold from "./assets/images/home-bold.svg";
// import Home from "./assets/images/home.svg";
// import Second from "./assets/images/second.svg";
// import CoursesBold from "./assets/images/566.svg";
// import RenchBold from "./assets/images/renchbold.svg";
// import Settings from "./assets/images/settings.svg";
// import BagBold from "./assets/images/bagBold.svg";
// import Bag from "./assets/images/bag.svg";
// import ChatBold from "./assets/images/msg-1.svg";
// import Msg from "./assets/images/forumBold1.svg";
// import SettingsBold from "./assets/images/settingsBold.svg";
// import Gear from "./assets/images/settingsInactive.svg";
// import Chat from "./assets/images/935.svg";
// import MyChatBold from "./assets/images/Subtract.svg";
// import AccountablityIcon from "./assets/images/accountability.svg";
// import AccountablityIconBold from "./assets/images/accountabilityBold.svg";
// import Live from "./assets/images/live.svg";
// import LiveBold from "./assets/images/509.svg";
// // const Tab = createBottomTabNavigator();
//
// // const MyTabs = () => {
// //   const dispatch = useDispatch();
// //   return (
// //     <Tab.Navigator
// //       initialRouteName={"Home"}
// //       screenOptions={{
// //         headerShown: false,
// //         tabBarShowLabel: false,
// //         tabBarStyle: {
// //           backgroundColor: colors.bottom_tabs,
// //           height: hp(10),
// //           width: wp(80),
// //           borderRadius: wp(10),
// //           alignSelf: "center",
// //           position: "absolute",
// //           left: wp(10),
// //           bottom: 0,
// //           right: 0,
// //           borderWidth: 0,
// //           borderTopWidth: 0,
// //         },
// //       }}
// //     >
// //       <Tab.Screen
// //         name={COURSE_SCREEN}
// //         component={CourseScreen}
// //         options={{
// //           tabBarIcon: ({ focused }) =>
// //             focused ? <HomeActive /> : <HomeInActive />,
// //         }}
// //         listeners={{
// //           tabPress: (e) => {
// //             console.log("dispatched");
// //             dispatch({ type: SCREEN, screen: "dashboard" });
// //           },
// //         }}
// //       />
// //       <Tab.Screen
// //         name="Play"
// //         component={VideoScreen}
// //         options={{
// //           tabBarIcon: ({ focused }) =>
// //             focused ? <PlayActive /> : <PlayInActive />,
// //         }}
// //         listeners={{
// //           tabPress: (e) => {
// //             console.log("dispatched");
// //             dispatch({ type: SCREEN, screen: "video" });
// //           },
// //         }}
// //       />
// //       <Tab.Screen
// //         name="Chat"
// //         component={VideoScreen}
// //         options={{
// //           tabBarIcon: ({ focused }) =>
// //             focused ? <MessageActive /> : <MessageInActive />,
// //         }}
// //         listeners={{
// //           tabPress: (e) => {
// //             console.log("dispatched");
// //             dispatch({ type: SCREEN, screen: "video" });
// //           },
// //         }}
// //       />
// //       <Tab.Screen
// //         name="Settings"
// //         component={SettingScreen}
// //         options={{
// //           tabBarIcon: ({ focused }) =>
// //             focused ? <SettingActive /> : <SettingInActive />,
// //         }}
// //         listeners={{
// //           tabPress: (e) => {
// //             console.log("dispatched");
// //             dispatch({ type: SCREEN, screen: "settings" });
// //           },
// //         }}
// //       />
// //     </Tab.Navigator>
// //   );
// // };
//
// const RootStack = createNativeStackNavigator();
// const Drawer = createDrawerNavigator();
// const MyNewStack = () => {
//     return (
//         <RootStack.Navigator
//             initialRouteName={LANDING_SCREEN}
//             screenOptions={{
//                 headerShown: false,
//             }}
//         >
//             <RootStack.Screen name={LANDING_SCREEN} component={LandingScreen} />
//             <RootStack.Screen name={DASHBOARD_SCREEN} component={DashboardScreen} />
//             <RootStack.Screen name={LOGIN_SCREEN} component={LoginScreen} />
//             <RootStack.Screen name={SIGNUP_SCREEN} component={SignUpScreen} />
//             <RootStack.Screen name={PLAN_SCREEN} component={PlanScreen} />
//             <RootStack.Screen name={CREDIT_CARD} component={CardScreen} />
//             <RootStack.Screen name={ADD_CARD} component={AddCardScreen} />
//             <RootStack.Screen name={FORGOT_PASSWORD} component={ForgotPasswordScreen}/>
//             <RootStack.Screen name={MY_DRAWER} component={MyDrawer} />
//             <RootStack.Screen name={PROFILE_SCREEN} component={ProfileScreen} />
//             <RootStack.Screen name={EDIT_PROFILE_SCREEN} component={EditProfileScreen}/>
//             <RootStack.Screen name={ADD_JOURNEY} component={AddJourney} />
//             <RootStack.Screen name={JOURNEY} component={JourneyScreen} />
//             <RootStack.Screen name={PASSWORD_UPDATE} component={PasswordUpdate} />
//             <RootStack.Screen name={VIDEO_SCREEN} component={VideoScreen} />
//             <RootStack.Screen name={COURSE_SCREEN} component={CourseScreen} />
//             <RootStack.Screen name={ADD_GOAL} component={AddGoal}/>
//             <RootStack.Screen name={GET_ACCOUNTABILITY} component={GetAccountability}/>
//             <RootStack.Screen name={EDIT_ACCOUNTABILITY} component={EditAccountability}/>
//         </RootStack.Navigator>
//     );
// };
//
// const MyDrawer = () => {
//     return (
//         <Drawer.Navigator
//             screenOptions={{
//                 drawerActiveTintColor: "rgba(36, 37, 41, 0.62)",
//                 headerShown: false,
//                 drawerPosition: "left",
//                 drawerType: "front",
//                 drawerStyle: {
//                     backgroundColor: "rgba(36, 37, 41, 0.62)",
//                     width: 90,
//                     height: height_screen < 675 ? 635 : 690,
//                     marginTop: height_screen < 675 ? 15 : 80,
//                     borderTopRightRadius: 60,
//                     borderBottomRightRadius: 60,
//                 },
//                 drawerItemStyle: {
//                     width: 90,
//                 },
//                 drawerLabelStyle: { display: "none" },
//             }}
//             //             drawerContent={(props) => <MenuBar {...props} />}
//
//         >
//             <Drawer.Screen
//                 options={{
//                     title: "Home",
//                     drawerIcon: ({ focused, size }) =>
//                         focused ? (
//                             <View>
//                                 <HomeBold />
//                                 <Text style={styles.text}>Dashboard</Text>
//                             </View>
//                         ) : (
//                             <View>
//                                 <Home />
//                                 <Text style={styles.text}>Dashboard</Text>
//                             </View>
//                         ),
//                 }}
//                 name={"4"}
//                 component={CourseScreen}
//             />
//             <Drawer.Screen
//                 options={{
//                     title: "Home",
//                     drawerIcon: ({ focused, size }) =>
//                         focused ? (
//                             <View>
//                                 <LiveBold />
//                                 <Text style={styles.text}>Live training</Text>
//                             </View>
//                         ) : (
//                             <View>
//                                 <Live />
//                                 <Text style={styles.text}>Live training</Text>
//                             </View>
//                         ),
//                 }}
//                 name={"1"}
//                 component={CourseScreen}
//             />
//
//             <Drawer.Screen
//                 options={{
//                     title: "Home",
//                     drawerIcon: ({ focused, size }) =>
//                         focused ? (
//                             <View>
//                                 <CoursesBold />
//                                 <Text style={styles.text}>Courses</Text>
//                             </View>
//                         ) : (
//                             <View>
//                                 <Second />
//                                 <Text style={styles.text}>Courses</Text>
//                             </View>
//                         ),
//                 }}
//                 name={DASHBOARD_SCREEN}
//                 component={DashboardScreen}
//             />
//             <Drawer.Screen
//                 options={{
//                     title: "Home",
//                     drawerIcon: ({ focused, size }) =>
//                         focused ? (
//                             <View>
//                                 <AccountablityIconBold />
//                                 <Text style={styles.text}>Accountability</Text>
//                             </View>
//                         ) : (
//                             <View>
//                                 <AccountablityIcon />
//                                 <Text style={styles.text}>Accountability</Text>
//                             </View>
//                         ),
//                 }}
//                 name={GET_ACCOUNTABILITY}
//                 component={GetAccountability}
//             />
//             <Drawer.Screen
//                 options={{
//                     title: "Home",
//                     drawerIcon: ({ focused, size }) =>
//                         focused ? (
//                             <View>
//                                 <RenchBold />
//                                 <Text style={styles.text}>Resources</Text>
//                             </View>
//                         ) : (
//                             <View>
//                                 <Settings />
//                                 <Text style={styles.text}>Resources</Text>
//                             </View>
//                         ),
//                 }}
//                 name="Settings"
//                 component={CourseScreen}
//             />
//             <Drawer.Screen
//                 options={{
//                     title: "Home",
//                     drawerIcon: ({ focused, size }) =>
//                         focused ? (
//                             <View>
//                                 <BagBold />
//                                 <Text style={styles.text}>Journey</Text>
//                             </View>
//                         ) : (
//                             <View>
//                                 <Bag />
//                                 <Text style={styles.text}>Journey</Text>
//                             </View>
//                         ),
//                 }}
//                 name={JOURNEY}
//                 component={JourneyScreen}
//             />
//
//             <Drawer.Screen
//                 options={{
//                     title: "Home",
//                     drawerIcon: ({ focused, size }) =>
//                         focused ? (
//                             <View>
//                                 <Msg height={28} width={28} />
//                                 <Text style={styles.text}>Forum</Text>
//                             </View>
//                         ) : (
//                             <View>
//                                 <ChatBold height={28} width={28} />
//                                 <Text style={styles.text}>Forum</Text>
//                             </View>
//                         ),
//                 }}
//                 name="Settings4"
//                 component={CourseScreen}
//             />
//             <Drawer.Screen
//                 options={{
//                     title: "Home",
//                     drawerIcon: ({ focused, size }) =>
//                         focused ? (
//                             <View>
//                                 <MyChatBold height={28} width={28} />
//                                 <Text style={styles.text}>Chat</Text>
//                             </View>
//                         ) : (
//                             <View>
//                                 <Chat height={28} width={28} />
//                                 <Text style={styles.text}>Chat</Text>
//                             </View>
//                         ),
//                 }}
//                 name="Settings2"
//                 component={CourseScreen}
//             />
//             <Drawer.Screen
//                 options={{
//                     title: "Home",
//                     drawerIcon: ({ focused, size }) =>
//                         focused ? (
//                             <View>
//                                 <SettingsBold height={28} width={28} />
//                                 <Text style={styles.text}>Settings</Text>
//                             </View>
//                         ) : (
//                             <View>
//                                 <Gear height={28} width={28} />
//                                 <Text style={styles.text}>Settings</Text>
//                             </View>
//                         ),
//                 }}
//                 name="Settings33"
//                 component={SettingScreen}
//             />
//         </Drawer.Navigator>
//     );
// };
//
// const Stack = () => {
//     const navigationRef = useNavigationContainerRef();
//
//     return (
//         <NavigationContainer
//             ref={navigationRef}
//             onReady={() => {
//                 console.log("curren - - ", navigationRef.getCurrentRoute().name);
//             }}
//         >
//             <MyNewStack />
//         </NavigationContainer>
//     );
// };
//
// export default Stack;
//
// const styles = StyleSheet.create({
//     text: {
//         color: "white",
//         fontSize: 10,
//         marginTop: 8,
//     },
// });
