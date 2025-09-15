import React from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import {
  normalize
} from "../../../../components/scaleFontSize";
import {
  BLACK_COLOR,
  Isios,
  PRIMARY_THEME_COLOR,
  WHITE_COLOR,
} from "../../../../components/utilities/constant";
import styles from "../styles";

const SourcingForCluster = (props: any) => {
  const { data, headerData, handleCpDetailPress } = props;
  return (
    <View
      // key={index}
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
              <Text
                style={{
                  ...styles.boxText,
                  color: WHITE_COLOR,
                }}
              >
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
                    {item?.username}
                  </Text>
                </View>
                <TouchableOpacity onPress={() => handleCpDetailPress(item?.CPInfo, "Demo")} style={styles.cTDataItems}>
                  <Text
                    style={{
                      ...styles.boxText,
                      color: BLACK_COLOR,
                    }}
                  >
                    {item?.cpcount}
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => handleCpDetailPress(item?.CPInfo, "Demo")} style={styles.cTDataItems}>
                  <Text
                    style={{
                      ...styles.boxText,
                      color: BLACK_COLOR,
                    }}
                  >
                    {item?.newCpRegistered ? item?.newCpRegistered : 0}
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => handleCpDetailPress(item?.CPInfo, "Demo")} style={styles.cTDataItems}>
                  <Text
                    style={{
                      ...styles.boxText,
                      color: BLACK_COLOR,
                    }}
                  >
                    {item?.activeCP}
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => handleCpDetailPress(item?.CPInfo, "Demo")} style={styles.cTDataItems}>
                  <Text
                    style={{
                      ...styles.boxText,
                      color: BLACK_COLOR,
                    }}
                  >
                    {/* {item?.BookingCountTotal} */}
                    {item?.TransactionalCPtotal}
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => handleCpDetailPress(item?.CPInfo, "Demo")} style={styles.cTDataItems}>
                  <Text
                    style={{
                      ...styles.boxText,
                      color: BLACK_COLOR,
                    }}
                  >
                    {item?.inactiveCP}
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => props.handleCTANavigation("AppointmentCTA")} style={styles.cTDataItems}>
                  <Text
                    style={{
                      ...styles.boxText,
                      color: BLACK_COLOR,
                    }}
                  >
                    {/* {item.SitevisitCountTotal} */}
                    {item.Appdonecounttotal}
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => props.handleCTANavigation("AppointmentCTA")} style={styles.cTDataItems}>
                  <Text
                    style={{
                      ...styles.boxText,
                      color: BLACK_COLOR,
                    }}
                  >
                    {item.NoshowAppintment}
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => props.handleCTANavigation("BookingCTA")} style={styles.cTDataItems}>
                  <Text
                    style={{
                      ...styles.boxText,
                      color: BLACK_COLOR,
                    }}
                  >
                    {item.confirmBooking}
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() =>
                    handleCpDetailPress(item.CPInfo, item?.username)
                  }
                  style={styles.cTDataItems}
                >
                  <Text
                    style={{
                      ...styles.boxText,
                      color: BLACK_COLOR,
                    }}
                  >
                    View CP
                  </Text>
                </TouchableOpacity>
              </View>
            );
          })}
        </View>
      </ScrollView>
    </View>
  );
};

export default SourcingForCluster;
