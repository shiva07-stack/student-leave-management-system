import { useState, useEffect } from "react";
import "./StudentDashboard.css";
import logo from "../assets/mru-logo.png";
import api from "../services/api";

function StudentDashboard() {
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [reason, setReason] = useState("");

  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const [leaves, setLeaves] = useState([]);
  const [student, setStudent] = useState({});

  const studentId = localStorage.getItem("studentId");
  const studentName = localStorage.getItem("userName");

  useEffect(() => {
    loadLeaves();
    loadStudent();
  }, []);

  const loadLeaves = async () => {
    try {
      const res = await api.get(`/leaves/student/${studentId}`);
      setLeaves(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const loadStudent = async () => {
    try {
      const res = await api.get(`/students/${studentId}`);
      setStudent(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const applyLeave = async (e) => {
    e.preventDefault();

    if (new Date(fromDate) > new Date(toDate)) {
      alert("From Date cannot be after To Date");
      return;
    }

    try {
      await api.post("/leaves/apply", {
        studentId: Number(studentId),
        fromDate,
        toDate,
        reason,
      });

      alert("Leave Applied Successfully");

      setFromDate("");
      setToDate("");
      setReason("");

      loadLeaves();
    } catch (err) {
      console.log(err);
      alert("Error Applying Leave");
    }
  };

  const updatePassword = async () => {
    if (!oldPassword || !newPassword) {
      alert("Please fill all fields");
      return;
    }

    try {
      await api.put("/users/change-password", {
        userId: Number(studentId),
        oldPassword,
        newPassword,
      });

      alert("Password Updated Successfully");

      setOldPassword("");
      setNewPassword("");
    } catch (err) {
      console.log(err);
      alert("Failed to Update Password");
    }
  };

  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <h1 className="dashboard-title">
          <img src={logo} alt="MRU Logo" className="header-logo" />
          Malla Reddy University
        </h1>

        <p>Welcome, {studentName}</p>
      </header>

      <section className="profile-card">
        <h2>Student Profile</h2>

        <p>
          <strong>Roll No:</strong> {student.rollNo}
        </p>

        <p>
          <strong>Branch:</strong> {student.branch}
        </p>

        <p>
          <strong>Email:</strong> {student.studentEmail}
        </p>
      </section>

      <section className="actions">
        <h2>Apply for Leave</h2>

        <form onSubmit={applyLeave}>
          <label>From:</label>

          <input
            type="date"
            value={fromDate}
            onChange={(e) => setFromDate(e.target.value)}
            required
          />

          <label>To:</label>

          <input
            type="date"
            value={toDate}
            onChange={(e) => setToDate(e.target.value)}
            required
          />

          <label>Reason:</label>

          <textarea
            rows="3"
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            placeholder="Enter reason..."
            required
          />

          <button type="submit">Apply Leave</button>
        </form>
      </section>

      <section className="summary">
        <div className="summary-box green">
          <h3>Approved</h3>

          <p>{leaves.filter((l) => l.status === "Approved").length} Leaves</p>
        </div>

        <div className="summary-box yellow">
          <h3>Pending</h3>

          <p>
            {
              leaves.filter(
                (l) =>
                  l.status === "Pending" ||
                  l.status === "Parent Approved"
              ).length
            }{" "}
            Leaves
          </p>
        </div>

        <div className="summary-box red">
          <h3>Rejected</h3>

          <p>{leaves.filter((l) => l.status === "Rejected").length} Leaves</p>
        </div>
      </section>

      <section className="leave-history">
        <h2>Leave History</h2>

        <table>
          <thead>
            <tr>
              <th>From</th>
              <th>To</th>
              <th>Reason</th>
              <th>Status</th>
            </tr>
          </thead>

          <tbody>
            {leaves.length === 0 ? (
              <tr>
                <td colSpan="4">No Leave Records Found</td>
              </tr>
            ) : (
              leaves.map((leave) => (
                <tr key={leave.id}>
                  <td>{leave.fromDate}</td>
                  <td>{leave.toDate}</td>
                  <td>{leave.reason}</td>
                  <td>{leave.status}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </section>

      
    </div>
  );
}

export default StudentDashboard;