import { View, Text, TouchableOpacity, Image } from "react-native";
import React, { useEffect, useState } from "react";
import Modal from "react-native-modal";
import styles from "./styles";
import Button from "app/components/Button";
import { useSelector } from "react-redux";
import images from "app/assets/images";
import moment from "moment";
import { DATE_FORMAT, WHITE_COLOR } from "app/components/utilities/constant";
import strings from "../utilities/Localization";

const JustForOkModal = (props: any) => {
    
    return (
        <Modal isVisible={props.Visible}>
            <View style={[styles.conteconfirm, {backgroundColor: WHITE_COLOR, borderRadius: 10}]}>
                <View style={styles.topContainer}>
                    <View />
                    <Text style={styles.topTxt}>{props?.headertitle ? props?.headertitle : "Not Found" }</Text>
                    <View>
                        {/* <TouchableOpacity onPress={() => {
                            props.setIsVisible(false)
                        }}>
                            <Image source={images.close} style={styles.closeIcon} />
                        </TouchableOpacity> */}
                    </View>
                </View>
                <View style={styles.borderView} />
                <View style={styles.MiddleContainer}>
                    <Text style={styles.bottomTxt}>{props.message}</Text>
                </View>
                <View style={{ marginVertical: 10, marginHorizontal: 25, flexDirection: 'row',justifyContent: 'center' }}>
                    <View style={styles.btnview}>
                        <Button
                            buttonText={'Ok' }
                            width={130} height={40}
                            handleBtnPress={() => props.onPressRightButton()} />
                    </View>
                </View>
            </View>
        </Modal>
    );
};

export default JustForOkModal;
