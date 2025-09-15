import ErrorMessage from "../../../components/ErrorMessage";
import { GREEN_COLOR, ROLE_IDS } from "../../../components/utilities/constant";
import strings from "../../../components/utilities/Localization";
import {
  RemoveAppointment,
  addUserAppointment,
  editUserAppointment,
} from "../../../Redux/Actions/AppiontmentWithUserActions";
import { getUserVisitList } from "../../../Redux/Actions/LeadsActions";
import { getAllMaster } from "../../../Redux/Actions/MasterActions";
import { getAllProperty } from "../../../Redux/Actions/propertyActions";
import {
  getAssignCPList,
  getSourcingManagerList,
} from "../../../Redux/Actions/SourcingManagerActions";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import AddAppointmentView from "./Components/AddAppointmentView";

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
  const [allProperty, setAllProperty] = useState<any>([]);
  const propertyData = useSelector((state: any) => state.propertyData) || {};

  useEffect(() => {
    dispatch(
      getAllProperty({
        offset: 0,
        limit: "",
      })
    );
  }, []);

  useEffect(() => {
    if (propertyData?.response?.status === 200) {
      if (propertyData?.response?.data?.length > 0) {
        const activeData = propertyData?.response?.data.filter((el: any) => {
          return el.status == true;
        });
        activeData?.length > 0
          ? setAllProperty(activeData)
          : setAllProperty([]);
      } else {
        setAllProperty([]);
      }
    } else {
      setAllProperty([]);
    }
  }, [propertyData]);

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
      (getLoginType?.response?.data?.role_id === ROLE_IDS.sourcingmanager_id ||
        ROLE_IDS.scm_id ||
        getLoginType?.response?.data?.role_id === ROLE_IDS.sourcing_head_id ||
        getLoginType?.response?.data?.role_id === ROLE_IDS.sourcingtl_id ||
        getLoginType?.response?.data?.role_id === ROLE_IDS.clusterhead_id ||
        getLoginType?.response?.data?.role_id === ROLE_IDS.sitehead_id) &&
      type != strings.edit
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
      getLoginType?.response?.data?.role_title === "Sourcing Head" ||
      getLoginType?.response?.data?.role_title === "Site Head" ||
      getLoginType?.response?.data?.role_title === "Admin"
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
      allProperty={allProperty}
    />
  );
};

export default AddAppointmentScreen;
