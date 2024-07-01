import { View, Text, Image, TouchableOpacity, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import Modal from "react-native-modal";
import styles from "../../../../components/Modals/styles";
import images from "../../../../assets/images";
import strings from "../../../../components/utilities/Localization";
import Button from "../../../../components/Button";
import InputField from "../../../../components/InputField";
import DropdownInput from "../../../../components/DropDown";
import InputCalender from "app/components/InputCalender";
import moment from "moment";
import {
  DATE_FORMAT,
  GRAY_LIGHT_COLOR,
} from "app/components/utilities/constant";

const AppointmentModal = (props: any) => {
  useEffect(() => {
    props.setParams({
      ...props.params,
      remark: '',
    });
  }, [])
  return (
    <View>
      <Modal isVisible={props.Visible}>
        <ScrollView keyboardShouldPersistTaps='handled' contentContainerStyle={{justifyContent: 'center', alignItems: 'center', flex: 1}}>
        <View style={styles.mainContainer}>
          <View style={styles.topContainer}>
            <Text style={styles.topTxt}>{strings.updateStatus}</Text>
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
                placeholderText={"Comment"}
                headingText={"Comment"}
                multiline={true}
                handleInputBtnPress={() => {}}
                inputheight={80}
                valueshow={props.params.remark}
                onChangeText={(val: any) => {
                  props.setParams({
                    ...props.params,
                    remark: val,
                  });
                }}
              />
            </View>
          </View>
          <View style={{ marginVertical: 20 }}>
            <Button
              handleBtnPress={() => props.handleOnPressYesInModal()}
              buttonText={strings.update}
            />
          </View>
        </View>
        </ScrollView>
      </Modal>
    </View>
  );
};

export default AppointmentModal;
