import {useEffect,useState} from "react";
import API from "../services/api";

function Students(){

const[data,setData]=useState([]);

const[name,setName]=useState("");
const[usn,setUsn]=useState("");
const[branch,setBranch]=useState("");
const[semester,setSemester]=useState("");
const[email,setEmail]=useState("");

const load=()=>{
API.get("/students")
.then(res=>setData(res.data));
};

useEffect(()=>{
load();
},[]);

const add=()=>{

API.post("/students",{
name,
usn,
branch,
semester,
email
}).then(()=>{

setName("");
setUsn("");
setBranch("");
setSemester("");
setEmail("");

load();

});

};

const remove=(id)=>{
API.delete("/students/"+id)
.then(()=>load());
};

return(

<div>

<h2>Students</h2>

<div className="card p-4 mb-4">

<input className="form-control mb-2"
placeholder="Name"
value={name}
onChange={e=>setName(e.target.value)}
/>

<input className="form-control mb-2"
placeholder="USN"
value={usn}
onChange={e=>setUsn(e.target.value)}
/>

<input className="form-control mb-2"
placeholder="Branch"
value={branch}
onChange={e=>setBranch(e.target.value)}
/>

<input className="form-control mb-2"
placeholder="Semester"
value={semester}
onChange={e=>setSemester(e.target.value)}
/>

<input className="form-control mb-3"
placeholder="Email"
value={email}
onChange={e=>setEmail(e.target.value)}
/>

<button
className="btn btn-primary"
onClick={add}
>
Add Student
</button>

</div>

<table className="table">

<thead>

<tr>

<th>Name</th>
<th>USN</th>
<th>Branch</th>
<th>Semester</th>
<th>Email</th>
<th>Action</th>

</tr>

</thead>

<tbody>

{
data.map(s=>

<tr key={s.id}>

<td>{s.name}</td>
<td>{s.usn}</td>
<td>{s.branch}</td>
<td>{s.semester}</td>
<td>{s.email}</td>

<td>

<button
className="btn btn-danger btn-sm"
onClick={()=>remove(s.id)}
>
Delete
</button>

</td>

</tr>

)
}

</tbody>

</table>

</div>

);

}

export default Students;