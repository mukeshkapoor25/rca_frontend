import React from 'react';
import { useNavigate } from 'react-router-dom';
import './LandingPage.css';

const features = [
  {
    icon: '🔍',
    title: 'Anomaly Detection',
    desc: 'BERT-powered log anomaly detection for fast troubleshooting.'
  },
  {
    icon: '🧩',
    title: 'Modular Microservices',
    desc: 'Scalable, decoupled architecture for flexibility and speed.'
  },
  {
    icon: '📊',
    title: 'Visual RCA Dashboard',
    desc: 'Interactive dashboards for root cause analysis and insights.'
  }
];

export default function LandingPage() {
  const navigate = useNavigate();
  return (
    <div className="landing-container">
      {/* Hero */}
      <section className="hero">
        <h1><span role="img" aria-label="moon">🌖</span> LogBERT RCA</h1>
        <p className="subtitle">AI-powered Log Analytics & Root Cause Analysis</p>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap' }}>
          <button className="cta-button" onClick={() => navigate('/upload')}>Upload Logs</button>
          <button className="cta-button" style={{ background: '#4f8cff', color: '#fff' }} onClick={() => navigate('/rca')}>View RCA Results</button>
        </div>
      </section>

      {/* Features */}
      <section className="features">
        {features.map((f, i) => (
          <div key={i} className="feature-card">
            <div className="icon">{f.icon}</div>
            <h3>{f.title}</h3>
            <p>{f.desc}</p>
          </div>
        ))}
      </section>

      {/* Architecture */}
      <section className="architecture">
        <h2>Architecture Overview</h2>
        <div className="arch-diagram">
          <div className="box">Frontend<br/>(React + Vite)</div>
          <div className="arrow">↓</div>
          <div className="box">API Layer<br/>(FastAPI)</div>
          <div className="arrow">↓</div>
          <div className="row">
            <div className="box">RCA Engine</div>
            <div className="arrow-side">──</div>
            <div className="box">Redis</div>
            <div className="arrow-side">──</div>
            <div className="box">Log Processor<br/>(BERT)</div>
          </div>
          <div className="arrow">↓</div>
          <div className="box">File Receiver<br/>(Uploads & Queueing)</div>
        </div>
      </section>

      {/* How It Works */}
      <section className="how-it-works">
        <h2>How It Works</h2>
        <ol>
          <li>Upload logs</li>
          <li>View insights</li>
          <li>Investigate RCA summary</li>
        </ol>
      </section>

      {/* Footer */}
      <footer>
        <a
          href="https://huggingface.co/docs/hub/spaces-config-reference"
          target="_blank"
          rel="noopener noreferrer"
        >
          Hugging Face config reference
        </a>
      </footer>
    </div>
  );
}