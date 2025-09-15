import React, { useEffect, useState } from "react";
import { View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { getAppointmentDetail, removeEditUser } from "../../../Redux/Actions/AppointmentWithCpActions";
import { closeVisit } from "../../../Redux/Actions/LeadsActions";
import ErrorMessage from "../../../components/ErrorMessage";
import { GREEN_COLOR } from "../../../components/utilities/constant";
import CloseAppointmentView from "./components/CloseAppointmentView";

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
            appointment_id: response?.data?.length > 0 ? route?.params?._id : []
          }))
          navigation.goBack()
        }
      }, [closeAppointment])
      
      const onpressCloseVisit = (data: any) => {
        const params = {
          lead_id: route?.params?.lead_id ? route?.params?.lead_id : [],
          appointment_id:  route?.params?._id  ? route?.params?._id : [],
          appointment_status: cancelValue?.appointment_status,
          resion: cancelValue?.resion,
          comment: cancelValue?.remark,
          property_id: cancelValue?.property_id,
          property_name: cancelValue?.property_name,
        }
        console.log(params)
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
