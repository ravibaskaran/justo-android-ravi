import React from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import images from "../../../../assets/images";
import Button from "../../../../components/Button";
import Header from "../../../../components/Header";
import InputField from "../../../../components/InputField";
import { Isios, WHITE_COLOR } from "../../../../components/utilities/constant";
import strings from "../../../../components/utilities/Localization";
import styles from "./styles";

const CompanyDetails = ({ navigation }: any) => {
  const insets = useSafeAreaInsets();
  const onPressBack = () => {
    navigation.goBack('')
  }
  const onPressRegister = () => {
    navigation.navigate('OtpVerificationScreenView')
  }
  return (
    <ScrollView style={styles.mainContainer}
      automaticallyAdjustKeyboardInsets={Isios ? true : false}
    >
      <Header
        headerText={strings.companyDetails}
        headerStyle={styles.headerStyle}
        headerTextStyle={styles.headerTextStyle}
        leftImageSrc={images.backArrow}
        handleOnLeftIconPress={onPressBack}
      />
      <View style={styles.wrap}>
        <View style={styles.inputWrap}>
          <InputField
            require={true}
            placeholderText={strings.agency + " " + strings.name}
            handleInputBtnPress={() => { }}
            onChangeText={() => { }}
            headingText={strings.realEstateCom}
          />
        </View>
        <View style={styles.inputWrap}>
          <InputField
            require={true}
            placeholderText={strings.gst}
            maxLength={20}
            headingText={strings.gst}
            handleInputBtnPress={() => { }}
            onChangeText={() => { }}
          />
        </View>
        <View style={styles.inputWrap}>
          <InputField
            require={true}
            maxLength={20}
            placeholderText={strings.RERA + " " + strings.registration}
            headingText={strings.RERA + " " + strings.registration}
            handleInputBtnPress={() => { }}
            onChangeText={() => { }}
          />
        </View>
        <View style={[styles.inputWrap, { flexDirection: "row" }]}>
          <InputField
            require={true}
            inputWidth={"60%"}
            btnWidth={"30%"}
            browse={"browse"}
            handleInputBtnPress={() => { }}
            onChangeText={() => { }}
            headingText={"Pancard"}
          /> 
          <TouchableOpacity
            style={{
              width: "25%",
              backgroundColor: WHITE_COLOR,
              alignItems: "center",
              justifyContent: "center",
              marginLeft: 10,
              borderRadius: 10
            }}
          >
            <Text>browse</Text>
          </TouchableOpacity>
        </View>
        <View style={[styles.inputWrap, { flexDirection: "row" }]}>
          <InputField
            require={true}
            inputWidth={"60%"}
            btnWidth={"30%"}
            browse={"browse"}
            handleInputBtnPress={() => { }}
            onChangeText={() => { }}
            headingText={"Decalaration Letter of Company"}
          />
          <TouchableOpacity
            style={{
              width: "25%",
              backgroundColor: WHITE_COLOR,
              alignItems: "center",
              justifyContent: "center",
              marginLeft: 10,
              borderRadius: 10
            }}
          >
            <Text>browse</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.inputWrap}>
          <Text style={styles.headingText}>Bank details</Text>
        </View>
        <View style={styles.inputWrap}>
          <InputField
            require={true}
            placeholderText={"Bank Name"}
            handleInputBtnPress={() => { }}
            onChangeText={() => { }}
            headingText={"Bank Name"}
          />
        </View>
        <View style={styles.inputWrap}>
          <InputField
            require={true}
            placeholderText={"Branch Name"}
            handleInputBtnPress={() => { }}
            onChangeText={() => { }}
            headingText={"Branch Name"}
          />
        </View>
        <View style={styles.inputWrap}>
          <InputField
            require={true}
            placeholderText={"Account No."}
            handleInputBtnPress={() => { }}
            onChangeText={() => { }}
            headingText={"Account No."}
          />
        </View>
        <View style={styles.inputWrap}>
          <InputField
            require={true}
            placeholderText={"IFSC Code"}
            handleInputBtnPress={() => { }}
            onChangeText={() => { }}
            maxLength={11}
            headingText={"IFSC Code"}
          />
        </View>
      </View>
      <View style={styles.btnView}>
        <Button handleBtnPress={onPressRegister} buttonText={strings.createnewagency} textTransform={'uppercase'} />
      </View>
    </ScrollView>
  );
};

export default CompanyDetails;
