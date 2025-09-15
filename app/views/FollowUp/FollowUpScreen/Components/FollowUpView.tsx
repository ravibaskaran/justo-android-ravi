import { useNavigation } from "@react-navigation/native";
import EmptyListScreen from "../../../../components/CommonScreen/EmptyListScreen";
import React, { useState } from "react";
import { FlatList, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import images from "../../../../assets/images";
import Header from "../../../../components/Header";
import strings from "../../../../components/utilities/Localization";
import FollowUpItem from "./FollowUpItem";
import FilterModal from "./FollowUpModal";
import styles from "./Styles";

const FollowUpView = (props: any) => {
  const loadingref = false;
  const insets = useSafeAreaInsets();
  const navigation: any = useNavigation();
  const [FilterisVisible, setFilterisVisible] = useState(false);
  const onPressView = (id: any) => {
    navigation.navigate("FollowUpDetails", id);
  };
  const onPressEdit = (data: any) => {
    navigation.navigate("EditFollowUp", data);
  };
  const onPressAllFollowUp = (data: any) => {
    navigation.navigate("AllFollowUpScreen", data);
  };

  const onRefresh = () => {
    props.setFilterData({
      startdate: "",
      enddate: "",
      followup_for: "",
      lead_id: "",
      todayFollowup: false,
    });
    props.getFollowupList(0, {});
    props.setFollowUpList([]);
  };
  return (
    <View style={styles.mainContainer}>
      <Header
        leftImageSrc={images.menu}
        rightFirstImageScr={images.filter}
        rightSecondImageScr={images.notification}
        headerText={strings.followupHeader}
        handleOnLeftIconPress={props.handleDrawerPress}
        headerStyle={styles.headerStyle}
        RightFirstIconStyle={styles.RightFirstIconStyle}
        handleOnRightFirstIconPress={() => setFilterisVisible(true)}
      />

      <View style={styles.followupItemView}>
        <Text style={styles.count}>
          Count : {props?.moreData ? props?.moreData : 0}
        </Text>
        <FlatList
removeClippedSubviews={false}
          data={Array.isArray(props?.followUpList) ? props?.followUpList : []}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => (
            <FollowUpItem
              items={item}
              onPressView={onPressView}
              onPressEdit={onPressEdit}
              onPressAllFollowUp={onPressAllFollowUp}
            />
          )}
          onRefresh={() => onRefresh()}
          refreshing={loadingref}
          ListEmptyComponent={<EmptyListScreen message={strings.followup} />}
          onEndReached={() => {
            if (props?.followUpList?.length < props?.moreData) {
              props.getFollowupList(
                props?.followUpList?.length > 2 ? props.offSET + 1 : 0,
                props?.filterData
              );
            }
          }}
        />
      </View>
      <FilterModal
        Visible={FilterisVisible}
        setIsVisible={setFilterisVisible}
        setFilterData={props.setFilterData}
        filterData={props.filterData}
        getFollowupList={props.getFollowupList}
        onRefresh={onRefresh}
        setFollowUpList={props.setFollowUpList}
      />
    </View>
  );
};

export default FollowUpView;
