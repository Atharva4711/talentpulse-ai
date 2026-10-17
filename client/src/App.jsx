import React, { useState } from 'react'

// Lightweight SVG Icons
const Icons = {
  Dashboard: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
      <rect x="3" y="3" width="7" height="9" rx="2" />
      <rect x="14" y="3" width="7" height="5" rx="2" />
      <rect x="14" y="12" width="7" height="9" rx="2" />
      <rect x="3" y="16" width="7" height="5" rx="2" />
    </svg>
  ),
  Briefcase: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
      <rect x="2" y="7" width="20" height="14" rx="2" />
      <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
    </svg>
  ),
  Users: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  ),
  FileText: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <polyline points="14 2 14 8 20 8" />
      <line x1="16" y1="13" x2="8" y2="13" />
      <line x1="16" y1="17" x2="8" y2="17" />
      <polyline points="10 9 9 9 8 9" />
    </svg>
  ),
  Mic: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
      <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z" />
      <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
      <line x1="12" y1="19" x2="12" y2="23" />
      <line x1="8" y1="23" x2="16" y2="23" />
    </svg>
  ),
  BarChart: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
      <line x1="18" y1="20" x2="18" y2="10" />
      <line x1="12" y1="20" x2="12" y2="4" />
      <line x1="6" y1="20" x2="6" y2="14" />
    </svg>
  ),
  Calendar: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
      <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
      <line x1="16" y1="2" x2="16" y2="6" />
      <line x1="8" y1="2" x2="8" y2="6" />
      <line x1="3" y1="10" x2="21" y2="10" />
    </svg>
  ),
  Bell: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
      <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
      <path d="M13.73 21a2 2 0 0 1-3.46 0" />
    </svg>
  ),
  Settings: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
      <circle cx="12" cy="12" r="3" />
      <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
    </svg>
  ),
  Search: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
      <circle cx="11" cy="11" r="8" />
      <line x1="21" y1="21" x2="16.65" y2="16.65" />
    </svg>
  ),
  Plus: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
      <line x1="12" y1="5" x2="12" y2="19" />
      <line x1="5" y1="12" x2="19" y2="12" />
    </svg>
  ),
  Star: () => (
    <svg viewBox="0 0 24 24" fill="currentColor">
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  ),
  Trophy: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
      <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6" />
      <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18" />
      <path d="M4 22h16" />
      <path d="M10 14.66V17c0 .55-.45 1-1 1H7v4h10v-4h-2c-.55 0-1-.45-1-1v-2.34" />
      <path d="M4 4h16v7a8 8 0 0 1-16 0V4z" />
    </svg>
  ),
  ChevronDown: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" width="14" height="14">
      <polyline points="6 9 12 15 18 9" />
    </svg>
  )
}

// Interactive SVG Donut Component
function DonutChart({ segments, totalText, totalLabel }) {
  const size = 120
  const strokeWidth = 14
  const radius = (size - strokeWidth) / 2
  const circumference = 2 * Math.PI * radius
  
  let accumulatedPercent = 0
  
  return (
    <div className="donut-svg-wrap">
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="#f1f5f9"
          strokeWidth={strokeWidth}
        />
        {segments.map((seg, i) => {
          const dash = (seg.pct / 100) * circumference
          const gap = circumference - dash
          const offset = circumference * 0.25 - (accumulatedPercent / 100) * circumference
          accumulatedPercent += seg.pct
          
          return (
            <circle
              key={i}
              cx={size / 2}
              cy={size / 2}
              r={radius}
              fill="none"
              stroke={seg.color}
              strokeWidth={strokeWidth}
              strokeDasharray={`${dash} ${gap}`}
              strokeDashoffset={offset}
              strokeLinecap="round"
              style={{ transition: 'all 0.6s ease' }}
            />
          )
        })}
      </svg>
      <div className="donut-center-text">
        <div className="donut-center-val">{totalText}</div>
        <div className="donut-center-lbl">{totalLabel}</div>
      </div>
    </div>
  )
}

