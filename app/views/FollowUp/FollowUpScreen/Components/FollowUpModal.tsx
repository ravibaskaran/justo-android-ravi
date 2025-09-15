import CheckBox from "@react-native-community/checkbox";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import Modal from "react-native-modal";
import { useDispatch, useSelector } from "react-redux";
import images from "../../../../assets/images";
import Button from "../../../../components/Button";
import DropdownInput from "../../../../components/DropDown";
import InputCalender from "../../../../components/InputCalender";
import styles from "../../../../components/Modals/styles";
import { normalizeSpacing } from "../../../../components/scaleFontSize";
import {
  DATE_FORMAT,
  Isios,
  PRIMARY_THEME_COLOR,
} from "../../../../components/utilities/constant";
import strings from "../../../../components/utilities/Localization";
import { getUserVisitList } from "../../../../Redux/Actions/LeadsActions";
const FilterModal = (props: any) => {
  const dispatch: any = useDispatch();
  const { response = {}, list = "" } =
    useSelector((state: any) => state.visitorData) || [];
  const [visitorList, setVisiitorList] = useState<any>([]);

  useEffect(() => {
    if (props.Visible) {
      dispatch(getUserVisitList({}));
    }
  }, [props.Visible]);

  useEffect(() => {
    if (response?.status === 200) {
      if (response?.data?.length > 0) {
        setVisiitorList(response?.data);
      }
    }
  }, [response]);

  const followupforData = [
    { label: "Lead", value: 1 },
    { label: "Site Visit", value: 2 },
    { label: "Booking", value: 3 },
    { label: "Registration", value: 4 },
  ];

  const renderItem = (item: any) => {
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
        contentContainerStyle={{ flexGrow: 1, justifyContent: "center" }}
      >
        <View style={styles.mainContainer}>
          <View style={styles.topContainer}>
            <Text style={styles.topTxt}>{strings.searchfollowup}</Text>
            <View>
              <TouchableOpacity onPress={() => props.setIsVisible(false)}>
                <Image source={images.close} style={styles.closeIcon} />
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.borderView} />
          <View style={{ marginHorizontal: 10 }}>
            <View
              style={[
                {
                  marginHorizontal: normalizeSpacing(5),
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                  marginVertical: normalizeSpacing(15),
                  width: "100%",
                },
              ]}
            >
              <Text style={styles.headingsTxt}>Scheduled Follow-up</Text>
              <CheckBox
                value={props.filterData.todayFollowup} // ↩️ use filterData here
                tintColors={{ true: PRIMARY_THEME_COLOR }}
                style={{
                  transform: Isios
                    ? [{ scaleX: 0.8 }, { scaleY: 0.8 }]
                    : [{ scaleX: 1 }, { scaleY: 1 }],
                }}
                onValueChange={(newValue: boolean) => {
                  props.setFilterData({
                    ...props.filterData,
                    todayFollowup: newValue, // ↩️ update that boolean
                  });
                }}
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
                value={props.filterData.lead_id}
                onChange={(item: any) => {
                  props.setFilterData({
                    ...props.filterData,
                    lead_id: item._id,
                  });
                }}
                newRenderItem={(item: any) => {
                  return (
                    <View style={styles.item}>
                      <Text style={styles.textItem}>{item.first_name}</Text>
                    </View>
                  );
                }}
              />
            </View>
            <View style={styles.inputWrap}>
              <InputCalender
                leftIcon={images.event}
                mode={"date"}
                placeholderText={strings.startDate}
                headingText={strings.startDate}
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
                value={
                  props?.filterData?.startdate === "" ||
                  props?.filterData?.startdate === undefined
                    ? "Start Date"
                    : moment(props?.filterData?.startdate).format(DATE_FORMAT)
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
                value={
                  props?.filterData?.enddate === "" ||
                  props?.filterData?.enddate === undefined
                    ? ""
                    : moment(props?.filterData?.enddate).format(DATE_FORMAT)
                }
              />
            </View>
            <View style={styles.inputWrap}>
              <DropdownInput
                style={styles.dropdown}
                paddingLeft={16}
                placeholderStyle={styles.placeholderStyle}
                selectedTextStyle={styles.selectedTextStyle}
                iconStyle={styles.iconStyle}
                data={followupforData}
                maxHeight={300}
                labelField="label"
                valueField={"value"}
                placeholder="Search by Type"
                headingText={"Search by Type"}
                value={props.filterData.followup_for}
                onChange={(item: any) => {
                  props.setFilterData({
                    ...props.filterData,
                    followup_for: item.value,
                  });
                }}
                newRenderItem={renderItem}
              />
            </View>
          </View>
          <View
            style={{
              marginVertical: 20,
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Button
              handleBtnPress={() => {
                props.setIsVisible(false);
                props.onRefresh();
              }}
              buttonText={strings.reset}
              width={135}
            />
            <Button
              handleBtnPress={() => {
                props.setIsVisible(false);
                props.getFollowupList(0, props.filterData);
                props.setFollowUpList([]);
              }}
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
