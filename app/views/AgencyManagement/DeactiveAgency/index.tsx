import { useFocusEffect } from '@react-navigation/native'
import { getCpActiveLead } from '../../../Redux/Actions/TransferVisitAction'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import LeadManagementView from './Components/LeadManagementView'

const DeactiveAgency = ({ navigation, route }: any) => {
  const dispatch: any = useDispatch()
  const {data} = route?.params || {}
  const { response = {}, list = "" } = useSelector((state: any) => state.transferVisitData)
  const moreData = response?.total_data || 0
  const [filterData, setFilterData] = useState({
    startdate: '',
    enddate: '',
    search_by_visisor_name: '',
    search_configuration: '',
    visit_score: ''
  })
  const [visitorList, setVisiitorList] = useState<any>([])
  const [offSET, setOffset] = useState(0)

  useFocusEffect(
    React.useCallback(() => {
      getVisitorsList(0, {})
      return () => { };
    }, [navigation])
  );

  useEffect(() => {
    if (list) {
      if (offSET === 0 || offSET === undefined) {
        setVisiitorList(response?.data)
      } else {
        setVisiitorList([...visitorList, ...response?.data])
      }
    }
  }, [response])

  const getVisitorsList = (offset: any, filterData: any) => {
    setOffset(offset)
    dispatch(getCpActiveLead({
      user_id: data?._id
    }))
  }
  const handleBackPress = () => {
    navigation.goBack();
  };
  return (
    <LeadManagementView
      handleBackPress={handleBackPress}
      visitorList={visitorList}
      moreData={moreData}
      getVisitorsList={getVisitorsList}
      smData={data}
    />
  )
}

export default DeactiveAgency