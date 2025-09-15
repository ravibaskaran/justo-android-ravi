import React from "react";
import { View } from "react-native";
import images from "../../../../assets/images";
import Button from "../../../../components/Button";
import Header from "../../../../components/Header";
import { PRIMARY_THEME_COLOR } from "../../../../components/utilities/constant";
import strings from "../../../../components/utilities/Localization";
import CancelModal from "../../../../views/BookingManagement/BookingDetails/components/CancelBooking";
import RecoveryDetailItem from "./RecoveryDetailItem";
import styles from "./Styles";

const AppointmentDetailsView = (props: any) => {
  return (
    <View style={styles.mainContainer}>
      <Header
        leftImageSrc={images.backArrow}
        rightSecondImageScr={images.notification}
        headerText={strings.recoveryDetailHeader}
        leftImageIconStyle={styles.RightFirstIconStyle}
        handleOnLeftIconPress={props.handleBackPress}
        headerStyle={styles.headerStyle}
        barStyle={"light-content"}
        statusBarColor={PRIMARY_THEME_COLOR}
      />
      <View style={styles.propertyListView}>
        <RecoveryDetailItem data={props.data} />
      </View>

      <View style={styles.btnWrap}>
        <View style={styles.bntView}>
          <Button
            buttonText={strings.followup}
            width={150}
            handleBtnPress={() => props.handleStatusUpdate()}
          />
        </View>
        <View style={styles.bntView}>
          <Button buttonText={strings.bookNow} width={150} handleBtnPress={() => props.handleBookNow()} />
        </View>
      </View>
      <View style={styles.bntView}>
        <Button buttonText={strings.cancelBooking} width={150} handleBtnPress={() => props.setCancelBookingModel(true)} />
      </View>
      <CancelModal
        cancelDataPress={props.cancelBookingPress}
        Visible={props.cancelBookingModel}
        setIsVisible={props.setCancelBookingModel}
        cancelValue={props.cancelValue}
        item={props.data ? props.data : {}}
        setCancelValue={props.setCancelValue}
        type={'recovery'}
      />
    </View>
  );
};

export default AppointmentDetailsView;
