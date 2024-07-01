import React, { useState } from "react";
import { View, Text, ScrollView, TouchableOpacity, Image } from "react-native";
import images from "../../../../assets/images";
import Header from "../../../../components/Header";
import InputField from "../../../../components/InputField";
import styles from "./styles";
import { RadioButton } from "react-native-paper";
import {
  BLACK_COLOR,
  DATE_FORMAT,
  GRAY_COLOR,
  PRIMARY_THEME_COLOR,
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

const AddNewSMView = (props: any) => {
  const [profile, setProfile] = React.useState(false);
  const [ShowCity, setShowCity] = useState(false)

  return (
    <View style={styles.mainContainer}>
      <Header
        headerText={props?.type === "edit" ? strings.editSM : strings.addNewSM}
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
      <ScrollView keyboardShouldPersistTaps={'handled'}
        contentContainerStyle={styles.wrap}>
        <TouchableOpacity
          onPress={() => setProfile(true)}
          style={[styles.imageCircle]}
        >
          {!props.addNewSmData?.profile_picture ? (
            <Image
              style={styles.DummyloginBanner}
              source={images.user}
              resizeMode="cover"
            />
          ) : (
            <Image
              style={styles.loginBanner}
              source={{
                uri: props.addNewSmData?.profile_picture?.uri
                  ? props.addNewSmData?.profile_picture?.uri
                  : props.addNewSmData?.profile_picture,
              }}
              resizeMode="cover"
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
        <View style={styles.inputWrap}>
          <DropdownInput
            headingText={"Selected Role"}
            placeholder={"Sourcing Manager"}
            data={props?.roleData}
            disable={true}
            inputWidth={"100%"}
            paddingLeft={16}
            maxHeight={300}
            labelField="role_title"
            valueField={"_id"}
            value={props.addNewSmData?.role_id}
            onChange={(item: any) => {
              props.setAddNewSmData({
                ...props.addNewSmData,
                role_id: item._id,
              });
            }}
            newRenderItem={(item: any) => {
              return (
                <>
                  {props.isloading !== false && (
                    <View style={styles.item}>
                      <Text style={styles.textItem}>{item.role_title}</Text>
                    </View>
                  )}
                </>
              );
            }}
          />
        </View>
        <View style={styles.inputWrap}>
          <InputField
            disableSpecialCharacters={true}
            require={true}
            placeholderText={"First Name"}
            handleInputBtnPress={() => { }}
            headingText={"SM First Name"}
            valueshow={props.addNewSmData?.firstname}
            onChangeText={(val: any) => {
              props.setAddNewSmData({
                ...props.addNewSmData,
                firstname: val,
              });
            }}
          />
        </View>
        <View style={styles.inputWrap}>
          <InputField
            disableSpecialCharacters={true}
            require={true}
            placeholderText={"Last Name"}
            handleInputBtnPress={() => { }}
            headingText={"SM Last Name"}
            valueshow={props.addNewSmData?.lastname}
            onChangeText={(val: any) => {
              props.setAddNewSmData({
                ...props.addNewSmData,
                lastname: val,
              });
            }}
          />
        </View>
        <View style={styles.inputWrap}>
          <InputField
            require={true}
            placeholderText={"3675 9834 6012"}
            handleInputBtnPress={() => { }}
            headingText={"Aadhaar No."}
            inputType={'aadhaar'}
            keyboardtype={'number-pad'}
            valueshow={props.addNewSmData?.adhar_no}
            onChangeText={(val: any) => {
              props.setAddNewSmData({
                ...props.addNewSmData,
                adhar_no: val,
              });
            }}
            maxLength={14}
          />
        </View>
        <View style={styles.inputWrap}>
          <InputField
            disableSpecialCharacters={true}
            require={true}
            placeholderText={"BNZAA2318JM"}
            handleInputBtnPress={() => { }}
            headingText={"Pancard No."}
            valueshow={props.addNewSmData?.pancard_no}
            onChangeText={(val: any) => {
              props.setAddNewSmData({
                ...props.addNewSmData,
                pancard_no: val,
              });
            }}
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
                props.addNewSmData?.gender === 1 ? "checked" : "unchecked"
              }
              onPress={() => {
                props.setAddNewSmData({
                  ...props.addNewSmData,
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
                    props.addNewSmData?.gender === 1
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
              value="Female"
              status={
                props.addNewSmData?.gender === 2 ? "checked" : "unchecked"
              }
              onPress={() => {
                props.setAddNewSmData({
                  ...props.addNewSmData,
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
                    props.addNewSmData?.gender === 2
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
            placeholderText={strings.dateOfBirth}
            headingText={strings.dateOfBirth}
            editable={false}
            dateData={(data: any) => {
              props.setAddNewSmData({
                ...props.addNewSmData,
                dateofbirth: moment(data).format(DATE_FORMAT),
              });
            }}
            setDateshow={(data: any) => {
              props.setAddNewSmData({
                ...props.addNewSmData,
                dateofbirth: moment(data).format(DATE_FORMAT),
              });
            }}
            value={
              props?.addNewSmData?.dateofbirth === null ||
                props?.addNewSmData?.dateofbirth === undefined ||
                props?.addNewSmData?.dateofbirth === '' ? '' :
                moment(props?.addNewSmData?.dateofbirth).format(DATE_FORMAT)}
          />
        </View>
        <View style={styles.inputWrap}>
          <InputField
            disableSpecialCharacters={true}
            require={true}
            placeholderText={strings.mobileNo}
            handleInputBtnPress={() => { }}
            headingText={strings.mobileNo}
            maxLength={10}
            keyboardtype={"number-pad"}
            valueshow={props.addNewSmData?.mobile}
            onChangeText={(val: any) => {
              props.setAddNewSmData({
                ...props.addNewSmData,
                mobile: val,
              });
            }}
          />
        </View>
        <View style={styles.inputWrap}>
          <InputField
            disableSpecialCharacters={true}
            require={true}
            placeholderText={strings.whatsappNo}
            handleInputBtnPress={() => { }}
            headingText={strings.whatsappNo}
            maxLength={10}
            keyboardtype={'number-pad'}
            valueshow={props.addNewSmData?.whatsapp_no}
            onChangeText={(val: any) => {
              props.setAddNewSmData({
                ...props.addNewSmData,
                whatsapp_no: val,
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
            valueshow={props.addNewSmData?.email}
            onChangeText={(val: any) => {
              props.setAddNewSmData({
                ...props.addNewSmData,
                email: val,
              });
            }}
          />
        </View>
        <View style={styles.inputWrap}>
          <TouchableOpacity activeOpacity={1} onPress={() => setShowCity(true)}>
            <InputField
              editable={false}
              require={true}
              placeholderText={"City"}
              handleInputBtnPress={() => { }}
              headingText={"City"}
              valueshow={props.addNewSmData?.city}
            />
          </TouchableOpacity>
        </View>
        {/* <View style={styles.inputWrap}>
            <DropdownInput
              require={true}
              headingText={strings.city}
              placeholder={props.addNewSmData?.city != '' ?
                props.addNewSmData?.city :
                strings.city}
              data={Array.isArray(props.cityData) ? props.cityData : []}
              inputWidth={"100%"}
              paddingLeft={16}
              maxHeight={300}
              onFocus={() => props.handlegetCityList()}
              labelField="city_name"
              valueField={"city_id"}
              value={props.addNewSmData?.city_id}
              onChange={(item: any) => {
                props.setAddNewSmData({
                  ...props.addNewSmData,
                  city: item.city_name,
                  city_id: item.city_id,
                });
              }}
              newRenderItem={(item: any) => {
                return (
                  <>
                    <View style={styles.item}>
                      <Text style={styles.textItem}>{item.city_name}</Text>
                    </View>
                  </>
                );
              }}
            />
        </View> */}
        <View style={{ marginTop: normalizeSpacing(30), }}>
          <InputField
            require={true}
            placeholderText={"Area Location"}
            handleInputBtnPress={() => { }}
            headingText={"Area Location"}
            valueshow={props.addNewSmData?.area}
            onChangeText={(val: any) => {
              props.setAddNewSmData({
                ...props.addNewSmData,
                area: val,
              });
            }}
            inputType={'location'}
            onPressSelect={(data: any, detail: any) => {
              props.setAddNewSmData({
                ...props.addNewSmData,
                area: data?.description,
                latitude: detail?.geometry?.location?.lat,
                longitude: detail?.geometry?.location?.lng
              })
            }}
          />
        </View>
        <View style={styles.inputWrap}>
          <InputField
            require={true}
            placeholderText={"House Address"}
            handleInputBtnPress={() => { }}
            headingText={"House Address"}
            valueshow={props.addNewSmData?.address}
            onChangeText={(val: any) => {
              props.setAddNewSmData({
                ...props.addNewSmData,
                address: val,
              });
            }}

          />
        </View>
        <View style={{ marginVertical: 10, marginBottom: 20 }}>
          <Button
            handleBtnPress={() =>
              props?.type === "edit"
                ? props.onPressCreate()
                : props.onPressCreate("edit")
            }
            textTransform={null}
            buttonText={
              props?.type === "edit" ? strings.updateSM : strings.createSM
            }
          />
        </View>
      </ScrollView>
      <PicturePickerModal
        Visible={profile}
        setVisible={setProfile}
        imageData={(data: any) => {
          props.setAddNewSmData({
            ...props.addNewSmData,
            profile_picture: data,
          });
        }}
      />
      <CityModal
        Visible={ShowCity}
        setIsVisible={setShowCity}
        setData={props.setAddNewSmData}
        data={props.addNewSmData}
      />
    </View>
  );
};
export default AddNewSMView;
