import moment from "moment";
import React from "react";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import Modal from "react-native-modal";
import images from "../../../../assets/images";
import Button from "../../../../components/Button";
import DropdownInput from "../../../../components/DropDown";
import InputCalender from "../../../../components/InputCalender";
import InputField from "../../../../components/InputField";
import styles from "../../../../components/Modals/styles";
import { normalizeSpacing } from "../../../../components/scaleFontSize";
import { DATE_FORMAT, Isios } from "../../../../components/utilities/constant";
import strings from "../../../../components/utilities/Localization";
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
  const handleFilter = () => {
    props.setIsVisible(false)
    props.getAgencyList(0, props.filterData)
  }
  return (
    <Modal isVisible={props.Visible}>
      <ScrollView keyboardShouldPersistTaps={'handled'}
        automaticallyAdjustKeyboardInsets={Isios ? true : false}
        contentContainerStyle={{ flexGrow: 1, justifyContent: 'center' }}>
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
                disableSpecialCharacters={true}
                headingText={strings.searchBy + " " + strings.name}
                onChangeText={(data: any) => {
                  props.setFilterData({
                    ...props.filterData,
                    search_by_name: data,
                  });
                }}
                valueshow={props?.filterData?.search_by_name}
                handleInputBtnPress={() => { }}
              />
            </View>
            <View style={styles.inputWrap}>
              <InputField
                valueshow={props?.filterData?.search_by_location}
                // inputType={'location'}
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
            </View>
            <View style={styles.inputWrap}>
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
            <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
              <Button
                width={135}
                buttonText={strings.reset}
                handleBtnPress={() => props.onReset()} />
              <Button
                width={135}
                handleBtnPress={() => handleFilter()}
                buttonText={strings.apply} />
            </View>
          </View>
        </View>
      </ScrollView>
    </Modal>
  );
};

export default FilterModal;
