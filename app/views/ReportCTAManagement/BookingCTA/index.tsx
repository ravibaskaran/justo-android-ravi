import React from "react";
import BookingCTAView from "./components/BookingCTAView";

const BookingCTA = ({ navigation }: any) => {
  const handleBackPress = () => {
    navigation.goBack();
  };
  const DATA = [
    {
      booking_date: "2023-09-07T07:03:24.313Z",
      customer_first_name: "Amir khan",
      booking_status: 1,
    },
    {
      booking_date: "2023-09-07T07:03:24.313Z",
      customer_first_name: "Amir khan",
      booking_status: 1,
    },
    {
      booking_date: "2023-09-07T07:03:24.313Z",
      customer_first_name: "Amir khan",
      booking_status: 1,
    },
  ];
  return (
    <>
      <BookingCTAView handleBackPress={handleBackPress} DATA={DATA} />
    </>
  );
};

export default BookingCTA;
