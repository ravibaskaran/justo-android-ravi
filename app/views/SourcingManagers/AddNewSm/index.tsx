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
import { getAgentDetail } from "../../../Redux/Actions/AgentActions";
import { removeAuthUser } from "../../../Redux/Actions/AuthActions";
import { getCityList, getRolesList } from "../../../Redux/Actions/MasterActions";
import {
  updateUserSettingData,
  userRegister,
} from "../../../Redux/Actions/SettingActions";
import AddNewSM from "./components/AddNewSM";

const AddNewSMScreen = ({ navigation, route }: any) => {
  const { type, data } = route?.params || "";
  const dispatch: any = useDispatch();
  const userDataSucess = useSelector((state: any) => state.userReducer);
  const [addNewSmData, setAddNewSmData] = useState<any>({
    // role_id: "63466085fadec47fe8e96bb7",
    role_id: ROLE_IDS.sourcingmanager_id,
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
  const [roleData, setRoleData] = useState<any>([]);
  const { userData = {} } = useSelector((state: any) => state.userData);
  const { response = {}, Roleresponse = {} } =
    useSelector((state: any) => state.masterData) || {};
  const SMDetails = useSelector((state: any) => state.agentData);

  useEffect(() => {
    if (userDataSucess?.response?.status === 200 && userDataSucess?.create) {
      dispatch(removeAuthUser());
      navigation.goBack();
      ErrorMessage({
        msg: userDataSucess?.response?.message,
        backgroundColor: GREEN_COLOR,
      });
      // auth()
      //   .createUserWithEmailAndPassword(addNewSmData.email, "123456")
      //   .then(() => {
      //     console.log("User account created & signed in!");
      //   })
      //   .catch((error) => {
      //     if (error.code === "auth/email-already-in-use") {
      //       console.log("That email address is already in use!");
      //     }

      //     if (error.code === "auth/invalid-email") {
      //       console.log("That email address is invalid!");
      //     }

      //     console.error(error);
      //   });
    }
  }, [userDataSucess]);
  useFocusEffect(
    React.useCallback(() => {
      if (type === "edit") {
        dispatch(
          getAgentDetail({
            user_id: data?._id,
          })
        );
      }
      return () => { };
    }, [navigation, SMDetails?.detail])
  );

  useEffect(() => {
    if (type === "edit") {
      if (SMDetails?.response) {
        setAddNewSmData({
          ...addNewSmData,
          profile_picture:
            SMDetails?.response?.data?.base_url +
            SMDetails?.response?.data?.profile_picture,
          role_id: "63466085fadec47fe8e96bb7",
          firstname: SMDetails?.response?.data?.firstname,
          lastname: SMDetails?.response?.data?.lastname,
          adhar_no: SMDetails?.response?.data?.adhar_no,
          pancard_no: SMDetails?.response?.data?.pancard_no,
          gender: SMDetails?.response?.data?.gender,
          dateofbirth: SMDetails?.response?.data?.dateofbirth,
          mobile: SMDetails?.response?.data?.mobile,
          whatsapp_no: SMDetails?.response?.data?.whatsapp_no,
          email: SMDetails?.response?.data?.email,
          city: SMDetails?.response?.data?.city,
          city_id: SMDetails?.response?.data?.city_id,
          area: SMDetails?.response?.data?.area,
          user_id: SMDetails?.response?.data?._id ?? "",
          address: SMDetails?.response?.data?.address,
          latitude: SMDetails?.response?.data?.latitude,
          longitude: SMDetails?.response?.data?.longitude,
        });
      }
    }
  }, [SMDetails?.response]);

  const onPressBack = () => {
    navigation.goBack();
  };

  const validation = () => {

    let isError = true;
    let errorMessage: any = "";
    if (addNewSmData.firstname == undefined || addNewSmData.firstname == "") {
      isError = false;
      errorMessage = "First Name is require. Please enter first name";
    } else if (
      addNewSmData.lastname == undefined ||
      addNewSmData.lastname == ""
    ) {
      isError = false;
      errorMessage = "Last Name is require. Please enter last name";
    } else if (
      addNewSmData.adhar_no == undefined ||
      addNewSmData.adhar_no == ""
    ) {
      isError = false;
      errorMessage = "Aadhaar Number is require. Please enter Aadhaar number";
    } else if (
      Regexs.AadharRegex.test(addNewSmData.adhar_no) === false
    ) {
      isError = false;
      errorMessage = "Please enter the valid Aadhaar number";
    }
    else if (
      addNewSmData.pancard_no == undefined ||
      addNewSmData.pancard_no == ""
    ) {
      isError = false;
      errorMessage = "Pancard Number is require. Please enter pancard number";
    }
    else if (
      Regexs.panRegex.test(addNewSmData.pancard_no) === false
    ) {
      isError = false;
      errorMessage = "Please enter the valid PanCard number";
    }
    else if (addNewSmData.gender == undefined || addNewSmData.gender == "") {
      isError = false;
      errorMessage = "Gender is require. Please select gender";
    } else if (
      addNewSmData.dateofbirth == undefined ||
      addNewSmData.dateofbirth == ""
    ) {
      isError = false;
      errorMessage = "Date Of Birth is require. Please select date of birth";
    } else if (addNewSmData.mobile == undefined || addNewSmData.mobile == "") {
      isError = false;
      errorMessage = "Mobile Number is require. Please enter mobile number";
    } else if (
      addNewSmData.whatsapp_no == undefined ||
      addNewSmData.whatsapp_no == ""
    ) {
      isError = false;
      errorMessage = "Whatsapp Number is require. Please enter whatsapp number";
    } else if (addNewSmData.email == undefined || addNewSmData.email == "") {
      isError = false;
      errorMessage = "Email is require. Please enter email";
    } else if (validateEmail.test(addNewSmData.email) === false) {
      isError = false;
      errorMessage = "Email is Not Correct. Please enter correct email";
    } else if (
      addNewSmData.city_id == undefined ||
      addNewSmData.city_id == ""
    ) {
      isError = false;
      errorMessage = "City is require. Please select city";
    } else if (addNewSmData.area == undefined || addNewSmData.area == "") {
      isError = false;
      errorMessage = "Area is require. Please enter area";
    } else if (
      addNewSmData.address == undefined ||
      addNewSmData.address == ""
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
  const onPressCreate = (BtnType: any) => {
    if (validation()) {
      const newFormdata = new FormData();
      if (addNewSmData?.profile_picture?.uri) {
        newFormdata.append("profile_picture", addNewSmData.profile_picture);
      }
      newFormdata.append("role_id", addNewSmData.role_id);
      newFormdata.append("firstname", addNewSmData.firstname);
      newFormdata.append("lastname", addNewSmData.lastname);
      newFormdata.append("pancard_no", addNewSmData.pancard_no);
      newFormdata.append("adhar_no", addNewSmData.adhar_no);
      newFormdata.append("gender", addNewSmData.gender);
      newFormdata.append("mobile", addNewSmData.mobile);
      newFormdata.append("dateofbirth", addNewSmData.dateofbirth);
      newFormdata.append("whatsapp_no", addNewSmData.whatsapp_no);
      newFormdata.append("email", addNewSmData.email);
      newFormdata.append("city", addNewSmData.city);
      newFormdata.append("city_id", addNewSmData.city_id);
      newFormdata.append("area", addNewSmData.area);
      newFormdata.append("user_id", addNewSmData.user_id);
      newFormdata.append("address", addNewSmData.address);
      newFormdata.append("latitude", addNewSmData.latitude);
      newFormdata.append("longitude", addNewSmData.longitude);
      if (type === "edit") {
        dispatch(updateUserSettingData(newFormdata));
      } else {
        dispatch(userRegister(newFormdata));
      }
    }
  };
  const handlegetCityList = () => {
    dispatch(getCityList({}));
    if (response?.status) {
      setCityData(response?.data);
    }
  };
  const handlegetRoleList = () => {
    dispatch(getRolesList({}));
    if (Roleresponse?.status === 200) {
      if (Roleresponse?.data?.length > 0) {
        const final = Roleresponse?.data?.filter((el: any) => {
          return userData?.data?.role_title !== el.role_title;
        });
        setRoleData(final);
      }
    }
  };
  return (
    <>
      <AddNewSM
        onPressBack={onPressBack}
        onPressCreate={onPressCreate}
        type={type}
        addNewSmData={addNewSmData}
        setAddNewSmData={setAddNewSmData}
        handlegetCityList={handlegetCityList}
        cityData={cityData}
        handlegetRoleList={handlegetRoleList}
        roleData={roleData}
      />
    </>
  );
};

export default AddNewSMScreen;
