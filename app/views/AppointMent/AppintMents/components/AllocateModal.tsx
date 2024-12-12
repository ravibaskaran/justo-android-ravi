
import { View, Text, Image, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import Modal from "react-native-modal";
import styles from "./styles";
import images from "../../../../assets/images";
import strings from "../../../../components/utilities/Localization";
import { Dropdown } from "react-native-element-dropdown";
import Button from "../../../../components/Button";
import InputField from "../../../../components/InputField";
import { GRAY_LIGHT_COLOR, WHITE_COLOR } from "../../../../components/utilities/constant";
import DropdownInput from "app/components/DropDown";

const AllocateModal = (props: any) => {
    return (
        <View>
            <Modal isVisible={props.Visible}>
                <View style={styles.bookingModelVw}>
                    <View style={styles.topContainer}>
                        <Text style={styles.topTxt}>{strings.allocate}</Text>
                        <View>
                            <TouchableOpacity onPress={() => props.setIsVisible(false)}>
                                <Image source={images.close} style={styles.closeIcon} />
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={styles.inputWrap}>
                        <DropdownInput
                            placeholder={strings.selectNewClosMngr}
                            headingText={strings.selectNewClosMngr}
                            data={props?.ClosingMList}
                            // onFocus={() => props.getCMList()}
                            inputWidth={'100%'}
                            paddingLeft={16}
                            maxHeight={300}
                            labelField="user_name"
                            valueField={'user_id'}
                            value={props?.formData?.user_id}
                            onChange={(item: any) => {
                                props.setAllocatedCM({
                                    ...props.allocatedCM,
                                    user_id: item.user_id,
                                })
                            }}
                            newRenderItem={(item: any) => {
                                return (
                                    <>
                                        <View style={{
                                            padding: 17,
                                            flexDirection: "row",
                                            justifyContent: "space-between",
                                            alignItems: "center",
                                        }}>
                                            <Text style={{
                                                flex: 1,
                                                fontSize: 16,
                                                color: GRAY_LIGHT_COLOR
                                            }}>{item.user_name}</Text>
                                        </View>
                                    </>
                                );
                            }}
                        />
                    </View>
                    <View style={{ marginVertical: 20 }}>
                        <Button
                            handleBtnPress={() => {
                                props.handleAllocateCM()
                                props.setIsVisible(false)
                            }}
                            buttonText={props.doneBttnTxt ? props.doneBttnTxt : strings.Confirm} />
                    </View>
                </View>
            </Modal>
        </View>
    );
};
export default AllocateModal