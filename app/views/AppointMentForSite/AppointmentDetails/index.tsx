import { View, Text, Alert, BackHandler } from 'react-native'
import React, { useEffect, useState } from 'react'
import AppointmentDetailsView from './Components/AppointmentDetailsView'
import { useFocusEffect } from '@react-navigation/native';
import { getAppointmentDetail } from 'app/Redux/Actions/AppointmentWithCpActions';
import { useDispatch, useSelector } from 'react-redux';

const AppointmentDetails = ({ navigation, route }: any) => {
  const data = route?.params || {}
  const [appointMentDetail, setAppointMentDetail] = useState<any>({})
  const dispatch: any = useDispatch()
  const { response = {}, detail = '' } = useSelector((state: any) => state.appointment)
  
  useFocusEffect(
    React.useCallback(() => {
      getUserDetails()
      return () => { };
    }, [navigation]))

    useEffect(() => {
      const backAction = () => {
        navigation.goBack()
        return true;
      };
  
      const backHandler = BackHandler.addEventListener(
        'hardwareBackPress',
        backAction,
      );
  
      return () => backHandler.remove();
    }, []);

  const getUserDetails = () => {
    dispatch(getAppointmentDetail({
      appointment_id: data?._id ? data?._id : ''
    }))
  }
  useEffect(() => {
    if (response?.status === 200) {
      setAppointMentDetail({ ...response?.data[0] })
    }else {
      setAppointMentDetail({})
    }
  }, [response])
  const handleBackPress = () => {
    navigation.goBack()
  }
  const handleStatusUpdate = () => {
    navigation.navigate('AppointmentAddS', appointMentDetail)
  }
  return (
    <AppointmentDetailsView
      handleStatusUpdate={handleStatusUpdate}
      handleBackPress={handleBackPress}
      appointMentDetail={appointMentDetail}
    />
  )
}

export default AppointmentDetails