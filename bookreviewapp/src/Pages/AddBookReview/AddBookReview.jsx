import React, { useEffect, useState } from "react";
import { FORM_FIELDS, AddReviewSchema } from "./Constants";
import { Form, useNavigate, useParams,Link } from "react-router-dom";
import { addReview } from "../../Redux/BookReview/reviewactions";
import { useDispatch, useSelector } from "react-redux";
import { ADD_RIVIEW_REQUEST_SUCCESS, ADD_REVIEW_REQUEST } from "./Constants";

const AddBookReviewPage = () => {
  const [formValues, setFormValue] = useState();
  const [errors, setErrors] = useState({});
  const [formIsValid, setFormIsValid] = useState(false);
  const dispatch = useDispatch();
  const params = useParams();
  const userId = params.userid;
  const bookReviewState = useSelector((state) => state.bookReview);
  const { loading, msg, data: reviews } = bookReviewState;
  const navigate = useNavigate();
  console.log(msg);
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const onChangeHandle = async (e) => {
    const { name, value } = e.target;
    setFormValue((prevValues) => {
      return { ...prevValues, [name]: value };
    });

    let isValidated = await AddReviewSchema.validate(formValues)
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
    console.log("submittingForm");
    e.preventDefault();
    if (formIsValid) {
      const review = { ...formValues, reviewbyuser: userId };
      dispatch(addReview(review));
      console.log(msg);
    } else {
      console.log("formIsNotValidated");
    }
  };

  const closeAddBookReviewHandle = () => {
    dispatch({ type: ADD_REVIEW_REQUEST });
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="w-full max-w-lg bg-white p-6 rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold mb-6 text-[#223F7A]">
          Add a Book Review
        </h1>

        {!loading && msg && msg === ADD_RIVIEW_REQUEST_SUCCESS ? (
          <div className="bg-white p-6 rounded-lg  w-11/12 max-w-md">
            <p className="text-xl font-medium mb-4 text-[#223F7A]">
              Review Added Successfull
            </p>
            <div className="flex justify-end space-x-2">
              <button
                onClick={closeAddBookReviewHandle}
                className="bg-[#223F7A] text-white px-4 py-2 rounded-md hover:bg-[#1d2a4e] transition-colors"
              >
                Okay
              </button>
            </div>
          </div>
        ) : (
          <Form className="space-y-4" onSubmit={onSubmitHandle}>
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
            <div>
              <label
                htmlFor="reviewText"
                className="block text-sm font-semibold mb-1 text-gray-700"
              >
                Review Text
              </label>
              <textarea
                style={{
                  border:
                    errors.errors &&
                    errors.errors[0] &&
                    errors.errors[0].inputType === "reviewText" &&
                    "2px solid #FF6600",
                }}
                onChange={onChangeHandle}
                name="reviewText"
                id="reviewText"
                rows="4"
                placeholder="Write your review"
                className="w-full p-2 border border-gray-300 rounded-md"
              />
              {errors.errors &&
                errors.errors[0] &&
                errors.errors[0].inputType === "reviewText" && (
                  <p className="text-[#FF6600] font-semibold mt-2">
                    {errors.errors[0].msg}
                  </p>
                )}
            </div>
            {/* Rating */}
            <div>
              <label className="block text-sm font-semibold mb-1 text-gray-700">
                Rating {formValues && formValues.rating ? formValues.rating : 0}
                /5
              </label>
              <div className="flex space-x-2 items-center">
                {[1, 2, 3, 4, 5].map((star) => (
                  <label key={star} className="flex items-center space-x-1">
                    <input
                      style={{
                        border:
                          errors.errors &&
                          errors.errors[0] &&
                          errors.errors[0].inputType === "reviewText" &&
                          "2px solid #FF6600",
                      }}
                      onClick={onChangeHandle}
                      type="radio"
                      name="rating"
                      value={star}
                      className="hidden"
                    />
                    <svg
                      className="w-6 h-6 text-yellow-400 cursor-pointer"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      stroke="none"
                    >
                      <path d="M12 17.27L18.18 21 16.54 13.97 22 9.24 14.81 8.63 12 2 9.19 8.63 2 9.24 7.46 13.97 5.82 21 12 17.27z" />
                    </svg>
                  </label>
                ))}
                {errors.errors &&
                  errors.errors[0] &&
                  errors.errors[0].inputType === "rating" && (
                    <p className="text-[#FF6600] font-semibold ">
                      {errors.errors[0].msg}
                    </p>
                  )}
              </div>
            </div>

            {formIsValid && (
              <button
                type="submit"
                className="w-full bg-[#223F7A] text-white p-2 rounded-md hover:bg-[#1d2a4e] transition-colors"
              >
                Submit Review
              </button>
            )}
            { <Link to="/">
          <button
            type="button"
            className="w-full bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600 mt-4 "
          >
            Cancel
          </button>
        </Link>}
          </Form>
        )}
       
      </div>
    </div>
  );
};

export default AddBookReviewPage;
