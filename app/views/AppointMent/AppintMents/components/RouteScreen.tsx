import { View, Text, FlatList } from "react-native";
import React from "react";
import EmptyListScreen from "app/components/CommonScreen/EmptyListScreen";
import strings from "app/components/utilities/Localization";
import AppointmentsItem from "./AppointmentsItem";
import styles from "./styles";

const RouteScreen = (props: any) => {
  return (
    <View>
      <Text style={styles.count}>
        Count : {props?.DATA?.length}
      </Text>
      <FlatList
        data={Array.isArray(props.DATA) ? props.DATA : []}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <EmptyListScreen message={strings.todayappointment} />
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
            status: "",
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
