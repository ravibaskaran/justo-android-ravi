import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { FlatList, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useDispatch, useSelector } from "react-redux";
import images from "../../../../assets/images";
import Button from "../../../../components/Button";
import EmptyListScreen from "../../../../components/CommonScreen/EmptyListScreen";
import Header from "../../../../components/Header";
import { PRIMARY_THEME_COLOR } from "../../../../components/utilities/constant";
import strings from "../../../../components/utilities/Localization";
import { removeTransferVisit } from "../../../../Redux/Actions/TransferVisitAction";
import LeadManagementItem from "./LeadManagementItem";
import FilterModal from "./LeadManagementModal";
import styles from "./Styles";

const LeadManagementView = (props: any) => {
  const loadingref = false;
  const dispatch: any = useDispatch();
  const insets = useSafeAreaInsets();
  const navigation: any = useNavigation();
  const [FilterisVisible, setFilterisVisible] = useState(false);
  const transferResponse =
  useSelector((state: any) => state.transferVisitorData) || {};

  const onRefresh = () => {
    props.getVisitorsList(0, {});
  };

  useEffect(() => {
    if (transferResponse?.response?.status === 200) {
      navigation.navigate("AgencyListing");
      dispatch(removeTransferVisit());
    }
  }, [transferResponse]);

  const onPressView = (data: any) => {
    navigation.navigate("LeadDetails", data);
  };
  return (
    <View style={styles.mainContainer}>
      <Header
        leftImageSrc={images.backArrow}
        // rightFirstImageScr={images.filter}
        // rightSecondImageScr={images.notification}
        leftImageIconStyle={styles.RightFirstIconStyle}
        headerText={strings.agencyDeactiveHeader}
        handleOnLeftIconPress={props.handleBackPress}
        headerStyle={styles.headerStyle}
        RightFirstIconStyle={styles.RightFirstIconStyle}
        handleOnRightFirstIconPress={() => setFilterisVisible(true)}
        statusBarColor={PRIMARY_THEME_COLOR}
        barStyle={"light-content"}
      />
      <View style={styles.propertyListView}>
        <FlatList
removeClippedSubviews={false}
          data={props?.visitorList}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => (
            <LeadManagementItem items={item} onPressView={onPressView} />
          )}
          ListEmptyComponent={() => (
            <EmptyListScreen message={strings.visitor} />
          )}
          onEndReached={() => {
            if (props?.visitorList?.length < props?.moreData) {
              props.getVisitorsList(
                props?.visitorList?.length > 2 ? props.offSET + 1 : 0,
                props.filterData
              );
            }
          }}
          onRefresh={() => onRefresh()}
          refreshing={loadingref}
        />
      </View>
      <View style={{ marginVertical: 20 }}>
        <Button
          width={135}
          handleBtnPress={() => {
            setFilterisVisible(true);
          }}
          buttonText={strings.transferVisit}
        />
      </View>
      {/* <ConfirmModal Visible={isVisible} setIsVisible={setIsVisible} /> */}
      <FilterModal
        Visible={FilterisVisible}
        setIsVisible={setFilterisVisible}
        smData={props?.smData}
      />
    </View>
  );
};

export default LeadManagementView;
