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
import { ROUTE_DEFAULT as COMING_SOON_PAGE_ROUTE } from "./Pages/Coming Soon/Constants";
import ComingSoon from "./Pages/Coming Soon/ComingSoon";
import SignupPage, { signupAuthAction } from "./Pages/Signup/Signup";
import AllReviews from "./Pages/AllReviews/AllReviews";
import { ROUTE_DEFAULT as USER_PROFILE_ROUTE} from "./Pages/User Profile/Constants";
import UserProfile from "./Pages/User Profile/UserProfile";
function App() {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
  const router = createBrowserRouter([
    {
      path: "/",
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
          path: "home",
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
                      path: "previousreviews",
                      element: <PreviousReviewsPage />,
                    },
                    {
                      path: "viewallreviews",
                      element: <AllReviews />,
                    },
                    { path: COMING_SOON_PAGE_ROUTE, element: <ComingSoon /> },
                    {
                      path:USER_PROFILE_ROUTE,
                      element:<UserProfile/>
                    }
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
