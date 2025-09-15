import React from "react";
import { ScrollView, View } from "react-native";
import images from "../../../../assets/images";
import Button from "../../../../components/Button";
import Header from "../../../../components/Header";
import InputField from "../../../../components/InputField";
import JustForOkModal from "../../../../components/Modals/JustForOkModal";
import { normalize } from "../../../../components/scaleFontSize";
import {
  CONST_IDS,
  Isios,
  PRIMARY_THEME_COLOR,
} from "../../../../components/utilities/constant";
import strings from "../../../../components/utilities/Localization";
import ConfigurationsItem from "./ConfigurationsItem";
import styles from "./styles";

const BookingView = (props: any) => {
  // console.log(
  //   "🚀 ~ file: Booking.tsx:417 ~ props?.getBookingData:",
  //   props?.getBookingData
  // );

  return (
    <View style={styles.mainContainer}>
      <Header
        leftImageSrc={images.backArrow}
        rightSecondImageScr={images.notification}
        headerText={strings.bookNow}
        headerStyle={styles.headerStyle}
        RightFirstIconStyle={styles.leftImageIconStyle}
        leftImageIconStyle={styles.leftImageIconStyle}
        handleOnLeftIconPress={props.handleBackPress}
        barStyle={"light-content"}
        statusBarColor={PRIMARY_THEME_COLOR}
      />
      <ScrollView
        automaticallyAdjustKeyboardInsets={Isios ? true : false}
        keyboardShouldPersistTaps={"handled"}
        contentContainerStyle={{ flexGrow: 1 }}
      >
        <View style={styles.containerVw}>
          <View style={styles.inputWrap}>
            <InputField
              disableSpecialCharacters={true}
              placeholderText={"Name"}
              headingText={"Name"}
              editable={false}
              valueshow={props?.getBookingData?.customer_first_name}
              keyboardtype={"number-pad"}
            />
          </View>
          <View style={styles.inputWrap}>
            <InputField
              headingText={"CRM Person Email"}
              placeholderText={"CRM Person Email"}
              valueshow={props?.getBookingData.crm_person_email}
              editable={false}
            />
          </View>
          <View style={styles.inputWrap}>
            <InputField
              headingText={"Lead Source"}
              placeholderText={"Lead Source"}
              valueshow={props?.getBookingData?.lead_source?.[0]}
              editable={false}
            />
          </View>
          {props?.getBookingData?.lead_source_id?.[0] ===
            CONST_IDS.cp_lead_source_id && (
            <>
              <View style={styles.inputWrap}>
                <InputField
                  headingText={"CP Name"}
                  placeholderText={"CP Name"}
                  valueshow={props?.getBookingData.cp_name?.[0]}
                  editable={false}
                />
              </View>
              {props?.getBookingData.cp_emp_name?.length > 0 && (
                <View style={styles.inputWrap}>
                  <InputField
                    headingText={"CP Employee name"}
                    placeholderText={"CP Employee name"}
                    valueshow={props?.getBookingData.cp_emp_name?.[0]}
                    editable={false}
                  />
                </View>
              )}
            </>
          )}
          {props?.getBookingData?.lead_source_id?.[0] ===
            CONST_IDS.ref_lead_source_id && (
            <>
              <View style={styles.inputWrap}>
                <InputField
                  editable={false}
                  placeholderText={strings.referrerNumber}
                  headingText={strings.referrerNumber}
                  valueshow={props?.getBookingData.referrer_contact}
                  keyboardtype={"number-pad"}
                  maxLength={10}
                />
              </View>
              <View style={styles.inputWrap}>
                <InputField
                  editable={false}
                  headingText={strings.referrerName}
                  placeholderText={strings.referrerName}
                  valueshow={props?.getBookingData.referrer_name}
                />
              </View>
            </>
          )}

          {props.flatBookingsMap?.flatBooking.map(
            (value: any, index: number) => {
              return (
                <ConfigurationsItem
                  key={index}
                  flatBooking={value}
                  index={index}
                  getBookingData={props?.getBookingData}
                  flatBookingLength={props.flatBookingsMap?.flatBooking?.length}
                  addMoreBtnPressed={() => props?.addMoreBtnPressed()}
                  masterDatas={props?.masterDatas}
                  getDropDownData={() => props?.getDropDownData(10)}
                  setBrowse={(data: boolean) => props?.setBrowse(data)}
                  onDeleteBtnPress={() => props?.onDeleteBtnPress(index)}
                  browse={props.browse}
                  flatBookingsMap={props.flatBookingsMap.flatBooking}
                />
              );
            }
          )}

          <View style={{ marginVertical: normalize(30) }}>
            <Button
              buttonText={strings.bookNow}
              bgcolor={PRIMARY_THEME_COLOR}
              border={14}
              handleBtnPress={() => props.handleBookPress()}
              disabled={props.disabled}
            />
          </View>
        </View>
      </ScrollView>

      <JustForOkModal
        headertitle={"Confirmation"}
        message={"Booking has been sent to CRM..."}
        Visible={props.okIsVisible}
        onPressRightButton={props.onPressRightButton}
        setIsVisible={props.setOkIsVisible}
      />
    </View>
  );
};
export default BookingView;
