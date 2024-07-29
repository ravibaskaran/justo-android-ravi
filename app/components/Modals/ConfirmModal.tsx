import { View, Text, Image, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import Modal from "react-native-modal";
import styles from "./styles";
import images from "../../assets/images";
import strings from "../../components/utilities/Localization";
import { Dropdown } from "react-native-element-dropdown";
import Button from "../Button";
const data = [
  { label: "Item 1", value: "1" },
  { label: "Item 2", value: "2" },
  { label: "Item 3", value: "3" },
  { label: "Item 4", value: "4" },
  { label: "Item 5", value: "5" },
  { label: "Item 6", value: "6" },
  { label: "Item 7", value: "7" },
  { label: "Item 8", value: "8" },
];
const ConfirmModal = (props: any) => {
  const [value, setValue] = useState(null);

  const renderItem = (item: any) => {
    return (
      <View style={styles.item}>
        <Text style={styles.textItem}>{item.label}</Text>
      </View>
    );
  };
  return (
    <View>
      <Modal isVisible={props.Visible}>
        <View style={styles.mainContainer}>
          <View style={styles.topContainer}>
            <View />
            <Text style={styles.topTxt}>
              {props.stringshow ? props.stringshow : strings.confirmation}
            </Text>
            <View>
              <TouchableOpacity
                onPress={() => {
                  props.setIsVisible(false);
                  props.setStatusChange ? props.setStatusChange({}) : null;
                }}
              >
                <Image source={images.close} style={styles.closeIcon} />
              </TouchableOpacity>
            </View>
          </View>

          {props.confirmtype === "CONFIRMATION" ? (
            <>
              <View style={styles.borderView} />
              <View style={styles.conteconfirm}>
                <View style={styles.MiddleContainer}>
                  <Text style={styles.bottomTxt}>{props.textshow}</Text>
                </View>
                <View
                  style={{
                    marginVertical: 10,
                    flexDirection: "row",
                    justifyContent: "center",
                  }}
                >
                  {!props?.hideNoBtn ? (
                    <View style={styles.btnview}>
                      <Button
                        buttonText={strings.no}
                        width={120}
                        height={40}
                        handleBtnPress={() => {
                          props.setIsVisible(false);
                          props.setStatusChange
                            ? props.setStatusChange({})
                            : null;
                        }}
                      />
                    </View>
                  ) : null}

                  <View style={styles.btnview}>
                    <Button
                      buttonText={
                        props?.yesBtnTitle ? props?.yesBtnTitle : strings.yes
                      }
                      width={120}
                      height={40}
                      handleBtnPress={() => {
                        props?.handleYesResponse
                          ? props.handleYesResponse()
                          : null;
                        props.setIsVisible(false);
                      }}
                    />
                  </View>
                </View>
              </View>
            </>
          ) : (
            <>
              <View style={styles.borderView} />
              <View style={styles.MiddleContainer}>
                <Text style={styles.bottomTxt}>
                  {props.middleTxt
                    ? props.middleTxt
                    : strings.ConfirmationModalTxt}
                </Text>
              </View>
              <View>
                <Dropdown
                  style={styles.dropdown}
                  placeholderStyle={styles.placeholderStyle}
                  selectedTextStyle={styles.selectedTextStyle}
                  iconStyle={styles.iconStyle}
                  data={data}
                  maxHeight={300}
                  labelField="label"
                  valueField="value"
                  placeholder={
                    props.placeholder ? props.placeholder : strings.selectReason
                  }
                  value={value}
                  onChange={(item: any) => {
                    setValue(item.value);
                  }}
                  renderItem={renderItem}
                />
              </View>
              <View style={{ marginVertical: 10 }}>
                <Button
                  handleBtnPress={() => props.setIsVisible(false)}
                  buttonText={
                    props.doneBttnTxt ? props.doneBttnTxt : strings.Confirm
                  }
                />
              </View>
            </>
          )}
        </View>
      </Modal>
    </View>
  );
};

export default ConfirmModal;
