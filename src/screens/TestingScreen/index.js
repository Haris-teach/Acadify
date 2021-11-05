// import React from "react";
// import {
//   createDrawerNavigator,
//   DrawerContentScrollView,
// } from "@react-navigation/drawer";
// import {
//   View,
//   Text,
//   StyleSheet,
//   Dimensions,
//   TouchableOpacity,
//   SafeAreaView,
// } from "react-native";
// import Live from "../../assets/images/live.svg";
// import Settings from "../../assets/images/settings.svg";
// import Bag from "../../assets/images/bag.svg";
// import Trophy from "../../assets/images/trophy.svg";
// import Second from "../../assets/images/second.svg";
// import Home from "../../assets/images/home.svg";
// import Globe from "../../assets/images/globe.svg";
// import Msg from "../../assets/images/msg.svg";

// const MenuBar = (props) => {
//   return (
//     <DrawerContentScrollView {...props} showsVerticalScrollIndicator={false}>
//       <View
//         style={{
//           alignItems: "center",
//         }}
//       >
//         <TouchableOpacity style={styles.iconHolder2}>
//           <Home />
//           <Text style={styles.txt}>Dashboard</Text>
//         </TouchableOpacity>
//         <TouchableOpacity style={styles.iconHolder}>
//           <Live />
//           <Text style={styles.txt}>Live Training</Text>
//         </TouchableOpacity>
//         <TouchableOpacity style={styles.iconHolder}>
//           <Second />
//           <Text style={styles.txt}>Course</Text>
//         </TouchableOpacity>
//         <TouchableOpacity style={styles.iconHolder}>
//           <Trophy />
//           <Text style={styles.txt}>Accountibility</Text>
//         </TouchableOpacity>
//         <TouchableOpacity style={styles.iconHolder}>
//           <Settings />
//           <Text style={styles.txt}>Resources</Text>
//         </TouchableOpacity>
//         <TouchableOpacity style={styles.iconHolder}>
//           <Bag />
//           <Text style={styles.txt}>Journey</Text>
//         </TouchableOpacity>
//         <TouchableOpacity style={styles.iconHolder}>
//           <Msg />
//           <Text style={styles.txt}>Forum</Text>
//         </TouchableOpacity>
//         <TouchableOpacity style={styles.iconHolder}>
//           <Globe />
//           <Text style={styles.txt}>Links</Text>
//         </TouchableOpacity>
//       </View>
//     </DrawerContentScrollView>
//   );
// };
// const styles = StyleSheet.create({
//   iconHolder2: {
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   iconHolder: {
//     marginTop: 30,
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   txt: { color: "white", fontSize: 10, marginTop: 3 },
// });

// export default MenuBar;
