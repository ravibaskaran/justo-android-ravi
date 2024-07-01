import React, { useState } from "react";
import { View, Text, ScrollView, TouchableOpacity, Image, Keyboard } from "react-native";
import images from "../../../../assets/images";
import Header from "../../../../components/Header";
import InputField from "../../../../components/InputField";
import styles from "./styles";
import { RadioButton } from "react-native-paper";
import {
  BLACK_COLOR,
  DATE_FORMAT,
  GRAY_COLOR,
  Isios,
  PRIMARY_THEME_COLOR,
  ROLE_IDS,
  WHITE_COLOR,
} from "../../../../components/utilities/constant";
import Button from "../../../../components/Button";
import strings from "../../../../components/utilities/Localization";
import PicturePickerModal from "../../../../components/Modals/PicturePicker";
import moment from "moment";
import InputCalender from "app/components/InputCalender";
import DropdownInput from "app/components/DropDown";
import { normalizeSpacing } from "app/components/scaleFontSize";
import { RequiredStart } from "app/components/utilities/GlobalFuncations";
import CityModal from "app/components/Modals/CityModal";

const AddNewCMView = (props: any) => {
  const [profile, setProfile] = React.useState(false);
  const [ShowCity, setShowCity] = useState(false);
  return (
    <View style={styles.mainContainer}>
      <Header
        // headerText={strings.addNewCM}
        headerText={
          props?.type === "edit" ? strings.editUser : strings.addNewUser
        }
        headerStyle={styles.headerStyle}
        headerTextStyle={styles.headerTextStyle}
        leftImageSrc={images.backArrow}
        rightSecondImageScr={images.notification}
        RightSecondIconStyle={{ tintColor: WHITE_COLOR }}
        leftImageIconStyle={{ tintColor: WHITE_COLOR }}
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
          onPress={() => setProfile(true)}
          style={[styles.imageCircle]}
        >
          {props.addNewUserData?.profile_picture?.uri ||
          props.addNewUserData?.profile_picture != "" ? (
            <Image
              style={styles.loginBanner}
              source={{
                uri: props.addNewUserData?.profile_picture?.uri
                  ? props.addNewUserData?.profile_picture?.uri
                  : props.addNewUserData?.profile_picture,
              }}
              resizeMode="contain"
            />
          ) : (
            <Image
              style={styles.DummyloginBanner}
              source={images.user}
              resizeMode="contain"
            />
          )}
          <View style={styles.editView}>
            <Image
              style={styles.editImage}
              source={images.edit}
              resizeMode="contain"
            />
          </View>
        </TouchableOpacity>
        {props?.type === "edit" ? null : <View style={styles.inputWrap}>
          <DropdownInput
            headingText={"Select Role"}
            placeholder={"Role"}
            data={props?.roleData}
            inputWidth={"100%"}
            // disable={true}
            paddingLeft={16}
            maxHeight={300}
            // onFocus={() => props.handlegetRoleList()}
            labelField="role_title"
            valueField={"_id"}
            value={props.addNewUserData?.role_id}
            onChange={(item: any) => {
              props.setAddNewUserData({
                ...props?.addNewUserData,
                role_id: item._id,
              });
            }}
            newRenderItem={(item: any) => {
              return (
                <>
                  <View style={styles.item}>
                    <Text style={styles.textItem}>{item?.role_title}</Text>
                  </View>
                </>
              );
            }}
          />
        </View>}
        {props?.type === "edit" ? null : (props?.addNewUserData.role_id === ROLE_IDS.sourcingmanager_id ||
        props?.addNewUserData.role_id === ROLE_IDS.closingmanager_id ? (
          <View style={styles.inputWrap}>
            <DropdownInput
              headingText={
                props?.addNewUserData.role_id === ROLE_IDS.sourcingmanager_id
                  ? "Select Sourcing TL"
                  : props?.addNewUserData.role_id === ROLE_IDS.closingmanager_id
                  ? "Select Closing TL"
                  : ""
              }
              placeholder={"Select user"}
              data={props?.userList}
              inputWidth={"100%"}
              // disable={true}
              require={true}
              paddingLeft={16}
              maxHeight={300}
              onFocus={() => props.handleGetTLlist()}
              labelField="user_name"
              valueField={"_id"}
              value={props?.addNewUserData?.sourcing_head}
              onChange={(item: any) => {
                props.setAddNewUserData({
                  ...props.addNewUserData,
                  sourcing_head: item._id,
                });
              }}
              newRenderItem={(item: any) => {
                return (
                  <>
                    <View style={styles.item}>
                      <Text style={styles.textItem}>{item?.user_name}</Text>
                    </View>
                  </>
                );
              }}
            />
          </View>
        ) : null)}
        {props?.type === "edit" ? null : <View style={styles.inputWrap}>
          <DropdownInput
            headingText={"Select Property"}
            placeholder={"Property"}
            data={props.propertyList}
            inputWidth={"100%"}
            // disable={true}
            paddingLeft={16}
            maxHeight={300}
            // onFocus={() => props.handlegetPropertyList()}
            labelField="property_title"
            valueField={"_id"}
            value={props.addNewUserData?.property_id}
            onChange={(item: any) => {
              props.setAddNewUserData({
                ...props.addNewUserData,
                property_id: item._id,
              });
            }}
            newRenderItem={(item: any) => {
              return (
                <>
                  <View style={styles.item}>
                    <Text style={styles.textItem}>{item.property_title}</Text>
                  </View>
                </>
              );
            }}
          />
        </View>}
        <View style={styles.inputWrap}>
          <InputField
            disableSpecialCharacters={true}
            require={true}
            placeholderText={"First Name"}
            handleInputBtnPress={() => {}}
            headingText={"First Name"}
            onChangeText={(val: any) => {
              props.setAddNewUserData({
                ...props?.addNewUserData,
                firstname: val,
              });
            }}
            valueshow={props?.addNewUserData?.firstname}
          />
        </View>
        <View style={styles.inputWrap}>
          <InputField
            disableSpecialCharacters={true}
            require={true}
            placeholderText={"Last Name"}
            handleInputBtnPress={() => {}}
            headingText={"Last Name"}
            onChangeText={(val: any) => {
              props.setAddNewUserData({
                ...props?.addNewUserData,
                lastname: val,
              });
            }}
            valueshow={props?.addNewUserData?.lastname}
          />
        </View>
        <View style={styles.inputWrap}>
          <InputField
            require={true}
            placeholderText={"3675 9834 6012"}
            handleInputBtnPress={() => {}}
            headingText={"Aadhaar No."}
            inputType={"aadhaar"}
            onChangeText={(val: any) => {
              props.setAddNewUserData({
                ...props?.addNewUserData,
                adhar_no: val,
              });
            }}
            valueshow={props?.addNewUserData?.adhar_no}
            maxLength={14}
            keyboardtype={"number-pad"}
          />
        </View>
        <View style={styles.inputWrap}>
          <InputField
            disableSpecialCharacters={true}
            require={true}
            placeholderText={"BNZAA2318JM"}
            handleInputBtnPress={() => {}}
            headingText={"Pancard No."}
            onChangeText={(val: any) => {
              props.setAddNewUserData({
                ...props?.addNewUserData,
                pancard_no: val,
              });
            }}
            valueshow={props?.addNewUserData?.pancard_no}
            maxLength={10}
          />
        </View>
        <View style={styles.genderView}>
          <Text style={styles.genderTxt}>{strings.gender}</Text>
          <RequiredStart />
          <View style={styles.radioView}>
            <RadioButton.Android
              value="Male"
              status={
                props?.addNewUserData?.gender === 1 ? "checked" : "unchecked"
              }
              onPress={() => {
                props.setAddNewUserData({
                  ...props?.addNewUserData,
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
                    props.addNewUserData?.gender === 1
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
              value="second"
              status={
                props.addNewUserData?.gender === 2 ? "checked" : "unchecked"
              }
              onPress={() => {
                props.setAddNewUserData({
                  ...props.addNewUserData,
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
                    props.addNewUserData?.gender === 2
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
            require={true}
            leftIcon={images.event}
            mode={"date"}
            headingText={strings.dateOfBirth}
            placeholderText={strings.dateOfBirth}
            editable={false}
            dateData={(data: any) => {
              props.setAddNewUserData({
                ...props.addNewUserData,
                dateofbirth: moment(data).format(DATE_FORMAT),
              });
            }}
            setDateshow={(data: any) => {
              props.setAddNewUserData({
                ...props.addNewUserData,
                dateofbirth: moment(data).format(DATE_FORMAT),
              });
            }}
            value={
              props?.addNewUserData?.dateofbirth === "" ||
              props?.addNewUserData?.dateofbirth === undefined ||
              props?.addNewUserData?.dateofbirth === null
                ? ""
                : moment(props?.addNewUserData?.dateofbirth).format(DATE_FORMAT)
            }
          />
        </View>
        <View style={styles.inputWrap}>
          <InputField
            disableSpecialCharacters={true}
            require={true}
            placeholderText={strings.mobileNo}
            handleInputBtnPress={() => {}}
            headingText={strings.mobileNo}
            onChangeText={(val: any) => {
              props.setAddNewUserData({
                ...props.addNewUserData,
                mobile: val,
              });
            }}
            valueshow={props?.addNewUserData?.mobile}
            maxLength={10}
            keyboardtype={"number-pad"}
          />
        </View>
        <View style={styles.inputWrap}>
          <InputField
            disableSpecialCharacters={true}
            require={true}
            placeholderText={strings.whatsappNo}
            handleInputBtnPress={() => {}}
            headingText={strings.whatsappNo}
            onChangeText={(val: any) => {
              props.setAddNewUserData({
                ...props.addNewUserData,
                whatsapp_no: val,
              });
            }}
            valueshow={props?.addNewUserData?.whatsapp_no}
            maxLength={10}
            keyboardtype={"number-pad"}
          />
        </View>
        <View style={styles.inputWrap}>
          <InputField
            require={true}
            placeholderText={strings.email + " " + strings.address}
            handleInputBtnPress={() => {}}
            headingText={strings.email + " " + strings.address}
            onChangeText={(val: any) => {
              props.setAddNewUserData({
                ...props.addNewUserData,
                email: val,
              });
            }}
            valueshow={props?.addNewUserData?.email}
          />
        </View>
        <View style={styles.inputWrap}>
          <TouchableOpacity activeOpacity={1} onPress={() => setShowCity(true)}>
            <InputField
              editable={false}
              require={true}
              placeholderText={"City"}
              handleInputBtnPress={() => {}}
              headingText={"City"}
              valueshow={props.addNewUserData?.city}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.inputWrap}>
          <InputField
            require={true}
            placeholderText={"Area"}
            handleInputBtnPress={() => {}}
            headingText={"Area"}
            onChangeText={(val: any) => {
              props.setAddNewUserData({
                ...props.addNewUserData,
                area: val,
              });
            }}
            valueshow={props?.addNewUserData?.area}
          />
        </View>
        <View style={{ marginTop: normalizeSpacing(30) }}>
          <InputField
            require={true}
            placeholderText={strings.address}
            headingText={strings.address}
            valueshow={props.addNewUserData?.address}
            onChangeText={(val: any) => {
              props.setAddNewUserData({
                ...props.addNewUserData,
                address: val,
              });
            }}
            inputType={"location"}
            onPressSelect={(data: any, detail: any) => {
              props.setAddNewUserData({
                ...props.addNewUserData,
                address: data?.description,
                latitude: detail?.geometry?.location?.lat,
                longitude: detail?.geometry?.location?.lng,
              });
            }}
          />
        </View>
        <View style={{ marginVertical: 10, marginBottom: 20 }}>
          <Button
            handleBtnPress={() => {
              Keyboard.dismiss()
              props.onPressCreate()}}
            textTransform={null}
            buttonText={
              props?.type === "edit" ? strings.updateUser : strings.createUser
            }
          />
        </View>
      </ScrollView>
      <PicturePickerModal
        Visible={profile}
        setVisible={setProfile}
        imageData={(data: any) => {
          props.setAddNewUserData({
            ...props.addNewUserData,
            profile_picture: data,
          });
        }}
      />
      <CityModal
        Visible={ShowCity}
        setIsVisible={setShowCity}
        setData={props.setAddNewUserData}
        data={props.addNewUserData}
      />
    </View>
  );
};
export default AddNewCMView;
