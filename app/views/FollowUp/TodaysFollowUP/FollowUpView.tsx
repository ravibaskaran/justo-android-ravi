import { useNavigation } from "@react-navigation/native";
import React from "react";
import { FlatList, Text, View } from "react-native";
import images from "../../../assets/images";
import EmptyListScreen from "../../../components/CommonScreen/EmptyListScreen";
import Header from "../../../components/Header";
import strings from "../../../components/utilities/Localization";
import FollowUpItem from "../FollowUpScreen/Components/FollowUpItem";
import styles from "./Styles";

const FollowUpView = (props: any) => {
  const loadingref = false;
  const navigation: any = useNavigation();
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
    props.getFollowupList();
    props.setFollowUpList([]);
  };
  return (
    <View style={styles.mainContainer}>
      <Header
        leftImageSrc={images.menu}
        rightSecondImageScr={images.notification}
        headerText={strings.todayApp + " " + strings.followupHeader}
        handleOnLeftIconPress={props.handleDrawerPress}
        headerStyle={styles.headerStyle}
        RightFirstIconStyle={styles.RightFirstIconStyle}
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
        />
      </View>
    </View>
  );
};

export default FollowUpView;
