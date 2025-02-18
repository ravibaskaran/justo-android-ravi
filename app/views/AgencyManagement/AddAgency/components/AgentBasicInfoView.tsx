import TextRecognition from "@react-native-ml-kit/text-recognition";
import ErrorMessage from "app/components/ErrorMessage";
import InputCalender from "app/components/InputCalender";
import AddEmployeeModal from "app/components/Modals/AddEmployeeModal";
import ConfirmModal from "app/components/Modals/ConfirmModal";
import PicturePickerModal from "app/components/Modals/PicturePicker";
import MultiLocation from "app/components/MultiLocation";
import { normalize } from "app/components/scaleFontSize";
import { RequiredStart } from "app/components/utilities/GlobalFuncations";
import { handleValues } from "app/components/utilities/handleValues";
import { START_LOADING, STOP_LOADING } from "app/Redux/types";
import moment from "moment";
import React, { useState } from "react";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { RadioButton } from "react-native-paper";
import { useDispatch } from "react-redux";
import images from "../../../../assets/images";
import Button from "../../../../components/Button";
import Header from "../../../../components/Header";
import InputField from "../../../../components/InputField";
import {
  BLACK_COLOR,
  DATE_FORMAT,
  GRAY_COLOR,
  Isios,
  PRIMARY_THEME_COLOR,
  RED_COLOR,
  Regexs,
  validateEmail,
} from "../../../../components/utilities/constant";
import strings from "../../../../components/utilities/Localization";
import styles from "./styles";

