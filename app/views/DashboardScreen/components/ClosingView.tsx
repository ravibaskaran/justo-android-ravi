import React, { useState } from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import styles from "./styles";
import strings from "../../../components/utilities/Localization";
import {
  PRIMARY_THEME_COLOR_DARK,
  ROLE_IDS,
} from "app/components/utilities/constant";
import images from "app/assets/images";
import { normalizeSpacing } from "app/components/scaleFontSize";

const ClosingDashboardView = (props: any) => {
  const targetData = props?.dashboardData?.userTarget || {};
  const achieveTargetData = props?.dashboardData?.achievetargetdata || {};
  const role = props?.getLoginType?.response?.data?.role_id || null;

  const renderItem = (item: any, index: any) => {
    return (
      <View key={index}>
        {index <= 4 && (
          <TouchableOpacity
            onPress={() => props.onPressAppointmentItem(item)}
            style={styles.headingView}
          >
            <Text style={styles.itemText}>{item?.customer_first_name}</Text>
            <Text
              style={[styles.itemText, { marginLeft: normalizeSpacing(14) }]}
            >
              {item?.property_title}
            </Text>
            <Text style={styles.itemText}>{item?.appointment_time}</Text>
            <Image source={images.rightArrow} style={styles.rightArrowImage} />
          </TouchableOpacity>
        )}
      </View>
    );
  };

  return (
    <>
      <View style={styles.mainContainerWrap}>
        <View style={styles.secondPortion}>
          {/* <View style={styles.secondCardView}>
                    <View style={styles.cardTextView}>
                        <Text style={styles.cardText}>Booking Target</Text>
                    </View>
                    <View style={styles.numberView}>
                        <Text style={styles.numberText}>{achieveTargetData?.achieve_booking_target}/{targetData?.booking_target}</Text>
                    </View>
                </View>
                <View style={styles.thirdCardView}>
                    <View style={styles.cardTextView}>
                        <Text style={styles.cardText}>Closing Target</Text>
                    </View>
                    <View style={styles.numberView}>
                        <Text style={styles.numberText}>{achieveTargetData?.achieve_closing_target}/{targetData?.closing_target}</Text>
                    </View>
                </View> */}
        </View>
        {/* Bottom Section */}
        <View style={styles.thirdPortion}>
          <TouchableOpacity
            onPress={() => props.onPressSiteVisit("today")}
            style={styles.thirdPortioncardView}
          >
            <View style={styles.thirdPortionCardTextView}>
              <Text style={styles.thirdPortionCardText}>
                {/* Site Visit */}
                Today's Appointments
              </Text>
            </View>
            <View style={styles.numberView}>
              <Text style={styles.thirdPortionNumberText}>
                {props?.dashboardData?.total_appointment}
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
          {/* <TouchableOpacity
                    onPress={() => props.onpressBooking('', 'today')}
                    style={styles.thirdPortioncardView}>
                    <View style={styles.thirdPortionCardTextView}>
                        <Text style={styles.thirdPortionCardText}>Ready to Book</Text>
                    </View>
                    <View style={styles.numberView}>
                        <Text style={styles.thirdPortionNumberText}>
                            {props?.dashboardData?.total_ready_booking}</Text>
                    </View>
                </TouchableOpacity> */}
          {/* <TouchableOpacity
            onPress={() => props.onpressBooking("cancel", "today")}
            style={styles.thirdPortioncardView}
          >
            <View style={styles.thirdPortionCardTextView}>
              <Text style={styles.thirdPortionCardText}>
                {"Cancel Booking"}
              </Text>
            </View>
            <View style={styles.numberView}>
              <Text style={styles.thirdPortionNumberText}>
                {props?.dashboardData?.cancel_booking}
              </Text>
            </View>
          </TouchableOpacity> */}
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

          {role === ROLE_IDS.closingtl_id ||
          role === ROLE_IDS.closing_head_id ? (
            <TouchableOpacity
              onPress={() => props.onpressSMList()}
              style={styles.thirdPortioncardView}
            >
              <View style={styles.thirdPortionCardTextView}>
                <Text style={styles.thirdPortionCardText}>{"Active CM"}</Text>
              </View>
              <View style={styles.numberView}>
                <Text style={styles.thirdPortionNumberText}>
                  {props?.dashboardData?.total_closing_manager}
                </Text>
              </View>
            </TouchableOpacity>
          ) : null}
        </View>
      </View>

      {role === ROLE_IDS.closingmanager_id ? (
        <View style={styles.bottomSection}>
          <View
            style={[
              styles.headingView,
              {
                backgroundColor: PRIMARY_THEME_COLOR_DARK,
              },
            ]}
          >
            <Text style={styles.headingText}>Visitor</Text>
            <Text style={styles.headingText}>Property Name</Text>
            <Text style={styles.headingText}>Time</Text>
          </View>
          {props?.appointmentList.length > 0 ? (
            props?.appointmentList?.map((appointment: any, index: any) =>
              renderItem(appointment, index)
            )
          ) : (
            <Text style={styles.itemText}>Today's Appointment NA</Text>
          )}

          {props?.appointmentList?.length > 5 ? (
            <TouchableOpacity
              style={styles.headingView}
              onPress={() => props.onPressSiteVisit("today")}
            >
              <Text style={[styles.headingText, styles.knowMoreText]}>
                Know More
              </Text>
            </TouchableOpacity>
          ) : null}
        </View>
      ) : null}
    </>
  );
};

export default ClosingDashboardView;
