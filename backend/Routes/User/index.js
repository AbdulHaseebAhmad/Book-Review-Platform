import { Router, response } from "express";
import {
  query,
  matchedData,
  checkSchema,
  validationResult,
  body,
} from "express-validator";
import { User } from "./Validations/Mongo/userReviewModal.js";
import { userLoginValidationSchema } from "./Validations/Data/userLoginValidationSchema.js";
import "../../Strategies/local-strategy.js";
import passport from "passport";
import { userSignupValidationSchema } from "./Validations/Data/userSignupValidationSchema.js";
import { hashpasswords } from "../../Utils/helpers.js";

const userRoute = Router();

userRoute.post(
  "/api/users/auth/signup",
  (request, response, next) => {
    if (request.isAuthenticated()) {
      response.status(403).send({
        msg: "There is already a User  Signed In ",
        userid: request.user._id,
      });
    } else {
      next();
    }
  },
  checkSchema(userSignupValidationSchema),
  (request, response, next) => {
    console.log(request.body);
    console.log(request.session.id);
    const errors = validationResult(request);
    const validData = matchedData(request);
    const errorsArray = errors.errors.map((err) => {
      return { inputType: err.path, errormsg: err.msg };
    });
    if (errors.errors.length === 0) {
      request.validData = validData;
      next();
    } else {
      response.send({msg:errorsArray});
    }
  },
  async (request, response) => {
    console.log(request.body);
    console.log(request.session.id);
    const user = request.validData;
    console.log(`This is users ${user}`);
    user.password = hashpasswords(user.password)
    console.log(`This is users ${user.password} with hashed password`);

    const newUser = new User(user);
    try {
      const savedUser = await newUser.save();
      response.status(201).send({ msg: "User Created Succefully" });
    } catch (err) {
      if (err.errorResponse) {
        if (err.code === 11000) {
          response.status(409).send({ msg: "The email entered Already Exist" });
        } else {
          response.status(400).send({ msg: "Unexpected Error" });
        }
      }
    }
  }
);

userRoute.post(
  "/api/users/auth/login",
  (request, response, next) => {
    if (request.isAuthenticated()) {
      response
        .status(403)
        .send({ msg: "User Already Logged In", userid: request.user._id });
    } else {
      next();
    }
  },
  checkSchema(userLoginValidationSchema),
  (request, response, next) => {
    console.log(request.body);
    console.log(request.session.id);
    const errors = validationResult(request);
    const validData = matchedData(request);
    const errorsArray = errors.errors.map((err) => {
      return { inputType: err.path, errormsg: err.msg };
    });
    console.log(errorsArray)
    if (errorsArray.length === 0) {
      request.validData = validData;
      next();
    } else {
      response.status(400).send({msg:errorsArray[0].errormsg});
    }
  },
  (request, response, next) => {
    passport.authenticate("local", (err, user, info) => {
      if (err) {
        return next(err);
      }
      if (!user) {
        return response.status(400).send({ msg: info.message });
      }
      request.logIn(user, (err) => {
        if (err) {
          return response.status(400).send({ msg: info.message });
        }
        return response.status(200).send({
          msg: "User Logged In successfully",
          userid: request.user._id,
        });
      });
    })(request, response, next);
  }
);
userRoute.get("/api/users/auth/logout", (request, response, next) => {
  request.logout((err) => {
    if (err) {
      return next(err);
    }
    request.session.destroy((err) => {
      if (err) {
        return response.status(500).send("Could not log out.");
      }
      response.clearCookie("connect.sid");
      return response.status(200).send("Logged out successfully.");
    });
  });
});

userRoute.get("/api/users/auth/status", (request, response) => {
  if (request.isAuthenticated()) {
    response.status(200).send({
      msg: `Users with Username ${request.username} is Logged in`,
      userid: request.user._id,
      user: request.user,
    });
    console.log(request.session.id);
  } else {
    response.status(403).send("User is Not Logged In");
  }
});

userRoute.put(
  "/api/users/edituser",
  (request, response, next) => {
    if (request.isAuthenticated()) {
      next();
    } else {
      response
        .status(403)
        .send({ msg: "The User is Not Authorized to make changes to Profile" });
    }
  },
  checkSchema(userSignupValidationSchema),
  (request, response, next) => {
    console.log(request.body);
    console.log(request.session.id);
    const errors = validationResult(request);
    const validData = matchedData(request);
    const errorsArray = errors.errors.map((err) => {
      return { inputType: err.path, errormsg: err.msg };
    });
    if (errors.errors.length === 0) {
      const { userid } = request.query.userid;
      request.validData = validData;
      request.userid = userid;
      next();
    } else {
      response.status(400).send(errorsArray);
    }
  },
  async (request, response) => {
    const _id = request.query.userid
    const updatedData = request.validData
    console.log(_id,updatedData)
    updatedData.password = hashpasswords(updatedData.password)
    try {
      const updateDetails = await User.findByIdAndUpdate(_id,updatedData);
      response.status(200).send({msg:'The User Daata has been Updated'})
    } catch (err) {
      response.status(400).send({msg:"There Was An Un Expected Error"})
    }
  }
);

export default userRoute;
