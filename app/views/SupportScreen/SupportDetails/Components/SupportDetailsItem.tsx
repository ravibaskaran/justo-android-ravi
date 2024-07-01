import { View, Text, ScrollView, Image, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import styles from "./styles";
import strings from "app/components/utilities/Localization";
import { GREEN_COLOR, RED_COLOR } from "app/components/utilities/constant";
import FastImages from "app/components/FastImage";
import { normalizeHeight } from "app/components/scaleFontSize";
import Modal from "react-native-modal";

const SupportDetailsItem = (props: any) => {
  const item = props?.item || {};
  const [isVisable, setIsVisable] = useState(false);
  const [onPressData, setOnPressData] = useState<any>({});
  console.log('typeof item.image: ', typeof item.image);
  console.log("item.base_url + item.image: ", item.image === "undefined");

  return (
    <ScrollView>
      <View style={styles.topDetailsView}>
        <View style={styles.topTxtView}>
          <Text style={styles.topTxt}>Ticket No. </Text>
          <Text style={styles.topTxt}>
            {item.ticket_number ? item.ticket_number : strings.notfount}
          </Text>
        </View>
      </View>
      <View style={styles.Txtview}>
        <View style={styles.projectContainer}>
          <Text style={styles.projectTxt}>Title </Text>
        </View>
        <View>
          <Text>:</Text>
        </View>
        <View style={styles.nameContainer}>
          <Text style={styles.nameTxt}>
            {item.title ? item.title : strings.notfount}
          </Text>
        </View>
      </View>
      <View style={styles.Txtview}>
        <View style={styles.projectContainer}>
          <Text style={styles.projectTxt}>Create By </Text>
        </View>
        <View>
          <Text>:</Text>
        </View>
        <View style={styles.nameContainer}>
          <Text style={styles.nameTxt}>
            {item.user_name ? item.user_name : strings.notfount}
          </Text>
        </View>
      </View>
      <View style={styles.Txtview}>
        <View style={styles.projectContainer}>
          <Text style={styles.projectTxt}>Issue </Text>
        </View>
        <View>
          <Text>:</Text>
        </View>
        <View style={styles.nameContainer}>
          <Text style={styles.nameTxt}>
            {item.reason_title ? item.reason_title : strings.notfount}
          </Text>
        </View>
      </View>
      <View style={styles.Txtview}>
        <View style={styles.projectContainer}>
          <Text style={styles.projectTxt}>Status </Text>
        </View>
        <View>
          <Text>:</Text>
        </View>
        <View style={styles.nameContainer}>
          <Text
            style={[
              styles.nameTxt,
              {
                color: item.status === 1 ? GREEN_COLOR : RED_COLOR,
              },
            ]}
          >
            {item.status === 1 ? "Open" : item.status === 2 && "Close"}
          </Text>
        </View>
      </View>
      <View style={styles.Txtview}>
        <View style={styles.projectContainer}>
          <Text style={styles.projectTxt}>Description </Text>
        </View>
        <View>
          <Text>:</Text>
        </View>
        <View style={styles.nameContainer}>
          <Text style={styles.nameTxt}>
            {item.remark === "undefined" || item.remark === ""  ? strings.notfount : item.remark }
          </Text>
        </View>
      </View>
      <View style={styles.Txtview}>
        <View style={styles.projectContainer}>
          <Text style={styles.projectTxt}>Image </Text>
        </View>
        <View>
          <Text>:</Text>
        </View>
        {item.image === "undefined" || item.image === ""  ? (
          <View style={styles.nameContainer}>
            <Text style={styles.nameTxt}>{strings.notfount}</Text>
          </View>
        ) : (
          <TouchableOpacity
            onPress={() => {
              setIsVisable(true);
            }}
            style={[styles.nameContainer, { marginLeft: 10 }]}
          >
            <Image
              source={{ uri: item.base_url + item.image }}
              resizeMode={"contain"}
              style={styles.Img}
            />
          </TouchableOpacity>
        )}
      </View>

      <Modal
        isVisible={isVisable}
        onBackdropPress={() => setIsVisable(false)}
        onBackButtonPress={() => setIsVisable(false)}
      >
        <View>
          <FastImages
            source={{ uri: item.base_url + item.image }}
            style={{
              width: "100%",
              height: normalizeHeight(300),
              alignItems: "center",
              justifyContent: "center",
            }}
          />
        </View>
      </Modal>
    </ScrollView>
  );
};

export default SupportDetailsItem;
