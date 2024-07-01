import { View, Text, TextInput, TouchableOpacity, Image } from "react-native";
import React from "react";
import styles from "./styles";
import { normalize, normalizeHeight } from "../scaleFontSize";
import {
  BLACK_COLOR,
  GRAY_COLOR,
  GRAY_LIGHT_COLOR,
} from "../utilities/constant";
import images from "app/assets/images";

const SearchBar = (props: any) => {
  return (
    <View style={styles.inputView}>
      <TextInput
        style={styles.TextInput}
        onChangeText={(val) => props.onChangeText(val)}
        onSubmitEditing={props.onSubmit}
        placeholder={props.placeholderText}
        placeholderTextColor={GRAY_COLOR}
        autoCapitalize={"none"}
        value={props.value}
      ></TextInput>
      {/* <TouchableOpacity style={styles.searchIconTouch} onPress={props.onSubmit}>
        <Image source={images.search} style={styles.searchIconImg} />
      </TouchableOpacity> */}
    </View>
  );
};

export default SearchBar;
