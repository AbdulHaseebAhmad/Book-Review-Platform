import React, { useEffect, useState } from "react";
import { Form, useNavigate, useParams } from "react-router-dom";
import { FORM_FIELDS, userProfileSchema } from "./Constants";
import { useDispatch, useSelector } from "react-redux";
import {
  getUserProfile,
  editUserProfile,
} from "../../Redux/User Profile/userprofileactions";
import { EDIT_USER_DETAIL_REQUEST_SUCCESS } from "./Constants";
const UserProfile = () => {
  useEffect(() => {
    dispatch(getUserProfile());
  }, []);
  const navigate = useNavigate();
  const userProfileState = useSelector((state) => state.userProfile);
  const { msg, loading } = userProfileState;
  const { username, email, password } = userProfileState.data;
  const [formValues, setFormValue] = useState({
    username: userProfileState.data.username,
    email: userProfileState.data.email,
    password: userProfileState.data.password,
  });

  const [errors, setErrors] = useState({});
  const [formIsValid, setFormIsValid] = useState(false);
  const dispatch = useDispatch();

  console.log(msg);
  const params = useParams();
  const { userid } = params;
  const onChangeHandle = async (e) => {
    const { name, value } = e.target;
    setFormValue((prevValues) => {
      return { ...prevValues, [name]: value };
    });

    let isValidated = await userProfileSchema
      .validate(formValues)
      .then((value) => {
        console.log(value);
        setErrors(false);
        return true;
      })
      .catch(function (err) {
        console.log(err);
        let errors = err.errors;
        setErrors((prevErrors) => {
          return { ...prevErrors, errors };
        });
        return false;
      });
    setFormIsValid(isValidated);
  };

  const onSubmitHandle = async (e) => {
    e.preventDefault();
    if (formIsValid) {
      dispatch(
        editUserProfile({
          ...userProfileState.data,
          email: formValues.email,
          username: formValues.username,
          password: formValues.password,
        })
      );
    // navigate("/");
    } else {
      console.log("formIsNotValidated");
    }
  };

  const cancelEditHandle = () => {
    navigate("/");
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-11/12 max-w-md">
        <h2 className="text-xl font-bold mb-4 text-[#223F7A]">User Profile</h2>

        {!loading && msg && msg === EDIT_USER_DETAIL_REQUEST_SUCCESS ? (
          <div className="bg-white p-6 rounded-lg  w-11/12 max-w-md">
            <p className="text-xl font-medium mb-4 text-[#223F7A]">Profile Edit Successfull</p>
            <div className="flex justify-end space-x-2">
              <button
                onClick={cancelEditHandle}
                className="bg-[#223F7A] text-white px-4 py-2 rounded-md hover:bg-[#1d2a4e] transition-colors"
                >
                Okay
              </button>
            </div>
          </div> ) : <Form className="space-y-4" onSubmit={onSubmitHandle}>
          {FORM_FIELDS.map(({ name, label, type, placeholder, id }) => {
            return (
              <div key={id}>
                <label
                  htmlFor={id}
                  className="block text-sm font-semibold mb-1 text-gray-700"
                >
                  {label}
                </label>
                <input
                  style={{
                    border:
                      errors.errors &&
                      errors.errors[0] &&
                      errors.errors[0].inputType === name &&
                      "2px solid #FF6600",
                  }}
                  onChange={onChangeHandle}
                  name={name}
                  id={id}
                  type={type}
                  placeholder={placeholder}
                  className="w-full p-2 border border-gray-300 rounded-md outline-none"
                  value={formValues[name]}
                />{" "}
                {errors.errors &&
                  errors.errors[0] &&
                  errors.errors[0].inputType === name && (
                    <p className="text-[#FF6600] font-semibold mt-2">
                      {errors.errors[0].msg}
                    </p>
                  )}
              </div>
            );
          })}

          {formIsValid && formValues.password.length > 8 && (
            <button
              type="submit"
              className="w-full bg-[#223F7A] text-white p-2 rounded-md hover:bg-[#1d2a4e] transition-colors"
            >
              Submit Review
            </button>
          )}
          <button
            onClick={cancelEditHandle}
            type="button"
            className="w-full bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600 "
          >
            Cancel
          </button>
        </Form>}
      </div>
    </div>
  );
};

export default UserProfile;
