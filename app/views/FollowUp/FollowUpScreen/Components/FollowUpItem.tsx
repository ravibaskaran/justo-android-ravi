import { View, Text, Image, TouchableOpacity } from "react-native";
import React from "react";
import styles from "./Styles";
import images from "../../../../assets/images";
import {
  PURPLE_COLOR,
  PRIMARY_THEME_COLOR,
  DATE_BY_DAY,
  DATE_TIME_FORMAT,
  GREEN_COLOR,
  YELLOW_COLOR,
  RED_COLOR,
  BLACK_COLOR,
  DATE_FORMAT,
  CONST_IDS,
} from "../../../../components/utilities/constant";
import strings from "../../../../components/utilities/Localization";
import moment from "moment";
import usePermission from "app/components/utilities/UserPermissions";
import { useSelector } from "react-redux";

const FollowUpItem = (props: any) => {
  const { edit, view } = usePermission({
    edit: "edit_follow",
    view: "view_follow",
  });
  const { userData = {} } = useSelector((state: any) => state.userData);
  return (
    <View style={styles.IteamView}>
      <View style={styles.Txtview}>
        <View style={styles.projectContainer}>
          <Text style={styles.projectTxt}>Lead No. :</Text>
        </View>
        <View style={styles.nameContainer}>
          <Text style={styles.nameTxt}>
            {props.items.lead_no === "" || props.items.lead_no === undefined
              ? strings.notfount
              : props.items.lead_no}
          </Text>
        </View>
      </View>
      <View style={styles.Txtview}>
        <View style={styles.projectContainer}>
          <Text style={styles.projectTxt}>{strings.visitorScore} :</Text>
        </View>
        <View style={styles.nameContainer}>
          <Text style={styles.nameTxt}>
            {props.items.visit_score === "" ||
            props.items.visit_score === undefined
              ? strings.notfount
              : props.items.visit_score}
          </Text>
        </View>
      </View>
      <View style={styles.Txtview}>
        <View style={styles.projectContainer}>
          <Text style={styles.projectTxt}>Follow-Up Status :</Text>
        </View>
        <View style={styles.nameContainer}>
          <Text style={styles.nameTxt}>
            {props.items.followup_status === "" ||
            props.items.followup_status === undefined
              ? strings.notfount
              : props.items.followup_status}
          </Text>
        </View>
      </View>
      {props?.items?.next_followup_date && (
        <View style={styles.Txtview}>
          <View style={styles.projectContainer}>
            <Text style={styles.projectTxt}>Follow-Up Date :</Text>
          </View>
          <View style={styles.nameContainer}>
            <Text style={styles.nameTxt}>
              {props.items.next_followup_date === "" ||
              props.items.next_followup_date === undefined ||
              props.items.next_followup_date === null
                ? strings.notfount
                : `${moment(props.items.next_followup_date).format(
                    DATE_FORMAT
                  )}, ${props.items.followup_time}`}
            </Text>
          </View>
        </View>
      )}
      <View style={styles.Txtview}>
        <View style={styles.projectContainer}>
          <Text style={styles.projectTxt}>Customer Name :</Text>
        </View>
        <View style={styles.nameContainer}>
          <Text style={styles.nameTxt}>
            {props.items.customer_first_name === "" ||
            props.items.customer_first_name === undefined
              ? strings.notfount
              : props.items.customer_first_name}
          </Text>
        </View>
      </View>
      <View style={styles.Txtview}>
        <View style={styles.projectContainer}>
          <Text style={styles.projectTxt}>{strings.configurations} :</Text>
        </View>
        <View style={styles.nameContainer}>
          <Text style={styles.nameTxt}>
            {props.items.configuration === "" ||
            props.items.configuration === undefined ||
            props.items.configuration === null
              ? strings.notfount
              : props.items.configuration}
          </Text>
        </View>
      </View>
      {/* <View style={styles.Txtview}>
        <View style={styles.projectContainer}>
          <Text style={styles.projectTxt}>Budget :</Text>
        </View>
        <View style={styles.nameContainer}>
          {props.items?.min_budget && props.items?.max_budget ? (
            <Text style={styles.nameTxt}>
              {`${props.items?.min_budget} ${props.items?.min_budget_type}`} -{" "}
              {`${props.items?.max_budget} ${props.items?.max_budget_type}`}
            </Text>
          ) : null}
        </View>
      </View> */}
      <View style={styles.Txtview}>
        <View style={styles.projectContainer}>
          <Text style={styles.projectTxt}>Follow-up Type :</Text>
        </View>
        <View style={styles.nameContainer}>
          <Text style={styles.nameTxt}>
            {props.items.followup_for == 1
              ? "Lead"
              : props.items.followup_for == 2
              ? "Site visit"
              : props.items.followup_for == 3
              ? "Booking"
              : props.items.followup_for === 4
              ? "regstration"
              : strings.notfount}
          </Text>
        </View>
      </View>
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
          <Text style={styles.projectTxt}>Created Date :</Text>
        </View>
        <View style={styles.nameContainer}>
          <Text style={styles.nameTxt}>
            {props.items.createdDate === "" ||
            props.items.createdDate === undefined
              ? strings.notfount
              : moment(props.items.createdDate).format(DATE_TIME_FORMAT)}
          </Text>
        </View>
      </View>
      {/* && props.items.create_by ===  */}
      <View style={styles.buttonContainer}>
        {/* {edit &&
          props.items.followup_for !== 4 &&
          (props.items?.check_status?.[0] ||
            props.items?.followup_status_id?.[0] !==
              CONST_IDS.followup_status_site_visit_id) &&
          props.items.create_by === userData?.data?._id && (
            <TouchableOpacity
              style={[styles.button, { borderColor: PURPLE_COLOR }]}
              onPress={() => props.onPressEdit(props.items)}
            >
              <Text style={[styles.buttonTxt, { color: PURPLE_COLOR }]}>
                {strings.edit}
              </Text>
            </TouchableOpacity>
          )} */}
        <TouchableOpacity
          style={[styles.button, { borderColor: PRIMARY_THEME_COLOR }]}
          onPress={() => props.onPressAllFollowUp(props.items)}
        >
          <Text style={[styles.buttonTxt, { color: PRIMARY_THEME_COLOR }]}>
            {strings.allfollowup}
          </Text>
        </TouchableOpacity>
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

export default FollowUpItem;
