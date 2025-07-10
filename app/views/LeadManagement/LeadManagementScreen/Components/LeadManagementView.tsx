import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import { FlatList, Text, View } from "react-native";
import { TabBar, TabView } from "react-native-tab-view";

import Button from "app/components/Button";
import EmptyListScreen from "app/components/CommonScreen/EmptyListScreen";
import Header from "app/components/Header";
import {
  PRIMARY_THEME_COLOR,
  PRIMARY_THEME_COLOR_DARK,
  TABBAR_COLOR,
} from "app/components/utilities/constant";
import strings from "app/components/utilities/Localization";
import usePermission from "app/components/utilities/UserPermissions";
import images from "../../../../assets/images";
import LeadManagementItem from "./LeadManagementItem";
import FilterModal from "./LeadManagementModal";
import styles from "./Styles";

const LeadManagementView = (props: any) => {
  const navigation: any = useNavigation();
  const [filterIsVisible, setFilterIsVisible] = useState(false);
  const { create } = usePermission({ create: "add_visitor" });

  const onRefresh = () => {
    props.setFilterData((prev: any) => ({
      ...prev,
      startdate: "",
      enddate: "",
      search_by_visisor_name: "",
      search_by_mobile_number: "",
      search_configuration: "",
      visit_score: "",
      property_id: "",
      property_title: "",
      visit_status: "",
      lead_status: "",
      qualified: "",
      lead_priority: "",
      draft: prev.draft,
    }));
    props.setVisitorList([]);
    const args = props.params?.fromReport
      ? {
          startdate: props.params.sDate,
          enddate: props.params.eDate,
          draft: props.filterData.draft,
        }
      : { draft: props.filterData.draft };
    props.getVisitorsList(0, args);
  };

  const onPressView = (item: any) =>
    navigation.navigate("LeadDetails", { ...item, draft: props.index === 1 });

  const handleEdit = (item: any) =>
    navigation.navigate(
      props.index === 0 ? "VisitorUpdate" : "DraftVisitorUpdate",
      item
    );

  const onPressCreateVisit = () => navigation.navigate("AddNewVisitorScreen");

  const renderVisitorList = () => (
    <FlatList
      data={props.visitorList}
      ref={props.flatListRef}
      showsVerticalScrollIndicator={false}
      renderItem={({ item }) => (
        <LeadManagementItem
          items={item}
          onPressView={onPressView}
          handleEdit={handleEdit}
          isDraft={props.index === 1}
        />
      )}
      ListEmptyComponent={() => <EmptyListScreen message={strings.visitor} />}
      onEndReached={() => {
        if (props.visitorList.length < props.moreData) {
          // ALWAYS increment your page index here
          props.getVisitorsList(props.offSET + 1, props.filterData);
        }
      }}
      onEndReachedThreshold={0.5}
      onRefresh={onRefresh}
      refreshing={false}
      // keep scroll stable when appending (RN ≥0.63)
    />
  );

  // inline renderScene to avoid unmount on each update
  const renderScene = ({ route }: any) => (
    <View style={{ flex: 1 }}>{renderVisitorList()}</View>
  );

  const renderTabBar = (barProps: any) => (
    <TabBar
      {...barProps}
      activeColor={TABBAR_COLOR}
      indicatorStyle={{ borderWidth: 2, borderColor: TABBAR_COLOR }}
      style={{ backgroundColor: PRIMARY_THEME_COLOR_DARK }}
    />
  );

  return (
    <View style={styles.mainContainer}>
      <Header
        leftImageSrc={props.params?.fromReport ? images.backArrow : images.menu}
        rightFirstImageScr={images.filter}
        rightSecondImageScr={images.notification}
        headerText={strings.visitor}
        handleOnLeftIconPress={props.handleDrawerPress}
        handleOnRightFirstIconPress={() => setFilterIsVisible(true)}
        headerStyle={styles.headerStyle}
        leftImageIconStyle={styles.RightFirstIconStyle}
        RightFirstIconStyle={styles.RightFirstIconStyle}
        statusBarColor={PRIMARY_THEME_COLOR}
        barStyle={"light-content"}
      />

      <Text style={styles.count}>Count : {props.moreData || 0}</Text>

      {props.index === 0 && (
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            marginBottom: 5,
          }}
        >
          <Button
            height={30}
            width={150}
            buttonText={strings.resetFilter}
            handleBtnPress={() => props.getVisitorsList(0, { draft: false })}
          />
          {create && (
            <Button
              height={30}
              width={160}
              buttonText="Add New Visit"
              handleBtnPress={onPressCreateVisit}
            />
          )}
        </View>
      )}

      <TabView
        navigationState={{ index: props.index, routes: props.routes }}
        renderScene={renderScene}
        onIndexChange={props.setIndex}
        initialLayout={{ width: props.layout.width }}
        renderTabBar={renderTabBar}
        style={{ flex: 1 }}
      />

      <FilterModal
        Visible={filterIsVisible}
        setIsVisible={setFilterIsVisible}
        setFilterData={props.setFilterData}
        filterData={props.filterData}
        setVisiitorList={props.setVisitorList}
        getVisitorsListApi={props.getVisitorsList}
        getVisitorsList={() => {
          props.getVisitorsList(0, props.filterData);
          props.flatListRef?.current?.scrollToOffset({
            offset: 0,
            animated: true,
          });
        }}
        flatListRef={props.flatListRef}
      />
    </View>
  );
};

export default LeadManagementView;
