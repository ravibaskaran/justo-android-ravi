import { useFocusEffect } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getRecoveryList } from "../../../Redux/Actions/RecoveryActions";
import RecoveryView from "./components/RecoveryView";

const RecoveryScreen = ({ navigation }: any) => {
  const { response = {}, list = "" } =
    useSelector((state: any) => state.RecoveryData) || [];

  const dispatch: any = useDispatch();
  const moreData = response?.total_data || 0;
  const [recoveryList, setRecoveryList] = useState<any>([]);
  const [offSET, setOffset] = useState(0);
  useFocusEffect(
    React.useCallback(() => {
      getRecoveryListData(0, {});
      return () => {};
    }, [navigation])
  );
  useEffect(() => {
    if (response?.status === 200) {
      if (response?.data?.length > 0) {
        if (offSET === 0) {
          setRecoveryList(response?.data);
        } else {
          setRecoveryList([...recoveryList, ...response?.data]);
        }
      }
    } else {
      setRecoveryList([])
    }
  }, [response]);
  const getRecoveryListData = (offset: any, data: any) => {
    setOffset(offset);
    dispatch(
      getRecoveryList({
        limit: 5,
        offset: offset,
        appointment_type: 1,
      })
    );
  };
  const DATA = [
    {
      bookingDate: "12/2/1223",
      customerName: "Alexendra daddario",
      bookingStatus: "Recovery",
      configuration: "1BHK",
      budget: "2 Lac",
      area: "1500",
      propertyName: "Goregaon Lifts",
      visitorName: "Rajeev Kumar",
      source: "XYZ",
      closingDate: "11/02/20019 11:09 AM",
    },
    {
      bookingDate: "12/2/1223",
      customerName: "Alexendra daddario",
      bookingStatus: "Recovery",
      configuration: "1BHK",
      budget: "2 Lac",
      area: "1500",
      propertyName: "Goregaon Lifts",
      visitorName: "Rajeev Kumar",
      source: "XYZ",
      closingDate: "11/02/20019 11:09 AM",
    },
    {
      bookingDate: "12/2/1223",
      customerName: "Alexendra daddario",
      bookingStatus: "Recovery",
      configuration: "1BHK",
      budget: "2 Lac",
      area: "1500",
      propertyName: "Goregaon Lifts",
      visitorName: "Rajeev Kumar",
      source: "XYZ",
      closingDate: "11/02/20019 11:09 AM",
    },
    {
      bookingDate: "12/2/1223",
      customerName: "Alexendra daddario",
      bookingStatus: "Recovery",
      configuration: "1BHK",
      budget: "2 Lac",
      area: "1500",
      propertyName: "Goregaon Lifts",
      visitorName: "Rajeev Kumar",
      source: "XYZ",
      closingDate: "11/02/20019 11:09 AM",
    },
  ];
  const onPressView = (data: any) => {
    navigation.navigate("RecoveryDetails", data);
  };
  const handleDrawerPress = () => {
    navigation.toggleDrawer();
  };
  return (
    <>
      <RecoveryView
        handleDrawerPress={handleDrawerPress}
        DATA={DATA}
        onPressView={onPressView}
        getRecoveryListData={getRecoveryListData}
        recoveryList={recoveryList}
        moreData={moreData}
        offSET={offSET}
      />
    </>
  );
};

export default RecoveryScreen;
