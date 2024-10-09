import {
  normalize,
  normalizeHeight,
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
import strings from "app/components/utilities/Localization";
import {
  handlePermission,
  openPermissionSetting,
} from "app/components/utilities/GlobalFuncations";
import ErrorMessage from "app/components/ErrorMessage";
import XLSX from "xlsx";
import RNFS from "react-native-fs";

const STReportTable = (props: any) => {
  const { data, handleCpDetailPress, fileName, userData } = props;
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
  //   "SM Name",
  //   "CP Map",
  //   "Walk-in Active CP",
  //   "Inactive/Deactive CP",
  //   // "Vistors",
  //   "Visitor No Shows ",
  //   "MTD Site Visit",
  //   // "Cancel Visit",
  //   // "Revisit",
  //   // "Reschedule",
  //   // "Customer Lost",
  //   "Booking /Transactional",
  //   // "Cancel Booking",
  // ];
  const headerData = [
    "SM Name",
    "CP Mapped",
    "New CP Registered",
    "Active CP",
    "Transactional CP",
    "Dormant CP",
    "Appointment Done",
    "Visitor No Shows",
    "Total Bookings",
    "CP Detail",
  ];

  const onPressDownload = async () => {
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
        const workbook = XLSX.utils.book_new();

        data.forEach((property: any) => {
          const { property_title, smDetails } = property;
          const worksheetData: any = [];
          smDetails.map((item: any) => {
            const rowData = {
              "SM Name": item?.username,
              "CP Mapped": item?.cpcount,
              "New CP Registered": item?.newCpRegistered,
              "Active CP": item?.activeCP,
              // "Transactional CP": item?.BookingCountTotal,
              "Transactional CP": item?.TransactionalCPtotal,
              "Dormant CP": item?.inactiveCP,
              // "Appointment Done": item.SitevisitCountTotal,
              "Appointment Done": item.Appdonecounttotal,
              "Visitor No Shows": item.NoshowAppintment,
              "Total Bookings": item.confirmBooking,
            };
            worksheetData.push(rowData);
          });

          const worksheet = XLSX.utils.json_to_sheet(worksheetData);
          XLSX.utils.book_append_sheet(workbook, worksheet, property_title);
        });

        // Convert workbook to a binary string
        const excelFile = XLSX.write(workbook, {
          bookType: "xlsx",
          type: "base64",
        });

        // Create a temporary directory to store the file
        const tempDir = RNFS.DownloadDirectoryPath;
        const filePath = `${tempDir}/SourcingTLReport${fileName}.xlsx`;

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
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{
          height: height - normalize(55),
        }}
        contentContainerStyle={{
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

          <View
            style={{
              flex: 1,
              flexDirection: "row",
              flexWrap: "wrap",
              justifyContent: "center",
            }}
          >
            <View style={styles.childContainer}>
              <Text
                style={[styles.cardText, { color: "#000", fontWeight: "700" }]}
              >
                {data[0]?.walkin}
              </Text>
              <Text
                style={[styles.cardText, { color: "#000", fontWeight: "700" }]}
              >
                Walk-ins
              </Text>
            </View>

            <View style={styles.childContainer}>
              <Text
                style={[styles.cardText, { color: "#000", fontWeight: "700" }]}
              >
                {data[0]?.total_leades}
              </Text>
              <Text
                style={[styles.cardText, { color: "#000", fontWeight: "700" }]}
              >
                Leads
              </Text>
            </View>

            <View style={styles.childContainer}>
              <Text
                style={[styles.cardText, { color: "#000", fontWeight: "700" }]}
              >
                {data[0]?.total_booking}
              </Text>
              <Text
                style={[styles.cardText, { color: "#000", fontWeight: "700" }]}
              >
                Booking
              </Text>
            </View>

            <View style={styles.childContainer}>
              <Text
                style={[styles.cardText, { color: "#000", fontWeight: "700" }]}
              >
                {data[0]?.site_visit_created}
              </Text>
              <Text
                style={[styles.cardText, { color: "#000", fontWeight: "700" }]}
              >
                Site Visit Created
              </Text>
            </View>
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
              Sourcing Managers
            </Text>

            {data[0]?.sm_list?.map((item: any, index: any) => {
              return (
                <View key={index} style={styles.container}>
                  <View style={styles.imageContainer}>
                    <Image
                      style={{ height: 80, width: 80, borderRadius: 100 }}
                      source={require("./../../../assets/images/userimage.png")}
                    />
                  </View>

                  <View style={{ justifyContent: "center", flex: 1 }}>
                    <Text style={styles.nameText}>{item?.user_name}</Text>
                    <View style={{ flexDirection: "row" }}>
                      <Text style={[styles.cardText, { minWidth: 50 }]}>
                        {item?.walkin}
                      </Text>
                      <Text style={styles.cardText}>Walk-ins</Text>
                    </View>
                    <View style={{ flexDirection: "row" }}>
                      <Text style={[styles.cardText, { minWidth: 50 }]}>
                        {item?.total_leades}
                      </Text>
                      <Text style={styles.cardText}>Leads</Text>
                    </View>
                    <View style={{ flexDirection: "row" }}>
                      <Text style={[styles.cardText, { minWidth: 50 }]}>
                        {item?.total_booking}
                      </Text>
                      <Text style={styles.cardText}>Booking</Text>
                    </View>
                    <View style={{ flexDirection: "row" }}>
                      <Text style={[styles.cardText, { minWidth: 50 }]}>
                        {item?.site_visit_created}
                      </Text>
                      <Text style={styles.cardText}>Site Visit Created</Text>
                    </View>
                    <View style={{ flexDirection: "row" }}>
                      <Text style={[styles.cardText, { minWidth: 50 }]}>
                        {item?.appointmentwithCp}
                      </Text>
                      <Text style={styles.cardText}>CP Appointments</Text>
                    </View>
                  </View>
                </View>
              );
            })}
          </>
        ) : null}

        {/* <View
          style={{
            alignItems: "flex-end",
            marginBottom: normalize(10),
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
        {/* <ScrollView horizontal>
          <View>
            {data.map((item: any, index: any) => {
              return (
                <>
                  <View
                    style={{
                      marginBottom: normalize(12),
                    }}
                    key={index}
                  >
                    <View
                      style={{
                        borderWidth: normalize(Isios ? 1.2 : 2),
                        padding: normalize(12),
                        backgroundColor: PRIMARY_THEME_COLOR,
                      }}
                    >
                      <Text
                        style={{
                          ...styles.boxText,
                          color: WHITE_COLOR,
                          textAlign: "center",
                        }}
                      >
                        {item?.property_title}
                      </Text>
                    </View>

                    <View>
                      <View
                        key={index}
                        style={{
                          flexDirection: "row",
                        }}
                      >
                        <View
                          style={{
                            flexDirection: "column",
                          }}
                        >
                          {headerData.map((item: any, index: any) => {
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
                                <Text
                                  style={{
                                    ...styles.boxText,
                                    color: WHITE_COLOR,
                                  }}
                                >
                                  {item}
                                </Text>
                              </View>
                            );
                          })}
                        </View>
                        <ScrollView
                          horizontal={true}
                          showsHorizontalScrollIndicator={false}
                        >
                          <View
                            style={{
                              flexDirection: "row",
                            }}
                          >
                            {item?.smDetails.map((item: any, index: any) => {
                              return (
                                <View
                                  style={{
                                    flexDirection: "column",
                                  }}
                                >
                                  <View style={styles.cTDataItems}>
                                    <Text
                                      style={{
                                        ...styles.boxText,
                                        color: BLACK_COLOR,
                                      }}
                                    >
                                      {item?.username}
                                    </Text>
                                  </View>
                                  <TouchableOpacity
                                    onPress={() =>
                                      handleCpDetailPress(item?.CPInfo, "Demo")
                                    }
                                    style={styles.cTDataItems}
                                  >
                                    <Text
                                      style={{
                                        ...styles.boxText,
                                        color: BLACK_COLOR,
                                      }}
                                    >
                                      {item?.cpcount}
                                    </Text>
                                  </TouchableOpacity>
                                  <TouchableOpacity
                                    onPress={() =>
                                      handleCpDetailPress(item?.CPInfo, "Demo")
                                    }
                                    style={styles.cTDataItems}
                                  >
                                    <Text
                                      style={{
                                        ...styles.boxText,
                                        color: BLACK_COLOR,
                                      }}
                                    >
                                      {item?.newCpRegistered
                                        ? item?.newCpRegistered
                                        : 0}
                                    </Text>
                                  </TouchableOpacity>
                                  <TouchableOpacity
                                    onPress={() =>
                                      handleCpDetailPress(item?.CPInfo, "Demo")
                                    }
                                    style={styles.cTDataItems}
                                  >
                                    <Text
                                      style={{
                                        ...styles.boxText,
                                        color: BLACK_COLOR,
                                      }}
                                    >
                                      {item?.activeCP}
                                    </Text>
                                  </TouchableOpacity>
                                  <TouchableOpacity
                                    onPress={() =>
                                      handleCpDetailPress(item?.CPInfo, "Demo")
                                    }
                                    style={styles.cTDataItems}
                                  >
                                    <Text
                                      style={{
                                        ...styles.boxText,
                                        color: BLACK_COLOR,
                                      }}
                                    >
                                      {item?.TransactionalCPtotal}
                                    </Text>
                                  </TouchableOpacity>
                                  <TouchableOpacity
                                    onPress={() =>
                                      handleCpDetailPress(item?.CPInfo, "Demo")
                                    }
                                    style={styles.cTDataItems}
                                  >
                                    <Text
                                      style={{
                                        ...styles.boxText,
                                        color: BLACK_COLOR,
                                      }}
                                    >
                                      {item?.inactiveCP}
                                    </Text>
                                  </TouchableOpacity>

                                  <TouchableOpacity
                                    onPress={() =>
                                      props.handleCTANavigation(
                                        "AppointmentCTA"
                                      )
                                    }
                                    style={styles.cTDataItems}
                                  >
                                    <Text
                                      style={{
                                        ...styles.boxText,
                                        color: BLACK_COLOR,
                                      }}
                                    >
                                      {item.Appdonecounttotal}
                                    </Text>
                                  </TouchableOpacity>
                                  <TouchableOpacity
                                    onPress={() =>
                                      props.handleCTANavigation(
                                        "AppointmentCTA"
                                      )
                                    }
                                    style={styles.cTDataItems}
                                  >
                                    <Text
                                      style={{
                                        ...styles.boxText,
                                        color: BLACK_COLOR,
                                      }}
                                    >
                                      {item.NoshowAppintment}
                                    </Text>
                                  </TouchableOpacity>
                                  <TouchableOpacity
                                    onPress={() =>
                                      props.handleCTANavigation("BookingCTA")
                                    }
                                    style={styles.cTDataItems}
                                  >
                                    <Text
                                      style={{
                                        ...styles.boxText,
                                        color: BLACK_COLOR,
                                      }}
                                    >
                                      {item.confirmBooking}
                                    </Text>
                                  </TouchableOpacity>
                                
                                  <TouchableOpacity
                                    onPress={() =>
                                      handleCpDetailPress(
                                        item.CPInfo,
                                        item?.username
                                      )
                                    }
                                    style={styles.cTDataItems}
                                  >
                                    <Text
                                      style={{
                                        ...styles.boxText,
                                        color: BLACK_COLOR,
                                      }}
                                    >
                                      View CP
                                    </Text>
                                  </TouchableOpacity>
                                </View>
                              );
                            })}
                          </View>
                        </ScrollView>
                      </View>
                    </View>
                  </View>
                </>
              );
            })}
          </View>
        </ScrollView> */}
      </ScrollView>
    </SafeAreaView>
  );
};

export default STReportTable;
