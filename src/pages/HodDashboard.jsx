import { useEffect, useState } from "react";
import api from "../services/api";

function HodDashboard() {
  const [leaves, setLeaves] = useState([]);

  useEffect(() => {
    loadLeaves();
  }, []);

  const loadLeaves = async () => {
    try {
      const res = await api.get("/leaves/parent-approved");
      setLeaves(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const approveLeave = async (id) => {
    try {
      await api.put(`/leaves/hod/approve/${id}`);

      alert("Leave Approved Successfully");

      loadLeaves();
    } catch (err) {
      console.log(err);
      alert("Approval Failed");
    }
  };

  const rejectLeave = async (id) => {
    try {
      await api.put(`/leaves/hod/reject/${id}`);

      alert("Leave Rejected Successfully");

      loadLeaves();
    } catch (err) {
      console.log(err);
      alert("Reject Failed");
    }
  };

  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <h1>HOD Dashboard</h1>
      </header>

      <section className="leave-history">
        <h2>Parent Approved Leave Requests</h2>

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
                <td colSpan="6">No Parent Approved Leaves</td>
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

export default HodDashboard;