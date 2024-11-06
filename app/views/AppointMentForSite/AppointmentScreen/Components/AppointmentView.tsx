import {
  View,
  Text,
  StatusBar,
  useWindowDimensions,
  FlatList,
  BackHandler,
} from "react-native";
import React, { useEffect, useState } from "react";
import {
  DATE_FORMAT,
  PRIMARY_THEME_COLOR_DARK,
  TABBAR_COLOR,
} from "../../../../components/utilities/constant";
import Header from "../../../../components/Header";
import images from "../../../../assets/images";
import strings from "../../../../components/utilities/Localization";
import styles from "./Styles";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import FilterModal from "./AppointmentModal";
import Button from "../../../../components/Button";
import usePermission from "app/components/utilities/UserPermissions";
import { SceneMap, TabBar, TabView } from "react-native-tab-view";
import FirstRoute from "./FirstRoute";

const AppointmentView = (props: any) => {
  const loadingref = false;
  const navigation: any = useNavigation();
  const [FilterisVisible, setFilterisVisible] = useState(false);
  const [indexData, setIndexData] = useState({
    index: 0,
    routes: [
      { key: "first", title: strings.todayappointment },
      { key: "second", title: strings.allAppointmenr },
    ],
  });
  const layout = useWindowDimensions();

  useFocusEffect(
    React.useCallback(() => {
      props.setFilterData({
        appointment_with: "",
        status: "",
        start_date: "",
        end_date: "",
        customer_name: "",
        property_name: "",
      });
      if (indexData?.index === 0) {
        // Nested coditions for filter data with types
        if (props.type === "today") {
          props.getAppointmentList(0, props.todayAppointment);
        } else if (props.type === "followup") {
          props.getAppointmentList(0, {
            ...props.todayAppointment,
            status: 10,
          });
        } else {
          props.getAppointmentList(0, props.todayAppointment);
        }
      } else {
        props.getAppointmentList(0, {});
      }
      return () => {};
    }, [props.navigation, indexData, props.type])
  );

  useEffect(() => {
    const backAction = () => {
      if (indexData.index == 1) {
      setIndexData({
        index: 0,
        routes: [
          { key: "first", title: strings.todayappointment },
          { key: "second", title: strings.allAppointmenr },
        ],
      });
    }
      setTimeout(() => {
        props.navigation.goBack();
      }, 250);
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );

    return () => backHandler.remove();
  }, []);

  const onPressView = (item: any) => {
    navigation.navigate("AppointmentForSiteDetail", item);
  };
  const onPressAddNew = (type: any, item: any) => {
    if (type === "edit") {
      navigation.navigate("AddAppointmentForSite", { type, item });
    } else {
      navigation.navigate("AddAppointmentForSite");
    }
  };

  const { create, view, edit } = usePermission({
    view: "view_appointment _site_visite",
    edit: "edit_appointment _site_visite",
    create: "add_appointment _site_visite",
  });
  const renderTabBar = (props: any) => (
    <TabBar
      activeColor={TABBAR_COLOR}
      //inactiveColor={'#F4F4F4'}
      {...props}
      indicatorStyle={{ borderWidth: 2, borderColor: TABBAR_COLOR }}
      style={{ backgroundColor: PRIMARY_THEME_COLOR_DARK }}
    />
  );

  const handleIndexChange = (index: any) => {
    setIndexData({
      index: index,
      routes: [
        { key: "first", title: strings.todayappointment },
        { key: "second", title: strings.allAppointmenr },
      ],
    });
  };
  const renderScene = ({ index, route }: any) => {
    switch (route.key) {
      case "first":
        return (
          <FirstRoute
            siteAppointments={props.siteAppointments}
            onPressView={onPressView}
            onPressAddNew={onPressAddNew}
            setFilterData={props.setFilterData}
            getAppointmentList={props.getAppointmentList}
            setSiteAppointments={props.setSiteAppointments}
            offSET={props.offSET}
            todayAppointment={props.todayAppointment}
            moreData={props.moreData}
            keyType={route.key}
            settype={props.settype}
          />
        );
      case "second":
        return (
          <FirstRoute
            siteAppointments={props.siteAppointments}
            onPressView={onPressView}
            onPressAddNew={onPressAddNew}
            setFilterData={props.setFilterData}
            getAppointmentList={props.getAppointmentList}
            setSiteAppointments={props.setSiteAppointments}
            offSET={props.offSET}
            todayAppointment={props.todayAppointment}
            moreData={props.moreData}
            keyType={route.key}
            settype={props.settype}
          />
        );
      default:
        return null;
    }
  };

  const onPressResetFilter = () => {
    props.settype("");
    if (indexData.index === 0) {
      props.getAppointmentList(0, props.todayAppointment);
    } else {
      props.getAppointmentList(0, {});
    }
  };

  const handleDrawerPress = () => {
    if (indexData.index == 1) {
    setIndexData({
      index: 0,
      routes: [
        { key: "first", title: strings.todayappointment },
        { key: "second", title: strings.allAppointmenr },
      ],
    });
  }
    setTimeout(() => {
      props.navigation.toggleDrawer();
    }, 250);
  };

  return (
    <View style={styles.mainContainer}>
      <Header
        leftImageSrc={images.menu}
        rightFirstImageScr={indexData?.index === 1 ? images.filter : ""}
        rightSecondImageScr={images.notification}
        headerText={strings.appointmentVisitHeader}
        handleOnLeftIconPress={handleDrawerPress}
        headerStyle={styles.headerStyle}
        RightFirstIconStyle={styles.RightFirstIconStyle}
        handleOnRightFirstIconPress={() => setFilterisVisible(true)}
      />
      <View
        style={{
          marginVertical: 10,
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <Button
          width={150}
          height={30}
          buttonText={strings.resetFilter}
          btnTxtsize={14}
          handleBtnPress={() => onPressResetFilter()}
        />
        {create && (
          <Button
            width={170}
            height={30}
            buttonText={strings.addNewappointment}
            btnTxtsize={12}
            handleBtnPress={() => onPressAddNew(null, {})}
          />
        )}
      </View>
      <View style={styles.listView}>
        <TabView
          renderTabBar={renderTabBar}
          navigationState={indexData}
          renderScene={({ index, route }: any) => renderScene({ index, route })}
          onIndexChange={handleIndexChange}
          initialLayout={{ width: layout.width }}
        />
      </View>
      <FilterModal
        setFilterData={props.setFilterData}
        filterData={props.filterData}
        Visible={FilterisVisible}
        getAppointmentList={props.getAppointmentList}
        setIsVisible={setFilterisVisible}
        onReset={() => {
          props.setFilterData({
            appointment_with: "",
            status: "",
            start_date: "",
            end_date: "",
            customer_name: "",
            property_name: "",
          });
          props.getAppointmentList(0, {});
          props.setSiteAppointments([]);
          setFilterisVisible(false);
        }}
        setSiteAppointments={props.setSiteAppointments}
      />
    </View>
  );
};

export default AppointmentView;
