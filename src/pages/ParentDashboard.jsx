import { useEffect, useState } from "react";
import api from "../services/api";

function ParentDashboard() {
  const [leaves, setLeaves] = useState([]);
  const [student, setStudent] = useState({});

  const parentUserId = localStorage.getItem("userId");

  useEffect(() => {
    loadStudent();
  }, []);

  const loadLeaves = async (studentId) => {
    try {
      const res = await api.get("/leaves/pending");

      setLeaves(
        res.data.filter((leave) => leave.studentId === studentId)
      );
    } catch (err) {
      console.log(err);
    }
  };

  const loadStudent = async () => {
    try {
      const res = await api.get(`/parent/${parentUserId}`);

      setStudent(res.data);

      await loadLeaves(res.data.id);
    } catch (err) {
      console.log(err);
    }
  };

  const approveLeave = async (id) => {
    try {
      await api.put(`/leaves/approve/${id}`);

      alert("Leave Approved Successfully");

      loadLeaves(student.id);
    } catch (err) {
      console.log(err);
      alert("Approval Failed");
    }
  };

  const rejectLeave = async (id) => {
    try {
      await api.put(`/leaves/reject/${id}`);

      alert("Leave Rejected Successfully");

      loadLeaves(student.id);
    } catch (err) {
      console.log(err);
      alert("Reject Failed");
    }
  };

  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <h1>Parent Dashboard</h1>

        <p>
          <strong>Student:</strong> {student.studentName}
        </p>

        <p>
          <strong>Roll No:</strong> {student.rollNo}
        </p>
      </header>

      <section className="leave-history">
        <h2>Pending Leave Requests</h2>

        <table>
          <thead>
            <tr>
              <th>Student ID</th>
              <th>From</th>
              <th>To</th>
              <th>Reason</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {leaves.length === 0 ? (
              <tr>
                <td colSpan="6">No Pending Leaves</td>
              </tr>
            ) : (
              leaves.map((leave) => (
                <tr key={leave.id}>
                  <td>{leave.studentId}</td>
                  <td>{leave.fromDate}</td>
                  <td>{leave.toDate}</td>
                  <td>{leave.reason}</td>
                  <td>{leave.status}</td>
                  <td>
                    <button onClick={() => approveLeave(leave.id)}>
                      Approve
                    </button>

                    <button
                      style={{ marginLeft: "10px" }}
                      onClick={() => rejectLeave(leave.id)}
                    >
                      Reject
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </section>
    </div>
  );
}

export default ParentDashboard;