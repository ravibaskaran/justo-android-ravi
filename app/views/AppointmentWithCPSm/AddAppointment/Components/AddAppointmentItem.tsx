import { View, Text, ScrollView } from "react-native";
import React from "react";
import styles from "./Styles";
import DropdownInput from "../../../../components/DropDown";
import strings from "../../../../components/utilities/Localization";
import images from "../../../../assets/images";
import {
  GRAY_LIGHT_COLOR,
  DATE_FORMAT,
} from "../../../../components/utilities/constant";
import Button from "../../../../components/Button";
import InputCalender from "app/components/InputCalender";
import moment from "moment";
import Styles from "app/components/DropDown/styles";

const AddAppointmentItem = (props: any) => {
  const getAheadTime = new Date(Date.now() + 3600 * 2000 * 25);
  return (
    <ScrollView>
      <View style={styles.wrap}>
        <View style={styles.inputWrap}>
          <InputCalender
            require={true}
            mode={"date"}
            leftIcon={images.event}
            minimumDate={new Date()}
            placeholderText={strings.appointmentDate}
            headingText={strings.appointmentDate}
            editable={false}
            // onChangeText={() => { }}
            dateData={(data: any) => {
              props.setAddAppointmentForm({
                ...props.addAppointmentForm,
                appointment_time: "",
                appointment_date: moment(data).format(DATE_FORMAT),
              });
            }}
            setDateshow={(data: any) => {
              props.setAddAppointmentForm({
                ...props.addAppointmentForm,
                appointment_time: "",
                appointment_date: moment(data).format(DATE_FORMAT),
              });
            }}
            value={
              props.addAppointmentForm?.appointment_date
                ? moment(props.addAppointmentForm?.appointment_date).format(
                    "DD-MM-YYYY"
                  )
                : ""
            }
          />
        </View>
        <View style={styles.inputWrap}>
          <InputCalender
            require={true}
            mode={"time"}
            leftIcon={images.timer}
            dateValue={props?.addAppointmentForm?.appointment_date}
            placeholderText={strings.appointmentTime}
            headingText={strings.appointmentTime}
            editable={false}
            // onChangeText={() => { }}
            dateData={(data: any) => {
              props.setAddAppointmentForm({
                ...props.addAppointmentForm,
                appointment_time: data,
              });
            }}
            setDateshow={(data: any) => {
              props.setAddAppointmentForm({
                ...props.addAppointmentForm,
                appointment_time: data,
              });
            }}
            value={props.addAppointmentForm?.appointment_time}
            minimumDate={
              moment(props.addAppointmentForm?.appointment_date).format(
                DATE_FORMAT
              ) === moment(new Date()).format(DATE_FORMAT)
                ? new Date(moment(getAheadTime).format())
                : null
            }
          />
        </View>
        <View style={styles.inputWrap}>
          <DropdownInput
            require={true}
            headingText={strings.appointmentType}
            placeholder={
              props.addAppointmentForm?.appointment_type_title
                ? props.addAppointmentForm?.appointment_type_title
                : strings.appointmentType
            }
            data={props.masterDatas}
            inputWidth={"100%"}
            onFocus={() => props.handleMasterDatas(9)}
            paddingLeft={16}
            maxHeight={300}
            labelField="title"
            valueField={"_id"}
            value={props.addAppointmentForm?.appointment_type}
            onChange={(item: any) => {
              props.setAddAppointmentForm({
                ...props.addAppointmentForm,
                appointment_type: item._id,
              });
            }}
            newRenderItem={(item: any) => {
              return (
                <View
                  style={{
                    padding: 17,
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <Text
                    style={{
                      flex: 1,
                      fontSize: 16,
                      color: GRAY_LIGHT_COLOR,
                    }}
                  >
                    {item.title}
                  </Text>
                </View>
              );
            }}
          />
        </View>
        <View style={styles.inputWrap}>
          <DropdownInput
            require={true}
            disable={props.type === strings.edit}
            headingText={strings.appointmentWith}
            placeholder={
              props?.addAppointmentForm?.appointment_with
                ? props?.addAppointmentForm?.appointment_with
                : strings.appointmentWith
            }
            data={props.listData}
            inputWidth={"100%"}
            paddingLeft={16}
            maxHeight={300}
            labelField="user_name"
            valueField={"_id"}
            value={props?.addAppointmentForm?.appointment_with}
            onChange={(item: any) => {
              props.setAddAppointmentForm({
                ...props.addAppointmentForm,
                appointment_with: item._id,
              });
            }}
            newRenderItem={(item: any) => {
              return (
                <View style={Styles.item}>
                  <Text style={Styles.textItem}>{item.user_name}</Text>
                </View>
              );
            }}
          />
        </View>
        <View style={styles.btnView}>
          <Button
            btnTxtsize={16}
            handleBtnPress={() => props.handleBtnPress()}
            buttonText={
              props.type === strings.edit
                ? strings.editNewappointment
                : strings.addNewappointment
            }
          />
        </View>
      </View>
    </ScrollView>
  );
};

export default AddAppointmentItem;
