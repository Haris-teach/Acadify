import React from 'react';
import {
  SET_CARD,
  SET_DASHBOARD,
  SET_LOGIN_DATA,
  SET_SIGNUP_DATA,
  SET_USER_COURSE,
  SET_USER_FORUM,
  SET_USER_GOAL,
  SET_USER_JOURNEY,
  SET_USER_RESOURCE,
  SET_USER_TOKEN,
  SET_USER_ZOOM
} from '../actions/ApiData';

const initialState = {
  loginData: '',
  signUpData: '',
  token:'',
  card:'',

  forum:false,
  goal:false,
  course:false,
  journey:false,
  resource:false,
  zoom:false,
  dashboard:false
};

const ApiData = (state = initialState, action) => {
  switch (action.type) {
    case SET_LOGIN_DATA:
      state.loginData = action.response;
      return state;
    case SET_SIGNUP_DATA:
      state.signUpData = action.response;
      return state;
    case SET_USER_TOKEN:
      state.token = action.response;
      return state;


    case SET_USER_JOURNEY:
      state.journey = action.response;
      return state;
    case SET_USER_RESOURCE:
      state.resource = action.response;
      return state;
    case SET_USER_GOAL:
      state.goal = action.response;
      return state;
    case SET_USER_ZOOM:
      state.zoom = action.response;
      return state;
    case SET_USER_FORUM:
      state.forum = action.response;
      return state;
    case SET_USER_COURSE:
      state.course = action.response;
      return state;
    case SET_DASHBOARD:
      state.dashboard = action.response;
      return state;
      case SET_CARD:
      state.card = action.response;
      return state;

    default:
      return state;
  }
};

export default ApiData;
