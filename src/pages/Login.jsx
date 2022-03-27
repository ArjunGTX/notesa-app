import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Button, Input, InputAlert } from "../components";

export const Login = () => {
  const [loginInputs, setLoginInputs] = useState({
    email: "",
    password: "",
  });
  const [loginErrors, setLoginErrors] = useState({
    email: "",
    password: "",
  });

  const handleInputChange = (e) => {
    setLoginInputs((inputs) => ({
      ...inputs,
      [e.target.id]: e.target.value,
    }));
    setLoginErrors((errors) => ({
      ...errors,
      [e.target.id]: "",
    }));
  };

  return (
    <div className="full-page fr-ct-ct p-xl">
      <form className="auth-form shadow-medium fc-ct-ct p-xl br-sm">
        <h3 className="font-medium txt-xl">Login</h3>
        <div className="px-xl py-sm full-width fc-fs-fs">
          <Input
            type="text"
            id="email"
            placeholder={"Enter Email Address"}
            value={loginInputs.email}
            onChange={handleInputChange}
          />
          {loginErrors.email && (
            <InputAlert message={loginErrors.email} className="mt-sm" />
          )}
        </div>
        <div className="px-xl py-sm full-width fc-fs-fs">
          <Input
            type="password"
            id="password"
            placeholder={"Enter Password"}
            value={loginInputs.password}
            onChange={handleInputChange}
          />
          {loginErrors.password && (
            <InputAlert message={loginErrors.password} className="mt-sm" />
          )}
        </div>
        <div className="fc-fs-ct full-width px-xl py-lg">
          <Button
            variant={"contained"}
            color="primary"
            className="full-width mb-md"
          >
            Login
          </Button>
          <Button
            variant={"outlined"}
            color="primary"
            className="full-width mb-sm"
          >
            Login as Guest
          </Button>
          <Link
            to={"/sign-up"}
            className="txt-underline hover-light py-sm px-lg br-sm"
          >
            Create New Account
          </Link>
        </div>
      </form>
    </div>
  );
};
