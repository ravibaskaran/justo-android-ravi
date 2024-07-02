import { View, Text, Alert, Keyboard } from "react-native";
import React, { useEffect, useLayoutEffect, useState } from "react";
import AddNewVisitorForm from "./Components/AddNewVisitorForm";
import { useDispatch, useSelector } from "react-redux";
import {
  addVisitor,
  addVisitorRemove,
  addVisitorWithoutProperty,
  checkVisitAvailble,
  CheckVisitAvailRemove,
  editVisitor,
  getVisitorDetail,
} from "app/Redux/Actions/LeadsActions";
import ErrorMessage from "app/components/ErrorMessage";
import {
  CONST_IDS,
  GREEN_COLOR,
  RED_COLOR,
  ROLE_IDS,
  Regexs,
} from "app/components/utilities/constant";
import { getAllMaster } from "app/Redux/Actions/MasterActions";
import { getAllProperty } from "app/Redux/Actions/propertyActions";
import { getAssignCPList } from "app/Redux/Actions/SourcingManagerActions";
import {
  getCompanyList,
  getEmployeeList,
} from "app/Redux/Actions/CompanyActions";
import strings from "app/components/utilities/Localization";
import apiEndPoints from "app/components/utilities/apiEndPoints";
import { apiCall } from "app/components/utilities/httpClient";
import moment from "moment";
import { DATE_FORMAT } from "react-native-gifted-chat";
import JustForOkModal from "app/components/Modals/JustForOkModal";
import { START_LOADING, STOP_LOADING } from "app/Redux/types";
import { CountryArray } from "app/components/utilities/countryData";
import { useFocusEffect } from "@react-navigation/native";

