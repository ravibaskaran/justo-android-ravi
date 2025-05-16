import FastImages from "app/components/FastImage";
import PicturePickerModal from "app/components/Modals/PicturePicker";
import { normalize, normalizeHeight } from "app/components/scaleFontSize";
import { RequiredStart } from "app/components/utilities/GlobalFuncations";
import React, { useEffect, useState } from "react";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import Modal from "react-native-modal";
import images from "../../../../assets/images";
import Button from "../../../../components/Button";
import InputField from "../../../../components/InputField";
import styles from "../../../../components/Modals/styles";
import strings from "../../../../components/utilities/Localization";

const AppointmentModal = (props: any) => {
  const [visible, setVisible] = useState(false);
  const [isVisable, setIsVisable] = useState(false);

  useEffect(() => {
    props.setParams({
      ...props.params,
      remark: "",
      image: null,
    });
  }, []);

  return (
    <View>
      <Modal isVisible={props.Visible}>
        <ScrollView
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={{
            justifyContent: "center",
            alignItems: "center",
            flex: 1,
          }}
        >
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
              {/* {props.params.appointment_status == 3 && (
                <View style={styles.containerCC}>
                  <Text style={[styles.bottomTxt, { fontSize: normalize(16) }]}>
                    CP visit confirmation <RequiredStart />
                  </Text>
                  <View>
                    <TouchableOpacity
                      style={styles.attachbtn}
                      onPress={() => {
                        setVisible(true);
                      }}
                    >
                      <Text style={styles.imageText}>{"Image"}</Text>
                    </TouchableOpacity>
                    {props.params?.image?.uri ? (
                    <Text
                      style={styles.attachTxt1}
                      onPress={() => setIsVisable(true)}
                    >
                      View Image
                    </Text>
                    ) : null}
                  </View>
                </View>
              )} */}
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
      <PicturePickerModal
        Visible={visible}
        setVisible={setVisible}
        imageData={(data: any) => {
          setVisible(false);
          console.log(data);
          props.setParams({
            ...props.params,
            image: data,
          });
        }}
      />

      <Modal
        isVisible={isVisable}
        onBackdropPress={() => setIsVisable(false)}
        onBackButtonPress={() => setIsVisable(false)}
      >
        <View>
          <FastImages
            source={{ uri: props.params?.image?.uri }}
            style={{
              width: "100%",
              height: normalizeHeight(300),
              alignItems: "center",
              justifyContent: "center",
            }}
          />
        </View>
      </Modal>
    </View>
  );
};

export default AppointmentModal;
