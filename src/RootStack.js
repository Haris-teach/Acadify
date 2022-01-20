//================================ React Native Imported Files ======================================//

import * as React from "react";
import "react-native-gesture-handler";
import { Platform } from "react-native";
import { NavigationContainer, useNavigationContainerRef } from "@react-navigation/native";
import { createNativeStackNavigator, } from "@react-navigation/native-stack";
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from "react-native-responsive-screen";

//================================ Local Imported Files ======================================//

import { height_screen } from "./utils/Dimentions";
import colors from "./assets/colors/colors";
import JourneyScreen from "./screens/Journey/JourneyScreen";
import LoginScreen from "./screens/Auth/LoginScreen";
import SignUpScreen from "./screens/Auth/SignUpScreen";
import ForgotPasswordScreen from "./screens/Auth/ForgotPassword";
import LandingScreen from "./screens/Auth/LandingScreen";
import {
    ADD_CARD,
    ADD_GOAL,
    ADD_JOURNEY,
    ALL_RESOURCES,
    BILLING_LISTING,
    BUY_RESOURCES,
    COURSE_CONTENT_PLAY,
    COURSE_DETAILS,
    COURSE_SCREEN,
    CREATE_TASK,
    CREDIT_CARD,
    DASHBOARD_SCREEN,
    EDIT_ACCOUNTABILITY,
    EDIT_PROFILE_SCREEN,
    EDIT_TASK,
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
    TASK_LISTING,
    VIDEO_SCREEN,
    CALENDAR_TASK,
    MY_TAB,
    NOTIFICATION,
    LIVE_EVENTS,
    FORUM,
    SPLASH_SCREEN,
    EVENTS_DETAILS,
    PAYMENT_SCREEN,
    ADD_NEW_CARD_SCREEN,
    CHAT_THREAD_LISTING
} from "./constants/navigators";
import PlanScreen from "./screens/Auth/PlanScreen";
import CardScreen from "./screens/Auth/CardScreen";
import AddCardScreen from "./screens/Auth/AddCardScreen";
import DashboardScreen from "./screens/Courses/CoursesScreen";
import SettingScreen from "./screens/ProfileSetting/SettingScreen";
import ProfileScreen from "./screens/ProfileSetting/ProfileScreen";
import AddJourney from "./screens/Journey/AddJourney";
import PasswordUpdate from "./screens/ProfileSetting/PasswordUpdate";
import VideoScreen from "./screens/VideoScreen";
import NotificationScreen from "./screens/Notification";
import LiveEvents from "./screens/LiveEvents/EventListing";
import ForumListing from "./screens/Forum/ForumListing";
import CourseScreen from "./screens/DashboardScreen";
import AddGoal from "./screens/Accountability/CreateGoal";
import EditProfileScreen from "./screens/ProfileSetting/EditProfile";
import GetAccountability from "./screens/Accountability/GetAccountability";
import EditAccountability from "./screens/Accountability/EditAccountability";
import CourseDetailScreen from "./screens/Courses/CourseDetailScreen";
import CourseContentPlay from "./screens/Courses/CourseContentPlay";
import AllResourcesScreen from "./screens/Resources/AllResources";
import ResourceBuyScreen from "./screens/Resources/ResourceBuyScreen";
import TaskListing from "./screens/ProfileSetting/Tasks/TaskListing";
import CreateTask from "./screens/ProfileSetting/Tasks/CreateTask";
import EditTask from "./screens/ProfileSetting/Tasks/EditTask";
import CalendarTask from "./screens/ProfileSetting/Tasks/CalendarTask";
import SplashScreen from "./screens/Auth/SplashScreen";
import EventDetailScreen from "./screens/LiveEvents/EventDetails";
import PaymentScreen from "./screens/ProfileSetting/PaymentMethod";
import BillingListing from "./screens/ProfileSetting/Billing";
import AddNewCardScreen from "./screens/ProfileSetting/AddNewCard";
import ChatThreadListing from "./screens/Chat/ChatThread/ChatThread";
import MenuBar from "./components/MenuBar";

