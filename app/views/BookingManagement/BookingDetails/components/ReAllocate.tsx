
import React from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import Modal from "react-native-modal";
import { useDispatch } from "react-redux";
import { cancelBooking } from "../../../../Redux/Actions/BookingActions";
import images from "../../../../assets/images";
import Button from "../../../../components/Button";
import ErrorMessage from "../../../../components/ErrorMessage";
import InputField from "../../../../components/InputField";
import styles from "../../../../components/Modals/styles";
import { normalizeSpacing } from "../../../../components/scaleFontSize";
import strings from "../../../../components/utilities/Localization";
import { RED_COLOR } from "../../../../components/utilities/constant";
import Styles from './styles';

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