import ErrorMessage from "app/components/ErrorMessage";
import { GREEN_COLOR, RED_COLOR, Regexs, validateEmail, } from "app/components/utilities/constant";
import { handleValues } from "app/components/utilities/handleValues";
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
import React, { useEffect, useLayoutEffect, useState } from "react";
import { Keyboard } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import PicturePickerModal from "../../../components/Modals/PicturePicker";
import AgentBankInfo from "./components/AgencyBankInfo";
import AgentBasicInfoView from "./components/AgentBasicInfoView";
import CompanyDetails from "./components/CompanyDetails";

const AgentBasicInfo = ({ navigation, route }: any) => {
  const { type, data } = route.params || {};
  const dispatch: any = useDispatch();
  const [formType, setFormType] = useState(0);
  const [emailMobileChng, setEmailMobileChng] = useState({
    change: true,
    onemail: '',
    onmobile: '',
  });
  const { userData = {} } = useSelector((state: any) => state.userData);
  const [emailMobvalidation, setEmailMobValidation] = useState<any>({
    primary_mobile: null,
    email: null,
  });
    // const [agencyData, setAgencyData] = useState({
  //   profile_picture: type === "edit" ? "" : "",
  //   regType: 1,
  //   gstApplicable: 1,
  //   owner_name: "",
  //   adhar_no: "",
  //   pancard_no: "",
  //   gender: "",
  //   date_of_birth: "",
  //   primary_mobile: "",
  //   cp_whatsapp_number: "",
  //   email: "",
  //   working_location: [],
  //   rera_certificate_no: "",
  //   rera_certificate: "",
  //   propidership_declaration_letter: "",
  //   cancel_cheaque: "",
  //   bank_name: "",
  //   branch_name: "",
  //   account_no: "",
  //   ifsc_code: "",
  //   gst: "",
  //   pancard: "",
  //   declaration_letter_of_company: "",
  //   rera_registration: "",
  //   company_name: "",
  //   company_rera_no: "",
  //   company_email_id: "",
  //   company_address: "",
  //   company_gst: "",
  //   company_pancard: "",
  //   company_bank_name: "",
  //   company_branch_name: "",
  //   company_account_no: "",
  //   company_ifsc_code: "",
  //   _id: "",
  //   agency_name: "",
  //   location: "",
  //   latitude: "",
  //   longitude: "",
  //   norera_register: null,
  //   setprimary_mobile: "",
  //   setemail: "",
  // });
  const [agencyData, setAgencyData] = useState({
    profile_picture: type === "edit" ? "" : "",
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
    company_rera_registration: "", // new changes
    company_bank_name: "",
    company_branch_name: "",
    company_account_no: "",
    company_ifsc_code: "",
    _id: "",
    agency_name: "",
    location: '',
    latitude: '',
    longitude: '',
    norera_register: null,
    setprimary_mobile: "",
    setemail: "",
    rera_registration: ""
  });

  const [imagePicker, setImagePicker] = useState(false);
  const [locationModel, setLocationModel] = useState(false);
  const emailAndMobileData = useSelector(
    (state: any) => state.emailAndMobileData
  );
  const registrationData = useSelector((state: any) => state.agencyForm);
  const { response = {}, detail } = useSelector((state: any) => state.agency) || []

  const addEditAgency = useSelector((state: any) => state.addEditAgency) || []

  useEffect(() => {
    if (type === "edit") {
      if (response?.status === 200) {
        if (response?.data?.length > 0) {
          const allDatas = response?.data[0] || {};
          if (response?.data?.length > 0)
            setAgencyData({
              ...response?.data[0],
              owner_name: response?.data[0]?.owner_name
                ? response?.data[0]?.owner_name
                : response?.data[0]?.agent_name,
              bank_name: response?.data[0]?.cp_bank_detail?.bank_name ?? "",
              branch_name: response?.data[0]?.cp_bank_detail?.branch_name ?? "",
              account_no: response?.data[0]?.cp_bank_detail?.account_no ?? "",
              ifsc_code: response?.data[0]?.cp_bank_detail?.ifsc_code ?? "",
              cancel_cheaque:
                response?.data[0]?.cp_bank_detail?.cancel_cheaque ?? "",
              gst: response?.data[0]?.agencies?.gst ?? "",
              agency_name: response?.data[0]?.agencies?.agency_name ?? "",
              rera_registration:
                response?.data[0]?.agencies?.rera_registration ?? "",
              company_bank_name:
                response?.data[0]?.agencies?.agency_bank_detail?.bank_name ??
                "",
              company_branch_name:
                response?.data[0]?.agencies?.agency_bank_detail?.branch_name ??
                "",
              company_account_no:
                response?.data[0]?.agencies?.agency_bank_detail?.account_no ??
                "",
              company_ifsc_code:
                response?.data[0]?.agencies?.agency_bank_detail?.ifsc_code ??
                "",
              rera_certificate: response?.data[0]?.rera_certificate ?? "",
              pancard: response?.data[0]?.agencies?.pancard ?? "",
              declaration_letter_of_company:
                response?.data[0]?.agencies?.declaration_letter_of_company ??
                "",
              location: response?.data[0]?.location ?? "",
              norera_register:
                handleValues(allDatas?.rera_certificate_no) &&
                handleValues(allDatas?.rera_certificate) === false
                  ? null
                  : "",
              setprimary_mobile: response?.data[0]?.primary_mobile,
              setemail: response?.data[0]?.email,
            });
          if (allDatas?.create_by_id === userData?.data?.user_id) {
            setEmailMobileChng({
              change: true,
              onemail: "",
              onmobile: "",
            });
          } else {
            setEmailMobileChng({
              change: false,
              onemail: "",
              onmobile: "",
            });
          }
        }
      }
      // setAgencyData({ ...registrationData.response, sourcing_manager: userData?.data?._id })
    }
  }, [response]);

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
  useEffect(() => {
    if (addEditAgency?.response?.status === 200) {
      dispatch(removeAgency());
      navigation.navigate("AgencyListing");
      ErrorMessage({
        msg: addEditAgency?.response?.message,
        backgroundColor: GREEN_COLOR
      })
    }
  }, [addEditAgency]);

  const validation = () => {
    console.log("🚀 ~ file: index.tsx:380 ~ agencyData.gst:", agencyData.gst)

    if ((emailMobvalidation.primary_mobile === "mobileStart" || emailMobvalidation.email === "emailStart") ||
      (emailMobileChng.onmobile === "onmobile" || emailMobileChng.onemail === "onemail")) {
      Keyboard.dismiss()
    } else {
      let isError = true;
      let errorMessage: any = "";
      if (formType === 0) {
        if (agencyData.owner_name == undefined || agencyData.owner_name == "") {
          isError = false;
          errorMessage = strings.agentNameReqVal;
        }
        else if (
          agencyData.adhar_no == undefined ||
          agencyData.adhar_no == ""
        ) {
          isError = false;
          errorMessage = strings.aadharReqVal;
        }
        else if (
          Regexs.AadharRegex.test(agencyData.adhar_no) === false
        ) {
          isError = false;
          errorMessage = strings.aadharValidVal;
        }
        // else if (
        //   agencyData.pancard_no == undefined ||
        //   agencyData.pancard_no == ""
        // ) {
        //   isError = false;
        //   errorMessage = strings.pancardReqVal;
        // }
        else if (
          agencyData.pancard_no !== "" &&
          Regexs.panRegex.test(agencyData.pancard_no) === false
        ) {
          isError = false;
          errorMessage = strings.pancardValidVal;
        }
        // else if (agencyData.gender == undefined || agencyData.gender == "") {
        //   isError = false;
        //   errorMessage = strings.genderReqVal;
        // } else if (
        //   agencyData.date_of_birth == undefined ||
        //   agencyData.date_of_birth == ""
        // ) {
        //   isError = false;
        //   errorMessage = strings.dateOfBirthReqVal;
        // } 
        else if (
          agencyData.primary_mobile == undefined ||
          agencyData.primary_mobile == ""
        ) {
          isError = false;
          errorMessage = strings.mobileNoReqVal;
        } else if (
          agencyData.primary_mobile?.length < 10
        ) {
          isError = false;
          errorMessage = strings.mobileNoValidReqVal;
        } else if (
          Regexs.mobilenumRegex.test(agencyData.primary_mobile) === false 
        ) {
          isError = false;
          errorMessage = strings.mobileNoValidReqVal;
        } else if (emailMobileChng?.change &&
          emailMobvalidation.primary_mobile === "wrongMobile") {
          isError = false;
          errorMessage = strings.mobileAlreadyValidReqVal;
        } 
        // else if (
        //   agencyData.whatsapp_number == undefined ||
        //   agencyData.whatsapp_number == ""
        // ) {
        //   isError = false;
        //   errorMessage = strings.whatsappNoReqVal;
        // }
        else if ( (agencyData.whatsapp_number !== "" || agencyData.whatsapp_number === null) &&
          agencyData.whatsapp_number?.length < 10
        ) {
          isError = false;
          errorMessage = strings.whatsappNoValidReqVal;
        }
         else if (agencyData.email == undefined || agencyData.email == "") {
          isError = false;
          errorMessage = strings.emailReqVal;
        } else if (validateEmail.test(agencyData.email) === false) {
          isError = false;
          errorMessage = strings.correctEmailReqVal;
        } else if (emailMobileChng?.change &&
          emailMobvalidation.email == 'wrongEmail' ) {
          isError = false;
          errorMessage = strings.emailAlreadyReqVal;
        } 
        else if (
          agencyData.location == undefined ||
          agencyData.location == ""
        ) {
          isError = false;
          errorMessage = strings.addressReqVal;
        } 
        // else if (
        //   agencyData.working_location?.length === 0 ||
        //   agencyData.working_location === undefined
        // ) {
        //   isError = false;
        //   errorMessage = strings.wrkngLocReqVal;
        // }
      }
       
      if (formType === 1) {
        if (
          agencyData.rera_certificate_no == "" ||
          agencyData.rera_certificate_no == undefined
        ) {
          isError = false;
          errorMessage = strings.reraCertNoReqVal;
        } else if (
          agencyData.rera_certificate == null ||
          agencyData.rera_certificate == "" ||
          agencyData.rera_certificate == undefined
        ) {
          isError = false;
          errorMessage = strings.reraCertImgReqVal;
        }
        //  else
        // if (
        //   agencyData?.propidership_declaration_letter == null ||
        //   agencyData?.propidership_declaration_letter == undefined ||
        //   agencyData?.propidership_declaration_letter == ''
        // ) {
        //   isError = false;
        //   errorMessage = strings.propDeclrLttrImgReqVal;
        // } else
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
        else if (
          (agencyData.account_no !== "" || agencyData.account_no == undefined )
        ) {
          if(Regexs.accountnumRegex.test(agencyData.account_no) === false){

            isError = false;
            errorMessage = strings.accountNoValidVal;
          }
        }
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
      }
      if (formType === 2) {
        if (agencyData.agency_name == "" || agencyData.agency_name == undefined) {
          isError = false;
          errorMessage = strings.agencyNameReqVal;
        } 
        else if (agencyData.gst !== "" && Regexs.gstRegex.test(agencyData.gst) === false  ) {
          isError = false;
          errorMessage = strings.gstReqVal;
        }
         else if (
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
          agencyData.company_account_no !== ""  &&
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


      if(!isError){
        Keyboard.dismiss()
      }
      return isError;
    }
  };
  useEffect(() => {
    if (emailAndMobileData?.response?.status === 200 ||
      emailAndMobileData?.response?.status === 201) {
      dispatch(emailCheckRemove());
      if (emailAndMobileData?.response?.status === 200) {
        switch (emailAndMobileData?.check_type) {
          case 'mobile':
            setEmailMobValidation({
              ...emailMobvalidation,
              primary_mobile: emailAndMobileData?.check_type,
            })
            break;
          case 'email':
            setEmailMobValidation({
              ...emailMobvalidation,
              email: emailAndMobileData?.check_type,
            })
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
            case 'mobile':
              setEmailMobValidation({
                ...emailMobvalidation,
                primary_mobile: 'wrongMobile',
              })
              break;
            case 'email':
              setEmailMobValidation({
                ...emailMobvalidation,
                email: 'wrongEmail',
              })
              break;
            default:
              break;
          }
        }
      }

    }
  }, [emailAndMobileData]);
  const handleCheckEmailMobile = (type: any) => {
    const params =
      type == 1
        ? { mobile: agencyData?.primary_mobile }
        : { email: agencyData?.email };
    dispatch(checkEmailMobile(params));
  };
  const onPressNext = (screenType: any, data: any) => {
   // Keyboard.dismiss()
    if (screenType <= 2) {
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
        formData.append("address", agencyData?.location ? agencyData?.location : "");
        formData.append("email", agencyData?.email ? agencyData?.email : "");
        // formData.append("registration_no", agencyData?.registration_no);
        formData.append("rera_registration", agencyData?.rera_registration ? agencyData?.rera_registration : "");
        formData.append("owner_name", agencyData?.owner_name ? agencyData?.owner_name : "");
        formData.append("agent_name", agencyData?.owner_name ? agencyData?.owner_name : "");
        if (type != "edit") {
          formData.append("agency_name", agencyData?.agency_name ? agencyData?.agency_name : "");
        }
        formData.append("primary_mobile", agencyData?.primary_mobile ? agencyData?.primary_mobile: "");
        formData.append("whatsapp_number", agencyData?.whatsapp_number ? agencyData?.whatsapp_number : "");
        formData.append("adhar_no", agencyData?.adhar_no ? agencyData?.adhar_no : "");
        formData.append("pancard_no", agencyData?.pancard_no ? agencyData?.pancard_no : "");
        formData.append("gender", agencyData?.gender ? agencyData?.gender : "");
        formData.append(
          "date_of_birth",
          agencyData?.date_of_birth ? agencyData?.date_of_birth : ""
        );
        formData.append("location", agencyData?.location ? agencyData?.location : "");
        formData.append("latitude", agencyData?.latitude ? agencyData?.latitude : "" );
        formData.append("longitude", agencyData?.longitude ? agencyData?.longitude : "");
        formData.append("bank_name", agencyData?.bank_name ? agencyData?.bank_name : "");
        formData.append("branch_name", agencyData?.branch_name ? agencyData?.branch_name : "");
        formData.append("account_no", agencyData?.account_no ? agencyData?.account_no : "");
        formData.append("ifsc_code", agencyData?.ifsc_code ? agencyData?.ifsc_code : "");
        formData.append("gst", agencyData?.gst ? agencyData?.gst : "");
        formData.append("company_bank_name", agencyData?.company_bank_name ? agencyData?.company_bank_name : "");
        formData.append("company_branch_name", agencyData?.company_branch_name ? agencyData?.company_branch_name : "");
        formData.append("company_account_no", agencyData?.company_account_no ? agencyData?.company_account_no : "");
        formData.append("company_ifsc_code", agencyData?.company_ifsc_code ? agencyData?.company_ifsc_code : "");
        formData.append(
          "working_location",
          agencyData?.working_location ? JSON.stringify(agencyData?.working_location) : []
        );
        formData.append("rera_certificate_no", agencyData?.rera_certificate_no ? agencyData?.rera_certificate_no : "");
        typeof agencyData?.profile_picture === "object" &&
          formData.append("profile_picture", agencyData?.profile_picture);
        typeof agencyData?.rera_certificate === "object" ?
          formData.append("rera_certificate", agencyData?.rera_certificate) :
          formData.append("rera_certificate", '')
        typeof agencyData?.propidership_declaration_letter === "object" &&
          formData.append(
            "propidership_declaration_letter",
            agencyData?.propidership_declaration_letter
          );
        typeof agencyData?.cancel_cheaque === "object" &&
          formData.append(
            "cancel_cheaque",
            agencyData?.cancel_cheaque
          );
        typeof agencyData?.pancard === "object" &&
          formData.append(
            "pancard",
            agencyData?.pancard
          );
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
          type={type}
          emailMobileChng={emailMobileChng}
          setEmailMobileChng={setEmailMobileChng}
        />
      ) : (
        <>
          {formType == 1 ? (
            <AgentBankInfo
              agencyData={agencyData}
              setAgencyData={setAgencyData}
              onPressNext={onPressNext}
              setFormType={setFormType}
              type={type}
            />
          ) : (
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
    </>
  );
};

export default AgentBasicInfo;
