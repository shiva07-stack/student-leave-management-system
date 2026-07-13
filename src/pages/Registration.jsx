import { useState } from "react";
import api from "../services/api";

function Registration() {
const [showStudentPassword,setShowStudentPassword]=useState(false);
const [showParentPassword,setShowParentPassword]=useState(false);
const [studentName,setStudentName]=useState("");
const [rollNo,setRollNo]=useState("");
const [branch,setBranch]=useState("");
const [year,setYear]=useState("");

const [studentEmail,setStudentEmail]=useState("");
const [studentPassword,setStudentPassword]=useState("");

const [parentName,setParentName]=useState("");
const [parentPhone,setParentPhone]=useState("");
const [parentPassword,setParentPassword]=useState("");
const registerStudent = async (e) => {

e.preventDefault();

try{

await api.post("/register",{

studentName,
rollNo,
branch,
year,

studentEmail,
studentPassword,

parentName,
parentPhone,
parentPassword

});

alert("Registration Successful! Please login.");
window.location.href = "/";

}catch(err){

alert("Registration Failed");

}

};

return(

<div className="dashboard">

<header className="dashboard-header">

<h1>Student Registration</h1>

</header>

<section className="profile-card">

<form onSubmit={registerStudent}>
<label>Student Name</label>
<input
type="text"
value={studentName}
onChange={(e)=>setStudentName(e.target.value)}
required
/>

<label>Roll Number</label>
<input
type="text"
value={rollNo}
onChange={(e)=>setRollNo(e.target.value.toUpperCase())}
required
/>

<label>Branch</label>
<input
type="text"
value={branch}
onChange={(e)=>setBranch(e.target.value.toUpperCase())}
required
/>

<label>Year</label>
<input
type="number"
value={year}
onChange={(e)=>setYear(e.target.value)}
required
/>

<label>Student Email</label>
<input
type="email"
value={studentEmail}
onChange={(e)=>setStudentEmail(e.target.value)}
required
/>

<label>Student Password</label>
<input
type={showStudentPassword ? "text" : "password"}
value={studentPassword}
onChange={(e)=>setStudentPassword(e.target.value)}
required
/>
<button
type="button"
onClick={() => setShowStudentPassword(!showStudentPassword)}
>
{showStudentPassword ? "Hide Password" : "Show Password"}
</button>
<h2 style={{marginTop:"20px"}}>Parent Details</h2>

<label>Parent Name</label>
<input
type="text"
value={parentName}
onChange={(e)=>setParentName(e.target.value)}
required
/>

<label>Parent Phone Number</label>

<input
type="tel"
value={parentPhone}
onChange={(e)=>{
const value = e.target.value.replace(/\D/g,"");
setParentPhone(value);
}}
maxLength={10}
required
/>

<label>Parent Password</label>
<input
type={showParentPassword ? "text" : "password"}
value={parentPassword}
onChange={(e)=>setParentPassword(e.target.value)}
required
/>
<button
type="button"
onClick={() => setShowParentPassword(!showParentPassword)}
>
{showParentPassword ? "Hide Password" : "Show Password"}
</button>

<br />
<br />

<button type="submit">
Register
</button>
</form>

</section>
</div>

);

}

export default Registration;