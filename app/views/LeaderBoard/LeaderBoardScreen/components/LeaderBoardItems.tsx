import React from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import images from "../../../../assets/images";
import {
  normalizeHeight,
  normalizeWidth,
} from "../../../../components/scaleFontSize";
import usePermission from "../../../../components/utilities/UserPermissions";
import styles from "./styles";

const LeaderBoardItems = (props: any) => {
  const item = props?.items || {};
  const { view } = usePermission({
    view: "view_leader_Board",
  });
  return (
    <View style={styles.IteamView}>
      {item?.property_image && (
        <Image
          source={{ uri: `${item?.base_url}${item?.property_image}` }}
          resizeMode={"contain"}
          style={{ width: normalizeWidth(100), height: normalizeHeight(100) }}
        />
      )}

      <View style={styles.Txtview}>
        <View>
          <Text style={styles.projectTxt}>{item?.property_title}</Text>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <View style={styles.columnVw}>
              <Text style={styles.nameTxt}>TOTAL FLAT</Text>
              <Text style={styles.txtStyle}>
                {props?.items?.total_inventry}
              </Text>
            </View>
            <View style={styles.columnVw}>
              <Text style={styles.nameTxt}>SOLD OUT</Text>
              <Text style={styles.txtStyle}>
                {props?.items?.total_sold_out}
              </Text>
            </View>
          </View>
        </View>
      </View>
      {view && (
        <TouchableOpacity
          style={styles.Viewbutton}
          onPress={() => props.onPressView()}
        >
          <Image source={images.forwardArrow} style={styles.arrow} />
        </TouchableOpacity>
      )}
    </View>
  );
};

export default LeaderBoardItems;
