import {
  View,
  Text,
  FlatList,
  Image,
  TextInput,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import Modal from "react-native-modal";
import styles from "./styles";
import { normalizeSpacing } from "../scaleFontSize";
import { Isios } from "../utilities/constant";
import images from "../../assets/images";

const CountryPickerModal = (props: any) => {
  const [scrollIndex, setscrollIndex] = useState(0);

  useEffect(() => {
    let index = props?.countryData?.findIndex(
      (obj: any) => obj?.dial_code === props?.countryCode
    );
    if (index > -1) setscrollIndex(index);
  }, [props?.countryCode]);

  return (
    <Modal
      isVisible={props.countyPicker}
      //   onRequestClose={() => {
      //     props.setCountyPicker(!props.countyPicker);
      //   }}
      style={{}}
    >
      <View style={styles.countyModelCon}>
        <View style={{}}>
          <View style={[styles.topContainer, { alignItems: "center" }]}>
            <Text style={styles.topTxt}>{"Country Code"}</Text>
            <TouchableOpacity
              onPress={() => props.handleCloseCountry()}
              style={{ paddingRight: 30 }}
            >
              {/* <Image source={require('../../../../Assets/add-filled.png')} resizeMode='center' style={{ height: 35, width: 35 }} /> */}
              <Image
                source={images.close}
                style={styles.countrycloseIcon}
                resizeMode="center"
              />
            </TouchableOpacity>
          </View>
          <View style={styles.searchInputCon}>
            <TextInput
              // keyboardType="phone-pad"
              onChangeText={(text) => {
                console.log(
                  "🚀 ~ file: CountryPickerModal.tsx:43 ~ text:",
                  text
                );

                return props.handleCountryCode(text);
              }}
              // value={props.countryCode}
              placeholder="Search..."
              style={[
                styles.serchInput,
                Isios
                  ? {
                      marginTop: normalizeSpacing(8),
                    }
                  : {},
              ]}
              placeholderTextColor={"#a9a9a9"}
            />
          </View>
        </View>
        <FlatList
removeClippedSubviews={false}
          initialScrollIndex={scrollIndex}
          nestedScrollEnabled={true}
          data={props.countryData}
          initialNumToRender={20}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item, index }) => (
            <TouchableOpacity
              onPress={() => props.selectCountryData(item.dial_code, item.flag)}
              style={[
                styles.countryCodeSelect,
                {
                  backgroundColor:
                    item.dial_code == props?.countryCode
                      ? "#a9a9a9"
                      : "#f5f5f5",
                },
              ]}
            >
              <Text style={{ textAlign: "left", width: normalizeSpacing(30) }}>
                {item.flag}
              </Text>
              <Text style={{ textAlign: "left", width: normalizeSpacing(50) }}>
                {item.dial_code}
              </Text>
              <Text style={{ marginLeft: 10, textAlign: "left", width: "70%" }}>
                {item.name}
              </Text>
            </TouchableOpacity>
          )}
        />
      </View>
    </Modal>
  );
};

export default CountryPickerModal;
