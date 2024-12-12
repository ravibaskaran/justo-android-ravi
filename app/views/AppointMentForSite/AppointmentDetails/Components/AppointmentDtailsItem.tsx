import { View, Text, ScrollView, Image } from "react-native";
import React from "react";
import styles from "./Styles";
import images from "../../../../assets/images";
import {
  BLACK_COLOR,
  DATE_BY_DAY,
  DATE_FORMAT,
  DATE_TIME_FORMAT,
  getCPLeadType,
  GREEN_COLOR,
  PRIMARY_THEME_COLOR,
  YELLOW_COLOR,
} from "app/components/utilities/constant";
import moment from "moment";
import strings from "app/components/utilities/Localization";

const AppointmentDtailsItem = (props: any) => {
  const currentDate = `${moment(new Date()).format(
    DATE_FORMAT
  )}, ${new Date().getHours()}:${new Date().getMinutes()}`;
  const appointmentdateTime =
    `${moment
      .utc(props?.detail?.appointment_date)
      .format(DATE_FORMAT)}, ${moment(
      props?.detail?.appointment_time?.toString(),
      "hh:mm A"
    ).format("HH:mm")}` || "";
  const bookingStatus =
    props?.detail?.booking_status?.length > 0
      ? props?.detail?.booking_status[0]
      : "";

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
      <View style={styles.topDetailsView}>
        <View style={styles.topTxtView}>
          <Text style={styles.topTxt}>{strings.visitorScore} </Text>
          <Text style={styles.topTxt}>{props?.detail?.lead_score}</Text>
        </View>
        <Image
          source={
            props?.detail?.qr_code === "" ||
            typeof props?.detail?.qr_code === undefined
              ? images.qrCode
              : { uri: props?.detail?.qr_code }
          }
          style={styles.qrImg}
        />
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
            {props?.detail?.customer_first_name === "" ||
            props?.detail?.customer_first_name === undefined ||
            props?.detail?.customer_first_name === null
              ? strings.notfount
              : props?.detail?.customer_first_name}
          </Text>
        </View>
      </View>
      <View style={styles.Txtview}>
        <View style={styles.projectContainer}>
          <Text style={styles.projectTxt}>Budget</Text>
        </View>
        <View>
          <Text>:</Text>
        </View>
        <View style={styles.nameContainer}>
          <Text style={styles.nameTxt}>
            {props?.detail?.min_budget && props?.detail?.max_budget ? (
              <Text style={styles.nameTxt}>
                {`${props?.detail?.min_budget} ${props?.detail?.min_budget_type}`}{" "}
                -{" "}
                {`${props?.detail?.max_budget} ${props?.detail?.max_budget_type}`}
              </Text>
            ) : (
              <Text style={styles.nameTxt}>{strings.notfount} </Text>
            )}
          </Text>
        </View>
      </View>
      <View style={styles.Txtview}>
        <View style={styles.projectContainer}>
          <Text style={styles.projectTxt}>Expected Possession date</Text>
        </View>
        <View>
          <Text>:</Text>
        </View>
        <View style={styles.nameContainer}>
          <Text style={styles.nameTxt}>
            {props?.detail?.expected_possession_date === "" ||
            props?.detail?.expected_possession_date === undefined ||
            props?.detail?.expected_possession_date === null
              ? strings.notfount
              : moment
                  .utc(props?.detail?.expected_possession_date)
                  .format(DATE_BY_DAY)}
          </Text>
        </View>
      </View>
      {/* <View style={styles.Txtview}>
        <View style={styles.projectContainer}>
          <Text style={styles.projectTxt}>When to buy</Text>
        </View>
        <View>
          <Text>:</Text>
        </View>
        <View style={styles.nameContainer}>
          <Text style={styles.nameTxt}>
            {props?.detail?.appointment_date === "" ||
              props?.detail?.appointment_date === undefined ||
              props?.detail?.appointment_date === null
              ? strings.notfount
              : moment(props?.detail?.appointment_date).format(DATE_FORMAT)}
          </Text>
        </View>
      </View> */}
      <View style={styles.Txtview}>
        <View style={styles.projectContainer}>
          <Text style={styles.projectTxt}>{strings.configurations}</Text>
        </View>
        <View>
          <Text>:</Text>
        </View>
        <View style={styles.nameContainer}>
          <Text style={styles.nameTxt}>
            {props?.detail?.configuration === "" ||
            props?.detail?.configuration === undefined ||
            props?.detail?.configuration === null
              ? strings.notfount
              : props?.detail?.configuration}
          </Text>
        </View>
      </View>
      {/* <View style={styles.Txtview}>
        <View style={styles.projectContainer}>
          <Text style={styles.projectTxt}>Site Visit Date Time</Text>
        </View>
        <View>
          <Text>:</Text>
        </View>
        <View style={styles.nameContainer}>
          <Text style={styles.nameTxt}>
            {props?.detail?.appointment_date === "" ||
            props?.detail?.appointment_date === undefined
              ? strings.notfount
              : moment.utc(props?.detail?.appointment_date).format(DATE_BY_DAY)}
            <Text style={styles.nameTxt}>
              -
              {props?.detail?.appointment_time === "" ||
              props?.detail?.appointment_time === undefined
                ? strings.notfount
                : " " + props?.detail?.appointment_time}
            </Text>
          </Text>
        </View>
      </View> */}
      <View style={styles.Txtview}>
        <View style={styles.projectContainer}>
          <Text style={styles.projectTxt}>Site Visit Date Time</Text>
        </View>
        <View>
          <Text>:</Text>
        </View>
        <View style={styles.nameContainer}>
          <Text style={styles.nameTxt}>
            {props?.detail?.appointment_date === "" ||
            props?.detail?.appointment_date === undefined
              ? strings.notfount
              : moment.utc(props?.detail?.appointment_date).format(DATE_BY_DAY)}
            <Text style={styles.nameTxt}>
              -
              {props?.detail?.appointment_time === "" ||
              props?.detail?.appointment_time === undefined
                ? strings.notfount
                : " " + props?.detail?.appointment_time}
            </Text>
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
          <Text style={styles.nameTxt}>
            {props?.detail?.property_title === "" ||
            props?.detail?.property_title === undefined ||
            props?.detail?.property_title === null
              ? strings.notfount
              : props?.detail?.property_title}
          </Text>
        </View>
      </View>
      <View style={styles.Txtview}>
        <View style={styles.projectContainer}>
          <Text style={styles.projectTxt}>{strings.closingStatus}</Text>
        </View>
        <View>
          <Text>:</Text>
        </View>
        <View style={styles.nameContainer}>
          {/* <Text style={styles.nameTxt}>{props?.detail?.status === 1 ? 'Pending' :
            props?.detail?.status === 2 ? 'Confirm' :
              props?.detail?.status === 3 ? 'Complete' : 'Appointment cancel'}</Text> */}
          <Text
            style={[
              styles.nameTxt,
              {
                color:
                  props?.detail?.status == 1
                    ? currentDate >= appointmentdateTime
                      ? "red"
                      : "red"
                    : props?.detail?.status === 2
                    ? currentDate >= appointmentdateTime
                      ? "red"
                      : YELLOW_COLOR
                    : props?.detail?.status == 3
                    ? bookingStatus === 4
                      ? "red"
                      : GREEN_COLOR
                    : props?.detail?.status == 5 || props?.detail?.status === 6
                    ? "red"
                    : props?.detail?.status === 10
                    ? PRIMARY_THEME_COLOR
                    : props?.detail?.status === 4
                    ? "red"
                    : BLACK_COLOR,
              },
            ]}
          >
            {props?.detail?.status == 1
              ? currentDate >= appointmentdateTime
                ? "Not Visited"
                : "Upcoming"
              : props?.detail?.status === 2
              ? "Revisit"
              : props?.detail?.status === 10
              ? "Follow-Up"
              : props?.detail?.status == 5
              ? "Reschedule"
              : props?.detail?.status === 4
              ? "Visit Cancelled"
              : props?.detail?.status === 6
              ? "Not Fit for Sale"
              : props?.detail?.status === 3
              ? bookingStatus === 1
                ? "Ready to Book"
                : bookingStatus === 4
                ? "Cancel Booking"
                : "Booking"
              : "Completed"}
          </Text>
        </View>
      </View>
      {props?.detail?.checkin_status && (
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
                {
                  color: props?.detail?.checkin_status
                    ? GREEN_COLOR
                    : BLACK_COLOR,
                },
              ]}
            >
              {props?.detail?.checkin_status ? "Visited" : strings.notfount}
            </Text>
          </View>
        </View>
      )}

      {/* <View style={styles.Txtview}>
        <View style={styles.projectContainer}>
          <Text style={styles.projectTxt}>{strings.createBy}</Text>
        </View>
        <View>
          <Text>:</Text>
        </View>
        <View style={styles.nameContainer}>
          <Text style={styles.nameTxt}>
            {props?.detail?.create_by === "" ||
            props?.detail?.create_by === undefined ||
            props?.detail?.create_by === null
              ? strings.notfount
              : props?.detail?.create_by}
          </Text>
        </View>
      </View> */}
      <View style={styles.Txtview}>
        <View style={styles.projectContainer}>
          <Text style={styles.projectTxt}>Assign to</Text>
        </View>
        <View>
          <Text>:</Text>
        </View>
        <View style={styles.nameContainer}>
          <Text style={styles.nameTxt}>
            {props?.detail?.assign_appointment?.length > 0
              ? props?.detail?.assign_appointment[0]?.user_name
              : strings.notfount}
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
          <Text style={styles.nameTxt}>
            {props.detail?.lead_source
              ? props.detail?.lead_source == "Reference" &&
                props.detail?.referrel_partner === 1
                ? "Referral Partner"
                : props.detail?.lead_source
              : strings.notfount}{" "}
            {getCPLeadType(props?.detail?.cp_lead_type)}
          </Text>
        </View>
      </View>

      {props.detail?.lead_source == "Reference" ? (
        <View style={styles.Txtview}>
          <View style={styles.projectContainer}>
            <Text style={styles.projectTxt}>Referrer</Text>
          </View>
          <View>
          <Text>:</Text>
        </View>
          <View style={styles.nameContainer}>
            <Text style={styles.nameTxt}>{props.detail?.referrer_name}</Text>
          </View>
        </View>
      ) : null}

      {props.detail?.lead_source == "Channel Partner" ? (
        <View style={styles.Txtview}>
          <View style={styles.projectContainer}>
            <Text style={styles.projectTxt}>
              {props.detail?.cp_type === 2 ? "CP Company Name" : "CP Name"}
            </Text>
          </View>
          <View>
            <Text>:</Text>
          </View>
          <View style={styles.nameContainer}>
            <Text style={styles.nameTxt}>
              {props.detail?.cp_name ? props.detail?.cp_name : strings.notfount}
            </Text>
          </View>
        </View>
      ) : null}
      {props.detail?.cp_type === 2 ? (
        <View style={styles.Txtview}>
          <View style={styles.projectContainer}>
            <Text style={styles.projectTxt}>Emp. Name</Text>
          </View>
          <View>
            <Text>:</Text>
          </View>
          <View style={styles.nameContainer}>
            <Text style={styles.nameTxt}>
              {props.detail.cp_emp_name
                ? props.detail.cp_emp_name
                : strings.notfount}
            </Text>
          </View>
        </View>
      ) : null}
      <View style={styles.Txtview}>
        <View style={styles.projectContainer}>
          <Text style={styles.projectTxt}>Created By</Text>
        </View>
        <View>
          <Text>:</Text>
        </View>
        <View style={styles.nameContainer}>
          <Text style={styles.nameTxt}>
            {props?.detail?.create_by === "" ||
            props?.detail?.create_by === undefined ||
            props?.detail?.create_by === null
              ? strings.notfount
              : props?.detail?.create_by}
          </Text>
        </View>
      </View>
      <View style={styles.Txtview}>
        <View style={styles.projectContainer}>
          <Text style={styles.projectTxt}>Created By Role </Text>
        </View>
        <View>
          <Text>:</Text>
        </View>
        <View style={styles.nameContainer}>
          <Text style={styles.nameTxt}>
            {props?.detail?.created_by_role === "" ||
            props?.detail?.created_by_role === undefined ||
            props?.detail?.created_by_role === null
              ? strings.notfount
              : props?.detail?.created_by_role}
          </Text>
        </View>
      </View>
      {props?.detail?.remark && (
        <View style={styles.Txtview}>
          <View style={styles.projectContainer}>
            <Text style={styles.projectTxt}>Remark</Text>
          </View>
          <View>
            <Text>:</Text>
          </View>
          <View style={styles.nameContainer}>
            <Text style={styles.nameTxt}>
              {props?.detail?.remark ? props?.detail?.remark : strings.notfount}
            </Text>
          </View>
        </View>
      )}
      {/* <View style={styles.Txtview}>
        <View style={styles.projectContainer}>
          <Text style={styles.projectTxt}>Pickup</Text>
        </View>
        <View>
          <Text>:</Text>
        </View>
        <View style={styles.nameContainer}>
          <Text style={styles.nameTxt}>
            {props?.detail?.pickup === "" ||
            props?.detail?.pickup === undefined ||
            props?.detail?.pickup === null
              ? strings.notfount
              : props?.detail?.pickup}
          </Text>
        </View>
      </View>
      <View style={styles.Txtview}>
        <View style={styles.projectContainer}>
          <Text style={styles.projectTxt}>Pickup Location</Text>
        </View>
        <View>
          <Text>:</Text>
        </View>
        <View style={styles.nameContainer}>
          <Text style={styles.nameTxt}>
            {props?.detail?.pickup_location === "" ||
            props?.detail?.pickup_location === undefined ||
            props?.detail?.pickup_location === null
              ? strings.notfount
              : props?.detail?.pickup_location}
          </Text>
        </View>
      </View>
      <View style={styles.Txtview}>
        <View style={styles.projectContainer}>
          <Text style={styles.projectTxt}>Drop up Location</Text>
        </View>
        <View>
          <Text>:</Text>
        </View>
        <View style={styles.nameContainer}>
          <Text style={styles.nameTxt}>
            {props?.detail?.drop_off_location === "" ||
            props?.detail?.drop_off_location === undefined ||
            props?.detail?.drop_off_location === null
              ? strings.notfount
              : props?.detail?.drop_off_location}
          </Text>
        </View>
      </View>
      <View style={styles.Txtview}>
        <View style={styles.projectContainer}>
          <Text style={styles.projectTxt}>No. of Guest</Text>
        </View>
        <View>
          <Text>:</Text>
        </View>
        <View style={styles.nameContainer}>
          <Text style={styles.nameTxt}>
            {props?.detail?.number_of_guest === "" ||
            props?.detail?.number_of_guest === undefined ||
            props?.detail?.number_of_guest === null
              ? strings.notfount
              : props?.detail?.number_of_guest}
          </Text>
        </View>
      </View> */}
    </ScrollView>
  );
};

export default AppointmentDtailsItem;
