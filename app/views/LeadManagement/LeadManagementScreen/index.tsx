// LeadManagementScreen.tsx

import { useFocusEffect } from "@react-navigation/native";
import moment from "moment";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { BackHandler, useWindowDimensions } from "react-native";
import { useDispatch, useSelector } from "react-redux";

import { getAllLeadsList } from "app/Redux/Actions/LeadsActions";
import strings from "app/components/utilities/Localization";
import { ROLE_IDS } from "app/components/utilities/constant";
import { visiterBackSubject } from "app/observables/backNavigationSubject";
import { DATE_FORMAT } from "react-native-gifted-chat";

import LeadManagementView from "./Components/LeadManagementView"; // presentational component

const LeadManagementScreen = ({ navigation, route }: any) => {
  const dispatch: any = useDispatch();
  const flatListRef: any = useRef(null);

  // Grab Redux state for paginated visitor/lead data:
  const { response = {}, list = "" } = useSelector(
    (state: any) => state.visitorDataList
  );
  // total number of items (for pagination)
  const moreData = response?.total_data || 0;

  // “filterData” now includes a `draft` boolean (default = false)
  const [filterData, setFilterData] = useState<any>({
    startdate: "",
    enddate: "",
    search_by_visisor_name: "",
    search_by_mobile_number: "",
    search_configuration: "",
    visit_score: "",
    property_id: "",
    property_type_title: "",
    property_title: "",
    visit_status: strings.warm,
    lead_status: "",
    qualified: "",
    lead_priority: "",
    // NEW:
    draft: false,
  });

  // The actual array of visitor objects that we display
  const [visitorList, setVisitorList] = useState<any[]>([]);
  // “Pagination offset” (i.e. page index) remains the same
  const [offSET, setOffset] = useState<number>(0);

  // Grab the logged-in user’s data from Redux
  const { userData = {} } = useSelector((state: any) => state.userData) || {};

  // “today” shortcut
  const todayDate = {
    startdate: moment(new Date()).format(DATE_FORMAT),
    enddate: moment(new Date()).format(DATE_FORMAT),
  };

  //
  // ─── TAB VIEW SETUP ────────────────────────────────────────────────────────────
  //
  // We want two tabs: “All Visitors” (key = "all") and “Draft Visitors” (key = "draft").
  // Initial index = 0 (“All”).
  //
  const layout = useWindowDimensions();
  const [index, setIndex] = useState<number>(0);
  const [routes] = useState<Array<{ key: string; title: string }>>([
    { key: "all", title: "All Visitors" },
    { key: "draft", title: "Draft Visitors" },
  ]);

  //
  // ─── USE FOCUS EFFECT ───────────────────────────────────────────────────────────
  //
  // When the screen is focused, fetch the first page of data for whichever tab is active.
  // We reuse the existing “today” / “fromReport” logic, but ALWAYS remember to append
  // `draft: index === 1` to filterData.
  //
  useFocusEffect(
    useCallback(() => {
      if (!visiterBackSubject.getValue()) {
        const { params } = route ?? {};

        // Base default (no dates, no searches)
        const defaultFilterData = {
          startdate: "",
          enddate: "",
          search_by_visisor_name: "",
          search_by_mobile_number: "",
          search_configuration: "",
          visit_score: "",
          property_id: "",
          property_type_title: "",
          property_title: "",
          visit_status: strings.warm,
          lead_status: "",
          qualified: "",
          lead_priority: "",
          draft: index === 1, // if we opened on “Draft Visitors” tab, draft = true
        };

        // Start with the “all” tab (index = 0) or “draft” (index = 1)
        let newFilterData = { ...defaultFilterData };

        if (params === "today") {
          newFilterData = {
            ...newFilterData,
            startdate: todayDate.startdate,
            enddate: todayDate.enddate,
          };
          getVisitorsList(0, {
            ...todayDate,
            draft: index === 1,
          });
        } else if (params?.fromReport) {
          newFilterData = {
            ...newFilterData,
            startdate: params.sDate,
            enddate: params.eDate,
          };
          getVisitorsList(0, {
            startdate: params.sDate,
            enddate: params.eDate,
            draft: index === 1,
          });
        } else {
          // “normal” – no initial date filters
          getVisitorsList(0, { draft: index === 1 });
        }

        setFilterData(newFilterData);
      } else {
        // If we got here because the back button was pressed—just reset the back subject
        visiterBackSubject.next(false);
      }

      // Clean up: no special unsubscribes needed besides returning nothing
      return () => {};
    }, [navigation, route, index]) // re-run whenever “index” (tab) changes or we refocus
  );

  useEffect(() => {
    if (response?.status === 200) {
      if (offSET === 0) {
        setVisitorList(response?.data || []);
      } else {
        // subsequent page → append
        setVisitorList((prev) => [...prev, ...(response?.data || [])]);
      }
    } else {
      setVisitorList([]);
    }
  }, [response]);

  const getVisitorsList = (offset: number, data: any) => {
    const { params } = route ?? {};
    setOffset(offset);

    dispatch(
      getAllLeadsList({
        offset: offset,
        limit: 10,
        start_date: data?.startdate || "",
        end_date: data?.enddate || "",
        search_by_visisor_name: data?.search_by_visisor_name || "",
        search_by_mobile_number: data?.search_by_mobile_number || "",
        search_configuration: data?.search_configuration || "",
        visit_score: data?.visit_score || "",
        property_id: data?.property_id || "",
        visit_status: data?.visit_status || "",
        lead_status: data?.lead_status || "",
        qualified: data?.qualified || "",
        lead_priority: data?.lead_priority || "",
        // NEW:
        draft: data?.draft ? true : undefined,
        // Keep the existing “reportdata” logic (only for certain roles)
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

  // useEffect(() => {
  //   // Build a brand-new filterData with the current tab’s `draft` flag:
  //   const newFd = { ...filterData, draft: index === 1 };
  //   setFilterData(newFd);
  //   // Clear list & fetch page 0
  //   setVisitorList([]);
  //   console.log("bbbbbbbbbbbbbbbbbbbbbbbbbbbbb")
  //   getVisitorsList(0, newFd);
  // }, [index]);

  return (
    <LeadManagementView
      handleDrawerPress={handleDrawerPress}
      visitorList={visitorList}
      moreData={moreData}
      getVisitorsList={getVisitorsList}
      filterData={filterData}
      setFilterData={setFilterData}
      setVisitorList={setVisitorList}
      offSET={offSET}
      flatListRef={flatListRef}
      params={route?.params}
      index={index}
      setIndex={setIndex}
      routes={routes}
      layout={layout}
      onTabIndexChange={(i: number) => setIndex(i)}
    />
  );
};

export default LeadManagementScreen;
