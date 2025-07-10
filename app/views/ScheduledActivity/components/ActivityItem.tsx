import images from "app/assets/images";
import {
  DATE_FORMAT,
  DATE_TIME_FORMAT,
  PURPLE_COLOR,
} from "app/components/utilities/constant";
import strings from "app/components/utilities/Localization";
import moment from "moment";
import React from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import styles from "./styles";
import ViewMoreText from "app/components/CommonScreen/ViewMoreText";

const ActivityItem = (props: any) => {
  return (
    <View style={styles.IteamView}>
      {props.items.is_due && (
        <View style={styles.ribbonContainer}>
          <Text style={styles.ribbonText}>Due</Text>
        </View>
      )}
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
          <Text style={styles.projectTxt}> {strings.remark} :</Text>
        </View>
        <View style={styles.nameContainer}>
          <ViewMoreText
            text={props.items.remark}
            numberOfLines={2}
            textStyle={styles.nameTxt}
            notFoundText={strings.notfount}
          />
        </View>
      </View>
      {props?.items?.closing_date && (
        <View style={styles.Txtview}>
          <View style={styles.projectContainer}>
            <Text style={styles.projectTxt}>Closed Date :</Text>
          </View>
          <View style={styles.nameContainer}>
            <Text style={styles.nameTxt}>
              {props.items.closing_date === "" ||
              props.items.closing_date === undefined ||
              props.items.closing_date === null
                ? strings.notfount
                : `${moment(props.items.closing_date).format(DATE_FORMAT)}, ${
                    props.items.closing_time
                  }`}
            </Text>
          </View>
        </View>
      )}
      {props?.items?.closing_remark && (
        <View style={styles.Txtview}>
          <View style={styles.projectContainer}>
            <Text style={styles.projectTxt}>
              {strings.close} {strings.remark} :
            </Text>
          </View>
          <View style={styles.nameContainer}>
            <ViewMoreText
              text={props.items.closing_remark}
              numberOfLines={2}
              textStyle={styles.nameTxt}
              notFoundText={strings.notfount}
            />
          </View>
        </View>
      )}

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
      {props?.active && (
        <View style={[styles.buttonContainer]}>
          <TouchableOpacity
            style={[styles.button, { borderColor: PURPLE_COLOR }]}
            onPress={() => props.onPressClose(props.items)}
          >
            <Text style={[styles.buttonTxt, { color: PURPLE_COLOR }]}>
              Update Status
            </Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

export default ActivityItem;
