import { useFocusEffect, useIsFocused } from "@react-navigation/native";
import {
  GetBMreport,
  GetClHreport,
  GetCMReport,
  GetCTReport,
  GetSCMeport,
  GetSHCHreport,
  GetSMReport,
  GetSrcHreport,
  GetSTReport,
} from "app/Redux/Actions/ReportActions";
import ErrorMessage from "app/components/ErrorMessage";
import {
  DATE_FORMAT,
  RED_COLOR,
  ROLE_IDS,
} from "app/components/utilities/constant";
import moment from "moment";
import React, { useEffect, useLayoutEffect, useState } from "react";
import { Keyboard } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import ReportView from "./components/ReportView";
import strings from "app/components/utilities/Localization";

const ReportScreen = ({ navigation }: any) => {
  const [reportData, setReportData] = useState([]);
  const [filterModalVisible, setIsFilterModalVisible] = useState(false);
  const [filterData, setFilterData] = useState({
    startdate: "",
    enddate: "",
    property_id: "",
    by_team: "",
    user_id: "",
    parent_id: "",
  });
  const [selectedStartDate, setSelectedStartDate] = useState("");
  const [selectedEndDate, setSelectedEndDate] = useState("");
  const [propertyListForFilter, setPropertyListForFilter] = useState([]);
  const [clusterheadListForFilter, setClusterheadListForFilter] = useState([]);
  const dispatch: any = useDispatch();
  const handleDrawerPress = () => {
    navigation.toggleDrawer();
  };
  const isFocused = useIsFocused();
  const { userData = {} } = useSelector((state: any) => state.userData);
  const ReportData = useSelector((state: any) => state.reportData);
  const roleId = userData?.data?.role_id || "";
  var currentDate = new Date();
  currentDate.setDate(1);
  var firstDayOfMonth = `01`;
  var currentMonth: any = currentDate.getMonth() + 1;
  currentMonth = currentMonth <= 9 ? `0${currentMonth}` : currentMonth;
  var currentYear = currentDate.getFullYear();
  var date = new Date();
  var firstdDate = currentYear + "-" + currentMonth + "-" + firstDayOfMonth;
  var currentDay: any = date.getDate();
  currentDay = currentDay <= 9 ? `0${currentDay}` : currentDay;
  var currentMonths: any = currentDate.getMonth() + 1;
  currentMonths = currentMonths <= 9 ? `0${currentMonths}` : currentMonths;
  var currentYears = currentDate.getFullYear();
  var todayDate = currentYears + "-" + currentMonths + "-" + currentDay;
  var today = moment(new Date()).format(DATE_FORMAT);

  const today_Date = filterData?.startdate
    ? moment(filterData?.startdate).format("DD-MM-YYYY")
    : moment(new Date(date.getFullYear(), date.getMonth(), 1)).format(
        "DD-MM-YYYY"
      );
  const lastDate = filterData?.enddate
    ? moment(filterData?.enddate).format("DD-MM-YYYY")
    : moment(new Date()).format("DD-MM-YYYY");
  const fileName = today_Date + "_to_" + lastDate;

  useLayoutEffect(() => {
    if (!filterModalVisible) {
      getData(today, today);
    }
  }, [isFocused, filterData, navigation]);
  useEffect(() => {
    if (ReportData?.response?.data?.length > 0) {
      setReportData(ReportData?.response?.data);
    } else {
      // ErrorMessage({
      //   msg: ReportData?.response?.message,
      //   backgroundColor: BLACK_COLOR
      // })
    }
  }, [ReportData]);
  useFocusEffect(
    React.useCallback(() => {
      setFilterData({
        startdate: today,
        enddate: today,
        property_id: "",
        by_team: "",
        user_id: "",
        parent_id: "",
      });
      return () => {};
    }, [navigation])
  );
  useFocusEffect(
    React.useCallback(() => {
      let arrForProperty: any = [];
      if (propertyListForFilter.length === 0) {
        if (
          roleId === ROLE_IDS.clusterhead_id ||
          roleId === ROLE_IDS.sitehead_id ||
          roleId === ROLE_IDS.admin_id
        ) {
          reportData?.map((item: any, index: any) => {
            arrForProperty.push({
              property_id: item?.property_id,
              property_title: item?.property_title,
            });
            setPropertyListForFilter(arrForProperty);
          });
        } else if (roleId === ROLE_IDS.businesshead_id) {
          reportData?.map((item: any, index: any) => {
            item?.CHDetails?.map((el: any) => {
              arrForProperty.push({
                property_id: el?.property_id,
                property_title: el?.property_title,
              });
            });
          });
          const arrayUniqueByKey: any = [
            ...new Map(
              arrForProperty.map((item: any) => [item["property_id"], item])
            ).values(),
          ];
          setPropertyListForFilter(arrayUniqueByKey);
        }
      }
      return () => {};
    }, [navigation, reportData])
  );
  useFocusEffect(
    React.useCallback(() => {
      let arrForProperty: any = [];
      let arrForCluster: any = [];
      if (
        roleId === ROLE_IDS.clusterhead_id ||
        roleId === ROLE_IDS.sitehead_id ||
        roleId === ROLE_IDS.admin_id
      ) {
        // reportData?.map((item: any, index: any) => {
        //   arrForProperty.push({
        //     property_id: item?.property_id,
        //     property_title: item?.property_title,
        //   });
        //   // setPropertyListForFilter(arrForProperty);
        // });
        reportData?.map((item: any, index: any) => {
          arrForProperty.push({
            property_id: item?.property_id,
            property_title: item?.property_title,
          });
          // setPropertyListForFilter(arrForProperty);
        });
      } else if (roleId === ROLE_IDS.businesshead_id) {
        reportData?.map((item: any, index: any) => {
          if (propertyListForFilter.length === 0) {
            // item?.CHDetails?.map((el: any) => {
            //   arrForProperty.push({
            //     property_id: el?.property_id,
            //     property_title: el?.property_title,
            //   });
            // });
            // setPropertyListForFilter(arrForProperty);
          }
          if (clusterheadListForFilter.length === 0) {
            arrForCluster.push({
              user_name: item?.username,
              user_id: item?.user_id,
            });
            const arrayUniqueByKey: any = [
              ...new Map(
                arrForCluster.map((item: any) => [item["user_id"], item])
              ).values(),
            ];
            setClusterheadListForFilter(arrayUniqueByKey);
          }
        });
      }

      return () => {};
    }, [navigation, ReportData, reportData])
  );

  const validation = () => {
    let isError = true;
    let errorMessage: any = "";
    if (filterData?.startdate !== "" && filterData?.enddate === "") {
      isError = false;
      errorMessage = strings.endDateReqMsg;
    } else if (filterData?.enddate !== "" && filterData?.startdate === "") {
      isError = false;
      errorMessage = strings.startDateReqMsg;
    } else if (!(filterData?.startdate <= filterData?.enddate)) {
      isError = false;
      errorMessage = strings.checkEndDateIsGrater;
    }
    if (errorMessage !== "") {
      ErrorMessage({
        msg: errorMessage,
        backgroundColor: RED_COLOR,
      });
    }
    if (!isError) {
      Keyboard.dismiss();
    }
    return isError;
  };

  const handleCTANavigation = (navigateTo: any) => {
    // navigation.navigate(navigateTo)
  };

  const getData = (startDate: any, endDate: any) => {
    setSelectedStartDate(startDate);
    setSelectedEndDate(endDate);
    if (roleId === ROLE_IDS.closingmanager_id) {
      dispatch(
        GetCMReport({
          start_date: startDate.toString(),
          end_date: endDate.toString(),
        })
      );
    } else if (roleId === ROLE_IDS.closingtl_id) {
      dispatch(
        GetCTReport({
          start_date: startDate.toString(),
          end_date: endDate.toString(),
        })
      );
    } else if (roleId === ROLE_IDS.closing_head_id) {
      dispatch(
        GetClHreport({
          start_date: startDate.toString(),
          end_date: endDate.toString(),
        })
      );
    } else if (roleId === ROLE_IDS.sourcingmanager_id) {
      dispatch(
        GetSMReport({
          start_date: startDate.toString(),
          end_date: endDate.toString(),
        })
      );
    } else if (roleId === ROLE_IDS.sourcingtl_id) {
      dispatch(
        GetSTReport({
          start_date: startDate.toString(),
          end_date: endDate.toString(),
        })
      );
    } else if (roleId === ROLE_IDS.sourcing_head_id) {
      dispatch(
        GetSrcHreport({
          start_date: startDate.toString(),
          end_date: endDate.toString(),
        })
      );
    } else if (roleId === ROLE_IDS.scm_id) {
      dispatch(
        GetSCMeport({
          start_date: startDate.toString(),
          end_date: endDate.toString(),
        })
      );
    } else if (
      roleId === ROLE_IDS.sitehead_id ||
      roleId === ROLE_IDS.clusterhead_id ||
      roleId === ROLE_IDS.admin_id
    ) {
      dispatch(
        GetSHCHreport({
          start_date: startDate.toString(),
          end_date: endDate.toString(),
          property_id: filterData.property_id,
          by_team: filterData.by_team,
          user_id: filterData.user_id,
          parent_id: filterData.parent_id,
        })
      );
    } else if (roleId === ROLE_IDS.businesshead_id) {
      dispatch(
        GetBMreport({
          start_date: startDate.toString(),
          end_date: endDate.toString(),
          property_id: filterData.property_id,
          user_id: filterData.user_id,
        })
      );
    }
  };

  const handleOnFilterPress = () => {
    setIsFilterModalVisible(true);
  };

  const onReset = () => {
    setIsFilterModalVisible(false);
    setFilterData({
      ...filterData,
      startdate: today,
      enddate: today,
      property_id: "",
      by_team: "",
      user_id: "",
      parent_id: "",
    });
    getData(today, today);
  };

  const handleFilter = () => {
    if (validation()) {
      setIsFilterModalVisible(false);
      getData(
        filterData?.startdate ? filterData?.startdate : firstdDate,
        filterData?.enddate ? filterData?.enddate : todayDate
      );
    }
  };

  const handleCpDetailPress = (list: any, name: any) => {
    if (name !== "Demo") {
      navigation.navigate("CpDetailForReport", { cpList: list, smName: name });
    }
  };
  return (
    <>
      <ReportView
        handleDrawerPress={handleDrawerPress}
        roleId={roleId}
        reportData={reportData}
        userData={userData}
        handleOnFilterPress={handleOnFilterPress}
        setIsFilterModalVisible={setIsFilterModalVisible}
        FilterModalVisible={filterModalVisible}
        filterData={filterData}
        setFilterData={setFilterData}
        handleFilter={handleFilter}
        onReset={onReset}
        handleCpDetailPress={handleCpDetailPress}
        propertyListForFilter={propertyListForFilter}
        clusterheadListForFilter={clusterheadListForFilter}
        setClusterheadListForFilter={setClusterheadListForFilter}
        handleCTANavigation={handleCTANavigation}
        fileName={fileName}
        selectedStartDate={selectedStartDate}
        selectedEndDate={selectedEndDate}
      />
    </>
  );
};

export default ReportScreen;
