import { useFocusEffect } from "@react-navigation/native";
import apiEndPoints from "../../../components/utilities/apiEndPoints";
import { apiCall } from "../../../components/utilities/httpClient";
import { appointmentSVBackSubject } from "../../../observables/backNavigationSubject";
import React, { useEffect, useState } from "react";
import { BackHandler } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import AppointmentDetailsView from "./Components/AppointmentDetailsView";

const AppointmentDetails = ({ navigation, route }: any) => {
  const data = route?.params || {};
  const [appointMentDetail, setAppointMentDetail] = useState<any>({});
  const dispatch: any = useDispatch();
  const { response = {}, detail = "" } = useSelector(
    (state: any) => state.appointment
  );

  const getUserDetails = async () => {
    // dispatch(getAppointmentDetail({
    //   appointment_id: data?._id ? data?._id : ''
    // }))
    const res = await apiCall("post", apiEndPoints.GET_APPOINTMENT_DETAILS, {
      appointment_id: data?._id,
    });
    setAppointMentDetail(res?.data?.data[0]);
  };

  useFocusEffect(
    React.useCallback(() => {
      getUserDetails();
      return () => {};
    }, [navigation])
  );

  useEffect(() => {
    const backAction = () => {
      navigation.goBack();
      appointmentSVBackSubject.next(true);
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );

    return () => backHandler.remove();
  }, []);

  // useEffect(() => {
  //   if (response?.status === 200) {
  //     setAppointMentDetail({ ...response?.data[0] })
  //   }else {
  //     setAppointMentDetail({})
  //   }
  // }, [response])
  const handleBackPress = () => {
    navigation.goBack();
    appointmentSVBackSubject.next(true);
  };
  const handleStatusUpdate = () => {
    navigation.navigate("AppointmentAddS", appointMentDetail);
  };
  return (
    <AppointmentDetailsView
      handleStatusUpdate={handleStatusUpdate}
      handleBackPress={handleBackPress}
      appointMentDetail={appointMentDetail}
    />
  );
};

export default AppointmentDetails;
