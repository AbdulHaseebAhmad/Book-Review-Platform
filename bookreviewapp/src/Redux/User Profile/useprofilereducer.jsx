import {
    EDIT_USER_DETAIL_REQUEST,
    EDIT_USER_DETAIL_REQUEST_SUCCESS,
    EDIT_USER_DETAIL_REQUEST_FAIL,
    GET_USER_DETAIL_REQUEST,
    GET_USER_DETAIL_REQUEST_SUCCESS,
    GET_USER_DETAIL_REQUEST_FAIL
  } from '../../Pages/User Profile/Constants';

  const initialState = {
    loading: false,
    data: [],
    error: null,
    msg: '',
  };
  
  export const userProfileReducer = (state = initialState, action) => {
    switch (action.type) {
      case EDIT_USER_DETAIL_REQUEST:
        return {
          ...state,
          loading: true,
          error: null,
          msg: EDIT_USER_DETAIL_REQUEST,
        };
      case EDIT_USER_DETAIL_REQUEST_SUCCESS:
        return {
          ...state,
          loading: false,
          data: action.payload,
          error: null,
          msg: EDIT_USER_DETAIL_REQUEST_SUCCESS,
        };
      case EDIT_USER_DETAIL_REQUEST_FAIL:
        return {
          ...state,
          loading: false,
          error: action.payload,
          msg: EDIT_USER_DETAIL_REQUEST_FAIL,
        };
  
      case GET_USER_DETAIL_REQUEST:
        return {
          ...state,
          loading: true,
          error: null,
          msg: GET_USER_DETAIL_REQUEST,
        };
      case GET_USER_DETAIL_REQUEST_SUCCESS:
        return {
          ...state,
          loading: false,
          data: action.payload,
          error: null,
          msg: GET_USER_DETAIL_REQUEST_SUCCESS,
        };
      case GET_USER_DETAIL_REQUEST_FAIL:
        return {
          ...state,
          loading: false,
          error: action.payload,
          msg: GET_USER_DETAIL_REQUEST_FAIL,
        };
  
      default:
        return state;
    }
  };
  