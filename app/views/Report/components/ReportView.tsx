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
          RightFirstIconStyle={styles.RightFirstIconStyle}
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
