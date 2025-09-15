import React, { useState } from "react";
import { FlatList, View } from "react-native";
import images from "../../../../assets/images";
import Header from "../../../../components/Header";
import strings from "../../../../components/utilities/Localization";
import FilterModal from "./EmployeeFilterModel";
import AgencyListItem from "./EmployeeListItem";
import styles from "./styles";

import Button from "../../../../components/Button";
import EmptyListScreen from "../../../../components/CommonScreen/EmptyListScreen";
import {
  PRIMARY_THEME_COLOR
} from "../../../../components/utilities/constant";

const EmployeeView = (props: any) => {
  const loadingref = false;
  const [isVisible, setIsVisible] = useState(false);
  const [FilterisVisible, setFilterisVisible] = useState(false);
  const onRefresh = () => {
    props.setFilterData({
      startdate: "",
      enddate: "",
      search_by_name: "",
      search_by_location: "",
      status: "",
    });
    props.getAgencyList(0, {});
  };
  const onReset = () => {
    props.setFilterData({
      startdate: "",
      enddate: "",
      search_by_name: "",
      search_by_location: "",
      status: "",
    });
    setFilterisVisible(false);
    props.getAgencyList(0, {});
  };

  return (
    <View style={styles.mainContainer}>
      <Header
        leftImageSrc={images.backArrow}
        rightSecondImageScr={images.notification}
        headerText={strings.employee}
        headerStyle={styles.headerStyle}
        RightFirstIconStyle={styles.leftImageIconStyle}
        leftImageIconStyle={styles.leftImageIconStyle}
        handleOnLeftIconPress={props.handleBackPress}
        statusBarColor={PRIMARY_THEME_COLOR}
        barStyle={"light-content"}
      />
      <View style={styles.propertyListView}>
        <View
          style={{
            marginVertical: 10,
            flexDirection: "row",
            justifyContent: "flex-end",
          }}
        >
          <Button
            height={30}
            width={150}
            buttonText={strings.addEmployee}
            handleBtnPress={() => props.onAddEmployeeButtonPress({}, "add")}
          />
        </View>
        <View style={[styles.btnView, {marginBottom: 50}]}>
          <View style={styles.propertyListViewsec}>
            <FlatList
removeClippedSubviews={false}
              showsVerticalScrollIndicator={false}
              data={Array.isArray(props?.agentList) ? props?.agentList : []}
              ListEmptyComponent={
                <EmptyListScreen message={strings.employee} />
              }
              renderItem={({ item }) => (
                <AgencyListItem
                  items={item}
                  setIsVisible={setIsVisible}
                  onPressView={props.onPressView}
                  setChangeStatus={props.setChangeStatus}
                  userData={props.userData}
                />
              )}
              onEndReached={() => {
                if (props?.agentList?.length < props?.moreData) {
                  props.getAgencyList(
                    props?.agentList?.length > 2 ? props.offSET + 1 : 0,
                    props.filterData
                  );
                }
              }}
              refreshing={loadingref}
              onRefresh={() => onRefresh()}
            />
          </View>
        </View>
        <FilterModal
          getAgencyList={props.getAgencyList}
          onReset={onReset}
          setFilterData={props.setFilterData}
          filterData={props.filterData}
          Visible={FilterisVisible}
          setIsVisible={setFilterisVisible}
        />
      </View>
    </View>
  );
};

export default EmployeeView;
