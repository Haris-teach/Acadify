//================================ React Native Imported Files ======================================//

import * as React from 'react';
import {View, Text, ImageBackground, StatusBar} from 'react-native';

//================================ Local Imported Files ======================================//

import styles from './style';
import images from '../../../assets/images/images';
import colors from '../../../assets/colors/colors';
import {LOGIN_SCREEN} from '../../../constants/navigators';
import Logo from '../../../assets/images/logo.svg';
import Button from '../../../components/Button/Button';

const LandingScreen = props => {
  return (
    <View style={styles.mainContainer}>
        <StatusBar hidden={true}/>
      <StatusBar backgroundColor={colors.app_background} />
      <ImageBackground source={images.landing_image} style={styles.imageStyle}>
        <View style={styles.logoView}>
          <Logo />
          <Text style={styles.logoText}>Acadify</Text>
        </View>
        <View style={styles.bottomView}>
          <Button
            buttonText={'Get started'}
            bgColor={colors.white}
            borderColor={colors.white}
            textColor={colors.black}
            onPress={() => props.navigation.navigate(LOGIN_SCREEN)}
          />
        </View>
      </ImageBackground>
    </View>
  );
};

export default LandingScreen;
