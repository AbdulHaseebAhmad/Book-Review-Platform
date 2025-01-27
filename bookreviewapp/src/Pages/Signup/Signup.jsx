import React, { useState } from "react";
import { Form, Link, useSubmit, redirect, useActionData } from "react-router-dom";
import { FORM_FIELDS, SignupSchema } from "./Constants";
import { ROUTE_DEFAULT as SIGNUP_PAGE_ROUTE } from "./Constants";
import { ROUTE_DEFAULT as LOGIN_DEFAULT_ROUTE} from "../Login/Constants";
const SignupPage = () => {
  const submit = useSubmit();

  const [formValues, setFormValue] = useState({
    email: "",
    password: "",
  });

  const data = useActionData()

  const [errors, setErrors] = useState({});
  const [formIsValid, setFormIsValid] = useState(false);
  const onChangeHandle = async (e) => {
    const { name, value } = e.target;
    setFormValue((prevValues) => {
      return { ...prevValues, [name]: value };
    });
    let isValidated = await SignupSchema.validate(formValues)
      .then((value) => {
        console.log(value);
        setErrors(false);
        return true;
      })
      .catch(function (err) {
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
      submit(formValues, {
        method: "POST",
        action: `/${SIGNUP_PAGE_ROUTE}`,
        encType: "application/json",
      });
    } else {
      console.log("formIsNotValidated");
    }
  };

  return (
    <>
      <div
        className="min-h-screen flex items-center justify-center bg-cover bg-center p-4"
        style={{
          backgroundImage:
            "url('https://foodtank.com/wp-content/uploads/2021/07/alfons-morales-YLSwjSy7stw-unsplash.jpg')",
        }}
      >
        <div className="bg-white bg-opacity-65 p-10 rounded-lg shadow-lg w-full max-w-sm flex flex-col items-center">
          <div className="mb-6 text-center">
            <h2 className="text-2xl font-bold text-[#223F7A]">
              Sign Up To Review Books
            </h2>
          </div>
          <Form className="w-full" onSubmit={onSubmitHandle}>
            {FORM_FIELDS.map(({ name, type, label, placeholder, id }) => (
              <div key={id} className="mb-4">
                <label
                  htmlFor={id}
                  className="block text-[#223F7A] font-semibold mb-2"
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
                  id={id}
                  name={name}
                  type={type}
                  placeholder={placeholder}
                  className="w-full p-2 border border-[#223F7A] rounded text-[#223F7A] focus:outline-none focus:ring-2 focus:ring-[#223F7A]"
                />
                {errors.errors &&
                  errors.errors[0] &&
                  errors.errors[0].inputType === name && (
                    <p className="text-[#FF6600] font-semibold mt-2">
                      {errors.errors[0].msg}
                    </p>
                  )}
              </div>
            ))}

            {data && data.msg && (
              <p className="text-red-600 font-semibold mt-2 mb-2">
                {data.msg}
              </p>
            )}
            <button
              type="submit"
              className="w-full bg-[#223F7A] hover:bg-[#1a2e5b] text-white font-bold py-2 px-4 rounded"
            >
              SignUp
            </button>
          </Form>

          <div className="text-[#FF6600] font-bold my-3">OR</div>

          <div className="w-full">
            <Link to={`/${LOGIN_DEFAULT_ROUTE}`} className="w-[100%]">
              <button className="bg-[#223F7A] hover:opacity-95 text-white font-bold py-2 px-4 w-[100%] rounded">
                Login
              </button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignupPage;

export const signupAuthAction = async ({ request, params }) => {
  const requestBody = await request.json();

  const response = await fetch("http://localhost:5001/api/users/auth/signup", {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(requestBody),
  });

  const data = await response.json();

  console.log(data, response.status);

  if (response.status === 201) {
    return redirect(`/loginpage`);
  } 

  return data;
};
