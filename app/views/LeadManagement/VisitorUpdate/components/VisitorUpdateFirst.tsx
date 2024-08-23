import React from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  TextInput,
} from "react-native";
import styles from "./styles";
import TopScreensViewer from "./TopScreensViewer";
import Header from "../../../../components/Header";
import images from "../../../../assets/images";
import strings from "../../../../components/utilities/Localization";
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
import InputField from "../../../../components/InputField";
import { RadioButton } from "react-native-paper";
import Button from "../../../../components/Button";
import {
  normalize,
  normalizeSpacing,
} from "../../../../components/scaleFontSize";
import moment from "moment";
import InputCalender from "app/components/InputCalender";
import DropdownInput from "app/components/DropDown";
import Styles from "../../../../components/Modals/styles";
import { useSelector } from "react-redux";
import { CpType } from "app/components/utilities/DemoData";
import CountryPickerModal from "app/components/Modals/CountryPickerModal";
import JustForOkModal from "app/components/Modals/JustForOkModal";

const VisitorUpdateView = (props: any) => {
  const { userData = {} } = useSelector((state: any) => state.userData);
  const userId = userData?.data ? userData?.data : {};
  const id = userData?.data?.role_id;

  const Cmteam =
    ROLE_IDS.closingtl_id === id || ROLE_IDS.closingmanager_id === id;
  const SMteam =
    ROLE_IDS.sourcingtl_id === id || ROLE_IDS.sourcingmanager_id === id;

  const leadsourcefilteredData: any = props.masterDatas.filter((obj: any) =>
    Cmteam
      ? obj.title !== "Channel Partner"
      : SMteam
      ? obj.title === "Channel Partner"
      : obj.title !== ""
  );
  return (
    <View style={styles.mainContainer}>
      <Header
        leftImageSrc={images.backArrow}
        rightSecondImageScr={images.notification}
        headerText={strings.visitor + " " + strings.update}
        headerStyle={styles.headerStyle}
        RightFirstIconStyle={styles.leftImageIconStyle}
        leftImageIconStyle={styles.leftImageIconStyle}
        handleOnLeftIconPress={props.handleBackPress}
        barStyle={"light-content"}
        statusBarColor={PRIMARY_THEME_COLOR}
      />
      <View style={styles.noMoveVw}>
        {/* <TopScreensViewer type={props.screenType} /> */}
      </View>
      <ScrollView
        keyboardShouldPersistTaps={"handled"}
        automaticallyAdjustKeyboardInsets={Isios ? true : false}
        contentContainerStyle={styles.wrap}
      >
        {/* <View style={styles.inputWrap}>
          {props?.updateForm?.property_id !== "" &&
          props?.updateForm?.property_id !== null ? (
            <InputField
              placeholderText={"Name"}
              editable={false}
              handleInputBtnPress={() => {}}
              onChangeText={(text: any) => {
                props.setUpdateForm({
                  ...props.updateForm,
                  property_title: text,
                });
              }}
              valueshow={props?.updateForm?.property_title}
              headingText={"Property Name"}
            />
          ) : (
            <DropdownInput
              // require={true}
              headingText={"Property Name"}
              placeholder={
                props.updateForm?.property_title
                  ? props.updateForm?.property_title
                  : "Property"
              }
              data={props?.allProperty}
              // disable={props.type == 'edit' || props.type == 'propertySelect' ? true : false}
              inputWidth={"100%"}
              paddingLeft={16}
              maxHeight={300}
              labelField="property_title"
              valueField={"_id"}
              value={props?.updateForm?.propertyuid}
              onChange={(item: any) => {
                props.setUpdateForm({
                  ...props.updateForm,
                  property_id: item.property_id,
                  property_type_title: item.property_type,
                  property_title: item.property_title,
                });
              }}
              newRenderItem={(item: any) => {
                return (
                  <>
                    <View style={Styles.item}>
                      <Text style={Styles.textItem}>{item.property_title}</Text>
                    </View>
                  </>
                );
              }}
            />
          )}
        </View> */}
        <View style={styles.typeVw}>
          <Text style={styles.typeTxt}>Visitor Details</Text>
          <View style={styles.typeBorders} />
        </View>
        <View style={styles.inputWrap}>
          <InputField
            disableSpecialCharacters={true}
            placeholderText={"Name"}
            editable={
              userData?.data?.role_id === ROLE_IDS.closingtl_id ||
              userData?.data?.role_id === ROLE_IDS.closingmanager_id
                ? false
                : true
            }
            handleInputBtnPress={() => {}}
            onChangeText={(text: any) => {
              props.setUpdateForm({
                ...props.updateForm,
                first_name: text,
              });
            }}
            valueshow={props?.updateForm?.first_name}
            headingText={"Visitor Name"}
          />
        </View>
        <View
          style={[
            styles.inputWrap,
            { flexDirection: "row", justifyContent: "space-between" },
          ]}
        >
          <View style={{ width: "35%" }}>
            <TouchableOpacity
              accessible={false}
              style={{}}
              onPress={() => {
                if (
                  props?.updateForm?.create_by === userId._id ? true : false
                ) {
                  props.setCountyPicker(true);
                }
              }}
              activeOpacity={1.0}
            >
              <InputField
                require={true}
                disableSpecialCharacters={true}
                placeholderText={"Country"}
                // handleInputBtnPress={() => {}}
                valueshow={props?.updateForm?.country_code}
                headingText={"Country"}
                editable={false}
                countryCodeInput={true}
                rightImgSrc={images.downErrow}
                handleInputBtnPress={() => {
                  if (
                    props?.updateForm?.create_by === userId._id ? true : false
                  ) {
                    props.setCountyPicker(true);
                  }
                }}
                rightImageVw={[
                  styles.tickImgVw,
                  { backgroundColor: WHITE_COLOR },
                ]}
                rightImageSty={[styles.tickImg, { tintColor: BLACK_COLOR }]}
              />
            </TouchableOpacity>
          </View>
          <View style={{ width: "60%" }}>
            <InputField
              disableSpecialCharacters={true}
              placeholderText={strings.mobileNo}
              handleInputBtnPress={() => {}}
              onChangeText={(text: any) => {
                props.setUpdateForm({
                  ...props.updateForm,
                  mobile: text,
                });
              }}
              editable={
                props?.updateForm?.create_by === userId._id ? true : false
              }
              valueshow={
                props?.updateForm?.create_by === userId._id
                  ? props?.updateForm?.mobile?.toString()
                  : `${props?.updateForm?.mobile?.slice(
                      0,
                      2
                    )}******${props?.updateForm?.mobile?.slice(-2)}`
              }
              headingText={"Mobile No."}
              keyboardtype={"number-pad"}
              maxLength={props?.updateForm?.country_code === "+91" ? 10 : 15}
              onBlur={(val: any) => {
                if (
                  props?.updateForm?.mobile_number != props?.updateForm?.mobile
                ) {
                  if (
                    Regexs.mobilenumRegex.test(props?.updateForm?.mobile) &&
                    props?.updateForm?.property_id
                  ) {
                    props.checkMobileExistWithSameProperty(
                      props?.updateForm?.property_id
                    );
                  }
                }
              }}
            />
          </View>
        </View>
        <View style={[styles.inputWrap]}>
          <DropdownInput
            headingText={"Lead Source"}
            placeholder={
              props.updateForm?.lead_source
                ? props.updateForm?.lead_source
                : "Lead Source"
            }
            disable={
              userData?.data?.role_id === ROLE_IDS.closingtl_id ||
              userData?.data?.role_id === ROLE_IDS.closingmanager_id
                ? true
                : false
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
            value={props?.updateForm?.lead_source}
            onChange={(item: any) => {
              console.log("item: ", item);
              if (
                props?.updateForm?.lead_source_id ===
                  CONST_IDS?.cp_lead_source_id ||
                props?.updateForm?.lead_source_id ===
                  CONST_IDS?.by_self_lead_source_id
              ) {
                props.handleLeadSourcePressWhenNoCp();
              }
              props.setUpdateForm({
                ...props.updateForm,
                lead_source: item._id,
                lead_source_id: item._id,
                lead_source_title: item.title,
                cp_type: "",
                cp_id: "",
                cp_emp_id: "",
                referrer_name: "",
                referrer_contact: "",
              });
              if (
                !(
                  userData?.data?.role_id === ROLE_IDS.closingtl_id ||
                  userData?.data?.role_id === ROLE_IDS.closingmanager_id ||
                  userData?.data?.role_id === ROLE_IDS.clusterhead_id ||
                  userData?.data?.role_id === ROLE_IDS.sitehead_id ||
                  userData?.data?.role_id === ROLE_IDS.businesshead_id
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
        {props?.updateForm?.lead_source_id === CONST_IDS?.cp_lead_source_id ||
        props?.updateForm?.lead_source_id ===
          CONST_IDS?.by_self_lead_source_id ? (
          <>
            <View style={styles.inputWrap}>
              <DropdownInput
                headingText={"Channel Partner type"}
                placeholder={"Select Channel Partner type"}
                data={CpType}
                require
                disable={
                  userData?.data?.role_id === ROLE_IDS.closingtl_id ||
                  userData?.data?.role_id === ROLE_IDS.closingmanager_id
                    ? true
                    : false
                }
                inputWidth={"100%"}
                paddingLeft={Isios ? 6 : 10}
                maxHeight={300}
                labelField="label"
                valueField={"value"}
                value={props?.updateForm?.cp_type}
                onChange={(item: any) => {
                  props.setUpdateForm({
                    ...props.updateForm,
                    cp_type: item.value,
                    cp_id: "",
                    cp_emp_id: "",
                    property_id: "",
                    property_type_title: "",
                    property_title: "",
                    cp_name: "",
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
            {props.updateForm?.cp_type === 1 ? (
              <View style={styles.inputWrap}>
                <DropdownInput
                  headingText={"CP Name"}
                  placeholder={
                    props.updateForm?.cp_name
                      ? props.updateForm?.cp_name
                      : "Select CP"
                  }
                  data={props?.dropdownAgentList}
                  inputWidth={"100%"}
                  require
                  disable={
                    userData?.data?.role_id === ROLE_IDS.closingtl_id ||
                    userData?.data?.role_id === ROLE_IDS.closingmanager_id
                      ? true
                      : false
                  }
                  paddingLeft={Isios ? 6 : 10}
                  maxHeight={300}
                  labelField="agent_name"
                  valueField={"_id"}
                  onFocus={() => props.handleCpNameDropdownPress()}
                  value={props?.updateForm?.cp_id}
                  onChange={(item: any) => {
                    props.setUpdateForm({
                      ...props.updateForm,
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
            ) : props.updateForm?.cp_type === 2 ? (
              <>
                <View style={styles.inputWrap}>
                  <DropdownInput
                    headingText={"CP Company Name"}
                    placeholder={
                      props.updateForm?.cp_name
                        ? props.updateForm?.cp_name
                        : "Select CP Company Name"
                    }
                    data={props.companyList}
                    require
                    disable={
                      userData?.data?.role_id === ROLE_IDS.closingtl_id ||
                      userData?.data?.role_id === ROLE_IDS.closingmanager_id
                        ? true
                        : false
                    }
                    inputWidth={"100%"}
                    paddingLeft={Isios ? 6 : 10}
                    maxHeight={300}
                    labelField="agent_name"
                    valueField={"_id"}
                    onFocus={() => props.handleCompanyDropdownPress()}
                    value={props?.updateForm?.cp_id}
                    onChange={(item: any) => {
                      props.setUpdateForm({
                        ...props.updateForm,
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
                          <Text style={Styles.textItem}>{item.agent_name}</Text>
                        </View>
                      );
                    }}
                  />
                </View>
                {props?.updateForm?.cp_id !== "" ? (
                  <View style={styles.inputWrap}>
                    <DropdownInput
                      headingText={"Company Employee name"}
                      placeholder={"Select Employee name"}
                      data={props.employeeList}
                      inputWidth={"100%"}
                      paddingLeft={Isios ? 6 : 10}
                      maxHeight={300}
                      disable={
                        userData?.data?.role_id === ROLE_IDS.closingtl_id ||
                        userData?.data?.role_id === ROLE_IDS.closingmanager_id
                          ? true
                          : false
                      }
                      labelField="employee_name"
                      valueField={"user_id"}
                      onFocus={() => props.handleEmployeeDropdownPress()}
                      value={props?.updateForm?.cp_emp_id}
                      onChange={(item: any) => {
                        props.setUpdateForm({
                          ...props.updateForm,
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

        {props?.updateForm?.lead_source_id === CONST_IDS?.ref_lead_source_id ? (
          <>
            <View style={styles.inputWrap}>
              <InputField
                require={true}
                disableSpecialCharacters={true}
                placeholderText={strings.referrerNumber}
                handleInputBtnPress={() => {}}
                onChangeText={(data: any) => {
                  props.setUpdateForm({
                    ...props.updateForm,
                    referrer_contact: data,
                  });
                }}
                valueshow={props?.updateForm?.referrer_contact}
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
                  props.setUpdateForm({
                    ...props.updateForm,
                    referrer_name: data,
                  });
                }}
                valueshow={props?.updateForm?.referrer_name}
              />
            </View>
          </>
        ) : null}

        <View style={styles.inputWrap}>
          <DropdownInput
            require={true}
            disable={
              userData?.data?.role_id === ROLE_IDS.closingtl_id ||
              userData?.data?.role_id === ROLE_IDS.closingmanager_id
                ? true
                : false
            }
            headingText={"Property Name"}
            placeholder={
              props.updateForm?.property_title
                ? props.updateForm?.property_title
                : "Property"
            }
            data={props?.allProperty}
            // disable={props.type == 'edit' || props.type == 'propertySelect' ? true : false}
            inputWidth={"100%"}
            paddingLeft={16}
            maxHeight={300}
            labelField="property_title"
            valueField={"_id"}
            value={props?.updateForm?.propertyuid}
            onChange={(item: any) => {
              props.setUpdateForm({
                ...props.updateForm,
                property_id: item.property_id,
                property_type_title: item.property_type,
                property_title: item.property_title,
              });
            }}
            newRenderItem={(item: any) => {
              return (
                <>
                  <View style={Styles.item}>
                    <Text style={Styles.textItem}>{item.property_title}</Text>
                  </View>
                </>
              );
            }}
          />
        </View>
        <View style={styles.inputWrap}>
          <InputField
            placeholderText={"3675 9834 6012"}
            handleInputBtnPress={() => {}}
            onChangeText={(text: any) => {
              props.setUpdateForm({
                ...props.updateForm,
                adhar_no: text,
              });
            }}
            valueshow={props?.updateForm?.adhar_no?.toString()}
            headingText={"Aadhaar No."}
            inputType={"aadhaar"}
            maxLength={14}
            keyboardtype={"number-pad"}
          />
        </View>
        <View style={styles.inputWrap}>
          <InputField
            disableSpecialCharacters={true}
            placeholderText={"BNZAA2318JM"}
            handleInputBtnPress={() => {}}
            onChangeText={(text: any) => {
              props.setUpdateForm({
                ...props.updateForm,
                pancard_no: text,
              });
            }}
            valueshow={props?.updateForm?.pancard_no?.toString()}
            headingText={"Pancard No."}
            maxLength={10}
          />
        </View>
        <View style={styles.selectsView}>
          <Text style={styles.selectsTxt}>{strings.gender}</Text>
          <View style={styles.radioView}>
            <RadioButton.Android
              value="1"
              status={props.updateForm.gender === 1 ? "checked" : "unchecked"}
              onPress={() =>
                props.setUpdateForm({
                  ...props.updateForm,
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
                    props.updateForm.gender === 1
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
              status={props.updateForm.gender === 2 ? "checked" : "unchecked"}
              onPress={() =>
                props.setUpdateForm({
                  ...props.updateForm,
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
                    props.updateForm.gender === 2
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
            leftIcon={images.event}
            mode={"date"}
            placeholderText={strings.dateOfBirth}
            headingText={strings.dateOfBirth}
            editable={false}
            dateData={(data: any) => {
              props.setUpdateForm({
                ...props.updateForm,
                birth_date: moment(data).format(DATE_FORMAT),
              });
            }}
            setDateshow={(data: any) => {
              props.setUpdateForm({
                ...props.updateForm,
                birth_date: moment(data).format(DATE_FORMAT),
              });
            }}
            value={
              props?.updateForm?.birth_date === "" ||
              props?.updateForm?.birth_date === undefined ||
              props?.updateForm?.birth_date === null
                ? ""
                : moment(props?.updateForm?.birth_date).format(DATE_FORMAT)
            }
          />
        </View>
        <View style={styles.inputWrap}>
          <InputField
            disableSpecialCharacters={true}
            placeholderText={strings.whatsappNo}
            handleInputBtnPress={() => {}}
            onChangeText={(text: any) => {
              props.setUpdateForm({
                ...props.updateForm,
                whatsapp_no: text,
              });
            }}
            valueshow={props?.updateForm?.whatsapp_no?.toString()}
            headingText={strings.whatsappNo}
            keyboardtype={"number-pad"}
            maxLength={15}
          />
        </View>
        <View style={styles.inputWrap}>
          <InputField
            placeholderText={strings.email + " " + strings.address}
            handleInputBtnPress={() => {}}
            onChangeText={(text: any) => {
              props.setUpdateForm({
                ...props.updateForm,
                email: text,
              });
            }}
            valueshow={props?.updateForm?.email}
            headingText={strings.email + " " + strings.address}
          />
        </View>
        <View style={[styles.inputWrap, { marginBottom: normalize(10) }]}>
          {/* <InputField
            inputType={"location"}
            placeholderText={"Location"}
            headingText={"Location"}
            valueshow={props?.updateForm?.location}
            onChangeText={(data: any) => {
              props.setUpdateForm({
                ...props.updateForm,
                location: data ? data : props?.updateForm?.location,
              });
            }}
            onPressSelect={(data: any, detail: any) => {
              props.setUpdateForm({
                ...props.updateForm,
                location: data?.description,
                latitude: detail?.geometry?.location?.lat,
                longitude: detail?.geometry?.location?.lng,
              });
            }}
          /> */}

          <InputField
            placeholderText={"Location"}
            handleInputBtnPress={() => {}}
            onChangeText={(data: any) => {
              props.setUpdateForm({
                ...props.updateForm,
                location: data,
              });
            }}
            valueshow={props?.updateForm?.location}
            headingText={"Location"}
            inputType={"location"}
            onPressSelect={(data: any, detail: any) => {
              props.setUpdateForm({
                ...props.updateForm,
                location: data?.description,
                latitude: detail?.geometry?.location?.lat,
                longitude: detail?.geometry?.location?.lng,
              });
            }}
          />
        </View>
        <View style={[styles.inputWrap, { marginBottom: normalize(10) }]}>
          <InputField
            disableSpecialCharacters={true}
            placeholderText={"Locality"}
            handleInputBtnPress={() => {}}
            onChangeText={(text: any) => {
              props.setUpdateForm({
                ...props.updateForm,
                locality: text,
              });
            }}
            valueshow={props?.updateForm?.locality}
            headingText={"Locality"}
          />
        </View>
        <View style={[styles.inputWrap]}>
          <DropdownInput
            headingText={"Marital Status"}
            placeholder={
              props.updateForm?.marital_status
                ? props.updateForm?.marital_status?.toString() === "1"
                  ? strings.Unmarried
                  : props.updateForm?.marital_status?.toString() === "2" &&
                    strings.Married
                : "Marital Status"
            }
            data={[
              { label: strings.Married, value: 2 },
              { label: strings.Unmarried, value: 1 },
            ]}
            inputWidth={"100%"}
            paddingLeft={16}
            maxHeight={300}
            labelField={"label"}
            valueField={"value"}
            value={props?.updateForm?.marital_status}
            onChange={(item: any) => {
              props.setUpdateForm({
                ...props.updateForm,
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
            style={[styles.selectsTxt, { width: "40%", textAlign: "center" }]}
          >
            No. of family member
          </Text>
          <TextInput
            value={props?.updateForm?.no_of_family_member?.toString()}
            onChangeText={(data: any) => {
              props.setUpdateForm({
                ...props.updateForm,
                no_of_family_member: data,
              });
            }}
            maxLength={2}
            keyboardType={"number-pad"}
            placeholder="No. of family member"
            style={styles.budgetInput}
          />
        </View>

        <View style={[styles.inputWrap]}>
          <DropdownInput
            headingText={"Currently Staying As"}
            placeholder={
              props.updateForm?.current_stay
                ? props.updateForm?.current_stay
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
            value={props?.updateForm?.current_stay}
            onChange={(item: any) => {
              props.setUpdateForm({
                ...props.updateForm,
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
              props.updateForm?.property_type
                ? props.updateForm?.property_type
                : "Property Type"
            }
            data={[
              { label: strings.MoveIn, value: strings.MoveIn },
              { label: strings.Underonstruction, value: strings.MoveIn },
            ]}
            inputWidth={"100%"}
            paddingLeft={16}
            maxHeight={300}
            labelField={"label"}
            valueField={"value"}
            value={props?.updateForm?.property_type}
            onChange={(item: any) => {
              props.setUpdateForm({
                ...props.updateForm,
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
          <Text style={styles.selectsTxt}>Preferred Bank</Text>
          <View style={{ flexDirection: "row" }}>
            <View style={styles.radioView}>
              <RadioButton.Android
                value={strings.yes}
                status={
                  props?.updateForm?.preferred_bank === strings.yes
                    ? "checked"
                    : "unchecked"
                }
                onPress={() =>
                  props.setUpdateForm({
                    ...props.updateForm,
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
                      props?.updateForm?.preferred_bank === strings.yes
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
                  props?.updateForm?.preferred_bank === strings.no
                    ? "checked"
                    : "unchecked"
                }
                onPress={() =>
                  props.setUpdateForm({
                    ...props.updateForm,
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
                      props?.updateForm?.preferred_bank === strings.no
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
        <View style={styles.typeVw}>
          <Text style={styles.typeTxt}>Property Required</Text>
          <View style={styles.typeBorders} />
        </View>
        <View style={[styles.inputWrap, { marginTop: normalizeSpacing(16) }]}>
          <DropdownInput
            headingText={strings.configurations}
            placeholder={
              props.updateForm?.configuration
                ? props.updateForm?.configuration
                : strings.configurations
            }
            data={
              Array.isArray(props?.configuration) ? props?.configuration : []
            }
            onFocus={() => props.handleDropdownPress(2)}
            inputWidth={"100%"}
            paddingLeft={16}
            maxHeight={300}
            labelField={"title"}
            valueField={"_id"}
            value={props?.updateForm?.configuration_id}
            onChange={(item: any) => {
              props.setUpdateForm({
                ...props.updateForm,
                configuration_id: item._id,
                configuration: item.title,
              });
            }}
            newRenderItem={(item: any) => {
              return (
                <>
                  <View style={Styles.item}>
                    <Text style={Styles.textItem}>{item.title}</Text>
                  </View>
                </>
              );
            }}
          />
        </View>
        <View style={styles.inputWrap}>
          <InputCalender
            leftIcon={images.event}
            mode={"date"}
            placeholderText={"Expected Possession Date"}
            headingText={"Expected Possession Date"}
            editable={false}
            minimumDate={new Date()}
            dateData={(data: any) => {
              props.setUpdateForm({
                ...props.updateForm,
                expected_possession_date: moment(data).format(DATE_FORMAT),
              });
            }}
            setDateshow={(data: any) => {
              props.setUpdateForm({
                ...props.updateForm,
                expected_possession_date: moment(data).format(DATE_FORMAT),
              });
            }}
            value={
              props?.updateForm?.expected_possession_date === "" ||
              props?.updateForm?.expected_possession_date === undefined ||
              props?.updateForm?.expected_possession_date === null
                ? ""
                : moment(props?.updateForm?.expected_possession_date).format(
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
            onChangeText={(text: any) => {
              props.setUpdateForm({
                ...props.updateForm,
                areain_sqlft: text,
              });
            }}
            maxLength={10}
            valueshow={props?.updateForm?.areain_sqlft?.toString()}
            headingText={"Area(Sq ft.)"}
            keyboardtype={"number-pad"}
          />
        </View>
        <View style={styles.smallCont}>
          <Text style={[styles.headingsTxt, { width: "56%" }]}>Min Budget</Text>
          <Text style={[styles.headingsTxt, { width: "50%" }]}>Max Budget</Text>
        </View>
        <View style={styles.inputContVw}>
          <View style={styles.smallContVw}>
            <TextInput
              value={props?.updateForm?.min_budget?.toString()}
              onChangeText={(data: any) => {
                props.setUpdateForm({
                  ...props.updateForm,
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
              placeholder={props?.updateForm?.min_budget_type}
              value={props?.updateForm?.min_budget_type}
              onChange={(item: any) => {
                props.setUpdateForm({
                  ...props.updateForm,
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
              value={props?.updateForm?.max_budget?.toString()}
              onChangeText={(data: any) => {
                props.setUpdateForm({
                  ...props.updateForm,
                  max_budget: data,
                });
              }}
              maxLength={4}
              keyboardType={"number-pad"}
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
              placeholder={props?.updateForm?.max_budget_type}
              value={props?.updateForm?.max_budget_type}
              onChange={(item: any) => {
                props.setUpdateForm({
                  ...props.updateForm,
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
        <View style={styles.selectsView}>
          <Text style={styles.selectsTxt}>{"Nature Of Fuding"}</Text>
        </View>
        <View style={styles.straightVw}>
          <View style={[styles.radioView, { marginHorizontal: 0 }]}>
            <RadioButton.Android
              value={props.updateForm?.funding_type}
              status={
                props.updateForm.funding_type === "loan"
                  ? "checked"
                  : "unchecked"
              }
              onPress={() =>
                props.setUpdateForm({
                  ...props.updateForm,
                  funding_type: "loan",
                })
              }
              color={PRIMARY_THEME_COLOR}
            />
            <Text style={styles.checkTxt}>{"Loan"}</Text>
          </View>
          <View style={[styles.radioView, { marginHorizontal: 0 }]}>
            <RadioButton.Android
              value={props.updateForm?.funding_type}
              status={
                props.updateForm.funding_type === "self"
                  ? "checked"
                  : "unchecked"
              }
              onPress={() =>
                props.setUpdateForm({
                  ...props.updateForm,
                  funding_type: "self",
                })
              }
              color={PRIMARY_THEME_COLOR}
            />
            <Text style={styles.checkTxt}>{"Self Funding"}</Text>
          </View>
          <View style={[styles.radioView, { marginHorizontal: 0 }]}>
            <RadioButton.Android
              value={props.updateForm?.funding_type}
              status={
                props.updateForm.funding_type === "both"
                  ? "checked"
                  : "unchecked"
              }
              onPress={() =>
                props.setUpdateForm({
                  ...props.updateForm,
                  funding_type: "both",
                })
              }
              color={PRIMARY_THEME_COLOR}
            />
            <Text style={styles.checkTxt}>{"Both"}</Text>
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
              value={props?.updateForm?.min_emi_budget?.toString()}
              onChangeText={(data: any) => {
                props.setUpdateForm({
                  ...props.updateForm,
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
              placeholder={props?.updateForm?.min_emi_budget_type}
              value={props?.updateForm?.min_emi_budget_type}
              onChange={(item: any) => {
                props.setUpdateForm({
                  ...props.updateForm,
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
              value={props?.updateForm?.max_emi_budget}
              onChangeText={(data: any) => {
                props.setUpdateForm({
                  ...props.updateForm,
                  max_emi_budget: data,
                });
              }}
              maxLength={4}
              keyboardType={"number-pad"}
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
              placeholder={props?.updateForm?.max_emi_budget_type}
              value={props?.updateForm?.max_emi_budget_type}
              onChange={(item: any) => {
                props.setUpdateForm({
                  ...props.updateForm,
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
        <View style={styles.selectsView}>
          <Text style={styles.selectsTxt}>{"Purpose"}</Text>
        </View>
        <View style={[styles.straightVw, { width: "80%" }]}>
          <View style={[styles.radioView, { marginHorizontal: 0 }]}>
            <RadioButton.Android
              value={props.updateForm?.purpose}
              status={
                props.updateForm.purpose === "end user"
                  ? "checked"
                  : "unchecked"
              }
              onPress={() =>
                props.setUpdateForm({
                  ...props.updateForm,
                  purpose: "end user",
                })
              }
              color={PRIMARY_THEME_COLOR}
            />
            <Text style={styles.checkTxt}>{"End User"}</Text>
          </View>
          <View style={[styles.radioView, { marginHorizontal: 0 }]}>
            <RadioButton.Android
              value={props.updateForm?.purpose}
              status={
                props.updateForm.purpose === "invest" ? "checked" : "unchecked"
              }
              onPress={() =>
                props.setUpdateForm({
                  ...props.updateForm,
                  purpose: "invest",
                })
              }
              color={PRIMARY_THEME_COLOR}
            />
            <Text style={styles.checkTxt}>{"Investment"}</Text>
          </View>
        </View>
        <View style={styles.typeVw}>
          <Text style={styles.typeTxt}>Occupation Details</Text>
          <View style={styles.typeBorders} />
        </View>
        <View style={styles.selectsView}>
          <Text style={styles.selectsTxt}>{"Occupation"}</Text>
        </View>
        <View style={styles.straightVw}>
          <View style={[styles.radioView, {}]}>
            <RadioButton.Android
              value={props.updateForm?.occupation}
              status={
                props.updateForm.occupation === "salaried"
                  ? "checked"
                  : "unchecked"
              }
              onPress={() =>
                props.setUpdateForm({
                  ...props.updateForm,
                  occupation: "salaried",
                })
              }
              color={PRIMARY_THEME_COLOR}
            />
            <Text style={styles.checkTxt}>{"Salaried"}</Text>
          </View>
          <View style={[styles.radioView, {}]}>
            <RadioButton.Android
              value={props.updateForm?.occupation}
              status={
                props.updateForm.occupation === "self employee"
                  ? "checked"
                  : "unchecked"
              }
              onPress={() =>
                props.setUpdateForm({
                  ...props.updateForm,
                  occupation: "self employee",
                })
              }
              color={PRIMARY_THEME_COLOR}
            />
            <Text style={styles.checkTxt}>{"Self Employed"}</Text>
          </View>
          <View style={[styles.radioView, {}]}>
            <RadioButton.Android
              value={props.updateForm?.occupation}
              status={
                props.updateForm.occupation === "professional"
                  ? "checked"
                  : "unchecked"
              }
              onPress={() =>
                props.setUpdateForm({
                  ...props.updateForm,
                  occupation: "professional",
                })
              }
              color={PRIMARY_THEME_COLOR}
            />
            <Text style={styles.checkTxt}>{"Professional"}</Text>
          </View>
        </View>
        <View style={styles.inputWrap}>
          <InputField
            disableSpecialCharacters={true}
            placeholderText={"Company Name"}
            handleInputBtnPress={() => {}}
            onChangeText={(text: any) => {
              props.setUpdateForm({
                ...props.updateForm,
                coumpany_name: text,
              });
            }}
            valueshow={props?.updateForm?.coumpany_name}
            headingText={"Company Name"}
          />
        </View>
        <View style={styles.inputWrap}>
          <InputField
            disableSpecialCharacters={true}
            placeholderText={"Designation"}
            handleInputBtnPress={() => {}}
            onChangeText={(text: any) => {
              props.setUpdateForm({
                ...props.updateForm,
                desigantion: text,
              });
            }}
            valueshow={props?.updateForm?.desigantion}
            headingText={"Designation"}
          />
        </View>
        <View style={styles.inputWrap}>
          <InputField
            placeholderText={"Office Address"}
            handleInputBtnPress={() => {}}
            onChangeText={(text: any) => {
              props.setUpdateForm({
                ...props.updateForm,
                office_address: text,
              });
            }}
            valueshow={props?.updateForm?.office_address}
            headingText={"Office Address"}
          />
        </View>
        {/* 63ecd90787f864d94a3882ee */}
        {/* 63ecd94387f864d94a38838d */}
        {/* <View style={[styles.inputWrap]}>
                        <DropdownInput
                            headingText={'Lead Source'}
                            placeholder={props.updateForm?.lead_source ?
                                props.updateForm?.lead_source: 'Lead Source'}
                            data={props?.masterDatas?.length > 0 && Array.isArray(props?.masterDatas) ? props?.masterDatas : []}
                            onFocus={() => props.handleDropdownPress(13)}
                            inputWidth={'100%'}
                            require
                            paddingLeft={16}
                            maxHeight={300}
                            labelField={"title"}
                            valueField={'_id'}
                            value={props?.updateForm?.lead_source}
                            onChange={(item: any) => {
                                props.setUpdateForm({
                                    ...props.updateForm,
                                    lead_source: item._id,
                                    lead_source_title: item.title
                                })
                            }}
                            newRenderItem={(item: any) => {
                                return item.title !== "" && (
                                    <>
                                        <View style={Styles.item}>
                                            <Text style={Styles.textItem}>{item.title}</Text>
                                        </View>
                                    </>
                                );
                            }}
                        />
                    </View> */}
        <View style={styles.inputWrap}>
          <InputField
            placeholderText={"Remark"}
            handleInputBtnPress={() => {}}
            onChangeText={(text: any) => {
              props.setUpdateForm({
                ...props.updateForm,
                remark: text,
              });
            }}
            valueshow={props?.updateForm?.remark}
            headingText={"Remark"}
          />
        </View>
        <View style={styles.inputWrap}>
          <Button
            // handleBtnPress={(type: any) => props.onPressNext(1)}
            // rightImage={images.forwardArrow}
            handleBtnPress={(type: any) => props.onPressNext(null)}
            buttonText={strings.update}
            textTransform={"uppercase"}
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
        countryCode={props?.updateForm?.country_code}
      />
    </View>
  );
};
export default VisitorUpdateView;
