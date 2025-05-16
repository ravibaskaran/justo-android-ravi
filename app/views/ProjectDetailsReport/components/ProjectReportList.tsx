import images from "app/assets/images";
import React from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import Share from "react-native-share";
import styles from "./styles";

// DataRow component to handle displaying rows
const getLabel = (label: any) => {
  switch (label) {
    case "GrossBookings":
      return "Gross Bookings";
    case "Cancellation":
      return "Cancellations";
    case "NetBookings":
      return "Net Bookings";
    case "SiteVisits":
      return "Total Site Visits";
    case "ChannelPartnerVisitsCount":
      return "Channel Partner Visits";
    case "DirectWalkInVisitsCount":
      return "Direct Walk-In Visits";
    case "ReferenceVisitsCount":
      return "Reference Visits";
    case "ReferralPartnerVisitsCount":
      return "Referral Partner Visits";
    case "PreSalesVisitsCount":
      return "Pre-Sales Visits";
    case "ExhibitionVisitsCount":
      return "Exhibition Visits";
    case "OtherVisitsCount":
      return "Other Visits";
    case "Revisits":
      return "Total Revisits";
    case "ChannelPartnerRevisitsCount":
      return "ChannelPartner Revisits";
    case "DirectWalkInRevisitsCount":
      return "Direct Walk-In Revisits";
    case "ReferenceRevisitsCount":
      return "Reference Revisits";
    case "ReferralPartnerRevisitsCount":
      return "Referral Partner Revisits";
    case "PreSalesRevisitsCount":
      return "Pre-Sales Revisits";
    case "ExhibitionRevisitsCount":
      return "Exhibition Revisits";
    case "OtherRevisitsCount":
      return "Other Revisits";
    default:
      return label;
  }
};

const DataRow = ({
  label,
  values,
}: {
  label: string;
  values: (number | undefined)[];
}) => (
  <View style={styles.childContainer2}>
    <Text style={[styles.itemText, { textAlign: "left", marginLeft: 10 }]}>
      {getLabel(label)}
    </Text>
    {values.map((value, index) => (
      <Text key={index} style={[styles.itemText, { flex: 0.6 }]}>
        {value}
      </Text>
    ))}
  </View>
);

const ProjectReportList = ({ items, date }: { items: any; date: any }) => {
  const { property_name, bookings, siteVisits } = items ?? {}; // Destructuring for cleaner access

  // Helper function to get values (YTD, MTD, FTD)
  const getValues = (data: any, field: string) => [
    data?.ftd?.[field],
    data?.mtd?.[field],
    data?.ytd?.[field],
  ];
  function formatDateString(dateString: any) {
    const [year, month, day] = dateString.split("-");
    const shortYear = year.slice(-2); // Get last two digits of the year
    return `${day}/${month}/${shortYear}`;
  }

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

  const getShareData = () => {
    let data = "";

    data += `*Date:* ${formatDateString(date)}\n`;
    data += `*Property: ${property_name}*\n\n`;

    // Define the types (FTD, MTD, YTD)
    const types = ["ftd", "mtd", "ytd"];
    // const types = ["ftd", "mtd"];

    // Loop over the booking types and site visit data
    types.forEach((type) => {
      const bookingData = bookings[0]?.[type] || {};
      const siteVisitData = siteVisits[0]?.[type] || {};

      data +=
        `*${type.toUpperCase()} Booking*\n` +
        `Gross Bookings: ${bookingData?.GrossBookings}\n` +
        `Cancellations: ${bookingData?.Cancellation}\n` +
        `Net Bookings: ${bookingData?.NetBookings}\n\n` +
        `*${type.toUpperCase()} Site Visits*\n` +
        `Total Site Visits: ${siteVisitData?.SiteVisits}\n` +
        `Channel Partner Visits: ${siteVisitData?.ChannelPartnerVisitsCount}\n` +
        `Direct Walk-In Visits: ${siteVisitData?.DirectWalkInVisitsCount}\n` +
        `Referral Partner Visits: ${siteVisitData?.ReferralPartnerVisitsCount}\n` +
        `Reference Visits: ${siteVisitData?.ReferenceVisitsCount}\n` +
        `Pre-Sales Visits: ${siteVisitData?.PreSalesVisitsCount}\n` +
        `Exhibition Visits: ${siteVisitData?.ExhibitionVisitsCount}\n` +
        `Other Visits: ${siteVisitData?.OtherVisitsCount}\n\n` +
        `*${type.toUpperCase()} Site Revisits*\n` +
        `Total Revisits: ${siteVisitData?.Revisits}\n` +
        `Channel Partner Revisits: ${siteVisitData?.ChannelPartnerRevisitsCount}\n` +
        `Direct Walk-In Revisits: ${siteVisitData?.DirectWalkInRevisitsCount}\n` +
        `Referral Partner Revisits: ${siteVisitData?.ReferralPartnerRevisitsCount}\n` +
        `Reference Revisits: ${siteVisitData?.ReferenceRevisitsCount}\n` +
        `Pre-Sales Revisits: ${siteVisitData?.PreSalesRevisitsCount}\n` +
        `Exhibition Revisits: ${siteVisitData?.ExhibitionRevisitsCount}\n` +
        `Other Revisits: ${siteVisitData?.OtherRevisitsCount}\n\n`;
    });

    return data.trim();
  };

  return (
    <View style={styles.container}>
      <View style={styles.nameContainer}>
        <Text style={styles.nameText}>{property_name}</Text>
        <TouchableOpacity onPress={() => onPressShare()}>
          <Image source={images.shareIcon} style={styles.imageStyle} />
        </TouchableOpacity>
      </View>

      <View style={styles.childContainer2}>
        <Text style={styles.itemText}></Text>
        <Text style={[styles.itemText, { flex: 0.6 }]}>FTD</Text>
        <Text style={[styles.itemText, { flex: 0.6 }]}>MTD</Text>
        <Text style={[styles.itemText, { flex: 0.6 }]}>YTD</Text>
      </View>

      <Text style={styles.subHead}>Bookings</Text>
      {/* Simplify by passing an array of values */}
      {["GrossBookings", "Cancellation", "NetBookings"].map((field) => (
        <DataRow
          key={field}
          label={field}
          values={getValues(bookings[0], field)}
        />
      ))}

      <Text style={styles.subHead}>Site Visits</Text>
      {/* Simplify by passing an array of values */}
      {[
        "SiteVisits",
        "ChannelPartnerVisitsCount",
        "DirectWalkInVisitsCount",
        "ReferralPartnerVisitsCount",
        "ReferenceVisitsCount",
        "PreSalesVisitsCount",
        "ExhibitionVisitsCount",
        "OtherVisitsCount",
      ].map((field) => (
        <DataRow
          key={field}
          label={field}
          values={getValues(siteVisits[0], field)}
        />
      ))}

      <Text style={styles.subHead}>Site Revisits</Text>
      {/* Simplify by passing an array of values */}
      {[
        "Revisits",
        "ChannelPartnerRevisitsCount",
        "DirectWalkInRevisitsCount",
        "ReferralPartnerRevisitsCount",
        "ReferenceRevisitsCount",
        "PreSalesRevisitsCount",
        "ExhibitionRevisitsCount",
        "OtherRevisitsCount",
      ].map((field) => (
        <DataRow
          key={field}
          label={field}
          values={getValues(siteVisits[0], field)}
        />
      ))}
    </View>
  );
};

export default ProjectReportList;
