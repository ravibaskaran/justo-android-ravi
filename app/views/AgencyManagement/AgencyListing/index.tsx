import { useFocusEffect } from "@react-navigation/native";
import ErrorMessage from "app/components/ErrorMessage";
import { GREEN_COLOR, RED_COLOR } from "app/components/utilities/constant";
import { getAllAgentList } from "app/Redux/Actions/AgencyActions";
import {
  getAssignCPList,
  removeAssignCpStatus,
  updateAssignCP,
} from "app/Redux/Actions/SourcingManagerActions";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import AgencyView from "./components/AgencyView";
import { transferVisitList } from "app/Redux/Actions/TransferVisitAction";
import { getAllProperty } from "app/Redux/Actions/propertyActions";
import apiEndPoints from "app/components/utilities/apiEndPoints";
import { START_LOADING, STOP_LOADING } from "app/Redux/types";
import { apiCall } from "app/components/utilities/httpClient";

const AgencyListing = ({ navigation, route }: any) => {
  const { type } = route?.params || {};
  const { response = {}, list = false } =
    useSelector((state: any) => state.agentData) || [];
  const statusUpdate = useSelector((state: any) => state.agencyStatus) || {};
  const SmCpList = useSelector((state: any) => state.SourcingManager) || [];
  const { userData = {} } = useSelector((state: any) => state.userData) || [];
  const propertyData = useSelector((state: any) => state.propertyData) || {};
  const [propertyList, setPropertyList] = useState<any>([]);
  const [selectedProperty, setSelectedProperty] = useState<any>([]);
  const [selectedPropertyIds, setSelectedPropertyIds] = useState<any>([]);
  const [finalPropertyList, setFinalPropertyList] = useState<any>([]);
  const [isPropertyVisible, setIsPropertyVisible] = useState(false);

  const [CP_ID, setCP_ID] = useState("");
  const moreData = response?.total_data || 0;
  const [agentList, setAgentList] = useState<any>([]);
  const [offSET, setOffset] = useState(0);
  const [filterData, setFilterData] = useState({
    startdate: "",
    enddate: "",
    search_by_name: "",
    search_by_location: "",
    status: "",
    mobile_no: "",
    rera_no: "",
  });
  const [changeStatus, setChangeStatus] = useState({});
  const dispatch: any = useDispatch();

  useFocusEffect(
    React.useCallback(() => {
      setAgentList([]);
      if (type === "active") {
        getAgencyList(0, {
          status: "",
        });
      } else {
        getAgencyList(0, {});
      }
      return () => {};
    }, [navigation, statusUpdate, type])
  );
  useFocusEffect(
    React.useCallback(() => {
      setFilterData({
        startdate: "",
        enddate: "",
        search_by_name: "",
        search_by_location: "",
        status: "",
        mobile_no: "",
        rera_no: "",
      })
    }, [navigation])
  );

  useEffect(() => {
    if (SmCpList?.response?.status === 200) {
      setAgentList(SmCpList?.response?.data);
    } else {
      setAgentList([]);
    }
  }, [SmCpList]);

  const getAgencyList = (offset: any, filterData: any) => {
    setOffset(offset);
    // if (userData?.data?.role_title === 'Sourcing Manager') {
    dispatch(
      getAssignCPList({
        user_id: userData?.data?.user_id,
        startdate: filterData.startdate,
        enddate: filterData.enddate,
        search_by_name: filterData?.search_by_name?.trim(),
        mobile_no: +filterData.mobile_no,
        rera_no: filterData?.rera_no?.trim(),
        search_by_location: filterData?.search_by_location?.trim(),
        status:
          filterData?.status || filterData?.status === false
            ? filterData?.status
            : "",
      })
    );
  };

  useEffect(() => {
    if (statusUpdate?.response?.status === 200) {
      ErrorMessage({
        msg: statusUpdate?.response?.message,
        backgroundColor: GREEN_COLOR,
      });
      dispatch(removeAssignCpStatus());
    }
  }, [statusUpdate]);
  const handleDrawerPress = () => {
    navigation.toggleDrawer();
  };
  useEffect(() => {
    if (propertyData?.response) {
      const { response, loading, list } = propertyData;
      if (response?.status === 200 && response?.data?.length > 0) {
        setPropertyList(
          response?.data?.filter((el: any) => el?.status === true)
        );
        setFinalPropertyList(
          response?.data?.filter((el: any) => el?.status === true)
        );
      } else {
        setPropertyList([]);
      }
    }
  }, [propertyData, selectedProperty]);

  const handleSearch = (searchKey: any) => {
    if (searchKey !== "") {
      const lowerCased = searchKey?.toLowerCase();
      const searchArray = [...propertyList];
      const list = searchArray?.filter((item) => {
        return item?.property_title?.toLowerCase()?.match(lowerCased);
      });
      setFinalPropertyList(list);
    } else {
      setFinalPropertyList(propertyList);
    }
  };

  const handleSelects = (items: any) => {
    var array: any[] = [...selectedProperty];
    var newarr = {
      property_id: items.property_id,
      active_status: true,
      _id: items._id,
      property_title: items.property_title,
      //"property_type": items.active_status,
    };
    const index = array.findIndex(
      (el: any) => el.property_id === items.property_id
    );
    if (index > -1) {
      array[index].active_status = true;
    } else {
      array.push(newarr);
    }
    setSelectedProperty(array);
  };
  const handleDelete = (items: any, index: any) => {
    var arrays: any[] = [...selectedProperty];
    // arrays?.splice(index, 1);
    arrays[index].active_status = false;
    setSelectedProperty(arrays);
  };
  const handleAllocateProperty = async () => {
    const arr: any = selectedProperty.map((prop: any) => prop?.property_id);
    setSelectedPropertyIds(arr);
    const params = {
      cp_id: CP_ID,
      property_tag: JSON.stringify(selectedProperty),
    };
    const res = await apiCall(
      "post",
      apiEndPoints.UPDATE_CP_PROPERTY_SM,
      params
    );
    const response: any = res?.data;
    if (response?.status === 200) {
      dispatch({ type: STOP_LOADING });
      setIsPropertyVisible(false);
      ErrorMessage({
        msg: response?.message,
        backgroundColor: GREEN_COLOR,
      });
    } else {
      dispatch({ type: STOP_LOADING });
      ErrorMessage({
        msg: response?.message,
        backgroundColor: RED_COLOR,
      });
    }
  };
  const openAllocatePropertyModal = async (id: any) => {
    dispatch(
      getAllProperty({
        // offset: 0,
        // limit: 100,
        // start_date: data?.start_date ? data?.start_date : '',
        // end_date: data?.end_date ? data?.end_date : '',
        // location: data?.location ? data?.location : '',
        // property_name: data?.property_name ? data?.property_name : '',
        // property_type: data?.property_type ? data?.property_type : '',
      })
    );
    dispatch({ type: START_LOADING });
   
    setCP_ID(id);
    const params = {
      cp_id: id,
    };
    const res = await apiCall(
      "post",
      apiEndPoints.GET_CP_PROPERTY_FOR_SM,
      params
    );
    const response: any = res?.data;
    if (response?.status === 200) {
      setIsPropertyVisible(true);
      if (response?.data?.length > 0) {
        dispatch({ type: STOP_LOADING });
        //setPropertyList(response?.data);
        setSelectedProperty(response?.data);
        // setFinalPropertyList(response?.data);
        
      } else {
        dispatch({ type: STOP_LOADING });
        setPropertyList([]);
        setSelectedProperty([]);
        
        
        // setFinalPropertyList([]);
      }
    } else {
      setIsPropertyVisible(true);
      dispatch({ type: STOP_LOADING });
      // ErrorMessage({
      //   msg: response?.message,
      //   backgroundColor: RED_COLOR,
      // });
      setSelectedProperty([]);
     
      // setFinalPropertyList([]);
    }
    // setIsPropertyVisible(true);
  };
  const handleStatusChange = (item: any) => {
    dispatch(
      updateAssignCP({
        user_id: item?._id,
        status: 2,
      })
    );
  };
  const onPressView = (data: any, type: any) => {
    if (type === "edit") {
      navigation.navigate("AddnewAgency", { type, data });
    } else {
      if (type === "view") {
        navigation.navigate("AgencyDetails", { data });
      }
    }
  };
  const onPressSeeEmployee = (data: any) => {
    navigation.navigate('EmployeeListing', {ID: data})
  };
  const onPressDeactivates = (data: any, type: any) => {
    dispatch(
      transferVisitList({
        user_id: data?._id,
      })
    );
    getAgencyList(0, {});
    // navigation.navigate("DeactiveAgency", { data });
  };
  const Onreachedend = (offSet: any) => {
    setOffset(offSet);
    dispatch(
      getAllAgentList({
        offset: offSet,
        limit: 3,
        module_id: "",
        start_date: filterData.startdate,
        end_date: filterData.enddate,
        user_type: 2,
        search_by_name: filterData.search_by_name,
        mobile_no: filterData.mobile_no,
        rera_no: filterData.rera_no,
        search_by_location: filterData.search_by_location,
        status: filterData.status,
      })
    );
  };
  return (
    <AgencyView
      handleDrawerPress={handleDrawerPress}
      setChangeStatus={setChangeStatus}
      changeStatus={changeStatus}
      handleStatusChange={handleStatusChange}
      setFilterData={setFilterData}
      filterData={filterData}
      onPressView={onPressView}
      agentList={agentList}
      Onreachedend={Onreachedend}
      offSET={offSET}
      moreData={moreData}
      getAgencyList={getAgencyList}
      setOffset={setOffset}
      setAgentList={setAgentList}
      onPressDeactivates={onPressDeactivates}
      isPropertyVisible={isPropertyVisible}
      setIsPropertyVisible={setIsPropertyVisible}
      handleSearch={handleSearch}
      finalPropertyList={finalPropertyList}
      handleSelects={handleSelects}
      handleDelete={handleDelete}
      selectedProperty={selectedProperty}
      handleAllocateProperty={handleAllocateProperty}
      openAllocatePropertyModal={openAllocatePropertyModal}
      onPressSeeEmployee={onPressSeeEmployee}
    />
  );
};

export default AgencyListing;
