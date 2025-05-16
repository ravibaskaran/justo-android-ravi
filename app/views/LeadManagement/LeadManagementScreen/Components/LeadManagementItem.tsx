import usePermission from "app/components/utilities/UserPermissions";
import moment from "moment";
import React from "react";
import { Image, Linking, Text, TouchableOpacity, View } from "react-native";
import images from "../../../../assets/images";
import Button from "../../../../components/Button";
import {
  BLACK_COLOR,
  CALL_COLOR,
  DATE_TIME_FORMAT,
  getCPLeadType,
  PURPLE_COLOR,
} from "../../../../components/utilities/constant";
import strings from "../../../../components/utilities/Localization";
import styles from "./Styles";

const LeadManagementItem = (props: any) => {
  const { view, edit } = usePermission({
    view: "view_visitor",
    edit: "edit_visitor",
  });
  const leadSource =
    props.items?.lead_source === "Reference" &&
    props.items?.referrel_partner === 1
      ? "Referral Partner"
      : props.items?.lead_source || strings.notfount;
  const cpLeadType = getCPLeadType(props?.items?.cp_lead_type);

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

      {props?.items?.created_for_sm_name?.length > 0 && (
        <View style={styles.Txtview}>
          <View style={styles.projectContainer}>
            <Text style={styles.projectTxt}>Sourced by :</Text>
          </View>
          <View style={styles.nameContainer}>
            <Text style={styles.nameTxt}>
              {props?.items?.created_for_sm_name}
            </Text>
          </View>
        </View>
      )}

      <View style={styles.Txtview}>
        <View style={styles.projectContainer}>
          <Text style={styles.projectTxt}>Lead Source :</Text>
        </View>
        <View style={styles.nameContainer}>
          <Text style={styles.nameTxt}>
            {leadSource} {cpLeadType}
          </Text>
        </View>
      </View>
      {props.items?.lead_source === "Reference" ? (
        <View style={styles.Txtview}>
          <View style={styles.projectContainer}>
            <Text style={styles.projectTxt}>Referrer :</Text>
          </View>
          <View style={styles.nameContainer}>
            <Text style={styles.nameTxt}>{props.items?.referrer_name}</Text>
          </View>
        </View>
      ) : null}

      {props.items?.lead_source === "Channel Partner" ? (
        <View style={styles.Txtview}>
          <View style={styles.projectContainer}>
            <Text style={styles.projectTxt}>CP Name :</Text>
          </View>
          <View style={styles.nameContainer}>
            <Text style={styles.nameTxt}>
              {props.items?.cp_name ? props.items?.cp_name : strings.notfount}
            </Text>
          </View>
        </View>
      ) : null}
      {props.items?.cp_type === 2 && props.items.cp_emp_name?.length > 0 ? (
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
            {props.items.lead_status === 1
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
              : props.items.lead_status === 8
              ? "Cancel visit"
              : props.items.lead_status === 7 && "Ready To Book"}
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
