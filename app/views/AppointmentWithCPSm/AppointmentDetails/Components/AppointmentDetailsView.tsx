import { updateUserAppointmentStatus } from "app/Redux/Actions/AppiontmentWithUserActions";
import React, { useEffect, useState } from "react";
import { View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import images from "../../../../assets/images";
import Button from "../../../../components/Button";
import Header from "../../../../components/Header";
import strings from "../../../../components/utilities/Localization";
import { PRIMARY_THEME_COLOR } from "../../../../components/utilities/constant";
import AppointmentModal from "../../AppointmentScreen/Components/AppointmentModal";
import AppointmentDtailsItem from "./AppointmentDtailsItem";
import styles from "./Styles";

const AppointmentDetailsView = (props: any) => {
  const dispatch: any = useDispatch();
  const [isVisible, setIsVisible] = useState<any>(false);
  const [params, setParams] = useState<any>({
    appointment_id: "",
    appointment_status: "",
    remark: "",
    latitude: "",
    longitude: "",
  });
  const userEditAppointmentData = useSelector(
    (state: any) => state.userEditAppointmentData
  );

  const handleOptionPress = (id: any, status: any) => {
    console.log("status: ", status);
    setParams({
      ...params,
      appointment_id: id,
      appointment_status: status,
      latitude: "",
      longitude: "",
      remark: "",
    });
    setIsVisible(true);
  };

  const handleOnPressYesInModal = () => {
    dispatch(updateUserAppointmentStatus(params));
    setIsVisible(false);
  };

  useEffect(() => {
    if (userEditAppointmentData?.response?.status === 200) {
      props?.navigation.goBack();
    }
  }, [userEditAppointmentData]);

  return (
    <View style={styles.mainContainer}>
      <Header
        leftImageSrc={images.backArrow}
        rightSecondImageScr={images.notification}
        headerText={strings.appointmnetdetail}
        leftImageIconStyle={styles.RightFirstIconStyle}
        handleOnLeftIconPress={props.handleBackPress}
        headerStyle={styles.headerStyle}
        barStyle={"light-content"}
        statusBarColor={PRIMARY_THEME_COLOR}
      />
      <View style={styles.propertyListView}>
        <AppointmentDtailsItem status={props.status} />
      </View>

      <AppointmentModal
        Visible={isVisible}
        setIsVisible={setIsVisible}
        params={params}
        setParams={setParams}
        type={"appWith"}
        handleOnPressYesInModal={handleOnPressYesInModal}
      />
    </View>
  );
};

export default AppointmentDetailsView;
