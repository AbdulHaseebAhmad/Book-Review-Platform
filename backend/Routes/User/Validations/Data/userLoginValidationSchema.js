export const userLoginValidationSchema = {
   
      email: {
        notEmpty: {
          errorMessage: 'Email is required',
        },
        isEmail: {
          errorMessage: 'Please enter a valid email address',
        },
        normalizeEmail: true, 
        custom: {
          options: (value) => {
            return /^[\w.-]+@[a-zA-Z\d.-]+\.[a-zA-Z]{2,6}$/.test(value);
          },
          errorMessage: 'Please enter a valid email address',
        },
      },
      password: {
        notEmpty: {
          errorMessage: 'Password is required',
        },
        isLength: {
          options: { min: 7 },
          errorMessage: 'Password must be at least 7 characters long',
        },
        isAlphanumeric: {
          errorMessage: 'Password must be alphanumeric',
        },
      },
}

