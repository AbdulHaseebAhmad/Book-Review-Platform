import * as Yup from "yup";

export const ROUTE_DEFAULT = "addbookreview";

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
  bookgenre: Yup.string().required({
    inputType: "bookgenre",
    msg: "Book Genre is Required",
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
    name: "bookgenre",
    label: "Book Genre",
    type: "text",
    placeholder: "Enter Books Genre",
    id: "bookgenre",
  },

  {
    name:'coverimg',
    label:'Image URL',
    type:'url',
    placeholder:'Enter Image URL',
    id:'coverimg'
  }
];

export const ADD_REVIEW_REQUEST = "Submiting Adding Review Request.";
export const ADD_RIVIEW_REQUEST_SUCCESS = "Review Addition Request Successfull.";
export const ADD_REVIEW_REQUEST_FAIL = "Review  Addition Request Failed.";
