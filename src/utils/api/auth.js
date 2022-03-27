import axios from "axios";
import {
  EMAIL_REGEX,
  PASSWORD_LOWERCASE_REGEX,
  PASSWORD_NUMBER_REGEX,
  PASSWORD_SPECIAL_CHAR_REGEX,
  PASSWORD_UPPERCASE_REGEX,
} from "../regexp";

export const login = async (email, password) => {
  return await axios.post("/api/auth/login", {
    email,
    password,
  });
};

export const signUp = async (firstName, lastName, email, password) => {
  return await axios.post("/api/auth/signup", {
    firstName,
    lastName,
    email,
    password,
  });
};

export const validateLoginInputs = ({ email, password }, initialErrors) => {
  if (!email)
    return {
      isValid: false,
      errors: {
        ...initialErrors,
        email: "Email is Required!",
      },
    };
  if (!password)
    return {
      isValid: false,
      errors: {
        ...initialErrors,
        password: "Password is Required!",
      },
    };
  return {
    isValid: true,
    errors: {
      email: "",
      password: "",
    },
  };
};

export const validateSignUpInputs = (
  { firstName, lastName, email, password, confirmPassword },
  initialErrors
) => {
  if (!firstName)
    return {
      isValid: false,
      errors: {
        ...initialErrors,
        firstName: "First Name is Required!",
      },
    };
  if (!lastName)
    return {
      isValid: false,
      errors: {
        ...initialErrors,
        lastName: "Last Name is required!",
      },
    };
  if (!email)
    return {
      isValid: false,
      errors: {
        ...initialErrors,
        email: "Email is Required!",
      },
    };

  if (!EMAIL_REGEX.test(email))
    return {
      isValid: false,
      errors: {
        ...initialErrors,
        email: "Enter a valid Email Address!",
      },
    };
  if (!password)
    return {
      isValid: false,
      errors: {
        ...initialErrors,
        password: "Password is Required!",
      },
    };
  if (!PASSWORD_UPPERCASE_REGEX.test(password))
    return {
      isValid: false,
      errors: {
        ...initialErrors,
        password: "Enter atleast one Uppercase Letter!",
      },
    };
  if (!PASSWORD_LOWERCASE_REGEX.test(password))
    return {
      isValid: false,
      errors: {
        ...initialErrors,
        password: "Enter atleast one Uppercase Letter!",
      },
    };
  if (!PASSWORD_NUMBER_REGEX.test(password))
    return {
      isValid: false,
      errors: {
        ...initialErrors,
        password: "Enter atleast one Number!",
      },
    };
  if (!PASSWORD_SPECIAL_CHAR_REGEX.test(password))
    return {
      isValid: false,
      errors: {
        ...initialErrors,
        password: "Enter atleast one Special Character!",
      },
    };
  if (password.length < 8)
    return {
      isValid: false,
      errors: {
        ...initialErrors,
        password: "Enter atleast 8 Characters!",
      },
    };
  if (confirmPassword !== password)
    return {
      isValid: false,
      errors: {
        ...initialErrors,
        confirmPassword: "Passwords do not match!",
      },
    };
  return {
    isValid: true,
    errors: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
      terms: "",
    },
  };
};
