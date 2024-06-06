export const signUpEmailValidation = {
    
    required: 'Email is required',
    pattern: {
        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
        message: 'Please enter a valid email address'
    },
    minLength: {
        value: 3,
        message: 'Email must be at least 3 characters'
    },
    maxLength: {
        value: 25,
        message: 'Email must be at most 25 characters'
    }
}
