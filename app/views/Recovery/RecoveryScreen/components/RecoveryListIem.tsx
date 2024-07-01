import { View, Text, TouchableOpacity, Image, Linking } from "react-native";
import React from "react";
import styles from "./styles";
import strings from "../../../../components/utilities/Localization";
import images from "../../../../assets/images";
import Button from "../../../../components/Button";
import { WHITE_COLOR, CALL_COLOR, DATE_TIME_FORMAT } from "app/components/utilities/constant";
import moment from "moment";

const RecoveryListIem = (props: any) => {
  return (
    <View style={styles.IteamView}>
      <View style={styles.Txtview}>
        <View style={styles.projectContainer}>
          <Text style={styles.projectTxt}>Booking Date :</Text>
        </View>
        <View style={styles.nameContainer}>
          <Text style={styles.nameTxt}>{props.items?.booking_date ? moment(props.items?.booking_date).format(DATE_TIME_FORMAT) : strings.notfount}</Text>
        </View>
      </View>
      <View style={styles.Txtview}>
        <View style={styles.projectContainer}>
          <Text style={styles.projectTxt}>Customer Name :</Text>
        </View>
        <View style={styles.nameContainer}>
          <Text style={styles.nameTxt}>{props.items?.customer_first_name}</Text>
        </View>
      </View>
      <View style={styles.Txtview}>
        <View style={styles.projectContainer}>
          <Text style={styles.projectTxt}>Booking Status :</Text>
        </View>
        <View style={styles.nameContainer}>
          <Text style={styles.nameTxt}>{'Recovery'}</Text>
        </View>
      </View>
      <View style={styles.Txtview}>
        <View style={styles.projectContainer}>
          <Text style={styles.projectTxt}>{strings.configurations} :</Text>
        </View>
        <View style={styles.nameContainer}>
          <Text style={styles.nameTxt}>{props.items?.configuration ? props.items?.configuration : strings.notfount}</Text>
        </View>
      </View>
      <View style={styles.Txtview}>
        <View style={styles.projectContainer}>
          <Text style={styles.projectTxt}>Budget :</Text>
        </View>
        <View style={styles.nameContainer}>
        <Text style={styles.nameTxt}>
          {props.items?.budget?.min_budget || props.items?.budget?.max_budget
                ? `${props.items?.budget?.min_budget} ${props.items?.budget?.min_budget_type} - ${props.items?.budget?.max_budget} ${props.items?.budget?.max_budget_type}`
                : strings.notfount}
        </Text>
        </View>
      </View>
      <View style={styles.buttonContainer}>
        <Button
          width={80}
          height={30}
          bgcolor={WHITE_COLOR}
          bordercolor={CALL_COLOR}
          borderWidth={1}
          btnTxtcolor={CALL_COLOR}
          buttonText={strings.call}
          btnTxtsize={14}
          border={10}
          handleBtnPress={() => {
            Linking.openURL(`tel:${props.items?.mobile}`);
          }}
        />
        <TouchableOpacity
          style={styles.Viewbutton}
          onPress={() => props.onPressView(props.items)}
        >
          <Image source={images.forwardArrow} style={styles.arrow} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default RecoveryListIem;
