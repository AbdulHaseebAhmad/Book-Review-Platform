export const bookReviewValidationSchema = {
    booktitle:{
        notEmpty:{
            errorMessage:'The Book Title Field Can not be empty'
        }
    },
    bookauthor:{
        isString:{
            errorMessager:"The Author Name Must Be A String"
        }
    },
    bookgenre:{
        isString:{
            errorMessager:"The Books Genre Must Be A String"
        }
    },
    reviewText:{
        notEmpty:{
            errorMessage:"The Review Field Can Not Be Empty"
        }
    },
    rating:{
        notEmpty:{
            errorMessage:"The Rating Field Can Not Be Empty"
        }
    },
    coverimg:{
        isString:{
            errorMessage:"The Image Field Mustt Be A String"
        }
    },
    reviewbyuser:{
        notEmpty:{
            errorMessage:"The User Id Must be Attached With The Request"
        }
    }
}

