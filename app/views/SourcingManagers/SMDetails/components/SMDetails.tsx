import React, { useEffect, useState } from "react";
import {
  Linking,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  View
} from "react-native";
import { TabBar, TabView } from "react-native-tab-view";
import { useSelector } from "react-redux";
import images from "../../../../assets/images";
import Button from "../../../../components/Button";
import Header from "../../../../components/Header";
import {
  PRIMARY_THEME_COLOR,
  PRIMARY_THEME_COLOR_DARK,
  ROLE_IDS,
  TABBAR_COLOR,
} from "../../../../components/utilities/constant";
import strings from "../../../../components/utilities/Localization";
import usePermission from "../../../../components/utilities/UserPermissions";
import SmInfoView from "./SMInfo";
import StatsView from "./StatsViews";
import styles from "./styles";

const SMDetailsView = (props: any) => {
  const { userData = {} } = useSelector((state: any) => state.userData);
  const [SMdetail, setSMdetail] = useState<any>([]);
  const { response = {}, detail = "" } = useSelector(
    (state: any) => state.SourcingManager
  );
  const [indexData, setIndexData] = useState({
    index: 0,
    routes: [
      { key: "first", title: "Stats" },
      {
        key: "second",
        title:
          userData?.data?.role_id === ROLE_IDS.clusterhead_id
            ? "STL Info"
            : "SM Info",
      },
    ],
  });
  useEffect(() => {
    if (response && response?.status === 200) {
      if (response?.data?.length > 0) {
        setSMdetail(response?.data[0] ? response?.data[0] : []);
      }
    } else {
      setSMdetail([]);
      //errorToast(response.message);
    }
  }, [response]);

  const layout = useWindowDimensions();

  const handleIndexChange = (index: any) => {
    setIndexData({
      index: index,
      routes: [
        { key: "first", title: "Stats" },
        {
          key: "second",
          title:
            userData?.data?.role_id === ROLE_IDS.clusterhead_id
              ? "STL Info"
              : "SM Info",
        },
      ],
    });
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
  const FirstRoute = () => (
    <StatsView
      items={SMdetail}
      handleCpAllocation={props.handleCpAllocationPress}
    />
  );

  const SecondRoute = () => (
    <SmInfoView
      items={SMdetail}
      handleCpAllocation={props.handleCpAllocationPress}
    />
  );
  const renderScene = ({ index, route }: any) => {
    switch (route.key) {
      case "first":
        return <FirstRoute />;
      case "second":
        return <SecondRoute />;
    }
  };
  const { allocate } = usePermission({
    allocate: "allocate_cp",
  });
  return (
    <View style={styles.mainContainer}>
      <Header
        leftImageSrc={images.backArrow}
        rightSecondImageScr={images.notification}
        headerText={
          userData?.data?.role_id === ROLE_IDS.clusterhead_id
            ? strings.STLDetails
            : strings.SMDetails
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
            Linking?.openURL(`tel:${SMdetail?.mobile}`);
          }}
        >
          <Text style={styles.buttonTxt}>Call</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            Linking?.openURL(`sms:${SMdetail?.mobile}`);
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
      {allocate && (
        <View style={{ marginVertical: 12, alignItems: "center" }}>
          <Button
            width={150}
            height={40}
            btnTxtsize={16}
            textTransform={null}
            buttonText={strings.cpAllocation}
            handleBtnPress={() => props.handleCpAllocationPress(SMdetail)}
          />
        </View>
      )}
    </View>
  );
};
export default SMDetailsView;
