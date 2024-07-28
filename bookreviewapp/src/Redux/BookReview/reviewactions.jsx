import axios from 'axios'; // Ensure axios is imported


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

export const getpreviousReviews =
  (userid) => async (dispatch) => {
    try {
      dispatch({ type: GET_PREVIOUS_REVIEW_REQUEST });

      const config = {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      };
      const { data } = await axios.get(
        `https://book-review-platform-qfuv.vercel.app/api/reviews/previousreviews?userid=${userid}`,
        config
      );
      console.log(data)
      dispatch({ type: GET_PREVIOUS_REVIEW_REQUEST_SUCCESS, payload: data });
    } catch (err) {
      dispatch({ type: GET_PREVIOUS_REVIEW_REQUEST_FAIL, payload: err });
    }
  };

  export const getallreviews = (queryyy = {}) => async (dispatch) => {
    try {
      dispatch({ type: GET_PREVIOUS_REVIEW_REQUEST });
  
      const config = {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      };
  
      const query = new URLSearchParams({
        filter: queryyy.filterType || "",
        filterValue: queryyy.searchTerm || "",
      }).toString();
      
      const { data } = await axios.get(
        `https://book-review-platform-qfuv.vercel.app/api/reviews/getallreviews?${query}`,
        config
      );
  
      dispatch({ type: GET_PREVIOUS_REVIEW_REQUEST_SUCCESS, payload: data });
    } catch (err) {
      dispatch({ type: GET_PREVIOUS_REVIEW_REQUEST_FAIL, payload: err.message });
    }
  };
  


  export const addReview = (reviewData) => async (dispatch) => {
    try {
      dispatch({ type: ADD_REVIEW_REQUEST });
  
      const config = {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      };
  
      const { data } = await axios.post(
        "https://book-review-platform-qfuv.vercel.app/api/reviews/addreview", // !Forget to Replace with the correct endpoint
        reviewData,
        config
      );
      console.log(reviewData)
      dispatch({ type: ADD_RIVIEW_REQUEST_SUCCESS, payload: data });
    } catch (err) {
      dispatch({ type: ADD_REVIEW_REQUEST_FAIL, payload: err.response?.data?.message || err.message });
    }
  };

  export const editReview = (reviewData) => async (dispatch) => {
    console.log(reviewData)
    try {
      dispatch({ type: EDIT_REVIEW_REQUEST });
  
      const config = {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      };
  
      const { data } = await axios.put(
        `https://book-review-platform-qfuv.vercel.app/api/reviews/editreview?reviewid=${reviewData._id}`, // Replace with the correct endpoint
        reviewData,
        config
      );
  
      dispatch({ type: EDIT_RIVIEW_REQUEST_SUCCESS, payload: data });
    } catch (err) {
      dispatch({ type: EDIT_REVIEW_REQUEST_FAIL, payload: err.response?.data?.message || err.message });
    }
  };

  export const deleteReview = (reviewId) => async (dispatch) => {
    try {
      dispatch({ type: DELETE_PREVIOUS_REVIEW_REQUEST });
  
      const config = {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      };
  
      await axios.delete(
        `https://book-review-platform-qfuv.vercel.app/api/reviews/deletereview?reviewid=${reviewId}`, 
        config
      );
  
      dispatch({ type: DELETE_PREVIOUS_REVIEW_REQUEST_SUCCESS, payload: reviewId, });
    } catch (err) {
      dispatch({ type: DELETE_PREVIOUS_REVIEW_REQUEST_FAIL, payload: err.response?.data?.message || err.message });
    }
  };