import { useFocusEffect } from "@react-navigation/native";
import ErrorMessage from "app/components/ErrorMessage";
import ConfirmModal from "app/components/Modals/ConfirmModal";
import apiEndPoints from "app/components/utilities/apiEndPoints";
import {
  GREEN_COLOR,
  RED_COLOR,
  Regexs,
  ROLE_IDS,
  validateEmail,
} from "app/components/utilities/constant";
import { handleValues } from "app/components/utilities/handleValues";
import { apiCall } from "app/components/utilities/httpClient";
import strings from "app/components/utilities/Localization";
import {
  AgencyCreateFormRemove,
  checkEmailMobile,
  createAgency,
  editAgent,
  emailCheckRemove,
  getAgencyDetail,
  removeAgency,
} from "app/Redux/Actions/AgencyActions";
import { getAllProperty } from "app/Redux/Actions/propertyActions";
import {
  assignCPSM,
  getAssignCPList,
} from "app/Redux/Actions/SourcingManagerActions";
import { START_LOADING, STOP_LOADING } from "app/Redux/types";
import React, { useEffect, useLayoutEffect, useState } from "react";
import { Keyboard } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import PicturePickerModal from "../../../components/Modals/PicturePicker";
import AgentBankInfo from "./components/AgentBankInfo";
import AgentBasicInfoView from "./components/AgentBasicInfoView";
import CompanyDetails from "./components/CompanyDetails";

