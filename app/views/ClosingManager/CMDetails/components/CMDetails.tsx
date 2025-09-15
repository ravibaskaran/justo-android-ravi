import React, { useState } from "react";
import {
  Linking,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from "react-native";
import { TabBar, TabView } from "react-native-tab-view";
import { useSelector } from "react-redux";
import images from "../../../../assets/images";
import Header from "../../../../components/Header";
import {
  PRIMARY_THEME_COLOR,
  PRIMARY_THEME_COLOR_DARK,
  ROLE_IDS,
  TABBAR_COLOR,
} from "../../../../components/utilities/constant";
import strings from "../../../../components/utilities/Localization";
import CMInfoView from "./CMInfo";
import StatsView from "./StatsViews";
import styles from "./styles";

const CMDetailsView = (props: any) => {
  const { userData = {} } = useSelector((state: any) => state.userData);
  const layout = useWindowDimensions();
  const [indexData, setIndexData] = useState({
    index: 0,
    routes: [
      { key: "first", title: "Stats" },
      {
        key: "second",
        title:
          userData?.data?.role_id === ROLE_IDS.clusterhead_id
            ? "CTL Info"
            : "CM Info",
      },
    ],
  });
  const handleIndexChange = (index: any) => {
    setIndexData({
      index: index,
      routes: [
        { key: "first", title: "Stats" },
        {
          key: "second",
          title:
            userData?.data?.role_id === ROLE_IDS.clusterhead_id
              ? "CTL Info"
              : "CM Info",
        },
      ],
    });
  };
  const renderTabBar = (props: any) => (
    <TabBar
      activeColor={TABBAR_COLOR}
      {...props}
      indicatorStyle={{ borderWidth: 2, borderColor: TABBAR_COLOR }}
      style={{ backgroundColor: PRIMARY_THEME_COLOR_DARK }}
    />
  );
  const FirstRoute = () => <StatsView items={props?.CMdetail} />;
  const SecondRoute = () => <CMInfoView items={props?.CMdetail} />;
  const renderScene = ({ route }: any) => {
    switch (route.key) {
      case "first":
        return (
          <View style={{ flex: 1 }}>
            <StatsView items={props.CMdetail} />
          </View>
        );
      case "second":
        return (
          <View style={{ flex: 1 }}>
            <CMInfoView items={props.CMdetail} />
          </View>
        );
      default:
        return null;
    }
  };

  return (
    <View style={styles.mainContainer}>
      <Header
        leftImageSrc={images.backArrow}
        rightSecondImageScr={images.notification}
        // headerText={strings.CMDetails}
        headerText={
          userData?.data?.role_id === ROLE_IDS.clusterhead_id
            ? strings.CTLDetails
            : strings.CMDetails
        }
        headerStyle={styles.headerStyle}
        RightFirstIconStyle={styles.leftImageIconStyle}
        leftImageIconStyle={styles.leftImageIconStyle}
        handleOnLeftIconPress={props.handleBackPress}
        statusBarColor={PRIMARY_THEME_COLOR}
        barStyle={"light-content"}
      />
      <View style={styles.topItemVw}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            Linking?.openURL(`tel:${props?.CMdetail?.mobile}`);
          }}
        >
          <Text style={styles.buttonTxt}>Call</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            Linking?.openURL(`sms:${props?.CMdetail?.mobile}`);
          }}
        >
          <Text style={styles.buttonTxt}>SMS</Text>
        </TouchableOpacity>
      </View>
      <View style={[styles.propertyListView, { flex: 1 }]}>
        <TabView
          style={{ flex: 1 }}
          renderTabBar={renderTabBar}
          initialLayout={{ width: layout.width }}
          navigationState={indexData}
          renderScene={renderScene}
          onIndexChange={handleIndexChange}
        />
      </View>
    </View>
  );
};
export default CMDetailsView;
