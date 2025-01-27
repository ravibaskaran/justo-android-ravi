import React, { useEffect, useState } from "react";

import { useFocusEffect } from "@react-navigation/native";
import { GetProjectDetailsReport } from "app/Redux/Actions/ProjectReportActions";
import { useDispatch, useSelector } from "react-redux";
import ProjectReportView from "./components/ProjectReportView";

const ProjectReportScreen = ({ navigation }: any) => {
  const { response = {}, list = "" } = useSelector(
    (state: any) => state.projectReportData
  );
  const [pdrData, setPDRData] = useState([]);
  const dispatch: any = useDispatch();

  const [filterData, setFilterData] = useState({
    on_date: "",
    property_id: "",
  });
  const [displayDate, setdisplayDate] = useState("");

  useFocusEffect(
    React.useCallback(() => {
      setFilterData({
        on_date: "",
        property_id: "",
      });
      getData({});
      return () => {};
    }, [navigation])
  );

  const getData = (data: any) => {
    setdisplayDate(data?.on_date ? data?.on_date : "");
    dispatch(
      GetProjectDetailsReport({
        on_date: data?.on_date ? data?.on_date : "",
        property_id: data?.property_id ? data?.property_id : "",
      })
    );
  };

  useEffect(() => {
    if (response?.status === 200) {
      if (response?.data?.length > 0) {
        setPDRData(
          response?.data.sort(
            (a: { property_name: string }, b: { property_name: any }) =>
              a.property_name.localeCompare(b.property_name)
          )
        );
      } else {
        setPDRData([]);
      }
    } else {
      setPDRData([]);
    }
  }, [response]);

  const handleDrawerPress = () => {
    navigation.toggleDrawer();
  };

  return (
    <>
      <ProjectReportView
        handleDrawerPress={handleDrawerPress}
        filterData={filterData}
        setFilterData={setFilterData}
        getData={getData}
        pdrData={pdrData}
        setPDRData={setPDRData}
        setdisplayDate={setdisplayDate}
        displayDate={displayDate}
      />
    </>
  );
};

export default ProjectReportScreen;