//================================ Bottom Icons ======================================//

import DashboardActive from "./assets/dropIcon/dashboardA.svg";
import DashboardInActive from "./assets/dropIcon/dashboardIn.svg";
import AccountInActive from "./assets/dropIcon/AccountIn.svg";
import AccountActive from "./assets/dropIcon/AccountA.svg";
import CourseInActive from "./assets/dropIcon/courseIn.svg";
import CourseActive from "./assets/dropIcon/courseA.svg";
import LiveInActive from "./assets/dropIcon/liveIn.svg";
import LiveActive from "./assets/dropIcon/liveA.svg";
import ForumInActive from "./assets/dropIcon/forumIn.svg";
import ForumActive from "./assets/dropIcon/forumA.svg";
import ResourcesInActive from "./assets/dropIcon/resourceIn.svg";
import ResourcesActive from "./assets/dropIcon/resourceA.svg";


const RootStack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

const MyNewStack = () => {
    return (
        <RootStack.Navigator
            initialRouteName={SPLASH_SCREEN}
            screenOptions={{
                headerShown: false,
            }}
        >
            <RootStack.Screen name={SPLASH_SCREEN} component={SplashScreen} />
            <RootStack.Screen name={LANDING_SCREEN} component={LandingScreen} />
            <RootStack.Screen name={LOGIN_SCREEN} component={LoginScreen} />
            <RootStack.Screen name={SIGNUP_SCREEN} component={SignUpScreen} />
            <RootStack.Screen name={PLAN_SCREEN} component={PlanScreen} />
            <RootStack.Screen name={CREDIT_CARD} component={CardScreen} />
            <RootStack.Screen name={ADD_CARD} component={AddCardScreen} />
            <RootStack.Screen name={FORGOT_PASSWORD} component={ForgotPasswordScreen}/>
            {/*<RootStack.Screen name={MY_DRAWER} component={MyDrawer} />*/}
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
            <RootStack.Screen name={COURSE_DETAILS} component={CourseDetailScreen}/>
            <RootStack.Screen name={COURSE_CONTENT_PLAY} component={CourseContentPlay}/>
            <RootStack.Screen name={ALL_RESOURCES} component={AllResourcesScreen}/>
            <RootStack.Screen name={BUY_RESOURCES} component={ResourceBuyScreen}/>
            <RootStack.Screen name={TASK_LISTING} component={TaskListing}/>
            <RootStack.Screen name={CREATE_TASK} component={CreateTask}/>
            <RootStack.Screen name={EDIT_TASK} component={EditTask}/>
            <RootStack.Screen name={CALENDAR_TASK} component={CalendarTask}/>
            <RootStack.Screen name={MY_TAB} component={MyTabs}/>
            <RootStack.Screen name={SETTINGS} component={SettingScreen} />
            <RootStack.Screen name={NOTIFICATION} component={NotificationScreen} />
            <RootStack.Screen name={EVENTS_DETAILS} component={EventDetailScreen} />
            <RootStack.Screen name={BILLING_LISTING} component={BillingListing}/>
            <RootStack.Screen name={PAYMENT_SCREEN} component={PaymentScreen}/>
            <RootStack.Screen name={ADD_NEW_CARD_SCREEN} component={AddNewCardScreen}/>
            <RootStack.Screen name={CHAT_THREAD_LISTING} component={ChatThreadListing}/>
        </RootStack.Navigator>
    );
};

