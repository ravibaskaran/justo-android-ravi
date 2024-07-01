import { View, Text, TouchableOpacity, Image, Linking } from "react-native";
import React from "react";
import styles from "./Styles";
import strings from "../../../../components/utilities/Localization";
import moment from "moment";

const LeadManagementItem = (props: any) => {
  return (
    <View style={styles.IteamView}>
      <View style={styles.Txtview}>
        <View style={styles.projectContainer}>
          <Text style={styles.projectTxt}>{strings.visitor + " " + strings.name} :</Text>
        </View>
        <View style={styles.nameContainer}>
          <Text style={styles.nameTxt}>{
            props?.items.first_name === null ? '' : props.items.first_name}</Text>
        </View>
      </View>
      <View style={styles.Txtview}>
        <View style={styles.projectContainer}>
          <Text style={styles.projectTxt}>{strings.configuration} :</Text>
        </View>
        <View style={styles.nameContainer}>
          <Text style={styles.nameTxt}>{props.items.configuration ?
            props.items.configuration : strings.notfount
          }</Text>
        </View>
      </View>
      <View style={styles.Txtview}>
        <View style={styles.projectContainer}>
          <Text style={styles.projectTxt}>{strings.budget} :</Text>
        </View>
        <View style={styles.nameContainer}>
          <Text style={styles.nameTxt}>{props.items.budget ?
            props.items.budget : strings.notfount}</Text>
        </View>
      </View>
      <View style={styles.Txtview}>
        <View style={styles.projectContainer}>
          <Text style={styles.projectTxt}>{strings.last + " " + strings.interested} :</Text>
        </View>
        <View style={styles.nameContainer}>
          <Text style={styles.nameTxt}>
            {props.items.last_interacted_date ?
              moment(props.items.last_interacted_date).format('llll') : strings.notfount}
          </Text>
        </View>
      </View>
      <View style={styles.Txtview}>
        <View style={styles.projectContainer}>
          <Text style={styles.projectTxt}>{strings.source} :</Text>
        </View>
        <View style={styles.nameContainer}>
          <Text style={styles.nameTxt}>{props.items.created_name ?
            props.items.created_name : strings.notfount}</Text>
        </View>
      </View>
      <View style={styles.Txtview}>
        <View style={styles.projectContainer}>
          <Text style={styles.projectTxt}>{strings.visitor + " " + strings.score} :</Text>
        </View>
        <View style={styles.nameContainer}>
          <Text style={styles.nameTxt}>{props.items.lead_score}</Text>
        </View>
      </View>
      <View style={styles.Txtview}>
        <View style={styles.projectContainer}>
          <Text style={styles.projectTxt}>{strings.status} :</Text>
        </View>
        <View style={styles.nameContainer}>
          <Text
            style={[
              styles.nameTxt,
              {
                // color:
                //   props.items.lead_status == "confirmatin Pending"
                //     ? BLACK_COLOR
                //     : props.items.status == "Subscribe"
                //       ? YELLOW_COLOR
                //       : "red",
              },
            ]}
          >
            {props.items.lead_status === 1 ? strings.STSCreateLead :
              props.items.lead_status === 2 ? strings.STSFollowUp :
                props.items.lead_status === 3 ? strings.STSSiteVisitnAppointment :
                  props.items.lead_status === 4 ? strings.STSBooking :
                    props.items.lead_status === 5 && strings.STSRegistration
            }
          </Text>
        </View>
      </View>
    </View>
  );
};

export default LeadManagementItem;
