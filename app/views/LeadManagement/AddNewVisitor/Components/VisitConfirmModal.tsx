import { View, Text, TouchableOpacity, Image } from "react-native";
import React, { useEffect, useState } from "react";
import Modal from "react-native-modal";
import styles from "./Styles";
import strings from "../../../../components/utilities/Localization";
import Button from "app/components/Button";
import { useSelector } from "react-redux";
import images from "app/assets/images";
import moment from "moment";
import { DATE_FORMAT } from "app/components/utilities/constant";

const VisitConfirmModal = (props: any) => {
    const { response = {}, check_type = "" } = useSelector((state: any) => state.checkVisitorData);
    const [responseData, setResponseData] = useState<any>({})
    useEffect(() => {
        if (response?.status === 201 || response?.status === 202) {
            if (response?.status) {
                setResponseData(response)
            } else {
                setResponseData({})
            }
        }
        props.setFormData({ ...props.formData })
    }, [response])
    const onPressLeftButton = () => {
        props.setIsVisible(false)
        if (responseData?.status === 201) {
            props.setFormData({
                ...props.formData,
                visit_confirmation_status: "",
                mobile: '',
            })
        } if (responseData?.status === 202) {
            props.setFormData({
                ...props.formData,
                address: responseData?.data[0]?.address ? responseData?.data[0]?.address : '',
                adhar_no: responseData?.data[0]?.adhar_no ? responseData?.data[0]?.adhar_no : '',
                age: responseData?.data[0]?.age ? responseData?.data[0]?.age : '',
                agent_code: responseData?.data[0]?.agent_code ? responseData?.data[0]?.agent_code : '',
                area: responseData?.data[0]?.area ? responseData?.data[0]?.area : '',
                city: responseData?.data[0]?.city ? responseData?.data[0]?.city : '',
                coumpany_name: responseData?.data[0]?.coumpany_name ? responseData?.data[0]?.coumpany_name : '',
                current_stay: responseData?.data[0]?.current_stay ? responseData?.data[0]?.current_stay : '',
                desigantion: responseData?.data[0]?.desigantion ? responseData?.data[0]?.desigantion : '',
                email: responseData?.data[0]?.email ? responseData?.data[0]?.email : '',
                first_name: responseData?.data[0]?.first_name ? responseData?.data[0]?.first_name : '',
                funding_emi_type: responseData?.data[0]?.funding_emi_type ? responseData?.data[0]?.funding_emi_type : '',
                gender: responseData?.data[0]?.gender ? responseData?.data[0]?.gender : '',
                locality: responseData?.data[0]?.locality ? responseData?.data[0]?.locality : '',
                location: responseData?.data[0]?.location ? responseData?.data[0]?.location : '',
                marital_status: responseData?.data[0]?.marital_status ? responseData?.data[0]?.marital_status : '',
                mobile: responseData?.data[0]?.mobile ? responseData?.data[0]?.mobile : '',
                no_of_family_member: responseData?.data[0]?.no_of_family_member ? responseData?.data[0]?.no_of_family_member : '',
                occupation: responseData?.data[0]?.occupation ? responseData?.data[0]?.occupation : '',
                office_address: responseData?.data[0]?.office_address ? responseData?.data[0]?.office_address : '',
                pancard_no: responseData?.data[0]?.pancard_no ? responseData?.data[0]?.pancard_no : '',
                visit_type: responseData?.data[0]?.visit_type ? responseData?.data[0]?.visit_type : '',
                whatsapp_no: responseData?.data[0]?.whatsapp_no ? responseData?.data[0]?.whatsapp_no : '',
                birth_date: responseData?.data[0]?.birth_date ?
                    moment(responseData?.data[0]?.birth_date).format(DATE_FORMAT) : '',
                visit_confirmation_status: 2,
            })
        }
    }
    const onPressRightButton = () => {
        props.setIsVisible(false)
        if (responseData?.status === 201) {
            props.setFormData({
                ...props.formData,
                visit_confirmation_status: 1,
            })
        } if (responseData?.status === 202) {
            props.setFormData({
                ...props.formData,
                visit_confirmation_status: 1
            })
        }
    }
    return (
        <Modal isVisible={props.Visible}>
            <View style={styles.conteconfirm}>
                <View style={styles.topContainer}>
                    <View />
                    <Text style={styles.topTxt}>{(props.stringshow) ? props.stringshow : strings.confirmation}</Text>
                    <View>
                        <TouchableOpacity onPress={() => {
                            props.setIsVisible(false)
                            props.setFormData({
                                ...props.formData,
                                visit_confirmation_status: "",
                            })
                        }}>
                            <Image source={images.close} style={styles.closeIcon} />
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={styles.borderView} />
                <View style={styles.MiddleContainer}>
                    <Text style={styles.bottomTxt}>{
                        responseData?.message === "" || responseData?.message === undefined ||
                            responseData?.message === null ? strings.notfount : responseData?.message
                    }</Text>
                </View>
                <View style={{ marginVertical: 10, marginHorizontal: 25, flexDirection: 'row' }}>
                    <View style={styles.btnview}>
                        <Button
                            buttonText={responseData?.status === 201 ?
                                strings.no : responseData?.status === 202 ? strings.useOldData : strings.notfount}
                            width={130} height={40}
                            handleBtnPress={() => onPressLeftButton()}
                        />
                    </View>
                    <View style={styles.btnview}>
                        <Button
                            buttonText={responseData?.status === 201 ?
                                strings.yes : responseData?.status === 202 ? strings.createNew : strings.notfount}
                            width={130} height={40}
                            handleBtnPress={() => onPressRightButton()} />
                    </View>
                </View>
            </View>
        </Modal>
    );
};

export default VisitConfirmModal;
