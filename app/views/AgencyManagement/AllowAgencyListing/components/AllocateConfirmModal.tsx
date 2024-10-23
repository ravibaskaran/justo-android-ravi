import { View, Text, Image, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import Modal from "react-native-modal";
import styles from "../../../../components/Modals/styles";
import images from "app/assets/images";
import Button from "app/components/Button";
import strings from "app/components/utilities/Localization";
import { Dropdown } from "react-native-element-dropdown";
import { useDispatch, useSelector } from "react-redux";
import {
  assignCPSM,
  getSourcingHeadSMList,
  getSourcingManagerList,
} from "app/Redux/Actions/SourcingManagerActions";
import ErrorMessage from "app/components/ErrorMessage";
import { RED_COLOR, ROLE_IDS } from "app/components/utilities/constant";
const data = [
  { label: "Item 1", value: "1" },
  { label: "Item 2", value: "2" },
  { label: "Item 3", value: "3" },
  { label: "Item 4", value: "4" },
  { label: "Item 5", value: "5" },
  { label: "Item 6", value: "6" },
  { label: "Item 7", value: "7" },
  { label: "Item 8", value: "8" },
];
const AllocateConfirmModal = (props: any) => {
  const [value, setValue] = useState(null);
  const [allocateData, setAllocateData] = useState<any>({
    cp_id: [],
    user_id: "",
    assign_type: 2,
    property_id: "",
  });
  const [isYes, setisYes] = useState(false);
  const dispatch: any = useDispatch();
  const [sourcingManagers, setSourcingManagers] = useState<any>([]);
  const { response = {}, list = "" } = useSelector(
    (state: any) => state.SourcingManager
  );
  const { userData = {} } = useSelector((state: any) => state.userData);
  useEffect(() => {
    setSourcingManagers([]);
    if (userData?.data?.role_id === ROLE_IDS.sourcing_head_id) {
      dispatch(
        getSourcingHeadSMList({
          property_id: props?.statusChange?.property_id,
        })
      );
    } else {
      dispatch(
        getSourcingManagerList({
          property_id: props?.statusChange?.property_id,
        })
      );
    }

    setAllocateData({
      cp_id: [props?.statusChange?._id],
      property_id: props?.statusChange?.property_id,
      assign_type: 2,
    });
    return () => {};
  }, [props?.statusChange]);

  useEffect(() => {
    if (response?.status === 200) {
      if (response?.data?.length > 0) {
        setSourcingManagers(response?.data);
      }
    }
    return () => {};
  }, [response]);

  const onpressAllocation = () => {
    dispatch(assignCPSM(allocateData));
    setAllocateData([]);
    props.getPendingList();
  };

  const renderItem = (item: any) => {
    return (
      <View style={styles.item}>
        <Text style={styles.textItem}>{item.user_name}</Text>
      </View>
    );
  };
  return (
    <View>
      <Modal isVisible={props.Visible}>
        <View style={styles.mainContainer}>
          <View style={styles.topContainer}>
            <View />
            <Text style={styles.topTxt}>
              {props.stringshow ? props.stringshow : strings.confirmation}
            </Text>
            <View>
              <TouchableOpacity
                onPress={() => {
                  props.setIsVisible(false);
                  setisYes(false);
                  // props.setStatusChange ? props.setStatusChange({}) : null
                }}
              >
                <Image source={images.close} style={styles.closeIcon} />
              </TouchableOpacity>
            </View>
          </View>

          {!isYes ? (
            <>
              <View style={styles.borderView} />
              <View style={styles.conteconfirm}>
                <View style={styles.MiddleContainer}>
                  <Text style={styles.bottomTxt}>{props.textshow}</Text>
                </View>
                <View style={{ marginVertical: 10, flexDirection: "row" }}>
                  <View style={styles.btnview}>
                    <Button
                      buttonText={strings.no}
                      width={120}
                      height={40}
                      handleBtnPress={() => {
                        props.setIsVisible(false);
                        setisYes(false);
                        // props.setStatusChange ? props.setStatusChange({}) : null
                      }}
                    />
                  </View>
                  <View style={styles.btnview}>
                    <Button
                      buttonText={strings.yes}
                      width={120}
                      height={40}
                      handleBtnPress={() => {
                        // props?.handleYesResponse ? props.handleYesResponse() : null
                        // props.setIsVisible(false)
                        setisYes(true);
                      }}
                    />
                  </View>
                </View>
              </View>
            </>
          ) : (
            <>
              <View style={styles.borderView} />
              <View style={styles.MiddleContainer}>
                <Text style={styles.bottomTxt}>{strings.selectTheSm}</Text>
              </View>
              <View>
                <Dropdown
                  style={styles.dropdown}
                  placeholderStyle={styles.placeholderStyle}
                  selectedTextStyle={styles.selectedTextStyle}
                  iconStyle={styles.iconStyle}
                  data={sourcingManagers}
                  maxHeight={300}
                  labelField="user_name"
                  valueField="_id"
                  placeholder={
                    props.placeholder ? props.placeholder : strings.selectSM
                  }
                  value={value}
                  onChange={(item) => {
                    setValue(item?._id);
                    setAllocateData({
                      ...allocateData,
                      user_id: item?._id,
                    });
                  }}
                  renderItem={renderItem}
                />
              </View>
              <View style={{ marginVertical: 10 }}>
                <Button
                  handleBtnPress={() => {
                    if (allocateData?.user_id) {
                      onpressAllocation();
                      props.setIsVisible(false);
                    } else {
                      ErrorMessage({
                        msg: strings.selectSMReqVal,
                        backgroundColor: RED_COLOR,
                      });
                    }
                  }}
                  buttonText={
                    props.doneBttnTxt ? props.doneBttnTxt : strings.Confirm
                  }
                />
              </View>
            </>
          )}
        </View>
      </Modal>
    </View>
  );
};

export default AllocateConfirmModal;
