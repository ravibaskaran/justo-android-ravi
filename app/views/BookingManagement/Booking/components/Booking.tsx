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

const BookingView = (props: any) => {
  console.log(
    "🚀 ~ file: Booking.tsx:417 ~ props?.getBookingData:",
    props?.getBookingData
  );

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
              headingText={"Booking Amount"}
            />
          </View>
          <View style={styles.inputWrap}>
            <DropdownInput
              require={true}
              headingText={"Payment Type"}
              data={Array.isArray(props?.masterDatas) ? props?.masterDatas : []}
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
          {/* <View style={styles.inputWrap}>
                <InputField
                  disableSpecialCharacters={true}
                  require={true}
                  placeholderText={"Number"}
                  handleInputBtnPress={() => {}}
                  onChangeText={(data: any) => {
                    props.setBookingData({
                      ...props.bookingData,
                      tranjection_upi_cheque_number: data,
                    });
                  }}
                  valueshow={props?.bookingData?.tranjection_upi_cheque_number}
                  headingText={"Cheque No."}
                />
              </View> */}
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
          {/* <View style={styles.inputWrap}>
                    <InputCalender
                        mode={'date'}
                        leftIcon={images.event}
                        placeholderText={"Booking Date"}
                        editable={false}
                        dateData={(data: any) => {
                            props.setBookingData({
                                ...props.booking_date,
                                booking_date: moment(data).format(DATE_FORMAT)
                            })
                        }}
                        setDateshow={(data: any) => {
                            props.setBookingData({
                                ...props.bookingData,
                                booking_date: moment(data).format(DATE_FORMAT)
                            })
                        }}
                        value={props.bookingData?.booking_date}
                    />
                </View> */}

          <View style={styles.inputWrap}>
            <DropdownInput
              require={true}
              headingText={strings.configurations}
              // onFocus={() => props.getDropDownData(0)}
              placeholder={
                props?.bookingData.flat_type
                  ? props?.bookingData.flat_type
                  : strings.configurations
              }
              data={Array.isArray(props?.flatTypes) ? props?.flatTypes : []}
              inputWidth={"100%"}
              paddingLeft={16}
              maxHeight={300}
              // labelField={"configuration_title"}
              // valueField={"configuration_id"}
              value={props?.bookingData.flat_type}
              onChange={(item: any) => {
                // props.setBookingData({
                //   ...props.bookingData,
                //   flat_type: item,
                // });
                props.setcofigdata(item);
              }}
              newRenderItem={(item: any) => {
                return item ? (
                  <>
                    <View style={Styles.item}>
                      <Text style={Styles.textItem}>{item}</Text>
                    </View>
                  </>
                ) : null;
              }}
            />
          </View>
          <View style={[styles.inputWrap]}>
            <DropdownInput
              require={true}
              headingText={strings.floor}
              placeholder={
                props.bookingData?.floor
                  ? props.bookingData?.floor
                  : strings.floor
              }
              data={Array.isArray(props.floors) ? props.floors : []}
              inputWidth={"100%"}
              // onFocus={() => handleGetConfigurations()}
              paddingLeft={16}
              maxHeight={300}
              // labelField={"type"}
              // valueField={"type"}
              value={props.bookingData?.floor}
              onChange={(item: any) => {
                props.setBookingData({
                  ...props.bookingData,
                  floor: item,
                  flat_name: "",
                  saleable_area: "",
                });
              }}
              newRenderItem={(item: any) => {
                return (
                  item.type !== "" && (
                    <>
                      <View style={Styles.item}>
                        <Text style={Styles.textItem}>{item}</Text>
                      </View>
                    </>
                  )
                );
              }}
            />
          </View>
          <View style={styles.inputWrap}>
            <DropdownInput
              require={true}
              headingText={strings.inventory}
              // onFocus={() => props.getDropDownData(0)}
              placeholder={
                props?.bookingData.flat_name
                  ? props?.bookingData.flat_name
                  : strings.inventory
              }
              data={Array.isArray(props?.inventory) ? props?.inventory : []}
              inputWidth={"100%"}
              paddingLeft={16}
              maxHeight={300}
              // labelField={"configuration_title"}
              // valueField={"configuration_id"}
              value={props?.bookingData.flat_name}
              onChange={(item: any) => {
                props.setBookingData({
                  ...props.bookingData,
                  flat_name: item["Flat Name"],
                  saleable_area: item["Saleable Area"],
                  carpet_area: item["Carpet Area"],
                });
              }}
              newRenderItem={(item: any) => {
                return item["Flat Name"] ? (
                  <>
                    <View style={Styles.item}>
                      <Text style={Styles.textItem}>{item["Flat Name"]}</Text>
                    </View>
                  </>
                ) : null;
              }}
            />
          </View>

          {/* <View style={styles.inputWrap}>
              <InputField
                disableSpecialCharacters={true}
                require={true}
                placeholderText={"Qty"}
                handleInputBtnPress={() => {}}
                headingText={"Qty"}
                maxLength={2}
                keyboardtype={"number-pad"}
                editable={props.quantity}
                onChangeText={(data: any) => {
                  if (props?.bookingData.remaining > 0) {
                    props.setBookingData({
                      ...props.bookingData,
                      quantity: data,
                    });
                  } else {
                    props.validQuantityChoose();
                  }
                }}
                onFocus={() => props.validQuantityChoose()}
                valueshow={props?.bookingData?.quantity}
              />
            </View> */}
          {/*<View style={[styles.straightVw, { marginTop: normalize(20) }]}>
           
             <View style={{ width: "48%" }}>
              <DropdownInput
                require={true}
                headingText={strings.configurations}
                // onFocus={() => props.getDropDownData(0)}
                placeholder={
                  props?.bookingData?.configuration
                    ? props?.bookingData?.configuration
                    : strings.configurations
                }
                data={
                  Array.isArray(props?.propertyConfData)
                    ? props?.propertyConfData
                    : []
                }
                inputWidth={"100%"}
                paddingLeft={16}
                maxHeight={300}
                labelField={"configuration_title"}
                valueField={"configuration_id"}
                value={
                  props?.bookingData?.configuration_id === ""
                    ? ""
                    : props?.bookingData?.configuration_id
                }
                onChange={(item: any) => {
                  props.setQuantity(true);
                  props.setBookingData({
                    ...props.bookingData,
                    quantity: "",
                    remaining: item.remaining,
                    configuration_id: item.configuration_id,
                    configuration: item.configuration_title,
                  });
                }}
                newRenderItem={(item: any) => {
                  return item?.configuration_title ? (
                    <>
                      <View style={Styles.item}>
                        <Text style={Styles.textItem}>
                          {item.configuration_title}
                        </Text>
                      </View>
                    </>
                  ) : null;
                }}
              />
            </View> 
            
          </View>*/}
          {props?.bookingData?.saleable_area ? (
            <View style={styles.inputWrap}>
              {/* <InputField
              // disableSpecialCharacters={true}
              placeholderText={props?.bookingData?.saleable_area}
              headingText={"Saleable Area"}
              editable={false}
              valueshow={props?.bookingData?.saleable_area}
              // keyboardtype={"number-pad"}
            /> */}
              <View style={styles.IteamView}>
                <View style={styles.Txtview}>
                  <View style={styles.projectContainer}>
                    <Text style={styles.projectTxt}>Carpet Area :</Text>
                  </View>
                  <View style={styles.nameContainer}>
                    <Text style={styles.nameTxt}>
                      {props?.bookingData?.carpet_area} Sq. ft.
                    </Text>
                  </View>
                </View>
              </View>
            </View>
          ) : null}
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
