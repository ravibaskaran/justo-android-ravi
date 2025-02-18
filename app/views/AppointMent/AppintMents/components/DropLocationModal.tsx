
import { normalize, normalizeHeight, normalizeSpacing } from "app/components/scaleFontSize";
import React from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import Modal from "react-native-modal";
import images from "../../../../assets/images";
import Button from "../../../../components/Button";
import { MAP_KEY, PRIMARY_THEME_COLOR_DARK } from "../../../../components/utilities/constant";
import strings from "../../../../components/utilities/Localization";
import styles from "./styles";

const DropLocationModal = (props: any) => {
    return (
        <View>
            <Modal isVisible={props.Visible}>
                <View style={styles.bookingModelVw}>
                    <View style={styles.topContainer}>
                        <Text style={styles.topTxt}>{strings.dropLocation}</Text>
                        <View>
                            <TouchableOpacity onPress={() => props.setIsVisible(false)}>
                                <Image source={images.close} style={styles.closeIcon} />
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={[styles.inputWrap, { marginVertical: 20 }]}>
                        <ScrollView contentContainerStyle={{ flexGrow: 1 }}
                            keyboardShouldPersistTaps={'handled'}>
                            <GooglePlacesAutocomplete
                                fetchDetails={true}
                                placeholder={strings.location}
                                textInputProps={{
                                    placeholderTextColor: PRIMARY_THEME_COLOR_DARK,
                                }}
                                styles={{
                                    textInputContainer: {
                                        borderWidth: 1.5,
                                        borderColor: PRIMARY_THEME_COLOR_DARK,
                                        borderRadius: normalize(8),
                                        paddingVertical: normalizeSpacing(5),
                                    },
                                    textInput: {
                                        height: normalizeHeight(30),
                                        color: PRIMARY_THEME_COLOR_DARK,
                                        fontSize: 13,
                                    },
                                    predefinedPlacesDescription: {
                                        color: '#1faadb',
                                    },
                                }}
                                onPress={(data, details = null) => {
                                    props.setDropLocation(data?.description)
                                }}
                                filterReverseGeocodingByTypes={[
                                    'locality',
                                    'administrative_area_level_1',
                                ]}
                                nearbyPlacesAPI="GooglePlacesSearch"
                                query={{
                                    key: MAP_KEY,
                                    language: 'en',
                                    // types: '(cities)', //<=== use this to only show country cities
                                    components: 'country:in', // <=== use this to restrict to country
                                }}
                            />
                        </ScrollView>
                    </View>
                    <View style={{ marginVertical: 20 }}>
                        <Button
                            handleBtnPress={() => {
                                props.setIsVisible(false)
                                props.handleDropLocation()
                            }}
                            buttonText={props.doneBttnTxt ? props.doneBttnTxt : strings.Confirm} />
                    </View>
                </View>
            </Modal>
        </View>
    );
};
export default DropLocationModal