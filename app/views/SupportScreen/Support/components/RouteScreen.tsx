import { View, Text, FlatList } from 'react-native'
import React from 'react'
import SupportItem from './SupportItem';
import EmptyListScreen from 'app/components/CommonScreen/EmptyListScreen';
import strings from 'app/components/utilities/Localization';

const RouteScreen = (props: any) => {
    return (
        <FlatList
            data={Array.isArray(props.ticketList) ? props.ticketList : []}
            renderItem={({ item }) => (
                <SupportItem
                    items={item} index={props.indexData?.index}
                    onPressView={props.onPressView}
                    handleEditTicket={props.handleEditTicket}
                    onPressStatusUpdate={props.onPressStatusUpdate}
                    onPressEscalate={props.onPressEscalate}
                />
            )}
            ListEmptyComponent={
                <EmptyListScreen message={strings.myticket} />
            }
            onRefresh={() => {
                props.setFilterData({
                    start_date: "",
                    end_date: "",
                    customer_name: "",
                    status: "",
                });
                props.TicketList(0, { type: props.keyType === 'first' ? 2 : 1 });
            }}
            onEndReached={() => {
                if (props.indexData?.index === 1) {
                    if (props.ticketList?.length < props.totalData) {
                        props.TicketList(
                            props.ticketList?.length > 2 ? props.offSET + 1 : 0,
                            { type: props.keyType === 'first' ? 2 : 1 }
                        );
                    }
                }
            }}
            refreshing={false}
        />
    )
}

export default RouteScreen