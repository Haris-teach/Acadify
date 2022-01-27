export const SET_LOGIN_DATA = 'SET_LOGIN_DATA';
export const SET_SIGNUP_DATA = 'SET_SIGNUP_DATA';
export const SET_USER_TOKEN = 'SET_USER_TOKEN';
export const SET_USER_RESOURCE = 'SET_USER_RESOURCE';
export const SET_USER_GOAL = 'SET_USER_GOAL';
export const SET_USER_JOURNEY = 'SET_USER_JOURNEY';
export const SET_USER_COURSE = 'SET_USER_COURSE';
export const SET_USER_ZOOM = 'SET_USER_ZOOM';
export const SET_USER_FORUM = 'SET_USER_FORUM';
export const SET_DASHBOARD = 'SET_DASHBOARD';
export const SET_CARD = 'SET_CARD';

export const SetLoginData = res => {
  return {type: SET_LOGIN_DATA, response: res};
};

export const SetSignUpData = res => {
  return {type: SET_SIGNUP_DATA, response: res};
};

export const SetUserToken = res => {
  return {type: SET_USER_TOKEN, response: res};
};


export const SetUserResource = res => {
  return {type: SET_USER_RESOURCE, response: res};
};

export const SetUserGoal = res => {
  return {type: SET_USER_GOAL, response: res};
};

export const SetUserJourney = res => {
  return {type: SET_USER_JOURNEY, response: res};
};

export const SetLoginCard = res => {
  return {type: SET_USER_JOURNEY, response: res};
};

export const SetUserCourse = res => {
  return {type: SET_USER_COURSE, response: res};
};

export const SetUserZoom = res => {
  return {type: SET_USER_ZOOM, response: res};
};

export const SetUserForum = res => {
  return {type: SET_USER_FORUM, response: res};
};

export const SetDashboard = res => {
  return {type: SET_DASHBOARD, response: res};
};
