import { View, Text, StatusBar } from "react-native";
import React from "react";
import {
  BLACK_COLOR,
  Isios,
  PRIMARY_THEME_COLOR_DARK,
  WHITE_COLOR,
} from "../../../../components/utilities/constant";
import Header from "../../../../components/Header";
import images from "../../../../assets/images";
import strings from "../../../../components/utilities/Localization";
import styles from "./Styles";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Button from "../../../../components/Button";
import FollowUpDetailsItem from "./FollowUpDetailsItem";
import { useNavigation } from "@react-navigation/native";
import { useSelector } from "react-redux";
import usePermission from "app/components/utilities/UserPermissions";

const FollowUpDetailsView = (props: any) => {
  const { detailsData } = props;

  const insets = useSafeAreaInsets();
  const navigation: any = useNavigation();
  const { response = {} } = useSelector((state: any) => state.followUp) || [];
  const Status = detailsData?.length > 0 ? detailsData[0] : [];
  const onpressSchedule = () => {
    navigation.navigate("AddAppointmentForSite", {
      item: {
        _id: Status?.lead_id,
        customer_first_name: Status?.customer?.first_name,
        property_id: Status?.property_id,
        property_title: Status?.property_title,
        pickup: "",
      },
      type: "Add",
    });
  };

  const { create, status } = usePermission({
    create: "",
    status: "add_followup",
  });
  return (
    <View style={styles.mainContainer}>
      <Header
        leftImageSrc={images.backArrow}
        rightSecondImageScr={images.notification}
        headerText={strings.followupDetails}
        leftImageIconStyle={styles.RightFirstIconStyle}
        handleOnLeftIconPress={props.handleBackPress}
        headerStyle={styles.headerStyle}
      />
      <View style={styles.leadDetailsItemView}>
        <FollowUpDetailsItem
          data={detailsData?.length > 0 ? detailsData[0] : {}}
        />
      </View>
      {Status?.lead_status !== 5 || Status?.lead_status !== 6 ? (
        <View style={styles.btnContainer}>
          {Status?.lead_status === 1 || Status?.lead_status === 2 ? (
            <Button
              buttonText={strings.ScheduleSitevisite}
              width={Isios ? 180 : 150}
              height={45}
              bgcolor={PRIMARY_THEME_COLOR_DARK}
              btnTxtcolor={WHITE_COLOR}
              btnTxtsize={12}
              textTransform={"uppercase"}
              handleBtnPress={() => onpressSchedule()}
            />
          ) : null}
          {status && (
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
        </View>
      ) : null}
    </View>
  );
};

export default FollowUpDetailsView;
