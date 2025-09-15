import moment from "moment";
import React from "react";
import { Linking, Text, View } from "react-native";
import Button from "../../../../components/Button";
import strings from "../../../../components/utilities/Localization";
import usePermission from "../../../../components/utilities/UserPermissions";
import {
  CALL_COLOR,
  GREEN_COLOR,
  WHITE_COLOR
} from "../../../../components/utilities/constant";
import styles from "./styles";

const PickupRequestsList = (props: any) => {
  const item = props?.items || {};
  const { status } = usePermission({
    status: 'status_pickup_request'
  })
  return (
    <View style={styles.IteamView}>
      <View style={styles.Txtview}>
        <View style={styles.projectContainer}>
          <Text style={styles.projectTxt}>Date Time :</Text>
        </View>
        <View style={styles.nameContainer}>
          <Text style={styles.nameTxt}>
            {moment(item?.appointment_date).format("DD-MM-YYYY") +
              " " +
              item?.appointment_time}
          </Text>
        </View>
      </View>
      <View style={styles.Txtview}>
        <View style={styles.projectContainer}>
          <Text style={styles.projectTxt}>Visitors Name :</Text>
        </View>
        <View style={styles.nameContainer}>
          <Text style={styles.nameTxt}>{item?.customer_name}</Text>
        </View>
      </View>
      {/* <View style={styles.Txtview} >
        <View style={styles.projectContainer}>
          <Text style={styles.projectTxt}>Mobile :</Text>
        </View>
        <View style={styles.nameContainer}>
          <Text style={styles.nameTxt}>{item?.mobile}</Text>
        </View>
      </View> */}
      <View style={styles.Txtview}>
        <View style={styles.projectContainer}>
          <Text style={styles.projectTxt}>Pickup Location :</Text>
        </View>
        <View style={styles.nameContainer}>
          <Text style={styles.nameTxt}>{item?.pickup_location}</Text>
        </View>
      </View>
      <View style={styles.Txtview}>
        <View style={styles.projectContainer}>
          <Text style={styles.projectTxt}>Drop-up Location :</Text>
        </View>
        <View style={styles.nameContainer}>
          <Text style={styles.nameTxt}>{item?.drop_off_location ? item?.drop_off_location : strings.notfount}</Text>
        </View>
      </View>
      <View style={styles.Txtview}>
        <View style={styles.projectContainer}>
          <Text style={styles.projectTxt}>Number of Guest :</Text>
        </View>
        <View style={styles.nameContainer}>
          <Text style={styles.nameTxt}>{item?.number_of_guest}</Text>
        </View>
      </View>
      <View style={styles.Txtview}>
        <View style={styles.projectContainer}>
          <Text style={styles.projectTxt}>{strings.visit + " " + strings.score} :</Text>
        </View>
        <View style={styles.nameContainer}>
          <Text style={styles.nameTxt}>{item?.lead_score}</Text>
        </View>
      </View>
      <View style={[styles.Txtview, { borderBottomWidth: 0 }]}>
        <View style={styles.projectContainer}>
          <Text style={styles.projectTxt}>Status :</Text>
        </View>
        <View style={styles.nameContainer}>
          {/* <Text style={styles.nameTxt}>{item?.status}</Text> */}
          <Text style={styles.nameTxt}>
            {item?.pickup_status == 0
              ? "Pending"
              : item?.pickup_status == 1
                ? "Confirm"
                : strings.notfount}
          </Text>
        </View>
      </View>
      <View style={styles.buttonContainer}>
        {item?.pickup_status === 0 || item?.pickup_status === 1 ? (
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
        ) : (
          <View></View>
        )}
        {status ? item?.pickup_status === 0 ? (
          <Button
            width={120}
            height={30}
            bgcolor={WHITE_COLOR}
            bordercolor={GREEN_COLOR}
            borderWidth={1}
            btnTxtcolor={GREEN_COLOR}
            buttonText={strings.updatestatus}
            btnTxtsize={14}
            border={10}
            handleBtnPress={() => {
              props.setAppointId(item)
              props.setIsVisible(true)
            }}
          />
        ) : (
          <View></View>
        ) : null}
      </View>
    </View>
  );
};

export default PickupRequestsList;
