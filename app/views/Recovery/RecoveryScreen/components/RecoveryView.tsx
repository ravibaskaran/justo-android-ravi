import { View, Text, FlatList } from "react-native";
import React from "react";
import styles from "./styles";
import Header from "app/components/Header";
import images from "app/assets/images";
import strings from "app/components/utilities/Localization";
import { PRIMARY_THEME_COLOR } from "app/components/utilities/constant";
import RecoveryListIem from "./RecoveryListIem";
import EmptyListScreen from "app/components/CommonScreen/EmptyListScreen";

const RecoveryView = (props: any) => {
  const loadingref = false
  const onRefresh = () => {
    props.getRecoveryListData(0, {});
  };
  return (
    <View style={styles.mainContainer}>
      <Header
        leftImageSrc={images.menu}
        // rightFirstImageScr={images.filter}
        // rightSecondImageScr={images.notification}
        headerText={strings.recoveryHeader}
        handleOnLeftIconPress={props.handleDrawerPress}
        headerStyle={styles.headerStyle}
        RightFirstIconStyle={styles.RightFirstIconStyle}
        statusBarColor={PRIMARY_THEME_COLOR}
        barStyle={"light-content"}
      />
      <View style={styles.listView}>
        <FlatList
          data={Array.isArray(props.recoveryList) ? props.recoveryList : []}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={
            <EmptyListScreen message={strings.recoveryHeader} />
          }
          renderItem={({ item }) => (
            <RecoveryListIem items={item} onPressView={props.onPressView} />
          )}
          onEndReached={() => {
            if (props?.recoveryList?.length < props?.moreData) {
              props.getRecoveryListData(
                props?.recoveryList?.length > 4 ? props.offSET + 1 : 0,
                {}
              );
            }
          }}
          refreshing={loadingref}
          onRefresh={() => onRefresh()}

        />
      </View>
    </View>
  );
};

export default RecoveryView;
