import CheckBox from "@react-native-community/checkbox";
import DropdownInput from "app/components/DropDown";
import InputCalender from "app/components/InputCalender";
import CountryPickerModal from "app/components/Modals/CountryPickerModal";
import JustForOkModal from "app/components/Modals/JustForOkModal";
import {
  normalizeHeight,
  normalizeSpacing,
  normalizeWidth,
} from "app/components/scaleFontSize";
import { CpType } from "app/components/utilities/DemoData";
import { RequiredStart } from "app/components/utilities/GlobalFuncations";
import usePermission from "app/components/utilities/UserPermissions";
import moment from "moment";
import React, { useEffect } from "react";
import {
  Keyboard,
  Linking,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { RadioButton } from "react-native-paper";
import { useSelector } from "react-redux";
import images from "../../../../assets/images";
import Button from "../../../../components/Button";
import Header from "../../../../components/Header";
import InputField from "../../../../components/InputField";
import Styles from "../../../../components/Modals/styles";
import {
  AMOUNT_TYPE,
  BLACK_COLOR,
  CONST_IDS,
  DATE_FORMAT,
  Isios,
  PRIMARY_THEME_COLOR,
  Regexs,
  ROLE_IDS,
  WHITE_COLOR,
} from "../../../../components/utilities/constant";
import strings from "../../../../components/utilities/Localization";
import styles from "./Styles";
import VisitConfirmModal from "./VisitConfirmModal";

const AddNewVisitorForm = (props: any) => {
  const { masterDatas } = props;

  const { response = {}, detail = "" } = useSelector(
    (state: any) => state.visitorData
  );
  const userData = useSelector((state: any) => state.userData);
  const id = userData?.userData?.data?.role_id;

  const Cmteam =
    ROLE_IDS.closingtl_id === id || ROLE_IDS.closingmanager_id === id;
  const SMteam =
    ROLE_IDS.sourcingtl_id === id || ROLE_IDS.sourcingmanager_id === id;

  const leadsourcefilteredData: any = masterDatas.filter((obj: any) =>
    Cmteam
      ? obj.title !== "Channel Partner"
      : SMteam
      ? obj.title === "Channel Partner"
      : obj.title !== ""
  );

  const { create } = usePermission({
    create:
      ROLE_IDS.closingtl_id === id || ROLE_IDS.closingmanager_id === id
        ? "add_appointment"
        : "add_appointment _site_visite",
  });

  useEffect(() => {
    if (props.type == "edit") {
      if (response?.status === 200) {
        props.setFormData({
          ...response?.data[0]?.customer_detail,
          expected_possession_date: response?.data[0]?.expected_possession_date,
          lead_id: response?.data[0]?._id,
          property_id: response?.data[0]?.property_id,
          property_title: response?.data[0]?.property_title,
          remark: response?.data[0]?.remark,
          lead_source: response?.data[0]?.lead_source,
          lead_source_title: response?.data[0]?.lead_source_title,
          property_type_title: response?.data[0]?.property_type_title,
          locality: response?.data[0]?.customer_detail?.locality
            ? response?.data[0]?.customer_detail?.locality
            : "",
          configuration_id: response?.data[0]?.configuration_id,
          configuration: response?.data[0]?.configuration,
          areain_sqlft: response?.data[0]?.areain_sqlft,
          min_budget: response?.data[0]?.min_budget,
          min_budget_type: response?.data[0]?.min_budget_type,
          max_budget: response?.data[0]?.max_budget,
          max_budget_type: response?.data[0]?.max_budget_type,
          funding_type: response?.data[0]?.funding_type,
          funding_emi_type: response?.data[0]?.funding_emi_type,
          purpose: response?.data[0]?.purpose,
          min_emi_budget: response?.data[0]?.min_emi_budget,
          min_emi_budget_type: response?.data[0]?.min_emi_budget_type,
          max_emi_budget: response?.data[0]?.max_emi_budget,
          max_emi_budget_type: response?.data[0]?.max_emi_budget_type,
          marital_status: "",
          no_of_family_member: "",
          current_stay: "",
          property_type: "",
          preferred_bank: "",
        });
      }
    }
  }, [response]);

  function canShowProperty() {
    if (
      props?.formData?.mobile === "" ||
      props?.formData?.mobile === undefined ||
      props?.formData?.mobile === null
    ) {
      return false;
    } else if (
      props?.formData?.mobile &&
      props?.formData?.country_code === "+91" &&
      Regexs.mobilenumRegex.test(props?.formData?.mobile) === false
    ) {
      return false;
    } else if (
      props?.formData?.mobile &&
      props?.formData?.country_code !== "+91" &&
      props?.formData?.mobile?.length < 10
    ) {
      return false;
    } else {
      return true;
    }
  }

  return (
    <View style={styles.mainContainer}>
      <Header
        headerText={
          props.type == "edit" ? strings.editVisitor : strings.addnewvisitor
        }
        headerStyle={styles.headerStyle}
        leftImageSrc={images.backArrow}
        leftImageIconStyle={styles.RightFirstIconStyle}
        handleOnLeftIconPress={props.handleBackPress}
      />
      <ScrollView
        keyboardShouldPersistTaps={"handled"}
        style={{ flexGrow: 1 }}
        automaticallyAdjustKeyboardInsets={Isios ? true : false}
      >
        <View style={styles.wrap}>
          <Text style={styles.headingText}>{strings.visitordetails}</Text>
          <View style={styles.inputWrap}>
            <InputField
              require={true}
              disableSpecialCharacters={true}
              placeholderText={"Visitor Name"}
              handleInputBtnPress={() => {}}
              onChangeText={(data: any) => {
                props.setFormData({
                  ...props.formData,
                  first_name: data,
                });
              }}
              valueshow={props?.formData?.first_name}
              headingText={"Visitor Name"}
            />
          </View>

          <View
            style={[
              styles.inputWrap,
              { flexDirection: "row", justifyContent: "space-between" },
            ]}
          >
            {/* <View style={{ width: "35%" }}> */}
            <TouchableOpacity
              accessible={false}
              style={{ width: "35%" }}
              onPress={() => {
                props.setCountyPicker(true);
              }}
              activeOpacity={1.0}
            >
              <InputField
                require={true}
                disableSpecialCharacters={true}
                placeholderText={"Country"}
                valueshow={props?.formData?.country_code}
                headingText={"Country"}
                editable={false}
                countryCodeInput={true}
                rightImgSrc={images.downErrow}
                handleInputBtnPress={() => {
                  props.setCountyPicker(true);
                }}
                rightImageVw={[
                  styles.tickImgVw,
                  { backgroundColor: WHITE_COLOR },
                ]}
                rightImageSty={[
                  styles.tickImg,
                  {
                    tintColor: BLACK_COLOR,
                    height: normalizeHeight(15),
                    width: normalizeWidth(15),
                  },
                ]}
              />
            </TouchableOpacity>
            {/* </View> */}
            <View style={{ width: "60%" }}>
              <InputField
                require={true}
                disableSpecialCharacters={true}
                placeholderText={strings.mobileNo}
                handleInputBtnPress={() => {}}
                onChangeText={(data: any) => {
                  if (
                    props.type == "edit" ||
                    (props.type == "propertySelect" &&
                      props?.formData?.lead_source !==
                        CONST_IDS?.cp_lead_source_id)
                      ? true
                      : false
                  ) {
                    props.setFormData({
                      ...props.formData,
                      mobile: data,
                    });
                  } else {
                    props.setFormData({
                      ...props.formData,
                      mobile: data,
                      property_id: "",
                      property_type_title: "",
                      property_title: "",
                    });
                  }
                  // if (Regexs.mobilenumRegex.test(data)) {
                  //   props.setEmailMobValidation({
                  //     ...props.emailMobvalidation,
                  //     mobile: null,
                  //   });
                  // } else {
                  props.setEmailMobValidation({
                    ...props.emailMobvalidation,
                    mobile: null,
                  });
                  // }
                }}
                valueshow={props?.formData?.mobile}
                headingText={strings.mobileNo}
                keyboardtype={"number-pad"}
                maxLength={props?.formData?.country_code === "+91" ? 10 : 15}
                rightImageVw={styles.tickImgVw}
                rightImageSty={styles.tickImg}
                rightImgSrc={
                  props?.emailMobvalidation?.mobile === "mobile"
                    ? images.check
                    : null
                }
                onFocus={() => {
                  if (props?.formData?.mobile !== props?.formData?.mobile) {
                    props.setEmailMobValidation({
                      ...props.emailMobvalidation,
                      mobile: null,
                    });
                  }
                }}
                onBlur={(val: any) => {
                  // if (Regexs.mobilenumRegex.test(props?.formData?.mobile)) {
                  //   props.handleCheckEmailMobile();
                  // }
                }}
              />
            </View>
          </View>

          <View style={[styles.inputWrap]}>
            <DropdownInput
              headingText={"Lead Source"}
              placeholder={
                props.formData?.lead_source_title
                  ? props.formData?.lead_source_title
                  : "Lead Source"
              }
              data={
                leadsourcefilteredData?.length > 0 &&
                Array.isArray(leadsourcefilteredData)
                  ? leadsourcefilteredData
                  : []
              }
              onFocus={() => props.handleDropdownPress(13)}
              inputWidth={"100%"}
              require
              paddingLeft={Isios ? 6 : 10}
              maxHeight={300}
              labelField={"title"}
              valueField={"_id"}
              value={props?.formData?.lead_source}
              onChange={(item: any) => {
                if (
                  props?.formData?.lead_source === CONST_IDS?.cp_lead_source_id
                ) {
                  props.handleLeadSourcePressWhenNoCp();
                }
                props.setFormData({
                  ...props.formData,
                  lead_source: item._id,
                  lead_source_title: item.title,
                  cp_type: "",
                  cp_id: "",
                  cp_emp_id: "",
                  referrer_name: "",
                  referrer_contact: "",
                });

                if (
                  !(
                    userData?.userData?.data?.role_id ===
                      ROLE_IDS.closingtl_id ||
                    userData?.userData?.data?.role_id ===
                      ROLE_IDS.closingmanager_id ||
                    userData?.userData?.data?.role_id ===
                      ROLE_IDS.clusterhead_id ||
                    userData?.userData?.data?.role_id ===
                      ROLE_IDS.sitehead_id ||
                    userData?.userData?.data?.role_id ===
                      ROLE_IDS.businesshead_id
                  )
                ) {
                  props.setAllProperty([]);
                }
              }}
              newRenderItem={(item: any) => {
                return (
                  item.title !== "" && (
                    <>
                      <View style={Styles.item}>
                        <Text style={Styles.textItem}>{item.title}</Text>
                      </View>
                    </>
                  )
                );
              }}
            />
          </View>
          {props?.formData?.lead_source === CONST_IDS?.cp_lead_source_id ? (
            <>
              <View style={styles.inputWrap}>
                <DropdownInput
                  headingText={"Channel Partner type"}
                  placeholder={"Select Channel Partner type"}
                  data={CpType}
                  require
                  inputWidth={"100%"}
                  paddingLeft={Isios ? 6 : 10}
                  maxHeight={300}
                  labelField="label"
                  valueField={"value"}
                  value={props?.formData?.cp_type}
                  onChange={(item: any) => {
                    props.setFormData({
                      ...props.formData,
                      cp_type: item.value,
                      cp_id: "",
                      cp_emp_id: "",
                      property_id: "",
                      property_type_title: "",
                      property_title: "",
                    });
                    props.setAllProperty([]);
                  }}
                  newRenderItem={(item: any) => {
                    return (
                      <View style={Styles.item}>
                        <Text style={Styles.textItem}>{item.label}</Text>
                      </View>
                    );
                  }}
                />
              </View>
              {props.formData?.cp_type === 1 ? (
                <View style={styles.inputWrap}>
                  <DropdownInput
                    headingText={"CP Name"}
                    placeholder={"Select CP"}
                    search={true}
                    searchPlaceholder={strings.search + " " + strings.cp}
                    data={props?.dropdownAgentList}
                    inputWidth={"100%"}
                    require
                    paddingLeft={Isios ? 6 : 10}
                    maxHeight={300}
                    labelField="agent_name"
                    valueField={"_id"}
                    onFocus={() => props.handleCpNameDropdownPress()}
                    value={props?.formData?.cp_id}
                    onChange={(item: any) => {
                      props.setFormData({
                        ...props.formData,
                        cp_id: item._id,
                        property_id: "",
                        property_type_title: "",
                        property_title: "",
                      });
                      props.handleGetProperty(item._id);
                    }}
                    newRenderItem={(item: any) => {
                      return (
                        <View style={Styles.item}>
                          <Text style={Styles.textItem}>{item.agent_name}</Text>
                        </View>
                      );
                    }}
                  />
                </View>
              ) : props.formData?.cp_type === 2 ? (
                <>
                  <View style={styles.inputWrap}>
                    <DropdownInput
                      headingText={"CP Company Name"}
                      placeholder={"Select CP Company Name"}
                      search={true}
                      searchPlaceholder={strings.search + " " + strings.company}
                      data={props.companyList}
                      require
                      inputWidth={"100%"}
                      paddingLeft={Isios ? 6 : 10}
                      maxHeight={300}
                      labelField="agent_name"
                      valueField={"_id"}
                      onFocus={() => props.handleCompanyDropdownPress()}
                      value={props?.formData?.cp_id}
                      onChange={(item: any) => {
                        props.setFormData({
                          ...props.formData,
                          cp_id: item._id,
                          cp_emp_id: "",
                          property_id: "",
                          property_type_title: "",
                          property_title: "",
                        });
                        props.handleGetProperty(item._id);
                      }}
                      newRenderItem={(item: any) => {
                        return (
                          <View style={Styles.item}>
                            <Text style={Styles.textItem}>
                              {item.agent_name}
                            </Text>
                          </View>
                        );
                      }}
                    />
                  </View>
                  {props?.formData?.cp_id !== "" ? (
                    <View style={styles.inputWrap}>
                      <DropdownInput
                        headingText={"Company Employee name"}
                        placeholder={"Select Employee name"}
                        search={true}
                        searchPlaceholder={
                          strings.search + " " + strings.employee
                        }
                        data={props.employeeList}
                        inputWidth={"100%"}
                        paddingLeft={Isios ? 6 : 10}
                        maxHeight={300}
                        labelField="employee_name"
                        valueField={"user_id"}
                        onFocus={() => props.handleEmployeeDropdownPress()}
                        value={props?.formData?.cp_emp_id}
                        onChange={(item: any) => {
                          props.setFormData({
                            ...props.formData,
                            cp_emp_id: item.user_id,
                          });
                        }}
                        newRenderItem={(item: any) => {
                          return (
                            <View style={Styles.item}>
                              <Text style={Styles.textItem}>
                                {item.employee_name}
                              </Text>
                            </View>
                          );
                        }}
                      />
                    </View>
                  ) : null}
                </>
              ) : null}
            </>
          ) : null}
          {props?.formData?.lead_source === CONST_IDS?.ref_lead_source_id ? (
            <>
              <View style={styles.inputWrap}>
                <InputField
                  require={true}
                  disableSpecialCharacters={true}
                  placeholderText={strings.referrerNumber}
                  handleInputBtnPress={() => {}}
                  onChangeText={(data: any) => {
                    props.setFormData({
                      ...props.formData,
                      referrer_contact: data,
                    });
                  }}
                  valueshow={props?.formData?.referrer_contact}
                  headingText={strings.referrerNumber}
                  keyboardtype={"number-pad"}
                  maxLength={10}
                />
              </View>
              <View style={styles.inputWrap}>
                <InputField
                  require={true}
                  disableSpecialCharacters={true}
                  placeholderText={strings.referrerName}
                  headingText={strings.referrerName}
                  handleInputBtnPress={() => {}}
                  onChangeText={(data: any) => {
                    props.setFormData({
                      ...props.formData,
                      referrer_name: data,
                    });
                  }}
                  valueshow={props?.formData?.referrer_name}
                />
              </View>
            </>
          ) : null}

          <View style={[styles.inputWrap]}>
            <DropdownInput
              require={true}
              headingText={"Property"}
              placeholder={
                props.formData?.property_title
                  ? props.formData?.property_title
                  : "Property"
              }
              data={props?.allProperty.filter((item: any) => item.status == true)}
              disable={
                props.type == "edit" ||
                (props.type == "propertySelect" &&
                  props?.formData?.lead_source !== CONST_IDS?.cp_lead_source_id)
                  ? true
                  : false
              }
              inputWidth={"100%"}
              paddingLeft={16}
              maxHeight={300}
              labelField="property_title"
              valueField={"_id"}
              value={props?.formData?.property_id}
              onFocus={() => props.checkPhoneNumberIsValid()}
              onChange={(item: any) => {
                if (props?.allProperty?.length > 0) {
                  props.setFormData({
                    ...props.formData,
                    property_id: item.property_id,
                    property_type_title: item.property_type,
                    property_title: item.property_title,
                    // pickup: item?.pickup,
                  });
                  props.checkMobileExistWithSameProperty(item.property_id);
                }
              }}
              newRenderItem={(item: any) => {
                return (
                  <>
                    {canShowProperty() ? (
                      <View style={Styles.item}>
                        <Text style={Styles.textItem}>
                          {item.property_title}
                        </Text>
                      </View>
                    ) : null}
                  </>
                );
              }}
            />
          </View>
          <View
            style={[styles.genderView, { marginLeft: normalizeSpacing(20) }]}
          >
            <Text style={styles.headingsTxt}>{strings.gender}</Text>
            <RequiredStart />
            <View style={styles.radioView}>
              <RadioButton.Android
                value="1"
                status={props?.formData?.gender === 1 ? "checked" : "unchecked"}
                onPress={() =>
                  props.setFormData({
                    ...props.formData,
                    gender: 1,
                  })
                }
                color={PRIMARY_THEME_COLOR}
              />
              <Text
                style={[
                  styles.radioTxt,
                  {
                    color:
                      props?.formData?.gender === 1
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
                value="2"
                status={props?.formData?.gender === 2 ? "checked" : "unchecked"}
                onPress={() =>
                  props.setFormData({
                    ...props.formData,
                    gender: 2,
                  })
                }
                color={PRIMARY_THEME_COLOR}
              />
              <Text
                style={[
                  styles.radioTxt,
                  {
                    color:
                      props?.formData?.gender === 2
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
            <InputField
              disableSpecialCharacters={true}
              placeholderText={strings.whatsappNo}
              handleInputBtnPress={() => {}}
              onChangeText={(data: any) => {
                props.setFormData({
                  ...props.formData,
                  whatsapp_no: data,
                });
              }}
              valueshow={props?.formData?.whatsapp_no}
              headingText={strings.whatsappNo}
              keyboardtype={"number-pad"}
              maxLength={15}
            />
          </View>
          <View style={styles.inputWrap}>
            <InputField
              placeholderText={strings.email + " " + strings.address}
              handleInputBtnPress={() => {}}
              onChangeText={(data: any) => {
                props.setFormData({
                  ...props.formData,
                  email: data,
                });
              }}
              valueshow={props?.formData?.email}
              headingText={strings.email + " " + strings.address}
            />
          </View>
          <View style={styles.inputWrap}>
            <InputField
              placeholderText={"3675 9834 6012"}
              handleInputBtnPress={() => {}}
              onChangeText={(data: any) => {
                props.setFormData({
                  ...props.formData,
                  adhar_no: data,
                });
              }}
              valueshow={props?.formData?.adhar_no?.toString()}
              headingText={"Aadhaar No."}
              inputType={"aadhaar"}
              keyboardtype={"number-pad"}
              maxLength={14}
            />
          </View>
          <View style={styles.inputWrap}>
            <InputField
              disableSpecialCharacters={true}
              placeholderText={"BNZAA2318JM"}
              handleInputBtnPress={() => {}}
              onChangeText={(data: any) => {
                props.setFormData({
                  ...props.formData,
                  pancard_no: data,
                });
              }}
              valueshow={props?.formData?.pancard_no}
              headingText={"Pancard No."}
              maxLength={10}
            />
          </View>
          <View style={styles.inputWrap}>
            <InputCalender
              mode={"date"}
              leftIcon={images.event}
              placeholderText={strings.dateOfBirth}
              headingText={strings.dateOfBirth}
              editable={false}
              dateData={(data: any) => {
                props.setFormData({
                  ...props.formData,
                  birth_date: moment(data).format(DATE_FORMAT),
                });
              }}
              setDateshow={(data: any) => {
                props.setFormData({
                  ...props.formData,
                  birth_date: moment(data).format(DATE_FORMAT),
                });
              }}
              value={
                props?.formData?.birth_date === "" ||
                props?.formData?.birth_date === undefined ||
                props?.formData?.birth_date === null
                  ? ""
                  : moment(props?.formData?.birth_date).format(DATE_FORMAT)
              }
            />
          </View>

          <View style={styles.inputWrap}>
            <InputField
              placeholderText={"Location"}
              handleInputBtnPress={() => {}}
              onChangeText={(data: any) => {
                props.setFormData({
                  ...props.formData,
                  location: data,
                });
              }}
              valueshow={props?.formData?.location}
              headingText={"Location"}
              inputType={"location"}
              onPressSelect={(data: any, detail: any) => {
                props.setFormData({
                  ...props.formData,
                  location: data?.description,
                  latitude: detail?.geometry?.location?.lat,
                  longitude: detail?.geometry?.location?.lng,
                });
              }}
            />
          </View>
          <View style={styles.inputWrap}>
            <InputField
              disableSpecialCharacters={true}
              placeholderText={"Locality"}
              handleInputBtnPress={() => {}}
              onChangeText={(data: any) => {
                props.setFormData({
                  ...props.formData,
                  locality: data,
                });
              }}
              valueshow={props?.formData?.locality}
              headingText={"Locality"}
            />
          </View>
          <View style={[styles.inputWrap]}>
            <DropdownInput
              headingText={"Marital Status"}
              placeholder={
                props.formData?.marital_status
                  ? props.formData?.marital_status
                  : "Marital Status"
              }
              data={[
                { label: strings.Married, value: 2 },
                { label: strings.Unmarried, value: 1 },
              ]}
              inputWidth={"100%"}
              paddingLeft={Isios ? 6 : 10}
              maxHeight={300}
              labelField={"label"}
              valueField={"value"}
              value={props?.formData?.marital_status}
              onChange={(item: any) => {
                props.setFormData({
                  ...props.formData,
                  marital_status: item.value,
                });
              }}
              newRenderItem={(item: any) => {
                return (
                  <View style={Styles.item}>
                    <Text style={Styles.textItem}>{item.label}</Text>
                  </View>
                );
              }}
            />
          </View>
          <View
            style={[
              styles.inputWrap,
              {
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-around",
              },
            ]}
          >
            <Text
              style={[
                styles.headingsTxt,
                { width: "40%", textAlign: "center" },
              ]}
            >
              No. of family member
            </Text>
            <TextInput
              value={props?.formData?.no_of_family_member}
              onChangeText={(data: any) => {
                props.setFormData({
                  ...props.formData,
                  no_of_family_member: data,
                });
              }}
              keyboardType={"number-pad"}
              maxLength={2}
              placeholder="No. of family member"
              style={styles.budgetInput}
            />
          </View>

          <View style={[styles.inputWrap]}>
            <DropdownInput
              headingText={"Currently Staying As"}
              placeholder={
                props.formData?.current_stay
                  ? props.formData?.current_stay
                  : "Currently Staying As"
              }
              data={[
                { label: strings.Rented, value: strings.Rented },
                { label: strings.Owned, value: strings.Owned },
              ]}
              inputWidth={"100%"}
              paddingLeft={16}
              maxHeight={300}
              labelField={"label"}
              valueField={"value"}
              value={props?.formData?.current_stay}
              onChange={(item: any) => {
                props.setFormData({
                  ...props.formData,
                  current_stay: item.value,
                });
              }}
              newRenderItem={(item: any) => {
                return (
                  <View style={Styles.item}>
                    <Text style={Styles.textItem}>{item.label}</Text>
                  </View>
                );
              }}
            />
          </View>
          <View style={[styles.inputWrap]}>
            <DropdownInput
              headingText={"Property Type"}
              placeholder={
                props.formData?.property_type
                  ? props.formData?.property_type
                  : "Property Type"
              }
              data={[
                { label: strings.MoveIn, value: strings.MoveIn },
                {
                  label: strings.Underonstruction,
                  value: strings.Underonstruction,
                },
              ]}
              inputWidth={"100%"}
              paddingLeft={16}
              maxHeight={300}
              labelField={"label"}
              valueField={"value"}
              value={props?.formData?.property_type}
              onChange={(item: any) => {
                props.setFormData({
                  ...props.formData,
                  property_type: item.value,
                });
              }}
              newRenderItem={(item: any) => {
                return (
                  <View style={Styles.item}>
                    <Text style={Styles.textItem}>{item.label}</Text>
                  </View>
                );
              }}
            />
          </View>
          <View style={styles.radioBtnView}>
            <Text style={styles.headingsTxt}>Preferred Bank</Text>
            <View style={{ flexDirection: "row" }}>
              <View style={styles.radioView}>
                <RadioButton.Android
                  value={strings.yes}
                  status={
                    props?.formData?.preferred_bank === strings.yes
                      ? "checked"
                      : "unchecked"
                  }
                  onPress={() =>
                    props.setFormData({
                      ...props.formData,
                      preferred_bank: strings.yes,
                    })
                  }
                  color={PRIMARY_THEME_COLOR}
                />
                <Text
                  style={[
                    styles.radioTxt,
                    {
                      color:
                        props?.formData?.preferred_bank === strings.yes
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
                  value={strings.no}
                  status={
                    props?.formData?.preferred_bank === strings.no
                      ? "checked"
                      : "unchecked"
                  }
                  onPress={() =>
                    props.setFormData({
                      ...props.formData,
                      preferred_bank: strings.no,
                    })
                  }
                  color={PRIMARY_THEME_COLOR}
                />
                <Text
                  style={[
                    styles.radioTxt,
                    {
                      color:
                        props?.formData?.preferred_bank === strings.no
                          ? PRIMARY_THEME_COLOR
                          : BLACK_COLOR,
                    },
                  ]}
                >
                  {strings.no}
                </Text>
              </View>
            </View>
          </View>
          <Text style={[styles.headingText, { marginTop: 20 }]}>
            {strings.propertyrequire}
          </Text>
          <View style={[styles.inputWrap]}>
            <DropdownInput
              headingText={strings.configurations}
              placeholder={
                props.formData?.configuration
                  ? props.formData?.configuration
                  : strings.configurations
              }
              data={
                Array.isArray(props?.configuration) ? props?.configuration : []
              }
              inputWidth={"100%"}
              onFocus={() => props.handleDropdownPress(2)}
              paddingLeft={16}
              maxHeight={300}
              labelField={"title"}
              valueField={"_id"}
              value={props?.formData?.configuration_id}
              onChange={(item: any) => {
                console.log(item);

                props.setFormData({
                  ...props.formData,
                  configuration_id: item._id,
                  configuration: item.title,
                });
              }}
              newRenderItem={(item: any) => {
                return (
                  item.title !== "" && (
                    <>
                      <View style={Styles.item}>
                        <Text style={Styles.textItem}>{item.title}</Text>
                      </View>
                    </>
                  )
                );
              }}
            />
          </View>
          <View style={styles.inputWrap}>
            <InputCalender
              mode={"date"}
              leftIcon={images.event}
              placeholderText={"Expected Possession Date"}
              headingText={"Expected Possession Date"}
              editable={false}
              minimumDate={new Date()}
              dateData={(data: any) => {
                props.setFormData({
                  ...props.formData,
                  expected_possession_date: moment(data).format(DATE_FORMAT),
                });
              }}
              setDateshow={(data: any) => {
                props.setFormData({
                  ...props.formData,
                  expected_possession_date: moment(data).format(DATE_FORMAT),
                });
              }}
              value={
                props?.formData?.expected_possession_date === "" ||
                props?.formData?.expected_possession_date === undefined ||
                props?.formData?.expected_possession_date === null
                  ? ""
                  : moment(props?.formData?.expected_possession_date).format(
                      DATE_FORMAT
                    )
              }
            />
          </View>
          <View style={styles.inputWrap}>
            <InputField
              disableSpecialCharacters={true}
              placeholderText={"Area(Sq ft.)"}
              handleInputBtnPress={() => {}}
              onChangeText={(data: any) => {
                props.setFormData({
                  ...props.formData,
                  areain_sqlft: data,
                });
              }}
              maxLength={10}
              valueshow={props?.formData?.areain_sqlft}
              headingText={"Area(Sq ft.)"}
              keyboardtype={"number-pad"}
              // keyboardtype={'phone-pad'}
            />
          </View>
          <View style={styles.smallCont}>
            <Text style={[styles.headingsTxt, { width: "56%" }]}>
              Min Budget
            </Text>
            <Text style={[styles.headingsTxt, { width: "50%" }]}>
              Max Budget
            </Text>
          </View>
          <View style={styles.inputContVw}>
            <View style={styles.smallContVw}>
              <TextInput
                value={props?.formData?.min_budget?.toString()}
                onChangeText={(data: any) => {
                  props.setFormData({
                    ...props.formData,
                    min_budget: data,
                  });
                }}
                maxLength={4}
                keyboardType={"number-pad"}
                placeholder="Min Budget"
                style={styles.budgetInput}
              />
              <DropdownInput
                inputWidth={Isios ? 45 : 49}
                inputheight={Isios ? 20 : 38}
                paddingLeft={Isios ? 6 : 10}
                itemContainerStyle={{ width: 100 }}
                iconStyle={{ width: 15, height: 15 }}
                data={AMOUNT_TYPE}
                itemTextStyle={{ fontSize: 8 }}
                labelField="value"
                valueField={"value"}
                placeholder={props?.formData?.min_budget_type}
                value={props?.formData?.min_budget_type}
                onChange={(item: any) => {
                  props.setFormData({
                    ...props.formData,
                    min_budget_type: item.value,
                  });
                }}
                newRenderItem={(item: any) => {
                  return (
                    <>
                      <View style={Styles.item}>
                        <Text style={Styles.textItem}>{item.value}</Text>
                      </View>
                    </>
                  );
                }}
              />
            </View>
            <View style={[styles.smallContVw, { justifyContent: "flex-end" }]}>
              <TextInput
                value={props?.formData?.max_budget}
                onChangeText={(data: any) => {
                  props.setFormData({
                    ...props.formData,
                    max_budget: data,
                  });
                }}
                keyboardType={"number-pad"}
                maxLength={4}
                placeholder="Max Budget"
                style={styles.budgetInput}
              />
              <DropdownInput
                inputWidth={Isios ? 45 : 49}
                inputheight={Isios ? 20 : 38}
                paddingLeft={Isios ? 6 : 10}
                itemContainerStyle={{ width: 100 }}
                iconStyle={{ width: 15, height: 15 }}
                data={AMOUNT_TYPE}
                itemTextStyle={{ fontSize: 8 }}
                labelField="value"
                valueField={"value"}
                placeholder={props?.formData?.max_budget_type}
                value={props?.formData?.max_budget_type}
                onChange={(item: any) => {
                  props.setFormData({
                    ...props.formData,
                    max_budget_type: item.value,
                  });
                }}
                newRenderItem={(item: any) => {
                  return (
                    <>
                      <View style={Styles.item}>
                        <Text style={Styles.textItem}>{item.value}</Text>
                      </View>
                    </>
                  );
                }}
              />
            </View>
          </View>
          <View style={styles.radioBtnView}>
            <Text style={styles.headingsTxt}>Nature Of Funding</Text>
            <View style={{ flexDirection: "row" }}>
              <View style={styles.radioView}>
                <RadioButton.Android
                  value="loan"
                  status={
                    props?.formData?.funding_type === "loan"
                      ? "checked"
                      : "unchecked"
                  }
                  onPress={() =>
                    props.setFormData({
                      ...props.formData,
                      funding_type: "loan",
                    })
                  }
                  color={PRIMARY_THEME_COLOR}
                />
                <Text
                  style={[
                    styles.radioTxt,
                    {
                      color:
                        props?.formData?.funding_type === "loan"
                          ? PRIMARY_THEME_COLOR
                          : BLACK_COLOR,
                    },
                  ]}
                >
                  Loan
                </Text>
              </View>
              <View style={styles.radioView}>
                <RadioButton.Android
                  value="self"
                  status={
                    props?.formData?.funding_type === "self"
                      ? "checked"
                      : "unchecked"
                  }
                  onPress={() =>
                    props.setFormData({
                      ...props.formData,
                      funding_type: "self",
                    })
                  }
                  color={PRIMARY_THEME_COLOR}
                />
                <Text
                  style={[
                    styles.radioTxt,
                    {
                      color:
                        props?.formData?.funding_type === "self"
                          ? PRIMARY_THEME_COLOR
                          : BLACK_COLOR,
                    },
                  ]}
                >
                  Self Funding
                </Text>
              </View>
              <View style={styles.radioView}>
                <RadioButton.Android
                  value="both"
                  status={
                    props?.formData?.funding_type === "both"
                      ? "checked"
                      : "unchecked"
                  }
                  onPress={() =>
                    props.setFormData({
                      ...props.formData,
                      funding_type: "both",
                    })
                  }
                  color={PRIMARY_THEME_COLOR}
                />
                <Text
                  style={[
                    styles.radioTxt,
                    {
                      color:
                        props?.formData?.funding_type === "both"
                          ? PRIMARY_THEME_COLOR
                          : BLACK_COLOR,
                    },
                  ]}
                >
                  Both
                </Text>
              </View>
            </View>
          </View>
          <View style={styles.smallCont}>
            <Text style={[styles.headingsTxt, { width: "56%" }]}>
              Min EMI Pay
            </Text>
            <Text style={[styles.headingsTxt, { width: "50%" }]}>
              Max EMI Pay
            </Text>
          </View>
          <View style={styles.inputContVw}>
            <View style={styles.smallContVw}>
              <TextInput
                value={props?.formData?.min_emi_budget?.toString()}
                onChangeText={(data: any) => {
                  props.setFormData({
                    ...props.formData,
                    min_emi_budget: data,
                  });
                }}
                maxLength={4}
                keyboardType={"number-pad"}
                placeholder="Min EMI Pay"
                style={styles.budgetInput}
              />
              <DropdownInput
                inputWidth={Isios ? 45 : 49}
                inputheight={Isios ? 20 : 38}
                paddingLeft={Isios ? 6 : 10}
                itemContainerStyle={{ width: 100 }}
                iconStyle={{ width: 15, height: 15 }}
                data={AMOUNT_TYPE}
                itemTextStyle={{ fontSize: 8 }}
                labelField="value"
                valueField={"value"}
                placeholder={props?.formData?.min_emi_budget_type}
                value={props?.formData?.min_emi_budget_type}
                onChange={(item: any) => {
                  props.setFormData({
                    ...props.formData,
                    min_emi_budget_type: item.value,
                  });
                }}
                newRenderItem={(item: any) => {
                  return (
                    <>
                      <View style={Styles.item}>
                        <Text style={Styles.textItem}>{item.value}</Text>
                      </View>
                    </>
                  );
                }}
              />
            </View>
            <View style={[styles.smallContVw, { justifyContent: "flex-end" }]}>
              <TextInput
                value={props?.formData?.max_emi_budget}
                onChangeText={(data: any) => {
                  props.setFormData({
                    ...props.formData,
                    max_emi_budget: data,
                  });
                }}
                keyboardType={"number-pad"}
                maxLength={4}
                placeholder="Max EMI Pay"
                style={styles.budgetInput}
              />
              <DropdownInput
                inputWidth={Isios ? 45 : 49}
                inputheight={Isios ? 20 : 38}
                paddingLeft={Isios ? 6 : 10}
                itemContainerStyle={{ width: 100 }}
                iconStyle={{ width: 15, height: 15 }}
                data={AMOUNT_TYPE}
                itemTextStyle={{ fontSize: 8 }}
                labelField="value"
                valueField={"value"}
                placeholder={props?.formData?.max_emi_budget_type}
                value={props?.formData?.max_emi_budget_type}
                onChange={(item: any) => {
                  props.setFormData({
                    ...props.formData,
                    max_emi_budget_type: item.value,
                  });
                }}
                newRenderItem={(item: any) => {
                  return (
                    <>
                      <View style={Styles.item}>
                        <Text style={Styles.textItem}>{item.value}</Text>
                      </View>
                    </>
                  );
                }}
              />
            </View>
          </View>
          <View style={styles.radioBtnView}>
            <Text style={styles.headingsTxt}>Purpose</Text>
            <View style={{ flexDirection: "row" }}>
              <View style={styles.radioView}>
                <RadioButton.Android
                  value="end user"
                  status={
                    props?.formData?.purpose === "end user"
                      ? "checked"
                      : "unchecked"
                  }
                  onPress={() =>
                    props.setFormData({
                      ...props.formData,
                      purpose: "end user",
                    })
                  }
                  color={PRIMARY_THEME_COLOR}
                />
                <Text
                  style={[
                    styles.radioTxt,
                    {
                      color:
                        props?.formData?.purpose === "end user"
                          ? PRIMARY_THEME_COLOR
                          : BLACK_COLOR,
                    },
                  ]}
                >
                  End User
                </Text>
              </View>
              <View style={styles.radioView}>
                <RadioButton.Android
                  value="invest"
                  status={
                    props?.formData?.purpose === "invest"
                      ? "checked"
                      : "unchecked"
                  }
                  onPress={() =>
                    props.setFormData({
                      ...props.formData,
                      purpose: "invest",
                    })
                  }
                  color={PRIMARY_THEME_COLOR}
                />
                <Text
                  style={[
                    styles.radioTxt,
                    {
                      color:
                        props?.formData?.purpose === "invest"
                          ? PRIMARY_THEME_COLOR
                          : BLACK_COLOR,
                    },
                  ]}
                >
                  Investment
                </Text>
              </View>
            </View>
          </View>
          <Text style={styles.headingText}>Company Details</Text>
          <View style={styles.radioBtnView}>
            <Text style={styles.headingsTxt}>Occupation</Text>
            <View
              style={{
                flexDirection: "row",
                width: "100%",
                flexWrap: "wrap",
                alignSelf: "center",
              }}
            >
              <View style={styles.radioView}>
                <RadioButton.Android
                  value="salaried"
                  status={
                    props?.formData?.occupation === "salaried"
                      ? "checked"
                      : "unchecked"
                  }
                  onPress={() =>
                    props.setFormData({
                      ...props.formData,
                      occupation: "salaried",
                    })
                  }
                  color={PRIMARY_THEME_COLOR}
                />
                <Text
                  style={[
                    styles.radioTxt,
                    {
                      color:
                        props?.formData?.occupation === "salaried"
                          ? PRIMARY_THEME_COLOR
                          : BLACK_COLOR,
                    },
                  ]}
                >
                  Salaried
                </Text>
              </View>
              <View style={styles.radioView}>
                <RadioButton.Android
                  value="self employee"
                  status={
                    props?.formData?.occupation === "self employee"
                      ? "checked"
                      : "unchecked"
                  }
                  onPress={() =>
                    props.setFormData({
                      ...props.formData,
                      occupation: "self employee",
                    })
                  }
                  color={PRIMARY_THEME_COLOR}
                />
                <Text
                  style={[
                    styles.radioTxt,
                    {
                      color:
                        props?.formData?.occupation === "self employee"
                          ? PRIMARY_THEME_COLOR
                          : BLACK_COLOR,
                    },
                  ]}
                >
                  Self Employed
                </Text>
              </View>
              <View style={styles.radioView}>
                <RadioButton.Android
                  value="professional"
                  status={
                    props?.formData?.occupation === "professional"
                      ? "checked"
                      : "unchecked"
                  }
                  onPress={() =>
                    props.setFormData({
                      ...props.formData,
                      occupation: "professional",
                    })
                  }
                  color={PRIMARY_THEME_COLOR}
                />
                <Text
                  style={[
                    styles.radioTxt,
                    {
                      color:
                        props?.formData?.occupation === "professional"
                          ? PRIMARY_THEME_COLOR
                          : BLACK_COLOR,
                    },
                  ]}
                >
                  Professional
                </Text>
              </View>
            </View>
          </View>
          <View style={styles.inputWrap}>
            <InputField
              disableSpecialCharacters={true}
              placeholderText={"Company Name"}
              handleInputBtnPress={() => {}}
              onChangeText={(data: any) => {
                props.setFormData({
                  ...props.formData,
                  coumpany_name: data,
                });
              }}
              valueshow={props?.formData?.coumpany_name}
              headingText={"Company Name"}
            />
          </View>
          <View style={styles.inputWrap}>
            <InputField
              disableSpecialCharacters={true}
              placeholderText={"Designation"}
              handleInputBtnPress={() => {}}
              onChangeText={(data: any) => {
                props.setFormData({
                  ...props.formData,
                  desigantion: data,
                });
              }}
              valueshow={props?.formData?.desigantion}
              headingText={"Designation"}
            />
          </View>
          <View style={styles.inputWrap}>
            <InputField
              placeholderText={"Office Address"}
              handleInputBtnPress={() => {}}
              onChangeText={(data: any) => {
                props.setFormData({
                  ...props.formData,
                  office_address: data,
                });
              }}
              valueshow={props?.formData?.office_address}
              headingText={"Office Address"}
            />
          </View>
          <View style={styles.inputWrap}>
            <InputField
              placeholderText={"Remark"}
              handleInputBtnPress={() => {}}
              onChangeText={(data: any) => {
                props.setFormData({
                  ...props.formData,
                  remark: data,
                });
              }}
              valueshow={props?.formData?.remark}
              headingText={"Remark"}
            />
          </View>
          <View style={styles.bottomView}>
            <View style={styles.bottomContentView}>
              <CheckBox
                value={true}
                disabled={true}
                tintColors={{ true: PRIMARY_THEME_COLOR }}
                style={{
                  transform: Isios
                    ? [{ scaleX: 0.8 }, { scaleY: 0.8 }]
                    : [{ scaleX: 1 }, { scaleY: 1 }],
                }}
                // onValueChange={(newValue) => setToggleCheckBox(newValue)}
              />
              <Text style={styles.bottomText}>{strings.iAknowledge}</Text>
            </View>
            <TouchableOpacity
              onPress={() =>
                Linking.openURL("https://justoverse.com/termandcondition")
              }
              style={styles.spanTouch}
            >
              <Text style={styles.spanText}> {strings.termsAndCondition} </Text>
            </TouchableOpacity>
            <Text style={styles.bottomText}> {strings.applicable} </Text>
          </View>
          <View
            style={[
              styles.btnView,
              !Cmteam ? {} : { justifyContent: "center" },
            ]}
          >
            {props.type == "edit" ? (
              <Button
                width={150}
                height={45}
                buttonText={strings.editVisitor}
                btnTxtsize={16}
                disabled={props.disabled}
                handleBtnPress={() => {
                  Isios && Keyboard.dismiss();
                  props.setNavigationType(1);
                  props.OnpressCreateEdit();
                }}
              />
            ) : (
              <>
                <Button
                  width={Cmteam ? 300 : 150}
                  disabled={props.disabled}
                  handleBtnPress={() => {
                    Isios && Keyboard.dismiss();
                    props.setNavigationType(1);
                    props.OnpressCreateEdit();
                  }}
                  height={45}
                  buttonText={strings.createVisitor}
                  btnTxtsize={16}
                />
                {!Cmteam
                  ? create && (
                      <Button
                        width={150}
                        disabled={props.disabled}
                        handleBtnPress={() => {
                          Isios && Keyboard.dismiss();
                          props.setNavigationType(2);
                          props.OnpressseheduleVisit();
                        }}
                        height={45}
                        buttonText={strings.createandschedule}
                        btnTxtsize={14}
                      />
                    )
                  : null}
              </>
            )}
          </View>
          <VisitConfirmModal
            Visible={props.visitCheckModal}
            setIsVisible={props.setVisitCheckModal}
            setFormData={props?.setFormData}
            formData={props?.formData}
          />
        </View>
      </ScrollView>

      <JustForOkModal
        headertitle="Message"
        message={props.mobileerror}
        onPressRightButton={props.onPressRightButton}
        Visible={props.okIsVisible}
        setIsVisible={props.setOkIsVisible}
      />
      <CountryPickerModal
        countyPicker={props.countyPicker}
        setCountyPicker={props.setCountyPicker}
        handleCountryCode={props.handleCountryCode}
        handleCloseCountry={props.handleCloseCountry}
        countryData={props.countryData}
        selectCountryData={props.selectCountryData}
        countryCode={props?.formData?.country_code}
      />
    </View>
  );
};

export default AddNewVisitorForm;
