import { useFocusEffect } from "@react-navigation/native";
import ErrorMessage from "app/components/ErrorMessage";
import apiEndPoints from "app/components/utilities/apiEndPoints";
import {
  BLACK_COLOR,
  CONST_IDS,
  GREEN_COLOR,
  RED_COLOR,
  ROLE_IDS,
  Regexs,
} from "app/components/utilities/constant";
import { CountryArray } from "app/components/utilities/countryData";
import { apiCall } from "app/components/utilities/httpClient";
import { getEmployeeList } from "app/Redux/Actions/CompanyActions";
import {
  addVisitorRemove,
  editVisitor,
  getVisitorDetail,
} from "app/Redux/Actions/LeadsActions";
import { getAllProperty } from "app/Redux/Actions/propertyActions";
import { START_LOADING, STOP_LOADING } from "app/Redux/types";
import React, { useEffect, useLayoutEffect, useState } from "react";
import { Keyboard } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import VisitorUpdateFirstView from "./components/VisitorUpdateFirst";
import { getAllMaster } from "app/Redux/Actions/MasterActions";

const DraftVisitorUpdateScreen = ({ navigation, route }: any) => {
  const data = route?.params || 0;
  const dispatch: any = useDispatch();
  const { response = {}, detail = "" } = useSelector(
    (state: any) => state.visitorData
  );
  const masterData = useSelector((state: any) => state.masterData) || {};
  const editData = useSelector((state: any) => state.editVisitorData) || {};
  const propertyData = useSelector((state: any) => state.propertyData) || {};
  const { userData = {} } = useSelector((state: any) => state.userData) || [];
  const employeeData = useSelector((state: any) => state.employeeData) || {};
  const [masterDatas, setMasterDatas] = useState<any>([]);
  const [companyList, setCompanyList] = useState<any>([]);
  const [employeeList, setEmployeeList] = useState<any>([]);
  const [dropDownType, setDropDownType] = useState(0);
  const [countryData, setCountryData] = useState(CountryArray);
  const [countryCode, setCountryCode] = useState("+91");
  const [countyPicker, setCountyPicker] = useState(false);
  const [okIsVisible, setOkIsVisible] = useState(false);
  const [mobileerror, setMobileError] = useState<any>("");
  const [configuration, setConfiguration] = useState<any>([]);
  const [sourcingManagerList, setSourcingManagerList] = useState<any>([]);
  const [closingManagerList, setClosingManagerList] = useState<any>([]);

  const [updateForm, setUpdateForm] = React.useState<any>({
    lead_id: "",
    first_name: "",
    email: "",
    mobile: "",
    gender: "",
    birth_date: "",
    address: "",
    location: "",
    latitude: "",
    longitude: "",
    city: "",
    occupation: "",
    coumpany_name: "",
    desigantion: "",
    office_address: "",
    configuration_id: "",
    configuration: "",
    areain_sqlft: "",
    income: "",
    funding_type: "",
    purpose: "",
    whenby: "",
    agent_code: "",
    adhar_no: "",
    pancard_no: "",
    whatsapp_no: "",
    funding_emi_type: "",
    min_budget: "",
    min_budget_type: "",
    max_budget: "",
    max_budget_type: "",
    expected_possession_date: "",
    min_emi_budget: "",
    min_emi_budget_type: "",
    max_emi_budget: "",
    max_emi_budget_type: "",
    locality: "",
    property_id: "",
    budget: "",
    property_type_title: "",
    remark: "",
    marital_status: "",
    no_of_family_member: "",
    current_stay: "",
    property_type: "",
    preferred_bank: "",
    lead_source: "",
    cp_lead_type: "",
    cp_type: 2,
    cp_id: "",
    cp_emp_id: "",
    referrer_name: "",
    referrer_email: "",
    referrer_contact: "",
    referrel_partner: "",
    created_for_sm_name: "",
    referrerEmailExist: false,
    referrerNmbrExist: false,
    for_sm: false,
    for_sm_id: "",
    new_cm_id: "",
  });
  const [allProperty, setAllProperty] = useState<any>([]);
  const id = userData?.data?.role_id;

  const Cmteam =
    ROLE_IDS.closingtl_id === id ||
    ROLE_IDS.closingmanager_id === id ||
    ROLE_IDS.closing_head_id === id;

  useFocusEffect(
    React.useCallback(() => {
      getProperty();
      return () => {};
    }, [navigation])
  );

  const getProperty = () => {
    dispatch(getAllProperty({ offset: 0, limit: "" }));
  };

  useEffect(() => {
    if (propertyData?.response?.status === 200) {
      if (propertyData?.response?.data?.length > 0) {
        const activeData = propertyData?.response?.data.filter((el: any) => {
          return el.status == true;
        });
        activeData?.length > 0
          ? setAllProperty(activeData)
          : setAllProperty([]);
      } else {
        setAllProperty([]);
      }
    } else {
      setAllProperty([]);
    }
  }, [employeeData]);

  useLayoutEffect(() => {
    if (data?.lead_id) {
      dispatch(
        getVisitorDetail({
          lead_id: data?.lead_id,
        })
      );
    }
  }, [detail, data]);

  useFocusEffect(
    React.useCallback(() => {
      if (!Cmteam && data?.lead_source == "Channel Partner") {
        getCPByProperty(data?.property_id);
      }
      return () => {};
    }, [data])
  );

  useEffect(() => {
    if (response?.status === 200) {
      setUpdateForm({
        ...response?.data[0]?.customer_detail,
        lead_id: response?.data[0]?._id,
        property_title: response?.data[0]?.property_title,
        expected_possession_date: response?.data[0]?.expected_possession_date,
        property_id: response?.data[0]?.property_id,
        property_type_title: response?.data[0]?.property_type_title,
        locality:
          response?.data[0]?.customer_detail?.locality &&
          response?.data[0]?.customer_detail?.locality != ""
            ? response?.data[0]?.customer_detail?.locality
            : "",
        configuration_id: response?.data[0]?.configuration_id,
        configuration: response?.data[0]?.configuration,
        areain_sqlft: response?.data[0]?.areain_sqlft,
        min_budget: response?.data[0]?.min_budget,
        min_budget_type: response?.data[0]?.min_budget_type,
        max_budget: response?.data[0]?.max_budget,
        max_budget_type: response?.data[0]?.max_budget_type,
        funding_type: response?.data[0]?.funding_type,
        funding_emi_type: response?.data[0]?.funding_emi_type,
        purpose: response?.data[0]?.purpose,
        min_emi_budget: response?.data[0]?.min_emi_budget,
        min_emi_budget_type: response?.data[0]?.min_emi_budget_type,
        max_emi_budget: response?.data[0]?.max_emi_budget,
        max_emi_budget_type: response?.data[0]?.max_emi_budget_type,
        lead_source: response?.data[0]?.lead_source,
        create_by: response?.data[0]?.create_by,
        lead_source_id: response?.data[0]?.lead_source_id,
        cp_type: response?.data[0]?.cp_type ? response?.data[0]?.cp_type : 2,
        cp_lead_type: response?.data[0]?.cp_lead_type,
        cp_id: response?.data[0]?.cp_id,
        cp_emp_id: response?.data[0]?.cp_emp_id,
        cp_name: response?.data[0]?.cp_name,
        referrer_name: response?.data[0]?.referrer_name,
        referrer_email: response?.data[0]?.referrer_email,
        referrer_contact: response?.data[0]?.referrer_contact,
        referrel_partner: response?.data[0]?.referrel_partner,
        mobile_number: response?.data[0]?.customer_detail?.mobile,
        country_code: response?.data[0]?.customer_detail?.country_code
          ? response?.data[0]?.customer_detail?.country_code
          : "+91",
        created_for_sm_name: response?.data[0]?.created_for_sm_name,
      });
      if (response?.data[0]?.configurations?.length > 0) {
        setConfiguration(response?.data[0]?.configurations);
      }
      setCountryCode(response?.data[0]?.customer_detail?.country_code);
    }
  }, [response]);

  const getCPByProperty = async (property_id: any) => {
    dispatch({ type: START_LOADING });
    // const params = { property_id: property_id ,};
    const params = {
      property_id: property_id ? property_id : updateForm.property_id,
      sm_id: updateForm.for_sm_id,
    };

    const res = await apiCall("post", apiEndPoints.CP_UNDERPROPERTY, params);
    const response: any = res?.data;

    if (response?.status === 200) {
      if (response?.data?.length > 0) {
        setCompanyList(response?.data);
        dispatch({ type: STOP_LOADING });
      } else {
        setCompanyList([]);
        dispatch({ type: STOP_LOADING });
      }
    } else {
      setCompanyList([]);
      dispatch({ type: STOP_LOADING });
      ErrorMessage({
        msg: response?.message,
        backgroundColor: BLACK_COLOR,
      });
    }
  };

  useEffect(() => {
    if (employeeData?.response?.status === 200) {
      setEmployeeList(employeeData?.response?.data);
    } else {
      setEmployeeList([]);
    }
  }, [employeeData]);

  const handleEmployeeDropdownPress = () => {
    dispatch(
      getEmployeeList({
        agency_id: updateForm?.cp_id,
      })
    );
  };

  async function handleCountryCode(search: any) {
    if (search) {
      if (isNaN(search)) {
        let array = CountryArray.filter((l: any) => {
          return l.name.toLowerCase().includes(search.toLowerCase());
        });
        setCountryData(array);
      } else {
        let array = CountryArray.filter((l: any) => {
          return l.dial_code.includes(+search);
        });
        setCountryData(array);
      }
    } else {
      setCountryData(CountryArray);
    }
  }
  async function selectCountryData(countryCode: any, flag: any) {
    setCountryData(CountryArray);
    setCountryCode(countryCode);
    setUpdateForm({
      ...updateForm,
      country_code: countryCode,
    });
    setCountyPicker(false);
  }
  const handleCloseCountry = () => {
    setCountyPicker(!countyPicker);
    setCountryData(CountryArray);
  };

  const handleDropdownPress = (type: any) => {
    setDropDownType(type);
    dispatch(
      getAllMaster({
        type: type,
      })
    );
  };

  useEffect(() => {
    if (masterData?.response?.status === 200) {
      setMasterDatas(
        masterData?.response?.data?.length > 0 ? masterData?.response?.data : []
      );
    }
  }, [masterData]);

  useEffect(() => {
    if (editData?.update) {
      dispatch(addVisitorRemove());
      navigation.goBack(null);
      ErrorMessage({
        msg: editData?.update ? editData?.response?.message : "no message",
        backgroundColor: GREEN_COLOR,
      });
    }
  }, [editData]);

  const validation = () => {
    Keyboard.dismiss();
    let isError = true;
    let errorMessage: any = "";
    if (
      updateForm?.property_id === "" &&
      updateForm?.property_type_title === ""
    ) {
      isError = false;
      errorMessage = "Please select property name";
    } else if (
      updateForm?.first_name?.trim() === "" ||
      updateForm?.first_name?.trim() === undefined
    ) {
      isError = false;
      errorMessage = "Please fill visitor name";
    } else if (
      updateForm?.country_code === "" ||
      updateForm?.country_code === undefined ||
      updateForm?.country_code === null
    ) {
      isError = false;
      errorMessage = "Please enter country code";
    } else if (
      updateForm?.mobile === "" ||
      updateForm?.mobile === undefined ||
      updateForm?.mobile === null
    ) {
      isError = false;
      errorMessage = "Please fill mobile number";
    } else if (
      updateForm?.mobile &&
      countryCode === "+91" &&
      Regexs.mobilenumRegex.test(updateForm?.mobile) === false
    ) {
      isError = false;
      errorMessage = "Please enter valid Mobile number";
    } else if (
      updateForm?.mobile &&
      countryCode !== "+91" &&
      updateForm?.mobile?.length < 10
    ) {
      isError = false;
      errorMessage = "Please Enter valid mobile number";
    } else if (updateForm?.for_sm && !updateForm?.for_sm_id) {
      isError = false;
      errorMessage = "Please select sourcing manager";
    } else if (!updateForm?.lead_source) {
      isError = false;
      errorMessage = "Please enter Lead Source";
    } else if (updateForm?.lead_source_id === CONST_IDS.cp_lead_source_id) {
      if (
        updateForm.cp_lead_type == undefined ||
        updateForm.cp_lead_type == ""
      ) {
        isError = false;
        errorMessage = "Please Enter Channel Partner Lead type";
      }
      if (updateForm.cp_id == undefined || updateForm.cp_id == "") {
        isError = false;
        errorMessage =
          updateForm.cp_type === 1
            ? "Please Enter CP Name"
            : "Please Enter CP Company Name";
      }
    } else if (
      updateForm?.lead_source_id === CONST_IDS?.ref_lead_source_id ||
      updateForm?.lead_source_id == CONST_IDS?.ref_partner_lead_source_id
    ) {
      if (
        updateForm?.referrer_name?.trim() === "" ||
        updateForm?.referrer_name?.trim() === undefined
      ) {
        isError = false;
        errorMessage = "Please fill refferrer name";
      } else if (
        Regexs.oneSpaceRegex.test(updateForm?.referrer_name?.trim()) === false
      ) {
        isError = false;
        errorMessage = "Please enter refferrer name Correctly";
      } else if (
        updateForm?.referrer_contact === "" ||
        updateForm?.referrer_contact === undefined ||
        updateForm?.referrer_contact === null
      ) {
        isError = false;
        errorMessage = "Please fill refferrer mobile number";
      } else if (
        updateForm.referrer_contact &&
        (updateForm.referrer_contact < 10 ||
          Regexs.mobilenumRegex.test(updateForm?.referrer_contact) === false)
      ) {
        isError = false;
        errorMessage = "Please Enter valid referrer mobile number";
      } else if (
        updateForm?.referrer_email &&
        Regexs.emailRegex.test(updateForm?.referrer_email) === false
      ) {
        isError = false;
        errorMessage = "Please enter valid referrer email id";
      }
    } else if (updateForm?.adhar_no) {
      if (Regexs.AadharRegex.test(updateForm?.adhar_no) === false) {
        isError = false;
        errorMessage = "Please enter valid Aadhaar number";
      }
    } else if (updateForm?.pancard_no) {
      if (Regexs.panRegex.test(updateForm?.pancard_no) === false) {
        isError = false;
        errorMessage = "Please enter valid Pancard number";
      }
    } else if (updateForm?.email) {
      if (Regexs.emailRegex.test(updateForm?.email) === false) {
        isError = false;
        errorMessage = "Please enter valid Email id";
      }
    } else if (updateForm?.no_of_family_member) {
      if (updateForm?.no_of_family_member?.length > 2) {
        isError = false;
        errorMessage = "Please enter valid family member";
      }
    } else if (updateForm?.min_budget && !updateForm.max_budget) {
      isError = false;
      errorMessage = "Please enter Maximum budget";
    } else if (updateForm?.max_budget && !updateForm.min_budget) {
      isError = false;
      errorMessage = "Please enter Minimum budget";
    } else if (updateForm?.max_emi_budget && !updateForm.min_emi_budget) {
      isError = false;
      errorMessage = "Please enter Minimum EMI budget";
    } else if (updateForm?.min_emi_budget && !updateForm.max_emi_budget) {
      isError = false;
      errorMessage = "Please enter Maximum EMI budget";
    } else if (updateForm?.min_budget && updateForm.max_budget) {
      let tempMinVal: any;
      updateForm?.min_budget_type === "K"
        ? (tempMinVal = updateForm?.min_budget * 1000)
        : updateForm?.min_budget_type === "L"
        ? (tempMinVal = updateForm?.min_budget * 100000)
        : updateForm?.min_budget_type === "Cr"
        ? (tempMinVal = updateForm?.min_budget * 10000000)
        : null;

      let tempMaxVal: any;
      updateForm?.max_budget_type === "K"
        ? (tempMaxVal = updateForm?.max_budget * 1000)
        : updateForm?.max_budget_type === "L"
        ? (tempMaxVal = updateForm?.max_budget * 100000)
        : updateForm?.max_budget_type === "Cr"
        ? (tempMaxVal = updateForm?.max_budget * 10000000)
        : null;

      if (tempMinVal >= tempMaxVal) {
        isError = false;
        errorMessage = "Maximum budget should more than Minimum budget";
      }
    } else if (updateForm?.min_emi_budget && updateForm.max_emi_budget) {
      let tempMinVal: any;
      updateForm?.min_emi_budget_type === "K"
        ? (tempMinVal = updateForm?.min_emi_budget * 1000)
        : updateForm?.min_emi_budget_type === "L"
        ? (tempMinVal = updateForm?.min_emi_budget * 100000)
        : updateForm?.min_emi_budget_type === "Cr"
        ? (tempMinVal = updateForm?.min_emi_budget * 10000000)
        : null;

      let tempMaxVal: any;
      updateForm?.max_emi_budget_type === "K"
        ? (tempMaxVal = updateForm?.max_emi_budget * 1000)
        : updateForm?.max_emi_budget_type === "L"
        ? (tempMaxVal = updateForm?.max_emi_budget * 100000)
        : updateForm?.max_emi_budget_type === "Cr"
        ? (tempMaxVal = updateForm?.max_emi_budget * 10000000)
        : null;

      if (tempMinVal >= tempMaxVal) {
        isError = false;
        errorMessage = "Maximum Emi should more than Minimum Emi";
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
  const handleBackPress = () => {
    navigation.goBack();
  };

  const getSourcingManagerList = async () => {
    try {
      dispatch({ type: START_LOADING });
      console.log("Fetching sourcing manager list...");
      // Simulate API call with a delay
      const res = await apiCall("post", apiEndPoints.GET_PROPERTY_BASE_SM, {
        property_id: updateForm?.property_id,
      });
      if (res?.data?.status === 200) {
        dispatch({ type: STOP_LOADING });
        setSourcingManagerList(res?.data?.data);
      } else if (res?.data?.status === 201) {
        ErrorMessage({
          msg: res?.data?.message,
          backgroundColor: RED_COLOR,
        });
        dispatch({ type: STOP_LOADING });
        return false;
      }
    } catch (error) {
      console.error("Error fetching sourcing manager list:", error);
    }
  };

  const getClosingManagerList = async () => {
    try {
      dispatch({ type: START_LOADING });
      console.log("Fetching CLOSING manager list...");
      // Simulate API call with a delay
      const res = await apiCall("post", apiEndPoints.GET_PROPERTY_BASE_CM, {
        property_id: updateForm?.property_id,
      });
      if (res?.data?.status === 200) {
        dispatch({ type: STOP_LOADING });
        setClosingManagerList(res?.data?.data);
      } else if (res?.data?.status === 201) {
        ErrorMessage({
          msg: res?.data?.message,
          backgroundColor: RED_COLOR,
        });
        dispatch({ type: STOP_LOADING });
        return false;
      }
    } catch (error) {
      console.error("Error fetching sourcing manager list:", error);
    }
  };

  const onPressNext = (type: any) => {
    if (validation()) {
      let edit_params: any = {
        lead_id: updateForm?.lead_id,
        first_name: updateForm?.first_name?.trim(),
        email: updateForm?.email,
        mobile: updateForm?.mobile,
        gender: updateForm?.gender,
        birth_date: updateForm?.birth_date,
        address: updateForm?.address,
        location: updateForm?.location,
        locality: updateForm?.locality,
        latitude: updateForm?.latitude,
        longitude: updateForm?.longitude,
        city: updateForm?.city,
        occupation: updateForm?.occupation,
        coumpany_name: updateForm?.coumpany_name,
        desigantion: updateForm?.desigantion,
        office_address: updateForm?.office_address,
        remark: updateForm?.remark,
        configuration_id: updateForm?.configuration_id,
        configuration: updateForm?.configuration,
        areain_sqlft: updateForm?.areain_sqlft,
        income: updateForm?.income,
        budget: updateForm?.max_budget
          ? updateForm?.max_budget
          : updateForm?.budget && "",
        funding_type: updateForm?.funding_type,
        purpose: updateForm?.purpose,
        whenby: updateForm?.whenby,
        agent_code: updateForm?.agent_code,
        adhar_no: updateForm?.adhar_no,
        pancard_no: updateForm?.pancard_no,
        whatsapp_no: updateForm?.whatsapp_no,
        funding_emi_type: updateForm?.funding_emi_type,
        min_budget: updateForm?.min_budget,
        min_budget_type: updateForm?.min_budget_type,
        max_budget: updateForm?.max_budget,
        max_budget_type: updateForm?.max_budget_type,
        expected_possession_date: updateForm?.expected_possession_date,
        property_id: updateForm?.property_id,
        property_type_title: updateForm?.property_type_title,
        min_emi_budget: updateForm?.min_emi_budget
          ? updateForm.min_emi_budget
          : "",
        min_emi_budget_type: updateForm?.min_emi_budget_type
          ? updateForm?.min_emi_budget_type
          : "",
        max_emi_budget: updateForm?.max_emi_budget
          ? updateForm?.max_emi_budget
          : "",
        max_emi_budget_type: updateForm?.max_emi_budget_type
          ? updateForm?.max_emi_budget_type
          : "",
        marital_status: updateForm?.marital_status,
        no_of_family_member: updateForm?.no_of_family_member,
        current_stay: updateForm?.current_stay,
        property_type: updateForm?.property_type,
        preferred_bank: updateForm?.preferred_bank,
        lead_source:
          updateForm?.lead_source_id == CONST_IDS?.ref_lead_source_id
            ? updateForm?.lead_source_id
            : updateForm?.lead_source_id ==
              CONST_IDS?.ref_partner_lead_source_id
            ? CONST_IDS?.ref_lead_source_id
            : updateForm?.lead_source_id,
        lead_source_title: updateForm?.lead_source_title,
        cp_name: updateForm?.cp_name,
        country_code: updateForm?.country_code,
        draft: true,
      };
      if (updateForm?.new_cm_id) {
        edit_params = {
          ...edit_params,
          new_cm_id: updateForm?.new_cm_id,
        };
      }
      if (updateForm?.for_sm_id) {
        edit_params = {
          ...edit_params,
          for_sm_id: updateForm?.for_sm_id,
        };
      }
      if (updateForm?.cp_emp_id) {
        edit_params = {
          ...edit_params,
          cp_emp_id: updateForm?.cp_emp_id,
        };
      }
      if (updateForm?.cp_type) {
        edit_params = {
          ...edit_params,
          cp_type: updateForm?.cp_type,
        };
      }
      if (updateForm?.cp_lead_type) {
        edit_params = {
          ...edit_params,
          cp_lead_type: updateForm?.cp_lead_type,
        };
      }
      if (updateForm?.cp_id) {
        edit_params = {
          ...edit_params,
          cp_id: updateForm?.cp_id,
        };
      }
      if (
        updateForm?.lead_source_id == CONST_IDS?.ref_lead_source_id ||
        updateForm?.lead_source_id == CONST_IDS?.ref_partner_lead_source_id
      ) {
        edit_params = {
          ...edit_params,
          referrer_name: updateForm?.referrer_name,
          referrer_email: updateForm?.referrer_email,
          referrer_contact: updateForm?.referrer_contact,
          referrel_partner: updateForm?.referrel_partner,
        };
      }
      console.log(updateForm?.lead_source_id);
      console.log(edit_params);
      // return;
      dispatch(editVisitor(edit_params));
    }
  };

  const checkMobileExistWithSameProperty = async () => {
    let params: any = {
      mobile: updateForm?.mobile,
      property_id: updateForm.property_id,
    };
    dispatch({ type: START_LOADING });

    try {
      const res = await apiCall(
        "post",
        apiEndPoints.CHECK_VISIT_MOB_AVAILABLE,
        params
      );

      if (res?.data?.status === 200) {
        dispatch({ type: STOP_LOADING });
        return true;
      } else if (res?.data?.status === 201) {
        setMobileError(res?.data?.message);
        setOkIsVisible(true);
        setTimeout(() => {
          setUpdateForm({
            ...updateForm,
            mobile: "",
          });
        }, 500);
        dispatch({ type: STOP_LOADING });
        return false;
      }
    } catch (e) {
      dispatch({
        type: STOP_LOADING,
      });
    }
  };

  const onPressRightButton = () => {
    setOkIsVisible(false);
  };

  const checkPhoneNumberIsValid = async (type: any) => {
    const isMobile = type === 1;
    const number = isMobile ? updateForm?.mobile : updateForm?.referrer_contact;
    const phType = isMobile ? "mobile" : "referrer";

    if (!number) {
      return ErrorMessage({
        msg: `Please fill ${phType} number`,
        backgroundColor: RED_COLOR,
      });
    }

    const isValid =
      (countryCode === "+91" && Regexs.mobilenumRegex.test(number)) ||
      (countryCode !== "+91" && number.length >= 10);

    if (!isValid) {
      return ErrorMessage({
        msg: `Please enter a valid ${phType} number`,
        backgroundColor: RED_COLOR,
      });
    }
  };

  const checkRefferrerNumberExist = async () => {
    dispatch({ type: START_LOADING });
    try {
      const res = await apiCall(
        "post",
        apiEndPoints.CHECK_REFERENCE_NMBR_EXIST,
        { referrer_contact: updateForm?.referrer_contact }
      );
      if (res?.data?.status === 200) {
        dispatch({ type: STOP_LOADING });
        setUpdateForm({
          ...updateForm,
          referrer_name: res?.data?.data,
          referrer_email: res?.data?.referrer_email,
          referrerNmbrExist: true,
          referrerEmailExist: res?.data?.referrer_email ? true : false,
        });
        // setTimeout(() => {
        if (!updateForm?.referrer_name) {
          ErrorMessage({
            msg: "This referrer number is associated with " + res?.data?.data,
            backgroundColor: GREEN_COLOR,
          });
        }

        // }, 500);
      } else if (res?.data?.status === 201) {
        dispatch({ type: STOP_LOADING });
        setUpdateForm({
          ...updateForm,
          referrerEmailExist: false,
          referrerNmbrExist: false,
        });
        return false;
      }
    } catch (e) {
      dispatch({
        type: STOP_LOADING,
      });
    }
  };

  return (
    <>
      <VisitorUpdateFirstView
        handleBackPress={handleBackPress}
        updateForm={updateForm}
        setUpdateForm={setUpdateForm}
        onPressNext={onPressNext}
        allProperty={allProperty}
        masterDatas={masterDatas}
        companyList={companyList}
        // handleCompanyDropdownPress={handleCompanyDropdownPress}
        employeeList={employeeList}
        handleEmployeeDropdownPress={handleEmployeeDropdownPress}
        configuration={configuration}
        setConfiguration={setConfiguration}
        selectCountryData={selectCountryData}
        handleCloseCountry={handleCloseCountry}
        countryData={countryData}
        countryCode={countryCode}
        setCountryCode={setCountryCode}
        countyPicker={countyPicker}
        setCountyPicker={setCountyPicker}
        handleCountryCode={handleCountryCode}
        checkMobileExistWithSameProperty={checkMobileExistWithSameProperty}
        okIsVisible={okIsVisible}
        mobileerror={mobileerror}
        onPressRightButton={onPressRightButton}
        setAllProperty={setAllProperty}
        handleLeadSourcePressForSm={getCPByProperty}
        handleDropdownPress={handleDropdownPress}
        getSourcingManagerList={getSourcingManagerList}
        sourcingManagerList={sourcingManagerList}
        checkPhoneNumberIsValid={checkPhoneNumberIsValid}
        checkRefferrerNumberExist={checkRefferrerNumberExist}
        getClosingManagerList={getClosingManagerList}
        closingManagerList={closingManagerList}
      />
    </>
  );
};
export default DraftVisitorUpdateScreen;
