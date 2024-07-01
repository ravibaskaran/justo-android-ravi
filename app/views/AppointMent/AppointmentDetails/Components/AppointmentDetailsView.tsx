import { View, Text, StatusBar } from "react-native";
import React, { useState } from "react";
import styles from "./Styles";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Header from "../../../../components/Header";
import images from "../../../../assets/images";
import strings from "../../../../components/utilities/Localization";
import AppointmentDtailsItem from "./AppointmentDtailsItem";
import Button from "../../../../components/Button";
import { useSelector } from "react-redux";
import ReadyToBookModal from "./ReadyToBookModal";
import CancelModal from "./CancelBooking";
import usePermission from "app/components/utilities/UserPermissions";
import CheckedinModel from "./CheckedinModel";
import { Isios } from "app/components/utilities/constant";
import JustForOkModal from "app/components/Modals/JustForOkModal";

const AppointmentDetailsView = (props: any) => {
  const { detailsData,getDetail } = props;
  const getLoginType = useSelector((state: any) => state.login);
  const { userData = {} } = useSelector((state: any) => state.userData) || [];
  const insets = useSafeAreaInsets();
  const [readyToBooK, setReadyToBooK] = useState(false);
  const [cancelAppoitment, setCancelAppoitment] = useState(false);
  const [CpChecking, setCpChecking] = useState(false);
  const { response = {}, detail = "" } =
    useSelector((state: any) => state.appointment) || [];
  const data = detailsData?.length > 0 ? detailsData[0] : [];

  const { edit, status, create, approve } = usePermission({
    edit: "close_appointment",
    status: "appointment_status_update",
    create: "book_now",
    approve: "ready_for_booking",
  });
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
      {/* {userData?.data?.role_title === "Closing Manager" ? (
        data?.assign_appoinment ? (
          <View style={styles.bntView}>
            {data?.status !== 5 && data?.status !== 6 && data?.status !== 4 && data?.status !== 3 ? (
              <>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  // {edit && (
                  //   <Button
                  //     buttonText={strings.Statusupdate}
                  //     // btnTxtsize={13}
                  //     handleBtnPress={() => setCancelAppoitment(true)}
                  //     width={150}
                  //   />
                  // )}
                  {status && (
                    <Button
                      buttonText={strings.schedule}
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
                  {create &&
                    (userData?.data?.role_title === "Closing Manager" ||
                      userData?.data?.role_title === "Closing TL" ||
                      getLoginType?.response?.data?.role_title ===
                      "Closing Manager" ? (
                      <Button
                        buttonText={strings.bookNow}
                        handleBtnPress={() => props.onPressBookNow()}
                        width={150}
                      />
                    ) : null)}

                  {approve && (
                    <Button
                      buttonText={strings.readytoBookHeader}
                      handleBtnPress={() => setReadyToBooK(true)}
                      width={150}
                    />
                  )}
                </View>
              </>
            ) : null}
          </View>
        ) : null
      ) : ( */}
      {data?.checkin_status === true ? (
        <View style={styles.bntView}>
          {data?.status === 1 ? (
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
                    handleBtnPress={() => props.handleNotInterestedPress()}
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
                  (userData?.data?.role_title === "Closing Manager" ||
                  userData?.data?.role_title === "Closing TL" ||
                  getLoginType?.response?.data?.role_title === "Site Head" ||
                  getLoginType?.response?.data?.role_title ===
                    "Cluster Head" ? (
                    <Button
                      buttonText={strings.bookNow}
                      handleBtnPress={() => props.onPressBookNow()}
                      width={150}
                    />
                  ) : null)}
                {/* Ready To Book */}
                {/* {approve && (
                  <Button
                    buttonText={strings.readytoBookHeader}
                    handleBtnPress={() => setReadyToBooK(true)}
                    width={150}
                  />
                )} */}
              </View>
            </>
          ) : null}
        </View>
      ) : data?.status === 1 ? (
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
              buttonText={strings.appointmentDone}
              handleBtnPress={() => setCpChecking(true)}
              width={Isios ? 180 : 160}
            />
          </View>
        </View>
      ) : null}
      {/* )} */}

      {/* Ready To Book Model */}
      <ReadyToBookModal
        Visible={readyToBooK}
        setIsVisible={() => setReadyToBooK(false)}
        setBookingData={props.setBookingData}
        BookingData={props.BookingData}
        handleBooking={() =>
          props.handleBooking(
            detailsData?.length > 0 ? detailsData[0] : {}
          )
        }
      />
      {/* Cp Check-In Model */}
      <CheckedinModel
        Visible={CpChecking}
        setIsVisible={() => setCpChecking(false)}
        data={data}
        getDetail={getDetail}
      />
      {/* Cancel Booking Model */}
      <CancelModal
        cancelDataPress={() =>
          props.onpressCloseVisit({
            lead_id:
              detailsData?.length > 0 ? detailsData[0]?.lead_id : [],
            appointment_id:
              detailsData?.length > 0 ? detailsData[0]?._id : [],
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
        onPressRightButton={()=>{
          props.setOkBookingIsVisible(false)
        }}
        setIsVisible={props.setOkBookingIsVisible} />
    </View>
  );
};

export default AppointmentDetailsView;
