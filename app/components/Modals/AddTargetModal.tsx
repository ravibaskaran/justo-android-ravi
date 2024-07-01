import { View, Text, Image, TouchableOpacity, ScrollView } from "react-native";
import React, { useState } from "react";
import Modal from "react-native-modal";
import { Dropdown } from "react-native-element-dropdown";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import { DATE_FORMAT, Isios, ROLE_IDS } from "app/components/utilities/constant";
import DropdownInput from "app/components/DropDown";
import { normalizeSpacing } from "app/components/scaleFontSize";
import images from "app/assets/images";
import { getFilterProperty } from "app/Redux/Actions/propertyActions";
import InputField from "../InputField";
import strings from "../utilities/Localization";
import styles from "./styles";
import Button from "../Button";
import InputCalender from "../InputCalender";

const AddTargetModal = (props: any) => {
  const dispatch: any = useDispatch();
  const { userData = {} } = useSelector((state: any) => state.userData);
  const data = [
    { label: strings.january, value: "01" },
    { label: strings.february, value: "02" },
    { label: strings.march, value: "03" },
    { label: strings.april, value: "04" },
    { label: strings.may, value: "05" },
    { label: strings.june, value: "06" },
    { label: strings.july, value: "07" },
    { label: strings.august, value: "08" },
    { label: strings.september, value: "09" },
    { label: strings.october, value: "10" },
    { label: strings.november, value: "11" },
    { label: strings.december, value: "12" },
  ];
  const renderItem = (item: any) => {
    return (
      <View style={styles.item}>
        <Text style={styles.textItem}>{item.label}</Text>
      </View>
    );
  };

  const handleAddTargetPress = () => {
    props.setIsVisible(false);
  };

  return (
    <Modal isVisible={props.Visible}>
      <ScrollView
        keyboardShouldPersistTaps={"handled"}
        automaticallyAdjustKeyboardInsets={Isios ? true : false}
        contentContainerStyle={{ flexGrow: 1, justifyContent: "center" }}
      >
        <View style={styles.mainContainer}>
          <View style={styles.topContainer}>
            <Text style={styles.topTxt}>{strings.target}</Text>
            <View>
              <TouchableOpacity onPress={() => props.setIsVisible(false)}>
                <Image source={images.close} style={styles.closeIcon} />
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.borderView} />
          <View style={{ marginHorizontal: 10 }}>
            <View style={styles.inputWrap}>
              <DropdownInput
                data={data}
                maxHeight={300}
                labelField="label"
                valueField="value"
                headingText={strings.selectMonth}
                placeholder={strings.selectMonth}
                value={props?.targetForm?.month}
                paddingLeft={16}
                onChange={(item: any) => {
                  props.setTargetForm({
                    ...props?.targetForm,
                    month: item?.value,
                  });
                }}
                newRenderItem={renderItem}
              />
            </View>
            {props.type === "single" ? (
              props.roleIdForSelectedUser === ROLE_IDS.sourcingtl_id ||
                props.roleIdForSelectedUser === ROLE_IDS.sourcingmanager_id ? (
                <>
                  <View
                    style={[styles.inputWrap, { top: normalizeSpacing(8) }]}
                  >
                    <InputField
                      disableSpecialCharacters={true}
                      placeholderText={strings.visitTarget}
                      headingText={strings.visitTarget}
                      keyboardtype={"number-pad"}
                      maxLength={4}
                      onChangeText={(val: any) => {
                        props.setTargetForm({
                          ...props?.targetForm,
                          visit_target: val,
                        });
                      }}
                      valueshow={props?.targetForm?.visit_target}
                    />
                  </View>
                  <View
                    style={[styles.inputWrap, { top: normalizeSpacing(10) }]}
                  >
                    <InputField
                      disableSpecialCharacters={true}
                      headingText={strings.siteVisitTarget}
                      placeholderText={strings.siteVisitTarget}
                      keyboardtype={"number-pad"}
                      maxLength={4}
                      valueshow={props?.targetForm?.site_visit_target}
                      onChangeText={(data: any) => {
                        props.setTargetForm({
                          ...props?.targetForm,
                          site_visit_target: data,
                        });
                      }}
                    />
                  </View>
                </>
              ) : props.roleIdForSelectedUser === ROLE_IDS.closingtl_id ||
                props.roleIdForSelectedUser === ROLE_IDS.closingmanager_id ? (
                <>
                  <View
                    style={[styles.inputWrap, { top: normalizeSpacing(10) }]}
                  >
                    <InputField
                      disableSpecialCharacters={true}
                      headingText={strings.closeTarget}
                      placeholderText={strings.closeTarget}
                      keyboardtype={"number-pad"}
                      maxLength={4}
                      // inputType={"location"}
                      valueshow={props?.targetForm?.closing_target}
                      onChangeText={(data: any) => {
                        props.setTargetForm({
                          ...props?.targetForm,
                          closing_target: data,
                        });
                      }}
                    // onPressSelect={(data: any, detail: any) => {
                    //   props.setTargetForm({
                    //     ...props?.targetForm,
                    //     closing_target: data?.description,
                    //   });
                    // }}
                    />
                  </View>
                  <View
                    style={[styles.inputWrap, { top: normalizeSpacing(10) }]}
                  >
                    <InputField
                      disableSpecialCharacters={true}
                      headingText={strings.bookingTarget}
                      maxLength={4}
                      keyboardtype={"number-pad"}
                      placeholderText={strings.bookingTarget}
                      valueshow={props?.targetForm?.booking_target}
                      onChangeText={(data: any) => {
                        props.setTargetForm({
                          ...props?.targetForm,
                          booking_target: data,
                        });
                      }}
                    />
                  </View>
                </>
              ) : props.roleIdForSelectedUser === ROLE_IDS.postsales_id ||
                props.roleIdForSelectedUser === ROLE_IDS.receptionist_id ? (
                <>
                  <View
                    style={[styles.inputWrap, { top: normalizeSpacing(10) }]}
                  >
                    <InputField
                      disableSpecialCharacters={true}
                      headingText={strings.bookingTarget}
                      maxLength={4}
                      keyboardtype={"number-pad"}
                      placeholderText={strings.bookingTarget}
                      valueshow={props?.targetForm?.booking_target}
                      onChangeText={(data: any) => {
                        props.setTargetForm({
                          ...props?.targetForm,
                          booking_target: data,
                        });
                      }}
                    />
                  </View>
                  <View
                    style={[styles.inputWrap, { top: normalizeSpacing(10) }]}
                  >
                    <InputField
                      disableSpecialCharacters={true}
                      headingText={strings.registrationTarget}
                      maxLength={4}
                      keyboardtype={"number-pad"}
                      placeholderText={strings.registrationTarget}
                      valueshow={props?.targetForm?.registration_target}
                      onChangeText={(data: any) => {
                        props.setTargetForm({
                          ...props?.targetForm,
                          registration_target: data,
                        });
                      }}
                    />
                  </View>
                </>
              ) : (
                <></>
              )
            ) : userData?.data?.role_id === ROLE_IDS.sourcingtl_id ||
              userData?.data?.role_id === ROLE_IDS.sourcingmanager_id ? (
              <>
                <View style={[styles.inputWrap, { top: normalizeSpacing(8) }]}>
                  <InputField
                    disableSpecialCharacters={true}
                    placeholderText={strings.visitTarget}
                    headingText={strings.visitTarget}
                    maxLength={4}
                    keyboardtype={"number-pad"}
                    onChangeText={(val: any) => {
                      props.setTargetForm({
                        ...props?.targetForm,
                        visit_target: val,
                      });
                    }}
                    valueshow={props?.targetForm?.visit_target}
                  />
                </View>
                <View style={[styles.inputWrap, { top: normalizeSpacing(10) }]}>
                  <InputField
                    disableSpecialCharacters={true}
                    headingText={strings.siteVisitTarget}
                    placeholderText={strings.siteVisitTarget}
                    maxLength={4}
                    keyboardtype={"number-pad"}
                    valueshow={props?.targetForm?.site_visit_target}
                    onChangeText={(data: any) => {
                      props.setTargetForm({
                        ...props?.targetForm,
                        site_visit_target: data,
                      });
                    }}
                  />
                </View>
              </>
            ) : (
              <>
                <View style={[styles.inputWrap, { top: normalizeSpacing(10) }]}>
                  <InputField
                    disableSpecialCharacters={true}
                    headingText={strings.closeTarget}
                    maxLength={4}
                    keyboardtype={"number-pad"}
                    placeholderText={strings.closeTarget}
                    // inputType={"location"}
                    valueshow={props?.targetForm?.closing_target}
                    onChangeText={(data: any) => {
                      props.setTargetForm({
                        ...props?.targetForm,
                        closing_target: data,
                      });
                    }}
                  // onPressSelect={(data: any, detail: any) => {
                  //   props.setTargetForm({
                  //     ...props?.targetForm,
                  //     closing_target: data?.description,
                  //   });
                  // }}
                  />
                </View>
                <View style={[styles.inputWrap, { top: normalizeSpacing(10) }]}>
                  <InputField
                    disableSpecialCharacters={true}
                    headingText={strings.bookingTarget}
                    maxLength={4}
                    keyboardtype={"number-pad"}
                    placeholderText={strings.bookingTarget}
                    valueshow={props?.targetForm?.booking_target}
                    onChangeText={(data: any) => {
                      props.setTargetForm({
                        ...props?.targetForm,
                        booking_target: data,
                      });
                    }}
                  />
                </View>
              </>
            )}
          </View>
          <View style={{ marginVertical: 20 }}>
            <View style={{ flexDirection: "row", justifyContent: "center" }}>
              <Button
                width={135}
                buttonText={strings.addTaget}
                handleBtnPress={() => props.handleAddTarget()}
              />
            </View>
          </View>
        </View>
      </ScrollView>
    </Modal>
  );
};

export default AddTargetModal;
