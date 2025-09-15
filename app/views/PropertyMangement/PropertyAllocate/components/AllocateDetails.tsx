import React, { useState } from "react";
import { Text, View } from "react-native";
import Modal from "react-native-modal";
import Button from "../../../../components/Button";
import DropdownInput from "../../../../components/DropDown";
import InputField from "../../../../components/InputField";
import styles from "../../../../components/Modals/styles";
import strings from "../../../../components/utilities/Localization";

const FilterModal = (props: any) => {
    const [value, setValue] = useState(null);
    return (
        <Modal backdropOpacity={0.6}
            isVisible={props.Visible}>
            <View style={styles.mainContainer}>
                {/* <View style={styles.topContainer}>
                    <View>
                        <TouchableOpacity onPress={() => props.setIsVisible(false)}>
                            <Image source={images.close} style={styles.closeIcon} />
                        </TouchableOpacity>
                    </View>
                </View> */}
                {/* <View style={styles.borderView} /> */}
                <View style={{ marginHorizontal: 10 }}>
                    <Text style={styles.selecttxtmodel}>Select Target for CP</Text>
                    <View style={styles.inputWrap}>
                        <DropdownInput
                            inputheight={40}
                            placeholder={strings.selectMonth}
                            value={value}
                            setValue={setValue}
                        />
                    </View>
                    <View style={styles.inputWrap}>
                        <InputField
                            inputheight={40}
                            placeholderText={strings.startDate}
                            handleInputBtnPress={() => { }}
                            onChangeText={() => { }}
                        />
                    </View>
                    <View style={styles.inputWrap}>
                        <InputField
                            inputheight={40}
                            placeholderText={strings.endDate}
                            handleInputBtnPress={() => { }}
                            onChangeText={() => { }}
                        />
                    </View>
                    <View style={styles.inputWrap}>
                        <InputField
                            inputheight={40}
                            placeholderText={strings.visitTarget}
                            handleInputBtnPress={() => { }}
                            onChangeText={() => { }}
                        />
                    </View>
                    <View style={styles.inputWrap}>
                        <InputField
                            inputheight={40}
                            placeholderText={strings.siteVisitTarget}
                            handleInputBtnPress={() => { }}
                            onChangeText={() => { }}
                        />
                    </View>
                    <View style={styles.inputWrap}>
                        <InputField
                            inputheight={40}
                            placeholderText={strings.closeTarget}
                            handleInputBtnPress={() => { }}
                            onChangeText={() => { }}
                        />
                    </View>
                </View>
                <View style={{ marginVertical: 20 }}>
                    <Button handleBtnPress={props.handleAddTarget}
                        buttonText={strings.addTarget} />
                </View>
            </View>
        </Modal>
    );
};

export default FilterModal;
