import React from "react";
import { View, Text, Image, FlatList, ScrollView } from "react-native";
import images from "../../../../assets/images";
import Button from "../../../../components/Button";
import DropdownInput from "../../../../components/DropDown";
import Header from "../../../../components/Header";
import InputField from "../../../../components/InputField";
import {
  DATE_FORMAT,
  Isios,
  PRIMARY_THEME_COLOR,
  TIME_FORMAT,
} from "../../../../components/utilities/constant";
import strings from "../../../../components/utilities/Localization";
import styles from "./styles";
import Styles from "../../../../components/DropDown/styles";
import FollupListItem from "./FollowupListItem";
import InputCalender from "app/components/InputCalender";
import moment from "moment";
import { leadTypes } from "app/components/utilities/DemoData";

const FollowUpAddView = (props: any) => {
  return (
    <View style={styles.mainContainer}>
      <Header
        leftImageSrc={images.backArrow}
        rightSecondImageScr={images.notification}
        headerText={strings.followupHeader}
        headerStyle={styles.headerStyle}
        RightFirstIconStyle={styles.leftImageIconStyle}
        leftImageIconStyle={styles.leftImageIconStyle}
        handleOnLeftIconPress={props.handleBackPress}
        barStyle={"light-content"}
        statusBarColor={PRIMARY_THEME_COLOR}
      />
      <ScrollView
      automaticallyAdjustKeyboardInsets={Isios ? true : false}
        keyboardShouldPersistTaps={"handled"}
        style={{ flexGrow: 1}}
      >
        <View style={styles.topItemsVw}>
          <View style={styles.inputWrap}>
            <DropdownInput
              require={true}
              headingText={"Status"}
              placeholder={strings.status}
              data={props?.masterDatas}
              inputWidth={"100%"}
              paddingLeft={16}
              maxHeight={300}
              onFocus={() => props.handleMasterDatas(5)}
              labelField="title"
              valueField={"_id"}
              value={props?.formData?.followup_status}
              onChange={(item: any) => {
                props.setFormData({
                  ...props.formData,
                  followup_status: item._id,
                });
              }}
              newRenderItem={(item: any) => {
                return (
                  <>
                    {props?.isloading === false && (
                      <View style={Styles.item}>
                        <Text style={Styles.textItem}>{item.title}</Text>
                      </View>
                    )}
                  </>
                );
              }}
            />
          </View>
          {/* <View style={styles.inputWrap}>
            <DropdownInput
              headingText={strings.leadType}
              placeholder={strings.leadType}
              data={leadTypes}
              inputWidth={"100%"}
              paddingLeft={16}
              maxHeight={300}
              labelField="label"
              valueField={"value"}
              value={props?.formData?.visit_status}
              onChange={(item: any) => {
                props.setFormData({
                  ...props.formData,
                  visit_status: item.value,
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
          </View> */}
          {props?.formData?.followup_status === "6360c6d52ca46e9d3636fbf4" ? (
            <>
              <View style={styles.inputWrap}>
                <InputCalender
                  require={true}
                  headingText={"Date"}
                  mode={"date"}
                  leftIcon={images.event}
                  minimumDate={new Date()}
                  placeholderText={"Date"} //can edit
                  editable={false}
                  // onChangeText={() => { }}
                  dateData={(data: any) => {
                    props.setFormData({
                      ...props.formData,
                      followup_time: "",
                      next_followup_date: moment(data).format(DATE_FORMAT),
                    });
                  }}
                  setDateshow={(data: any) => {
                    props.setFormData({
                      ...props.formData,
                      followup_time: "",
                      next_followup_date: moment(data).format(DATE_FORMAT),
                    });
                  }}
                  value={props?.formData?.next_followup_date}
                />
              </View>
              <View style={styles.inputWrap}>
                <InputCalender
                  require={true}
                  headingText={"Time"}
                  mode={"time"}
                  dateValue={props?.formData?.next_followup_date}
                  leftIcon={images.timer}
                  placeholderText={"Time"}
                  editable={false}
                  // onChangeText={() => { }}
                  dateData={(data: any) => {
                    props.setFormData({
                      ...props.formData,
                      followup_time: data,
                    });
                  }}
                  setDateshow={(data: any) => {
                    props.setFormData({
                      ...props.formData,
                      followup_time: data,
                    });
                  }}
                  value={props?.formData?.followup_time}
                />
              </View>
            </>
          ) : null}
          <View style={styles.inputWrap}>
            <InputField
              headingText={"Description"}
              placeholderText={"Description"}
              handleInputBtnPress={() => {}}
              onChangeText={(val: any) => {
                props.setFormData({
                  ...props.formData,
                  remark: val,
                });
              }}
              multiline={true}
              inputheight={100}
            />
          </View>
          <View style={styles.inputWrap}>
            <Button
              width={320}
              btnTxtsize={18}
              buttonText={strings.update + " " + strings.followupHeader}
              handleBtnPress={() => props.handleUpdateStatus()}
            />
          </View>
          <View style={styles.inputWrap}>
            <Button
              width={320}
              btnTxtsize={18}
              buttonText={strings.allfollowup}
              handleBtnPress={() => props.handleAllFollowUp()}
            />
          </View>
        </View>
        <View style={styles.listView}>
          {/* <FlatList
                    data={props.DATA}
                    showsVerticalScrollIndicator={false}
                    renderItem={({ item }) => <FollupListItem items={item}
                    // onPressView={props.onPressView}
                    />}
                /> */}
        </View>
      </ScrollView>
    </View>
  );
};
export default FollowUpAddView;
