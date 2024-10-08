import { ROLE_IDS } from "app/components/utilities/constant";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import styles from "./styles";

const SCMView = (props: any) => {
  const targetData = props?.dashboardData?.target || {};
  const achieveTargetData = props?.dashboardData?.achievetarget || {};
  const role = props?.getLoginType?.response?.data?.role_id || null;

  return (
    <View style={{ flex: 1 }}>
      <View style={styles.secondPortion}></View>
      {/* Bottom Section */}
      <View style={styles.thirdPortion}>
        <TouchableOpacity
          onPress={() => props.onPressTodayVisit("today")}
          style={styles.thirdPortioncardView}
        >
          <View style={styles.thirdPortionCardTextView}>
            <Text style={styles.thirdPortionCardText}>Today's</Text>
            <Text style={styles.thirdPortionCardText}>Leads</Text>
          </View>
          <View style={styles.numberView}>
            <Text style={styles.thirdPortionNumberText}>
              {props?.dashboardData?.today_visit}
            </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => props.onPressSiteVisit("today")}
          style={styles.thirdPortioncardView}
        >
          <View style={styles.thirdPortionCardTextView}>
            <Text style={styles.thirdPortionCardText} numberOfLines={2}>
              Today's Appointments
            </Text>
          </View>
          <View style={styles.numberView}>
            <Text style={styles.thirdPortionNumberText}>
              {props?.dashboardData?.today_site_visit}
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
              Today's Checkin
            </Text>
          </View>
          <View style={styles.numberView}>
            <Text style={styles.thirdPortionNumberText}>
              {props?.dashboardData?.today_site_visit}
            </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => props.onpressBooking("request", "today")}
          style={styles.thirdPortioncardView}
        >
          <View style={styles.thirdPortionCardTextView}>
            <Text style={styles.thirdPortionCardText}>
              {/* Booking */}
              Today's Booking
            </Text>
          </View>
          <View style={styles.numberView}>
            <Text style={styles.thirdPortionNumberText}>
              {props?.dashboardData?.today_booking}
            </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            props.onPressCPList();
          }}
          style={styles.thirdPortioncardView}
        >
          <View style={styles.thirdPortionCardTextView}>
            <Text style={styles.thirdPortionCardText}>Active</Text>
            <Text style={styles.thirdPortionCardText}>CP</Text>
          </View>
          <View style={styles.numberView}>
            <Text style={styles.thirdPortionNumberText}>
              {props?.dashboardData?.active_cp}
            </Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => props?.onpressAppointmentWithCP()}
          style={styles.thirdPortioncardView}
        >
          <View style={styles.thirdPortionCardTextView}>
            <Text style={styles.thirdPortionCardText} numberOfLines={3}>
              Today's Appointment With CP
            </Text>
          </View>
          <View style={styles.numberView}>
            <Text style={styles.thirdPortionNumberText}>
              {props?.dashboardData?.today_Apointment_Cp}
            </Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => props.onPressSiteVisit("followup")}
          style={styles.thirdPortioncardView}
        >
          <View style={styles.thirdPortionCardTextView}>
            <Text style={styles.thirdPortionCardText}>
              {"Today's Follow-Up"}
            </Text>
          </View>
          <View style={styles.numberView}>
            <Text style={styles.thirdPortionNumberText}>
              {props?.dashboardData?.today_followup}
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default SCMView;
