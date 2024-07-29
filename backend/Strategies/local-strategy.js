import passport from "passport";
import { Strategy } from "passport-local";
import { User } from "../Routes/User/Validations/Mongo/userReviewModal.js";
import { comparepasswords } from "../Utils/helpers.js";


passport.serializeUser((user,done)=>{
    done(null,user._id)

})


passport.deserializeUser(async (_id, done)=>{
    console.log(`inside deserializing user`);
       // console.log(`${_id}`) 
    try{
        const findUser = await User.findOne({_id});
        if(!findUser){ done(null,null); throw new Error({msg:"User Not Found"});}
        else{done(null, findUser)}
    }
    catch (err){
        done(err,null)
    }
})



export default passport.use(
  new Strategy(
    {
      usernameField: "email",
    },
    async (email, password, done) => {
      try {
        const findUser = await User.findOne({ email });
        if (!findUser) {
          return done(null, false, { message: "The Email Address is Not Registered" });
        } //findUser.password !== password
        if (!comparepasswords(password, findUser.password)) {
          return done(null, false, { message: "Bad Credentials" });
        }
        return done(null, findUser);
      } catch (err) {
        return done(err);
      }
    }
  )
);
