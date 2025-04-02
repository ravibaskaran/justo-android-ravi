import React, { useEffect, useLayoutEffect, useState } from "react";
import FollowUpDetailsView from "./Components/FollowUpDetailsView";
import { useDispatch, useSelector } from "react-redux";
import { useFocusEffect } from "@react-navigation/native";
import { getAllFollowUpDetails } from "app/Redux/Actions/FollowUpActions";
import { followUpBackSubject } from "app/observables/backNavigationSubject";
import { apiCall } from "app/components/utilities/httpClient";
import apiEndPoints from "app/components/utilities/apiEndPoints";

const FollowUpDetails = ({ navigation, route }: any) => {
  const followUpId = route?.params || "";
  const [isloading, setIsloading] = useState(false);
  const { response = {}, detail = "" } = useSelector(
    (state: any) => state.followUp
  );
  const [detailsData, setDetailsData] = useState<any>([]);

  const dispatch: any = useDispatch();
  const handleBackPress = () => {
    navigation.goBack();
    followUpBackSubject.next(true);
  };
  const handleStatusUpdate = () => {
    navigation.navigate("FollUpAdd", followUpId);
  };

  const getAllFollowUpDetails = async () => {
    const res = await apiCall("post", apiEndPoints.GET_FOLLOWUP_DETAILS, {
      followup_id: followUpId?._id,
    });

    console.log(" followup_id", followUpId?._id);

    if (res?.data?.status) setIsloading(false);
    setDetailsData(res?.data?.data);
  };

  useFocusEffect(
    React.useCallback(() => {
      if (followUpId?._id) {
        setIsloading(true);
        getAllFollowUpDetails();
      }
      return () => {};
    }, [navigation])
  );

  return (
    <>
      <FollowUpDetailsView
        handleBackPress={handleBackPress}
        detailsData={detailsData}
        handleStatusUpdate={handleStatusUpdate}
      />
    </>
  );
};

export default FollowUpDetails;