const AgentBasicInfoView = (props: any) => {
  const [showReraValidationError, setShowReraValidationError] =
    useState<boolean>(false);
  const [reravisible, setreraVisible] = useState(false);
  const [visible, setVisible] = useState(false);
  const [isVisiblePreview, setIsVisiblePreview] = useState(false);
  const [perviewObject, setPerviewObject] = useState<any>({});
  const [isCertificateExpried, setIsCertificateExpried] = useState(false);

  const dispatch: any = useDispatch();

  const renderEmployee = (item: any, index: any) => {
    return (
      <View style={styles.IteamView} key={index}>
        <View style={styles.Txtview}>
          <View style={styles.projectContainer}>
            <Text style={styles.projectTxt}>{strings.empName} :</Text>
          </View>
          <View style={styles.nameContainer}>
            <Text style={styles.nameTxt}>{item.employeeName}</Text>
          </View>
        </View>
        <View style={styles.Txtview}>
          <View style={styles.projectContainer}>
            <Text style={styles.projectTxt}>{strings.empMobile} :</Text>
          </View>
          <View style={styles.nameContainer}>
            <Text style={styles.nameTxt}>{item.employeeMobile}</Text>
          </View>
        </View>
        <View style={styles.Txtview}>
          <View style={styles.projectContainer}>
            <Text style={styles.projectTxt}>{strings.empEmail} :</Text>
          </View>
          <View style={styles.nameContainer}>
            <Text style={styles.nameTxt}>{item.employeeEmail}</Text>
          </View>
        </View>
        <View style={styles.Txtview}>
          <View style={styles.projectContainer}>
            <Text style={styles.projectTxt}>{strings.rerano} :</Text>
          </View>
          <View style={styles.nameContainer}>
            <Text style={styles.nameTxt}>
              {item?.empolyeeReraNo ? item?.empolyeeReraNo : "NA"}{" "}
            </Text>
          </View>
        </View>
        <View style={styles.Txtview}>
          <View style={styles.projectContainer}>
            <Text style={styles.projectTxt}>{strings.gender}</Text>
          </View>
          <View style={styles.nameContainer}>
            <Text style={styles.nameTxt}>
              {item?.employeeGender === 1 ? strings.male : strings.female}
            </Text>
          </View>
        </View>
        <View style={styles.btnContainer}>
          <TouchableOpacity onPress={() => props.handleDeleteEmployee(index)}>
            <Image source={images.deleteIcon} style={styles.deleteVw} />
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  const recognizeTextFromImage = async (imagePath: any) => {
    try {
      const result = await TextRecognition.recognize(imagePath?.uri);
      //  let text =
      //   'HI 1:50 00\nRoyorazon womes P..\nMaharashtra Real Estate Regulatory Authority\nREGISTRATION CERTIFICATE OF REAL ESTATE AGENT FORM\nFORM "H\n[See rule 12(1Xb)]\n1. This registration is granted under section 9 with registration certificate bearing No. A478511156351 to -\n having its registered office I principal place of business at Tehsil: Pune City District:\nPune, Pin: 411021. to act as a real estate agent to facilitate the sale or purchasse of any plot, apartment or building, as the\ncase may be, in real estate projects registered in the State of Maharashtra in terms and the rules and regulations made there\nunder.\n2. This registration is granted subject to the following conditions, namely:-\n0) The real estate agent shall not facilitate the sale or purchase of any plot, apartment or building, as the case may be,\nin a real estate project or part of it, being sold by the promoter which is required but not registered with the regulatory\nauthority,\n41\n() The real estate agent shall maintain and preserve such books of account, records and documents as provided\nunder rule 16)\n(iil) The real estate agent shall not involve himself in any unfair trade practices as specified under clause (c) of section\n10 read with Rule 17:\n(iv) The real estate agent shall provide assistance to enable the allottee and promoter to exercise their respective\nrights and fulfil their respective obligations at the time of booking and sale of any plot, apartment or building, as the\ncase may be.\n(v) The real estate agent shall comply with the provisions and the rules and regulations made there under,\nDated: 12/04/2021\nPlace: Mumbai\n(vi) The real estate agent shall discharge such other functions as may be specified by the regulatory authority by\nregulations;\n3. The registration is valid for a period of five years commencing from 12/04/2021 and ending with 12/04/2026 unless\nrenewed by the regulatory authority in accordance with the provisions or the rules and regulations made there under.\n4. If the above mentioned conditions are not fulfilled by the real estate agent, the regulatory authority may take necessary\naction against the real estate agent including revoking the registration granted herein, as per the Act and the rules and\nregulations made there under.\nSignature valid\nDigitally Sighed by\nhand Prabhu\neMahaRERA)\nDate:12-4-2021 12:51:00\nSignature and seal of the Authorized Officer\nMaharashtra Real Estate Regulatory Authority';

      setTimeout(() => {
        dispatch({ type: STOP_LOADING });
      }, 2000);
      let text = result?.text;

      const normalizedText = text
        .replace(/\n/g, " ")
        .replace(/\s+/g, " ")
        .trim();

      const fixedText = normalizedText.replace(
        /(\d{2}-\d{2}-)\s*(\d{4})/g,
        "$1$2"
      );

      const registrationNumberPattern = /No\.\s*(\w+)/;
      const companyNamePattern = /to\s*-\s*([^\s]+(?:\s+[^\s]+)*)\s+having/;
      const companyNamePattern2 = /Name of Agent:\s+(.+)/;
      const companyNamePattern3 =
        /to\s*-\s*Mr\.\/Ms\.\s*([A-Z][a-zA-Z]*(?:\s+[A-Z][a-zA-Z]*)*)\s+son\/daughter of/;
      const upReraCompanyName =
        /UPRERA[A-Z]{3}\d{8,10}\s+([A-Za-z0-9\s\.\-\_]+(?:\s+(?:PRIVATE LIMITED|LIMITED|LLP|FIRM|SOCIETY|COMPANY))?)/i;

      const startDatePattern = /commencing from\s*(\d{2}\/\d{2}\/\d{4})/;
      const endDatePattern = /ending with\s*(\d{2}\/\d{2}\/\d{4})/;
      const upStartDatePattern = /commencing from\s*(\d{2}-\d{2}-\d{4})/;
      const upEndDatePattern = /ending with\s*(\d{2}-\d{2}-\d{4})/;

      const registrationNumber: any = text.match(
        registrationNumberPattern
      )?.[1];
      const startDate =
        text.match(startDatePattern)?.[1] ||
        fixedText.match(upStartDatePattern)?.[1];
      const endDate =
        text.match(endDatePattern)?.[1] ||
        fixedText.match(upEndDatePattern)?.[1];

      // Check for company or agent name
      let companyName =
        text.match(companyNamePattern)?.[1] ||
        text.match(companyNamePattern2)?.[1] ||
        text.match(companyNamePattern3)?.[1] ||
        text.match(upReraCompanyName)?.[1];

      let sDate = convertDateFormat(startDate);
      let eDate = convertDateFormat(endDate);
      let data = {
        reraNumber: Regexs.reraRegex.test(registrationNumber)
          ? registrationNumber
          : undefined,
        companyName: companyName ? companyName : "",
        startDate: sDate,
        endDate: eDate,
        imagePath: imagePath,
      };

      if (eDate !== undefined) {
        const [day, month, year] = eDate.split("/").map(Number);
        const givenDate = new Date(year, month - 1, day);
        const currentDate = new Date();
        if (givenDate > currentDate) {
          setPerviewObject(data);
          setIsVisiblePreview(true);
        } else {
          setIsCertificateExpried(true);
        }
      } else {
        setPerviewObject(data);
        setIsVisiblePreview(true);
      }
    } catch (error) {
      console.error("Error recognizing text from image: ", error);
    }
  };

  const convertDateFormat = (date: any) => {
    if (!date) return undefined;
    return date?.includes("-") ? date?.replace(/-/g, "/") : date;
  };

  const convertDate = (dateString: any) => {
    // Split the date string into components
    if (dateString != undefined) {
      const [day, month, year] = dateString.split("/");
      return `${year}-${month}-${day}`;
    } else return null;
  };

  const reraIsInvalid = () => {
    if (
      props.type === "edit" &&
      props.agencyData?.setrera_certificate_no?.toString() !==
        perviewObject?.reraNumber?.toString() &&
      Regexs.reraRegex.test(perviewObject?.reraNumber)
    ) {
      return true;
    }
  };

  const handleMsg = () => {
    if (!props?.agencyData?.rera_certificate) {
      ErrorMessage({
        msg: "Please attach the RERA certificate",
        backgroundColor: RED_COLOR,
      });
    }
  };

  return (
    <View style={styles.mainContainer}>
      <Header
        headerText={strings.channelPartnerreg}
        headerStyle={styles.headerStyle}
        headerTextStyle={styles.headerTextStyle}
        leftImageIconStyle={styles.leftImageIconStyle}
        leftImageSrc={images.backArrow}
        handleOnLeftIconPress={props.onPressBack}
        barStyle={"light-content"}
        statusBarColor={PRIMARY_THEME_COLOR}
      />
      <ScrollView
        keyboardShouldPersistTaps={"handled"}
        automaticallyAdjustKeyboardInsets={Isios ? true : false}
        contentContainerStyle={styles.wrap}
      >
        <TouchableOpacity
          onPress={() => props.setImagePicker(true)}
          style={[styles.imageCircle, { backgroundColor: GRAY_COLOR }]}
        >
          {props.type == "edit" ? (
            <Image
              style={styles.DummyloginBanner}
              source={{
                uri: props?.agencyData?.profile_picture?.uri
                  ? props?.agencyData?.profile_picture?.uri
                  : props?.agencyData?.profile_base_url +
                    props?.agencyData?.profile_picture,
              }}
              resizeMode="contain"
            />
          ) : (
            <View style={styles.imageCircle}>
              <Image
                style={styles.loginBanner}
                source={
                  props.agencyData?.profile_picture?.uri
                    ? {
                        uri: props.agencyData?.profile_picture?.uri,
                      }
                    : images.user
                }
                resizeMode="contain"
              />
            </View>
          )}
          <View style={styles.editView}>
            <Image
              style={styles.editImage}
              source={images.edit}
              resizeMode="contain"
            />
          </View>
        </TouchableOpacity>

        <View
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
            <Text style={[styles.headingText, { fontSize: normalize(18) }]}>
              {props?.agencyData?.cp_type === 1
                ? strings.CpreraCertificate
                : strings.compReraCertificate}
            </Text>
            {/* <RequiredStart /> */}
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
                {"Image"}
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
        </View>
        <Text style={[styles.ocrText, { fontWeight: "bold" }]}>
          {strings.ocrAvailableMsg}
        </Text>
        <View style={styles.inputWrap}>
          <InputField
            // disableSpecialCharacters={true}
            require={true}
            // editable={props.agencyData?.rera_certificate ? false : true}
            placeholderText={
              props?.agencyData?.cp_type === 1
                ? strings.nameOfCp
                : strings.cpCompName
            }
            handleInputBtnPress={() => {}}
            headingText={
              props?.agencyData?.cp_type === 1
                ? strings.nameOfCp
                : strings.cpCompName
            }
            valueshow={props.agencyData?.owner_name}
            onChangeText={(val: any) => {
              props.setAgencyData({
                ...props.agencyData,
                owner_name: val,
              });
            }}
          />
        </View>

        <View style={styles.inputWrap}>
          <InputField
            disableSpecialCharacters={true}
            require={true}
            placeholderText={
              props?.agencyData?.cp_type === 1
                ? strings.mobileNo
                : strings.cpCompMobileNumber
            }
            handleInputBtnPress={() => {}}
            headingText={
              props?.agencyData?.cp_type === 1
                ? strings.mobileNo
                : strings.cpCompMobileNumber
            }
            valueshow={props.agencyData?.primary_mobile?.toString()}
            keyboardtype={"number-pad"}
            editable={props.emailMobileChng?.change}
            maxLength={10}
            onChangeText={(val: any) => {
              props.setAgencyData({
                ...props.agencyData,
                primary_mobile: val,
              });
              if (Regexs.mobilenumRegex.test(val)) {
                props.setEmailMobValidation({
                  ...props.emailMobvalidation,
                  primary_mobile: "mobileStart",
                });
                props.setEmailMobileChng({
                  ...props.emailMobileChng,
                  onmobile: "onmobile",
                });
              } else {
                props.setEmailMobValidation({
                  ...props.emailMobvalidation,
                  primary_mobile: null,
                });
                props.setEmailMobileChng({
                  ...props.emailMobileChng,
                  onmobile: null,
                });
              }
            }}
            rightImageVw={styles.tickImgVw}
            rightImageSty={styles.tickImg}
            rightImgSrc={
              props?.emailMobvalidation?.primary_mobile === "mobile"
                ? images.check
                : null
            }
            onFocus={() => {
              if (
                props.agencyData?.primary_mobile !==
                props.agencyData?.primary_mobile
              ) {
                props.setEmailMobValidation({
                  ...props.emailMobvalidation,
                  primary_mobile: null,
                });
              }
            }}
            onBlur={(val: any) => {
              if (
                Regexs.mobilenumRegex.test(props.agencyData?.primary_mobile)
              ) {
                if (
                  props.agencyData?.setprimary_mobile?.toString() !==
                  props.agencyData?.primary_mobile?.toString()
                ) {
                  props.handleCheckEmailMobile(1);
                }
                props.setEmailMobValidation({
                  ...props.emailMobvalidation,
                  primary_mobile: null,
                });
                props.setEmailMobileChng({
                  ...props.emailMobileChng,
                  onmobile: "",
                });
              }
            }}
          />
        </View>
        <View style={styles.inputWrap}>
          <InputField
            require={true}
            placeholderText={
              props?.agencyData?.cp_type === 1
                ? strings.email + " " + strings.address
                : strings.cpCompEmail
            }
            handleInputBtnPress={() => {}}
            headingText={
              props?.agencyData?.cp_type === 1
                ? strings.email + " " + strings.address
                : strings.cpCompEmail
            }
            valueshow={props.agencyData?.email}
            editable={props.emailMobileChng?.change}
            onChangeText={(val: any) => {
              props.setAgencyData({
                ...props.agencyData,
                email: val,
              });
              if (validateEmail.test(val)) {
                props.setEmailMobValidation({
                  ...props.emailMobvalidation,
                  email: "emailStart",
                });
                props.setEmailMobileChng({
                  ...props.emailMobileChng,
                  onemail: "onemail",
                });
              } else {
                props.setEmailMobValidation({
                  ...props.emailMobvalidation,
                  email: null,
                });
                props.setEmailMobileChng({
                  ...props.emailMobileChng,
                  onemail: null,
                });
              }
            }}
            onFocus={() => {
              if (props.agencyData?.email !== props.agencyData?.email) {
                props.setEmailMobValidation({
                  ...props.emailMobvalidation,
                  email: null,
                });
              }
            }}
            rightImgSrc={
              props?.emailMobvalidation?.email === "email" ? images.check : null
            }
            rightImageVw={styles.tickImgVw}
            rightImageSty={styles.tickImg}
            onBlur={(val: any) => {
              if (validateEmail.test(props.agencyData.email)) {
                if (
                  props.agencyData?.setemail?.toString() !==
                  props.agencyData?.email?.toString()
                ) {
                  props.handleCheckEmailMobile();
                }
                props.setEmailMobValidation({
                  ...props.emailMobvalidation,
                  email: null,
                });
                props.setEmailMobileChng({
                  ...props.emailMobileChng,
                  onemail: "",
                });
              }
            }}
          />
        </View>

        <View style={styles.inputWrap}>
          <InputField
            require={true}
            editable={props.agencyData?.rera_certificate ? false : true}
            placeholderText={
              props?.agencyData?.cp_type === 1
                ? strings.channelParnterReraNo
                : strings.cpCompReraNo
            }
            autoCapitalize="words"
            handleInputBtnPress={() => {}}
            headingText={
              props?.agencyData?.cp_type === 1
                ? strings.channelParnterReraNo
                : strings.cpCompReraNo
            }
            // editable={props.emailMobileChng?.change}
            maxLength={17}
            valueshow={props.agencyData?.rera_certificate_no}
            rightImageVw={styles.tickImgVw}
            rightImageSty={styles.tickImg}
            rightImgSrc={
              props?.emailMobvalidation?.rera_certificate_no ===
              "rera_certificate_no"
                ? images.check
                : null
            }
            onBlur={(val: any) => {
              if (
                Regexs.reraRegex.test(props.agencyData?.rera_certificate_no)
              ) {
                if (
                  props.agencyData?.setrera_certificate_no?.toString() !==
                  props.agencyData?.rera_certificate_no?.toString()
                ) {
                  props.handleCheckEmailMobile(2);
                }
                props.setEmailMobileChng({
                  ...props.emailMobileChng,
                  onrera: "",
                });
                props.setEmailMobValidation({
                  ...props.emailMobvalidation,
                  rera_certificate_no: null,
                });
              }
            }}
            onChangeText={(val: any) => {
              props.setAgencyData({
                ...props.agencyData,
                rera_certificate_no: val,
                norera_register:
                  val === "" &&
                  handleValues(props?.agencyData?.rera_certificate) === false
                    ? null
                    : "",
              });
              if (Regexs.reraRegex.test(val)) {
                setShowReraValidationError(false);
                props.setEmailMobValidation({
                  ...props.emailMobvalidation,
                  rera_certificate_no: "reraStart",
                });
                props.setEmailMobileChng({
                  ...props.emailMobileChng,
                  onrera: "onrera",
                });
              } else {
                setShowReraValidationError(true);
                props.setEmailMobValidation({
                  ...props.emailMobvalidation,
                  rera_certificate_no: null,
                });
                props.setEmailMobileChng({
                  ...props.emailMobileChng,
                  onrera: null,
                });
              }
            }}
          />

          {showReraValidationError ? (
            <View style={{ padding: 5 }}>
              <Text style={{ fontSize: 12, color: RED_COLOR }}>
                {strings.reraValidationMsg}
              </Text>
            </View>
          ) : null}
        </View>

        <View style={styles.inputWrap}>
          <InputCalender
            require={true}
            leftIcon={images.event}
            mode={"date"}
            message={
              !props?.agencyData?.rera_certificate && props.type != "edit"
                ? "Please attach the RERA certificate"
                : "To change the start date, update the RERA certificate."
            }
            disabled={props.agencyData?.rera_certificate ? true : false}
            placeholderText={"Start Date"}
            headingText={"RERA Start Date"}
            editable={false}
            dateData={(data: any) => {
              props.setAgencyData({
                ...props.agencyData,
                start_date: moment(data).format(DATE_FORMAT),
              });
            }}
            setDateshow={(data: any) => {
              props.setAgencyData({
                ...props.agencyData,
                start_date: moment(data).format(DATE_FORMAT),
              });
            }}
            value={
              props?.agencyData?.start_date == "" ||
              props?.agencyData?.start_date == null
                ? ""
                : moment(props?.agencyData?.start_date).format(DATE_FORMAT)
            }
          />
        </View>

        <View style={styles.inputWrap}>
          <InputCalender
            require={true}
            disabled={props.agencyData?.rera_certificate ? true : false}
            message={
              !props?.agencyData?.rera_certificate && props.type != "edit"
                ? "Please attach the RERA certificate"
                : "To change the end date, update the RERA certificate."
            }
            leftIcon={images.event}
            mode={"date"}
            placeholderText={"End Date"}
            headingText={"RERA End Date"}
            editable={false}
            dateData={(data: any) => {
              props.setAgencyData({
                ...props.agencyData,
                end_date: moment(data).format(DATE_FORMAT),
              });
            }}
            setDateshow={(data: any) => {
              props.setAgencyData({
                ...props.agencyData,
                end_date: moment(data).format(DATE_FORMAT),
              });
            }}
            value={
              props?.agencyData?.end_date == "" ||
              props?.agencyData?.end_date == null
                ? ""
                : moment(props?.agencyData?.end_date).format(DATE_FORMAT)
            }
          />
        </View>

        <View style={styles.inputWrap}>
          <InputField
            disableSpecialCharacters={true}
            require={true}
            placeholderText={"PIN Code"}
            handleInputBtnPress={() => {}}
            headingText={"PIN Code"}
            valueshow={props.agencyData?.pincode}
            keyboardtype={"number-pad"}
            maxLength={6}
            onChangeText={(data: any) => {
              props.setAgencyData({
                ...props.agencyData,
                pincode: data,
              });
            }}
          />
        </View>

        <View style={styles.inputWrap}>
          <InputField
            // require={true}
            placeholderText={
              props?.agencyData?.cp_type === 1
                ? strings.address
                : strings.cpCompAddress
            }
            headingText={
              props?.agencyData?.cp_type === 1
                ? strings.address
                : strings.cpCompAddress
            }
            valueshow={props.agencyData?.location}
            onChangeText={(val: any) => {
              props.setAgencyData({
                ...props.agencyData,
                location: val,
              });
            }}
            // inputType={"location"}
            onPressSelect={(data: any, detail: any) => {
              console.log(
                "🚀 ~ file: AgentBasicInfoView.tsx:473 ~ data:",
                detail.address_components
              );
              const city = detail?.address_components?.filter((el: any) =>
                el?.types?.includes("administrative_area_level_3")
              );
              console.log(
                "🚀 ~ file: AgentBasicInfoView.tsx:483 ~ city:",
                city[0]?.short_name
              );
              const state = detail?.address_components?.filter((el: any) =>
                el?.types?.includes("administrative_area_level_1")
              );
              console.log(
                "🚀 ~ file: AgentBasicInfoView.tsx:487 ~ state:",
                state[0]?.short_name
              );
              const country = detail?.address_components?.filter((el: any) =>
                el?.types?.includes("country")
              );
              console.log(
                "🚀 ~ file: AgentBasicInfoView.tsx:491 ~ country:",
                country[0]?.short_name
              );
              const zipcode = detail?.address_components?.filter((el: any) =>
                el?.types?.includes("postal_code")
              );
              console.log(
                "🚀 ~ file: AgentBasicInfoView.tsx:495 ~ zipcode:",
                zipcode[0]?.short_name
              );
              props.setAgencyData({
                ...props.agencyData,
                location: data?.description,
                latitude: detail?.geometry?.location?.lat,
                longitude: detail?.geometry?.location?.lng,
              });
            }}
          />
        </View>
        {props?.agencyData?.cp_type === 1 ? (
          <>
            <View style={styles.genderView}>
              <Text style={styles.genderTxt}>{strings.gender}</Text>
              <RequiredStart />
              <View style={styles.radioView}>
                <RadioButton.Android
                  value={props.agencyData?.gender}
                  status={
                    props.agencyData.gender === 1 ? "checked" : "unchecked"
                  }
                  onPress={() => {
                    props.setAgencyData({
                      ...props.agencyData,
                      gender: 1,
                    });
                  }}
                  color={PRIMARY_THEME_COLOR}
                />
                <Text
                  style={[
                    styles.radioTxt,
                    {
                      color:
                        props.agencyData.gender === 1
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
                  value={props.agencyData?.gender}
                  status={
                    props.agencyData.gender === 2 ? "checked" : "unchecked"
                  }
                  onPress={() => {
                    props.setAgencyData({
                      ...props.agencyData,
                      gender: 2,
                    });
                  }}
                  color={PRIMARY_THEME_COLOR}
                />
                <Text
                  style={[
                    styles.radioTxt,
                    {
                      color:
                        props.agencyData.gender === 2
                          ? PRIMARY_THEME_COLOR
                          : BLACK_COLOR,
                    },
                  ]}
                >
                  {strings.female}
                </Text>
              </View>
            </View>
            <View style={styles.inputWrap}>
              <InputCalender
                // require={true}
                leftIcon={images.event}
                mode={"date"}
                placeholderText={strings.dateOfBirth}
                headingText={strings.dateOfBirth}
                editable={false}
                dateData={(data: any) => {
                  props.setAgencyData({
                    ...props.agencyData,
                    date_of_birth: moment(data).format(DATE_FORMAT),
                  });
                }}
                setDateshow={(data: any) => {
                  props.setAgencyData({
                    ...props.agencyData,
                    date_of_birth: moment(data).format(DATE_FORMAT),
                  });
                }}
                value={
                  props?.agencyData?.date_of_birth == "" ||
                  props?.agencyData?.date_of_birth == null
                    ? ""
                    : moment(props?.agencyData?.date_of_birth).format(
                        DATE_FORMAT
                      )
                }
              />
            </View>
            <View style={styles.inputWrap}>
              <InputField
                disableSpecialCharacters={true}
                // require={true}
                placeholderText={strings.whatsappNo}
                handleInputBtnPress={() => {}}
                headingText={strings.whatsappNo}
                valueshow={props.agencyData?.whatsapp_number?.toString()}
                keyboardtype={"number-pad"}
                maxLength={10}
                onChangeText={(val: any) => {
                  props.setAgencyData({
                    ...props.agencyData,
                    whatsapp_number: val,
                  });
                }}
              />
            </View>

            <View style={styles.inputWrap}>
              <InputField
                placeholderText={strings.addLocation}
                handleInputBtnPress={() => {}}
                headingText={strings.workingLocation}
                valueshow={props.agencyData?.working_location[0]?.location}
                onChangeText={(val: any) => {
                  props.setAgencyData({
                    ...props.agencyData,
                    working_location: [{ location: val }],
                  });
                }}
              />
            </View>
          </>
        ) : (
          <>
            {props.type !== "edit" ? (
              <>
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
                    <Text style={styles.headingText}>{strings.employee}</Text>
                    {/* <RequiredStart /> */}
                  </View>
                  <View style={{ flex: 1 }}>
                    <TouchableOpacity
                      style={[
                        styles.browseVw,
                        {
                          top: 0,
                        },
                      ]}
                      onPress={() => {
                        props.setIsVisibleAddEmployee(true);
                      }}
                    >
                      <Text
                        style={{
                          color: BLACK_COLOR,
                          fontSize: normalize(15),
                        }}
                      >
                        {strings.addNewEmpoyee}
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
                <View style={styles.employeeView}>
                  {props?.employees?.map((emp: any, index: any) =>
                    renderEmployee(emp, index)
                  )}
                </View>
              </>
            ) : null}
          </>
        )}

        <View style={styles.buttonContainer}>
          <Button
            handleBtnPress={(type: any) => props.onPressNext(1)}
            rightImage={images.forwardArrow}
            buttonText={strings.next}
            textTransform={"uppercase"}
          />
        </View>
        <MultiLocation
          Visible={props.locationModel}
          setVisible={() => props.setLocationModel(false)}
          value={
            props?.agencyData?.working_location
              ? props?.agencyData?.working_location
              : []
          }
          handleAddTarget={(data: any) => {
            if (data?.length > 0) {
              props.setAgencyData({
                ...props.agencyData,
                working_location: data,
              });
            }
          }}
        />
      </ScrollView>
      <AddEmployeeModal
        Visible={props.isVisibleAddEmployee}
        setIsVisible={props.setIsVisibleAddEmployee}
        handleAddEmployee={props.handleAddEmployee}
        employeeFormData={props.employeeFormData}
        setEmployeeFormData={props.setEmployeeFormData}
        handleCheckEmailMobile={props.handleCheckEmailMobile}
        setEmailMobValidation={props.setEmailMobValidation}
        emailMobvalidation={props.emailMobvalidation}
        emailMobileChng={props.emailMobileChng}
        setEmailMobileChng={props.setEmailMobileChng}
        handleCheckEmailMobileforEmployee={
          props.handleCheckEmailMobileforEmployee
        }
        handleOnBackEmployeeModal={props.handleOnBackEmployeeModal}
        employeeMobileNoSet={props.employeeMobileNoSet}
        employeeEmailAddSet={props.employeeEmailAddSet}
        employeeReraNoSet={props.employeeReraNoSet}
      />

      <PicturePickerModal
        Visible={visible}
        docType={""}
        setVisible={setVisible}
        imageData={(data: any) => {
          if (reravisible) {
            dispatch({ type: START_LOADING });
            recognizeTextFromImage(data);
            setreraVisible(false);
          }
        }}
      />
      {/* Your data capture isn't accurate. Kindly retake the picture. */}
      <ConfirmModal
        Visible={isVisiblePreview}
        setIsVisible={setIsVisiblePreview}
        textshow={
          <Text style={styles.text}>
            {reraIsInvalid() ? (
              <Text>
                The provided RERA number is invalid. Please check and try again.
              </Text>
            ) : (
              <Text style={styles.text}>
                Name :{" "}
                {perviewObject?.companyName ? (
                  perviewObject?.companyName
                ) : (
                  <Text style={styles.text1}>NA</Text>
                )}
                {"\n"}
                RERA Number :{" "}
                {perviewObject?.reraNumber ? (
                  perviewObject?.reraNumber
                ) : (
                  <Text style={styles.text1}>NA</Text>
                )}
                {"\n"}
                Start Date :{" "}
                {perviewObject?.startDate ? (
                  perviewObject?.startDate
                ) : (
                  <Text style={styles.text1}>NA</Text>
                )}
                {"\n"}
                End Date :{" "}
                {perviewObject?.endDate ? (
                  perviewObject?.endDate
                ) : (
                  <Text style={styles.text1}>NA</Text>
                )}
                {"\n"}
                {"\n"}
                {Object.values(perviewObject).includes(undefined)
                  ? `Your data capture isn't accurate. Kindly retake the picture.`
                  : "Are you sure your data is correct?"}
              </Text>
            )}
          </Text>
        }
        stringshow={reraIsInvalid() ? "Alert" : "Confirm"}
        confirmtype={"CONFIRMATION"}
        setStatusChange={() => {
          console.log("setStatusChange");
        }}
        yesBtnTitle={
          Object.values(perviewObject).includes(undefined) || reraIsInvalid()
            ? "Retake"
            : "Yes"
        }
        hideNoBtn={
          reraIsInvalid() || Object.values(perviewObject).includes(undefined)
        }
        handleYesResponse={() => {
          const { reraNumber, companyName, imagePath, startDate, endDate } =
            perviewObject;
          // Check for undefined values
          if (
            Object.values(perviewObject).some((value) => value === undefined) ||
            reraIsInvalid()
          ) {
            setreraVisible(true);
            setVisible(true);
            return;
          }
          // Prepare new agency data
          const newAgencyData = {
            ...props.agencyData,
            rera_certificate_no: reraNumber,
            owner_name: companyName,
            rera_certificate: imagePath,
            start_date: convertDate(startDate),
            end_date: convertDate(endDate),
          };
          const isEditMode = props.type === "edit";
          // Update agency data if conditions are met
          if (
            !isEditMode ||
            (isEditMode &&
              props.agencyData?.setrera_certificate_no?.toString() ===
                reraNumber?.toString())
          ) {
            props.setAgencyData(newAgencyData);
          }
          // Validate RERA number
          if (Regexs.reraRegex.test(reraNumber)) {
            if (!isEditMode) {
              props.handleCheckEmailMobile(2, reraNumber);
            }
            props.setEmailMobileChng({ ...props.emailMobileChng, onrera: "" });
          } else {
            setShowReraValidationError(true);
          }
        }}
      />

      <ConfirmModal
        Visible={isCertificateExpried}
        handleYesResponse={() => {
          setreraVisible(true);
          setVisible(true);
        }}
        setIsVisible={setIsCertificateExpried}
        stringshow={"Alert"}
        hideNoBtn={true}
        textshow={
          "Your uploaded RERA certificate has expired. Please check it and upload a new, valid certificate."
        }
        yesBtnTitle={"Retake"}
        confirmtype={"CONFIRMATION"}
      />
    </View>
  );
};

export default AgentBasicInfoView;
