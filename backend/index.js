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
const mongoURI = process.env.MONGO_URI
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
  .connect(mongoURI)
  .then(() => console.log("Connected to database"))
  .catch((err) => console.error("Database connection error:", err));

app.use(
  cors({
    origin: ["http://localhost:5173","https://book-review-platform-mu.vercel.app/"], 
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

app.options('*', (req, res) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:5173'); // Replace with your frontend domain
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With');
  res.header('Access-Control-Allow-Credentials', 'true');
  res.sendStatus(204); // No content
});


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
