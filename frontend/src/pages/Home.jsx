function Home() {
  return (
    <div className="container mt-5">

      <div className="text-center">

        <h1 className="display-4 fw-bold">
          Internship Skill Tracker
        </h1>

        <p className="lead mt-3">
          Manage your Skills, Certificates and Internships in one place.
        </p>

        import { Link } from "react-router-dom";

...

<Link to="/dashboard" className="btn btn-primary btn-lg mt-3">
    Get Started
</Link>

      </div>

      <div className="row mt-5">

        <div className="col-md-4">
          <div className="card shadow">
            <div className="card-body">
              <h3>Skills</h3>
              <p>Track technical and soft skills.</p>
            </div>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card shadow">
            <div className="card-body">
              <h3>Certificates</h3>
              <p>Store and manage certifications.</p>
            </div>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card shadow">
            <div className="card-body">
              <h3>Internships</h3>
              <p>Maintain internship records.</p>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
}

export default Home;