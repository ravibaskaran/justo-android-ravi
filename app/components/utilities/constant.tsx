import moment from "moment";
import { Platform } from "react-native";

export const FONT_FAMILY_LIGHT = "Nunito-Light";
export const FONT_FAMILY_REGULAR = "Nunito-Regular";
export const FONT_FAMILY_MEDIUM = "Nunito-Medium";
export const FONT_FAMILY_SEMIBOLD = "Nunito-SemiBold";
export const FONT_FAMILY_EXTRABOLD = "Nunito-ExtraBold";

export const PRIMARY_THEME_COLOR = "#162b70";
export const PRIMARY_THEME_COLOR_DARK = "#102054";

export const BLACK_COLOR = "#000000";
export const WHITE_COLOR = "#ffffff";
export const WHITE_COLOR_LIGHT = "#f5f5e9";
export const YELLOW_COLOR = "#d68904";
export const BLUE_COLOR = "#0493d6";
export const PURPLE_COLOR = "#b93cff";
export const GRAY_COLOR = "#bdbbbb";
export const TABBAR_COLOR = "#F5CB44";
export const GRAY_LIGHT_COLOR = "#757070";
export const BG_MAIN_COLOUR = "#eeeef1";
export const GOLDEN_COLOR = "#E4D00A";
export const GREEN_COLOR = "#008000";
export const RED_COLOR = "#FF0000";
export const CALL_COLOR = "#52a4ff";
export const BORDER_COLOR = "#d9effa";

export const validateEmail =
  /^(([^<>()[\]\\.,;:\s@\']+(\.[^<>()[\]\\.,;:\s@\']+)*)|(\'.+\'))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
export const checkSpecialChar = /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;

export const Isios = Platform.OS === "ios";
export const DATE_FORMAT = "YYYY-MM-DD";
export const DATE_BY_DAY = "DD-MM-YYYY";
export const DATE_FORMAT_EXCL = "DD/MM/YYYY";
export const TIME_FORMAT = "LT";
export const DATE_TIME_FORMAT = "DD-MM-YYYY, h:mm a";
export const AMOUNT_TYPE = [{ value: "Cr" }, { value: "L" }, { value: "K" }];
export const ONE_MONTH_DATES = new Date(
  new Date().setDate(new Date().getDate() + 31)
);

// export const GLOBAL_URL = "http://192.168.1.52:3002"; // localhost server Aswin
export const GLOBAL_URL = "http://192.168.1.48:3001"; // localhost server Shabeer
// export const GLOBAL_URL = 'http://192.168.1.58:3002' // Aswin cp.

// export const  GLOBAL_URL = 'https://prodapi.justoverse.com:3002' //prod
// export const GLOBAL_URL = "https://demoapi.inexoftworld.com:3002"; // localhost server
// export const GLOBAL_URL = "https://api.justoverse.com:3000"; //New localhost serve*

export const MAP_KEY = "AIzaSyCbDx7Lk4eTMzptrQKXZvOPYgEMggrq8o4";

export const JW_LOGIN = "api";

// export const JW_PASSWORD = "8a09b13792174b21ef6b6d2302ac420f9ac5688b"; //PROD
export const JW_PASSWORD = "c519013b5310cab0a07d0976411827ca937431ef"; //DEMO API

export const ROLE_IDS = {
  suadminrole_id: "6344049eb4f40996bcf1265a",
  // admin_id: "6373203dd9363c459e315563",
  sourcingtl_id: "63464da503a33caee62c9cf2",
  sourcingmanager_id: "63466085fadec47fe8e96bb7",
  closingmanager_id: "63731fd3d9363c459e31551f",
  closingtl_id: "63731fafd9363c459e31550c",
  cp_id: "6346a40364de88d6385d4e38",
  agent_id: "6373209fd9363c459e3155b6",
  postsales_id: "63732009d9363c459e315530",
  receptionist_id: "6373202cd9363c459e315551",
  sitehead_id: "63d37697b29929d68de050f9",
  clusterhead_id: "63da1736ee01b8d62ceb7ea2",
  callcenter_id: "63732080d9363c459e3155a2",
  businesshead_id: "63da1b26ee01b8d62ceb81d3",
  scm_id: "66f64e74bf01ef6a7a59c501",
  sourcing_head_id: "66f64d5ebf01ef6a7a59c3de",
  closing_head_id: "66f654a587d9df88e43b17b4",
  admin_id: "6703d823a38e367e30eed8e5",
};
export const CONST_IDS = {
  cp_lead_source_id: "645b3a414194e4010913546c",
  by_self_lead_source_id: "63ecd90787f864d94a3882ee",
  followup_status_site_visit_id: "635cccc2476b6dc530658566",
  ref_lead_source_id: "645b3a524194e40109135470",
};
export const Regexs = {
  AadharRegex: new RegExp(/^[2-9]{1}[0-9]{3}\s[0-9]{4}\s[0-9]{4}$/),
  panRegex: new RegExp(/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/),
  emailRegex: new RegExp(
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  ),
  phoneNumRegex: new RegExp(/^(\+\d{1,3}[- ]?)?\d{10}$/),
  // emailOrPhone: new RegExp(/^(?:\d{10}|\w+@\w+\.\w{2,3})$/)
  emailOrPhone: new RegExp(/^(.+@.+|\d{10})$/),
  mobilenumRegex: new RegExp(/^[6-9]{1}[0-9]{9}$/),
  accountnumRegex: new RegExp(/^\d{9,18}$/),
  ifscRegex: new RegExp(/^[A-Z]{4}0[A-Z0-9]{6}$/),
  specialCharacters: new RegExp(/[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/),
  alphaNumeric: new RegExp(/^[A-Za-z0-9\s]*$/),
  gstRegex: new RegExp(/\d{2}[A-Z]{5}\d{4}[A-Z]{1}[A-Z\d]{1}[Z]{1}[A-Z\d]{1}/),
  oneSpaceRegex: new RegExp(/^([a-zA-Z0-9]+\s)*[a-zA-Z0-9]+$/),
  reraRegex: new RegExp(/^[A-Z]\d{11,12}$/),
};

export const todayDate = {
  start_date: moment(new Date()).format(DATE_FORMAT),
  end_date: moment(new Date()).format(DATE_FORMAT),
};

export function getAge(dateString: any) {
  // var today = new Date();
  // var birthDate = new Date(dateString);
  // var age = today.getFullYear() - birthDate.getFullYear();
  // var m = today.getMonth() - birthDate.getMonth();
  // if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
  //   age--;
  // }
  // return age;
  const [day, month, year] = dateString.split("/").map(Number);
  const birthDate = new Date(year, month - 1, day);
  const age = new Date().getFullYear() - birthDate.getFullYear();

  return new Date() < new Date(new Date().getFullYear(), month - 1, day)
    ? age - 1
    : age;
}

export const INVENTORY_STATUS = {
  rtb: "RTB",
  rts: "RTS",
};
