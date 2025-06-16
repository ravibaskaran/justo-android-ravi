import { useNavigation } from "@react-navigation/native";
import ErrorMessage from "app/components/ErrorMessage";
import React, { useState } from "react";
import { View } from "react-native";
import images from "../../../../assets/images";
import Header from "../../../../components/Header";
import {
  PRIMARY_THEME_COLOR,
  RED_COLOR,
  Regexs,
  REGISTERD_CP,
} from "../../../../components/utilities/constant";
import strings from "../../../../components/utilities/Localization";
import AddAppointmentItem from "./AddAppointmentItem";
import styles from "./Styles";

const AddAppointmentView = (props: any) => {
  const navigation: any = useNavigation();
  const [value, setValue] = useState(null);
  const [addAppointmentForm, setAddAppointmentForm] = useState({
    appointment_with: props?.data?.receiver_name,
    appointment_date: props?.data?.appointment_date,
    appointment_time: props?.data?.appointment_time,
    appointment_type: props?.data?.appointment_type,
    appointment_type_title: props?.data?.appointment_type_title,
    registered_cp: props?.data?.registered_cp
      ? props?.data?.registered_cp
      : REGISTERD_CP.YES,
    non_reg_cp_name: props?.data?.receiver_name,
    non_reg_cp_mobile: props?.data?.non_reg_cp_mobile,
    non_reg_cp_email: props?.data?.non_reg_cp_email,
    property_id: props?.data?.property_id,
  });

  // registered_cp == 1 "registered cp"
  // registered_cp == 2 "non -registered cp"
  const validation = () => {
    let isError = true;
    let errorMessage: any = "";
    if (
      addAppointmentForm.appointment_date == undefined ||
      addAppointmentForm.appointment_date == ""
    ) {
      isError = false;
      errorMessage =
        "Appointment Date is require. Please Choose Appointment Date";
    } else if (
      addAppointmentForm.appointment_time == undefined ||
      addAppointmentForm.appointment_time == ""
    ) {
      isError = false;
      errorMessage =
        "Appointment time is require. Please Choose Appointment time";
    } else if (
      addAppointmentForm.appointment_type == undefined ||
      addAppointmentForm.appointment_type == ""
    ) {
      isError = false;
      errorMessage =
        "Appointment type is require. Please Choose Appointment type";
    } else if (addAppointmentForm.registered_cp == REGISTERD_CP.YES) {
      if (
        addAppointmentForm.appointment_with == undefined ||
        addAppointmentForm.appointment_with == ""
      ) {
        isError = false;
        errorMessage =
          "Appointment with is require. Please Choose Appointment with";
      }
    } else {
      if (
        addAppointmentForm?.non_reg_cp_name?.trim() === "" ||
        addAppointmentForm?.non_reg_cp_name?.trim() === undefined
      ) {
        isError = false;
        errorMessage = strings.agentNameReqVal;
      } else if (
        Regexs.oneSpaceRegex.test(
          addAppointmentForm?.non_reg_cp_name?.trim()
        ) === false
      ) {
        isError = false;
        errorMessage = strings.NameCorrectlyVal;
      } else if (
        addAppointmentForm?.non_reg_cp_mobile === "" ||
        addAppointmentForm?.non_reg_cp_mobile === undefined ||
        addAppointmentForm?.non_reg_cp_mobile === null
      ) {
        isError = false;
        errorMessage = "Please fill mobile number";
      } else if (
        addAppointmentForm?.non_reg_cp_mobile &&
        Regexs.mobilenumRegex.test(addAppointmentForm?.non_reg_cp_mobile) ===
          false
      ) {
        isError = false;
        errorMessage = "Please Enter valid mobile number";
      } else if (
        addAppointmentForm?.non_reg_cp_mobile &&
        addAppointmentForm?.non_reg_cp_mobile?.length < 10
      ) {
        isError = false;
        errorMessage = "Please Enter valid mobile number";
      } else if (
        addAppointmentForm?.non_reg_cp_email &&
        Regexs.emailRegex.test(addAppointmentForm?.non_reg_cp_email) === false
      ) {
        isError = false;
        errorMessage = "Please enter valid Email id";
      }
    }
    //  else if (
    //   addAppointmentForm.appointment_with == undefined ||
    //   addAppointmentForm.appointment_with == ""
    // ) {
    //   isError = false;
    //   errorMessage =
    //     "Appointment with is require. Please Choose Appointment with";
    // }

    if (errorMessage !== "") {
      ErrorMessage({
        msg: errorMessage,
        backgroundColor: RED_COLOR,
      });
    }
    return isError;
  };
  const handleBtnPress = () => {
    if (validation()) {

      props.handleAddAppointment(addAppointmentForm);
    }
  };
  return (
    <View style={styles.mainContainer}>
      <Header
        leftImageSrc={images.backArrow}
        rightSecondImageScr={images.notification}
        headerText={
          props.type === strings.edit
            ? strings.editNewappointment
            : strings.addNewappointment
        }
        leftImageIconStyle={styles.RightFirstIconStyle}
        handleOnLeftIconPress={() => props.handleBackPress()}
        headerStyle={styles.headerStyle}
        barStyle={"light-content"}
        statusBarColor={PRIMARY_THEME_COLOR}
      />
      <View style={styles.AddAppointmentView}>
        <AddAppointmentItem
          setValue={setValue}
          value={value}
          handleBtnPress={handleBtnPress}
          setAddAppointmentForm={setAddAppointmentForm}
          addAppointmentForm={addAppointmentForm}
          getVisitorsList={props.getVisitorsList}
          visitorList={props.visitorList}
          type={props.type}
          handleMasterDatas={props.handleMasterDatas}
          masterDatas={props.masterDatas}
          listData={props.listData}
          role={props.role}
          allProperty={props.allProperty}
        />
      </View>
    </View>
  );
};

export default AddAppointmentView;
