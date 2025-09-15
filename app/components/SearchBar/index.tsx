import React from "react";
import { TextInput, View } from "react-native";
import {
  GRAY_COLOR
} from "../utilities/constant";
import styles from "./styles";

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
