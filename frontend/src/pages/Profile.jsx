import { useEffect, useState } from "react";
import API from "../services/api";

function Profile() {

  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");

  const [skills, setSkills] = useState(0);
  const [certificates, setCertificates] = useState(0);
  const [internships, setInternships] = useState(0);

  const [careerScore, setCareerScore] = useState(0);

  const userId = localStorage.getItem("userId");

  useEffect(() => {

    setUserName(localStorage.getItem("userName") || "User");
    setEmail(localStorage.getItem("userEmail") || "Not Available");

    API.get(`/skills?userId=${userId}`)
      .then(res => setSkills(res.data.length))
      .catch(console.error);

    API.get(`/certificates?userId=${userId}`)
      .then(res => setCertificates(res.data.length))
      .catch(console.error);

    API.get(`/internships?userId=${userId}`)
      .then(res => setInternships(res.data.length))
      .catch(console.error);

  }, [userId]);

  useEffect(() => {

    const score = Math.min(
      skills * 5 +
      certificates * 7 +
      internships * 10,
      100
    );

    setCareerScore(score);

  }, [skills, certificates, internships]);

  return (

    <div>

      <h2 className="mb-4">
        👤 My Profile
      </h2>

      <div className="card shadow p-4">

        <div className="text-center">

          <img
            src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
            alt="Profile"
            width="120"
            className="mb-3"
          />

          <h3>{userName}</h3>

          <p className="text-muted">
            Internship Skill Tracker User
          </p>

        </div>

        <hr />

        <h5>User Details</h5>

        <p>
          <strong>Name:</strong> {userName}
        </p>

        <p>
          <strong>Email:</strong> {email}
        </p>

        <p>
          <strong>Account Status:</strong> Active
        </p>

        <hr />

        <h5>Career Summary</h5>

        <p>
          <strong>Skills Added:</strong> {skills}
        </p>

        <p>
          <strong>Certificates:</strong> {certificates}
        </p>

        <p>
          <strong>Internships:</strong> {internships}
        </p>

        <p>
          <strong>Career Score:</strong> {careerScore}%
        </p>

      </div>

    </div>

  );

}

export default Profile;