import GoogleLogin from "react-google-login";
import { useState } from "react";

const Login = () => {
  const clientId =
    "990147833316-g96th8dg5076njvk3e8nsac345h7atr2.apps.googleusercontent.com";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const loginUser = async (event) => {
    event.preventDefault()
    const response = await fetch("http://localhost:3001/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });

    const data = await response.json();
    console.log(data)
  };

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-4 my-5 p-5 border border-dark rounded">
          <form className="row" onSubmit={loginUser}>
            <div className="col-12 text-center">
              <h1>Login</h1>
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
              ></input>
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
              ></input>
            </div>
            <input
              className="btn btn-outline-dark btn-block mx-3"
              type={"submit"}
              value="Login"
            />
          </form>
          <div className="row">
            <button className="btn btn-dark btn-block m-3">Register</button>
          </div>
          <GoogleLogin className="col-12" clientId={clientId} theme="dark" />
        </div>
      </div>
    </div>
  );
};

export default Login;
