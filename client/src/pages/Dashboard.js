import jwtDecode from "jwt-decode";
import { useHistory } from "react-router-dom";

const Dashboard = () => {
  const history = useHistory();
  let firstName = "";
  let lastName = "";


  const token = sessionStorage.getItem("token");
  if (!token) {
    localStorage.removeItem("token");
    history.replace("/login");
  } else {
    const user = jwtDecode(token)
    firstName = user.firstName
    lastName = user.lastName
  }

  return (
    <div>
      <h1 className="m-5 text-center">Welcome {firstName} {lastName}</h1>
    </div>
  );


};

export default Dashboard;
