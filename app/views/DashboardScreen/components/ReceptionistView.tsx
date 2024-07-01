import React, { useState } from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import styles from "./styles";
import strings from "../../../components/utilities/Localization";
import {
    normalize,
  normalizeHeight,
  normalizeSpacing,
} from "app/components/scaleFontSize";

const ReceiptionistDashboardView = (props: any) => {
  return (
    <View style={styles.mainContainerWrap}>
      <View
        style={[
          styles.secondPortion,
          {
            flexDirection: "column",
          },
        ]}
      >
        <View
          style={[
            styles.thirdCardView,
            {
              maxHeight: normalizeHeight(160),
              paddingVertical: normalizeSpacing(25)
            },
          ]}
        >
          <View style={styles.cardTextView}>
            <Text style={[styles.cardText, {fontSize: normalize(20)}]}>Total Appointment</Text>
          </View>
          <View style={styles.numberView}>
            <Text style={[styles.numberText, {fontSize: normalize(20)}]}>
              {props?.dashboardData?.total_appointment}
            </Text>
          </View>
        </View>
        {/* <View
          style={[
            styles.secondCardView,
            {
              maxHeight: normalizeHeight(160),
              paddingVertical: normalizeSpacing(25)
            },
          ]}
        >
          <View style={styles.cardTextView}>
            <Text style={[styles.cardText, {fontSize: normalize(20)}]}>Walk-Ins</Text>
          </View>
          <View style={styles.numberView}>
            <Text style={[styles.numberText, {fontSize: normalize(20)}]}>
              {props?.dashboardData?.total_walking}
            </Text>
          </View>
        </View> */}
      </View>
    </View>
  );
};

export default ReceiptionistDashboardView;