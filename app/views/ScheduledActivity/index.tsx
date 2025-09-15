import { useFocusEffect } from "@react-navigation/native";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { useWindowDimensions } from "react-native";
import { useDispatch, useSelector } from "react-redux";

import ErrorMessage from "../../components/ErrorMessage";
import { GREEN_COLOR } from "../../components/utilities/constant";
import {
  closefollowupRemove,
  GetScheduledActivityList,
} from "../../Redux/Actions/ActivityActions";
import ScheduledActivityView from "./components/ScheduledActivityView";

const ITEMS_PER_PAGE = 10;

const ScheduledActivityScreen = ({ navigation, route }: any) => {
  const dispatch: any = useDispatch();
  const flatListRef = useRef(null);
  const { width } = useWindowDimensions();

  const { response = {}, list = "" } = useSelector(
    (state: any) => state.scheduledActivity
  );
  const moreData = response?.total_data || 0;

  const [filterData, setFilterData] = useState({
    startDate: "",
    endDate: "",
    lead_id: "",
    status: true,
    due: false,
  });
  const closefollowUP = useSelector((state: any) => state.closefollowUP);

  const [activityList, setActivityList] = useState([]);
  const [offset, setOffset] = useState(0);
  const [tabIndex, setTabIndex] = useState(0);

  const routes = [
    { key: "active", title: "Active" },
    { key: "closed", title: "Closed" },
  ];

  // Focus or tab change triggers a fresh load
  useFocusEffect(
    useCallback(() => {
      const initialFilter = {
        startDate: "",
        endDate: "",
        lead_id: "",
        status: tabIndex === 0,
        due: false,
      };
      setFilterData(initialFilter);
      fetchActivities(0, initialFilter);
    }, [tabIndex])
  );

  // Update list when API response arrives
  useEffect(() => {
    if (response?.status === 200) {
      const newData = response.data || [];
      setActivityList((prev) =>
        offset === 0 ? newData : [...prev, ...newData]
      );
    } else {
      setActivityList([]);
    }
  }, [response, offset]);

  // Fetch function
  const fetchActivities = (newOffset: number, filters: any) => {
    setOffset(newOffset);
    dispatch(
      GetScheduledActivityList({
        offset: newOffset,
        limit: ITEMS_PER_PAGE,
        start_date: filters.startDate,
        end_date: filters.endDate,
        lead_id: filters.lead_id,
        status: filters.status,
        due: filters.due,
      })
    );
  };

  useEffect(() => {
    if (closefollowUP?.response?.status === 200) {
      fetchActivities(offset, filterData);

      // Delay API refresh by 3 seconds
      const timer = setTimeout(() => {
        dispatch(closefollowupRemove());
        ErrorMessage({
          msg: closefollowUP?.response?.message,
          backgroundColor: GREEN_COLOR,
        });
      }, 100);

      // Cleanup in case component unmounts early
      return () => clearTimeout(timer);
    }
  }, [closefollowUP]);

  return (
    <ScheduledActivityView
      flatListRef={flatListRef}
      activityList={activityList}
      totalItems={moreData}
      offset={offset}
      filterData={filterData}
      tabIndex={tabIndex}
      routes={routes}
      layoutWidth={width}
      onTabChange={setTabIndex}
      setFilterData={setFilterData}
      fetchActivities={fetchActivities}
      onDrawerPress={() => navigation.toggleDrawer()}
      fromReport={route.params?.fromReport}
    />
  );
};

export default ScheduledActivityScreen;
