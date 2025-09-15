import React from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import Modal from "react-native-modal";
import images from "../../../../assets/images";
import Button from "../../../../components/Button";
import strings from "../../../../components/utilities/Localization";
import styles from "./styles";

const UpdateStatusModal = (props: any) => {
  const configRender = (item: any) => {
    return (
      <View style={styles.item}>
        <Text style={styles.textItem}>{item.label}</Text>
      </View>
    );
  };
  return (
    <View>
      <Modal isVisible={props.Visible}>
        <View style={styles.bookingModelVw}>
          <View style={styles.topContainer}>
            <View style={{flexDirection: 'column'}}>
            <Text style={styles.topTxt}>{"Pickup Status"}</Text>
            <Text style={styles.descText}>{"Are you sure want to Pickup"}</Text>
            </View>
            <View>
              <TouchableOpacity onPress={() => props.setIsVisible(false)}>
                <Image source={images.close} style={styles.closeIcon} />
              </TouchableOpacity>
            </View>
          </View>
          {/* <View style={[styles.inputWrap, { marginVertical: 20 }]}>
            <ScrollView
              contentContainerStyle={{ flexGrow: 1 }}
              keyboardShouldPersistTaps={"handled"}
            >
              <DropdownInput
                style={styles.dropdown}
                placeholderStyle={styles.placeholderStyle}
                selectedTextStyle={styles.selectedTextStyle}
                iconStyle={styles.iconStyle}
                data={dropdownData}
                maxHeight={300}
                labelField="label"
                valueField={"value"}
                placeholder="Select status"
                value={dropdownData.value}
                onChange={(item: any) => {
                  console.log("item: ", item);
                  // set
                }}
                newRenderItem={configRender}
              />
            </ScrollView>
          </View> */}
          
          <View style={{ marginVertical: 20 }}>
            <Button
              handleBtnPress={() => {
                props.updatePickupStatus()
                props.setIsVisible(false);
              }}
              buttonText={strings.Confirm}
            />
          </View>
        </View>
      </Modal>
    </View>
  );
};
export default UpdateStatusModal;
