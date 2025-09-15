import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';
import ErrorMessage from '../../../components/ErrorMessage';
import { GREEN_COLOR } from '../../../components/utilities/constant';
import { getAssignCPList, removeAssignCpStatus, updateAssignCP } from '../../../Redux/Actions/SourcingManagerActions';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PendingAgencyView from './components/PendingAgencyView';

const PendingAgencyListing = ({ navigation }: any) => {
  const dispatch: any = useDispatch()
  const { response = {}, } = useSelector((state: any) => state.SourcingManager) || {}
  const statusUpdate = useSelector((state: any) => state.agencyStatus) || {}
  const [pendingAgency, setPendingAgency] = useState<any>([])
  const [statusChange, setStatusChange] = useState<any>({})

  useFocusEffect(
    React.useCallback(() => {
      getPendingList()
      return () => { };
    }, [navigation])
  );
  useEffect(() => {
    if (response?.status === 200) {
      setPendingAgency(response?.data)
    } else {
      setPendingAgency([])
    }
  }, [response])
  useEffect(() => {
    if (statusUpdate?.response?.status === 200) {
      ErrorMessage({
        msg: statusUpdate?.response?.message,
        backgroundColor: GREEN_COLOR,
      });
      dispatch(removeAssignCpStatus())
      getPendingList()
    }
  }, [statusUpdate])
  const getPendingList = async () => {
    const userData: any = await AsyncStorage.getItem("loginData");
    if (JSON.parse(userData)?.data?.user_id) {
      dispatch(getAssignCPList({
        user_id: JSON.parse(userData)?.data?.user_id,
        status: 1
      }))
    }
  }

  const handleBackPress = () => {
    navigation.goBack();
  };
  const handleUpdateAssignCP = (item: any) => {
    dispatch(updateAssignCP({
      user_id: item?._id,
      status: 1
    }))
  }
  return <PendingAgencyView
    pendingAgency={pendingAgency}
    statusChange={statusChange}
    setStatusChange={setStatusChange}
    handleBackPress={handleBackPress}
    handleUpdateAssignCP={handleUpdateAssignCP}
    getPendingList={getPendingList}
  />;
};

export default PendingAgencyListing;
