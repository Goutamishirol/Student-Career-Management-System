import { useEffect, useState } from "react";
import API from "../services/api";

function Dashboard() {
  const [skills, setSkills] = useState(0);
  const [certificates, setCertificates] = useState(0);
  const [internships, setInternships] = useState(0);
  const [careerScore, setCareerScore] = useState(0);

  const userId = localStorage.getItem("userId");
  const userName = localStorage.getItem("userName") || "Talent";

  useEffect(() => {
    API.get(`/skills?userId=${userId}`)
      .then(res => setSkills(res.data.length))
      .catch(err => console.error(err));

    API.get(`/certificates?userId=${userId}`)
      .then(res => setCertificates(res.data.length))
      .catch(err => console.error(err));

    API.get(`/internships?userId=${userId}`)
      .then(res => setInternships(res.data.length))
      .catch(err => console.error(err));
  }, [userId]);

  useEffect(() => {
    const score = Math.min(skills * 5 + certificates * 7 + internships * 10, 100);
    setCareerScore(score);
  }, [skills, certificates, internships]);

  const stats = [
    { icon: "📚", label: "Skills", value: skills, accent: "#c4b5fd" },
    { icon: "🏅", label: "Certificates", value: certificates, accent: "#34d399" },
    { icon: "💼", label: "Internships", value: internships, accent: "#fbbf24" },
  ];

  return (
    <div className="dashboard-page">
      <div className="page-header">
        <div>
          <h1>Hey {userName}, welcome back</h1>
          <p>Track your career momentum and upcoming goals in one place.</p>
        </div>
      </div>

      <div className="grid-3 page-section">
        {stats.map((item) => (
          <div className="glass-card stat-card" key={item.label}>
            <div className="card-icon" style={{ background: `${item.accent}33` }}>
              {item.icon}
            </div>
            <div className="card-title">{item.label}</div>
            <h2 className="card-count">{item.value}</h2>
          </div>
        ))}
      </div>

      <div className="glass-card career-card page-section">
        <div className="career-summary">
          <h3>Career Score</h3>
          <p>Based on your current skills, certificates, and internship experience.</p>
          <div className="grid-2" style={{ gap: "1rem" }}>
            <div className="glass-card" style={{ padding: "1.7rem" }}>
              <h4>Growth potential</h4>
              <p>{careerScore >= 80 ? "High" : careerScore >= 50 ? "On track" : "Needs focus"}</p>
            </div>
            <div className="glass-card" style={{ padding: "1.7rem" }}>
              <h4>Next milestone</h4>
              <p>{careerScore >= 90 ? "Recruiter-ready portfolio" : "Add a new certificate"}</p>
            </div>
          </div>
        </div>

        <div className="career-ring" style={{ "--career-score": `${careerScore}%` }}>
          <div className="ring-fill"></div>
          <div className="ring-center">
            <h1>{careerScore}%</h1>
            <p>Score</p>
          </div>
        </div>
      </div>

      <div className="glass-card progress-card page-section">
        <h3>Progress overview</h3>
        <div className="progress-bar" style={{ marginTop: "1rem" }}>
          <div className="progress-fill" style={{ width: `${careerScore}%` }}></div>
        </div>
        <span className="progress-percentage">{careerScore}% complete</span>
      </div>
    </div>
  );
}

export default Dashboard;
