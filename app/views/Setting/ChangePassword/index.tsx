import { View, Text, Keyboard } from "react-native";
import React, { useEffect, useState } from "react";
import ChangePasswordView from "./components/ChangePasswordView";
import strings from "app/components/utilities/Localization";
import ErrorMessage from "app/components/ErrorMessage";
import { GREEN_COLOR, RED_COLOR } from "app/components/utilities/constant";
import { changePassword, userLogout } from "app/Redux/Actions/AuthActions";
import { useDispatch, useSelector } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { CHANGEPASSWORD_NULL } from "app/Redux/types";

const ChangePasswordScreen = ({ navigation, route }: any) => {
  const dispatch: any = useDispatch();
  const [passwordData, setPasswordData] = useState({
    oldPassword: "",
    password: "",
    conPassword: "",
  });
  const [isVisibleOldPassword, setIsVisibleOldPassword] = useState(true);
  const [isVisibleNewPassword, setIsVisibleNewPassword] = useState(true);
  const [isVisibleCnfmPassword, setIsVisibleCnfmPassword] = useState(true);

  const [email, setEmail] = useState("");
  const { response = {}, changepassword = false } = useSelector(
    (state: any) => state.changePasswordResponse
  );

  useEffect(() => {
    if (changepassword === true) {
      if (response.status === 200) {
        ErrorMessage({
          msg: response.message,
          backgroundColor: GREEN_COLOR,
        });
        dispatch(userLogout());
        navigation.navigate("AuthLoading");
        dispatch({
          type: CHANGEPASSWORD_NULL,
          payload: {},
        });
      } else {
        ErrorMessage({
          msg: response.message,
          backgroundColor: RED_COLOR,
        });
      }
    }
  }, [response]);

  const handleOldPasswordBtnPress = () => {
    Keyboard.dismiss();
    setIsVisibleOldPassword(!isVisibleOldPassword);
  };
  const handleNewPasswordBtnPress = () => {
    Keyboard.dismiss();
    setIsVisibleNewPassword(!isVisibleNewPassword);
  };
  const handlecnfmPasswordBtnPress = () => {
    Keyboard.dismiss();
    setIsVisibleCnfmPassword(!isVisibleCnfmPassword);
  };

  const handleBackPress = () => {
    navigation.goBack();
  };
  const validation = () => {
    let isError = true;
    let errorMessage: any = "";

    if (passwordData?.password !== passwordData?.conPassword) {
      isError = false;
      errorMessage = strings.passwordnotmatch;
    }

    if (
      passwordData?.password == undefined ||
      passwordData?.password == "" ||
      passwordData?.conPassword == undefined ||
      passwordData?.conPassword == "" ||
      passwordData?.oldPassword == undefined ||
      passwordData?.oldPassword == ""
    ) {
      isError = false;
      errorMessage = strings.requiredField;
    }
    if (errorMessage !== "") {
      ErrorMessage({
        msg: errorMessage,
        backgroundColor: RED_COLOR,
      });
    }
    return isError;
  };

  const handleChangePress = () => {
    Keyboard.dismiss();
    if (validation()) {
      const params = {
        old_password: passwordData.oldPassword,
        new_password: passwordData.password,
      };
      dispatch(changePassword(params));
    }
  };

  const handleForgetPress = () => {
    dispatch(userLogout());
    navigation.navigate("AuthLoading");
  };

  return (
    <ChangePasswordView
      data={route.params}
      handleChangePress={handleChangePress}
      passwordData={passwordData}
      setPasswordData={setPasswordData}
      handleBackPress={handleBackPress}
      handleOldPasswordBtnPress={handleOldPasswordBtnPress}
      isVisibleOldPassword={isVisibleOldPassword}
      handleNewPasswordBtnPress={handleNewPasswordBtnPress}
      isVisibleNewPassword={isVisibleNewPassword}
      handlecnfmPasswordBtnPress={handlecnfmPasswordBtnPress}
      isVisibleCnfmPassword={isVisibleCnfmPassword}
      handleForgetPress={handleForgetPress}
    />
  );
};

export default ChangePasswordScreen;
