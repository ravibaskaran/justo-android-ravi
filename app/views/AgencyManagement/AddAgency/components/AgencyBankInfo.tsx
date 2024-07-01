import {
  View,
  Text,
  ScrollView,
  StatusBar,
  TouchableOpacity,
} from "react-native";
import React from "react";
import images from "../../../../assets/images";
import InputField from "../../../../components/InputField";
import { PRIMARY_THEME_COLOR, WHITE_COLOR } from "../../../../components/utilities/constant";
import strings from "../../../../components/utilities/Localization";
import styles from "./styles";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Button from "../../../../components/Button";
import Header from "../../../../components/Header";

const AgentBankInfo = (props: any) => {
  const insets = useSafeAreaInsets();
  return (
    <ScrollView style={styles.mainContainer}>
      <Header
        headerText={strings.userbankinfo}
        headerStyle={styles.headerStyle}
        headerTextStyle={styles.headerTextStyle}
        leftImageSrc={images.backArrow}
        handleOnLeftIconPress={() => props.onPressNext(0)}
        barStyle={'light-content'}
        statusBarColor={PRIMARY_THEME_COLOR}
      />
      <View style={styles.wrap}>

        <View style={styles.inputWrap}>
          <InputField
            placeholderText={"RERA Certificat No."}
            handleInputBtnPress={() => { }}
            onChangeText={() => { }}
            headingText={"RERA Certificat No."}
          />
        </View>
        <View style={[styles.inputWrap, { flexDirection: "row" }]}>
          <InputField
            inputWidth={"60%"}
            btnWidth={"30%"}
            browse={"browse"}
            handleInputBtnPress={() => { }}
            onChangeText={() => { }}
            headingText={"RERA Certificat"}
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
            inputWidth={"60%"}
            btnWidth={"30%"}
            browse={"browse"}
            handleInputBtnPress={() => { }}
            onChangeText={() => { }}
            headingText={"Propidership Declaration Letter"}
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
            placeholderText={"Bank Name"}
            handleInputBtnPress={() => { }}
            onChangeText={() => { }}
            headingText={"Bank Name"}
          />
        </View>
        <View style={styles.inputWrap}>
          <InputField
            placeholderText={"Branch Name"}
            handleInputBtnPress={() => { }}
            onChangeText={() => { }}
            headingText={"Branch Name"}
          />
        </View>
        <View style={styles.inputWrap}>
          <InputField
            placeholderText={"Account No."}
            handleInputBtnPress={() => { }}
            onChangeText={() => { }}
            headingText={"Account No."}
          />
        </View>
        <View style={styles.inputWrap}>
          <InputField
            placeholderText={"IFSC Code"}
            handleInputBtnPress={() => { }}
            onChangeText={() => { }}
            headingText={"IFSC Code"}
          />
        </View>
        <View style={[styles.inputWrap, { flexDirection: "row" }]}>
          <InputField
            inputWidth={"60%"}
            btnWidth={"30%"}
            browse={"browse"}
            handleInputBtnPress={() => { }}
            onChangeText={() => { }}
            headingText={"Cancel Cheaque"}
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
        <View style={{ marginTop: 20 }}>
          <Button
            handleBtnPress={(type: any) => props.onPressNext(2)}
            buttonText={strings.createAgent}
            textTransform={"uppercase"}
          />
        </View>
      </View>
    </ScrollView>
  );
};

export default AgentBankInfo;
