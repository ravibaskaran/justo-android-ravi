import {
  View,
  TextInput,
  Image,
  TouchableOpacity,
  Text,
  ScrollView,
} from "react-native";
import React, { useState } from "react";
import styles from "./styles";
import {
  BLACK_COLOR,
  GRAY_COLOR,
  GRAY_LIGHT_COLOR,
  Isios,
  PRIMARY_THEME_COLOR_DARK,
} from "../utilities/constant";
import images from "../../assets/images";
import { normalizeHeight } from "../scaleFontSize";
import CommonInput from "./CommonInput";
import LocationInput from "./Location";

const InputField = (props: any) => {
  const [onfocus, setFocus] = useState(false);
  const {
    inputWidth = "90%",
    editable = true,
    multiline = false,
    inputheight = Isios ? 35 : 50,
    keyboardtype = "default",
    topping = 2,
    inputType = "normal",
    require = false,
    disableSpecialCharacters = false,
  } = props;
  const onSubmit = (e: any) => {
    const { text } = e;
  };

  return (
    <View>
      {inputType === "location" ? (
        <LocationInput
          require={require}
          editable={editable}
          headingText={props.headingText}
          headingTextWidth={props.headingTextWidth}
          onPressSelect={props.onPressSelect}
          placeholderText={props.placeholderText}
          valueshow={props.valueshow}
          onBlur={props.onBlur}
          textInputProps={
            props.textInputProps
              ? props.textInputProps
              : {
                  placeholderTextColor: BLACK_COLOR,
                  onChangeText: (val: any) => {
                    if (onfocus) {
                      props.onChangeText(val);
                    }
                  },
                  value: props.valueshow,
                  onFocus: () => {
                    setFocus(true);
                  },
                  onBlur: () => {
                    setFocus(false);
                  },
                }
          }
          handleInputBtnPress={props.handleInputBtnPress}
          rightImgSrc={props.rightImgSrc}
        />
      ) : (
        <CommonInput
          require={require}
          editable={editable}
          inputWidth={inputWidth}
          multiline={multiline}
          inputheight={inputheight}
          keyboardtype={keyboardtype}
          topping={topping}
          inputType={props.inputType}
          headingText={props.headingText}
          headingTextWidth={props.headingTextWidth}
          onChangeText={props.onChangeText}
          placeholderText={props.placeholderText}
          isSecureText={props.isSecureText}
          autoCapitalize={"none"}
          valueshow={
            props.valueshow == "null" || props.valueshow == "undefined"
              ? ""
              : props.valueshow
          }
          maxLength={props.maxLength}
          onBlur={props.onBlur}
          onFocus={props.onFocus}
          handleInputBtnPress={props.handleInputBtnPress}
          rightImgSrc={props.rightImgSrc}
          rightImageSty={props.rightImageSty}
          rightImageVw={props.rightImageVw}
          disableSpecialCharacters={disableSpecialCharacters}
        />
      )}
    </View>
  );
};

export default InputField;
