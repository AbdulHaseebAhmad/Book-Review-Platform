 import { bookReviewReducer } from '../../Redux/BookReview/reviewreducers';
import { combineReducers } from '@reduxjs/toolkit';
import { userProfileReducer } from '../User Profile/useprofilereducer';
const rootReducer = combineReducers({
  bookReview: bookReviewReducer,
  userProfile : userProfileReducer
});

export default rootReducer;


