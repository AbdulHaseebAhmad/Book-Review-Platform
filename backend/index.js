import express from "express";
import { configDotenv } from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import bookReviewRoute from "./Routes/Books/index.js";
import userRoute from "./Routes/User/index.js";
import cookieParser from "cookie-parser";
import session from "express-session";
import passport from "passport";
configDotenv();

const app = express();
const PORT = process.env.PORT;
const CookieSecret = process.env.COOKIE_SECRET_KEY;

app.use(express.json());
app.use(cookieParser(CookieSecret));

app.use(
  session({
    secret: CookieSecret,
    saveUninitialized: false,
    resave: false,

    cookie: {
      maxAge: 60000 * 60 * 24,
      httpOnly: true,
      secure: false,
      sameSite: "lax",
    },
  })
);

app.use(passport.initialize());
app.use(passport.session());

mongoose
  .connect("mongodb://localhost:27017/BookReviewApplication")
  .then(() => console.log("Connected to database"))
  .catch((err) => console.error("Database connection error:", err));

app.use(
  cors({
    origin: ["http://localhost:5173"], 
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

app.use(userRoute);
app.use(bookReviewRoute);

app.listen(PORT, () => {
  console.log("App is Running On Port " + PORT);
});

app.get("/test", (request, response) => {
//  request.session.visitred = true;
  console.log(request.signedCookies);
  console.log(request.session.id);
  response.sendStatus(200);
});
