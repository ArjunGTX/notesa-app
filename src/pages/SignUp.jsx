import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Button, Input, InputAlert } from "../components";

export const SignUp = () => {
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
      <form className="auth-form shadow-medium fc-ct-ct p-xl br-sm">
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
            to={"/login"}
            className="txt-underline hover-light py-sm px-lg br-sm"
          >
            Already have an Account
          </Link>
        </div>
      </form>
    </div>
  );
};
