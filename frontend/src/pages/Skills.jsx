import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";

function Skills() {

  const [skills, setSkills] = useState([]);

  const [skillName, setSkillName] = useState("");
  const [proficiency, setProficiency] = useState("");
  const [editingSkillId, setEditingSkillId] = useState(null);

  const navigate = useNavigate();
  // Logged-in user's ID
  const userId = localStorage.getItem("userId");

  const isUserIdValid = userId && userId !== "null";

  // Load only the logged-in user's skills
  const loadSkills = () => {
    if (!isUserIdValid) {
      alert("Session expired. Please login again.");
      navigate("/");
      return;
    }

    API.get(`/skills?userId=${userId}`)
      .then(res => setSkills(res.data))
      .catch(err => {
        console.error(err);
        alert("Failed to load skills");
      });

  };

  useEffect(() => {
    if (!isUserIdValid) {
      navigate("/");
      return;
    }

    loadSkills();
  }, [isUserIdValid, navigate]);

  // Add or update skill for logged-in user
  const saveSkill = () => {
    if (!skillName || !proficiency) {
      alert("Please fill all fields");
      return;
    }

    if (!isUserIdValid) {
      alert("Session expired. Please login again.");
      navigate("/");
      return;
    }

    const payload = {
      skillName,
      proficiency
    };

    const request = editingSkillId
      ? API.put(`/skills/${editingSkillId}?userId=${userId}`, payload)
      : API.post(`/skills?userId=${userId}`, payload);

    request
      .then(() => {
        setSkillName("");
        setProficiency("");
        setEditingSkillId(null);
        loadSkills();
      })
      .catch(err => {
        console.error(err);
        alert(editingSkillId ? "Failed to update skill" : "Failed to add skill");
      });
  };

  const startEditSkill = (skill) => {
    setSkillName(skill.skillName || "");
    setProficiency(skill.proficiency || "");
    setEditingSkillId(skill.id);
  };

  const cancelEdit = () => {
    setSkillName("");
    setProficiency("");
    setEditingSkillId(null);
  };

  // Delete skill
  const deleteSkill = (id) => {

    if (!isUserIdValid) {
      alert("Session expired. Please login again.");
      navigate("/");
      return;
    }

    API.delete(`/skills/${id}?userId=${userId}`)
      .then(() => loadSkills())
      .catch(err => {
        console.error(err);
        alert(err.response?.data?.message || "Failed to delete skill");
      });

  };

  return (

    <div>

      <h2 className="mb-4">
        Skills Management
      </h2>

      <div className="card p-4 mb-4">

        <label className="form-label mb-1">Name</label>
        <input
          className={`form-control mb-3 ${skillName ? "filled" : ""}`}
          placeholder="Name"
          value={skillName}
          onChange={(e) => setSkillName(e.target.value)}
        />

        <label className="form-label mb-1">Proficiency</label>
        <input
          className={`form-control mb-3 ${proficiency ? "filled" : ""}`}
          placeholder="e.g. Intermediate"
          value={proficiency}
          onChange={(e) => setProficiency(e.target.value)}
        />

        <button
          className="btn btn-primary me-2"
          onClick={saveSkill}
        >
          {editingSkillId ? "Save Skill" : "Add Skill"}
        </button>

        {editingSkillId && (
          <button
            className="btn btn-secondary"
            onClick={cancelEdit}
          >
            Cancel
          </button>
        )}

      </div>

      <div className="card p-4">

        <h4>Your Skills</h4>

        <table className="table mt-3">

          <thead>

            <tr>
              <th>ID</th>
              <th>Skill</th>
              <th>Proficiency</th>
              <th>Action</th>
            </tr>

          </thead>

          <tbody>

            {
              skills.length > 0 ? (

                skills.map(skill => (

                  <tr key={skill.id}>

                    <td>{skill.id}</td>

                    <td>{skill.skillName}</td>

                    <td>{skill.proficiency}</td>

                    <td>

                      <button
                        className="btn btn-sm btn-outline-secondary me-2"
                        onClick={() => startEditSkill(skill)}
                      >
                        Edit
                      </button>

                      <button
                        className="btn btn-danger btn-sm"
                        onClick={() => deleteSkill(skill.id)}
                      >
                        Delete
                      </button>

                    </td>

                  </tr>

                ))

              ) : (

                <tr>
                  <td colSpan="4" className="text-center">
                    No skills added yet.
                  </td>
                </tr>

              )
            }

          </tbody>

        </table>

      </div>

    </div>

  );
}

export default Skills;