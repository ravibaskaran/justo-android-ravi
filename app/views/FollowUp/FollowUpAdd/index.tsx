import ErrorMessage from "app/components/ErrorMessage";
import { GREEN_COLOR, RED_COLOR } from "app/components/utilities/constant";
import {
  addFollowUp,
  allfollowupRemove,
} from "app/Redux/Actions/FollowUpActions";
import { getAllMaster } from "app/Redux/Actions/MasterActions";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import FollowUpAddView from "./components/FollowUpAdd";
import strings from "app/components/utilities/Localization";
import { Keyboard } from "react-native";

const FollowUpAddScreen = ({ navigation, route }: any) => {
  const followUpId = route?.params || "";
  const [value, setValue] = useState(null);
  const [isloading, setIsloading] = useState(false);
  const [masterDatas, setMasterDatas] = useState<any>([]);
  const [formData, setFormData] = useState({
    lead_id: followUpId?.lead_id ? followUpId?.lead_id : "",
    appointment_id: followUpId?.appointment_id
      ? followUpId?.appointment_id
      : "",
    update_type: followUpId?.update_type ? followUpId?.update_type : "",
    followup_status: "",
    next_followup_date: "",
    remark: "",
    followup_time: "",
    visit_status: strings.warm,
  });
  const dispatch: any = useDispatch();
  const masterData = useSelector((state: any) => state.masterData) || {};
  const AddfollowUp = useSelector((state: any) => state.AddfollowUp);

  useEffect(() => {
    if (masterData?.response?.status === 200) {
      setIsloading(false);
      setMasterDatas(
        masterData?.response?.data?.length > 0 ? masterData?.response?.data : []
      );
    }
  }, [masterData]);
  useEffect(() => {
    if (AddfollowUp?.response?.status === 200) {
      if (followUpId?.fromVisitorPage) {
        navigation.goBack();
      } else if (followUpId?.fromAppointmentPage) {
        navigation.goBack();
        navigation.goBack();
      } else {
        navigation.navigate("FollowUpScreen", {});
      }
      dispatch(allfollowupRemove());
      ErrorMessage({
        msg: AddfollowUp?.response?.message,
        backgroundColor: GREEN_COLOR,
      });
    }
  }, [AddfollowUp]);

  const handleMasterDatas = (data: any) => {
    setIsloading(true);
    dispatch(
      getAllMaster({
        type: data,
      })
    );
  };
  const handleBackPress = () => {
    navigation.goBack(null);
  };

  const validation = () => {
    let isError = true;
    let errorMessage: any = "";
    if (
      formData.followup_status == undefined ||
      formData.followup_status == ""
    ) {
      isError = false;
      errorMessage =
        "Followup Status is require. Please Choose Followup Status";
    } else if (formData?.followup_status === "6360c6d52ca46e9d3636fbf4") {
      if (
        typeof formData?.next_followup_date === "undefined" ||
        formData?.next_followup_date === ""
      ) {
        isError = false;
        errorMessage = "Date is require. Please Enter Date";
      } else if (
        typeof formData?.followup_time === "undefined" ||
        formData?.followup_time === ""
      ) {
        isError = false;
        errorMessage = "Time is require. Time Enter Date";
      }
    }

    if (errorMessage !== "") {
      ErrorMessage({
        msg: errorMessage,
        backgroundColor: RED_COLOR,
      });
    }
    if (!isError) {
      Keyboard.dismiss();
    }
    return isError;
  };

  const handleUpdateStatus = () => {
    if (validation()) {
      dispatch(addFollowUp(formData));
      // navigation.goBack(null)
    }
  };
  const handleAllFollowUp = () => {
    navigation.navigate("AllFollowUpScreen", followUpId);
  };
  return (
    <>
      <FollowUpAddView
        fromAppointmentPage={followUpId?.fromAppointmentPage ? true : false}
        value={value}
        setValue={setValue}
        handleBackPress={handleBackPress}
        masterDatas={masterDatas}
        handleMasterDatas={handleMasterDatas}
        isloading={isloading}
        setFormData={setFormData}
        formData={formData}
        handleUpdateStatus={handleUpdateStatus}
        handleAllFollowUp={handleAllFollowUp}
      />
    </>
  );
};
export default FollowUpAddScreen;
