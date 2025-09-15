import { View, FlatList, Image, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import styles from './styles';
import Header from '../../../../components/Header';
import images from '../../../../assets/images';
import { PRIMARY_THEME_COLOR } from '../../../../components/utilities/constant';
import strings from '../../../../components/utilities/Localization';

const SettingView = (props: any) => {
    const DATA = [
        {
            heading: 'Profile',
            icon: images.user,
            type: 'profile'
        },
        {
            heading: 'Change password',
            icon: images.lock,
            type: 'changePassword'
        },
        {
            heading: 'Separate Link',
            icon: images.link,
            type: 'separateLink'
        },
        {
            heading: 'Notification',
            icon: images.bell,
            type: 'notification',
        },
        {
            heading: 'Logout',
            icon: images.logout,
            type: 'logout',
        }
    ];

    const renderItem = ({ item }: any) => {
        return (
            <TouchableOpacity style={styles.listItemView}
                onPress={() => props.handleNavigation(item.type, item)}>
                <View style={styles.iconView}>
                    <Image source={item.icon} style={styles.listIconStyle} />
                </View>
                <View style={styles.headingView}>
                    <Text style={styles.headingTxt}>{item.heading}</Text>
                </View>
                <View style={styles.rightArrowView}>
                    <Image source={images.rightArrow} style={styles.rightArrowImage} />
                </View>
            </TouchableOpacity>);
    }
    return (
        <View style={styles.mainContainer}>
            <Header
                leftImageSrc={images.menu}
                headerText={strings.setting}
                headerStyle={styles.headerStyle}
                RightFirstIconStyle={styles.leftImageIconStyle}
                leftImageIconStyle={styles.leftImageIconStyle}
                handleOnLeftIconPress={props.handleDrawerPress}
                barStyle={'light-content'}
                statusBarColor={PRIMARY_THEME_COLOR}
            />
            <View style={styles.listView}>
                <FlatList
removeClippedSubviews={false} data={DATA} renderItem={renderItem} />
            </View>
        </View>
    );
};

export default SettingView;