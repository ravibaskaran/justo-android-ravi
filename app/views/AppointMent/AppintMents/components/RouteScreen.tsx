import EmptyListScreen from "../../../../components/CommonScreen/EmptyListScreen";
import strings from "../../../../components/utilities/Localization";
import React from "react";
import { FlatList, Text, View } from "react-native";
import AppointmentsItem from "./AppointmentsItem";
import styles from "./styles";

const RouteScreen = (props: any) => {
  return (
    <View>
      <Text style={styles.count}>
        Count : {props?.moreData ? props?.moreData : 0}
      </Text>
      <FlatList
removeClippedSubviews={false}
        data={Array.isArray(props.DATA) ? props.DATA : []}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <EmptyListScreen
            message={
              (props?.index === 0 ? "Today " : "") + strings.appointmentHeader
            }
          />
        }
        renderItem={({ item }) => (
          <AppointmentsItem
            items={item}
            onPressView={props.onPressView}
            setappointmentid={props.setappointmentid}
            setAllocateModel={props.setAllocateModel}
            setLocationModel={props.setLocationModel}
            setAllocatedCM={props.setAllocatedCM}
            allocatedCM={props.allocatedCM}
            getCMList={props.getCMList}
          />
        )}
        refreshing={false}
        onRefresh={() => {
          props.settype("");
          props.getAppointmentList(
            0,
            props.keyType === "first" ? props.todayAppointment : {}
          );
          props.setFilterData({
            start_date: "",
            end_date: "",
            customer_name: "",
            customer_number:"",
            status: "",
            qualified: "",
            lead_priority: "",
          });
          props.setAppointmentList([]);
        }}
        onEndReached={() => {
          if (props?.DATA?.length < props?.moreData) {
            props.getAppointmentList(
              props?.DATA?.length > 2 ? props.offSET + 1 : 0,
              props.keyType === "first"
                ? props.todayAppointment
                : props.filterData
            );
          }
        }}
      />
    </View>
  );
};

export default RouteScreen;
