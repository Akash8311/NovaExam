import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Signup.css';
import emailjs from '@emailjs/browser';

function SignupPage() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    agree: false,
    errorMessage: '',
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
      errorMessage: '',
    });
  };

  const validateName = (name) => {
    const nameRegex = /^[A-Za-z\s]+$/;
    return nameRegex.test(name) ? '' : 'Name must contain only letters and spaces.';
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@gmail\.com$/i;
    return emailRegex.test(email) ? '' : 'Email must be a valid @gmail.com address.';
  };

  const validatePassword = (password) => {
  const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;
  return passwordRegex.test(password)
    ? ''
    : 'Password must be at least 8 characters long and must include at least 1 uppercase letter, 1 number, and 1 special character.';
};


  const handleSubmit = (e) => {
    e.preventDefault();

    const nameError = validateName(formData.name);
    const emailError = validateEmail(formData.email);
    const passwordError = validatePassword(formData.password);

    if (nameError || emailError || passwordError) {
      setFormData({ ...formData, errorMessage: nameError || emailError || passwordError });
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setFormData({ ...formData, errorMessage: 'Passwords do not match!' });
      return;
    }

    if (!formData.agree) {
      setFormData({ ...formData, errorMessage: 'You must agree to the terms.' });
      return;
    }

    // Send signup data to backend
    fetch('http://localhost:5000/api/auth/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: formData.name,
        email: formData.email,
        password: formData.password
      })
    })
      .then(async (response) => {
        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || 'Signup failed');
        }

        // Save to localStorage (optional)
        localStorage.setItem("userName", formData.name);
        localStorage.setItem("userEmail", formData.email);
        localStorage.setItem("studentName", formData.name);
        localStorage.setItem("studentEmail", formData.email);

        // Send welcome email
        emailjs.send(
          'service_o84ifif',
          'template_7yf1jaa',
          {
            name: formData.name,
            email: formData.email,
            title: 'Welcome to Nova Exam!',
            message: 'Thank you for signing up. Your Nova Exam journey begins now!',
            time: new Date().toLocaleString(),
          },
          'wUUdTr3NqsHRWW5XG'
        ).then(() => {
          console.log("📧 Email sent to student successfully.");
        }).catch((err) => {
          console.error("❌ Failed to send email:", err);
        });

        alert('🎉 Signup Successful!');
        navigate('/home');

        setFormData({
          name: '',
          email: '',
          password: '',
          confirmPassword: '',
          agree: false,
          errorMessage: '',
        });
      })
      .catch((error) => {
        setFormData(prev => ({
          ...prev,
          errorMessage: error.message
        }));
      });
  };

   return (
      <div className="signup-container">
        <div className="left-panel">
          {/* <h1 className="logo" style={{marginTop:'1vh',marginLeft:'-15vh'}}>
            <img
              className="logo1"
              src="https://dynamic.design.com/asset/logo/b777bb05-ef3a-40c1-81e5-c218a4b7311f/logo?logoTemplateVersion=1&v=638750126514600000&text=+NovaExam+online+exam+potel&layout=auto"
              alt="NovaExam"
            />
            NovaExam
          </h1> */}
          <h6 className="title" style={{marginTop:'-0.1vh'}}>Let's, <span style={{display: 'block', marginTop:'-1vh'}}>Get Started!✈️</span></h6>
          <p className="subtitle" style={{marginTop:'-1vh'}}>Create your account and put your knowledge to the test!🗯️</p>

          <form className="signup-form" onSubmit={handleSubmit} >
            <label>Name</label>
            <div className="input-group">
              <svg fill="#000000" width="20px" height="20px" viewBox="0 0 24 24">
                <path
                  d="M21,20a2,2,0,0,1-2,2H5a2,2,0,0,1-2-2,6,6,0,0,1,6-6h6A6,6,0,0,1,21,20Zm-9-8A5,5,0,1,0,7,7,5,5,0,0,0,12,12Z"
                  style={{ fill: 'white' }}
                />
              </svg>
              <input
                type="text"
                name="name"
                placeholder="Nova Exam"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>

            <label>Email</label>
            <div className="input-group">
              <svg width="20px" height="20px" viewBox="0 0 24 24">
                <polygon
                  points="17 19 21 19 21 7.43 17 10.86 17 19"
                  style={{
                    fill: 'none',
                    stroke: 'white',
                    strokeLinecap: 'round',
                    strokeLinejoin: 'round',
                    strokeWidth: 2,
                  }}
                />
                <polygon
                  points="7 10.86 3 7.43 3 19 7 19 7 10.86"
                  style={{
                    fill: 'black',
                    stroke: 'white',
                    strokeLinecap: 'round',
                    strokeLinejoin: 'round',
                    strokeWidth: 2,
                  }}
                />
                <path
                  d="M21,7.43h0l-4,3.43-5,4.28L7,10.86,3,7.43H3A2.42,2.42,0,0,1,7,5.59H7l5,4.29,5-4.29h0A2.42,2.42,0,0,1,21,7.43Z"
                  style={{
                    fill: 'white',
                    stroke: 'rgb(44, 169, 188)',
                    strokeLinecap: 'round',
                    strokeLinejoin: 'round',
                    strokeWidth: 2,
                  }}
                />
              </svg>
              <input
                type="email"
                name="email"
                placeholder="AM6030920@gmail.com"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <label>Password</label>
            <div className="input-group">
              <svg width="20px" height="20px" viewBox="0 0 15 15">
                <path
                  d="M12.5 8.5V7.5C12.5 6.94772 12.0523 6.5 11.5 6.5H1.5C0.947715 6.5 0.5 6.94772 0.5 7.5V13.5C0.5 14.0523 0.947715 14.5 1.5 14.5H11.5C12.0523 14.5 12.5 14.0523 12.5 13.5V12.5M12.5 8.5H8.5C7.39543 8.5 6.5 9.39543 6.5 10.5C6.5 11.6046 7.39543 12.5 8.5 12.5H12.5M12.5 8.5C13.6046 8.5 14.5 9.39543 14.5 10.5C14.5 11.6046 13.6046 12.5 12.5 12.5M3.5 6.5V3.5C3.5 1.84315 4.84315 0.5 6.5 0.5C8.15685 0.5 9.5 1.84315 9.5 3.5V6.5M12 10.5H13M10 10.5H11M8 10.5H9"
                  stroke="white"
                />
              </svg>
              <input
                type={showPassword ? "text" : "password"}
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
                {showPassword ? '👁️' : '🙈'}
              </span>
            </div>

            <label>Confirm Password</label>
            <div className="input-group">
              <svg width="20px" height="20px" viewBox="0 0 15 15">
                <path
                  d="M12.5 8.5V7.5C12.5 6.94772 12.0523 6.5 11.5 6.5H1.5C0.947715 6.5 0.5 6.94772 0.5 7.5V13.5C0.5 14.0523 0.947715 14.5 1.5 14.5H11.5C12.0523 14.5 12.5 14.0523 12.5 13.5V12.5M12.5 8.5H8.5C7.39543 8.5 6.5 9.39543 6.5 10.5C6.5 11.6046 7.39543 12.5 8.5 12.5H12.5M12.5 8.5C13.6046 8.5 14.5 9.39543 14.5 10.5C14.5 11.6046 13.6046 12.5 12.5 12.5M3.5 6.5V3.5C3.5 1.84315 4.84315 0.5 6.5 0.5C8.15685 0.5 9.5 1.84315 9.5 3.5V6.5M12 10.5H13M10 10.5H11M8 10.5H9"
                  stroke="white"
                />
              </svg>
              <input
                type={showConfirmPassword ? "text" : "password"}
                name="confirmPassword"
                placeholder="********"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
              />
              <span
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                style={{ cursor: 'pointer', marginLeft: '8px', color: 'white' }}
              >
                {showConfirmPassword ? '👁️' : '🙈'}
              </span>
            </div>

            <label className="checkbox">
              <input
                type="checkbox"
                name="agree"
                checked={formData.agree}
                onChange={handleChange}
              />
              <span>I agree to the terms and conditions </span>
              
            </label>

            {formData.errorMessage && (
              <p className="error-message">{formData.errorMessage}</p>
            )}

            <button type="submit" className="create-account">
              Get Started💭
            </button>

            <div className="have">
              <span>
                Already have an Account? <Link to="/login" className="log">Log-In</Link>
              </span>
            </div>
          </form>
        </div>

        <div className="right-panel">
          <img className="logini" src="/images/log1.png" alt="Signup Illustration" />
        </div>
      </div>
    );
  }

  export default SignupPage;