const AddNewVisitorScreen = ({ navigation, route }: any) => {
  const { type, data } = route?.params || {};
  const dispatch: any = useDispatch();
  const { response = {}, detail = "" } = useSelector(
    (state: any) => state.visitorData
  );
  const [formData, setFormData] = useState<any>({
    first_name: "",
    adhar_no: "",
    pancard_no: "",
    gender: "",
    birth_date: "",
    mobile: "",
    whatsapp_no: "",
    email: "",
    location: "",
    locality: "",
    configuration_id: "",
    expected_possession_date: "",
    min_budget: "",
    min_budget_type: "L",
    max_budget: "",
    max_budget_type: "L",
    funding_type: "",
    funding_emi_type: "",
    purpose: "",
    occupation: "",
    desigantion: "",
    office_address: "",
    module_id: "",
    property_id: "",
    property_type_title: "",
    min_emi_budget: "",
    min_emi_budget_type: "L",
    max_emi_budget: "",
    max_emi_budget_type: "L",
    areain_sqlft: "",
    coumpany_name: "",
    remark: "",
    lead_source: "",
    marital_status: "",
    no_of_family_member: "",
    current_stay: "",
    property_type: "",
    preferred_bank: "",
    visit_confirmation_status: 1,

    cp_type: "",
    cp_id: "",
    cp_emp_id: "",
    country_code: "+91",
  });
  const [NavigationType, setNavigationType] = useState(0);
  const [dropDownType, setDropDownType] = useState(0);
  const [masterDatas, setMasterDatas] = useState<any>([]);
  const [allProperty, setAllProperty] = useState<any>([]);
  const [visitCheckModal, setVisitCheckModal] = useState<any>(false);
  const [emailMobvalidation, setEmailMobValidation] = useState({
    mobile: null,
  });
  const [configuration, setConfiguration] = useState<any>([]);
  const masterData = useSelector((state: any) => state.masterData) || {};
  const propertyData = useSelector((state: any) => state.propertyData) || {};
  const companyData = useSelector((state: any) => state.companyData) || {};
  const employeeData = useSelector((state: any) => state.employeeData) || {};
  const editData = useSelector((state: any) => state.editVisitorData) || {};
  const addData = useSelector((state: any) => state.addVisitorData) || {};
  const { userData = {} } = useSelector((state: any) => state.userData) || [];
  const visitAVailableData =
    useSelector((state: any) => state.checkVisitorData) || {};
  const SmCpList = useSelector((state: any) => state.SourcingManager) || [];
  const [agentList, setAgentList] = useState<any>([]);
  const [dropdownAgentList, setDropdownAgentList] = useState<any>([]);
  const [companyList, setCompanyList] = useState<any>([]);
  const [sourcingPropertyList, setSourcingPropertyList] = useState<any>([]);
  const [employeeList, setEmployeeList] = useState<any>([]);
  const [mobileerror, setMobileError] = useState<any>("");
  const [okIsVisible, setOkIsVisible] = useState(false);
  const [countryData, setCountryData] = useState(CountryArray);
  const [countryCode, setCountryCode] = useState("+91");
  const [countyPicker, setCountyPicker] = useState(false);
  const [disabled, setDisabled] = useState(false);
  useEffect(() => {
    if (type === "edit") {
      if (data?._id) {
        dispatch(
          getVisitorDetail({
            lead_id: data._id,
          })
        );
      }
    }
    if (type === "propertySelect") {
      setFormData({
        ...formData,
        property_id: data?._id,
        property_type_title: data?.property_type_title,
        property_title: data?.property_title,
      });
    }
  }, [detail, type]);
  useEffect(() => {
    if (
      type == "propertySelect" &&
      formData?.lead_source !== CONST_IDS?.cp_lead_source_id
    ) {
      setFormData({
        ...formData,
        property_id: data?._id,
        property_type_title: data?.property_type_title,
        property_title: data?.property_title,
      });
    }
  }, [formData?.lead_source]);

  // useEffect(() => {
  //   if (companyData?.response?.status === 200) {
  //     setCompanyList(companyData?.response?.company);
  //   } else {
  //     setCompanyList([]);
  //   }
  //   console.log('companyList: ', companyList);

  // }, [companyData])
  useEffect(() => {
    if (employeeData?.response?.status === 200) {
      setEmployeeList(employeeData?.response?.data);
    } else {
      setEmployeeList([]);
    }
  }, [employeeData]);

  useEffect(() => {
    handleDropdownPress(13);
    dispatch(
      getAllProperty({
        offset: 0,
        limit: "",
      })
    );
    dispatch(
      getAssignCPList({
        user_id: userData?.data?.user_id,
        status: "",
      })
    );
  }, [navigation]);

  useEffect(() => {
    if (SmCpList?.response?.status === 200) {
      setAgentList(SmCpList?.response?.data);
    } else {
      setAgentList([]);
    }
  }, [SmCpList]);
  const handleDropdownPress = (type: any) => {
    // setMasterDatas([])
    setDropDownType(type);
    dispatch(
      getAllMaster({
        type: type,
      })
    );
  };
  const handleCompanyDropdownPress = () => {
    const tempArr = agentList.filter((el: any) => el?.cp_type === 2);
    setCompanyList(tempArr);
  };
  const handleCpNameDropdownPress = () => {
    const tempArr = agentList.filter(
      (el: any) => el?.cp_type !== 2 || el?.cp_type === undefined
    );
    setDropdownAgentList(tempArr);
  };
  const handleEmployeeDropdownPress = () => {
    dispatch(
      getEmployeeList({
        agency_id: formData?.cp_id,
      })
    );
  };

  useEffect(() => {
    if (masterData?.response?.status === 200) {
      if (masterData?.response?.data?.length > 0) {
        if (dropDownType === 2) {
          setConfiguration(masterData?.response?.data);
        } else {
          setMasterDatas(masterData?.response?.data);
        }
      }
    } else {
      setMasterDatas([]);
      setConfiguration([]);
    }
  }, [masterData, dropDownType]);

  useEffect(() => {
    if (propertyData?.response) {
      const { response, loading, list } = propertyData;
      if (response?.status === 200 && response?.data?.length > 0) {
        setSourcingPropertyList(
          response?.data?.filter((el: any) => el?.status === true)
        );
      } else {
        setSourcingPropertyList([]);
      }
    }
  }, [propertyData]);

  const handleGetProperty = async (id: any) => {
    dispatch({ type: START_LOADING });
    dispatch(
      getAllProperty({
        offset: 0,
        limit: "",
      })
    );
    const params = {
      cp_id: id,
    };
    const res = await apiCall(
      "post",
      apiEndPoints.GET_CP_PROPERTY_FOR_SM,
      params
    );
    const response: any = res?.data;
    if (response?.status === 200) {
      if (response?.data?.length > 0) {
        dispatch({ type: STOP_LOADING });
        const list = sourcingPropertyList?.filter((o1: any) =>
          response?.data?.some((o2: any) => o1?.property_id === o2?.property_id)
        );
        setAllProperty(list);
        if (list?.length === 0) {
          ErrorMessage({
            msg: "No property assigned to this CP",
            backgroundColor: RED_COLOR,
          });
        }
      } else {
        dispatch({ type: STOP_LOADING });
        setAllProperty([]);
      }
    } else {
      dispatch({ type: STOP_LOADING });
      ErrorMessage({
        msg: response?.message,
        backgroundColor: RED_COLOR,
      });
      setAllProperty([]);
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      if (
        userData?.data?.role_id === ROLE_IDS.closingtl_id ||
        userData?.data?.role_id === ROLE_IDS.closingmanager_id ||
        userData?.data?.role_id === ROLE_IDS.sitehead_id ||
        userData?.data?.role_id === ROLE_IDS.clusterhead_id ||
        userData?.data?.role_id === ROLE_IDS.businesshead_id
      ) {
        dispatch(
          getAllProperty({
            offset: 0,
            limit: "",
          })
        );
        getAllPropertyData();
      }
      return () => {};
    }, [navigation])
  );

  // useEffect(() => {
  //   if (!(formData?.lead_source_id === CONST_IDS?.cp_lead_source_id) && propertyData?.response?.status === 200) {
  //     if (propertyData?.response?.data?.length > 0) {
  //       const activeData = propertyData?.response?.data.filter(
  //         (el: any) => {
  //           return el.status == true;
  //         }
  //       );
  //       console.log("🚀 ~ file: index.tsx:311 ~ propertyData?.response?.data:", propertyData?.response?.data)
  //       activeData?.length > 0
  //         ? setAllProperty(activeData)
  //         : setAllProperty([]);
  //     } else {
  //       setAllProperty([]);
  //     }
  //   } else {
  //     setAllProperty([]);
  //   }
  // }, [propertyData, formData?.lead_source])

  // useEffect(() => {
  //   if (
  //     userData?.data?.role_id === ROLE_IDS.closingtl_id ||
  //     userData?.data?.role_id === ROLE_IDS.closingmanager_id ||
  //     userData?.data?.role_id === ROLE_IDS.sitehead_id ||
  //     userData?.data?.role_id === ROLE_IDS.clusterhead_id ||
  //     userData?.data?.role_id === ROLE_IDS.businesshead_id
  //   ) {
  //     dispatch(
  //       getAllProperty({
  //         offset: 0,
  //         limit: "",
  //       })
  //     );
  //     getAllPropertyData();

  //     if (propertyData?.response?.status === 200) {
  //       if (propertyData?.response?.data?.length > 0) {
  //         const activeData = propertyData?.response?.data.filter((el: any) => {
  //           return el.status == true;
  //         });
  //         activeData?.length > 0
  //           ? setAllProperty(activeData)
  //           : setAllProperty([]);
  //       } else {
  //         setAllProperty([]);
  //       }
  //     } else {
  //       setAllProperty([]);
  //     }
  //   }
  // }, [propertyData]);

  const getAllPropertyData = () => {
    if (propertyData?.response?.status === 200) {
      setAllProperty(propertyData?.response?.data);
    }
  };

  const handleBackPress = () => {
    navigation.goBack();
  };

  const OnpressseheduleVisit = () => {
    if (validation()) {
      OnpressCreateEdit();
      // navigation.navigate('AddAppointmentForSite', {type: 'visitAppo'})
    }
  };

  const validation = () => {
    setDisabled(true)
    setTimeout(() => {
      setDisabled(false);
    }, 3000);
    if (emailMobvalidation?.mobile === "start") {
      Keyboard.dismiss();
    }
    if (emailMobvalidation?.mobile !== "start") {
      let isError = true;
      let errorMessage: any = "";

      if (
        formData?.first_name?.trim() === "" ||
        formData?.first_name?.trim() === undefined
      ) {
        isError = false;
        errorMessage = "Please fill visitor name";
      } else if (
        Regexs.oneSpaceRegex.test(formData?.first_name?.trim()) === false
      ) {
        isError = false;
        errorMessage = strings.NameCorrectlyVal;
      } else if (
        formData?.country_code === "" ||
        formData?.country_code === undefined ||
        formData?.country_code === null
      ) {
        isError = false;
        errorMessage = "Please enter country code";
      } else if (
        formData?.mobile === "" ||
        formData?.mobile === undefined ||
        formData?.mobile === null
      ) {
        isError = false;
        errorMessage = "Please fill mobile number";
      } else if (
        formData?.mobile &&
        countryCode === "+91" &&
        Regexs.mobilenumRegex.test(formData?.mobile) === false
      ) {
        isError = false;
        errorMessage = "Please Enter valid mobile number";
      } else if (
        formData?.mobile &&
        countryCode !== "+91" &&
        formData?.mobile?.length < 10
      ) {
        isError = false;
        errorMessage = "Please Enter valid mobile number";
      } else if (
        formData?.visit_confirmation_status === "" ||
        formData?.visit_confirmation_status === undefined
      ) {
        isError = false;
        errorMessage = "Please check entered mobile number";
      } else if (
        formData?.lead_source === "" ||
        formData.lead_source === undefined
      ) {
        isError = false;
        errorMessage = "Please enter Lead Source";
      }  else if (
        type != "edit" &&
        formData?.property_id === "" &&
        formData?.property_type_title === ""
      ) {
        isError = false;
        errorMessage = "Please select property name";
      } else if (formData.gender == undefined || formData.gender == "") {
        isError = false;
        errorMessage = strings.genderReqVal;
      } else if (
        formData?.adhar_no &&
        Regexs.AadharRegex.test(formData?.adhar_no) === false
      ) {
        isError = false;
        errorMessage = "Please enter valid Aadhaar number";
      } else if (
        formData?.pancard_no &&
        Regexs.panRegex.test(formData?.pancard_no) === false
      ) {
        isError = false;
        errorMessage = "Please enter valid Pancard number";
      }
      // else if (
      //   formData?.whatsapp_no &&
      //   Regexs.phoneNumRegex.test(formData?.whatsapp_no) === false
      // ) {
      //   isError = false;
      //   errorMessage = "Please enter valid whatsapp number";
      // }
      else if (
        formData?.email &&
        Regexs.emailRegex.test(formData?.email) === false
      ) {
        isError = false;
        errorMessage = "Please enter valid Email id";
      } else if (
        formData?.no_of_family_member &&
        formData?.no_of_family_member?.length > 2
      ) {
        isError = false;
        errorMessage = "Please enter valid family member";
      } else if (formData?.min_budget && !formData.max_budget) {
        isError = false;
        errorMessage = "Please enter Maximum budget";
      } else if (formData?.max_budget && !formData.min_budget) {
        isError = false;
        errorMessage = "Please enter Minimum budget";
      } else if (formData?.max_emi_budget && !formData.min_emi_budget) {
        isError = false;
        errorMessage = "Please enter Minimum EMI budget";
      } else if (formData?.min_emi_budget && !formData.max_emi_budget) {
        isError = false;
        errorMessage = "Please enter Maximum EMI budget";
      } else if (formData?.min_budget === "" && formData?.max_budget !== "") {
        isError = false;
        errorMessage = "Please enter minimum budget also";
      }
      if (formData?.lead_source === CONST_IDS.cp_lead_source_id) {
        if (formData.cp_type == undefined || formData.cp_type == "") {
          isError = false;
          errorMessage = "Please Enter Channel Partner type";
        } else if (formData.cp_id == undefined || formData.cp_id == "") {
          isError = false;
          errorMessage =
            formData.cp_type === 1
              ? "Please Enter CP Name"
              : "Please Enter CP Company Name";
        }
      }
      if (formData?.min_budget || formData.max_budget) {
        let tempMinVal: any;
        formData?.min_budget_type === "K"
          ? (tempMinVal = formData?.min_budget * 1000)
          : formData?.min_budget_type === "L"
          ? (tempMinVal = formData?.min_budget * 100000)
          : formData?.min_budget_type === "Cr"
          ? (tempMinVal = formData?.min_budget * 10000000)
          : null;

        let tempMaxVal: any;
        formData?.max_budget_type === "K"
          ? (tempMaxVal = formData?.max_budget * 1000)
          : formData?.max_budget_type === "L"
          ? (tempMaxVal = formData?.max_budget * 100000)
          : formData?.max_budget_type === "Cr"
          ? (tempMaxVal = formData?.max_budget * 10000000)
          : null;

        if (tempMinVal >= tempMaxVal) {
          isError = false;
          errorMessage = "Maximum budget should more than Minimum budget";
        }
      } else if (
        formData?.min_emi_budget === "" &&
        formData?.max_emi_budget !== ""
      ) {
        isError = false;
        errorMessage = "Please enter minimum emi also";
      }
      if (formData?.min_emi_budget || formData.max_emi_budget) {
        let tempMinVal: any;
        formData?.min_emi_budget_type === "K"
          ? (tempMinVal = formData?.min_emi_budget * 1000)
          : formData?.min_emi_budget_type === "L"
          ? (tempMinVal = formData?.min_emi_budget * 100000)
          : formData?.min_emi_budget_type === "Cr"
          ? (tempMinVal = formData?.min_emi_budget * 10000000)
          : null;

        let tempMaxVal: any;
        formData?.max_emi_budget_type === "K"
          ? (tempMaxVal = formData?.max_emi_budget * 1000)
          : formData?.max_emi_budget_type === "L"
          ? (tempMaxVal = formData?.max_emi_budget * 100000)
          : formData?.max_emi_budget_type === "Cr"
          ? (tempMaxVal = formData?.max_emi_budget * 10000000)
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
    }
  };

  useEffect(() => {
    if (editData?.update || addData?.create) {
      dispatch(addVisitorRemove());
      if (NavigationType === 1) {
        setNavigationType(0);

        if (
          userData?.data?.role_id === ROLE_IDS.closingmanager_id ||
          userData?.data?.role_id === ROLE_IDS.closingtl_id
        ) {
          navigation.navigate(
            "AppointmentDetailMain",
            addData?.response?.appointmentDetail
          );
        } else {
          navigation.navigate("LeadManagementScreen");
        }
      } else if (NavigationType === 2) {
        setNavigationType(0);
        navigation.navigate("AddAppointmentForSite", {
          type: "Add",
          item: {
            _id: addData?.response?.data?._id
              ? addData?.response?.data?._id
              : "",
            customer_first_name: addData?.response?.data?.customer?.first_name
              ? addData?.response?.data?.customer?.first_name
              : "",
            property_id: addData?.response?.data?.property_id
              ? addData?.response?.data?.property_id
              : "",
            property_title: data?.property_title ? data?.property_title : "",
            pickup: data?.pickup,
          },
        });
      }
      ErrorMessage({
        msg: editData?.update
          ? editData?.response?.message
          : addData?.create
          ? addData?.response?.message
          : "no message",
        backgroundColor: GREEN_COLOR,
      });
    }
  }, [editData, addData]);

  useEffect(() => {
    if (
      visitAVailableData?.response?.status === 200 ||
      visitAVailableData?.response?.status === 201 ||
      visitAVailableData?.response?.status === 202
    ) {
      dispatch(CheckVisitAvailRemove());
      if (visitAVailableData?.response?.status === 200) {
        switch (visitAVailableData?.check_type) {
          case "mobile":
            setEmailMobValidation({
              ...emailMobvalidation,
              mobile: visitAVailableData?.check_type,
            });
            setFormData({
              ...formData,
              visit_confirmation_status: 1,
            });
            break;
        }
      } else {
        setEmailMobValidation({
          ...emailMobvalidation,
          mobile: null,
        });
        setVisitCheckModal(true);
      }
    }
  }, [visitAVailableData]);

  const handleCheckEmailMobile = async () => {
    let params: any = {
      mobile: formData?.mobile,
      property_id: formData?.property_id,
      visitor_name: formData?.first_name?.trim(),
      cp_id: formData?.cp_id,
    };
    dispatch({ type: START_LOADING });

    try {
      const res = await apiCall(
        "post",
        apiEndPoints.CHECK_VISIT_AVAILABLE,
        params
      );
      if (res?.data?.status === 200) {
        dispatch({ type: STOP_LOADING });
        return true;
      } else if (res?.data?.status === 201) {
        setMobileError(res?.data?.message);
        setOkIsVisible(true);
        dispatch({ type: STOP_LOADING });
        return false;
      } else if (res?.data?.status === 202) {
        setFormData({
          ...formData,
          address: res?.data?.data[0]?.address
            ? res?.data?.data[0]?.address
            : "",
          adhar_no: res?.data?.data[0]?.adhar_no
            ? res?.data?.data[0]?.adhar_no
            : "",
          age: res?.data?.data[0]?.age ? res?.data?.data[0]?.age : "",
          agent_code: res?.data?.data[0]?.agent_code
            ? res?.data?.data[0]?.agent_code
            : "",
          area: res?.data?.data[0]?.area ? res?.data?.data[0]?.area : "",
          city: res?.data?.data[0]?.city ? res?.data?.data[0]?.city : "",
          coumpany_name: res?.data?.data[0]?.coumpany_name
            ? res?.data?.data[0]?.coumpany_name
            : "",
          current_stay: res?.data?.data[0]?.current_stay
            ? res?.data?.data[0]?.current_stay
            : "",
          desigantion: res?.data?.data[0]?.desigantion
            ? res?.data?.data[0]?.desigantion
            : "",
          email: res?.data?.data[0]?.email ? res?.data?.data[0]?.email : "",
          first_name: res?.data?.data[0]?.first_name
            ? res?.data?.data[0]?.first_name
            : "",
          funding_emi_type: res?.data?.data[0]?.funding_emi_type
            ? res?.data?.data[0]?.funding_emi_type
            : "",
          gender: res?.data?.data[0]?.gender ? res?.data?.data[0]?.gender : "",
          locality: res?.data?.data[0]?.locality
            ? res?.data?.data[0]?.locality
            : "",
          location: res?.data?.data[0]?.location
            ? res?.data?.data[0]?.location
            : "",
          marital_status: res?.data?.data[0]?.marital_status
            ? res?.data?.data[0]?.marital_status
            : "",
          mobile: res?.data?.data[0]?.mobile ? res?.data?.data[0]?.mobile : "",
          no_of_family_member: res?.data?.data[0]?.no_of_family_member
            ? res?.data?.data[0]?.no_of_family_member
            : "",
          occupation: res?.data?.data[0]?.occupation
            ? res?.data?.data[0]?.occupation
            : "",
          office_address: res?.data?.data[0]?.office_address
            ? res?.data?.data[0]?.office_address
            : "",
          pancard_no: res?.data?.data[0]?.pancard_no
            ? res?.data?.data[0]?.pancard_no
            : "",
          visit_type: res?.data?.data[0]?.visit_type
            ? res?.data?.data[0]?.visit_type
            : "",
          whatsapp_no: res?.data?.data[0]?.whatsapp_no
            ? res?.data?.data[0]?.whatsapp_no
            : "",
          birth_date: res?.data?.data[0]?.birth_date
            ? moment(res?.data?.data[0]?.birth_date).format(DATE_FORMAT)
            : "",
          visit_confirmation_status: 2,
        });
        dispatch({ type: STOP_LOADING });
        return true;
      }
    } catch (e) {
      dispatch({
        type: STOP_LOADING,
      });
    }
  };
  const OnpressCreateEdit = async () => {
    if (validation()) {
      if (type === "edit") {
        let edit_params: any = {
          lead_id: formData?.lead_id,
          first_name: formData?.first_name?.trim(),
          email: formData?.email,
          mobile: formData?.mobile,
          gender: formData?.gender,
          birth_date: formData?.birth_date,
          address: formData?.address,
          location: formData?.location,
          latitude: formData?.latitude,
          longitude: formData?.longitude,
          city: formData?.city,
          occupation: formData?.occupation,
          coumpany_name: formData?.coumpany_name,
          desigantion: formData?.desigantion,
          office_address: formData?.office_address,
          configuration_id: formData?.configuration_id,
          configuration: formData?.configuration,
          areain_sqlft: formData?.areain_sqlft,
          income: formData?.income,
          budget: formData?.max_budget
            ? formData?.max_budget
            : formData?.budget && "",
          funding_type: formData?.funding_type,
          purpose: formData?.purpose,
          whenby: formData?.whenby,
          agent_code: formData?.agent_code, //not in add time
          adhar_no: formData?.adhar_no,
          pancard_no: formData?.pancard_no,
          whatsapp_no: formData?.whatsapp_no,
          funding_emi_type: formData?.funding_emi_type,
          min_budget: formData?.min_budget,
          min_budget_type: formData?.min_budget_type,
          max_budget: formData?.max_budget,
          max_budget_type: formData?.max_budget_type,
          expected_possession_date: formData?.expected_possession_date,
          property_id: formData?.property_id,
          property_type_title: "",
          min_emi_budget: formData?.min_emi_budget
            ? formData.min_emi_budget
            : "",
          min_emi_budget_type: formData?.min_emi_budget_type
            ? formData?.min_emi_budget_type
            : "",
          max_emi_budget: formData?.max_emi_budget
            ? formData?.max_emi_budget
            : "",
          max_emi_budget_type: formData?.max_emi_budget_type
            ? formData?.max_emi_budget_type
            : "",
          locality: formData?.locality,
          remark: formData?.remark,
          lead_source: formData?.lead_source,
          lead_source_title: formData?.lead_source_title,
          marital_status: formData?.marital_status,
          no_of_family_member: formData?.no_of_family_member,
          current_stay: formData?.current_stay,
          property_type: formData?.property_type,
          preferred_bank: formData?.preferred_bank,
          country_code: formData?.country_code,
          // visit_confirmation_status: formData?.visit_confirmation_status,
          // cp_type: formData?.cp_type,
          // cp_id: formData?.cp_id,
          // cp_emp_id: formData?.cp_emp_id,
        };
        if (formData?.cp_emp_id) {
          edit_params = {
            ...edit_params,
            cp_emp_id: formData?.cp_emp_id,
          };
        }
        if (formData?.cp_type) {
          edit_params = {
            ...edit_params,
            cp_type: formData?.cp_type,
          };
        }
        if (formData?.cp_id) {
          edit_params = {
            ...edit_params,
            cp_id: formData?.cp_id,
          };
        }
        dispatch(editVisitor(edit_params));
      } else {
        if (formData?.cp_id) {
          var isValidMobile: any = await handleCheckEmailMobile();
        } else {
          var isValidMobile: any = true;
        }
        if (isValidMobile) {
          let add_params: any = {
            first_name: formData?.first_name?.trim(),
            email: formData?.email,
            mobile: formData?.mobile,
            gender: formData?.gender,
            birth_date: formData?.birth_date,
            address: formData.location,
            location: formData?.location,
            latitude: "",
            longitude: "",
            city: formData?.location,
            occupation: formData?.occupation,
            coumpany_name: formData?.coumpany_name,
            desigantion: formData?.desigantion,
            office_address: formData?.office_address,
            configuration_id: formData?.configuration_id,
            configuration: formData?.configuration ?? "",
            areain_sqlft: formData?.areain_sqlft,
            budget: formData.max_budget,
            funding_type: formData?.funding_type,
            purpose: formData?.purpose,
            adhar_no: formData?.adhar_no,
            pancard_no: formData?.pancard_no,
            whatsapp_no: formData?.whatsapp_no,
            funding_emi_type: "",
            min_budget: formData?.min_budget,
            min_budget_type: formData?.min_budget_type,
            max_budget: formData?.max_budget,
            max_budget_type: formData?.max_budget_type,
            expected_possession_date: formData?.expected_possession_date,
            property_id: formData?.property_id,
            property_type_title: formData.property_type_title,
            min_emi_budget: formData?.min_emi_budget
              ? formData?.min_emi_budget
              : "",
            min_emi_budget_type: formData?.min_emi_budget_type
              ? formData?.min_emi_budget_type
              : "",
            max_emi_budget: formData?.max_emi_budget
              ? formData?.max_emi_budget
              : "",
            max_emi_budget_type: formData?.max_emi_budget_type
              ? formData?.max_emi_budget_type
              : "",
            locality: formData?.locality,
            remark: formData?.remark,
            lead_source: formData?.lead_source,
            marital_status: formData?.marital_status,
            no_of_family_member: formData?.no_of_family_member,
            current_stay: formData?.current_stay,
            property_type: formData?.property_type,
            preferred_bank: formData?.preferred_bank,
            country_code: formData?.country_code,
            visit_confirmation_status: formData?.visit_confirmation_status,
            // cp_type: formData?.cp_type,
            // cp_id: formData?.cp_id,
          };
          if (formData?.cp_emp_id) {
            add_params = {
              ...add_params,
              cp_emp_id: formData?.cp_emp_id,
            };
          }
          if (formData?.cp_type) {
            add_params = {
              ...add_params,
              cp_type: formData?.cp_type,
            };
          }
          if (formData?.cp_id) {
            add_params = {
              ...add_params,
              cp_id: formData?.cp_id,
            };
          }

          if (formData?.property_id !== "") {
            dispatch(addVisitor(add_params));
          } else {
            dispatch(addVisitorWithoutProperty(add_params));
          }
        }
      }
    }
  };

  const onPressRightButton = () => {
    setOkIsVisible(false);
  };

  async function handleCountryCode(search: any) {
    // setCountryCode(search)
    if (search) {
      if (isNaN(search)) {
        let array = CountryArray.filter((l: any) => {
          return l.name?.toLowerCase().includes(search?.toLowerCase());
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
    setFormData({
      ...formData,
      country_code: countryCode,
    });
    // setCountryFlag(flag)
    setCountyPicker(false);
  }
  const handleCloseCountry = () => {
    setCountyPicker(!countyPicker);
    setCountryData(CountryArray);
  };
  return (
    <AddNewVisitorForm
      handleBackPress={handleBackPress}
      OnpressseheduleVisit={OnpressseheduleVisit}
      OnpressCreateEdit={OnpressCreateEdit}
      type={type}
      formData={formData}
      setFormData={setFormData}
      // handleMasterDatas={handleMasterDatas}
      masterDatas={masterDatas}
      configuration={configuration}
      // handleProperty={handleProperty}
      allProperty={allProperty}
      setNavigationType={setNavigationType}
      handleDropdownPress={handleDropdownPress}
      handleCheckEmailMobile={handleCheckEmailMobile}
      emailMobvalidation={emailMobvalidation}
      setEmailMobValidation={setEmailMobValidation}
      visitCheckModal={visitCheckModal}
      setVisitCheckModal={setVisitCheckModal}
      dropdownAgentList={dropdownAgentList}
      handleCompanyDropdownPress={handleCompanyDropdownPress}
      companyList={companyList}
      employeeList={employeeList}
      handleEmployeeDropdownPress={handleEmployeeDropdownPress}
      handleCpNameDropdownPress={handleCpNameDropdownPress}
      mobileerror={mobileerror}
      onPressRightButton={onPressRightButton}
      okIsVisible={okIsVisible}
      setOkIsVisible={setOkIsVisible}
      handleGetProperty={handleGetProperty}
      setAllProperty={setAllProperty}
      countryData={countryData}
      countryCode={countryCode}
      setCountryCode={setCountryCode}
      countyPicker={countyPicker}
      setCountyPicker={setCountyPicker}
      handleCountryCode={handleCountryCode}
      selectCountryData={selectCountryData}
      handleCloseCountry={handleCloseCountry}
      disabled={disabled}
    />
  );
};

export default AddNewVisitorScreen;
