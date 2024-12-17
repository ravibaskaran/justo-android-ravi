import images from "app/assets/images";
import Button from "app/components/Button";
import DropdownInput from "app/components/DropDown";
import styles from "app/components/Modals/styles";
import strings from "app/components/utilities/Localization";
import React, { useEffect, useState } from "react";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import Modal from "react-native-modal";
import { useDispatch, useSelector } from "react-redux";
import { GetProjectDetailsReport } from "app/Redux/Actions/ProjectReportActions";
import { getAllProperty } from "app/Redux/Actions/propertyActions";
import InputCalender from "app/components/InputCalender";
import moment from "moment";
import { DATE_FORMAT } from "app/components/utilities/constant";

const FilterModal = (props: any) => {
  const propertyData = useSelector((state: any) => state.propertyData) || {};
  const [allProperty, setAllProperty] = useState<any>([]);
  const dispatch: any = useDispatch();

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

  const ApplyFilter = () => {
    props?.setdisplayDate(
      props.filterData.on_date ? props.filterData.on_date : ""
    );
    dispatch(
      GetProjectDetailsReport({
        on_date: props.filterData.on_date,
        property_id: props.filterData.property_id,
      })
    );
    props.setIsVisible(false);
  };

  const ResetFilter = () => {
    props?.setdisplayDate("");
    props.setFilterData({
      ...props.filterData,
      on_date: "",
      property_id: "",
    });

    dispatch(
      GetProjectDetailsReport({
        on_date: "",
        property_id: "",
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
            <Text style={styles.topTxt}>{"Search Report"}</Text>
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
                headingText={strings.date}
                placeholderText={strings.date}
                editable={false}
                maximumDate={new Date()}
                dateData={(data: any) => {
                  props.setFilterData({
                    ...props.filterData,
                    on_date: moment(data).format(DATE_FORMAT),
                  });
                }}
                setDateshow={(data: any) => {
                  props.setFilterData({
                    ...props.filterData,
                    on_date: moment(data).format(DATE_FORMAT),
                  });
                }}
                value={props.filterData.on_date}
              />
            </View>
            <View style={[styles.inputWrap]}>
              <DropdownInput
                headingText={"Search by Property"}
                placeholder={"Search by Property"}
                data={allProperty}
                inputWidth={"100%"}
                paddingLeft={16}
                maxHeight={300}
                labelField="property_title"
                valueField={"property_id"}
                value={props?.filterData?.property_id}
                onChange={(item: any) => {
                  props.setFilterData({
                    ...props?.filterData,
                    property_id: item.property_id,
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
