import JustForOkModal from "app/components/Modals/JustForOkModal";
import { Isios, ROLE_IDS } from "app/components/utilities/constant";
import usePermission from "app/components/utilities/UserPermissions";
import React, { useState } from "react";
import { View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useDispatch, useSelector } from "react-redux";
import images from "../../../../assets/images";
import Button from "../../../../components/Button";
import Header from "../../../../components/Header";
import strings from "../../../../components/utilities/Localization";
import AppointmentDtailsItem from "./AppointmentDtailsItem";
import CancelModal from "./CancelBooking";
import CheckedinModel from "./CheckedinModel";
import ReadyToBookModal from "./ReadyToBookModal";
import styles from "./Styles";
import { apiCall } from "app/components/utilities/httpClient";
import apiEndPoints from "app/components/utilities/apiEndPoints";
import { START_LOADING, STOP_LOADING } from "app/Redux/types";

const AppointmentDetailsView = (props: any) => {
  const { detailsData, getDetail } = props;
  const { userData = {} } = useSelector((state: any) => state.userData) || [];
  const [readyToBooK, setReadyToBooK] = useState(false);
  const [CpChecking, setCpChecking] = useState(false);
  const data = detailsData?.length > 0 ? detailsData[0] : [];
  const [alreadyCheckIn, setAlreadyCheckIn] = useState(false);
  const dispatch: any = useDispatch();

  const { edit, status, create, approve } = usePermission({
    edit: "close_appointment",
    status: "appointment_status_update",
    create: "book_now",
    approve: "ready_for_booking",
  });
  const assign_role =
    data?.assign_appointment?.length > 0
      ? data?.assign_appointment[0]?.assign_by_role
      : "";

  const checkAlreadyCheckIn = async () => {
    try {
      dispatch({ type: START_LOADING });
      setCpChecking(true);
      const response = await apiCall(
        "post",
        apiEndPoints.CHECK_ALREADY_CHECKIN,
        {
          property_id: data?.property_id,
          customer_mobile_number: data?.customer_mobile_number,
        }
      );
      const { status } = response?.data || {};
      console.log(response?.data);
      setAlreadyCheckIn(status === 201);
    } catch (error) {
      console.error("Check-in status fetch failed:", error);
      setAlreadyCheckIn(false);
    } finally {
      dispatch({ type: STOP_LOADING });
    }
  };

  return (
    <View style={styles.mainContainer}>
      <Header
        leftImageSrc={images.backArrow}
        rightSecondImageScr={images.notification}
        headerText={strings.appointmnetdetail}
        leftImageIconStyle={styles.RightFirstIconStyle}
        handleOnLeftIconPress={props.handleBackPress}
        headerStyle={styles.headerStyle}
      />
      <View style={styles.propertyListView}>
        <AppointmentDtailsItem
          item={detailsData?.length > 0 ? detailsData[0] : {}}
          handleViewFollowUp={props.handleViewFollowUp}
          handleVistorUpdate={props.handleVistorUpdate}
          data={data}
        />
      </View>
      {data?.checkin_status === true ? (
        <View style={styles.bntView}>
          {data?.status === 1 || data?.status === 10 ? (
            <>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                {/* Close Appoitmnet */}
                {edit && (
                  <Button
                    buttonText={strings.notInterested}
                    // btnTxtsize={13}
                    // handleBtnPress={() => setCancelAppoitment(true)}
                    handleBtnPress={() => props.handleNotInterestedPress(data)}
                    width={150}
                  />
                )}
                {/* Update The appointment status */}
                {status && (
                  <Button
                    buttonText={strings.STSReVisit}
                    handleBtnPress={() => props.handleUpdateStatus()}
                    width={150}
                  />
                )}
              </View>
              <View style={{ marginVertical: 10 }} />
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                {/* Book Now */}
                {create &&
                  (userData?.data?.role_id === ROLE_IDS.closingmanager_id ||
                  userData?.data?.role_id === ROLE_IDS.closingtl_id ||
                  userData?.data?.role_id === ROLE_IDS.closing_head_id ||
                  userData?.data?.role_id === ROLE_IDS.sourcing_head_id ||
                  userData?.data?.role_id === ROLE_IDS.clusterhead_id ||
                  userData?.data?.role_id === ROLE_IDS.sitehead_id ||
                  userData?.data?.role_id === ROLE_IDS.scm_id ? (
                    <Button
                      buttonText={strings.bookNow}
                      handleBtnPress={() => props.onPressBookNow()}
                      width={150}
                    />
                  ) : null)}
                <Button
                  buttonText={strings.followup}
                  handleBtnPress={() => props.onPressFollowUp()}
                  width={150}
                />
              </View>
            </>
          ) : null}
        </View>
      ) : data?.status === 1 ? (
        userData?.data?.role_title == "SCM" ? (
          assign_role == "SCM" ? (
            <View style={styles.bntView}>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                {/* Status Update */}
                <Button
                  buttonText={strings.noShow}
                  handleBtnPress={() =>
                    props.handleStatusUpdate({ ...data, editType: "closing" })
                  }
                  width={Isios ? 180 : 160}
                />
                {/* Checked In */}
                <Button
                  buttonText={strings.visitorCheckin}
                  handleBtnPress={() => checkAlreadyCheckIn()}
                  width={Isios ? 180 : 160}
                />
              </View>
            </View>
          ) : null
        ) : (
          <View style={styles.bntView}>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              {/* Status Update */}
              <Button
                buttonText={strings.noShow}
                handleBtnPress={() =>
                  props.handleStatusUpdate({ ...data, editType: "closing" })
                }
                width={Isios ? 180 : 160}
              />
              {/* Checked In */}
              <Button
                buttonText={strings.visitorCheckin}
                handleBtnPress={() => checkAlreadyCheckIn()}
                width={Isios ? 180 : 160}
              />
            </View>
          </View>
        )
      ) : null}

      {/* Ready To Book Model */}
      <ReadyToBookModal
        Visible={readyToBooK}
        setIsVisible={() => setReadyToBooK(false)}
        setBookingData={props.setBookingData}
        BookingData={props.BookingData}
        handleBooking={() =>
          props.handleBooking(detailsData?.length > 0 ? detailsData[0] : {})
        }
      />
      {/* Cp Check-In Model */}
      <CheckedinModel
        Visible={CpChecking}
        alreadyCheckIn={alreadyCheckIn}
        setIsVisible={() => {
          setCpChecking(false);
          setAlreadyCheckIn(false);
        }}
        data={data}
        getDetail={getDetail}
      />
      {/* Cancel Booking Model */}
      <CancelModal
        cancelDataPress={() =>
          props.onpressCloseVisit({
            lead_id: detailsData?.length > 0 ? detailsData[0]?.lead_id : [],
            appointment_id: detailsData?.length > 0 ? detailsData[0]?._id : [],
            // cancle_type: 2,  //1=lead, 2=appoinment
          })
        }
        // Visible={cancelAppoitment}
        // setIsVisible={setCancelAppoitment}
        cancelValue={props.cancelValue}
        setCancelValue={props.setCancelValue}
        item={detailsData?.length > 0 ? detailsData : []}
      />
      <JustForOkModal
        message={props.errorMessage}
        Visible={props.okIsVisible}
        onPressRightButton={() => {
          props.setOkIsVisible(false);
        }}
        setIsVisible={props.setOkIsVisible}
      />
      <JustForOkModal
        headertitle={"Success"}
        message={"Booking has been sent to CRM..."}
        Visible={props.okBookingIsVisible}
        onPressRightButton={() => {
          props.setOkBookingIsVisible(false);
        }}
        setIsVisible={props.setOkBookingIsVisible}
      />
    </View>
  );
};

export default AppointmentDetailsView;
