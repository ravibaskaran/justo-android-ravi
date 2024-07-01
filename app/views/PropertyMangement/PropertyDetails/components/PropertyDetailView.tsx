import { View, Text, StatusBar, FlatList, Alert } from "react-native";
import React, { useState, useEffect } from "react";
import Header from "../../../../components/Header";
import {
  GRAY_COLOR,
  ROLE_IDS,
} from "../../../../components/utilities/constant";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import images from "../../../../assets/images";
import strings from "../../../../components/utilities/Localization";
import styles from "./styles";
import PropertyDetailItem from "./PropertyDetailItem";
import { useNavigation } from "@react-navigation/native";
import Button from "../../../../components/Button";
import ConfirmModal from "../../../../components/Modals/ConfirmModal";
import moment from "moment";
import { useSelector } from "react-redux";
import usePermission from "app/components/utilities/UserPermissions";
import JustForOkModal from "app/components/Modals/JustForOkModal";

const PropertyDetailView = (props: any) => {
  const [isVisible, setIsVisible] = useState(false);
  const [okIsVisible, setOkIsVisible] = useState(false);
  const [propertydetail, setPropertydetail] = useState<any>([]);
  const [configurations, setConfigurations] = useState([]);
  const [propertydocument, setPropertydocument] = useState([]);
  const [amenity, setAmenity] = useState([]);
  const [approveStatus, setApproveStatus] = useState(1);
  const propertyData =
    useSelector((state: any) => state.propertydetailData) || [];
  const getLoginType = useSelector((state: any) => state.login);
  const { userData = {} } = useSelector((state: any) => state.userData);

  const roleType = getLoginType?.response?.data?.role_id || null;
  const insets = useSafeAreaInsets();
  const navigation: any = useNavigation();
  const { response, loading } = propertyData;
  const onPressCreatevisit = () => {
    navigation.navigate("AddNewVisitorScreen", {
      type: "propertySelect",
      data: propertydetail,
    });
  };

  const [isInventoryVisible, setIsInventoryVisible] = useState(false);

  useEffect(() => {
    if (response && response?.status === 200) {
      setPropertydetail(response?.data[0]);
      setConfigurations(response?.data[0]?.configuration_area || []);
      setAmenity(response?.data[0]?.amenity || []);
      setPropertydocument(response?.data[0]?.property_document || []);
      setApproveStatus(props.data.approve_status);

      props.setIsloading(loading);
    } else {
      setPropertydetail([]);
    }

    props.setIsloading(propertyData?.loading);
  }, [propertyData]);

  const onpresContent = (name: any, items: any) => {
    navigation.navigate(name, items);
  };

  const handleInventoryPress = () => {
    if (propertydetail?.jw_project_id) {
      navigation.navigate("PropertyInventory", {
        propName: propertydetail?.jw_project_id,
      });
    } else {
      setOkIsVisible(true);
    }
  };
  const { create, allocate } = usePermission({
    create: "add_visitor",
    allocate: "property_allocate",
  });
  const onPressRightButton = () => {
    setOkIsVisible(false);
  };
  return (
    <View style={styles.mainContainer}>
      <Header
        leftImageSrc={images.backArrow}
        rightSecondImageScr={images.notification}
        headerText={strings.propertyDetailHeader}
        headerStyle={styles.headerStyle}
        RightFirstIconStyle={styles.leftImageIconStyle}
        leftImageIconStyle={styles.leftImageIconStyle}
        handleOnLeftIconPress={props.handleBackPress}
      />
      <View style={styles.propertyListView}>
        <PropertyDetailItem
          items={propertydetail}
          onpresContent={onpresContent}
          configurations={configurations}
          amenity={amenity}
          propertydocument={propertydocument}
          handleInventoryPress={handleInventoryPress}
          userData={userData}
        />
      </View>
      <View
        style={[
          styles.btnContainer,
          {
            justifyContent: "center",
          },
        ]}
      >
        {propertydetail?.status ? (
          <>
            {allocate &&
              (roleType === ROLE_IDS.sitehead_id ? (
                <></>
              ) : (
                <Button
                  handleBtnPress={() => props.handleAllocatePress()}
                  buttonText={strings.allocate}
                  width={150}
                  height={45}
                  bordercolor={GRAY_COLOR}
                  borderWidth={1}
                  btnTxtsize={15}
                  textTransform={"uppercase"}
                />
              ))}
            {create && (
              <Button
                handleBtnPress={() => onPressCreatevisit()}
                buttonText={strings.createVisit}
                width={150}
                height={45}
                bordercolor={GRAY_COLOR}
                borderWidth={1}
                btnTxtsize={15}
                textTransform={"uppercase"}
              />
            )}
          </>
        ) : null}
      </View>

      <ConfirmModal Visible={isVisible} setIsVisible={setIsVisible} />
      <JustForOkModal
        message={
          "JW Property Id not map with this Property. Contact with JV admin for map this."
        }
        onPressRightButton={onPressRightButton}
        Visible={okIsVisible}
        setIsVisible={setOkIsVisible}
      />
    </View>
  );
};

export default PropertyDetailView;
