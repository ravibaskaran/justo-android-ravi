import { View, Text } from "react-native";
import React from "react";
import styles from "./styles";
import Header from "app/components/Header";
import images from "app/assets/images";
import strings from "app/components/utilities/Localization";
import {
  DATE_FORMAT,
  FONT_FAMILY_SEMIBOLD,
  Isios,
  PRIMARY_THEME_COLOR,
  ROLE_IDS,
} from "app/components/utilities/constant";
import ComingSoonScreen from "app/components/CommonScreen/ComingSoon";
import SMReportTable from "./SMReportTable";
import CMReportTable from "./CMReportTable";
import STReportTable from "./STReportTable";
import CTReportTable from "./CTReportTable";
import ClusterHeadReportTable from "./ClusterHeadReportTable";
import FilterModal from "./modal/ReportFilterModal";
import BusinessHeadReportTable from "./BusinessHeadReportTable";
import moment from "moment";
import { normalize } from "app/components/scaleFontSize";
import SCMReportTable from "./SCMReportTable";
import Share from "react-native-share";

const ReportView = (props: any) => {
  const {
    roleId,
    handleDrawerPress,
    reportData,
    userData,
    handleOnFilterPress,
    FilterModalVisible,
    setIsFilterModalVisible,
    setFilterData,
    filterData,
    handleFilter,
    onReset,
    handleCpDetailPress,
    propertyListForFilter,
    clusterheadListForFilter,
    handleCTANavigation,
    fileName,
    selectedStartDate,
    selectedEndDate,
  } = props;

  function formatDateString(dateString: any) {
    const [year, month, day] = dateString.split("-");
    const shortYear = year.slice(-2); // Get last two digits of the year
    return `${day}/${month}/${shortYear}`;
  }

  const getShareData = () => {
    const user = userData?.data;
    const report = reportData[0] || {};
    let data = "";

    if (roleId === ROLE_IDS.sourcingmanager_id) {
      data =
        `*Date:* ${formatDateString(selectedStartDate)} - ${formatDateString(
          selectedEndDate
        )}\n` +
        `*Name:* ${user?.user_name}\n` +
        `*Role:* ${userData?.data?.role_title}\n` +
        `*Leads:* ${report.total_leades || 0}\n` +
        `*Site Visit Created:* ${report.site_visit_created || 0}\n` +
        `*Walk-ins:* ${report.walkin || 0}\n` +
        `*Booking:* ${report.total_booking || 0}\n` +
        `*CP Appointments:* ${report.appointmentwithCp || 0}\n`;
    } else if (roleId === ROLE_IDS.closingmanager_id) {
      data =
        `*Date:* ${formatDateString(selectedStartDate)} - ${formatDateString(
          selectedEndDate
        )}\n` +
        `*Name:* ${user?.user_name}\n` +
        `*Role:* ${userData?.data?.role_title}\n` +
        `*Leads:* ${report.total_leades || 0}\n` +
        `*Site Visit Created:* ${report.site_visit_created || 0} (CP: ${
          report.site_visit_created_cp || 0
        }, Direct: ${report.site_visit_created_direct || 0})\n` +
        `*Walk-ins:* ${report.walkin || 0} (CP: ${
          report.walkin_cp || 0
        }, Direct: ${report.walkin_direct || 0})\n` +
        `*Booking:* ${report.total_booking || 0} (CP: ${
          report.booking_cp || 0
        }, Direct: ${report.booking_direct || 0})\n`;
    } else if (roleId === ROLE_IDS.scm_id) {
      data =
        `*Date:* ${formatDateString(selectedStartDate)} - ${formatDateString(
          selectedEndDate
        )}\n` +
        `*Name:* ${user?.user_name}\n` +
        `*Role:* ${userData?.data?.role_title}\n` +
        `*Leads:* ${report.total_leades || 0}\n` +
        `*Site Visit Created:* ${report.site_visit_created || 0} (CP: ${
          report.site_visit_created_cp || 0
        }, Direct: ${report.site_visit_created_direct || 0})\n` +
        `*Walk-ins:* ${report.walkin || 0} (CP: ${
          report.walkin_cp || 0
        }, Direct: ${report.walkin_direct || 0})\n` +
        `*Booking:* ${report.total_booking || 0} (CP: ${
          report.booking_cp || 0
        }, Direct: ${report.booking_direct || 0})\n` +
        `*CP Appointments:* ${report.appointmentwithCp || 0}\n`;
    } else if (
      roleId === ROLE_IDS.sourcingtl_id ||
      roleId === ROLE_IDS.sourcing_head_id
    ) {
      data =
        `*Date:* ${formatDateString(selectedStartDate)} - ${formatDateString(
          selectedEndDate
        )}\n` +
        `*Name:* ${user?.user_name}\n` +
        `*Role:* ${userData?.data?.role_title}\n` +
        `*Leads:* ${report.total_leades || 0} \n` +
        `*Site Visit Created:* ${report.site_visit_created || 0} \n` +
        `*Walk-ins:* ${report.walkin || 0} \n` +
        `*Booking:* ${report.total_booking || 0} \n\n`;

      const teamMembers = report.sm_list || [];
      if (teamMembers.length) {
        data += "*Sourcing Managers:*\n\n";
        teamMembers.forEach(
          (member: {
            user_name: any;
            walkin: any;
            total_leades: any;
            total_booking: any;
            site_visit_created: any;
            appointmentwithCp: any;
          }) => {
            data +=
              `*Name:* ${member.user_name}\n` +
              `*Leads:* ${member.total_leades || 0} \n` +
              `*Site Visit Created:* ${member.site_visit_created || 0} \n` +
              `*Walk-ins:* ${member.walkin || 0} \n` +
              `*Booking:* ${member.total_booking || 0} \n` +
              `*CP Appointments:* ${member.appointmentwithCp || 0} \n\n`;
          }
        );
      }
    } else if (
      roleId === ROLE_IDS.closingtl_id ||
      roleId === ROLE_IDS.closing_head_id
    ) {
      data =
        `*Date:* ${formatDateString(selectedStartDate)} - ${formatDateString(
          selectedEndDate
        )}\n` +
        `*Name:* ${user?.user_name}\n` +
        `*Role:* ${userData?.data?.role_title}\n` +
        `*Leads:* ${report.total_leades || 0}\n` +
        `*Site Visit Created:* ${report.site_visit_created || 0} (CP: ${
          report.site_visit_created_cp || 0
        }, Direct: ${report.site_visit_created_direct || 0})\n` +
        `*Walk-ins:* ${report.walkin || 0} (CP: ${
          report.walkin_cp || 0
        }, Direct: ${report.walkin_direct || 0})\n` +
        `*Booking:* ${report.total_booking || 0} (CP: ${
          report.booking_cp || 0
        }, Direct: ${report.booking_direct || 0})\n\n`;

      // Include team members if available
      const teamMembers = report.sm_list || [];
      if (teamMembers.length) {
        data += "*Closing Managers:*\n\n";
        teamMembers.forEach(
          (member: {
            user_name: any;
            walkin: any;
            walkin_cp: any;
            walkin_direct: any;
            total_leades: any;
            total_booking: any;
            booking_cp: any;
            booking_direct: any;
            site_visit_created: any;
            site_visit_created_cp: any;
            site_visit_created_direct: any;
          }) => {
            data +=
              `*Name:* ${member.user_name}\n` +
              `*Leads:* ${member.total_leades || 0}\n` +
              `*Site Visit Created:* ${member.site_visit_created || 0} (CP: ${
                member.site_visit_created_cp || 0
              }, Direct: ${member.site_visit_created_direct || 0})\n` +
              `*Walk-ins:* ${member.walkin || 0} (CP: ${
                member.walkin_cp || 0
              }, Direct: ${member.walkin_direct || 0})\n` +
              `*Booking:* ${member.total_booking || 0} (CP: ${
                member.booking_cp || 0
              }, Direct: ${member.booking_direct || 0})\n\n`;
          }
        );
      }
    }
    return data;
  };

  const onPressShare = async () => {
    const shareOptions = {
      title: "Share via",
      message: getShareData(),
      subject: "Report", //  for email
    };
    try {
      const result = await Share.open(shareOptions);
      console.log(result);
    } catch (error: any) {
      console.log(error.message);
    }
  };

  return (
    <>
      <View style={styles.mainContainer}>
        <Header
          leftImageSrc={images.menu}
          rightFirstImageScr={images.filter}
          rightSecondImageScr={images.notification}
          headerText={
            selectedStartDate == moment(new Date()).format(DATE_FORMAT)
              ? "Today " + strings.reportHeader
              : strings.reportHeader
          }
          handleOnLeftIconPress={handleDrawerPress}
          headerStyle={styles.headerStyle}
          handleOnRightFirstIconPress={handleOnFilterPress}
          onPressShare={onPressShare}
          RightFirstIconStyle={styles.RightFirstIconStyle}
          shareImage={
            roleId === ROLE_IDS.sourcingmanager_id ||
            roleId === ROLE_IDS.closingmanager_id ||
            roleId === ROLE_IDS.scm_id ||
            roleId === ROLE_IDS.sourcingtl_id ||
            roleId === ROLE_IDS.sourcing_head_id ||
            roleId === ROLE_IDS.closingtl_id ||
            roleId === ROLE_IDS.closing_head_id
          }
          statusBarColor={PRIMARY_THEME_COLOR}
          barStyle={"light-content"}
        />
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            paddingVertical: 2,
            paddingHorizontal: 10,
          }}
        >
          <Text style={styles.date}>
            Start Date: {formatDateString(selectedStartDate)}
          </Text>
          <Text style={styles.date}>
            End Date: {formatDateString(selectedEndDate)}
          </Text>
        </View>
        {roleId === ROLE_IDS.sourcingmanager_id ? (
          <SMReportTable
            data={reportData}
            onReset={onReset}
            handleCpDetailPress={handleCpDetailPress}
            handleCTANavigation={handleCTANavigation}
            fileName={fileName}
            userData={userData}
          />
        ) : roleId === ROLE_IDS.closingmanager_id ? (
          <CMReportTable
            data={reportData}
            onReset={onReset}
            userData={userData}
            handleCTANavigation={handleCTANavigation}
            fileName={fileName}
          />
        ) : roleId === ROLE_IDS.scm_id ? (
          <SCMReportTable
            data={reportData}
            onReset={onReset}
            userData={userData}
            handleCTANavigation={handleCTANavigation}
            fileName={fileName}
          />
        ) : roleId === ROLE_IDS.sourcingtl_id ||
          roleId === ROLE_IDS.sourcing_head_id ? (
          <STReportTable
            data={reportData}
            onReset={onReset}
            userData={userData}
            handleCpDetailPress={handleCpDetailPress}
            handleCTANavigation={handleCTANavigation}
            fileName={fileName}
          />
        ) : roleId === ROLE_IDS.closingtl_id ||
          roleId === ROLE_IDS.closing_head_id ? (
          <CTReportTable
            data={reportData}
            onReset={onReset}
            userData={userData}
            handleCTANavigation={handleCTANavigation}
            fileName={fileName}
          />
        ) : roleId === ROLE_IDS.clusterhead_id ||
          roleId === ROLE_IDS.sitehead_id ||
          roleId === ROLE_IDS.admin_id ? (
          <ClusterHeadReportTable
            data={reportData}
            onReset={onReset}
            handleCpDetailPress={handleCpDetailPress}
            handleCTANavigation={handleCTANavigation}
            fileName={fileName}
          />
        ) : roleId === ROLE_IDS.businesshead_id ? (
          <BusinessHeadReportTable
            data={reportData}
            onReset={onReset}
            handleCpDetailPress={handleCpDetailPress}
            handleCTANavigation={handleCTANavigation}
            fileName={fileName}
          />
        ) : null}
        {/* <ComingSoonScreen /> */}
      </View>
      <FilterModal
        Visible={FilterModalVisible}
        setIsVisible={setIsFilterModalVisible}
        filterData={filterData}
        setFilterData={setFilterData}
        handleFilter={handleFilter}
        onReset={onReset}
        propertyListForFilter={propertyListForFilter}
        clusterheadListForFilter={clusterheadListForFilter}
      />
    </>
  );
};

export default ReportView;
