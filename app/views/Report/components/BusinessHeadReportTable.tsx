import React from "react";
import {
  Dimensions,
  RefreshControl,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View
} from "react-native";
import RNFS from "react-native-fs";
import XLSX from "xlsx";
import ErrorMessage from "../../../components/ErrorMessage";
import {
  normalize,
  normalizeHeight,
  normalizeWidth,
} from "../../../components/scaleFontSize";
import {
  BLACK_COLOR,
  GREEN_COLOR,
  Isios,
  PRIMARY_THEME_COLOR,
  RED_COLOR,
  WHITE_COLOR,
} from "../../../components/utilities/constant";
import {
  handlePermission,
  openPermissionSetting,
} from "../../../components/utilities/GlobalFuncations";
import strings from "../../../components/utilities/Localization";
import styles from "./styles";

const BusinessHeadReportTable = (props: any) => {
  const { data, handleCpDetailPress, fileName } = props;
  const { width, height } = Dimensions.get("window");
  const [refreshing, setRefreshing] = React.useState(false);
  const onRefresh = () => {
    setRefreshing(true);
    props.onReset();
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  };
  const headerData = [
    "CP Mapped",
    "New CP Registered",
    "Active CP",
    "Transacting CP",
    "Dormant CP",
  ];

  const swipeData = ["Site Visit", "Booking", "Conv %"];

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

        // data.forEach((property: any) => {
        //   const { property_Name, propertyDetails } = property;

        //   const worksheetData: any = [];

        //   propertyDetails.map((item: any) => {
        //     item?.details.map((itm: any) => {
        //       const rowData = {
        //         clusterName: item?.clusterName,
        //         "Channel Partner": itm?.ChannelPartner,
        //         Digital: itm?.Digital,
        //         Direct: itm?.Direct,
        //         Hoarding: itm?.Hoarding,
        //         "Paper Inserts": itm?.PaperInsertd,
        //         "Grand Total": itm?.GrandTotal,
        //         "Total Cancelation": itm?.TotalCancelation,
        //         "Total Registration": itm?.TotalRegistration,
        //         "Not Interested": itm?.NotInterested,
        //         "Total CP": itm?.TotalCP,
        //         "Newly Added CP": itm?.AddedCP,
        //         "Active CP": itm?.ActiveCP,
        //         "Transaction / Booking CP": itm?.Booking,
        //         "Inactive/Dormat CP": itm?.InactiveCP,
        //         "Site Visit": itm?.SiteVisit,
        //       };
        //       worksheetData.push(rowData);
        //     });
        //   });

        //   // smDetails.forEach((item: any) => {
        //   //   const { header, data } = item;
        //   //   const rowData = [header, ...data];
        //   //   worksheetData.push(rowData);
        //   // });

        //   const worksheet = XLSX.utils.json_to_sheet(worksheetData);
        //   XLSX.utils.book_append_sheet(workbook, worksheet, property_Name);
        // });

        // Convert workbook to a binary string

        data.forEach((property: any) => {
          const { username, CHDetails } = property;

          const worksheet = XLSX.utils.aoa_to_sheet([[]]); // Create an empty worksheet
          let currentRow: any;

          CHDetails?.forEach((item: any, index: any) => {
            const handleTotalCount = (prop: any) => {
              if (item?.leaddetail?.length > 0) {
                return item?.leaddetail?.reduce(function (a: any, b: any) {
                  return a + b[prop];
                }, 0);
              }
            };
            const handleTotalCountPercentage = () => {
              if (
                handleTotalCount("confirmBooking") !== 0 &&
                handleTotalCount("sitevisitbysource") !== 0
              ) {
                return (
                  (handleTotalCount("confirmBooking") /
                    handleTotalCount("sitevisitbysource")) *
                  100
                );
              } else {
                return 0;
              }
            };
            let rowData: any = [];
            if (index !== 0) {
              rowData.push([""]);
              rowData.push([""]);
            }
            rowData.push(["Property Name", item?.property_title]);
            rowData.push(["Lead Source", "Site Visit", "Booking", "Conv %"]);
            item?.leaddetail.forEach((leadItem: any) => {
              rowData.push([
                leadItem?.title,
                leadItem?.sitevisitbysource,
                leadItem?.confirmBooking,
                leadItem?.ConversionPercentage,
              ]);
            });

            rowData.push([
              "Grand Total",
              handleTotalCount("sitevisitbysource"),
              handleTotalCount("confirmBooking"),
              handleTotalCountPercentage() + "%",
            ]);
            rowData.push(["CP Details"]);
            rowData.push(headerData);

            rowData.push([
              item?.cpcount,
              item?.newCpRegistered,
              item?.activeCP,
              item?.transacting_cp,
              item?.inactiveCP,
            ]);

            XLSX.utils.sheet_add_aoa(worksheet, rowData, {
              origin: `A${currentRow}`,
            });
          });

          // Add the worksheet to the workbook
          XLSX.utils.book_append_sheet(workbook, worksheet, username);
        });

        const excelFile = XLSX.write(workbook, {
          bookType: "xlsx",
          type: "base64",
        });

        // Create a temporary directory to store the file
        const tempDir = RNFS.DownloadDirectoryPath;
        const filePath = `${tempDir}/BusinessHeadReport-${fileName}.xlsx`;

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
          {data?.map((item: any, index: any) => {
            return (
              <>
                <View
                  style={{
                    marginBottom: normalize(10),
                  }}
                  key={index}
                >
                  <View
                    style={{
                      ...styles.ThemeColorBox,
                      width: "100%",
                      marginBottom: normalize(10),
                    }}
                  >
                    <Text
                      style={{
                        ...styles.boxText,
                        color: WHITE_COLOR,
                        textAlign: "center",
                      }}
                    >
                      {item?.username}
                    </Text>
                  </View>
                  {item?.CHDetails?.map((itm: any, index: any) => {
                    const handleTotalCount = (prop: any) => {
                      if (itm?.leaddetail?.length > 0) {
                        return itm?.leaddetail?.reduce(function (
                          a: any,
                          b: any
                        ) {
                          return a + b[prop];
                        },
                        0);
                      }
                    };
                    const handleTotalCountPercentage = (prop: any) => {
                      if (
                        handleTotalCount("confirmBooking") !== 0 &&
                        handleTotalCount("sitevisitbysource") !== 0
                      ) {
                        return (
                          (handleTotalCount("confirmBooking") /
                            handleTotalCount("sitevisitbysource")) *
                          100
                        );
                      } else {
                        return 0;
                      }
                    };
                    return (
                      <>
                        <View
                          style={{
                            ...styles.ThemeColorBox,
                            width: "100%",
                            // marginBottom: normalize(10),
                          }}
                        >
                          <Text
                            style={{ ...styles.boxText, color: WHITE_COLOR }}
                          >
                            {`Property name: ${itm?.property_title}`}
                          </Text>
                        </View>
                        <ScrollView
                          horizontal={true}
                          showsHorizontalScrollIndicator={false}
                          contentContainerStyle={{
                            flexDirection: "column",
                          }}
                        >
                          <View
                            style={{
                              flexDirection: "row",
                              // marginBottom: normalize(10),
                            }}
                          >
                            <View
                              style={{
                                flexDirection: "column",
                              }}
                            >
                              <>
                                {itm?.leaddetail?.map(
                                  (val: any, index: any) => {
                                    return (
                                      <>
                                        {index === 0 ? (
                                          <View
                                            style={{
                                              borderWidth: normalize(
                                                Isios ? 1.2 : 2
                                              ),
                                              padding: normalize(12),
                                              backgroundColor:
                                                PRIMARY_THEME_COLOR,
                                            }}
                                          >
                                            <Text
                                              style={{
                                                ...styles.boxText,
                                                color: WHITE_COLOR,
                                              }}
                                            >
                                              Lead Source
                                            </Text>
                                          </View>
                                        ) : null}
                                        <View
                                          key={index}
                                          style={{
                                            borderWidth: normalize(
                                              Isios ? 1.2 : 2
                                            ),
                                            padding: normalize(12),
                                            backgroundColor:
                                              PRIMARY_THEME_COLOR,
                                          }}
                                        >
                                          <Text
                                            style={{
                                              ...styles.boxText,
                                              color: WHITE_COLOR,
                                            }}
                                          >
                                            {val?.title}
                                          </Text>
                                        </View>
                                      </>
                                    );
                                  }
                                )}
                                <View
                                  key={index}
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
                                    }}
                                  >
                                    Grand Total
                                  </Text>
                                </View>
                              </>
                            </View>
                            <View style={{ flexDirection: "column" }}>
                              <View style={{ flexDirection: "row" }}>
                                {swipeData?.map((item: any, index: any) => {
                                  return (
                                    <View
                                      style={{
                                        flexDirection: "column",
                                      }}
                                    >
                                      <View style={styles.dataItemsForBM}>
                                        <Text
                                          style={{
                                            ...styles.boxText,
                                            color: BLACK_COLOR,
                                          }}
                                        >
                                          {item}
                                        </Text>
                                      </View>
                                    </View>
                                  );
                                })}
                              </View>
                              <View style={{ flexDirection: "column" }}>
                                {itm?.leaddetail?.map(
                                  (item: any, index: any) => {
                                    return (
                                      <View
                                        style={{
                                          flexDirection: "row",
                                          width: normalizeWidth(100),
                                        }}
                                      >
                                        <TouchableOpacity
                                          onPress={() =>
                                            props.handleCTANavigation(
                                              "AppointmentCTA"
                                            )
                                          }
                                          style={styles.dataItemsForBM}
                                        >
                                          <Text
                                            style={{
                                              ...styles.boxText,
                                              color: BLACK_COLOR,
                                            }}
                                          >
                                            {item?.sitevisitbysource}
                                          </Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity
                                          onPress={() =>
                                            props.handleCTANavigation(
                                              "BookingCTA"
                                            )
                                          }
                                          style={styles.dataItemsForBM}
                                        >
                                          <Text
                                            style={{
                                              ...styles.boxText,
                                              color: BLACK_COLOR,
                                            }}
                                          >
                                            {item?.confirmBooking}
                                          </Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity
                                          style={styles.dataItemsForBM}
                                        >
                                          <Text
                                            style={{
                                              ...styles.boxText,
                                              color: BLACK_COLOR,
                                            }}
                                          >
                                            {item?.ConversionPercentage}
                                          </Text>
                                        </TouchableOpacity>
                                      </View>
                                    );
                                  }
                                )}
                                <View
                                  style={{
                                    flexDirection: "row",
                                    width: normalizeWidth(100),
                                  }}
                                >
                                  <View style={styles.dataItemsForBM}>
                                    <Text
                                      style={{
                                        ...styles.boxText,
                                        color: BLACK_COLOR,
                                      }}
                                    >
                                      {handleTotalCount("sitevisitbysource")}
                                    </Text>
                                  </View>
                                  <View style={styles.dataItemsForBM}>
                                    <Text
                                      style={{
                                        ...styles.boxText,
                                        color: BLACK_COLOR,
                                      }}
                                    >
                                      {handleTotalCount("confirmBooking")}
                                    </Text>
                                  </View>
                                  <View style={styles.dataItemsForBM}>
                                    <Text
                                      style={{
                                        ...styles.boxText,
                                        color: BLACK_COLOR,
                                      }}
                                    >
                                      {handleTotalCountPercentage(
                                        "ConversionPercentage"
                                      ) + "%"}
                                    </Text>
                                  </View>
                                </View>
                              </View>
                            </View>
                          </View>
                          <View>
                            <View
                              style={{
                                ...styles.ThemeColorBox,
                                width: "100%",
                                // marginBottom: normalize(10),
                              }}
                            >
                              <Text
                                style={{
                                  ...styles.boxText,
                                  color: WHITE_COLOR,
                                  textAlign: "center",
                                }}
                              >
                                CP Details
                              </Text>
                            </View>
                            <View style={{ flexDirection: "row" }}>
                              {headerData?.map((item: any, index: any) => {
                                return (
                                  <View
                                    style={{
                                      flexDirection: "column",
                                    }}
                                  >
                                    <View
                                      style={[
                                        styles.dataItemsForBM,
                                        {
                                          height: normalizeHeight(100),
                                          width: normalizeWidth(120),
                                        },
                                      ]}
                                    >
                                      <Text
                                        style={{
                                          ...styles.boxText,
                                          color: BLACK_COLOR,
                                          textAlign: "center",
                                        }}
                                      >
                                        {item}
                                      </Text>
                                    </View>
                                  </View>
                                );
                              })}
                            </View>
                            <View style={{ flexDirection: "column" }}>
                              {/* {itm?.leaddetail?.map((item: any, index: any) => {
                                return ( */}

                              <View
                                style={{
                                  flexDirection: "row",
                                  width: normalizeWidth(100),
                                }}
                              >
                                <TouchableOpacity
                                  onPress={() =>
                                    handleCpDetailPress(item?.CPInfo, "Demo")
                                  }
                                  style={[
                                    styles.dataItemsForBM,
                                    { width: normalizeWidth(120) },
                                  ]}
                                >
                                  <Text
                                    style={{
                                      ...styles.boxText,
                                      color: BLACK_COLOR,
                                    }}
                                  >
                                    {itm?.cpcount ? itm?.cpcount : 0}
                                  </Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                  onPress={() =>
                                    handleCpDetailPress(item?.CPInfo, "Demo")
                                  }
                                  style={[
                                    styles.dataItemsForBM,
                                    { width: normalizeWidth(120) },
                                  ]}
                                >
                                  <Text
                                    style={{
                                      ...styles.boxText,
                                      color: BLACK_COLOR,
                                    }}
                                  >
                                    {itm?.newCpRegistered
                                      ? itm?.newCpRegistered
                                      : 0}
                                  </Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                  onPress={() =>
                                    handleCpDetailPress(item?.CPInfo, "Demo")
                                  }
                                  style={[
                                    styles.dataItemsForBM,
                                    { width: normalizeWidth(120) },
                                  ]}
                                >
                                  <Text
                                    style={{
                                      ...styles.boxText,
                                      color: BLACK_COLOR,
                                    }}
                                  >
                                    {itm?.activeCP ? itm?.activeCP : 0}
                                  </Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                  onPress={() =>
                                    handleCpDetailPress(item?.CPInfo, "Demo")
                                  }
                                  style={[
                                    styles.dataItemsForBM,
                                    { width: normalizeWidth(120) },
                                  ]}
                                >
                                  <Text
                                    style={{
                                      ...styles.boxText,
                                      color: BLACK_COLOR,
                                    }}
                                  >
                                    {itm?.transacting_cp
                                      ? itm?.transacting_cp
                                      : 0}
                                  </Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                  onPress={() =>
                                    handleCpDetailPress(item?.CPInfo, "Demo")
                                  }
                                  style={[
                                    styles.dataItemsForBM,
                                    { width: normalizeWidth(120) },
                                  ]}
                                >
                                  <Text
                                    style={{
                                      ...styles.boxText,
                                      color: BLACK_COLOR,
                                    }}
                                  >
                                    {itm?.inactiveCP ? itm?.inactiveCP : 0}
                                  </Text>
                                </TouchableOpacity>
                              </View>
                            </View>
                          </View>
                        </ScrollView>
                      </>
                    );
                  })}
                </View>
              </>
            );
          })}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default BusinessHeadReportTable;
