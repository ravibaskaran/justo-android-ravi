import { View, Text, ScrollView, TouchableOpacity, Image } from "react-native";
import React, { useState } from "react";
import images from "../../../../assets/images";
import InputField from "../../../../components/InputField";
import {
  BLACK_COLOR,
  Isios,
  PRIMARY_THEME_COLOR,
} from "../../../../components/utilities/constant";
import strings from "../../../../components/utilities/Localization";
import styles from "./styles";
import Button from "../../../../components/Button";
import Header from "../../../../components/Header";
import PicturePickerModal from "app/components/Modals/PicturePicker";
import { normalize } from "app/components/scaleFontSize";
import { RequiredStart } from "app/components/utilities/GlobalFuncations";
import { RadioButton } from "react-native-paper";
import { handleValues } from "app/components/utilities/handleValues";
import AddPropertyModel from "app/components/Modals/AddPropertyModel";

const AgentBankInfo = (props: any) => {
  const [reravisible, setreraVisible] = useState(false);
  const [lettervisible, setletterVisible] = useState(false);
  const [pancardVisible, setPancardVisible] = useState(false);
  const [cheaquevisible, setcheaqueVisible] = useState(false);
  const [visible, setVisible] = useState(false);
  const renderProperty = (item: any, index: any) => {
    return (
      <View style={styles.innerBoxVw}>
        <Text style={styles.innerBoxTxt}>{item.property_title}</Text>
        {props.type === "add" ? (
          <TouchableOpacity onPress={() => props.handleDelete(item, index)}>
            <Image source={images.close} style={styles.crossVw} />
          </TouchableOpacity>
        ) : null}
      </View>
    );
  };
  return (
    <View style={styles.mainContainer}>
      <Header
        headerText={strings.cpInformation}
        headerStyle={styles.headerStyle}
        headerTextStyle={styles.headerTextStyle}
        leftImageIconStyle={styles.leftImageIconStyle}
        leftImageSrc={images.backArrow}
        handleOnLeftIconPress={() => props.setFormType(0)}
        barStyle={"light-content"}
        statusBarColor={PRIMARY_THEME_COLOR}
      />
      <ScrollView
        keyboardShouldPersistTaps={"handled"}
        automaticallyAdjustKeyboardInsets={Isios ? true : false}
        contentContainerStyle={styles.wrap}
      >
        {/* <View style={styles.inputWrap}>
          <InputField
            require={true}
            placeholderText={strings.reraCertificate + " " + strings.shortNum}
            handleInputBtnPress={() => { }}
            headingText={strings.reraCertificate + " " + strings.shortNum}
            maxLength={20}
            valueshow={props.agencyData?.rera_certificate_no}
            onChangeText={(val: any) => {
              props.setAgencyData({
                ...props.agencyData,
                rera_certificate_no: val,
                norera_register: (val === "" && handleValues(props?.agencyData?.rera_certificate) === false) ? null : ""
              })

            }}
          />
        </View> */}
        <Text style={styles.applicableTxt}>{strings.areYouGstAppl}</Text>
        <View style={styles.TypeView}>
          {/* <RequiredStart /> */}
          <View style={styles.radioView}>
            <RadioButton.Android
              value={props.agencyData?.gstApplicable}
              status={
                props.agencyData.gstApplicable === 1 ? "checked" : "unchecked"
              }
              onPress={() => {
                props.setAgencyData({
                  ...props.agencyData,
                  gstApplicable: 1,
                  propidership_declaration_letter: "",
                  gst: "",
                });
              }}
              color={PRIMARY_THEME_COLOR}
            />
            <Text
              style={[
                styles.radioTxt,
                {
                  color:
                    props.agencyData.gstApplicable === 1
                      ? PRIMARY_THEME_COLOR
                      : BLACK_COLOR,
                },
              ]}
            >
              {strings.yes}
            </Text>
          </View>
          <View style={styles.radioView}>
            <RadioButton.Android
              value={props.agencyData?.gstApplicable}
              status={
                props.agencyData.gstApplicable === 2 ? "checked" : "unchecked"
              }
              onPress={() => {
                props.setAgencyData({
                  ...props.agencyData,
                  gstApplicable: 2,
                  propidership_declaration_letter: "",
                  gst: "",
                });
              }}
              color={PRIMARY_THEME_COLOR}
            />
            <Text
              style={[
                styles.radioTxt,
                {
                  color:
                    props.agencyData.gstApplicable === 2
                      ? PRIMARY_THEME_COLOR
                      : BLACK_COLOR,
                },
              ]}
            >
              {strings.no}
            </Text>
          </View>
        </View>
        {props.agencyData?.gstApplicable === 1 ? (
          <View style={styles.inputWrap}>
            <InputField
              disableSpecialCharacters={true}
              // require={true}
              placeholderText={"22AAAAA0000A1Z5"}
              maxLength={20}
              headingText={
                props?.agencyData?.cp_type === 1 ? strings.gst : strings.compGst
              }
              handleInputBtnPress={() => {}}
              valueshow={props?.agencyData?.gst}
              onChangeText={(val: any) => {
                props.setAgencyData({
                  ...props?.agencyData,
                  gst: val,
                });
              }}
            />
          </View>
        ) : (
          <View
            style={[
              styles.inputWrap,
              { flexDirection: "row", alignItems: "center" },
            ]}
          >
            <View
              style={{
                flex: 1,
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Text style={styles.headingText}>
                {props?.agencyData?.cp_type === 1
                  ? strings.DeclarLttr
                  : strings.declrLttrCom}
              </Text>
              {/* <RequiredStart /> */}
            </View>
            <View style={{ flex: 0.5 }}>
              <TouchableOpacity
                style={styles.browseVw}
                onPress={() => {
                  setletterVisible(true);
                  setVisible(true);
                }}
              >
                <Text
                  style={{
                    color: props.agencyData?.propidership_declaration_letter
                      ? BLACK_COLOR
                      : PRIMARY_THEME_COLOR,
                    fontSize: normalize(15),
                  }}
                >
                  {strings.browse}
                </Text>
              </TouchableOpacity>
              {(typeof props.agencyData?.propidership_declaration_letter ===
                "string" &&
                props.agencyData?.propidership_declaration_letter?.includes(
                  "no_image.png"
                )) ||
              props.agencyData?.propidership_declaration_letter === null ||
              props.agencyData?.propidership_declaration_letter === "" ||
              props.agencyData?.propidership_declaration_letter ===
                undefined ? null : (
                <Text style={styles.addedTxt}>
                  {strings.DeclarLttr + " " + strings.added}
                </Text>
              )}
            </View>
          </View>
        )}

        {/* <View
          style={[
            styles.inputWrap,
            {
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
               {/* <View
          style={[
            styles.inputWrap,
            {
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            },
          ]}
        >
          <View
            style={{
              flex: 1,
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Text style={styles.headingText}>
              {props?.agencyData?.cp_type === 1
                ? strings.CpreraCertificate
                : strings.compReraCertificate}
            </Text>
          </View>
          <View style={{ flex: 0.5 }}>
            <TouchableOpacity
              style={styles.browseVw}
              onPress={() => {
                setreraVisible(true);
                setVisible(true);
              }}
            >
              <Text
                style={{
                  color: props.agencyData?.rera_certificate
                    ? BLACK_COLOR
                    : PRIMARY_THEME_COLOR,
                  fontSize: normalize(15),
                }}
              >
                {strings.browse}
              </Text>
            </TouchableOpacity>
            {(typeof props.agencyData?.rera_certificate === "string" &&
              props.agencyData?.rera_certificate?.includes("no_image.png")) ||
            props.agencyData?.rera_certificate === null ||
            props.agencyData?.rera_certificate === "" ||
            props.agencyData?.rera_certificate === undefined ? null : (
              <Text style={styles.addedTxt}>
                {strings.reraCertificate + " " + strings.added}
              </Text>
            )}
          </View>
        </View> */}

        {props?.agencyData?.cp_type === 2 ? (
          <View
            style={[
              styles.inputWrap,
              { flexDirection: "row", alignItems: "center" },
            ]}
          >
            <View
              style={{
                flex: 1,
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Text style={styles.headingText}>{strings.compPanCard}</Text>
              {/* <RequiredStart /> */}
            </View>
            <View style={{ flex: 0.5 }}>
              <TouchableOpacity
                style={styles.browseVw}
                onPress={() => {
                  setPancardVisible(true);
                  setVisible(true);
                }}
              >
                <Text
                  style={{
                    color: props.agencyData?.pancard
                      ? BLACK_COLOR
                      : PRIMARY_THEME_COLOR,
                    fontSize: normalize(15),
                  }}
                >
                  {strings.browse}
                </Text>
              </TouchableOpacity>
              {(typeof props.agencyData?.pancard === "string" &&
                props.agencyData?.pancard?.includes("no_image.png")) ||
              props.agencyData?.pancard === null ||
              props.agencyData?.pancard === "" ||
              props.agencyData?.pancard === undefined ? null : (
                <Text style={styles.addedTxt}>
                  {strings.compPanCard + " " + strings.added}
                </Text>
              )}
            </View>
          </View>
        ) : null}

        {props.type === "add" ? (
          <View
            style={[
              styles.inputWrap,
              { flexDirection: "row", alignItems: "center" },
            ]}
          >
            <View
              style={{
                flex: 1,
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Text style={styles.headingText}>{strings.allocateProperty}</Text>
              <RequiredStart />
            </View>
            <View style={{ flex: 0.5 }}>
              <TouchableOpacity
                style={[
                  styles.browseVw,
                  {
                    top: 0,
                  },
                ]}
                onPress={() => {
                  props.handleVisiblePropertyPress();
                }}
              >
                <Text
                  style={{
                    color: PRIMARY_THEME_COLOR,
                    fontSize: normalize(15),
                  }}
                >
                  {strings.add}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        ) : (
          <View style={[styles.inputWrap, { alignItems: "flex-start" }]}>
            <View
              style={{
                flex: 1,
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Text style={styles.headingText}>
                {strings.allocatedProperty}
              </Text>
            </View>
          </View>
        )}
        <View style={styles.propertyWrap}>
          {props.selectedProperty?.length > 0 ? (
            props.selectedProperty?.map((prop: any, index: any) =>
              renderProperty(prop, index)
            )
          ) : (
            <View
              style={[styles.propertyTxtview, { justifyContent: "center" }]}
            >
              <Text style={styles.projectTxt}>
                {strings.noPropertySelected}
              </Text>
            </View>
          )}
        </View>
        <View style={styles.inputWrap}>
          <Text style={styles.headingText}>{strings.cpBankDetail}</Text>
        </View>
        <View style={styles.inputWrap}>
          <InputField
            disableSpecialCharacters={true}
            // require={true}
            placeholderText={strings.bankName}
            handleInputBtnPress={() => {}}
            headingText={strings.bankName}
            valueshow={props.agencyData?.bank_name}
            onChangeText={(val: any) => {
              props.setAgencyData({
                ...props.agencyData,
                bank_name: val,
              });
            }}
          />
        </View>
        <View style={styles.inputWrap}>
          <InputField
            disableSpecialCharacters={true}
            // require={true}
            placeholderText={strings.branchName}
            handleInputBtnPress={() => {}}
            headingText={strings.branchName}
            valueshow={props.agencyData?.branch_name}
            onChangeText={(val: any) => {
              props.setAgencyData({
                ...props.agencyData,
                branch_name: val,
              });
            }}
          />
        </View>
        <View style={styles.inputWrap}>
          <InputField
            disableSpecialCharacters={true}
            // require={true}
            placeholderText={strings.accountNo}
            handleInputBtnPress={() => {}}
            headingText={strings.accountNo}
            maxLength={18}
            keyboardtype={"number-pad"}
            valueshow={props.agencyData?.account_no}
            onChangeText={(val: any) => {
              props.setAgencyData({
                ...props.agencyData,
                account_no: val,
              });
            }}
          />
        </View>
        <View style={styles.inputWrap}>
          <InputField
            disableSpecialCharacters={true}
            // require={true}
            placeholderText={strings.ifscCode}
            handleInputBtnPress={() => {}}
            headingText={strings.ifscCode}
            valueshow={props.agencyData?.ifsc_code}
            maxLength={11}
            onChangeText={(val: any) => {
              props.setAgencyData({
                ...props.agencyData,
                ifsc_code: val,
              });
            }}
          />
        </View>
        <View
          style={[
            styles.inputWrap,
            { flexDirection: "row", alignItems: "center" },
          ]}
        >
          <View
            style={{
              flex: 1,
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Text style={styles.headingText}>{strings.cancelCheque}</Text>
            {/* <RequiredStart /> */}
          </View>
          <View style={{ flex: 0.5 }}>
            <TouchableOpacity
              style={[
                styles.browseVw,
                {
                  top:
                    props.agencyData?.cancel_cheaque === null ||
                    props.agencyData?.cancel_cheaque === "" ||
                    props.agencyData?.cancel_cheaque === undefined
                      ? normalize(0)
                      : normalize(8),
                },
              ]}
              onPress={() => {
                setcheaqueVisible(true);
                setVisible(true);
              }}
            >
              <Text
                style={{
                  color:
                    props.agencyData?.cancel_cheaque === ""
                      ? BLACK_COLOR
                      : PRIMARY_THEME_COLOR,
                  fontSize: normalize(15),
                }}
              >
                {strings.browse}
              </Text>
            </TouchableOpacity>
            {(typeof props.agencyData?.cancel_cheaque === "string" &&
              props.agencyData?.cancel_cheaque?.includes("no_image.png")) ||
            props.agencyData?.cancel_cheaque === null ||
            props.agencyData?.cancel_cheaque === "" ||
            props.agencyData?.cancel_cheaque === undefined ? null : (
              <Text style={styles.addedTxt}>
                {strings.cancelCheque + " " + strings.added}
              </Text>
            )}
          </View>
        </View>
        <View style={styles.buttonContainer}>
          <Button
            handleBtnPress={(type: any) => {
              props.onPressNext(2, props.agencyData);
            }}
            // rightImage={images.forwardArrow}
            buttonText={
              props.type === "add"
                ? strings.createnewagency
                : strings.editagency
            }
            textTransform={"uppercase"}
          />
        </View>
      </ScrollView>
      <PicturePickerModal
        Visible={visible}
        docType={"all"}
        setVisible={setVisible}
        imageData={(data: any) => {
          if (reravisible) {
            props.setAgencyData({
              ...props.agencyData,
              rera_certificate: data,
              norera_register: "",
            });
            setreraVisible(false);
          } else if (lettervisible) {
            props.setAgencyData({
              ...props.agencyData,
              propidership_declaration_letter: data,
            });
            setletterVisible(false);
          } else if (pancardVisible) {
            props.setAgencyData({
              ...props.agencyData,
              pancard: data,
            });
            setPancardVisible(false);
          } else {
            props.setAgencyData({
              ...props.agencyData,
              cancel_cheaque: data,
            });
            setcheaqueVisible(false);
          }
        }}
      />
      <AddPropertyModel
        isVisible={props.isPropertyVisible}
        setIsVisible={props.setIsPropertyVisible}
        handleSearch={props.handleSearch}
        finalPropertyList={props.finalPropertyList}
        handleSelects={props.handleSelects}
        handleDelete={props.handleDelete}
        selectedProperty={props.selectedProperty}
        handleAllocateProperty={props.handleAllocateProperty}
      />
    </View>
  );
};

export default AgentBankInfo;
