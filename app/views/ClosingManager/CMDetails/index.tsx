import { useFocusEffect } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getClosingDetail } from '../../../Redux/Actions/ClosingManager';
import CMDetailsView from './components/CMDetails';

const CMDetailsScreen = ({ navigation, route }: any) => {
    const data = route?.params || {}
    const [CMdetail, setCMdetail] = useState([])
    const dispatch: any = useDispatch()
    const { response = {}, detail = '' } =
        useSelector((state: any) => state.ClosingManager)

    useFocusEffect(
        React.useCallback(() => {
            dispatch(getClosingDetail({ user_id: data?._id }))
            return () => { };
        }, [navigation])
    );

    useEffect(() => {
        if (response?.status === 200) {
            setCMdetail(response?.data[0])
        } else {
            setCMdetail([])
        }
    }, [response])
    const handleBackPress = () => {
        navigation.goBack();
    };
    return (
        <CMDetailsView
            handleBackPress={handleBackPress}
            CMdetail={CMdetail}
        />
    )
}
export default CMDetailsScreen