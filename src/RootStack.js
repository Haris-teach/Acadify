//================================ React Native Imported Files ======================================//

import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

//================================ Local Imported Files ======================================//

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
  LOGIN_SCREEN,
  PLAN_SCREEN,
  SIGNUP_SCREEN,
} from './constants/navigators';
import PlanScreen from './screens/Auth/PlanScreen';
import HomeScreen from './screens/HomeScren/HomeScreen';
import CardScreen from './screens/Auth/CardScreen';
import AddCardScreen from './screens/Auth/AddCardScreen';

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
        <RootStack.Screen name={HOME_SCREEN} component={HomeScreen} />
        <RootStack.Screen name={CREDIT_CARD} component={CardScreen} />
        <RootStack.Screen name={ADD_CARD} component={AddCardScreen} />
        <RootStack.Screen
          name={FORGOT_PASSWORD}
          component={ForgotPasswordScreen}
        />
      </RootStack.Navigator>
    </NavigationContainer>
  );
};

export default Stack;
