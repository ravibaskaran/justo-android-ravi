import { getAllProperty } from "app/Redux/Actions/propertyActions";
import InputCalender from "app/components/InputCalender";
import { normalizeSpacing } from "app/components/scaleFontSize";
import { VisitStatus } from "app/components/utilities/DemoData";
import { DATE_FORMAT, Isios } from "app/components/utilities/constant";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import Modal from "react-native-modal";
import { useDispatch, useSelector } from "react-redux";
import images from "../../../../assets/images";
import Button from "../../../../components/Button";
import DropdownInput from "../../../../components/DropDown";
import InputField from "../../../../components/InputField";
import {
  default as Styles,
  default as styles,
} from "../../../../components/Modals/styles";
import strings from "../../../../components/utilities/Localization";

const FilterModal = (props: any) => {
  const dispatch: any = useDispatch();
  const [allProperty, setAllProperty] = useState<any>([]);

  useEffect(() => {
    if (props?.Visible || propertyData?.length == 0) {
      dispatch(
        getAllProperty({
          offset: 0,
          limit: "",
        })
      );
    }
  }, [props?.Visible]);
  const propertyData = useSelector((state: any) => state.propertyData) || {};

  const datavisitingscore = [
    { label: "High to low", value: 2 },
    { label: "Low to high", value: 1 },
  ];
  const resetFilter = () => {
    props.setFilterData({
      startdate: "",
      enddate: "",
      search_by_visisor_name: "",
      search_by_mobile_number:"",
      search_configuration: "",
      visit_score: "",
      visit_status: "",
    });
    props.setIsVisible(false);
    props.getVisitorsListApi(0, []);
    props.flatListRef?.current?.scrollToOffset({
      animated: true,
      offset: 0,
    });
  };

  useEffect(() => {
    if (propertyData?.response?.status === 200) {
      if (propertyData?.response?.data?.length > 0) {
        const activeData = propertyData?.response?.data.filter((el: any) => {
          return el.status == true;
        });
        activeData?.length > 0
          ? setAllProperty(activeData)
          : setAllProperty([]);
      } else {
        setAllProperty([]);
      }
    } else {
      setAllProperty([]);
    }
  }, [propertyData, setAllProperty]);

  const visitorRender = (item: any) => {
    return (
      <View style={styles.item}>
        <Text style={styles.textItem}>{item.label}</Text>
      </View>
    );
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
            <Text style={styles.topTxt}>{strings.searchvisitor}</Text>
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
                headingText={strings.startDate}
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
                value={props.filterData.startdate}
              />
            </View>
            <View style={styles.inputWrap}>
              <InputCalender
                mode={"date"}
                leftIcon={images.event}
                headingText={strings.endDate}
                placeholderText={strings.endDate}
                editable={false}
                value={props.filterData.enddate}
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
              />
            </View>
            <View style={[styles.inputWrap, { top: normalizeSpacing(10) }]}>
              <InputField
                headingText={"Search by Visitor Name"}
                placeholderText={"Search by Visitor Name"}
                handleInputBtnPress={() => {}}
                onChangeText={(data: any) => {
                  props.setFilterData({
                    ...props.filterData,
                    search_by_visisor_name: data,
                  });
                }}
                valueshow={props.filterData.search_by_visisor_name}
              />
            </View>
            <View style={[styles.inputWrap, { top: normalizeSpacing(10) }]}>
              <InputField
                headingText={"Search by Mobile Number"}
                placeholderText={"Search by Mobile Number"}
                handleInputBtnPress={() => {}}
                onChangeText={(data: any) => {
                  props.setFilterData({
                    ...props.filterData,
                    search_by_mobile_number: data,
                  });
                }}
                maxLength={10}
                keyboardtype={"number-pad"}
                disableSpecialCharacters={true}
                valueshow={props.filterData.search_by_mobile_number}
              />
            </View>
            <View style={[styles.inputWrap, { top: normalizeSpacing(10) }]}>
              <DropdownInput
                headingText={"Search by Property"}
                placeholder={"Select Property"}
                data={allProperty}
                inputWidth={"100%"}
                paddingLeft={16}
                maxHeight={300}
                labelField="property_title"
                valueField={"_id"}
                value={props?.filterData?.property_id}
                onChange={(item: any) => {
                  props.setFilterData({
                    ...props.filterData,
                    property_id: item.property_id,
                    property_type_title: item.property_type,
                    property_title: item.property_title,
                  });
                }}
                newRenderItem={(item: any) => {
                  return (
                    <>
                      <View style={Styles.item}>
                        <Text style={Styles.textItem}>
                          {item.property_title}
                        </Text>
                      </View>
                    </>
                  );
                }}
              />
            </View>
            <View style={[styles.inputWrap, { top: normalizeSpacing(10) }]}>
              <DropdownInput
                headingText={"Search by status"}
                placeholder={"Search by status"}
                data={VisitStatus}
                inputWidth={"100%"}
                paddingLeft={16}
                maxHeight={300}
                labelField="label"
                valueField={"value"}
                value={props?.filterData?.lead_status}
                onChange={(item: any) => {
                  props.setFilterData({
                    ...props.filterData,
                    lead_status: item.value,
                  });
                }}
                newRenderItem={(item: any) => {
                  return (
                    <View style={Styles.item}>
                      <Text style={Styles.textItem}>{item.label}</Text>
                    </View>
                  );
                }}
              />
            </View>
            <View style={[styles.inputWrap, { top: normalizeSpacing(10) }]}>
              <DropdownInput
                style={styles.dropdown}
                placeholderStyle={styles.placeholderStyle}
                selectedTextStyle={styles.selectedTextStyle}
                iconStyle={styles.iconStyle}
                data={datavisitingscore}
                paddingLeft={16}
                maxHeight={300}
                labelField="label"
                valueField="value"
                placeholder={strings.byvisitorscore}
                headingText={strings.byvisitorscore}
                value={props.filterData.visit_score}
                onChange={(item: any) => {
                  props.setFilterData({
                    ...props.filterData,
                    visit_score: item.value,
                  });
                }}
                renderItem={visitorRender}
              />
            </View>
          </View>
          <View style={{ marginVertical: 20 }}>
            <View style={{ flexDirection: "row", justifyContent: "center" }}>
              <Button
                width={135}
                buttonText={strings.reset}
                handleBtnPress={() => resetFilter()}
              />
              <Button
                width={135}
                handleBtnPress={() => {
                  props.setIsVisible(false);
                  props.getVisitorsList(0, props.filterData);
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

export default FilterModal;
