import { useFocusEffect } from "@react-navigation/native";
import ErrorMessage from "app/components/ErrorMessage";
import { GREEN_COLOR, RED_COLOR } from "app/components/utilities/constant";
import { getBookingDetail, updateBookingDetailStatus, cancelBooking, removeBooking, getBookingRegisterDetail }
    from "app/Redux/Actions/BookingActions";
import { competitorpropertyReducer } from "app/Redux/Reducers/propertyReducers";
import React, { useEffect, useState } from "react";
import { Alert } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import BookingDetailsView from './components/BookingDetails'
import { bookingBackSubject } from "app/observables/backNavigationSubject";
import { apiCall } from "app/components/utilities/httpClient";
import apiEndPoints from "app/components/utilities/apiEndPoints";

const BookingDetailsScreen = ({ navigation, route }: any) => {
    const { data = {}, type = '' } = route?.params || {}
    const dispatch: any = useDispatch()
    const { response = {}, detail = "" } = useSelector(
        (state: any) => state.booking)
    const [cancelBookingModel, setCancelBookingModel] = useState(false)
    const [reAllocateModel, setReAllocateModel] = useState(false)
    const [registerModal, setRegisterModal] = useState(false)
    const [BookingData, setBookingData] = useState<any>({});
    const [cancelValue, setCancelValue] = useState({
        reason: '',
        property_id: '',
        comment: '',
        property_name: '',
        remark: '',
    });
    const [reAllocateData, setReAllocateData] = useState({
        booking_id: data?._id,
        description: '',
        booking_status: 4,
        receivery_status: 1
    });
    const cancelAddBookingData = useSelector((state: any) => state.cancelAddBooking)
   
    useFocusEffect(
        React.useCallback(() => {
            if (type === 'register') {
                if (data?._id) {
                    dispatch(
                        getBookingRegisterDetail({
                            registration_id: data?._id
                        })
                    )
                }
            } else {
                if (data?._id) {
                    getDetail()
                }
            }
            return () => { };
        }, [navigation, cancelAddBookingData])
    );

  const getDetail = async () => {
    const res = await apiCall("post", apiEndPoints.GET_BOOKINGDETAIL, {
        booking_id: data?._id
    });
    setBookingData(res?.data?.data);
  };

    const handleBackPress = () => {
        navigation.goBack()
        bookingBackSubject.next(true);
    }
    const handleStatusUpdate = () => {
        navigation.navigate('FollUpAdd', response?.data?.length > 0 ? response?.data[0] : [])
    }

    useEffect(() => {
        if (cancelAddBookingData?.response?.status === 200) {
            ErrorMessage({
                msg: cancelAddBookingData?.response?.message,
                backgroundColor: GREEN_COLOR
            })
            dispatch(removeBooking())
            navigation.goBack()
            setCancelValue({
                reason: '',
                property_id: '',
                comment: '',
                property_name: '',
                remark: '',
            })
        }
    }, [cancelAddBookingData])
    const cancelBookingPress = () => {
        const params = {
            module_id: "",
            booking_id: data?._id,
            booking_status: 4,
            resion: cancelValue.reason,
            competitor_id: cancelValue.property_id,
            competitor_name: cancelValue.property_name,
            remark: cancelValue.remark
        }
        dispatch(cancelBooking(params))
    }
    const onPressBookNow = () => {
        // navigation.navigate('Booking', { getBookingData: response?.data?.length > 0 ? response?.data[0] : [], type: 'readyToBook' })
    }
    const handleRegister = () => {
        navigation.navigate('BookingRegistration', { getBookingData: response?.data?.length > 0 ? response?.data[0] : [] })
    }
    return (
        <>
            <BookingDetailsView
                handleBackPress={handleBackPress}
                cancelBookingModel={cancelBookingModel}
                setCancelBookingModel={setCancelBookingModel}
                handleStatusUpdate={handleStatusUpdate}
                cancelValue={cancelValue}
                setCancelValue={setCancelValue}
                cancelBookingPress={cancelBookingPress}
                type={type}
                onPressBookNow={onPressBookNow}
                reAllocateModel={reAllocateModel}
                setReAllocateModel={setReAllocateModel}
                registerModal={registerModal}
                setRegisterModal={setRegisterModal}
                reAllocateData={reAllocateData}
                setReAllocateData={setReAllocateData}
                handleRegister={handleRegister}
                bookingData={BookingData}
            />
        </>
    )
}
export default BookingDetailsScreen