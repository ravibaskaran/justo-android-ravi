import { GET_REPORT_DETAILS, GET_REPORT_ERROR} from "../types";
const initialStateForm = {
  response: null,
};


export function ReportReducer(state = initialStateForm, action: any) {
    switch (action.type) {
      case GET_REPORT_DETAILS:
        return {
          ...state,
          response: action.payload,
        };
      case GET_REPORT_ERROR:
        return {
          ...state,
          response: action.payload,
        };
      default:
        return state;
    }
  }