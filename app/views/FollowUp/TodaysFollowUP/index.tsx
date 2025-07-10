import { useFocusEffect } from "@react-navigation/native";
import { DATE_FORMAT } from "app/components/utilities/constant";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import FollowUpView from "./FollowUpView";
import { getAllFollowUpList } from "app/Redux/Actions/FollowUpActions";

const TodaysFollowUpScreen = ({ navigation, route }: any) => {
  const [followUpList, setFollowUpList] = useState<any>([]);
  const dispatch: any = useDispatch();
  const { response = {}, list = "" } = useSelector(
    (state: any) => state.followUp
  );
  const moreData = response?.total_data || 0;

  const handleDrawerPress = () => {
    navigation.toggleDrawer();
  };

  useFocusEffect(
    React.useCallback(() => {
      getFollowupList();
      return () => {};
    }, [navigation, list, route])
  );

  useEffect(() => {
    if (response?.status === 200) {
      if (response?.data?.length > 0) {
        setFollowUpList(response?.data);
      }
    } else {
      setFollowUpList([]);
    }
  }, [response]);

  const getFollowupList = () => {
    const currentDate = moment().format(DATE_FORMAT);
    dispatch(
      getAllFollowUpList({
        offset: 0,
        limit: "",
        start_date: currentDate,
        end_date: currentDate,
        followup_for: "",
        lead_id: "",
        todayFollowup: true,
      })
    );
  };
  return (
    <>
      <FollowUpView
        handleDrawerPress={handleDrawerPress}
        getFollowupList={getFollowupList}
        offSET={0}
        setFollowUpList={setFollowUpList}
        followUpList={followUpList}
        moreData={moreData}
      />
    </>
  );
};

export default TodaysFollowUpScreen;
