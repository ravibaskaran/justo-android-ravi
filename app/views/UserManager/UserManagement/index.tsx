import { useFocusEffect } from "@react-navigation/native";
import { AddTargetForCpAction, removeAddTarget } from "app/Redux/Actions/AgencyActions";
import { getClosingManagerList } from "app/Redux/Actions/ClosingManager";
import { getUsersListForSiteHead } from "app/Redux/Actions/UserManagerActions";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import UserManagementView from "./components/UserManagementView";
import ErrorMessage from "app/components/ErrorMessage";
import { GREEN_COLOR } from "app/components/utilities/constant";

const UserManagementScreen = ({ navigation }: any) => {
  const [status, setStatus] = useState(false);
  const [filterisVisible, setFilterisVisible] = useState(false);
  const [usersList, setUsersList] = useState<any>([]);
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
  const [offSET, setOffset] = useState(0);
  const dispatch: any = useDispatch();
  const { response = {}, list = "" } =
    useSelector((state: any) => state.UserManager) || {};
  const AddTargetForCp = useSelector((state: any) => state.addTargetForCpData);


  const [filterData, setFilterData] = useState({
    start_date: "",
    end_date: "",
    followup_for: "",
  });

  useFocusEffect(
    React.useCallback(() => {
      getUsersList();
      return () => {};
    }, [navigation])
  );
  useEffect(() => {
    if (response?.status === 200) {
      setUsersList(response?.data);
    } else {
      // setUsersList([])
    }
  }, [response]);
  useEffect(() => {
    if (AddTargetForCp?.response?.status === 200) {
      ErrorMessage({
        msg: AddTargetForCp?.response?.message,
        backgroundColor: GREEN_COLOR
      })
      dispatch(removeAddTarget())
      setTimeout(() => {
        setIsVisible(false);
        // navigation.goBack()
      }, 2000)
     // navigation.navigate("SourcingManager");
    }
  }, [AddTargetForCp]);
  const getUsersList = () => {
    dispatch(getUsersListForSiteHead({}));
  };

  const onRefresh = () => {
    getUsersList();
  };
  const handleFilterApply = () => {
    getUsersList();
  };

  const handleDrawerPress = () => {
    navigation.toggleDrawer();
  };
  const handleAddNewUser = (type: any, data: any) => {
    if (type === "edit") {
      navigation.navigate("AddNewUserScreen", { type, data });
    } else {
      navigation.navigate("AddNewUserScreen");
    }
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

  const onPressEditTarget = (data: any) => {
    setSelectedUserForTarget([data._id])
    setRoleIdForSelectedUser(data.role_id)
    setIsVisible(true)
  };

  const onPressViews = (item: any) => {
    navigation.navigate("UserDetailsScreen", item);
  };

  return (
    <UserManagementView
      handleDrawerPress={handleDrawerPress}
      filterisVisible={filterisVisible}
      setFilterisVisible={setFilterisVisible}
      handleAddNewUser={handleAddNewUser}
      onPressEditTarget={onPressEditTarget}
      isVisible={isVisible}
      setIsVisible={setIsVisible}
      targetForm={targetForm}
      setTargetForm={setTargetForm}
      roleIdForSelectedUser={roleIdForSelectedUser}
      handleAddTarget={handleAddTarget}
      onPressViews={onPressViews}
      status={status}
      setStatus={setStatus}
      usersList={usersList}
      onRefresh={onRefresh}
    />
  );
};

export default UserManagementScreen;
