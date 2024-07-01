import {
  Image,
  ScrollView,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import { RadioButton } from "react-native-paper";
import Header from "../../../../components/Header";
import strings from "../../../../components/utilities/Localization";
import styles from "./styles";
import {
  BLACK_COLOR,
  DATE_FORMAT,
  GRAY_COLOR,
  Isios,
  PRIMARY_THEME_COLOR,
  Regexs,
  validateEmail,
} from "../../../../components/utilities/constant";
import InputField from "../../../../components/InputField";
import images from "../../../../assets/images";
import Button from "../../../../components/Button";
import InputCalender from "app/components/InputCalender";
import moment from "moment";
import MultiLocation from "app/components/MultiLocation";
import { RequiredStart } from "app/components/utilities/GlobalFuncations";

const AgentBasicInfoView = (props: any) => {
  const handleDelete = (item: any, index: any) => {
    var array: any[] = [...props?.agencyData?.working_location];
    array?.splice(index, 1);
    props?.setAgencyData({
      ...props?.agencyData,
      working_location: array,
    });
  };
  return (
    <View style={styles.mainContainer}>
      <Header
        headerText={strings.basicInfoText}
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
                  : props?.agencyData?.profile_base_url + props?.agencyData?.profile_picture,
              }}
              resizeMode="contain"
            />
          ) : (
            <View style={styles.imageCircle}>
              <Image
                style={styles.loginBanner}
                source={
                  props.agencyData?.profile_picture?.uri ?
                    {
                      uri: props.agencyData?.profile_picture?.uri
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
        <View style={styles.inputWrap}>
          <InputField
            disableSpecialCharacters={true}
            require={true}
            placeholderText={strings.cp + " " + strings.name}
            handleInputBtnPress={() => { }}
            headingText={strings.cp + " " + strings.name}
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
            require={true}
            placeholderText={"3675 9834 6012"}
            inputType={'aadhaar'}
            handleInputBtnPress={() => { }}
            headingText={strings.aadhaar}
            valueshow={props.agencyData?.adhar_no}
            keyboardtype={'number-pad'}
            onChangeText={(val: any) => {
              props.setAgencyData({
                ...props.agencyData,
                adhar_no: val,
              });
            }}
            maxLength={14}
          />
        </View>
        <View style={styles.inputWrap}>
          <InputField
            // require={true}
            disableSpecialCharacters={true}
            placeholderText={"BNZAA2318JM"}
            handleInputBtnPress={() => { }}
            headingText={strings.pancard + " " + strings.shortNum}
            valueshow={props.agencyData?.pancard_no}
            onChangeText={(val: any) => {
              props.setAgencyData({
                ...props.agencyData,
                pancard_no: val,
              });
            }}
            maxLength={10}
          />
        </View>
        <View style={styles.genderView}>
          <Text style={styles.genderTxt}>{strings.gender}</Text>
          {/* <RequiredStart /> */}
          <View style={styles.radioView}>
            <RadioButton.Android
              value={props.agencyData?.gender}
              status={props.agencyData.gender === 1 ? "checked" : "unchecked"}
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
              status={props.agencyData.gender === 2 ? "checked" : "unchecked"}
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
              props?.agencyData?.date_of_birth == "" || props?.agencyData?.date_of_birth == null
              ? ""
              : moment(props?.agencyData?.date_of_birth).format(DATE_FORMAT)
            }
          />
        </View>
        <View style={styles.inputWrap}>
          <InputField
            disableSpecialCharacters={true}
            require={true}
            placeholderText={strings.mobileNo}
            handleInputBtnPress={() => { }}
            headingText={strings.mobileNo}
            valueshow={props.agencyData?.primary_mobile?.toString()}
            keyboardtype={'number-pad'}
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
                  primary_mobile: 'mobileStart',
                })
                props.setEmailMobileChng({
                  ...props.emailMobileChng,
                  onmobile: 'onmobile',
                })
              } else {
                props.setEmailMobValidation({
                  ...props.emailMobvalidation,
                  primary_mobile: null,
                })
                props.setEmailMobileChng({
                  ...props.emailMobileChng,
                  onmobile: null,
                })
              }
            }}
            rightImageVw={styles.tickImgVw}
            rightImageSty={styles.tickImg}
            rightImgSrc={props?.emailMobvalidation?.primary_mobile === 'mobile' ? images.check : null}
            onFocus={() => {
              if (props.agencyData?.primary_mobile !== props.agencyData?.primary_mobile) {
                props.setEmailMobValidation({
                  ...props.emailMobvalidation,
                  primary_mobile: null,
                })
              }
            }}
            onBlur={(val: any) => {
              if (Regexs.mobilenumRegex.test(props.agencyData?.primary_mobile)) {
                if (props.agencyData?.setprimary_mobile?.toString() !==
                  props.agencyData?.primary_mobile?.toString()) {
                  props.handleCheckEmailMobile(1);
                }
                props.setEmailMobValidation({
                  ...props.emailMobvalidation,
                  primary_mobile: null,
                })
                props.setEmailMobileChng({
                  ...props.emailMobileChng,
                  onmobile: '',
                })
              }
            }}
          />
        </View>
        <View style={styles.inputWrap}>
          <InputField
            disableSpecialCharacters={true}
            // require={true}
            placeholderText={strings.whatsappNo}
            handleInputBtnPress={() => { }}
            headingText={strings.whatsappNo}
            valueshow={props.agencyData?.whatsapp_number?.toString()}
            keyboardtype={'number-pad'}
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
            require={true}
            placeholderText={strings.email + " " + strings.address}
            handleInputBtnPress={() => { }}
            headingText={strings.email + " " + strings.address}
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
                  email: 'emailStart',
                })
                props.setEmailMobileChng({
                  ...props.emailMobileChng,
                  onemail: 'onemail',
                })
              } else {
                props.setEmailMobValidation({
                  ...props.emailMobvalidation,
                  email: null,
                })
                props.setEmailMobileChng({
                  ...props.emailMobileChng,
                  onemail: null,
                })
              }
            }}
            onFocus={() => {
              if (props.agencyData?.email !== props.agencyData?.email) {
                props.setEmailMobValidation({
                  ...props.emailMobvalidation,
                  email: null,
                })
              }
            }}
            rightImgSrc={props?.emailMobvalidation?.email === 'email' ? images.check : null}
            rightImageVw={styles.tickImgVw}
            rightImageSty={styles.tickImg}
            onBlur={(val: any) => {
              if (validateEmail.test(props.agencyData.email)) {
                if (props.agencyData?.setemail?.toString() !== props.agencyData?.email?.toString()) {
                  props.handleCheckEmailMobile();
                }
                props.setEmailMobValidation({
                  ...props.emailMobvalidation,
                  email: null,
                })
                props.setEmailMobileChng({
                  ...props.emailMobileChng,
                  onemail: '',
                })
              }
            }}
          />
        </View>
        <View style={styles.inputWrap}>
          <InputField
            require={true}
            placeholderText={strings.address}
            headingText={strings.address}
            valueshow={props.agencyData?.location}
            onChangeText={(val: any) => {
              props.setAgencyData({
                ...props.agencyData,
                location: val,
              });
            }}
            inputType={'location'}
            onPressSelect={(data: any, detail: any) => {
              props.setAgencyData({
                ...props.agencyData,
                location: data?.description,
                latitude: detail?.geometry?.location?.lat,
                longitude: detail?.geometry?.location?.lng,
              })
            }}
          />
        </View>
        {/*  <View style={styles.inputWrap}>
          <InputField
            placeholderText={"Sourcing Manager"}
            handleInputBtnPress={() => {}}
            onChangeText={() => {}}
            headingText={"Sourcing Manager"}
          />
        </View> */}
        <View style={styles.workingView}>
          <View
            style={{
              top: props.agencyData?.working_location?.length > 0 ? 5 : 0,
              flexDirection: 'row', alignItems: 'center'
            }}
          >
            <Text style={styles.workTxt}>{strings.workingLocation}</Text>
            {/* <RequiredStart /> */}
          </View>
          <TouchableOpacity
            onPress={() => props.setLocationModel(true)}
            style={styles.addBtn}
          >
            <Text style={styles.addTxt}>+ {strings.addLocation}</Text>
          </TouchableOpacity>
        </View>
        {props.agencyData?.working_location?.length > 0 ? (
          <View style={styles.inputBoxVw}>
            {props.agencyData?.working_location?.map(
              (item: any, index: any) => {
                return (
                  <View
                    style={[
                      styles.inputBoxItmVw,
                      {
                        borderBottomWidth:
                          props?.agencyData?.working_location?.length - 1 ===
                            index
                            ? 0
                            : 0.6,
                      },
                    ]}
                  >
                    <Text style={styles.inputBoxItmTxt}>{item.location}</Text>
                    <TouchableOpacity onPress={() => handleDelete(item, index)}>
                      <Image source={images.close} style={styles.crossVw} />
                    </TouchableOpacity>
                  </View>
                );
              }
            )}
          </View>
        ) : null}

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
    </View>
  );
};

export default AgentBasicInfoView;
