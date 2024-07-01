import { View, Text, Image, TouchableOpacity, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import Modal from "react-native-modal";
import styles from "../../../../components/Modals/styles";
import images from "../../../../assets/images";
import strings from "../../../../components/utilities/Localization";
import Button from "../../../../components/Button";
import InputField from "../../../../components/InputField";
import DropdownInput from "../../../../components/DropDown";
import { useDispatch, useSelector } from "react-redux";
import { getAllMaster } from "app/Redux/Actions/MasterActions";
import {
  getAllPropertyCompetitor,
  removePropertyCompetitor,
} from "app/Redux/Actions/propertyActions";
import { normalizeSpacing } from "app/components/scaleFontSize";
import ErrorMessage from "app/components/ErrorMessage";
import { RED_COLOR } from "app/components/utilities/constant";
import { RequiredStart } from "app/components/utilities/GlobalFuncations";

const CancelModal = (props: any) => {
  const dispatch: any = useDispatch();
  const [masterDatas, setMasterDatas] = useState<any>();
  const [propertyCompetitor, setPropertyCompetitor] = useState<any>();
  const [propetyInput, setPropetyInput] = useState<any>(false);
  const [reasonSelect, setReasonSelect] = useState<any>(false);
  const masterData = useSelector((state: any) => state.masterData) || {};
  const propertyData =
    useSelector((state: any) => state.competitorproperty) || {};
  const handleMasterDatas = (data: any) => {
    dispatch(
      getAllMaster({
        type: data,
      })
    );
  };

  const handleCompetitorProperty = () => {
    dispatch(
      getAllPropertyCompetitor({
        property_id: props?.item[0]?.property_id
          ? props?.item[0]?.property_id
          : "",
      })
    );
  };
  useEffect(() => {
    if (propertyData?.response?.status === 200) {
      if (propertyData?.response?.data?.length > 0) {
        setPropertyCompetitor(propertyData?.response?.data);
      }
    } else {
      if (
        propertyData?.response?.status === 201 ||
        propertyData?.response?.data?.length > 0
      ) {
        setPropetyInput(true);
        setPropertyCompetitor([]);
        dispatch(removePropertyCompetitor());
      }
    }
  }, [propertyData]);
  useEffect(() => {
    props.setCancelValue({
      reason: "",
      property_id: "",
      comment: "",
      property_name: "",
      remark: "",
    });
    if (masterData?.response?.status === 200) {
      if (masterData?.response?.data?.length > 0) {
        setMasterDatas(
          masterData?.response?.data?.length > 0
            ? masterData?.response?.data
            : []
        );
      }
    }
  }, [masterData]);

  const validation = () => {
    let isError = true;
    let errorMessage: any = "";
    if (props?.cancelValue?.reason === "") {
      isError = false;
      errorMessage = "Please Select a reason";
    }
    if (propetyInput && props?.cancelValue?.property_name === "") {
      isError = false;
      errorMessage = "Please Enter competitor property";
    } else if (
      props?.cancelValue?.reason === "639d691c9f37df12d3ea64e2" &&
      !propetyInput &&
      props?.cancelValue?.property_id === ""
    ) {
      isError = false;
      errorMessage = "Please Enter Property";
    }
    if (errorMessage !== "") {
      ErrorMessage({
        msg: errorMessage,
        backgroundColor: RED_COLOR,
      });
    }
    return isError;
  };

  const handleCancel = () => {
    if (validation()) {
      props.cancelDataPress();
      props.setIsVisible(false);
      setPropetyInput(false);
      setReasonSelect(false);
    } else {
      // props.setIsVisible(false)
      // setPropetyInput(false)
      // setReasonSelect(true);
    }
  };
  return (
    <Modal isVisible={props.Visible}>
      <ScrollView
        keyboardShouldPersistTaps={"handled"}
        contentContainerStyle={{ flexGrow: 1, justifyContent: "center" }}
      >
        <View style={styles.mainContainer}>
          <View style={styles.topContainer}>
            <Text style={styles.topTxt}>
              {strings.cancel + " " + strings.bookingRequestHead}
            </Text>
            <View>
              <TouchableOpacity
                onPress={() => {
                  props.setIsVisible(false);
                  setPropetyInput(false);
                  props.setCancelValue({
                    reason: "",
                    property_id: "",
                    comment: "",
                    property_name: "",
                    remark: "",
                  });
                }}
              >
                <Image source={images.close} style={styles.closeIcon} />
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.borderView} />
          <View style={{ marginHorizontal: 10, marginVertical: 10 }}>
              <View style={styles.inputWrap}>
                <DropdownInput
                  require
                  headingText={strings.selectReason}
                  placeholder={strings.selectReason}
                  data={Array.isArray(masterDatas) ? masterDatas : []}
                  inputWidth={"100%"}
                  paddingLeft={16}
                  maxHeight={300}
                  onFocus={() => handleMasterDatas(8)}
                  labelField="title"
                  valueField={"_id"}
                  value={props?.cancelValue?.reason}
                  onChange={(item: any) => {
                    setReasonSelect(false);
                    props.setCancelValue({
                      ...props.cancelValue,
                      reason: item._id,
                    });
                  }}
                  newRenderItem={(item: any) => {
                    return (
                      <>
                        <View style={styles.item}>
                          <Text style={styles.textItem}>{item.title}</Text>
                        </View>
                      </>
                    );
                  }}
                />
              </View>
            {reasonSelect ? (
              <View>
                <Text style={styles.errorTxt}>
                  Select Reason to cancel booking
                </Text>
              </View>
            ) : null}
            {props?.cancelValue?.reason === "639d691c9f37df12d3ea64e2" ? (
              <View style={styles.inputWrap}>
                <View style={styles.propertyVw}>
                  <Text style={styles.titleTxt}>
                    {propetyInput ? "Property Name" : strings.selectproperty}
                  </Text>
                  {(!propetyInput && props?.cancelValue?.property_id === "") ||
                    props?.cancelValue?.property_id === undefined ? (
                    <View style={styles.addNewBttn}>
                      <Button
                        width={80}
                        height={25}
                        btnTxtsize={12}
                        buttonText={"Add New"}
                        handleBtnPress={() => setPropetyInput(true)}
                      />
                    </View>
                  ) : null}
                </View>
                {propetyInput ? (
                  <InputField
                  disableSpecialCharacters={true}
                    placeholderText={"Property Name"}
                    // headingText={"Property Name"}
                    handleInputBtnPress={() => { }}
                    valueshow={props?.cancelValue?.property_name}
                    onChangeText={(val: any) => {
                      props.setCancelValue({
                        ...props.cancelValue,
                        property_name: val,
                      });
                    }}
                  />
                ) : (
                  <DropdownInput
                    placeholder={strings.selectproperty}
                    data={
                      Array.isArray(propertyCompetitor)
                        ? propertyCompetitor
                        : []
                    }
                    inputWidth={"100%"}
                    paddingLeft={16}
                    maxHeight={300}
                    onFocus={() => handleCompetitorProperty()}
                    labelField="property_name"
                    valueField={"property_name"}
                    value={props?.cancelValue?.property_id}
                    onChange={(item: any) => {
                      props.setCancelValue({
                        ...props.cancelValue,
                        property_id: item.property_name,
                      });
                    }}
                    newRenderItem={(item: any) => {
                      return (
                        <>
                          <View style={styles.item}>
                            <Text style={styles.textItem}>
                              {item.property_name}
                            </Text>
                          </View>
                        </>
                      );
                    }}
                  />
                )}
              </View>
            ) : null}
            <View style={styles.inputWrap}>
              {/* <Text style={styles.titleTxt}>{"Comment"}</Text> */}
              <InputField
                placeholderText={"Comment"}
                headingText={"Comment"}
                multiline={true}
                handleInputBtnPress={() => { }}
                inputheight={80}
                valueshow={props?.cancelValue?.remark}
                onChangeText={(val: any) => {
                  props.setCancelValue({
                    ...props.cancelValue,
                    remark: val,
                  });
                }}
              />
            </View>
          </View>
          <View style={{ marginVertical: 20 }}>
            <Button
              handleBtnPress={() => handleCancel()}
              buttonText={strings.cancelBooking}
            />
          </View>
        </View>
      </ScrollView>
    </Modal>
  );
};

export default CancelModal;
