import { useFocusEffect } from "@react-navigation/native";
import { getAllAgentList } from "../../../Redux/Actions/AgencyActions";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import EmployeeView from "./components/EmployeeView";

const EmployeeListing = ({ navigation, route }: any) => {
  const { ID } = route?.params || {};
  const { response = {}, list = false } =
    useSelector((state: any) => state.agentData) || [];
  const statusUpdate = useSelector((state: any) => state.agencyStatus) || {};
  const { userData = {} } = useSelector((state: any) => state.userData) || [];
  const moreData = response?.total_data || 0;
  const [agentList, setAgentList] = useState<any>([]);
  const [offSET, setOffset] = useState(0);
  const [filterData, setFilterData] = useState({
    startdate: "",
    enddate: "",
    search_by_name: "",
    search_by_location: "",
    status: "",
  });
  const [changeStatus, setChangeStatus] = useState({});
  const dispatch: any = useDispatch();

  useFocusEffect(
    React.useCallback(() => {
      setAgentList([]);
      getAgencyList(0, {});
      return () => {};
    }, [navigation, statusUpdate])
  );

  useEffect(() => {
    if (response?.status === 200) {
      if (offSET === 0) {
        setAgentList(response?.data);
      } else {
        setAgentList([...agentList, ...response?.data]);
      }
    } else {
      setAgentList([]);
    }
  }, [response]);

  const getAgencyList = (offset: any, filterData: any) => {
    setOffset(offset);
    dispatch(
      getAllAgentList({
        user_type: 2,
        cp_user_id: ID,
        // cp_user_id: "64a6b93054b6734a50a9187c",
        limit: 6,
        offset: offset,
      })
    );
  };

  const handleBackPress = () => {
    navigation.goBack();
  };
  const onAddEmployeeButtonPress = (data: any, type: any) => {
    navigation.navigate("AddEmployee", { data, type, ID: ID });
  };
  const onPressView = (data: any, type: any) => {
    if (type === "edit") {
      navigation.navigate("AddEmployee", { type, data });
    }
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
        search_by_location: filterData.search_by_location,
        status: filterData.status,
      })
    );
  };
  return (
    <EmployeeView
      handleBackPress={handleBackPress}
      setChangeStatus={setChangeStatus}
      changeStatus={changeStatus}
      setFilterData={setFilterData}
      filterData={filterData}
      agentList={agentList}
      Onreachedend={Onreachedend}
      offSET={offSET}
      moreData={moreData}
      getAgencyList={getAgencyList}
      setOffset={setOffset}
      setAgentList={setAgentList}
      onPressView={onPressView}
      onAddEmployeeButtonPress={onAddEmployeeButtonPress}
      userData={userData}
    />
  );
};

export default EmployeeListing;
