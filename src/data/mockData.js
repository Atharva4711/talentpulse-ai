// Mock Datasets & Question Banks for AutoHire AI

export const MNC_JOB_DRIVES = [
  {
    id: 'amazon-sde',
    company: 'Amazon',
    role: 'Software Development Engineer - I (Campus Graduate)',
    tier: 'Tier 1 MNC (Product)',
    ctc: '₹28 - 34 LPA',
    location: 'Bangalore / Hyderabad / Pune',
    badgeColor: 'border-amber-500/40 text-amber-400 bg-amber-500/10',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/4/4a/Amazon_icon.svg',
    description: 'Looking for high-caliber CS graduates to build high-scale distributed backend systems, microservices, and customer-facing cloud solutions.',
    requiredHardSkills: ['Data Structures', 'Algorithms', 'Java', 'Python', 'AWS', 'Microservices', 'Distributed Systems', 'System Design', 'SQL', 'Docker'],
    requiredSoftSkills: ['Customer Obsession', 'Ownership', 'Deep Dive', 'Conflict Resolution', 'Bias for Action'],
    minAtsScore: 75,
    minTechScore: 75,
    interviewStages: ['ATS Screening', 'Online Assessment (DSA + CS Core)', 'Multimodal AI HR & Behavioral Round']
  },
  {
    id: 'tcs-digital',
    company: 'Tata Consultancy Services',
    role: 'TCS Digital / Prime Systems Engineer',
    tier: 'Tier 1 MNC (Enterprise)',
    ctc: '₹9 - 11.5 LPA',
    location: 'PAN India (Multiple Hubs)',
    badgeColor: 'border-blue-500/40 text-blue-400 bg-blue-500/10',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/b/b1/Tata_Consultancy_Services_Logo.svg',
    description: 'Premier engineering track for forward-thinking college graduates focused on Full Stack Web, Cloud Computing, Artificial Intelligence, and Modern DevOps.',
    requiredHardSkills: ['Java', 'C++', 'Python', 'React', 'Node.js', 'SQL', 'Database Management', 'Object Oriented Programming', 'Git'],
    requiredSoftSkills: ['Teamwork', 'Agile Mindset', 'Effective Communication', 'Problem Solving'],
    minAtsScore: 65,
    minTechScore: 65,
    interviewStages: ['ATS Screening', 'Digital Aptitude & Coding Round', 'HR & Managerial Interview']
  },
  {
    id: 'infosys-sp',
    company: 'Infosys',
    role: 'Specialist Programmer (Power Programmer)',
    tier: 'Tier 1 MNC (Specialist)',
    ctc: '₹9.5 - 14 LPA',
    location: 'Bangalore / Mysore / Pune',
    badgeColor: 'border-indigo-500/40 text-indigo-400 bg-indigo-500/10',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/9/95/Infosys_logo.svg',
    description: 'Elite programming role designed for competitive coders, open-source contributors, and algorithmic problem-solvers solving complex computational challenges.',
    requiredHardSkills: ['Data Structures', 'Dynamic Programming', 'Graph Theory', 'Algorithms', 'C++', 'Java', 'Python', 'Competitive Coding'],
    requiredSoftSkills: ['Analytical Rigor', 'Adaptability', 'Speed & Precision', 'Clear Articulation'],
    minAtsScore: 70,
    minTechScore: 70,
    interviewStages: ['ATS Screening', 'Advanced Coding Test', 'Technical & HR Viva']
  },
  {
    id: 'fintech-associate',
    company: 'Nexus FinTech Global',
    role: 'Full Stack Software Associate',
    tier: 'Tier 1 MNC (FinTech)',
    ctc: '₹18 - 22 LPA',
    location: 'Mumbai / Gurgaon / Hybrid',
    badgeColor: 'border-emerald-500/40 text-emerald-400 bg-emerald-500/10',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/e/e1/GitLab_logo.svg',
    description: 'High-frequency transactional banking architecture, web applications, real-time analytics pipelines, and secure financial APIs.',
    requiredHardSkills: ['React', 'TypeScript', 'Node.js', 'PostgreSQL', 'Redis', 'Docker', 'RESTful APIs', 'Microservices', 'Jest'],
    requiredSoftSkills: ['Security Mindset', 'Attention to Detail', 'Stakeholder Communication', 'Accountability'],
    minAtsScore: 72,
    minTechScore: 70,
    interviewStages: ['ATS Screening', 'Full-Stack Practical Challenge', 'AI Behavioral Fit Round']
  }
];

