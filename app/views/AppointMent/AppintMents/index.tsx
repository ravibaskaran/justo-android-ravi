import { useFocusEffect } from "@react-navigation/native";
import { getAllAppointmentList } from "app/Redux/Actions/AppointmentWithCpActions";
import {
  getClosHManagerList,
  getClosingManagerList,
} from "app/Redux/Actions/ClosingManager";
import { removeMasters } from "app/Redux/Actions/MasterActions";
import { START_LOADING, STOP_LOADING } from "app/Redux/types";
import ErrorMessage from "app/components/ErrorMessage";
import { handleApiError } from "app/components/ErrorMessage/HandleApiErrors";
import ConfirmModal from "app/components/Modals/ConfirmModal";
import {
  handlePermission,
  openPermissionSetting,
} from "app/components/utilities/GlobalFuncations";
import strings from "app/components/utilities/Localization";
import apiEndPoints from "app/components/utilities/apiEndPoints";
import {
  DATE_FORMAT,
  GREEN_COLOR,
  ROLE_IDS,
} from "app/components/utilities/constant";
import { apiCall } from "app/components/utilities/httpClient";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import AppointmentView from "./components/Appointments";
import AppointmentsForReport from "./components/AppointmentsForReport";
import { BackHandler } from "react-native";
import { appointmentBackSubject } from "app/observables/backNavigationSubject";

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
  const [isVisible, setIsVisible] = useState(false);
  const [visitedUser, setVisitedUser] = useState<any>({});
  const [moreData, setMoreData] = useState(0);
  const [_apiRefresing, setApiRefresing] = useState(false);
  const [isTodayAppointment, setIsTodayAppointment] = useState(true);
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
      setApiRefresing(false);
      settype(route?.params);
      return () => {};
    }, [navigation, list, route])
  );
  useFocusEffect(
    React.useCallback(() => {
      if (!appointmentBackSubject.getValue()) {
        setFilterData({
          start_date: "",
          end_date: "",
          customer_name: "",
          status: "",
        });
      }
      return () => {};
    }, [navigation, route])
  );

  useEffect(() => {
    setApiRefresing(false);
    // console.log(response)
    if (response?.status === 200) {
      setMoreData(response?.total_data);
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
      if (offSET > 0) {
        setAppointmentList(appointmentList);
      } else {
        setMoreData(0);
        setAppointmentList([]);
      }
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
    if (!appointmentBackSubject.getValue()) {
      if (_apiRefresing) return;
      setApiRefresing(true);
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
          status: data?.status ? data?.status : "",
          appointment_type: 2,
        })
      );
    } else {
      appointmentBackSubject.next(false);
    }
  };

  const onPressView = async (items: any) => {
    if (getLoginType?.response?.data?.role_id === ROLE_IDS.closingmanager_id) {
      let array = [];
      for (let data of response?.data) {
        if (data.status == 1 && data?.checkin_status?.length > 0) {
          array.push(data);
        }
      }
      if (items?.status == 1 && array.length > 0) {
        if (array[array.length - 1]?._id == items?._id) {
          navigation.navigate("AppointmentDetailMain", items);
        } else {
          setVisitedUser(array[array.length - 1]);
          setIsVisible(true);
        }
      } else {
        navigation.navigate("AppointmentDetailMain", items);
      }
    } else {
      navigation.navigate("AppointmentDetailMain", items);
    }
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

  const getCMList = (property_Id: any) => {
    const action =
      getLoginType?.response?.data?.role_id === ROLE_IDS.closing_head_id
        ? getClosHManagerList
        : getClosingManagerList;
    dispatch(action({ property_id: property_Id }));
  };

  const handleAllocateCM = async () => {
    dispatch({ type: START_LOADING });
    const res = await apiCall("post", apiEndPoints.ALLOCATE_CM, allocatedCM);
    if (res?.data?.status == 200) {
      ErrorMessage({
        msg: res?.data?.message,
        backgroundColor: GREEN_COLOR,
      });
      getAppointmentList(0, isTodayAppointment ? todayAppointment : {});
      dispatch({ type: STOP_LOADING });
    } else {
      setTimeout(() => {
        handleApiError(res?.data);
      }, 500);
      dispatch({ type: STOP_LOADING });
    }
  };

  useEffect(() => {
    const backAction = () => {
      handleDrawerPress();
      return true;
    };
    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );
    return () => backHandler.remove();
  }, [route?.params?.fromReport]);

  const handleDrawerPress = () => {
    if (route?.params?.fromReport) {
      navigation.navigate("Report", { backToReport: true });
    } else {
      navigation.toggleDrawer();
    }
  };
  return (
    <>
      {route.params?.fromReport ? (
        <AppointmentsForReport
          filterisVisible={filterisVisible}
          setFilterisVisible={setFilterisVisible}
          handleDrawerPress={handleDrawerPress}
          onPressView={onPressView}
          DATA={appointmentList}
          dropLocisVisible={dropLocisVisible}
          setDropLocisVisible={setDropLocisVisible}
          getAppointmentList={getAppointmentList}
          getCMList={getCMList}
          ClosingMList={ClosingMList}
          setAllocatedCM={setAllocatedCM}
          allocatedCM={allocatedCM}
          handleAllocateCM={handleAllocateCM}
          offSET={offSET}
          moreData={moreData}
          filterData={filterData}
          setFilterData={setFilterData}
          setAppointmentList={setAppointmentList}
          todayAppointment={todayAppointment}
          navigation={navigation}
          getLoginType={getLoginType}
          type={type}
          settype={settype}
          params={route.params}
          setIsTodayAppointment={setIsTodayAppointment}
        />
      ) : (
        <AppointmentView
          filterisVisible={filterisVisible}
          setFilterisVisible={setFilterisVisible}
          handleDrawerPress={handleDrawerPress}
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
          moreData={moreData}
          filterData={filterData}
          setFilterData={setFilterData}
          setAppointmentList={setAppointmentList}
          todayAppointment={todayAppointment}
          navigation={navigation}
          getLoginType={getLoginType}
          type={type}
          settype={settype}
          setIsTodayAppointment={setIsTodayAppointment}
        />
      )}

      <ConfirmModal
        Visible={isVisible}
        setIsVisible={setIsVisible}
        stringshow={strings.recoveryUpdate}
        textshow={
          strings.txt_update_status + " " + visitedUser?.customer_first_name
        }
        yesBtnTitle={"Update"}
        confirmtype={"CONFIRMATION"}
        hideNoBtn={true}
        setStatusChange={() => {}}
        handleYesResponse={() => {
          navigation.navigate("AppointmentDetailMain", visitedUser);
        }}
      />
    </>
  );
};
export default AppointmentsScreen;
