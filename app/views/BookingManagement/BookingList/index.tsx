import { useFocusEffect } from "@react-navigation/native";
import {
  getBookingList,
  getRegisteredList,
} from "app/Redux/Actions/BookingActions";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import BookingListView from "./components/BookingList";
import { todayDate } from "app/components/utilities/constant";
import { BackHandler } from "react-native";

const BookingListScreen = ({ navigation, route }: any) => {
  const { type = "", onpressType = "" } = route?.params || {};
  const [BookingList, setBookingList] = useState<any>([]);
  const [offSET, setOffset] = useState(0);
  const [datatype, setDatatype] = useState("");
  const dispatch: any = useDispatch();
  const { response = {}, list = "" } = useSelector(
    (state: any) => state.booking
  );
  const moreData = response?.total_data;

  const [filterData, setFilterData] = useState({
    start_date: "",
    end_date: "",
    status: "",
    customer_name: "",
  });

  useFocusEffect(
    React.useCallback(() => {
      setFilterData({
        start_date: "",
        end_date: "",
        status: "",
        customer_name: "",
      });
      return () => {};
    }, [navigation])
  );
  useFocusEffect(
    React.useCallback(() => {
      // getBookingLits(0, []);
      setBookingList([]);
      handleonpressType();               
      return () => {};
    }, [navigation, list, route])
  );
  useEffect(() => {
    if (response?.status === 200) {
      if (response?.data?.length > 0) {
        if (offSET === 0) {
          setBookingList(response?.data);
        } else {
          setBookingList([...BookingList, ...response?.data]);
        }
      } else {
        setBookingList([]);
      }
    } else {
      setBookingList([]);
    }
  }, [response]);

  const handleonpressType = () => {
    const { params } = route ?? {}; // Destructure route params
    if (params?.fromReport) {
      getBookingLits(0, { start_date: params.sDate, end_date: params.eDate });
    } else if (onpressType === "today") {
      getBookingLits(0, todayDate);
    } else {
      getBookingLits(0, []);
    }
  };

  const getBookingLits = (offset: any, array: any) => {
    setOffset(offset);
    if (type === "register") {
      dispatch(
        getRegisteredList({
          offset: offset,
          limit: 10,
          start_date: array?.start_date ? array?.start_date : "",
          end_date: array?.end_date ? array?.end_date : "",
          customer_name: array?.customer_name?.trim()
            ? array?.customer_name?.trim()
            : "",
        })
      );
    } else {
      dispatch(
        getBookingList({
          offset: offset,
          limit: 10,
          booking_status: array?.status
            ? array?.status
            : type === "readyToBook"
            ? 1
            : 5,
          start_date: array?.start_date ? array?.start_date : "",
          end_date: array?.end_date ? array?.end_date : "",
          customer_name: array?.customer_name?.trim()
            ? array?.customer_name?.trim()
            : "",
        })
      );
    }
  };
 useEffect(() => {
     const backAction = () => {
       handleDrawerPress();
       return true;
     };
     const backHandler = BackHandler.addEventListener(
       "hardwareBackPress",
       backAction
     );
     return () => backHandler.remove();
   }, [route?.params?.fromReport]);
 
   const handleDrawerPress = () => {
     if (route?.params?.fromReport) {
       navigation.navigate("Report", { backToReport: true });
     } else {
       navigation.toggleDrawer();
     }
   };

  const handleView = (data: any) => {
    navigation.navigate("BookingDetails", { data: data, type: type });
  };
  return (
    <>
      <BookingListView
        handleDrawerPress={handleDrawerPress}
        DATA={BookingList}
        handleView={handleView}
        getBookingLits={getBookingLits}
        moreData={moreData}
        offSET={offSET}
        setBookingList={setBookingList}
        type={type}
        onpressType={onpressType}
        navigation={navigation}
        setDatatype={setDatatype}
        filterData={filterData}
        setFilterData={setFilterData}
        fromReport={route?.params?.fromReport}
      />
    </>
  );
};
export default BookingListScreen;
