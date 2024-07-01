import { COMPANY_EMPLOYEE_LIST, COMPANY_EMPLOYEE_LIST_ERROR, COMPANY_LIST, COMPANY_LIST_ERROR } from "../types";

const initialState = {
    response: null,
    list: false,
};
const empInitialState = {
    response: null,
    emplist: false,
};

export function CompanyReducer(state = initialState, action: any) {
    switch (action.type) {
        case COMPANY_LIST:
            return {
                ...state,
                list: true,
                response: action.payload,
            };
        case COMPANY_LIST_ERROR:
            return {
                ...state,
                list: false,
                response: action.payload,
            };
        default:
            return state;
    }
}
export function EmployeeReducer(state = empInitialState, action: any) {
    switch (action.type) {
        case COMPANY_EMPLOYEE_LIST:
            return {
                ...state,
                emplist: true,
                response: action.payload,
            };
        case COMPANY_EMPLOYEE_LIST_ERROR:
            return {
                ...state,
                emplist: false,
                response: action.payload,
            };
        default:
            return state;
    }
}