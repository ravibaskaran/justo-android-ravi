import { handleApiError } from "../../components/ErrorMessage/HandleApiErrors";
import apiEndPoints from "../../components/utilities/apiEndPoints";
import { apiCall } from "../../components/utilities/httpClient";
import {
  COMPANY_EMPLOYEE_LIST,
  COMPANY_EMPLOYEE_LIST_ERROR,
  COMPANY_LIST,
  COMPANY_LIST_ERROR,
  START_LOADING,
  STOP_LOADING,
} from "../types";

export const getCompanyList = (params: any) => async (dispatch: any) => {
  dispatch({ type: START_LOADING });
  try {
    // const res = await apiCall("post", apiEndPoints.VISITORLIST, params);
    const res = {
      data: {
        company: [
          {
            companyname: "Company first",
            _id: "1",
          },
          {
            companyname: "Company Second",
            _id: "2",
          },
          {
            companyname: "Company Third",
            _id: "3",
          },
        ],
        status: 200
      },
    };
    if (res?.data?.status == 200) {
      dispatch({
        type: COMPANY_LIST,
        payload: res.data,
      });
    } else {
      handleApiError(res.data);
      dispatch({
        type: COMPANY_LIST,
        payload: [],
      });
    }
  } catch (e) {
    dispatch({
      type: COMPANY_LIST_ERROR,
      payload: console.log(e),
    });
  } finally {
    dispatch({ type: STOP_LOADING });
  }
};
export const getEmployeeList = (params: any) => async (dispatch: any) => {
  dispatch({ type: START_LOADING });
  try {
    const res = await apiCall("post", apiEndPoints.GET_EMPLOYEE_LIST, params);
    // const res = {
    //   data: {
    //     employees: [
    //       {
    //         employeeName: "Employeeee name 1",
    //         _id: "1",
    //         compId: "1"
    //       },
    //       {
    //         employeeName: "Employeeee name 2",
    //         _id: "2",
    //         compId: "2"
    //       },
    //       {
    //         employeeName: "Employeeee name 3",
    //         _id: "3",
    //         compId: "3"
    //       },
    //     ],
    //     status: 200
    //   },
    // };
    if (res?.data?.status == 200) {
      dispatch({
        type: COMPANY_EMPLOYEE_LIST,
        payload: res.data,
      });
    } else {
      handleApiError(res.data);
      dispatch({
        type: COMPANY_EMPLOYEE_LIST,
        payload: [],
      });
    }
  } catch (e) {
    dispatch({
      type: COMPANY_EMPLOYEE_LIST_ERROR,
      payload: console.log(e),
    });
  } finally {
    dispatch({ type: STOP_LOADING });
  }
};
