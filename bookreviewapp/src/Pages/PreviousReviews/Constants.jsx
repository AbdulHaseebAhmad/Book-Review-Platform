import * as Yup from "yup";


export const EDIT_REVIEW_REQUEST = "Submitting Editing Request";
export const EDIT_RIVIEW_REQUEST_SUCCESS = "Review Editing Request Successfull.";
export const EDIT_REVIEW_REQUEST_FAIL = "Review Editing Request Failed.";

export const GET_PREVIOUS_REVIEW_REQUEST = "Submitting Fetch Request";
export const GET_PREVIOUS_REVIEW_REQUEST_SUCCESS = "Previous Reviews Fetched Successfully";
export const GET_PREVIOUS_REVIEW_REQUEST_FAIL = "Previous Reviews Fetch Failed";

export const DELETE_PREVIOUS_REVIEW_REQUEST = "Submitting Delete Request";
export const DELETE_PREVIOUS_REVIEW_REQUEST_SUCCESS = "Previous Reviews Delete Successfully";
export const DELETE_PREVIOUS_REVIEW_REQUEST_FAIL = "Previous Reviews Deletion Failed";



export const ROUTE_DEFAULT = "previousreviews";

export const AddReviewSchema = Yup.object().shape({
  rating: Yup.string().required({
    inputType: "rating",
    msg: "Rating  is Required",
  }),
  reviewText: Yup.string().required({
    inputType: "reviewText",
    msg: "Review text is Required",
  }),
  coverimg: Yup.string().required({
    inputType:'coverimg',
    msg:"Image URL is Required"
  }),
  bookauthor: Yup.string().required({
    inputType: "bookauthor",
    msg: "Author name is Required",
  }),
  booktitle: Yup.string().required({
    inputType: "booktitle",
    msg: "Book title is Required",
  }),
});
export const FORM_FIELDS = [
  {
    name: "booktitle",
    label: "Book Title",
    type: "text",
    placeholder: "Enter Book Title",
    id: "booktitle",
  },

  {
    name: "bookauthor",
    label: "Book Author",
    type: "text",
    placeholder: "Enter Author's name",
    id: "bookauthor",
  },
  {
    name:'coverimg',
    label:'Image URL',
    type:'url',
    placeholder:'Enter Image URL',
    id:'coverimg'
  }
];
