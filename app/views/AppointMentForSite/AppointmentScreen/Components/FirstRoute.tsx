import { View, Text, FlatList } from 'react-native'
import React from 'react'
import AppointMentForSiteList from './AppointMentForSiteList'
import EmptyListScreen from 'app/components/CommonScreen/EmptyListScreen'

const FirstRoute = (props: any) => {
    return (
        <FlatList
            data={props.siteAppointments}
            showsVerticalScrollIndicator={false}
            renderItem={({ item }) => <AppointMentForSiteList items={item}
                onPressView={() => props.onPressView(item)}
                onEditPress={() => props.onPressAddNew('edit', item)}
            />}
            ListEmptyComponent={
                <EmptyListScreen message={'Appointment'} />}
            onRefresh={() => {
                props.settype('')
                props.setFilterData({
                    appointment_with: '',
                    status: '',
                    start_date: '',
                    end_date: '',
                    customer_name: '',
                    property_name: ''
                })
                props.getAppointmentList(0, props.keyType === 'first' ? props.todayAppointment : {})
                props.setSiteAppointments([])
            }}
            refreshing={false}
            onEndReached={() => {
                if (props?.siteAppointments?.length < props?.moreData) {
                    props.getAppointmentList(props?.siteAppointments?.length >= 3 ?
                        props.offSET + 1 : 0,
                            props.keyType === 'first' ? props.todayAppointment : props.filterData)
                }
            }}
        />
    )
}

export default FirstRoute