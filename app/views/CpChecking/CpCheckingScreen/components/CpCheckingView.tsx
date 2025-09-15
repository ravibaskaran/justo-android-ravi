import React, { useEffect, useState } from "react";
import { useWindowDimensions, View } from "react-native";
import { TabBar, TabView } from "react-native-tab-view";
import images from "../../../../assets/images";
import Button from "../../../../components/Button";
import Header from "../../../../components/Header";
import { PRIMARY_THEME_COLOR, PRIMARY_THEME_COLOR_DARK, TABBAR_COLOR } from "../../../../components/utilities/constant";
import strings from "../../../../components/utilities/Localization";
import RouteScreen from "./RouteScreen";
import styles from "./styles";

const CpCheckingView = (props: any) => {
  const loadingref = false
  const layout = useWindowDimensions();




  const [indexData, setIndexData] = useState({
    index: 0,
    routes: [
      { key: "first", title: strings.todaycpcheking },
      { key: "second", title: strings.allcpcheking },
    ],
  });
  useEffect(() => {
    if (indexData.index === 0) {
      props.handleGetCpCheckingList(props.todayAppointment)
    } else {
      props.handleGetCpCheckingList()
    }
  }, [indexData])

  const handleIndexChange = (index: any) => {
    setIndexData({
      index: index, routes: [
        { key: "first", title: strings.todaycpcheking },
        { key: "second", title: strings.allcpcheking },
      ],
    })
  }



  const renderScene = ({ index, route, }: any) => {
    switch (route.key) {
      case 'first':
        return <RouteScreen
          cpCheckingList={props.cpCheckingList}
          handleGetCpCheckingList={props.handleGetCpCheckingList}
          todayAppointment={props.todayAppointment}
          keyName={route.key}
        />
      case 'second':
        return <RouteScreen
          cpCheckingList={props.cpCheckingList}
          handleGetCpCheckingList={props.handleGetCpCheckingList}
          todayAppointment={props.todayAppointment}
          keyName={route.key}
        />
    }
  };

  const renderTabBar = (props: any) => (
    <TabBar
      activeColor={TABBAR_COLOR}
      //inactiveColor={'#F4F4F4'}
      {...props}
      indicatorStyle={{ borderWidth: 2, borderColor: TABBAR_COLOR }}
      style={{ backgroundColor: PRIMARY_THEME_COLOR_DARK }}
    />
  );
  return (
    <View style={styles.mainContainer}>
      <Header
        leftImageSrc={images.menu}
        // rightFirstImageScr={images.filter}
        rightSecondImageScr={images.notification}
        headerText={strings.cpChecking}
        handleOnLeftIconPress={props.handleDrawerPress}
        headerStyle={styles.headerStyle}
        RightFirstIconStyle={styles.RightFirstIconStyle}
        statusBarColor={PRIMARY_THEME_COLOR}
        barStyle={"light-content"}
      />
      <View style={{ alignItems: "flex-end", paddingVertical: 6 }}>
        <Button
          height={30}
          width={120}
          buttonText={strings.scanQrCode}
          textTransform={null}
          btnTxtsize={15}
          handleBtnPress={() => props.handleScanQr()}
        />
      </View>
      <TabView
        renderTabBar={renderTabBar}
        navigationState={indexData}
        renderScene={({ index, route }: any) => renderScene({ index, route })}
        onIndexChange={handleIndexChange}
        initialLayout={{ width: layout.width }}
      />
    </View>
  );
};

export default CpCheckingView;
