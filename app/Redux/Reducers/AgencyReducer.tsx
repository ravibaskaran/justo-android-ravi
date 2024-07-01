import {
  ADD_TARGET_FOR_CP,
  ADD_TARGET_FOR_CP_ERROR,
  AGENCY_CREATE_FORM,
  AGENCY_CREATE_FORM_ERROR,
  CREATE_AGENCY,
  CREATE_AGENCY_ERROR,
  EDIT_AGENCY,
  GET_AGENCY_DETAIL,
  REMOVE_ADD_TARGET_FOR_CP,
  REMOVE_AGENCY,
  REMOVE_UPDATE_ASSIGN_CP,
  UPDATE_ASSIGN_CP_STATUS,
} from "../types";

const initialStateForm = {
  response: null,
  update: false,
  create: false,
};
const initialStateForm1 = {
  response: null,
  add: false
};
const initialState = {
  response: null,
  update: false,
  create: false,
  detail: false,
};

export function agencyCreateFormReducer(state = initialStateForm, action: any) {
  switch (action.type) {
    case AGENCY_CREATE_FORM:
      return {
        ...state,
        update: false,
        create: false,
        response: action.payload,
      };
    case AGENCY_CREATE_FORM_ERROR:
      return {
        ...state,
        update: false,
        create: false,
        response: action.payload,
      };

    default:
      return state;
  }
}
export function agencyReducer(state = initialState, action: any) {
  switch (action.type) {
    case CREATE_AGENCY:
      return {
        ...state,
        update: false,
        create: true,
        response: action.payload,
      };
    case GET_AGENCY_DETAIL:
      return {
        ...state,
        update: true,
        create: false,
        detail: true,
        response: action.payload,
      };
    case CREATE_AGENCY_ERROR:
      return {
        ...state,
        update: false,
        create: true,
        response: action.payload,
      };

    default:
      return state;
  }
}
export function agencyStatusReducer(state = initialStateForm, action: any) {
  switch (action.type) {
    case UPDATE_ASSIGN_CP_STATUS:
      return {
        ...state,
        detail: false,
        create: true,
        response: action.payload,
      };
    case REMOVE_UPDATE_ASSIGN_CP:
      return {
        ...state,
        create: false,
        response: action.payload,
      };
    default:
      return state;
  }
}
export function addTargetForCpReducer(state = initialStateForm1, action: any) {
  switch (action.type) {
    case ADD_TARGET_FOR_CP:
      return {
        ...state,
        add: true,
        response: action.payload,
      };
    case REMOVE_ADD_TARGET_FOR_CP:
      return {
        ...state,
        add: true,
        response: action.payload,
      };
    case ADD_TARGET_FOR_CP_ERROR:
      return {
        ...state,
        add: false,
        response: action.payload,
      };
    default:
      return state;
  }
}
export function addEditAgencyReducer(state = initialStateForm, action: any) {
  switch (action.type) {
    case CREATE_AGENCY:
      return {
        ...state,
        detail: false,
        create: true,
        response: action.payload,
      };
    case EDIT_AGENCY:
      return {
        ...state,
        detail: false,
        create: true,
        response: action.payload,
      };
    case REMOVE_AGENCY:
      return {
        ...state,
        create: false,
        response: action.payload,
      };
    default:
      return state;
  }
}

