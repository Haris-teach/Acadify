//================================ React Native Imported Files ======================================//

import React from "react";
import {StyleSheet,ImageBackground, Text, TouchableOpacity, View} from "react-native";
import {heightPercentageToDP as hp, widthPercentageToDP as wp} from "react-native-responsive-screen";

//================================ Local Imported Files ======================================//

import LockIcon from "../../assets/images/lock_course.svg";
import colors from "../../assets/colors/colors";
import fonts from "../../assets/fonts/fonts";

const CourseCard = (props) => {
  return (
    <TouchableOpacity activeOpacity={0.7} style={styles.container} onPress={() => props.onPressCourse()}>
      <ImageBackground
          blurRadius={props.isLock ? 2 : 0}
          imageStyle={styles.imageView}
          style={styles.imageView}
          source={{ uri: props.imgUri }}
      >
        {props.isLock ? <LockIcon height={45} width={45}/> : null}
      </ImageBackground>

      <View style={{ justifyContent: "space-around", marginLeft: wp(3), width:wp(60),paddingVertical:wp(2)}}>
        <Text style={styles.text} numberOfLines={2}>{props.title} </Text>
        <Text style={{width:wp(50) ,color: colors.greyTxt }} numberOfLines={1}>{props.createdBy}</Text>
        <Text style={[styles.text, { fontWeight: "700", fontSize: wp(5) }]} numberOfLines={1}>${props.price/100}</Text>
      </View>

    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: wp(90),
    height: hp(15),
    backgroundColor: colors.image_background,
    borderRadius: wp(6),
    flexDirection: "row",
    alignSelf:'center',
    marginVertical:wp(2)
  },
  imageView: {
    height: hp(15),
    width: hp(15),
    borderRadius: wp(6),
    justifyContent:'center',
    alignItems:'center'
  },
  text: {
    width:wp(50),
    color: colors.white,
    fontWeight: "500",
    fontSize:wp(4),
    fontFamily:fonts.semi,
  },
});

export default CourseCard;
