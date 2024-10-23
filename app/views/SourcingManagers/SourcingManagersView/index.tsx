import { useFocusEffect } from "@react-navigation/native";
import {
  AddTargetForCpAction,
  removeAddTarget,
} from "app/Redux/Actions/AgencyActions";
import {
  getSourcingHeadSMList,
  getSourcingManagerList,
} from "app/Redux/Actions/SourcingManagerActions";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import SourcingDetailsView from "./components/SourcingManager";
import ErrorMessage from "app/components/ErrorMessage";
import { GREEN_COLOR, ROLE_IDS } from "app/components/utilities/constant";

const SourcingDetailScreen = ({ navigation, route }: any) => {
  const { type } = route?.params || {};
  const [status, setStatus] = useState(false);
  const [filterisVisible, setFilterisVisible] = useState(false);
  const [sourcingManagers, setSourcingManagers] = useState<any>([]);
  const [offSET, setOffset] = useState(0);
  const [isVisible, setIsVisible] = useState<any>(false);
  const [selectedUserForTarget, setSelectedUserForTarget] = useState<any>([]);
  const [roleIdForSelectedUser, setRoleIdForSelectedUser] = useState<any>([]);
  const [targetForm, setTargetForm] = useState<any>({
    // month: "",
    // year: "",
    // site_visit_target: "",
    // visit_target: "",
    // closing_target: "",
    // booking_target: "",
    // registration_target: "",
  });
  const dispatch: any = useDispatch();
  const { response = {}, list = "" } = useSelector(
    (state: any) => state.SourcingManager
  );
  const AddTargetForCp = useSelector((state: any) => state.addTargetForCpData);
  const { userData = {} } = useSelector((state: any) => state.userData);
  const [filterData, setFilterData] = useState({
    start_date: "",
    end_date: "",
    followup_for: "",
  });

  useFocusEffect(
    React.useCallback(() => {
      getSMList(offSET);
      return () => {};
    }, [navigation, list, type])
  );
  useEffect(() => {
    if (list || response?.status) {
      if (offSET == 0) {
        setSourcingManagers(response?.data);
      } else {
        setSourcingManagers([...sourcingManagers, ...response?.data]);
      }
    }
  }, [response]);
  useEffect(() => {
    if (AddTargetForCp?.response?.status === 200) {
      ErrorMessage({
        msg: AddTargetForCp?.response?.message,
        backgroundColor: GREEN_COLOR,
      });
      dispatch(removeAddTarget());
      setTimeout(() => {
        setIsVisible(false);
        // navigation.goBack()
      }, 2000);
      // navigation.navigate("SourcingManager");
    }
  }, [AddTargetForCp]);
  const getSMList = (offset: any) => {
    setOffset(offset);
    if (userData?.data?.role_id === ROLE_IDS.sourcing_head_id) {
      dispatch(getSourcingHeadSMList({}));
    } else {
      dispatch(getSourcingManagerList({}));
    }
    // toGetDatas(array)
  };

  const onRefresh = () => {
    setFilterData({
      start_date: "",
      end_date: "",
      followup_for: "",
    });
    getSMList(0);
    // props.setFilter({})
  };
  const handleFilterApply = () => {
    getSMList(0);
  };

  const handleDrawerPress = () => {
    navigation.toggleDrawer();
  };
  const handleAddNewSM = (type: any, data: any) => {
    if (type === "edit") {
      navigation.navigate("AddNewSM", { type: type, data: data });
    } else {
      navigation.navigate("AddNewSM");
    }
  };
  const onPressAllocateCp = (item: any) => {
    navigation.navigate("AllocateCP", item?._id);
  };
  const onPressEditTarget = (item: any) => {
    setSelectedUserForTarget([item._id]);
    setRoleIdForSelectedUser(item.role_id);
    setIsVisible(true);
  };
  const handleAddTarget = () => {
    dispatch(
      AddTargetForCpAction({
        user_id: selectedUserForTarget,
        ...targetForm,
      })
    );
    // navigation.navigate('PropertyScreenView')
  };
  const onPressViews = (item: any) => {
    navigation.navigate("SMDetails", item);
  };

  return (
    <SourcingDetailsView
      handleDrawerPress={handleDrawerPress}
      filterisVisible={filterisVisible}
      setFilterisVisible={setFilterisVisible}
      handleAddNewSM={handleAddNewSM}
      onPressAllocateCp={onPressAllocateCp}
      onPressViews={onPressViews}
      status={status}
      setStatus={setStatus}
      sourcingManagers={sourcingManagers}
      onRefresh={onRefresh}
      onPressEditTarget={onPressEditTarget}
      handleAddTarget={handleAddTarget}
      isVisible={isVisible}
      setIsVisible={setIsVisible}
      targetForm={targetForm}
      setTargetForm={setTargetForm}
      roleIdForSelectedUser={roleIdForSelectedUser}
    />
  );
};

export default SourcingDetailScreen;
