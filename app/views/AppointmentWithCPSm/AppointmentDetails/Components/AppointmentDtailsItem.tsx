import { View, Text, ScrollView, Image, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import styles from "./Styles";
import moment from "moment";
import Geocoder from "react-native-geocoding";
import {
  BLACK_COLOR,
  GREEN_COLOR,
  MAP_KEY,
  RED_COLOR,
  REGISTERD_CP,
  YELLOW_COLOR,
} from "app/components/utilities/constant";
import strings from "app/components/utilities/Localization";
import Modal from "react-native-modal";
import FastImages from "app/components/FastImage";
import { normalizeHeight } from "app/components/scaleFontSize";

const AppointmentDtailsItem = (props: any) => {
  const [isVisable, setIsVisable] = useState(false);
  const appdetail = props?.status || {};
  const appointment_cancle_by_name =
    props?.status?.appointment_cancle_by?.length > 0
      ? props?.status?.appointment_cancle_by
      : "";
  const [location, setLocation] = useState("");
  // Geocoder.init(MAP_KEY);
  // if (
  //   appdetail?.latitude !== undefined &&
  //   appdetail?.longitude !== undefined &&
  //   appdetail?.latitude !== "" &&
  //   appdetail?.longitude !== "" &&
  //   appdetail?.latitude !== null &&
  //   appdetail?.longitude !== null
  // ) {
  //   Geocoder.from(appdetail?.latitude, appdetail?.longitude)
  //     .then((json) => {
  //       var addressComponent = json.results[0].formatted_address;
  //       setLocation(addressComponent);
  //     })
  //     .catch((error) => console.warn(error));
  // } else {
  // }

  const getAddressFromCoordinates = async (latitude: any, longitude: any) => {
    const url = `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`;

    try {
      let response = await fetch(url);
      let data = await response.json();

      if (data && data.display_name) {
        setLocation(data.display_name);
        console.log("Address:", data.display_name);
      } else {
        console.log("Error fetching address");
        setLocation("Address not found");
      }
    } catch (error) {
      console.error("Geocoding Error:", error);
      setLocation("Error fetching address");
    }
  };

  useEffect(() => {
    if (
      appdetail?.latitude &&
      appdetail?.longitude &&
      appdetail.latitude !== "" &&
      appdetail.longitude !== ""
    ) {
      getAddressFromCoordinates(appdetail.latitude, appdetail.longitude);
    }
  }, [appdetail?.latitude, appdetail?.longitude]);

  // console.log(appdetail);

  return (
    <ScrollView>
      <View style={styles.Txtview}>
        <View style={styles.projectContainer}>
          <Text style={styles.projectTxt}>Date</Text>
        </View>
        <View>
          <Text>:</Text>
        </View>
        <View style={styles.nameContainer}>
          <Text style={styles.nameTxt}>
            {moment.utc(appdetail.appointment_date).format("DD-MM-YYYY")}
          </Text>
        </View>
      </View>
      <View style={styles.Txtview}>
        <View style={styles.projectContainer}>
          <Text style={styles.projectTxt}>Time</Text>
        </View>
        <View>
          <Text>:</Text>
        </View>
        <View style={styles.nameContainer}>
          <Text style={styles.nameTxt}>{appdetail?.appointment_time}</Text>
        </View>
      </View>
      <View style={styles.Txtview}>
        <View style={styles.projectContainer}>
          <Text style={styles.projectTxt}>Type</Text>
        </View>
        <View>
          <Text>:</Text>
        </View>
        <View style={styles.nameContainer}>
          <Text style={styles.nameTxt}>{appdetail.appointment_type_title}</Text>
        </View>
      </View>

      <View style={styles.Txtview}>
        <View style={styles.projectContainer}>
          <Text style={styles.projectTxt}>Justo CP</Text>
        </View>
        <View>
          <Text>:</Text>
        </View>
        <View style={styles.nameContainer}>
          <Text style={styles.nameTxt}>
            {appdetail?.registered_cp == REGISTERD_CP.NO ? "No" : "Yes"}
          </Text>
        </View>
      </View>
      {appdetail?.registered_cp == REGISTERD_CP.NO && (
        <>
          <View style={styles.Txtview}>
            <View style={styles.projectContainer}>
              <Text style={styles.projectTxt}>{strings.mobileNo}</Text>
            </View>
            <View>
              <Text>:</Text>
            </View>
            <View style={styles.nameContainer}>
              <Text style={styles.nameTxt}>
                {appdetail?.non_reg_cp_mobile
                  ? appdetail?.non_reg_cp_mobile
                  : "NA"}
              </Text>
            </View>
          </View>
          <View style={styles.Txtview}>
            <View style={styles.projectContainer}>
              <Text style={styles.projectTxt}>{strings.email}</Text>
            </View>
            <View>
              <Text>:</Text>
            </View>
            <View style={styles.nameContainer}>
              <Text style={styles.nameTxt}>
                {appdetail?.non_reg_cp_email
                  ? appdetail?.non_reg_cp_email
                  : "NA"}
              </Text>
            </View>
          </View>
        </>
      )}

      <View style={styles.Txtview}>
        <View style={styles.projectContainer}>
          <Text style={styles.projectTxt}>Appointment With</Text>
        </View>
        <View>
          <Text>:</Text>
        </View>
        <View style={styles.nameContainer}>
          <Text style={styles.nameTxt}>{appdetail.receiver_name}</Text>
        </View>
      </View>
      <View style={styles.Txtview}>
        <View style={styles.projectContainer}>
          <Text style={styles.projectTxt}>Status</Text>
        </View>
        <View>
          <Text>:</Text>
        </View>
        <View style={styles.nameContainer}>
          <Text
            style={[
              styles.nameTxt,
              {
                color:
                  appdetail.appointment_status === 1 ||
                  appdetail.appointment_status == 4
                    ? RED_COLOR
                    : appdetail.appointment_status === 2
                    ? YELLOW_COLOR
                    : appdetail.appointment_status === 3
                    ? GREEN_COLOR
                    : BLACK_COLOR,
              },
            ]}
          >
            {appdetail.appointment_status == 1
              ? "Pending"
              : appdetail.appointment_status == 2
              ? "Confirm"
              : appdetail.appointment_status == 3
              ? "Complete"
              : appdetail.appointment_status === 4
              ? "Appointment cancel"
              : strings.notfount}
          </Text>
        </View>
      </View>
      <View style={styles.Txtview}>
        <View style={styles.projectContainer}>
          <Text style={styles.projectTxt}>Location</Text>
        </View>
        <View>
          <Text>:</Text>
        </View>
        <View style={styles.nameContainer}>
          <Text style={styles.nameTxt}>
            {appdetail?.cp_location?.length > 0
              ? appdetail?.cp_location[0]?.location
              : strings.notfount}
          </Text>
        </View>
      </View>
      {(appdetail.appointment_status === 2 ||
        appdetail.appointment_status === 3 ||
        appdetail.appointment_status === 4) && (
        <View>
          <View style={styles.updateView}>
            <Text style={styles.updatetext}>Update Information</Text>
          </View>
          {appdetail.appointment_status === 4 && (
            <View style={styles.Txtview}>
              <View style={styles.projectContainer}>
                <Text style={styles.projectTxt}>Cancel By</Text>
              </View>
              <View>
                <Text>:</Text>
              </View>
              <View style={styles.nameContainer}>
                <Text style={styles.nameTxt}>
                  {appointment_cancle_by_name
                    ? appointment_cancle_by_name
                    : strings.notfount}
                </Text>
              </View>
            </View>
          )}

          {(appdetail.appointment_status === 3 ||
            appdetail.appointment_status === 4) &&
          location !== "" ? (
            <View style={styles.Txtview}>
              <View style={styles.projectContainer}>
                <Text style={styles.projectTxt}>Location</Text>
              </View>
              <View>
                <Text>:</Text>
              </View>
              <View style={styles.nameContainer}>
                <Text style={styles.nameTxt}>
                  {location === "" ? strings.notfount : location}
                </Text>
              </View>
            </View>
          ) : null}
          {appdetail?.confirm_remark !== null ? (
            <View style={styles.Txtview}>
              <View style={styles.projectContainer}>
                <Text style={styles.projectTxt}>Confirm Remark</Text>
              </View>
              <View>
                <Text>:</Text>
              </View>
              <View style={styles.nameContainer}>
                <Text style={styles.nameTxt}>
                  {appdetail?.confirm_remark
                    ? appdetail?.confirm_remark
                    : strings.notfount}
                </Text>
              </View>
            </View>
          ) : null}

          {appdetail?.image !== null ? (
            <View style={styles.Txtview}>
              <View style={styles.projectContainer}>
                <Text style={styles.projectTxt}>Image </Text>
              </View>
              <View>
                <Text>:</Text>
              </View>
              {appdetail.image === "undefined" || appdetail.image === "" ? (
                <View style={styles.nameContainer}>
                  <Text style={styles.nameTxt}>{strings.notfount}</Text>
                </View>
              ) : (
                <TouchableOpacity
                  onPress={() => {
                    setIsVisable(true);
                  }}
                  style={[styles.nameContainer, { marginLeft: 10 }]}
                >
                  <Image
                    source={{ uri: appdetail?.base_url + appdetail?.image }}
                    resizeMode={"contain"}
                    style={styles.Img}
                  />
                </TouchableOpacity>
              )}
            </View>
          ) : null}

          {appdetail?.compleate_remark !== null ? (
            <View style={styles.Txtview}>
              <View style={styles.projectContainer}>
                <Text style={styles.projectTxt}>Complete Remark</Text>
              </View>
              <View>
                <Text>:</Text>
              </View>
              <View style={styles.nameContainer}>
                <Text style={styles.nameTxt}>
                  {appdetail?.compleate_remark
                    ? appdetail?.compleate_remark
                    : strings.notfount}
                </Text>
              </View>
            </View>
          ) : null}
          {appdetail?.cancle_remark !== null ? (
            <View style={styles.Txtview}>
              <View style={styles.projectContainer}>
                <Text style={styles.projectTxt}>Cancel Remark</Text>
              </View>
              <View>
                <Text>:</Text>
              </View>
              <View style={styles.nameContainer}>
                <Text style={styles.nameTxt}>
                  {appdetail?.cancle_remark
                    ? appdetail?.cancle_remark
                    : strings.notfount}
                </Text>
              </View>
            </View>
          ) : null}
        </View>
      )}
      <Modal
        isVisible={isVisable}
        onBackdropPress={() => setIsVisable(false)}
        onBackButtonPress={() => setIsVisable(false)}
      >
        <View>
          <FastImages
            source={{ uri: appdetail.base_url + appdetail.image }}
            style={{
              width: "100%",
              height: normalizeHeight(300),
              alignItems: "center",
              justifyContent: "center",
            }}
          />
        </View>
      </Modal>
    </ScrollView>
  );
};

export default AppointmentDtailsItem;
