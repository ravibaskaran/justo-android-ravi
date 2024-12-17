import {
  GET_PROJECT_REPORT_DETAILS,
  GET_PROJECT_REPORT_ERROR,
  GET_REPORT_ERROR,
} from "../types";
const initialStateForm = {
  response: null,
};

export function ProjectReportReducer(state = initialStateForm, action: any) {
  switch (action.type) {
    case GET_PROJECT_REPORT_DETAILS:
      return {
        ...state,
        response: action.payload,
      };
    case GET_PROJECT_REPORT_ERROR:
      return {
        ...state,
        response: action.payload,
      };
    default:
      return state;
  }
}
