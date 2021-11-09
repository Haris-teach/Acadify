import * as React from "react";
import { StyleSheet } from "react-native";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";
import colors from "../../assets/colors/colors";
import fonts from "../../assets/fonts/fonts";

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: colors.app_background,
  },
  headerView:{
    flex:0.1
  },
  innerContainer: {
    marginTop: 13,
    width: wp(93),
    marginLeft: 15,
  },
  heading: { fontSize: 20, fontWeight: "bold", color: "white" },
  iconHolder: {
    backgroundColor: colors.image_background,
    width: 38,
    height: 38,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  topHeading: {
    color: colors.white,
    fontWeight: "700",
    fontSize: 24,
    fontFamily:fonts.semi
  },
  viewall: { color: "white", fontSize: 15, marginRight: 3 },
  headingContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    height: hp(8),
    alignItems: "center",
  },
  listText: {
    color: "white",
    marginTop: 5,
  },
  headingView: { alignSelf: "baseline", marginLeft: 5, marginTop: 20 },
});

export default styles;
