import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import React, { useState } from "react";
import styles from "./styles";
import Header from "../../../../components/Header";
import images from "../../../../assets/images";
import strings from "../../../../components/utilities/Localization";
import {
  BLACK_COLOR,
  Isios,
  PRIMARY_THEME_COLOR,
  WHITE_COLOR,
} from "../../../../components/utilities/constant";
import InputField from "../../../../components/InputField";
import DropdownInput from "../../../../components/DropDown";
import Button from "../../../../components/Button";
import {
  normalizeWidth,
  normalizeHeight,
  normalize,
} from "../../../../components/scaleFontSize";
import PicturePickerModal from "../../../../components/Modals/PicturePicker";
import Modal from "react-native-modal";
import FastImages from "../../../../components/FastImage";

const AddTicketForm = (props: any) => {
  const [visible, setVisible] = useState(false);
  const [isVisable, setIsVisable] = useState(false);

  return (
    <View style={styles.mainContainer}>
      <Header
        leftImageSrc={images.backArrow}
        rightSecondImageScr={images.notification}
        headerText={
          props.type === strings.edit ? strings.editticket : strings.addticket
        }
        handleOnLeftIconPress={props.handleBackPress}
        headerStyle={styles.headerStyle}
        RightFirstIconStyle={styles.RightFirstIconStyle}
        leftImageIconStyle={styles.RightFirstIconStyle}
        statusBarColor={PRIMARY_THEME_COLOR}
        barStyle={"light-content"}
      />
      <ScrollView
        keyboardShouldPersistTaps={"handled"}
        automaticallyAdjustKeyboardInsets={Isios ? true : false}
        contentContainerStyle={{ flexGrow: 1 }}
      >
        <View style={styles.topItemsVw}>
          <View style={styles.inputWrap}>
            <DropdownInput
              require={true}
              headingText={"Issue"}
              placeholder={"Issue"}
              data={props?.masterData}
              inputWidth={"100%"}
              paddingLeft={16}
              maxHeight={300}
              labelField="title"
              valueField={"_id"}
              value={props?.addTicketData?.reason}
              onChange={(item: any) => {
                props.setAddTicketData({
                  ...props.addTicketData,
                  reason: item._id,
                });
              }}
              newRenderItem={(item: any) => {
                return (
                  <View style={styles.item}>
                    <Text style={styles.textItem}>{item.title}</Text>
                  </View>
                );
              }}
            />
          </View>
          <View style={styles.inputWrap}>
            <InputField
              require={true}
              headingText={"Title"}
              placeholderText={"Description"}
              handleInputBtnPress={() => {}}
              onChangeText={(val: any) => {
                props.setAddTicketData({
                  ...props.addTicketData,
                  title: val,
                });
              }}
              valueshow={props.addTicketData.title}
            />
          </View>
          <View style={styles.inputWrap}>
            <InputField
              require={true}
              headingText={"Description"}
              placeholderText={"Description"}
              handleInputBtnPress={() => {}}
              onChangeText={(val: any) => {
                props.setAddTicketData({
                  ...props.addTicketData,
                  remark: val,
                });
              }}
              multiline={true}
              inputheight={100}
              valueshow={props.addTicketData.remark}
            />
          </View>
          <View style={styles.inputWrap}>
            <View style={styles.attachView}>
              <Text style={styles.attachTxt}>Image</Text>
              <View style={{ alignItems: "center" }}>
                <TouchableOpacity
                  style={styles.attachbtn}
                  onPress={() => {
                    setVisible(true);
                  }}
                >
                  <Text style={{ color: WHITE_COLOR, fontSize: normalize(15) }}>
                    {strings.browse}
                  </Text>
                </TouchableOpacity>
                {props.addTicketData?.image?.uri ? (
                  <Text
                    style={styles.attachTxt1}
                    onPress={() => setIsVisable(true)}
                  >
                    View Image
                  </Text>
                ) : null}
              </View>
            </View>
          </View>
        </View>
        <View>
          <Button
            buttonText={
              props.type === strings.edit
                ? strings.editticket
                : strings.addticket
            }
            handleBtnPress={() => {
              props.onPressAddTicket();
            }}
          />
        </View>
        <PicturePickerModal
          Visible={visible}
          setVisible={setVisible}
          imageData={(data: any) => {
            setVisible(false);
            props.setAddTicketData({
              ...props.addTicketData,
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
              source={{ uri: props.addTicketData?.image?.uri }}
              style={{
                width: "100%",
                height: normalizeHeight(300),
                alignItems: "center",
                justifyContent: "center",
              }}
            />
          </View>
        </Modal>
      </ScrollView>
    </View>
  );
};

export default AddTicketForm;
