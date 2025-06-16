import React, { useEffect, useState } from "react";
import { BackHandler, View, useWindowDimensions } from "react-native";
import images from "../../../../assets/images";
import Header from "../../../../components/Header";
import strings from "../../../../components/utilities/Localization";
import styles from "./styles";
import Button from "../../../../components/Button";
import AllocateModal from "./AllocateModal";
import DropLocationModal from "./DropLocationModal";
import { useDispatch } from "react-redux";
import { AddDropLocation } from "app/Redux/Actions/AppointmentCLAction";
import AppointmentFilterModal from "./AppointmentFilterModal ";
import usePermission from "app/components/utilities/UserPermissions";
import { TabBar, TabView } from "react-native-tab-view";
import {
  PRIMARY_THEME_COLOR_DARK,
  TABBAR_COLOR,
} from "app/components/utilities/constant";
import { useFocusEffect } from "@react-navigation/native";
import RouteScreen from "./RouteScreen";
import { START_LOADING } from "app/Redux/types";

const AppointmentListView = (props: any) => {
  const [locationModel, setLocationModel] = useState(false);
  const [allocateModel, setAllocateModel] = useState(false);
  const [dropLocation, setDropLocation] = useState({});
  const [appointmentid, setappointmentid] = useState("");
  const dispatch: any = useDispatch();
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
      setTimeout(() => {
        if (indexData?.index === 0) {
          // Nested coditions for filter data with types
          if (props.type === "todayComplete") {
            props.getAppointmentList(0, {
              ...props.todayAppointment,
              status: 3,
            });
          } else if (props.type === "followup") {
            props.getAppointmentList(0, {
              ...props.todayAppointment,
              status: 10,
            });
          } else if (props.type === "today") {
            props.getAppointmentList(0, props.todayAppointment);
          } else {
            props.getAppointmentList(0, props.todayAppointment);
          }
        } else {
          props.getAppointmentList(0, {});
        }
      }, 100);

      return () => {};
    }, [props.navigation, indexData, props.getLoginType, props.type])
  );

  useEffect(() => {
    props?.setIsTodayAppointment(indexData.index === 0);
  }, [indexData]);

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
      }, 150);
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );

    return () => backHandler.remove();
  }, []);

  const handleDropLocation = (data: any) => {
    if (appointmentid) {
      dispatch(
        AddDropLocation({
          appointment_id: appointmentid,
          drop_off_location: dropLocation,
        })
      );
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
    }, 150);
  };
  const { status } = usePermission({
    status: "scan_qr",
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
    props.setFilterData({
      start_date: "",
      end_date: "",
      customer_name: "",
      customer_number: "",
      status: "",
      property_name: "",
    });
  };

  const handleResetFilter = () => {
    props.settype("");
    if (indexData?.index === 0) {
      props.getAppointmentList(0, props.todayAppointment);
    } else {
      props.getAppointmentList(0, {});
    }
  };

  const renderScene = ({ index, route }: any) => {
    switch (route.key) {
      case "first":
        return (
          <RouteScreen
            DATA={props.DATA}
            onPressView={props.onPressView}
            setappointmentid={setappointmentid}
            setAllocateModel={setAllocateModel}
            setLocationModel={setLocationModel}
            setAllocatedCM={props.setAllocatedCM}
            allocatedCM={props.allocatedCM}
            getAppointmentList={props.getAppointmentList}
            setFilterData={props.setFilterData}
            filterData={props.filterData}
            setAppointmentList={props.setAppointmentList}
            moreData={props.moreData}
            offSET={props.offSET}
            todayAppointment={props.todayAppointment}
            keyType={route.key}
            settype={props.settype}
            index={indexData?.index}
            getCMList={props.getCMList}
          />
        );
      case "second":
        return (
          <RouteScreen
            DATA={props.DATA}
            onPressView={props.onPressView}
            setappointmentid={setappointmentid}
            setAllocateModel={setAllocateModel}
            setLocationModel={setLocationModel}
            setAllocatedCM={props.setAllocatedCM}
            allocatedCM={props.allocatedCM}
            getAppointmentList={props.getAppointmentList}
            setFilterData={props.setFilterData}
            filterData={props.filterData}
            setAppointmentList={props.setAppointmentList}
            moreData={props.moreData}
            offSET={props.offSET}
            todayAppointment={props.todayAppointment}
            keyType={route.key}
            settype={props.settype}
            index={indexData?.index}
            getCMList={props.getCMList}
          />
        );
    }
  };

  return (
    <View style={styles.mainContainer}>
      <Header
        leftImageSrc={images.menu}
        headerText={strings.appointmentHeader}
        rightSecondImageScr={images.notification}
        rightFirstImageScr={indexData?.index === 1 ? images.filter : ""}
        RightFirstIconStyle={styles.RightFirstIconStyle}
        handleOnLeftIconPress={handleDrawerPress}
        headerStyle={styles.headerStyle}
        handleOnRightFirstIconPress={() => props.setFilterisVisible(true)}
      />
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          paddingVertical: 10,
        }}
      >
        <Button
          height={30}
          width={120}
          buttonText={strings.resetFilter}
          capitalize={true}
          textTransform={null}
          btnTxtsize={15}
          handleBtnPress={() => handleResetFilter()}
        />
        {status && (
          <Button
            height={30}
            width={120}
            buttonText={strings.scanQrCode}
            capitalize={true}
            textTransform={null}
            btnTxtsize={15}
            handleBtnPress={() => props.handleScanQr()}
          />
        )}
      </View>
      <View style={styles.listView}>
        <TabView
          key={JSON.stringify(indexData.routes)}
          renderTabBar={renderTabBar}
          navigationState={indexData}
          renderScene={({ index, route }: any) => renderScene({ index, route })}
          onIndexChange={(index) => {
            dispatch({ type: START_LOADING });
            setTimeout(() => {
              handleIndexChange(index);
            }, 50);
          }}
          initialLayout={{ width: layout.width }}
        />
      </View>
      <AppointmentFilterModal
        Visible={props.filterisVisible}
        setIsVisible={props.setFilterisVisible}
        filterData={props.filterData}
        setFilterData={props.setFilterData}
        getAppointmentList={props.getAppointmentList}
        setAppointmentList={props.setAppointmentList}
        onPressApply={(type: string) => {
          if (type == "reset") handleResetFilter();
        }}
      />
      <AllocateModal
        Visible={allocateModel}
        setIsVisible={() => setAllocateModel(false)}
        // getCMList={props.getCMList}
        ClosingMList={props.ClosingMList}
        setAllocatedCM={props.setAllocatedCM}
        allocatedCM={props.allocatedCM}
        handleAllocateCM={props.handleAllocateCM}
      />
      <DropLocationModal
        Visible={locationModel}
        setIsVisible={() => setLocationModel(false)}
        setDropLocation={setDropLocation}
        handleDropLocation={handleDropLocation}
      />
    </View>
  );
};
export default AppointmentListView;
