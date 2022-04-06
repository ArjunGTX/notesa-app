import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Button, Input, InputAlert } from "../components";
import { useAuth } from "../contexts";
import { login, validateLoginInputs } from "../utils/api";
import { toast } from "react-toastify";
import { TOAST_ERRORS, TOAST_SUCCESS } from "../utils/constants";
import { Loader } from "../components/Loader";

export const Login = () => {
  const navigate = useNavigate();
  const {
    auth: { isLoggedIn },
    setAuth,
  } = useAuth();
  const location = useLocation();
  const from = location.state?.from
    ? location.state.from.pathname === "/sign-up"
      ? "/"
      : location.state.from.pathname
    : -1;

  const [loading, setLoading] = useState(false);
  const [loginInputs, setLoginInputs] = useState({
    email: "",
    password: "",
  });
  const [loginErrors, setLoginErrors] = useState({
    email: "",
    password: "",
  });

  useEffect(() => {
    isLoggedIn && navigate("/");
  }, []);

  const loginRequest = async (email, password) => {
    setLoading(true);
    try {
      const { status, data } = await login(email, password);
      if (!status === 200) return;
      setAuth({
        isLoggedIn: true,
        encodedToken: data.encodedToken,
      });
      toast.success(TOAST_SUCCESS.LOGIN);
      navigate(from, {
        replace: true,
      });
    } catch (error) {
      toast.error(TOAST_ERRORS.LOGIN);
    } finally {
      setTimeout(() => setLoading(false), 800);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { isValid, errors } = validateLoginInputs(loginInputs, loginErrors);
    if (!isValid) {
      setLoginErrors(errors);
      return;
    }
    loginRequest(loginInputs.email, loginInputs.password);
  };

  const handleGuestLogin = () => {
    loginRequest("guestuser@email.com", "GuestUser@123");
  };

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
      <form
        onSubmit={handleSubmit}
        autoComplete="new-password"
        className="auth-form shadow-medium fc-ct-ct p-xl br-sm"
      >
        <h3 className="font-medium txt-xl">Login</h3>
        <div className="px-xl py-sm full-width fc-fs-fs">
          <Input
            type="text"
            id="email"
            autoComplete={"new-password"}
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
            autoComplete="new-password"
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
            type="button"
            onClick={handleGuestLogin}
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
      {loading && <Loader />}
    </div>
  );
};
