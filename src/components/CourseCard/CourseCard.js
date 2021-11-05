import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import colors from "../../assets/colors/colors";

const CourseCard = (props) => {
  return (
    <View style={styles.container}>
      <Image
        style={styles.imageView}
        source={{
          uri: props.imgUri,
        }}
      />
      <View style={{ flex: 1, justifyContent: "space-around", marginLeft: 10 }}>
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
    width: "98%",
    height: 130,
    backgroundColor: colors.image_background,
    justifyContent: "center",
    borderRadius: 15,
    flexDirection: "row",
  },
  imageView: {
    height: 129,
    width: 140,
    borderRadius: 10,
  },
  text: { color: "#FFFFFF", flexWrap: "wrap", fontWeight: "500" },
});

export default CourseCard;
