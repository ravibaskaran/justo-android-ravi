import usePermission from "app/components/utilities/UserPermissions";
import React from "react";
import { View } from "react-native";
import { useSelector } from "react-redux";
import images from "../../../../assets/images";
import Button from "../../../../components/Button";
import Header from "../../../../components/Header";
import {
  Isios,
  PRIMARY_THEME_COLOR,
  PRIMARY_THEME_COLOR_DARK,
  ROLE_IDS,
  WHITE_COLOR,
} from "../../../../components/utilities/constant";
import strings from "../../../../components/utilities/Localization";
import LeadDetailsIteam from "./LeadDetailsIteam";
import styles from "./Styles";

const LeadDetailsView = (props: any) => {
  const { userData = {} } = useSelector((state: any) => state.userData);
  const id = userData?.data?.role_id || "";
  const { create, status } = usePermission({
    create:
      id === ROLE_IDS.closingtl_id ||
      id === ROLE_IDS.closing_head_id ||
      id === ROLE_IDS.closingmanager_id
        ? "add_appointment"
        : "add_appointment _site_visite",
    status: "add_followup",
  });
  return (
    <View style={styles.mainContainer}>
      <Header
        leftImageSrc={images.backArrow}
        rightSecondImageScr={images.notification}
        headerText={strings.visitordetails}
        leftImageIconStyle={styles.RightFirstIconStyle}
        handleOnLeftIconPress={props.handleBackPress}
        headerStyle={styles.headerStyle}
        statusBarColor={PRIMARY_THEME_COLOR}
        barStyle={"light-content"}
      />
      <View style={styles.leadDetailsItemView}>
        <LeadDetailsIteam items={props?.allDetails} />
      </View>
      <View
        style={[
          styles.btnContainer,
          {
            justifyContent:
              props?.allDetails?.lead_status === 3 ? "center" : "space-around",
          },
        ]}
      >
        {(create && !props.isDraft && props?.allDetails?.lead_status === 1) ||
        props?.allDetails?.lead_status === 2 ||
        props?.allDetails?.booking_status === 4 ||
        props?.allDetails?.appointment_status === 4 ||
        props?.allDetails?.appointment_status === 5 ||
        props?.allDetails?.appointment_status === 6 ? (
          <Button
            buttonText={strings.ScheduleSitevisite}
            width={155}
            height={45}
            bgcolor={PRIMARY_THEME_COLOR_DARK}
            btnTxtcolor={WHITE_COLOR}
            btnTxtsize={11.7}
            textTransform={"uppercase"}
            handleBtnPress={() => props.handleScheduleVisit()}
          />
        ) : null}
        {status && !props.isDraft && (
          <>
            {props?.allDetails?.lead_status === 5 ? null : (
              <Button
                buttonText={strings.Statusupdate}
                width={150}
                height={45}
                bgcolor={PRIMARY_THEME_COLOR_DARK}
                btnTxtcolor={WHITE_COLOR}
                btnTxtsize={Isios ? 12 : 14}
                textTransform={"uppercase"}
                handleBtnPress={() => props.handleStatusUpdate()}
              />
            )}
          </>
        )}
      </View>
    </View>
  );
};

export default LeadDetailsView;
