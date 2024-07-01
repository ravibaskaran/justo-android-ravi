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
import { Isios, RED_COLOR } from "app/components/utilities/constant";
import { useFocusEffect } from "@react-navigation/native";
import { RequiredStart } from "app/components/utilities/GlobalFuncations";

const CancelModal = (props: any) => {
  const dispatch: any = useDispatch();
  const [masterDatas, setMasterDatas] = useState<any>();
  const [propertyCompetitor, setPropertyCompetitor] = useState<any>();
  const [propetyInput, setPropetyInput] = useState<any>(false);
  const [reasonSelect, setReasonSelect] = useState<any>(false);
  const masterData = useSelector((state: any) => state.masterData) || {};
  const item = props?.item?.length > 0 ? props?.item[0] : {}
  const propertyData =
    useSelector((state: any) => state.competitorproperty) || {};

  useFocusEffect(
    React.useCallback(() => {
      handleMasterDatas(8)
      return () => { };
    }, [])
  );

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
      } else {
        setPropertyCompetitor([]);
      }
    }
    // else {
    //   if (
    //     propertyData?.response?.status === 201 ||
    //     propertyData?.response?.data?.length > 0
    //   ) {
    //     setPropetyInput(true);
    //     setPropertyCompetitor([]);
    //     dispatch(removePropertyCompetitor());
    //   }
    // }
  }, [propertyData]);
  useEffect(() => {
    // props?.setCancelValue({
    //   resion: '',
    //   property_id: '',
    //   comment: '',
    //   property_name: '',
    //   remark: '',
    //   appointment_status: ''
    // })
    if (masterData?.response?.status === 200) {
      if (masterData?.response?.data?.length > 0) {
        setMasterDatas(
          masterData?.response?.data?.length > 0 ? masterData?.response?.data : []
        );
      } else {
        setMasterDatas([]);
      }
    }
  }, [masterData]);

  const validation = () => {
    let isError = true;
    let errorMessage: any = "";
    if (props?.cancelValue?.appointment_status !== 6) {
      if (props?.cancelValue?.appointment_status === "") {
        isError = false;
        errorMessage = strings.appointMentStatusReqVal;
      }
    } else {
      if (props?.cancelValue?.resion === "") {
        isError = false;
        errorMessage = strings.resionSelectReqVal;
      } if (propetyInput && props?.cancelValue?.property_name === "") {
        isError = false;
        errorMessage = strings.competitorReqVal;
      } else if (
        props?.cancelValue?.resion === "639d691c9f37df12d3ea64e2" && !propetyInput &&
        props?.cancelValue?.property_id === ""
      ) {
        isError = false;
        errorMessage = strings.propertyNameReqVal;
      }
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
        automaticallyAdjustKeyboardInsets={Isios ? true : false}
        contentContainerStyle={{ flexGrow: 1, justifyContent: "center" }}
      >
        <View style={styles.mainContainer}>
          <View style={styles.topContainer}>
            <Text style={styles.topTxt}>{strings.closeAppointMent}</Text>
            <View>
              <TouchableOpacity
                onPress={() => {
                  props.setIsVisible(false);
                  setPropetyInput(false);
                  props.setCancelValue({
                    resion: "",
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
          <View style={{ marginHorizontal: 10 }}>
            <View style={styles.inputWrap}>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Text style={styles.titleTxt}>{strings.selectType} 
                </Text>
                <RequiredStart />
              </View>
              <DropdownInput
                placeholder={strings.selectType}
                data={
                  item?.checkin_status ?
                    [
                      { label: strings.STSNotFitForSale, value: 6 },
                    ]
                    :
                    [
                      { label: strings.STSVisitCancel, value: 4 },
                      { label: strings.STSNotFitForSale, value: 6 },
                    ]
                }
                inputWidth={"100%"}
                paddingLeft={16}
                maxHeight={300}
                labelField="label"
                valueField="value"
                value={props?.cancelValue?.appointment_status}
                onChange={(item: any) => {
                  props.setCancelValue({
                    ...props.cancelValue,
                    appointment_status: item.value,
                  });
                }}
                newRenderItem={(item: any) => {
                  return (
                    <>
                      <View style={styles.item}>
                        <Text style={styles.textItem}>{item.label}</Text>
                      </View>
                    </>
                  );
                }}
              />
            </View>
            {props?.cancelValue?.appointment_status === 6 ?
              (<View style={styles.inputWrap}>
                <Text style={styles.titleTxt}>{strings.selectReason}</Text>
                <DropdownInput
                  placeholder={strings.selectReason}
                  data={masterDatas}
                  inputWidth={"100%"}
                  paddingLeft={16}
                  maxHeight={300}
                  // onFocus={() => handleMasterDatas(8)}
                  labelField="title"
                  valueField={"_id"}
                  value={props?.cancelValue?.resion}
                  onChange={(item: any) => {

                    setReasonSelect(false);
                    props.setCancelValue({
                      ...props.cancelValue,
                      resion: item._id,
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
              </View>) : null}
            {reasonSelect ? (
              <View>
                <Text style={styles.errorTxt}>
                  {strings.selectReasonCnclBooking}
                </Text>
              </View>
            ) : null}
            {props?.cancelValue?.resion === "639d691c9f37df12d3ea64e2" ? (
              <View style={styles.inputWrap}>
                <View style={styles.propertyVw}>
                  <Text style={styles.titleTxt}>
                    {propetyInput ? strings.propertyHeader + " " + strings.name : strings.selectproperty}
                  </Text>
                  {(!propetyInput && props?.cancelValue?.property_id === "") ||
                    props?.cancelValue?.property_id === undefined ? (
                    <View style={styles.addNewBttn}>
                      <Button
                        width={80}
                        height={25}
                        btnTxtsize={12}
                        buttonText={strings.addNew}
                        handleBtnPress={() => setPropetyInput(true)}
                      />
                    </View>
                  ) : null}
                </View>
                {propetyInput ? (
                  <InputField
                    disableSpecialCharacters={true}
                    placeholderText={strings.propertyHeader + " " + strings.name}
                    // headingText={strings.propertyHeader + " " + strings.name}
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
                    data={Array.isArray(propertyCompetitor) ? propertyCompetitor : []}
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
              <Text style={styles.titleTxt}>{strings.comment}</Text>
              <InputField
                placeholderText={strings.comment}
                handleInputBtnPress={() => { }}
                inputheight={80}
                multiline={true}
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
              buttonText={strings.closeAppointMent}
            />
          </View>
        </View>
      </ScrollView>
    </Modal>
  );
};

export default CancelModal;
