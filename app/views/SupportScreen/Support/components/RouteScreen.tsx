import React from "react";
import { FlatList, Text, View } from "react-native";
import EmptyListScreen from "../../../../components/CommonScreen/EmptyListScreen";
import strings from "../../../../components/utilities/Localization";
import styles from "./styles";
import SupportItem from "./SupportItem";

const RouteScreen = (props: any) => {
  return (
    <View>
      <Text style={styles.count}>
        Count : {props?.totalData ? props?.totalData : 0}
      </Text>
      <FlatList
removeClippedSubviews={false}
        data={Array.isArray(props.ticketList) ? props.ticketList : []}
        renderItem={({ item }) => (
          <SupportItem
            items={item}
            index={props.indexData?.index}
            onPressView={props.onPressView}
            handleEditTicket={props.handleEditTicket}
            onPressStatusUpdate={props.onPressStatusUpdate}
            onPressEscalate={props.onPressEscalate}
          />
        )}
        ListEmptyComponent={<EmptyListScreen message={strings.myticket} />}
        onRefresh={() => {
          props.setFilterData({
            start_date: "",
            end_date: "",
            customer_name: "",
            status: "",
          });
          props.TicketList(0, { type: props.keyType === "first" ? 2 : 1 });
        }}
        onEndReached={() => {
          if (props.indexData?.index === 1) {
            if (props.ticketList?.length < props.totalData) {
              props.TicketList(
                props.ticketList?.length > 2 ? props.offSET + 1 : 0,
                { type: props.keyType === "first" ? 2 : 1 }
              );
            }
          }
        }}
        refreshing={false}
      />
    </View>
  );
};

export default RouteScreen;
