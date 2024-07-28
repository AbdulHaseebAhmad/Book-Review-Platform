import React, { useEffect, useState } from "react";
import DeletePortal from "./DeletePortal";
import { getpreviousReviews } from "../../Redux/BookReview/reviewactions";
import { useDispatch, useSelector } from "react-redux";
import EditBookReview from "./EditPortal";
import {
  DELETE_PREVIOUS_REVIEW_REQUEST_SUCCESS,
  GET_PREVIOUS_REVIEW_REQUEST_SUCCESS,
  EDIT_RIVIEW_REQUEST_SUCCESS,
} from "./Constants";
import { useParams } from "react-router-dom";
const PreviousReviewsPage = () => {
  const bookReviewState = useSelector((state) => state.bookReview);
  const { loading, msg, data: reviews } = bookReviewState;
  const dispatch = useDispatch();
  const params = useParams();
  const { userid } = params;
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    dispatch(getpreviousReviews(userid));
  }, []);

  const [editingReview, setEditingReview] = useState(null);
  const [deletingReview, setDeletingReview] = useState(null);

  const openEditModal = (review) => setEditingReview(review);
  const closeEditModal = () => setEditingReview(null);

  const openDeleteModal = (review) => setDeletingReview(review);
  const closeDeleteModal = () => setDeletingReview(null);

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="container mx-auto bg-white p-6 rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold mb-6 text-[#223F7A]">
          Your Book Reviews
        </h1>

        {reviews && reviews.length === 0 ? (
          <p>No Previous Reviews Availabe</p>
        ) : (
          <ul className="space-y-4">
            {!loading && reviews ? (
              reviews.map((review) => (
                <li
                  key={review._id}
                  className="bg-gray-50 p-4 rounded-lg shadow-md flex flex-col md:flex-row justify-between items-start md:items-center"
                >
                  <div className="flex-1">
                    <h2 className="text-xl font-semibold text-[#223F7A] mb-3">
                      {review.booktitle}
                    </h2>
                    <p className="text-gray-700 mb-1">
                      <strong>Author:</strong> {review.bookauthor}
                    </p>
                    <p className="text-gray-700 mb-1">
                      <strong>Review:</strong> {review.reviewText}
                    </p>
                    <p className="text-gray-700 mb-1">
                      <strong>Rating:</strong> {"★".repeat(review.rating)}
                      {"☆".repeat(5 - review.rating)}
                    </p>
                    <div className="mt-4 flex space-x-2">
                      <button
                        onClick={() => openEditModal(review)}
                        className="bg-[#223F7A] text-white px-4 py-2 rounded-md hover:bg-[#1d2a4e] transition-colors"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => openDeleteModal(review)}
                        className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition-colors"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                  <div className="flex-shrink-0 mt-4 md:mt-0 md:ml-4">
                    <img
                      src={review.coverimg}
                      alt={`${review.booktitle} cover`}
                      className="h-32 w-24 object-cover"
                    />
                  </div>
                </li>
              ))
            ) : (
              <p>Loading Reviews</p>
            )}
          </ul>
        )}

        {editingReview && (
          <EditBookReview
            review={editingReview}
            closeEditModal={closeEditModal}
          />
        )}
        {deletingReview && (
          <DeletePortal
            review={deletingReview}
            closeDeleteModal={closeDeleteModal}
          />
        )}
      </div>
    </div>
  );
};

export default PreviousReviewsPage;
