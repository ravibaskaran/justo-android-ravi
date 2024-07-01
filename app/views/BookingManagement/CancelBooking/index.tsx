import { useFocusEffect } from "@react-navigation/native";
import { getBookingList } from "app/Redux/Actions/BookingActions";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CancelBookingView from "./components/CancelBookingView";
import moment from "moment";
import { DATE_FORMAT } from "app/components/utilities/constant";

const CancelBookingScreen = ({ navigation, route }: any) => {
  const parmas = route.params;
  const [BookingList, setBookingList] = useState<any>([]);
  const [offSET, setOffset] = useState(0);
  const dispatch: any = useDispatch();
  const [filterData, setFilterData] = useState({
    start_date: "",
    end_date: "",
    status: "",
    customer_name: "",
  });
  const { response = {}, list = "" } = useSelector(
    (state: any) => state.booking
  );
  const moreData = response?.total_data;
  useFocusEffect(
    React.useCallback(() => {
      if (parmas === "today") {
        getBookingLits(0, todayDate);
      } else {
        getBookingLits(0, []);
      }
      setBookingList([]);
      return () => {};
    }, [navigation, list, parmas])
  );
  useFocusEffect(
    React.useCallback(() => {
      setFilterData({
        start_date: "",
        end_date: "",
        status: "",
        customer_name: "",
      })
      return () => {};
    }, [navigation])
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

  const todayDate = {
    start_date: moment(new Date()).format(DATE_FORMAT),
    end_date: moment(new Date()).format(DATE_FORMAT),
  };

  const getBookingLits = (offset: any, array: any) => {
    setOffset(offset);
    dispatch(
      getBookingList({
        offset: offset,
        limit: 10,
        booking_status: 4,
        start_date: array?.start_date ? array?.start_date : "",
        end_date: array?.end_date ? array?.end_date : "",
        customer_name: array?.customer_name?.trim() ? array?.customer_name?.trim() : "",
      })
    );
  };
  const handleDrawerPress = () => {
    navigation.toggleDrawer();
  };
  const handleView = (data: any) => {
    navigation.navigate("BookingDetails", { data: data, type: "cancel" });
  };
  return (
    <>
      <CancelBookingView
        handleDrawerPress={handleDrawerPress}
        DATA={BookingList}
        handleView={handleView}
        getBookingLits={getBookingLits}
        moreData={moreData}
        offSET={offSET}
        setBookingList={setBookingList}
        filterData={filterData}
        setFilterData={setFilterData}
      />
    </>
  );
};

export default CancelBookingScreen;
