import { View, Text, ScrollView, FlatList } from "react-native";
import React from "react";
import Header from "app/components/Header";
import styles from "./styles";
import images from "app/assets/images";
import strings from "app/components/utilities/Localization";
import InventoryItem from "./InventoryItem";
import EmptyListScreen from "app/components/CommonScreen/EmptyListScreen";

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
