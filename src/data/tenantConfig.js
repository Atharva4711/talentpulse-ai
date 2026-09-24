// Client-Specific B2B Recruitment Software
// The hiring organization (College or Company HR) uses this software to screen and recruit their own employees.

export const CLIENT_TENANTS = {
  college_polytechnic: {
    id: 'college_polytechnic',
    name: 'Government Polytechnic Institute',
    clientType: 'College / Academic Institution',
    department: 'Human Resources & Faculty Recruitment Cell',
    tagline: 'Institutional Staff & Faculty Recruitment Platform',
    vendorBadge: 'Software Provider: Atharva Tech Solutions',
    division: 'Academic & Administrative Staff Recruitment',
    licenseStatus: 'Active Multi-Seat Institutional License',
    hrRoleLabel: 'College HR',
    candidatePoolLabel: '85 Staff Applicants',
    openingsCountLabel: '4 Active Positions',
    openingsHeader: 'Official Faculty & Technical Staff Vacancies',
    openingsSubtext: 'Apply for academic, engineering, and administrative technical roles at Government Polytechnic Institute.',
    hrDashboardTitle: 'College HR & Recruitment Command Center',
    openings: [
      {
        id: 'lecturer-it',
        title: 'Lecturer in Information Technology',
        department: 'Department of Information Technology',
        type: 'Full-Time / Institutional Faculty',
        salary: '₹55,000 - 75,000 / month',
        location: 'Main Campus, IT Block',
        description: 'Seeking dynamic educators and engineers to deliver core coursework in Web Development, Database Management, and Data Structures to diploma candidates.',
        requiredHardSkills: ['JavaScript', 'Data Structures', 'Database Management', 'Object Oriented Programming', 'Web Technologies', 'Python'],
        requiredSoftSkills: ['Pedagogy', 'Classroom Communication', 'Mentorship', 'Student Guidance'],
        minAtsScore: 70,
        minTechScore: 70,
        interviewStages: ['ATS Resume Evaluation', 'Subject Matter Technical Round', 'Pedagogical & HR Interview']
      },
      {
        id: 'junior-dev-college',
        title: 'Junior Software & ERP Developer',
        department: 'College Digital Campus & IT Cell',
        type: 'Full-Time Technical Staff',
        salary: '₹40,000 - 55,000 / month',
        location: 'Campus IT Administration',
        description: 'Responsible for maintaining institutional student portals, campus management ERP systems, examination databases, and modern web services.',
        requiredHardSkills: ['React', 'Node.js', 'SQL', 'Git', 'REST APIs', 'Database Administration'],
        requiredSoftSkills: ['Problem Solving', 'Task Ownership', 'Clear Communication'],
        minAtsScore: 65,
        minTechScore: 65,
        interviewStages: ['ATS Resume Evaluation', 'Hands-On Code Sandbox Round', 'HR & Culture Fit Round']
      },
      {
        id: 'sysadmin-net',
        title: 'System Administrator & Network Engineer',
        department: 'Campus Infrastructure & Server Room',
        type: 'Full-Time Technical Staff',
        salary: '₹38,000 - 50,000 / month',
        location: 'Central Server Facility',
        description: 'Managing campus high-speed LAN/WAN networks, server virtualization, Linux system administration, and computer laboratory maintenance.',
        requiredHardSkills: ['Linux', 'Computer Networks', 'TCP/IP', 'Server Administration', 'Firewall Security', 'Hardware Maintenance'],
        requiredSoftSkills: ['Incident Response', 'Troubleshooting', 'Documentation'],
        minAtsScore: 65,
        minTechScore: 60,
        interviewStages: ['ATS Resume Evaluation', 'Infrastructure Diagnostic Round', 'HR Managerial Round']
      },
      {
        id: 'lab-assistant-cs',
        title: 'Computer Lab Technical Assistant',
        department: 'Computer Engineering Department',
        type: 'Technical Support Staff',
        salary: '₹30,000 - 42,000 / month',
        location: 'Computer Laboratories',
        description: 'Assisting faculty during practical programming sessions, operating system installation, software licensing, and student lab guidance.',
        requiredHardSkills: ['C++', 'Java', 'Python', 'Linux Basics', 'Hardware Diagnostics', 'Software Installation'],
        requiredSoftSkills: ['Patience', 'Student Support', 'Lab Coordination'],
        minAtsScore: 60,
        minTechScore: 60,
        interviewStages: ['ATS Resume Evaluation', 'Lab Diagnostic Test', 'HR Interview']
      }
    ]
  },
  corporate_tech: {
    id: 'corporate_tech',
    name: 'Apex Software Systems',
    clientType: 'Corporate Enterprise / Tech Company',
    department: 'Human Resources & Talent Acquisition Division',
    tagline: 'Corporate Engineering Hiring & Assessment Suite',
    vendorBadge: 'Software Provider: Atharva Tech Solutions',
    division: 'Enterprise Software & Cloud Engineering Division',
    licenseStatus: 'Active Enterprise Production License',
    hrRoleLabel: 'Company HR',
    candidatePoolLabel: '140 Engineering Applicants',
    openingsCountLabel: '2 Active Positions',
    openingsHeader: 'Corporate Engineering & Product Openings',
    openingsSubtext: 'Direct recruitment for engineering, product, and cloud infrastructure teams at Apex Software Systems.',
    hrDashboardTitle: 'Company HR & Talent Acquisition Command Center',
    openings: [
      {
        id: 'junior-sde',
        title: 'Associate Software Engineer (Full Stack)',
        department: 'Core Product Engineering',
        type: 'Full-Time Corporate Hire',
        salary: '₹8.0 - 12.0 LPA',
        location: 'Tech Park / Hybrid',
        description: 'Build robust web applications, scalable REST APIs, microservices, and customer-facing responsive user interfaces.',
        requiredHardSkills: ['JavaScript', 'React', 'Node.js', 'PostgreSQL', 'Docker', 'Git', 'Data Structures', 'REST APIs'],
        requiredSoftSkills: ['Fast Learner', 'Collaboration', 'Effective Communication', 'Ownership'],
        minAtsScore: 70,
        minTechScore: 70,
        interviewStages: ['ATS Resume Screening', 'Algorithmic Coding Round', 'Multimodal HR & Behavioral Round']
      },
      {
        id: 'cloud-backend-eng',
        title: 'Backend & Cloud Systems Engineer',
        department: 'Platform & Infrastructure Team',
        type: 'Full-Time Corporate Hire',
        salary: '₹10.0 - 15.0 LPA',
        location: 'Tech Park / Bangalore',
        description: 'Design and deploy high-throughput microservices, distributed cache architectures, and automated cloud pipelines.',
        requiredHardSkills: ['Python', 'Java', 'AWS', 'Docker', 'PostgreSQL', 'Distributed Systems', 'Redis'],
        requiredSoftSkills: ['System Thinking', 'Analytical Mindset', 'Teamwork'],
        minAtsScore: 75,
        minTechScore: 75,
        interviewStages: ['ATS Resume Screening', 'System Coding Round', 'Technical HR Interview']
      }
    ]
  }
};
