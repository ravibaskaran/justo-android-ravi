import { useFocusEffect } from "@react-navigation/native";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import InventoryModal from "../../../components/Modals/InventoryModal";
import apiEndPoints from "../../../components/utilities/apiEndPoints";
import { JW_LOGIN, JW_PASSWORD } from "../../../components/utilities/constant";
import { apiCallJW } from "../../../components/utilities/httpClient";
import { START_LOADING, STOP_LOADING } from "../../../Redux/types";
import PropertyinventoryView from "./components/PropertyinventoryView";

const PropertyInventory = ({ navigation, route }: any) => {
  const { propName } = route.params;
  const dispatch: any = useDispatch();
  const [inventory, setInventory] = useState<any>([]);
  const [maininventory, setMainInventory] = useState<any>([]);
  const [floors, setFloors] = useState<any>([]);
  const [flatTypes, setFlatTypes] = useState<any>([]);
  const [filterisVisible, setFilterisVisible] = useState(false);
  const [loadingref, setLoadingref] = useState(false);

  const [formData, setFormData] = useState({
    floor: "",
    flatType: "",
  });
  const handleBackPress = () => {
    navigation.goBack();
  };
  const handleGetDropdownData = async (type: any) => {
    const params = {
      params: {
        login: JW_LOGIN,
        password: JW_PASSWORD,
        // project : "MP/0001",
        project: propName,
        type:
          type === "clear" ? "" : formData.flatType ? formData.flatType : "",
      },
    };
    dispatch({ type: START_LOADING });
    try {
      const res = await apiCallJW(
        "post",
        apiEndPoints.GET_INVENTORY_JW,
        params
      );
      if (res?.data?.result?.data.length > 0) {
        const temp = res?.data?.result?.data;
        const arr = temp;
        maininventory.length === 0 ? setMainInventory(temp) : null;
        let filteredData = [];
        if (flatTypes.length === 0) {
          const tempFlatType = new Set(temp.map((el: any) => el["Flat Type"]));
          setFlatTypes(Array.from(tempFlatType));
        }
        const tempFloors = new Set(temp.map((el: any) => el["Floor"]));
        setFloors(Array.from(tempFloors));

        if (type !== "clear" && formData.floor) {
          filteredData = temp.filter(
            (item: any) => item["Floor"] == formData.floor
          );
          setInventory(filteredData);
        } else {
          setInventory(arr);
        }
      } else {
        dispatch({ type: STOP_LOADING });
      }
    } catch (e) {
    } finally {
      dispatch({ type: STOP_LOADING });
    }
  };
  useFocusEffect(
    React.useCallback(() => {
      setFormData({
        floor: "",
        flatType: "",
      })
      handleGetDropdownData("");
      return () => {};
    }, [navigation])
  );

  const setcofigdata = (item: any) => {
    setFormData({
      ...formData,
      flatType: item,
      floor: "",
    });
    var filteredData = maininventory.filter(
      (itemget: any) => itemget["Flat Type"] == item
    );
    const tempFloors = new Set(filteredData.map((el: any) => el["Floor"]));
    setFloors(Array.from(tempFloors));
  };
  const handleInventorymodalClose = () => {
    setFilterisVisible(false);
    // setFormData({
    //   ...formData,
    //   floor: "",
    //   flatType: "",
    // });
    handleGetDropdownData("");
  };

  const handleAddfilter = () => {
    setFilterisVisible(false);
    handleGetDropdownData("");
    setFormData({
      ...formData,
      floor: formData.floor,
      flatType: formData.flatType,
    });
  };
  const onRefresh = () => {
    setFormData({
      ...formData,
      floor: "",
      flatType: "",
    });
    handleGetDropdownData("clear");
  };
  const handleReset = () => {
    handleGetDropdownData("clear");
    setFormData({
      ...formData,
      floor: "",
      flatType: "",
    });
    setFilterisVisible(false);
  };
  return (
    <>
      <PropertyinventoryView
        filterisVisible={filterisVisible}
        setFilterisVisible={setFilterisVisible}
        handleBackPress={handleBackPress}
        inventory={inventory}
        onRefresh={() => onRefresh()}
        loadingref={loadingref}
      />
      <InventoryModal
        Visible={filterisVisible}
        handleInventorymodalClose={handleInventorymodalClose}
        flatTypes={flatTypes}
        floors={floors}
        formData={formData}
        setFormData={setFormData}
        handleAddfilter={handleAddfilter}
        setcofigdata={setcofigdata}
        handleReset={handleReset}
      />
    </>
  );
};

export default PropertyInventory;
