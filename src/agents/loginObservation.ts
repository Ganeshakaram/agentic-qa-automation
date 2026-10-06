export const loginObservation = {
    feature: 'Login',

    page: {
        url: '/login',
        title: 'Login'
    },

    fields: [
        {
            name: 'Email Address',
            type: 'email',
            required: true
        },
        {
            name: 'Password',
            type: 'password',
            required: true
        }
    ],

    actions: [
        {
            name: 'Login',
            type: 'submit'
        }
    ],

    observedBehaviors: [
        {
            scenario: 'Empty required fields',
            result: 'Browser-native required-field validation prevents submission.',
            message: 'Please fill out this field.'
        },
        {
            scenario: 'Malformed email',
            input: 'not-an-email',
            result: 'Browser-native email validation prevents submission.',
            message: "Please include an '@' in the email address. 'not-an-email' is missing an '@'."
        },
        {
            scenario: 'Invalid credentials',
            result: 'Login remains on /login and the site displays an authentication error.',
            message: 'Your email or password is incorrect!'
        }
    ],

    unobservedBehaviors: [
        'Successful login',
        'Account lockout',
        'Password recovery'
    ]
};