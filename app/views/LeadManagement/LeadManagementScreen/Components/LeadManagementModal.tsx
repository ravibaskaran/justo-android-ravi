import { View, Text, Image, TouchableOpacity, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import Modal from "react-native-modal";
import styles from "../../../../components/Modals/styles";
import images from "../../../../assets/images";
import strings from "../../../../components/utilities/Localization";
import Button from "../../../../components/Button";
import InputField from "../../../../components/InputField";
import DropdownInput from "../../../../components/DropDown";
import { useDispatch, useSelector } from "react-redux";
import { getAllMaster } from "app/Redux/Actions/MasterActions";
import InputCalender from "app/components/InputCalender";
import moment from "moment";
import { DATE_FORMAT, Isios } from "app/components/utilities/constant";
import { normalizeSpacing } from "app/components/scaleFontSize";
import Styles from "../../../../components/Modals/styles";
import { getAllProperty } from "app/Redux/Actions/propertyActions";
import { VisitStatus, leadTypes } from "app/components/utilities/DemoData";

const FilterModal = (props: any) => {
  const dispatch: any = useDispatch();
  const [allProperty, setAllProperty] = useState<any>([]);

  useEffect(() => {
    // dispatch(getAllMaster({
    //   type: 2
    // }))
    if (props?.Visible || propertyData?.length == 0) {
      dispatch(
        getAllProperty({
          offset: 0,
          limit: "",
        })
      );
    }
  }, [props?.Visible]);
  const { response = { data: [] } } =
    useSelector((state: any) => state.masterData) || {};
  const propertyData = useSelector((state: any) => state.propertyData) || {};

  const datavisitingscore = [
    { label: "High to low", value: 2 },
    { label: "Low to high", value: 1 },
  ];
  const dataconfiguration = response?.data?.length > 0 ? response?.data : [];
  const resetFilter = () => {
    props.setFilterData({
      startdate: "",
      enddate: "",
      search_by_visisor_name: "",
      search_configuration: "",
      visit_score: "",
      visit_status: "",
    });
    props.setIsVisible(false);
    props.getVisitorsListApi(0, []);
    // props.setVisiitorList([]);
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

  const configRender = (item: any) => {
    return (
      <View style={styles.item}>
        <Text style={styles.textItem}>{item.title}</Text>
      </View>
    );
  };

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
            {/* <View style={[styles.inputWrap, { top: normalizeSpacing(10) }]}>
              <DropdownInput
                headingText={strings.leadType}
                placeholder={strings.leadType}
                data={leadTypes}
                inputWidth={'100%'}
                paddingLeft={16}
                maxHeight={300}
                labelField="label"
                valueField={'value'}
                value={props?.filterData?.visit_status}
                onChange={(item: any) => {
                  props.setFilterData({
                    ...props.filterData,
                    visit_status: item.value,
                  })
                }}
                newRenderItem={(item: any) => {
                  return (
                    <View style={Styles.item}>
                      <Text style={Styles.textItem}>{item.label}</Text>
                    </View>
                  );
                }}
              />
            </View> */}
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
            {/* <View style={styles.inputWrap}>
              <DropdownInput
                style={styles.dropdown}
                placeholderStyle={styles.placeholderStyle}
                selectedTextStyle={styles.selectedTextStyle}
                iconStyle={styles.iconStyle}
                data={dataconfiguration}
                maxHeight={300}
                labelField="title"
                valueField={'_id'}
                placeholder="By Configuration"
                value={props.filterData.search_configuration}
                onChange={(item: any) => {
                  props.setFilterData({
                    ...props.filterData,
                    search_configuration: item._id
                  })
                  // set
                }}
                newRenderItem={configRender}
              />
            </View> */}
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
                  // props.setVisiitorList([]);
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
