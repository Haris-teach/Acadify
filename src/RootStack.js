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
    COURSE_CONTENT_PLAY,
    COURSE_DETAILS,
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
import CourseDetailScreen from "./screens/CourseDetailScreen";
import CourseContentPlay from "./screens/CourseContentPlay";


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
            <RootStack.Screen name={COURSE_DETAILS} component={CourseDetailScreen}/>
            <RootStack.Screen name={COURSE_CONTENT_PLAY} component={CourseContentPlay}/>
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
