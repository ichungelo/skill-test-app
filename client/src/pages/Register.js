import { useState } from "react";

const Register = () => {

  const[ firstName, setFirstName] = useState("");
  const[ lastName, setLastName] = useState("");
  const[ email, setEmail] = useState("");
  const[ password, setPassword] = useState("");
  const[ passwordRepeat, setPasswordRepeat] = useState("");

  const registerUser = async (event) => {
    event.preventDefault()

    if (password === passwordRepeat) {      
      event.preventDefault()
      const response = await fetch("http://localhost:3001/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          firstName,
          lastName,
          email,
          password,
        }),
      });
  
      const data = await response.json();
      console.log(data)
    } else {
      alert("password not match")
    }
  };

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-8 my-5 p-5 border border-dark rounded">
          <form className="row" onSubmit={registerUser}>
            <div className="col-12 text-center">
              <h1>Register</h1>
            </div>
            <div className="form-group col-6 text-left">
              <label>First Name</label>
              <input
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                type={"text"}
                className="form-control form-control-sm"
                name="firstName"
                placeholder="First Name"
              />
            </div>
            <div className="form-group col-6 text-left">
              <label>Last Name</label>
              <input
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                type={"text"}
                className="form-control form-control-sm"
                name="lastName"
                placeholder="Last Name"
              />
            </div>
            <div className="form-group col-12 text-left">
              <label>Email</label>
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type={"email"}
                className="form-control form-control-sm"
                name="email"
                placeholder="Email"
              />
            </div>
            <div className="form-group col-12 text-left">
              <label>Password</label>
              <input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type={"password"}
                className="form-control form-control-sm"
                name="password"
                placeholder="Password"
              />
            </div>
            <div className="form-group col-12 text-left">
              <label>Retype Password</label>
              <input
                value={passwordRepeat}
                onChange={(e) => setPasswordRepeat(e.target.value)}
                type={"password"}
                className="form-control form-control-sm"
                name="passwordRepeat"
                placeholder="Password"
              />
            </div>
            <input
            className="btn btn-dark btn-block mx-3"
            type={"submit"}
            value="Register"/>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
