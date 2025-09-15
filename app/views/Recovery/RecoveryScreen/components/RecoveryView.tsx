import React from "react";
import { FlatList, View } from "react-native";
import images from "../../../../assets/images";
import EmptyListScreen from "../../../../components/CommonScreen/EmptyListScreen";
import Header from "../../../../components/Header";
import strings from "../../../../components/utilities/Localization";
import { PRIMARY_THEME_COLOR } from "../../../../components/utilities/constant";
import RecoveryListIem from "./RecoveryListIem";
import styles from "./styles";

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
removeClippedSubviews={false}
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
