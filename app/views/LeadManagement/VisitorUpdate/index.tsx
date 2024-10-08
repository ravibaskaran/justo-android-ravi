import React, { useEffect, useLayoutEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import VisitorUpdateFirstView from "./components/VisitorUpdateFirst";
import VisitorUpdateSecondView from "./components/VisitorUpdateSecond";
import VisitorUpdateThirdView from "./components/VisitorUpdateThird";
import {
  addVisitorRemove,
  editVisitor,
  getVisitorDetail,
} from "app/Redux/Actions/LeadsActions";
import { getAllMaster } from "app/Redux/Actions/MasterActions";
import ErrorMessage from "app/components/ErrorMessage";
import {
  CONST_IDS,
  GREEN_COLOR,
  RED_COLOR,
  ROLE_IDS,
  Regexs,
} from "app/components/utilities/constant";
import { getAllProperty } from "app/Redux/Actions/propertyActions";
import { getAssignCPList } from "app/Redux/Actions/SourcingManagerActions";
import { getEmployeeList } from "app/Redux/Actions/CompanyActions";
import { START_LOADING, STOP_LOADING } from "app/Redux/types";
import { apiCall } from "app/components/utilities/httpClient";
import apiEndPoints from "app/components/utilities/apiEndPoints";
import { CountryArray } from "app/components/utilities/countryData";
import { useFocusEffect } from "@react-navigation/native";
import { Keyboard } from "react-native";

const VisitorUpdateScreen = ({ navigation, route }: any) => {
  const data = route?.params || 0;
  const dispatch: any = useDispatch();
  const { response = {}, detail = "" } = useSelector(
    (state: any) => state.visitorData
  );
  const masterData = useSelector((state: any) => state.masterData) || {};
  const editData = useSelector((state: any) => state.editVisitorData) || {};
  const propertyData = useSelector((state: any) => state.propertyData) || {};
  const { userData = {} } = useSelector((state: any) => state.userData) || [];
  const SmCpList = useSelector((state: any) => state.SourcingManager) || [];
  const employeeData = useSelector((state: any) => state.employeeData) || {};
  const [screenType, setScreenType] = useState(0);
  const [masterDatas, setMasterDatas] = useState<any>([]);
  const [agentList, setAgentList] = useState<any>([]);
  const [companyList, setCompanyList] = useState<any>([]);
  const [employeeList, setEmployeeList] = useState<any>([]);
  const [sourcingPropertyList, setSourcingPropertyList] = useState<any>([]);
  const [dropdownAgentList, setDropdownAgentList] = useState<any>([]);
  const [configuration, setConfiguration] = useState<any>([]);
  const [dropDownType, setDropDownType] = useState(0);
  const [countryData, setCountryData] = useState(CountryArray);
  const [countryCode, setCountryCode] = useState("+91");
  const [countyPicker, setCountyPicker] = useState(false);
  const [okIsVisible, setOkIsVisible] = useState(false);
  const [mobileerror, setMobileError] = useState<any>("");
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

    cp_type: "",
    cp_id: "",
    cp_emp_id: "",
    referrer_name: "",
    referrer_contact: "",
  });

  const [allProperty, setAllProperty] = useState<any>([]);

  // useEffect(() => {
  //   dispatch(
  //     getAllProperty({
  //       offset: 0,
  //       limit: "",
  //     })
  //   );
  // getAllPropertyData();
  // }, []);
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
        userData?.data?.role_id === ROLE_IDS.closing_head_id ||
        userData?.data?.role_id === ROLE_IDS.closingmanager_id ||
        userData?.data?.role_id === ROLE_IDS.clusterhead_id ||
        userData?.data?.role_id === ROLE_IDS.sitehead_id ||
        userData?.data?.role_id === ROLE_IDS.admin_id ||
        userData?.data?.role_id === ROLE_IDS.businesshead_id
      ) {
        dispatch(
          getAllProperty({
            offset: 0,
            limit: "",
          })
        );
        getAllPropertyData();

        if (propertyData?.response?.status === 200) {
          if (propertyData?.response?.data?.length > 0) {
            const activeData = propertyData?.response?.data.filter(
              (el: any) => {
                return el.status == true;
              }
            );
            activeData?.length > 0
              ? setAllProperty(activeData)
              : setAllProperty([]);
          } else {
            setAllProperty([]);
          }
        } else {
          setAllProperty([]);
        }
      }
      return () => {};
    }, [navigation])
  );

  // useEffect(() => {
  //   if (
  //     userData?.data?.role_id === ROLE_IDS.closingtl_id ||
  //     userData?.data?.role_id === ROLE_IDS.closingmanager_id ||
  //     userData?.data?.role_id === ROLE_IDS.clusterhead_id ||
  //     userData?.data?.role_id === ROLE_IDS.sitehead_id ||
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
  // }, []);

  const getAllPropertyData = () => {
    if (propertyData?.response?.status === 200) {
      setAllProperty(propertyData?.response?.data);
    }
  };

  useLayoutEffect(() => {
    if (data?.lead_id) {
      dispatch(
        getVisitorDetail({
          lead_id: data?.lead_id,
        })
      );
    }
  }, [detail, data]);

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
        cp_type: response?.data[0]?.cp_type,
        cp_id: response?.data[0]?.cp_id,
        cp_emp_id: response?.data[0]?.cp_emp_id,
        cp_name: response?.data[0]?.cp_name,
        referrer_name: response?.data[0]?.referrer_name,
        referrer_contact: response?.data[0]?.referrer_contact,
        mobile_number: response?.data[0]?.customer_detail?.mobile,
      });
      setCountryCode(response?.data[0]?.customer_detail?.country_code);
    }
  }, [response]);

  // useEffect(() => {
  //   dispatch(
  //     getAllMaster({
  //       type: 2,
  //     })
  //   );
  // }, []);

  useEffect(() => {
    handleDropdownPress(13);
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
  useEffect(() => {
    if (employeeData?.response?.status === 200) {
      setEmployeeList(employeeData?.response?.data);
    } else {
      setEmployeeList([]);
    }
  }, [employeeData]);
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
        agency_id: updateForm?.cp_id,
      })
    );
  };

  const handleDropdownPress = (type: any) => {
    // setMasterDatas([])
    setDropDownType(type);
    dispatch(
      getAllMaster({
        type: type,
      })
    );
  };

  async function handleCountryCode(search: any) {
    // setCountryCode(search)
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
    // setCountryFlag(flag)
    setCountyPicker(false);
  }
  const handleCloseCountry = () => {
    setCountyPicker(!countyPicker);
    setCountryData(CountryArray);
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
  // const validation = () => {
  //   let isError = true;
  //   let errorMessage: any = ''
  //   if (screenType === 0) {
  //     if (updateForm?.property_id === '' && updateForm?.property_type_title === '') {
  //       isError = false;
  //       errorMessage = "Please select property name"
  //     } else if (
  //       updateForm?.first_name === "" ||
  //       updateForm?.first_name === undefined
  //     ) {
  //       isError = false;
  //       errorMessage = "Please fill visitor name";
  //     } else if (Regexs.phoneNumRegex.test(updateForm?.mobile) === false) {
  //       isError = false;
  //       errorMessage = "Please enter valid Mobile number";
  //     } else if (updateForm?.whatsapp_no && Regexs.phoneNumRegex.test(updateForm?.whatsapp_no) === false) {
  //       isError = false;
  //       errorMessage = "Please enter valid whatsapp number";
  //     }
  //     if (updateForm?.lead_source_id === CONST_IDS.cp_lead_source_id) {
  //       if ( updateForm.cp_type == null || updateForm.cp_type == undefined || updateForm.cp_type == "") {
  //         isError = false;
  //         errorMessage = "Please Enter Channel Partner type";
  //       } else if (updateForm.cp_id == undefined || updateForm.cp_id == "") {
  //         isError = false;
  //         errorMessage =
  //           updateForm.cp_type === 1
  //             ? "Please Enter CP Name"
  //             : "Please Enter CP Company Name";
  //       }
  //     }
  //     if (updateForm?.adhar_no) {
  //       if (Regexs.AadharRegex.test(updateForm?.adhar_no) === false) {
  //         isError = false;
  //         errorMessage = "Please enter valid Aadhaar number";
  //       }
  //     }
  //     if (updateForm?.pancard_no) {
  //       if (Regexs.panRegex.test(updateForm?.pancard_no) === false) {
  //         isError = false;
  //         errorMessage = "Please enter valid Pancard number";
  //       }
  //     }
  //     if (updateForm?.email) {
  //       if (Regexs.emailRegex.test(updateForm?.email) === false) {
  //         isError = false;
  //         errorMessage = "Please enter valid Email id";
  //       }
  //     }
  //     if (updateForm?.no_of_family_member) {
  //       if (updateForm?.no_of_family_member?.length > 2) {
  //         isError = false;
  //         errorMessage = "Please enter valid family member";
  //       }
  //     }
  //   }
  //   if (screenType === 1) {
  //     if (updateForm?.min_budget && !updateForm.max_budget) {
  //       isError = false;
  //       errorMessage = "Please enter Maximum budget";
  //     }
  //     else if (updateForm?.max_budget && !updateForm.min_budget) {
  //       isError = false;
  //       errorMessage = "Please enter Minimum budget";
  //     }
  //     else if (updateForm?.max_emi_budget && !updateForm.min_emi_budget) {
  //       isError = false;
  //       errorMessage = "Please enter Minimum EMI budget";
  //     }
  //     else if (updateForm?.min_emi_budget && !updateForm.max_emi_budget) {
  //       isError = false;
  //       errorMessage = "Please enter Maximum EMI budget";
  //     }
  //     if (updateForm?.min_budget && updateForm.max_budget) {
  //       let tempMinVal: any;
  //       updateForm?.min_budget_type === "K"
  //         ? (tempMinVal = updateForm?.min_budget * 1000)
  //         : updateForm?.min_budget_type === "L"
  //           ? (tempMinVal = updateForm?.min_budget * 100000)
  //           : updateForm?.min_budget_type === "Cr"
  //             ? (tempMinVal = updateForm?.min_budget * 10000000)
  //             : null;

  //       let tempMaxVal: any;
  //       updateForm?.max_budget_type === "K"
  //         ? (tempMaxVal = updateForm?.max_budget * 1000)
  //         : updateForm?.max_budget_type === "L"
  //           ? (tempMaxVal = updateForm?.max_budget * 100000)
  //           : updateForm?.max_budget_type === "Cr"
  //             ? (tempMaxVal = updateForm?.max_budget * 10000000)
  //             : null;

  //       if (tempMinVal >= tempMaxVal) {
  //         isError = false;
  //         errorMessage = "Maximum budget should more than Minimum budget";
  //       }
  //     }
  //     if (updateForm?.min_emi_budget && updateForm.max_emi_budget) {
  //       let tempMinVal: any;
  //       updateForm?.min_emi_budget_type === "K"
  //         ? (tempMinVal = updateForm?.min_emi_budget * 1000)
  //         : updateForm?.min_emi_budget_type === "L"
  //           ? (tempMinVal = updateForm?.min_emi_budget * 100000)
  //           : updateForm?.min_emi_budget_type === "Cr"
  //             ? (tempMinVal = updateForm?.min_emi_budget * 10000000)
  //             : null;

  //       let tempMaxVal: any;
  //       updateForm?.max_emi_budget_type === "K"
  //         ? (tempMaxVal = updateForm?.max_emi_budget * 1000)
  //         : updateForm?.max_emi_budget_type === "L"
  //           ? (tempMaxVal = updateForm?.max_emi_budget * 100000)
  //           : updateForm?.max_emi_budget_type === "Cr"
  //             ? (tempMaxVal = updateForm?.max_emi_budget * 10000000)
  //             : null;

  //       if (tempMinVal >= tempMaxVal) {
  //         isError = false;
  //         errorMessage = "Maximum Emi should more than Minimum Emi";
  //       }
  //     }
  //   }
  //   if (errorMessage !== '') {
  //     ErrorMessage({
  //       msg: errorMessage,
  //       backgroundColor: RED_COLOR
  //     })
  //   }
  //   return isError;
  // }
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
    }
    // else if (
    //   updateForm?.whatsapp_no &&
    //   Regexs.phoneNumRegex.test(updateForm?.whatsapp_no) === false
    // ) {
    //   isError = false;
    //   errorMessage = "Please enter valid whatsapp number";
    // }
    if (updateForm?.lead_source_id === CONST_IDS.cp_lead_source_id) {
      if (
        updateForm.cp_type == null ||
        updateForm.cp_type == undefined ||
        updateForm.cp_type == ""
      ) {
        isError = false;
        errorMessage = "Please Enter Channel Partner type";
      } else if (updateForm.cp_id == undefined || updateForm.cp_id == "") {
        isError = false;
        errorMessage =
          updateForm.cp_type === 1
            ? "Please Enter CP Name"
            : "Please Enter CP Company Name";
      }
    }
    if (updateForm?.lead_source_id === CONST_IDS?.ref_lead_source_id) {
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
      }
    }
    if (updateForm?.adhar_no) {
      if (Regexs.AadharRegex.test(updateForm?.adhar_no) === false) {
        isError = false;
        errorMessage = "Please enter valid Aadhaar number";
      }
    }
    if (updateForm?.pancard_no) {
      if (Regexs.panRegex.test(updateForm?.pancard_no) === false) {
        isError = false;
        errorMessage = "Please enter valid Pancard number";
      }
    }
    if (updateForm?.email) {
      if (Regexs.emailRegex.test(updateForm?.email) === false) {
        isError = false;
        errorMessage = "Please enter valid Email id";
      }
    }
    if (updateForm?.no_of_family_member) {
      if (updateForm?.no_of_family_member?.length > 2) {
        isError = false;
        errorMessage = "Please enter valid family member";
      }
    }
    if (updateForm?.min_budget && !updateForm.max_budget) {
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
    }
    if (updateForm?.min_budget && updateForm.max_budget) {
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
    }
    if (updateForm?.min_emi_budget && updateForm.max_emi_budget) {
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
    // if (validation()) {
    navigation.goBack();
    // }
  };
  const onPressNext = (type: any) => {
    // if (type != null) {
    //   if (validation()) {
    //     setScreenType(type)
    //   }
    // } else
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
        lead_source: updateForm?.lead_source_id,
        lead_source_title: updateForm?.lead_source_title,
        // cp_type: updateForm?.cp_type,
        // cp_id: updateForm?.cp_id,
        // cp_emp_id: updateForm?.cp_emp_id,
        cp_name: updateForm?.cp_name,
        country_code: updateForm?.country_code,
      };
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
      if (updateForm?.cp_id) {
        edit_params = {
          ...edit_params,
          cp_id: updateForm?.cp_id,
        };
      }
      if (updateForm?.referrer_name) {
        edit_params = {
          ...edit_params,
          referrer_name: updateForm?.referrer_name,
        };
      }
      if (updateForm?.referrer_contact) {
        edit_params = {
          ...edit_params,
          referrer_contact: updateForm?.referrer_contact,
        };
      }
      dispatch(editVisitor(edit_params));
    }
  };
  const checkMobileExistWithSameProperty = async (propertyId: string) => {
    let params: any = {
      mobile: updateForm?.mobile,
      property_id: propertyId,
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

  return (
    <>
      {/* {screenType === 0 ?
        <VisitorUpdateFirstView
          handleBackPress={handleBackPress}
          screenType={screenType}
          updateForm={updateForm}
          setUpdateForm={setUpdateForm}
          onPressNext={onPressNext}
          allProperty={allProperty}
          handleDropdownPress={handleDropdownPress}
          masterDatas={masterDatas}
          handleCpNameDropdownPress={handleCpNameDropdownPress}
          dropdownAgentList={dropdownAgentList}
          companyList={companyList}
          handleCompanyDropdownPress={handleCompanyDropdownPress}
          employeeList={employeeList}
          handleEmployeeDropdownPress={handleEmployeeDropdownPress}
          handleGetProperty={handleGetProperty}
          setAllProperty={setAllProperty}
        /> :
        <>
          {screenType === 1 ?
            <VisitorUpdateSecondView
              handleBackPress={handleBackPress}
              screenType={screenType}
              setScreenType={setScreenType}
              updateForm={updateForm}
              setUpdateForm={setUpdateForm}
              onPressNext={onPressNext}
              masterDatas={masterDatas}
              configuration={configuration}
            /> :
            <VisitorUpdateThirdView
              handleBackPress={handleBackPress}
              screenType={screenType}
              setScreenType={setScreenType}
              updateForm={updateForm}
              setUpdateForm={setUpdateForm}
              onPressNext={onPressNext}
              handleDropdownPress={handleDropdownPress}
              masterDatas={masterDatas}
            />
          }
        </>
      } */}
      <VisitorUpdateFirstView
        handleBackPress={handleBackPress}
        screenType={screenType}
        updateForm={updateForm}
        setUpdateForm={setUpdateForm}
        onPressNext={onPressNext}
        allProperty={allProperty}
        handleDropdownPress={handleDropdownPress}
        masterDatas={masterDatas}
        handleCpNameDropdownPress={handleCpNameDropdownPress}
        dropdownAgentList={dropdownAgentList}
        companyList={companyList}
        handleCompanyDropdownPress={handleCompanyDropdownPress}
        employeeList={employeeList}
        handleEmployeeDropdownPress={handleEmployeeDropdownPress}
        handleGetProperty={handleGetProperty}
        setAllProperty={setAllProperty}
        configuration={configuration}
        selectCountryData={selectCountryData}
        handleCloseCountry={handleCloseCountry}
        countryData={countryData}
        countryCode={countryCode}
        setCountryCode={setCountryCode}
        countyPicker={countyPicker}
        setCountyPicker={setCountyPicker}
        handleCountryCode={handleCountryCode}
        handleLeadSourcePressWhenNoCp={getAllPropertyData}
        checkMobileExistWithSameProperty={(propertyId: string) =>
          checkMobileExistWithSameProperty(propertyId)
        }
        okIsVisible={okIsVisible}
        mobileerror={mobileerror}
        onPressRightButton={onPressRightButton}
      />
    </>
  );
};
export default VisitorUpdateScreen;
