import React from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import Modal from "react-native-modal";
import images from "../../../../assets/images";
import Button from "../../../../components/Button";
import InputField from "../../../../components/InputField";
import styles from "../../../../components/Modals/styles";
import strings from "../../../../components/utilities/Localization";
const FilterModal = (props: any) => {
  return (
    <View>
      <Modal isVisible={props.Visible}>
        <View style={styles.mainContainer}>
          <View style={styles.topContainer}>
            <Text style={styles.topTxt}>{strings.searchappointment}</Text>
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
                placeholderText={strings.status}
                handleInputBtnPress={() => { }}
                onChangeText={() => { }}
              />
            </View>
          </View>
          <View style={{ marginVertical: 20 }}>
            <Button handleBtnPress={() => props.setIsVisible(false)} buttonText={strings.apply} />
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default FilterModal;
