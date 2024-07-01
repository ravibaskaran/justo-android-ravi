import React, { useEffect, useLayoutEffect, useState } from 'react'
import FollowUpDetailsView from './Components/FollowUpDetailsView'
import { useDispatch, useSelector } from 'react-redux'
import { useFocusEffect } from '@react-navigation/native'
import { getAllFollowUpDetails } from 'app/Redux/Actions/FollowUpActions'

const FollowUpDetails = ({ navigation, route }: any) => {
  const followUpId = route?.params || ''
  const [isloading, setIsloading] = useState(false)
  const { response = {}, detail = "" } = useSelector((state: any) => state.followUp)


  const dispatch: any = useDispatch()
  const handleBackPress = () => {
    navigation.goBack()
  }
  const handleStatusUpdate = () => {
    navigation.navigate('FollUpAdd', followUpId)
  }

  useFocusEffect(
    React.useCallback(() => {
      if (followUpId?._id) {
        setIsloading(true)
        dispatch(getAllFollowUpDetails({ followup_id: followUpId?._id }))
        toGetDatas()
      }
      return () => { };
    }, [navigation, detail]))

  const toGetDatas = () => {
    if (response?.status) {
      setIsloading(false)
      // setAllDetails(response.data[0])
    }
  }

  return (
    <>
      <FollowUpDetailsView handleBackPress={handleBackPress} handleStatusUpdate={handleStatusUpdate} />
    </>
  )
}

export default FollowUpDetails