import CheckBox from '@react-native-community/checkbox';
import React, { useState } from "react";
import { Image, Linking, ScrollView, Text, TouchableOpacity, View } from "react-native";
import images from "../../../../assets/images";
import Button from "../../../../components/Button";
import InputField from "../../../../components/InputField";
import { Isios, PRIMARY_THEME_COLOR } from "../../../../components/utilities/constant";
import strings from "../../../../components/utilities/Localization";
import styles from "./styles";


const LoginView = (props: any) => {
  const [isVisiblePassword, setIsVisiblePassword] = useState(true);
  const handlePasswordBtnPress = () => {
    setIsVisiblePassword(!isVisiblePassword);
  };
  return (
    <ScrollView keyboardShouldPersistTaps={'handled'}
      keyboardDismissMode={Isios? 'on-drag' : 'none'}
      contentContainerStyle={styles.mainContainer}>
      <View style={styles.logoView}>
        <Image style={styles.logoImage} source={images.logoWhiteBG} />
      </View>
      <View style={styles.inputView}>
        <View style={styles.inputWrap}>
          <InputField
            placeholderText={strings.email + " " + strings.address}
            headingText={strings.email + " " + strings.address}
            rightImgSrc={props.validEmail ? images.check : images.emailIcon}
            isSecureText={false}
            onChangeText={(val: any) => {
              props.setLoginData({
                ...props.loginData, email: val
              })
            }}
          />
        </View>
        <View style={styles.inputWrap}>
          <InputField
            placeholderText={"Password"}
            maxLength={20}
            headingText={"Password"}
            rightImgSrc={
              isVisiblePassword ? images.hiddenPassword : images.showPassword
            }
            handleInputBtnPress={handlePasswordBtnPress}
            isSecureText={isVisiblePassword}
            onChangeText={(val: any) => {
              props.setLoginData({
                ...props.loginData, password: val
              })
            }}
          />
        </View>
        <TouchableOpacity style={styles.forgotTouch} onPress={() => props.handleForgotPress()}>
          <Text style={styles.forgotText}>{strings.forgotPassword}</Text>
        </TouchableOpacity>
        <View style={styles.btnView}>
          <Button
            buttonText={strings.signInText}
            handleBtnPress={props.handleLoginPress}
          />
        </View>
      </View>
      {/* <View style={styles.bottomView}>
        <Text style={styles.bottomText}>{strings.byCreating}</Text>
        <TouchableOpacity style={styles.spanTouch}>
          <Text style={styles.spanText}> {strings.termsAndCondition} </Text>
        </TouchableOpacity>
        <Text style={styles.bottomText}> {strings.and} </Text>
        <TouchableOpacity style={styles.spanTouch}>
          <Text style={styles.spanText}> {strings.privacyPolicy} </Text>
        </TouchableOpacity>
      </View> */}
      <View style={{alignItems: 'center'}}><Text>(ST-Version)</Text></View> 
      <View style={styles.bottomView}>
        <CheckBox
          value={true}
          disabled={true}
          tintColors={{true: PRIMARY_THEME_COLOR}}
          style={{ transform: Isios ? [{ scaleX: 0.8 }, { scaleY: 0.8 }]  : [{ scaleX: 1 }, { scaleY: 1 }]}}
          // onValueChange={(newValue) => setToggleCheckBox(newValue)}
        />
        <Text style={styles.bottomText}>{strings.iAknowledge}</Text>
        <TouchableOpacity onPress={() => Linking.openURL('https://justoverse.com/termandcondition')} style={styles.spanTouch}>
          <Text style={styles.spanText}> {strings.termsAndCondition} </Text>
        </TouchableOpacity>
        <Text style={styles.bottomText}> {strings.applicable} </Text>
        {/* <TouchableOpacity style={styles.spanTouch}>
          <Text style={styles.spanText}> {strings.privacyPolicy} </Text>
        </TouchableOpacity> */}
      </View>
    </ScrollView>
  );
};

export default LoginView;
