import { View, Text, StatusBar } from "react-native";
import React, { useEffect, useState } from "react";
import styles from "./Styles";
import { PRIMARY_THEME_COLOR, RED_COLOR } from "../../../../components/utilities/constant";
import Header from "../../../../components/Header";
import images from "../../../../assets/images";
import strings from "../../../../components/utilities/Localization";
import AddAppointmentItem from "./AddAppointmentItem";
import { useNavigation } from "@react-navigation/native";
import ErrorMessage from "app/components/ErrorMessage";

const AddAppointmentView = (props: any) => {
  const navigation: any = useNavigation();
  const [value, setValue] = useState(null);
  const [addAppointmentForm, setAddAppointmentForm] = useState({
    appointment_with: props?.data?.receiver_name,
    appointment_date: props?.data?.appointment_date,
    appointment_time: props?.data?.appointment_time,
    appointment_type: props?.data?.appointment_type,
    appointment_type_title: props?.data?.appointment_type_title,
  });
  const validation = () => {
    let isError = true;
    let errorMessage: any = ''
    if (addAppointmentForm.appointment_date == undefined || addAppointmentForm.appointment_date == '') {
      isError = false;
      errorMessage = "Appointment Date is require. Please Choose Appointment Date"
    }
    else if (addAppointmentForm.appointment_time == undefined || addAppointmentForm.appointment_time == '') {
      isError = false;
      errorMessage = "Appointment time is require. Please Choose Appointment time"
    }
    else if (addAppointmentForm.appointment_type == undefined || addAppointmentForm.appointment_type == '') {
      isError = false;
      errorMessage = "Appointment type is require. Please Choose Appointment type"
    }
    else if (addAppointmentForm.appointment_with == undefined || addAppointmentForm.appointment_with == '') {
      isError = false;
      errorMessage = "Appointment with is require. Please Choose Appointment with"
    }


    if (errorMessage !== '') {
      ErrorMessage({
        msg: errorMessage,
        backgroundColor: RED_COLOR
      })
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
        />
      </View>
    </View>
  );
};

export default AddAppointmentView;
