import { useFocusEffect } from "@react-navigation/native";
import { getAllLeadsList } from "app/Redux/Actions/LeadsActions";
import strings from "app/components/utilities/Localization";
import moment from "moment";
import React, { useEffect, useRef, useState } from "react";
import { DATE_FORMAT } from "react-native-gifted-chat";
import { useDispatch, useSelector } from "react-redux";
import LeadManagementView from "./Components/LeadManagementView";
import { ROLE_IDS } from "app/components/utilities/constant";
import { BackHandler } from "react-native";

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
  const { userData = {} } = useSelector((state: any) => state.userData) || [];
  const todayDate = {
    startdate: moment(new Date()).format(DATE_FORMAT),
    enddate: moment(new Date()).format(DATE_FORMAT),
  };

  useFocusEffect(
    React.useCallback(() => {
      const { params } = route ?? {}; // Destructure route params
      const defaultFilterData = {
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
      };

      let filterData = { ...defaultFilterData };

      if (params === "today") {
        filterData = {
          ...filterData,
          startdate: todayDate.startdate,
          enddate: todayDate.enddate,
        };
        getVisitorsList(0, todayDate);
      } else if (params?.fromReport) {
        filterData = {
          ...filterData,
          startdate: params.sDate,
          enddate: params.eDate,
        };
        getVisitorsList(0, {
          startdate: params.sDate,
          enddate: params.eDate,
        });
      } else {
        getVisitorsList(0, {});
      }

      setFilterData(filterData);

      return () => {};
    }, [navigation, route])
  );

  useEffect(() => {
    console.log(
      "🚀 ~ file: index.tsx:63 ~ response?.status:",
      response?.status
    );
    if (response?.status === 200) {
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
    const { params } = route ?? {};
    setOffset(offset);
    dispatch(
      getAllLeadsList({
        offset: offset,
        limit: 10,
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
        reportdata:
          userData?.data?.role_id == ROLE_IDS.closingtl_id ||
          userData?.data?.role_id == ROLE_IDS.closing_head_id ||
          userData?.data?.role_id == ROLE_IDS.closingmanager_id ||
          userData?.data?.role_id == ROLE_IDS.scm_id
            ? params?.fromReport
              ? true
              : undefined
            : undefined,
      })
    );
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
      params={route?.params}
    />
  );
};

export default LeadManagementScreen;
