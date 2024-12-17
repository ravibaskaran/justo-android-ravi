import images from "app/assets/images";
import EmptyListScreen from "app/components/CommonScreen/EmptyListScreen";
import Header from "app/components/Header";
import {
  DATE_FORMAT,
  PRIMARY_THEME_COLOR,
} from "app/components/utilities/constant";
import moment from "moment";
import React, { useState } from "react";
import { FlatList, Text, View } from "react-native";
import Share from "react-native-share";
import XLSX from "xlsx";
import FilterModal from "./FilterModel";
import ProjectReportList from "./ProjectReportList";
import styles from "./styles";

const ProjectReportView = (props: any) => {
  const { handleDrawerPress } = props;
  const [FilterisVisible, setFilterisVisible] = useState(false);
  const loadingref = false;
  var today = moment(new Date()).format(DATE_FORMAT);

  const onRefresh = () => {
    props.setFilterData({
      on_date: "",
      property_id: "",
    });
    props.getData({});
  };

  const onPressDownload = async () => {
    try {
      const workbook = XLSX.utils.book_new();
      const sheetData: any[][] = [];
      sheetData.push([
        "Date",
        props.displayDate ? props.displayDate : today,
        null,
        null,
      ]);

      for (let data of props.pdrData) {
        // Step 1: Add the top headers
        sheetData.push(["Property Title:", data?.property_name, null, null]); // Title row
        sheetData.push(["", "FTD", "MTD", "YTD"]); // Top-level column headers
        const bookings = data?.bookings[0] || {};
        sheetData.push(["Bookings", null, null, null]);
        sheetData.push([
          "Gross Bookings:",
          bookings?.ftd?.GrossBookings,
          bookings?.mtd?.GrossBookings,
          bookings?.ytd?.GrossBookings,
        ]);
        sheetData.push([
          "Cancellations:",
          bookings?.ftd?.Cancellation,
          bookings?.mtd?.Cancellation,
          bookings?.ytd?.Cancellation,
        ]);
        sheetData.push([
          "Net Bookings:",
          bookings?.ftd?.NetBookings,
          bookings?.mtd?.NetBookings,
          bookings?.ytd?.NetBookings,
        ]);
        const siteVisits = data?.siteVisits[0] || {};
        sheetData.push(["Site Visits", null, null, null]);
        sheetData.push([
          "Total Site Visits:",
          siteVisits?.ftd?.SiteVisits,
          siteVisits?.mtd?.SiteVisits,
          siteVisits?.ytd?.SiteVisits,
        ]);
        sheetData.push([
          "Channel Partner Visits:",
          siteVisits?.ftd?.ChannelPartnerVisitsCount,
          siteVisits?.mtd?.ChannelPartnerVisitsCount,
          siteVisits?.ytd?.ChannelPartnerVisitsCount,
        ]);
        sheetData.push([
          "Direct Walk-In Visits:",
          siteVisits?.ftd?.DirectWalkInVisitsCount,
          siteVisits?.mtd?.DirectWalkInVisitsCount,
          siteVisits?.ytd?.DirectWalkInVisitsCount,
        ]);
        sheetData.push([
          "Reference Visits:",
          siteVisits?.ftd?.ReferenceVisitsCount,
          siteVisits?.mtd?.ReferenceVisitsCount,
          siteVisits?.ytd?.ReferenceVisitsCount,
        ]);
        sheetData.push([
          "Pre-Sales Visits:",
          siteVisits?.ftd?.PreSalesVisitsCount,
          siteVisits?.mtd?.PreSalesVisitsCount,
          siteVisits?.ytd?.PreSalesVisitsCount,
        ]);
        sheetData.push([
          "Exhibition Visits:",
          siteVisits?.ftd?.ExhibitionVisitsCount,
          siteVisits?.mtd?.ExhibitionVisitsCount,
          siteVisits?.ytd?.ExhibitionVisitsCount,
        ]);
        sheetData.push([
          "Other Visits:",
          siteVisits?.ftd?.OtherVisitsCount,
          siteVisits?.mtd?.OtherVisitsCount,
          siteVisits?.ytd?.OtherVisitsCount,
        ]);
        sheetData.push(["Site Revisits", null, null, null]);
        sheetData.push([
          "Total Revisits:",
          siteVisits?.ftd?.Revisits,
          siteVisits?.mtd?.Revisits,
          siteVisits?.ytd?.Revisits,
        ]);
        sheetData.push([
          "ChannelPartner Revisits:",
          siteVisits?.ftd?.ChannelPartnerRevisitsCount,
          siteVisits?.mtd?.ChannelPartnerRevisitsCount,
          siteVisits?.ytd?.ChannelPartnerRevisitsCount,
        ]);
        sheetData.push([
          "Direct Walk-In Revisits:",
          siteVisits?.ftd?.DirectWalkInRevisitsCount,
          siteVisits?.mtd?.DirectWalkInRevisitsCount,
          siteVisits?.ytd?.DirectWalkInRevisitsCount,
        ]);
        sheetData.push([
          "Reference Revisits:",
          siteVisits?.ftd?.ReferenceRevisitsCount,
          siteVisits?.mtd?.ReferenceRevisitsCount,
          siteVisits?.ytd?.ReferenceRevisitsCount,
        ]);
        sheetData.push([
          "Pre-Sales Revisits:",
          siteVisits?.ftd?.PreSalesRevisitsCount,
          siteVisits?.mtd?.PreSalesRevisitsCount,
          siteVisits?.ytd?.PreSalesRevisitsCount,
        ]);
        sheetData.push([
          "Exhibition Revisits:",
          siteVisits?.ftd?.ExhibitionRevisitsCount,
          siteVisits?.mtd?.ExhibitionRevisitsCount,
          siteVisits?.ytd?.ExhibitionRevisitsCount,
        ]);
        sheetData.push([
          "Other Revisits:",
          siteVisits?.ftd?.OtherRevisitsCount,
          siteVisits?.mtd?.OtherRevisitsCount,
          siteVisits?.ytd?.OtherRevisitsCount,
        ]);
        sheetData.push([null, null, null, null]);
      }

      // Step 5: Convert sheet data into an Excel worksheet
      const worksheet = XLSX.utils.aoa_to_sheet(sheetData);

      // Optional: Add cell merges for the title row
      worksheet["!merges"] = [
        { s: { r: 0, c: 1 }, e: { r: 0, c: 3 } }, // Merge Property Title across 3 columns
      ];

      // Step 6: Append worksheet to workbook
      XLSX.utils.book_append_sheet(workbook, worksheet, "Property Data");

      //   Convert workbook to base64
      const excelFile = XLSX.write(workbook, {
        bookType: "xlsx",
        type: "base64",
      });

      // Share the file via WhatsApp
      let randomNo: any = Math.random().toFixed(2);

      let fileName = `Project_Details_Report_${moment(
        new Date(props.displayDate ? props.displayDate : today)
      ).format("DD-MM-YYYY")}_${randomNo * 10000} `;

      console.log(fileName);

      const shareOptions = {
        title: "Share Excel File",
        url:
          "data:application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;base64," +
          excelFile,
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        filename: fileName,
      };
      await Share.open(shareOptions);
    } catch (error) {
      console.log("Error generating Excel file:", error);
    }
  };

  return (
    <View style={styles.mainContainer}>
      <Header
        leftImageSrc={images.menu}
        rightFirstImageScr={images.filter}
        rightSecondImageScr={images.notification}
        headerText={"Project Report"}
        handleOnLeftIconPress={handleDrawerPress}
        headerStyle={styles.headerStyle}
        handleOnRightFirstIconPress={() => setFilterisVisible(true)}
        onPressShare={onPressDownload}
        RightFirstIconStyle={styles.RightFirstIconStyle}
        shareImage={props.pdrData?.length != 0}
        statusBarColor={PRIMARY_THEME_COLOR}
        barStyle={"light-content"}
      />
      <View style={styles.innerContainer}>
        <Text style={styles.date}>
          Date: {props.displayDate ? props.displayDate : today}
        </Text>
        <Text style={styles.date}>Count: {props.pdrData?.length}</Text>
      </View>
      <FlatList
        data={props.pdrData}
        renderItem={({ item }) => (
          <ProjectReportList items={item} date={props.displayDate || today} />
        )}
        ListEmptyComponent={
          <EmptyListScreen message={"Project Details Report"} />
        }
        onRefresh={() => onRefresh()}
        refreshing={loadingref}
      />
      <FilterModal
        Visible={FilterisVisible}
        setIsVisible={setFilterisVisible}
        setFilterData={props.setFilterData}
        filterData={props.filterData}
        setPDRData={props.setPDRData}
        setdisplayDate={props.setdisplayDate}
      />
    </View>
  );
};

export default ProjectReportView;
