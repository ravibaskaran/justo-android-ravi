import moment from "moment";
import React from "react";
import { Text, View } from "react-native";
import {
  BLACK_COLOR,
  DATE_TIME_FORMAT,
  GREEN_COLOR
} from "../../../../components/utilities/constant";
import styles from "./styles";

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
