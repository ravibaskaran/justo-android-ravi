import {
  BLACK_COLOR,
  DATE_TIME_FORMAT,
  getCPLeadType,
  Isios,
} from "app/components/utilities/constant";
import moment from "moment";
import React from "react";
import {
  Linking,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import {
  normalize,
  normalizeWidth,
} from "../../../../components/scaleFontSize";
import strings from "../../../../components/utilities/Localization";
import styles from "./Styles";

const LeadDetailsIteam = (props: any) => {
  const item = props?.items || {};
  const appointment_status = item?.appointment_status;

  const leadSource =
    item?.lead_source === "Reference" && item?.referrel_partner === 1
      ? "Referral Partner"
      : item?.lead_source || strings.notfount;
  const cpLeadType = getCPLeadType(item?.cp_lead_type);

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={styles.topDetailsView}>
        <View style={styles.topTxtView}>
          <Text style={styles.topTxt}>{item?.lead_score}</Text>
          <Text
            style={[
              styles.topTxt,
              {
                fontSize: normalize(16),
              },
            ]}
          >
            {strings.visitorScore}{" "}
          </Text>
        </View>
        <View style={styles.topBtnView}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              Linking?.openURL(`tel:${item?.customer_detail?.mobile}`);
            }}
          >
            <Text style={styles.buttonTxt}>Call</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              Linking?.openURL(`sms:${item?.customer_detail?.mobile}`);
            }}
          >
            <Text style={styles.buttonTxt}>SMS</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.button, Isios ? { width: normalizeWidth(80) } : {}]}
            onPress={() => {
              Linking?.openURL(
                `https:wa.me/${item?.customer_detail?.whatsapp_no}`
              );
            }}
          >
            <Text style={[styles.buttonTxt, { fontSize: normalize(10) }]}>
              WhatsApp
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      {item?.property_title !== "" ? (
        <View style={styles.Txtview}>
          <View style={styles.projectContainer}>
            <Text style={styles.projectTxt}>Property Name</Text>
          </View>
          <View>
            <Text>:</Text>
          </View>
          <View style={styles.nameContainer}>
            <Text style={styles.nameTxt}>
              {item?.property_title === ""
                ? strings.notfount
                : item?.property_title}
            </Text>
          </View>
        </View>
      ) : null}
      <View style={styles.Txtview}>
        <View style={styles.projectContainer}>
          <Text style={styles.projectTxt}>Last Interacted</Text>
        </View>
        <View>
          <Text>:</Text>
        </View>
        <View style={styles.nameContainer}>
          <Text style={styles.nameTxt}>
            {item?.last_interacted_date === "" ||
            item?.last_interacted_date === undefined ||
            item?.last_interacted_date === "undefined"
              ? strings.notfount
              : moment(item?.last_interacted_date).format(DATE_TIME_FORMAT)}
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
            {item?.created_name === "" ||
            item?.created_name === undefined ||
            item?.created_name === "undefined"
              ? strings.notfount
              : item?.created_name}
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
            {leadSource} {cpLeadType}
          </Text>
        </View>
      </View>
      {item?.lead_source === "Reference" ? (
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
      {item?.lead_source === "Channel Partner" ? (
        <View style={styles.Txtview}>
          <View style={styles.projectContainer}>
            <Text style={styles.projectTxt}>
              {item?.cp_type === 2 ? "CP Company Name" : "CP Name"}
            </Text>
          </View>
          <View style={styles.nameContainer}>
            <Text style={styles.nameTxt}>
              {item?.cp_name ? item?.cp_name : strings.notfount}
            </Text>
          </View>
        </View>
      ) : null}
      {item?.cp_type === 2 ? (
        <View style={styles.Txtview}>
          <View style={styles.projectContainer}>
            <Text style={styles.projectTxt}>Emp. Name :</Text>
          </View>
          <View style={styles.nameContainer}>
            <Text style={styles.nameTxt}>
              {item.cp_emp_name ? item.cp_emp_name : strings.notfount}
            </Text>
          </View>
        </View>
      ) : null}

      <View style={styles.Txtview}>
        <View style={styles.projectContainer}>
          <Text style={styles.projectTxt}>Status</Text>
        </View>
        <View>
          <Text>:</Text>
        </View>
        <View style={styles.nameContainer}>
          <Text
            style={[
              styles.nameTxt,
              {
                color: item?.lead_status === 6 ? "red" : BLACK_COLOR,
              },
            ]}
          >
            {appointment_status === 1
              ? "Ready to visit"
              : appointment_status === 2
              ? "Visited"
              : appointment_status === 3
              ? "Booking"
              : appointment_status === 4
              ? "Cancel visit"
              : appointment_status === 5
              ? "Reschedule"
              : appointment_status === 6
              ? "Not interested"
              : "New Lead"}
          </Text>
        </View>
      </View>
      <View style={styles.Txtview}>
        <View style={styles.projectContainer}>
          <Text style={styles.projectTxt}>Acquisition Source :</Text>
        </View>
        <View style={styles.nameContainer}>
          <Text style={[styles.nameTxt]}>
            {/*  1- By User 2 - By Self acquisition_source */}
            {item?.acquisition_source === 1
              ? "By User"
              : item?.acquisition_source === 2
              ? "By Self"
              : strings.notfount}
          </Text>
        </View>
      </View>
      {/* Property Required */}
      <>
        <View style={styles.headdingView}>
          <Text style={styles.headdingTxt}>{strings.propertyrequired}</Text>
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
              {item?.configuration === "" ||
              item?.configuration === undefined ||
              item?.configuration === null ||
              item?.configuration === "undefined"
                ? strings.notfount
                : item?.configuration}
            </Text>
          </View>
        </View>
        <View style={styles.Txtview}>
          <View style={styles.projectContainer}>
            <Text style={styles.projectTxt}>Area (in sq.ft)</Text>
          </View>
          <View>
            <Text>:</Text>
          </View>
          <View style={styles.nameContainer}>
            <Text style={styles.nameTxt}>
              {item?.areain_sqlft === "" ||
              item?.areain_sqlft === undefined ||
              item?.areain_sqlft === "undefined"
                ? strings.notfount
                : item?.areain_sqlft}
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
              {item?.min_budget || item?.max_budget
                ? `${item?.min_budget} ${item?.min_budget_type} - ${item?.max_budget} ${item?.max_budget_type}`
                : strings.notfount}
            </Text>
          </View>
        </View>
        <View style={styles.Txtview}>
          <View style={styles.projectContainer}>
            <Text style={styles.projectTxt}>Nature Of Funding</Text>
          </View>
          <View>
            <Text>:</Text>
          </View>
          <View style={styles.nameContainer}>
            <Text style={styles.nameTxt}>
              {item?.funding_type === "" ||
              item?.funding_type === undefined ||
              item?.funding_type === null
                ? strings.notfount
                : item?.funding_type}
            </Text>
          </View>
        </View>
        <View style={styles.Txtview}>
          <View style={styles.projectContainer}>
            <Text style={styles.projectTxt}>Purpose</Text>
          </View>
          <View>
            <Text>:</Text>
          </View>
          <View style={styles.nameContainer}>
            <Text style={styles.nameTxt}>
              {item?.purpose === "" ||
              item?.purpose === undefined ||
              item?.purpose === null
                ? strings.notfount
                : item?.purpose}
            </Text>
          </View>
        </View>
      </>
      {/* Customer Details */}
      <>
        <View style={styles.headdingView}>
          <Text style={styles.headdingTxt}>{strings.Customerdetails}</Text>
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
              {item?.customer_detail?.first_name === "" ||
              item?.customer_detail?.first_name === undefined ||
              item?.customer_detail?.first_name === "undefined"
                ? strings.notfount
                : item?.customer_detail?.first_name}
            </Text>
          </View>
        </View>
        <View style={styles.Txtview}>
          <View style={styles.projectContainer}>
            <Text style={styles.projectTxt}>Location</Text>
          </View>
          <View>
            <Text>:</Text>
          </View>
          <View style={styles.nameContainer}>
            <Text style={styles.nameTxt}>
              {item?.customer_detail?.location === "" ||
              item?.customer_detail?.location === undefined ||
              item?.customer_detail?.location === "undefined" ||
              item?.customer_detail?.location === null
                ? strings.notfount
                : item?.customer_detail?.location}
            </Text>
          </View>
        </View>
        <View style={styles.Txtview}>
          <View style={styles.projectContainer}>
            <Text style={styles.projectTxt}>Age</Text>
          </View>
          <View>
            <Text>:</Text>
          </View>
          <View style={styles.nameContainer}>
            <Text style={styles.nameTxt}>
              {item?.customer_detail?.age === "" ||
              item?.customer_detail?.age === undefined ||
              item?.customer_detail?.age === "undefined" ||
              item?.customer_detail?.age === null
                ? strings.notfount
                : item?.customer_detail?.age}
            </Text>
          </View>
        </View>
        <View style={styles.Txtview}>
          <View style={styles.projectContainer}>
            <Text style={styles.projectTxt}>Gender</Text>
          </View>
          <View>
            <Text>:</Text>
          </View>
          <View style={styles.nameContainer}>
            <Text style={styles.nameTxt}>
              {item?.customer_detail?.gender === "" ||
              item?.customer_detail?.gender === undefined ||
              item?.customer_detail?.gender === "undefined" ||
              item?.customer_detail?.gender === null
                ? strings.notfount
                : item?.customer_detail?.gender === 1
                ? "Male"
                : "Female"}
            </Text>
          </View>
        </View>
        <View style={styles.Txtview}>
          <View style={styles.projectContainer}>
            <Text style={styles.projectTxt}>Locality</Text>
          </View>
          <View>
            <Text>:</Text>
          </View>
          <View style={styles.nameContainer}>
            <Text style={styles.nameTxt}>
              {item?.customer_detail?.city
                ? item?.customer_detail?.city
                : item?.customer_detail?.locality
                ? item?.customer_detail?.locality
                : strings.notfount}
            </Text>
          </View>
        </View>
      </>
      {/* Company Details */}
      <>
        <View style={styles.headdingView}>
          <Text style={styles.headdingTxt}>{strings.ocupacion}</Text>
        </View>
        <View style={styles.Txtview}>
          <View style={styles.projectContainer}>
            <Text style={styles.projectTxt}>Nature of Occupation</Text>
          </View>
          <View>
            <Text>:</Text>
          </View>
          <View style={styles.nameContainer}>
            <Text style={styles.nameTxt}>
              {item?.customer_detail?.occupation === "" ||
              item?.customer_detail?.occupation === undefined ||
              item?.customer_detail?.occupation === "undefined" ||
              item?.customer_detail?.occupation === null
                ? strings.notfount
                : item?.customer_detail?.occupation}
            </Text>
          </View>
        </View>
        <View style={styles.Txtview}>
          <View style={styles.projectContainer}>
            <Text style={styles.projectTxt}>Company Name</Text>
          </View>
          <View>
            <Text>:</Text>
          </View>
          <View style={styles.nameContainer}>
            <Text style={styles.nameTxt}>
              {item?.customer_detail?.coumpany_name === "" ||
              item?.customer_detail?.coumpany_name === undefined ||
              item?.customer_detail?.coumpany_name === "undefined" ||
              item?.customer_detail?.coumpany_name === null
                ? strings.notfount
                : item?.customer_detail?.coumpany_name}
            </Text>
          </View>
        </View>
        <View style={styles.Txtview}>
          <View style={styles.projectContainer}>
            <Text style={styles.projectTxt}>Designation</Text>
          </View>
          <View>
            <Text>:</Text>
          </View>
          <View style={styles.nameContainer}>
            <Text style={styles.nameTxt}>
              {item?.customer_detail?.desigantion === "" ||
              item?.customer_detail?.desigantion === undefined ||
              item?.customer_detail?.desigantion === "undefined" ||
              item?.customer_detail?.desigantion === null
                ? strings.notfount
                : item?.customer_detail?.desigantion}
            </Text>
          </View>
        </View>
        <View style={styles.Txtview}>
          <View style={styles.projectContainer}>
            <Text style={styles.projectTxt}>Office Address</Text>
          </View>
          <View>
            <Text>:</Text>
          </View>
          <View style={styles.nameContainer}>
            <Text style={styles.nameTxt}>
              {item?.customer_detail?.office_address === "" ||
              item?.customer_detail?.office_address === undefined ||
              item?.customer_detail?.office_address === "undefined" ||
              item?.customer_detail?.office_address === null
                ? strings.notfount
                : item?.customer_detail?.office_address}
            </Text>
          </View>
        </View>
      </>
    </ScrollView>
  );
};

export default LeadDetailsIteam;
