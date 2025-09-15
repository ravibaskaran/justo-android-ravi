import moment from "moment";
import React from "react";
import { Text, View } from "react-native";
import { ScrollView } from "react-native";
import {
  DATE_TIME_FORMAT,
} from "../../../../components/utilities/constant";
import strings from "../../../../components/utilities/Localization";
import styles from "./styles";

const StatsView = (props: any) => {
  const item = props?.items || {};
  const current_target =
    props?.items?.current_target?.length > 0
      ? props?.items?.current_target?.[0]
      : {};
  const achievetargetdata =
    props?.items?.achievetargetdata?.length > 0
      ? props?.items?.achievetargetdata?.[0]
      : {};

  return (
    <ScrollView removeClippedSubviews={false}>
      <View style={styles.Txtview}>
        <View style={styles.projectContainer}>
          <Text style={styles.projectTxt}>No. of bookings</Text>
        </View>
        <View>
          <Text>:</Text>
        </View>
        <View style={styles.nameContainer}>
          <Text style={styles.nameTxt}>{item?.user_states?.total_booking}</Text>
        </View>
      </View>
      <View style={styles.Txtview}>
        <View style={styles.projectContainer}>
          <Text style={styles.projectTxt}>{strings.total + " " + strings.closeVisit}</Text>
        </View>
        <View>
          <Text>:</Text>
        </View>
        <View style={styles.nameContainer}>
          <Text style={styles.nameTxt}>
            {item?.user_states?.total_closing_lead}
          </Text>
        </View>
      </View>
      <View style={styles.Txtview}>
        <View style={styles.projectContainer}>
          {/* <Text style={styles.projectTxt}>{strings.closingPrcntg}</Text> */}
          <Text style={styles.projectTxt}>Booking Conversation%</Text>
        </View>
        <View>
          <Text>:</Text>
        </View>
        <View style={styles.nameContainer}>
          <Text style={styles.nameTxt}>
            {`${Math.round(item?.user_states?.total_closing_percentage)}%`}
          </Text>
        </View>
      </View>
      <View style={styles.Txtview}>
        <View style={styles.projectContainer}>
          <Text style={styles.projectTxt}>Last Login</Text>
        </View>
        <View>
          <Text>:</Text>
        </View>
        <View style={styles.nameContainer}>
          <Text style={styles.nameTxt}>
            {item?.user_states?.last_login === "" ||
              item?.user_states?.last_login === null ||
              item?.user_states?.last_login === undefined
              ? ""
              : moment(item?.user_states?.last_login).format(DATE_TIME_FORMAT)}
          </Text>
        </View>
      </View>
      <View style={styles.Txtview}>
        <View style={styles.projectContainer}>
          <Text style={styles.projectTxt}>Last Visit Attend </Text>
        </View>
        <View>
          <Text>:</Text>
        </View>
        <View style={styles.nameContainer}>
          <Text style={styles.nameTxt}>
            {item?.user_states?.last_site_visit === null ||
              item?.user_states?.last_site_visit === "" ||
              item?.user_states?.last_site_visit === undefined
              ? strings.notfount
              : moment(item?.user_states?.last_site_visit).format(DATE_TIME_FORMAT)}
          </Text>
        </View>
      </View>
      <View style={styles.Txtview}>
        <View style={styles.projectContainer}>
          <Text style={styles.projectTxt}>Last Booking</Text>
        </View>
        <View>
          <Text>:</Text>
        </View>
        <View style={styles.nameContainer}>
          <Text style={styles.nameTxt}>
            {item?.user_states?.last_booking === null ||
              item?.user_states?.last_booking === "" ||
              item?.user_states?.last_booking === undefined
              ? strings.notfount
              : moment(item?.user_states?.last_booking).format(DATE_TIME_FORMAT)}
          </Text>
        </View>
      </View>
      <View style={styles.Txtview}>
        <View style={styles.projectContainer}>
          <Text style={styles.projectTxt}>Last Ready Booking</Text>
        </View>
        <View>
          <Text>:</Text>
        </View>
        <View style={styles.nameContainer}>
          <Text style={styles.nameTxt}>
            {item?.user_states?.last_ready_booking === null ||
              item?.user_states?.last_ready_booking === "" ||
              item?.user_states?.last_ready_booking === undefined
              ? strings.notfount
              : moment(item?.user_states?.last_ready_booking).format(DATE_TIME_FORMAT)}
          </Text>
        </View>
      </View>
      <View style={styles.Txtview}>
        <View style={styles.projectContainer}>
          <Text style={styles.projectTxt}>{strings.last + " " + strings.closeVisit}</Text>
        </View>
        <View>
          <Text>:</Text>
        </View>
        <View style={styles.nameContainer}>
          <Text style={styles.nameTxt}>
            {item?.user_states?.last_closing_lead === null ||
              item?.user_states?.last_closing_lead === "" ||
              item?.user_states?.last_closing_lead === undefined
              ? strings.notfount
              : moment(item?.user_states?.last_closing_lead).format(DATE_TIME_FORMAT)}
          </Text>
        </View>
      </View>
      {props?.items?.current_target?.length > 0 ? (
        <>
          <Text style={styles.bigTitlesTxt}>Current Target</Text>
          {/* <View style={[styles.Txtview, { borderTopWidth: 1 }]}>
            <View>
              <Text>:</Text>
            </View>
            <View style={styles.projectContainer}>
              <Text style={styles.projectTxt}>Month</Text>
            </View>
            <View>
              <Text>:</Text>
            </View>
            <View style={styles.nameContainer}>
              <Text style={styles.nameTxt}>{current_target?.month?.toString()}</Text>
            </View>
          </View> */}
          {/* <View style={[styles.Txtview, { borderTopWidth: 1 }]}>
            <View style={styles.projectContainer}>
              <Text style={styles.projectTxt}>Start Date</Text>
            </View>
            <View>
              <Text>:</Text>
            </View>
            <View style={styles.nameContainer}>
              <Text style={styles.nameTxt}>
                {current_target?.start_date === "" ||
                current_target?.start_date === null ||
                current_target?.start_date === undefined
                  ? strings.notfount
                  : moment(current_target?.start_date).format("DD-MM-YYYY")}
              </Text>
            </View>
          </View> */}
          {/* <View style={[styles.Txtview, { borderTopWidth: 1 }]}>
            <View style={styles.projectContainer}>
              <Text style={styles.projectTxt}>End Date</Text>
            </View>
            <View>
              <Text>:</Text>
            </View>
            <View style={styles.nameContainer}>
              <Text style={styles.nameTxt}>
                {current_target?.end_date === "" ||
                current_target?.end_date === null ||
                current_target?.end_date === undefined
                  ? strings.notfount
                  : moment(current_target?.end_date).format("DD-MM-YYYY")}
              </Text>
            </View>
          </View> */}
          {/* <View style={[styles.Txtview, { borderTopWidth: 1 }]}>
            <View style={styles.projectContainer}>
              <Text style={styles.projectTxt}>Visit target</Text>
            </View>
            <View>
              <Text>:</Text>
            </View>
            <View style={styles.nameContainer}>
              <Text style={styles.nameTxt}>
                {current_target?.visit_target
                  ? `${current_target?.visit_target?.toString()} / ${achievetargetdata?.achieve_visit_target?.toString()}`
                  : null}
              </Text>
            </View>
          </View>
          <View style={[styles.Txtview, { borderTopWidth: 1 }]}>
            <View style={styles.projectContainer}>
              <Text style={styles.projectTxt}>Site visit target</Text>
            </View>
            <View>
              <Text>:</Text>
            </View>
            <View style={styles.nameContainer}>
              <Text style={styles.nameTxt}>
                {current_target?.site_visit_target
                  ? `${current_target?.site_visit_target?.toString()} / ${achievetargetdata?.achieve_site_visit_target?.toString()}`
                  : null}
              </Text>
            </View>
          </View> */}
          <View style={[styles.Txtview, { borderTopWidth: 1 }]}>
            <View style={styles.projectContainer}>
              <Text style={styles.projectTxt}>Booking target</Text>
            </View>
            <View>
              <Text>:</Text>
            </View>
            <View style={styles.nameContainer}>
              <Text style={styles.nameTxt}>
                {current_target?.booking_target
                  ? `${achievetargetdata?.achieve_booking_target} / ${current_target?.booking_target}`
                  : null}
              </Text>
            </View>
          </View>
          <View style={[styles.Txtview, { borderTopWidth: 1 }]}>
            <View style={styles.projectContainer}>
              <Text style={styles.projectTxt}>Close target</Text>
            </View>
            <View>
              <Text>:</Text>
            </View>
            <View style={styles.nameContainer}>
              <Text style={styles.nameTxt}>
                {current_target?.closing_target
                  ? `${achievetargetdata?.achieve_closing_target?.toString()} / ${current_target?.closing_target?.toString()}`
                  : null}
              </Text>
            </View>
          </View>
        </>
      ) : null}
    </ScrollView>
  );
};
export default StatsView;
