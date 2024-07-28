import React, { useState } from "react";
import {
  FORM_FIELDS,
  AddReviewSchema,
  EDIT_RIVIEW_REQUEST_SUCCESS,
  EDIT_REVIEW_REQUEST,
} from "./Constants";
import { Form, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { editReview, getpreviousReviews } from "../../Redux/BookReview/reviewactions";

const EditBookReview = ({ review, closeEditModal }) => {
  const [formValues, setFormValue] = useState(review);
  const [errors, setErrors] = useState({});
  const [formIsValid, setFormIsValid] = useState(false);
  const dispatch = useDispatch();
  const bookReviewState = useSelector((state) => state.bookReview);
  const { loading, msg, data: reviews } = bookReviewState;
  console.log(msg);
  const params = useParams()
  const {userid} = params;
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
    e.preventDefault();
    if (formIsValid) {
      dispatch(editReview(formValues));
     // closeEditModal();
    } else {
      console.log("formIsNotValidated");
    }
  };

  const cancelEditHandle = () => {
    dispatch(getpreviousReviews(userid));
    closeEditModal();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-11/12 max-w-md">
        <h2 className="text-xl font-bold mb-4 text-[#223F7A]">Edit Review</h2>

        {!loading && msg && msg === EDIT_RIVIEW_REQUEST_SUCCESS ? (
          <div className="bg-white p-6 rounded-lg  w-11/12 max-w-md">
            <p className="text-xl font-medium mb-4 text-[#223F7A]">Review Edit Successfull</p>
            <div className="flex justify-end space-x-2">
              <button
                onClick={cancelEditHandle}
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
                    value={review && review && formValues[name]}
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
                value={review && review && formValues.reviewText}
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
                Rating {formValues.rating}/5
              </label>
              <div className="flex space-x-2 items-center">
                {[1, 2, 3, 4, 5].map((star) => (
                  <label key={star} className="flex items-center space-x-1">
                    <input
                      style={{
                        border:
                          errors.errors &&
                          errors.errors[0] &&
                          errors.errors[0].inputType === "reviewtext" &&
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
            <button
              onClick={cancelEditHandle}
              type="button"
              className="w-full bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600 "
            >
              Cancel
            </button>
          </Form>
        )}
      </div>
    </div>
  );
};

export default EditBookReview;
