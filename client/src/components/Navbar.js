import jwtDecode from "jwt-decode";
import React from "react";

const Navbar = () => {
  const token = sessionStorage.getItem("token");
  let buttonText = "";
  let buttonBehaviour;
  if (token) {
    buttonText = "Logout";
    buttonBehaviour = async (e) => {
      e.preventDefault();
      const tokenDecode = jwtDecode(token)
      const response = await fetch("http://localhost:3001/api/logout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: tokenDecode.email
        })
      });
      const data = await response.json();
      if (data.success) {
        alert("Logout Success")
      } else {
        alert("Logout Error")
      }
      sessionStorage.clear("token");
      window.location.href = "/";
    };
  } else {
    buttonText = "Login";
    buttonBehaviour = (e) => {
      e.preventDefault();
      window.location.href = "/login";
    };
  }

  return (
    <div className="navbar-nav container-fluid bg-dark">
      <div className="row bg-dark p-3">
        <div className="col-8">
          <h1 className="container-fluid bg-dark text-light">Skill Test</h1>
        </div>
        <div className="col-md-4 text-center">
          <button
            className="btn text-light m-2"
            onClick={buttonBehaviour}
          >
            {buttonText}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
