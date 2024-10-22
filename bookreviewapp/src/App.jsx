import React, { useEffect } from "react";
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Outlet,
} from "react-router-dom";

// Import your components
import LoginPage, { loginAuthAction, AuthLoader } from "./Pages/Login/Login";
import WelcomeElement, {
  welcomeAuthLoader,
} from "./Pages/WelcomeElement/WelcomeElement";
import RootElement from "./Pages/RootElement/RootElement";
import HomePage, { homeAuthloaders } from "./Pages/Home/Home";
import AddBookReviewPage from "./Pages/AddBookReview/AddBookReview";
import PreviousReviewsPage from "./Pages/PreviousReviews/PreviousReviews";
import { ROUTE_DEFAULT as ADD_BOOK_REVIEW_ROUTE } from "./Pages/AddBookReview/Constants";
import { ROUTE_DEFAULT as LOGIN_PAGE_ROUTE } from "./Pages/Login/Constants";
import { ROUTE_DEFAULT as SIGN_UP_PAGE_ROUTE } from "./Pages/Signup/Constants";
import { ROUTE_DEFAULT as VIEW_RECOMMENDED_BOOKS_ROUTE } from "./Pages/Recommended Books/Constants";
import { ROUTE_DEFAULT as PREVIOUS_REVIEWS_ROUTE } from "./Pages/PreviousReviews/Constants";
import { ROUTE_DEFAULT as ALL_REVIEWS_ROUTE } from "./Pages/AllReviews/Constants";
import { ROUTE_DEFAULT as HOME_ROUTE } from "./Pages/Home/Constants";
import ViewRecommendedReviews from "./Pages/Recommended Books/ViewRecommendedReviews";
import SignupPage, { signupAuthAction } from "./Pages/Signup/Signup";
import AllReviews from "./Pages/AllReviews/AllReviews";
import { ROUTE_DEFAULT as USER_PROFILE_ROUTE } from "./Pages/User Profile/Constants";
import UserProfile from "./Pages/User Profile/UserProfile";
import ErrorBoundary from "./Pages/Error/Error";

function App() {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
  const router = createBrowserRouter([
    {
      path: "/",
      errorElement: <ErrorBoundary />,
      children: [
        {
          index: true,
          loader: welcomeAuthLoader,
          element: <WelcomeElement />,
        },
        {
          path: SIGN_UP_PAGE_ROUTE,
          loader: AuthLoader,
          action: signupAuthAction,
          element: <SignupPage />,
        },
        {
          path: LOGIN_PAGE_ROUTE,
          element: <LoginPage />,
          loader: AuthLoader,
          action: loginAuthAction,
        },
        {
          path: HOME_ROUTE,
          loader: homeAuthloaders,
          element: <RootElement />,
          children: [
            {
              path: "users",
              children: [
                {
                  path: ":userid",
                  children: [
                    {
                      index: true,
                      element: <HomePage />,
                    },
                    {
                      path: ADD_BOOK_REVIEW_ROUTE,
                      element: <AddBookReviewPage />,
                    },
                    {
                      path: PREVIOUS_REVIEWS_ROUTE,
                      element: <PreviousReviewsPage />,
                    },
                    {
                      path: ALL_REVIEWS_ROUTE,
                      element: <AllReviews />,
                    },
                    {
                      path: VIEW_RECOMMENDED_BOOKS_ROUTE,
                      element: <ViewRecommendedReviews />,
                    },
                    {
                      path: USER_PROFILE_ROUTE,
                      element: <UserProfile />,
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
