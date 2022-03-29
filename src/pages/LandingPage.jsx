import React from "react";
import { Link } from "react-router-dom";
import { Button, Logo } from "../components";

export const LandingPage = () => {
  return (
    <div className="full-page home p-xl">
      <div className="p-xl fc-fs-ct">
        <Logo className="pb-xl" />
        <div className="my-auto pt-xl fc-fs-ct">
          <h3 className="txt-xl font-medium">Meet your modern</h3>
          <h3 className="txt-xl font-medium txt-primary">Note taking App</h3>
          <h5 className="txt-md font-medium mx-auto my-xl">
            Manage your daily tasks and workflow in a modern way and boost your
            efficiency without any efforts.
          </h5>
          <Link to="/sign-up">
            <Button variant={"contained"} color="primary" className={"mt-lg"}>
              Join Now
            </Button>
          </Link>
          <Link to={"/login"} className="txt-primary font-medium mt-xs">
            Already have an Account?
          </Link>
        </div>
      </div>
      <div className="p-xl my-auto">
        <img
          src="assets/images/checklist.jpg"
          alt="checklist"
          className="img-res"
        />
      </div>
    </div>
  );
};