export const BENCHMARK_RESUMES = {
  highMatch: {
    id: 'high-match',
    name: 'Aarav Sharma (High-Match Candidate - 92% ATS)',
    badge: 'Ideal Benchmark',
    badgeColor: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/30',
    rawText: `AARAV SHARMA
Email: aarav.sharma.cs@college.edu | Phone: +91 98765 43210
LinkedIn: linkedin.com/in/aarav-sharma-dev | GitHub: github.com/aarav-sharma-tech
Portfolio: https://aaravsharma.dev

EDUCATION
Bachelor of Technology in Computer Science & Engineering (2021 - 2025)
ABC Institute of Technology — CGPA: 9.12 / 10.0

TECHNICAL SKILLS
Languages: Java, Python, C++, TypeScript, JavaScript, SQL
Frontend: React, Next.js, Tailwind CSS, Redux Toolkit
Backend: Node.js, Express, Microservices, RESTful APIs, GraphQL
Databases & Cloud: PostgreSQL, MongoDB, Redis, AWS (S3, EC2, Lambda), Docker, CI/CD pipelines
Concepts: Data Structures & Algorithms, System Design, Object-Oriented Programming, Database Management

PROFESSIONAL EXPERIENCE & INTERNSHIPS
Software Engineering Intern | CloudScale Technologies (Jan 2024 - Jun 2024)
- Architected high-throughput microservices using Node.js, Express, and Redis, reducing average API response latency by 42%.
- Integrated Docker and AWS EC2 automated deployment pipelines, increasing team release frequency by 35%.
- Implemented robust SQL queries and indexing in PostgreSQL, boosting query execution performance for 500,000+ daily records.
- Collaborated in an Agile squad of 8 engineers, leading daily standups and sprint retrospectives.

KEY TECHNICAL PROJECTS
Distributed E-Commerce Engine | Java, Spring Boot, React, Kafka, Docker
- Engineered a scalable event-driven order processing system handling 1,500+ simulated concurrent transactions per second.
- Implemented distributed locking mechanisms using Redis, eliminating race conditions in concurrent inventory deductions.
- Achieved 99.8% uptime across load testing suites using Apache JMeter.

Campus Placement Portal | React, Node.js, Tailwind CSS, MongoDB
- Developed a comprehensive placement management web application serving 2,400+ undergraduate students and 45 corporate recruiters.
- Automated resume parsing and eligibility filtering, cutting placement cell administrative processing time by 60%.

ACHIEVEMENTS & CERTIFICATIONS
- Secured Rank 412 out of 45,000+ participants in TCS CodeVita Season 12.
- AWS Certified Cloud Practitioner (Validation ID: AWS-89234812).
- LeetCode 500+ Questions Solved | Knight Badge (Top 4.2% globally).`
  },

  averageMatch: {
    id: 'average-match',
    name: 'Rohan Verma (Average Candidate - 68% ATS)',
    badge: 'Borderline Match',
    badgeColor: 'text-amber-400 bg-amber-500/10 border-amber-500/30',
    rawText: `ROHAN VERMA
Email: rohan.verma@gmail.com | Phone: 9811122334
Location: Delhi, India

OBJECTIVE
Passionate student looking for a software engineering position in a reputed MNC where I can apply my programming skills and grow my technical abilities.

EDUCATION
B.Tech in Computer Science (2021 - 2025)
State Engineering College — 74% Marks

SKILLS
- Programming: C, C++, Java, HTML, CSS, JavaScript, basic Python
- Database: MySQL, DBMS concepts
- Tools: VS Code, Git, Eclipse

PROJECTS
Online Bookstore Website
- Built a website for purchasing books online using HTML, CSS, JavaScript, and PHP.
- Created MySQL database tables for storing user info and book catalogs.
- Added a shopping cart feature and basic checkout page.

Weather Forecast App
- Developed a web application using JavaScript that fetches current weather from an external API.
- Showed temperature, humidity, and wind speed on a dashboard.

EXTRA CURRICULAR
- Member of the college coding club.
- Participated in college technical fest web designing competition.`
  },

  lowMatch: {
    id: 'low-match',
    name: 'Vikram Patel (Low-Match / Flawed ATS - 41%)',
    badge: 'High Red Flags',
    badgeColor: 'text-red-400 bg-red-500/10 border-red-500/30',
    rawText: `RESUME OF VIKRAM PATEL
Phone: 9988776655
(No Email Provided, No GitHub link, No LinkedIn URL)

SUMMARY
I am a hard worker with good communication skills who wants to work in computer technology.

ACADEMICS
10th: 82%
12th: 68%
College: Engineering degree in progress

EXPERIENCE
None yet. Looking for opportunity.

SKILLS TABLE
Programming: MS Office, PowerPoint, Basic C language, Turbo C++, Windows OS.

HOBBIES
Playing cricket, listening to music, watching tech podcasts.`
  }
};

