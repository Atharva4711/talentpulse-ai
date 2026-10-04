/**
 * TalentPulse AI — Master MongoDB Atlas Database Cleaner & Seeder
 * Developed for Atharva Teli (Database Lead)
 */

const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');

// Load environment variables
dotenv.config({ path: path.join(__dirname, '../.env') });

const User = require('../models/User');
const JobOpening = require('../models/JobOpening');
const Candidate = require('../models/Candidate');
const Evaluation = require('../models/Evaluation');
const OfficialLetter = require('../models/OfficialLetter');

const MONGO_URI = process.env.MONGODB_URI || "mongodb+srv://AtharvaTeli:talentpulse.ai@cluster0.rek0ioo.mongodb.net/talentpulse_db?retryWrites=true&w=majority&appName=Cluster0";

const cleanAndSeed = async () => {
  try {
    console.log('================================================================');
    console.log('🚀 TalentPulse AI — Connecting to MongoDB Atlas Cloud Cluster...');
    console.log('================================================================');

    await mongoose.connect(MONGO_URI, {
      serverSelectionTimeoutMS: 5000,
      tls: true,
      tlsAllowInvalidCertificates: true
    });

    console.log(`✅ Connected to Database: '${mongoose.connection.name}' on Atlas Cluster0`);
    console.log('\n🧹 [Step 1] Cleaning old collections and resetting indexes...');

    // Drop previous collections cleanly if they exist
    await User.deleteMany({});
    await JobOpening.deleteMany({});
    await Candidate.deleteMany({});
    await Evaluation.deleteMany({});
    await OfficialLetter.deleteMany({});
    console.log('✅ Collections purged of messy test data.');

    // -------------------------------------------------------------
    // 1. SEED USERS (Authentication & Role-Based Access)
    // -------------------------------------------------------------
    console.log('\n👥 [Step 2] Seeding Users with Role-Based Access Control...');
    const users = [
      {
        user_id: 'USR-CAND-01',
        name: 'Sarah Jones',
        email: 'sarah.jones@example.com',
        password: 'Password@123', // In production, hash with bcrypt
        role: 'candidate',
        tenant_id: 'govt_polytechnic',
        phone: '+91 98234 56781'
      },
      {
        user_id: 'USR-HR-01',
        name: 'Dr. V. K. Patil (Principal & Head HR)',
        email: 'principal@govtpoly.ac.in',
        password: 'AdminPassword@2026',
        role: 'hr_recruiter',
        tenant_id: 'govt_polytechnic',
        phone: '+91 94220 11223'
      },
      {
        user_id: 'USR-CAND-02',
        name: 'Priya Sharma',
        email: 'priya.sharma@apex.internal',
        password: 'Password@123',
        role: 'candidate',
        tenant_id: 'apex_systems',
        phone: '+91 98112 33445'
      },
      {
        user_id: 'USR-HR-02',
        name: 'Vikram Mehta (Talent Acquisition Lead)',
        email: 'hr@apexsystems.com',
        password: 'ApexLead@2026',
        role: 'hr_recruiter',
        tenant_id: 'apex_systems',
        phone: '+91 98990 44556'
      },
      {
        user_id: 'USR-ADMIN-01',
        name: 'Atharva Teli (System & Database Admin)',
        email: 'atharva.teli4711@gmail.com',
        password: 'SuperAdmin@2026',
        role: 'admin',
        tenant_id: 'govt_polytechnic',
        phone: '+91 99999 88888'
      }
    ];

    await User.insertMany(users);
    console.log(`✅ Seeded ${users.length} Users (Candidates, College HR, Corporate HR, System Admin).`);

    // -------------------------------------------------------------
    // 2. SEED JOB OPENINGS
    // -------------------------------------------------------------
    console.log('\n💼 [Step 3] Seeding Job Openings for College & Corporate Tenants...');
    const openings = [
      {
        opening_id: 'JOB-POLY-01',
        tenant_id: 'govt_polytechnic',
        title: 'Lecturer in Information Technology',
        department: 'Information Technology',
        description: 'Conduct classroom lectures, manage lab experiments, and mentor diploma students.',
        required_skills: ['Python', 'Database Management', 'Data Structures', 'Linux'],
        min_experience_years: 2,
        vacancies: 2,
        salary_range: '₹56,100 - ₹1,77,500 (Level 10)',
        status: 'active'
      },
      {
        opening_id: 'JOB-POLY-02',
        tenant_id: 'govt_polytechnic',
        title: 'Junior ERP Developer',
        department: 'Campus Automation Cell',
        description: 'Maintain institutional student ERP, fee gateway, and online exam portals.',
        required_skills: ['React', 'Node.js', 'Express', 'MongoDB'],
        min_experience_years: 1,
        vacancies: 1,
        salary_range: '₹40,000 - ₹60,000 / month',
        status: 'active'
      },
      {
        opening_id: 'JOB-POLY-03',
        tenant_id: 'govt_polytechnic',
        title: 'Computer Laboratory Technician',
        department: 'Computer Engineering',
        description: 'Maintain network cables, manage switchboards, and configure Windows/Linux OS.',
        required_skills: ['Hardware', 'Networking', 'Troubleshooting', 'Linux'],
        min_experience_years: 1,
        vacancies: 3,
        salary_range: '₹25,000 - ₹35,000 / month',
        status: 'active'
      },
      {
        opening_id: 'JOB-APEX-01',
        tenant_id: 'apex_systems',
        title: 'Full-Stack MERN Engineer',
        department: 'Enterprise Engineering',
        description: 'Build scalable React + Node.js WebRTC interview rooms and high-throughput APIs.',
        required_skills: ['React', 'Node.js', 'Express', 'MongoDB', 'Docker'],
        min_experience_years: 2,
        vacancies: 3,
        salary_range: '₹8,00,000 - ₹14,00,000 CTC',
        status: 'active'
      },
      {
        opening_id: 'JOB-APEX-02',
        tenant_id: 'apex_systems',
        title: 'Cloud DevOps & Infrastructure Lead',
        department: 'Cloud Operations',
        description: 'Manage AWS cloud deployments, CI/CD pipelines, and high availability clusters.',
        required_skills: ['Docker', 'Kubernetes', 'AWS', 'CI/CD'],
        min_experience_years: 3,
        vacancies: 2,
        salary_range: '₹12,00,000 - ₹18,00,000 CTC',
        status: 'active'
      }
    ];

    await JobOpening.insertMany(openings);
    console.log(`✅ Seeded ${openings.length} Job Openings.`);

    // -------------------------------------------------------------
    // 3. SEED CANDIDATES & APPLICATIONS
    // -------------------------------------------------------------
    console.log('\n📝 [Step 4] Seeding Candidate Applications & ATS Match Scores...');
    const candidates = [
      {
        candidate_id: 'CAND-8921',
        tenant_id: 'govt_polytechnic',
        opening_id: 'JOB-POLY-01',
        full_name: 'Sarah Jones',
        email: 'sarah.jones@example.com',
        phone: '+91 98234 56781',
        resume_url: '/resumes/sarah_jones_cv.pdf',
        extracted_skills: ['Python', 'Database Management', 'Data Structures', 'PostgreSQL'],
        ats_score: 94.5,
        status: 'shortlisted',
        interview_token: 'TP-POLY-8921'
      },
      {
        candidate_id: 'CAND-8922',
        tenant_id: 'govt_polytechnic',
        opening_id: 'JOB-POLY-02',
        full_name: 'Rohan Verma',
        email: 'rohan.verma@example.edu',
        phone: '+91 98345 67892',
        resume_url: '/resumes/rohan_verma_cv.pdf',
        extracted_skills: ['React', 'Node.js', 'Express', 'MongoDB'],
        ats_score: 91.0,
        status: 'evaluated',
        interview_token: 'TP-POLY-8922'
      },
      {
        candidate_id: 'CAND-8923',
        tenant_id: 'apex_systems',
        opening_id: 'JOB-APEX-01',
        full_name: 'Priya Sharma',
        email: 'priya.sharma@apex.internal',
        phone: '+91 98112 33445',
        resume_url: '/resumes/priya_sharma_cv.pdf',
        extracted_skills: ['React', 'Node.js', 'Express', 'MongoDB', 'Docker'],
        ats_score: 96.0,
        status: 'shortlisted',
        interview_token: 'TP-APEX-8923'
      }
    ];

    await Candidate.insertMany(candidates);
    console.log(`✅ Seeded ${candidates.length} Ingested Candidate Profiles.`);

    // -------------------------------------------------------------
    // 4. SEED INTERVIEW EVALUATIONS (STAR Rubrics)
    // -------------------------------------------------------------
    console.log('\n📊 [Step 5] Seeding Interview Evaluations & AI Telemetry...');
    const evaluations = [
      {
        evaluation_id: 'EVAL-301',
        candidate_id: 'CAND-8921',
        opening_id: 'JOB-POLY-01',
        tenant_id: 'govt_polytechnic',
        composite_score: 92.5,
        technical_score: 94.0,
        communication_score: 91.0,
        problem_solving_score: 92.5,
        integrity_score: 100,
        proctoring_flags: { tab_switches: 0, gaze_deviations: 0, multiple_faces_detected: 0 },
        star_breakdown: {
          situation: 'Explains relational indexing and query optimization on student records.',
          task: 'Demonstrated query execution plan and B-Tree structure design.',
          action: 'Implemented composite index reducing execution latency from 450ms to 12ms.',
          result: 'Proved mastery in database systems suitable for teaching diploma students.'
        },
        acoustic_metrics: { average_wpm: 138, filler_words_count: 2, speech_confidence: 0.92 },
        verdict: 'Strong Hire — Recommend for Lecturer Appointment Order'
      },
      {
        evaluation_id: 'EVAL-302',
        candidate_id: 'CAND-8923',
        opening_id: 'JOB-APEX-01',
        tenant_id: 'apex_systems',
        composite_score: 95.0,
        technical_score: 97.0,
        communication_score: 93.0,
        problem_solving_score: 95.0,
        integrity_score: 100,
        proctoring_flags: { tab_switches: 0, gaze_deviations: 0, multiple_faces_detected: 0 },
        star_breakdown: {
          situation: 'Explained scaling WebRTC peer connections and Mongoose schemas.',
          task: 'Designed high-concurrency interview room signaling pipeline.',
          action: 'Applied WebSocket event throttling and Mongoose compound index optimizations.',
          result: 'Achieved 60 FPS real-time feedback with zero frame drops.'
        },
        acoustic_metrics: { average_wpm: 142, filler_words_count: 1, speech_confidence: 0.95 },
        verdict: 'Selected for Offer — Issue Corporate Offer Letter (12 LPA)'
      }
    ];

    await Evaluation.insertMany(evaluations);
    console.log(`✅ Seeded ${evaluations.length} STAR Interview Evaluations.`);

    // -------------------------------------------------------------
    // 5. SEED OFFICIAL LETTERS
    // -------------------------------------------------------------
    console.log('\n📜 [Step 6] Seeding Sealed Official Letters...');
    const letters = [
      {
        letter_id: 'LTR-POLY-2026-001',
        candidate_id: 'CAND-8921',
        tenant_id: 'govt_polytechnic',
        letter_type: 'appointment_order',
        candidate_name: 'Sarah Jones',
        designation: 'Lecturer in Information Technology',
        department: 'Department of Information Technology',
        compensation_details: 'Pay Matrix Level 10 (₹56,100 basic + DA + HRA)',
        joining_date: '01-Nov-2026',
        is_sealed: true,
        issued_by: 'Office of the Principal, Government Polytechnic Institute'
      },
      {
        letter_id: 'LTR-APEX-2026-001',
        candidate_id: 'CAND-8923',
        tenant_id: 'apex_systems',
        letter_type: 'offer_letter',
        candidate_name: 'Priya Sharma',
        designation: 'Full-Stack MERN Engineer',
        department: 'Enterprise Engineering Group',
        compensation_details: 'Fixed CTC ₹12,00,000 per annum + Performance Bonus',
        joining_date: '15-Oct-2026',
        is_sealed: true,
        issued_by: 'Talent Acquisition Director, Apex Software Systems'
      }
    ];

    await OfficialLetter.insertMany(letters);
    console.log(`✅ Seeded ${letters.length} Official Sealed Documents.`);

    console.log('\n================================================================');
    console.log('🎉 [COMPLETE] MongoDB Atlas `talentpulse_db` is Clean & Production-Ready!');
    console.log('================================================================');
    process.exit(0);
  } catch (error) {
    console.error('❌ [Error during seeding]:', error);
    process.exit(1);
  }
};

cleanAndSeed();
