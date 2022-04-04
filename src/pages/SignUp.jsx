import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button, Input, InputAlert } from "../components";
import { useAuth } from "../contexts";
import { signUp, validateSignUpInputs } from "../utils/api";
import { toast } from "react-toastify";
import { TOAST_ERRORS, TOAST_SUCCESS } from "../utils/constants";
import { Loader } from "../components/Loader";

export const SignUp = () => {
  const navigate = useNavigate();
  const { setAuth } = useAuth();

  const [loading, setLoading] = useState(false);
  const [signUpInputs, setSignUpInputs] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [signUpErrors, setSignUpErrors] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { isValid, errors } = validateSignUpInputs(
      signUpInputs,
      signUpErrors
    );
    if (!isValid) {
      setSignUpErrors(errors);
      return;
    }
    signUpRequest();
  };

  const signUpRequest = async () => {
    setLoading(true);
    try {
      const { status, data } = await signUp(
        signUpInputs.firstName,
        signUpInputs.lastName,
        signUpInputs.email,
        signUpInputs.password
      );
      if (status !== 201) return;
      setAuth({
        userId: data.createdUser._id,
        isLoggedIn: true,
        encodedToken: data.encodedToken,
      });
      toast.success(TOAST_SUCCESS.SIGNUP);
      navigate("/");
    } catch (error) {
      toast.error(TOAST_ERRORS.SIGNUP);
    } finally {
      setTimeout(() => setLoading(false), 800);
    }
  };

  const handleInputChange = (e) => {
    setSignUpInputs((inputs) => ({
      ...inputs,
      [e.target.id]: e.target.value,
    }));
    setSignUpErrors((errors) => ({
      ...errors,
      [e.target.id]: "",
    }));
  };

  return (
    <div className="full-page fr-ct-ct p-xl">
      <form
        onSubmit={handleSubmit}
        className="auth-form shadow-medium fc-ct-ct p-xl br-sm"
      >
        <h3 className="font-medium txt-xl">SignUp</h3>
        <div className="px-xl py-sm full-width fc-fs-fs">
          <Input
            type="text"
            id="firstName"
            placeholder={"Enter First Name"}
            value={signUpInputs.firstName}
            onChange={handleInputChange}
          />
          {signUpErrors.firstName && (
            <InputAlert message={signUpErrors.firstName} className="mt-sm" />
          )}
        </div>
        <div className="px-xl py-sm full-width fc-fs-fs">
          <Input
            type="text"
            id="lastName"
            placeholder={"Enter Last Name"}
            value={signUpInputs.lastName}
            onChange={handleInputChange}
          />
          {signUpErrors.lastName && (
            <InputAlert message={signUpErrors.lastName} className="mt-sm" />
          )}
        </div>
        <div className="px-xl py-sm full-width fc-fs-fs">
          <Input
            type="text"
            id="email"
            placeholder={"Enter Email Address"}
            value={signUpInputs.email}
            onChange={handleInputChange}
          />
          {signUpErrors.email && (
            <InputAlert message={signUpErrors.email} className="mt-sm" />
          )}
        </div>
        <div className="px-xl py-sm full-width fc-fs-fs">
          <Input
            type="password"
            id="password"
            autoComplete="new-password"
            placeholder={"Enter Password"}
            value={signUpInputs.password}
            onChange={handleInputChange}
          />
          {signUpErrors.password && (
            <InputAlert message={signUpErrors.password} className="mt-sm" />
          )}
        </div>
        <div className="px-xl py-sm full-width fc-fs-fs">
          <Input
            type="password"
            id="confirmPassword"
            autoComplete="new-password"
            placeholder={"Confirm Password"}
            value={signUpInputs.confirmPassword}
            onChange={handleInputChange}
          />
          {signUpErrors.confirmPassword && (
            <InputAlert
              message={signUpErrors.confirmPassword}
              className="mt-sm"
            />
          )}
        </div>
        <div className="fc-fs-ct full-width px-xl py-lg">
          <Button
            variant={"contained"}
            color="primary"
            className="full-width mb-md"
          >
            SignUp
          </Button>
          <Link
            to="/login"
            className="txt-underline hover-light py-sm px-lg br-sm"
          >
            Already have an Account
          </Link>
        </div>
      </form>
      {loading && <Loader />}
    </div>
  );
};
