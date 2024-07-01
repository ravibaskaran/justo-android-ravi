import { View, Text, Image, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import Modal from "react-native-modal";
import styles from "./styles";
import images from "../../assets/images";
import strings from "../utilities/Localization";
import Button from "../Button";
import InputField from "../InputField";

const FilterModal = (props: any) => {
  return (
    <View>
      <Modal isVisible={props.Visible}>
        <View style={styles.mainContainer}>
          <View style={styles.topContainer}>
            <Text style={styles.topTxt}>{strings.searchProperty}</Text>
            <View>
              <TouchableOpacity onPress={() => props.setIsVisible(false)}>
                <Image source={images.close} style={styles.closeIcon} />
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.borderView} />
          <View style={{ marginHorizontal: 10 }}>
            <View style={styles.inputWrap}>
              <InputField
                placeholderText={strings.startDate}
                handleInputBtnPress={() => { }}
                onChangeText={() => { }}
              />
            </View>
            <View style={styles.inputWrap}>
              <InputField
                placeholderText={strings.endDate}
                handleInputBtnPress={() => { }}
                onChangeText={() => { }}
              />
            </View>
            <View style={styles.inputWrap}>
              <InputField
                placeholderText={strings.searchBy + " " + strings.name}
                handleInputBtnPress={() => { }}
                onChangeText={() => { }}
              />
            </View>
            <View style={styles.inputWrap}>
              <InputField
                placeholderText={strings.searchBy + " " + strings.location}
                handleInputBtnPress={() => { }}
                onChangeText={() => { }}
              />
            </View>
            <View style={styles.inputWrap}>
              <InputField
                placeholderText={strings.startType}
                handleInputBtnPress={() => { }}
                onChangeText={() => { }}
              />
            </View>
          </View>
          <View style={{ marginVertical: 20 }}>
            <Button buttonText={strings.apply} />
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default FilterModal;
