//================================ React Native Imported Files ======================================//

import React, {Component} from 'react';
import {
    TouchableOpacity,
    View,
    Text,
    StyleSheet
} from 'react-native';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';

//================================ React Native Imported Files ======================================//

import colors from '../assets/colors/colors';
import Journey from "../assets/dropIcon/journey.svg";
import Ring from "../assets/images/bell.svg";
import Chat from "../assets/dropIcon/chat.svg";
import Gear from "../assets/dropIcon/gear.svg";


export default class AppHeaderNative extends Component {
    constructor(props) {
        super(props);
        this.state = {
            drawerProps: this.props.nav,
        };
    }

    render() {
        return (
            <View style={[
                    styles.container,
                    {
                        backgroundColor:
                            this.props.backgroundColor !== undefined
                                ? this.props.backgroundColor
                                : colors.app_background,
                    },
                ]}>
                <View style={styles.leftView}>
                    <TouchableOpacity
                        style={styles.iconLeftStyle}
                        activeOpacity={0.7}
                        onPress={() => this.props.onPressSetting()}
                    >
                        <Gear/>
                        <Text style={{fontSize:wp(2.5),marginTop:wp(1),color:colors.white}}>Settings</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.rightView}>
                    <TouchableOpacity
                        style={styles.iconStyle}
                        activeOpacity={0.7}
                        onPress={() => this.props.onPressJourney()}
                    >
                        <Journey/>
                        <Text style={{fontSize:wp(2.5),marginTop:wp(1),color:colors.white}}>Journey</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.iconStyle}
                        activeOpacity={0.7}
                        onPress={() => this.props.onPressChat()}
                    >
                        <Chat/>
                        <Text style={{fontSize:wp(2.5),marginTop:wp(1),color:colors.white}}>Chat</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.iconStyle}
                        activeOpacity={0.7}
                        onPress={() => this.props.onPressRing()}
                    >
                        <Ring/>
                        <Text style={{fontSize:wp(2.5),marginTop:wp(1),color:colors.white}}>Notifications</Text>
                    </TouchableOpacity>
                </View>

            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        height:hp(5),
        width:wp(100),
        backgroundColor:'red',
        flexDirection:'row',
        alignItems:'flex-end',

    },
    leftView:{
        flex:0.55,
        paddingLeft:wp(5),
        justifyContent:'center',
        alignItems:'flex-start'
    },
    rightView:{
        flex:0.45,
        flexDirection:'row',
        paddingRight:wp(5),
        justifyContent:'space-between',
        alignItems:'flex-start',
    },
    iconStyle:{
        justifyContent:'center',
        alignItems:'center',
    },
    iconLeftStyle: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    }
});
