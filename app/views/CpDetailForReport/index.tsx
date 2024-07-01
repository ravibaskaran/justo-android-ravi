import { View, Text } from "react-native";
import React, { useState } from "react";
import CpDetailForReportView from "./components/CpDetailForReportView";

const CpDetailForReport = ({ navigation, route }: any) => {
  const { cpList, smName } = route.params;
  const [searchcpList, setSearchcpList] = useState<any>(cpList);
  const handleBackPress = () => {
    navigation.goBack();
  };
  const handleSearch = (searchKey: any) => {
    if (searchKey !== "") {
      const lowerCased = searchKey?.toLowerCase().trim();
      const searchArray = [...cpList];
      const list = searchArray?.filter((item) => {
        return item?.Cp_name?.toLowerCase()?.match(lowerCased);
      });
      setSearchcpList(list)
    } else {
      setSearchcpList(cpList);
    }
  };
  return (
    <CpDetailForReportView
      handleBackPress={handleBackPress}
      smName={smName}
      cpList={searchcpList}
      handleSearch={handleSearch}
    />
  );
};

export default CpDetailForReport;
