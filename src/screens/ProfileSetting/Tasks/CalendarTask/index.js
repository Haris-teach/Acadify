//================================ React Native Imported Files ======================================//

import React, { useEffect, useState } from "react";
import {View, StatusBar, TouchableOpacity, Modal} from "react-native";
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp
} from "react-native-responsive-screen";
import { useIsFocused } from "@react-navigation/native";
import { Calendar } from "react-native-calendars";
import { useSelector } from "react-redux";
import moment from "moment";

//================================ Local Imported Files ======================================//

import styles from "./style";
import colors from "../../../../assets/colors/colors";
import ApiHelper from "../../../../api/ApiHelper";
import images from "../../../../assets/images/images";
import {CREATE_TASK, EDIT_TASK, TASK_LISTING} from "../../../../constants/navigators";
import fonts from "../../../../assets/fonts/fonts";
import AppLoading from "../../../../components/AppLoading";
import ListView from "../../../../assets/images/ListView.svg";
import AppHeader from "../../../../components/AppHeader";
import Add from "../../../../assets/images/addIcon.svg";
import Arrow from "../../../../assets/images/Arrow.svg";
import RightArrow from "../../../../assets/images/RidgtArrow.svg";
import TaskComponent from "../../../../components/TaskComponent";


const CalendarTask = (props) => {

  const isFocused = useIsFocused();
  const token = useSelector((state) => state.ApiData.token);
  const [loading, setLoading] = useState(false);
  const [taskModal, setTaskModal] = useState(false);
  const [tempObj, setTempObj] = useState();
  const [tasks, setTasks] = useState([]);
  const [taskData, setTaskData] = useState([]);


  useEffect(() => {
    getTasks();
  }, [isFocused]);


  const getTasks = () => {
    setLoading(true);
    let temp = {};
    ApiHelper.getUserTasks(token, (response) => {
      if (response.isSuccess) {
        console.log("Task Calendar ==>", response.response.data.data);
        if (response.response.data.code === 200) {
            setTasks(response.response.data.data)
            response.response.data.data.map((val) => {
                let date = moment(val.startDate).format('YYYY-MM-DD');
                // console.log('Date',date)
                // if(val.status === 'COMPLETED'){
                //     Object.assign(temp, {
                //         [date]: {
                //             selected: true,
                //             selectedColor: 'green',
                //         },
                //     });
                // } else {
                    Object.assign(temp, {
                        [date]: {
                            selected: true,
                            selectedColor: colors.button_text,
                        },
                    });
                // }
            })
            console.log('Task Calendar Data ===>',temp)
            setTempObj(temp)
            setLoading(false)
        }
      } else {
        setLoading(false);
        console.log("Task Calendar Data Error ===>", response.response);
      }
    });
  };


  const _onDayPress = (value) => {
      let taskArray = [];
      tasks.map((val) => {
          console.log('val',val)
          let date = moment(val.startDate).format('YYYY-MM-DD');
          if(value.dateString === date){
             taskArray.push(val)
          }
      })
      if(taskArray.length === 1){
          props.navigation.navigate(EDIT_TASK,{
              item:taskArray[0]
          })
      }else if(taskArray.length > 1) {
          setTaskData(taskArray)
          setTaskModal(true)
      }
  }


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
          current={new Date()}
          markedDates={tempObj}
          firstDay={1}
          onMonthChange={(month) => console.log("month changed", month)}
          onDayLongPress={(day) => console.log("selected day", day)}
          onDayPress={(day) => _onDayPress(day)}
          renderArrow={(direction) => direction === 'left' ? <RightArrow/> : <Arrow/>}
          disableAllTouchEventsForDisabledDays={false}
          disableMonthChange={false}
          disableArrowRight={false}
          enableSwipeMonths={false}
          disableArrowLeft={false}
          showWeekNumbers={false}
          hideExtraDays={false}
          hideDayNames={false}
          hideArrows={false}
          monthFormat={"MMM yyyy"}
          onPressArrowRight={(addMonth) => addMonth()}
          onPressArrowLeft={(subtractMonth) => subtractMonth()}
          headerStyle={{paddingHorizontal:wp(5),height:hp(15)}}
          theme={{
            'stylesheet.calendar.main': {
              week: {
                marginBottom: hp(4),
                flexDirection:'row',
                justifyContent: 'space-around',
                paddingHorizontal:wp(2),
                borderRadius:wp(6),
              },
            },
            'stylesheet.calendar.header': {
              week: {
                height:hp(5),
                marginTop:hp(2),
                flexDirection:'row',
                justifyContent: 'space-around',
                alignItems:"flex-end",
              },
            },
            textMonthFontFamily:fonts.regular,
            backgroundColor: colors.app_background,
            calendarBackground: colors.calendar_view,
            textSectionTitleColor: colors.white,
            textSectionTitleDisabledColor: '#d9e1e8',
            selectedDayBackgroundColor: '#00adf5',
            selectedDayTextColor: colors.white,
            todayTextColor: colors.white,
            dayTextColor: '#6A6A6A',
            textDisabledColor: '#3C3844',
            dotColor: '#00adf5',
            selectedDotColor: colors.white,
            disabledArrowColor: '#d9e1e8',
            monthTextColor: colors.white,
            // textDayHeaderFontFamily: fonts.regular,
            textDayFontWeight: '500',
            textMonthFontWeight: 'bold',
            textDayHeaderFontWeight: '300',
            textDayFontSize: wp(4),
            textDayFontFamily:fonts.semi,
            textMonthFontSize: wp(4),
            textDayHeaderFontSize: wp(4),
          }}
        />
      </View>
        <Modal
            animationType={'none'}
            transparent={true}
            visible={taskModal}
            onRequestClose={() => setTaskModal(!taskModal)}
        >
            <TaskComponent
                onPressClose={() => setTaskModal(!taskModal)}
                data={taskData}
                onSelect={(item) => {
                    setTaskModal(!taskModal)
                    props.navigation.navigate(EDIT_TASK,{item})
                }}
            />
        </Modal>

    </View>
  );
};

export default CalendarTask;
