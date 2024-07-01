import { View, Text } from "react-native";
import React, { useEffect, useState } from "react";
import RecoveryDetailView from "./Components/RecoveryDetailView";
import { useFocusEffect } from "@react-navigation/native";
import { getAppointmentDetail } from "app/Redux/Actions/AppointmentWithCpActions";
import { useDispatch, useSelector } from "react-redux";
import {
  cancelBooking,
  getBookingDetail,
  removeBooking,
} from "app/Redux/Actions/BookingActions";
import ErrorMessage from "app/components/ErrorMessage";
import { GREEN_COLOR } from "app/components/utilities/constant";

const RecoveryDetails = ({ navigation, route }: any) => {
  // const [status, setStatus] = useState(route?.params);
  const data = route?.params;
  const dispatch: any = useDispatch();
  const { response = {}, detail = "" } = useSelector(
    (state: any) => state.booking
  );
  const cancelAddBookingData = useSelector((state: any) => state.cancelAddBooking)

  const [recoveryDetail, setRecoveryDetail] = useState<any>({});
  const [cancelBookingModel, setCancelBookingModel] = useState(false);

  const [cancelValue, setCancelValue] = useState({
    reason: "",
    property_id: "",
    comment: "",
    property_name: "",
    remark: "",
  });

  const handleBackPress = () => {
    navigation.goBack();
  };
  useFocusEffect(
    React.useCallback(() => {
      if (data?._id) {
        dispatch(
          getBookingDetail({
            booking_id: data?._id,
          })
        );
      }
      return () => {};
    }, [navigation])
  );
  useEffect(() => {
    if (cancelAddBookingData?.response?.status === 200) {
        ErrorMessage({
            msg: cancelAddBookingData?.response?.message,
            backgroundColor: GREEN_COLOR
        })
        dispatch(removeBooking())
        navigation.navigate('CancelBooking')
        setCancelValue({
            reason: '',
            property_id: '',
            comment: '',
            property_name: '',
            remark: '',
        })
    }
}, [cancelAddBookingData])

  const cancelBookingPress = () => {
    const params = {
      booking_id: data?._id,
      booking_status: 4,
      receivery_status: 2,
      remark: cancelValue.remark,
    };
    dispatch(cancelBooking(params));
  };
  const handleStatusUpdate = () => {
    navigation.navigate("FollUpAdd", recoveryDetail);
  };

  useEffect(() => {
    if (response && response?.status === 200) {
      setRecoveryDetail(response?.data[0]);
    } else {
      setRecoveryDetail({});
    }
  }, [response]);

  const handleBookNow = () => {
    navigation.navigate("Booking", {getBookingData :recoveryDetail, type: 'recovery'});
  }
  

  return (
    <RecoveryDetailView
      handleStatusUpdate={handleStatusUpdate}
      handleBackPress={handleBackPress}
      data={recoveryDetail}
      cancelBookingPress={cancelBookingPress}
      cancelValue={cancelValue}
      setCancelValue={setCancelValue}
      cancelBookingModel={cancelBookingModel}
      setCancelBookingModel={setCancelBookingModel}
      handleBookNow={handleBookNow}
    />
  );
};

export default RecoveryDetails;
