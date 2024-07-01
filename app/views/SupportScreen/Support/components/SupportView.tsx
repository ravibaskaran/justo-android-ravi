import { View, Text, useWindowDimensions, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import styles from './styles'
import Header from 'app/components/Header'
import images from 'app/assets/images'
import strings from 'app/components/utilities/Localization'
import { PRIMARY_THEME_COLOR, PRIMARY_THEME_COLOR_DARK, TABBAR_COLOR } from 'app/components/utilities/constant'
import Button from 'app/components/Button'
import { SceneMap, TabBar, TabView } from 'react-native-tab-view'
import EmptyListScreen from 'app/components/CommonScreen/EmptyListScreen'
import SupportItem from './SupportItem'
import { useFocusEffect, useNavigation } from '@react-navigation/native'
import RouteScreen from './RouteScreen'

const SupportView = (props: any) => {
    const layout = useWindowDimensions();
    const navigation: any = useNavigation()
    const [indexData, setIndexData] = useState({
        index: 0,
        routes: [
            { key: "first", title: strings.supportrequest },
            { key: "second", title: strings.myticket },
        ],
    });
    const handleIndexChange = (index: any) => {
        setIndexData({
            index: index, routes: [
                { key: "first", title: strings.supportrequest },
                { key: "second", title: strings.myticket },
            ],
        })
    }
    useFocusEffect(
        React.useCallback(() => {
            if (indexData?.index === 0) {
                props.setTicketList([])
                props.TicketList(0, { type: 2 });
            } else {
                props.setTicketList([])
                props.TicketList(0, { type: 1 });
            }
            return () => { };
        }, [props.navigation, indexData])
    );

    const onPressView = (data: any) => {
        navigation.navigate('SupportScreenDetails', { ticketid: data, type: indexData?.index })
    }

    const renderTabBar = (props: any) => (
        <TabBar
            activeColor={TABBAR_COLOR}
            //inactiveColor={'#F4F4F4'}
            {...props}
            indicatorStyle={{ borderWidth: 2, borderColor: TABBAR_COLOR }}
            style={{ backgroundColor: PRIMARY_THEME_COLOR_DARK }}
        />
    );
    const FirstRoute = () => (
        <FlatList
            data={Array.isArray(props.ticketList) ? props.ticketList : []}
            renderItem={({ item }) => (
                <SupportItem
                    items={item}
                    index={indexData?.index}
                    onPressView={onPressView}
                    onPressStatusUpdate={props.onPressStatusUpdate}
                    onPressEscalate={props.onPressEscalate}
                />
            )}
            ListEmptyComponent={
                <EmptyListScreen message={strings.supportrequest} />
            }
            onRefresh={() => {
                props.setFilterData({
                    start_date: "",
                    end_date: "",
                    customer_name: "",
                    status: "",
                });
                props.TicketList(0, { type: 2 });
            }}
            onEndReached={() => {
                if (indexData?.index === 0) {
                    if (props.ticketList?.length < props.totalData) {
                        props.TicketList(
                            props.ticketList?.length > 2 ? props.offSET + 1 : 0,
                            { type: 2 }
                        );
                    }
                }
            }}
            refreshing={false}
        />
    );

    const SecondRoute = () => (
        <FlatList
            data={Array.isArray(props.ticketList) ? props.ticketList : []}
            renderItem={({ item }) => (
                <SupportItem
                    items={item} index={indexData?.index}
                    onPressView={onPressView}
                    handleEditTicket={props.handleEditTicket}
                />
            )}
            ListEmptyComponent={
                <EmptyListScreen message={strings.myticket} />
            }
            onRefresh={() => {
                props.setFilterData({
                    start_date: "",
                    end_date: "",
                    customer_name: "",
                    status: "",
                });
                props.TicketList(0, { type: 1 });
            }}
            onEndReached={() => {
                if (indexData?.index === 1) {
                    if (props.ticketList?.length < props.totalData) {
                        props.TicketList(
                            props.ticketList?.length > 2 ? props.offSET + 1 : 0,
                            { type: 1 }
                        );
                    }
                }
            }}
            refreshing={false}
        />
    );
    const renderScene = ({ index, route, }: any) => {
        switch (route.key) {
            case 'first':
                return <RouteScreen
                    ticketList={props.ticketList}
                    indexData={indexData}
                    onPressView={onPressView}
                    handleEditTicket={props.handleEditTicket}
                    setFilterData={props.setFilterData}
                    TicketList={props.TicketList}
                    totalData={props.totalData}
                    offSET={props.offSET}
                    keyType={route.key}
                    onPressStatusUpdate={props.onPressStatusUpdate}
                    onPressEscalate={props.onPressEscalate}
                />;;
            case 'second':
                return <RouteScreen
                    ticketList={props.ticketList}
                    indexData={indexData}
                    onPressView={onPressView}
                    handleEditTicket={props.handleEditTicket}
                    setFilterData={props.setFilterData}
                    TicketList={props.TicketList}
                    totalData={props.totalData}
                    offSET={props.offSET}
                    keyType={route.key}
                    onPressStatusUpdate={props.onPressStatusUpdate}
                    onPressEscalate={props.onPressEscalate}
                />;
        }
    };
    return (
        <View style={styles.mainContainer}>
            <Header
                leftImageSrc={images.menu}
                // rightFirstImageScr={images.filter}
                rightSecondImageScr={images.notification}
                headerText={strings.supportHeader}
                handleOnLeftIconPress={props.handleDrawerPress}
                headerStyle={styles.headerStyle}
                RightFirstIconStyle={styles.RightFirstIconStyle}
                statusBarColor={PRIMARY_THEME_COLOR}
                barStyle={'light-content'}
            />
            <View style={{ marginVertical: 10, alignItems: "flex-end" }}>
                <Button
                    width={150}
                    height={30}
                    buttonText={strings.addticket}
                    btnTxtsize={14}
                    handleBtnPress={() => props.handleAddTicket()}
                />
            </View>
            <View style={{ flex: 1 }}>
                <TabView
                    renderTabBar={renderTabBar}
                    initialLayout={{ width: layout.width }}
                    navigationState={indexData}
                    renderScene={({ index, route }: any) => renderScene({ index, route })}
                    onIndexChange={handleIndexChange}
                />
            </View>
        </View >
    )
}

export default SupportView