import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import React, { useEffect, useState } from "react";
import { RadioButton } from "react-native-paper";
import Header from "../../../../components/Header";
import strings from "../../../../components/utilities/Localization";
import styles from "./styles";
import {
  BLACK_COLOR,
  DATE_FORMAT_EXCL,
  Isios,
  PRIMARY_THEME_COLOR,
} from "../../../../components/utilities/constant";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import InputField from "../../../../components/InputField";
import images from "../../../../assets/images";
import Button from "../../../../components/Button";
import moment from "moment";
import { useSelector } from "react-redux";
import InputCalender from "app/components/InputCalender";
import PicturePickerModal from "app/components/Modals/PicturePicker";
import FastImages from "app/components/FastImage";
import CityModal from "app/components/Modals/CityModal";

const EditProfileView = (props: any) => {
  const { onPressBack, allDetails, setEditData, editData } = props;
  const insets = useSafeAreaInsets();
  const [profileVisible, setProfileVisible] = useState(false);
  const [ShowCity, setShowCity] = useState(false);

  console.log("🚀 ~ file: EditProfileView.tsx:210", editData?.dateofbirth);

  return (
    <View style={styles.mainContainer}>
      <Header
        headerText={strings.editProfile}
        headerStyle={styles.headerStyle}
        headerTextStyle={styles.headerTextStyle}
        leftImageSrc={images.backArrow}
        leftImageIconStyle={styles.leftImageIconStyle}
        handleOnLeftIconPress={onPressBack}
        barStyle={"light-content"}
        statusBarColor={PRIMARY_THEME_COLOR}
      />
      <ScrollView
        keyboardShouldPersistTaps={"handled"}
        automaticallyAdjustKeyboardInsets={Isios ? true : false}
      >
        <View style={styles.wrap}>
          {/*  <Text style={styles.headingText}>{strings.basicInfoText}</Text> */}
          {/* <View style={styles.nderlineStyle} /> */}

          <TouchableOpacity
            style={styles.imageCircle}
            onPress={() => setProfileVisible(true)}
          >
            <Image
              style={styles.userImage}
              // source={editData?.local_profile_picture?.uri}
              source={{
                uri: editData?.local_profile_picture?.uri
                  ? editData?.local_profile_picture?.uri
                  : editData?.base_url + editData?.profile_picture,
              }}
            />
            <View style={styles.editView}>
              <Image
                style={styles.editImage}
                source={images.edit}
                resizeMode="contain"
              />
            </View>
          </TouchableOpacity>
          {/* {editData?.justo_employee_code ? null : <View style={styles.inputWrap}>
            <InputField
              require={true}
              disableSpecialCharacters={true}
              valueshow={editData?.justo_employee_code}
              handleInputBtnPress={() => {}}
              onChangeText={(e: any) => {
                setEditData({
                  ...editData,
                  justo_employee_code: e,
                });
              }}
              headingText={"Employee code"}
            />
          </View>} */}
          <View style={styles.inputWrap}>
            <InputField
              editable={false}
              disableSpecialCharacters={true}
              valueshow={editData?.firstname}
              handleInputBtnPress={() => {}}
              onChangeText={(e: any) => {
                setEditData({
                  ...editData,
                  firstname: e,
                });
              }}
              headingText={"First Name"}
            />
          </View>
          <View style={styles.inputWrap}>
            <InputField
              editable={false}
              disableSpecialCharacters={true}
              valueshow={editData?.lastname}
              handleInputBtnPress={() => {}}
              onChangeText={(e: any) => {
                setEditData({
                  ...editData,
                  lastname: e,
                });
              }}
              headingText={"Last Name"}
            />
          </View>
          <View style={styles.inputWrap}>
            <InputField
              editable={false}
              valueshow={editData?.adhar_no}
              handleInputBtnPress={() => {}}
              onChangeText={(e: any) => {
                setEditData({
                  ...editData,
                  adhar_no: e,
                });
              }}
              inputType={"aadhaar"}
              headingText={"Aadhaar No."}
              placeholderText={"Aadhaar No."}
              maxLength={14}
              keyboardtype={"number-pad"}
            />
          </View>
          <View style={styles.inputWrap}>
            <InputField
              editable={false}
              disableSpecialCharacters={true}
              valueshow={editData?.pancard_no}
              handleInputBtnPress={() => {}}
              placeholderText={"Pancard No."}
              onChangeText={(e: any) => {
                setEditData({
                  ...editData,
                  pancard_no: e,
                });
              }}
              headingText={"Pancard No."}
              maxLength={10}
            />
          </View>
          <View style={styles.genderView}>
            <Text style={styles.genderTxt}>{strings.gender}</Text>
            <View style={styles.radioView}>
              <RadioButton.Android
                disabled={true}
                value={editData?.gender}
                status={editData?.gender === 1 ? "checked" : "unchecked"}
                onPress={() =>
                  setEditData({
                    ...editData,
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
                      editData?.gender === 1
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
                disabled={true}
                value={editData?.gender}
                status={editData?.gender === 2 ? "checked" : "unchecked"}
                onPress={() =>
                  setEditData({
                    ...editData,
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
                      editData?.gender === 2
                        ? PRIMARY_THEME_COLOR
                        : BLACK_COLOR,
                  },
                ]}
              >
                {strings.female}
              </Text>
            </View>
          </View>
          {/* <View style={styles.inputWrap}>
            <InputField
              valueshow={moment(editData?.date_of_birth).format(DATE_FORMAT_EXCL)}
              handleInputBtnPress={() => {}}
              onChangeText={(e: any) => {
                setEditData({
                  ...editData,
                  date_of_birth: e,
                });
              }}
              headingText={strings.dateOfBirth}
              rightImgSrc={images.event}
            />
          </View> */}
          {/* <InputCalender
            mode={"date"}
            leftIcon={images.event}
            placeholderText={strings.dateOfBirth} //can edit
            editable={false}
            disabled={true}
            headingText={strings.dateOfBirth}
            // onChangeText={() => { }}
            dateData={(data: any) => {
              setEditData({
                ...editData,
                dateofbirth: data,
              });
            }}
            setDateshow={(data: any) => {
              setEditData({
                ...editData,
                dateofbirth: data,
              });
            }}
            value={
              editData?.dateofbirth && editData?.dateofbirth !== "Invalid date"
                ? moment(editData?.dateofbirth).format(DATE_FORMAT_EXCL)
                : strings.notfount
            }
          /> */}
          <View style={styles.inputWrap}>
            <InputField
              disableSpecialCharacters={true}
              valueshow={editData?.mobile?.toString()}
              keyboardtype={"number-pad"}
              onChangeText={(e: any) => {
                setEditData({
                  ...editData,
                  primary_mobile: e,
                });
              }}
              headingText={strings.mobileNo}
              maxLength={10}
              editable={false}
            />
          </View>
          {/* <View style={styles.inputWrap}>
            <InputField
              editable={false}
              disableSpecialCharacters={true}
              valueshow={editData?.whatsapp_no}
              keyboardtype={"number-pad"}
              onChangeText={(e: any) => {
                setEditData({
                  ...editData,
                  whatsapp_no: e,
                });
              }}
              headingText={strings.whatsappNo}
              maxLength={10}
            />
          </View> */}
          <View style={styles.inputWrap}>
            <InputField
              editable={false}
              valueshow={editData?.email}
              handleInputBtnPress={() => {}}
              onChangeText={(e: any) => {
                setEditData({
                  ...editData,
                  email: e,
                });
              }}
              headingText={strings.email + " " + strings.address}
            />
          </View>
          {/* <View style={[styles.inputWrap, { width: "100%" }]}>
            <InputField
              editable={false}
              placeholderText={"Area"}
              handleInputBtnPress={() => {}}
              onChangeText={(data: any) => {
                setEditData({
                  ...editData,
                  area: data,
                });
              }}
              valueshow={editData?.area}
              headingText={"Area"}
              inputType={"location"}
              onPressSelect={(data: any, detail: any) => {
                setEditData({
                  ...editData,
                  area: data?.description,
                  latitude: detail?.geometry?.location?.lat,
                  longitude: detail?.geometry?.location?.lng,
                });
              }}
            />
          </View> */}
          <View style={styles.inputWrap}>
            <InputField
              editable={false}
              placeholderText={"Address"}
              handleInputBtnPress={() => {}}
              onChangeText={(text: any) => {
                setEditData({
                  ...editData,
                  address: text,
                });
              }}
              valueshow={editData?.address}
              headingText={"Address"}
            />
          </View>
          <View style={styles.inputWrap}>
            <TouchableOpacity
              activeOpacity={1}
              disabled={true}
              onPress={() => setShowCity(true)}
            >
              <InputField
                editable={false}
                // require={true}
                placeholderText={"City"}
                handleInputBtnPress={() => {}}
                headingText={"City"}
                valueshow={editData?.city}
              />
            </TouchableOpacity>
          </View>

          {/*  <View style={styles.inputWrap}>
            <InputField
              placeholderText={"Sourcing Manager"}
              handleInputBtnPress={() => {}}
              onChangeText={(e: any) => {
                setEditData({
                  ...editData,
                  adhar_no: e
                })
              }}
              headingText={"Sourcing Manager"}
            />
          </View> */}
          <View style={{ marginTop: 10 }}>
            <Button
              handleBtnPress={() => props.handleNextPress()}
              width={300}
              btnTxtsize={15}
              buttonText={strings.update}
              textTransform={"uppercase"}
            />
          </View>
          <PicturePickerModal
            Visible={profileVisible}
            setVisible={setProfileVisible}
            imageData={(data: any) => {
              setEditData({
                ...editData,
                profile_picture: data,
                local_profile_picture: data,
              });
            }}
          />
          <CityModal
            Visible={ShowCity}
            setIsVisible={setShowCity}
            setData={props.setEditData}
            data={props.editData}
          />
        </View>
      </ScrollView>
    </View>
  );
};

export default EditProfileView;
