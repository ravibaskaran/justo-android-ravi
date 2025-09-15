// CloseModal.js
import React, { useEffect } from "react";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import Modal from "react-native-modal";
import images from "../../../assets/images";
import Button from "../../../components/Button";
import InputField from "../../../components/InputField";
import styles from "../../../components/Modals/styles";
import strings from "../../../components/utilities/Localization";

const CloseModal = ({
  visible,
  onClose,
  params,
  setParams,
  onConfirm,
}: any) => {
  useEffect(() => {
    setParams({ ...params, remark: "" });
  }, [visible]);
  return (
    <Modal isVisible={visible} onBackdropPress={onClose}>
      <ScrollView
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{
          flexGrow: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <View style={styles.mainContainer}>
          <View style={styles.topContainer}>
            <Text style={styles.topTxt}>{strings.updateStatus}</Text>
            <TouchableOpacity onPress={onClose}>
              <Image source={images.close} style={styles.closeIcon} />
            </TouchableOpacity>
          </View>
          <View style={styles.borderView} />

          <View style={{ marginHorizontal: 16 }}>
            <View style={styles.inputWrap}>
              <InputField
                placeholderText={strings.comment}
                headingText={strings.comment}
                multiline
                inputheight={80}
                valueshow={params.remark}
                onChangeText={(val: any) =>
                  setParams({ ...params, remark: val })
                }
              />
            </View>

            <View style={{ marginVertical: 20 }}>
              <Button handleBtnPress={onConfirm} buttonText={strings.update} />
            </View>
          </View>
        </View>
      </ScrollView>
    </Modal>
  );
};

export default CloseModal;
