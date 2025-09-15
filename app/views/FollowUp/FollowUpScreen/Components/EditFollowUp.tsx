import { useFocusEffect } from "@react-navigation/native";
import moment from "moment";
import React, { useEffect, useState } from "react";
import {
  Keyboard,
  ScrollView,
  Text,
  View
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useDispatch, useSelector } from "react-redux";
import images from "../../../../assets/images";
import Button from "../../../../components/Button";
import DropdownInput from "../../../../components/DropDown";
import Styles from "../../../../components/DropDown/styles";
import Header from "../../../../components/Header";
import InputCalender from "../../../../components/InputCalender";
import InputField from "../../../../components/InputField";
import {
  DATE_FORMAT,
  Isios,
  PRIMARY_THEME_COLOR_DARK,
  RED_COLOR,
  WHITE_COLOR
} from "../../../../components/utilities/constant";
import strings from "../../../../components/utilities/Localization";
import { getAllMaster } from "../../../../Redux/Actions/MasterActions";
import styles from "./Styles";

import ErrorMessage from "../../../../components/ErrorMessage";
import {
  getAllFollowUpDetails,
  updateFollowUp,
} from "../../../../Redux/Actions/FollowUpActions";

const EditFollowUp = ({ navigation, route }: any) => {
  const followUpId = route?.params || "";
  const [isloading, setIsloading] = useState(false);
  const { response = {}, detail = "" } = useSelector(
    (state: any) => state.followUp
  );
  const dispatch: any = useDispatch();
  const insets = useSafeAreaInsets();
  const [formData, setFormData] = useState<any>([]);
  const [masterDatas, setMasterDatas] = useState<any>([]);
  const masterData = useSelector((state: any) => state.masterData) || {};

  useEffect(() => {
    if (masterData?.response?.status === 200) {
      setIsloading(false);
      setMasterDatas(
        masterData?.response?.data?.length > 0 ? masterData?.response?.data : []
      );
    }
  }, [masterData]);

  useFocusEffect(
    React.useCallback(() => {
      // if (followUpId?._id) {
      setIsloading(true);
      dispatch(getAllFollowUpDetails({ followup_id: followUpId?._id }));
      // }
      return () => {};
    }, [navigation, detail])
  );

  useEffect(() => {
    if (response?.status === 200) {
      if (response.data?.length > 0) {
        setFormData(response.data[0]);
      }
    }
  }, [response]);

  const validation = () => {
    let isError = true;
    let errorMessage: any = "";
    console.log(
      "🚀 ~ file: EditFollowUp.tsx:90 ~ formData?.next_followup_date:",
      formData?.next_followup_date
    );

    if (formData?.followup_status === "6360c6d52ca46e9d3636fbf4") {
      if (
        typeof formData?.next_followup_date === "undefined" ||
        formData?.next_followup_date === ""
      ) {
        isError = false;
        errorMessage = "Date is require. Please Enter Date";
      } else if (
        typeof formData?.followup_time === "undefined" ||
        formData?.followup_time === ""
      ) {
        isError = false;
        errorMessage = "Time is require. Time Enter Date";
      }
    }
    if (errorMessage !== "") {
      ErrorMessage({
        msg: errorMessage,
        backgroundColor: RED_COLOR,
      });
    }
    if (!isError) {
      Keyboard.dismiss();
    }
    return isError;
  };
  const handleMasterDatas = (data: any) => {
    setIsloading(true);
    dispatch(
      getAllMaster({
        type: data,
      })
    );
  };
  const handleUpdateStatus = () => {
    if (validation()) {
      if (followUpId?._id) {
        dispatch(
          updateFollowUp({
            followup_id: followUpId?._id,
            followup_status: formData?.followup_status,
            next_followup_date: formData?.next_followup_date,
            followup_time: formData?.followup_time,
            remark: formData?.remark,
            visit_status: strings.warm,
            // visit_status: formData?.visit_status,
          })
        );
        navigation.goBack(null);
      }
    }
  };
  return (
    <View style={styles.mainContainer}>
      <Header
        leftImageSrc={images.backArrow}
        rightSecondImageScr={images.notification}
        headerText={strings.editfollowup}
        handleOnLeftIconPress={() => navigation.goBack()}
        leftImageIconStyle={styles.RightFirstIconStyle}
        headerStyle={styles.headerStyle}
        RightFirstIconStyle={styles.RightFirstIconStyle}
      />
      <ScrollView
        keyboardShouldPersistTaps={"handled"}
        style={{ flexGrow: 1 }}
        automaticallyAdjustKeyboardInsets={Isios ? true : false}
      >
        <View style={styles.editInputView}>
          <View style={styles.inputWarp}>
            <DropdownInput
              headingText={"Status"}
              placeholder={
                formData?.followup_status_title
                  ? formData?.followup_status_title
                  : strings.status
              }
              data={masterDatas}
              inputWidth={"100%"}
              paddingLeft={16}
              maxHeight={300}
              onFocus={() => handleMasterDatas(5)}
              labelField="title"
              valueField={"_id"}
              value={
                formData?.followup_status_title
                  ? formData?.followup_status_title
                  : ""
              }
              onChange={(item: any) => {
                setFormData({
                  ...formData,
                  followup_status: item._id,
                  next_followup_date: "",
                  followup_time: "",
                });
              }}
              newRenderItem={(item: any) => {
                return (
                  <>
                    {isloading === false && (
                      <View style={Styles.item}>
                        <Text style={Styles.textItem}>{item.title}</Text>
                      </View>
                    )}
                  </>
                );
              }}
            />
          </View>
          {/* <View style={styles.inputWarp}>
          <DropdownInput
            headingText={strings.leadType}
            placeholder={followUpId?.visit_status ? followUpId?.visit_status : strings.leadType}
            data={leadTypes}
            inputWidth={'100%'}
            paddingLeft={16}
            maxHeight={300}
            labelField="label"
            valueField={'value'}
            value={formData?.visit_status}
            onChange={(item: any) => {
              setFormData({
                ...formData,
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
          {formData?.followup_status === "6360c6d52ca46e9d3636fbf4" ? (
            <>
              <View style={styles.inputWarp}>
                <InputCalender
                  headingText={"Date"}
                  require={true}
                  mode={"date"}
                  leftIcon={images.event}
                  placeholderText={"Date"} //can edit
                  editable={false}
                  // onChangeText={() => { }}
                  dateData={(data: any) => {
                    setFormData({
                      ...formData,
                      followup_time: "",
                      next_followup_date: moment(data).format(DATE_FORMAT),
                    });
                  }}
                  setDateshow={(data: any) => {
                    setFormData({
                      ...formData,
                      followup_time: "",
                      next_followup_date: moment(data).format(DATE_FORMAT),
                    });
                  }}
                  value={
                    formData?.next_followup_date === "" ||
                    formData?.next_followup_date === null
                      ? ""
                      : moment(formData?.next_followup_date).format(
                          "DD/MM/YYYY"
                        )
                  }
                />
              </View>
              <View style={styles.inputWarp}>
                <InputCalender
                  headingText={"Time"}
                  require={true}
                  mode={"time"}
                  dateValue={formData?.next_followup_date}
                  leftIcon={images.timer}
                  placeholderText={"Time"} //can edit
                  editable={false}
                  // onChangeText={() => { }}
                  dateData={(data: any) => {
                    setFormData({
                      ...formData,
                      followup_time: data,
                    });
                  }}
                  setDateshow={(data: any) => {
                    setFormData({
                      ...formData,
                      followup_time: data,
                    });
                  }}
                  value={formData?.followup_time}
                />
              </View>
            </>
          ) : null}
          <View style={styles.inputWarp}>
            <InputField
              placeholderText={"Description"}
              handleInputBtnPress={() => {}}
              headingText={"Description"}
              multiline={true}
              inputheight={200}
              valueshow={formData?.remark}
              onChangeText={(val: any) => {
                setFormData({
                  ...formData,
                  remark: val,
                });
              }}
            />
          </View>
        </View>
        <View style={styles.editBtnContainer}>
          <Button
            buttonText={strings.update}
            width={250}
            bgcolor={PRIMARY_THEME_COLOR_DARK}
            btnTxtcolor={WHITE_COLOR}
            btnTxtsize={18}
            textTransform={"uppercase"}
            handleBtnPress={() => handleUpdateStatus()}
          />
        </View>
      </ScrollView>
    </View>
  );
};

export default EditFollowUp;
