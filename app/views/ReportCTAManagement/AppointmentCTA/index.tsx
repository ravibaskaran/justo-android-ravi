import React from "react";
import AppointmentCTAView from "./components/AppointmentCTAView";

const AppointmentCTA = ({ navigation }: any) => {
  const handleBackPress = () => {
    navigation.goBack();
  };
  const DATA = [
    {
      appointment_date: "2023-09-07T07:03:24.313Z",
      appointment_time: "2023-09-07T07:03:24.313Z",
      customer_first_name: "Amir khan",
      booking_status: 1,
      status: 1
    },
    {
      appointment_date: "2023-09-07T07:03:24.313Z",
      appointment_time: "2023-09-07T07:03:24.313Z",
      customer_first_name: "Amir khan",
      booking_status: 1,
      status: 2
    },
    {
      appointment_date: "2023-09-07T07:03:24.313Z",
      appointment_time: "2023-09-07T07:03:24.313Z",
      customer_first_name: "Amir khan",
      booking_status: 1,
      status: 5
    },
   
  ];
  return (
    <>
      <AppointmentCTAView handleBackPress={handleBackPress} DATA={DATA}/>
    </>
  );
};

export default AppointmentCTA;
