import moment from "moment";
import React from "react";
import { Image, Keyboard, ScrollView, Text, TouchableOpacity, View } from "react-native";
import Modal from "react-native-modal";
import images from "../../../../assets/images";
import Button from "../../../../components/Button";
import InputCalender from "../../../../components/InputCalender";
import InputField from "../../../../components/InputField";
import styles from "../../../../components/Modals/styles";
import { DATE_FORMAT, Isios } from "../../../../components/utilities/constant";
import strings from "../../../../components/utilities/Localization";


const SuportForumFilter = (props: any) => {
  return (
    <Modal isVisible={props.Visible}>
      <ScrollView keyboardShouldPersistTaps={'handled'}
      automaticallyAdjustKeyboardInsets={Isios ? true : false}
        contentContainerStyle={{ flexGrow: 1, justifyContent: 'center', }}
      >
        <View style={styles.mainContainer}>
          <View style={styles.topContainer}>
            <Text style={styles.topTxt}>{strings.searchSupportForum}</Text>
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
                mode={'date'}
                leftIcon={images.event}
                placeholderText={strings.startDate}
                headingText={strings.startDate}
                editable={false}
                // onChangeText={() => { }}
                dateData={(data: any) => {
                  props.setFilterData({
                    ...props.filterData,
                    start_date: moment(data).format(DATE_FORMAT)
                  })
                }}
                setDateshow={(data: any) => {
                  props.setFilterData({
                    ...props.filterData,
                    start_date: moment(data).format(DATE_FORMAT)
                  })
                }}
                value={props.filterData?.start_date}
              />
            </View>
            <View style={styles.inputWrap}>
              <InputCalender
                mode={'date'}
                leftIcon={images.event}
                placeholderText={strings.endDate}
                headingText={strings.endDate}
                editable={false}
                // onChangeText={() => { }}
                dateData={(data: any) => {
                  props.setFilterData({
                    ...props.filterData,
                    end_date: moment(data).format(DATE_FORMAT)
                  })
                }}
                setDateshow={(data: any) => {
                  props.setFilterData({
                    ...props.filterData,
                    end_date: moment(data).format(DATE_FORMAT)
                  })
                }}
                value={props.filterData?.end_date}
              />
            </View>
            <View style={styles.inputWrap}>
              <InputField
                placeholderText={"Search Project Name"}
                headingText={"Search Project Name"}
                valueshow={props?.filterData?.search_title}
                onChangeText={(data: any) => {
                  props.setFilterData({
                    ...props.filterData,
                    search_title: data,
                  })
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
                  props.setIsVisible(false)
                  props.resetFilter()
                }} />
              <Button
                width={135}
                handleBtnPress={() => {
                  Keyboard.dismiss()
                  props.setIsVisible(false)
                  props.handleFilterApply()
                }}
                buttonText={strings.apply} />
            </View>
          </View>
        </View>
        </ScrollView>
    </Modal>
  );
};

export default SuportForumFilter;
