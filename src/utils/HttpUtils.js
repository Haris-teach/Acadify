// import React from 'react';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// const BASE_URL = 'https://api.stagingaia.com/';
// export const doGetAPICall = async (params, endPoint) => {
//   let token = await getToken();
//
//   // params ={"name":"hello", "value":"hell1"};
//   let endPointStr = '';
//   for (let i = 0; i < params.keys.length; i++) {
//     if (i == 0) {
//       endPointStr = '?' + params[params.keys[i]];
//     } else {
//       endPointStr = endPointStr + '&' + params[params.keys[i]];
//     }
//   }
//
//   // let url = BASE_URL + endPoint + endPointStr;
// };
//
// export const doPostAPICall = async (params, endPoint) => {
//   let token = await getToken();
// };
//
// export const doMultipartAPICall = async (params, files, endPoint) => {
//   let token = await getToken();
// };
//
// export const getToken = async () => {
//   let token = AsyncStorage.getItem('token');
//   return token;
// };
//
// const saveToken = token => {
//   AsyncStorage.setItem('token', token);
// };
