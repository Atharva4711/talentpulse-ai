"""
TalentPulse AI — MongoDB Atlas Cluster Provisioner & Seeder
Initializes database 'talentpulse_enterprise' with collections:
1. job_openings
2. candidates
3. interview_evaluations
4. system_config
"""

import os
from dotenv import load_dotenv
from pymongo import MongoClient, ASCENDING

ENV_PATH = os.path.join(os.path.dirname(__file__), ".env")
load_dotenv(ENV_PATH)

URI = os.getenv("MONGODB_URI")
if not URI:
    raise ValueError("MONGODB_URI not found in environment or .env file.")

def init_cluster():
    print(f"[MongoDB Atlas] Connecting to cluster...")
    client = MongoClient(URI, serverSelectionTimeoutMS=5000)
    client.admin.command('ping')
    print("[MongoDB Atlas] Ping successful! Authentication verified.")

    db = client["talentpulse_enterprise"]

    # 1. Job Openings Collection
    openings_col = db["job_openings"]
    openings_col.create_index([("id", ASCENDING)], unique=True)
    openings_col.create_index([("tenant_id", ASCENDING)])

    openings_data = [
        {
            "id": "lecturer-it",
            "tenant_id": "college_polytechnic",
            "title": "Lecturer in Information Technology",
            "department": "Department of Information Technology",
            "type": "Full-Time / Institutional Faculty",
            "salary": "₹55,000 - 75,000 / month",
            "location": "Main Campus, IT Block",
            "description": "Seeking dynamic educators and engineers to deliver coursework in Web Development, Database Management, and Data Structures to diploma candidates.",
            "requiredHardSkills": ["JavaScript", "Data Structures", "Database Management", "Object Oriented Programming", "Web Technologies", "Python"],
            "requiredSoftSkills": ["Pedagogy", "Classroom Communication", "Mentorship", "Student Guidance"],
            "minAtsScore": 70,
            "minTechScore": 70,
            "is_active": True
        },
        {
            "id": "junior-dev-college",
            "tenant_id": "college_polytechnic",
            "title": "Junior Software & ERP Developer",
            "department": "College Digital Campus & IT Cell",
            "type": "Full-Time Technical Staff",
            "salary": "₹40,000 - 55,000 / month",
            "location": "Campus IT Administration",
            "description": "Responsible for maintaining student portals, campus management ERP systems, examination databases, and modern web services.",
            "requiredHardSkills": ["React", "Node.js", "SQL", "Git", "REST APIs", "Database Administration"],
            "requiredSoftSkills": ["Problem Solving", "Task Ownership", "Clear Communication"],
            "minAtsScore": 65,
            "minTechScore": 65,
            "is_active": True
        },
        {
            "id": "sysadmin-net",
            "tenant_id": "college_polytechnic",
            "title": "System Administrator & Network Engineer",
            "department": "Campus Infrastructure & Server Room",
            "type": "Full-Time Technical Staff",
            "salary": "₹38,000 - 50,000 / month",
            "location": "Central Server Facility",
            "description": "Managing campus high-speed LAN/WAN networks, server virtualization, Linux system administration, and computer laboratory maintenance.",
            "requiredHardSkills": ["Linux", "Computer Networks", "TCP/IP", "Server Administration", "Firewall Security", "Hardware Maintenance"],
            "requiredSoftSkills": ["Incident Response", "Troubleshooting", "Documentation"],
            "minAtsScore": 65,
            "minTechScore": 60,
            "is_active": True
        },
        {
            "id": "lab-assistant-cs",
            "tenant_id": "college_polytechnic",
            "title": "Computer Lab Technical Assistant",
            "department": "Computer Engineering Department",
            "type": "Technical Support Staff",
            "salary": "₹30,000 - 42,000 / month",
            "location": "Computer Laboratories",
            "description": "Assisting faculty during practical programming sessions, operating system installation, software licensing, and student lab guidance.",
            "requiredHardSkills": ["C++", "Java", "Python", "Linux Basics", "Hardware Diagnostics", "Software Installation"],
            "requiredSoftSkills": ["Patience", "Student Support", "Lab Coordination"],
            "minAtsScore": 60,
            "minTechScore": 60,
            "is_active": True
        },
        {
            "id": "junior-sde",
            "tenant_id": "corporate_tech",
            "title": "Associate Software Engineer (Full Stack)",
            "department": "Core Product Engineering",
            "type": "Full-Time Corporate Hire",
            "salary": "₹8.0 - 12.0 LPA",
            "location": "Tech Park / Hybrid",
            "description": "Building next-generation distributed web applications, cloud-native backend microservices, and high-performance frontend interfaces.",
            "requiredHardSkills": ["React", "Node.js", "PostgreSQL", "Docker", "REST APIs", "Git"],
            "requiredSoftSkills": ["System Design", "Agile Collaboration", "Quick Learner"],
            "minAtsScore": 75,
            "minTechScore": 75,
            "is_active": True
        },
        {
            "id": "cloud-backend-eng",
            "tenant_id": "corporate_tech",
            "title": "Backend Cloud Engineer",
            "department": "Cloud Infrastructure & Platform Team",
            "type": "Full-Time Corporate Hire",
            "salary": "₹10.0 - 15.0 LPA",
            "location": "Tech Park / Hybrid",
            "description": "Designing and maintaining scalable microservices architectures, Kubernetes clusters, MongoDB Atlas persistence layers, and CI/CD pipelines.",
            "requiredHardSkills": ["Python", "Golang", "Kubernetes", "MongoDB", "Docker", "AWS"],
            "requiredSoftSkills": ["Critical Thinking", "Architecture Documentation"],
            "minAtsScore": 70,
            "minTechScore": 75,
            "is_active": True
        }
    ]

    for op in openings_data:
        openings_col.update_one({"id": op["id"]}, {"$set": op}, upsert=True)

    print(f"[MongoDB Atlas] Seeded {len(openings_data)} openings into 'job_openings' collection.")

    # 2. Seed Candidates Collection
    cand_col = db["candidates"]
    cand_col.create_index([("id", ASCENDING)], unique=True)
    cand_col.create_index([("tenant_id", ASCENDING)])

    candidates_data = [
        {
            "id": "cand-101",
            "tenant_id": "college_polytechnic",
            "name": "Rahul Sharma",
            "rollNo": "GPI-IT-042",
            "email": "rahul.sharma@polytechnic.edu",
            "phone": "+91 98231 44521",
            "driveApplied": "Lecturer in Information Technology",
            "atsScore": 88,
            "technicalScore": 92,
            "interviewScore": 90,
            "verdict": "Recommended for Appointment",
            "status": "Shortlisted",
            "eyeContactRatio": 89.4,
            "speechWpm": 132,
            "fillerWordsCount": 1
        },
        {
            "id": "cand-102",
            "tenant_id": "college_polytechnic",
            "name": "Pooja Kulkarni",
            "rollNo": "GPI-IT-089",
            "email": "pooja.k@polytechnic.edu",
            "phone": "+91 98452 77123",
            "driveApplied": "Junior Software & ERP Developer",
            "atsScore": 84,
            "technicalScore": 88,
            "interviewScore": 85,
            "verdict": "Recommended for Technical Staff",
            "status": "Shortlisted",
            "eyeContactRatio": 84.1,
            "speechWpm": 126,
            "fillerWordsCount": 2
        },
        {
            "id": "cand-103",
            "tenant_id": "college_polytechnic",
            "name": "Vikram Deshmukh",
            "rollNo": "GPI-IT-015",
            "email": "vikram.d@polytechnic.edu",
            "phone": "+91 97654 33219",
            "driveApplied": "System Administrator & Network Engineer",
            "atsScore": 78,
            "technicalScore": 82,
            "interviewScore": 80,
            "verdict": "Qualified for Secondary Round",
            "status": "Interviewed",
            "eyeContactRatio": 79.5,
            "speechWpm": 118,
            "fillerWordsCount": 3
        },
        {
            "id": "cand-104",
            "tenant_id": "corporate_tech",
            "name": "Sneha Patel",
            "rollNo": "APX-SDE-104",
            "email": "sneha.patel@apextech.com",
            "phone": "+91 99123 88471",
            "driveApplied": "Associate Software Engineer (Full Stack)",
            "atsScore": 94,
            "technicalScore": 96,
            "interviewScore": 92,
            "verdict": "Offer Recommended (Band L2)",
            "status": "Shortlisted",
            "eyeContactRatio": 91.2,
            "speechWpm": 138,
            "fillerWordsCount": 0
        }
    ]

    for c in candidates_data:
        cand_col.update_one({"id": c["id"]}, {"$set": c}, upsert=True)

    print(f"[MongoDB Atlas] Seeded {len(candidates_data)} candidates into 'candidates' collection.")

    # 3. Seed Evaluations Collection
    eval_col = db["interview_evaluations"]
    eval_col.create_index([("id", ASCENDING)], unique=True)
    eval_data = [
        {
            "id": "eval-sample-01",
            "candidateId": "cand-101",
            "role": "Lecturer in Information Technology",
            "question": "How do you handle pedagogical clarity during practical code sessions?",
            "candidateAnswer": "In my practical sessions, I design interactive coding sandboxes where each student works on incremental modules with unit tests, ensuring 95% concept retention.",
            "score": 92,
            "verbalQuality": 94,
            "starAdherenceScore": 95,
            "fillerCount": 0,
            "latencyMs": 0.42,
            "hrRemark": "Exceptional pedagogical clarity and proactive student engagement.",
            "modelName": "TalentPulse-HR-SLM-v1"
        }
    ]
    for ev in eval_data:
        eval_col.update_one({"id": ev["id"]}, {"$set": ev}, upsert=True)

    print(f"[MongoDB Atlas] Seeded {len(eval_data)} evaluations into 'interview_evaluations' collection.")

    # 4. System Config Collection
    sys_col = db["system_config"]
    sys_col.update_one(
        {"configKey": "platform_metadata"},
        {"$set": {
            "platform": "TalentPulse AI",
            "clusterProvider": "MongoDB Atlas",
            "database": "talentpulse_enterprise",
            "primaryOwner": "AtharvaTeli",
            "status": "Live & Connected",
            "tlsVersion": "TLS 1.3 / SRV"
        }},
        upsert=True
    )
    print(f"[MongoDB Atlas] Successfully initialized 'talentpulse_enterprise' database with all collections & indexes!")

if __name__ == "__main__":
    init_cluster()
