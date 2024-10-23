import { View, Text } from "react-native";
import React, { useEffect, useState } from "react";
import AddAppointmentView from "./Components/AddAppointmentView";
import { useDispatch, useSelector } from "react-redux";
import { getUserVisitList } from "app/Redux/Actions/LeadsActions";
import strings from "app/components/utilities/Localization";
import { getAllMaster } from "app/Redux/Actions/MasterActions";
import {
  getAssignCPList,
  getSourcingHeadSMList,
  getSourcingManagerList,
} from "app/Redux/Actions/SourcingManagerActions";
import {
  RemoveAppointment,
  addUserAppointment,
  editUserAppointment,
} from "app/Redux/Actions/AppiontmentWithUserActions";
import ErrorMessage from "app/components/ErrorMessage";
import { GREEN_COLOR, ROLE_IDS } from "app/components/utilities/constant";

const AddAppointmentScreen = ({ navigation, route }: any) => {
  const { data, type } = route?.params || {};
  const dispatch: any = useDispatch();
  const { response = {}, list = "" } = useSelector(
    (state: any) => state.visitorData
  );
  const userAppointmentData = useSelector(
    (state: any) => state.userAppointmentData
  );
  const userEditAppointmentData = useSelector(
    (state: any) => state.userEditAppointmentData
  );
  const masterData = useSelector((state: any) => state.masterData) || {};
  const getLoginType = useSelector((state: any) => state.login) || {};
  const SMListData = useSelector((state: any) => state.SourcingManager);
  const [visitorList, setVisiitorList] = useState<any>([]);
  const [masterDatas, setMasterDatas] = useState<any>([]);
  const [listData, setListData] = useState<any>([]);
  const [role, setRole] = useState<any>("");

  useEffect(() => {
    if (list) {
      setVisiitorList(response?.data);
    }
  }, [response]);
  useEffect(() => {
    if (userEditAppointmentData?.response?.status === 200) {
      dispatch(RemoveAppointment());
      navigation.goBack();
      ErrorMessage({
        msg: userEditAppointmentData?.response?.message,
        backgroundColor: GREEN_COLOR,
      });
    }
  }, [userEditAppointmentData]);

  useEffect(() => {
    if (
      getLoginType?.response?.data?.role_id === ROLE_IDS.sourcingtl_id ||
      getLoginType?.response?.data?.role_id === ROLE_IDS.clusterhead_id
    ) {
      setRole("TL");
      dispatch(getSourcingManagerList({}));
    } else if (
      getLoginType?.response?.data?.role_id === ROLE_IDS.sourcing_head_id
    ) {
      dispatch(getSourcingHeadSMList({}));
    } else {
      if (
        getLoginType?.response?.data?.role_id === ROLE_IDS.sourcingmanager_id ||
        getLoginType?.response?.data?.role_id === ROLE_IDS.clusterhead_id
      ) {
        setRole("SM");
        dispatch(
          getAssignCPList({
            user_id: getLoginType?.response?.data?.user_id,
          })
        );
      } else {
        setListData([]);
      }
    }
  }, [getLoginType]);

  useEffect(() => {
    if (masterData?.response?.status === 200) {
      if (masterData?.response?.data?.length > 0) {
        setMasterDatas(
          masterData?.response?.data?.length > 0
            ? masterData?.response?.data
            : []
        );
      }
    }
  }, [masterData]);

  useEffect(() => {
    console.log("----", getLoginType?.response?.data?.role_title);
    if (
      getLoginType?.response?.data?.role_title === "Cluster Head" ||
      getLoginType?.response?.data?.role_title === "SCM" ||
      getLoginType?.response?.data?.role_title === "Sourcing TL" ||
      getLoginType?.response?.data?.role_title === "Sourcing Manager" ||
      getLoginType?.response?.data?.role_title === "Sourcing Head"
    ) {
      if (SMListData?.response?.status === 200) {
        if (SMListData?.response?.data?.length > 0) {
          setListData(SMListData?.response?.data);
        } else {
          setListData([]);
        }
      }
    }
  }, [SMListData]);

  const handleMasterDatas = (data: any) => {
    dispatch(
      getAllMaster({
        type: data,
      })
    );
  };

  const getVisitorsList = (offset: any, array: any) => {
    dispatch(
      getUserVisitList({
        lead_status: 1,
      })
    );
  };

  const handleAddAppointment = (params: any) => {
    if (type === strings.edit) {
      dispatch(editUserAppointment({ ...params, appointment_id: data?._id }));
    } else {
      dispatch(addUserAppointment(params));
    }
  };
  const handleBackPress = () => {
    navigation.goBack();
  };
  return (
    <AddAppointmentView
      getVisitorsList={getVisitorsList}
      handleBackPress={handleBackPress}
      visitorList={visitorList}
      handleAddAppointment={handleAddAppointment}
      handleMasterDatas={handleMasterDatas}
      masterDatas={masterDatas}
      listData={listData}
      role={role}
      type={type}
      data={data}
    />
  );
};

export default AddAppointmentScreen;
