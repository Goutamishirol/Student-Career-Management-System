import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";

function Certificates() {

  const [certificates, setCertificates] = useState([]);
  const [name, setName] = useState("");
  const [issuer, setIssuer] = useState("");
  const [date, setDate] = useState("");
  const [file, setFile] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadError, setUploadError] = useState("");
  const [editingCertificateId, setEditingCertificateId] = useState(null);
  const [existingFileName, setExistingFileName] = useState(null);

  const navigate = useNavigate();
  // Logged-in user
  const userId = localStorage.getItem("userId");
  const isUserIdValid = userId && userId !== "null";

  const load = () => {
    if (!isUserIdValid) {
      alert("Session expired. Please login again.");
      navigate("/");
      return;
    }

    API.get(`/certificates?userId=${userId}`)
      .then(res => setCertificates(res.data))
      .catch(err => {
        console.error(err);
        alert("Failed to load certificates");
      });

  };

  useEffect(() => {
    if (!isUserIdValid) {
      navigate("/");
      return;
    }

    load();
  }, [isUserIdValid, navigate]);

  const validTypes = [
    "application/pdf",
    "image/jpeg",
    "image/jpg",
    "image/png"
  ];

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];

    if (!selectedFile) {
      setFile(null);
      setUploadError("");
      return;
    }

    if (!validTypes.includes(selectedFile.type)) {
      setFile(null);
      setUploadError("Only PDF, JPG, JPEG or PNG files are allowed.");
      return;
    }

    if (selectedFile.size > 20 * 1024 * 1024) {
      setFile(null);
      setUploadError("File must be 20 MB or smaller.");
      return;
    }

    setFile(selectedFile);
    setUploadError("");
  };

  const addOrUpdateCertificate = () => {
    if (!isUserIdValid) {
      alert("Session expired. Please login again.");
      navigate("/");
      return;
    }

    if (name.trim() === "" || issuer.trim() === "" || date.trim() === ""
        || (!editingCertificateId && !file)) {
      alert("Please fill all fields and choose a certificate file.");
      return;
    }

    const formData = new FormData();
    formData.append("certificateName", name);
    formData.append("issuer", issuer);
    formData.append("issueDate", date);

    if (file) {
      formData.append("file", file);
    }

    const request = editingCertificateId
      ? API.put(
          `/certificates/${editingCertificateId}?userId=${userId}`,
          formData,
          {
            headers: { "Content-Type": "multipart/form-data" },
            onUploadProgress: (progressEvent) => {
              const percent = Math.round((progressEvent.loaded * 100) / progressEvent.total);
              setUploadProgress(percent);
            }
          }
        )
      : API.post(
          `/certificates/upload?userId=${userId}`,
          formData,
          {
            headers: { "Content-Type": "multipart/form-data" },
            onUploadProgress: (progressEvent) => {
              const percent = Math.round((progressEvent.loaded * 100) / progressEvent.total);
              setUploadProgress(percent);
            }
          }
        );

    request
      .then(() => {
        setName("");
        setIssuer("");
        setDate("");
        setFile(null);
        setUploadProgress(0);
        setEditingCertificateId(null);
        setExistingFileName(null);
        load();
      })
      .catch(err => {
        console.error(err);
        const msg = err.response?.data?.message || err.response?.data || (editingCertificateId ? "Failed to update certificate" : "Failed to upload certificate");
        alert(msg);
        setUploadProgress(0);
      });
  };

  const startEditCertificate = (certificate) => {
    setName(certificate.certificateName || "");
    setIssuer(certificate.issuer || "");
    setDate(certificate.issueDate || "");
    setFile(null);
    setEditingCertificateId(certificate.id);
    setExistingFileName(certificate.fileName || null);
  };

  const cancelEdit = () => {
    setName("");
    setIssuer("");
    setDate("");
    setFile(null);
    setEditingCertificateId(null);
    setExistingFileName(null);
    setUploadError("");
    setUploadProgress(0);
  };

  const remove = (id) => {
    if (!isUserIdValid) {
      alert("Session expired. Please login again.");
      navigate("/");
      return;
    }

    API.delete(`/certificates/${id}?userId=${userId}`)
      .then(() => load())
      .catch(err => {
        console.error(err);
        alert(err.response?.data?.message || "Failed to delete certificate");
      });
  };

  // const getFileUrl = (fileName) => {
  //   return fileName ? `https://student-career-management-system.onrender.com/uploads/` : null;
  // };
