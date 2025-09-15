import { useFocusEffect } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllFollowUpList } from "../../../Redux/Actions/FollowUpActions";
import AllFollowUpView from "./Components/AllFollowUpView";

const AllFollowUpScreen = ({ navigation, route }: any) => {
  const data = route?.params || {};
  const [allFollowUpList, setAllFollowUpList] = useState<any>([]);
  const [offSET, setOffset] = useState(0);
  const dispatch: any = useDispatch();
  const { response = {}, list = "" } = useSelector(
    (state: any) => state.followUp
  );
  useFocusEffect(
    React.useCallback(() => {
      getAllFollowupList(0, []);
      return () => {};
    }, [navigation, list])
  );
  const getAllFollowupList = (offset: any, array: any) => {
    setOffset(offset);
    dispatch(
      getAllFollowUpList({
        offset: offset,
        limit: 10,
        lead_id: data?.lead_id ? data?.lead_id : "",
      })
    );
  };
  useEffect(() => {
    if (response?.status === 200) {
      if (offSET == 0) {
        setAllFollowUpList(response?.data);
      } else {
        setAllFollowUpList([...allFollowUpList, ...response?.data]);
      }
    } else {
      setAllFollowUpList([]);
    }
  }, [response]);

  const handleBackPres = () => {
    navigation.goBack();
  };
  return (
    <>
      <AllFollowUpView
        handleBackPres={handleBackPres}
        allFollowUpList={allFollowUpList}
        getAllFollowupList={getAllFollowupList}
        setOffset={setOffset}
        offSET={offSET}
      />
    </>
  );
};

export default AllFollowUpScreen;
