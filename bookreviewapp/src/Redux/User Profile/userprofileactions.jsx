import axios from "axios";

import {
  EDIT_USER_DETAIL_REQUEST,
  EDIT_USER_DETAIL_REQUEST_SUCCESS,
  EDIT_USER_DETAIL_REQUEST_FAIL,
  GET_USER_DETAIL_REQUEST,
  GET_USER_DETAIL_REQUEST_SUCCESS,
  GET_USER_DETAIL_REQUEST_FAIL,
} from "../../Pages/User Profile/Constants";

export const getUserProfile = () => async (dispatch) => {
  try {
    dispatch({ type: GET_USER_DETAIL_REQUEST });

    const config = {
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
      },
    };
    const { data } = await axios.get(
      `http://localhost:5001/api/users/auth/status`,
      config
    );
    console.log(data.user);
    dispatch({ type: GET_USER_DETAIL_REQUEST_SUCCESS, payload: data.user });
  } catch (err) {
    dispatch({ type: GET_USER_DETAIL_REQUEST_FAIL, payload: err });
  }
};

export const editUserProfile = (userprofiledata) => async (dispatch) => {
  console.log(userprofiledata)
  try {
    dispatch({ type: EDIT_USER_DETAIL_REQUEST });

    const config = {
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
      },
    };

    const { data } = await axios.put(
      `http://localhost:5001/api/users/edituser?userid=${userprofiledata._id}`, 
      userprofiledata,
      config
    );

    dispatch({ type: EDIT_USER_DETAIL_REQUEST_SUCCESS, payload: data });
  } catch (err) {
    dispatch({ type: EDIT_USER_DETAIL_REQUEST_FAIL, payload: err.response?.data?.message || err.message });
  }
};