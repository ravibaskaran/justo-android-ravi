import { useFocusEffect } from "@react-navigation/native";
import { getAllAppointmentList } from "app/Redux/Actions/AppointmentWithCpActions";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import AppointmentView from "./Components/AppointmentView";
import moment from "moment";
import { DATE_FORMAT } from "app/components/utilities/constant";
import { appointmentSVBackSubject } from "app/observables/backNavigationSubject";

const AppointmentScreen = ({ navigation, route }: any) => {
  const dispatch: any = useDispatch();
  const { response = {}, list = "" } = useSelector(
    (state: any) => state.appointment
  );
  const moreData = response?.total_data || 0;
  const [offSET, setOffset] = useState(0);
  const [type, settype] = useState("");
  const [siteAppointments, setSiteAppointments] = useState<any>([]);
  const [filterData, setFilterData] = useState({
    appointment_with: "",
    status: "",
    start_date: "",
    end_date: "",
    customer_name: "",
    property_name: "",
  });
  const todayAppointment = {
    start_date: moment(new Date()).format(DATE_FORMAT),
    end_date: moment(new Date()).format(DATE_FORMAT),
  };

  useFocusEffect(
    React.useCallback(() => {
      settype(route?.params);
      return () => {};
    }, [navigation, list, route])
  );

  useFocusEffect(
    React.useCallback(() => {
      if (!appointmentSVBackSubject.getValue()) {
        setFilterData({
          appointment_with: "",
          status: "",
          start_date: "",
          end_date: "",
          customer_name: "",
          property_name: "",
        });
      }
      return () => {};
    }, [navigation, route])
  );

  useEffect(() => {
    if (response?.status === 200) {
      if (offSET === 0) {
        setSiteAppointments(response?.data);
      } else {
        setSiteAppointments([...siteAppointments, ...response?.data]);
      }
    } else {
      setSiteAppointments([]);
    }
  }, [response]);

  const getAppointmentList = (offset: any, data: any) => {
    if (!appointmentSVBackSubject.getValue()) {
      setOffset(offset);
      dispatch(
        getAllAppointmentList({
          offset: offset,
          limit: 10,
          start_date: data?.start_date ? data?.start_date : "",
          end_date: data?.end_date ? data?.end_date : "",
          customer_name: data?.customer_name?.trim()
            ? data?.customer_name?.trim()
            : "",
          property_name: data?.property_name ? data?.property_name : "",
          status: data?.status ? data?.status : "",
          appointment_type: 2,
          appointment_with: data?.appointment_with
            ? data?.appointment_with
            : "",
        })
      );
    } else {
      appointmentSVBackSubject.next(false);
    }
  };

  const handleDrawerPress = () => {
    navigation.toggleDrawer();
  };
  return (
    <AppointmentView
      handleDrawerPress={handleDrawerPress}
      siteAppointments={siteAppointments}
      filterData={filterData}
      setFilterData={setFilterData}
      offSET={offSET}
      moreData={moreData}
      setSiteAppointments={setSiteAppointments}
      getAppointmentList={getAppointmentList}
      todayAppointment={todayAppointment}
      navigation={navigation}
      type={type}
      settype={settype}
    />
  );
};

export default AppointmentScreen;
