import ErrorMessage from "app/components/ErrorMessage";
import { normalize } from "app/components/scaleFontSize";
import {
  BLACK_COLOR,
  GREEN_COLOR,
  RED_COLOR,
} from "app/components/utilities/constant";
import {
  handlePermission,
  openPermissionSetting,
} from "app/components/utilities/GlobalFuncations";
import strings from "app/components/utilities/Localization";
import React from "react";
import {
  Dimensions,
  Image,
  RefreshControl,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import RNFS from "react-native-fs";
import XLSX from "xlsx";
import styles from "./styles";
import ItemCard from "./ItemCard";

const SCMReportTable = (props: any) => {
  const { data, userData, fileName } = props;
  const { width, height } = Dimensions.get("window"),
    vw = width / 100,
    vh = height / 100;
  const [refreshing, setRefreshing] = React.useState(false);
  const onRefresh = () => {
    setRefreshing(true);
    props.onReset();
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  };
  // const headerData = [
  //   "Visitor Attended",
  //   "Direct Walk-ins",
  //   "CP(Walk-ins) Appointments",
  //   "No Shows",
  //   "Total Revisit",
  //   "Total Not Interested",
  //   "Total Booking",
  //   // "No. of (follow-ups scheduled)",
  //   "Conversion %",
  //   // "Grand Total",
  //   // "Total Registration",
  //   // "Total Cancelation",
  // ];
  const headerData = ["Walk-ins", "Total Leads", "Total Booking"];

  const onPressDownload = async () => {
    let array = data.map((item: any) => {
      return {
        "CM Name": userData?.data?.user_name,
        "Visitor Attended": item?.VisitorAttended,
        // "Visitor Attended": item?.TotalAppointments,
        "Direct Walk-ins": item?.DirectWalkins,
        "CP(Walk-ins) Appointments": item?.CPWalkins,
        "No Shows": item?.Noshow,
        "Total Revisit": item?.TotalAppointmentsrevisit,
        "Total Not Interested": item?.TotalNotInterested,
        "Total Booking": item?.Booking,
        "Conversion %": item?.Conversion,
      };
    });
    const res = await handlePermission(
      "write",
      strings.txt_setting_heading_media,
      strings.txt_setting_description_media
    );
    if (res == "setting1") {
      openPermissionSetting(
        strings.txt_setting_heading_media,
        strings.txt_setting_description_media
      );
    } else if (res) {
      try {
        ErrorMessage({
          msg: strings.startDownload,
          backgroundColor: BLACK_COLOR,
        });
        const workbook = XLSX.utils.book_new();
        const worksheet = XLSX.utils.json_to_sheet(array);
        XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
        const excelFile = XLSX.write(workbook, {
          type: "base64",
          bookType: "xlsx",
        });

        // Create a temporary directory to store the file
        const tempDir = RNFS.DownloadDirectoryPath;
        const filePath = `${tempDir}/ClosingManagerReport${fileName}.xlsx`;

        // Write the file to the temporary directory
        await RNFS.writeFile(filePath, excelFile, "base64");

        console.log("File saved:", filePath);

        // Add file scanning to make it visible in device's media library (optional)
        await RNFS.scanFile(filePath);
        ErrorMessage({
          msg: strings.succesfullyDownload,
          backgroundColor: GREEN_COLOR,
        });

        console.log("File scanned:", filePath);
      } catch (error) {
        ErrorMessage({
          msg: strings.unSuccesfullyDownload,
          backgroundColor: RED_COLOR,
        });
        console.log("Error generating Excel file:", error);
      }
    }
  };
  return (
    <SafeAreaView>
      <ScrollView
        style={{
          height: height - normalize(55),
          margin: normalize(10),
        }}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <View
          style={[styles.container, { flexDirection: "column", marginTop: 0 }]}
        >
          <View style={[styles.imageContainer, { width: "100%" }]}>
            <Image
              style={{ height: 80, width: 80, borderRadius: 100 }}
              source={require("./../../../assets/images/userimage.png")}
            />
            <Text style={[styles.nameText, { paddingVertical: 10 }]}>
              {userData?.data?.user_name}
            </Text>
          </View>

          <View style={styles.boxcontent}>
            <TouchableOpacity
              // disabled={true}
              onPress={() => props.onCardPress("Leads")}
              style={styles.childContainer}
            >
              <Text style={[styles.cardText, styles.cardText2]}>
                {data[0]?.total_leades}
              </Text>
              <Text style={[styles.cardText, styles.cardText1]}>Leads</Text>
            </TouchableOpacity>
            <ItemCard
              onPress={() => props.onCardPress("Site Visit Created")}
              title={"Site Visit Created"}
              byCp={data[0]?.site_visit_created_cp}
              byDirect={data[0]?.site_visit_created_direct}
              total={data[0]?.site_visit_created}
            />
            <ItemCard
              onPress={() => props.onCardPress("Walk-ins")}
              title={"Walk-ins"}
              byCp={data[0]?.walkin_cp}
              byDirect={data[0]?.walkin_direct}
              total={data[0]?.walkin}
            />

            <ItemCard
              onPress={() => props.onCardPress("Booking")}
              title={"Booking"}
              byCp={data[0]?.booking_cp}
              byDirect={data[0]?.booking_direct}
              total={data[0]?.total_booking}
            />

            <TouchableOpacity
              // disabled={true}
              onPress={() => props.onCardPress("CP Appointments")}
              style={styles.childContainer}
            >
              <Text style={[styles.cardText, styles.cardText2]}>
                {data[0]?.appointmentwithCp}
              </Text>
              <Text style={[styles.cardText, styles.cardText1]}>
                CP Appointments
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SCMReportTable;
