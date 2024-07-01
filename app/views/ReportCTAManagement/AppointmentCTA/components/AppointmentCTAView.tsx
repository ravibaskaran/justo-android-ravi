import { View, Text, FlatList } from "react-native";
import React from "react";
import styles from "./styles";
import Header from "app/components/Header";
import images from "app/assets/images";
import EmptyListScreen from "app/components/CommonScreen/EmptyListScreen";
import AppointmentListItem from "./AppointmentListItem";

const AppointmentCTAView = (props: any) => {
  return (
    <View style={styles.mainContainer}>
      <Header
        leftImageSrc={images.backArrow}
        headerText={"Appointment"}
        handleOnLeftIconPress={props.handleBackPress}
        leftImageIconStyle={styles.RightFirstIconStyle}
        headerStyle={styles.headerStyle}
        rightSecondImageScr={images.notification}
      />
      <View style={styles.listView}>
        <FlatList
          data={Array.isArray(props.DATA) ? props.DATA : []}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={<EmptyListScreen message={"Appointment"} />}
          renderItem={({ item }) => <AppointmentListItem items={item} />}
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
    </View>
  );
};

export default AppointmentCTAView;
