import {
  View,
  TextInput,
  Image,
  TouchableOpacity,
  Text,
  Pressable,
} from "react-native";
import React, { useState } from "react";
import styles from "../InputField/styles";
import {
  BLACK_COLOR,
  DATE_FORMAT,
  DATE_FORMAT_EXCL,
  Isios,
  RED_COLOR,
  TIME_FORMAT,
} from "../utilities/constant";
import images from "../../assets/images";
import { normalizeHeight } from "../scaleFontSize";
import DatePicker from "react-native-date-picker";
import moment from "moment";
import { RequiredStart } from "../utilities/GlobalFuncations";
import strings from "../utilities/Localization";
import ErrorMessage from "../ErrorMessage";

const InputCalender = (props: any) => {
  const minDate: any = moment().subtract(18, "years");
  const [open, setOpen] = useState(false);
  const onConfirmDate = (date: any) => {
    setOpen(false);
    props.setDateshow(date);
    props.dateData(date);
  };

  const {
    inputWidth = "90%",
    editable = true,
    multiline = false,
    inputheight = Isios ? 35 : 50,
  } = props;
  const onSubmit = (e: any) => {
    const { text } = e;
  };

  const timeSelectValidation = (date: any) => {
    var currentTime = new Date();
    var minTime = new Date();
    minTime.setHours(10);
    minTime.setMinutes(0);
    var maxTime = new Date();
    maxTime.setHours(19);
    maxTime.setMinutes(0);
    if (
      props.dateValue === "" ||
      props.dateValue === undefined ||
      props.dateValue === null
    ) {
      if (props.appointmentWithCpPage) {
        ErrorMessage({
          msg: "please select date",
          backgroundColor: RED_COLOR,
        });
        return false;
      }
      if (
        moment(moment(date).format(TIME_FORMAT), "hh:mm A").format("HH:mm") <=
        moment(moment(currentTime).format(TIME_FORMAT), "hh:mm A").format(
          "HH:mm"
        )
      ) {
        ErrorMessage({
          msg: strings.choosecurrentCorrect,
          backgroundColor: RED_COLOR,
        });
        return false;
      } else if (
        moment(moment(date).format(TIME_FORMAT), "hh:mm A").format("HH:mm") <
          moment(moment(minTime).format(TIME_FORMAT), "hh:mm A").format(
            "HH:mm"
          ) ||
        moment(moment(date).format(TIME_FORMAT), "hh:mm A").format("HH:mm") >
          moment(moment(maxTime).format(TIME_FORMAT), "hh:mm A").format("HH:mm")
      ) {
        ErrorMessage({
          msg: strings.choosetimeCorrect,
          backgroundColor: RED_COLOR,
        });
        return false;
      }
    } else {
      // if (
      //   moment(date).format(DATE_FORMAT) >
      //   moment(props.dateValue).format(DATE_FORMAT)
      // ) {
      //   ErrorMessage({
      //     msg: strings.chooseTimeToDateCorrectly,
      //     backgroundColor: RED_COLOR,
      //   });
      //   return false;
      // } else if (
      //   moment(date).format(DATE_FORMAT) ===
      //     moment(props.dateValue).format(DATE_FORMAT) &&
      //   moment(moment(date).format(TIME_FORMAT), "hh:mm A").format("HH:mm") <=
      //     moment(moment(currentTime).format(TIME_FORMAT), "hh:mm A").format(
      //       "HH:mm"
      //     )
      // ) {
      //   ErrorMessage({
      //     msg: strings.choosecurrentCorrect,
      //     backgroundColor: RED_COLOR,
      //   });
      //   return false;
      // } else if (
      //   moment(moment(date).format(TIME_FORMAT), "hh:mm A").format("HH:mm") <
      //     moment(moment(minTime).format(TIME_FORMAT), "hh:mm A").format(
      //       "HH:mm"
      //     ) ||
      //   moment(moment(date).format(TIME_FORMAT), "hh:mm A").format("HH:mm") >
      //     moment(moment(maxTime).format(TIME_FORMAT), "hh:mm A").format("HH:mm")
      // ) {
      //   ErrorMessage({
      //     msg: strings.choosetimeCorrect,
      //     backgroundColor: RED_COLOR,
      //   });
      //   return false;
      // }
    }
    return true;
  };

  const OpenCalender = () => {
    setOpen(true);
  };
  return (
    <Pressable onPress={() => setOpen(true)}>
      <View style={styles.inputHeadinView}>
        <Text style={styles.inputHeadingText}>{props.headingText}</Text>
        {props.require ? <RequiredStart /> : null}
      </View>
      <View style={styles.mainContainer}>
        <TextInput
          style={[
            styles.input,
            {
              width: inputWidth,
              height: normalizeHeight(inputheight),
              textAlignVertical: "top",
              color: BLACK_COLOR,
              fontSize: 13,
            },
          ]}
          onChangeText={(val) => props.onChangeText(val)}
          onSubmitEditing={onSubmit}
          placeholder={
            props.placeholderText === strings.dateOfBirth
              ? ""
              : props.placeholderText
          }
          placeholderTextColor={BLACK_COLOR}
          secureTextEntry={props.isSecureText}
          autoCapitalize={"none"}
          editable={editable}
          multiline={multiline}
          value={props?.value}
        />
        <TouchableOpacity
          onPress={() => OpenCalender()}
          //disabled={!props.handleInputBtnPress}
        >
          <Image style={styles.rightImage} source={props.leftIcon} />
        </TouchableOpacity>
      </View>
      {props.mode == "date" ? (
        <DatePicker
          modal={true}
          mode={"date"}
          minimumDate={props?.minimumDate ? props?.minimumDate : null}
          maximumDate={
            props.headingText === strings.dateOfBirth ||
            props.placeholderText === strings.dateOfBirth
              ? new Date(moment(minDate).format())
              : props.maximumDate
              ? props.maximumDate
              : null
          }
          open={open}
          date={
            props.headingText === strings.dateOfBirth ||
            props.placeholderText === strings.dateOfBirth
              ? new Date(moment(minDate).format())
              : new Date()
          }
          onDateChange={(date) => {
            props.setDateshow(date);
          }}
          onConfirm={(date) => onConfirmDate(date)}
          onCancel={() => {
            setOpen(false);
          }}
        />
      ) : (
        <DatePicker
          modal={true}
          mode={"time"}
          open={open}
          minimumDate={props?.minimumDate ? props?.minimumDate : null}
          date={new Date()}
          onDateChange={(date) => {
            setOpen(false);
            if (timeSelectValidation(date)) {
              props.setDateshow(moment(date).format(TIME_FORMAT));
            } else {
              props.setDateshow("");
            }
          }}
          onConfirm={(date) => {
            setOpen(false);
            if (timeSelectValidation(date)) {
              props.setDateshow(moment(date).format(TIME_FORMAT));
            } else {
              props.setDateshow("");
            }
          }}
          onCancel={() => {
            setOpen(false);
          }}
        />
      )}
    </Pressable>
  );
};

export default InputCalender;
