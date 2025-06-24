import images from "app/assets/images";
import Button from "app/components/Button";
import { normalizeSpacing } from "app/components/scaleFontSize";
import {
  BLACK_COLOR,
  DATE_BY_DAY,
  DATE_FORMAT,
  GREEN_COLOR,
  Isios,
  PRIMARY_THEME_COLOR,
  WHITE_COLOR,
  getCPLeadType,
} from "app/components/utilities/constant";
import strings from "app/components/utilities/Localization";
import moment from "moment";
import React from "react";
import { Image, ScrollView, Text, View } from "react-native";
import styles from "./Styles";

const AppointmentDtailsItem = (props: any) => {
  const item = props?.item || {};
  const bookingStatus =
    item?.booking_status?.length > 0 ? item?.booking_status[0] : "";
  const currentDate = `${moment(new Date()).format(
    DATE_FORMAT
  )}, ${new Date().getHours()}:${new Date().getMinutes()}`;
  const appointmentdateTime =
    `${moment.utc(props?.item?.appointment_date).format(DATE_FORMAT)}, ${moment(
      props?.item?.appointment_time?.toString(),
      "hh:mm A"
    ).format("HH:mm")}` || "";

  return (
    <ScrollView>
      <View style={styles.topDetailsView}>
        <View style={styles.topTxtView}>
          <Text style={styles.topTxt}>{strings.visitorScore} </Text>
          <Text style={styles.topTxt}>{item?.lead_score}</Text>
        </View>
        {/* <Image
          source={
            item?.qr_code === '' || typeof item?.qr_code === undefined ?
              images.qrCode :
              { uri: item?.qr_code }
          }
          style={styles.qrImg}
        /> */}
      </View>
      <View style={styles.Txtview}>
        <View style={styles.projectContainer}>
          <Text style={styles.projectTxt}>
            {strings.visitor + " " + strings.name}
          </Text>
        </View>
        <View>
          <Text>:</Text>
        </View>
        <View style={styles.nameContainer}>
          <Text style={styles.nameTxt}>
            {item?.customer_first_name
              ? item?.customer_first_name
              : strings.notfount}
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
            {item?.budget_amount ? (
              <Text style={styles.nameTxt}>{item.budget_amount}</Text>
            ) : item?.min_budget && item?.max_budget ? (
              <Text style={styles.nameTxt}>
                {`${item.min_budget} ${item.min_budget_type} - ${item.max_budget} ${item.max_budget_type}`}
              </Text>
            ) : (
              <Text style={styles.nameTxt}>{strings.notfount}</Text>
            )}
          </Text>
        </View>
      </View>
      <View style={styles.Txtview}>
        <View style={styles.projectContainer}>
          <Text style={styles.projectTxt}>Expected Possession</Text>
        </View>
        <View>
          <Text>:</Text>
        </View>
        <View style={styles.nameContainer}>
          <Text style={styles.nameTxt}>
            {item?.expected_possession_period
              ? item?.expected_possession_period
              : item?.expected_possession_date === "" ||
                item?.expected_possession_date === undefined ||
                item?.expected_possession_date === null
              ? strings.notfount
              : moment.utc(item?.expected_possession_date).format(DATE_BY_DAY)}
          </Text>
        </View>
      </View>
      <View style={styles.Txtview}>
        <View style={styles.projectContainer}>
          <Text style={styles.projectTxt}>{strings.configurations}</Text>
        </View>
        <View>
          <Text>:</Text>
        </View>
        <View style={styles.nameContainer}>
          <Text style={styles.nameTxt}>
            {item?.configuration ? item?.configuration : strings.notfount}
          </Text>
        </View>
      </View>
      <View style={styles.Txtview}>
        <View style={styles.projectContainer}>
          <Text style={styles.projectTxt}>
            {/* {strings.siteVisit + " " + strings.dateTime} */}
            Last Site Visit Date & Time
          </Text>
        </View>
        <View>
          <Text>:</Text>
        </View>
        <View style={styles.nameContainer}>
          <Text style={styles.nameTxt}>
            {item?.appointment_date || item?.appointment_time
              ? `${moment.utc(item?.appointment_date).format("DD-MM-YYYY")} ${
                  item?.appointment_time
                }`
              : strings.notfount}
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
            {item?.property_title ? item?.property_title : strings.notfount}
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
          <Text
            style={[
              styles.nameTxt,
              {
                color:
                  item?.status == 1
                    ? currentDate >= appointmentdateTime
                      ? "red"
                      : "red"
                    : item?.status === 2
                    ? GREEN_COLOR
                    : item?.status === 10
                    ? PRIMARY_THEME_COLOR
                    : item?.status == 3
                    ? bookingStatus === 4
                      ? "red"
                      : GREEN_COLOR
                    : item?.status == 5 || item?.status == 6
                    ? "red"
                    : item?.status === 4
                    ? "red"
                    : BLACK_COLOR,
              },
            ]}
          >
            {item?.status == 1
              ? currentDate >= appointmentdateTime
                ? strings.STSNotVisited
                : strings.STSUpComing
              : item?.status === 2
              ? "Revisit"
              : item?.status === 10
              ? "Follow-Up"
              : item?.status == 5
              ? "Reschedule"
              : item?.status === 4
              ? "Visit Cancelled"
              : item?.status === 6
              ? "Not Fit for Sale"
              : item?.status === 3
              ? bookingStatus === 1
                ? "Ready to Book"
                : bookingStatus === 4
                ? "Cancel Booking"
                : "Booking"
              : "Completed"}
          </Text>
        </View>
      </View>
      {item?.checkin_status && (
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
                { color: item?.checkin_status ? GREEN_COLOR : BLACK_COLOR },
              ]}
            >
              {item?.checkin_status ? "Visited" : strings.notfount}
            </Text>
          </View>
        </View>
      )}
      <View style={styles.Txtview}>
        <View style={styles.projectContainer}>
          <Text style={styles.projectTxt}>Appiontment Complete :</Text>
        </View>
        {/* <View>
            <Text>:</Text>
          </View> */}
        <View style={styles.nameContainer}>
          <Text style={styles.nameTxt}>
            {" "}
            {item?.checkin_date === "" ||
            item?.checkin_date === undefined ||
            item?.checkin_date === null
              ? strings.notfount
              : moment.utc(item?.checkin_date).format(DATE_BY_DAY)}
          </Text>
        </View>
      </View>
      <View style={styles.Txtview}>
        <View style={styles.projectContainer}>
          <Text style={styles.projectTxt}>Created By</Text>
        </View>
        <View>
          <Text>:</Text>
        </View>
        <View style={styles.nameContainer}>
          <Text style={styles.nameTxt}>
            {item?.create_by === "" ||
            item?.create_by === undefined ||
            item?.create_by === null
              ? strings.notfount
              : item?.create_by}{" "}
            (
            {item?.created_by_role === "" ||
            item?.created_by_role === undefined ||
            item?.created_by_role === null
              ? strings.notfount
              : item?.created_by_role}
            )
          </Text>
        </View>
      </View>

      {item?.created_for_sm_name?.length > 0 && (
        <View style={styles.Txtview}>
          <View style={styles.projectContainer}>
            <Text style={styles.projectTxt}>Sourced by</Text>
          </View>
          <View>
            <Text>:</Text>
          </View>
          <View style={styles.nameContainer}>
            <Text style={styles.nameTxt}>
              {item?.created_for_sm_name} ({item?.created_for_sm_role})
            </Text>
          </View>
        </View>
      )}
      <View style={styles.Txtview}>
        <View style={styles.projectContainer}>
          <Text style={styles.projectTxt}>Assign to</Text>
        </View>
        <View>
          <Text>:</Text>
        </View>
        <View style={styles.nameContainer}>
          <Text style={styles.nameTxt}>
            {item?.assign_appointment?.length > 0
              ? item?.assign_appointment[0]?.user_name
              : strings.notfount}
            (
            {item?.assign_appointment?.length > 0
              ? item?.assign_appointment[0]?.assign_by_role === undefined ||
                item?.assign_appointment[0]?.assign_by_role === null
                ? strings.notfount
                : item?.assign_appointment[0]?.assign_by_role
              : null}
            )
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
            {item?.lead_source
              ? item?.lead_source == "Reference" && item?.referrel_partner === 1
                ? "Referral Partner"
                : item?.lead_source
              : strings.notfount}{" "}
            {getCPLeadType(item?.cp_lead_type)}
          </Text>
        </View>
      </View>
      {/* {item?.lead_source == "Channel Partner"
              ? item?.cp_type === 2
                ? "(Company)"
                : "(Individual)"
              : null} */}

      {item?.lead_source == "Reference" ? (
        <View style={styles.Txtview}>
          <View style={styles.projectContainer}>
            <Text style={styles.projectTxt}>Referrer</Text>
          </View>
          <View>
            <Text>:</Text>
          </View>
          <View style={styles.nameContainer}>
            <Text style={styles.nameTxt}>{item?.referrer_name}</Text>
          </View>
        </View>
      ) : null}

      {item?.lead_source == "Channel Partner" ? (
        <View style={styles.Txtview}>
          <View style={styles.projectContainer}>
            <Text style={styles.projectTxt}>
              {/* {item?.cp_type === 2 ? "CP Company Name" : "CP Name"} */}
              CP Name
            </Text>
          </View>
          <View>
            <Text>:</Text>
          </View>
          <View style={styles.nameContainer}>
            <Text style={styles.nameTxt}>
              {item?.cp_name ? `${item?.cp_name}` : strings.notfount}
            </Text>
          </View>
        </View>
      ) : null}
      {item?.cp_type === 2 ? (
        <View style={styles.Txtview}>
          <View style={styles.projectContainer}>
            <Text style={styles.projectTxt}>Employee Name :</Text>
          </View>
          <View>
            <Text>:</Text>
          </View>
          <View style={styles.nameContainer}>
            <Text style={styles.nameTxt}>
              {item.cp_emp_name && item.cp_emp_name?.length !== 0
                ? item.cp_emp_name
                : strings.notfount}
            </Text>
          </View>
        </View>
      ) : null}
      <View style={styles.Txtview}>
        <View style={styles.projectContainer}>
          <Text style={styles.projectTxt}>{strings.remark}</Text>
        </View>
        <View>
          <Text>:</Text>
        </View>
        <View style={styles.nameContainer}>
          <Text style={styles.nameTxt}>
            {item?.remark ? item?.remark : strings.notfount}
          </Text>
        </View>
      </View>
      {item?.pickup === "Yes" ? (
        <>
          <View style={styles.Txtview}>
            <View style={styles.projectContainer}>
              <Text style={styles.projectTxt}>{strings.pickupLocation}</Text>
            </View>
            <View>
              <Text>:</Text>
            </View>
            <View style={styles.nameContainer}>
              <Text style={styles.nameTxt}>
                {item?.pickup_location
                  ? item?.pickup_location
                  : strings.notfount}
              </Text>
            </View>
          </View>
          <View style={styles.Txtview}>
            <View style={styles.projectContainer}>
              <Text style={styles.projectTxt}>{strings.dropupLocation}</Text>
            </View>
            <View>
              <Text>:</Text>
            </View>
            <View style={styles.nameContainer}>
              <Text style={styles.nameTxt}>
                {item?.drop_off_location
                  ? item?.drop_off_location
                  : strings.notfount}
              </Text>
            </View>
          </View>
          <View style={styles.Txtview}>
            <View style={styles.projectContainer}>
              <Text style={styles.projectTxt}>{strings.noofguest}</Text>
            </View>
            <View>
              <Text>:</Text>
            </View>
            <View style={styles.nameContainer}>
              <Text style={styles.nameTxt}>
                {item?.number_of_guest
                  ? item?.number_of_guest
                  : strings.notfount}
              </Text>
            </View>
          </View>
        </>
      ) : null}
      <View
        style={{
          flexDirection: "row",
          justifyContent: "center",
          marginVertical: normalizeSpacing(20),
        }}
      >
        {item.status === 1 || item.status === 10 ? (
          <Button
            width={Isios ? 200 : 160}
            height={45}
            bgcolor={WHITE_COLOR}
            bordercolor={PRIMARY_THEME_COLOR}
            borderWidth={1}
            btnTxtcolor={PRIMARY_THEME_COLOR}
            buttonText={strings.visitorupdate}
            btnTxtsize={14}
            border={10}
            handleBtnPress={() => props.handleVistorUpdate(item)}
          />
        ) : null}
        <Button
          width={Isios ? 200 : 160}
          height={item?.status === 1 || item?.status === 10 ? 45 : 30}
          bgcolor={WHITE_COLOR}
          bordercolor={PRIMARY_THEME_COLOR}
          borderWidth={1}
          btnTxtcolor={PRIMARY_THEME_COLOR}
          buttonText={strings.viewfollowup}
          btnTxtsize={14}
          border={10}
          handleBtnPress={() => props.handleViewFollowUp(item)}
        />
      </View>
    </ScrollView>
  );
};

export default AppointmentDtailsItem;
