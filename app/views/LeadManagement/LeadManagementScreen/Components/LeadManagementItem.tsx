import { View, Text, TouchableOpacity, Image, Linking } from "react-native";
import React from "react";
import styles from "./Styles";
import {
  BLACK_COLOR,
  CALL_COLOR,
  DATE_TIME_FORMAT,
  GREEN_COLOR,
  PURPLE_COLOR,
  RED_COLOR,
  YELLOW_COLOR,
} from "../../../../components/utilities/constant";
import images from "../../../../assets/images";
import Button from "../../../../components/Button";
import strings from "../../../../components/utilities/Localization";
import moment from "moment";
import usePermission from "app/components/utilities/UserPermissions";

const LeadManagementItem = (props: any) => {
  const { view, edit } = usePermission({
    view: "view_visitor",
    edit: "edit_visitor",
  });
  const appointment_status =
    props?.items?.appointment_status?.length > 0 &&
    props?.items?.appointment_status[
      props?.items?.appointment_status?.length - 1
    ];

  return (
    <View style={styles.IteamView}>
      {props?.items.property_title !== "" ? (
        <View style={styles.Txtview}>
          <View style={styles.projectContainer}>
            <Text style={styles.projectTxt}>Property Name :</Text>
          </View>
          <View style={styles.nameContainer}>
            <Text style={styles.nameTxt}>
              {props?.items.property_title === ""
                ? strings.notfount
                : props.items.property_title}
            </Text>
          </View>
        </View>
      ) : null}
      <View style={styles.Txtview}>
        <View style={styles.projectContainer}>
          <Text style={styles.projectTxt}>Visitor Name :</Text>
        </View>
        <View style={styles.nameContainer}>
          <Text style={styles.nameTxt}>
            {props?.items.first_name === ""
              ? strings.notfount
              : props.items.first_name}
          </Text>
        </View>
      </View>
      <View style={styles.Txtview}>
        <View style={styles.projectContainer}>
          <Text style={styles.projectTxt}>{strings.configurations} :</Text>
        </View>
        <View style={styles.nameContainer}>
          <Text style={styles.nameTxt}>
            {props.items.configuration
              ? props.items.configuration
              : strings.notfount}
          </Text>
        </View>
      </View>
      <View style={styles.Txtview}>
        <View style={styles.projectContainer}>
          <Text style={styles.projectTxt}>Budget :</Text>
        </View>
        <View style={styles.nameContainer}>
          <Text style={styles.nameTxt}>
            {props.items.min_rate || props.items.max_rate
              ? `${props.items.min_rate} ${props.items.min_rate_type} - ${props.items.max_rate} ${props.items.max_rate_type}`
              : strings.notfount}
          </Text>
        </View>
      </View>
      <View style={styles.Txtview}>
        <View style={styles.projectContainer}>
          <Text style={styles.projectTxt}>Last Interested :</Text>
        </View>
        <View style={styles.nameContainer}>
          <Text style={styles.nameTxt}>
            {props.items.last_interacted_date
              ? moment(props.items.last_interacted_date).format(
                  DATE_TIME_FORMAT
                )
              : strings.notfount}
          </Text>
        </View>
      </View>
      <View style={styles.Txtview}>
        <View style={styles.projectContainer}>
          <Text style={styles.projectTxt}>Create by :</Text>
        </View>
        <View style={styles.nameContainer}>
          <Text style={styles.nameTxt}>
            {props.items.created_name
              ? props.items.created_name
              : strings.notfount}
          </Text>
        </View>
      </View>
      <View style={styles.Txtview}>
        <View style={styles.projectContainer}>
          <Text style={styles.projectTxt}>Lead Source :</Text>
        </View>
        <View style={styles.nameContainer}>
          <Text style={styles.nameTxt}>
            {props.items?.lead_source
              ? props.items?.lead_source
              : strings.notfount}
          </Text>
        </View>
      </View>
      {props.items?.lead_source === "Channel Partner" ? (
        <View style={styles.Txtview}>
          <View style={styles.projectContainer}>
            <Text style={styles.projectTxt}>
              {props.items?.cp_type === 2 ? "CP Company Name" : "CP Name"}
            </Text>
          </View>
          <View style={styles.nameContainer}>
            <Text style={styles.nameTxt}>
              {props.items?.cp_name ? props.items?.cp_name : strings.notfount}
            </Text>
          </View>
        </View>
      ) : null}
      {props.items?.cp_type === 2 ? (
        <View style={styles.Txtview}>
          <View style={styles.projectContainer}>
            <Text style={styles.projectTxt}>Emp. Name :</Text>
          </View>
          <View style={styles.nameContainer}>
            <Text style={styles.nameTxt}>
              {props.items.cp_emp_name
                ? props.items.cp_emp_name
                : strings.notfount}
            </Text>
          </View>
        </View>
      ) : null}
      <View style={styles.Txtview}>
        <View style={styles.projectContainer}>
          <Text style={styles.projectTxt}>{strings.visitorScore} :</Text>
        </View>
        <View style={styles.nameContainer}>
          <Text style={styles.nameTxt}>{props.items.lead_score}</Text>
        </View>
      </View>
      <View style={styles.Txtview}>
        <View style={styles.projectContainer}>
          <Text style={styles.projectTxt}>Create Date :</Text>
        </View>
        <View style={styles.nameContainer}>
          <Text style={styles.nameTxt}>
            {props.items.createdDate
              ? moment(props.items.createdDate).format(DATE_TIME_FORMAT)
              : strings.notfount}
          </Text>
        </View>
      </View>
      <View style={styles.Txtview}>
        <View style={styles.projectContainer}>
          <Text style={styles.projectTxt}>Status :</Text>
        </View>
        <View style={styles.nameContainer}>
          <Text
            style={[
              styles.nameTxt,
              {
                color: props.items.lead_status == 6 ? "red" : BLACK_COLOR,
              },
            ]}
          >
            {/* {props.items.lead_status === 1
              ? "New Lead"
              : props.items.lead_status === 2
              ? "In Follow up"
              : props.items.lead_status === 3
              ? "Ready to Visit"
              : props.items.lead_status === 4
              ? "Booking"
              : props.items.lead_status === 5
              ? "Registration"
              : props.items.lead_status === 6
              ? "Not interested"
              : props.items.lead_status === 7 && "Ready To Book"} */}
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
      {/* <View style={styles.Txtview}>
        <View style={styles.projectContainer}>
          <Text style={styles.projectTxt}>visit status :</Text>
        </View>
        <View style={styles.nameContainer}>
          <Text style={[styles.nameTxt, {
            color:
              props.items.visit_status === strings.hot ? GREEN_COLOR
                : props.items.visit_status === strings.warm ? YELLOW_COLOR
                  : props.items.visit_status === strings.cold ? RED_COLOR : BLACK_COLOR
          }]}>{
              props.items.visit_status ?
                props.items.visit_status
                : strings.notfount
            }</Text>
        </View>
      </View> */}
      <View style={styles.Txtview}>
        <View style={styles.projectContainer}>
          <Text style={styles.projectTxt}>Acquisition Source :</Text>
        </View>
        <View style={styles.nameContainer}>
          <Text style={[styles.nameTxt]}>
            {/*  1- By User 2 - By Self acquisition_source */}
            {props.items.acquisition_source === 1
              ? "By User"
              : props.items.acquisition_source === 2
              ? "By Self"
              : props.items.acquisition_source === 3
              ? strings.bulkupload
              : strings.notfount}
          </Text>
        </View>
      </View>
      <View style={styles.buttonContainer}>
        <Button
          width={85}
          height={30}
          bgcolor={null}
          bordercolor={CALL_COLOR}
          borderWidth={1}
          btnTxtcolor={CALL_COLOR}
          buttonText={strings.call}
          btnTxtsize={14}
          textTransform={null}
          border={10}
          handleBtnPress={() => {
            Linking?.openURL(`tel:${props?.items?.mobile}`);
          }}
        />
        {edit ? (
          props.items.lead_status === 1 ||
          props.items.lead_status === 2 ||
          props.items.lead_status === 3 ? (
            <Button
              width={85}
              height={30}
              bgcolor={null}
              bordercolor={PURPLE_COLOR}
              borderWidth={1}
              btnTxtcolor={PURPLE_COLOR}
              buttonText={strings.edit}
              btnTxtsize={14}
              textTransform={null}
              border={10}
              handleBtnPress={() => {
                props.handleEdit(props.items);
              }}
            />
          ) : null
        ) : null}
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

export default LeadManagementItem;
