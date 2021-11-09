import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import colors from "../../assets/colors/colors";
import {heightPercentageToDP as hp, widthPercentageToDP as wp} from "react-native-responsive-screen";
import fonts from "../../assets/fonts/fonts";

const CourseCard = (props) => {
  return (
    <View style={styles.container}>
      <Image
        style={styles.imageView}
        source={{
          uri: props.imgUri,
        }}
      />
      <View style={{ justifyContent: "space-around", marginLeft: 15, width:wp(60),paddingVertical:wp(3)}}>
        <Text style={styles.text}>{props.title}</Text>
        <Text style={{ color: colors.greyTxt }}>{props.createdBy}</Text>
        <Text style={{ color: colors.greyTxt }}>(64646)</Text>
        <Text style={[styles.text, { fontWeight: "bold", fontSize: 20 }]}>
          {props.price}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: wp(90),
    height: hp(15),
    backgroundColor: colors.image_background,
    borderRadius: 15,
    flexDirection: "row",
    alignSelf:'center'
  },
  imageView: {
    height: hp(15),
    width: hp(15),
    borderRadius: wp(4),
  },
  text: {
    color: colors.white,
    flexWrap: "wrap",
    fontWeight: "500",
    fontSize:14,
    fontFamily:fonts.semi
  },
});

export default CourseCard;
