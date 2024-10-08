import { View, Text } from "react-native";
import React, { useEffect, useState } from "react";
import AppointmentView from "./Components/AppointmentView";
import { getAllAppointmentList } from "app/Redux/Actions/AppointmentWithCpActions";
import { useDispatch, useSelector } from "react-redux";
import { useFocusEffect } from "@react-navigation/native";
import { getUserAppointmentList } from "app/Redux/Actions/AppiontmentWithUserActions";

const AppointmentScreenCPSM = ({ navigation }: any) => {
  const [appointmentList, setAppointmentList] = useState<any>([]);
  const [offSET, setOffset] = useState(0);
  const [role, setRole] = useState("");
  const dispatch: any = useDispatch();
  const getLoginType = useSelector((state: any) => state.login) || {};
  const {
    response = {},
    list = "",
    edit = false,
  } = useSelector((state: any) => state.userAppointmentData);
  const [filterData, setFilterData] = useState({
    start_date: "",
    end_date: "",
    customer_name: "",
    status: "",
  });
  var tabType;
  useFocusEffect(
    React.useCallback(() => {
      setFilterData({
        start_date: "",
        end_date: "",
        customer_name: "",
        status: "",
      });
      return () => {};
    }, [navigation, tabType])
  );
  useEffect(() => {
    if (response?.status === 200) {
      if (response?.data?.length > 0) {
        setAppointmentList(response?.data);
      }
    } else {
      setAppointmentList([]);
    }
  }, [response, list, edit]);
  useEffect(() => {
    if (
      getLoginType?.response?.data?.role_title === "Sourcing TL" ||
      getLoginType?.response?.data?.role_title === "Sourcing Head"
    ) {
      setRole("TL");
    } else if (
      getLoginType?.response?.data?.role_title === "Sourcing Manager"
    ) {
      setRole("SM");
    }
  }, [getLoginType]);
  const getAppointmentList = (type: any, data: any) => {
    tabType = type;
    dispatch(
      getUserAppointmentList({
        appoiment: type ? type : 1,
        start_date: data?.start_date ? data?.start_date : "",
        end_date: data?.end_date ? data?.end_date : "",
        customer_name: data?.customer_name?.trim()
          ? data?.customer_name?.trim()
          : "",
        status: data?.status ? data?.status : "",
      })
    );
  };
  const handleDrawerPress = () => {
    navigation.toggleDrawer();
  };
  return (
    <AppointmentView
      handleDrawerPress={handleDrawerPress}
      appointmentList={appointmentList}
      offSET={offSET}
      getAppointmentList={getAppointmentList}
      setFilterData={setFilterData}
      filterData={filterData}
      role={role}
      list={list}
      edit={edit}
    />
  );
};

export default AppointmentScreenCPSM;
