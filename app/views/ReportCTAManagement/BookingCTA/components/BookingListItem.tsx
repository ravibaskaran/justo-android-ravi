import { View, Text, TouchableOpacity, Image, Linking } from "react-native";
import React from "react";
import styles from "./styles";
import strings from "../../../../components/utilities/Localization";
import {
  BLACK_COLOR,
  CONST_IDS,
  DATE_TIME_FORMAT,
  GREEN_COLOR,
  PURPLE_COLOR,
  ROLE_IDS,
  WHITE_COLOR,
  YELLOW_COLOR,
} from "../../../../components/utilities/constant";
import images from "../../../../assets/images";
import Button from "../../../../components/Button";
import moment from "moment";
import { useSelector } from "react-redux";
import usePermission from "app/components/utilities/UserPermissions";

const BookingListItem = (props: any) => {
  return (
    <View style={styles.IteamView}>
      <View style={styles.Txtview}>
        <View style={styles.projectContainer}>
          <Text style={styles.projectTxt}>Booking Date :</Text>
        </View>
        <View style={styles.nameContainer}>
          <Text style={styles.nameTxt}>
            {moment.utc(props.items.booking_date).format(DATE_TIME_FORMAT)}
          </Text>
        </View>
      </View>
      <View style={styles.Txtview}>
        <View style={styles.projectContainer}>
          <Text style={styles.projectTxt}>Customer Name :</Text>
        </View>
        <View style={styles.nameContainer}>
          <Text style={styles.nameTxt}>{props.items.customer_first_name}</Text>
        </View>
      </View>
      <View style={[styles.Txtview, { borderBottomWidth: 0 }]}>
        <View style={styles.projectContainer}>
          <Text style={styles.projectTxt}>Booking Status :</Text>
        </View>
        <View style={styles.nameContainer}>
          {/* booking_status: {//1= Panding, 2 = Confirm, 3= Compleat, 4 =booking cancel} */}
          <Text
            style={[
              styles.nameTxt,
              {
                color:
                  props?.items?.booking_status === 1 ||
                  props?.items?.booking_status === 4
                    ? "red"
                    : props?.items?.booking_status === 2 ||
                      props?.items?.booking_status === 3
                    ? GREEN_COLOR
                    : BLACK_COLOR,
              },
            ]}
          >
            {props?.items?.booking_status === 1
              ? "Booking Pending"
              : props?.items?.booking_status === 2
              ? "Booking Confirm"
              : props?.items?.booking_status === 3
              ? "Registered"
              : props?.items?.booking_status === 4 && "Booking Cancel"}
          </Text>
        </View>
      </View>
    </View>
  );
};

export default BookingListItem;
