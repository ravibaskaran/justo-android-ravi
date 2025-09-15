import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useState } from 'react';
import { Platform } from 'react-native';
import { useDispatch } from 'react-redux';
import ErrorMessage from '../../../components/ErrorMessage';
import { RED_COLOR, Regexs } from '../../../components/utilities/constant';
import strings from '../../../components/utilities/Localization';
import { userLogin } from '../../../Redux/Actions/AuthActions';
import LoginView from './components/LoginView';

const LoginScreen = ({ navigation }: any) => {
  // const [validEmail, setIsValidEmail] = useState(false);
  // const toast: any = useToast();
  // const [loginData, setLoginData] = useState({
  //   email: '',
  //   pass: '',
  // })
  // const handleEmailChange = (val: any) => {

  //   if (val.length <= 0) {
  //     setIsValidEmail(false);
  //   } else if (validateEmail.test(val) === false) {
  //     setIsValidEmail(false);
  //   } else {
  //     setIsValidEmail(true);
  //   }
  // };
  // const handlePasswordChange = (val: any) => {
  // };
  // const handleLoginPress = async () => {
  //   if (!loginData.email || !loginData.pass) {
  //     toast.show("Email and Password required.", {
  //       type: "danger",
  //       placement: "bottom",
  //       offset: 100,
  //       duration: 4000,
  //       animationType: "slide-in",
  //     });
  //     return;
  //   }
  //   // navigation.navigate('DashboardScreenView');
  //   const finalData = users.find((el: any) => {
  //     return el.email == loginData.email && el.password == loginData.pass
  //   })
  //   if(finalData){
  //     await AsyncStorage.setItem('userData', JSON.stringify(finalData))
  //     navigation.replace('DashboardScreenView');
  //   }else{
  //     toast.show("Email or Password are not valid.", {
  //       type: "danger",
  //       placement: "bottom",
  //       offset: 100,
  //       duration: 4000,
  //       animationType: "slide-in",
  //     });
  //   }
  // };

  const dispatch: any = useDispatch()
  const [validEmail, setIsValidEmail] = useState(false);
  const [loginData, setLoginData] = useState({
    email: '',
    password: '',
    login_type: 1
  })
  const validation = () => {
    let isError = true;
    let errorMessage: any = ''
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
    if (loginData.password == undefined || loginData.password == '' && loginData.email == undefined || loginData.email == '') {
      isError = false;
      errorMessage = strings.usernamepasswordempty
    }
    else if ( Regexs.emailOrPhone.test(loginData.email) === false) {
      isError = false;
      errorMessage = strings.correctemail
    }
    else if (loginData.email == undefined || loginData.email == '') {
      isError = false;
      errorMessage = strings.usernamerequired
    }
    else if (loginData.password == undefined || loginData.password == '') {
      isError = false;
      errorMessage = strings.passwordrequired
    }

    if (errorMessage !== '') {
      ErrorMessage({
        msg: errorMessage,
        backgroundColor: RED_COLOR
      })
    }
    return isError;
  }
  const handleLoginPress = async () => {
    const localFCM = await AsyncStorage.getItem('fcm');
    if (validation()) {
      const respon = dispatch(userLogin({...loginData, device_id: localFCM, device_type: Platform.OS}))
    }
  };
  const handleSingupPress = () => {
    navigation.navigate('RegistrationScreenView');
  };
  const handleForgotPress = () => {
    navigation.navigate('ForgotPassword');
  };
  return (
    <>
      <LoginView
        // handleEmailChange={handleEmailChange}
        // handlePasswordChange={handlePasswordChange}
        validEmail={validEmail}
        handleLoginPress={handleLoginPress}
        handleSingupPress={handleSingupPress}
        setLoginData={setLoginData}
        loginData={loginData}
        handleForgotPress={handleForgotPress}
      />
    </>
  );
};

export default LoginScreen;
