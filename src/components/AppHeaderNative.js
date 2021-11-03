import React, {Component} from 'react';
import {
    Image,
    TouchableOpacity,
    View,
    StyleSheet,
    Text,
    SafeAreaView,
} from 'react-native';
import {
    widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import LinearGradient from 'react-native-linear-gradient';
import fonts from '../assets/fonts/fonts';
import colors from '../assets/colors/colors';
import Drawer from "../assets/images/drawer.svg";
import Ring from "../assets/images/bell.svg";

export default class AppHeaderNative extends Component {
    constructor(props) {
        super(props);
        this.state = {
            drawerProps: this.props.nav,
        };
    }

    render() {
        const nav = this.state.drawerProps;
        return (
            <LinearGradient colors={['#26BBC6', '#175F98']} style={{flex: 1}}>
                <SafeAreaView
                    style={[
                        styles.container,
                        {
                            backgroundColor:
                                this.props.backgroundColor !== undefined
                                    ? this.props.backgroundColor
                                    : colors.app_background,
                        },
                    ]}>
                    <TouchableOpacity
                        style={styles.headerProfile}
                        onPress={this.props.onLeftIconPress}>
                        {this.props.leftIconPath !== undefined && (
                            // <Image
                            //     resizeMode="contain"
                            //     style={[
                            //         styles.img,
                            //         this.props.lefticonSize !== undefined
                            //             ? {
                            //                 height: this.props.lefticonSize,
                            //                 width: this.props.lefticonSize,
                            //             }
                            //             : {height: 40, width: 40},
                            //     ]}
                            //     source={this.props.leftIconPath}
                            // />
                            <Drawer/>
                        )}

                        {this.props.leftText !== undefined && (
                            <Text style={styles.text}>{this.props.leftText}</Text>
                        )}
                    </TouchableOpacity>
                    <View style={styles.headerLogo}>
                        {this.props.titleLogoPath !== undefined && (
                            <Image
                                style={
                                    this.props.titleLogosize !== undefined
                                        ? {
                                            height: this.props.titleLogosize,
                                            width: this.props.titleLogosize,
                                        }
                                        : {width: 30, height: 30}
                                }
                                source={this.props.titleLogoPath}
                            />
                        )}
                        {this.props.title && (
                            <Text style={styles.title}>
                                {this.props.title !== undefined ? this.props.title : 'Header'}
                            </Text>
                        )}
                    </View>
                    <TouchableOpacity
                        style={styles.headerMenu}
                        onPress={this.props.onRightIconPress}>
                        {this.props.rightIconOnePath !== undefined && (
                            <Ring/>
                        )}

                        {this.props.rightIconTwoPath !== undefined && (
                            <Image
                                resizeMode="contain"
                                style={[
                                    styles.img,
                                    this.props.rightIconSize !== undefined
                                        ? {
                                            height: this.props.rightIconSize,
                                            width: this.props.rightIconSize,
                                        }
                                        : {height: 25, width: 25},
                                ]}
                                source={this.props.rightIconTwoPath}
                            />
                        )}

                        {this.props.rightText !== undefined && (
                            <Text style={styles.text}>{this.props.rightText}</Text>
                        )}
                    </TouchableOpacity>
                </SafeAreaView>
            </LinearGradient>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    headerProfile: {
        flex: 0.3,
        justifyContent: 'center',
        flexDirection: 'row',
    },
    headerLogo: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
    },
    headerMenu: {
        flex: 0.3,
        flexDirection: 'row',
        alignItems: 'center',
        alignSelf: 'center',
        justifyContent: 'center',
    },
    title: {
        fontSize: wp(5.2),
        color: colors.white,
        fontFamily: fonts.regular,
    },
    text: {
        alignSelf: 'center',
        marginLeft: wp(2),
        fontSize: wp(4.4),
        paddingLeft: wp(1),
        color: colors.black,
        fontWeight: '400',
        fontFamily: fonts.regular,
    },
    img: {
        alignSelf: 'center',
        tintColor: colors.white,
    },
});