export const TECHNICAL_QUESTIONS = [
  {
    id: 'q1',
    category: 'Operating Systems & Concurrency',
    difficulty: 'Medium',
    question: 'In modern OS design, which condition is NOT one of the 4 Coffman conditions required for a Deadlock to occur?',
    options: [
      'Mutual Exclusion',
      'Hold and Wait',
      'Preemptive Resource Allocation',
      'Circular Wait'
    ],
    correctAnswer: 2,
    explanation: 'The 4 Coffman conditions are Mutual Exclusion, Hold and Wait, No Preemption (resources cannot be forcibly confiscated), and Circular Wait. If Preemption is allowed, deadlocks are prevented!'
  },
  {
    id: 'q2',
    category: 'Database Management Systems',
    difficulty: 'Medium',
    question: 'Why do relational databases like PostgreSQL and MySQL InnoDB use B+ Trees rather than standard Binary Search Trees for disk-based indexing?',
    options: [
      'B+ Trees require less memory to store keys than BSTs',
      'B+ Trees have high fan-out (branching factor), drastically reducing disk I/O seek operations for large datasets',
      'Binary Search Trees do not support alphabetical string searches',
      'B+ Trees prevent all SQL injection vulnerabilities automatically'
    ],
    correctAnswer: 1,
    explanation: 'Disk I/O seeks are the biggest bottleneck in database lookups. B+ Trees have a high fan-out (often 100-200 children per node), allowing billions of rows to be traversed in only 3 to 4 disk reads.'
  },
  {
    id: 'q3',
    category: 'Data Structures & Algorithms',
    difficulty: 'Hard',
    question: 'Consider a Hash Table that handles collisions via Open Addressing with Linear Probing. What is the average time complexity of Search when the Load Factor (α) approaches 1.0?',
    options: [
      'O(1) strictly constant time',
      'O(log N) logarithmic time',
      'Degrades toward O(N) linear time due to primary clustering',
      'O(N log N) linearithmic time'
    ],
    correctAnswer: 2,
    explanation: 'When the load factor approaches 1 in linear probing, continuous occupied slots coalesce into large clusters (primary clustering). Long probe sequences cause search times to degrade from O(1) toward O(N).'
  },
  {
    id: 'q4',
    category: 'Computer Networks & Security',
    difficulty: 'Easy',
    question: 'During a standard TCP 3-Way Handshake between a client and an MNC server, what are the exact flags sent in sequence?',
    options: [
      'Client: ACK -> Server: SYN -> Client: FIN',
      'Client: SYN -> Server: SYN-ACK -> Client: ACK',
      'Client: PING -> Server: PONG -> Client: ESTABLISHED',
      'Client: RST -> Server: SYN -> Client: ACK'
    ],
    correctAnswer: 1,
    explanation: 'The standard TCP 3-way handshake begins with the client sending a SYN packet, the server responding with a SYN-ACK packet, and the client confirming with an ACK packet.'
  }
];

export const CODING_CHALLENGE = {
  title: 'Two Sum: High-Throughput Order Identifier',
  difficulty: 'MNC Screening Standard (Medium)',
  timeLimitSeconds: 600,
  description: `Given an array of integers 'nums' and an integer 'target', return the indices of the two numbers such that they add up to 'target'. You may assume that each input has exactly one solution, and you may not use the same element twice.
  
To pass the MNC algorithmic cutoff, implement an optimal O(N) solution using a Hash Map rather than an O(N²) nested loop.`,
  starterCode: `function twoSum(nums, target) {
  // Write your optimal O(N) solution here
  const map = new Map();
  
  for (let i = 0; i < nums.length; i++) {
    const complement = target - nums[i];
    if (map.has(complement)) {
      return [map.get(complement), i];
    }
    map.set(nums[i], i);
  }
  
  return [];
}`,
  testCases: [
    { input: 'nums = [2, 7, 11, 15], target = 9', nums: [2, 7, 11, 15], target: 9, expected: [0, 1] },
    { input: 'nums = [3, 2, 4], target = 6', nums: [3, 2, 4], target: 6, expected: [1, 2] },
    { input: 'nums = [3, 3], target = 6', nums: [3, 3], target: 6, expected: [0, 1] },
    { input: 'nums = [1, 5, 8, 12, 19, 23], target = 27', nums: [1, 5, 8, 12, 19, 23], target: 27, expected: [2, 4] }
  ]
};

