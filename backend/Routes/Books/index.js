import { Router, response } from "express";
import {
  query,
  matchedData,
  checkSchema,
  validationResult,
  body,
} from "express-validator";
import { Review } from "./Validations/Mongo/bookReviewModal.js";
import { bookReviewValidationSchema } from "./Validations/Data/bookReviewValidationSchema.js";

const bookReviewRoute = Router();

bookReviewRoute.get("/api/reviews/getallreviews", async (request, response) => {
  const { filter, filterValue } = request.query;

  try {
    let reviews;
    if (!filter && !filterValue) {
      reviews = await Review.find();
      response.status(200).send(reviews);
    } else {
      const query = { [filter]: filterValue };
      reviews = await Review.find(query);
      if (reviews.length === 0) {
        return response
          .status(404)
          .json({ message: "No reviews found matching the filter criteria" });
      }
      response.status(200).send(reviews);
    }
  } catch (err) {
    response
      .status(500)
      .json({ message: "An error occurred", error: err.message });
  }
});

bookReviewRoute.get(
  "/api/reviews/previousreviews",
  (request, response, next) => {
    if (request.isAuthenticated()) {
      next();
    } else {
      response.status(403).send({ msg: "The user is not Logged In" });
    }
  },
  async (request, response) => {
    const {
      query: { userid },
    } = request;
    const getProducts = await Review.find({
      reviewbyuser: userid,
    });
    response.status(200).send(getProducts);
  }
);
bookReviewRoute.post(
  "/api/reviews/addreview",
  (request, response, next) => {
    if (request.isAuthenticated()) {
      return next();
    } else {
      response.status(403).send({ msg: "The user is not Logged In" });
    }
  },
  checkSchema(bookReviewValidationSchema),
  async (request, response) => {
    const errors = validationResult(request);
    const validData = matchedData(request);
    const errorsArray = errors.errors.map((err) => {
      console.log(err);
    });

    if (errors.errors.length === 0) {
      const createReview = await Review.create(validData);
      response.status(200).send(createReview);
    }

    console.log(JSON.stringify(validData));
  }
);

bookReviewRoute.put(
  "/api/reviews/editreview",
  (request, response, next) => {
    if (request.isAuthenticated()) {
      next();
    } else {
      response.status(403).send({ msg: "The user is not Logged In" });
    }
  },
  checkSchema(bookReviewValidationSchema),
  async (request, response) => {
    const errors = validationResult(request);
    const validData = matchedData(request);
    const errorsArray = errors.errors.map((err) => {
      console.log(err);
    });

    if (errors.errors.length === 0) {
      const reviewid = request.query.reviewid;
      const createReview = await Review.findByIdAndUpdate(reviewid, validData, {
        new: true,
      });
      response.status(200).send(createReview);
    }
  }
);
bookReviewRoute.delete(
  "/api/reviews/deletereview",
  (request, response, next) => {
    if (request.isAuthenticated()) {
      next();
    } else {
      response.status(403).send({ msg: "The user is not Logged In" });
    }
  },
  async (request, response) => {
    const {
      query: { reviewid },
    } = request;
    if (reviewid.length === 24) {
      const deleteReview = await Review.findByIdAndDelete(reviewid);
      console.log(reviewid);
      response.status(200).send(reviewid);
    }
  }
);

export default bookReviewRoute;
