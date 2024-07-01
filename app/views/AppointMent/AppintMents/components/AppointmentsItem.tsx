import { View, Text, TouchableOpacity, Image, Linking } from "react-native";
import React from "react";
import styles from "./styles";
import strings from "../../../../components/utilities/Localization";
import {
  BLACK_COLOR,
  CALL_COLOR,
  GRAY_COLOR,
  GRAY_LIGHT_COLOR,
  GREEN_COLOR,
  PRIMARY_THEME_COLOR,
  BG_MAIN_COLOUR,
  WHITE_COLOR,
  WHITE_COLOR_LIGHT,
  YELLOW_COLOR,
  RED_COLOR,
  DATE_FORMAT,
  TIME_FORMAT,
  DATE_TIME_FORMAT,
  DATE_BY_DAY,
} from "../../../../components/utilities/constant";
import images from "../../../../assets/images";
import Button from "../../../../components/Button";
import moment from "moment";
import { useSelector } from "react-redux";
import usePermission from "app/components/utilities/UserPermissions";

const AppointmentItem = (props: any) => {
  const { userData = {} } = useSelector((state: any) => state.userData);
  const bookingStatus =
    props?.items?.booking_status?.length > 0
      ? props?.items?.booking_status[0]
      : "";

  const currentDate = `${moment(new Date()).format(
    DATE_FORMAT
  )}, ${new Date().getHours()}:${new Date().getMinutes()}`;
  const appointmentDateTime =
    `${moment
      .utc(props?.items?.appointment_date)
      .format(DATE_FORMAT)}, ${moment(
      props?.items?.appointment_time?.toString(),
      "hh:mm A"
    ).format("HH:mm")}` || "";

  const { edit, view, allocate } = usePermission({
    edit: "edit_appointment",
    view: "view_appointment",
    allocate: "allocate_CM",
  });
  const checkinStaus =
    props?.items?.checkin_status?.length > 0
      ? props?.items?.checkin_status[0]?.status
      : "";

  return (
    <View style={styles.IteamView}>
      <View style={styles.Txtview}>
        <View style={styles.projectContainer}>
          <Text style={styles.projectTxt}>{strings.leadNo} :</Text>
        </View>
        <View style={styles.nameContainer}>
          <Text style={styles.nameTxt}>{props.items.lead_no}</Text>
        </View>
      </View>
      <View style={styles.Txtview}>
        <View style={styles.projectContainer}>
          <Text style={styles.projectTxt}>Site Visit Date</Text>
        </View>
        <View>
          <Text>:</Text>
        </View>
        <View style={styles.nameContainer}>
          <Text style={styles.nameTxt}>
            {props?.items?.appointment_date === "" ||
            props?.items?.appointment_date === undefined
              ? strings.notfount
              : moment.utc(props?.items?.appointment_date).format(DATE_BY_DAY)}
            <Text style={styles.nameTxt}>
              {props?.items?.appointment_time === "" ||
              props?.items?.appointment_time === undefined
                ? strings.notfount
                : " " + props?.items?.appointment_time}
            </Text>
          </Text>
        </View>
      </View>
      <View style={styles.Txtview}>
        <View style={styles.projectContainer}>
          <Text style={styles.projectTxt}>
            {strings.visitor + " " + strings.name} :
          </Text>
        </View>
        <View style={styles.nameContainer}>
          <Text style={styles.nameTxt}>{props.items.customer_first_name}</Text>
        </View>
      </View>
      <View style={styles.Txtview}>
        <View style={styles.projectContainer}>
          <Text style={styles.projectTxt}>
            {strings.propertyHeader + " " + strings.name} :
          </Text>
        </View>
        <View style={styles.nameContainer}>
          <Text style={styles.nameTxt}>{props.items.property_title}</Text>
        </View>
      </View>
      {/* <View style={styles.Txtview}>
        <View style={styles.projectContainer}>
          <Text style={styles.projectTxt}>{strings.dateTime} :</Text>
        </View>
        <View style={styles.nameContainer}>
          <Text style={styles.nameTxt}>{`${moment
            .utc(props.items.appointment_date)
            .format("DD-MM-YYYY")} ${props.items.appointment_time}`}</Text>
        </View>
      </View> */}
      <View style={styles.Txtview}>
        <View style={styles.projectContainer}>
          <Text style={styles.projectTxt}>Created Date</Text>
        </View>
        <View>
          <Text>:</Text>
        </View>
        <View style={styles.nameContainer}>
          <Text style={styles.nameTxt}>
            {props?.items?.createdDate === "" ||
            props?.items?.createdDate === undefined
              ? strings.notfount
              : moment(props?.items?.createdDate).format(DATE_TIME_FORMAT)}
          </Text>
        </View>
      </View>
      <View style={styles.Txtview}>
        <View style={styles.projectContainer}>
          <Text style={styles.projectTxt}>Create by</Text>
        </View>
        <View>
          <Text>:</Text>
        </View>
        <View style={styles.nameContainer}>
          <Text style={styles.nameTxt}>
            {props.items.create_by ? props.items.create_by : strings.notfount}
            {props.items?.created_by_role === "" ||
            props.items?.created_by_role === undefined ||
            props.items?.created_by_role === null
              ? ""
              : " (" + props.items?.created_by_role + ")"}
          </Text>
        </View>
      </View>
      {/* <View style={styles.Txtview}>
                <View style={styles.projectContainer}>
                    <Text style={styles.projectTxt}>{strings.pickup} :</Text>
                </View>
                <View style={styles.nameContainer}>
                    <Text style={styles.nameTxt}>{props.items.pickup ? props.items.pickup : strings.notfount}</Text>
                </View>
            </View> */}
      <View style={styles.Txtview}>
        <View style={styles.projectContainer}>
          <Text style={styles.projectTxt}>Lead Source</Text>
        </View>
        <View>
          <Text>:</Text>
        </View>
        <View style={styles.nameContainer}>
          <Text style={styles.nameTxt}>
            {props.items?.lead_source && props.items.lead_source?.length !== 0
              ? props.items?.lead_source
              : strings.notfount}
          </Text>
        </View>
      </View>
      {props.items?.lead_source == "Channel Partner" ? (
        <View style={styles.Txtview}>
          <View style={styles.projectContainer}>
            <Text style={styles.projectTxt}>
              {props.items?.cp_type === 2 ? "CP Name" : "CP Name"}
            </Text>
          </View>
          <View>
            <Text>:</Text>
          </View>
          <View style={styles.nameContainer}>
            <Text style={styles.nameTxt}>
              {props.items?.cp_name && props.items.cp_name?.length !== 0
                ? `${props.items?.cp_name} ${
                    props.items?.cp_type === 2 ? "(Company)" : "(Individual)"
                  }`
                : strings.notfount}
            </Text>
          </View>
        </View>
      ) : null}
      {props.items?.cp_type === 2 ? (
        <View style={styles.Txtview}>
          <View style={styles.projectContainer}>
            <Text style={styles.projectTxt}>Emp. Name </Text>
          </View>
          <View>
            <Text>:</Text>
          </View>
          <View style={styles.nameContainer}>
            <Text style={styles.nameTxt}>
              {props.items.cp_emp_name && props.items.cp_emp_name?.length !== 0
                ? props.items.cp_emp_name
                : strings.notfount}
            </Text>
          </View>
        </View>
      ) : null}
      <View style={styles.Txtview}>
        <View style={styles.projectContainer}>
          <Text style={styles.projectTxt}>{strings.assignTo} :</Text>
        </View>
        <View style={styles.nameContainer}>
          <Text style={styles.nameTxt}>
            {props.items.assign_appointment?.[0]?.user_name}(
            {props?.items?.assign_appointment[0]?.assign_by_role === "" ||
            props?.items?.assign_appointment[0]?.assign_by_role === undefined ||
            props?.items?.assign_appointment[0]?.assign_by_role === null
              ? strings.notfount
              : props?.items?.assign_appointment[0]?.assign_by_role}
            )
          </Text>
        </View>
      </View>

      <View style={styles.Txtview}>
        <View style={styles.projectContainer}>
          <Text style={styles.projectTxt}>{strings.closingStatus} :</Text>
        </View>
        <View style={styles.nameContainer}>
          <Text
            style={[
              styles.nameTxt,
              {
                color:
                  props?.items?.status == 1
                    ? currentDate >= appointmentDateTime
                      ? "red"
                      : "red"
                    : props?.items?.status === 2
                    ? GREEN_COLOR
                    : props?.items?.status == 3
                    ? bookingStatus === 4
                      ? "red"
                      : GREEN_COLOR
                    : props?.items?.status == 5 || props?.items?.status == 6
                    ? "red"
                    : props?.items?.status === 4
                    ? "red"
                    : BLACK_COLOR,
              },
            ]}
          >
            {props?.items?.status == 1
              ? currentDate >= appointmentDateTime
                ? strings.STSNotVisited
                : strings.STSUpComing
              : props?.items?.status === 2
              ? "Revisit"
              : props?.items?.status === 5
              ? "Reschedule"
              : props?.items?.status === 4
              ? "Visit Cancelled"
              : props?.items?.status === 6
              ? "Not Fit for Sale"
              : props?.items?.status === 3
              ? bookingStatus === 1
                ? "Ready to Book"
                : bookingStatus === 4
                ? "Cancel Booking"
                : "Booking"
              : "Completed"}
          </Text>
        </View>
      </View>
      {checkinStaus === true && (
        <View style={styles.Txtview}>
          <View style={styles.projectContainer}>
            <Text style={styles.projectTxt}>{strings.checkinstatus}</Text>
          </View>
          <View>
            <Text>:</Text>
          </View>
          <View style={styles.nameContainer}>
            <Text
              style={[
                styles.nameTxt,
                { color: checkinStaus === true ? GREEN_COLOR : BLACK_COLOR },
              ]}
            >
              {checkinStaus === true ? "Visited" : strings.notfount}
            </Text>
          </View>
        </View>
      )}
      <View style={styles.Txtview}>
        <View style={styles.projectContainer}>
          <Text style={styles.projectTxt}>{strings.visitorScore} :</Text>
        </View>
        <View style={styles.nameContainer}>
          <Text style={styles.nameTxt}>
            {props.items.lead_score ? props.items.lead_score : strings.notfount}
          </Text>
        </View>
      </View>
      {/* <View style={styles.Txtview}>
                <View style={styles.projectContainer}>
                    <Text style={styles.projectTxt}>{strings.visit + " " + strings.status}</Text>
                </View>
                <View><Text>:</Text></View>
                <View style={styles.nameContainer}>
                    <Text style={[styles.nameTxt,
                    {
                        color: props?.items?.visit_status === strings.hot ? GREEN_COLOR
                            : props?.items?.visit_status === strings.warm ? YELLOW_COLOR
                                : props?.items?.visit_status === strings.cold ? RED_COLOR : BLACK_COLOR
                    }]}>{props?.items?.visit_status ? props?.items?.visit_status : strings.notfount}</Text>
                </View>
            </View> */}
      <View style={styles.buttonContainer}>
        {props.items.status === 1 || props.items.status === 2 ? (
          <Button
            width={80}
            height={30}
            bgcolor={WHITE_COLOR}
            bordercolor={CALL_COLOR}
            borderWidth={1}
            btnTxtcolor={CALL_COLOR}
            buttonText={strings.call}
            btnTxtsize={14}
            border={10}
            handleBtnPress={() => {
              Linking.openURL(`tel:${props.items?.mobile}`);
            }}
          />
        ) : (
          <View></View>
        )}
        {view && (
          <TouchableOpacity
            style={styles.Viewbutton}
            onPress={() => props.onPressView(props.items)}
          >
            <Image source={images.forwardArrow} style={styles.arrow} />
          </TouchableOpacity>
        )}
      </View>
      {userData?.data?.role_title === "Closing TL" &&
      props.items.status === 1 ? (
        <View style={[styles.buttonContainer, { justifyContent: "center" }]}>
          {props.items.pickup === "Yes" && !checkinStaus ? (
            <Button
              width={150}
              height={30}
              bgcolor={WHITE_COLOR}
              bordercolor={PRIMARY_THEME_COLOR}
              borderWidth={1}
              btnTxtcolor={PRIMARY_THEME_COLOR}
              buttonText={strings.dropLocation}
              btnTxtsize={14}
              border={10}
              handleBtnPress={() => {
                props.setappointmentid(props?.items?._id);
                props.setLocationModel(true);
              }}
              textTransform={"uppercase"}
            />
          ) : null}
          {allocate && (
            <Button
              width={100}
              height={30}
              bgcolor={WHITE_COLOR}
              bordercolor={PRIMARY_THEME_COLOR}
              borderWidth={1}
              btnTxtcolor={PRIMARY_THEME_COLOR}
              buttonText={strings.allocate}
              btnTxtsize={14}
              border={10}
              handleBtnPress={() => {
                props.setAllocatedCM({
                  ...props.allocatedCM,
                  appointment_id: props.items?._id,
                });
                props.setAllocateModel(true);
              }}
              textTransform={"uppercase"}
            />
          )}
        </View>
      ) : null}
    </View>
  );
};

export default AppointmentItem;
