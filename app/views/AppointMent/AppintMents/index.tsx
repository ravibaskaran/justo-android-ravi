import React, { useEffect, useState } from "react";
import AppointmentView from "./components/Appointments";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/native";
import { getAllAppointmentList } from "app/Redux/Actions/AppointmentWithCpActions";
import { useDispatch, useSelector } from "react-redux";
import { getClosingManagerList } from "app/Redux/Actions/ClosingManager";
import { AllocateCM } from "app/Redux/Actions/AppointmentCLAction";
import { getAllPickupList } from "app/Redux/Actions/PickUpActions";
import {
  handlePermission,
  openPermissionSetting,
} from "app/components/utilities/GlobalFuncations";
import strings from "app/components/utilities/Localization";
import moment from "moment";
import { DATE_FORMAT } from "app/components/utilities/constant";
import { removeMasters } from "app/Redux/Actions/MasterActions";

const AppointmentsScreen = ({ navigation, route }: any) => {
  const [dropLocisVisible, setDropLocisVisible] = useState(false);
  const [filterisVisible, setFilterisVisible] = useState(false);
  const [appointmentList, setAppointmentList] = useState<any>([]);
  const [ClosingMList, setClosingMList] = useState<any>([]);
  const [allocatedCM, setAllocatedCM] = useState({});
  const [offSET, setOffset] = useState(0);
  const dispatch: any = useDispatch();
  const { response = {}, list = "" } =
    useSelector((state: any) => state.appointment) || [];
  const CMList = useSelector((state: any) => state.ClosingManager) || {};
  const appointMentList = useSelector((state: any) => state.Pickup) || {};
  const getLoginType = useSelector((state: any) => state.login);
  const [type, settype] = useState("");

  const [filterData, setFilterData] = useState({
    start_date: "",
    end_date: "",
    customer_name: "",
    status: "",
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
      setFilterData({
        start_date: "",
        end_date: "",
        customer_name: "",
        status: "",
      });
      return () => {};
    }, [navigation, route])
  );

  useEffect(() => {
    // if (getLoginType?.response?.data?.role_title === 'Closing Manager') {
    //     if (appointMentList?.response?.status === 200) {
    //         if (offSET == 0) {
    //             setAppointmentList(appointMentList?.response?.data)
    //         } else {
    //             setAppointmentList([...appointmentList,
    //             ...appointMentList?.response?.data])
    //         }
    //     } else {
    //         setAppointmentList([])
    //     }
    // } else {
    if (response?.status === 200) {
      if (response?.data?.length > 0) {
        if (offSET == 0) {
          setAppointmentList(response?.data);
        } else {
          setAppointmentList([...appointmentList, ...response?.data]);
        }
      } else {
        setAppointmentList([]);
      }
    } else {
      setAppointmentList([]);
    }
    // }
  }, [response, appointMentList, getLoginType]);
  useEffect(() => {
    if (CMList?.response?.status === 200) {
      if (CMList?.response?.data?.length > 0) {
        setClosingMList(CMList?.response?.data);
      }
    } else {
      setClosingMList([]);
    }
  }, [CMList]);

  const getAppointmentList = (offset: any, data: any) => {
    // if (getLoginType?.response?.data?.role_title === 'Closing Manager') {
    //     setOffset(offset)
    //     dispatch(getAllPickupList({
    //         offset: offset,
    //         limit: 10,
    //         start_date: data?.start_date ? data?.start_date : '',
    //         end_date: data?.end_date ? data?.end_date : '',
    //         customer_name: data?.customer_name ? data?.customer_name : '',
    //         status: data?.status ? data?.status : '',
    //         appointment_type: 2
    //     }))
    // } else {
    setOffset(offset);
    dispatch(
      getAllAppointmentList({
        offset: offset,
        limit: 10,
        start_date: data?.start_date ? data?.start_date : "",
        end_date: data?.end_date ? data?.end_date : "",
        customer_name: data?.customer_name?.trim() ? data?.customer_name?.trim() : "",
        status: data?.status ? data?.status : "",
        appointment_type: 2,
      })
    );
    // }
  };

  const onPressView = (items: any) => {
    navigation.navigate("AppointmentDetailMain", items);
  };
  const handleScanQr = async (items: any) => {
    dispatch(removeMasters());
    const res = await handlePermission(
      "camera",
      strings.txt_setting_heading_camera,
      strings.txt_setting_description_camera
    );

    if (res == "setting1") {
      openPermissionSetting(
        strings.txt_setting_heading_camera,
        strings.txt_setting_description_camera
      );
    } else if (res) {
      navigation.navigate("ScanQr");
    }
  };

  const getCMList = () => {
    dispatch(getClosingManagerList({}));
  };

  const handleAllocateCM = () => {
    dispatch(AllocateCM(allocatedCM));
    getAppointmentList(0, todayAppointment);
  };
  return (
    <>
      <AppointmentView
        filterisVisible={filterisVisible}
        setFilterisVisible={setFilterisVisible}
        // handleDrawerPress={handleDrawerPress}
        onPressView={onPressView}
        DATA={appointmentList}
        handleScanQr={handleScanQr}
        dropLocisVisible={dropLocisVisible}
        setDropLocisVisible={setDropLocisVisible}
        getAppointmentList={getAppointmentList}
        getCMList={getCMList}
        ClosingMList={ClosingMList}
        setAllocatedCM={setAllocatedCM}
        allocatedCM={allocatedCM}
        handleAllocateCM={handleAllocateCM}
        offSET={offSET}
        moreData={
          getLoginType?.response?.data?.role_title === "Closing Manager"
            ? appointMentList?.response?.total_data
            : response?.total_data
        }
        filterData={filterData}
        setFilterData={setFilterData}
        setAppointmentList={setAppointmentList}
        todayAppointment={todayAppointment}
        navigation={navigation}
        getLoginType={getLoginType}
        type={type}
        settype={settype}
      />
    </>
  );
};
export default AppointmentsScreen;
