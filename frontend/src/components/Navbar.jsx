import {Link,useNavigate} from "react-router-dom";


function Navbar(){

const navigate=useNavigate();


function logout(){

localStorage.clear();
navigate("/");

}


return(

<nav className="top-navbar">


<div className="logo">

🎓 Skill<span>Vault</span>

</div>


<div className="nav-links">


<Link to="/dashboard">
⌂ Dashboard
</Link>


<Link to="/dashboard/skills">
📖 Skills
</Link>


<Link to="/dashboard/certificates">
🏅 Certificates
</Link>


<Link to="/dashboard/internships">
💼 Internships
</Link>


<Link to="/dashboard/profile">
👤 Profile
</Link>


</div>



<button onClick={logout}>

⇥ Logout

</button>


</nav>


)

}


export default Navbar;