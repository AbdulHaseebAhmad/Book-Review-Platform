import * as Yup from "yup";

export const ROUTE_DEFAULT = "signuppage";

export const SignupSchema = Yup.object().shape({
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

export const LOGIN_SUBMIT_CREDENTIAL_REQUEST = "Requested Login.";
export const LOGIN_SUBMIT_CREDENTIALS_SUCCESS = "Login Successfull.";
export const LOGIN_SUBMIT_CREDENTIALS_FAIL = "Login Failed.";
