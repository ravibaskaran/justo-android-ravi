import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  Keyboard,
} from "react-native";
import React, { useEffect, useState } from "react";
import Modal from "react-native-modal";
import styles from "../../../../components/Modals/styles";
import images from "../../../../assets/images";
import strings from "../../../../components/utilities/Localization";
import Button from "../../../../components/Button";
import InputField from "../../../../components/InputField";
import DropdownInput from "../../../../components/DropDown";
import InputCalender from "app/components/InputCalender";
import moment from "moment";
import { DATE_FORMAT, Isios } from "app/components/utilities/constant";
import { normalizeSpacing } from "app/components/scaleFontSize";

const BookingFilterModal = (props: any) => {
  const statusData = [
    { type_name: "Booking Confirm", value: 2 },
    { type_name: "Registered", value: 3 },
  ];

  const handleApply = () => {
    props.setIsVisible(false);
    props?.getBookingLits(0, props.filterData);
  };
  return (
    <Modal isVisible={props.Visible}>
      <ScrollView
        keyboardShouldPersistTaps={"handled"}
        automaticallyAdjustKeyboardInsets={Isios ? true : false}
        contentContainerStyle={{ flexGrow: 1, justifyContent: "center" }}
      >
        <View style={styles.mainContainer}>
          <View style={styles.topContainer}>
            <Text style={styles.topTxt}>
              {props?.type === "readyToBook"
                ? "Search Ready to Book"
                : props?.type === "register"
                ? "Search Registration Request"
                : props?.type === "cancel"
                ? "Search Cancel Booking"
                : "Search Booking"}
            </Text>
            <View>
              <TouchableOpacity onPress={() => props.setIsVisible(false)}>
                <Image source={images.close} style={styles.closeIcon} />
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.borderView} />
          <View style={{ marginHorizontal: 10 }}>
            <View style={styles.inputWrap}>
              <InputCalender
                mode={"date"}
                leftIcon={images.event}
                placeholderText={strings.startDate}
                headingText={strings.startDate}
                editable={false}
                dateData={(data: any) => {
                  props.setFilterData({
                    ...props.filterData,
                    start_date: moment(data).format(DATE_FORMAT),
                  });
                }}
                setDateshow={(data: any) => {
                  props.setFilterData({
                    ...props.filterData,
                    start_date: moment(data).format(DATE_FORMAT),
                  });
                }}
                value={props?.filterData?.start_date}
              />
            </View>
            <View style={styles.inputWrap}>
              <InputCalender
                mode={"date"}
                DATE_FORMAT
                leftIcon={images.event}
                placeholderText={strings.endDate}
                headingText={strings.endDate}
                editable={false}
                dateData={(data: any) => {
                  props.setFilterData({
                    ...props.filterData,
                    end_date: moment(data).format(DATE_FORMAT),
                  });
                }}
                setDateshow={(data: any) => {
                  props.setFilterData({
                    ...props.filterData,
                    end_date: moment(data).format(DATE_FORMAT),
                  });
                }}
                value={props?.filterData?.end_date}
              />
            </View>
            <View style={[styles.inputWrap, { top: normalizeSpacing(8) }]}>
              <InputField
                headingText={"Search by Name"}
                placeholderText={"Search by Name"}
                handleInputBtnPress={() => {}}
                valueshow={props.filterData?.customer_name}
                onChangeText={(data: any) => {
                  props.setFilterData({
                    ...props.filterData,
                    customer_name: data,
                  });
                }}
              />
            </View>
            {props.type === "request" ? (
              <View style={[styles.inputWrap, { top: normalizeSpacing(10) }]}>
                <DropdownInput
                  headingText={"Search by Status"}
                  placeholder={"Select Status"}
                  value={props?.filterData?.status}
                  setValue={(item: any) => {
                    props.setFilterData({
                      ...props.filterData,
                      status: item.value,
                    });
                  }}
                  data={statusData}
                  inputWidth={"100%"}
                  paddingLeft={16}
                  maxHeight={300}
                  labelField="type_name"
                  valueField={"value"}
                  onChange={(item: any) => {
                    props.setFilterData({
                      ...props.filterData,
                      status: item.value,
                    });
                  }}
                  newRenderItem={(item: any) => {
                    return (
                      <>
                        <View style={styles.item}>
                          <Text style={styles.textItem}>{item.type_name}</Text>
                        </View>
                      </>
                    );
                  }}
                />
              </View>
            ) : null}
          </View>
          <View style={{ marginVertical: 20 }}>
            <View style={{ flexDirection: "row", justifyContent: "center" }}>
              <Button
                width={135}
                buttonText={strings.reset}
                handleBtnPress={() => {
                  Keyboard.dismiss();
                  props.onReset();
                }}
              />
              <Button
                width={135}
                handleBtnPress={() => {
                  Keyboard.dismiss();
                  handleApply();
                }}
                buttonText={strings.apply}
              />
            </View>
          </View>
        </View>
      </ScrollView>
    </Modal>
  );
};

export default BookingFilterModal;
