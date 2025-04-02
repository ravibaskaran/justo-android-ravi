import React, { useState } from "react";
import { View, Text, Image, FlatList } from "react-native";
import images from "../../../../assets/images";
import Header from "../../../../components/Header";
import strings from "../../../../components/utilities/Localization";
import styles from "./styles";
import BookingListItem from "./BookingListItem";
import EmptyListScreen from "app/components/CommonScreen/EmptyListScreen";
import { useSelector } from "react-redux";
import { ROLE_IDS, WHITE_COLOR } from "app/components/utilities/constant";
import Button from "app/components/Button";
import { normalizeSpacing } from "app/components/scaleFontSize";
import BookingFilterModal from "./BookingFilterModal";

const BookingListView = (props: any) => {
  const getLoginType = useSelector((state: any) => state.login);
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
        leftImageSrc={props.fromReport ? images.backArrow : images.menu}
        headerText={
          props?.type === "readyToBook"
            ? strings.readytoBookHeader
            : props?.type === "register"
            ? strings.registrationReqHead
            : strings.bookingRequestHead
        }
        leftImageIconStyle={{ tintColor: WHITE_COLOR }}
        handleOnLeftIconPress={props.handleDrawerPress}
        headerStyle={styles.headerStyle}
        rightSecondImageScr={images.notification}
        rightFirstImageScr={images.filter}
        RightFirstIconStyle={{ tintColor: WHITE_COLOR }}
        handleOnRightFirstIconPress={() => setisVisable(true)}
      />

      <View
        style={styles.subHeadContainer}
      >
        {!props.fromReport && (
          <View style={{}}>
            <Button
              width={120}
              height={40}
              buttonText={"Reset"}
              handleBtnPress={() => {
                props.navigation.setParams({ onpressType: "" });
                props.setDatatype("");
                onReset();
              }}
            />
          </View>
        )}
        <Text style={[styles.count, { textAlign: "right", flex: 1 }]}>
          Count : {props?.moreData ? props?.moreData : 0}
        </Text>
      </View>

      <View style={styles.listView}>
        <FlatList
          data={Array.isArray(props.DATA) ? props.DATA : []}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={
            <EmptyListScreen
              message={
                props?.type === "readyToBook"
                  ? strings.readytoBookHeader
                  : props?.type === "register"
                  ? strings.registrationHeader
                  : strings.bookingRequestHead
              }
            />
          }
          renderItem={({ item }) => (
            <BookingListItem
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
            props.navigation.setParams({ onpressType: "" });
            props.setDatatype("");
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
        type={props?.type}
        getBookingLits={props.getBookingLits}
        onReset={onReset}
      />
    </View>
  );
};
export default BookingListView;
