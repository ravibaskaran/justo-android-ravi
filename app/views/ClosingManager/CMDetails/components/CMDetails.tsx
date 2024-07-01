import React, { useState } from 'react';
import { View, Text, useWindowDimensions, Image, TouchableOpacity, Linking } from 'react-native';
import images from '../../../../assets/images';
import Header from '../../../../components/Header';
import { PRIMARY_THEME_COLOR, PRIMARY_THEME_COLOR_DARK, TABBAR_COLOR } from '../../../../components/utilities/constant';
import strings from '../../../../components/utilities/Localization';
import styles from './styles';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import CMInfoView from './CMInfo';
import StatsView from './StatsViews';

const CMDetailsView = (props: any) => {
    const layout = useWindowDimensions();
    const [indexData, setIndexData] = useState({
        index: 0,
        routes: [
            { key: 'first', title: 'Stats' },
            { key: 'second', title: 'CM Info' },
        ],
    });
    const handleIndexChange = (index: any) => {
        setIndexData({
            index: index, routes: [
                { key: 'first', title: 'Stats' },
                { key: 'second', title: 'CM Info' },
            ],
        })
    }
    const renderTabBar = (props: any) => (
        <TabBar
            activeColor={TABBAR_COLOR}
            {...props}
            indicatorStyle={{ borderWidth: 2, borderColor: TABBAR_COLOR }}
            style={{ backgroundColor: PRIMARY_THEME_COLOR_DARK }} />
    );
    const FirstRoute = () => (
        <StatsView items={props?.CMdetail} />
    );
    const SecondRoute = () => (
        <CMInfoView items={props?.CMdetail} />
    );
    const renderScene = ({ index, route, }: any) => {
        switch (route.key) {
            case 'first':
                return <FirstRoute />;
            case 'second':
                return <SecondRoute />;
        }
    };
    return (
        <View style={styles.mainContainer}>
            <Header
                leftImageSrc={images.backArrow}
                rightSecondImageScr={images.notification}
                headerText={strings.CMDetails}
                headerStyle={styles.headerStyle}
                RightFirstIconStyle={styles.leftImageIconStyle}
                leftImageIconStyle={styles.leftImageIconStyle}
                handleOnLeftIconPress={props.handleBackPress}
                statusBarColor={PRIMARY_THEME_COLOR}
                barStyle={'light-content'}
            />
            <View style={styles.topItemVw}>
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => {
                        Linking?.openURL(
                            `tel:${props?.CMdetail?.mobile}`
                        )
                    }}
                >
                    <Text style={styles.buttonTxt}>Call</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => {
                        Linking?.openURL(
                            `sms:${props?.CMdetail?.mobile}`
                        )
                    }}
                >
                    <Text style={styles.buttonTxt}>SMS</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.propertyListView}>
                <TabView
                    renderTabBar={renderTabBar}
                    initialLayout={{ width: layout.width }}
                    navigationState={indexData}
                    renderScene={({ index, route }: any) => renderScene({ index, route })}
                    onIndexChange={handleIndexChange}
                />
            </View>
        </View>
    )
}
export default CMDetailsView