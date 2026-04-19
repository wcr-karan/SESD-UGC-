import { useState, useEffect, useRef } from 'react';
import { User, Lock, Mail } from 'lucide-react';
import characterImage from '../../assets/zoro.jpg';
import './Login.css';

export default function Login({ onLogin }) {
  const [activeTab, setActiveTab] = useState('login');
  const [isProcessing, setIsProcessing] = useState(false);
  const [isPrivacyMode, setIsPrivacyMode] = useState(false);
  const [pupilPos, setPupilPos] = useState({ x: 0, y: 0 });
  
  const [formData, setFormData] = useState({
    user: '',
    email: '',
    pass: '',
  });

  const cardRef = useRef(null);

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (isPrivacyMode) return;
      
      const eyes = document.querySelectorAll('.eye-pupil');
      eyes.forEach((pupil) => {
        const rect = pupil.getBoundingClientRect();
        const eyeCenter = {
          x: rect.left + rect.width / 2,
          y: rect.top + rect.height / 2,
        };
        
        const angle = Math.atan2(e.clientY - eyeCenter.y, e.clientX - eyeCenter.x);
        const distance = Math.min(
          6, // Max pupil movement radius
          Math.hypot(e.clientX - eyeCenter.x, e.clientY - eyeCenter.y) / 20
        );
        
        const x = Math.cos(angle) * distance;
        const y = Math.sin(angle) * distance;
        
        setPupilPos({ x, y });
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [isPrivacyMode]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isProcessing) return;

    setIsProcessing(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsProcessing(false);
      onLogin(); // Trigger parent login state
    }, 1500);
  };

  return (
    <div className="login-page">
      <div className="auth-card" ref={cardRef}>
        {/* Anime Eyes */}
        <div className={`anime-eyes ${isPrivacyMode ? 'privacy' : ''}`}>
          <div className="eye">
            <div 
              className="eye-pupil" 
              style={{ transform: `translate(${pupilPos.x}px, ${pupilPos.y}px)` }}
            />
          </div>
          <div className="eye">
            <div 
              className="eye-pupil" 
              style={{ transform: `translate(${pupilPos.x}px, ${pupilPos.y}px)` }}
            />
          </div>
        </div>

        {/* Tabs */}
        <div className="tabs">
          <button
            className={`tab-btn ${activeTab === 'login' ? 'active' : ''}`}
            onClick={() => setActiveTab('login')}
          >
            LOGIN
          </button>
          <button
            className={`tab-btn ${activeTab === 'signup' ? 'active' : ''}`}
            onClick={() => setActiveTab('signup')}
          >
            SIGN UP
          </button>
          <div
            className="tab-indicator"
            style={{
              left: activeTab === 'login' ? '20%' : '60%',
              width: activeTab === 'login' ? '15%' : '20%',
            }}
          />
        </div>

        {/* Login Form */}
        <div className={`form-container ${activeTab === 'login' ? 'active' : ''}`}>
          <div className="header">
            <h1>WELCOME</h1>
            <p className="subtitle">おかえりなさい</p>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="input-group">
              <User size={18} />
              <input
                type="text"
                name="user"
                placeholder="Username"
                value={formData.user}
                onChange={handleChange}
                required
              />
            </div>
            <div className="input-group">
              <Lock size={18} />
              <input
                type="password"
                name="pass"
                placeholder="Password"
                value={formData.pass}
                onChange={handleChange}
                onFocus={() => setIsPrivacyMode(true)}
                onBlur={() => setIsPrivacyMode(false)}
                required
              />
            </div>
            <div className="options">
              <a href="#" className="forgot-link">Forgot password?</a>
            </div>
            <button type="submit" className="primary-btn" disabled={isProcessing}>
              {isProcessing ? 'PROCESSING...' : 'LOG IN'}
            </button>
          </form>
        </div>

        {/* Sign Up Form */}
        <div className={`form-container ${activeTab === 'signup' ? 'active' : ''}`}>
          <div className="header">
            <h1>SIGN UP</h1>
            <p className="subtitle">新しく始める</p>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="input-group">
              <User size={18} />
              <input
                type="text"
                name="user"
                placeholder="Username"
                value={formData.user}
                onChange={handleChange}
                required
              />
            </div>
            <div className="input-group">
              <Mail size={18} />
              <input
                type="email"
                name="email"
                placeholder="Email Address"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            <div className="input-group">
              <Lock size={18} />
              <input
                type="password"
                name="pass"
                placeholder="Password"
                value={formData.pass}
                onChange={handleChange}
                onFocus={() => setIsPrivacyMode(true)}
                onBlur={() => setIsPrivacyMode(false)}
                required
              />
            </div>
            <button type="submit" className="primary-btn" disabled={isProcessing}>
              {isProcessing ? 'PROCESSING...' : 'SIGN UP'}
            </button>
          </form>
        </div>

        <button 
          className="guest-btn" 
          onClick={onLogin}
        >
          GUEST ACCESS
        </button>

        <img src={characterImage} alt="Anime Character" className="anime-character" />
      </div>
    </div>
  );
}
