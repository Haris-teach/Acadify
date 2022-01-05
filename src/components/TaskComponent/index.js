//================================ React Native Imported Files ======================================//

import React from "react";
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import {View, StyleSheet, TouchableOpacity, FlatList} from "react-native";
import moment from "moment";

//================================ Local Imported Files ======================================//

import colors from "../../assets/colors/colors";
import {EDIT_TASK} from "../../constants/navigators";
import TasksComponent from "../TasksComponent";


const TaskComponent = (props) => {

    const _renderItems = (item) => {
        let date = moment(item.dueDate).format('MM/DD/YYYY');
        return(
            <TasksComponent
                title={item.title}
                priority={item.priority}
                status={item.status}
                dueDate={date}
                onPressTask={() => props.onSelect(item)}
            />
        )
    }


    return (
        <TouchableOpacity
            style={styles.mainContainer}
            activeOpacity={1}
            onPress={() => props.onPressClose()}
        >
            <View style={styles.container}>
                <FlatList
                    data={props.data}
                    extraData={props.data}
                    showsVerticalScrollIndicator={false}
                    keyExtractor={(item) => item.id}
                    renderItem={({item}) => _renderItems(item)}
                />
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: "rgba(0,0,0,0.5)",
        justifyContent:"center",
        alignItems:'center'
    },
    container: {
        maxHeight: hp(40),
        width: wp(95),
        backgroundColor: colors.card_background,
        marginHorizontal: wp(2),
        borderRadius: wp(3),
        justifyContent:"center",
        alignItems:'center',
        padding:10
    },
});

export default TaskComponent;
