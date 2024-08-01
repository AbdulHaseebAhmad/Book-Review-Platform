import {
  ADD_REVIEW_REQUEST,
  ADD_RIVIEW_REQUEST_SUCCESS,
  ADD_REVIEW_REQUEST_FAIL,
} from "../../Pages/AddBookReview/Constants";

import {
  EDIT_REVIEW_REQUEST,
  EDIT_RIVIEW_REQUEST_SUCCESS,
  EDIT_REVIEW_REQUEST_FAIL,
  GET_PREVIOUS_REVIEW_REQUEST,
  GET_PREVIOUS_REVIEW_REQUEST_SUCCESS,
  GET_PREVIOUS_REVIEW_REQUEST_FAIL,
  DELETE_PREVIOUS_REVIEW_REQUEST,
  DELETE_PREVIOUS_REVIEW_REQUEST_SUCCESS,
  DELETE_PREVIOUS_REVIEW_REQUEST_FAIL,
  
} from "../../Pages/PreviousReviews/Constants";

import {
  GET_RECOMMENDED_REVIEW_REQUEST,
GET_RECOMMENDED_REVIEW_REQUEST_SUCCESS,
GET_RECOMMENDED_REVIEW_REQUEST_FAIL,
} from "../../Pages/Recommended Books/Constants"

const initialState = {
  loading: false,
  data: [],
  error: null,
  msg: "",
};

export const bookReviewReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_PREVIOUS_REVIEW_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
        msg: GET_PREVIOUS_REVIEW_REQUEST,
      };
    case GET_PREVIOUS_REVIEW_REQUEST_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.payload,
        error: null,
        msg: GET_PREVIOUS_REVIEW_REQUEST_SUCCESS,
      };
    case GET_PREVIOUS_REVIEW_REQUEST_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
        msg: GET_PREVIOUS_REVIEW_REQUEST_FAIL,
      };

    case ADD_REVIEW_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
        msg: ADD_REVIEW_REQUEST,
      };
    case ADD_RIVIEW_REQUEST_SUCCESS:
      return {
        ...state,
        loading: false,
        data: [...state.data, action.payload], // Add new review to existing data
        error: null,
        msg: ADD_RIVIEW_REQUEST_SUCCESS,
      };
    case ADD_REVIEW_REQUEST_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
        msg: ADD_REVIEW_REQUEST_FAIL,
      };

    case EDIT_REVIEW_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
        msg: EDIT_REVIEW_REQUEST,
      };
    case EDIT_RIVIEW_REQUEST_SUCCESS:
      return {
        ...state,
        loading: false,
        data: state.data.map((review) =>
          review._id === action.payload._id ? action.payload : review
        ), // Update review in existing data
        error: null,
        msg: EDIT_RIVIEW_REQUEST_SUCCESS,
      };
    case EDIT_REVIEW_REQUEST_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
        msg: EDIT_REVIEW_REQUEST_FAIL,
      };

    case DELETE_PREVIOUS_REVIEW_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
        msg: DELETE_PREVIOUS_REVIEW_REQUEST,
      };
    case DELETE_PREVIOUS_REVIEW_REQUEST_SUCCESS:
      return {
        ...state,
        loading: false,
        data: state.data.filter((review) => review._id !== action.payload), // Remove deleted review from existing data
        error: null,
        msg: DELETE_PREVIOUS_REVIEW_REQUEST_SUCCESS,
      };
    case DELETE_PREVIOUS_REVIEW_REQUEST_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
        msg: DELETE_PREVIOUS_REVIEW_REQUEST_FAIL,
      };
    case GET_RECOMMENDED_REVIEW_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
        msg: GET_RECOMMENDED_REVIEW_REQUEST,
      };
    case GET_RECOMMENDED_REVIEW_REQUEST_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.payload,
        error: null,
        msg: GET_RECOMMENDED_REVIEW_REQUEST_SUCCESS,
      };
    case GET_RECOMMENDED_REVIEW_REQUEST_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
        msg: GET_RECOMMENDED_REVIEW_REQUEST_FAIL,
      };

    default:
      return state;
  }
};
