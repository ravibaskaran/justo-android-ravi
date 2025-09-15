import React from "react";
import { FlatList, View } from "react-native";
import images from "../../../../assets/images";
import EmptyListScreen from "../../../../components/CommonScreen/EmptyListScreen";
import Header from "../../../../components/Header";
import strings from "../../../../components/utilities/Localization";
import InventoryItem from "./InventoryItem";
import styles from "./styles";

const PropertyinventoryView = (props: any) => {
  return (
    <View style={styles.mainContainer}>
      <Header
        leftImageSrc={images.backArrow}
        rightSecondImageScr={images.notification}
        headerText={strings.availableinventory}
        headerStyle={styles.headerStyle}
        RightFirstIconStyle={styles.leftImageIconStyle}
        leftImageIconStyle={styles.leftImageIconStyle}
        handleOnLeftIconPress={props.handleBackPress}
        rightFirstImageScr={images.filter}
        handleOnRightFirstIconPress={() => props.setFilterisVisible(true)}
      />
      {/* <ScrollView> */}
        {/* {props.inventory.map((item: any) => {
          return <InventoryItem item={item} />;
        })} */}
        <FlatList
removeClippedSubviews={false}
          data={props.inventory}
          renderItem={({item}: any) => {
            return <InventoryItem item={item} />;
          }}
          ListEmptyComponent={() => <EmptyListScreen message={"Inventory not available in Justoworks"} notShowNA={true}/>}
          onRefresh={() => props.onRefresh()}
          refreshing={props.loadingref}
        />
      {/* </ScrollView> */}
    </View>
  );
};

export default PropertyinventoryView;
