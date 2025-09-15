import React from "react";
import { Text, View } from "react-native";
import styles from "./styles";

const InventoryItem = (props: any) => {
  const { item } = props;
  return (
    <View style={styles.IteamView}>
      <View style={styles.Txtview}>
        <View style={styles.projectContainer}>
          <Text style={styles.projectTxt}>Flat Name :</Text>
        </View>
        <View style={styles.nameContainer}>
          <Text style={styles.nameTxt}>{item["Flat Name"]}</Text>
        </View>
      </View>
    </View>
  );
};

export default InventoryItem;
