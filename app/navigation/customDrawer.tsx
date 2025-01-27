import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StatusBar,
  Platform,
} from "react-native";
import React, { useEffect, useState } from "react";
import styles from "./styles";
import images from "../assets/images";
import strings from "../components/utilities/Localization";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import DeviceInfo from "react-native-device-info";
import {
  DrawerContentScrollView,
  useDrawerStatus,
} from "@react-navigation/drawer";
import {
  PRIMARY_THEME_COLOR,
  ROLE_IDS,
} from "../components/utilities/constant";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { userLogout, getUserDetails } from "../Redux/Actions/AuthActions";
import { useDispatch, useSelector } from "react-redux";
import auth from "@react-native-firebase/auth";
import { getPermission } from "app/Redux/Actions/permissionAction";
import { Badge } from "@rneui/base";
import { normalize } from "app/components/scaleFontSize";

const customDrawer = ({ navigation }: any) => {
  const dispatch: any = useDispatch();
  const { response = {} } = useSelector((state: any) => state.userDetail);
  const notification = useSelector((state: any) => state.notificationCount);

  const permissionResponse = useSelector((state: any) => state.permissions);
  const isDrawerOpen = useDrawerStatus() === "open";
  const insets = useSafeAreaInsets();
  const [userData, setUserData] = useState<any>({});
  useEffect(() => {
    if (response?.status === 200) {
      setUserData(response?.data);
    } else {
      setUserData({});
    }
  }, [response, isDrawerOpen]);
  useEffect(() => {
    if (isDrawerOpen) {
      getDetail();
      dispatch(getPermission({}));
    }
  }, [isDrawerOpen]);

  const getDetail = async () => {
    const userData: any = await AsyncStorage.getItem("loginData");

    if (JSON.parse(userData)?.data?._id) {
      setUserData(JSON.parse(userData)?.data);
      /*  dispatch(
        getUserDetails({
          user_id: JSON.parse(userData).data?._id,
        })
      );  */
    }
  };

  const toggleDrawer = () => {
    navigation.toggleDrawer();
  };
  const onpressLogout = async () => {
    dispatch(userLogout());
    auth().signOut();
    navigation.navigate("AuthLoading");
  };
  const ProfileSection = () => {
    return (
      <TouchableOpacity style={styles.MainContainer}>
        <View style={styles.ContainerView}>
          <View style={styles.NameContainer}>
            <Image
              style={styles.UserImge}
              resizeMode={"cover"}
              // //source={require('../assets/images/buildings.jpeg')}
              // source={userData?.base_url + userData?.profile_picture
              // }
              source={
                userData?.base_url
                  ? { uri: userData?.base_url + userData?.profile_picture }
                  : images.user
              }
            />
            <View style={styles.UserNameView}>
              <Text
                numberOfLines={1}
                style={[styles.UserNameText, { width: 120 }]}
              >
                {
                  userData?.user_name ? userData?.user_name : "User Name"
                  /* userData?.user_name
                  ? userData?.user_name
                  : `${userData?.firstname} ${userData?.lastname}`} */
                }
              </Text>
              <Text
                numberOfLines={2}
                style={[styles.UserAddress, { width: 140 }]}
              >
                {userData?.city ?? ""}
              </Text>
              <Text
                numberOfLines={2}
                style={[styles.UserAddress, { width: 140 }]}
              >
                {userData?.role_title ?? ""}
              </Text>
            </View>
            <TouchableOpacity
              style={styles.closeDrawerView}
              onPress={toggleDrawer}
            >
              {isDrawerOpen && (
                <Image
                  style={styles.closeDrawerImage}
                  source={images.leftArrow}
                />
              )}
            </TouchableOpacity>
          </View>
        </View>
      </TouchableOpacity>
    );
  };
  const DrawerTabSection = (props: any) => {
    return (
      <>
        {props?.type?.includes(userData?.role_id) || props?.type == "all" ? (
          <TouchableOpacity
            style={styles.drawerTouch}
            onPress={props.handleDrawerNavigation}
          >
            <Image source={props.iconSource} style={styles.drawerIconStyle} />
            <View>
              <Text style={styles.drawerText}>
                {userData?.role_id === ROLE_IDS.clusterhead_id
                  ? props.tabTitle == "Sourcing Manager"
                    ? strings.SourcingTLHeader
                    : props.tabTitle == "Closing Manager"
                    ? strings.closingTL
                    : props.tabTitle
                  : props.tabTitle}
              </Text>
              {props.tabTitle === "Chat Management" &&
              notification?.response?.chat_message > 0 ? (
                <Badge
                  status="error"
                  containerStyle={{ position: "absolute", top: 0, right: -6 }}
                  badgeStyle={styles.badget}
                  textStyle={{ fontSize: normalize(10) }}
                />
              ) : null}
            </View>
          </TouchableOpacity>
        ) : null}
      </>
    );
  };
  return (
    <View style={styles.drawerMain}>
      <View
        style={{ backgroundColor: PRIMARY_THEME_COLOR, height: insets.top }}
      />
      <StatusBar barStyle={"light-content"} />
      <ProfileSection />
      <DrawerContentScrollView contentContainerStyle={{ paddingTop: 0 }}>
        <DrawerTabSection
          type={"all"}
          iconSource={images.dashboard}
          tabTitle={strings.dashboardHeader}
          handleDrawerNavigation={() => {
            navigation.navigate("DashboardScreen");
          }}
        />
        {permissionResponse?.response?.data?.map((item: any, index: any) => {
          return (
            item.permission &&
            item.path && (
              <DrawerTabSection
                key={index}
                type={"all"}
                iconSource={item.icon}
                tabTitle={item?.title}
                handleDrawerNavigation={() => {
                  console.log(item?.path);
                  navigation.navigate(item.path, { type: item.type });
                }}
              />
            )
          );
        })}
        {/* <DrawerTabSection
          type={"all"}
          iconSource={images.dashboard}
          tabTitle={strings.dashboardHeader}
          handleDrawerNavigation={() => {
            navigation.navigate("DashboardScreen");
          }}
        />
        <DrawerTabSection
          type={`${ROLE_IDS.closingtl_id}`}
          // type={"Closing TL"}
          iconSource={images.property}
          tabTitle={strings.closingManagerHeader}
          handleDrawerNavigation={() => {
            navigation.navigate("ClosingManager");
          }}
        />
        <DrawerTabSection
          type={`${ROLE_IDS.closingtl_id},${ROLE_IDS.sourcingtl_id}, ${ROLE_IDS.sourcingmanager_id}, ${ROLE_IDS.sitehead_id}}`}
          // type={"Sourcing TL,Sourcing Manager,Closing TL"}
          iconSource={images.property}
          tabTitle={strings.propertyManagementHeader}
          handleDrawerNavigation={() => {
            navigation.navigate("PropertyScreenView");
          }}
        />
        <DrawerTabSection
          type={`${ROLE_IDS.sitehead_id}}`}
          // type={"Sourcing TL,Sourcing Manager,Closing TL"}
          iconSource={images.property}
          tabTitle={strings.UserManagerHeader}
          handleDrawerNavigation={() => {
            navigation.navigate("UserManager");
          }}
        />
        <DrawerTabSection
          type={`${ROLE_IDS.closingtl_id}, ${ROLE_IDS.closingmanager_id}, ${ROLE_IDS.sitehead_id}}`}
          // type={"Closing Manager,Closing TL"}
          iconSource={images.property}
          tabTitle={strings.appointmentHeader}
          handleDrawerNavigation={() => {
            navigation.navigate("Appointments");
          }}
        />
        <DrawerTabSection
          type={`${
            ROLE_IDS.closingtl_id},
            ${ROLE_IDS.closingmanager_id},
            ${ROLE_IDS.postsales_id}, ${ROLE_IDS.sitehead_id}
          }`}
          // type={"Closing TL,Closing Manager,Post Sales"}
          iconSource={images.lead}
          tabTitle={strings.readytoBookHeader}
          handleDrawerNavigation={() => {
            navigation.navigate("BookingList", { type: "readyToBook" });
          }}
        />
        <DrawerTabSection
          type={`${ROLE_IDS.sourcingtl_id}`}
          // type={"Sourcing TL"}
          iconSource={images.property}
          tabTitle={strings.SourcingManagersHeader}
          handleDrawerNavigation={() => {
            navigation.navigate("SourcingManager");
          }}
        />
        <DrawerTabSection
          type={`${ROLE_IDS.sourcingtl_id}, ${ROLE_IDS.sourcingmanager_id}, ${ROLE_IDS.sitehead_id}}`}
          // type={"Sourcing TL,Sourcing Manager"}
          iconSource={images.agency}
          tabTitle={strings.agencyHeader}
          handleDrawerNavigation={() => {
            navigation.navigate("AgencyListing");
          }}
        />
        <DrawerTabSection
          type={`${ROLE_IDS.sourcingtl_id}, ${ROLE_IDS.sourcingmanager_id}, ${ROLE_IDS.closingtl_id}, ${ROLE_IDS.closingmanager_id}, ${ROLE_IDS.sitehead_id}}`}
          // type={"Sourcing TL,Sourcing Manager"}
          iconSource={images.lead}
          tabTitle={strings.leadManagementHeader}
          handleDrawerNavigation={() => {
            navigation.navigate("LeadManagementScreen");
          }}
        />
        <DrawerTabSection
          type={`${
            ROLE_IDS.sourcingtl_id},
            ${ROLE_IDS.sourcingmanager_id},
            ${ROLE_IDS.closingtl_id},
            ${ROLE_IDS.closingmanager_id}, ${ROLE_IDS.sitehead_id}
          }`}
          // type={"Sourcing TL,Sourcing Manager,Closing Manager,Closing TL"}
          iconSource={images.event}
          tabTitle={strings.followupHeader}
          handleDrawerNavigation={() => {
            navigation.navigate("FollowUpScreen");
          }}
        />
        <DrawerTabSection
          type={`${ROLE_IDS.sourcingtl_id}, ${ROLE_IDS.sourcingmanager_id}}`}
          // type={"Sourcing TL,Sourcing Manager"}
          iconSource={images.event}
          tabTitle={
            userData?.role_id === ROLE_IDS.sourcingtl_id
              ? strings.appointmentWithSMHeader
              : strings.appointmentWithCPHeader
          }
          handleDrawerNavigation={() => {
            navigation.navigate("AppointmentScreenCPSM");
          }}
        />
        <DrawerTabSection
          type={`${
            ROLE_IDS.sourcingtl_id},
            ${ROLE_IDS.sourcingmanager_id},
            ${ROLE_IDS.receptionist_id}, ${ROLE_IDS.sitehead_id}
          }`}
          // type={"Sourcing TL,Sourcing Manager,Receptionist"}
          iconSource={images.event}
          tabTitle={
            userData?.role_id === ROLE_IDS.receptionist_id
              ? strings.visitorAppointmentHeader
              : strings.appointmentForVisitHeader
          }
          handleDrawerNavigation={() => {
            navigation.navigate("AppointmentForSite");
          }}
        />
        <DrawerTabSection
          type={`${
            ROLE_IDS.closingtl_id},
            ${ROLE_IDS.closingmanager_id},
            ${ROLE_IDS.postsales_id}, ${ROLE_IDS.sitehead_id}
          }`}
          // type={"Closing Manager,Closing TL,Post Sales"}
          iconSource={images.lead}
          tabTitle={strings.bookingRequestHead}
          handleDrawerNavigation={() => {
            navigation.navigate("BookingList", { type: "request" });
          }}
        />
        <DrawerTabSection
          type={`${ROLE_IDS.postsales_id}, ${ROLE_IDS.sitehead_id}`}
          // type={"Post Sales"}
          iconSource={images.lead}
          tabTitle={strings.registrationReqHead}
          handleDrawerNavigation={() => {
            navigation.navigate("BookingList", { type: "register" });
          }}
        />
        <DrawerTabSection
          type={`${ROLE_IDS.receptionist_id}`}
          // type={"Receptionist"}
          iconSource={images.lead}
          tabTitle={strings.cpChecking}
          handleDrawerNavigation={() => {
            navigation.navigate("CpChecking");
          }}
        />
        <DrawerTabSection
          type={`${ROLE_IDS.sourcingmanager_id}, ${ROLE_IDS.sitehead_id}`}
          // type={"Sourcing Manager"}
          iconSource={images.event}
          tabTitle={strings.leaderBoardHeader}
          handleDrawerNavigation={() => {
            navigation.navigate("LeaderBoard");
          }}
        />
        <DrawerTabSection
          type={`${ROLE_IDS.sourcingtl_id}, ${ROLE_IDS.sourcingmanager_id}`}
          // type={"Sourcing TL,Sourcing Manager"}
          iconSource={images.event}
          tabTitle={strings.PickuprequestHeader}
          handleDrawerNavigation={() => {
            navigation.navigate("PickupRequest");
          }}
        />
        <DrawerTabSection
          type={userData?.role_id === ROLE_IDS.postsales_id ? "" : "all"}
          iconSource={images.support}
          tabTitle={strings.supportForumHeader}
          handleDrawerNavigation={() => {
            navigation.navigate("SupportForum");
          }}
        /> */}
        {/* <DrawerTabSection
          type={"all"}
          iconSource={images.support}
          handleDrawerNavigation={() => {
            navigation.navigate("Support");
          }}
          tabTitle={strings.supportHeader}
        /> */}
        {/* <DrawerTabSection
          type={`${ROLE_IDS.closingtl_id}, ${ROLE_IDS.closingmanager_id}, ${ROLE_IDS.sitehead_id}`}
          // type={"Closing Manager,Closing TL"}
          iconSource={images.property}
          tabTitle={strings.cancelBooking}
          handleDrawerNavigation={() => {
            navigation.navigate("CancelBooking");
          }}
        />
        <DrawerTabSection
          type={`${ROLE_IDS.closingtl_id}, ${ROLE_IDS.closingmanager_id}, ${ROLE_IDS.sitehead_id}`}
          // type={"Closing Manager,Closing TL"}
          iconSource={images.property}
          tabTitle={strings.recoveryHeader}
          handleDrawerNavigation={() => {
            navigation.navigate("Recovery");
          }}
        />
        <DrawerTabSection
          iconSource={images.report}
          type={"all"}
          handleDrawerNavigation={() => {
            navigation.navigate("Report");
          }}
          tabTitle={strings.reportHeader}
        />
        <DrawerTabSection
          type={"all"}
          handleDrawerNavigation={() => {
            navigation.navigate("Chat");
          }}
          iconSource={images.chat}
          tabTitle={strings.chatHeader}
        />
        <DrawerTabSection
          type={`${ROLE_IDS.closingtl_id} , ${ROLE_IDS.sitehead_id}`}
          // type={"Closing TL"}
          handleDrawerNavigation={() => {
            navigation.navigate("PickupRequest");
          }}
          iconSource={images.support}
          tabTitle={strings.PickuprequestHeader}
        />
        <DrawerTabSection
          type={`${ROLE_IDS.closingtl_id}, ${ROLE_IDS.closingmanager_id} , ${ROLE_IDS.sitehead_id}`}
          // type={"Closing Manager,Closing TL"}
          iconSource={images.support}
          tabTitle={strings.saleToolHeader}
          handleDrawerNavigation={() => {
            navigation.navigate("SalesTools");
          }}
        />
        <DrawerTabSection
          type={"all"}
          iconSource={images.setting}
          tabTitle={strings.setting}
          handleDrawerNavigation={() => {
            navigation.navigate("SettingScreen");
          }}
        /> */}
        {/* <DrawerTabSection
            type={"all"}
            iconSource={15}
            tabTitle={"Project Details Report"}
            handleDrawerNavigation={() => {
              console.log("PDRScreen");
              navigation.navigate("PDRScreen", { type: "" });
            }}
          /> */}
        <DrawerTabSection
          type={"all"}
          iconSource={images.logout}
          tabTitle={strings.logout}
          handleDrawerNavigation={() => onpressLogout()}
        />
      </DrawerContentScrollView>
      <View style={styles.versionView}>
        <View style={[styles.drawerTouch, { justifyContent: "center" }]}>
          <Text style={styles.drawerText}>
            {/* {strings.versionText}ST-{DeviceInfo.getVersion()} */}
            {strings.versionText}-{DeviceInfo.getVersion()}
          </Text>
        </View>
      </View>
    </View>
  );
};

export default customDrawer;
