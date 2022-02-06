import GoogleLogin from "react-google-login";
import { useState } from "react";

const Login = () => {
  const clientId =
    "990147833316-g96th8dg5076njvk3e8nsac345h7atr2.apps.googleusercontent.com";
    
  const handleSuccess = async (googleData) => {
    const response = await fetch("http://localhost:3001/api/login-google", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        token: googleData.tokenId,
        firstName: googleData.profileObj.givenName,
        lastName: googleData.profileObj.familyName,
        email: googleData.profileObj.email
      }),
    })

    const data = await response.json();
    if (data.user) {
      sessionStorage.setItem("token", data.user)
      alert("Login Successfull");
      window.location.href = "/dashboard";
    } else {
      alert("Please check yout email or password");
    }
  };

  const handleFailure = (failure) => {
    alert("Activate your browser cookie", failure);
  };

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const loginUser = async (event) => {
    event.preventDefault();
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
    if (data.user) {
      sessionStorage.setItem("token", data.user);
      alert("Login Successfull");
      window.location.href = "/dashboard";
    } else {
      alert("Please check yout email or password");
    }
  };

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-4 my-5 p-3 border border-dark rounded">
          <form className="row my-3" onSubmit={loginUser}>
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
          <hr />
          <GoogleLogin
            className="col-12"
            clientId={clientId}
            onSuccess={handleSuccess}
            onFailure={handleFailure}
            cookiePolicy={'single_host_origin'}
            buttonText="Login with Google"
            theme="dark"
          />
          <div className="text-center">
            <p className="mx-3">
              Don't have an Account?{" "}
              <a href="/register" className="mb-1">
                Register
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
