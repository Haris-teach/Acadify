//================================ React Native Imported Files ======================================//

import React from 'react';
import {View, Text} from 'react-native';
import {widthPercentageToDP} from 'react-native-responsive-screen';
import colors from '../../assets/colors/colors';
import {CommonActions} from '@react-navigation/native';
import {LOGIN_SCREEN} from '../../constants/navigators';

//================================ Local Imported Files ======================================//

const HomeScreen = props => {
  const onPressLogout = () => {
    props.navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{name: LOGIN_SCREEN}],
      }),
    );
  };

  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.app_background,
      }}>
      <Text
        style={{fontSize: widthPercentageToDP(6), color: 'white'}}
        onPress={() => onPressLogout()}>
        Logout
      </Text>
    </View>
  );
};

export default HomeScreen;
