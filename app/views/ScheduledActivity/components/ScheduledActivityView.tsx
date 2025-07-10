import React, { useState } from "react";
import { FlatList, Text, View } from "react-native";
import { TabBar, TabView } from "react-native-tab-view";
import { useDispatch } from "react-redux";

import images from "app/assets/images";
import EmptyListScreen from "app/components/CommonScreen/EmptyListScreen";
import Header from "app/components/Header";
import strings from "app/components/utilities/Localization";
import {
  PRIMARY_THEME_COLOR,
  PRIMARY_THEME_COLOR_DARK,
  TABBAR_COLOR,
} from "app/components/utilities/constant";
import ActivityItem from "./ActivityItem";
import CloseModal from "./CloseModal";
import FilterModal from "./FilterModal";
import styles from "./styles";
import { closeFollowUp } from "app/Redux/Actions/ActivityActions";

const ScheduledActivityView = ({
  flatListRef,
  activityList,
  totalItems,
  offset,
  filterData,
  tabIndex,
  routes,
  layoutWidth,
  fromReport = false,
  onTabChange,
  setFilterData,
  fetchActivities,
  onDrawerPress,
}: any) => {
  const dispatch: any = useDispatch();
  const [isFilterVisible, setFilterVisible] = useState(false);
  const [isCloseModalVisible, setCloseModalVisible] = useState(false);
  const [closeParams, setCloseParams] = useState({ id: "", remark: "" });

  const handleRefresh = () => {
    const cleared = { ...filterData, startDate: "", endDate: "", due: false };
    setFilterData(cleared);
    fetchActivities(0, cleared);
  };

  const handleEndReached = () => {
    if (activityList.length < totalItems) {
      fetchActivities(offset + 1, filterData);
    }
  };

  const onPressClose = (item: any) => {
    setCloseParams({ id: item._id, remark: "" });
    setCloseModalVisible(true);
  };

  const handleConfirmClose = async () => {
    setCloseModalVisible(false);
    await dispatch(
      closeFollowUp({ _id: closeParams.id, closing_remark: closeParams.remark })
    );
  };

  const renderScene = () => (
    <FlatList
      data={activityList}
      ref={flatListRef}
      showsVerticalScrollIndicator={false}
      keyExtractor={(item, idx) => item.id || idx.toString()}
      renderItem={({ item }) => (
        <ActivityItem
          items={item}
          onPressClose={onPressClose}
          active={tabIndex == 0}
        />
      )}
      ListEmptyComponent={<EmptyListScreen message={strings.visitor} />}
      onEndReached={handleEndReached}
      onEndReachedThreshold={0.5}
      onRefresh={handleRefresh}
      refreshing={false}
    />
  );

  const renderTabBar = (props: any) => (
    <TabBar
      {...props}
      activeColor={TABBAR_COLOR}
      indicatorStyle={{ borderWidth: 2, borderColor: TABBAR_COLOR }}
      style={{ backgroundColor: PRIMARY_THEME_COLOR_DARK }}
    />
  );

  return (
    <View style={styles.mainContainer}>
      <Header
        leftImageSrc={fromReport ? images.backArrow : images.menu}
        rightFirstImageScr={images.filter}
        rightSecondImageScr={images.notification}
        headerText={strings.scheduledActivity}
        handleOnLeftIconPress={onDrawerPress}
        handleOnRightFirstIconPress={() => setFilterVisible(true)}
        headerStyle={styles.headerStyle}
        leftImageIconStyle={styles.RightFirstIconStyle}
        RightFirstIconStyle={styles.RightFirstIconStyle}
        statusBarColor={PRIMARY_THEME_COLOR}
        barStyle="light-content"
      />

      <Text style={styles.count}>Count: {totalItems}</Text>

      <TabView
        navigationState={{ index: tabIndex, routes }}
        renderScene={renderScene}
        renderTabBar={renderTabBar}
        onIndexChange={onTabChange}
        initialLayout={{ width: layoutWidth }}
        style={{ flex: 1 }}
      />

      <FilterModal
        visible={isFilterVisible}
        onClose={() => setFilterVisible(false)}
        filterData={filterData}
        setFilterData={setFilterData}
        fetchActivities={fetchActivities}
        onRefresh={handleRefresh}
      />

      <CloseModal
        visible={isCloseModalVisible}
        onClose={() => setCloseModalVisible(false)}
        params={closeParams}
        setParams={setCloseParams}
        onConfirm={handleConfirmClose}
      />
    </View>
  );
};

export default ScheduledActivityView;
