import {
  normalize,
  normalizeHeight,
  normalizeWidth,
} from "app/components/scaleFontSize";
import React from "react";
import { Text, View } from "react-native";
import styles from "../styles";
import {
  BLACK_COLOR,
  Isios,
  PRIMARY_THEME_COLOR,
  WHITE_COLOR,
} from "app/components/utilities/constant";
import { ScrollView } from "react-native-gesture-handler";
import SourcingForCluster from "./SourcingForCluster";
import ClosingForCluster from "./ClosingForCluster";
import SMReportTable from "../SMReportTable";

const ClusterHeadtable = (props: any) => {
  const { data, headerData, onReset, handleCpDetailPress, role_ID, handleCTANavigation } = props;

  return (
    <View
      style={{
        marginBottom: normalize(10),
        flex: 1,
      }}
    >
      {/* <View style={{ ...styles.ThemeColorBox, width: "100%" }}>
        <Text style={{ ...styles.boxText, color: WHITE_COLOR }}>
          {role_ID == 1
            ? `Closing Manager Name : ${data?.username}`
            : `Sourcing Manager Name : ${data?.username}`}
        </Text>
      </View> */}
      <View
        style={{
          flexDirection: "row",
        }}
      >
        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
          {/* <View
            style={{
              flexDirection: "column",
            }}
          >
            {headerData.map((item: any, index: any) => {
              return (
                <View
                  key={index}
                  style={{
                    width: normalizeWidth(140),
                    height: normalizeHeight(90),
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
          </View> */}

          <View
            style={{
              flexDirection: "row",
            }}
          >
            {role_ID == 1 ? (
              <ClosingForCluster data={data} headerData={headerData} handleCTANavigation={handleCTANavigation}/>
            ) : (
              <SourcingForCluster data={data} headerData={headerData} handleCpDetailPress={handleCpDetailPress} handleCTANavigation={handleCTANavigation}/>
            )}
          </View>
        </ScrollView>
      </View>
    </View>
  );
};

export default ClusterHeadtable;
