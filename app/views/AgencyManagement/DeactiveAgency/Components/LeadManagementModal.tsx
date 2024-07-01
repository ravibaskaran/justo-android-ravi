import { View, Text, Image, TouchableOpacity } from "react-native";
import React, { useEffect, useLayoutEffect, useState } from "react";
import Modal from "react-native-modal";
import styles from "../../../../components/Modals/styles";
import images from "../../../../assets/images";
import strings from "../../../../components/utilities/Localization";
import Button from "../../../../components/Button";
import InputField from "../../../../components/InputField";
import DropdownInput from "../../../../components/DropDown";
import { useDispatch, useSelector } from "react-redux";
import { getAllMaster } from "app/Redux/Actions/MasterActions";
import InputCalender from "app/components/InputCalender";
import moment from "moment";
import { DATE_FORMAT } from "app/components/utilities/constant";
import { getAssignCPList } from "app/Redux/Actions/SourcingManagerActions";
import { transferVisitList } from "app/Redux/Actions/TransferVisitAction";

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
