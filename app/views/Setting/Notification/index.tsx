import { useFocusEffect } from "@react-navigation/native";
import React from "react";
import { useDispatch } from "react-redux";
import { deleteNotification, getNotificationList } from "../../../Redux/Actions/NotificationAction";
import NotificationView from "./components/NotificationView";

const Notification = ({ navigation, route }: any) => {
  const dispatch: any = useDispatch();
  useFocusEffect(
    React.useCallback(() => {
      getNotification()
      return () => { };
    }, [navigation])
  ), [];

  const getNotification = () => {
    dispatch(getNotificationList({
      limit: 100,
      offset: 0
    }))
  }
  const handleDeleteNotification = (id: any) => {
    if (id) {
      dispatch(
        deleteNotification({
          is_delete: true,
          notification_id: id,
        })
      );
    }
  };
  const onPressBack = () => {
    navigation.goBack();
  };
  return <NotificationView
    onPressBack={onPressBack}
    data={route.params}
    handleDeleteNotification={handleDeleteNotification}
    getNotification={getNotification}
  />;
};

export default Notification;
