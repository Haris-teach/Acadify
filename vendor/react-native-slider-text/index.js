import React, { useState, useEffect } from 'react';
import {View, Text, Dimensions, StyleSheet, Platform} from 'react-native';
import Slider from '@react-native-community/slider';
import {widthPercentageToDP} from "react-native-responsive-screen";
const width = Dimensions.get('window').width;

const SliderText = (props) => {
  const multiplier = props.multiplier || 1.15;
  const maximumValue = props.maximumValue || 1;
  const stepValue = props.stepValue || 1;
  const value = props.value || 0;
  const logic = maximumValue * multiplier;
  const [ sliderValue, setSliderValue ] = useState(props.sliderValue || 0);

  const left = sliderValue >= 1000 ? sliderValue * width / logic - 40 : sliderValue * (Platform.OS === 'android' ? widthPercentageToDP(95) : widthPercentageToDP(95)) / logic;

  const sendSliderValue = (slider) => {
    setSliderValue(slider);
    props.onValueChange(slider);
  };

  return (
      <View style={[styles.slider, props.containerStyle]}>
        <View
            style={{
              transform: [{translateX: left+2}]
            }}
        >
          <Text style={[ styles.text, props.customCountStyle,{paddingLeft:sliderValue > 10 ? 0 : 5}]}>{Math.floor(sliderValue)}</Text>
        </View>
        <Slider
            style={[styles.slider, props.sliderStyle]}
            minimumValue={props.minimumValue || 0}
            maximumValue={maximumValue}
            step={stepValue}
            minimumTrackTintColor={props.minimumTrackTintColor || '#000'}
            thumbTintColor={props.thumbTintColor || '#000'}
            maximumTrackTintColor={props.maximumTrackTintColor || '#999'}
            onValueChange={(e) => sendSliderValue(e)}
            onSlidingComplete={props.onSlidingComplete}
            value={value}
        />
        <View style={styles.row}>
          <Text style={[ styles.customLabel, props.customLabelStyle ]}>{props.minimumValueLabel || 'Start'}</Text>
          <Text style={[ styles.customLabel, props.customLabelStyle ]}>{props.maximumValueLabel || 'End'}</Text>
        </View>
      </View>
  );
};

const styles = StyleSheet.create({
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',

  },
  slider: {
    width:Platform.OS === 'android' ? widthPercentageToDP(90) : widthPercentageToDP(90),
    // marginVertical: 20,
    alignSelf: 'center'
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
      paddingHorizontal:Platform.OS === 'android' ? widthPercentageToDP(3) : null
  },
  customLabel: {
    fontSize: 20
  }
});

export default SliderText;
