import { View, Text, Alert, BackHandler } from "react-native";
import React, { useEffect, useState } from "react";
import AppointmentDetailsView from "./Components/AppointmentDetailsView";
import { useFocusEffect } from "@react-navigation/native";
import { getAppointmentDetail } from "app/Redux/Actions/AppointmentWithCpActions";
import { useDispatch, useSelector } from "react-redux";
import {
  AddBooking,
  removeAddBookingData,
} from "app/Redux/Actions/AppointmentCLAction";
import ErrorMessage from "app/components/ErrorMessage";
import { GREEN_COLOR } from "app/components/utilities/constant";
import { removeEditUser } from "app/Redux/Actions/AppointmentWithCpActions";
import { apiCall } from "app/components/utilities/httpClient";
import apiEndPoints from "app/components/utilities/apiEndPoints";

const AppointmentDetails = ({ navigation, route }: any) => {
  const data = route?.params || {};
  const [BookingData, setBookingData] = useState<any>({});
  const [detailsData, setDetailsData] = useState<any>([]);
  const [okIsVisible, setOkIsVisible] = useState(false);
  const [okBookingIsVisible, setOkBookingIsVisible] = useState(false);
  const [errorMessage, seterrorMessage] = useState(false);
  const dispatch: any = useDispatch();
  const { response = {}, detail = "" } = useSelector(
    (state: any) => state.appointment
  );
  const masterRemove = useSelector((state: any) => state.masterRemove);
  const closeAppointment = useSelector(
    (state: any) => state.editAddAppointment
  );
  const addedBookingData =
    useSelector((state: any) => state.addedBooking) || {};

  useFocusEffect(
    React.useCallback(() => {
      dispatch(
        getAppointmentDetail({
          appointment_id: data?._id,
        })
      );
      return () => {};
    }, [navigation])
  );

  const getDetail = async () => {
    const res = await apiCall("post", apiEndPoints.GET_APPOINTMENT_DETAILS, {
      appointment_id: data?._id,
    });
    setDetailsData(res?.data?.data);
  };
  useFocusEffect(
    React.useCallback(() => {
      getDetail();
      return () => {};
    }, [navigation, masterRemove])
  );

  // useEffect(() => {
  //   setBookingData({
  //     lead_id: data?.lead_id,
  //     property_id: data?.property_id,
  //     customer_id: data?.customer_id
  //   })
  // }, [data])

  useEffect(() => {
    if (addedBookingData?.response?.status === 200) {
      dispatch(removeAddBookingData());
      ErrorMessage({
        msg: addedBookingData?.response?.message,
        backgroundColor: GREEN_COLOR,
      });
      // navigation.navigate("BookingList", { type: "readyToBook" });
      setOkBookingIsVisible(true);
    } else if (closeAppointment?.response?.status === 200) {
      dispatch(removeEditUser());
      ErrorMessage({
        msg: closeAppointment?.response?.message,
        backgroundColor: GREEN_COLOR,
      });
      getDetail();
      // navigation.navigate("BookingList", { type: "readyToBook" });
    }
  }, [addedBookingData, closeAppointment]);

  useEffect(() => {
    const backAction = () => {
      navigation.goBack();
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );

    return () => backHandler.remove();
  }, []);

  const handleBackPress = () => {
    navigation.goBack();
  };
  const handleVistorUpdate = (data: any) => {
    navigation.navigate("VisitorUpdate", data);
  };
  const validation = () => {
    let isError = false;
    let errorMessage: any = "";
    const getBookingData = {
      ...detailsData[0],
      appointment_id: detailsData[0]?._id,
    };
    if (
      getBookingData?.jw_project_id == undefined ||
      getBookingData?.jw_project_id == ""
    ) {
      isError = true;
      errorMessage =
        "JW Property Id not map with this Property. Contact with JV admin for map this.";
    } else if (
      getBookingData?.crm_person_email == undefined ||
      getBookingData?.crm_person_email == ""
    ) {
      isError = true;
      errorMessage =
        "JW Person Id not map with this Property. Contact with JV admin for map this.";
    } else if (
      getBookingData?.lead_score < 70
      // getBookingData?.lead_score
    ) {
      isError = true;
      errorMessage = "Visitor score is <70 please update visitor information";
    }
    setOkIsVisible(isError);
    seterrorMessage(errorMessage);
    return isError;
  };
  const onPressBookNow = () => {
    const getBookingData = {
      ...detailsData[0],
      appointment_id: detailsData[0]?._id,
    };
    if (!validation()) {
      navigation.navigate("Booking", { getBookingData: getBookingData });
    }
  };

  const onPressFollowUp = () => {
    data.fromAppointmentPage = true;
    navigation.navigate("FollUpAdd", data);
  };

  const handleViewFollowUp = (data: any) => {
    navigation.navigate("AllFollowUpScreen", data);
  };
  const handleUpdateStatus = (data: any) => {
    navigation.navigate("AddAppointmentForSite", {
      item: detailsData[0],
      type: "reSheduled",
    });
  };
  const handleBooking = (data: any) => {
    dispatch(
      AddBooking({
        ...BookingData,
        booking_status: 1,
        appointment_id: data?._id,
        lead_id: data?.lead_id,
        property_id: data?.property_id,
        customer_id: data?.customer_id,
      })
    );
  };
  const handleStatusUpdate = (data: any) => {
    navigation.navigate("AppointmentAddS", data);
  };
  const handleNotInterestedPress = (data: any) => {
    navigation.navigate("CloseAppointment");
  };

  return (
    <AppointmentDetailsView
      handleUpdateStatus={handleUpdateStatus}
      handleViewFollowUp={handleViewFollowUp}
      handleBackPress={handleBackPress}
      handleVistorUpdate={handleVistorUpdate}
      setBookingData={setBookingData}
      BookingData={BookingData}
      handleBooking={handleBooking}
      onPressBookNow={onPressBookNow}
      // onpressCloseVisit={onpressCloseVisit}
      // cancelValue={cancelValue}
      // setCancelValue={setCancelValue}
      handleStatusUpdate={handleStatusUpdate}
      handleNotInterestedPress={handleNotInterestedPress}
      okIsVisible={okIsVisible}
      errorMessage={errorMessage}
      setOkIsVisible={setOkIsVisible}
      detailsData={detailsData}
      getDetail={getDetail}
      onPressFollowUp={onPressFollowUp}
    />
  );
};

export default AppointmentDetails;
