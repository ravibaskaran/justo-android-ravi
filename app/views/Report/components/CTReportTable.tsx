import {
  normalize,
  normalizeHeight,
  normalizeSpacing,
  normalizeWidth,
} from "app/components/scaleFontSize";
import {
  BLACK_COLOR,
  FONT_FAMILY_SEMIBOLD,
  GREEN_COLOR,
  Isios,
  PRIMARY_THEME_COLOR,
  RED_COLOR,
  WHITE_COLOR,
} from "app/components/utilities/constant";
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
import styles from "./styles";
import images from "app/assets/images";
import XLSX from "xlsx";
import RNFS from "react-native-fs";
import {
  handlePermission,
  openPermissionSetting,
} from "app/components/utilities/GlobalFuncations";
import strings from "app/components/utilities/Localization";
import ErrorMessage from "app/components/ErrorMessage";
import ItemCard from "./ItemCard";

const CTReportTable = (props: any) => {
  const { data, fileName, userData } = props;
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
  const headeData = [
    "CM Name",
    // "Lead Assign",
    "Visitor Attended",
    "Direct Walk-ins",
    "CP (Walk-ins) Appointments",
    // "Total Site Visit",
    "No Shows",
    "Total Revisit",
    "Total Not Interested",
    // "Visit Cancel",
    "Total Booking",
    // "Ready to Book",
    // "Total Registration",
    // "Cancelation Booking",
    "Conversion %",
    // "No. of (follow-ups scheduled)",
  ];

  const headerData = ["Walk-ins", "Total Leads", "Total Booking"];

  const onPressDownload = async () => {
    let array = data.map((item: any) => {
      return {
        "CM Name": item?.user_name,
        // "Lead Assign",
        "Visitor Attended": item?.VisitorAttended,
        // "Visitor Attended": item?.TotalAppointments,
        "Direct Walk-ins": item?.DirectWalkins,
        "CP (Walk-ins) Appointments": item?.CPWalkins,
        // "Total Site Visit",
        "No Shows": item.Noshow,
        "Total Revisit": item?.TotalAppointmentsrevisit,
        "Total Not Interested": item.TotalNotInterested,
        // "Visit Cancel",
        "Total Booking": item.Booking,
        // "Ready to Book",
        // "Total Registration",
        // "Cancelation Booking",
        "Conversion %": item.Conversion,
        // "No. of (follow-ups scheduled)",
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
        const filePath = `${tempDir}/ClosingTLReport${fileName}.xlsx`;

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
      {/* <View
        style={{
          alignItems: "flex-end",
          margin: normalize(10),
        }}
      >
        <TouchableOpacity
          onPress={() => onPressDownload()}
          style={{
            backgroundColor: PRIMARY_THEME_COLOR,
            width: normalizeWidth(50),
            alignItems: "center",
            borderRadius: 10,
          }}
        >
          <Image
            source={images.whiteDownload}
            resizeMode={"contain"}
            style={styles.downloadImg}
          />
        </TouchableOpacity>
      </View> */}
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{
          height: height - normalize(55),
          margin: normalize(10),
        }}
        // horizontal
        contentContainerStyle={{
          // margin: normalize(10),
          paddingBottom: normalize(15),
        }}
        showsHorizontalScrollIndicator={false}
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
            <ItemCard
              title={"Walk-ins"}
              byCp={data[0]?.walkin_cp}
              byDirect={data[0]?.walkin_direct}
              total={data[0]?.walkin}
            />
            <ItemCard
              title={"Leads"}
              byCp={data[0]?.leades_cp}
              byDirect={data[0]?.leades_direct}
              total={data[0]?.total_leades}
            />
            <ItemCard
              title={"Booking"}
              byCp={data[0]?.booking_cp}
              byDirect={data[0]?.booking_direct}
              total={data[0]?.total_booking}
            />
            <ItemCard
              title={"Site Visit Created"}
              byCp={data[0]?.site_visit_created_cp}
              byDirect={data[0]?.site_visit_created_direct}
              total={data[0]?.site_visit_created}
            />
          </View>
        </View>

        {data[0]?.sm_list?.length > 0 ? (
          <>
            <Text
              style={{
                ...styles.boxText,
                color: PRIMARY_THEME_COLOR,
                paddingVertical: 10,
              }}
            >
              Closing Managers
            </Text>

            {data[0]?.sm_list?.map((item: any, index: any) => {
              return (
                <View
                  key={index}
                  style={[styles.container, { flexDirection: "column" }]}
                >
                  <View style={styles.nameContainer}>
                    <Image
                      style={{ height: 35, width: 35, borderRadius: 100 }}
                      source={require("./../../../assets/images/userimage.png")}
                    />
                    <Text style={styles.nameText}>{item?.user_name}</Text>
                  </View>

                  <View style={styles.childContainer2}>
                    <Text style={styles.itemText}></Text>
                    <Text style={styles.itemText}>CP</Text>
                    <Text style={styles.itemText}>Direct</Text>
                    <Text style={styles.itemText}>Total</Text>
                  </View>
                  <View style={styles.childContainer2}>
                    <Text style={styles.itemText}>Walk-ins</Text>
                    <Text style={styles.itemText}>{item?.walkin_cp}</Text>
                    <Text style={styles.itemText}>{item?.walkin_direct}</Text>
                    <Text style={styles.itemText}>{item?.walkin}</Text>
                  </View>
                  <View style={styles.childContainer2}>
                    <Text style={styles.itemText}>Leads</Text>
                    <Text style={styles.itemText}>{item?.leades_cp}</Text>
                    <Text style={styles.itemText}>{item?.leades_direct}</Text>
                    <Text style={styles.itemText}>{item?.total_leades}</Text>
                  </View>

                  <View style={styles.childContainer2}>
                    <Text style={styles.itemText}>Booking</Text>
                    <Text style={styles.itemText}>{item?.booking_cp}</Text>
                    <Text style={styles.itemText}>{item?.booking_direct}</Text>
                    <Text style={styles.itemText}>{item?.total_booking}</Text>
                  </View>
                  <View style={styles.childContainer2}>
                    <Text style={styles.itemText}>Site visit created</Text>
                    <Text style={styles.itemText}>
                      {item?.site_visit_created_cp}
                    </Text>
                    <Text style={styles.itemText}>
                      {item?.site_visit_created_direct}
                    </Text>
                    <Text style={styles.itemText}>
                      {item?.site_visit_created}
                    </Text>
                  </View>
                </View>
              );
            })}
          </>
        ) : null}

        {/* <View
          style={{
            flexDirection: "row",
          }}
        >
          <View
            style={{
              flexDirection: "column",
            }}
          >
            {headeData.map((item: any, index: any) => {
              return (
                <View
                  key={index}
                  style={{
                    // width: normalizeWidth(140),
                    // height: normalizeHeight(90),
                    borderWidth: normalize(Isios ? 1.2 : 2),
                    padding: normalize(12),
                    backgroundColor: PRIMARY_THEME_COLOR,
                  }}
                >
                  <Text style={{ ...styles.boxText, color: WHITE_COLOR }}>
                    {item}
                  </Text>
                </View>
              );
            })}
          </View>
          <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
            <View
              style={{
                flexDirection: "row",
              }}
            >
              {data.map((item: any, index: any) => {
                return (
                  <View
                    style={{
                      flexDirection: "column",
                      minWidth: normalizeWidth(110),
                    }}
                  >
                    <View style={styles.cTDataItems}>
                      <Text
                        style={{
                          ...styles.boxText,
                          color: BLACK_COLOR,
                        }}
                      >
                        {item?.user_name}
                      </Text>
                    </View>
                    <TouchableOpacity
                      onPress={() =>
                        props.handleCTANavigation("AppointmentCTA")
                      }
                      style={styles.cTDataItems}
                    >
                      <Text
                        style={{
                          ...styles.boxText,
                          color: BLACK_COLOR,
                        }}
                      >
                        {item?.VisitorAttended}
                      
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() =>
                        props.handleCTANavigation("AppointmentCTA")
                      }
                      style={styles.cTDataItems}
                    >
                      <Text
                        style={{
                          ...styles.boxText,
                          color: BLACK_COLOR,
                        }}
                      >
                        {item?.DirectWalkins}
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() =>
                        props.handleCTANavigation("AppointmentCTA")
                      }
                      style={styles.cTDataItems}
                    >
                      <Text
                        style={{
                          ...styles.boxText,
                          color: BLACK_COLOR,
                        }}
                      >
                        {item?.CPWalkins}
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() =>
                        props.handleCTANavigation("AppointmentCTA")
                      }
                      style={styles.cTDataItems}
                    >
                      <Text
                        style={{
                          ...styles.boxText,
                          color: BLACK_COLOR,
                        }}
                      >
                        {item.Noshow}
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() =>
                        props.handleCTANavigation("AppointmentCTA")
                      }
                      style={styles.cTDataItems}
                    >
                      <Text
                        style={{
                          ...styles.boxText,
                          color: BLACK_COLOR,
                        }}
                      >
                        {item?.TotalAppointmentsrevisit}
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() =>
                        props.handleCTANavigation("AppointmentCTA")
                      }
                      style={styles.cTDataItems}
                    >
                      <Text
                        style={{
                          ...styles.boxText,
                          color: BLACK_COLOR,
                        }}
                      >
                        {item.TotalNotInterested}
                      </Text>
                    </TouchableOpacity>
                  
                    <TouchableOpacity
                      onPress={() => props.handleCTANavigation("BookingCTA")}
                      style={styles.cTDataItems}
                    >
                      <Text
                        style={{
                          ...styles.boxText,
                          color: BLACK_COLOR,
                        }}
                      >
                        {item.Booking}
                      </Text>
                    </TouchableOpacity>
                   
                    <TouchableOpacity style={styles.cTDataItems}>
                      <Text
                        style={{
                          ...styles.boxText,
                          color: BLACK_COLOR,
                        }}
                      >
                        {item.Conversion}
                      </Text>
                    </TouchableOpacity>
                 
                  </View>
                );
              })}
            </View>
          </ScrollView>
        </View> */}
      </ScrollView>
    </SafeAreaView>
  );
};

export default CTReportTable;
