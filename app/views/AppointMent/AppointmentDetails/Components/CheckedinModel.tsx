
import { getAppointmentDetail } from "../../../../Redux/Actions/AppointmentWithCpActions";
import { cpAppointmentCheckIn, removeMasters } from "../../../../Redux/Actions/MasterActions";
import React, { useEffect } from "react";
import { Alert, ScrollView, Text, View } from "react-native";
import Modal from "react-native-modal";
import { useDispatch, useSelector } from "react-redux";
import Button from "../../../../components/Button";
import { normalizeSpacing } from "../../../../components/scaleFontSize";
import strings from "../../../../components/utilities/Localization";
import styles from "./Styles";

const CheckedinModel = (props: any) => {
    const {getDetail} = props
    const dispatch: any = useDispatch()
    const { response = {} } = useSelector((state: any) => state.masterRemove);

   
    const handleQrScan = () => {
        dispatch(
            cpAppointmentCheckIn({
                appointment_id: props.data?._id,
               
            })
        );
       /*  dispatch(getAppointmentDetail({
            appointment_id: props?.data?._id
          })) */
          props.setIsVisible(false)  
          
    };
    useEffect(() => {
        if (response?.status === 200) {
            dispatch(getAppointmentDetail({
                appointment_id: props?.data?._id
            }))
            //getDetail()

            dispatch(removeMasters())
            props.setIsVisible(false)
        } else if (response?.status === 201) {
            dispatch(removeMasters())
            props.setIsVisible(false)
            dispatch(getAppointmentDetail({
                appointment_id: props?.data?._id
            }))

            //getDetail()
            
            Alert.alert('Alert', response?.message)
        }
    }, [response])
    return (
        <View>
            <Modal isVisible={props.Visible}>
                <ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: "center" }} keyboardShouldPersistTaps={'handled'}>
                    <View style={styles.bookingModelVw}>
                        <View style={{ padding: normalizeSpacing(20), alignItems: 'center' }}>
                            <Text style={styles.bottomTxt}>
                                {props?.alreadyCheckIn ? "Visitor already checked in for this property on another open appointment" : strings.cpcheckinMSG}
                            </Text>
                        </View>
                        <View style={{ flexDirection: 'row',alignItems: 'center', justifyContent: 'center', marginVertical: normalizeSpacing(20) }}>
                            <Button
                                width={120}
                                handleBtnPress={() => {
                                    props.setIsVisible(false)
                                }}
                                buttonText={props?.alreadyCheckIn ? "OK" : strings.no}
                            />
                            {!props?.alreadyCheckIn && (
                            <Button
                                width={120}
                                handleBtnPress={() => {
                                    handleQrScan()
                                }}
                                buttonText={strings.yes}
                            />
                            )}
                        </View>
                    </View>
                </ScrollView>
            </Modal>
        </View>
    );
};
export default CheckedinModel