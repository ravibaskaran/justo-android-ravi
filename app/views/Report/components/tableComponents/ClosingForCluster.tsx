import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import React from "react";
import styles from "../styles";
import {
  BLACK_COLOR,
  Isios,
  PRIMARY_THEME_COLOR,
  WHITE_COLOR,
} from "app/components/utilities/constant";
import {
  normalizeWidth,
  normalizeHeight,
  normalize,
} from "app/components/scaleFontSize";

const ClosingForCluster = (props: any) => {
  const { data, headerData } = props;

  return (
    <>
      <View
        style={{
          flexDirection: "row",
        }}
      >
        <View
          style={{
            flexDirection: "column",
          }}
        >
          {headerData?.map((item: any, index: any) => {
            return (
              <View
                key={index}
                style={{
                  // width: normalizeWidth(140),
                  // height: normalizeHeight(90),
                  borderWidth: normalize(Isios ? 1.2 : 2),
                  padding: normalize(12),
                  backgroundColor: PRIMARY_THEME_COLOR,
                }}
              >
                <Text style={{ ...styles.boxText, color: WHITE_COLOR }}>
                  {item}
                </Text>
              </View>
            );
          })}
        </View>
        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
          <View
            style={{
              flexDirection: "row",
            }}
          >
            {data?.map((item: any, index: any) => {
              return (
                <View
                  style={{
                    flexDirection: "column",
                  }}
                >
                  <View style={styles.cTDataItems}>
                    <Text
                      style={{
                        ...styles.boxText,
                        color: BLACK_COLOR,
                      }}
                    >
                      {item?.user_name}
                    </Text>
                  </View>
                  <TouchableOpacity
                    onPress={() => props.handleCTANavigation("AppointmentCTA")}
                    style={styles.cTDataItems}
                  >
                    <Text
                      style={{
                        ...styles.boxText,
                        color: BLACK_COLOR,
                      }}
                    >
                      {item?.VisitorAttended}
                      {/* {item?.TotalAppointments} */}
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => props.handleCTANavigation("AppointmentCTA")}
                    style={styles.cTDataItems}
                  >
                    <Text
                      style={{
                        ...styles.boxText,
                        color: BLACK_COLOR,
                      }}
                    >
                      {item?.DirectWalkins}
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => props.handleCTANavigation("AppointmentCTA")}
                    style={styles.cTDataItems}
                  >
                    <Text
                      style={{
                        ...styles.boxText,
                        color: BLACK_COLOR,
                      }}
                    >
                      {item?.CPWalkins}
                    </Text>
                  </TouchableOpacity>

                  {/* <TouchableOpacity style={styles.cTDataItems}>
                      <Text
                        style={{
                          ...styles.boxText,
                          color: BLACK_COLOR,
                        }}
                      >
                        {item.VisitorAttended}
                      </Text>
                    </TouchableOpacity> */}
                  <TouchableOpacity
                    onPress={() => props.handleCTANavigation("AppointmentCTA")}
                    style={styles.cTDataItems}
                  >
                    <Text
                      style={{
                        ...styles.boxText,
                        color: BLACK_COLOR,
                      }}
                    >
                      {item.Noshow}
                    </Text>
                  </TouchableOpacity>
                  {/* <TouchableOpacity style={styles.cTDataItems}>
                      <Text
                        style={{
                          ...styles.boxText,
                          color: BLACK_COLOR,
                        }}
                      >
                        {item?.TotalAppointments}
                      </Text>
                    </TouchableOpacity> */}
                  <TouchableOpacity
                    onPress={() => props.handleCTANavigation("AppointmentCTA")}
                    style={styles.cTDataItems}
                  >
                    <Text
                      style={{
                        ...styles.boxText,
                        color: BLACK_COLOR,
                      }}
                    >
                      {item?.TotalAppointmentsrevisit}
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => props.handleCTANavigation("AppointmentCTA")}
                    style={styles.cTDataItems}
                  >
                    <Text
                      style={{
                        ...styles.boxText,
                        color: BLACK_COLOR,
                      }}
                    >
                      {item.TotalNotInterested}
                    </Text>
                  </TouchableOpacity>
                  {/* <TouchableOpacity style={styles.cTDataItems}>
                      <Text
                        style={{
                          ...styles.boxText,
                          color: BLACK_COLOR,
                        }}
                      >
                        {item.TotalCancelation}
                      </Text>
                    </TouchableOpacity> */}
                  <TouchableOpacity
                    onPress={() => props.handleCTANavigation("BookingCTA")}
                    style={styles.cTDataItems}
                  >
                    <Text
                      style={{
                        ...styles.boxText,
                        color: BLACK_COLOR,
                      }}
                    >
                      {item.Booking}
                    </Text>
                  </TouchableOpacity>
                  {/* <TouchableOpacity style={styles.cTDataItems}>
                      <Text
                        style={{
                          ...styles.boxText,
                          color: BLACK_COLOR,
                        }}
                      >
                        {item.ReadytoBook}
                      </Text>
                    </TouchableOpacity> */}
                  {/* <TouchableOpacity style={styles.cTDataItems}>
                      <Text
                        style={{
                          ...styles.boxText,
                          color: BLACK_COLOR,
                        }}
                      >
                        {item.Registration}
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.cTDataItems}>
                      <Text
                        style={{
                          ...styles.boxText,
                          color: BLACK_COLOR,
                        }}
                      >
                        {item.CancelBooking}
                      </Text>
                    </TouchableOpacity> */}
                  <TouchableOpacity style={styles.cTDataItems}>
                    <Text
                      style={{
                        ...styles.boxText,
                        color: BLACK_COLOR,
                      }}
                    >
                      {item.Conversion}
                    </Text>
                  </TouchableOpacity>
                  {/* <TouchableOpacity style={styles.cTDataItems}>
                      <Text
                        style={{
                          ...styles.boxText,
                          color: BLACK_COLOR,
                        }}
                      >
                        {item.followschedule}
                      </Text>
                    </TouchableOpacity> */}
                </View>
              );
            })}
          </View>
        </ScrollView>
      </View>
    </>
  );
};

export default ClosingForCluster;