export default function App() {
  const [role, setRole] = useState('hr') // 'hr' | 'candidate' | 'institution'
  const [activeNav, setActiveNav] = useState('Dashboard')
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedRange, setSelectedRange] = useState('Oct 1, 2026 - Oct 31, 2026')
  const [alertMsg, setAlertMsg] = useState('')

  const triggerAction = (msg) => {
    setAlertMsg(msg)
    setTimeout(() => setAlertMsg(''), 3000)
  }

  // 1. HR Manager Navigation & Data
  const hrNav = [
    { name: 'Dashboard', icon: Icons.Dashboard },
    { name: 'Jobs', icon: Icons.Briefcase },
    { name: 'Candidates', icon: Icons.Users },
    { name: 'Resume Screening', icon: Icons.FileText },
    { name: 'AI Interviews', icon: Icons.Mic },
    { name: 'Reports', icon: Icons.BarChart },
    { name: 'Calendar', icon: Icons.Calendar },
    { name: 'Notifications', icon: Icons.Bell, badge: 3 },
    { name: 'Settings', icon: Icons.Settings },
  ]

  const hrApplications = [
    { id: 1, name: 'Sahil More', initial: 'SM', color: '#8b5cf6', pos: 'Frontend Developer', score: '92%', status: 'Shortlisted', date: '17 Oct 2026' },
    { id: 2, name: 'Neha Sharma', initial: 'NS', color: '#ec4899', pos: 'Data Analyst', score: '86%', status: 'Interviewed', date: '16 Oct 2026' },
    { id: 3, name: 'Onkar Shete', initial: 'OS', color: '#06b6d4', pos: 'Backend Developer', score: '78%', status: 'Shortlisted', date: '16 Oct 2026' },
    { id: 4, name: 'Priya Jadhav', initial: 'PJ', color: '#10b981', pos: 'UI/UX Designer', score: '94%', status: 'Selected', date: '15 Oct 2026' },
  ]

  const hrInterviews = [
    { initial: 'RP', color: '#6366f1', name: 'Rohan Patil', role: 'Frontend Developer', time: '10:00 AM', day: 'Today' },
    { initial: 'SK', color: '#ec4899', name: 'Sneha Kulkarni', role: 'Data Analyst', time: '11:30 AM', day: 'Today' },
    { initial: 'AJ', color: '#06b6d4', name: 'Aditya Joshi', role: 'Backend Developer', time: '09:00 AM', day: 'Tomorrow' },
    { initial: 'PD', color: '#8b5cf6', name: 'Pooja Deshmukh', role: 'UI/UX Designer', time: '02:00 PM', day: 'Tomorrow' },
  ]

  // 2. Candidate Navigation & Data
  const candidateNav = [
    { name: 'Dashboard', icon: Icons.Dashboard },
    { name: 'Find Jobs', icon: Icons.Briefcase },
    { name: 'My Applications', icon: Icons.FileText },
    { name: 'Mock Interview', icon: Icons.Mic },
    { name: 'My Resume', icon: Icons.FileText },
    { name: 'Interview History', icon: Icons.Calendar },
    { name: 'Notifications', icon: Icons.Bell },
    { name: 'Settings', icon: Icons.Settings },
  ]

  const candidateApplications = [
    { title: 'Frontend Developer', company: 'ABC Pvt Ltd', status: 'Shortlisted', date: '17 Oct 2026' },
    { title: 'Data Analyst', company: 'XYZ Solutions', status: 'Interviewed', date: '15 Oct 2026' },
    { title: 'UI/UX Designer', company: 'TechCorp', status: 'New', date: '12 Oct 2026' },
    { title: 'Backend Developer', company: 'GlobeSoft', status: 'Shortlisted', date: '10 Oct 2026' },
  ]

  // 3. Institution Navigation & Data
  const institutionNav = [
    { name: 'Dashboard', icon: Icons.Dashboard },
    { name: 'Post Job', icon: Icons.Plus },
    { name: 'Manage Jobs', icon: Icons.Briefcase },
    { name: 'Applicants', icon: Icons.Users },
    { name: 'Interview Schedule', icon: Icons.Calendar },
    { name: 'Reports', icon: Icons.BarChart },
    { name: 'Institution Profile', icon: Icons.Users },
    { name: 'Settings', icon: Icons.Settings },
  ]

  const institutionJobs = [
    { title: 'Lab Assistant', applicants: 42, status: 'Active', date: '15 Oct 2026' },
    { title: 'Frontend Developer', applicants: 86, status: 'Active', date: '10 Oct 2026' },
    { title: 'Data Analyst', applicants: 58, status: 'Closed', date: '28 Sep 2026' },
  ]

  const institutionApplicants = [
    { name: 'Sahil More', job: 'Lab Assistant', match: '88%', date: '17 Oct 2026' },
    { name: 'Neha Sharma', job: 'Data Analyst', match: '92%', date: '16 Oct 2026' },
    { name: 'Onkar Shete', job: 'Frontend Developer', match: '76%', date: '15 Oct 2026' },
  ]

  return (
    <div className="app-container">
      {/* Toast Alert */}
      {alertMsg && (
        <div style={{
          position: 'fixed',
          top: 20,
          right: 20,
          background: '#1e1b4b',
          color: 'white',
          padding: '10px 18px',
          borderRadius: 10,
          fontSize: 13,
          fontWeight: 700,
          boxShadow: '0 8px 24px rgba(0,0,0,0.2)',
          zIndex: 9999,
          display: 'flex',
          alignItems: 'center',
          gap: 8,
          border: '1px solid #4f46e5'
        }}>
          <span>⚡</span> {alertMsg}
        </div>
      )}

      {/* Sidebar Navigation */}
      <aside className="sidebar">
        <div className="brand-header">
          <div className="brand-logo-icon">TP</div>
          <div className="brand-text">TalentPulse <span>AI</span></div>
        </div>

        <nav className="sidebar-nav">
          {(role === 'hr' ? hrNav : role === 'candidate' ? candidateNav : institutionNav).map((item) => {
            const IconComponent = item.icon
            const isActive = activeNav === item.name
            return (
              <button
                key={item.name}
                className={`nav-item ${isActive ? 'active' : ''}`}
                onClick={() => {
                  setActiveNav(item.name)
                  triggerAction(`Navigated to ${item.name}`)
                }}
              >
                <IconComponent />
                <span>{item.name}</span>
                {item.badge && <span className="nav-badge">{item.badge}</span>}
              </button>
            )
          })}
        </nav>
      </aside>

      {/* Main Content Viewport */}
      <div className="main-wrapper">
        {/* Top Header Bar */}
        <header className="topbar">
          <div className="search-box">
            <span style={{ color: '#94a3b8' }}><Icons.Search /></span>
            <input
              type="text"
              placeholder={
                role === 'hr'
                  ? 'Search candidates, jobs, or keywords...'
                  : role === 'candidate'
                  ? 'Search jobs, companies, or skills...'
                  : 'Search jobs or applicants...'
              }
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <div className="topbar-actions">
            {/* Interactive Role Switcher Selector */}
            <div className="role-switcher-pill">
              <button
                className={`role-tab-btn ${role === 'hr' ? 'active' : ''}`}
                onClick={() => { setRole('hr'); setActiveNav('Dashboard'); }}
              >
                👔 HR Manager
              </button>
              <button
                className={`role-tab-btn ${role === 'candidate' ? 'active' : ''}`}
                onClick={() => { setRole('candidate'); setActiveNav('Dashboard'); }}
              >
                🎓 Candidate
              </button>
              <button
                className={`role-tab-btn ${role === 'institution' ? 'active' : ''}`}
                onClick={() => { setRole('institution'); setActiveNav('Dashboard'); }}
              >
                🏛️ Institution
              </button>
            </div>

            {/* Notification Bell */}
            <button className="icon-btn" onClick={() => triggerAction('Opening 3 unread notifications')}>
              <Icons.Bell />
              <div className="badge-dot" />
            </button>

            {/* Role-Specific User Profile Chip */}
            {role === 'hr' && (
              <div className="user-profile-badge" onClick={() => triggerAction('Profile settings: Viraj Asawle')}>
                <div className="avatar-circle">VA</div>
                <div className="user-info">
                  <div className="user-name">Viraj Asawle</div>
                  <div className="user-role">HR Manager</div>
                </div>
              </div>
            )}

            {role === 'candidate' && (
              <div className="user-profile-badge" onClick={() => triggerAction('Profile settings: Sahil More')}>
                <div className="avatar-circle" style={{ background: '#e0e7ff', color: '#4f46e5' }}>SR</div>
                <div className="user-info">
                  <div className="user-name">Sahil More</div>
                  <div className="user-role">Candidate</div>
                </div>
              </div>
            )}

            {role === 'institution' && (
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <button className="primary-action-btn" onClick={() => triggerAction('Modal: Post a New Job Posting')}>
                  <Icons.Plus /> Post New Job
                </button>
                <div className="user-profile-badge" onClick={() => triggerAction('Profile settings: PCET Pune')}>
                  <div className="avatar-circle" style={{ background: '#dbeafe', color: '#1e40af' }}>PC</div>
                  <div className="user-info">
                    <div className="user-name">PCET Pune</div>
                    <div className="user-role">Institution</div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </header>

        {/* Dashboard Body Based on Role */}
        <main className="dashboard-content">
          {/* ============================================================== */}
          {/* VIEW 1: HR MANAGER DASHBOARD (VIRAJ ASAWLE)                   */}
          {/* ============================================================== */}
          {role === 'hr' && (
            <>
              {/* Header Titles */}
              <div className="content-header">
                <div className="page-titles">
                  <h1>Dashboard</h1>
                  <p>Overview of your hiring process</p>
                </div>
                <div className="date-picker-dropdown" onClick={() => triggerAction('Date Range Filter Selected')}>
                  <Icons.Calendar />
                  <span>{selectedRange}</span>
                  <Icons.ChevronDown />
                </div>
              </div>

              {/* 4 Stat Cards */}
              <div className="kpi-grid">
                <div className="kpi-card">
                  <div className="kpi-icon-box" style={{ background: '#ede9fe', color: '#7c3aed' }}>
                    <Icons.Users />
                  </div>
                  <div className="kpi-info">
                    <span className="kpi-label">Total Candidates</span>
                    <div className="kpi-value-row">
                      <span className="kpi-value">248</span>
                      <span className="kpi-trend">↑ 12% vs last month</span>
                    </div>
                  </div>
                </div>

                <div className="kpi-card">
                  <div className="kpi-icon-box" style={{ background: '#dbeafe', color: '#2563eb' }}>
                    <Icons.Briefcase />
                  </div>
                  <div className="kpi-info">
                    <span className="kpi-label">Active Jobs</span>
                    <div className="kpi-value-row">
                      <span className="kpi-value">12</span>
                      <span className="kpi-trend">↑ 20% vs last month</span>
                    </div>
                  </div>
                </div>

                <div className="kpi-card">
                  <div className="kpi-icon-box" style={{ background: '#fce7f3', color: '#db2777' }}>
                    <Icons.FileText />
                  </div>
                  <div className="kpi-info">
                    <span className="kpi-label">Resumes Screened</span>
                    <div className="kpi-value-row">
                      <span className="kpi-value">186</span>
                      <span className="kpi-trend">↑ 28% vs last month</span>
                    </div>
                  </div>
                </div>

                <div className="kpi-card">
                  <div className="kpi-icon-box" style={{ background: '#fef3c7', color: '#d97706' }}>
                    <Icons.Star />
                  </div>
                  <div className="kpi-info">
                    <span className="kpi-label">Interviews Conducted</span>
                    <div className="kpi-value-row">
                      <span className="kpi-value">64</span>
                      <span className="kpi-trend">↑ 15% vs last month</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Middle Row: Trend, Status Donut, Upcoming Interviews */}
              <div className="grid-middle">
                {/* 1. Applications Trend Multi-bar Chart */}
                <div className="content-card">
                  <div className="card-header-row">
                    <span className="card-title">Applications Trend</span>
                    <select className="select-filter-sm">
                      <option>Last 6 Months</option>
                      <option>Last 12 Months</option>
                    </select>
                  </div>

                  <div className="barchart-container">
                    <div className="barchart-bars-wrap">
                      {[
                        { m: 'Jan', a: 16, s: 12, i: 8, sel: 5 },
                        { m: 'Feb', a: 22, s: 15, i: 10, sel: 6 },
                        { m: 'Mar', a: 19, s: 14, i: 9, sel: 4 },
                        { m: 'Apr', a: 28, s: 20, i: 14, sel: 9 },
                        { m: 'May', a: 24, s: 17, i: 12, sel: 8 },
                        { m: 'Jun', a: 34, s: 25, i: 18, sel: 12 },
                        { m: 'Jul', a: 30, s: 22, i: 16, sel: 11 },
                      ].map((bar, idx) => (
                        <div key={idx} className="bar-month-group">
                          <div className="bars-cluster">
                            <div className="bar-pill" style={{ height: `${bar.a * 3.2}px`, background: '#cbd5e1' }} title={`Applications: ${bar.a}`} />
                            <div className="bar-pill" style={{ height: `${bar.s * 3.2}px`, background: '#a78bfa' }} title={`Shortlisted: ${bar.s}`} />
                            <div className="bar-pill" style={{ height: `${bar.i * 3.2}px`, background: '#818cf8' }} title={`Interviews: ${bar.i}`} />
                            <div className="bar-pill" style={{ height: `${bar.sel * 3.2}px`, background: '#2dd4bf' }} title={`Selected: ${bar.sel}`} />
                          </div>
                          <span className="bar-label">{bar.m}</span>
                        </div>
                      ))}
                    </div>

                    <div className="chart-legend-row">
                      <div className="legend-item"><div className="legend-dot" style={{ background: '#cbd5e1' }} /> Applications</div>
                      <div className="legend-item"><div className="legend-dot" style={{ background: '#a78bfa' }} /> Shortlisted</div>
                      <div className="legend-item"><div className="legend-dot" style={{ background: '#818cf8' }} /> Interviews</div>
                      <div className="legend-item"><div className="legend-dot" style={{ background: '#2dd4bf' }} /> Selected</div>
                    </div>
                  </div>
                </div>

                {/* 2. Candidates by Status Donut */}
                <div className="content-card">
                  <div className="card-header-row">
                    <span className="card-title">Candidates by Status</span>
                  </div>

                  <div className="donut-container">
                    <DonutChart
                      segments={[
                        { pct: 37, color: '#6366f1' },
                        { pct: 27, color: '#8b5cf6' },
                        { pct: 22, color: '#06b6d4' },
                        { pct: 14, color: '#10b981' },
                      ]}
                      totalText="248"
                      totalLabel="Total"
                    />

                    <div className="donut-legend-col">
                      <div className="donut-legend-row">
                        <div className="donut-lbl-part"><div className="legend-dot" style={{ background: '#6366f1' }} /> New</div>
                        <div className="donut-count-part">92 (37%)</div>
                      </div>
                      <div className="donut-legend-row">
                        <div className="donut-lbl-part"><div className="legend-dot" style={{ background: '#8b5cf6' }} /> Shortlisted</div>
                        <div className="donut-count-part">68 (27%)</div>
                      </div>
                      <div className="donut-legend-row">
                        <div className="donut-lbl-part"><div className="legend-dot" style={{ background: '#06b6d4' }} /> Interviewed</div>
                        <div className="donut-count-part">54 (22%)</div>
                      </div>
                      <div className="donut-legend-row">
                        <div className="donut-lbl-part"><div className="legend-dot" style={{ background: '#10b981' }} /> Selected</div>
                        <div className="donut-count-part">34 (14%)</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* 3. Upcoming Interviews List */}
                <div className="content-card">
                  <div className="card-header-row">
                    <span className="card-title">Upcoming Interviews</span>
                    <button className="card-action-link" onClick={() => triggerAction('Opening Schedule Calendar')}>View All</button>
                  </div>

                  <div className="interviews-list">
                    {hrInterviews.map((item, idx) => (
                      <div key={idx} className="interview-item-row">
                        <div className="candidate-mini-info">
                          <div className="avatar-circle" style={{ background: `${item.color}15`, color: item.color }}>
                            {item.initial}
                          </div>
                          <div>
                            <div className="c-name">{item.name}</div>
                            <div className="c-role">{item.role}</div>
                          </div>
                        </div>
                        <div className="schedule-pill">
                          <span>{item.day}</span>
                          <strong>{item.time}</strong>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Bottom Row: Recent Applications Table & Recent Activity Feed */}
              <div className="grid-bottom">
                {/* 1. Recent Applications Table */}
                <div className="content-card">
                  <div className="card-header-row">
                    <span className="card-title">Recent Applications</span>
                    <button className="card-action-link" onClick={() => triggerAction('Viewing all 248 applications')}>View All</button>
                  </div>

                  <div className="data-table-wrap">
                    <table className="custom-table">
                      <thead>
                        <tr>
                          <th>Candidate</th>
                          <th>Position</th>
                          <th>Match Score</th>
                          <th>Status</th>
                          <th>Applied On</th>
                        </tr>
                      </thead>
                      <tbody>
                        {hrApplications
                          .filter(app => app.name.toLowerCase().includes(searchQuery.toLowerCase()) || app.pos.toLowerCase().includes(searchQuery.toLowerCase()))
                          .map((app) => (
                            <tr key={app.id}>
                              <td>
                                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                                  <div className="avatar-circle" style={{ background: `${app.color}15`, color: app.color, width: 30, height: 30, fontSize: 11 }}>
                                    {app.initial}
                                  </div>
                                  <span style={{ fontWeight: 700, color: '#1e1b4b' }}>{app.name}</span>
                                </div>
                              </td>
                              <td style={{ color: '#475569', fontWeight: 600 }}>{app.pos}</td>
                              <td>
                                <span className="match-score-badge">{app.score}</span>
                              </td>
                              <td>
                                <span className={`status-badge ${app.status.toLowerCase()}`}>
                                  {app.status}
                                </span>
                              </td>
                              <td style={{ color: '#64748b', fontSize: 12 }}>{app.date}</td>
                            </tr>
                          ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* 2. Recent Activity Timeline */}
                <div className="content-card">
                  <div className="card-header-row">
                    <span className="card-title">Recent Activity</span>
                    <button className="card-action-link" onClick={() => triggerAction('Viewing full activity audit logs')}>View All</button>
                  </div>

                  <div className="activity-feed-list">
                    <div className="activity-feed-item">
                      <div className="activity-icon" style={{ background: '#ede9fe', color: '#7c3aed' }}>
                        <Icons.FileText />
                      </div>
                      <div className="activity-details">
                        <div className="activity-title">New application received</div>
                        <div className="activity-desc">Sahil More applied for Frontend Developer</div>
                      </div>
                      <div className="activity-time">10 mins ago</div>
                    </div>

                    <div className="activity-feed-item">
                      <div className="activity-icon" style={{ background: '#dbeafe', color: '#2563eb' }}>
                        <Icons.Mic />
                      </div>
                      <div className="activity-details">
                        <div className="activity-title">Interview completed</div>
                        <div className="activity-desc">Neha Sharma - Data Analyst</div>
                      </div>
                      <div className="activity-time">2 hours ago</div>
                    </div>

                    <div className="activity-feed-item">
                      <div className="activity-icon" style={{ background: '#e0e7ff', color: '#4f46e5' }}>
                        <Icons.Users />
                      </div>
                      <div className="activity-details">
                        <div className="activity-title">Resume shortlisted</div>
                        <div className="activity-desc">Onkar Shete - Backend Developer</div>
                      </div>
                      <div className="activity-time">4 hours ago</div>
                    </div>

                    <div className="activity-feed-item">
                      <div className="activity-icon" style={{ background: '#fef3c7', color: '#d97706' }}>
                        <Icons.Briefcase />
                      </div>
                      <div className="activity-details">
                        <div className="activity-title">New job created</div>
                        <div className="activity-desc">UI/UX Designer (1 opening)</div>
                      </div>
                      <div className="activity-time">1 day ago</div>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}

          {/* ============================================================== */}
          {/* VIEW 2: CANDIDATE DASHBOARD (SAHIL MORE)                      */}
          {/* ============================================================== */}
          {role === 'candidate' && (
            <>
              {/* Header Titles */}
              <div className="content-header">
                <div className="page-titles">
                  <h1>Welcome back, Sahil!</h1>
                  <p>Track your applications and prepare for your next opportunity.</p>
                </div>
              </div>

              {/* 4 Stat Cards */}
              <div className="kpi-grid">
                <div className="kpi-card">
                  <div className="kpi-icon-box" style={{ background: '#ede9fe', color: '#7c3aed' }}>
                    <Icons.FileText />
                  </div>
                  <div className="kpi-info">
                    <span className="kpi-label">Applications</span>
                    <div className="kpi-value-row">
                      <span className="kpi-value">8</span>
                    </div>
                  </div>
                </div>

                <div className="kpi-card">
                  <div className="kpi-icon-box" style={{ background: '#ede9fe', color: '#8b5cf6' }}>
                    <Icons.Users />
                  </div>
                  <div className="kpi-info">
                    <span className="kpi-label">Shortlisted</span>
                    <div className="kpi-value-row">
                      <span className="kpi-value">3</span>
                    </div>
                  </div>
                </div>

                <div className="kpi-card">
                  <div className="kpi-icon-box" style={{ background: '#dbeafe', color: '#2563eb' }}>
                    <Icons.Calendar />
                  </div>
                  <div className="kpi-info">
                    <span className="kpi-label">Interviews</span>
                    <div className="kpi-value-row">
                      <span className="kpi-value">2</span>
                    </div>
                  </div>
                </div>

                <div className="kpi-card">
                  <div className="kpi-icon-box" style={{ background: '#fef3c7', color: '#d97706' }}>
                    <Icons.Trophy />
                  </div>
                  <div className="kpi-info">
                    <span className="kpi-label">Offers</span>
                    <div className="kpi-value-row">
                      <span className="kpi-value">0</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Middle Row: Status Donut + My Recent Applications */}
              <div className="grid-candidate-middle">
                <div className="content-card">
                  <div className="card-header-row">
                    <span className="card-title">Application Status</span>
                  </div>

                  <div className="donut-container">
                    <DonutChart
                      segments={[
                        { pct: 37, color: '#6366f1' },
                        { pct: 38, color: '#8b5cf6' },
                        { pct: 25, color: '#06b6d4' },
                        { pct: 0, color: '#10b981' },
                      ]}
                      totalText="8"
                      totalLabel="Total"
                    />

                    <div className="donut-legend-col">
                      <div className="donut-legend-row">
                        <div className="donut-lbl-part"><div className="legend-dot" style={{ background: '#6366f1' }} /> New</div>
                        <div className="donut-count-part">3 (37%)</div>
                      </div>
                      <div className="donut-legend-row">
                        <div className="donut-lbl-part"><div className="legend-dot" style={{ background: '#8b5cf6' }} /> Shortlisted</div>
                        <div className="donut-count-part">3 (38%)</div>
                      </div>
                      <div className="donut-legend-row">
                        <div className="donut-lbl-part"><div className="legend-dot" style={{ background: '#06b6d4' }} /> Interviewed</div>
                        <div className="donut-count-part">2 (25%)</div>
                      </div>
                      <div className="donut-legend-row">
                        <div className="donut-lbl-part"><div className="legend-dot" style={{ background: '#10b981' }} /> Offered</div>
                        <div className="donut-count-part">0 (0%)</div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="content-card">
                  <div className="card-header-row">
                    <span className="card-title">My Recent Applications</span>
                    <button className="card-action-link" onClick={() => triggerAction('Opening all applications')}>View All</button>
                  </div>

                  <div className="data-table-wrap">
                    <table className="custom-table">
                      <thead>
                        <tr>
                          <th>Job Title</th>
                          <th>Company / Institution</th>
                          <th>Status</th>
                          <th>Applied On</th>
                        </tr>
                      </thead>
                      <tbody>
                        {candidateApplications.map((item, idx) => (
                          <tr key={idx}>
                            <td style={{ fontWeight: 700, color: '#1e1b4b' }}>{item.title}</td>
                            <td style={{ color: '#475569', fontWeight: 600 }}>{item.company}</td>
                            <td>
                              <span className={`status-badge ${item.status.toLowerCase()}`}>
                                {item.status}
                              </span>
                            </td>
                            <td style={{ color: '#64748b', fontSize: 12 }}>{item.date}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>

              {/* Bottom Section: Upcoming Interviews & Recommended Jobs */}
              <div className="grid-bottom">
                <div className="content-card">
                  <div className="card-header-row">
                    <span className="card-title">Upcoming Interviews</span>
                    <button className="card-action-link" onClick={() => triggerAction('Opening schedule')}>View All</button>
                  </div>

                  <div className="upcoming-join-card">
                    <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                      <div className="kpi-icon-box" style={{ background: '#ede9fe', color: '#7c3aed', width: 42, height: 42 }}>
                        <Icons.FileText />
                      </div>
                      <div>
                        <div style={{ fontSize: 14, fontWeight: 700, color: '#1e1b4b' }}>Data Analyst</div>
                        <div style={{ fontSize: 12, color: '#64748b' }}>XYZ Solutions</div>
                      </div>
                    </div>
                    <div style={{ fontSize: 12.5, color: '#475569', fontWeight: 600 }}>
                      📅 Today, 11:30 AM <span style={{ color: '#94a3b8' }}>|</span> Online Interview
                    </div>
                    <button className="btn-join" onClick={() => triggerAction('Launching In-Browser WASM Proctored Interview Room')}>
                      Join
                    </button>
                  </div>
                </div>

                <div className="content-card">
                  <div className="card-header-row">
                    <span className="card-title">Recommended Jobs</span>
                    <button className="card-action-link" onClick={() => triggerAction('Opening jobs marketplace')}>View All</button>
                  </div>

                  <div className="recommended-job-card">
                    <div>
                      <div style={{ fontSize: 14, fontWeight: 700, color: '#1e1b4b' }}>Frontend Developer</div>
                      <div style={{ fontSize: 12, color: '#64748b', marginBottom: 6 }}>TechCorp — Pune, Maharashtra</div>
                      <div>
                        <span className="skill-tag">React</span>
                        <span className="skill-tag">JavaScript</span>
                        <span className="skill-tag">2-4 Years</span>
                      </div>
                    </div>
                    <button className="btn-join" style={{ background: '#6366f1' }} onClick={() => triggerAction('Applied to TechCorp Frontend Developer')}>
                      Apply
                    </button>
                  </div>
                </div>
              </div>
            </>
          )}

          {/* ============================================================== */}
          {/* VIEW 3: INSTITUTION DASHBOARD (PCET PUNE)                     */}
          {/* ============================================================== */}
          {role === 'institution' && (
            <>
              {/* Header Titles */}
              <div className="content-header">
                <div className="page-titles">
                  <h1>Welcome, PCET Pune!</h1>
                  <p>Manage your job postings and view applicant insights.</p>
                </div>
              </div>

              {/* 4 Stat Cards */}
              <div className="kpi-grid">
                <div className="kpi-card">
                  <div className="kpi-icon-box" style={{ background: '#dbeafe', color: '#2563eb' }}>
                    <Icons.Briefcase />
                  </div>
                  <div className="kpi-info">
                    <span className="kpi-label">Total Jobs</span>
                    <div className="kpi-value-row">
                      <span className="kpi-value">6</span>
                    </div>
                  </div>
                </div>

                <div className="kpi-card">
                  <div className="kpi-icon-box" style={{ background: '#ede9fe', color: '#7c3aed' }}>
                    <Icons.Users />
                  </div>
                  <div className="kpi-info">
                    <span className="kpi-label">Total Applicants</span>
                    <div className="kpi-value-row">
                      <span className="kpi-value">320</span>
                    </div>
                  </div>
                </div>

                <div className="kpi-card">
                  <div className="kpi-icon-box" style={{ background: '#ede9fe', color: '#8b5cf6' }}>
                    <Icons.FileText />
                  </div>
                  <div className="kpi-info">
                    <span className="kpi-label">Active Jobs</span>
                    <div className="kpi-value-row">
                      <span className="kpi-value">4</span>
                    </div>
                  </div>
                </div>

                <div className="kpi-card">
                  <div className="kpi-icon-box" style={{ background: '#fef3c7', color: '#d97706' }}>
                    <Icons.Trophy />
                  </div>
                  <div className="kpi-info">
                    <span className="kpi-label">Hired Candidates</span>
                    <div className="kpi-value-row">
                      <span className="kpi-value">12</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Middle Row: Applicants Overview + Jobs by Status */}
              <div className="grid-institution-middle">
                <div className="content-card">
                  <div className="card-header-row">
                    <span className="card-title">Applicants Overview</span>
                    <select className="select-filter-sm">
                      <option>Last 6 Months</option>
                    </select>
                  </div>

                  <div className="barchart-container">
                    <div className="barchart-bars-wrap">
                      {[
                        { m: 'Jan', t: 40, s: 18 },
                        { m: 'Feb', t: 55, s: 26 },
                        { m: 'Mar', t: 48, s: 22 },
                        { m: 'Apr', t: 65, s: 32 },
                        { m: 'May', t: 50, s: 24 },
                        { m: 'Jun', t: 80, s: 42 },
                      ].map((bar, idx) => (
                        <div key={idx} className="bar-month-group">
                          <div className="bars-cluster">
                            <div className="bar-pill" style={{ height: `${bar.t * 1.3}px`, background: '#cbd5e1' }} title={`Applicants: ${bar.t}`} />
                            <div className="bar-pill" style={{ height: `${bar.s * 1.3}px`, background: '#818cf8' }} title={`Shortlisted: ${bar.s}`} />
                          </div>
                          <span className="bar-label">{bar.m}</span>
                        </div>
                      ))}
                    </div>

                    <div className="chart-legend-row">
                      <div className="legend-item"><div className="legend-dot" style={{ background: '#cbd5e1' }} /> Total Applicants</div>
                      <div className="legend-item"><div className="legend-dot" style={{ background: '#818cf8' }} /> Shortlisted</div>
                    </div>
                  </div>
                </div>

                <div className="content-card">
                  <div className="card-header-row">
                    <span className="card-title">Jobs by Status</span>
                  </div>

                  <div className="donut-container">
                    <DonutChart
                      segments={[
                        { pct: 67, color: '#6366f1' },
                        { pct: 17, color: '#94a3b8' },
                        { pct: 16, color: '#cbd5e1' },
                      ]}
                      totalText="6"
                      totalLabel="Total"
                    />

                    <div className="donut-legend-col">
                      <div className="donut-legend-row">
                        <div className="donut-lbl-part"><div className="legend-dot" style={{ background: '#6366f1' }} /> Active</div>
                        <div className="donut-count-part">4 (67%)</div>
                      </div>
                      <div className="donut-legend-row">
                        <div className="donut-lbl-part"><div className="legend-dot" style={{ background: '#94a3b8' }} /> Closed</div>
                        <div className="donut-count-part">1 (17%)</div>
                      </div>
                      <div className="donut-legend-row">
                        <div className="donut-lbl-part"><div className="legend-dot" style={{ background: '#cbd5e1' }} /> Draft</div>
                        <div className="donut-count-part">1 (16%)</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Bottom Row: Recent Job Postings & Recent Applicants */}
              <div className="grid-bottom">
                <div className="content-card">
                  <div className="card-header-row">
                    <span className="card-title">Recent Job Postings</span>
                    <button className="card-action-link" onClick={() => triggerAction('Opening all job postings')}>View All</button>
                  </div>

                  <div className="data-table-wrap">
                    <table className="custom-table">
                      <thead>
                        <tr>
                          <th>Job Title</th>
                          <th>Applicants</th>
                          <th>Status</th>
                          <th>Posted On</th>
                        </tr>
                      </thead>
                      <tbody>
                        {institutionJobs.map((item, idx) => (
                          <tr key={idx}>
                            <td style={{ fontWeight: 700, color: '#1e1b4b' }}>{item.title}</td>
                            <td style={{ color: '#475569', fontWeight: 600 }}>{item.applicants}</td>
                            <td>
                              <span className={`status-badge ${item.status.toLowerCase()}`}>
                                {item.status}
                              </span>
                            </td>
                            <td style={{ color: '#64748b', fontSize: 12 }}>{item.date}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                <div className="content-card">
                  <div className="card-header-row">
                    <span className="card-title">Recent Applicants</span>
                    <button className="card-action-link" onClick={() => triggerAction('Opening all candidates')}>View All</button>
                  </div>

                  <div className="data-table-wrap">
                    <table className="custom-table">
                      <thead>
                        <tr>
                          <th>Candidate</th>
                          <th>Job Title</th>
                          <th>Match</th>
                          <th>Applied On</th>
                        </tr>
                      </thead>
                      <tbody>
                        {institutionApplicants.map((item, idx) => (
                          <tr key={idx}>
                            <td style={{ fontWeight: 700, color: '#1e1b4b' }}>{item.name}</td>
                            <td style={{ color: '#475569', fontWeight: 600 }}>{item.job}</td>
                            <td>
                              <span className="match-score-badge">{item.match}</span>
                            </td>
                            <td style={{ color: '#64748b', fontSize: 12 }}>{item.date}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </>
          )}
        </main>
      </div>
    </div>
  )
}
