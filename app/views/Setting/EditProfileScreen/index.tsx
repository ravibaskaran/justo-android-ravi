import { View, Text, Keyboard } from "react-native";
import React, { useEffect, useState } from "react";
import EditProfileView from "./components/EditProfileView";
import { updateUserSettingData } from "app/Redux/Actions/SettingActions";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import ErrorMessage from "app/components/ErrorMessage";
import {
  GREEN_COLOR,
  Regexs,
  validateEmail,
  RED_COLOR,
} from "app/components/utilities/constant";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { addAgentForm, getAgentDetail } from "app/Redux/Actions/AgentActions";
import { GET_AGENT_DETAIL } from "app/Redux/types";
import { useFocusEffect } from "@react-navigation/native";

const EditProfileScreen = ({ navigation, route }: any) => {
  const allDetails = route?.params;
  const dispatch: any = useDispatch();

  const { response = {}, update = "" } = useSelector(
    (state: any) => state.settingData
  );
  const agentdetail = useSelector((state: any) => state.addAgentForm);

  // useEffect(() => {
  //   getDetail()
  // }, [allDetails])

  useFocusEffect(
    React.useCallback(() => {
      // getAgentList(offSET, [])
      getDetail();
      return () => {};
    }, [navigation, allDetails])
  );
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);
  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      "keyboardDidShow",
      () => {
        setKeyboardVisible(true); // or some other action
      }
    );
    const keyboardDidHideListener = Keyboard.addListener(
      "keyboardDidHide",
      () => {
        setKeyboardVisible(false); // or some other action
      }
    );

    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, []);

  const getDetail = async () => {
    const userData: any = await AsyncStorage.getItem("loginData");
    if (JSON.parse(userData).data._id) {
      dispatch(
        getAgentDetail({
          user_id: JSON.parse(userData).data?._id,
        })
      );
    }
  };

  const [editData, setEditData] = useState(allDetails?.allDetails);
  console.log(
    "🚀 ~ file: index.tsx:145 ~ editData?.whatsapp_no:",
    typeof editData?.whatsapp_no
  );

  // const handleNextPress = () => {
  //   dispatch(addAgentForm(editData))
  // }

  const handleResponse = () => {
    if (update) {
      ErrorMessage({
        msg: response.message,
        backgroundColor: GREEN_COLOR,
      });
      navigation.goBack(null);
    } else {
      ErrorMessage({
        msg: response.message,
        backgroundColor: RED_COLOR,
      });
    }
  };

  const validation = () => {
    // Keyboard.dismiss();
    // if (!isKeyboardVisible) {
    let isError = true;
    let errorMessage: any = "";
    // if (editData.justo_employee_code == undefined || editData.justo_employee_code == "") {
    //   isError = false;
    //   errorMessage = "Employee Code is require Please enter Employee code";
    // } else
     if (editData.firstname == undefined || editData.firstname == "") {
      isError = false;
      errorMessage = "First Name is require. Please enter Owner Name";
    }
    //  else if (
    //   editData?.adhar_no &&
    //   Regexs.AadharRegex.test(editData?.adhar_no) === false
    // ) {
    //   isError = false;
    //   errorMessage = "Please enter valid Aadhaar number";
    // } 
    // else if (
    //   editData?.pancard_no &&
    //   Regexs.panRegex.test(editData?.pancard_no) === false
    // ) {
    //   isError = false;
    //   errorMessage = "Please enter valid Pancard number";
    // } else if (editData.gender == undefined || editData.gender == "") {
    //   isError = false;
    //   errorMessage = "Gender is require. Please enter Gender";
    // }
    // else if (
    //   editData.dateofbirth == undefined ||
    //   editData.dateofbirth == ""
    // ) {
    //   isError = false;
    //   errorMessage = "Date of Birth is require. Please enter Date of Birth";
    // }
    // else if (editData.mobile == undefined || editData.mobile == "") {
    //   isError = false;
    //   errorMessage = "Mobile No. is require. Please enter Mobile No.";
    // }
    //  else if (
    //   editData.whatsapp_no == undefined ||
    //   editData.whatsapp_no == ""
    // ) {
    //   isError = false;
    //   errorMessage = "WhatsaApp No. is require. Please enter WhatsaApp No.";
    // }
    //  else if (
    //    (editData.whatsapp_no !== "" ||
    //   editData.whatsapp_no !== null ) &&
    //   editData?.whatsapp_no?.length < 10
    // ) {
    //   isError = false;
    //   errorMessage = "WhatsaApp No. is require. Please enter WhatsaApp No.";
    // }
    // else if (
    //   editData?.whatsapp_no &&
    //   editData?.whatsapp_no !== "null" &&
    //   Regexs.phoneNumRegex.test(editData?.whatsapp_no) === false
    // ) {
    //   isError = false;
    //   errorMessage = "Please enter valid whatsapp number";
    // } else if (editData.email == undefined || editData.email == "") {
    //   isError = false;
    //   errorMessage = "Email is require. Please enter Email";
    // } else if (validateEmail.test(editData.email) === false) {
    //   isError = false;
    //   errorMessage = "Email format is wrong. Please enter correct Email";
    // }
    if (errorMessage !== "") {
      ErrorMessage({
        msg: errorMessage,
        backgroundColor: RED_COLOR,
      });
    }
    if (!isError) {
      Keyboard.dismiss();
    }
    return isError;
    // }
  };
  console.log(
    "🚀 ~ file: index.tsx:177 ~ editData?.justo_employee_code:",
    editData?.justo_employee_code
  );

  const handleNextPress = async () => {
    if (validation()) {
      const formData: any = new FormData();
      formData.append("user_id", editData?._id);
      // formData.append("agent_name", editData?.agent_name);
      formData.append("adhar_no", editData?.adhar_no);
      formData.append("lastname", editData?.lastname);
      formData.append("firstname", editData?.firstname);
      formData.append("pancard_no", editData?.pancard_no);
      formData.append("gender", editData?.gender);
      formData.append("dateofbirth", moment(editData?.dateofbirth).format());
      formData.append("mobile", editData?.mobile);
      formData.append("whatsapp_no", editData?.whatsapp_no);
      formData.append("email", editData?.email);
      formData.append("city_id", editData?.city_id);
      formData.append("city", editData?.city);
      formData.append("justo_employee_code", editData?.justo_employee_code);

      formData.append("area", editData?.area);
      formData.append("latitude", editData?.latitude);
      formData.append("longitude", editData?.longitude);
      formData.append("address", editData?.address);
      // formData.append("pin_code", editData?.agencies?.pin_code);
      // formData.append("gst", editData?.agencies?.gst);
      // formData.append("working_location", editData?.working_location);
      // formData.append("rera_certificate_no", editData?.rera_certificate_no);
      // formData.append("rera_registration", editData?.agencies?.rera_registration);
      // formData.append("owner_name", editData?.owner_name);
      // editData?.rera_certificate?.uri &&
      // formData.append("rera_certificate", editData?.rera_certificate);
      // editData?.propidership_declaration_letter?.uri &&
      // formData.append("propidership_declaration_letter", editData?.propidership_declaration_letter);
      editData?.profile_picture?.uri &&
        formData.append("profile_picture", editData?.profile_picture);
      dispatch(addAgentForm(editData));
      dispatch(updateUserSettingData(formData));
      await AsyncStorage.setItem("userData", JSON.stringify(formData));
      handleResponse();
    }
  };

  const onPressBack = () => {
    navigation.goBack();
  };
  return (
    <EditProfileView
      onPressBack={onPressBack}
      allDetails={allDetails}
      setEditData={setEditData}
      editData={editData}
      handleNextPress={handleNextPress}
      // handleUpdatePress={handleUpdatePress}
    />
  );
};

export default EditProfileScreen;
