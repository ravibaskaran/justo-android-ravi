import React, { useEffect, useLayoutEffect, useState } from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { Dropdown } from "react-native-element-dropdown";
import Modal from "react-native-modal";
import { useDispatch, useSelector } from "react-redux";
import images from "../../assets/images";
import { closeVisit } from "../../Redux/Actions/LeadsActions";
import { getAllMaster } from "../../Redux/Actions/MasterActions";
import Button from "../Button";
import ErrorMessage from "../ErrorMessage";
import InputField from "../InputField";
import { RED_COLOR } from "../utilities/constant";
import strings from "../utilities/Localization";
import styles from "./styles";

const CancelModal = (props: any) => {
    const data = props?.data?.length > 0 ? props?.data[0] : []
    const dispatch: any = useDispatch()
    const { response = {} } = useSelector((state: any) => state.masterData)
    const [masterDataShow, setmasterDataShow] = useState([])
    const [closeVisitData, setcloseVisitData] = useState({
        lead_id: data?.lead_id,
        appointment_id: data?.appointment_id,
        cancle_type: data?.cancle_type,  //1=lead, 2=appoinment
        resion: '',
        comment: ''
    })

    useLayoutEffect(() => {
        dispatch(getAllMaster({
            type: 8
        }))
        return () => { };
    }, [])
    useEffect(() => {

        return () => {
            setmasterDataShow(response?.data)
        }
    }, [response])

    const renderItem = (item: any) => {
        return (
            <View style={styles.item}>
                <Text style={styles.textItem}>{item.title}</Text>
            </View>
        );
    };
    const handleClosePress = () => {
        if (closeVisitData?.resion !== '') {
            props.setIsVisible(false)
            dispatch(closeVisit(closeVisitData))
        } else {
            ErrorMessage({
                msg: strings.reasonSelectVal,
                backgroundColor: RED_COLOR
            })
        }
    }

    return (
        <View>
            <Modal isVisible={props.Visible}>
                <View style={styles.mainContainer}>
                    <View style={styles.topContainer}>
                        <View />
                        <Text style={styles.topTxt}>{strings.closeVisit}</Text>
                        <View>
                            <TouchableOpacity onPress={() => props.setIsVisible(false)}>
                                <Image source={images.close} style={styles.closeIcon} />
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={styles.borderView} />
                    {/* <View style={styles.MiddleContainer}>
                        <Text style={styles.bottomTxt}>{"Close Visit"}</Text>
                    </View> */}
                    <View>
                        <Dropdown
                            style={styles.dropdown}
                            placeholderStyle={styles.placeholderStyle}
                            selectedTextStyle={styles.selectedTextStyle}
                            iconStyle={styles.iconStyle}
                            data={masterDataShow}
                            maxHeight={300}
                            labelField="title"
                            valueField="_id"
                            placeholder={strings.selectReason}
                            value={props.resion}
                            onChange={(item) => {
                                setcloseVisitData({
                                    ...closeVisitData, resion: item?._id
                                });
                            }}
                            renderItem={renderItem}
                        />
                    </View>
                    <View style={styles.inputWrap}>
                        <InputField
                            headingText={strings.comment}
                            placeholderText={strings.comment}
                            handleInputBtnPress={() => { }}
                            onChangeText={(val: any) => {
                                setcloseVisitData({
                                    ...closeVisitData,
                                    comment: val,
                                })
                            }}
                            multiline={true}
                            inputheight={100}
                        />
                    </View>
                    <View style={{ marginVertical: 10 }}>
                        <Button buttonText={strings.Confirm}
                            //handleBtnPress={() => props.setIsVisible(false)} />
                            handleBtnPress={() => {
                                handleClosePress()
                            }}
                        />
                    </View>
                </View>
            </Modal>
        </View>
    );
};

export default CancelModal;
