import React from "react";
import { FlatList, View } from "react-native";
import images from "../../../../assets/images";
import EmptyListScreen from "../../../../components/CommonScreen/EmptyListScreen";
import Header from "../../../../components/Header";
import BookingListItem from "./BookingListItem";
import styles from "./styles";

const BookingCTAView = (props: any) => {
  return (
    <View style={styles.mainContainer}>
      <Header
        leftImageSrc={images.backArrow}
        headerText={"Booking"}
        handleOnLeftIconPress={props.handleBackPress}
        leftImageIconStyle={styles.RightFirstIconStyle}
        headerStyle={styles.headerStyle}
        rightSecondImageScr={images.notification}
      />
      <View style={styles.listView}>
        <FlatList
removeClippedSubviews={false}
          data={Array.isArray(props.DATA) ? props.DATA : []}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={<EmptyListScreen message={"Booking"} />}
          renderItem={({ item }) => <BookingListItem items={item} />}
          // onEndReached={() => {
          //   if (props?.DATA?.length < props?.moreData) {
          //     props.getBookingLits(
          //       props?.DATA?.length > 2 ? props.offSET + 1 : 0,
          //       props?.filterData
          //     );
          //   }
          // }}
          // refreshing={false}
          // onRefresh={() => {
          //   props.navigation.setParams({onpressType: ''})
          //   props.setDatatype("");
          //   props.getBookingLits(0);
          //   props.setBookingList([]);
          //   props.setFilterData({
          //     start_date: "",
          //     end_date: "",
          //     status: "",
          //     customer_name: ""
          //   });
          // }}
        />
      </View>
      {/* <BookingFilterModal
        setIsVisible={setisVisable}
        Visible={isVisable}
        filterData={props.filterData}
        setFilterData={props.setFilterData}
        type={props?.type}
        getBookingLits={props.getBookingLits}
        onReset={onReset}
      /> */}
    </View>
  );
};

export default BookingCTAView;