// const MyDrawer = () => {
//     return (
//         <Drawer.Navigator
//             initialRouteName={COURSE_SCREEN}
//             screenOptions={{
//                 drawerActiveTintColor: "rgba(36, 37, 41, 0.62)",
//                 headerShown: false,
//                 drawerPosition: "left",
//                 drawerType: "front",
//                 drawerStyle: {
//                     backgroundColor: "rgba(36, 37, 41, 0.8)",
//                     width: 90,
//                     height: height_screen < 675 ? 635 : 620,
//                     marginTop: height_screen < 675 ? 15 : 90,
//                     borderTopRightRadius: 60,
//                     borderBottomRightRadius: 60,
//                 },
//                 drawerItemStyle: {
//                     width: 90,
//                 },
//                 drawerLabelStyle: { display: "none" },
//             }}
//             drawerContent={(props) => <MenuBar {...props} />}
//         >
//             <Drawer.Screen name={COURSE_SCREEN} component={CourseScreen} />
//             <Drawer.Screen name={DASHBOARD_SCREEN} component={DashboardScreen} />
//             <Drawer.Screen name={GET_ACCOUNTABILITY} component={GetAccountability} />
//             <Drawer.Screen name={JOURNEY} component={JourneyScreen} />
//             <Drawer.Screen name={SETTINGS} component={SettingScreen} />
//             <Drawer.Screen name={ALL_RESOURCES} component={AllResourcesScreen} />
//         </Drawer.Navigator>
//     );
// };


const Stack = () => {
    const navigationRef = useNavigationContainerRef();
    return (
        <NavigationContainer
            ref={navigationRef}
            onReady={() => {
                console.log("Current ====>", navigationRef.getCurrentRoute().name);
            }}
        >
            <MyNewStack />
        </NavigationContainer>
    );
};


const Tab = createBottomTabNavigator();
const MyTabs = () => {
    return (
        <Tab.Navigator
            initialRouteName={COURSE_SCREEN}
            screenOptions={{
                headerShown:false,
                tabBarShowLabel:true,
                tabBarActiveTintColor:colors.button_text,
                tabBarLabelStyle:{
                    marginBottom: Platform.OS === 'ios' ? height_screen < 675 ? hp(1) : -hp(0.6) : hp(1),
                    fontSize:wp(2.2)
                },
                tabBarStyle: {
                    backgroundColor: colors.image_background,
                    height: hp(10),
                    width:wp(100),
                    borderRadius: wp(10),
                    paddingHorizontal:wp(2),
                    alignSelf:'center',
                    position: 'absolute',
                    bottom: 0,
                    right: 0,
                    borderWidth: 0,
                    borderTopWidth: 0,
                },
            }}>
            <Tab.Screen
                name={COURSE_SCREEN}
                component={CourseScreen}
                options={{
                    title:'Dashboard',
                    tabBarIcon: ({focused}) =>
                        focused ? <DashboardActive /> : <DashboardInActive />,
                }}
            />
            <Tab.Screen
                name={GET_ACCOUNTABILITY}
                component={GetAccountability}
                options={{
                    title:'Accountability',
                    tabBarIcon: ({focused}) =>
                        focused ? <AccountActive height={28} width={28}/> : <AccountInActive height={28} width={28}/>,
                }}
            />
            <Tab.Screen
                name={DASHBOARD_SCREEN}
                component={DashboardScreen}
                options={{
                    title:'Courses',
                    tabBarIcon: ({focused}) =>
                        focused ? <CourseActive /> : <CourseInActive />,
                }}
            />
            <Tab.Screen
                name={LIVE_EVENTS}
                component={LiveEvents}
                options={{
                    title:'Live Events',
                    tabBarIcon: ({focused}) =>
                        focused ? <LiveActive /> : <LiveInActive />,
                }}
            />
            <Tab.Screen
                name={FORUM}
                component={ForumListing}
                options={{
                    title:'Forum',
                    tabBarIcon: ({focused}) =>
                        focused ? <ForumActive /> : <ForumInActive />,
                }}
            />
            <Tab.Screen
                name={ALL_RESOURCES}
                component={AllResourcesScreen}
                options={{
                    title:'Resources',
                    tabBarIcon: ({focused}) =>
                        focused ? <ResourcesActive height={25} width={25}/> : <ResourcesInActive height={25} width={25}/>,
                }}
        />
        </Tab.Navigator>
    );
};


export default Stack;
