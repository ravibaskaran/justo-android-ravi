import { useFocusEffect } from '@react-navigation/native'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getTicketDetails } from '../../../Redux/Actions/SupportActions'
import SupportDetailsView from './Components/SupportDetailsView'

const SupportScreenDetails = ({ navigation, route }: any) => {
    const {ticketid, type} = route?.params || {}
    const dispatch: any = useDispatch()
    const [ticketDetailsData, setTicketDetailsData] = useState([])
    const { response = {}, detail= false } = useSelector((state: any) => state.SupportData) || []

    useFocusEffect(
        React.useCallback(() => {
            dispatch(getTicketDetails({
                ticket_id: ticketid?._id
            }))
            return () => { };
        }, [navigation, detail])
    )

    useEffect(() => {
        if (response?.status === 200) {
            if (ticketid?._id !== '') {
                setTicketDetailsData(response?.data)
            }else {
                setTicketDetailsData([])
            }
        }else {
            setTicketDetailsData([])
        }
    }, [response])

    const handleBackPress = () => {
        navigation.goBack()
    }
    const onPressReply = () => {
        navigation.navigate('ShowReply')
    }
    const onPressStatusUpdate = () => {
        navigation.navigate('TicketStatusUpdate', {data: ticketDetailsData})
    }
    const onPressEscalate = (data: any) => {
        navigation.navigate('Escalate', data)
    }
    return (
        <SupportDetailsView
            handleBackPress={handleBackPress}
            ticketDetailsData={ticketDetailsData}
            type={type}
            onPressReply={onPressReply}
            onPressStatusUpdate={onPressStatusUpdate}
            onPressEscalate={onPressEscalate}
        />
    )
}

export default SupportScreenDetails