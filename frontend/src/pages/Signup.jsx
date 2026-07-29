import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../services/api";

function Signup() {

    const navigate = useNavigate();

    const [user, setUser] = useState({
        name:"",
        email:"",
        password:""
    });

    const handleChange = (e)=>{
        setUser({
            ...user,
            [e.target.name]:e.target.value
        });
    };

    const register = ()=>{

        API.post("/users/register", user)
        .then(res=>{

            alert(res.data);

            if(res.data==="Registration successful"){
                navigate("/");
            }

        });

    };

    return(

        <div className="container vh-100 d-flex justify-content-center align-items-center">

            <div className="card p-4 shadow" style={{width:"450px"}}>

                <h2 className="text-center">
                    Signup
                </h2>

                <input
                className="form-control mb-3"
                placeholder="Name"
                name="name"
                onChange={handleChange}
                />

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
                className="btn btn-success"
                onClick={register}
                >
                    Signup
                </button>

                <p className="mt-3">

                    Already have an account?

                    <Link to="/">
                        Login
                    </Link>

                </p>

            </div>

        </div>

    );

}

export default Signup;