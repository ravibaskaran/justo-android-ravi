import { View, Text } from "react-native";
import React, { useEffect, useState } from "react";
import CloseAppointmentView from "./components/CloseAppointmentView";
import { useDispatch, useSelector } from "react-redux";
import { closeVisit } from "app/Redux/Actions/LeadsActions";
import { getAppointmentDetail, removeEditUser } from "app/Redux/Actions/AppointmentWithCpActions";
import ErrorMessage from "app/components/ErrorMessage";
import { GREEN_COLOR } from "app/components/utilities/constant";

const CloseAppointment = ({navigation, route}: any) => {
  const dispatch: any = useDispatch()
  const closeAppointment = useSelector((state: any) => state.editAddAppointment)
  const { response = {}, detail = '' } = useSelector((state: any) => state.appointment)
    const [cancelValue, setCancelValue] = useState({
        lead_id: '',
        appointment_id: '',
        appointment_status: '',  //1=lead, 2=appoinment
        resion: '',
        remark: '',
        property_id: '',
        property_name: '',
      });
      useEffect(() => {
        if (closeAppointment?.response?.status === 200) {
          dispatch(removeEditUser())
          ErrorMessage({
            msg: closeAppointment?.response?.message,
            backgroundColor: GREEN_COLOR
          })
          dispatch(getAppointmentDetail({
            appointment_id: response?.data?.length > 0 ? response?.data[0]?._id : []
          }))
          navigation.goBack()
        }
      }, [closeAppointment])
      
      const onpressCloseVisit = (data: any) => {
        const params = {
          lead_id: response?.data?.length > 0 ? response?.data[0]?.lead_id : [],
          appointment_id: response?.data?.length > 0 ? response?.data[0]?._id : [],
          appointment_status: cancelValue?.appointment_status,
          resion: cancelValue?.resion,
          comment: cancelValue?.remark,
          property_id: cancelValue?.property_id,
          property_name: cancelValue?.property_name,
        }
        dispatch(closeVisit(params))
      }
      const handleBackPress = () => {
        navigation.goBack()
      }
  return (
    <View>
      <CloseAppointmentView
        onpressCloseVisit={onpressCloseVisit}
        cancelValue={cancelValue}
        setCancelValue={setCancelValue}
        handleBackPress={handleBackPress}
      />
    </View>
  );
};

export default CloseAppointment;
