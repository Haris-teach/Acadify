//================================ React Native Imported Files ======================================//

import React, { useEffect, useState } from "react";
import { View, StatusBar, TouchableOpacity, FlatList } from "react-native";
import { useSelector } from "react-redux";
import { useIsFocused } from "@react-navigation/native";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";
import moment from "moment";
import { Calendar } from "react-native-calendars";

//================================ Local Imported Files ======================================//

import styles from "./style";
import colors from "../../../../assets/colors/colors";
import ApiHelper from "../../../../api/ApiHelper";
import images from "../../../../assets/images/images";
import { CREATE_TASK, TASK_LISTING } from "../../../../constants/navigators";
import AppLoading from "../../../../components/AppLoading";
import ListView from "../../../../assets/images/ListView.svg";
import AppHeader from "../../../../components/AppHeader";
import Add from "../../../../assets/images/addIcon.svg";
import TasksComponent from "../../../../components/TasksComponent";
import Arrow from "../../../../assets/images/Arrow.svg";
import RidgtArrow from "../../../../assets/images/RidgtArrow.svg";
import fonts from "../../../../assets/fonts/fonts";

const CalendarTask = (props) => {
  const isFocused = useIsFocused();
  const token = useSelector((state) => state.ApiData.token);
  const [loading, setLoading] = useState(false);
  const [items, setItems] = useState([]);

  useEffect(() => {
    getTasks();
  }, [isFocused]);

  const getTasks = () => {
    setLoading(true);
    ApiHelper.getUserTasks(token, (response) => {
      if (response.isSuccess) {
        console.log("data", response.response);
        if (response.response.data.code === 200) {
          setItems(response.response.data.data);
          setLoading(false);
        }
      } else {
        setLoading(false);
        console.log("Response", response.response);
      }
    });
  };

  return (
    <View style={styles.mainContainer}>
      <StatusBar backgroundColor={colors.app_background} />
      {AppLoading.renderLoading(loading)}
      <View style={styles.headerView}>
        <AppHeader
          title={"Task"}
          leftIconPath={images.back_icon}
          onLeftIconPress={() => props.navigation.goBack()}
        />
      </View>
      <View style={styles.headingView}>
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => props.navigation.navigate(TASK_LISTING)}
        >
          <ListView />
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.7}
          style={{ paddingLeft: wp(3) }}
          onPress={() => props.navigation.navigate(CREATE_TASK)}
        >
          <Add />
        </TouchableOpacity>
      </View>
      <View style={styles.inputView}>
        <Calendar
          style={styles.calendarView}
          current={"2012-03-01"}
          minDate={"2012-05-10"}
          maxDate={"2012-05-30"}
          onDayPress={(day) => {
            console.log("selected day", day);
          }}
          onDayLongPress={(day) => {
            console.log("selected day", day);
          }}
          monthFormat={"yyyy MM"}
          onMonthChange={(month) => {
            console.log("month changed", month);
          }}
          hideArrows={false}
          renderArrow={(direction) => direction === 'left' ? <RidgtArrow/> : <Arrow/>}
          hideExtraDays={true}
          disableMonthChange={false}
          firstDay={1}
          hideDayNames={false}
          showWeekNumbers={false}
          onPressArrowLeft={(subtractMonth) => subtractMonth()}
          onPressArrowRight={(addMonth) => addMonth()}
          disableArrowLeft={false}
          disableArrowRight={false}
          disableAllTouchEventsForDisabledDays={false}
          renderHeader={(date) => {
          }}
          enableSwipeMonths={true}
          theme={{
              textMonthFontFamily:fonts.regular,
            backgroundColor: colors.app_background,
            calendarBackground: colors.calendar_view,
            textSectionTitleColor: '#b6c1cd',
            textSectionTitleDisabledColor: '#d9e1e8',
            selectedDayBackgroundColor: '#00adf5',
            selectedDayTextColor: '#ffffff',
            todayTextColor: '#00adf5',
            dayTextColor: '#2d4150',
            textDisabledColor: '#d9e1e8',
            dotColor: '#00adf5',
            selectedDotColor: '#ffffff',
            arrowColor: 'blue',
            disabledArrowColor: '#d9e1e8',
            monthTextColor: 'blue',
            indicatorColor: 'blue',
            // textDayFontFamily: 'monospace',
            // textMonthFontFamily: 'monospace',
            // textDayHeaderFontFamily: 'monospace',
            textDayFontWeight: '300',
            textMonthFontWeight: 'bold',
            textDayHeaderFontWeight: '300',
            textDayFontSize: 16,
            textMonthFontSize: 16,
            textDayHeaderFontSize: 16
          }}
        />
      </View>
    </View>
  );
};

export default CalendarTask;
