import { useNavigation } from "@react-navigation/native";
import ErrorMessage from "../../../../components/ErrorMessage";
import usePermission from "../../../../components/utilities/UserPermissions";
import moment from "moment";
import React, { useRef, useState } from "react";
import { Platform, View } from "react-native";
import FileViewer from "react-native-file-viewer";
import RNFS from "react-native-fs";
import Share from "react-native-share";
import ViewShot from "react-native-view-shot";
import { useSelector } from "react-redux";
import images from "../../../../assets/images";
import Button from "../../../../components/Button";
import Header from "../../../../components/Header";
import {
  CONST_IDS,
  DATE_TIME_FORMAT,
  getCPLeadType,
  PRIMARY_THEME_COLOR,
  PRIMARY_THEME_COLOR_DARK,
  RED_COLOR,
  ROLE_IDS,
  WHITE_COLOR,
} from "../../../../components/utilities/constant";
import strings from "../../../../components/utilities/Localization";
import BookingDetailsIteam from "./BookingDetailsIteam";
import BookingViewShot from "./BookingViewShot";
import CancelModal from "./CancelBooking";
import ReAllocateModal from "./ReAllocate";
import styles from "./styles";

const BookingDetailsView = (props: any) => {
  const { bookingData } = props;
  const getLoginType = useSelector((state: any) => state.login);
  const { response = {}, detail = "" } = useSelector(
    (state: any) => state.booking
  );
  // const detailData = response?.data?.length > 0 ? response?.data[0] : {};
  const detailData = bookingData?.length > 0 ? bookingData[0] : [];

  const navigation: any = useNavigation();
  const viewShotRef = useRef<ViewShot | null>(null);
  const onPressBookNow = () => {
    navigation.navigate("Booking", {
      getBookingData: response?.data?.length > 0 ? response?.data[0] : {},
      type: "readyToBook",
    });
  };
  const OpenDoc = async (url: any) => {
    function getUrlExtension(url: any) {
      return url.split(/[#?]/)[0].split(".").pop().trim();
    }
    const extension = getUrlExtension(url);
    const localFile = `${RNFS.DocumentDirectoryPath}/temporaryfile.${extension}`;
    const options = {
      fromUrl: url,
      toFile: localFile,
    };
    RNFS.downloadFile(options)
      .promise.then(() => FileViewer.open(localFile))
      .then((e) => {
        // success
      })
      .catch((error) => {
        // error
        ErrorMessage({
          msg: error?.message,
          backgroundColor: RED_COLOR,
        });
      });
  };
  const { status, create, approve, allocate } = usePermission({
    status: "add_followup",
    create:
      getLoginType?.response?.data?.role_id === ROLE_IDS.postsales_id ||
      getLoginType?.response?.data?.role_id === ROLE_IDS.sitehead_id ||
      getLoginType?.response?.data?.role_id === ROLE_IDS.admin_id
        ? "register_now"
        : "book_now",
    approve: "booking _cancel ",
    allocate:
      props?.type === "register" ? "registration_reallocate" : "re_Allocate",
  });

  const [shareScreen, setShareScreen] = useState(false);

  const getShareData = () => {
    let data =
      `*Booking Details*\n\n` +
      `Project: ${detailData.properties?.property_title || "NA"}\n` +
      `Booking Date: ${moment
        .utc(detailData?.booking_date)
        .format(DATE_TIME_FORMAT)}\n\n` +
      `*Customer Details*\n` +
      `Customer Name: ${detailData?.leads?.customer?.first_name || "NA"}\n` +
      `Booking Status: ${
        detailData?.leads?.lead_status === 5 || props?.type === "register"
          ? "Registered"
          : detailData?.booking_status === 1
          ? "Pending"
          : detailData?.booking_status === 2
          ? "Booking Confirmed"
          : detailData?.booking_status === 3
          ? "Completed"
          : detailData?.booking_status === 4
          ? "Booking Cancelled"
          : "NA"
      }\n\n` +
      `*Property Details*\n` +
      `Configurations: ${detailData.configuration || "NA"}\n` +
      `Flat Number: ${detailData.flat_no || "NA"}\n` +
      `Carpet Area: ${detailData.carpet_area || "NA"} sqft\n` +
      `Agreement Value: ${detailData.agreement_value || "NA"}\n` +
      `Booking Amount: ${detailData.booking_amount || "NA"}\n` +
      `Rate Achieved: ${detailData.rate_achieved || "NA"}\n\n` +
      `*Lead Information*\n` +
      `*Lead Source:* ${
        detailData?.lead_source_name
          ? detailData?.lead_source_name == "Reference" &&
            detailData?.referrel_partner == 1
            ? "Referral Partner"
            : detailData?.lead_source_name
          : strings.notfount
      } ${getCPLeadType(detailData?.cp_lead_type)}\n` +
      `${
        detailData?.leads?.lead_source === CONST_IDS.ref_lead_source_id
          ? `*Referrer:* ${detailData.referrer_name}\n`
          : ""
      }` +
      `${
        detailData?.leads?.lead_source === CONST_IDS.cp_lead_source_id
          ? `*CP Name:* ${detailData.cp_name || "NA"}\n` +
            `*CP Employee:* ${
              detailData?.cp_emp_name?.length > 0
                ? detailData.cp_emp_name
                : "NA"
            }\n`
          : ""
      }\n` +
      `*Team Information*\n` +
      `${
        detailData?.created_for_sm_name?.length > 0
          ? `*Sourced by: ${detailData?.created_for_sm_name} (${detailData?.created_for_sm_role})*` +
            `\n`
          : ""
      }` +
      `*Lead Created By: ${detailData?.visit_create_by?.user_name} (${detailData?.visit_create_by?.role_title})*\n` +
      `*Closed By: ${
        props.type === "cancel"
          ? detailData?.booking_by_name
          : detailData?.booking_by_name
      } (${detailData?.creaters?.role_title})*\n`;

    console.log(data);
    return data;
  };

  // const onPressShare = async () => {
  //   const shareOptions = {
  //     title: "Share via",
  //     message: getShareData(),
  //     subject: "Report", //  for email
  //   };
  //   try {
  //     const result = await Share.open(shareOptions);
  //     console.log(result);
  //   } catch (error: any) {
  //     console.log(error.message);
  //   }
  // };

  // Helper function to delay execution
  const delay = (ms: number) =>
    new Promise((resolve) => setTimeout(resolve, ms));

  const onPressShare = async () => {
    if (!viewShotRef.current) {
      console.error("viewShotRef.current is null");
      return;
    }
    if (typeof viewShotRef.current.capture !== "function") {
      console.error("capture function is not available");
      return;
    }
    try {
      setShareScreen(true);
      // Wait for 200ms before capturing
      await delay(100);
      const uri = await viewShotRef.current.capture();
      console.log("Image saved to:", uri);
      const shareOptions = {
        title: "Share via",
        message: getShareData(),
        url: Platform.OS === "android" ? `file://${uri}` : uri,
        subject: "Receipt",
      };
      const result = await Share.open(shareOptions);
      console.log(result);
      setShareScreen(false);
    } catch (error) {
      setShareScreen(false);
      console.error("Error while capturing or sharing:", error);
    }
  };

  return (
    <View style={styles.mainContainer}>
      <Header
        leftImageSrc={images.backArrow}
        rightSecondImageScr={images.notification}
        headerText={
          (getLoginType?.response?.data?.role_id === ROLE_IDS.postsales_id ||
            getLoginType?.response?.data?.role_id === ROLE_IDS.sitehead_id ||
            getLoginType?.response?.data?.role_id === ROLE_IDS.admin_id) &&
          props?.type === "register"
            ? strings.registerDetails
            : strings.bookingDetails
        }
        leftImageIconStyle={styles.RightFirstIconStyle}
        handleOnLeftIconPress={props.handleBackPress}
        headerStyle={styles.headerStyle}
        statusBarColor={PRIMARY_THEME_COLOR}
        barStyle={"light-content"}
        onPressShare={onPressShare}
        RightFirstIconStyle={styles.RightFirstIconStyle}
        shareImage={true}
      />

      <View style={styles.detailsItemView}>
        <ViewShot
          style={{ backgroundColor: WHITE_COLOR }}
          ref={viewShotRef}
          options={{ format: "jpg", quality: 0.9 }}
        >
          {shareScreen ? (
            <BookingViewShot
              OpenDoc={OpenDoc}
              item={[detailData]}
              type={props?.type}
            />
          ) : (
            <BookingDetailsIteam
              OpenDoc={OpenDoc}
              item={[detailData]}
              type={props?.type}
            />
          )}
        </ViewShot>
      </View>
      <View
        style={{
          flexDirection: "row",
          flexWrap: "wrap",
          justifyContent: "center",
        }}
      >
        <View style={styles.btnContainer}>
          {/* Status Update (Follow-Up) */}
          {status ? (
            getLoginType?.response?.data?.role_id != ROLE_IDS.postsales_id ||
            getLoginType?.response?.data?.role_id != ROLE_IDS.admin_id ||
            getLoginType?.response?.data?.role_id != ROLE_IDS.sitehead_id ? (
              <>
                {props?.type === "readyToBook" ? (
                  <View style={styles.buttonVw}>
                    <Button
                      buttonText={strings.Statusupdate}
                      width={150}
                      height={45}
                      bgcolor={PRIMARY_THEME_COLOR_DARK}
                      btnTxtcolor={WHITE_COLOR}
                      btnTxtsize={12}
                      textTransform={"uppercase"}
                      handleBtnPress={() => props.handleStatusUpdate()}
                    />
                  </View>
                ) : null}
              </>
            ) : null
          ) : null}
          {/* Cancel Booking */}
          {/* {approve &&
                        ((props?.type !== 'register' && detailData?.leads?.lead_status !== 5) &&
                            detailData?.booking_status !== 4 ?
                            <View style={styles.buttonVw}>
                                <Button
                                    buttonText={strings.cancelBooking}
                                    width={150}
                                    height={45}
                                    bgcolor={PRIMARY_THEME_COLOR_DARK}
                                    btnTxtcolor={WHITE_COLOR}
                                    btnTxtsize={14}
                                    textTransform={"uppercase"}
                                    handleBtnPress={() => props.setCancelBookingModel(true)}
                                />
                            </View> : null)
                    } */}
        </View>
        <View style={styles.btnContainer}>
          {/* RE-Allocate */}
          {allocate &&
            ((getLoginType?.response?.data?.role_id === ROLE_IDS.postsales_id ||
              getLoginType?.response?.data?.role_id === ROLE_IDS.admin_id ||
              getLoginType?.response?.data?.role_id === ROLE_IDS.sitehead_id) &&
            props?.type === "readyToBook" ? (
              <View style={styles.buttonVw}>
                <Button
                  buttonText={strings.reAllocate}
                  handleBtnPress={() => props.setReAllocateModel(true)}
                  bgcolor={PRIMARY_THEME_COLOR_DARK}
                  width={150}
                  height={45}
                />
              </View>
            ) : null)}
          {/* Registration Now */}
          {create &&
            ((getLoginType?.response?.data?.role_id === ROLE_IDS.postsales_id ||
              getLoginType?.response?.data?.role_id === ROLE_IDS.admin_id ||
              getLoginType?.response?.data?.role_id === ROLE_IDS.sitehead_id) &&
            props?.type === "request" &&
            detailData?.leads?.lead_status !== 5 &&
            detailData?.booking_status !== 4 ? (
              <View style={styles.buttonVw}>
                <Button
                  buttonText={strings.registerNow}
                  handleBtnPress={() => props.handleRegister()}
                  bgcolor={PRIMARY_THEME_COLOR_DARK}
                  width={150}
                  height={45}
                />
              </View>
            ) : null)}
        </View>
        <View style={styles.btnContainer}>
          {/* Book Now */}
          {create ? (
            props?.type === "readyToBook" ? (
              <View style={styles.buttonVw}>
                <Button
                  buttonText={"Book Now"}
                  handleBtnPress={() => onPressBookNow()}
                  bgcolor={PRIMARY_THEME_COLOR_DARK}
                  width={150}
                  height={45}
                />
              </View>
            ) : null
          ) : null}
        </View>
      </View>
      <CancelModal
        cancelDataPress={props.cancelBookingPress}
        Visible={props.cancelBookingModel}
        setIsVisible={props.setCancelBookingModel}
        cancelValue={props.cancelValue}
        item={response?.data?.length > 0 ? response?.data : []}
        setCancelValue={props.setCancelValue}
      />
      <ReAllocateModal
        Visible={props.reAllocateModel}
        setIsVisible={props.setReAllocateModel}
        reAllocateData={props.reAllocateData}
        setReAllocateData={props.setReAllocateData}
      />
    </View>
  );
};
export default BookingDetailsView;
