import React, { useState } from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import styles from "./styles";
import strings from "../../../components/utilities/Localization";
import {
  normalize,
  normalizeHeight,
  normalizeSpacing,
} from "app/components/scaleFontSize";

const SiteHeadView = (props: any) => {
  return (
    <View style={styles.mainContainerWrap}>
      <View style={styles.secondPortion}></View>
      {/* Bottom Section */}
      <View style={[styles.thirdPortion, { flex: 3 }]}>
        <TouchableOpacity
          onPress={() => props.onPressTodayVisit("today")}
          style={styles.thirdPortioncardView}
        >
          <View style={styles.thirdPortionCardTextView}>
            <Text style={styles.thirdPortionCardText}>
              {/* Site Visit */}
              Today's Leads
            </Text>
          </View>
          <View style={styles.numberView}>
            <Text style={styles.thirdPortionNumberText}>
              {props?.dashboardData?.total_visit}
            </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => props.onPressSiteVisit("todayComplete")}
          style={styles.thirdPortioncardView}
        >
          <View style={styles.thirdPortionCardTextView}>
            <Text style={styles.thirdPortionCardText}>
              {/* {strings.todayCompVisit} */}
              Today's Appointments
            </Text>
          </View>
          <View style={styles.numberView}>
            <Text style={styles.thirdPortionNumberText}>
              {props?.dashboardData?.total_appoinment}
            </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => props.onPressSiteVisit('todayComplete')}
          style={[
            styles.thirdPortioncardView,
            { height: normalizeHeight(120) },
          ]}
        >
          <View style={styles.thirdPortionCardTextView}>
            <Text style={styles.thirdPortionCardText}>Today's Checkin</Text>
          </View>
          <View style={styles.numberView}>
            <Text style={styles.thirdPortionNumberText}>
              {props?.dashboardData?.today_checking}
            </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => props.onpressBooking('request', 'today')}
          style={styles.thirdPortioncardView}
        >
          <View style={styles.thirdPortionCardTextView}>
            <Text style={styles.thirdPortionCardText} numberOfLines={2}>
            Today's Booking
            </Text>
          </View>
          <View style={styles.numberView}>
            <Text style={styles.thirdPortionNumberText}>
              {props?.dashboardData?.total_booking}
            </Text>
          </View>
        </TouchableOpacity>
        {/* <TouchableOpacity
          onPress={() => props.onPressSiteVisit()}
          style={[
            styles.thirdPortioncardView,
            { height: normalizeHeight(120) },
          ]}
        >
          <View style={styles.thirdPortionCardTextView}>
            <Text style={styles.thirdPortionCardText}>Total Appointment</Text>
          </View>
          <View style={styles.numberView}>
            <Text style={styles.thirdPortionNumberText}>
              {props?.dashboardData?.total_appoinment}
            </Text>
          </View>
        </TouchableOpacity> */}
        <TouchableOpacity
          onPress={() => props.onpressBooking('cancel', 'today')}
          style={[
            styles.thirdPortioncardView,
            // { height: normalizeHeight(130) },
          ]}
        >
          <View style={styles.thirdPortionCardTextView}>
            <Text style={styles.thirdPortionCardText}>Today's Cancel Booking</Text>
          </View>
          <View style={styles.numberView}>
            <Text style={styles.thirdPortionNumberText}>
              {props?.dashboardData?.cancel_booking}
            </Text>
          </View>
        </TouchableOpacity>
        {/* <TouchableOpacity
          onPress={() => props.onpressBooking("register")}
          style={[
            styles.thirdPortioncardView,
            { height: normalizeHeight(120) },
          ]}
        >
          <View style={styles.thirdPortionCardTextView}>
            <Text style={styles.thirdPortionCardText}>
              Today's Registration
            </Text>
          </View>
          <View style={styles.numberView}>
            <Text style={styles.thirdPortionNumberText}>
              {props?.dashboardData?.total_registration}
            </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => props.onpressBooking("cancel", "cancelBooking")}
          style={styles.thirdPortioncardView}
        >
          <View style={styles.thirdPortionCardTextView}>
            <Text style={styles.thirdPortionCardText}>{"Cancel Booking"}</Text>
          </View>
          <View style={styles.numberView}>
            <Text style={styles.thirdPortionNumberText}>
              {props?.dashboardData?.cancel_booking}
            </Text>
          </View>
        </TouchableOpacity> */}
        {/* <TouchableOpacity
          onPress={() => props.onpressBooking()}
          style={[styles.thirdPortioncardView, {height: normalizeHeight(120)}]}
        >
          <View style={styles.thirdPortionCardTextView}>
            <Text style={styles.thirdPortionCardText}>Total Ready to Book</Text>
          </View>
          <View style={styles.numberView}>
            <Text style={styles.thirdPortionNumberText}>
              {props?.dashboardData?.total_aready_to_book}
            </Text>
          </View>
        </TouchableOpacity> */}
      </View>
    </View>
  );
};

export default SiteHeadView;
