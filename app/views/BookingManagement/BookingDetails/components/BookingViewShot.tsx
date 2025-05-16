import {
  BLACK_COLOR,
  CONST_IDS,
  DATE_BY_DAY,
  DATE_TIME_FORMAT,
  getCPLeadType,
  ROLE_IDS,
} from "app/components/utilities/constant";
import moment from "moment";
import React from "react";
import { ScrollView, Text, View } from "react-native";
import { useSelector } from "react-redux";
import strings from "../../../../components/utilities/Localization";
import styles from "./styles";
import { normalize, normalizeSpacing } from "app/components/scaleFontSize";

const BookingViewShot = (props: any) => {
  const getLoginType = useSelector((state: any) => state.login);
  const item = props?.item[0] || {};
  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <>
        <View style={[styles.Txtview, { paddingVertical: 5 }]}>
          <View style={styles.projectContainer}>
            <Text style={[styles.projectTxt, { fontSize: normalize(12) }]}>
              Customer Name
            </Text>
          </View>
          <View>
            <Text>:</Text>
          </View>
          <View style={styles.nameContainer}>
            <Text style={[styles.nameTxt, { fontSize: normalize(12) }]}>
              {item?.leads?.customer?.first_name
                ? item?.leads?.customer?.first_name
                : strings.notfount}
            </Text>
          </View>
        </View>
        <View style={[styles.Txtview, { paddingVertical: 5 }]}>
          <View style={styles.projectContainer}>
            <Text style={[styles.projectTxt, { fontSize: normalize(12) }]}>
              Lead Created By
            </Text>
          </View>
          <View>
            <Text>:</Text>
          </View>
          <View style={styles.nameContainer}>
            <Text style={[styles.nameTxt, { fontSize: normalize(12) }]}>
              {item?.visit_create_by?.user_name} (
              {item?.visit_create_by?.role_title})
            </Text>
          </View>
        </View>

        {item?.created_for_sm_name?.length > 0 && (
          <View style={[styles.Txtview, { paddingVertical: 5 }]}>
            <View style={styles.projectContainer}>
              <Text style={[styles.projectTxt, { fontSize: normalize(12) }]}>
                Sourced by
              </Text>
            </View>
            <View>
              <Text>:</Text>
            </View>
            <View style={styles.nameContainer}>
              <Text style={[styles.nameTxt, { fontSize: normalize(12) }]}>
                {item?.created_for_sm_name} ({item?.created_for_sm_role})
              </Text>
            </View>
          </View>
        )}
        <View style={[styles.Txtview, { paddingVertical: 5 }]}>
          <View style={styles.projectContainer}>
            <Text style={[styles.projectTxt, { fontSize: normalize(12) }]}>
              {strings.configurations}
            </Text>
          </View>
          <View>
            <Text>:</Text>
          </View>
          <View style={styles.nameContainer}>
            <Text style={[styles.nameTxt, { fontSize: normalize(12) }]}>
              {item?.configuration ? item?.configuration : strings.notfount}
            </Text>
          </View>
        </View>
        <View style={[styles.Txtview, { paddingVertical: 5 }]}>
          <View style={styles.projectContainer}>
            <Text style={[styles.projectTxt, { fontSize: normalize(12) }]}>
              Area (in sq.ft)
            </Text>
          </View>
          <View>
            <Text>:</Text>
          </View>
          <View style={styles.nameContainer}>
            <Text style={[styles.nameTxt, { fontSize: normalize(12) }]}>
              {item?.area
                ? item?.area
                : item?.leads?.areain_sqlft
                ? item?.leads?.areain_sqlft
                : strings.notfount}
            </Text>
          </View>
        </View>
        {getLoginType?.response?.data?.role_id !== ROLE_IDS.postsales_id ||
        getLoginType?.response?.data?.role_id !== ROLE_IDS.admin_id ||
        getLoginType?.response?.data?.role_id !== ROLE_IDS.sitehead_id ? (
          <View style={[styles.Txtview, { paddingVertical: 5 }]}>
            <View style={styles.projectContainer}>
              <Text style={[styles.projectTxt, { fontSize: normalize(12) }]}>
                Budget
              </Text>
            </View>
            <View>
              <Text>:</Text>
            </View>
            <View style={styles.nameContainer}>
              <Text style={[styles.nameTxt, { fontSize: normalize(12) }]}>
                {item?.leads?.budget?.min_budget ||
                item?.leads?.budget?.max_budget
                  ? `${item?.leads?.budget?.min_budget} ${item?.leads?.budget?.min_budget_type} - ${item?.leads?.budget?.max_budget} ${item?.leads?.budget?.max_budget_type}`
                  : strings.notfount}
              </Text>
            </View>
          </View>
        ) : null}
        <View style={[styles.Txtview, { paddingVertical: 5 }]}>
          <View style={styles.projectContainer}>
            <Text style={[styles.projectTxt, { fontSize: normalize(12) }]}>
              Current Status
            </Text>
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
                    item?.booking_status === 1 || item?.booking_status === 4
                      ? "red"
                      : BLACK_COLOR,
                },
              ]}
            >
              {item?.leads?.lead_status === 5 || props?.type === "register"
                ? "Registered"
                : item?.booking_status === 1
                ? "Pending"
                : item?.booking_status === 2
                ? "Booking Confirm"
                : item?.booking_status === 3
                ? "Completed"
                : item?.booking_status === 4 && "Booking Cancel"}
            </Text>
          </View>
        </View>
      </>
      {getLoginType?.response?.data?.role_id !== ROLE_IDS.postsales_id ||
      getLoginType?.response?.data?.role_id !== ROLE_IDS.admin_id ||
      getLoginType?.response?.data?.role_id !== ROLE_IDS.sitehead_id ? (
        <>
          <View style={[styles.Txtview, { paddingVertical: 5 }]}>
            <View style={styles.projectContainer}>
              <Text style={[styles.projectTxt, { fontSize: normalize(12) }]}>
                Property Name
              </Text>
            </View>
            <View>
              <Text>:</Text>
            </View>
            <View style={styles.nameContainer}>
              <Text style={[styles.nameTxt, { fontSize: normalize(12) }]}>
                {item?.properties?.property_title}
              </Text>
            </View>
          </View>
        </>
      ) : null}
      <View style={[styles.Txtview, { paddingVertical: 5 }]}>
        <View style={styles.projectContainer}>
          <Text style={[styles.projectTxt, { fontSize: normalize(12) }]}>
            Lead Source
          </Text>
        </View>
        <View>
          <Text>:</Text>
        </View>
        <View style={styles.nameContainer}>
          <Text style={[styles.nameTxt, { fontSize: normalize(12) }]}>
            {item?.lead_source_name
              ? item?.lead_source_name == "Reference" &&
                item?.referrel_partner == 1
                ? "Referral Partner"
                : item?.lead_source_name
              : strings.notfount}{" "}
            {getCPLeadType(item?.cp_lead_type)}
          </Text>
        </View>
      </View>

      {item?.lead_source_name == "Reference" ? (
        <View style={[styles.Txtview, { paddingVertical: 5 }]}>
          <View style={styles.projectContainer}>
            <Text style={[styles.projectTxt, { fontSize: normalize(12) }]}>
              Referrer
            </Text>
          </View>
          <View>
            <Text>:</Text>
          </View>
          <View style={styles.nameContainer}>
            <Text style={[styles.nameTxt, { fontSize: normalize(12) }]}>
              {item?.referrer_name}
            </Text>
          </View>
        </View>
      ) : null}

      {item?.leads?.lead_source === CONST_IDS.cp_lead_source_id ? (
        <>
          <View style={[styles.Txtview, { paddingVertical: 5 }]}>
            <View style={styles.projectContainer}>
              <Text style={[styles.projectTxt, { fontSize: normalize(12) }]}>
                CP Name
              </Text>
            </View>
            <View>
              <Text>:</Text>
            </View>
            <View style={styles.nameContainer}>
              <Text style={[styles.nameTxt, { fontSize: normalize(12) }]}>
                {item?.cp_name ? item?.cp_name : strings.notfount}
              </Text>
            </View>
          </View>
          <View style={[styles.Txtview, { paddingVertical: 5 }]}>
            <View style={styles.projectContainer}>
              <Text style={[styles.projectTxt, { fontSize: normalize(12) }]}>
                CP Employee Name{" "}
              </Text>
            </View>
            <View>
              <Text>:</Text>
            </View>
            <View style={styles.nameContainer}>
              <Text style={[styles.nameTxt, { fontSize: normalize(12) }]}>
                {item?.cp_emp_name && item?.cp_emp_name?.length > 0
                  ? item?.cp_emp_name
                  : strings.notfount}
              </Text>
            </View>
          </View>
        </>
      ) : null}
      {props?.type !== "readyToBook" && props?.type !== "register" ? (
        <>
          <View
            style={[
              styles.headdingView,
              { marginVertical: normalizeSpacing(5) },
            ]}
          >
            <Text style={[styles.headdingTxt, { fontSize: normalize(14) }]}>
              {strings.bookingDetails}
            </Text>
          </View>

          <View style={[styles.Txtview, { paddingVertical: 5 }]}>
            <View style={styles.projectContainer}>
              <Text style={[styles.projectTxt, { fontSize: normalize(12) }]}>
                {props.type === "cancel" ? "Cancel Booking By" : "Booking By"}
              </Text>
            </View>
            <View>
              <Text>:</Text>
            </View>
            <View style={styles.nameContainer}>
              <Text style={[styles.nameTxt, { fontSize: normalize(12) }]}>
                {item?.booking_by_name
                  ? item?.booking_by_name
                  : strings.notfount}{" "}
                ({item?.creaters?.role_title})
              </Text>
            </View>
          </View>
          <View style={[styles.Txtview, { paddingVertical: 5 }]}>
            <View style={styles.projectContainer}>
              <Text style={[styles.projectTxt, { fontSize: normalize(12) }]}>
                {props.type === "cancel"
                  ? "Cancel Booking Date"
                  : "Booking Date"}
              </Text>
            </View>
            <View>
              <Text>:</Text>
            </View>
            <View style={styles.nameContainer}>
              <Text style={[styles.nameTxt, { fontSize: normalize(12) }]}>
                {props.type === "cancel"
                  ? item?.canceldate === "" ||
                    item?.canceldate === null ||
                    item?.canceldate === undefined
                    ? strings.notfount
                    : moment.utc(item?.canceldate).format(DATE_TIME_FORMAT)
                  : item?.booking_date === "" ||
                    item?.booking_date === null ||
                    item?.booking_date === undefined
                  ? strings.notfount
                  : moment.utc(item?.booking_date).format(DATE_TIME_FORMAT)}
              </Text>
            </View>
          </View>

          <View style={[styles.Txtview, { paddingVertical: 5 }]}>
            <View style={styles.projectContainer}>
              <Text style={[styles.projectTxt, { fontSize: normalize(12) }]}>
                Agreement Value
              </Text>
            </View>
            <View>
              <Text>:</Text>
            </View>
            <View style={styles.nameContainer}>
              <Text style={[styles.nameTxt, { fontSize: normalize(12) }]}>
                {item?.agreement_value === "" ||
                item?.agreement_value === null ||
                item?.agreement_value === undefined
                  ? strings.notfount
                  : item?.agreement_value}
              </Text>
            </View>
          </View>
          <View style={[styles.Txtview, { paddingVertical: 5 }]}>
            <View style={styles.projectContainer}>
              <Text style={[styles.projectTxt, { fontSize: normalize(12) }]}>
                Booking Amount
              </Text>
            </View>
            <View>
              <Text>:</Text>
            </View>
            <View style={styles.nameContainer}>
              <Text style={[styles.nameTxt, { fontSize: normalize(12) }]}>
                {item?.booking_amount === "" ||
                item?.booking_amount === null ||
                item?.booking_amount === undefined
                  ? strings.notfount
                  : item?.booking_amount}
              </Text>
            </View>
          </View>
          <View style={[styles.Txtview, { paddingVertical: 5 }]}>
            <View style={styles.projectContainer}>
              <Text style={[styles.projectTxt, { fontSize: normalize(12) }]}>
                Rate achieved
              </Text>
            </View>
            <View>
              <Text>:</Text>
            </View>
            <View style={styles.nameContainer}>
              <Text style={[styles.nameTxt, { fontSize: normalize(12) }]}>
                {item?.rate_achieved === "" ||
                item?.rate_achieved === null ||
                item?.rate_achieved === undefined
                  ? strings.notfount
                  : item?.rate_achieved}
              </Text>
            </View>
          </View>
          <View style={[styles.Txtview, { paddingVertical: 5 }]}>
            <View style={styles.projectContainer}>
              <Text style={[styles.projectTxt, { fontSize: normalize(12) }]}>
                Payment Type
              </Text>
            </View>
            <View>
              <Text>:</Text>
            </View>
            <View style={styles.nameContainer}>
              <Text style={[styles.nameTxt, { fontSize: normalize(12) }]}>
                {item?.payment_type === "1"
                  ? "Cash"
                  : item?.payment_type === "2"
                  ? "Cheque"
                  : item?.payment_type}
              </Text>
            </View>
          </View>
          {item?.payment_type === "Cheque" && (
            <View style={[styles.Txtview, { paddingVertical: 5 }]}>
              <View style={styles.projectContainer}>
                <Text style={[styles.projectTxt, { fontSize: normalize(12) }]}>
                  Cheque No.
                </Text>
              </View>
              <View>
                <Text>:</Text>
              </View>
              <View style={styles.nameContainer}>
                <Text style={[styles.nameTxt, { fontSize: normalize(12) }]}>
                  {item?.tranjection_upi_cheque_number === "" ||
                  item?.tranjection_upi_cheque_number === null ||
                  item?.tranjection_upi_cheque_number === undefined
                    ? strings.notfount
                    : item?.tranjection_upi_cheque_number}
                </Text>
              </View>
            </View>
          )}

          <View style={[styles.Txtview, { paddingVertical: 5 }]}>
            <View style={styles.projectContainer}>
              <Text style={[styles.projectTxt, { fontSize: normalize(12) }]}>
                Configuration
              </Text>
            </View>
            <View>
              <Text>:</Text>
            </View>
            <View style={styles.nameContainer}>
              <Text style={[styles.nameTxt, { fontSize: normalize(12) }]}>
                {item?.flat_type ? item?.flat_type : strings.notfount}
              </Text>
            </View>
          </View>
          <View style={[styles.Txtview, { paddingVertical: 5 }]}>
            <View style={styles.projectContainer}>
              <Text style={[styles.projectTxt, { fontSize: normalize(12) }]}>
                Floor
              </Text>
            </View>
            <View>
              <Text>:</Text>
            </View>
            <View style={styles.nameContainer}>
              <Text style={[styles.nameTxt, { fontSize: normalize(12) }]}>
                {item?.floor ? item?.floor : strings.notfount}
              </Text>
            </View>
          </View>
          <View style={[styles.Txtview, { paddingVertical: 5 }]}>
            <View style={styles.projectContainer}>
              <Text style={[styles.projectTxt, { fontSize: normalize(12) }]}>
                Flat Number
              </Text>
            </View>
            <View>
              <Text>:</Text>
            </View>
            <View style={styles.nameContainer}>
              <Text style={[styles.nameTxt, { fontSize: normalize(12) }]}>
                {item?.flat_no ? item?.flat_no : strings.notfount}
              </Text>
            </View>
          </View>

          <View style={[styles.Txtview, { paddingVertical: 5 }]}>
            <View style={styles.projectContainer}>
              <Text style={[styles.projectTxt, { fontSize: normalize(12) }]}>
                Carpet Area :
              </Text>
            </View>
            <View style={styles.nameContainer}>
              <Text style={[styles.nameTxt, { fontSize: normalize(12) }]}>
                {item.carpet_area ? item.carpet_area : strings.notfount}
              </Text>
            </View>
          </View>
        </>
      ) : null}
    </ScrollView>
  );
};

export default BookingViewShot;
