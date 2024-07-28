import * as Yup from "yup";

export const EDIT_USER_DETAIL_REQUEST =
  "Submitting User Profile Editing Request";
export const EDIT_USER_DETAIL_REQUEST_SUCCESS =
  "User Profile Editing Request Successfull.";
export const EDIT_USER_DETAIL_REQUEST_FAIL =
  "User Profile Editing Request Failed.";

export const GET_USER_DETAIL_REQUEST = "Submitting Get User Profile Request";
export const GET_USER_DETAIL_REQUEST_SUCCESS =
  "Get User Profile Request Successfull";
export const GET_USER_DETAIL_REQUEST_FAIL = "Get User Profile Request Failed";

export const ROUTE_DEFAULT = "userprofile";

export const userProfileSchema = Yup.object().shape({
  email: Yup.string()
    .email({ inputType: "email", msg: "Email is Invalid" })
    .required({ inputType: "email", msg: "Email is Required" }),
  password: Yup.string()
    .min(8, { inputType: "password", msg: "Password is Short" })
    .required({ inputType: "password", msg: "Password is Required" }),
  username: Yup.string()
    .min(8, { inputType: "username", msg: "Username must be Eight Characters" })
    .required({ inputType: "username", msg: "Username is Required" }),
});

export const FORM_FIELDS = [
  {
    name: "username",
    label: "Username",
    type: "text",
    placeholder: "Please Type in your Username",
    id: "username",
  },

  {
    name: "email",
    label: "Email",
    type: "Email",
    placeholder: "Please Type in your Email",
    id: "Email",
  },

  {
    name: "password",
    label: "Password",
    type: "Password",
    placeholder: "Please Type In Your Password",
    id: "Password",
  },
];
