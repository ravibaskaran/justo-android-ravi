import { useFocusEffect } from "@react-navigation/native";
import ErrorMessage from "app/components/ErrorMessage";
import { GREEN_COLOR, RED_COLOR, ROLE_IDS } from "app/components/utilities/constant";
import { AddTargetForCpAction, removeAddTarget } from "app/Redux/Actions/AgencyActions";
import {
  allocatePropertyToUser,
  getManagerList,
  removeAllocateData,
} from "app/Redux/Actions/propertyActions";
import { getAssignCPList } from "app/Redux/Actions/SourcingManagerActions";
import React, { useEffect, useLayoutEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import AllocateCP from "./components/AllocateCP";

const AllocatePropertyScreen = ({ navigation, route }: any) => {
  const { id, type } = route?.params || {};
  const {
    response = {},
    list,
    create,
    allocated
  } = useSelector((state: any) => state.propertyData) || [];
  const removeAllocateproperty = useSelector((state: any) => state.removeAllocateproperty)
  const AddTargetForCp = useSelector((state: any) => state.addTargetForCpData);
  const { userData = {} } = useSelector((state: any) => state.userData)

  const [cpList, setCpList] = useState<any>([]);
  const [searchcpList, setSearchcpList] = useState<any>([]);
  const dispatch: any = useDispatch();
  const [selectedCp, setSelected] = useState<any>([]);
  const [selectedUserForTarget, setSelectedUserForTarget] = useState<any>([]);
  const [selectedLoginIdCp, setSelectedLoginIdCp] = useState<any>([]);
  const [allList, setAllList] = useState(true);
  const [CPDetails, setCPDetails] = useState(false);
  const [isVisible, setIsVisible] = useState<any>(false);
  const [targetForm, setTargetForm] = useState<any>({
    // month: "",
    // year: "",
    // site_visit_target: "",
    // visit_target: "",
    // closing_target: "",
    // booking_target: "",
    // registration_target: "",
  });
  const onPressBack = () => {
    navigation.goBack();
  };
  const onPressAllocateCp = () => {
    // navigation.goBack()
  };

  useFocusEffect(
    React.useCallback(() => {
      dispatch(
        getManagerList({
          property_id: id,
        })
      );
      // const constantArry: any[] = [...response.data];
      return () => { };
    }, [navigation, list])
  );
  useEffect(() => {
    if(userData?.data?.role_id === ROLE_IDS.sourcingmanager_id) {
      if(allocated){
        navigation.goBack();
      }
    } else if (allocated) {
      setIsVisible(true);
    }
    if (response.status === 200) {
      if (response?.data?.length > 0) {
        setCpList(response?.data);
        setSearchcpList(response?.data);
        setSelected(
          response?.data?.filter((item: any) => item?.allocate_status?.length > 0)
        );
        // ErrorMessage({
        //   msg: response.message,
        //   backgroundColor: GREEN_COLOR
        // })
      } else {
      }
    } else {
      setCpList([]);
      setSearchcpList([]);
    }
    if (removeAllocateproperty?.response?.status === 200) {
      
      ErrorMessage({
        msg: removeAllocateproperty?.response?.message,
        backgroundColor: GREEN_COLOR
      })
      navigation.goBack();
      setIsVisible(true);
      dispatch(removeAllocateData())
    }
  }, [response, removeAllocateproperty]);
  useEffect(() => {
    if (AddTargetForCp?.response?.status === 200) {
      ErrorMessage({
        msg: AddTargetForCp?.response?.message,
        backgroundColor: GREEN_COLOR
      })
      dispatch(removeAddTarget())
      setTimeout(() => {
        setIsVisible(false);
        navigation.goBack()
      }, 2000)
     // navigation.navigate("SourcingManager");
    }
  }, [AddTargetForCp]);
  const handleSelects = (items: any) => {
    var array: any[] = [...selectedCp];
    var arrayLoginID: any[] = [...selectedLoginIdCp];
    array.push(items);
    arrayLoginID.push(items.login_id);
    setSelectedLoginIdCp(arrayLoginID);
    setSelected(array);
    // setCPDetails(true)
  };
  const handleDelete = (items: any, index: any) => {
    var arrays: any[] = [...selectedCp];
    var arrayLoginID: any[] = [...selectedLoginIdCp];
    arrays?.splice(index, 1);
    arrayLoginID?.splice(index, 1);
    setSelectedLoginIdCp(arrayLoginID);
    setSelected(arrays);
  };
  const handleSearch = (searchKey: any) => {
    if (searchKey !== "") {
      const lowerCased = searchKey?.toLowerCase();
      const searchArray = [...cpList];
      const list = searchArray?.filter((item) => {
        return item?.user_name?.toLowerCase()?.match(lowerCased);
      });
      // setCpList(list);
      setSearchcpList(list)
    } else {
      setSearchcpList(cpList);
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
  const handleSmAllocationPress = () => {
    setCPDetails(false);
    setSelectedUserForTarget(selectedLoginIdCp)
    dispatch(
      allocatePropertyToUser({
        user_id: selectedLoginIdCp,
        property_id: id,
      })
    );
    // navigation.navigate('PropertyScreenView')
  };
  return (
    <AllocateCP
      setSelectedLoginIdCp={setSelectedLoginIdCp}
      selectedLoginIdCp={selectedLoginIdCp}
      onPressBack={onPressBack}
      cpList={searchcpList}
      selectedCp={selectedCp}
      allList={allList}
      setAllList={setAllList}
      handleSearch={handleSearch}
      handleSelects={handleSelects}
      handleDelete={handleDelete}
      CPDetails={CPDetails}
      setCPDetails={setCPDetails}
      handleAddTarget={handleAddTarget}
      handleSmAllocationPress={handleSmAllocationPress}
      // onPressCreate={onPressCreate}
      isVisible={isVisible}
      setIsVisible={setIsVisible}
      targetForm={targetForm}
      setTargetForm={setTargetForm}
    />
  );
};

export default AllocatePropertyScreen;
