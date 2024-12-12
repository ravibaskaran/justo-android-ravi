import { View, Text, Image, TouchableOpacity, Linking } from "react-native";
import React from "react";
import styles from "./Styles";
import images from "../../../../assets/images";
import strings from "../../../../components/utilities/Localization";
import {
  PURPLE_COLOR,
  CALL_COLOR,
  WHITE_COLOR,
  DATE_FORMAT,
  TIME_FORMAT,
  BLACK_COLOR,
  DATE_BY_DAY,
  GREEN_COLOR,
  YELLOW_COLOR,
  DATE_TIME_FORMAT,
  RED_COLOR,
  PRIMARY_THEME_COLOR,
  getCPLeadType,
} from "../../../../components/utilities/constant";
import Button from "../../../../components/Button";
import moment from "moment";
import usePermission from "app/components/utilities/UserPermissions";

const AppointMentForSiteList = (props: any) => {
  const currentDate = `${moment(new Date()).format(
    DATE_FORMAT
  )}, ${new Date().getHours()}:${new Date().getMinutes()}`;

  const appointmentdateTime =
    `${moment
      .utc(props?.items?.appointment_date)
      .format(DATE_FORMAT)}, ${moment(
      props?.items?.appointment_time?.toString(),
      "hh:mm A"
    ).format("HH:mm")}` || "";
  const { view, edit } = usePermission({
    view: "view_appointment _site_visite",
    edit: "edit_appointment _site_visite",
  });
  const checkinStaus =
    props?.items?.checkin_status?.length > 0
      ? props?.items?.checkin_status[0]
      : "";
  const bookingStatus =
    props?.items?.booking_status?.length > 0
      ? props?.items?.booking_status[0]
      : "";
  return (
    <View style={styles.IteamView}>
      <View style={styles.Txtview}>
        <View style={styles.projectContainer}>
          <Text style={styles.projectTxt}>Lead No.</Text>
        </View>
        <View>
          <Text>:</Text>
        </View>
        <View style={styles.nameContainer}>
          <Text style={styles.nameTxt}>{props?.items?.lead_no}</Text>
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
          <Text style={styles.projectTxt}>Checkin Date</Text>
        </View>
        <View>
          <Text>:</Text>
        </View>
        <View style={styles.nameContainer}>
          <Text style={styles.nameTxt}>
            {checkinStaus
              ? moment(props?.items?.checkin_status[0]?.created_date).format(
                  DATE_TIME_FORMAT
                )
              : strings.notfount}
          </Text>
        </View>
      </View>
      <View style={styles.Txtview}>
        <View style={styles.projectContainer}>
          <Text style={styles.projectTxt}>Visitor Name</Text>
        </View>
        <View>
          <Text>:</Text>
        </View>
        <View style={styles.nameContainer}>
          <Text style={styles.nameTxt}>
            {props?.items?.customer_first_name}
          </Text>
        </View>
      </View>
      <View style={styles.Txtview}>
        <View style={styles.projectContainer}>
          <Text style={styles.projectTxt}>Property Name</Text>
        </View>
        <View>
          <Text>:</Text>
        </View>
        <View style={styles.nameContainer}>
          <Text style={styles.nameTxt}>{props?.items?.property_title}</Text>
        </View>
      </View>
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
      <View style={styles.Txtview}>
        <View style={styles.projectContainer}>
          <Text style={styles.projectTxt}>Lead Source</Text>
        </View>
        <View>
          <Text>:</Text>
        </View>
        <View style={styles.nameContainer}>
          <Text style={styles.nameTxt} onPress={() => console.log(props.items)}>
            {props.items?.lead_source && props.items?.lead_source?.length !== 0
              ? props.items?.lead_source == "Reference" &&
                props.items?.referrel_partner === 1
                ? "Referral Partner"
                : props.items?.lead_source
              : strings.notfount}{" "}
            {getCPLeadType(props?.items?.cp_lead_type)}
          </Text>
        </View>
      </View>

      {props.items?.lead_source == "Reference" ? (
        <View style={styles.Txtview}>
          <View style={styles.projectContainer}>
            <Text style={styles.projectTxt}>Referrer</Text>
          </View>
          <View>
          <Text>:</Text>
        </View>
          <View style={styles.nameContainer}>
            <Text style={styles.nameTxt}>{props.items?.referrer_name}</Text>
          </View>
        </View>
      ) : null}

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
              {props.items?.cp_name && props.items?.cp_name?.length !== 0
                ? props.items?.cp_name
                : strings.notfount}
            </Text>
          </View>
        </View>
      ) : null}
      {props.items?.cp_type === 2 && props.items.cp_emp_name?.length !== 0 ? (
        <View style={styles.Txtview}>
          <View style={styles.projectContainer}>
            <Text style={styles.projectTxt}>Emp. Name :</Text>
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
          <Text style={styles.projectTxt}>Assign to</Text>
        </View>
        <View>
          <Text>:</Text>
        </View>
        <View style={styles.nameContainer}>
          <Text style={styles.nameTxt}>
            {props?.items?.assign_appointment?.length > 0
              ? props?.items?.assign_appointment[0]?.user_name
              : strings.notfount}
            (
            {props?.items?.assign_appointment[0]?.assign_by_role === "" ||
            props?.items?.assign_appointment[0]?.assign_by_role === undefined ||
            props?.items?.assign_appointment[0]?.assign_by_role === null
              ? strings.notfount
              : props?.items?.assign_appointment[0]?.assign_by_role}
            )
          </Text>
        </View>
      </View>

      {/* <View style={styles.Txtview}>
        <View style={styles.projectContainer}>
          <Text style={styles.projectTxt}>Pickup</Text>
        </View>
        <View><Text>:</Text></View>
        <View style={styles.nameContainer}>
          <Text style={styles.nameTxt}>{props?.items?.pickup ? props?.items?.pickup : strings.notfount}</Text>
        </View>
      </View> */}
      <View style={styles.Txtview}>
        <View style={styles.projectContainer}>
          <Text style={styles.projectTxt}>{strings.closingStatus}</Text>
        </View>
        <View>
          <Text>:</Text>
        </View>
        <View style={styles.nameContainer}>
          <Text
            style={[
              styles.nameTxt,
              {
                color:
                  props?.items?.status == 1
                    ? currentDate >= appointmentdateTime
                      ? "red"
                      : "red"
                    : props?.items?.status === 2
                    ? GREEN_COLOR
                    : props?.items?.status == 3
                    ? bookingStatus === 4
                      ? "red"
                      : GREEN_COLOR
                    : props?.items?.status == 5 || props?.items?.status === 6
                    ? "red"
                    : props?.items?.status === 10
                    ? PRIMARY_THEME_COLOR
                    : props?.items?.status === 4
                    ? "red"
                    : BLACK_COLOR,
              },
            ]}
          >
            {props?.items?.status == 1
              ? currentDate >= appointmentdateTime
                ? "Not Visited"
                : "Upcoming"
              : props?.items?.status === 2
              ? "Revisit"
              : props?.items?.status === 10
              ? "Follow-Up"
              : props?.items?.status == 5
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
      {/* <View style={styles.Txtview}>
        <View style={styles.projectContainer}>
          <Text style={styles.projectTxt}>Visit Status</Text>
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
      <View style={styles.Txtview}>
        <View style={styles.projectContainer}>
          <Text style={styles.projectTxt}>Visit Score</Text>
        </View>
        <View>
          <Text>:</Text>
        </View>
        <View style={styles.nameContainer}>
          <Text style={styles.nameTxt}>{props?.items?.lead_score}</Text>
        </View>
      </View>
      <View style={styles.buttonContainer}>
        <View style={{ flexDirection: "row", alignItems: "center", top: 8 }}>
          {(edit && props?.items?.status === 1) ||
          props?.items?.status === 10 ? (
            <Button
              width={80}
              height={30}
              bgcolor={WHITE_COLOR}
              bordercolor={PURPLE_COLOR}
              borderWidth={1}
              btnTxtcolor={PURPLE_COLOR}
              buttonText={strings.edit}
              btnTxtsize={14}
              border={10}
              handleBtnPress={() => props.onEditPress()}
            />
          ) : null}
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
              Linking?.openURL(`tel:${props.items?.mobile}`);
            }}
          />
        </View>
        {view && (
          <TouchableOpacity
            style={styles.Viewbutton}
            onPress={() => props.onPressView()}
          >
            <Image source={images.forwardArrow} style={styles.arrow} />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default AppointMentForSiteList;
