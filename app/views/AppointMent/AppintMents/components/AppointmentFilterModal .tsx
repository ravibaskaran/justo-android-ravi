import InputCalender from "app/components/InputCalender";
import { normalizeSpacing } from "app/components/scaleFontSize";
import { DATE_FORMAT, Isios } from "app/components/utilities/constant";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import Modal from "react-native-modal";
import images from "../../../../assets/images";
import Button from "../../../../components/Button";
import DropdownInput from "../../../../components/DropDown";
import InputField from "../../../../components/InputField";
import styles from "../../../../components/Modals/styles";
import strings from "../../../../components/utilities/Localization";
import { useDispatch, useSelector } from "react-redux";
import { getAllProperty } from "app/Redux/Actions/propertyActions";

const AppointmentFilterModal = (props: any) => {
  const statusData = [
    { type_name: "No Show", value: 1 },
    { type_name: "Revisit", value: 2 },
    { type_name: "Appointment Done", value: 3 },
    { type_name: "Visit Cancelled", value: 4 },
    { type_name: "Reschedule", value: 5 },
    { type_name: "Not Fit for Sale", value: 6 },
    { type_name: strings.followup, value: 10 },
  ];
  const dispatch: any = useDispatch();

  const [allProperty, setAllProperty] = useState<any>([]);
  const propertyData = useSelector((state: any) => state.propertyData) || {};

  useEffect(() => {
    if (props.Visible) {
      dispatch(
        getAllProperty({
          offset: 0,
          limit: "",
        })
      );
    }
  }, [props.Visible]);

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
  }, [propertyData]);


  const handleApply = () => {
    props.setIsVisible(false);
    props?.getAppointmentList(0, props.filterData);
    // props.setAppointmentList([]);
  };
  const renderItem = (item: any) => {
    return (
      <View style={styles.item}>
        <Text style={styles.textItem}>{item.type_name}</Text>
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
            <Text style={styles.topTxt}>{strings.searchappointment}</Text>
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
                leftIcon={images.event}
                headingText={strings.endDate}
                placeholderText={strings.endDate}
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
            <View style={[styles.inputWrap, { top: normalizeSpacing(10) }]}>
              <InputField
                headingText={strings.searchBy + " " + strings.name}
                placeholderText={strings.searchBy + " " + strings.name}
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
            <View style={[styles.inputWrap, { top: normalizeSpacing(10) }]}>
              <InputField
                headingText={strings.searchBy + " " + strings.mobileNo}
                placeholderText={strings.searchBy + " " + strings.mobileNo}
                handleInputBtnPress={() => {}}
                valueshow={props.filterData?.customer_number}
                maxLength={10}
                keyboardtype={"number-pad"}
                disableSpecialCharacters={true}
                onChangeText={(data: any) => {
                  props.setFilterData({
                    ...props.filterData,
                    customer_number: data,
                  });
                }}
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
                    property_name: item.property_title,
                  });
                }}
                newRenderItem={(item: any) => {
                  return (
                    <>
                      <View style={styles.item}>
                        <Text style={styles.textItem}>
                          {item.property_title}
                        </Text>
                      </View>
                    </>
                  );
                }}
              />
            </View>
            <View style={[styles.inputWrap, { top: normalizeSpacing(15) }]}>
              <DropdownInput
                headingText={strings.searchBy + " " + strings.status}
                placeholder={strings.selectStatus}
                data={
                  props.type === "appWith"
                    ? [
                        // 1= Pending, 2 = Confirm, 3= Compleat
                        { type_name: strings.STSPending, value: 1 },
                        { type_name: strings.STSConfirm, value: 2 },
                        { type_name: strings.STSComplete, value: 3 },
                        { type_name: strings.STSAppointMentCancl, value: 4 },
                      ]
                    : statusData
                }
                inputWidth={"100%"}
                paddingLeft={16}
                maxHeight={300}
                labelField="type_name"
                valueField="value"
                value={props?.filterData?.status}
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
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              marginVertical: 30,
            }}
          >
            <Button
              handleBtnPress={() => {
                props.setIsVisible(false);
                props.onPressApply("reset");
                props.setFilterData({
                  start_date: "",
                  end_date: "",
                  customer_name: "",
                  customer_number: "",
                  status: "",
                });
              }}
              buttonText={strings.reset}
              width={150}
            />
            <Button
              handleBtnPress={() => {
                if (props.type === "appWith") {
                  props.onPressApply();
                  props.setIsVisible(false);
                } else {
                  handleApply();
                }
              }}
              buttonText={strings.apply}
              width={150}
            />
          </View>
        </View>
      </ScrollView>
    </Modal>
  );
};

export default AppointmentFilterModal;
