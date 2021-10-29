//================================ React Native Imported Files ======================================//

import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  ScrollView,
  StatusBar,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import {widthPercentageToDP} from 'react-native-responsive-screen';
import Toast from 'react-native-simple-toast';
import {CommonActions} from '@react-navigation/native';

//================================ Local Imported Files ======================================//

import styles from './style';
import colors from '../../../assets/colors/colors';
import Button from '../../../components/Button/Button';
import AppHeader from '../../../components/AppHeader';
import images from '../../../assets/images/images';
import AppLoading from '../../../components/AppLoading';
import ApiHelper from '../../../api/ApiHelper';
import Yearly from '../../../assets/images/yearly.svg';
import Free from '../../../assets/images/free.svg';
import Tick from '../../../assets/images/tick.svg';
import Monthly from '../../../assets/images/monthly.svg';
import LIFETIME from '../../../assets/images/LIFETIME.svg';
import {CREDIT_CARD, HOME_SCREEN} from '../../../constants/navigators';

const PlanScreen = props => {
  const [loading, setLoading] = useState(false);
  const [packages, setPackages] = useState('');
  const [indexFeature, setIndexFeature] = useState('');
  const [stripeId, setStripeId] = useState('');
  const [planName, setPlaneName] = useState('');
  const [setIndex, setIndexValue] = useState(0);
  const [isVisible, setVisible] = useState(false);

  useEffect(() => {
    getPlans();
  }, []);

  const getPlans = () => {
    setLoading(true);
    ApiHelper.onGetPlan(response => {
      if (response.isSuccess) {
        setLoading(false);
        if (response.response.data.code === 200) {
          console.log('Response', response.response.data);
          setIndexValue(0);
          setPackages(response.response.data.result[0].Stripes);
          setIndexFeature(response.response.data.result[0].Stripes[0].Rights);
          setPlaneName(response.response.data.result[0].Stripes[0]);
          setStripeId(
            response.response.data.result[0].Stripes[0].Rights[0].StripeId,
          );
          setVisible(true);
        }
      } else {
        setLoading(false);
      }
    });
  };

  const onPressPlan = (item, index) => {
    setIndexValue(index);
    setIndexFeature(item.Rights);
    setStripeId(item.Rights[0].StripeId);
    setPlaneName(item);
  };

  const renderItemsFeature = (item, index) => {
    return (
      <View style={styles.miniContainer}>
        <Tick height={25} width={25} />
        <Text style={styles.featureInnerText}>{item.access}</Text>
      </View>
    );
  };

  const onChoose = () => {
    if (planName.interval !== 'free') {
      props.navigation.navigate(CREDIT_CARD, {
        planName,
      });
    } else {
      setLoading(true);
      ApiHelper.onSignUpApi(stripeId, props.route.params.data, response => {
        if (response.isSuccess) {
          setLoading(false);
          if (response.response.data.code === 200) {
            console.log('Success ===>', response.response.data.data);
            props.navigation.dispatch(
              CommonActions.reset({
                index: 0,
                routes: [{name: HOME_SCREEN}],
              }),
            );
          } else {
            console.log('Error ==>', response.response);
            Toast.show(response.response.data.error.email, Toast.LONG);
          }
        } else {
          setLoading(false);
          console.log('Error ==>', response.response);
        }
      });
    }
  };

  const renderItems = (item, index) => {
    return (
      <TouchableOpacity
        style={
          setIndex !== index
            ? styles.container
            : [
                styles.container,
                {borderWidth: 2, borderColor: colors.button_text},
              ]
        }
        activeOpacity={0.7}
        onPress={() => onPressPlan(item, index)}>
        <View style={styles.imageView}>
          {item.interval === 'year' ? <Yearly height={45} width={45} /> : null}
          {item.interval === 'month' ? <Monthly /> : null}
          {item.interval === 'lifetime' ? (
            <LIFETIME height={45} width={45} />
          ) : null}
          {item.interval === 'free' ? <Free height={45} width={45} /> : null}
        </View>
        <View style={styles.nameView}>
          <Text style={styles.nameText}>{item.interval}</Text>
        </View>
        <View style={styles.priceView}>
          <Text style={styles.dollarSign}>$</Text>
          <Text style={styles.priceValue}>{item.amount / 100}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <ScrollView
      style={styles.mainContainer}
      showsVerticalScrollIndicator={false}>
      {AppLoading.renderLoading(loading)}
      <StatusBar backgroundColor={colors.app_background} />
      <View style={styles.headerView}>
        <AppHeader title={'Payment Plan'} />
      </View>
      <View style={styles.headingView}>
        <Text style={styles.headingText}>
          The Place You can learn Every Thing
        </Text>
        <Text style={styles.subHeadingText}>Gold Pricing Plan</Text>
      </View>
      <View style={styles.planView}>
        <FlatList
          data={packages}
          extraData={packages}
          horizontal={true}
          keyExtractor={item => item.id}
          showsHorizontalScrollIndicator={false}
          renderItem={({item, index}) => renderItems(item, index)}
          nestedScrollEnabled={true}
        />
      </View>
      {isVisible ? (
        <View style={styles.featureViewText}>
          <Text style={styles.headingFeatureText}>Featured</Text>
        </View>
      ) : null}
      <View style={styles.featureView}>
        <FlatList
          data={indexFeature}
          extraData={indexFeature}
          keyExtractor={item => item.id}
          showsVerticalScrollIndicator={false}
          renderItem={({item, index}) => renderItemsFeature(item, index)}
        />
      </View>
      {isVisible ? (
        <View style={styles.buttonView}>
          <View style={styles.btnView}>
            <Button
              width={widthPercentageToDP(40)}
              buttonText={'Cancel'}
              onPress={() => props.navigation.goBack()}
            />
          </View>

          <View style={styles.btnView}>
            <Button
              width={widthPercentageToDP(40)}
              buttonText={'Choose Plan'}
              bgColor={colors.white}
              borderColor={colors.white}
              textColor={colors.black}
              onPress={() => onChoose()}
            />
          </View>
        </View>
      ) : null}
    </ScrollView>
  );
};

export default PlanScreen;
