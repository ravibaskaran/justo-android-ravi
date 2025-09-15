import React, { useState } from "react";
import { FlatList, Text, View } from "react-native";
import images from "../../../../assets/images";
import EmptyListScreen from "../../../../components/CommonScreen/EmptyListScreen";
import Header from "../../../../components/Header";
import strings from "../../../../components/utilities/Localization";
import { PRIMARY_THEME_COLOR } from "../../../../components/utilities/constant";
import BookingFilterModal from "../../BookingList/components/BookingFilterModal";
import CancelBookingItems from "./CancelBookingItems";
import styles from "./styles";

const CancelBookingView = (props: any) => {
  const [isVisable, setisVisable] = useState(false);

  const onReset = () => {
    props.getBookingLits(0, []);
    setisVisable(false);
    props.setFilterData({
      start_date: "",
      end_date: "",
      status: "",
      customer_name: "",
    });
  };
  return (
    <View style={styles.mainContainer}>
      <Header
        leftImageSrc={images.menu}
        rightFirstImageScr={images.filter}
        rightSecondImageScr={images.notification}
        headerText={strings.cancelBooking}
        handleOnLeftIconPress={props.handleDrawerPress}
        headerStyle={styles.headerStyle}
        RightFirstIconStyle={styles.RightFirstIconStyle}
        statusBarColor={PRIMARY_THEME_COLOR}
        barStyle={"light-content"}
        handleOnRightFirstIconPress={() => setisVisable(true)}
      />
      <Text style={styles.count}>
        {" "}
        Count : {props?.moreData ? props?.moreData : 0}
      </Text>
      <View style={styles.listView}>
        <FlatList
removeClippedSubviews={false}
          data={Array.isArray(props.DATA) ? props.DATA : []}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={
            <EmptyListScreen message={strings.cancelBooking} />
          }
          renderItem={({ item }) => (
            <CancelBookingItems
              items={item}
              type={props?.type}
              onPressView={() => props.handleView(item)}
            />
          )}
          onEndReached={() => {
            if (props?.DATA?.length < props?.moreData) {
              props.getBookingLits(
                props?.DATA?.length > 2 ? props.offSET + 1 : 0,
                props?.filterData
              );
            }
          }}
          refreshing={false}
          onRefresh={() => {
            props.getBookingLits(0);
            props.setBookingList([]);
            props.setFilterData({
              start_date: "",
              end_date: "",
              status: "",
              customer_name: "",
            });
          }}
        />
      </View>
      <BookingFilterModal
        setIsVisible={setisVisable}
        Visible={isVisable}
        filterData={props.filterData}
        setFilterData={props.setFilterData}
        type={"cancel"}
        getBookingLits={props.getBookingLits}
        onReset={onReset}
      />
    </View>
  );
};

export default CancelBookingView;
