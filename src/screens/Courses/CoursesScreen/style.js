import * as React from "react";
import {Platform, StyleSheet} from "react-native";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";
import colors from "../../../assets/colors/colors";
import fonts from "../../../assets/fonts/fonts";
import images from "../../../assets/images/images";

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: colors.app_background,
    paddingTop:Platform.OS === 'ios' ? hp(5) : null
  },
  container:{
    flex:0.9,
  },
  emptySection:{
    height:hp(80),
    justifyContent:'center',
    alignItems:'center'
  },
  dropArrow:{
    height:hp(5),
    marginLeft:wp(2),
    justifyContent:'center',
  },
  searchText:{
    marginRight:wp(2),
    marginLeft:wp(8),
    height:hp(4.5),
    width:wp(65),
    borderRadius:wp(3),
    backgroundColor:colors.image_background,
    paddingHorizontal:wp(3),
    flexDirection:'row',
    alignItems:'center',
  },
  innerContainer: {
    marginVertical: wp(2),
    width: wp(93),
    alignSelf:'center'
  },
  upperView:{
    height:hp(10),
    width:wp(100),
    paddingHorizontal:wp(5),
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
    fontSize:wp(6)
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
  dropStyle:{
    position:'absolute',
    top:hp(18),
    left:wp(10),
  },
  dateViewStyle:{
    height:hp(10),
    width:wp(40),
    borderRadius:wp(5),
    backgroundColor:colors.image_background,
    alignItems:'center',
    justifyContent:'space-between',
    borderWidth:0
  },
  containerStyle: {
  },
  upgradePlan:{
    height:hp(90),
    width:wp(100),
    justifyContent:"center",
    alignItems:'center',
  },

});

export default styles;
