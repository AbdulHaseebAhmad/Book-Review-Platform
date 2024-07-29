import React, { useEffect, useState } from "react";
import { getallreviews } from "../../Redux/BookReview/reviewactions";
import { useDispatch, useSelector } from "react-redux";
import SearchBar from "../../Components/Filter/Filter";

const AllReviews = () => {
  const bookreviewstate = useSelector((state) => state.bookReview);
  const { loading, msg, data: reviews } = bookreviewstate;
  console.log(bookreviewstate);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getallreviews());
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="container mx-auto bg-white p-6 rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold mb-6 text-[#223F7A]">
          View All Reviews
        </h1>

        <SearchBar />

        <ul className="space-y-4">
          {!loading && reviews ? (
            reviews.map((review) => (
              <li
                key={review._id}
                className="bg-gray-50 p-4 rounded-lg shadow-md flex justify-between items-center"
              >
                <div>
                  <div>
                    <h2 className="text-xl font-semibold text-[#223F7A] mb-3">
                      {review.booktitle}
                    </h2>
                    <p className="text-gray-700 mb-1">
                      <strong>Genre:</strong>{" "}
                      {review.bookgenre ? review.bookgenre : "Unknown"}
                    </p>
                  </div>
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
                </div>
                <div className="flex-shrink-0 ml-4">
                  <img
                    src={review.coverimg}
                    alt={`${review.booktitle} cover`}
                    className="h-25 w-24 object-cover"
                  />
                </div>
              </li>
            ))
          ) : (
            <p>Loading Reviews</p>
          )}
        </ul>
      </div>
    </div>
  );
};

export default AllReviews;
