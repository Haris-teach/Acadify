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
    flex:0.1,
  },
  container:{
    flex:0.9,
  },
  dropArrow:{
    height:hp(5),
    marginLeft:wp(2),
    justifyContent:'center',
  },
  innerContainer: {
    marginVertical: wp(2),
    width: wp(93),
    alignSelf:'center'
  },
  upperView:{
    height:hp(10),
    width:wp(100),
    paddingHorizontal:wp(7.5),
    flexDirection:'row',
    justifyContent:'space-between',
    alignItems:'center',
  },
  headerStyle:{
    height:hp(10),
    width:wp(65),
    flexDirection:'row',
    alignItems:'center',
  },
  filterIcons:{
    height:hp(10),
    width:wp(20),
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'space-between',
  },
  headerTextStyle:{
    fontFamily:fonts.semi,
    fontWeight:'700',
    color:colors.white,
    fontSize:24
  },
  headingContainer: {
    height: hp(8),
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  listText: {
    color: colors.white,
  },
});

export default styles;
