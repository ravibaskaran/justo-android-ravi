import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ErrorMessage from "../../../components/ErrorMessage";
import { RED_COLOR } from "../../../components/utilities/constant";
import strings from "../../../components/utilities/Localization";
import { addFollowUp } from "../../../Redux/Actions/FollowUpActions";
import { getAllMaster } from "../../../Redux/Actions/MasterActions";
import FollowUpAddView from "./components/FollowUpAdd";

const FollowUpAddScreen = ({ navigation, route }: any) => {
  const followUpId = route?.params || {};
  const [value, setValue] = useState(null);
  const [masterDatas, setMasterDatas] = useState<any>([]);
  const [formData, setFormData] = useState({
    lead_id: followUpId?.lead_id ? followUpId?.lead_id : "",
    appointment_id:
      followUpId?.assign_appointment?.length > 0
        ? followUpId?.assign_appointment[0]?.appointment_id
        : "",
    followup_status: "",
    next_followup_date: "",
    remark: "",
    followup_time: "",
    followup_for: 2,
  });
  const DATA: any = [
    {
      followupBy: "ABC",
      date: "11/10/2022,11:00 PM",
      description:
        "A ticket in a supported ,A ticket in a supported ,A ticket in a supported ,A ticket in a supported ",
      status: "Next Follow-up",
    },
    {
      followupBy: "ABC",
      date: "11/10/2022,12:00 PM",
      description:
        "A ticket in a supported ,A ticket in a supported ,A ticket in a supported ,A ticket in a supported ",
      status: "Follow-up",
    },
    {
      followupBy: "ABC",
      date: "11/10/2022,03:00 PM",
      status: "Next Follow-up",
      description:
        "A ticket in a supported ,A ticket in a supported ,A ticket in a supported ,A ticket in a supported ",
    },
    {
      followupBy: "ABC",
      date: "11/10/2022,06:00 PM",
      description:
        "A ticket in a supported ,A ticket in a supported ,A ticket in a supported ,A ticket in a supported ",
      status: "Next Follow-up",
    },
  ];
  const dispatch: any = useDispatch();
  const masterData = useSelector((state: any) => state.masterData) || {};

  useEffect(() => {
    if (masterData?.response?.status === 200) {
      setMasterDatas(
        masterData?.response?.data?.length > 0 ? masterData?.response?.data : []
      );
    }
  }, [masterData]);

  const handleMasterDatas = (data: any) => {
    dispatch(
      getAllMaster({
        type: data,
      })
    );
  };
  const validation = () => {
    let isError = true;
    let errorMessage: any = "";
    if (
      formData.followup_status == undefined ||
      formData.followup_status == ""
    ) {
      isError = false;
      errorMessage = strings.followUpSTSReqVal;
    }

    if (errorMessage !== "") {
      ErrorMessage({
        msg: errorMessage,
        backgroundColor: RED_COLOR,
      });
    }
    return isError;
  };

  const handleUpdateStatus = () => {
    if (validation()) {
      dispatch(addFollowUp(formData));
      navigation.goBack(null);
    }
  };
  const handleBackPress = () => {
    navigation.goBack(null);
  };
  return (
    <>
      <FollowUpAddView
        value={value}
        setValue={setValue}
        DATA={DATA}
        handleBackPress={handleBackPress}
        masterDatas={masterDatas}
        handleMasterDatas={handleMasterDatas}
        setFormData={setFormData}
        formData={formData}
        handleUpdateStatus={handleUpdateStatus}
      />
    </>
  );
};
export default FollowUpAddScreen;
