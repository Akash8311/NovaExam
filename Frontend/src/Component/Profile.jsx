import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Profile.css';
import html2pdf from 'html2pdf.js';

const Profile = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: localStorage.getItem("studentName") || 'NovaExam',
    Email: localStorage.getItem("studentEmail") || 'email@gmail.com',
    phone: localStorage.getItem("studentPhone") || '+91 00-000-00000',
    mobile: localStorage.getItem("studentMobile") || '+91 00-000-00000',
    address: localStorage.getItem("studentAddress") || 'Enter Your Address',
    College: localStorage.getItem("studentCollege") || 'Enter Your College',
    Github: localStorage.getItem("studentGithub") || 'Enter Your Link',
    Linkedin: localStorage.getItem("studentLinkedin") || 'Enter Your Link'
  });

  const [image, setImage] = useState(localStorage.getItem("studentImage") || "https://cdn-icons-png.flaticon.com/512/3135/3135715.png");
  const [editing, setEditing] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [examHistory, setExamHistory] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("examHistory")) || [];
    } catch {
      return [];
    }
  });
  const [showCertificates, setShowCertificates] = useState(false);
  const [certificates, setCertificates] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('certificates')) || [];
    } catch {
      return [];
    }
  });

  // Save form data instantly on change
  useEffect(() => {
    localStorage.setItem("studentName", formData.name);
    localStorage.setItem("studentEmail", formData.Email);
    localStorage.setItem("studentPhone", formData.phone);
    localStorage.setItem("studentMobile", formData.mobile);
    localStorage.setItem("studentAddress", formData.address);
    localStorage.setItem("studentCollege", formData.College);
    localStorage.setItem("studentGithub", formData.Github);
    localStorage.setItem("studentLinkedin", formData.Linkedin);
  }, [formData]);

  // Save image instantly
  useEffect(() => {
    localStorage.setItem("studentImage", image);
  }, [image]);

  // Sync exam history changes to localStorage
  useEffect(() => {
    localStorage.setItem("examHistory", JSON.stringify(examHistory));
  }, [examHistory]);

  // Sync certificates changes to localStorage
  useEffect(() => {
    localStorage.setItem("certificates", JSON.stringify(certificates));
  }, [certificates]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setImage(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleLogout = () => {
    if (window.confirm("Are you sure you want to logout?")) {
      // Clear all stored user data
      localStorage.removeItem("studentName");
      localStorage.removeItem("studentEmail");
      localStorage.removeItem("studentPhone");
      localStorage.removeItem("studentMobile");
      localStorage.removeItem("studentAddress");
      localStorage.removeItem("studentCollege");
      localStorage.removeItem("studentGithub");
      localStorage.removeItem("studentLinkedin");
      localStorage.removeItem("studentImage");
      localStorage.removeItem("examHistory");
      localStorage.removeItem("certificates");
      navigate("/");
    }
  };

  const goHome = () => {
    if (window.confirm("Back To Home...")) {
      navigate("/Home");
    }
  };

  const downloadCertificate = (cert) => {
    const container = document.createElement('div');
    container.innerHTML = `
      <div style="width: 1000px; height: 700px; padding: 50px; border: 10px solid #1a1a1a; text-align: center; font-family: 'Georgia'; position: relative;">
        <img src="your-logo-url-here" alt="Logo" style="position: absolute; top: 30px; left: 40px; height: 80px;" />
        <h1 style="margin-top: 100px; font-size: 40px;">Certificate of Achievement</h1>
        <p style="font-size: 20px;">This is to certify that</p>
        <h2 style="font-size: 30px; font-weight: bold;">${formData.name}</h2>
        <p style="font-size: 18px;">has successfully completed the <strong>${cert.examName || "NovaExam Test"}</strong> exam with a score of</p>
        <h3 style="font-size: 24px;">${cert.score}/30</h3>
        <p style="font-size: 18px;">Grade: <strong>${cert.grade}</strong></p>
        <p style="position: absolute; bottom: 30px; left: 50px;">Date: ${cert.date}</p>
        <p style="position: absolute; bottom: 30px; right: 50px;">Akash Maity, NovaExam Head</p>
      </div>
    `;

    const opt = {
      margin: 0,
      filename: `${cert.examName || 'NovaExam'}-Certificate.pdf`,
      image: { type: 'jpeg', quality: 1 },
      html2canvas: { scale: 2, useCORS: true, backgroundColor: null },
      jsPDF: { unit: 'pt', format: 'a4', orientation: 'landscape' },
    };

    html2pdf().set(opt).from(container).save();
  };

  return (
    <div className='bg' style={{ fontFamily: 'poppins' }}>
      <p className="profile-title">
        Your <span className="profile-highlight">Profile ❤️</span>
      </p>

      <div className="profile-container">

        {/* Profile Card */}
        <div className="profile-card">
          <div className="profile-image">
            <img src={image} alt="Profile" />
            <label className="edit-btn" htmlFor="upload-photo">✏️</label>
            <input
              type="file"
              id="upload-photo"
              accept="image/*"
              onChange={handleImageChange}
              style={{ display: "none" }}
            />
          </div>

          <div className="profile-basic-info">
            <h1>{formData.name} 🤗</h1>
            <h4>{formData.Email}</h4>
            <p>Student</p>
          </div>

          <div className="buttons">
            <button className="history-btn" onClick={() => setShowHistory(!showHistory)}>
              {showHistory ? "Hide History" : "View History"}
            </button>
            <button className="logout-btn" onClick={handleLogout}>Logout</button>
            <button className="homebtn" onClick={goHome}>Home</button>
          </div>

          {showHistory && (
            <div className="exam-history">
              <h3>📚 Exam History</h3>
              {examHistory.length === 0 ? (
                <p className="no-exams">No exams taken yet.</p>
              ) : (
                <table className="exam-table">
                  <thead>
                    <tr>
                      <th>Exam</th>
                      <th>Score</th>
                      <th>Completed At</th>
                    </tr>
                  </thead>
                  <tbody>
                    {examHistory.map((exam, index) => (
                      <tr key={index}>
                        <td>{exam.examName}</td>
                        <td>{exam.score} / {exam.total}</td>
                        <td>{exam.completedAt}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          )}
        </div>

        {/* Profile Details */}
        <div className="profile-details">
          {Object.keys(formData).map((field, idx) => (
            <div className="detail-row" key={idx}>
              <strong>{field.charAt(0).toUpperCase() + field.slice(1)}</strong>
              {editing ? (
                <input
                  type="text"
                  name={field}
                  value={formData[field]}
                  onChange={handleChange}
                />
              ) : (
                <span>{formData[field]}</span>
              )}
            </div>
          ))}
          <button className="edit-button" onClick={() => setEditing(!editing)}>
            {editing ? 'Save' : 'Edit'}
          </button>

          {/* Certificate Button */}
          <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '-4vh' }}>
            <button className='Dowload' onClick={() => setShowCertificates(true)}>Your Certificate</button>
          </div>

          {/* Certificate Modal */}
          {showCertificates && (
            <div className="modal">
              <div className="modal-content">
                <h1 style={{ marginBottom: '10px' }}>🎓 Your Certificates</h1>
                {certificates.length === 0 ? (
                  <p>No certificates found.</p>
                ) : (
                  <ul>
                    {certificates.map((cert, index) => (
                      <li key={index} style={{ marginBottom: '15px' }}>
                        <span>#{index + 1} - Score: {cert.score}/30 | Grade: {cert.grade} | Date: {cert.date}</span>
                        <button
                          style={{ marginLeft: '15px' }}
                          onClick={() => downloadCertificate(cert)}
                        >
                          Download
                        </button>
                      </li>
                    ))}
                  </ul>
                )}
                <button onClick={() => setShowCertificates(false)} style={{ marginTop: '20px' }}>
                  Close
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
