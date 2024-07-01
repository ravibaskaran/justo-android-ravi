
import { View, Text, Image, TouchableOpacity, ScrollView } from "react-native";
import React, { useState } from "react";
import Modal from "react-native-modal";
import styles from "./Styles";
import images from "../../../../assets/images";
import strings from "../../../../components/utilities/Localization";
import { Dropdown } from "react-native-element-dropdown";
import Button from "../../../../components/Button";
import InputField from "../../../../components/InputField";
import { DATE_FORMAT, RED_COLOR, WHITE_COLOR } from "../../../../components/utilities/constant";
import InputCalender from "app/components/InputCalender";
import moment from "moment";
import ErrorMessage from "app/components/ErrorMessage";
import { RequiredStart } from "app/components/utilities/GlobalFuncations";

const ReadyToBookModal = (props: any) => {
    return (
        <View>
            <Modal isVisible={props.Visible}>
                <ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: "center" }} keyboardShouldPersistTaps={'handled'}>
                    <View style={styles.bookingModelVw}>
                        <View style={styles.topContainer}>
                            <Text style={styles.topTxt}>{strings.bookingConfirmation}</Text>
                            <View>
                                <TouchableOpacity onPress={() => props.setIsVisible(false)}>
                                    <Image source={images.close} style={styles.closeIcon} />
                                </TouchableOpacity>
                            </View>
                        </View>
                        <View style={styles.inputWrap}>
                            <InputCalender
                                mode={'date'}
                                require={true}
                                leftIcon={images.event}
                                placeholderText={strings.bookingDate}
                                headingText={strings.bookingDate}
                                minimumDate={new Date()}
                                editable={false}
                                dateData={(data: any) => {
                                    props.setBookingData({
                                        ...props.BookingData,
                                        booking_date: moment(data).format(DATE_FORMAT)
                                    })
                                }}
                                setDateshow={(data: any) => {
                                    props.setBookingData({
                                        ...props.BookingData,
                                        booking_date: moment(data).format(DATE_FORMAT)
                                    })
                                }}
                                value={props.BookingData?.booking_date}
                            />
                        </View>
                        <View style={styles.inputWrap}>
                            <InputField
                                placeholderText={strings.comment}
                                headingText={strings.comment}
                                handleInputBtnPress={() => { }}
                                inputheight={80}
                                multiline={true}
                                valueshow={props.BookingData?.description}
                                onChangeText={(val: any) => {
                                    props.setBookingData({
                                        ...props.BookingData,
                                        description: val
                                    })
                                }}
                            />
                        </View>
                        <View style={{ marginVertical: 20 }}>
                            <Button
                                handleBtnPress={() => {
                                    if (props?.BookingData?.booking_date) {
                                        props.setIsVisible(false)
                                        props.handleBooking()
                                    } else {
                                        ErrorMessage({
                                            msg: strings.bookingDateReqVal,
                                            backgroundColor: RED_COLOR
                                        })
                                    }
                                }}
                                buttonText={props.doneBttnTxt ? props.doneBttnTxt : strings.Confirm} />
                        </View>
                    </View>
                </ScrollView>
            </Modal>
        </View>
    );
};
export default ReadyToBookModal