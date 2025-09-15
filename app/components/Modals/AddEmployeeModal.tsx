import React from "react";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import Modal from "react-native-modal";
import { RadioButton } from "react-native-paper";
import images from "../../assets/images";
import Button from "../Button";
import InputField from "../InputField";
import { normalizeSpacing } from "../scaleFontSize";
import { RequiredStart } from "../utilities/GlobalFuncations";
import strings from "../utilities/Localization";
import {
  BLACK_COLOR,
  Isios,
  PRIMARY_THEME_COLOR,
  validateEmail,
} from "../utilities/constant";
import styles from "./styles";

const AddEmployeeModal = (props: any) => {
  return (
    <Modal isVisible={props.Visible}>
      <ScrollView
        keyboardShouldPersistTaps={"handled"}
        automaticallyAdjustKeyboardInsets={Isios ? true : false}
        contentContainerStyle={{ flexGrow: 1, justifyContent: "center" }}
      >
        <View style={styles.mainContainer}>
          <View style={styles.topContainer}>
            <Text style={styles.topTxt}>{strings.addNewEmpoyee}</Text>
            <View>
              <TouchableOpacity
                onPress={() => props.handleOnBackEmployeeModal()}
              >
                <Image source={images.close} style={styles.closeIcon} />
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.borderView} />
          <View style={{ marginHorizontal: 10 }}>
            <View style={[styles.inputWrap, { top: normalizeSpacing(8) }]}>
              <InputField
                require={true}
                disableSpecialCharacters={true}
                placeholderText={strings.empName}
                headingText={strings.empName}
                onChangeText={(val: any) => {
                  props.setEmployeeFormData({
                    ...props?.employeeFormData,
                    employeeName: val,
                  });
                }}
                valueshow={props?.employeeFormData?.employeeName}
              />
            </View>
            <View style={[styles.inputWrap, { top: normalizeSpacing(10) }]}>
              <InputField
                require={true}
                disableSpecialCharacters={true}
                headingText={strings.empMobile}
                placeholderText={strings.empMobile}
                maxLength={10}
                keyboardtype={"number-pad"}
                valueshow={props?.employeeFormData?.employeeMobile}
                onChangeText={(data: any) => {
                  props.employeeMobileNoSet(data);
                  // props.setEmployeeFormData({
                  //   ...props?.employeeFormData,
                  //   employeeMobile: data,
                  // });
                }}
                rightImgSrc={
                  props?.emailMobvalidation?.primary_mobile === "employeeMobile"
                    ? images.check
                    : images.close
                }
                rightImageVw={
                  props?.emailMobvalidation?.primary_mobile === "employeeMobile"
                    ? styles.tickImgVw
                    : {}
                }
                rightImageSty={styles.tickImg}
              />
            </View>
            {/* <View style={[styles.inputWrap, { top: normalizeSpacing(10) }]}>
              <InputField
                require={true}
                headingText={strings.empEmail}
                placeholderText={strings.empEmail}
                valueshow={props?.employeeFormData?.employeeEmail}
                onChangeText={(data: any) => {
                  props.setEmployeeFormData({
                    ...props?.employeeFormData,
                    employeeEmail: data,
                  });
                }}
              />
            </View> */}
            <View style={[styles.inputWrap, { top: normalizeSpacing(10) }]}>
              <InputField
                require={true}
                placeholderText={strings.empEmail}
                handleInputBtnPress={() => {}}
                headingText={strings.empEmail}
                valueshow={props.employeeFormData?.employeeEmail}
                // editable={props.emailMobileChng?.change}
                onChangeText={(val: any) => {
                  props.employeeEmailAddSet(val);
                  // props.setEmployeeFormData({
                  //   ...props?.employeeFormData,
                  //   employeeEmail: val,
                  // });
                  // if (validateEmail.test(props.employeeFormData?.employeeEmail)) {
                  //   props.handleCheckEmailMobileforEmployee()
                  // } else {
                  //   props.setEmailMobValidation({
                  //     ...props?.emailMobvalidation,
                  //     email: null
                  //   })
                  // }
                }}
                onFocus={() => {}}
                rightImgSrc={
                  props?.emailMobvalidation?.email === "employeeEmail"
                    ? images.check
                    : images.close
                }
                rightImageVw={
                  props?.emailMobvalidation?.email === "employeeEmail"
                    ? styles.tickImgVw
                    : {}
                }
                rightImageSty={styles.tickImg}
                onBlur={(val: any) => {
                  if (
                    validateEmail.test(props.employeeFormData?.employeeEmail)
                  ) {
                    props.handleCheckEmailMobileforEmployee();
                  }
                }}
              />

              <View style={[styles.inputWrap, { top: normalizeSpacing(10) }]}>
                <InputField
                  // require={true}
                  disableSpecialCharacters={true}
                  headingText={strings.rerano}
                  placeholderText={strings.rerano}
                  maxLength={17}
                  autoCapitalize="words"
                  valueshow={props?.employeeFormData?.empolyeeReraNo}
                  onChangeText={(data: any) => {
                    props.employeeReraNoSet(data);
                  }}
                  rightImgSrc={
                    props?.emailMobvalidation?.employee_rera_number ===
                    "empolyeeReraNo"
                      ? images.check
                      : images.close
                  }
                  rightImageVw={
                    props?.emailMobvalidation?.employee_rera_number ===
                    "empolyeeReraNo"
                      ? styles.tickImgVw
                      : {}
                  }
                  rightImageSty={styles.tickImg}
                />
              </View>
            </View>

            <View style={styles.genderView}>
              <Text style={styles.genderTxt}>{strings.gender}</Text>
              <RequiredStart />
              <View style={styles.radioView}>
                <RadioButton.Android
                  value={props.employeeFormData?.employeeGender}
                  status={
                    props.employeeFormData.employeeGender === 1
                      ? "checked"
                      : "unchecked"
                  }
                  onPress={() => {
                    props.setEmployeeFormData({
                      ...props.employeeFormData,
                      employeeGender: 1,
                    });
                    //  props.handleCheckEmailMobileforEmployee();
                  }}
                  color={PRIMARY_THEME_COLOR}
                />
                <Text
                  style={[
                    styles.radioTxt,
                    {
                      color:
                        props.employeeFormData.employeeGender === 1
                          ? PRIMARY_THEME_COLOR
                          : BLACK_COLOR,
                    },
                  ]}
                >
                  {strings.male}
                </Text>
              </View>
              <View style={styles.radioView}>
                <RadioButton.Android
                  value={props.employeeFormData?.employeeGender}
                  status={
                    props.employeeFormData.employeeGender === 2
                      ? "checked"
                      : "unchecked"
                  }
                  onPress={() => {
                    props.setEmployeeFormData({
                      ...props.employeeFormData,
                      employeeGender: 2,
                    });
                  }}
                  color={PRIMARY_THEME_COLOR}
                />
                <Text
                  style={[
                    styles.radioTxt,
                    {
                      color:
                        props.employeeFormData.employeeGender === 2
                          ? PRIMARY_THEME_COLOR
                          : BLACK_COLOR,
                    },
                  ]}
                >
                  {strings.female}
                </Text>
              </View>
            </View>
          </View>
          <View style={{ marginVertical: 20 }}>
            <View style={{ flexDirection: "row", justifyContent: "center" }}>
              <Button
                width={235}
                buttonText={strings.addNewEmpoyee}
                handleBtnPress={() => props.handleAddEmployee()}
              />
            </View>
          </View>
        </View>
      </ScrollView>
    </Modal>
  );
};

export default AddEmployeeModal;
