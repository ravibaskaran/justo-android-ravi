import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  Image,
  FlatList,
  TouchableOpacity,
  RefreshControl,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Switch } from "react-native-switch";
import Header from "../../../components/Header";
import images from "../../../assets/images";
import styles from "./styles";
import strings from "../../../components/utilities/Localization";
import {
  GREEN_COLOR,
  Isios,
  PRIMARY_THEME_COLOR_DARK,
  RED_COLOR,
  ROLE_IDS,
  WHITE_COLOR,
} from "../../../components/utilities/constant";
import SourcingDashboardView from "./SourcingView";
import ClosingDashboardView from "./ClosingView";
import ComingSoonScreen from "app/components/CommonScreen/ComingSoon";
import PostSaleDashboardView from "./PostSalesView";
import ReceiptionistDashboardView from "./ReceptionistView";
import SiteHeadView from "./SiteHeadView";
import { normalizeSpacing } from "app/components/scaleFontSize";

const DashboardView = (props: any) => {
  const roleType = props?.getLoginType?.response?.data?.role_id || null;
  const [refreshing, setRefreshing] = React.useState(false);
  const onRefresh = () => {
    setRefreshing(true);
    props.getDashboard();
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  };

  const renderItem = (item: any, index: any) => {
    return (
      <View key={index}>
        {index <= 4 && (
          <TouchableOpacity
            onPress={() => {
              roleType === ROLE_IDS.sourcingtl_id
                ? props.onPressSMList("details", item)
                : roleType === ROLE_IDS.closingtl_id
                ? props.onPressCMLIST("details", item)
                : props.onPressCPList("details", item);
            }}
            style={styles.headingView}
          >
            <Text style={styles.itemText}>
              {roleType === ROLE_IDS.sourcingtl_id ||
              roleType === ROLE_IDS.closingtl_id
                ? item.user_name
                : roleType === ROLE_IDS.sourcingmanager_id
                ? item.agent_name
                : strings.notfount}
            </Text>
            <Text
              style={[
                styles.itemText,
                {
                  marginLeft:
                    roleType === ROLE_IDS.closingtl_id
                      ? normalizeSpacing(14)
                      : 0,
                },
              ]}
            >
              {roleType === ROLE_IDS.closingtl_id
                ? item.status
                  ? strings.active
                  : strings.deactive
                : item.total_visit}
            </Text>
            <Text style={styles.itemText}>
              {roleType === ROLE_IDS.closingtl_id
                ? item?.today_appoinment?.toString()
                : item.total_site_visit}
            </Text>
            {/* <Text style={styles.itemText}>{item.total_closing_lead}</Text> */}
            <Image source={images.rightArrow} style={styles.rightArrowImage} />
          </TouchableOpacity>
        )}
      </View>
    );
  };

  return (
    <>
      <View style={styles.mainContainerWrap}>
        <Header
          leftImageSrc={images.menu}
          rightImageScr={images.notification}
          headerText={strings.dashboardHeader}
          rightSecondImageScr={images.notification}
          handleOnLeftIconPress={props.handleDrawerPress}
          headerStyle={styles.headerStyle}
        />
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.dashboardScroll}
          bounces={Isios ? true : false}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        >
          <View style={styles.dashboardWrap}>
            <View style={styles.nameView}>
              <View style={styles.statusView}>
                <Text style={styles.statusText}>Status</Text>
                <View style={styles.switchView}>
                  <Switch
                    value={props?.isEnabled === 1 ? true : false}
                    onValueChange={(val) =>
                      props.updateStatusPress(props?.isEnabled)
                    }
                    //disabled={false}
                    backgroundActive={GREEN_COLOR}
                    backgroundInactive={RED_COLOR}
                    circleActiveColor={WHITE_COLOR}
                    circleInActiveColor={WHITE_COLOR}
                    circleSize={25}
                    activeText={""}
                    inActiveText={""}
                    // barHeight={1}
                    circleBorderWidth={2}
                  />
                </View>
              </View>
              <View style={styles.welcomeView}>
                <Text style={styles.welcomeToText}>Welcome</Text>
                <Text style={styles.welcomeNameText}>
                  {props?.dashboardData?.user_name}
                </Text>
              </View>
            </View>
            {roleType === ROLE_IDS.postsales_id ? (
              <></>
            ) : (
              <View style={styles.qrCodeView}>
                {props?.dashboardData?.qrcode != "" ||
                props?.dashboardData?.qr_code ? (
                  <Image
                    source={{
                      uri:
                        props?.dashboardData?.qrcode ||
                        props?.dashboardData?.qr_code,
                    }}
                    style={styles.qrCodeImage}
                  />
                ) : (
                  <Image source={images.qrCode} style={styles.qrCodeImage} />
                )}
                {/* <TouchableOpacity style={styles.linkImageView}>
                <Image source={images.link} style={styles.linkImage} />
              </TouchableOpacity> */}
              </View>
            )}
          </View>
          {roleType === ROLE_IDS.sourcingtl_id ||
          roleType === ROLE_IDS.sourcingmanager_id ? (
            <SourcingDashboardView
              dashboardData={props?.dashboardData}
              getLoginType={props.getLoginType}
              onPressTodayVisit={props.onPressTodayVisit}
              onPressSiteVisit={props.onPressSiteVisit}
              onPressSMList={props.onPressSMList}
              onPressCPList={props.onPressCPList}
              onpressAppointmentWithCP={props.onpressAppointmentWithCP}
              todayAppointmentWithCp={props?.todayAppointmentWithCp}
            />
          ) : (
            <>
              {roleType === ROLE_IDS.closingtl_id ||
              roleType === ROLE_IDS.closingmanager_id ? (
                <ClosingDashboardView
                  dashboardData={props?.dashboardData}
                  getLoginType={props.getLoginType}
                  onPressSiteVisit={props.onPressSiteVisit}
                  onpressBooking={props.onpressBooking}
                  onpressSMList={props.onpressSMList}
                  appointmentList={props.appointmentList}
                  onPressAppointmentItem={props.onPressAppointmentItem}
                />
              ) : (
                <>
                  {roleType === ROLE_IDS.postsales_id ? (
                    <PostSaleDashboardView
                      dashboardData={props?.dashboardData}
                      getLoginType={props.getLoginType}
                      onpressBooking={props.onpressBooking}
                    />
                  ) : (
                    <>
                      {roleType === ROLE_IDS.receptionist_id ? (
                        <ReceiptionistDashboardView
                          dashboardData={props?.dashboardData}
                        />
                      ) : (
                        <>
                          {roleType === ROLE_IDS.sitehead_id ||
                          roleType === ROLE_IDS.clusterhead_id ||
                          roleType === ROLE_IDS.businesshead_id ? (
                            <SiteHeadView
                              dashboardData={props?.dashboardData}
                              onpressBooking={props.onpressBooking}
                              onPressTodayVisit={props.onPressTodayVisit}
                              onPressSiteVisit={props.onPressSiteVisit}
                            />
                          ) : (
                            <View style={styles.secondPortion}>
                              <ComingSoonScreen />
                            </View>
                          )}
                        </>
                      )}
                    </>
                  )}
                </>
              )}
            </>
          )}
          {props?.listData?.length > 0 ? (
            <View style={styles.bottomSection}>
              <View
                style={[
                  styles.headingView,
                  {
                    backgroundColor: PRIMARY_THEME_COLOR_DARK,
                  },
                ]}
              >
                {roleType === ROLE_IDS.sourcingtl_id ? (
                  <>
                    <Text style={styles.headingText}>SM Name</Text>
                    <Text style={styles.headingText}>Visitor</Text>
                    <Text style={styles.headingText}>Site Visit</Text>
                    {/* <Text style={styles.headingText}>CLOSE LEAD</Text> */}
                  </>
                ) : roleType === ROLE_IDS.closingtl_id ? (
                  <>
                    <Text style={styles.headingText}>CM Name</Text>
                    <Text style={styles.headingText}>Status</Text>
                    <Text style={styles.headingText}>Appointment</Text>
                    {/* <Text style={styles.headingText}>CLOSE LEAD</Text> */}
                  </>
                ) : (
                  <>
                    {roleType === ROLE_IDS.sourcingmanager_id && (
                      <>
                        <Text style={styles.headingText}>CP Name</Text>
                        <Text style={styles.headingText}>Visitor</Text>
                        <Text style={styles.headingText}>Site Visit</Text>
                        {/* <Text style={styles.headingText}>CLOSE LEAD</Text> */}
                      </>
                    )}
                  </>
                )}
              </View>
              <View>
                {props?.listData?.map((item: any, index: any) =>
                  renderItem(item, index)
                )}

                {(roleType === ROLE_IDS.sourcingtl_id ||
                  roleType === ROLE_IDS.sourcingmanager_id ||
                  roleType === ROLE_IDS.closingtl_id) &&
                props?.listData?.length > 5 ? (
                  <TouchableOpacity
                    style={styles.headingView}
                    onPress={() => {
                      roleType === ROLE_IDS.sourcingtl_id
                        ? props.onPressSMList()
                        : roleType === ROLE_IDS.closingtl_id
                        ? props.onPressCMLIST()
                        : props.onPressCPList();
                    }}
                  >
                    <Text style={[styles.headingText, styles.knowMoreText]}>
                      Know More
                    </Text>
                  </TouchableOpacity>
                ) : null}
              </View>
            </View>
          ) : null}
        </ScrollView>
      </View>
    </>
  );
};

export default DashboardView;
