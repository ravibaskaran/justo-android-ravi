import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  StatusBar,
  Linking,
} from "react-native";
import OTPInputView from "@twotalltotems/react-native-otp-input";
import React from "react";
import styles from "./style";
import images from "../../../../assets/images";
import strings from "../../../../components/utilities/Localization";
import Button from "../../../../components/Button";
import { Isios, PRIMARY_THEME_COLOR, WHITE_COLOR } from "../../../../components/utilities/constant";
import CheckBox from "@react-native-community/checkbox";
// import LogoView from "../../Logoview";

const OtpVerificationView = (props: any) => {
  const { otp, setOtp, handleOtpChange } = props;
  return (
    <ScrollView
      style={styles.mainContainer}
    >
      <StatusBar barStyle={"light-content"} backgroundColor={PRIMARY_THEME_COLOR} />
      {/* <View style={styles.logoView}>
        <LogoView />
      </View> */}
       <View style={styles.logoView}>
          <Image style={styles.logoImage} source={images.logoWhiteBG} />
      </View>
      <View style={styles.inputView}>
        <View style={styles.DescbottomView}>
          <Text style={styles.headingText}>{strings.otpVerification}</Text>
          {/* <Text style={styles.bottomText}>{strings.codeSent}</Text>
          <View style={styles.spanTouch}>
            <Text style={styles.bottomText}>{strings.your}</Text>
            <TouchableOpacity>
              <Text style={styles.spanText}> {strings.email} {props.email} </Text>
            </TouchableOpacity>
          </View> */}
          <Text style={styles.bottomText}>{strings.codeSent}</Text>
       
          <Text style={styles.bottomText}> {strings.your} </Text>
          <Text style={styles.spanText}> {props.email} </Text>
        
        </View>
        <OTPInputView
          style={styles.otpView}
          pinCount={4}
          code={otp}
          onCodeChanged={(code) => handleOtpChange(code)}
          autoFocusOnLoad={false}
          codeInputFieldStyle={styles.underlineStyleBase}
          codeInputHighlightStyle={styles.underlineStyleHighLighted}
          onCodeFilled={(code) => {
          }}
        />
        <View style={styles.btnView}>
          <Button handleBtnPress={props.OnpressConfirm} buttonText={'confirm'}
          //textTransform={'uppercase'}
          />
        </View>

        <View style={styles.resendtxt}>
          <Text style={styles.bottomText}>{strings.notRecived}</Text>
          <TouchableOpacity onPress={props.handleResendOtp}>
            <Text style={styles.spanText}> {strings.resend} </Text>
          </TouchableOpacity>
        </View>

        {/* <View style={styles.DescbottomView}>
          
          <Text style={styles.bottomText}>{strings.codeSent}</Text>
          <View style={styles.spanTouch}>
            <Text style={styles.bottomText}>{strings.your}</Text>
            <TouchableOpacity>
              <Text style={styles.spanText}> {strings.email} </Text>
            </TouchableOpacity>
          </View>
        </View> */}

        {/*  <Text style={styles.bottomText}>{strings.notRecived}</Text>
          <TouchableOpacity style={styles.spanTouch}>
            <Text style={styles.spanText}> {strings.resend} </Text>
          </TouchableOpacity> */}

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
      <View style={styles.bottomView}>
        <CheckBox
          value={true}
          disabled={true}
          tintColors={{true: PRIMARY_THEME_COLOR}}
          style={{ transform: Isios ? [{ scaleX: 0.8 }, { scaleY: 0.8 }]  : [{ scaleX: 1 }, { scaleY: 1 }]}}
          // onValueChange={(newValue) => setToggleCheckBox(newValue)}
        />
        <Text style={styles.bottomText}>{strings.iAknowledge}</Text>
        <TouchableOpacity onPress={() => Linking.openURL('https://justoverse.com/termandcondition')}  style={styles.spanTouch}>
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

export default OtpVerificationView;
