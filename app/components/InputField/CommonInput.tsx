import { View, TextInput, Image, TouchableOpacity, Text } from "react-native";
import React from "react";
import styles from "./styles";
import {
  BLACK_COLOR,
  GRAY_COLOR,
  GRAY_LIGHT_COLOR,
  Regexs,
} from "../utilities/constant";
import { normalize, normalizeHeight } from "../scaleFontSize";
import { RequiredStart } from "../utilities/GlobalFuncations";

const CommonInput = (props: any) => {
  const onSubmit = (e: any) => {
    const { text } = e;
  };

  return (
    <View>
      <View style={styles.inputHeadinView}>
        <Text
          style={[
            styles.inputHeadingText,
            {
              width: props.headingTextWidth,
            },
          ]}
        >
          {props.headingText}
        </Text>
        {props.require ? <RequiredStart /> : null}
      </View>
      <View style={styles.mainContainer}>
        <TextInput
          style={[
            styles.input,
            {
              width: props.inputWidth,
              height: normalizeHeight(props.inputheight),
              textAlignVertical: "top",
              top: props.topping,
              color: GRAY_LIGHT_COLOR,
              fontSize: 13,
            },
          ]}
          onChangeText={(val: any) => {
            if (props.inputType === "aadhaar") {
              let formattedText = val.split(" ").join("");
              if (formattedText.length > 0) {
                formattedText = formattedText
                  .match(new RegExp(".{1,4}", "g"))
                  .join(" ");
              }
              // props.disableSpecialCharacters === true &&
              if (Regexs.alphaNumeric.test(val) === true) {
                props.onChangeText(formattedText);
              }
            } else if (props.disableSpecialCharacters === true) {
              if (Regexs.alphaNumeric.test(val) === true) {
                props.onChangeText(val);
              }
            } else {
              props.onChangeText(val);
            }
          }}
          onSubmitEditing={onSubmit}
          placeholder={
            props.placeholderText === "3675 9834 6012" ||
            props.placeholderText === "BNZAA2318JM"
              ? props.placeholderText
              : props.placeholderText
          }
          placeholderTextColor={GRAY_COLOR}
          secureTextEntry={props.isSecureText}
          autoCapitalize={props.autoCapitalize ? props.autoCapitalize : "none"}
          editable={props.editable}
          multiline={props.multiline}
          keyboardType={props.keyboardtype}
          value={props.valueshow}
          maxLength={props.maxLength}
          onBlur={props.onBlur}
          onFocus={props.onFocus}
        
        />
        <TouchableOpacity
          onPress={props.handleInputBtnPress}
          disabled={!props.handleInputBtnPress}
          style={
            props.rightImgSrc
              ? props.rightImageVw
                ? props.rightImageVw
                : {}
              : {}
          }
        >
          <Image
            style={
              props.rightImgSrc && props.rightImageSty
                ? props.rightImageSty
                : styles.rightImage
            }
            source={props.rightImgSrc}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default CommonInput;
