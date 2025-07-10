// CloseModal.js
import React, { useEffect } from "react";
import { View, ScrollView, Text, TouchableOpacity, Image } from "react-native";
import Modal from "react-native-modal";
import Button from "app/components/Button";
import InputField from "app/components/InputField";
import styles from "app/components/Modals/styles";
import strings from "app/components/utilities/Localization";
import images from "app/assets/images";

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
