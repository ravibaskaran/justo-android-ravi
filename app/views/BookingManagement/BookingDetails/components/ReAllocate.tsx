
import { View, Text, Image, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import Modal from "react-native-modal";
import styles from "app/components/Modals/styles";
import Styles from './styles'
import images from "app/assets/images";
import strings from "app/components/utilities/Localization";
import Button from "app/components/Button";
import InputField from "app/components/InputField";
import { normalizeSpacing } from "app/components/scaleFontSize";
import { useDispatch } from "react-redux";
import { cancelBooking } from "app/Redux/Actions/BookingActions";
import ErrorMessage from "app/components/ErrorMessage";
import { RED_COLOR } from "app/components/utilities/constant";

const ReAllocateModal = (props: any) => {
    const dispatch: any = useDispatch()
    const handleReAllocate = () => {
        dispatch(cancelBooking(props.reAllocateData))
    }
    return (
        <Modal isVisible={props.Visible}>
            <View style={Styles.bookingModelVw}>
                <View style={styles.topContainer}>
                    <Text style={styles.topTxt}>{'Re-Allocate to Closing Manager'}</Text>
                    <View>
                        <TouchableOpacity onPress={() => props.setIsVisible(false)}>
                            <Image source={images.close} style={styles.closeIcon} />
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={[styles.inputWrap, { top: normalizeSpacing(5) }]}>
                    <InputField
                        placeholderText={"Comment"}
                        headingText={"Comment"}
                        handleInputBtnPress={() => { }}
                        inputheight={80}
                        multiline={true}
                        valueshow={props?.reAllocateData?.description}
                        onChangeText={(val: any) => {
                            props.setReAllocateData({
                                ...props.reAllocateData,
                                description: val
                            })
                        }}
                    />
                </View>
                <View style={{ marginVertical: 20 }}>
                    <Button
                        handleBtnPress={() => {
                            if (props?.reAllocateData?.description !== '') {
                                handleReAllocate()
                                props.setIsVisible(false)
                            } else {
                                ErrorMessage({
                                    msg: 'Please Enter the comment',
                                    backgroundColor: RED_COLOR
                                })
                            }
                        }}
                        buttonText={strings.reAllocate} />
                </View>
            </View>
        </Modal>
    );
};
export default ReAllocateModal