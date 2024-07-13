import usePermission from "app/components/utilities/UserPermissions";
import moment from "moment";
import React from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import images from "../../../../assets/images";
import Button from "../../../../components/Button";
import {
  BLACK_COLOR,
  CALL_COLOR,
  GREEN_COLOR,
  PURPLE_COLOR,
  RED_COLOR,
  ROLE_IDS,
  YELLOW_COLOR,
} from "../../../../components/utilities/constant";
import strings from "../../../../components/utilities/Localization";
import styles from "./Styles";
import { DATE_FORMAT } from "react-native-gifted-chat";

const MyAppointment = (props: any) => {
  const { edit, view, status } = usePermission({
    edit:
      props.roleId === ROLE_IDS.sourcingtl_id
        ? "edit_appointment_with_sm"
        : "edit_appointment_with_cp",
    view:
      props.roleId === ROLE_IDS.sourcingtl_id
        ? "view_appointment_with_sm"
        : "view_appointment_with_cp",
    status:
      props.roleId === ROLE_IDS.sourcingtl_id
        ? "status_appointment_with_sm"
        : "status_appointment_with_cp",
  });

  const getConfirmButton = () => {
    const appointmentdateTime = `${moment(props?.items?.appointment_date).format(DATE_FORMAT)}, ${moment(props?.items?.appointment_time?.toString(), 'hh:mm A').format('HH:mm')}` || ""
    const currentDate = `${moment(new Date).format(DATE_FORMAT)}`
    const getAheadTime = new Date(Date.now() + (3600 * 2000 * 25))
    const getCorrectTime = `${currentDate}, ${moment(getAheadTime).format("HH:mm")}`
    let response = false
    if (appointmentdateTime > getCorrectTime) {
      response = true
    }
    return response
  };

  return (
    <View style={styles.IteamView}>
      <View style={styles.Txtview}>
        <View style={styles.projectContainer}>
          <Text style={styles.projectTxt}>Date :</Text>
        </View>
        <View style={styles.nameContainer}>
          <Text style={styles.nameTxt}>
            {moment.utc(props.items.appointment_date).format("DD-MM-YYYY")}
          </Text>
        </View>
      </View>
      <View style={styles.Txtview}>
        <View style={styles.projectContainer}>
          <Text style={styles.projectTxt}>Time :</Text>
        </View>
        <View style={styles.nameContainer}>
          <Text style={styles.nameTxt}>{props.items.appointment_time}</Text>
        </View>
      </View>
      <View style={styles.Txtview}>
        <View style={styles.projectContainer}>
          <Text style={styles.projectTxt}>Appointment Type :</Text>
        </View>
        <View style={styles.nameContainer}>
          <Text style={styles.nameTxt}>
            {props.items.appointment_type_title}
          </Text>
        </View>
      </View>
      <View style={styles.Txtview}>
        <View style={styles.projectContainer}>
          <Text style={styles.projectTxt}>Appointment With :</Text>
        </View>
        <View style={styles.nameContainer}>
          <Text style={styles.nameTxt}>{props.items.receiver_name}</Text>
        </View>
      </View>
      {/*  <View style={styles.Txtview}>
        <View style={styles.projectContainer}>
          <Text style={styles.projectTxt}>SM Name :</Text>
        </View>
        <View style={styles.nameContainer}>
          <Text style={styles.nameTxt}>{props.items.smName}</Text>
        </View>
      </View> */}
      <View style={styles.Txtview}>
        <View style={styles.projectContainer}>
          <Text style={styles.projectTxt}>Status :</Text>
        </View>
        <View style={styles.nameContainer}>
          <Text
            style={[
              styles.nameTxt,
              {
                color:
                  props.items.appointment_status === 1 ||
                  props.items.appointment_status == 4
                    ? RED_COLOR
                    : props.items.appointment_status === 2
                    ? YELLOW_COLOR
                    : props.items.appointment_status === 3
                    ? GREEN_COLOR
                    : BLACK_COLOR,
              },
            ]}
          >
            {props.items.appointment_status == 1
              ? "Pending"
              : props.items.appointment_status === 2
              ? "Confirm"
              : props.items.appointment_status === 3
              ? "Complete"
              : props.items.appointment_status === 4
              ? "Appointment cancel"
              : strings.notfount}
          </Text>
        </View>
      </View>

      <View style={styles.buttonContainer}>
        <View
          style={[
            styles.buttonContainer,
            {
              justifyContent:
                props.items.appointment_status == 3 || 4
                  ? "flex-end"
                  : "space-between",
            },
          ]}
        >
          {props.items.appointment_status === 1 ? (
            <>
              {edit && (
                <Button
                  width={80}
                  height={30}
                  bgcolor={null}
                  bordercolor={PURPLE_COLOR}
                  borderWidth={1}
                  btnTxtcolor={PURPLE_COLOR}
                  buttonText={strings.edit}
                  btnTxtsize={14}
                  border={10}
                  handleBtnPress={() => props.onPressEdit()}
                />
              )}
              {status && (
                <Button
                  width={80}
                  height={30}
                  bgcolor={null}
                  bordercolor={CALL_COLOR}
                  borderWidth={1}
                  btnTxtcolor={CALL_COLOR}
                  buttonText={strings.cancel}
                  btnTxtsize={14}
                  border={10}
                  handleBtnPress={() =>
                    props.handleOptionPress(props.items._id, 4)
                  }
                />
              )}

              {status && getConfirmButton() ? (
                <Button
                  width={80}
                  height={30}
                  bgcolor={null}
                  bordercolor={PURPLE_COLOR}
                  borderWidth={1}
                  btnTxtcolor={PURPLE_COLOR}
                  buttonText={strings.confirm}
                  btnTxtsize={14}
                  border={10}
                  handleBtnPress={() =>
                    props.handleOptionPress(props.items._id, 2)
                  }
                />
              ) : null}
            </>
          ) : props.items.appointment_status === 2 ? (
            <>
              {status && (
                <Button
                  width={80}
                  height={30}
                  bgcolor={null}
                  bordercolor={CALL_COLOR}
                  borderWidth={1}
                  btnTxtcolor={CALL_COLOR}
                  buttonText={strings.cancel}
                  btnTxtsize={14}
                  border={10}
                  handleBtnPress={() =>
                    props.handleOptionPress(props.items._id, 4)
                  }
                />
              )}
              {status && (
                <Button
                  width={80}
                  height={30}
                  bgcolor={null}
                  bordercolor={GREEN_COLOR}
                  borderWidth={1}
                  btnTxtcolor={GREEN_COLOR}
                  buttonText={strings.done}
                  btnTxtsize={14}
                  border={10}
                  handleBtnPress={() =>
                    props.handleOptionPress(props.items._id, 3)
                  }
                />
              )}
            </>
          ) : null}
        </View>
        {view && (
          <TouchableOpacity
            style={styles.Viewbutton}
            onPress={() => props.onPressView(props.items)}
          >
            <Image source={images.forwardArrow} style={styles.arrow} />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default MyAppointment;
