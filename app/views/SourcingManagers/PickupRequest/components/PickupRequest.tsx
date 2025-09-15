import React from "react";
import { FlatList, View } from "react-native";
import images from "../../../../assets/images";
import EmptyListScreen from "../../../../components/CommonScreen/EmptyListScreen";
import Header from "../../../../components/Header";
import FilterModal from "../../../../components/Modals/FilterModal";
import { PRIMARY_THEME_COLOR } from "../../../../components/utilities/constant";
import strings from "../../../../components/utilities/Localization";
import PickupRequestsList from "./PickupRequestsList";
import styles from "./styles";
import UpdateStatusModal from "./UpdateStatusModal";

const PickupRequestView = (props: any) => {
  return (
    <View style={styles.mainContainer}>
      <Header
        leftImageSrc={images.menu}
        // rightFirstImageScr={images.filter}
        rightSecondImageScr={images.notification}
        headerText={strings.PickuprequestHeader}
        handleOnLeftIconPress={props.handleDrawerPress}
        handleOnRightFirstIconPress={() => props.setFilterisVisible(true)}
        headerStyle={styles.headerStyle}
        RightFirstIconStyle={styles.RightFirstIconStyle}
        barStyle={"light-content"}
        statusBarColor={PRIMARY_THEME_COLOR}
      />
      <View style={styles.propertyListView}>
        <FlatList
removeClippedSubviews={false}
          data={props?.DATA}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => (
            <PickupRequestsList setIsVisible={props.setIsVisible} items={item} setAppointId={props.setAppointId} />
          )}
          onRefresh={() => props.onRefresh()}
          refreshing={false}
          ListEmptyComponent={() => (
            <EmptyListScreen message={strings.PickuprequestHeader} />
          )}
        />
      </View>
      <FilterModal
        Visible={props.filterisVisible}
        setIsVisible={props.setFilterisVisible}
      />
      <UpdateStatusModal
        Visible={props.isVisible}
        setIsVisible={() => props.setIsVisible(false)}
        updatePickupStatus={props.updatePickupStatus}
        // setDropLocation={setDropLocation}
        // handleDropLocation={handleDropLocation}
      />
    </View>
  );
};
export default PickupRequestView;
