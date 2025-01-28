import { View, Text, ScrollView } from "react-native";
import React from "react";
import images from "../../../../assets/images";
import {
  Isios,
  PRIMARY_THEME_COLOR,
  WHITE_COLOR,
} from "../../../../components/utilities/constant";
import strings from "../../../../components/utilities/Localization";
import styles from "./styles";
import Header from "../../../../components/Header";
import InputField from "../../../../components/InputField";
import Button from "../../../../components/Button";

const ChangePasswordView = (props: any) => {
  const {
    data,
    passwordData,
    setPasswordData,
    handleChangePress,
    handleOldPasswordBtnPress,
    handleNewPasswordBtnPress,
    handlecnfmPasswordBtnPress,
    isVisibleOldPassword,
    isVisibleNewPassword,
    isVisibleCnfmPassword,
    handleForgetPress,
  } = props;
  return (
    <View style={styles.mainContainer}>
      <Header
        leftImageSrc={data?.hideIcons ? false : images.backArrow}
        rightSecondImageScr={data?.hideIcons ? false : images.notification}
        headerText={data.heading}
        headerStyle={styles.headerStyle}
        RightFirstIconStyle={styles.leftImageIconStyle}
        leftImageIconStyle={styles.leftImageIconStyle}
        handleOnLeftIconPress={props.handleBackPress}
        barStyle={"light-content"}
        statusBarColor={PRIMARY_THEME_COLOR}
      />
      <ScrollView
        keyboardShouldPersistTaps={"handled"}
        contentContainerStyle={{
          flex: 1,
        }}
        automaticallyAdjustKeyboardInsets={Isios ? true : false}
      >
        <View style={styles.wrap}>
          <View style={styles.inputWrap}>
            <InputField
              placeholderText={"Old Password"}
              onChangeText={(e: any) =>
                setPasswordData({
                  ...passwordData,
                  oldPassword: e,
                })
              }
              headingText={"Old Password"}
              rightImgSrc={
                isVisibleOldPassword
                  ? images.hiddenPassword
                  : images.showPassword
              }
              handleInputBtnPress={handleOldPasswordBtnPress}
              isSecureText={isVisibleOldPassword}
            />
          </View>
          <View style={styles.inputWrap}>
            <InputField
              placeholderText={"New Password"}
              onChangeText={(e: any) =>
                setPasswordData({
                  ...passwordData,
                  password: e,
                })
              }
              headingText={"New Password"}
              rightImgSrc={
                isVisibleNewPassword
                  ? images.hiddenPassword
                  : images.showPassword
              }
              handleInputBtnPress={handleNewPasswordBtnPress}
              isSecureText={isVisibleNewPassword}
            />
          </View>
          <View style={styles.inputWrap}>
            <InputField
              placeholderText={"Confirm New Password"}
              onChangeText={(e: any) =>
                setPasswordData({
                  ...passwordData,
                  conPassword: e,
                })
              }
              headingText={"Confirm New Password"}
              rightImgSrc={
                isVisibleCnfmPassword
                  ? images.hiddenPassword
                  : images.showPassword
              }
              handleInputBtnPress={handlecnfmPasswordBtnPress}
              isSecureText={isVisibleCnfmPassword}
            />
          </View>
          {data?.hideIcons && (
            <Text onPress={handleForgetPress} style={styles.forgotText}>
              {strings.forgotPassword}
            </Text>
          )}

          <View style={styles.btnView}>
            <Button
              handleBtnPress={handleChangePress}
              width={300}
              btnTxtsize={15}
              buttonText={strings.changePassword}
              textTransform={"uppercase"}
            />
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default ChangePasswordView;
