//================================ React Native Imported Files ======================================//

import React, { useState } from "react";
import {
  View,
  Text,
  Platform,
  StatusBar,
  ScrollView,
  KeyboardAvoidingView,
} from "react-native";
import { useDispatch } from "react-redux";
import Toast from "react-native-simple-toast";
import { TextInput } from "react-native-paper";
import { CommonActions } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

//================================ Local Imported Files ======================================//

import styles from "./style";
import colors from "../../../assets/colors/colors";
import fonts from "../../../assets/fonts/fonts";
import Button from "../../../components/Button/Button";
import LoginLogo from "../../../assets/images/login_screen.svg";
import {
  MY_TAB,
  SIGNUP_SCREEN,
  FORGOT_PASSWORD,
} from "../../../constants/navigators";
import AppLoading from "../../../components/AppLoading";
import ApiHelper from "../../../api/ApiHelper";
import * as ApiDataActions from "../../../../redux/store/actions/ApiData";
import { SET_USER_RESOURCE } from "../../../../redux/store/actions/ApiData";

const LoginScreen = (props) => {
  const dispatch = useDispatch();
  // const [email, setEmail] = useState('');
  // const [password, setPassword] = useState('');
  // const [email, setEmail] = useState("hussain41.cs@gmail.com");
  // const [password, setPassword] = useState("Password@2");
  const [email, setEmail] = useState("useram@mailinator.com");
  const [password, setPassword] = useState("Dvorak123!");
  const [loading, setLoading] = useState(false);

  const onPressLogin = () => {
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (email === "" || email === " ") {
      Toast.show("Please Enter Email", Toast.LONG);
    } else if (reg.test(email) !== true) {
      Toast.show("Please Enter Valid Email", Toast.LONG);
    } else if (password === "" || password === " ") {
      Toast.show("Please Enter Password", Toast.LONG);
    } else {
      onLoginApi();
    }
  };

  const onLoginApi = () => {
    setLoading(true);
    ApiHelper.onLoginApi(email, password, (response) => {
      //console.log("RESPONSE:   ", response.response.data.data.token);
      if (response.isSuccess) {
        dispatch(ApiDataActions.SetLoginData(response.response.data.data));
        setLoading(false);
        if (response.response.data.status === 200) {
          setRights(response.response.data.data);
          if (response.response.data.data.user.userType === 2) {
            // ApiHelper.consoleBox("Login Response ===>", response.response.data.data);
            dispatch(ApiDataActions.SetLoginData(response.response.data.data));
            dispatch(
              ApiDataActions.SetLoginCard(response.response.data.data.card)
            );
            dispatch(
              ApiDataActions.SetUserToken(response.response.data.data.token)
            );
            setData(JSON.stringify(response.response.data.data));
            props.navigation.dispatch(
              CommonActions.reset({
                index: 0,
                routes: [{ name: MY_TAB }],
              })
            );
            setPassword("");
            setEmail("");
          } else {
            setTimeout(() => {
              Toast.show("Invalid Credentials", Toast.LONG);
            }, 200);
          }
        } else {
          setTimeout(() => {
            Toast.show(response.response.data.message, Toast.LONG);
          }, 200);
        }
      } else {
        setLoading(false);
        console.log("Error ==>", response.response.response.data);
        setTimeout(() => {
          Toast.show("502 Bad Gateway", Toast.LONG);
        }, 200);
      }
    });
  };

  const setData = async (value) => {
    try {
      await AsyncStorage.setItem("user", value);
    } catch (e) {
      console.log("Error", e);
    }
  };

  const setRights = (data) => {
    data.user.UserRights.map((value) => {
      if (value.access === "resources") {
        dispatch(ApiDataActions.SetUserResource(true));
      } else if (value.access === "goals") {
        dispatch(ApiDataActions.SetUserGoal(true));
      } else if (value.access === "journey") {
        dispatch(ApiDataActions.SetUserJourney(true));
      } else if (value.access === "courses") {
        dispatch(ApiDataActions.SetUserCourse(true));
      } else if (value.access === "zoom") {
        dispatch(ApiDataActions.SetUserZoom(true));
      } else if (value.access === "forum") {
        dispatch(ApiDataActions.SetUserForum(true));
      }
    });
  };

  return (
    <KeyboardAvoidingView
      style={styles.mainContainer}
      behavior={Platform.OS === "ios" ? "padding" : null}
    >
      {AppLoading.renderLoading(loading)}
      <StatusBar backgroundColor={colors.app_background} />
      <ScrollView
        style={styles.mainContainer}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.imageView}>
          <LoginLogo />
        </View>
        <Text style={styles.welcomeText}>Welcome Back</Text>
        <View style={styles.inputView}>
          <View style={styles.inputSection}>
            <TextInput
              style={styles.inputText}
              label="Email"
              mode={"outlined"}
              selectionColor={colors.white}
              theme={{
                roundness: 6,
                colors: {
                  primary: colors.inputFocus,
                  placeholder: colors.white,
                  text: colors.white,
                },
                fonts: {
                  regular: {
                    fontFamily: fonts.regular,
                  },
                },
              }}
              outlineColor={colors.app_border}
              keyboardType={"email-address"}
              autoCapitalize={"none"}
              underlineColorAndroid="transparent"
              onChangeText={(text) => setEmail(text)}
              value={email}
            />
          </View>
          <View style={styles.inputSection}>
            <TextInput
              style={styles.inputText}
              label="Password"
              mode={"outlined"}
              selectionColor={colors.white}
              theme={{
                roundness: 6,
                colors: {
                  primary: colors.inputFocus,
                  placeholder: colors.white,
                  text: colors.white,
                },
                fonts: {
                  regular: {
                    fontFamily: fonts.regular,
                  },
                },
              }}
              outlineColor={colors.app_border}
              secureTextEntry={true}
              underlineColorAndroid="transparent"
              onChangeText={(text) => setPassword(text)}
              value={password}
            />
          </View>
          <View style={styles.forgotPassword}>
            <Text
              style={styles.forgotPasswordText}
              onPress={() => {
                props.navigation.navigate(FORGOT_PASSWORD);
                setPassword("");
                setEmail("");
              }}
            >
              Forgot Password?
            </Text>
          </View>
        </View>
        <View style={styles.bottomView}>
          <Button buttonText={"Sign In"} onPress={() => onPressLogin()} />
          <View style={styles.noAccountView}>
            <Text style={styles.noAccountText}>Don't have an Account? </Text>
            <Text
              style={styles.signUpText}
              onPress={() => {
                props.navigation.navigate(SIGNUP_SCREEN);
                setPassword("");
                setEmail("");
              }}
            >
              Sign Up
            </Text>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default LoginScreen;