export const HR_INTERVIEW_QUESTIONS = [
  {
    id: 1,
    stage: 'Stage 1: Professional Icebreaker',
    question: "Welcome to your campus placement interview! To begin, please walk me through your engineering journey, the core technologies you specialize in, and what drove your passion for software development.",
    idealPoints: ['Clear structured narrative', 'Specific technical passions', 'Concise summary of projects and learning agility'],
    sampleFollowUp: "That's a solid foundation. Can you highlight which software architecture patterns you feel most confident designing?"
  },
  {
    id: 2,
    stage: 'Stage 2: Technical Project Deep-Dive',
    question: "Tell me about the most technically challenging software project you have built. What was the core architectural bottleneck or bug you faced, and how specifically did you resolve it?",
    idealPoints: ['Concrete technical details', 'Clear explanation of the problem & metrics', 'Demonstrates debugging tenacity'],
    sampleFollowUp: "Great technical breakdown. How did you verify that your fix didn't introduce regressions or scalability limits?"
  },
  {
    id: 3,
    stage: 'Stage 3: Behavioral STAR Framework',
    question: "Describe a situation during a team hackathon or college group project where a teammate disagreed strongly with your technical proposal. How did you manage the conflict and what was the ultimate outcome?",
    idealPoints: ['Follows STAR method (Situation, Task, Action, Result)', 'High emotional intelligence & active listening', 'Constructive collaboration'],
    sampleFollowUp: "Handling disagreements objectively is essential in our engineering culture. What would you do differently if faced with that situation today?"
  },
  {
    id: 4,
    stage: 'Stage 4: Situational & Company Fit',
    question: "Imagine you are assigned to an enterprise production release with a tight deadline, and you discover an intermittent latency bug 4 hours before deployment. How do you prioritize, communicate, and act?",
    idealPoints: ['Prioritizes production stability and customer trust', 'Transparent communication to leadership', 'Systematic root-cause containment'],
    sampleFollowUp: "Excellent risk management judgment. That concludes our questions for this round!"
  }
];

export const INITIAL_TPO_CANDIDATES = [
  {
    id: 'cand-001',
    name: 'Aarav Sharma',
    rollNo: '21CS042',
    email: 'aarav.sharma.cs@college.edu',
    driveApplied: 'Amazon SDE-1 (Campus Graduate)',
    atsScore: 92,
    technicalScore: 95,
    interviewScore: 88,
    eyeContactRatio: 94,
    speechWpm: 132,
    fillerWordsCount: 3,
    verdict: 'Strong Hire',
    status: 'Shortlisted',
    date: '2026-09-24',
    radarMetrics: {
      atsMatch: 92,
      technicalDepth: 95,
      communicationClarity: 88,
      eyeContactConfidence: 94,
      starMethodology: 90
    }
  },
  {
    id: 'cand-002',
    name: 'Priya Iyer',
    rollNo: '21IT019',
    email: 'priya.iyer@college.edu',
    driveApplied: 'Nexus FinTech Global',
    atsScore: 88,
    technicalScore: 90,
    interviewScore: 85,
    eyeContactRatio: 89,
    speechWpm: 128,
    fillerWordsCount: 5,
    verdict: 'Strong Hire',
    status: 'Shortlisted',
    date: '2026-09-23',
    radarMetrics: {
      atsMatch: 88,
      technicalDepth: 90,
      communicationClarity: 85,
      eyeContactConfidence: 89,
      starMethodology: 84
    }
  },
  {
    id: 'cand-003',
    name: 'Rohan Verma',
    rollNo: '21CS089',
    email: 'rohan.verma@college.edu',
    driveApplied: 'TCS Digital / Prime Systems Engineer',
    atsScore: 68,
    technicalScore: 72,
    interviewScore: 64,
    eyeContactRatio: 71,
    speechWpm: 158,
    fillerWordsCount: 14,
    verdict: 'Hire with Training',
    status: 'Under Review',
    date: '2026-09-22',
    radarMetrics: {
      atsMatch: 68,
      technicalDepth: 72,
      communicationClarity: 64,
      eyeContactConfidence: 71,
      starMethodology: 60
    }
  },
  {
    id: 'cand-004',
    name: 'Ananya Mukherjee',
    rollNo: '21CS015',
    email: 'ananya.m@college.edu',
    driveApplied: 'Infosys Specialist Programmer',
    atsScore: 84,
    technicalScore: 92,
    interviewScore: 79,
    eyeContactRatio: 82,
    speechWpm: 135,
    fillerWordsCount: 6,
    verdict: 'Strong Hire',
    status: 'Shortlisted',
    date: '2026-09-21',
    radarMetrics: {
      atsMatch: 84,
      technicalDepth: 92,
      communicationClarity: 79,
      eyeContactConfidence: 82,
      starMethodology: 80
    }
  },
  {
    id: 'cand-005',
    name: 'Vikram Patel',
    rollNo: '21ME102',
    email: 'vikram.p@college.edu',
    driveApplied: 'TCS Digital / Prime Systems Engineer',
    atsScore: 41,
    technicalScore: 48,
    interviewScore: 50,
    eyeContactRatio: 52,
    speechWpm: 175,
    fillerWordsCount: 22,
    verdict: 'Needs Improvement',
    status: 'Rejected',
    date: '2026-09-20',
    radarMetrics: {
      atsMatch: 41,
      technicalDepth: 48,
      communicationClarity: 50,
      eyeContactConfidence: 52,
      starMethodology: 45
    }
  }
];
