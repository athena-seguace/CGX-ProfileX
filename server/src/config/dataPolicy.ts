const dataPolicyRules = {
    default: {
        string: {
            minLength: 0,
            maxLength: 2027,
        }
    },
    security: {
        jwt: {
            expiresInSecs: 3600,
            regex: new RegExp("^[A-Za-z0-9-_.]+\\.([A-Za-z0-9-_.]+)\\.([A-Za-z0-9-_.]+)$"),
        },
        otp: {
            length: 6,
            regex: new RegExp("^[A-Za-z0-9]+$"),
            expiresInSecs: 600,
            blockResendForSecs: 60,
        },
        signUpRequest: {
            expiresInSecs: 300,
        }
    },
    user: {
        name: {
            minLength: 1,
            maxLength: 63,
            regex: new RegExp("^[a-zA-Z0-9\\s\\-']$")
        },
        email: {
            minLength: 5,
            maxLength: 100,
            regex: new RegExp("^[\\w.-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$"),
        },
        password: {
            minLength: 8,
            maxLength: 63,
            regex: new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[!@#$%^&*()])[A-Za-z\\d!@#$%^&*()]{8,}$"),
        },
        bio: {
            minLength: 1,
            maxLength: 2047,
        }
    }
}

export default dataPolicyRules;
