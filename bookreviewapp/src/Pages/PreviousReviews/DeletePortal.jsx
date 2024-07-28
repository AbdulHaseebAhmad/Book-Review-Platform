import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteReview } from "../../Redux/BookReview/reviewactions";
import { DELETE_PREVIOUS_REVIEW_REQUEST_SUCCESS } from "./Constants";
export default function DeletePortal({ review, closeDeleteModal }) {
  const { _id } = review;
  const dispatch = useDispatch();
  const bookReviewState = useSelector((state) => state.bookReview);
  const { loading, msg, data: reviews } = bookReviewState;
  console.log(msg);

  const cancelDeleteHandle = () => {
    closeDeleteModal();
  };

  const deleteReviewHandle = () => {
    dispatch(deleteReview(_id));
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      {!loading && msg && msg === DELETE_PREVIOUS_REVIEW_REQUEST_SUCCESS ? (
        <div className="bg-white p-6 rounded-lg shadow-lg w-11/12 max-w-md">
          <p className="text-xl font-medium mb-4 text-[#223F7A]">Review Deletion Successfull</p>
          <div className="flex justify-end space-x-2">
            <button
              onClick={cancelDeleteHandle}
              className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600"
            >
              Okay
            </button>
          </div>
        </div>
      ) : (
        <div className="bg-white p-6 rounded-lg shadow-lg w-11/12 max-w-md">
          <h2 className="text-xl font-bold mb-4 text-red-500">Delete Review</h2>
          <p className="mb-4">Are you sure you want to delete this review?</p>
          <div className="flex justify-end space-x-2">
            <button
              onClick={deleteReviewHandle}
              className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition-colors"
            >
              Delete
            </button>
            <button
              onClick={cancelDeleteHandle}
              className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
