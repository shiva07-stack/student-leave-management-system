import api from "../services/api";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import "./Login.css";
import logo from "../assets/mru-logo.png";
import { Link } from "react-router-dom";
function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
  e.preventDefault();

  try {
    const response = await api.post("/login", {
      username,
      password,
      role,
    });

    if (response.data.success) {
      localStorage.setItem("studentId", response.data.studentId);
      localStorage.setItem("userId", response.data.id);
      
localStorage.setItem("userName", response.data.name);
localStorage.setItem("userRole", response.data.role);
      if (response.data.role === "student") {
        navigate("/student");
      } else if (response.data.role === "parent") {
        navigate("/parent");
      } else if (response.data.role === "hod") {
        navigate("/hod");
      }
    } else {
      alert("Invalid Username or Password");
    }
  } catch (error) {
    alert("Server Error");
    console.log(error);
  }
};

  return (
    <div className="login-page">
      <div className="login-container">

        <img src={logo} alt="MRU Logo" className="logo" />

        <h1>Malla Reddy University</h1>
        <p>Student Leave Management System</p>

        <form onSubmit={handleLogin}>

          <input
            type="text"
            placeholder={role === "parent" ? "Parent Phone Number" : "Student Email"}
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            required
          >
            <option value="">Select Role</option>
            <option value="student">Student</option>
            <option value="parent">Parent</option>
            <option value="hod">HOD</option>
          </select>

         <button type="submit">
  Login
</button>

<p
  style={{
    textAlign: "center",
    marginTop: "10px"
  }}
>
  <Link to="/forgot-password">
    Forgot Password?
  </Link>
</p>

<p
  style={{
    textAlign: "center",
    marginTop: "10px"
  }}
>
  Don't have an account?
</p>

<button
  type="button"
  onClick={() => navigate("/register")}
>
  Register
</button>

</form>

      </div>
    </div>
  );
}

export default Login;