import DropdownInput from "app/components/DropDown";
import React from "react";
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  FlatList,
} from "react-native";
import images from "../../../../assets/images";
import Button from "../../../../components/Button";
import Header from "../../../../components/Header";
import InputField from "../../../../components/InputField";
import PicturePickerModal from "../../../../components/Modals/PicturePicker";
import { normalize } from "../../../../components/scaleFontSize";
import Styles from "app/components/Modals/styles";
import {
  CONST_IDS,
  Isios,
  PRIMARY_THEME_COLOR,
} from "../../../../components/utilities/constant";
import strings from "../../../../components/utilities/Localization";
import styles from "./styles";
import { RequiredStart } from "app/components/utilities/GlobalFuncations";
import EmptyListScreen from "app/components/CommonScreen/EmptyListScreen";
import JustForOkModal from "app/components/Modals/JustForOkModal";
import ConfigurationsItem from "./ConfigurationsItem";

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
              onChangeText={(data: any) => {
                props.setBookingData({
                  ...props.bookingData,
                  description: data,
                });
              }}
              valueshow={props?.getBookingData.crm_person_email}
              editable={false}
            />
          </View>
          <View style={styles.inputWrap}>
            <InputField
              headingText={"Lead Source"}
              placeholderText={"Lead Source"}
              onChangeText={(data: any) => {
                props.setBookingData({
                  ...props.bookingData,
                  description: data,
                });
              }}
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
                  onChangeText={(data: any) => {
                    props.setBookingData({
                      ...props.bookingData,
                      description: data,
                    });
                  }}
                  valueshow={props?.getBookingData.cp_name?.[0]}
                  editable={false}
                />
              </View>
              {props?.getBookingData.cp_emp_name?.length > 0 && (
                <View style={styles.inputWrap}>
                  <InputField
                    headingText={"CP Employee name"}
                    placeholderText={"CP Employee name"}
                    onChangeText={(data: any) => {
                      props.setBookingData({
                        ...props.bookingData,
                        description: data,
                      });
                    }}
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

          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <View style={[styles.inputWrap, { flex: 1, marginRight: 20 }]}>
              <InputField
                disableSpecialCharacters={true}
                require={true}
                placeholderText={"Amount"}
                onChangeText={(data: any) => {
                  props.setBookingData({
                    ...props.bookingData,
                    booking_amount: data,
                  });
                }}
                valueshow={props?.bookingData?.booking_amount}
                keyboardtype={"number-pad"}
                headingText={"Amount"}
              />
            </View>
            <View style={[styles.inputWrap, { flex: 1 }]}>
              <DropdownInput
                require={true}
                headingText={"Payment Type"}
                data={
                  Array.isArray(props?.masterDatas) ? props?.masterDatas : []
                }
                inputWidth={"100%"}
                paddingLeft={16}
                maxHeight={300}
                onFocus={() => props.getDropDownData(10)}
                labelField={"title"}
                valueField={"title"}
                placeholder={
                  props?.bookingData?.payment_type
                    ? props?.bookingData?.payment_type
                    : ""
                }
                value={props?.bookingData?.payment_type}
                onChange={(item: any) => {
                  props.setBookingData({
                    ...props.bookingData,
                    payment_type: item.title,
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
          </View>

          <View style={styles.straightVw}>
            <View style={{ flexDirection: "row" }}>
              <Text
                style={[
                  styles.titleTxt,
                  {
                    bottom:
                      typeof props?.bookingData?.cheque_image === "object"
                        ? 8
                        : 0,
                  },
                ]}
              >
                Attach Photo :
              </Text>
              <RequiredStart />
            </View>
            <View>
              <Button
                width={130}
                height={45}
                buttonText={strings.browse}
                bgcolor={PRIMARY_THEME_COLOR}
                border={14}
                handleBtnPress={() => props.setBrowse(true)}
              />
              {typeof props?.bookingData?.cheque_image === "object" ? (
                <Text style={{ fontSize: 12, textAlign: "center" }}>
                  {"Photo Added"}
                </Text>
              ) : null}
            </View>
          </View>

          {props.flatBookingsMap?.flatBooking.map(
            (value: any, index: number) => {
              return (
                <ConfigurationsItem
                  key={index}
                  flatBooking={value}
                  index={index}
                  getBookingData={props?.getBookingData}
                  flatBookingLength={props.flatBookingsMap?.flatBooking?.length}
                  addMoreBtnPressed={() => {
                    props?.addMoreBtnPressed();
                  }}
                />
              );
            }
          )}

          <View style={styles.inputWrap}>
            <InputField
              require={true}
              headingText={"Comment"}
              placeholderText={"Comment"}
              multiline={true}
              inputheight={80}
              onChangeText={(data: any) => {
                props.setBookingData({
                  ...props.bookingData,
                  description: data,
                });
              }}
              valueshow={props?.bookingData?.description}
            />
          </View>

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
      <PicturePickerModal
        Visible={props.browse}
        setVisible={props.setBrowse}
        imageData={(data: any) => {
          props.setBookingData({
            ...props.bookingData,
            cheque_image: data,
          });
        }}
      />
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
