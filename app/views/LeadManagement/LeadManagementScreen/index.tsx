import React, { useEffect, useRef, useState } from "react";
import { View, Text } from "react-native";
import LeadManagementView from "./Components/LeadManagementView";
import { useDispatch, useSelector } from "react-redux";
import { useFocusEffect } from "@react-navigation/native";
import { getAllLeadsList } from "app/Redux/Actions/LeadsActions";
import strings from "app/components/utilities/Localization";
import { todayDate } from "app/components/utilities/constant";
import moment from "moment";
import { DATE_FORMAT } from "react-native-gifted-chat";

const LeadManagementScreen = ({ navigation, route }: any) => {
  const dispatch: any = useDispatch();
  const flatListRef: any = useRef(null);
  const { response = {}, list = "" } = useSelector(
    (state: any) => state.visitorDataList
  );
  const moreData = response?.total_data || 0;
  const [filterData, setFilterData] = useState({
    startdate: "",
    enddate: "",
    search_by_visisor_name: "",
    search_configuration: "",
    visit_score: "",
    property_id: "",
    property_type_title: "",
    property_title: "",
    visit_status: strings.warm,
    lead_status: "",
  });
  const [visitorList, setVisiitorList] = useState<any>([]);
  const [offSET, setOffset] = useState(0);

  const todayDate = {
    startdate: moment(new Date()).format(DATE_FORMAT),
    enddate: moment(new Date()).format(DATE_FORMAT),
  };

  useFocusEffect(
    React.useCallback(() => {
      setFilterData({
        startdate: "",
        enddate: "",
        search_by_visisor_name: "",
        search_configuration: "",
        visit_score: "",
        property_id: "",
        property_type_title: "",
        property_title: "",
        visit_status: strings.warm,
        lead_status: "",
      });
      if (route?.params === "today") {
        getVisitorsList(0, todayDate);
      } else {
        getVisitorsList(0, {});
      }
      return () => {};
    }, [navigation, route])
  );

  useEffect(() => {
    console.log(
      "🚀 ~ file: index.tsx:63 ~ response?.status:",
      response?.status
    );
    if (response?.status === 200) {
      console.log("🚀 ~ file: index.tsx:65 ~ offSET:", offSET);
      if (offSET === 0) {
        setVisiitorList(response?.data);
      } else {
        setVisiitorList([...visitorList, ...response?.data]);
      }
    } else {
      setVisiitorList([]);
    }
  }, [response]);

  const getVisitorsList = (offset: any, data: any) => {
    setOffset(offset);
    dispatch(
      getAllLeadsList({
        offset: offset,
        limit: 3,
        start_date: data?.startdate ? data?.startdate : "",
        end_date: data?.enddate ? data?.enddate : "",
        search_by_visisor_name: data?.search_by_visisor_name
          ? data?.search_by_visisor_name
          : "",
        search_configuration: data?.search_configuration
          ? data?.search_configuration
          : "",
        visit_score: data?.visit_score ? data?.visit_score : "",
        property_id: data?.property_id ? data?.property_id : "",
        visit_status: data?.visit_status ? data?.visit_status : "",
        lead_status: data?.lead_status ? data?.lead_status : "",
      })
    );
  };
  const handleDrawerPress = () => {
    navigation.toggleDrawer();
  };
  return (
    <LeadManagementView
      handleDrawerPress={handleDrawerPress}
      visitorList={visitorList}
      moreData={moreData}
      getVisitorsList={getVisitorsList}
      filterData={filterData}
      setFilterData={setFilterData}
      setVisiitorList={setVisiitorList}
      offSET={offSET}
      flatListRef={flatListRef}
    />
  );
};

export default LeadManagementScreen;
