
import moment from "moment";
import React, { useEffect, useState } from "react";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import images from "../../../../assets/images";
import Button from "../../../../components/Button";
import DropdownInput from "../../../../components/DropDown";
import ErrorMessage from "../../../../components/ErrorMessage";
import Header from "../../../../components/Header";
import InputCalender from "../../../../components/InputCalender";
import InputField from "../../../../components/InputField";
import PicturePickerModal from "../../../../components/Modals/PicturePicker";
import styles from "../../../../components/Modals/styles";
import { normalizeSpacing } from "../../../../components/scaleFontSize";
import { AMOUNT_TYPE, DATE_FORMAT, GREEN_COLOR, Isios, PRIMARY_THEME_COLOR, RED_COLOR } from "../../../../components/utilities/constant";
import strings from "../../../../components/utilities/Localization";
import { addRegistration, removeBooking } from "../../../../Redux/Actions/BookingActions";
import Styles from './styles';

const RegistrationModal = ({ navigation, route }: any) => {
    const { getBookingData = {}, type = '' } = route?.params || {}
    const dispatch: any = useDispatch()
    const cancelAddBookingData = useSelector((state: any) => state.cancelAddBooking)
    const [documentBrowse, setDocumentBrowse] = useState(false)
    const [registerNowData, setRegisterNowData] = useState<any>({
        documents: [],
        register_date: '',
        total_amount: '',
        total_amount_type: 'L',
    });
    const handleDelete = (item: any, index: any) => {
        const array = [...registerNowData?.documents];
        array?.splice(index, 1);
        setRegisterNowData({
            ...registerNowData,
            documents: array,
        });
    };
    useEffect(() => {
        if (cancelAddBookingData?.response?.status === 200) {
            ErrorMessage({
                msg: cancelAddBookingData?.response?.message,
                backgroundColor: GREEN_COLOR
            })
            dispatch(removeBooking())
            navigation.goBack()
            setRegisterNowData({
                register_date: '',
                documents: [],
                total_amount: '',
                total_amount_type: 'L',
            })
        }
    }, [cancelAddBookingData])
    const validationRegisterNow = () => {
        let isError = true;
        let errorMessage: any = "";
        if (registerNowData.register_date == undefined ||
            registerNowData.register_date == "") {
            isError = false;
            errorMessage = "Register Date is require. Please select Register Date";
        } else if (registerNowData.total_amount == undefined ||
            registerNowData.total_amount == "") {
            isError = false;
            errorMessage = "Total Amount is require. Please select Total Amount";
        } else if (registerNowData.documents.length === 0) {
            isError = false;
            errorMessage = "Document is require. Please select Document";
        }
        if (errorMessage !== "") {
            ErrorMessage({
                msg: errorMessage,
                backgroundColor: RED_COLOR,
            });
        }
        return isError;
    }
    const handleRegisterNow = () => {
        if (validationRegisterNow()) {
            const formData = new FormData()
            for (let i = 0; i < registerNowData?.documents.length; i++) {
                formData.append('document', registerNowData?.documents[i])
            }
            formData.append("booking_id", getBookingData?._id)
            formData.append("remark", "")
            formData.append("lead_id", getBookingData?.lead_id)
            formData.append("property_id", getBookingData?.property_id)
            formData.append("customer_id", getBookingData?.customer_id)
            formData.append("appointment_id", getBookingData?.appointment_id)
            formData.append("registration_date", registerNowData?.register_date)
            
            formData.append("total_amount", registerNowData?.total_amount)
            formData.append("total_amount_type", registerNowData?.total_amount_type)
            dispatch(addRegistration(formData))
        }
    }
    const handleBackPress = () => {
        navigation.goBack()
    }
    return (
        <View style={[styles.mainContainer, { flex: 1 }]}>
            <Header
                leftImageSrc={images.backArrow}
                // rightSecondImageScr={images.notification}
                headerText={strings.registrationHeader}
                leftImageIconStyle={Styles.RightFirstIconStyle}
                handleOnLeftIconPress={handleBackPress}
                headerStyle={Styles.headerStyle}
                statusBarColor={PRIMARY_THEME_COLOR}
                barStyle={'light-content'}
            />
            <ScrollView keyboardShouldPersistTaps={'handled'}>
                <View style={Styles.bookingModelVw}>
                    <View style={[styles.inputWrap, { top: normalizeSpacing(5) }]}>
                        <InputCalender
                            require={true}
                            mode={'date'}
                            leftIcon={images.event}
                            placeholderText={"Registration Date"}
                            headingText={"Registration Date"}
                            minimumDate={new Date()}
                            editable={false}
                            dateData={(data: any) => {
                                setRegisterNowData({
                                    ...registerNowData,
                                    register_date: moment(data).format(DATE_FORMAT)
                                })
                            }}
                            setDateshow={(data: any) => {
                                setRegisterNowData({
                                    ...registerNowData,
                                    register_date: moment(data).format(DATE_FORMAT)
                                })
                            }}
                            value={registerNowData?.register_date}
                        />
                    </View>
                    <View style={[styles.inputWrap, Styles.straightVw]}>
                        <InputField
                            disableSpecialCharacters={true}
                            require={true}
                            inputWidth={'70%'}
                            headingText={"Total Amount"}
                            maxLength={4}
                            handleInputBtnPress={() => { }}
                            onChangeText={(data: any) => {
                                setRegisterNowData({
                                    ...registerNowData,
                                    total_amount: data,
                                })
                            }}
                            valueshow={registerNowData?.total_amount}
                            keyboardtype={'number-pad'}
                        />
                        <DropdownInput
                            inputWidth={Isios ? 45 : 49}
                            inputheight={Isios ? 20 : 45}
                            paddingLeft={10}
                            itemContainerStyle={{ width: 100 }}
                            iconStyle={{ width: 15, height: 15 }}
                            data={AMOUNT_TYPE}
                            itemTextStyle={{ fontSize: 8 }}
                            labelField="value"
                            valueField={'value'}
                            placeholder={registerNowData?.total_amount_type}
                            value={registerNowData?.total_amount_type}
                            onChange={(item: any) => {
                                setRegisterNowData({
                                    ...registerNowData,
                                    total_amount_type: item.value,
                                })
                            }}
                            newRenderItem={(item: any) => {
                                return (
                                    <>
                                        <View style={Styles.item}>
                                            <Text style={Styles.textItem}>{item.value}</Text>
                                        </View>
                                    </>
                                );
                            }}
                        />
                    </View>
                    <View style={[styles.inputWrap, Styles.straightVw]}>
                        <Text style={Styles.inputHeadingText}>{strings.document} <Text style={styles.redStar}>*</Text> </Text>
                        <Button
                            width={110}
                            height={32}
                            marginHorizontal={0}
                            buttonText={registerNowData?.documents?.length > 0 ?
                                strings.add : strings.browse}
                            bgcolor={PRIMARY_THEME_COLOR}
                            border={10}
                            handleBtnPress={() => setDocumentBrowse(true)}
                        />
                    </View>
                    {registerNowData?.documents?.length > 0 ?
                        registerNowData?.documents?.map((item: any, index: any) => {
                            return (
                                <View style={Styles.documentVw}>
                                    <Text style={Styles.documentTxt}>{strings.document} {index + 1}</Text>
                                    {/* <Image source={{ uri: item.uri }}
                                    style={Styles.documentIcon}
                                /> */}
                                    <TouchableOpacity onPress={() => handleDelete(item, index)}>
                                        <Image source={images.close} style={Styles.documentIcon} />
                                    </TouchableOpacity>
                                </View>
                            )
                        })
                        : null
                    }
                    <View style={{ marginTop: normalizeSpacing(50), }}>
                        <Button
                            handleBtnPress={() => handleRegisterNow()}
                            buttonText={strings.registerNow} />
                    </View>
                </View>
            </ScrollView>
            <PicturePickerModal
                Visible={documentBrowse}
                setVisible={setDocumentBrowse}
                value={registerNowData?.documents}
                imageData={(data: any) => {
                    if (Array.isArray(data)) {
                        const datass = data[0]
                        setRegisterNowData({
                            ...registerNowData,
                            documents: [...registerNowData?.documents, datass],
                        });
                    } else {
                        setRegisterNowData({
                            ...registerNowData,
                            documents: [...registerNowData?.documents, data],
                        });
                    }
                }}
                multiple={true}
                docType={'all'}
            />
        </View>
    );
};
export default RegistrationModal