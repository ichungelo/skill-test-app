import React from "react";

const Register = () => {
  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-8 my-5 p-5 border border-dark rounded">
          <form className="row" method="POST">
            <div className="col-12 text-center">
              <h1>Register</h1>
            </div>
            <div className="form-group col-6 text-left">
              <label>First Name</label>
              <input
                type={"text"}
                className="form-control form-control-sm"
                name="firstName"
                placeholder="First Name"
              />
            </div>
            <div className="form-group col-6 text-left">
              <label>Last Name</label>
              <input
                type={"text"}
                className="form-control form-control-sm"
                name="lastName"
                placeholder="Last Name"
              />
            </div>
            <div className="form-group col-12 text-left">
              <label>Email</label>
              <input
                type={"email"}
                className="form-control form-control-sm"
                name="email"
                placeholder="Email"
              />
            </div>
            <div className="form-group col-12 text-left">
              <label>Password</label>
              <input
                type={"password"}
                className="form-control form-control-sm"
                name="password"
                placeholder="Password"
              />
            </div>
            <div className="form-group col-12 text-left">
              <label>Retype Password</label>
              <input
                type={"password"}
                className="form-control form-control-sm"
                name="passwordRetype"
                placeholder="Password"
              />
            </div>
            <button className="btn btn-dark btn-block mx-3">
              Create Account
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
