import React, { useState, useEffect } from "react";
import { Link, useLocation, useRouteError } from "react-router-dom";
import { ROUTE_DEFAULT as HOME_ROUTE } from "../Home/Constants";
const ErrorBoundary = () => {
  const error = useRouteError();
  const [hasError, setHasError] = useState(false);
  useEffect(() => {
    if (error) {
      setHasError(true);
      console.error("Uncaught error:", error);
    }
  }, [error]);

  const location = useLocation();
  const { pathname } = location;
  if (hasError) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-[#fef2f2]">
        <h1 className="text-4xl font-bold text-[#b91c1c]">
          Something went wrong.
        </h1>
        <p className="mt-4 text-2lg text-[#9f1239]">{error.message}</p>
        {pathname !== `/${HOME_ROUTE}` ? (
          <Link
            to={`${HOME_ROUTE}`}
            className="mt-6 px-4 py-2 bg-[#223F7A] text-white rounded"
          >
            Go to Home
          </Link>
        ) : (
          <p className="mt-4 text-xl font-bold text-[#9f1239]">
            Try Again Later
          </p>
        )}
      </div>
    );
  }

  return null;
};

export default ErrorBoundary;
