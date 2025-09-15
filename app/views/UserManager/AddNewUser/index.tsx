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
import { getChatListForProperty } from "../../../Redux/Actions/ChatActions";
import { getClosingDetail } from "../../../Redux/Actions/ClosingManager";
import { getCityList, getRolesList } from "../../../Redux/Actions/MasterActions";
import {
  removeAuthUser,
  updateUserSettingData,
  userRegister,
} from "../../../Redux/Actions/SettingActions";
import { getUsersListForSiteHead } from "../../../Redux/Actions/UserManagerActions";
import AddNewUserView from "./components/AddNewUserView";

const AddNewUserScreen = ({ navigation, route }: any) => {
  const { type = "", data = {} } = route?.params || "";
  const dispatch: any = useDispatch();
  const [addNewUserData, setAddNewUserData] = useState<any>({
    // role_id: "63731fd3d9363c459e31551f",
    role_id: "",
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
    sourcing_head: "",
    property_id: "",
  });
  const [cityData, setCityData] = useState<any>([]);
  const [roleData, setRoleData] = useState<any>([]);
  const userDataSucess = useSelector((state: any) => state.userReducer);
  const { userData = {} } = useSelector((state: any) => state.userData);
  const propertyChatListData = useSelector(
    (state: any) => state.propertyChatListData
  );
  const { response = {}, Roleresponse = {} } =
    useSelector((state: any) => state.masterData) || {};
  const detailsData = useSelector((state: any) => state.ClosingManager);
  const UserManager = useSelector((state: any) => state.UserManager) || {};
  useFocusEffect(
    React.useCallback(() => {
      if (type === "edit") {
        dispatch(getClosingDetail({ user_id: data?._id }));
      }
      return () => {};
    }, [navigation])
  );
  useFocusEffect(
    React.useCallback(() => {
      dispatch(getRolesList({}));
      dispatch(
        getChatListForProperty({
          limit: 100,
          offset: 0,
        })
      );
      return () => {};
    }, [navigation])
  );

  useEffect(() => {
    if (Roleresponse?.status === 200) {
      if (Roleresponse?.data?.length > 0) {
        const final = Roleresponse?.data?.filter((el: any) => {
          return (
            ROLE_IDS.sourcingtl_id === el._id ||
            ROLE_IDS.sourcing_head_id === el._id ||
            ROLE_IDS.sourcingmanager_id === el._id ||
            ROLE_IDS.closingtl_id === el._id ||
            ROLE_IDS.closing_head_id === el._id ||
            ROLE_IDS.closingmanager_id === el._id ||
            ROLE_IDS.postsales_id === el._id ||
            ROLE_IDS.receptionist_id === el._id
          );
        });
        setRoleData(final);
      }
    }
  }, [Roleresponse]);

  useEffect(() => {
    if (type === "edit") {
      if (detailsData?.response?.status === 200) {
        setAddNewUserData({
          role_id: detailsData?.response?.data[0]?.role_id,
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
        setAddNewUserData({
          role_id: "",
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

    if (addNewUserData.role_id == undefined || addNewUserData.role_id == "") {
      isError = false;
      errorMessage = "Role is require. Please enter Role";
    } else if (
      addNewUserData.firstname == undefined ||
      addNewUserData.firstname == ""
    ) {
      isError = false;
      errorMessage = "First Name is require. Please enter first name";
    } else if (
      addNewUserData.lastname == undefined ||
      addNewUserData.lastname == ""
    ) {
      isError = false;
      errorMessage = "Last Name is require. Please enter last name";
    } else if (
      addNewUserData.adhar_no == undefined ||
      addNewUserData.adhar_no == ""
    ) {
      isError = false;
      errorMessage = "Aadhaar Number is require. Please enter Aadhaar number";
    } else if (Regexs.AadharRegex.test(addNewUserData.adhar_no) === false) {
      isError = false;
      errorMessage = "Please enter the valid Aadhaar number";
    } else if (
      addNewUserData.pancard_no == undefined ||
      addNewUserData.pancard_no == ""
    ) {
      isError = false;
      errorMessage = "Pancard Number is require. Please enter pancard number";
    } else if (Regexs.panRegex.test(addNewUserData.pancard_no) === false) {
      isError = false;
      errorMessage = "Please enter the valid Pancard number";
    } else if (
      addNewUserData.gender == undefined ||
      addNewUserData.gender == ""
    ) {
      isError = false;
      errorMessage = "Gender is require. Please select gender";
    } else if (
      addNewUserData.dateofbirth == undefined ||
      addNewUserData.dateofbirth == ""
    ) {
      isError = false;
      errorMessage = "Date Of Birth is require. Please select date of birth";
    } else if (
      addNewUserData.mobile == undefined ||
      addNewUserData.mobile == ""
    ) {
      isError = false;
      errorMessage = "Mobile Number is require. Please enter mobile number";
    } else if (
      addNewUserData.whatsapp_no == undefined ||
      addNewUserData.whatsapp_no == ""
    ) {
      isError = false;
      errorMessage = "Whatsapp Number is require. Please enter whatsapp number";
    } else if (
      addNewUserData.email == undefined ||
      addNewUserData.email == ""
    ) {
      isError = false;
      errorMessage = "Email is require. Please enter email";
    } else if (validateEmail.test(addNewUserData.email) === false) {
      isError = false;
      errorMessage = "Email is Not Correct. Please enter correct email";
    } else if (
      addNewUserData.city_id == undefined ||
      addNewUserData.city_id == ""
    ) {
      isError = false;
      errorMessage = "City is require. Please select city";
    } else if (addNewUserData.area == undefined || addNewUserData.area == "") {
      isError = false;
      errorMessage = "Area is require. Please enter area";
    } else if (
      addNewUserData.address == undefined ||
      addNewUserData.address == ""
    ) {
      isError = false;
      errorMessage = "Address is require. Please enter address";
    } else if (
      addNewUserData.role_id === ROLE_IDS.sourcingmanager_id ||
      addNewUserData.role_id === ROLE_IDS.closingmanager_id
    ) {
      if (addNewUserData.sourcing_head == "" || addNewUserData.role_id == "") {
        isError = false;
        errorMessage = "TL is require. Please enter TL ";
      }
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
      if (addNewUserData?.profile_picture?.uri) {
        newFormdata.append("profile_picture", addNewUserData.profile_picture);
      }
      newFormdata.append("role_id", addNewUserData.role_id);
      newFormdata.append("firstname", addNewUserData.firstname);
      newFormdata.append("lastname", addNewUserData.lastname);
      newFormdata.append("pancard_no", addNewUserData.pancard_no);
      newFormdata.append("gender", addNewUserData.gender);
      newFormdata.append("adhar_no", addNewUserData.adhar_no);
      newFormdata.append("mobile", addNewUserData.mobile);
      newFormdata.append("dateofbirth", addNewUserData.dateofbirth);
      newFormdata.append("whatsapp_no", addNewUserData.whatsapp_no);
      newFormdata.append("email", addNewUserData.email);
      newFormdata.append("city", addNewUserData.city);
      newFormdata.append("city_id", addNewUserData.city_id);
      newFormdata.append("area", addNewUserData.area);
      newFormdata.append("user_id", addNewUserData.user_id);
      newFormdata.append("address", addNewUserData.address);
      newFormdata.append("latitude", addNewUserData.latitude);
      newFormdata.append("longitude", addNewUserData.longitude);
      newFormdata.append("property_id", addNewUserData.property_id);
      if (addNewUserData?.sourcing_head) {
        newFormdata.append("sourcing_head", addNewUserData.sourcing_head);
      }
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
  const handlegetRoleList = () => {};
  const handlegetPropertyList = () => {
    dispatch(
      getChatListForProperty({
        limit: 100,
        offset: 0,
      })
    );
  };
  const handleGetTLlist = () => {
    dispatch(
      getUsersListForSiteHead({
        role_id: addNewUserData.role_id,
      })
    );
  };
  return (
    <>
      <AddNewUserView
        onPressBack={onPressBack}
        onPressCreate={onPressCreate}
        type={route?.params?.type || ""}
        addNewUserData={addNewUserData}
        setAddNewUserData={setAddNewUserData}
        handlegetCityList={handlegetCityList}
        cityData={cityData}
        handlegetRoleList={handlegetRoleList}
        roleData={roleData}
        userList={UserManager?.response?.data}
        propertyList={propertyChatListData?.response?.data}
        handleGetTLlist={handleGetTLlist}
        handlegetPropertyList={handlegetPropertyList}
      />
    </>
  );
};

export default AddNewUserScreen;
