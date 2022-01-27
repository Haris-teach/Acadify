import React from 'react';
import {Dimensions, Modal, Text, View} from 'react-native';
import {ActivityIndicator} from 'react-native-paper';

class AppLoading {
  renderLoading(visible) {
    return (
      <View>
        {visible ? (
          <Modal
            transparent={true}
            onRequestClose={() => null}
            visible={visible}>
            <View
              style={{
                flex: 1,
                backgroundColor: '#00000070',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <ActivityIndicator
                animating={visible}
                size={'large'}
                color={'#B7A675'}
              />
              {/*<Text*/}
              {/*  style={{*/}
              {/*    fontSize: 14,*/}
              {/*    fontWeight: '200',*/}
              {/*    color: '#030031',*/}
              {/*    opacity: 1,*/}
              {/*  }}>*/}
              {/*  Loading*/}
              {/*</Text>*/}
            </View>
          </Modal>
        ) : null}
      </View>
    );
  }
  getCalculated(percentage) {
    let deviceHeight = Dimensions.get('window').height;
    return (percentage * deviceHeight) / 100;
  }
  getWidthCalculated(percentage) {
    let deviceWidth = Dimensions.get('window').width;
    return (percentage * deviceWidth) / 100;
  }
}
export default new AppLoading();
