import { View, Text, Image, TouchableOpacity, ScrollView, Keyboard } from "react-native";
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
import { normalize, normalizeSpacing } from "app/components/scaleFontSize";
import { getAllProperty } from "app/Redux/Actions/propertyActions";
import { useDispatch, useSelector } from "react-redux";
import Styles from '../../../../components/Modals/styles'


const FilterModal = (props: any) => {
  const appointmentWith = [
    { type_name: 'Site lead visit', value: 1 },
    { type_name: 'Client visit', value: 2 }]
  const statusData = [
    { type_name: 'No Show', value: 1 },
    { type_name: 'Revisit', value: 2 },
    { type_name: 'Complete', value: 3 },
    { type_name: 'Visit Cancelled', value: 4 },
    { type_name: 'Reschedule', value: 5 },
    { type_name: 'Not Fit for Sale', value: 6 },
  ]
  const dispatch: any = useDispatch()

  const [allProperty, setAllProperty] = useState<any>([]);
  const propertyData = useSelector((state: any) => state.propertyData) || {};


  useEffect(() => {
    dispatch(
      getAllProperty({
        offset: 0,
        limit: "",
      })
    );
    getAllPropertyData();
  }, [props.Visible])

  const getAllPropertyData = () => {
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
    }else {
      setAllProperty([]);
    }
  };



  const handleApply = () => {
    props.setIsVisible(false)
    props?.getAppointmentList(0, props.filterData)
    props.setSiteAppointments([])
  }
  return (
    <Modal isVisible={props.Visible}>
      <ScrollView keyboardShouldPersistTaps={'handled'}
      automaticallyAdjustKeyboardInsets={Isios ? true : false}
        contentContainerStyle={{ flexGrow: 1, justifyContent: 'center' }}>
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
                mode={"date"} DATE_FORMAT
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
            <View style={[styles.inputWrap, { top: normalizeSpacing(8) }]}>
              <InputField
                headingText={"Search by Name"}
                placeholderText={"Search by Name"}
                handleInputBtnPress={() => { }}
                valueshow={props.filterData?.customer_name}
                onChangeText={(data: any) => {
                  props.setFilterData({
                    ...props.filterData,
                    customer_name: data,
                  });
                }}
              />
            </View>
            {/* <View style={[styles.inputWrap, { top: normalizeSpacing(14) }]}>
              <InputField
                headingText={"By Property Name"}
                handleInputBtnPress={() => { }}
                valueshow={props.filterData?.property_name}
                onChangeText={(data: any) => {
                  props.setFilterData({
                    ...props.filterData,
                    property_name: data,
                  });
                }}
              />
            </View> */}
            <View style={[styles.inputWrap, { top: normalizeSpacing(10) }]}>
              <DropdownInput
                headingText={'Search by Property'}
                placeholder={'Select Property'}
                data={allProperty}
                inputWidth={'100%'}
                paddingLeft={16}
                maxHeight={300}
                labelField="property_title"
                valueField={'_id'}
                value={props?.filterData?.property_id}
                onChange={(item: any) => {
                  props.setFilterData({
                    ...props.filterData,
                    property_id: item.property_id,
                    property_type_title: item.property_type,
                    property_name: item.property_title,
                  })
                }}
                newRenderItem={(item: any) => {
                  return (
                    <>
                      <View style={Styles.item}>
                        <Text style={Styles.textItem}>{item.property_title}</Text>
                      </View>
                    </>
                  );
                }}
              />
            </View>
            {/* <View style={styles.inputWrap}>
              <DropdownInput
                placeholder={strings.appointmentWith}
                value={props.filterData.appointment_with}
                setValue={(item: any) => {
                  props.setFilterData({
                    ...props.filterData,
                    appointment_with: item.value
                  })
                }}
                data={appointmentWith}
                inputWidth={'100%'}
                paddingLeft={16}
                maxHeight={300}
                labelField="type_name"
                valueField={'value'}
                onChange={(item: any) => {
                  props.setFilterData({
                    ...props.filterData,
                    appointment_with: item.value
                  })
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
            </View> */}
            <View style={[styles.inputWrap, { top: normalizeSpacing(10) }]}>
              <DropdownInput
                headingText={'Search by Status'}
                placeholder={'Select Status'}
                value={props.filterData.status}
                setValue={(item: any) => {
                  props.setFilterData({
                    ...props.filterData,
                    status: item.value
                  })
                }}
                data={statusData}
                inputWidth={'100%'}
                paddingLeft={16}
                maxHeight={300}
                labelField="type_name"
                valueField={'value'}
                onChange={(item: any) => {
                  props.setFilterData({
                    ...props.filterData,
                    status: item.value
                  })
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
          <View style={{ marginVertical: 20 }}>
            <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
              <Button
                width={135}
                buttonText={strings.reset}
                handleBtnPress={() => {
                  Keyboard.dismiss()
                  props.onReset()}} />
              <Button
                width={135}
                handleBtnPress={() => {
                  Keyboard.dismiss()
                  handleApply()}}
                buttonText={strings.apply} />
            </View>
          </View>
        </View>
      </ScrollView>
    </Modal>
  );
};

export default FilterModal;
