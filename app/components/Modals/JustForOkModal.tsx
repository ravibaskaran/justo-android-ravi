import React from "react";
import { Text, View } from "react-native";
import Modal from "react-native-modal";
import styles from "./styles";
import Button from "../Button";
import { WHITE_COLOR } from "../utilities/constant";

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
