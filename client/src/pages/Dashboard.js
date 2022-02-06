import jwtDecode from "jwt-decode";
import { useHistory } from "react-router-dom";

const Dashboard = () => {
  const history = useHistory();
  let email = ""

  const token = sessionStorage.getItem("token");
  if (!token) {
    localStorage.removeItem("token");
    history.replace("/login");
  } else {
    const user = jwtDecode(token)
    console.log(user);
    email = user.email
  }

  return (
    <div>
      <h1 className="m-5 text-center">Welcome {email}</h1>
    </div>
  );


};

export default Dashboard;
