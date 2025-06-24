// src/App.js
import React, { useState } from 'react';
import './App.css';
import profilePhoto from './assets/profile.jpg';
import DBS_Logo from './assets/DBS_Logo.png';
import Micron_Logo from './assets/Micron_Logo.png';
import Artius_Logo from './assets/Artius_Logo.jpg';

function ExperiencePage({ onBack }) {
  return (
    <div className="experience-page">
      <button className="back-btn" onClick={onBack}>&larr; Back to Chat</button>
      <h2>My Experience</h2>
      <div className="experience-list">
        <div className="experience-item">
          <img src={DBS_Logo} alt="ABC Tech Logo" className="company-logo" />
          <div className="exp-content">
            <h3>Software Engineer, DBS Bank Limited</h3>
            <span className="exp-date">2024 - Present</span>
            <ul>
              <li>Developed a full-stack application from scratch for real-time infrastructure automation and monitoring.</li>
              <li>Built backend services using Django, MySQL, Redis for efficient request processing and improved request processing time by 86%.</li>
              <li>Implemented CI/CD pipelines with Jenkins and Bitbucket, automating build, testing, and deployment processes for Linux servers.</li>
            </ul>
          </div>
        </div>
        <div className="experience-item">
          <img src={Artius_Logo} alt="XYZ Solutions Logo" className="company-logo" />
          <div className="exp-content">
            <h3>Software Engineer, Artius Global</h3>
            <span className="exp-date">2023 - 2024</span>
            <ul>
              <li>Designed GraphQL services using Flask, improving API response time by 30%.</li>
              <li>Built responsive UIs using React and TypeScript for a seamless user experience.</li>
              <li>Developed automated test scripts using Selenium to ensure application performance.</li>
            </ul>
          </div>
        </div>
        <div className="experience-item">
          <img src={Micron_Logo} alt="DEF Innovations Logo" className="company-logo" />
          <div className="exp-content">
            <h3>Automation Developer, Micron Technology</h3>
            <span className="exp-date">2020 - 2023</span>
            <ul>
              <li>Developed automated ETL pipelines using Python and SQL, optimizing data transformation.</li>
              <li>Designed and implemented real-time automation programs to integrate with manufacturing processes using Python and UiPath, resulting in a 5% improvement in production yield.</li>
              <li>Collaborated with cross-functional teams to develop a Machine Learning-based predictive model, transitioning from reactive to predictive process tuning, and received the "Idea of the Quarter" award</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

function ProjectsPage({ onBack }) {
  return (
    <div className="projects-page">
      <button className="back-btn" onClick={onBack}>&larr; Back to Chat</button>
      <h2>My Projects</h2>
      <div className="project-list">
        <div className="project-item">
          <div className="proj-title-block">
            <h3>Smart Resume Chatbot</h3>
            <div className="proj-date">2025</div>
          </div>
          <ul>
            <li>Built an AI-powered chatbot to answer questions about my resume and experience</li>
            <li>React frontend, flask backend, OpenAI API integration</li>
            <li>Deployed on google cloud with CI/CD</li>
          </ul>
        </div>
        <div className="project-item">
          <div className="proj-title-block">
            <h3>Bloom Filter Implementation in Golang</h3>
            <div className="proj-date">2025</div>
          </div>
          <ul>
            <li>Built a memory-efficient Bloom Filter with dynamic sizing, custom hash injection, and concurrent thread-safe access.</li>
            <li>Optimized lock contention with background batching and enhanced performance monitoring (false positive rates, bit saturation, heatmaps)</li>
            <li>Achieved 8× memory savings over naive implementations by compacting bit arrays.</li>
          </ul>
        </div>
        <div className="project-item">
          <div className="proj-title-block">
            <h3>AG Data Framework Project</h3>
            <div className="proj-date">2024</div>
          </div>
          <ul>
            <li>Built a web-based ETL platform using Flask and Pandas for financial data transformation and visualization.</li>
            <li>Reduced API response time by 30% and memory usage by 50% through backend refactoring.</li>
            <li>Optimized database indexing structure, improving data read performance by 80%, and deployed the application architecture on AWS EC2/S3 for scalable access.</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

function IntroSection() {
  return (
    <div className="intro-section">
      <img src={profilePhoto} alt="Zhao Cai" className="profile-photo" />
      <div className="intro-content">
        <h2>Zhao Cai</h2>
        <p>Hi, I'm Zhao Cai, a passionate software engineer with a strong background in web development, data visualization, and AI-powered applications. I love building user-friendly products and solving real-world problems with technology.</p>
      </div>
    </div>
  );
}

function App() {
  const [messages, setMessages] = useState([
    { type: 'bot', text: 'Hi! Ask me anything about my work and experience!', time: new Date().toLocaleTimeString() }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [theme, setTheme] = useState('dark');
  const [page, setPage] = useState('chat');

  const apiUrl = process.env.REACT_APP_BACKEND_URL;

  React.useEffect(() => {
    document.body.className = theme === 'dark' ? 'dark-theme' : 'light-theme';
  }, [theme]);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = { type: 'user', text: input, time: new Date().toLocaleTimeString() };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setLoading(true);

    try {
      const response = await fetch(`${apiUrl}/ask`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ question: input }),
      });

      const data = await response.json();
      const botReply = data.answer || "No response";

      setMessages(prev => [...prev, { type: 'bot', text: botReply, time: new Date().toLocaleTimeString() }]);
    } catch (error) {
      console.error('Error:', error);
      setMessages(prev => [...prev, { type: 'bot', text: 'Error: Could not reach server.', time: new Date().toLocaleTimeString() }]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') sendMessage();
  };

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  const sampleQuestions = [
    "What is your background?",
    "What skills do you have?",
    "What is your experience?",
    "What projects have you done?",
  ];

  const handleSampleClick = (question) => {
    setInput(question);
    setTimeout(() => {
      sendMessage();
    }, 100);
  };

  return (
    <div className={`app ${theme}-theme`}>
      <header className="app-header">
        <IntroSection />
        <nav className="header-nav">
          <button className="nav-btn" onClick={() => setPage('chat')} disabled={page==='chat'}>Chat</button>
          <button className="nav-btn" onClick={() => setPage('experience')} disabled={page==='experience'}>Experience</button>
          <button className="nav-btn" onClick={() => setPage('projects')} disabled={page==='projects'}>Projects</button>
        </nav>
        <button className="theme-toggle-btn" onClick={toggleTheme} aria-label="Toggle theme">
          {theme === 'dark' ? (
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#ffd700" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>
          ) : (
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#232a3b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12.79A9 9 0 1111.21 3a7 7 0 109.79 9.79z"/></svg>
          )}
        </button>
      </header>
      {page === 'chat' ? (
        <>
          <div className="chat-window">
            {messages.map((msg, i) => (
              <div key={i} className={`message-bubble ${msg.type}`}>  
                <div className="message-text">{msg.text}</div>
                <div className="message-time">{msg.time}</div>
              </div>
            ))}
            {loading && (
              <div className="message-bubble bot loading">
                <div className="message-text">Zhao Cai is typing...</div>
              </div>
            )}
          </div>
          <div className="sample-questions">
            {sampleQuestions.map((q, idx) => (
              <button
                key={idx}
                className="sample-question-btn"
                onClick={() => handleSampleClick(q)}
                disabled={loading}
              >
                {q}
              </button>
            ))}
          </div>
          <div className="input-area">
            <input
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={handleKeyPress}
              placeholder="Type your message..."
              disabled={loading}
            />
            <button onClick={sendMessage} disabled={loading || !input.trim()} className="send-btn" aria-label="Send">
              <svg className="send-icon" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>
            </button>
          </div>
        </>
      ) : page === 'experience' ? (
        <ExperiencePage onBack={() => setPage('chat')} />
      ) : (
        <ProjectsPage onBack={() => setPage('chat')} />
      )}
    </div>
  );
}

export default App;