const AgentBasicInfo = ({ navigation, route }: any) => {
  const { type, data } = route.params || {};
  const dispatch: any = useDispatch();
  const [formType, setFormType] = useState(0);
  const [emailMobileChng, setEmailMobileChng] = useState({
    change: true,
    onemail: "",
    onmobile: "",
    onrera: "",
  });
  const { userData = {} } = useSelector((state: any) => state.userData);
  const [emailMobvalidation, setEmailMobValidation] = useState<any>({
    primary_mobile: null,
    email: null,
    rera_certificate_no: null,
  });
  const [employeeFormData, setEmployeeFormData] = useState<any>({
    employeeName: "",
    employeeMobile: "",
    employeeEmail: "",
    employeeGender: "",
  });
  const [employees, setEmployees] = useState<any>([]);
  const [propertyList, setPropertyList] = useState<any>([]);
  const [selectedProperty, setSelectedProperty] = useState<any>([]);
  const [selectedPropertyIds, setSelectedPropertyIds] = useState<any>([]);
  const [finalPropertyList, setFinalPropertyList] = useState<any>([]);
  const [cpId, setcpId] = useState<any>("");

  const [agencyData, setAgencyData] = useState({
    profile_picture: type === "edit" ? "" : "",
    cp_type: 1,
    gstApplicable: 1,
    owner_name: "",
    adhar_no: "",
    pancard_no: "",
    gender: "",
    date_of_birth: "",
    primary_mobile: "",
    whatsapp_number: "",
    email: "",
    working_location: [],
    rera_certificate_no: "",
    rera_certificate: "",
    propidership_declaration_letter: "",
    cancel_cheaque: "",
    bank_name: "",
    branch_name: "",
    account_no: "",
    ifsc_code: "",
    gst: "",
    pancard: "",
    declaration_letter_of_company: "",
    rera_registration: "",
    company_name: "",
    company_rera_no: "",
    company_rera_certificate: "",
    company_email_id: "",
    company_address: "",
    company_latitude: "",
    company_longitude: "",
    company_gst: "",
    company_pancard: "",
    company_bank_name: "",
    company_branch_name: "",
    company_account_no: "",
    company_ifsc_code: "",
    _id: "",
    agency_name: "",
    location: "",
    latitude: "",
    longitude: "",
    state_code: "",
    country_code: "",
    city: "",
    zip: "",
    company_employee: [],
    property_tag: [],
    norera_register: null,
    setprimary_mobile: "",
    setemail: "",
    setrera_certificate_no: "",
  });

  const [imagePicker, setImagePicker] = useState(false);
  const [isPropertyVisible, setIsPropertyVisible] = useState(false);
  const [isVisibleAddEmployee, setIsVisibleAddEmployee] = useState(false);
  const [locationModel, setLocationModel] = useState(false);
  const emailAndMobileData = useSelector(
    (state: any) => state.emailAndMobileData
  );
  const registrationData = useSelector((state: any) => state.agencyForm);
  const { response = {}, detail } =
    useSelector((state: any) => state.agency) || [];
  const [isVisible, setIsVisible] = useState(false);
  const getLoginType = useSelector((state: any) => state.login);
  const addEditAgency = useSelector((state: any) => state.addEditAgency) || [];
  const SmCpList = useSelector((state: any) => state.SourcingManager) || [];
  const [agentList, setAgentList] = useState<any>([]);
  const [cplgId, setCplgId] = useState("");
  const [reraExist, setReraExist] = useState(false);

  const handleClearData = (type: any) => {
    setAgencyData({
      ...agencyData,
      cp_type: type,
      owner_name: "",
      adhar_no: "",
      pancard_no: "",
      gender: "",
      date_of_birth: "",
      primary_mobile: "",
      whatsapp_number: "",
      email: "",
      working_location: [],
      rera_certificate_no: "",
      rera_certificate: "",
      propidership_declaration_letter: "",
      cancel_cheaque: "",
      bank_name: "",
      branch_name: "",
      account_no: "",
      ifsc_code: "",
      gst: "",
      pancard: "",
      declaration_letter_of_company: "",
      rera_registration: "",
      company_name: "",
      company_rera_no: "",
      company_rera_certificate: "",
      company_email_id: "",
      company_address: "",
      company_latitude: "",
      company_longitude: "",
      company_gst: "",
      company_pancard: "",
      company_bank_name: "",
      company_branch_name: "",
      company_account_no: "",
      company_ifsc_code: "",
      _id: "",
      agency_name: "",
      location: "",
      latitude: "",
      longitude: "",
      state_code: "",
      country_code: "",
      city: "",
      zip: "",
      company_employee: [],
      property_tag: [],
      norera_register: null,
      setprimary_mobile: "",
      setrera_certificate_no: "",
      setemail: "",
    });
    setEmailMobValidation({
      primary_mobile: null,
      email: null,
      rera_certificate_no: null,
    });
    setEmployees([]);
    setSelectedProperty([]);
  };
  useEffect(() => {
    if (response?.data?.length > 0 && type === "edit") {
      const arr: any = response?.data[0]?.property_tag.map(
        (prop: any) => prop?.property_id
      );
      setSelectedPropertyIds(arr);
      setSelectedProperty(response?.data[0]?.property_tag);
    }
  }, [response]);
  useEffect(() => {
    if (type === "edit") {
      if (response?.status === 200) {
        if (response?.data?.length > 0) {
          const allDatas = response?.data[0] || {};
          setAgencyData({
            ...response?.data[0],
            cp_type: response?.data[0]?.cp_type
              ? response?.data[0]?.cp_type
              : 1,
            gstApplicable: response?.data[0]?.gstApplicable
              ? response?.data[0]?.gstApplicable
              : 1,
            owner_name: response?.data[0]?.owner_name
              ? response?.data[0]?.owner_name
              : response?.data[0]?.agent_name,
            bank_name: response?.data[0]?.cp_bank_detail?.bank_name ?? "",
            branch_name: response?.data[0]?.cp_bank_detail?.branch_name ?? "",
            account_no: response?.data[0]?.cp_bank_detail?.account_no ?? "",
            ifsc_code: response?.data[0]?.cp_bank_detail?.ifsc_code ?? "",
            cancel_cheaque:
              response?.data[0]?.cp_bank_detail?.cancel_cheaque ?? "",
            gst: response?.data[0]?.gst ?? "",
            agency_name: response?.data[0]?.agency_name ?? "",
            rera_registration: response?.data[0]?.rera_registration ?? "",
            company_bank_name:
              response?.data[0]?.agency_bank_detail?.bank_name ?? "",
            company_branch_name:
              response?.data[0]?.agency_bank_detail?.branch_name ?? "",
            company_account_no:
              response?.data[0]?.agency_bank_detail?.account_no ?? "",
            company_ifsc_code:
              response?.data[0]?.agency_bank_detail?.ifsc_code ?? "",
            rera_certificate: response?.data[0]?.rera_certificate ?? "",
            pancard: response?.data[0]?.pancard ?? "",
            declaration_letter_of_company:
              response?.data[0]?.declaration_letter_of_company ?? "",
            location: response?.data[0]?.location ?? "",
            // state_code: response?.data[0]?.state_code ?? "",
            // country_code: response?.data[0]?.country_code ?? "",
            // city: response?.data[0]?.city ?? "",
            // zip: response?.data[0]?.zip ?? "",
            norera_register:
              handleValues(allDatas?.rera_certificate_no) &&
              handleValues(allDatas?.rera_certificate) === false
                ? null
                : "",
            setprimary_mobile: response?.data[0]?.primary_mobile,
            setemail: response?.data[0]?.email,
            setrera_certificate_no: response?.data[0]?.rera_certificate_no,
          });
          if (allDatas?.create_by_id === userData?.data?.user_id) {
            setEmailMobileChng({
              change: true,
              onemail: "",
              onmobile: "",
              onrera: "",
            });
          } else {
            setEmailMobileChng({
              change: false,
              onemail: "",
              onmobile: "",
              onrera: "",
            });
          }
        }
      }
      // setAgencyData({ ...registrationData.response, sourcing_manager: userData?.data?._id })
    }
  }, [response]);

  useFocusEffect(
    React.useCallback(() => {
      if (SmCpList?.response?.message == "CP allocate successfull.") {
        getAgencyList(0, {});
      }
      return () => {};
    }, [navigation, , type, SmCpList])
  );

  const getAgencyList = (offset: any, filterData: any) => {
    dispatch(
      getAssignCPList({
        user_id: userData?.data?.user_id,
        startdate: "",
        enddate: "",
        search_by_name: "",
        mobile_no: "",
        rera_no: "",
        search_by_location: "",
        status: "",
      })
    );
  };

  useEffect(() => {
    if (SmCpList?.response?.status === 200) {
      setAgentList(SmCpList?.response?.data);
    } else {
      setAgentList([]);
    }
  }, [SmCpList]);

  const propertyData = useSelector((state: any) => state.propertyData) || {};

  useEffect(() => {
    if (propertyData?.response) {
      const { response, loading, list } = propertyData;
      if (response?.status === 200 && response?.data?.length > 0) {
        setPropertyList(
          response?.data?.filter((el: any) => el?.status === true)
        );
        setFinalPropertyList(
          response?.data?.filter((el: any) => el?.status === true)
        );
      } else {
        setPropertyList([]);
      }
    }
  }, [propertyData, isPropertyVisible, selectedProperty]);

  const handleSelects = (items: any) => {
    var array: any[] = [...selectedProperty];
    array.push(items);
    setSelectedProperty(array);
  };
  const handleDelete = (items: any, index: any) => {
    var arrays: any[] = [...selectedProperty];
    arrays?.splice(index, 1);
    setSelectedProperty(arrays);
  };
  const handleDeleteEmployee = (index: any) => {
    const newArray = [...employees];
    newArray?.splice(index, 1);
    setEmployees(newArray);
  };

  useLayoutEffect(() => {
    const { data = {} } = route?.params;
    if (data.cp_id) {
      dispatch(
        getAgencyDetail({
          cp_id: data.cp_id,
        })
      );
    }
  }, [navigation, detail]);
  useLayoutEffect(() => {
    setEmailMobValidation({
      primary_mobile: null,
      email: null,
      rera_certificate_no: null,
    });
  }, [navigation]);
  useEffect(() => {
    if (addEditAgency?.response?.status === 200) {
      dispatch(removeAgency());
      navigation.navigate("AgencyListing");
      ErrorMessage({
        msg: addEditAgency?.response?.message,
        backgroundColor: GREEN_COLOR,
      });
      setEmailMobValidation({
        primary_mobile: null,
        email: null,
        rera_certificate_no: null,
      });
      setSelectedProperty([]);
    }
  }, [addEditAgency]);

  const validation = () => {
    if (
      emailMobvalidation.primary_mobile === "mobileStart" ||
      emailMobvalidation.email === "emailStart" ||
      emailMobvalidation.rera_certificate_no === "reraStart" ||
      emailMobileChng.onmobile === "onmobile" ||
      emailMobileChng.onemail === "onemail" ||
      emailMobileChng.onrera === "onrera"
    ) {
      Keyboard.dismiss();
    } else {
      let isError = true;
      let errorMessage: any = "";
      if (formType === 0) {
        if (agencyData?.cp_type === 1) {
          if (
            agencyData.owner_name == undefined ||
            agencyData.owner_name?.trim() == ""
          ) {
            isError = false;
            errorMessage = strings.agentNameReqVal;
          }
          // else if (
          //   Regexs.oneSpaceRegex.test(agencyData.owner_name?.trim()) === false
          // ) {
          //   isError = false;
          //   errorMessage = strings.NameCorrectlyVal;
          // }
          else if (
            agencyData.primary_mobile == undefined ||
            agencyData.primary_mobile == ""
          ) {
            isError = false;
            errorMessage = strings.mobileNoReqVal;
          } else if (agencyData.primary_mobile?.length < 10) {
            isError = false;
            errorMessage = strings.mobileNoValidReqVal;
          } else if (
            Regexs.mobilenumRegex.test(agencyData.primary_mobile) === false
          ) {
            isError = false;
            errorMessage = strings.mobileNoValidReqVal;
          } else if (
            emailMobileChng?.change &&
            emailMobvalidation.primary_mobile === "wrongMobile"
          ) {
            isError = false;
            errorMessage = strings.mobileAlreadyValidReqVal;
          } else if (agencyData.email == undefined || agencyData.email == "") {
            isError = false;
            errorMessage = strings.emailReqVal;
          } else if (validateEmail.test(agencyData.email) === false) {
            isError = false;
            errorMessage = strings.correctEmailReqVal;
          } else if (
            emailMobileChng?.change &&
            emailMobvalidation.email == "wrongEmail"
          ) {
            isError = false;
            errorMessage = strings.emailAlreadyReqVal;
          } else if (
            agencyData.rera_certificate_no == "" ||
            agencyData.rera_certificate_no == undefined
          ) {
            isError = false;
            errorMessage = strings.reraCertNoReqVal;
          } else if (
            emailMobileChng?.change &&
            emailMobvalidation.rera_certificate_no == "wrongReraNumber"
          ) {
            isError = false;
            errorMessage = strings.reraNumberAlreadyValidReqVal;
          } else if (
            agencyData.rera_certificate_no &&
            !Regexs.reraRegex.test(agencyData.rera_certificate_no)
          ) {
            isError = false;
            errorMessage = strings.reraCertNoCheckValid;
          }
          // else if (
          //   agencyData.location == undefined ||
          //   agencyData.location == ""
          // ) {
          //   isError = false;
          //   errorMessage = strings.addressReqVal;
          // }
          // else if (
          //   agencyData.zip == undefined ||
          //   agencyData.zip == ""
          // ) {
          //   isError = false;
          //   errorMessage = strings.correctAddress;
          // }
          else if (agencyData.gender == undefined || agencyData.gender == "") {
            isError = false;
            errorMessage = strings.genderReqVal;
          } else if (
            (agencyData.whatsapp_number !== "" ||
              agencyData.whatsapp_number === null) &&
            agencyData.whatsapp_number?.length < 10
          ) {
            isError = false;
            errorMessage = strings.whatsappNoValidReqVal;
          }
          // else if (
          //   agencyData.adhar_no == undefined ||
          //   agencyData.adhar_no == ""
          // ) {
          //   isError = false;
          //   errorMessage = strings.aadharReqVal;
          // } else if (Regexs.AadharRegex.test(agencyData.adhar_no) === false) {
          //   isError = false;
          //   errorMessage = strings.aadharValidVal;
          // } else if (
          //   agencyData.pancard_no !== "" &&
          //   Regexs.panRegex.test(agencyData.pancard_no) === false
          // ) {
          //   isError = false;
          //   errorMessage = strings.pancardValidVal;
          // }
        } else if (agencyData?.cp_type === 2) {
          if (
            agencyData.owner_name == undefined ||
            agencyData.owner_name?.trim() == ""
          ) {
            isError = false;
            errorMessage = strings.agentNameReqVal;
          }
          //  else if (
          //   Regexs.oneSpaceRegex.test(agencyData.owner_name?.trim()) === false
          // ) {
          //   isError = false;
          //   errorMessage = strings.NameCorrectlyVal;
          // }
           else if (
            agencyData.primary_mobile == undefined ||
            agencyData.primary_mobile == ""
          ) {
            isError = false;
            errorMessage = strings.mobileNoReqVal;
          } else if (agencyData.primary_mobile?.length < 10) {
            isError = false;
            errorMessage = strings.mobileNoValidReqVal;
          } else if (
            Regexs.mobilenumRegex.test(agencyData.primary_mobile) === false
          ) {
            isError = false;
            errorMessage = strings.mobileNoValidReqVal;
          } else if (
            emailMobileChng?.change &&
            emailMobvalidation.primary_mobile === "wrongMobile"
          ) {
            isError = false;
            errorMessage = strings.mobileAlreadyValidReqVal;
          } else if (agencyData.email == undefined || agencyData.email == "") {
            isError = false;
            errorMessage = strings.emailReqVal;
          } else if (validateEmail.test(agencyData.email) === false) {
            isError = false;
            errorMessage = strings.correctEmailReqVal;
          } else if (
            emailMobileChng?.change &&
            emailMobvalidation.email == "wrongEmail"
          ) {
            isError = false;
            errorMessage = strings.emailAlreadyReqVal;
          } else if (
            agencyData.rera_certificate_no == "" ||
            agencyData.rera_certificate_no == undefined
          ) {
            isError = false;
            errorMessage = strings.reraCertNoReqVal;
          } else if (
            emailMobileChng?.change &&
            emailMobvalidation.rera_certificate_no == "wrongReraNumber"
          ) {
            isError = false;
            errorMessage = strings.reraNumberAlreadyValidReqVal;
          } else if (
            agencyData.rera_certificate_no &&
            !Regexs.reraRegex.test(agencyData.rera_certificate_no)
          ) {
            isError = false;
            errorMessage = strings.reraCertNoCheckValid;
          }
          // else if (
          //   agencyData.location == undefined ||
          //   agencyData.location == ""
          // ) {
          //   isError = false;
          //   errorMessage = strings.addressReqVal;
          // }
          else if (employees?.length === 0 && type !== "edit") {
            isError = false;
            errorMessage = strings.employeesReqVal;
          }
        }
      } else if (formType === 1) {
        if (agencyData?.cp_type === 1) {
          if (
            agencyData.gst !== "" &&
            Regexs.gstRegex.test(agencyData.gst) === false
          ) {
            isError = false;
            errorMessage = strings.gstReqVal;
          }
          // else if (
          //   agencyData.gstApplicable == 2 &&
          //   (agencyData?.propidership_declaration_letter == null ||
          //     agencyData?.propidership_declaration_letter == undefined ||
          //     agencyData?.propidership_declaration_letter == "")
          // ) {
          //   isError = false;
          //   errorMessage = strings.DeclrLttrImgReqVal;
          // }
          else if (selectedProperty?.length === 0) {
            isError = false;
            errorMessage = strings.propertyReqVal;
          }
          // if (
          //   agencyData.rera_certificate_no == "" ||
          //   agencyData.rera_certificate_no == undefined
          // ) {
          //   isError = false;
          //   errorMessage = strings.reraCertNoReqVal;
          // } else if (
          //   agencyData.rera_certificate == null ||
          //   agencyData.rera_certificate == "" ||
          //   agencyData.rera_certificate == undefined
          // ) {
          //   isError = false;
          //   errorMessage = strings.reraCertImgReqVal;
          // }
          //  if (agencyData.norera_register === null) {
          //   isError = false;
          //   errorMessage = strings.noReraRegReqVal;
          // }
          // else if (
          //   agencyData.bank_name == "" ||
          //   agencyData.bank_name == undefined
          // ) {
          //   isError = false;
          //   errorMessage = strings.bankNameReqVal;
          // }
          // else if (
          //   agencyData.branch_name == "" ||
          //   agencyData.branch_name == undefined
          // ) {
          //   isError = false;
          //   errorMessage = strings.branchNameReqVal;
          // } else if (
          //   agencyData.account_no == "" ||
          //   agencyData.account_no == undefined
          // ) {
          //   isError = false;
          //   errorMessage = strings.accountNoReqVal;
          // }
          // else if (
          //   agencyData.account_no !== "" &&
          //   Regexs.accountnumRegex.test(agencyData.account_no) === false
          // ) {
          //   isError = false;
          //   errorMessage = strings.accountNoValidVal;
          // }
          // if (
          //   agencyData.account_no !== "" ||
          //   agencyData.account_no == undefined
          // ) {
          else if (
            agencyData.account_no !== "" &&
            Regexs.accountnumRegex.test(agencyData.account_no) === false
          ) {
            isError = false;
            errorMessage = strings.accountNoValidVal;
          }
          // }
          //  else if (
          //   agencyData.ifsc_code == "" ||
          //   agencyData.ifsc_code == undefined
          // ) {
          //   isError = false;
          //   errorMessage = strings.ifscReqVal;
          // }
          // else if (
          //   agencyData.ifsc_code !== "" &&
          //   Regexs.ifscRegex.test(agencyData.ifsc_code) === false
          // ) {
          //   isError = false;
          //   errorMessage = strings.ifscValidVal;
          // }
          if (
            agencyData.ifsc_code !== "" &&
            Regexs.ifscRegex.test(agencyData.ifsc_code) === false
          ) {
            isError = false;
            errorMessage = strings.ifscValidVal;
          }
          //  else if (
          //   agencyData.cancel_cheaque == null ||
          //   agencyData.cancel_cheaque == undefined ||
          //   agencyData.cancel_cheaque == ''
          // ) {
          //   isError = false;
          //   errorMessage = strings.cancelChqImgReqVal;
          // }
        } else if (agencyData?.cp_type === 2) {
          if (
            agencyData.gst !== "" &&
            Regexs.gstRegex.test(agencyData.gst) === false
          ) {
            isError = false;
            errorMessage = strings.gstReqVal;
          }
          // else if (
          //   agencyData.gstApplicable == 2 &&
          //   (agencyData?.propidership_declaration_letter == null ||
          //     agencyData?.propidership_declaration_letter == undefined ||
          //     agencyData?.propidership_declaration_letter == "")
          // ) {
          //   isError = false;
          //   errorMessage = strings.DeclrLttrImgReqVal;
          // }
          else if (selectedProperty?.length === 0) {
            isError = false;
            errorMessage = strings.propertyReqVal;
          }
          // else if (
          //   agencyData.account_no !== "" ||
          //   agencyData.account_no == undefined
          // ) {
          else if (
            agencyData.account_no !== "" &&
            Regexs.accountnumRegex.test(agencyData.account_no) === false
          ) {
            isError = false;
            errorMessage = strings.accountNoValidVal;
          }
          // }
          else if (
            agencyData.ifsc_code !== "" &&
            Regexs.ifscRegex.test(agencyData.ifsc_code) === false
          ) {
            isError = false;
            errorMessage = strings.ifscValidVal;
          }
        }
      }
      if (formType === 2) {
        if (
          agencyData.agency_name == "" ||
          agencyData.agency_name == undefined
        ) {
          isError = false;
          errorMessage = strings.agencyNameReqVal;
        } else if (
          agencyData.rera_registration == "" ||
          agencyData.rera_registration == undefined
        ) {
          isError = false;
          errorMessage = strings.reraRegstrReqVal;
        }
        // else if (
        //   agencyData.pancard == null ||
        //   agencyData.pancard == undefined ||
        //   agencyData.pancard == ''
        // ) {
        //   isError = false;
        //   errorMessage = strings.comPanCardImgReqVal;
        // } else if (
        //   agencyData.declaration_letter_of_company == null ||
        //   agencyData.declaration_letter_of_company == undefined ||
        //   agencyData.declaration_letter_of_company == ''
        // ) {
        //   isError = false;
        //   errorMessage = strings.declLttrComImgReqVal;
        // }
        // else if (
        //   agencyData.company_bank_name == "" ||
        //   agencyData.company_bank_name == undefined
        // ) {
        //   isError = false;
        //   errorMessage = strings.bankNameReqVal;
        // } else if (
        //   agencyData.company_branch_name == "" ||
        //   agencyData.company_branch_name == undefined
        // ) {
        //   isError = false;
        //   errorMessage = strings.branchNameReqVal;
        // } else if (
        //   agencyData.company_account_no == "" ||
        //   agencyData.company_account_no == undefined
        // ) {
        //   isError = false;
        //   errorMessage = strings.accountNoReqVal;
        // }
        else if (
          agencyData.company_account_no !== "" &&
          Regexs.accountnumRegex.test(agencyData.company_account_no) === false
        ) {
          isError = false;
          errorMessage = strings.accountNoValidVal;
        }
        //  else if (
        //   agencyData.company_ifsc_code == "" ||
        //   agencyData.company_ifsc_code == undefined
        // ) {
        //   isError = false;
        //   errorMessage = strings.ifscReqVal;
        // }
        else if (
          agencyData.company_ifsc_code !== "" &&
          Regexs.ifscRegex.test(agencyData.company_ifsc_code) === false
        ) {
          isError = false;
          errorMessage = strings.ifscValidVal;
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
    }
  };
  const addEmployeeValidation = () => {
    let isError = true;
    let errorMessage: any = "";
    if (
      employeeFormData?.employeeName == "" ||
      employeeFormData?.employeeName == undefined
    ) {
      isError = false;
      errorMessage = strings.employeeNameReqVal;
    } else if (
      employeeFormData.employeeMobile == undefined ||
      employeeFormData.employeeMobile == ""
    ) {
      isError = false;
      errorMessage = strings.mobileNoReqVal;
    } else if (
      Regexs.mobilenumRegex.test(employeeFormData.employeeMobile) === false
    ) {
      isError = false;
      errorMessage = strings.mobileNoValidReqVal;
    } else if (emailMobvalidation.primary_mobile === "wrongEmployeeMobile") {
      isError = false;
      errorMessage = strings.mobileAlreadyValidReqVal;
    } else if (
      employeeFormData.employeeEmail == undefined ||
      employeeFormData.employeeEmail == ""
    ) {
      isError = false;
      errorMessage = strings.emailReqVal;
    } else if (validateEmail.test(employeeFormData.employeeEmail) === false) {
      isError = false;
      errorMessage = strings.correctEmailReqVal;
    } else if (emailMobvalidation.email == "wrongEmployeeEmail") {
      isError = false;
      errorMessage = strings.emailAlreadyReqVal;
    } else if (
      employeeFormData.employeeGender == undefined ||
      employeeFormData.employeeGender == ""
    ) {
      isError = false;
      errorMessage = strings.genderReqVal;
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
  useEffect(() => {
    if (
      emailAndMobileData?.response?.status === 200 ||
      emailAndMobileData?.response?.status === 201
    ) {
      dispatch(emailCheckRemove());
      console.log(emailAndMobileData);

      if (emailAndMobileData?.response?.status === 200) {
        switch (emailAndMobileData?.check_type) {
          case "mobile":
            if (isVisibleAddEmployee) {
              setEmailMobValidation({
                ...emailMobvalidation,
                primary_mobile: "employeeMobile",
              });
            } else {
              setEmailMobValidation({
                ...emailMobvalidation,
                primary_mobile: emailAndMobileData?.check_type,
              });
            }
            break;
          case "email":
            if (isVisibleAddEmployee) {
              setEmailMobValidation({
                ...emailMobvalidation,
                email: "employeeEmail",
              });
            } else {
              setEmailMobValidation({
                ...emailMobvalidation,
                email: emailAndMobileData?.check_type,
              });
            }
            break;
          case "rera_certificate_no":
            if (
              userData?.data?.role_id === ROLE_IDS.sourcingmanager_id ||
              userData?.data?.role_id === ROLE_IDS.sourcingtl_id
            ) {
              setReraExist(false);
              setIsVisible(true);
            } else {
              setEmailMobValidation({
                ...emailMobvalidation,
                rera_certificate_no: emailAndMobileData?.check_type,
              });
            }
            break;
          default:
            break;
        }
        // ErrorMessage({
        //   msg: emailAndMobileData?.response?.message,
        //   backgroundColor: GREEN_COLOR
        // })
      } else {
        if (emailAndMobileData?.response?.status === 201) {
          switch (emailAndMobileData?.check_type) {
            case "mobile":
              if (isVisibleAddEmployee) {
                setEmailMobValidation({
                  ...emailMobvalidation,
                  primary_mobile: "wrongEmployeeMobile",
                });
                let errorMessage = strings.mobileAlreadyValidReqVal;
                ErrorMessage({
                  msg: errorMessage,
                  backgroundColor: RED_COLOR,
                });
              } else {
                setEmailMobValidation({
                  ...emailMobvalidation,
                  primary_mobile: "wrongMobile",
                });
                let errorMessage = strings.mobileAlreadyValidReqVal;
                ErrorMessage({
                  msg: errorMessage,
                  backgroundColor: RED_COLOR,
                });
              }
              break;
            case "email":
              if (isVisibleAddEmployee) {
                setEmailMobValidation({
                  ...emailMobvalidation,
                  email: "wrongEmployeeEmail",
                });
                let errorMessage = strings.emailAlreadyReqVal;
                ErrorMessage({
                  msg: errorMessage,
                  backgroundColor: RED_COLOR,
                });
              } else {
                setEmailMobValidation({
                  ...emailMobvalidation,
                  email: "wrongEmail",
                });
                let errorMessage = strings.emailAlreadyReqVal;
                ErrorMessage({
                  msg: errorMessage,
                  backgroundColor: RED_COLOR,
                });
              }
              break;
            case "rera_certificate_no":
              setEmailMobValidation({
                ...emailMobvalidation,
                rera_certificate_no: "wrongReraNumber",
              });
              if (
                userData?.data?.role_id === ROLE_IDS.sourcingmanager_id ||
                userData?.data?.role_id === ROLE_IDS.sourcingtl_id
              ) {
                setCplgId(emailAndMobileData?.response?.cp_lg_id);
                setReraExist(true);
                setIsVisible(true);
              } else {
                let errorMessage = strings.reraNumberAlreadyValidReqVal;
                ErrorMessage({
                  msg: errorMessage,
                  backgroundColor: RED_COLOR,
                });
              }
              break;
            default:
              break;
          }
        }
      }
    }
  }, [emailAndMobileData]);
  const handleCheckEmailMobile = (type: any) => {
    let params = {};
    if (type == 1) params = { mobile: agencyData?.primary_mobile };
    else if (type == 2)
      params = { rera_certificate_no: agencyData?.rera_certificate_no };
    else params = { email: agencyData?.email };

    dispatch(checkEmailMobile(params));
  };
  const handleCheckEmailMobileforEmployee = (type: any, data: any) => {
    const params = type == 1 ? { mobile: data } : { email: data };
    dispatch(checkEmailMobile(params));
  };
  const handleVisiblePropertyPress = () => {
    dispatch(
      getAllProperty({
        // offset: 0,
        // limit: 100,
        // start_date: data?.start_date ? data?.start_date : '',
        // end_date: data?.end_date ? data?.end_date : '',
        // location: data?.location ? data?.location : '',
        // property_name: data?.property_name ? data?.property_name : '',
        // property_type: data?.property_type ? data?.property_type : '',
      })
    );
    setIsPropertyVisible(true);
  };
  const employeeMobileNoSet = (data: any) => {
    setEmployeeFormData({
      ...employeeFormData,
      employeeMobile: data,
    });

    if (data.length >= 10) {
      handleCheckEmailMobileforEmployee(1, data);
    } else {
      setEmailMobValidation({
        ...emailMobvalidation,
        primary_mobile: null,
      });
    }
  };
  const employeeEmailAddSet = (data: any) => {
    setEmployeeFormData({
      ...employeeFormData,
      employeeEmail: data,
    });

    if (validateEmail.test(data)) {
      handleCheckEmailMobileforEmployee(2, data);
    } else {
      setEmailMobValidation({
        ...emailMobvalidation,
        email: null,
      });
    }
  };
  const onPressNext = (screenType: any, data: any) => {
    // Keyboard.dismiss()
    if (screenType <= 1) {
      if (validation()) {
        setFormType(screenType);
      }
    } else {
      if (validation()) {
        const formData = new FormData();
        if (type === "edit") {
          formData.append("agency_id", agencyData?._id);
          formData.append("cp_id", agencyData?._id);
          formData.append("pin_code", "4545456");
        }
        formData.append(
          "address",
          agencyData?.location ? agencyData?.location : ""
        );
        formData.append("email", agencyData?.email ? agencyData?.email : "");
        // formData.append("registration_no", agencyData?.registration_no);
        formData.append(
          "rera_registration",
          agencyData?.rera_registration ? agencyData?.rera_registration : ""
        );
        formData.append(
          "owner_name",
          agencyData?.owner_name ? agencyData?.owner_name?.trim() : ""
        );
        formData.append(
          "cp_type",
          agencyData?.cp_type ? agencyData?.cp_type : ""
        );
        formData.append(
          "gstApplicable",
          agencyData?.gstApplicable ? agencyData?.gstApplicable : ""
        );
        formData.append(
          "agent_name",
          agencyData?.owner_name ? agencyData?.owner_name : ""
        );
        formData.append(
          "agency_name",
          agencyData?.company_name ? agencyData?.company_name : ""
        );
        formData.append(
          "primary_mobile",
          agencyData?.primary_mobile ? agencyData?.primary_mobile : ""
        );
        formData.append(
          "whatsapp_number",
          agencyData?.whatsapp_number ? agencyData?.whatsapp_number : ""
        );
        formData.append(
          "adhar_no",
          agencyData?.adhar_no ? agencyData?.adhar_no : ""
        );
        formData.append(
          "pancard_no",
          agencyData?.pancard_no ? agencyData?.pancard_no : ""
        );
        formData.append("gender", agencyData?.gender ? agencyData?.gender : "");
        formData.append(
          "date_of_birth",
          agencyData?.date_of_birth ? agencyData?.date_of_birth : ""
        );
        formData.append(
          "location",
          agencyData?.location ? agencyData?.location : ""
        );
        formData.append(
          "latitude",
          agencyData?.latitude ? agencyData?.latitude : ""
        );
        formData.append(
          "longitude",
          agencyData?.longitude ? agencyData?.longitude : ""
        );

        formData.append(
          "bank_name",
          agencyData?.bank_name ? agencyData?.bank_name : ""
        );
        formData.append(
          "branch_name",
          agencyData?.branch_name ? agencyData?.branch_name : ""
        );
        formData.append(
          "account_no",
          agencyData?.account_no ? agencyData?.account_no : ""
        );
        formData.append(
          "ifsc_code",
          agencyData?.ifsc_code ? agencyData?.ifsc_code : ""
        );
        formData.append("gst", agencyData?.gst ? agencyData?.gst : "");
        formData.append(
          "working_location",
          agencyData?.working_location
            ? JSON.stringify(agencyData?.working_location)
            : []
        );
        formData.append(
          "company_employee",
          employees ? JSON.stringify(employees) : []
        );
        formData.append(
          "property_tag",
          selectedPropertyIds ? JSON.stringify(selectedPropertyIds) : []
        );
        formData.append(
          "rera_certificate_no",
          agencyData?.rera_certificate_no ? agencyData?.rera_certificate_no : ""
        );
        typeof agencyData?.profile_picture === "object" &&
          formData.append("profile_picture", agencyData?.profile_picture);
        typeof agencyData?.rera_certificate === "object"
          ? formData.append("rera_certificate", agencyData?.rera_certificate)
          : formData.append("rera_certificate", "");
        typeof agencyData?.propidership_declaration_letter === "object" &&
          formData.append(
            "propidership_declaration_letter",
            agencyData?.propidership_declaration_letter
          );
        typeof agencyData?.cancel_cheaque === "object" &&
          formData.append("cancel_cheaque", agencyData?.cancel_cheaque);
        typeof agencyData?.pancard === "object" &&
          formData.append("pancard", agencyData?.pancard);
        typeof agencyData?.declaration_letter_of_company === "object" &&
          formData.append(
            "declaration_letter_of_company",
            agencyData?.declaration_letter_of_company
          );

        if (type === "edit") {
          dispatch(editAgent(formData));
        } else if (type === "add") {
          dispatch(createAgency(formData));
          // auth()
          // .createUserWithEmailAndPassword(agencyData?.email, "123456")
          // .then(() => {
          //   console.log("User account created & signed in!");
          // })
          // .catch((error) => {
          //   if (error.code === "auth/email-already-in-use") {
          //     console.log("That email address is already in use!");
          //   }
          //   if (error.code === "auth/invalid-email") {
          //     console.log("That email address is invalid!");
          //   }
          //   console.error(error);
          // });
          dispatch(AgencyCreateFormRemove());
        }
      }
    }
  };
  const onPressBack = () => {
    navigation.goBack();
  };
  const handleOnBackEmployeeModal = () => {
    setIsVisibleAddEmployee(false);
    setEmployeeFormData({
      employeeName: "",
      employeeMobile: "",
      employeeEmail: "",
      employeeGender: "",
    });
    setEmailMobValidation({
      primary_mobile: null,
      email: null,
      rera_certificate_no: null,
    });
  };
  const handleAddEmployee = () => {
    if (addEmployeeValidation()) {
      employees.push(employeeFormData);
      setIsVisibleAddEmployee(false);
      setEmployeeFormData({
        employeeName: "",
        employeeMobile: "",
        employeeEmail: "",
        employeeGender: "",
      });
      setEmailMobValidation({
        ...emailMobvalidation,
        email: null,
        primary_mobile: null,
        rera_certificate_no: null,
      });
    }
  };

  const handleSearch = (searchKey: any) => {
    if (searchKey !== "") {
      const lowerCased = searchKey?.toLowerCase();
      const searchArray = [...propertyList];
      const list = searchArray?.filter((item) => {
        return item?.property_title?.toLowerCase()?.match(lowerCased);
      });
      setFinalPropertyList(list);
    } else {
      setFinalPropertyList(propertyList);
    }
  };
  const handleAllocateProperty = () => {
    const arr: any = selectedProperty.map((prop: any) => prop?.property_id);
    setSelectedPropertyIds(arr);
    setIsPropertyVisible(false);
  };

  const handleAllocateSMPropertyToCP = async () => {
    setIsVisible(false);
    setReraExist(false);
    dispatch({ type: START_LOADING });
    const transformedArray = propertyList.map(
      (item: {
        _id: string;
        active_status: boolean;
        property_id: string;
        property_title: string;
        property_type: string;
      }) => ({
        property_id: item.property_id,
        active_status: item.active_status,
        _id: item?._id,
        property_title: item?.property_title,
        property_type: item?.property_type,
      })
    );

    let cpIds = [];
    for (let data of agentList) {
      cpIds.push(data?._id);
    }
    cpIds.push(cplgId);

    const params = {
      cp_id: cplgId,
      property_tag: JSON.stringify(transformedArray),
    };

    const res = await apiCall(
      "post",
      apiEndPoints.UPDATE_CP_PROPERTY_SM,
      params
    );
    const response: any = res?.data;
    console.log(response);
    if (response?.status === 200) {
      setTimeout(() => {
        dispatch(
          assignCPSM({
            user_id: userData?.data?.user_id,
            cp_id: cpIds,
          })
        );
        setTimeout(() => {
          ErrorMessage({
            msg: response?.message,
            backgroundColor: GREEN_COLOR,
          });
          onPressBack();
        }, 1000);
      }, 500);
    } else {
      dispatch({ type: STOP_LOADING });
      ErrorMessage({
        msg: response?.message,
        backgroundColor: RED_COLOR,
      });
    }
  };

  const addNewReraNumber = async () => {
    setIsVisible(false);
    setReraExist(false);
    setEmailMobValidation({
      ...emailMobvalidation,
      rera_certificate_no: emailAndMobileData?.check_type,
    });
  };

  return (
    <>
      {formType === 0 ? (
        <AgentBasicInfoView
          imagePicker={imagePicker}
          setImagePicker={setImagePicker}
          onPressBack={onPressBack}
          onPressNext={onPressNext}
          agencyData={agencyData}
          setAgencyData={setAgencyData}
          setLocationModel={setLocationModel}
          locationModel={locationModel}
          handleCheckEmailMobile={handleCheckEmailMobile}
          setEmailMobValidation={setEmailMobValidation}
          emailMobvalidation={emailMobvalidation}
          emailMobileChng={emailMobileChng}
          setEmailMobileChng={setEmailMobileChng}
          type={type}
          isVisibleAddEmployee={isVisibleAddEmployee}
          setIsVisibleAddEmployee={setIsVisibleAddEmployee}
          handleAddEmployee={handleAddEmployee}
          employeeFormData={employeeFormData}
          setEmployeeFormData={setEmployeeFormData}
          employees={employees}
          handleDeleteEmployee={handleDeleteEmployee}
          handleCheckEmailMobileforEmployee={handleCheckEmailMobileforEmployee}
          handleOnBackEmployeeModal={handleOnBackEmployeeModal}
          employeeMobileNoSet={employeeMobileNoSet}
          employeeEmailAddSet={employeeEmailAddSet}
          handleClearData={handleClearData}
        />
      ) : (
        // <CompanyBasicInfoView
        //   imagePicker={imagePicker}
        //   setImagePicker={setImagePicker}
        //   onPressBack={onPressBack}
        //   onPressNext={onPressNext}
        //   agencyData={agencyData}
        //   setAgencyData={setAgencyData}
        //   setLocationModel={setLocationModel}
        //   locationModel={locationModel}
        //   handleCheckEmailMobile={handleCheckEmailMobile}
        //   setEmailMobValidation={setEmailMobValidation}
        //   emailMobvalidation={emailMobvalidation}
        //   type={type}
        //   emailMobileChng={emailMobileChng}
        //   setEmailMobileChng={setEmailMobileChng}
        //   isVisibleAddEmployee={isVisibleAddEmployee}
        //   setIsVisibleAddEmployee={setIsVisibleAddEmployee}
        //   handleAddEmployee={handleAddEmployee}
        //   employeeFormData={employeeFormData}
        //   setEmployeeFormData={setEmployeeFormData}
        //   employees={employees}
        //   handleDeleteEmployee={handleDeleteEmployee}
        // />
        <>
          {formType == 1 ? (
            <AgentBankInfo
              agencyData={agencyData}
              setAgencyData={setAgencyData}
              onPressNext={onPressNext}
              setFormType={setFormType}
              type={type}
              isPropertyVisible={isPropertyVisible}
              setIsPropertyVisible={setIsPropertyVisible}
              handleSearch={handleSearch}
              finalPropertyList={finalPropertyList}
              handleSelects={handleSelects}
              handleDelete={handleDelete}
              selectedProperty={selectedProperty}
              handleAllocateProperty={handleAllocateProperty}
              handleVisiblePropertyPress={handleVisiblePropertyPress}
            />
          ) : (
            // <CompanyBankInfo
            //   agencyData={agencyData}
            //   setAgencyData={setAgencyData}
            //   onPressNext={onPressNext}
            //   setFormType={setFormType}
            //   type={type}
            //   isPropertyVisible={isPropertyVisible}
            //   setIsPropertyVisible={setIsPropertyVisible}
            //   handleSearch={handleSearch}
            //   finalPropertyList={finalPropertyList}
            //   handleSelects={handleSelects}
            //   handleDelete={handleDelete}
            //   selectedProperty={selectedProperty}
            //   handleAllocateProperty={handleAllocateProperty}
            // />
            <CompanyDetails
              agencyData={agencyData}
              setAgencyData={setAgencyData}
              onPressNext={onPressNext}
              setFormType={setFormType}
              type={type}
            />
          )}
        </>
      )}
      <PicturePickerModal
        Visible={imagePicker}
        setVisible={setImagePicker}
        imageData={(data: any) => {
          setAgencyData({
            ...agencyData,
            profile_picture: data,
          });
        }}
      />
      <ConfirmModal
        Visible={isVisible}
        setIsVisible={setIsVisible}
        stringshow={reraExist ? strings.allocateProperty : strings.alert}
        textshow={
          reraExist ? strings.allocateCpToProperty : strings.checkCpInMaharera
        }
        confirmtype={"CONFIRMATION"}
        setStatusChange={() => {
          setAgencyData({
            ...agencyData,
            rera_certificate_no: "",
          });
        }}
        handleYesResponse={() => {
          reraExist ? handleAllocateSMPropertyToCP() : addNewReraNumber();
        }}
      />
    </>
  );
};

export default AgentBasicInfo;
