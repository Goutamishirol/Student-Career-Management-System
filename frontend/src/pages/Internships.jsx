import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";

function Internships() {

  const [internships, setInternships] = useState([]);

  const [company, setCompany] = useState("");
  const [role, setRole] = useState("");
  const [duration, setDuration] = useState("");
  const [status, setStatus] = useState("Planned");
  const [editingInternshipId, setEditingInternshipId] = useState(null);

  const navigate = useNavigate();
  // Logged-in user
  const userId = localStorage.getItem("userId");
  const isUserIdValid = userId && userId !== "null";

  const loadInternships = () => {
    if (!isUserIdValid) {
      alert("Session expired. Please login again.");
      navigate("/");
      return;
    }

    API.get(`/internships?userId=${userId}`)
      .then(res => setInternships(res.data))
      .catch(err => {
        console.error(err);
        alert("Failed to load internships");
      });

  };

  useEffect(() => {
    if (!isUserIdValid) {
      navigate("/");
      return;
    }

    loadInternships();
  }, [isUserIdValid, navigate]);

  const saveInternship = () => {
    if (
      company.trim() === "" ||
      role.trim() === "" ||
      duration.trim() === ""
    ) {
      alert("Fill all fields");
      return;
    }

    if (!isUserIdValid) {
      alert("Session expired. Please login again.");
      navigate("/");
      return;
    }

    const payload = {
      company,
      role,
      duration,
      status
    };

    const request = editingInternshipId
      ? API.put(`/internships/${editingInternshipId}?userId=${userId}`, payload)
      : API.post(`/internships?userId=${userId}`, payload);

    request
      .then(() => {
        setCompany("");
        setRole("");
        setDuration("");
        setStatus("Planned");
        setEditingInternshipId(null);
        loadInternships();
      })
      .catch(err => {
        console.error(err);
        alert(editingInternshipId ? "Failed to update internship" : "Failed to add internship");
      });
  };

  const startEditInternship = (item) => {
    setCompany(item.company || "");
    setRole(item.role || "");
    setDuration(item.duration || "");
    setStatus(item.status || "Planned");
    setEditingInternshipId(item.id);
  };

  const cancelEdit = () => {
    setCompany("");
    setRole("");
    setDuration("");
    setStatus("Planned");
    setEditingInternshipId(null);
  };

  const remove = (id) => {

    if (!isUserIdValid) {
      alert("Session expired. Please login again.");
      navigate("/");
      return;
    }

    API.delete(`/internships/${id}?userId=${userId}`)
      .then(() => loadInternships())
      .catch(err => {
        console.error(err);
        alert(err.response?.data?.message || "Failed to delete internship");
      });

  };

  return (

    <div>

      <div className="hero-section mb-4">

        <h1>💼 My Internships</h1>

        <p>Track your internship experience and progress.</p>

      </div>

      <div className="card p-4 mb-4">

        <h4 className="mb-3">
          Add New Internship
        </h4>

        <label className="form-label mb-1">Company</label>
        <input
          className={`form-control mb-3 ${company ? "filled" : ""}`}
          placeholder="Company"
          value={company}
          onChange={(e) => setCompany(e.target.value)}
        />

        <label className="form-label mb-1">Role</label>
        <input
          className={`form-control mb-3 ${role ? "filled" : ""}`}
          placeholder="Role"
          value={role}
          onChange={(e) => setRole(e.target.value)}
        />

        <label className="form-label mb-1">Duration</label>
        <input
          className={`form-control mb-3 ${duration ? "filled" : ""}`}
          placeholder="e.g. 3 months"
          value={duration}
          onChange={(e) => setDuration(e.target.value)}
        />

        <label className="form-label mb-1">Status</label>
        <select
          className="form-select mb-3"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        >
          <option value="Planned">Planned</option>
          <option value="Ongoing">Ongoing</option>
          <option value="Completed">Completed</option>
        </select>

        <button
          className="btn btn-primary me-2"
          onClick={saveInternship}
        >
          {editingInternshipId ? "Save Internship" : "➕ Add Internship"}
        </button>

        {editingInternshipId && (
          <button
            className="btn btn-secondary"
            onClick={cancelEdit}
          >
            Cancel
          </button>
        )}

      </div>

      <div className="card p-4">

        <h4 className="mb-3">Your Internships</h4>

        {
          internships.length > 0 ? (

            <div className="table-responsive">
              <table className="table mt-3">
                <thead>
                  <tr>
                    <th>Company</th>
                    <th>Role</th>
                    <th>Duration</th>
                    <th>Status</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {internships.map(item => (
                    <tr key={item.id}>
                      <td>{item.company}</td>
                      <td>{item.role}</td>
                      <td>{item.duration}</td>
                      <td>{item.status}</td>
                      <td>
                        <button
                          className="btn btn-sm btn-outline-secondary me-2"
                          onClick={() => startEditInternship(item)}
                        >
                          Edit
                        </button>
                        <button
                          className="btn btn-danger btn-sm"
                          onClick={() => remove(item.id)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

          ) : (

            <div className="text-center">

              <h5>No internships added yet.</h5>

            </div>

          )
        }

      </div>

    </div>

  );

}

export default Internships;