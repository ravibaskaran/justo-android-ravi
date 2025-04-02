import { StyleSheet, Text, View, Alert } from 'react-native'
import React, { useLayoutEffect, useState } from 'react'
import PropertyDetailView from './components/PropertyDetailView';
import { useDispatch, useSelector } from 'react-redux';
import { getManagerList, getPropertyDetail } from '../../../Redux/Actions/propertyActions';
import { propertyBackSubject } from 'app/observables/backNavigationSubject';

const PropertyDetails = ({ navigation, route }: any) => {
  const [isloading, setIsloading] = useState(false)
  const dispatch: any = useDispatch()
  const data = route?.params || {}
  useLayoutEffect(() => {
    setIsloading(true)
    dispatch(getPropertyDetail({
      property_id: data.property_id
    }))
  }, [])
  const handleBackPress = () => {
    propertyBackSubject.next(true);
    navigation.goBack();
  };
  const onPressCreatevisit = () => {
    navigation.navigate('AddNewVisitorScreen')
  };
  const handleAllocatePress = () => {
    dispatch(getManagerList({
      property_id: data.property_id
    }))
    navigation.navigate('AllocatePropertyScreen', { id: data.property_id })
  }
  return (
    <>
      <PropertyDetailView data={data}
        handleAllocatePress={handleAllocatePress}
        handleBackPress={handleBackPress}
        onPressCreatevisit={onPressCreatevisit}
        setIsloading={setIsloading} />
    </>
  )
}

export default PropertyDetails;