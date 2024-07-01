import { View, Text, BackHandler } from 'react-native'
import React, { useEffect, useState } from 'react'
import AppointmentDetailsView from './Components/AppointmentDetailsView'

const AppointmentDetails = ({navigation,route}: any) => {
 
  const [status , setStatus] = useState(route?.params)
  const handleBackPress = () => {
    navigation.goBack()
  }
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
  return (
   <AppointmentDetailsView handleBackPress={handleBackPress} status={status} />
  )
}

export default AppointmentDetails