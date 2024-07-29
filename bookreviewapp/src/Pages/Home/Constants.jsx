import { ROUTE_DEFAULT as ADD_BOOK_REVIEW_ROUTE } from "../AddBookReview/Constants";
import { ROUTE_DEFAULT as VIEW_PREVIOUS_BOOK_REVIES } from "../PreviousReviews/Constants";
import {ROUTE_DEFAULT as ALL_REVIEWS_ROUTE} from "../AllReviews/Constants"

const VIEW_RECOMMENDED_BOOKS_ROUTES = "viewrecommendedbooks";
export const ROUTE_DEFAULT = 'home'

export const Cards = [
    {
      content: "Share your thoughts on the latest book you've read. Provide detailed reviews including title, author, and your personal rating.",
      cardname: "Add A New Book Review",
      link: ADD_BOOK_REVIEW_ROUTE,
      id: 1,
    },
    {
      content: "Explore your past reviews. Revisit your favorite books and see what you thought about them.",
      cardname: "View Previously Reviewed Books",
      link: VIEW_PREVIOUS_BOOK_REVIES,
      id: 2,
    },
    {
      content: "Discover books recommended just for you. Browse through a curated list based on your reading preferences.",
      cardname: "View Recommended Books",
      link: VIEW_RECOMMENDED_BOOKS_ROUTES,
      id: 3,
    },
    {
      content: "Check out all book reviews in our collection. Get insights and ratings from fellow readers.",
      cardname: "View All Book Reviews",
      link: ALL_REVIEWS_ROUTE,
      id: 4,
    },
  ];
  
