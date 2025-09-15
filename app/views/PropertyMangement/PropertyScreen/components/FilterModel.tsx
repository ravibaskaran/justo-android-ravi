import DropdownInput from "../../../../components/DropDown";
import { normalizeSpacing } from "../../../../components/scaleFontSize";
import React from "react";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import Modal from "react-native-modal";
import { useDispatch } from "react-redux";
import images from "../../../../assets/images";
import Button from "../../../../components/Button";
import InputField from "../../../../components/InputField";
import styles from "../../../../components/Modals/styles";
import strings from "../../../../components/utilities/Localization";
import {
  getAllProperty,
  getFilterProperty,
} from "../../../../Redux/Actions/propertyActions";

const FilterModal = (props: any) => {
  const dispatch: any = useDispatch();
  const data = [
    { label: "Active", value: "1" },
    { label: "Deactive", value: "2" },
  ];
  const renderItem = (item: any) => {
    return (
      <View style={styles.item}>
        <Text style={styles.textItem}>{item.label}</Text>
      </View>
    );
  };

  const ApplyFilter = () => {
    dispatch(
      getFilterProperty({
        offset: 0,
        limit: "",
        start_date: props.filterform.start_date,
        end_date: props.filterform.end_date,
        location: props.filterform.location.trim(),
        property_name: props.filterform.property_name,
        property_type: props.filterform.property_type,
      })
    );
    props.setPropertyList([]);
    props.setIsVisible(false);
  };
  const ResetFilter = () => {
    props.setFilterform({
      ...props.filterform,
      start_date: "",
      end_date: "",
      location: "",
      property_name: "",
      property_type: "",
      property_id: ""
    });

    dispatch(
      getAllProperty({
        offset: 0,
        limit: "",
      })
    );
    props.setIsVisible(false);
  };

  return (
    <Modal isVisible={props.Visible}>
      <ScrollView
        keyboardShouldPersistTaps={"handled"}
        contentContainerStyle={{ flexGrow: 1, justifyContent: "center" }}
      >
        <View style={styles.mainContainer}>
          <View style={styles.topContainer}>
            <Text style={styles.topTxt}>{strings.searchProperty}</Text>
            <View>
              <TouchableOpacity onPress={() => props.setIsVisible(false)}>
                <Image source={images.close} style={styles.closeIcon} />
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.borderView} />
          <View style={{ marginHorizontal: 10 }}>
            {/* <View style={styles.inputWrap}>
              <InputCalender
                mode={"date"}
                leftIcon={images.event}
                //headingText={'Start Date'}
                placeholderText={strings.startDate}
                dateData={(data: any) => {
                  props.setFilterform({
                    ...props.filterform,
                    start_date: moment(data).format(DATE_FORMAT),
                  });
                }}
                // dateshow={props.filterform.start_date}
                value={
                  props?.filterform?.start_date !== ""
                    ? moment(props?.filterform?.start_date).format(DATE_FORMAT)
                    : null
                }
                setDateshow={(data: any) => {
                  props.setFilterform({
                    ...props.filterform,
                    start_date: moment(data).format(DATE_FORMAT),
                  });
                }}
              />
            </View> */}
            {/* <View style={styles.inputWrap}>
              <InputCalender
                mode={"date"}
                leftIcon={images.event}
                //headingText={'Start Date'}
                placeholderText={strings.endDate}
                dateData={(data: any) => {
                  props.setFilterform({
                    ...props.filterform,
                    end_date: moment(data).format(DATE_FORMAT),
                  });
                }}
                // dateshow={props.filterform.end_date}
                value={
                  props?.filterform?.end_date !== ""
                    ? moment(props?.filterform?.end_date).format(DATE_FORMAT)
                    : null
                }
                setDateshow={(data: any) => {
                  props.setFilterform({
                    ...props.filterform,
                    end_date: moment(data).format(DATE_FORMAT),
                  });
                }}
              />
            </View> */}
            {/* <View style={[styles.inputWrap, { top: normalizeSpacing(8) }]}>
              <InputField
                // placeholderText={strings.searchBy + " "  + strings.name}
                // headingText={strings.searchBy + " "  + strings.name}
                placeholderText={"Search by project Name"}
                headingText={"Search by project Name"}
                handleInputBtnPress={() => { }}
                onChangeText={(val: any) => {
                  props.setFilterform({
                    ...props?.filterform,
                    property_name: val,
                  });
                }}
                valueshow={props?.filterform?.property_name}
              //name={'property_name'}
              />
            </View> */}
            <View style={[styles.inputWrap]}>
              <DropdownInput
                headingText={"Search by Property"}
                placeholder={"Search by Property"}
                data={props?.propertyListForFilter}
                inputWidth={"100%"}
                paddingLeft={16}
                maxHeight={300}
                labelField="property_title"
                valueField={"property_id"}
                value={props?.filterform?.property_id}
                onChange={(item: any) => {
                  props.setFilterform({
                    ...props?.filterform,
                    property_id: item.property_id,
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
            <View style={[styles.inputWrap, { top: normalizeSpacing(10) }]}>
              <InputField
                headingText={"Search by Locality"}
                placeholderText={"Search by Locality"}
                // inputType={"location"}
                valueshow={props?.filterform?.location}
                onChangeText={(data: any) => {
                  props.setFilterform({
                    ...props?.filterform,
                    location: data,
                  });
                }}
                onPressSelect={(data: any, detail: any) => {
                  props.setFilterform({
                    ...props?.filterform,
                    location: data?.description,
                  });
                }}
              />
            </View>
            <View style={styles.inputWrap}>
              <DropdownInput
                data={data}
                maxHeight={300}
                labelField="label"
                valueField="value"
                placeholder="Select Status"
                paddingLeft={16}
                value={props?.filterform?.property_type}
                onChange={(item: any) => {
                  props.setFilterform({
                    ...props?.filterform,
                    property_type: item.value,
                  });
                }}
                newRenderItem={renderItem}
              />
            </View>
          </View>
          <View style={{ marginVertical: 20 }}>
            <View style={{ flexDirection: "row", justifyContent: "center" }}>
              <Button
                width={135}
                buttonText={strings.reset}
                handleBtnPress={() => ResetFilter()}
              />
              <Button
                width={135}
                buttonText={strings.apply}
                handleBtnPress={() => ApplyFilter()}
              />
            </View>
          </View>
        </View>
      </ScrollView>
    </Modal>
  );
};

export default FilterModal;
