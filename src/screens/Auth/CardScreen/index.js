//================================ React Native Imported Files ======================================//

import * as React from 'react';
import {View, Text, StatusBar} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

//================================ Local Imported Files ======================================//

import styles from './style';
import colors from '../../../assets/colors/colors';
import fonts from '../../../assets/fonts/fonts';
import Button from '../../../components/Button/Button';
import CreditCard from '../../../assets/images/credit_card.svg';
import {ADD_CARD} from '../../../constants/navigators';

const CardScreen = props => {
  const onPressYes = () => {
    props.navigation.navigate(ADD_CARD, {
        planName: props.route.params.planName,
    });
  };

  return (
    <View style={styles.mainContainer}>
      <StatusBar backgroundColor={colors.app_background} />
      <View style={styles.imageView}>
        <CreditCard />
      </View>
      <View style={styles.headingView}>
        <Text style={styles.headingText}>Credit/Debit Card</Text>
      </View>
      <View style={styles.subHeadingView}>
        <Text style={styles.subHeadingText}>
          Are you sure you want to purchase this plan?
        </Text>
      </View>
      <View style={[styles.subHeadingView, {height: hp(5)}]}>
        <Text style={[styles.headingText, {fontFamily: fonts.regular}]}>
          $ {props.route.params.planName.amount / 100}.00
        </Text>
      </View>
      <View style={styles.buttonView}>
        <View style={styles.btnView}>
          <Button
            width={wp(40)}
            buttonText={'No'}
            onPress={() => props.navigation.goBack()}
          />
        </View>
        <View style={styles.btnView}>
          <Button
            width={wp(40)}
            buttonText={'Yes'}
            bgColor={colors.white}
            borderColor={colors.white}
            textColor={colors.black}
            onPress={() => onPressYes()}
          />
        </View>
      </View>
    </View>
  );
};

export default CardScreen;
