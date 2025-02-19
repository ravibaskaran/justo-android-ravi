import { useFocusEffect } from "@react-navigation/native";
import { Text } from "@rneui/base";
import { normalize, normalizeSpacing } from "app/components/scaleFontSize";
import {
  PRIMARY_THEME_COLOR_DARK,
  WHITE_COLOR,
} from "app/components/utilities/constant";
import { AddDropLocation } from "app/Redux/Actions/AppointmentCLAction";
import React, { useState } from "react";
import { View } from "react-native";
import { useDispatch } from "react-redux";
import images from "../../../../assets/images";
import Header from "../../../../components/Header";
import strings from "../../../../components/utilities/Localization";
import AllocateModal from "./AllocateModal";
import DropLocationModal from "./DropLocationModal";
import RouteScreen from "./RouteScreen";
import styles from "./styles";

const AppointmentsForReport = (props: any) => {
  const [locationModel, setLocationModel] = useState(false);
  const [allocateModel, setAllocateModel] = useState(false);
  const [dropLocation, setDropLocation] = useState({});
  const [appointmentid, setappointmentid] = useState("");
  const dispatch: any = useDispatch();
  useFocusEffect(
    React.useCallback(() => {
      getAppointmentList(0);
      return () => {};
    }, [props.navigation, props.params])
  );

  const getAppointmentList = (offset: any) => {
    props.getAppointmentList(offset, {
      start_date: props.params.sDate,
      end_date: props.params.eDate,
      status: props.params.routeName == "Site Visit Created" ? "" : 11,
    });
  };

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
  return (
    <View style={styles.mainContainer}>
      <Header
        leftImageSrc={images.backArrow}
        headerText={strings.appointmentHeader}
        rightSecondImageScr={images.notification}
        RightFirstIconStyle={styles.RightFirstIconStyle}
        handleOnLeftIconPress={props.handleDrawerPress}
        leftImageIconStyle={styles.RightFirstIconStyle}
        headerStyle={styles.headerStyle}
        handleOnRightFirstIconPress={() => props.setFilterisVisible(true)}
      />

      <View style={styles.listView}>
        <Text
          style={{
            textAlign: "center",
            fontSize: normalize(14),
            borderBottomWidth: 2,
            borderBottomColor: "yellow",
            color: WHITE_COLOR,
            padding: normalizeSpacing(10),
            backgroundColor: PRIMARY_THEME_COLOR_DARK,
          }}
        >
          {props.params.routeName}
        </Text>
        <RouteScreen
          DATA={props.DATA}
          onPressView={props.onPressView}
          setappointmentid={setappointmentid}
          setAllocateModel={setAllocateModel}
          setLocationModel={setLocationModel}
          setAllocatedCM={props.setAllocatedCM}
          allocatedCM={props.allocatedCM}
          getAppointmentList={getAppointmentList}
          setFilterData={props.setFilterData}
          filterData={props.filterData}
          setAppointmentList={props.setAppointmentList}
          moreData={props.moreData}
          offSET={props.offSET}
          todayAppointment={props.todayAppointment}
          keyType={""}
          settype={props.settype}
          index={1}
          getCMList={props.getCMList}
        />
      </View>

      <AllocateModal
        Visible={allocateModel}
        setIsVisible={() => setAllocateModel(false)}
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
export default AppointmentsForReport;
