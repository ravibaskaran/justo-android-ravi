import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState } from 'react';
import SplashScreenVeiw from './components/SplashScreenVeiw';
import { CommonActions, useFocusEffect } from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import { getPermission } from 'app/Redux/Actions/permissionAction';
import { navigate } from 'app/components/utilities/GlobalFuncations';

const SplashScreen = ({ navigation, route }: any) => {
  const {
    notificationType,
    data
  } = route?.params || {}
  const dispatch: any = useDispatch()
  setTimeout(() => {
    navigation.replace('AuthLoading');
  }, 3000);
  useFocusEffect(
    React.useCallback(() => {
      dispatch(getPermission({}))
      return () => { };
    }, [navigation])
  );

  useEffect(() => {
    handleNotification()
  }, [route])

  const handleNotification = () => {
    console.log("data SplashScreen: IN handleNotification", data);
    console.log("notificationType SplashScreen: ", notificationType);

    setTimeout(() => {
      switch (notificationType) {
        case 'lead':
          navigate('LeadManagementScreen', {})
          break;
        case 'appoinment':
          navigate('Appointments', {})
          break;
        case 'ready to book':
          navigate('BookingList', { type: 'readyToBook', })
          break;
        case 'booking':
          navigate('BookingList', { type: 'request', })
          break;
        case 'followUp':
          navigate('FollowUpScreen', {})
          break;
        case 'property':
          navigate('PropertyScreenView', {})
          break;
        case 'registration':
          navigate('BookingList', { type: 'register' })
          break;
        case 'support':
          navigate('Support', {})
          break;
        case 'user appointment':
          navigate('AppointmentScreenCPSM', {})
          break;
        case 'cpassign':
          navigate('AgencyListing', {})
          break;
        case 'announcement':
          navigate('notification', {})
          break;
        default:
          navigate('AuthLoading', {})
          break;
      }
    }, 3020);
  };
  return <SplashScreenVeiw />;
};

export default SplashScreen;
