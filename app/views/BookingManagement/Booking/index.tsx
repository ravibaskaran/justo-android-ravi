import ErrorMessage from "app/components/ErrorMessage";
import { GREEN_COLOR, RED_COLOR } from "app/components/utilities/constant";
import {
  AddBooking,
  removeAddBookingData,
} from "app/Redux/Actions/AppointmentCLAction";
import { updateBookingDetailStatus } from "app/Redux/Actions/BookingActions";
import {
  getAllMaster,
  getPropertyConfig,
} from "app/Redux/Actions/MasterActions";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import BookingView from "./components/Booking";
import { START_LOADING, STOP_LOADING } from "app/Redux/types";

interface FlatBooking {
  flat_type: string;
  floor: number;
  flat_name: string;
  saleable_area: number;
  carpet_area: number;
  booking_amount: string;
  agreement_value: string;
  rate_achieved: string;
  payment_type: string;
  cheque_image: any;
  description: string;
}

// Define the type for the flatBookingsMap
interface FlatBookingsMap {
  flatBooking: FlatBooking[];
}

const BookingScreen = ({ navigation, route }: any) => {
  const { getBookingData = {}, type = "" } = route?.params || {};
  const dispatch: any = useDispatch();
  const [bookingData, setBookingData] = useState({
    lead_id: getBookingData?.lead_id ? getBookingData?.lead_id : "",
    property_id: getBookingData?.property_id ? getBookingData?.property_id : "",
    customer_id: getBookingData?.customer_id ? getBookingData?.customer_id : "",
    tranjection_upi_cheque_number: "",
    booking_date: moment(new Date()).format(),
    configuration: "",
    configuration_id: "",
    remaining: "",
    quantity: "",
    booking_id: getBookingData?._id ? getBookingData?._id : "",
    appointment_id: getBookingData?.appointment_id
      ? getBookingData?.appointment_id
      : "",
  });
  const masterData = useSelector((state: any) => state.masterData) || {};
  const addedBookingData =
    useSelector((state: any) => state.addedBooking) || {};
  const { response = {} } = useSelector((state: any) => state.booking) || {};
  const [okIsVisible, setOkIsVisible] = useState(false);
  const agencyDetails = useSelector((state: any) => state.agency);
  const [masterDatas, setMasterDatas] = useState<any>([]);
  const [propertyConfData, setPropertyConfData] = useState<any>([]);
  const [dropDownType, setDropDownType] = useState<any>(null);
  const [quantity, setQuantity] = useState<any>(false);
  const [disabled, setDisabled] = useState(false);
  const [browse, setBrowse] = useState(false);
  const [flatBookingsMap, setFlatBookingsMap] = useState<FlatBookingsMap>({
    flatBooking: [
      {
        flat_type: "",
        floor: 0,
        flat_name: "",
        saleable_area: 0,
        carpet_area: 0,
        booking_amount: "",
        agreement_value: "",
        rate_achieved: "",
        payment_type: "",
        cheque_image: "",
        description: "",
      },
    ],
  });

  const getDropDownData = (data: any) => {
    setDropDownType(data);
    // setPropertyConfData([])
    // setMasterDatas([])
    if (data === 10) {
      dispatch(
        getAllMaster({
          type: 10,
        })
      );
    } else {
      dispatch(
        getPropertyConfig({
          module_id: "",
          property_id: getBookingData?.property_id
            ? getBookingData?.property_id
            : "",
        })
      );
    }
  };

  useEffect(() => {
    if (masterData?.response?.status === 200) {
      if (masterData?.response?.data?.length > 0) {
        if (dropDownType === 10) {
          setMasterDatas(
            masterData?.response?.data?.length > 0
              ? masterData?.response?.data
              : []
          );
        } else {
          setPropertyConfData(
            masterData?.response?.data?.length > 0
              ? masterData?.response?.data
              : []
          );
        }
      }
    } else {
      setPropertyConfData([]);
      setMasterDatas([]);
    }
  }, [masterData]);

  useEffect(() => {
    if (addedBookingData?.response?.status === 200) {
      dispatch(removeAddBookingData());
      ErrorMessage({
        msg: addedBookingData?.response?.message,
        backgroundColor: GREEN_COLOR,
      });
      // navigation.navigate("BookingList", { type: "request" });
      setOkIsVisible(true);
    }
  }, [addedBookingData]);

  const handleBackPress = () => {
    navigation.goBack(null);
  };

  const validQuantityChoose = () => {
    if (bookingData.remaining?.toString() === "0") {
      ErrorMessage({
        msg: "Inventory not available for this property",
        backgroundColor: RED_COLOR,
      });
    }
  };

  const onPressRightButton = () => {
    navigation.navigate("BookingList", { type: "request" });
    setOkIsVisible(false);
  };

  const isFlatDetailsDataValid = () => {
    let isError = true;
    let errorMessage: any = "";
    for (let flatBooking of flatBookingsMap?.flatBooking) {
      if (
        flatBooking.booking_amount == undefined ||
        flatBooking.booking_amount == ""
      ) {
        isError = false;
        errorMessage = "Booking Amount is require. Please enter Booking Amount";
      } else if (
        flatBooking.payment_type == undefined ||
        flatBooking.payment_type == ""
      ) {
        isError = false;
        errorMessage = "Payment Type is require. Please select payment type";
      } else if (
        flatBooking.agreement_value == undefined ||
        flatBooking.agreement_value == ""
      ) {
        isError = false;
        errorMessage =
          "Agreement value Amount is require. Please enter Agreement value";
      } else if (
        flatBooking.rate_achieved == undefined ||
        flatBooking.rate_achieved == ""
      ) {
        isError = false;
        errorMessage = "Rate achieved is require. Please enter Rate achieved";
      } else if (
        typeof flatBooking.cheque_image != "object" ||
        flatBooking.cheque_image == ""
      ) {
        isError = false;
        errorMessage = "Attachment is require. Please select image";
      } else if (
        flatBooking.flat_type == undefined ||
        flatBooking.flat_type == ""
      ) {
        isError = false;
        errorMessage = "Configuration is require. Please select configuration";
      } else if (flatBooking.floor == undefined || flatBooking.floor == 0) {
        isError = false;
        errorMessage = "Floor is require. Please enter floor";
      } else if (
        flatBooking.flat_name == undefined ||
        flatBooking.flat_name == ""
      ) {
        isError = false;
        errorMessage = "Flat name is require. Please enter Flat name";
      } else if (
        flatBooking.description == undefined ||
        flatBooking.description == ""
      ) {
        isError = false;
        errorMessage = "Comment is require. Please enter description";
      }
    }
    if (errorMessage !== "") {
      ErrorMessage({
        msg: errorMessage,
        backgroundColor: RED_COLOR,
      });
    }
    return isError;
  };

  const addMoreBtnPressed = () => {
    if (isFlatDetailsDataValid()) {
      setFlatBookingsMap((prevState) => ({
        ...prevState,
        flatBooking: [
          ...prevState.flatBooking,
          {
            flat_type: "",
            floor: 0,
            flat_name: "",
            saleable_area: 0,
            carpet_area: 0,
            booking_amount: "",
            agreement_value: "",
            rate_achieved: "",
            payment_type: "",
            cheque_image: "",
            description: "",
          },
        ],
      }));
    }
  };

  const onDeleteBtnPress = (index: number) => {
    dispatch({ type: START_LOADING });
    setTimeout(() => {
      setFlatBookingsMap((prevState: { flatBooking: any[] }) => ({
        flatBooking: prevState.flatBooking.filter((_, i) => i !== index),
      }));
      dispatch({ type: STOP_LOADING });
    }, 300);
  };

  const validation = () => {
    setDisabled(true);
    setTimeout(() => {
      setDisabled(false);
    }, 3000);
    let isError = true;
    let errorMessage: any = "";
    if (!isFlatDetailsDataValid()) {
      isError = false;
    }
    // else if (
    //   bookingData.quantity == undefined ||
    //   bookingData.quantity == "" ||
    //   bookingData.quantity === "0"
    // ) {
    //   isError = false;
    //   errorMessage = "Quantity is require. Please enter quantity";
    // } else if (Number(bookingData.quantity) > Number(bookingData.remaining)) {
    //   isError = false;
    //   errorMessage = `${"Quantity must not be more than available quantity i.e."} ${
    //     bookingData.remaining
    //   }`;
    // }
    // if (bookingData.payment_type === "Cheque") {
    //   if (
    //     bookingData.tranjection_upi_cheque_number === undefined ||
    //     bookingData.tranjection_upi_cheque_number === ""
    //   ) {
    //     isError = false;
    //     errorMessage = "Cheque Number is require. Please enter cheque number";
    //   } else if (
    //     typeof bookingData.cheque_image != "object" ||
    //     bookingData.cheque_image == ""
    //   ) {
    //     isError = false;
    //     errorMessage = "Cheque Image is require. Please select cheque image";
    //   }
    // }
    if (errorMessage !== "") {
      ErrorMessage({
        msg: errorMessage,
        backgroundColor: RED_COLOR,
      });
    }
    return isError;
  };

  const handleInventoryPress = () => {
    navigation.navigate("PropertyInventory", {
      propName: getBookingData?.properties?.property_title,
    });
  };

  const handleBookPress = async () => {
    try {
      if (validation()) {
        for (let flatBooking of flatBookingsMap?.flatBooking) {
          await callApi(flatBooking); // Wait for each API call to complete
          console.log("Success", "All API calls completed successfully");
        }
      }
    } catch (error) {
      console.log("Error", "An error occurred during API calls");
    }
  };

  const callApi = async (flatBooking: any) => {
    const newFormdata = new FormData();
    if (typeof flatBooking?.cheque_image === "object") {
      newFormdata.append("cheque_image", flatBooking.cheque_image);
    }
    if (type === "recovery") {
      newFormdata.append("receivery_status", 0);
    }
    newFormdata.append("lead_id", bookingData.lead_id);
    newFormdata.append("customer_id", bookingData.customer_id);
    newFormdata.append("property_id", bookingData.property_id);
    // newFormdata.append("configuration", bookingData.configuration);
    // newFormdata.append("configuration_id", bookingData.configuration_id);
    // newFormdata.append("quantity", bookingData.quantity);
    newFormdata.append("booking_amount", flatBooking.booking_amount);
    newFormdata.append("agreement_value", flatBooking.agreement_value);
    newFormdata.append("rate_achieved", flatBooking.rate_achieved);
    // newFormdata.append(
    //   "tranjection_upi_cheque_number",
    //   bookingData.tranjection_upi_cheque_number
    // );
    newFormdata.append("payment_type", flatBooking.payment_type);
    newFormdata.append("flat_type", flatBooking.flat_type);
    newFormdata.append("floor", flatBooking.floor);
    newFormdata.append("flat_no", flatBooking.flat_name);
    newFormdata.append("saleable_area", flatBooking.saleable_area);
    newFormdata.append("carpet_area", flatBooking.carpet_area);
    newFormdata.append("jw_project_id", getBookingData.jw_project_id);
    newFormdata.append("crm_person_email", getBookingData.crm_person_email);
    // newFormdata.append("lead_source", getBookingData?.lead_source?.length > 0 ? getBookingData?.lead_source[0] : "");
    // newFormdata.append("booking_date", bookingData.booking_date);
    newFormdata.append("description", flatBooking.description);
    newFormdata.append("booking_status", 2);
    if (type === "readyToBook" || type === "recovery") {
      newFormdata.append("booking_id", bookingData?.booking_id);
      newFormdata.append("appointment_id", bookingData.appointment_id);
    } else {
      newFormdata.append("appointment_id", bookingData.appointment_id);
    }

    if (type === "readyToBook" || type === "recovery") {
      dispatch(updateBookingDetailStatus(newFormdata));
    } else {
      dispatch(AddBooking(newFormdata));
    }
  };

  return (
    <>
      <BookingView
        handleBackPress={handleBackPress}
        browse={browse}
        setBrowse={setBrowse}
        handleBookPress={handleBookPress}
        setBookingData={setBookingData}
        bookingData={bookingData}
        getDropDownData={getDropDownData}
        propertyConfData={propertyConfData}
        masterDatas={masterDatas}
        validQuantityChoose={validQuantityChoose}
        quantity={quantity}
        setQuantity={setQuantity}
        handleInventoryPress={handleInventoryPress}
        getBookingData={getBookingData}
        okIsVisible={okIsVisible}
        setOkIsVisible={setOkIsVisible}
        onPressRightButton={onPressRightButton}
        disabled={disabled}
        flatBookingsMap={flatBookingsMap}
        onDeleteBtnPress={onDeleteBtnPress}
        addMoreBtnPressed={addMoreBtnPressed}
      />
    </>
  );
};
export default BookingScreen;
