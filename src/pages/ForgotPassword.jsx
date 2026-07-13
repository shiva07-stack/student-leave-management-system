import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import "./Login.css";
import logo from "../assets/mru-logo.png";

function ForgotPassword() {

    const navigate = useNavigate();

    const [username, setUsername] = useState("");
    const [role, setRole] = useState("");
    const [otp, setOtp] = useState("");
    const [newPassword, setNewPassword] = useState("");

    const sendOtp = async () => {

        try {

            await api.post(`/send-otp?username=${username}`);

            alert("OTP Sent Successfully. Check your Email.");

        } catch (err) {

            alert("User Not Found");

        }

    };

    const handleReset = async (e) => {

        e.preventDefault();

        try {

            await api.put("/reset-password", {
                username,
                role,
                otp,
                newPassword
            });

            alert("Password Updated Successfully");

            navigate("/");

        } catch (err) {

            alert("Invalid OTP or User Not Found");

        }

    };

    return (

        <div className="login-page">

            <div className="login-container">

                <img src={logo} alt="MRU Logo" className="logo" />

                <h1>Forgot Password</h1>

                <form onSubmit={handleReset}>

                    <input
                        type="text"
                        placeholder="Email / Parent Phone"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
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
                    </select>

                    <button
                        type="button"
                        onClick={sendOtp}
                    >
                        Send OTP
                    </button>

                    <input
                        type="text"
                        placeholder="Enter OTP"
                        value={otp}
                        onChange={(e) => setOtp(e.target.value)}
                        required
                    />

                    <input
                        type="password"
                        placeholder="New Password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        required
                    />

                    <button type="submit">
                        Reset Password
                    </button>

                </form>

            </div>

        </div>

    );

}

export default ForgotPassword;