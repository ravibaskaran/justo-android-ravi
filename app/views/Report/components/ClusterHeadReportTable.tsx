import images from "app/assets/images";
import {
  normalize,
  normalizeHeight,
  normalizeWidth,
} from "app/components/scaleFontSize";
import {
  BLACK_COLOR,
  GREEN_COLOR,
  Isios,
  PRIMARY_THEME_COLOR,
  RED_COLOR,
  ROLE_IDS,
  WHITE_COLOR,
} from "app/components/utilities/constant";
import React, { useEffect } from "react";
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
import ClusterHeadtable from "./tableComponents/ClusterHeadtable";
import ErrorMessage from "app/components/ErrorMessage";
import {
  handlePermission,
  openPermissionSetting,
} from "app/components/utilities/GlobalFuncations";
import strings from "app/components/utilities/Localization";
import RNFS from "react-native-fs";
import XLSX from "xlsx";
import SMReportTable from "./SMReportTable";
import { useSelector } from "react-redux";
import EmptyListScreen from "app/components/CommonScreen/EmptyListScreen";

const ClusterHeadReportTable = (props: any) => {
  const { data, onReset, handleCpDetailPress, handleCTANavigation, fileName } =
    props;
  const { userData = {} } = useSelector((state: any) => state.userData);

  const { width, height } = Dimensions.get("window");
  const [refreshing, setRefreshing] = React.useState(false);
  const roleId = userData?.data?.role_id || "";

  const onRefresh = () => {
    setRefreshing(true);
    props.onReset();
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  };
  const soucingHeaderData = [
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

  const closingHeaderData = [
    "CM Name",
    "Visitor Attended",
    "Direct Walk-ins",
    "CP (Walk-ins) Appointments",
    "No Shows",
    "Total Revisit",
    "Total Not Interested",
    "Total Booking",
    "Conversion %",
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
          const {
            property_title,
            smDetails,
            CMDetails,
            CTLDetails,
            StlDetails,
          } = property;

          const worksheet = XLSX.utils.aoa_to_sheet([[]]); // Create an empty worksheet
          let currentRow: any;

          // Add "CM Name" from CTLDetails in cell A3
          let ClosingrowData: any = [];
          CTLDetails?.forEach((item: any) => {
            ClosingrowData.push(["CTL Name", item?.username]);
            ClosingrowData.push([
              "CM Name",
              "Visitor Attended",
              "Direct Walk-ins",
              "CP (Walk-ins) Appointments",
              "No Shows",
              "Total Revisit",
              "Total Not Interested",
              "Total Booking",
              "Conversion %",
            ]);
            item?.CMDetails.forEach((cmItem: any) => {
              ClosingrowData.push([
                cmItem?.user_name,
                cmItem?.VisitorAttended,
                cmItem?.DirectWalkins,
                cmItem?.CPWalkins,
                cmItem?.Noshow,
                cmItem?.TotalAppointmentsrevisit,
                cmItem?.TotalNotInterested,
                cmItem?.Booking,
                cmItem?.Conversion,
              ]);
            });
            currentRow = item?.CMDetails?.length + 5;
          });
          XLSX.utils.sheet_add_aoa(worksheet, ClosingrowData, { origin: "A1" });

          // Start adding StlDetails data from the fifth row (A5)
          StlDetails?.forEach((item: any) => {
            let rowData: any = [];
            rowData.push(["STL Name", item?.username]);

            rowData.push([
              "SM Name",
              "CP Mapped",
              "New CP Registered",
              "Active CP",
              "Transactional CP",
              "Dormant CP",
              "Appointment Done",
              "Visitor No Shows",
              "Total Bookings",
            ]);
            item?.smDetails.forEach((smItem: any) => {
              rowData.push([
                smItem?.username,
                smItem?.cpcount,
                smItem?.newCpRegistered,
                smItem?.activeCP,
                smItem?.TransactionalCPtotal,
                smItem?.inactiveCP,
                smItem?.Appdonecounttotal,
                smItem?.NoshowAppintment,
                smItem?.confirmBooking,
              ]);
            });

            XLSX.utils.sheet_add_aoa(worksheet, rowData, {
              origin: `A${currentRow}`,
            });
          });

          // Add the worksheet to the workbook
          XLSX.utils.book_append_sheet(workbook, worksheet, property_title);
        });

        // Generate the Excel file
        const excelFile = XLSX.write(workbook, {
          type: "base64",
          bookType: "xlsx",
        });

        // Create a temporary directory to store the file
        const tempDir = RNFS.DownloadDirectoryPath;
        let filePath: any;
        if (roleId === ROLE_IDS.sitehead_id) {
          filePath = `${tempDir}/SiteHeadReport${fileName}.xlsx`;
        } else if (roleId === ROLE_IDS.clusterhead_id) {
          filePath = `${tempDir}/ClusterHeadReport.xlsx`;
        }
        // Write the file to the temporary directory
        await RNFS.writeFile(filePath, excelFile, "base64");

        console.log("File saved:", filePath);

        // Add file scanning to make it visible in the device's media library (optional)
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
          flexGrow: 1,
          margin: normalize(10),
        }}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
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
        <View>
          {data.map((item: any, index: any) => {
            return (
              <View key={index}>
                {!(
                  item?.CTLDetails?.length == 0 && item?.StlDetails?.length == 0
                ) ? (
                  <View
                    style={{
                      ...styles.ThemeColorBox,
                      width: "100%",
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
                ) : (
                  <View>
                    <Text style={{ textAlign: "center" }}>Data Not Found</Text>
                  </View>
                )}
                <View>
                  {item?.StlDetails?.map((item: any, index: any) => {
                    return (
                      <>
                        {item?.smDetails?.length > 0 ? (
                          <View>
                            {index === 0 && (
                              <View
                                style={{
                                  ...styles.ThemeColorBox,
                                  width: "100%",
                                }}
                              >
                                <Text
                                  style={{
                                    ...styles.boxText,
                                    color: WHITE_COLOR,
                                    textAlign: "center",
                                  }}
                                >
                                  Sourcing Team
                                </Text>
                              </View>
                            )}
                            <View
                              style={{
                                ...styles.ThemeColorBox,
                                width: "100%",
                              }}
                            >
                              <Text
                                style={{
                                  ...styles.boxText,
                                  color: WHITE_COLOR,
                                  textAlign: "center",
                                }}
                              >
                                Sourcing TL : {item?.username}
                              </Text>
                            </View>
                            <ClusterHeadtable
                              data={item?.smDetails}
                              role_ID={2}
                              headerData={soucingHeaderData}
                              handleCpDetailPress={handleCpDetailPress}
                              handleCTANavigation={handleCTANavigation}
                            />
                          </View>
                        ) : null}
                      </>
                    );
                  })}
                  {item?.CTLDetails?.map((item: any, index: any) => {
                    return (
                      <>
                        {item?.CMDetails?.length > 0 ? (
                          <View>
                            {index === 0 && (
                              <View
                                style={{
                                  ...styles.ThemeColorBox,
                                  width: "100%",
                                }}
                              >
                                <Text
                                  style={{
                                    ...styles.boxText,
                                    color: WHITE_COLOR,
                                    textAlign: "center",
                                  }}
                                >
                                  Closing Team
                                </Text>
                              </View>
                            )}
                            <View
                              style={{
                                ...styles.ThemeColorBox,
                                width: "100%",
                              }}
                            >
                              <Text
                                style={{
                                  ...styles.boxText,
                                  color: WHITE_COLOR,
                                  textAlign: "center",
                                }}
                              >
                                Closing TL : {item?.username}
                              </Text>
                            </View>
                            <ClusterHeadtable
                              data={item?.CMDetails}
                              role_ID={1}
                              headerData={closingHeaderData}
                              handleCTANavigation={handleCTANavigation}
                            />
                          </View>
                        ) : null}
                      </>
                    );
                  })}
                </View>
              </View>
            );
          })}

          {data?.length == 0 ? (
            <EmptyListScreen message={strings.reportHeader} />
          ) : null}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ClusterHeadReportTable;
