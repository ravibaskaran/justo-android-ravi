import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  Keyboard,
} from "react-native";
import React, { useState } from "react";
import Modal from "react-native-modal";
import styles from "../../../../components/Modals/styles";
import images from "../../../../assets/images";
import strings from "../../../../components/utilities/Localization";
import Button from "../../../../components/Button";
import InputField from "../../../../components/InputField";
import DropdownInput from "../../../../components/DropDown";
import InputCalender from "app/components/InputCalender";
import moment from "moment";
import {
  DATE_FORMAT,
  Isios,
  RED_COLOR,
} from "app/components/utilities/constant";
import { normalizeSpacing } from "app/components/scaleFontSize";
import ErrorMessage from "app/components/ErrorMessage";
const FilterModal = (props: any) => {
  const data = [
    { label: strings.active, value: 2 },
    { label: strings.inActive, value: 1 },
  ];
  const renderItem = (item: any) => {
    return (
      <View style={styles.item}>
        <Text style={styles.textItem}>{item.label}</Text>
      </View>
    );
  };
  const validation = () => {
    let isError = true;
    let errorMessage: any = "";

    if (
      props.filterData?.startdate !== "" &&
      props.filterData?.enddate === ""
    ) {
      isError = false;
      errorMessage = "Please enter end date";
    } else if (
      props.filterData?.enddate !== "" &&
      props.filterData?.startdate === ""
    ) {
      isError = false;
      errorMessage = "Please enter start date";
    } else if (!(props.filterData?.startdate <= props.filterData?.enddate)) {
      isError = false;
      errorMessage = "End date should not be less than start date ";
    }
    if (errorMessage !== "") {
      ErrorMessage({
        msg: errorMessage,
        backgroundColor: RED_COLOR,
      });
    }
    if (!isError) {
      Keyboard.dismiss();
    }
    return isError;
  };
  const handleFilter = () => {
    if (validation()) {
      props.setIsVisible(false);
      props.getAgencyList(0, props.filterData);
    }
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
            <Text style={styles.topTxt}>{strings.searchAgency}</Text>
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
                editable={false}
                headingText={strings.startDate}
                dateData={(data: any) => {
                  props.setFilterData({
                    ...props.filterData,
                    startdate: moment(data).format(DATE_FORMAT),
                  });
                }}
                setDateshow={(data: any) => {
                  props.setFilterData({
                    ...props.filterData,
                    startdate: moment(data).format(DATE_FORMAT),
                  });
                }}
                value={props?.filterData?.startdate}
              />
            </View>
            <View style={styles.inputWrap}>
              <InputCalender
                mode={"date"}
                leftIcon={images.event}
                placeholderText={strings.endDate}
                editable={false}
                // minimumDate={new Date()}
                headingText={strings.endDate}
                dateData={(data: any) => {
                  props.setFilterData({
                    ...props.filterData,
                    enddate: moment(data).format(DATE_FORMAT),
                  });
                }}
                setDateshow={(data: any) => {
                  props.setFilterData({
                    ...props.filterData,
                    enddate: moment(data).format(DATE_FORMAT),
                  });
                }}
                value={props?.filterData?.enddate}
              />
            </View>
            <View style={[styles.inputWrap, { top: normalizeSpacing(10) }]}>
              <InputField
                // disableSpecialCharacters={true}
                headingText={strings.searchBy + " " + strings.name}
                placeholderText={strings.searchBy + " " + strings.name}
                onChangeText={(data: any) => {
                  props.setFilterData({
                    ...props.filterData,
                    search_by_name: data,
                  });
                }}
                valueshow={props?.filterData?.search_by_name}
                handleInputBtnPress={() => {}}
              />
            </View>
            {/* <View style={styles.inputWrap}>
              <InputField
                valueshow={props?.filterData?.search_by_location}
                inputType={'location'}
                onPressSelect={(data: any, detail: any) => {
                  props.setFilterData({
                    ...props.filterData,
                    search_by_location: data?.description,
                  })
                }}
                onChangeText={(data: any) => {
                  props.setFilterData({
                    ...props.filterData,
                    search_by_location: data,
                  })
                }}
              />
            </View> */}
            {/* <View style={[styles.inputWrap, { top: normalizeSpacing(10) }]}>
              <InputField
                disableSpecialCharacters={true}
                headingText={strings.searchBy + " " + strings.mobileNo}
                onChangeText={(data: any) => {
                  props.setFilterData({
                    ...props.filterData,
                    mobile_no: data,
                  });
                }}
                valueshow={props?.filterData?.mobile_no}
                handleInputBtnPress={() => { }}
              />
            </View> */}
            <View style={[styles.inputWrap, { top: normalizeSpacing(10) }]}>
              <InputField
                disableSpecialCharacters={true}
                headingText={
                  strings.searchBy + " " + strings.RERA + " " + strings.number
                }
                placeholderText={
                  strings.searchBy + " " + strings.RERA + " " + strings.number
                }
                onChangeText={(data: any) => {
                  if (data?.length > 12) return;
                  props.setFilterData({
                    ...props.filterData,
                    rera_no: data,
                  });
                }}
                valueshow={props?.filterData?.rera_no}
                handleInputBtnPress={() => {}}
              />
            </View>
            <View style={[styles.inputWrap, { top: normalizeSpacing(10) }]}>
              <DropdownInput
                style={styles.dropdown}
                placeholderStyle={styles.placeholderStyle}
                selectedTextStyle={styles.selectedTextStyle}
                iconStyle={styles.iconStyle}
                data={data}
                maxHeight={300}
                labelField="label"
                valueField="value"
                placeholder={strings.selectStatus}
                headingText={"Search by status"}
                paddingLeft={16}
                value={props?.filterData?.status}
                onChange={(item: any) => {
                  props.setFilterData({
                    ...props.filterData,
                    status: item.value,
                  });
                }}
                renderItem={renderItem}
              />
            </View>
          </View>
          <View style={{ marginVertical: 20 }}>
            <View style={{ flexDirection: "row", justifyContent: "center" }}>
              <Button
                width={135}
                buttonText={strings.reset}
                handleBtnPress={() => props.onReset()}
              />
              <Button
                width={135}
                handleBtnPress={() => handleFilter()}
                buttonText={strings.apply}
              />
            </View>
          </View>
        </View>
      </ScrollView>
    </Modal>
  );
};

export default FilterModal;
