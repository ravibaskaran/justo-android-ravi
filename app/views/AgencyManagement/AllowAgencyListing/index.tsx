import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';
import ErrorMessage from 'app/components/ErrorMessage';
import { GREEN_COLOR } from 'app/components/utilities/constant';
import { getAssignCPList, removeAssignCpStatus, updateAssignCP } from 'app/Redux/Actions/SourcingManagerActions';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import AllowAgencyView from './components/AllowAgencyView';
import { getAllocateRequest } from 'app/Redux/Actions/propertyActions';

const AllowAgencyListing = ({ navigation }: any) => {
  const dispatch: any = useDispatch()
  const { response = {}, } = useSelector((state: any) => state.propertyData) || {}
  const statusUpdate = useSelector((state: any) => state.agencyStatus) || {}
  const [pendingAgency, setPendingAgency] = useState<any>([])
  const [statusChange, setStatusChange] = useState<any>({})

  useFocusEffect(
    React.useCallback(() => {
      getPendingList()
      return () => { };
    }, [navigation, statusUpdate])
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
      dispatch(getAllocateRequest())
  }

  const handleBackPress = () => {
    navigation.goBack();
  };
  const handleUpdateAssignCP = (item: any) => {
    dispatch(updateAssignCP({
      user_id: item?._id,
      status: 1
    }))
    getPendingList()
  }
  return <AllowAgencyView
    pendingAgency={pendingAgency}
    statusChange={statusChange}
    setStatusChange={setStatusChange}
    handleBackPress={handleBackPress}
    handleUpdateAssignCP={handleUpdateAssignCP}
    getPendingList={getPendingList}
  />;
};

export default AllowAgencyListing;
