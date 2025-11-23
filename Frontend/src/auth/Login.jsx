import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Login.css';

function LoginPage() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [showPassword, setShowPassword] = useState(false);
  const [customMessage, setCustomMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password } = formData;
    const emailRegex = /^[^\s@]+@gmail\.com$/;
    if (!email || !password) {
      setCustomMessage("Please fill in all fields.");
      setTimeout(() => setCustomMessage(''), 3000);
      return;
    }
    if (!emailRegex.test(email)) {
      setCustomMessage("Email must be a valid @gmail.com address.");
      setTimeout(() => setCustomMessage(''), 3000);
      return;
    }
    try {
      const response = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || 'Login failed');
      }
      setCustomMessage("Login Successful!");
      setTimeout(() => {
        setCustomMessage('');
        navigate('/Home');
      }, 2000);

    } catch (error) {
      setCustomMessage(error.message);
      setTimeout(() => setCustomMessage(''), 3000);
    }
  };

  return (
    <div className="signup-container">
      <div className="left-panel">
     

        <h6 className="title" style={{ marginTop: '-5vh' }}>You’re back....👀</h6>
        <span className="span" style={{ marginTop: '-3vh' }}>Welcome!</span>
        <p className="subtitle">Access your account and continue your journey....🧠</p>

        <form className="signup-form" onSubmit={handleSubmit}>
          <label htmlFor="email">Email</label>
          <div className="input-group" style={{ height: '4vh' }}>
            <svg
              width="20px"
              height="20px"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
              className="icon line-color"
              style={{ marginTop: '2.8vh' }}
            >
              <polygon
                points="17 19 21 19 21 7.43 17 10.86 17 19"
                style={{
                  fill: "none",
                  stroke: "white",
                  strokeLinecap: "round",
                  strokeLinejoin: "round",
                  strokeWidth: 2,
                }}
              />
              <polygon
                points="7 10.86 3 7.43 3 19 7 19 7 10.86"
                style={{
                  fill: "black",
                  stroke: "white",
                  strokeLinecap: "round",
                  strokeLinejoin: "round",
                  strokeWidth: 2,
                }}
              />
              <path
                d="M21,7.43h0l-4,3.43-5,4.28L7,10.86,3,7.43H3A2.42,2.42,0,0,1,7,5.59H7l5,4.29,5-4.29h0A2.42,2.42,0,0,1,21,7.43Z"
                style={{
                  fill: "white",
                  stroke: "rgb(44, 169, 188)",
                  strokeLinecap: "round",
                  strokeLinejoin: "round",
                  strokeWidth: 2,
                }}
              />
            </svg>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="am6030920@gmail.com"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <label htmlFor="password">Password</label>
          <div className="input-group">
            <svg
              width="20px"
              height="20px"
              viewBox="0 0 15 15"
              xmlns="http://www.w3.org/2000/svg"
              style={{ marginTop: '8px', marginRight: '10px' }}
            >
              <path
                d="M12.5 8.5V7.5C12.5 6.94772 12.0523 6.5 11.5 6.5H1.5C0.947715 6.5 0.5 6.94772 0.5 7.5V13.5C0.5 14.0523 0.947715 14.5 1.5 14.5H11.5C12.0523 14.5 12.5 14.0523 12.5 13.5V12.5M12.5 8.5H8.5C7.39543 8.5 6.5 9.39543 6.5 10.5C6.5 11.6046 7.39543 12.5 8.5 12.5H12.5M12.5 8.5C13.6046 8.5 14.5 9.39543 14.5 10.5C14.5 11.6046 13.6046 12.5 12.5 12.5M3.5 6.5V3.5C3.5 1.84315 4.84315 0.5 6.5 0.5C8.15685 0.5 9.5 1.84315 9.5 3.5V6.5M12 10.5H13M10 10.5H11M8 10.5H9"
                stroke="white"
              />
            </svg>
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              name="password"
              placeholder="********"
              value={formData.password}
              onChange={handleChange}
              required
            />
            <span
              onClick={() => setShowPassword(!showPassword)}
              style={{ cursor: 'pointer', marginLeft: '8px', color: 'white' }}
            >
              {showPassword ?  '👁️' : '🙈'}
            </span>
          </div>

          

          <button type="submit" className="create-account">
            Submitted
          </button>

          <div className="have">
            <span>Don't have an account? <Link to="/signup" className="log">Create one</Link></span>
          </div>

          {customMessage && (
            <div className="custom-alert" style={{
              marginTop: '15px',
              color: 'white',
              background: '#444',
              padding: '10px',
              borderRadius: '8px',
              textAlign: 'center',
            }}>
              {customMessage}
            </div>
          )}
        </form>
      </div>

      <div className="right-panel">
        <img className="logini" src="/images/log1.png" alt="Login Illustration" />
      </div>
    </div>
  );
}

export default LoginPage;