import React, { useEffect, useState } from "react";
import { Alert } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { cpAppointmentCheckIn, removeMasters } from "../../Redux/Actions/MasterActions";
import { ROLE_IDS } from "../../components/utilities/constant";
import ScanQrView from "./components/ScanQr";

const ScanQrScreen = ({ navigation }: any) => {
  const [AppId, setAppId] = useState('')
  const dispatch: any = useDispatch();
  const handleBackPress = () => {
    navigation.goBack();
  };
  const getLoginType = useSelector((state: any) => state.login);
  const { response = {} } = useSelector((state: any) => state.masterRemove);

  const handleQrScan = (id: any) => {
    dispatch(
      cpAppointmentCheckIn({
        appointment_id: id,
      })
    );

  };

  useEffect(() => {
    if(AppId !== ""){
      handleQrScan(AppId)
    }
    return () => {
    }
  }, [AppId])
  
  useEffect(() => {
    if (response?.status === 200) {
      // ErrorMessage({
      //   msg: response?.message,
      //   backgroundColor: GREEN_COLOR
      // })
      dispatch(removeMasters())
      if (AppId !== "") {
        if (getLoginType?.response?.data?.role_id === ROLE_IDS.receptionist_id) {
          navigation.navigate("CpChecking");
        } else {
          navigation.navigate("AppointmentDetailMain", { _id: AppId });
          console.log('id: ', AppId);
        }
      }
    } else if (response?.status === 201) {
      dispatch(removeMasters())
      navigation.goBack()
      Alert.alert('Alert', response?.message)
      // ErrorMessage({
      //   msg: response?.message,
      //   backgroundColor: RED_COLOR
      // })
    }
  }, [response, AppId])

  return (
    <>
      <ScanQrView
        handleBackPress={handleBackPress}
        handleQrScan={handleQrScan}
        AppId={AppId}
        setAppId={setAppId}
      />
    </>
  );
};

export default ScanQrScreen;
