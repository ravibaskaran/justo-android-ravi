import { useFocusEffect } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ErrorMessage from "../../../components/ErrorMessage";
import {
  GREEN_COLOR,
  RED_COLOR,
  Regexs,
  ROLE_IDS,
  validateEmail,
} from "../../../components/utilities/constant";
import { getClosingDetail } from "../../../Redux/Actions/ClosingManager";
import {
  getCityList,
  getRolesList,
} from "../../../Redux/Actions/MasterActions";
import {
  removeAuthUser,
  updateUserSettingData,
  userRegister,
} from "../../../Redux/Actions/SettingActions";
import AddNewCM from "./components/AddNewCM";

const AddNewCMScreen = ({ navigation, route }: any) => {
  const { type = "", data = {} } = route?.params || "";
  const dispatch: any = useDispatch();
  const [addNewCMData, setAddNewCMData] = useState<any>({
    // role_id: "63731fd3d9363c459e31551f",
    role_id: ROLE_IDS.closingmanager_id,
    profile_picture: "",
    firstname: "",
    lastname: "",
    adhar_no: "",
    pancard_no: "",
    gender: "",
    dateofbirth: "",
    mobile: "",
    whatsapp_no: "",
    email: "",
    city: "",
    city_id: "",
    area: "",
    user_id: "",
    address: "",
    latitude: "",
    longitude: "",
  });
  const [cityData, setCityData] = useState<any>([]);
  const userDataSucess = useSelector((state: any) => state.userReducer);
  const { response = {}, Roleresponse = {} } =
    useSelector((state: any) => state.masterData) || {};
  const detailsData = useSelector((state: any) => state.ClosingManager);

  useFocusEffect(
    React.useCallback(() => {
      if (type === "edit") {
        dispatch(getClosingDetail({ user_id: data?._id }));
      }
      return () => {};
    }, [navigation])
  );

  useEffect(() => {
    if (type === "edit") {
      if (detailsData?.response?.status === 200) {
        setAddNewCMData({
          role_id: ROLE_IDS.closingmanager_id,
          profile_picture:
            detailsData?.response?.data[0]?.base_url +
            detailsData?.response?.data[0]?.profile_picture,
          firstname: detailsData?.response?.data[0]?.firstname,
          lastname: detailsData?.response?.data[0]?.lastname,
          adhar_no: detailsData?.response?.data[0]?.adhar_no,
          pancard_no: detailsData?.response?.data[0]?.pancard_no,
          gender: detailsData?.response?.data[0]?.gender,
          dateofbirth: detailsData?.response?.data[0]?.dateofbirth,
          mobile: detailsData?.response?.data[0]?.mobile,
          whatsapp_no: detailsData?.response?.data[0]?.whatsapp_no,
          email: detailsData?.response?.data[0]?.email,
          city: detailsData?.response?.data[0]?.city,
          city_id: detailsData?.response?.data[0]?.city_id,
          area: detailsData?.response?.data[0]?.area,
          user_id: detailsData?.response?.data[0]?._id,
          address: detailsData?.response?.data[0]?.address,
          latitude: detailsData?.response?.data[0]?.latitude,
          longitude: detailsData?.response?.data[0]?.longitude,
        });
      } else {
        setAddNewCMData({
          role_id: ROLE_IDS.closingmanager_id,
          profile_picture: "",
          firstname: "",
          lastname: "",
          adhar_no: "",
          pancard_no: "",
          gender: "",
          dateofbirth: "",
          mobile: "",
          whatsapp_no: "",
          email: "",
          city: "",
          city_id: "",
          area: "",
          user_id: "",
          address: "",
          latitude: "",
          longitude: "",
        });
      }
    }
  }, [detailsData]);
  useEffect(() => {
    if (userDataSucess?.response?.status === 200 && userDataSucess?.create) {
      dispatch(removeAuthUser());
      navigation.goBack();
      ErrorMessage({
        msg: userDataSucess?.response?.message,
        backgroundColor: GREEN_COLOR,
      });
    }
  }, [userDataSucess]);
  const onPressBack = () => {
    navigation.goBack();
  };
  const validation = () => {
    let isError = true;
    let errorMessage: any = "";
    if (addNewCMData.firstname == undefined || addNewCMData.firstname == "") {
      isError = false;
      errorMessage = "First Name is require. Please enter first name";
    } else if (
      addNewCMData.lastname == undefined ||
      addNewCMData.lastname == ""
    ) {
      isError = false;
      errorMessage = "Last Name is require. Please enter last name";
    } else if (
      addNewCMData.adhar_no == undefined ||
      addNewCMData.adhar_no == ""
    ) {
      isError = false;
      errorMessage = "Aadhaar Number is require. Please enter Aadhaar number";
    } else if (Regexs.AadharRegex.test(addNewCMData.adhar_no) === false) {
      isError = false;
      errorMessage = "Please enter the valid Aadhaar number";
    } else if (
      addNewCMData.pancard_no == undefined ||
      addNewCMData.pancard_no == ""
    ) {
      isError = false;
      errorMessage = "Pancard Number is require. Please enter pancard number";
    } else if (Regexs.panRegex.test(addNewCMData.pancard_no) === false) {
      isError = false;
      errorMessage = "Please enter the valid Pancard number";
    } else if (addNewCMData.gender == undefined || addNewCMData.gender == "") {
      isError = false;
      errorMessage = "Gender is require. Please select gender";
    } else if (
      addNewCMData.dateofbirth == undefined ||
      addNewCMData.dateofbirth == ""
    ) {
      isError = false;
      errorMessage = "Date Of Birth is require. Please select date of birth";
    } else if (addNewCMData.mobile == undefined || addNewCMData.mobile == "") {
      isError = false;
      errorMessage = "Mobile Number is require. Please enter mobile number";
    } else if (
      addNewCMData.whatsapp_no == undefined ||
      addNewCMData.whatsapp_no == ""
    ) {
      isError = false;
      errorMessage = "Whatsapp Number is require. Please enter whatsapp number";
    } else if (addNewCMData.email == undefined || addNewCMData.email == "") {
      isError = false;
      errorMessage = "Email is require. Please enter email";
    } else if (validateEmail.test(addNewCMData.email) === false) {
      isError = false;
      errorMessage = "Email is Not Correct. Please enter correct email";
    } else if (
      addNewCMData.city_id == undefined ||
      addNewCMData.city_id == ""
    ) {
      isError = false;
      errorMessage = "City is require. Please select city";
    } else if (addNewCMData.area == undefined || addNewCMData.area == "") {
      isError = false;
      errorMessage = "Area is require. Please enter area";
    } else if (
      addNewCMData.address == undefined ||
      addNewCMData.address == ""
    ) {
      isError = false;
      errorMessage = "Address is require. Please enter address";
    }
    if (errorMessage !== "") {
      ErrorMessage({
        msg: errorMessage,
        backgroundColor: RED_COLOR,
      });
    }
    return isError;
  };
  const onPressCreate = () => {
    if (validation()) {
      const newFormdata = new FormData();
      if (addNewCMData?.profile_picture?.uri) {
        newFormdata.append("profile_picture", addNewCMData.profile_picture);
      }
      newFormdata.append("role_id", addNewCMData.role_id);
      newFormdata.append("firstname", addNewCMData.firstname);
      newFormdata.append("lastname", addNewCMData.lastname);
      newFormdata.append("pancard_no", addNewCMData.pancard_no);
      newFormdata.append("gender", addNewCMData.gender);
      newFormdata.append("adhar_no", addNewCMData.adhar_no);
      newFormdata.append("mobile", addNewCMData.mobile);
      newFormdata.append("dateofbirth", addNewCMData.dateofbirth);
      newFormdata.append("whatsapp_no", addNewCMData.whatsapp_no);
      newFormdata.append("email", addNewCMData.email);
      newFormdata.append("city", addNewCMData.city);
      newFormdata.append("city_id", addNewCMData.city_id);
      newFormdata.append("area", addNewCMData.area);
      newFormdata.append("user_id", addNewCMData.user_id);
      newFormdata.append("address", addNewCMData.address);
      newFormdata.append("latitude", addNewCMData.latitude);
      newFormdata.append("longitude", addNewCMData.longitude);
      if (type === "edit") {
        dispatch(updateUserSettingData(newFormdata));
      } else {
        dispatch(userRegister(newFormdata));
      }
    }
  };
  const handlegetCityList = () => {
    dispatch(getCityList({}));
  };
  useEffect(() => {
    if (response?.status === 200) {
      setCityData(response?.data);
    } else {
      setCityData([]);
    }
  }, [response]);
  const handlegetRoleList = () => {
    dispatch(getRolesList({}));
  };
  return (
    <>
      <AddNewCM
        onPressBack={onPressBack}
        onPressCreate={onPressCreate}
        type={route?.params?.type || ""}
        addNewCMData={addNewCMData}
        setAddNewCMData={setAddNewCMData}
        handlegetCityList={handlegetCityList}
        cityData={cityData}
        handlegetRoleList={handlegetRoleList}
      />
    </>
  );
};

export default AddNewCMScreen;