const getFileUrl = (fileName) => {
  return fileName
    ? `https://student-career-management-system.onrender.com/uploads/${fileName}`
    : null;
};

  const viewFile = (fileName) => {
    const url = getFileUrl(fileName);
    if (!url) {
      alert("No file available to view.");
      return;
    }
    window.open(url, "_blank", "noopener,noreferrer");
  };

  return (

    <div>

      <div className="hero-section mb-4">

        <h1>🏆 My Certificates</h1>

        <p>Store and manage your achievements.</p>

      </div>

      <div className="card p-4 mb-4">

        <h4 className="mb-3">
          Add New Certificate
        </h4>

        <label className="form-label mb-1">Name</label>
        <input
          className={`form-control mb-3 ${name ? "filled" : ""}`}
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <label className="form-label mb-1">Issuer</label>
        <input
          className={`form-control mb-3 ${issuer ? "filled" : ""}`}
          placeholder="Issuer"
          value={issuer}
          onChange={(e) => setIssuer(e.target.value)}
        />

        <label className="form-label mb-1">Date</label>
        <input
          type="date"
          className={`form-control mb-3 ${date ? "filled" : ""}`}
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />

        <label className="form-label mb-1">File</label>
        <input
          type="file"
          className={`form-control mb-3 ${file ? "filled" : ""}`}
          accept=".pdf,.jpg,.jpeg,.png"
          onChange={handleFileChange}
        />

        {editingCertificateId && existingFileName && !file && (
          <div className="mb-3">
            Current file: <strong>{existingFileName}</strong> (upload a new file to replace)
          </div>
        )}

        {uploadError && (
          <div className="text-danger mb-3">{uploadError}</div>
        )}

        {file && (
          <div className="mb-3">
            Selected file: <strong>{file.name}</strong>
          </div>
        )}

        {uploadProgress > 0 && (
          <div className="progress mb-3">
            <div
              className="progress-bar"
              role="progressbar"
              style={{ width: `${uploadProgress}%` }}
              aria-valuenow={uploadProgress}
              aria-valuemin="0"
              aria-valuemax="100"
            >
              {uploadProgress}%
            </div>
          </div>
        )}

        <button
          className="btn btn-primary me-2"
          onClick={addOrUpdateCertificate}
        >
          {editingCertificateId ? "Save Certificate" : "➕ Upload Certificate"}
        </button>

        {editingCertificateId && (
          <button
            className="btn btn-secondary"
            onClick={cancelEdit}
          >
            Cancel
          </button>
        )}

      </div>

      <div className="row">

        {
          certificates.length > 0 ? (

            certificates.map(c => (

              <div
                className="col-lg-4 col-md-6 mb-4"
                key={c.id}
              >

                <div className="card p-4 h-100">

                  <div
                    style={{
                      fontSize: "55px",
                      textAlign: "center"
                    }}
                  >
                    🏆
                  </div>

                  <h4 className="text-center mt-3">
                    {c.certificateName}
                  </h4>

                  <hr />

                  <p>
                    <b>Issuer:</b> {c.issuer}
                  </p>

                  <p>
                    <b>Date:</b> {c.issueDate}
                  </p>

                  <div className="mt-auto">

                    <button
                      className="btn btn-outline-secondary btn-sm me-2"
                      onClick={() => startEditCertificate(c)}
                    >
                      ✏️ Edit
                    </button>

                    <button
                      className="btn btn-outline-primary btn-sm me-2"
                      onClick={() => viewFile(c.fileName)}
                      disabled={!c.fileName}
                    >
                      👁 View
                    </button>

                    <a
                      className="btn btn-outline-secondary btn-sm me-2"
                      href={getFileUrl(c.fileName)}
                      target="_blank"
                      rel="noopener noreferrer"
                      download
                      style={{ pointerEvents: c.fileName ? "auto" : "none", opacity: c.fileName ? 1 : 0.5 }}
                    >
                      ⬇ Download
                    </a>

                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => remove(c.id)}
                    >
                      🗑 Delete
                    </button>

                  </div>

                </div>

              </div>

            ))

          ) : (

            <div className="text-center">

              <h5>No certificates added yet.</h5>

            </div>

          )
        }

      </div>

    </div>

  );

}

export default Certificates;