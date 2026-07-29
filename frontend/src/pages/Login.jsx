import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../services/api";

function Login() {

  const navigate = useNavigate();

  const [login, setLogin] = useState({
    email: "",
    password: ""
  });

  const handleChange = (e) => {
    setLogin({
      ...login,
      [e.target.name]: e.target.value
    });
  };

//   const signin = () => {

//     API.post("/users/signin", login)
//     .then(res => {

//       alert(res.data);
//     if(res.data === "Login successful") {

//     localStorage.setItem("loggedIn", "true");

//     localStorage.setItem("userEmail", login.email);

//     navigate("/dashboard");

// }
//     });

//   };
const signin = () => {

  API.post("/users/signin", login)
    .then((res) => {

      if (res.data.success) {

        localStorage.setItem("loggedIn", "true");
        localStorage.setItem("userId", res.data.userId);
        localStorage.setItem("userName", res.data.name);
        localStorage.setItem("userEmail", res.data.email);

        alert(res.data.message);

        navigate("/dashboard");

      } else {

        alert(res.data.message);

      }

    })
    .catch((err) => {

      console.error(err);
      alert("Login failed");

    });

};

  return (

    <div className="container vh-100 d-flex justify-content-center align-items-center">

      <div className="card shadow p-4" style={{width:"400px"}}>

        <h2 className="text-center mb-3">
          Internship Skill Tracker
        </h2>

        <input
          className="form-control mb-3"
          placeholder="Email"
          name="email"
          onChange={handleChange}
        />

        <input
          type="password"
          className="form-control mb-3"
          placeholder="Password"
          name="password"
          onChange={handleChange}
        />

        <button
          className="btn btn-primary w-100 mb-3"
          onClick={signin}
        >
          Login
        </button>

        <p className="text-center">
          Don't have an account?
          <Link to="/signup"> Signup</Link>
        </p>

      </div>

    </div>

  );
}

export default Login;