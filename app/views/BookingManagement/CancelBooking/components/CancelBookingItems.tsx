import { View, Text, TouchableOpacity, Image, Linking } from "react-native";
import React from "react";
import styles from "./styles";
import strings from "app/components/utilities/Localization";
import {
  BLACK_COLOR,
  DATE_TIME_FORMAT,
  PURPLE_COLOR,
  RED_COLOR,
  WHITE_COLOR,
} from "app/components/utilities/constant";
import images from "app/assets/images";
import Button from "app/components/Button";
import moment from "moment";
import usePermission from "app/components/utilities/UserPermissions";

const CancelBookingItems = (props: any) => {
  const item = props?.items || {};
  const { view, allocate } = usePermission({
    view: "view_cancel_booking",
    allocate: "call_at_cancel_booking",
  });
  return (
    <View style={styles.IteamView}>
      <View style={styles.Txtview}>
        <View style={styles.projectContainer}>
          <Text style={styles.projectTxt}>Booking Date :</Text>
        </View>
        <View style={styles.nameContainer}>
          <Text style={styles.nameTxt}>
            {moment.utc(item.booking_date).format(DATE_TIME_FORMAT)}
          </Text>
        </View>
      </View>
      <View style={styles.Txtview}>
        <View style={styles.projectContainer}>
          <Text style={styles.projectTxt}>Customer Name :</Text>
        </View>
        <View style={styles.nameContainer}>
          <Text style={styles.nameTxt}>
            {item.customer_first_name
              ? item.customer_first_name
              : strings.notfount}
          </Text>
        </View>
      </View>
      <View style={styles.Txtview}>
        <View style={styles.projectContainer}>
          <Text style={styles.projectTxt}>{strings.configurations} :</Text>
        </View>
        <View style={styles.nameContainer}>
          <Text style={styles.nameTxt}>
            {item?.configuration ? item?.configuration : strings.notfount}
          </Text>
        </View>
      </View>
      <View style={styles.Txtview}>
        <View style={styles.projectContainer}>
          <Text style={styles.projectTxt}>Budget :</Text>
        </View>
        <View style={styles.nameContainer}>
          <Text style={styles.nameTxt}>
            {item?.budget_amount
              ? item.budget_amount
              : item?.min_budget || item?.max_budget
              ? `${item?.min_budget || ""}${item?.min_budget_type || ""} - ${
                  item?.max_budget || ""
                }${item?.max_budget_type || ""}`
              : strings.notfount}
          </Text>
        </View>
      </View>
      <View style={styles.Txtview}>
        <View style={styles.projectContainer}>
          <Text style={styles.projectTxt}>Booking Amount :</Text>
        </View>
        <View style={styles.nameContainer}>
          <Text style={styles.nameTxt}>
            {item.booking_amount ? item.booking_amount : strings.notfount}
          </Text>
        </View>
      </View>
      <View style={[styles.Txtview, { borderBottomWidth: 0 }]}>
        <View style={styles.projectContainer}>
          <Text style={styles.projectTxt}>Booking Status :</Text>
        </View>
        <View style={styles.nameContainer}>
          {/* booking_status: {//1= Panding, 2 = Confirm, 3= Compleat, 4 =booking cancel} */}
          <Text
            style={[
              styles.nameTxt,
              {
                color: RED_COLOR,
              },
            ]}
          >
            {item?.booking_status && "Booking Cancel"}
          </Text>
        </View>
      </View>
      <View style={styles.buttonContainer}>
        {allocate && (
          <Button
            width={90}
            height={30}
            bgcolor={WHITE_COLOR}
            bordercolor={PURPLE_COLOR}
            borderWidth={1}
            btnTxtcolor={PURPLE_COLOR}
            buttonText={strings.call}
            btnTxtsize={14}
            border={10}
            handleBtnPress={() => {
              Linking?.openURL(`tel:${item?.mobile}`);
            }}
          />
        )}
        {view && (
          <TouchableOpacity
            style={styles.Viewbutton}
            onPress={() => props.onPressView(item)}
          >
            <Image source={images.forwardArrow} style={styles.arrow} />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default CancelBookingItems;
