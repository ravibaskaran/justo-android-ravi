import moment from "moment";
import React, { useState } from "react";
import { ScrollView, Text, View } from "react-native";
import images from "../../../../assets/images";
import Button from "../../../../components/Button";
import DropdownInput from "../../../../components/DropDown";
import Styles from "../../../../components/DropDown/styles";
import InputCalender from "../../../../components/InputCalender";
import InputField from "../../../../components/InputField";
import {
  DATE_FORMAT,
  GRAY_LIGHT_COLOR,
  REGISTERD_CP
} from "../../../../components/utilities/constant";
import strings from "../../../../components/utilities/Localization";
import styles from "./Styles";

const AddAppointmentItem = (props: any) => {
  const [minAppointmentTime, setMinAppointmentTime] = useState<any>(null);

  const isToday = (dateString: any) => {
    const date = new Date(dateString);
    const today = new Date();
    return (
      date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear()
    );
  };

  const millisecondsInTwoHours = 2 * 60 * 60 * 1000;
  const millisecondsInFiveMinutes = 5 * 60 * 1000;
  const totalMillisecondsToAdd =
    millisecondsInTwoHours + millisecondsInFiveMinutes;
  const getAheadTime = new Date(Date.now() + totalMillisecondsToAdd);

  const data = [
    { label: "Justo CP", value: 1 },
    { label: "Other CP", value: 2 },
    { label: "Referral Partner", value: 3 },
  ];

  return (
    <ScrollView keyboardShouldPersistTaps={"handled"}>
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
              if (isToday(data)) setMinAppointmentTime(data);
              else setMinAppointmentTime(null);
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
            minimumDate={minAppointmentTime ? minAppointmentTime : null}
            setDateshow={(data: any) => {
              props.setAddAppointmentForm({
                ...props.addAppointmentForm,
                appointment_time: data,
              });
            }}
            value={props.addAppointmentForm?.appointment_time}
            appointmentWithCpPage={true}
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
            headingText={"Search by Property"}
            // require={true}
            placeholder={
              props?.addAppointmentForm?.property_id
                ? props?.addAppointmentForm?.property_id
                : "Select Property"
            }
            data={props.allProperty}
            inputWidth={"100%"}
            paddingLeft={16}
            maxHeight={300}
            labelField="property_title"
            valueField={"_id"}
            value={props?.addAppointmentForm?.property_id}
            onChange={(item: any) => {
              props.setAddAppointmentForm({
                ...props.addAppointmentForm,
                property_id: item._id,
              });
            }}
            newRenderItem={(item: any) => {
              return (
                <View style={Styles.item}>
                  <Text style={Styles.textItem}>{item.property_title}</Text>
                </View>
              );
            }}
          />
        </View>

        <View style={styles.inputWrap}>
          <DropdownInput
            require={true}
            headingText={strings.cpType}
            disable={props.type === strings.edit}
            placeholder={strings.cpType}
            data={data}
            inputWidth={"100%"}
            paddingLeft={16}
            maxHeight={300}
            labelField="label"
            valueField={"value"}
            value={props.addAppointmentForm?.registered_cp}
            onChange={(item: any) => {
              console.log(item);
              props.setAddAppointmentForm({
                ...props.addAppointmentForm,
                registered_cp: item.value,
                non_reg_cp_name: "",
                non_reg_cp_mobile: "",
                non_reg_cp_email: "",
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
                    {item.label}
                  </Text>
                </View>
              );
            }}
          />
        </View>

        {props?.addAppointmentForm?.registered_cp === REGISTERD_CP.YES ? (
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
              search={true}
              searchPlaceholder={strings.search}
              data={props.listData
                .filter((item: any) => item?.active_status == true)
                .sort((a: { user_name: string }, b: { user_name: any }) =>
                  a.user_name.localeCompare(b.user_name)
                )}
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
        ) : (
          <>
            <View style={styles.inputWrap}>
              <InputField
                require={true}
                disableSpecialCharacters={true}
                headingText={strings.nameOfCp}
                placeholderText={strings.name}
                autoCapitalize="words"
                handleInputBtnPress={() => {}}
                onChangeText={(data: any) => {
                  props.setAddAppointmentForm({
                    ...props.addAppointmentForm,
                    non_reg_cp_name: data,
                  });
                }}
                valueshow={props?.addAppointmentForm?.non_reg_cp_name}
              />
            </View>
            <View style={styles.inputWrap}>
              <InputField
                require={true}
                disableSpecialCharacters={true}
                headingText={strings.mobileNo}
                placeholderText={strings.mobileNo}
                handleInputBtnPress={() => {}}
                keyboardtype={"number-pad"}
                maxLength={10}
                onChangeText={(data: any) => {
                  props.setAddAppointmentForm({
                    ...props.addAppointmentForm,
                    non_reg_cp_mobile: data,
                  });
                }}
                valueshow={props?.addAppointmentForm?.non_reg_cp_mobile}
              />
            </View>
            <View style={styles.inputWrap}>
              <InputField
                placeholderText={strings.email + " " + strings.address}
                handleInputBtnPress={() => {}}
                keyboardtype={"email-address"}
                headingText={strings.email + " " + strings.address}
                onChangeText={(data: any) => {
                  props.setAddAppointmentForm({
                    ...props.addAppointmentForm,
                    non_reg_cp_email: data,
                  });
                }}
                valueshow={props?.addAppointmentForm?.non_reg_cp_email}
              />
            </View>
          </>
        )}

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
