import moment from "moment";
import React, { useEffect, useState } from "react";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import Modal from "react-native-modal";
import { useDispatch, useSelector } from "react-redux";

import Button from "../../../components/Button";
import DropdownInput from "../../../components/DropDown";

import CheckBox from "@react-native-community/checkbox";
import images from "../../../assets/images";
import InputCalender from "../../../components/InputCalender";
import styles from "../../../components/Modals/styles";
import {
  DATE_FORMAT,
  Isios,
  PRIMARY_THEME_COLOR,
} from "../../../components/utilities/constant";
import strings from "../../../components/utilities/Localization";
import { getUserVisitList } from "../../../Redux/Actions/LeadsActions";

const FilterModal = ({
  visible,
  onClose,
  filterData,
  setFilterData,
  onRefresh,
  fetchActivities,
}: any) => {
  const dispatch: any = useDispatch();
  const { response = {} } = useSelector((state: any) => state.visitorData);

  const [visitorList, setVisitorList] = useState([]);

  // Load leads whenever modal opens
  useEffect(() => {
    if (visible) dispatch(getUserVisitList({}));
  }, [visible, dispatch]);

  // Populate dropdown once response arrives
  useEffect(() => {
    if (response?.status === 200 && Array.isArray(response.data)) {
      setVisitorList(response.data);
    }
  }, [response]);

  const handleLeadChange = (item: any) => {
    setFilterData({ ...filterData, lead_id: item._id });
  };

  const handleReset = () => {
    onClose();
    onRefresh();
  };

  const handleApply = () => {
    onClose();
    fetchActivities(0, { ...filterData });
  };

  return (
    <Modal isVisible={visible} onBackdropPress={onClose}>
      <ScrollView
        contentContainerStyle={{ flexGrow: 1, justifyContent: "center" }}
      >
        <View style={styles.mainContainer}>
          {/* Header */}
          <View style={styles.topContainer}>
            <Text style={styles.topTxt}>Search Schedules</Text>
            <TouchableOpacity onPress={onClose}>
              <Image source={images.close} style={styles.closeIcon} />
            </TouchableOpacity>
          </View>
          <View style={styles.borderView} />

          {/* Filters */}
          <View style={{ marginHorizontal: 16 }}>
            <View style={styles.inputWrap}>
              <InputCalender
                leftIcon={images.event}
                mode={"date"}
                placeholderText={strings.startDate}
                headingText={strings.startDate}
                editable={false}
                dateData={(data: any) => {
                  setFilterData({
                    ...filterData,
                    startDate: moment(data).format(DATE_FORMAT),
                  });
                }}
                setDateshow={(data: any) => {
                  setFilterData({
                    ...filterData,
                    startDate: moment(data).format(DATE_FORMAT),
                  });
                }}
                value={
                  filterData?.startDate === "" ||
                  filterData?.startDate === undefined
                    ? "Start Date"
                    : moment(filterData?.startDate).format(DATE_FORMAT)
                }
              />
            </View>
            <View style={styles.inputWrap}>
              <InputCalender
                leftIcon={images.event}
                mode={"date"}
                placeholderText={strings.endDate}
                headingText={strings.startDate}
                editable={false}
                dateData={(data: any) => {
                  setFilterData({
                    ...filterData,
                    endDate: moment(data).format(DATE_FORMAT),
                  });
                }}
                setDateshow={(data: any) => {
                  setFilterData({
                    ...filterData,
                    endDate: moment(data).format(DATE_FORMAT),
                  });
                }}
                value={
                  filterData?.endDate === "" ||
                  filterData?.endDate === undefined
                    ? ""
                    : moment(filterData?.endDate).format(DATE_FORMAT)
                }
              />
            </View>
            <View style={styles.inputWrap}>
              <DropdownInput
                style={styles.dropdown}
                paddingLeft={16}
                search={true}
                searchPlaceholder={"Name"}
                placeholderStyle={styles.placeholderStyle}
                selectedTextStyle={styles.selectedTextStyle}
                iconStyle={styles.iconStyle}
                data={visitorList}
                maxHeight={300}
                labelField="first_name"
                valueField={"_id"}
                placeholder="Search by Lead"
                headingText={"Search by Lead"}
                value={filterData.lead_id}
                onChange={handleLeadChange}
                newRenderItem={(item: any) => {
                  return (
                    <View style={styles.item}>
                      <Text style={styles.textItem}>{item.first_name}</Text>
                    </View>
                  );
                }}
              />
            </View>

            <View style={styles.radioBtn}>
              <Text style={styles.headingsTxt}>Due Follow-Up</Text>
              <CheckBox
                value={filterData.due}
                tintColors={{ true: PRIMARY_THEME_COLOR }}
                style={{
                  transform: Isios
                    ? [{ scaleX: 0.8 }, { scaleY: 0.8 }]
                    : [{ scaleX: 1 }, { scaleY: 1 }],
                }}
                onValueChange={(newValue: boolean) => {
                  setFilterData({
                    ...filterData,
                    due: newValue, // ↩️ update that boolean
                  });
                }}
              />
            </View>
          </View>

          {/* Buttons */}
          <View
            style={{
              marginVertical: 20,
              flexDirection: "row",
              justifyContent: "space-around",
            }}
          >
            <Button
              handleBtnPress={handleReset}
              buttonText={strings.reset}
              width={135}
            />
            <Button
              handleBtnPress={handleApply}
              buttonText={strings.apply}
              width={135}
            />
          </View>
        </View>
      </ScrollView>
    </Modal>
  );
};

export default FilterModal;
