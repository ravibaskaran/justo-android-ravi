import { View, TextInput, Image, TouchableOpacity, Text } from 'react-native';
import React from 'react';
import styles from './styles';
import { BLACK_COLOR, FONT_FAMILY_SEMIBOLD, GRAY_COLOR, Isios, MAP_KEY, PRIMARY_THEME_COLOR_DARK, WHITE_COLOR } from '../utilities/constant';
import images from '../../assets/images';
import { normalize, normalizeHeight, normalizeSpacing } from '../scaleFontSize';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import strings from '../utilities/Localization';
import { RequiredStart } from '../utilities/GlobalFuncations';

const LocationInput = (props: any) => {
    return (
        <View>
            <View style={styles.inputHeadinView}>
                <Text style={[styles.inputHeadingText, {
                    width: props.headingTextWidth
                }]}>{props.headingText}</Text>
                {props.require ? (<RequiredStart />) : null}
            </View>
            <GooglePlacesAutocomplete
                fetchDetails={true}
                placeholder={props.placeholderText ?
                    props.placeholderText : strings.location}
                textInputProps={props.textInputProps}
                styles={{
                    textInputContainer: {
                        shadowColor: '#171717',
                        shadowOffset: { width: 0, height: 1 },
                        shadowOpacity: 0.2,
                        shadowRadius: 1,
                        elevation: 3,
                        backgroundColor: WHITE_COLOR,
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        borderRadius: 10,
                        padding: normalizeSpacing(Isios ? 8 : 6),
                        borderColor: GRAY_COLOR,
                    },
                    textInput: {
                        fontSize: 13,
                        paddingRight: normalizeSpacing(30),
                        paddingLeft: normalizeSpacing(Isios ? 5 : 15),
                        fontFamily: FONT_FAMILY_SEMIBOLD,
                        opacity: 0.6,
                        color: BLACK_COLOR
                    },
                    predefinedPlacesDescription: {
                        color: BLACK_COLOR,
                    },
                    description: {
                        color: BLACK_COLOR,
                    },
                }}
                onPress={(data, details = null) => {
                    props.onPressSelect(data, details)
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
                // textInputHide={true}
            />
        </View>
    );
};

export default LocationInput;
