import { View, Text } from 'react-native'
import React, { useEffect, useLayoutEffect, useState } from 'react'
import LeadDetailsView from './Components/LeadDetailsView'
import { useDispatch, useSelector } from 'react-redux'
import { getVisitorDetail } from 'app/Redux/Actions/LeadsActions'

const LeadDetails = ({ navigation, route }: any) => {
  const dispatch: any = useDispatch()
  const { response = {}, detail = "" } = useSelector((state: any) => state.visitorData)
  const [allDetails, setAllDetails] = useState({})
  const data = route?.params || 0
  useLayoutEffect(() => {
    if (data._id) {
      dispatch(getVisitorDetail({
        lead_id: data._id
      }))
    }
  }, [detail])

  useEffect(() => {
    if (response?.status === 200) {
      setAllDetails(response?.data[0])
    }else {
      setAllDetails([])
    }
  }, [response])
  const handleBackPress = () => {
    navigation.goBack()
  }
  const handleStatusUpdate = () => {
    navigation.navigate('FollUpAdd', data)
  }
  const handleScheduleVisit = () => {
    navigation.navigate('AddAppointmentForSite',{item: allDetails, type: 'Add'})
  }
  return (
    <LeadDetailsView
      handleStatusUpdate={handleStatusUpdate}
      handleScheduleVisit={handleScheduleVisit}
      handleBackPress={handleBackPress}
      allDetails={allDetails}
    />
  )
}

export default LeadDetails