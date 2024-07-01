import { View, Text, FlatList } from "react-native";
import React, { useState } from "react";
import styles from "./styles";
import Header from "app/components/Header";
import images from "app/assets/images";
import strings from "app/components/utilities/Localization";
import { PRIMARY_THEME_COLOR } from "app/components/utilities/constant";
import EmptyListScreen from "app/components/CommonScreen/EmptyListScreen";
import CancelBookingItems from "./CancelBookingItems";
import BookingFilterModal from "../../BookingList/components/BookingFilterModal";

const CancelBookingView = (props: any) => {
    const [isVisable, setisVisable] = useState(false);

    const onReset = () => {
      props.getBookingLits(0, []);
      setisVisable(false);
      props.setFilterData({
        start_date: "",
        end_date: "",
        status: "",
        customer_name: ""
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
      <View style={styles.listView}>
        <FlatList
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
              customer_name: ""
            });
          }}
        />
      </View>
      <BookingFilterModal
        setIsVisible={setisVisable}
        Visible={isVisable}
        filterData={props.filterData}
        setFilterData={props.setFilterData}
        type={'cancel'}
        getBookingLits={props.getBookingLits}
        onReset={onReset}
      />
    </View>
  );
};

export default CancelBookingView;
