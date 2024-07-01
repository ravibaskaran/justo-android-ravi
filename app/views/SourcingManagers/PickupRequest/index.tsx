import React, { useEffect, useState } from "react";
import { useFocusEffect } from "@react-navigation/native";
import PickupRequestView from "./components/PickupRequest";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllPickupList,
  updatePickupStatusAction,
} from "app/Redux/Actions/PickUpActions";

const PickupRequestScreen = ({ navigation }: any) => {
  const [filterisVisible, setFilterisVisible] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [pickupList, setPickupList] = useState([]);
  const [appointId, setAppointId] = useState<any>({});
  const dispatch: any = useDispatch();
  const { response = {}, list = false } =
    useSelector((state: any) => state.Pickup) || [];
  const updatePickUpStatusData =
    useSelector((state: any) => state.updatePickUpStatusData) || [];

  useFocusEffect(
    React.useCallback(() => {
      dispatch(getAllPickupList({}));
      return () => {};
    }, [navigation, list, updatePickUpStatusData])
  );
  useEffect(() => {
    if (response?.status === 200) {
      setPickupList(response?.data);
    }
  }, [response]);

  const onRefresh = () => {
    dispatch(getAllPickupList({}));
  };

  const updatePickupStatus = () => {
    dispatch(
      updatePickupStatusAction({
        appointment_id: appointId.appointment_id,
        status_type: 1,
        status: 1,
      })
    );
  };

  const handleDrawerPress = () => {
    navigation.toggleDrawer();
  };
  return (
    <PickupRequestView
      handleDrawerPress={handleDrawerPress}
      DATA={pickupList}
      filterisVisible={filterisVisible}
      setFilterisVisible={setFilterisVisible}
      onRefresh={onRefresh}
      updatePickupStatus={updatePickupStatus}
      isVisible={isVisible}
      setIsVisible={setIsVisible}
      appointId={appointId}
      setAppointId={setAppointId}
    />
  );
};
export default PickupRequestScreen;
