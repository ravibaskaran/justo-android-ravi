import { View, Text } from "react-native";
import React from "react";
import styles from "./styles";

const InventoryItem = (props: any) => {
  const { item } = props;
  return (
    <View style={styles.IteamView}>
      <View style={styles.Txtview}>
        <View style={styles.projectContainer}>
          <Text style={styles.projectTxt}>Project Name :</Text>
        </View>
        <View style={styles.nameContainer}>
          <Text style={styles.nameTxt}>{item["Project Name"]}</Text>
        </View>
      </View>
      <View style={styles.Txtview}>
        <View style={styles.projectContainer}>
          <Text style={styles.projectTxt}>Flat Name :</Text>
        </View>
        <View style={styles.nameContainer}>
          <Text style={styles.nameTxt}>{item["Flat Name"]}</Text>
        </View>
      </View>
      <View style={styles.Txtview}>
        <View style={styles.projectContainer}>
          <Text style={styles.projectTxt}>Flat Type :</Text>
        </View>
        <View style={styles.nameContainer}>
          <Text style={styles.nameTxt}>{item["Flat Type"]}</Text>
        </View>
      </View>
      <View style={styles.Txtview}>
        <View style={styles.projectContainer}>
          <Text style={styles.projectTxt}>Carpet Area :</Text>
        </View>
        <View style={styles.nameContainer}>
          <Text style={styles.nameTxt}>{item["Carpet Area"]}</Text>
        </View>
      </View>
      <View style={styles.Txtview}>
        <View style={styles.projectContainer}>
          <Text style={styles.projectTxt}>Floor :</Text>
        </View>
        <View style={styles.nameContainer}>
          <Text style={styles.nameTxt}>{item["Floor"]}</Text>
        </View>
      </View>
    </View>
  );
};

export default InventoryItem;
