import Geolocation from "@react-native-community/geolocation";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import EmptyListScreen from "app/components/CommonScreen/EmptyListScreen";
import ErrorMessage from "app/components/ErrorMessage";
import {
  RemoveAppointment,
  updateUserAppointmentStatus,
} from "app/Redux/Actions/AppiontmentWithUserActions";
import React, { useEffect, useState } from "react";
import { FlatList, Text, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import images from "../../../../assets/images";
import Header from "../../../../components/Header";
import {
  GREEN_COLOR,
  PRIMARY_THEME_COLOR,
} from "../../../../components/utilities/constant";
import strings from "../../../../components/utilities/Localization";
import AppointmentModal from "./AppointmentModal";
import MyAppointment from "./MyAppointment";
import styles from "./Styles";

const CPAppointmentsForReport = (props: any) => {
  const dispatch: any = useDispatch();
  const loadingref = false;
  const { userData = {} } = useSelector((state: any) => state.userData);
  const roleId = userData?.data?.role_id || "";
  const navigation: any = useNavigation();

  const userEditAppointmentData = useSelector(
    (state: any) => state.userEditAppointmentData
  );

  const [isVisible, setIsVisible] = useState<any>(false);
  const [lat, setLat] = useState<any>("");
  const [long, setLong] = useState<any>("");
  const [params, setParams] = useState<any>({
    appointment_id: "",
    appointment_status: "",
    remark: "",
    latitude: "",
    longitude: "",
  });
  useEffect(() => {
    if (userEditAppointmentData?.response?.status === 200) {
      dispatch(RemoveAppointment());
      // navigation.goBack()
      ErrorMessage({
        msg: userEditAppointmentData?.response?.message,
        backgroundColor: GREEN_COLOR,
      });
    }
  }, [userEditAppointmentData]);

  useEffect(() => {
    Geolocation.getCurrentPosition(
      //Will give you the current location
      (position) => {
        //getting the Longitude from the location json
        const currentLongitude = JSON.stringify(position.coords.longitude);
        setLong(currentLongitude);

        //getting the Latitude from the location json
        const currentLatitude = JSON.stringify(position.coords.latitude);
        setLat(currentLatitude);
      }
    );
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      getCPAppointmentList();
      return () => {};
    }, [props.navigation, props.route, userEditAppointmentData])
  );

  const getCPAppointmentList = () => {
    props.getAppointmentList(2, {
      start_date: props?.route?.params.sDate,
      end_date: props?.route?.params.eDate,
    });
  };

  const handleOptionPress = (id: any, status: any) => {
    console.log("status: ", status);
    setParams({
      ...params,
      appointment_id: id,
      appointment_status: status,
      latitude: status === 3 ? lat : "",
      longitude: status === 3 ? long : "",
      remark: "",
    });

    setIsVisible(true);
  };
  const handleOnPressYesInModal = () => {
    dispatch(updateUserAppointmentStatus(params));
    setIsVisible(false);
  };

  const onPressView = (items: any) => {
    navigation.navigate("AppointmentDetails", items);
  };
  const onPressEdit = (items: any) => {
    navigation.navigate("AddAppointmentScreen", {
      data: items,
      type: strings.edit,
    });
  };

  return (
    <View style={styles.mainContainer}>
      <Header
        leftImageSrc={images.backArrow}
        leftImageIconStyle={styles.RightFirstIconStyle}
        rightSecondImageScr={images.notification}
        headerText={strings.appointmentWithCPHeader}
        handleOnLeftIconPress={props.handleDrawerPress}
        headerStyle={styles.headerStyle}
        barStyle={"light-content"}
        statusBarColor={PRIMARY_THEME_COLOR}
      />

      <View>
        <Text style={styles.count}>
          Count :{" "}
          {props.appointmentList?.length ? props.appointmentList?.length : 0}
        </Text>

        <FlatList
          data={props.appointmentList}
          renderItem={({ item }) => (
            <MyAppointment
              items={item}
              onPressView={(items: any) => onPressView(item)}
              onPressEdit={(items: any) => onPressEdit(item)}
              handleOptionPress={handleOptionPress}
              roleId={roleId}
            />
          )}
          ListEmptyComponent={<EmptyListScreen message={"Appointment"} />}
          onRefresh={() => {
            getCPAppointmentList();
          }}
          refreshing={loadingref}
        />
      </View>

      <AppointmentModal
        Visible={isVisible}
        setIsVisible={setIsVisible}
        params={params}
        setParams={setParams}
        type={"appWith"}
        setFilterData={props.setFilterData}
        filterData={props.filterData}
        handleOnPressYesInModal={handleOnPressYesInModal}
      />
    </View>
  );
};

export default CPAppointmentsForReport;
