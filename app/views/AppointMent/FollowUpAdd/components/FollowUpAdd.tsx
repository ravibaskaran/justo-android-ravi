import moment from "moment";
import React from "react";
import { Text, View } from "react-native";
import images from "../../../../assets/images";
import Button from "../../../../components/Button";
import DropdownInput from "../../../../components/DropDown";
import Header from "../../../../components/Header";
import InputCalender from "../../../../components/InputCalender";
import InputField from "../../../../components/InputField";
import {
    DATE_FORMAT,
    GRAY_LIGHT_COLOR,
    PRIMARY_THEME_COLOR,
} from "../../../../components/utilities/constant";
import strings from "../../../../components/utilities/Localization";
import styles from "./styles";

const FollowUpAddView = (props: any) => {
  return (
    <View style={styles.mainContainer}>
      <Header
        leftImageSrc={images.backArrow}
        rightSecondImageScr={images.notification}
        headerTextStyle={{ textTransform: "uppercase" }}
        headerText={strings.followupHeader}
        headerStyle={styles.headerStyle}
        RightFirstIconStyle={styles.leftImageIconStyle}
        leftImageIconStyle={styles.leftImageIconStyle}
        handleOnLeftIconPress={props.handleBackPress}
        barStyle={"light-content"}
        statusBarColor={PRIMARY_THEME_COLOR}
      />
      <View style={styles.topItemsVw}>
        <DropdownInput
          headingText={strings.status}
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
                <View
                  style={{
                    padding: 17,
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <Text
                    style={{
                      flex: 1,
                      fontSize: 16,
                      color: GRAY_LIGHT_COLOR,
                    }}
                  >
                    {item.title}
                  </Text>
                </View>
              </>
            );
          }}
        />
        <View style={styles.inputWrap}>
          <InputCalender
            headingText={strings.date}
            mode={"date"}
            leftIcon={images.event}
            placeholderText={strings.date} //can edit
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
            headingText={strings.time}
            mode={"time"}
            leftIcon={images.timer}
            dateValue={props?.formData?.next_followup_date}
            placeholderText={strings.time} //can edit
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
        <View style={styles.inputWrap}>
          <InputField
            headingText={strings.description}
            placeholderText={strings.description}
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
        {/* <View style={styles.inputWrap}>
                    <Button
                        width={320}
                        btnTxtsize={18}
                        buttonText={strings.allfollowup}
                        handleBtnPress={() => props.handleAllFollowUp()}
                    />
                </View> */}
      </View>
      {/* <View style={styles.listView}>
                <FlatList
removeClippedSubviews={false}
                    data={props.DATA}
                    showsVerticalScrollIndicator={false}
                    renderItem={({ item }) => <FollupListItem items={item}
                    // onPressView={props.onPressView}
                    />}
                />
            </View> */}
    </View>
  );
};
export default FollowUpAddView;
