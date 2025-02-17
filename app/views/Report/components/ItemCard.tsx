import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import styles from "./styles";

const ItemCard = (props: any) => {
  return (
    <TouchableOpacity
      // disabled={true}
      onPress={props.onPress}
      style={styles.childContainer}
    >
      <Text style={styles.text1}>{props?.title}</Text>
      <View style={styles.smallContainer}>
        <View style={{ flex: 1 }}>
          <Text style={{ fontWeight: "600" }}>CP: {props?.byCp}</Text>
          <Text style={{ fontWeight: "600" }}>Direct: {props?.byDirect}</Text>
        </View>
        <Text style={styles.text2}>{props?.total}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default ItemCard;
