import { getAssignCPList } from "../../../../Redux/Actions/SourcingManagerActions";
import { transferVisitList } from "../../../../Redux/Actions/TransferVisitAction";
import React, { useLayoutEffect, useState } from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import Modal from "react-native-modal";
import { useDispatch, useSelector } from "react-redux";
import images from "../../../../assets/images";
import Button from "../../../../components/Button";
import DropdownInput from "../../../../components/DropDown";
import styles from "../../../../components/Modals/styles";
import strings from "../../../../components/utilities/Localization";

const FilterModal = (props: any) => {
  const dispatch: any = useDispatch();
  const { smData } = props;
  const { response = { data: [] } } =
    useSelector((state: any) => state.SourcingManager) || {};

  const [transferData, setTransferData] = useState({
    user_id: smData._id,
    new_user_id: "",
  });
  useLayoutEffect(() => {
    dispatch(
      getAssignCPList({
        user_id: smData?._id,
      })
    );
  }, []);

  const dataconfiguration =
    response?.data?.length > 0
      ? response?.data.filter((item: any) => item._id !== smData._id)
      : [];

  const handleTranferPress = () => {
    if (transferData.new_user_id !== "") {
      dispatch(transferVisitList(transferData));
      props.setIsVisible(false);
    }
  };

  const visitorRender = (item: any) => {
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
            <Text style={styles.topTxt}>{strings.selectAgency}</Text>
            <View>
              <TouchableOpacity onPress={() => props.setIsVisible(false)}>
                <Image source={images.close} style={styles.closeIcon} />
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.borderView} />
          <View style={{ marginHorizontal: 10 }}>
            <View>
              <Text style={styles.descTxt}>
                {strings.selectAgncyTrnsfr}
              </Text>
            </View>
            <View style={styles.inputWrap}>
              <DropdownInput
                style={styles.dropdown}
                placeholderStyle={styles.placeholderStyle}
                selectedTextStyle={styles.selectedTextStyle}
                iconStyle={styles.iconStyle}
                data={dataconfiguration}
                maxHeight={300}
                labelField="user_name"
                valueField="_id"
                placeholder={strings.select + " " + strings.agency}
                value={transferData?.new_user_id}
                onChange={(item: any) => {
                  setTransferData({
                    ...transferData,
                    new_user_id: item?._id,
                  });
                }}
                newRenderItem={visitorRender}
              />
            </View>
          </View>
          <View style={{ marginVertical: 20 }}>
            <View style={{ flexDirection: "row", justifyContent: "center" }}>
              <Button
                width={135}
                buttonText={strings.transfer}
                handleBtnPress={() => handleTranferPress()}
              />
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default FilterModal;
