import { View, Text } from "react-native";
import React, { useEffect, useLayoutEffect, useState } from "react";
import FollowUpView from "./Components/FollowUpView";
import { useDispatch, useSelector } from "react-redux";
import { useFocusEffect } from "@react-navigation/native";
import { getAllFollowUpList } from "app/Redux/Actions/FollowUpActions";
import { followUpBackSubject } from "app/observables/backNavigationSubject";

const FollowUpScreen = ({ navigation }: any) => {
  const [followUpList, setFollowUpList] = useState<any>([]);
  const [offSET, setOffset] = useState(0);
  const dispatch: any = useDispatch();
  const { response = {}, list = "" } = useSelector(
    (state: any) => state.followUp
  );
  const moreData = response?.total_data || 0;
  const [filterData, setFilterData] = useState({
    startdate: "",
    enddate: "",
    followup_for: "",
    lead_id: "",
  });
  const handleDrawerPress = () => {
    navigation.toggleDrawer();
  };

  // useFocusEffect(
  //   React.useCallback(() => {
  //     getFollowupList(offSET, {});
  //     return () => { };
  //   }, [navigation, list])
  // );
  // useFocusEffect(
  //   React.useCallback(() => {
  //     setFilterData({
  //       startdate: "",
  //       enddate: "",
  //       followup_for: '',
  //       lead_id: ''
  //     })
  //     return () => { };
  //   }, [navigation])
  // );

  useFocusEffect(
    React.useCallback(() => {
      console.log("!followUpBackSubject.getValue()",!followUpBackSubject.getValue());
      
      if (!followUpBackSubject.getValue()) {
        setFilterData({
          startdate: "",
          enddate: "",
          followup_for: "",
          lead_id: "",
        });
        getFollowupList(offSET, {});
      } else {
        followUpBackSubject.next(false);
      }
      return () => {};
    }, [navigation, list, followUpBackSubject])
  );

  useEffect(() => {
    if (response?.status === 200) {
      if (response?.data?.length > 0) {
        if (offSET === 0 || offSET === undefined) {
          setFollowUpList(response?.data);
        } else {
          setFollowUpList([...followUpList, ...response?.data]);
        }
      }
    } else {
      setFollowUpList([]);
    }
  }, [response]);

  const getFollowupList = (offset: any, data: any) => {
    setOffset(offset);
    dispatch(
      getAllFollowUpList({
        offset: offset,
        limit: 10,
        start_date: data?.startdate ? data?.startdate : "",
        end_date: data?.enddate ? data?.enddate : "",
        followup_for: data?.followup_for ? data?.followup_for : "",
        lead_id: data?.lead_id ? data?.lead_id : "",
      })
    );
  };
  return (
    <>
      <FollowUpView
        handleDrawerPress={handleDrawerPress}
        getFollowupList={getFollowupList}
        setFilterData={setFilterData}
        offSET={offSET}
        setFollowUpList={setFollowUpList}
        followUpList={followUpList}
        moreData={moreData}
        filterData={filterData}
      />
    </>
  );
};

export default FollowUpScreen;
