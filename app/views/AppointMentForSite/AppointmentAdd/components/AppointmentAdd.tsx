import React from "react";
import { View, Text, Image, FlatList, ScrollView } from 'react-native';
import images from "../../../../assets/images";
import Button from "../../../../components/Button";
import DropdownInput from "../../../../components/DropDown";
import Header from "../../../../components/Header";
import InputField from "../../../../components/InputField";
import { DATE_FORMAT, Isios, ONE_MONTH_DATES, PRIMARY_THEME_COLOR, TIME_FORMAT } from "../../../../components/utilities/constant";
import strings from "../../../../components/utilities/Localization";
import styles from "./styles";
import Styles from "../../../../components/DropDown/styles";
import InputCalender from "app/components/InputCalender";
import moment from "moment";
import { leadTypes } from "app/components/utilities/DemoData";

const AppointmentAddView = (props: any) => {
    return (
        <View style={styles.mainContainer}>
            <Header
                leftImageSrc={images.backArrow}
                rightSecondImageScr={images.notification}
                headerText={strings.appointmnet}
                headerStyle={styles.headerStyle}
                RightFirstIconStyle={styles.leftImageIconStyle}
                leftImageIconStyle={styles.leftImageIconStyle}
                handleOnLeftIconPress={props.handleBackPress}
                barStyle={'light-content'}
                statusBarColor={PRIMARY_THEME_COLOR}
            />
            <ScrollView
            automaticallyAdjustKeyboardInsets={Isios ? true : false}
             keyboardShouldPersistTaps={'handled'}
                contentContainerStyle={{ flexGrow: 1 }}>
            <View style={styles.topItemsVw}>
                <View style={styles.inputWrap}>
                    <DropdownInput
                        headingText={'Status'}
                        placeholder={strings.status}
                        data={[
                            { label: "Rescheduled", value: "1" },
                            { label: "Appointment cancel", value: "4" },
                        ]}
                        inputWidth={'100%'}
                        paddingLeft={16}
                        maxHeight={300}
                        labelField="label"
                        valueField={'value'}
                        value={props?.formData?.status}
                        onChange={(item: any) => {
                            props.setStatus(item)
                        }}
                        newRenderItem={(item: any) => {
                            return (
                                <>
                                    <View style={Styles.item}>
                                        <Text style={Styles.textItem}>{item.label}</Text>
                                    </View>
                                </>
                            );
                        }}
                    />
                </View>
                {/* <View style={styles.inputWrap}>
                    <DropdownInput
                        headingText={strings.leadType}
                        placeholder={strings.leadType}
                        data={leadTypes}
                        inputWidth={'100%'}
                        paddingLeft={16}
                        maxHeight={300}
                        labelField="label"
                        valueField={'value'}
                        value={props?.formData?.visit_status}
                        onChange={(item: any) => {
                            props.setFormData({
                                ...props.formData,
                                visit_status: item.value,
                            })
                        }}
                        newRenderItem={(item: any) => {
                            return (
                                <View style={Styles.item}>
                                    <Text style={Styles.textItem}>{item.label}</Text>
                                </View>
                            );
                        }}
                    />
                </View> */}
                {props?.formData?.status === "1" ?
                    (
                        <>
                            <View style={styles.inputWrap}>
                                <InputCalender
                                    headingText={'Date'}
                                    mode={'date'}
                                    leftIcon={images.event}
                                    placeholderText={"Date"}//can edit
                                    editable={false}
                                    minimumDate={new Date()}
                                    maximumDate={ONE_MONTH_DATES}
                                    // onChangeText={() => { }}
                                    dateData={(data: any) => {
                                        props.setFormData({
                                            ...props.formData,
                                            appointment_time: '',
                                            appointment_date: moment(data).format(DATE_FORMAT)
                                        })
                                    }}
                                    setDateshow={(data: any) => {
                                        props.setFormData({
                                            ...props.formData,
                                            appointment_time: '',
                                            appointment_date: moment(data).format(DATE_FORMAT)
                                        })
                                    }}
                                    value={props?.formData?.appointment_date}
                                />
                            </View>
                            <View style={styles.inputWrap}>
                                <InputCalender
                                    headingText={'Time'}
                                    mode={"time"}
                                    dateValue={props?.formData?.appointment_date}
                                    leftIcon={images.timer}
                                    placeholderText={"Time"}
                                    editable={false}
                                    dateData={(data: any) => {
                                        props.setFormData({
                                            ...props.formData,
                                            appointment_time: data,
                                        })
                                    }}
                                    setDateshow={(data: any) => {
                                        props.setFormData({
                                            ...props.formData,
                                            appointment_time: data,
                                        })
                                    }}
                                    value={props?.formData?.appointment_time}
                                />
                            </View>
                        </>
                    ) : null}
                <View style={styles.inputWrap}>
                    <InputField
                        headingText={'Description'}
                        placeholderText={"Description"}
                        handleInputBtnPress={() => { }}
                        onChangeText={(val: any) => {
                            props.setFormData({
                                ...props.formData,
                                remark: val,
                            })
                        }}
                        multiline={true}
                        inputheight={100}
                    />
                </View>
                <View style={styles.inputWrap}>
                    <Button
                        width={320}
                        btnTxtsize={18}
                        buttonText={strings.update + " " + strings.appointmnet}
                        handleBtnPress={() => props.handleUpdateStatus()}
                    />
                </View>
                <View style={styles.inputWrap}>
                    <Button
                        width={320}
                        btnTxtsize={18}
                        buttonText={strings.allfollowup}
                        handleBtnPress={() => props.handleAllFollowUp()}
                    />
                </View>
            </View>
            </ScrollView>
        </View>
    )
}
export default AppointmentAddView