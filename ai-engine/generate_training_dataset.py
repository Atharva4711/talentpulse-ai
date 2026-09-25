"""
TalentPulse AI — In-House Interview Model Dataset Generator
Generates a curated STAR (Situation, Task, Action, Result) dataset 
for fine-tuning the TalentPulse-HR-SLM-v1 model on College & Enterprise roles.
"""

import os
import json

DATA_DIR = os.path.join(os.path.dirname(__file__), "data")
os.makedirs(DATA_DIR, exist_ok=True)
DATASET_PATH = os.path.join(DATA_DIR, "interview_star_dataset.jsonl")

# Curated High-Value STAR Interview Samples
SAMPLES = [
    # 1. College Faculty (Lecturer in IT) - Strong STAR
    {
        "domain": "College Academic Faculty",
        "role": "Lecturer in Information Technology",
        "question": "Can you describe a situation where students were struggling with a difficult technical concept like Object-Oriented Programming and how you addressed it?",
        "candidateAnswer": "In our previous semester, several students found OOP inheritance and polymorphism confusing. To solve this, I designed a hands-on laboratory project where students built an interactive student grading system step-by-step. I held interactive visual whiteboard walkthroughs and provided personalized code reviews. As a result, the entire batch scored above 82% in their practical exams, and student feedback showed a 95% satisfaction rating.",
        "targetMetrics": {
            "score": 92,
            "verbalQuality": 94,
            "starAdherence": 95,
            "fillerCount": 0,
            "starBreakdown": {
                "situation": "Struggling with OOP inheritance in previous semester",
                "task": "Help students master difficult concepts before practical examinations",
                "action": "Built practical laboratory simulator, whiteboard diagrams, individual mentorship",
                "result": "Batch scored above 82% in practicals with 95% satisfaction"
            },
            "hrRemark": "Exceptional pedagogical approach demonstrating clear classroom ownership and quantifiable student learning outcomes."
        }
    },
    # 2. College Faculty - Weak Answer (Vague, No metrics)
    {
        "domain": "College Academic Faculty",
        "role": "Lecturer in Information Technology",
        "question": "How do you handle classroom management when students are distracted or disengaged during theory lectures?",
        "candidateAnswer": "Um, well, you know, I just try to speak louder and tell them to pay attention. Sometimes I ask them questions, like, to make sure they are listening. It's basically pretty normal for students to be distracted sometimes, you know?",
        "targetMetrics": {
            "score": 46,
            "verbalQuality": 48,
            "starAdherence": 40,
            "fillerCount": 5,
            "starBreakdown": {
                "situation": "Vague student distraction",
                "task": "Unclear objective",
                "action": "Speaking louder, asking random questions without pedagogical strategy",
                "result": "No quantifiable outcome or proactive classroom engagement framework"
            },
            "hrRemark": "Candidate relies on reactive measures with high filler word density; lacks structured pedagogical methodology."
        }
    },
    # 3. Enterprise Software Engineer - Strong STAR
    {
        "domain": "Corporate Enterprise",
        "role": "Associate Software Engineer / Backend",
        "question": "Tell us about a time when a critical bug occurred in a production system and how you diagnosed and resolved it.",
        "candidateAnswer": "During a peak load event, our payment gateway service experienced intermittent timeouts causing transaction failures. I led the incident response by analyzing distributed trace logs in Datadog and isolated an unindexed database query locking the transactions table. I implemented an optimized compound index and configured connection pool throttling. This dropped database latency from 4.2 seconds to 18 milliseconds and eliminated transaction dropped packets completely.",
        "targetMetrics": {
            "score": 96,
            "verbalQuality": 95,
            "starAdherence": 98,
            "fillerCount": 0,
            "starBreakdown": {
                "situation": "Intermittent timeouts in payment gateway under peak traffic load",
                "task": "Isolate root cause and restore 99.99% service SLA without downtime",
                "action": "Analyzed Datadog logs, isolated table locks, added compound indexes, tuned pool",
                "result": "Latency reduced from 4.2s to 18ms with zero dropped packets"
            },
            "hrRemark": "Outstanding technical precision with rigorous root-cause analysis and crisp quantifiable SLA recovery."
        }
    },
    # 4. Enterprise Software Engineer - Average Answer
    {
        "domain": "Corporate Enterprise",
        "role": "Associate Software Engineer / Backend",
        "question": "How do you prioritize tasks when you have multiple competing deadlines from product managers and tech leads?",
        "candidateAnswer": "I check my Jira tickets and try to do the urgent ones first. If both are urgent, I ask my senior developer which one is more important and then work on that until it is done.",
        "targetMetrics": {
            "score": 68,
            "verbalQuality": 70,
            "starAdherence": 65,
            "fillerCount": 0,
            "starBreakdown": {
                "situation": "Competing deadlines across product and engineering",
                "task": "Prioritize deliverables efficiently",
                "action": "Consults senior team member and uses Jira",
                "result": "Completes tasks sequentially, though lacks independent framework like Eisenhower matrix"
            },
            "hrRemark": "Acceptable teamwork and escalation habits, but would benefit from displaying autonomous prioritization frameworks."
        }
    },
    # 5. College Lab Technical Assistant - Strong Answer
    {
        "domain": "College Technical Staff",
        "role": "Computer Lab Technical Assistant",
        "question": "How do you ensure 60+ computers in the programming lab are ready for a university practical examination without software conflicts?",
        "candidateAnswer": "Two days prior to practical exams, I deployed a standardized master disk image containing pre-configured compilers (GCC, Python 3, JDK) across all 60 workstations using network PXE booting. I ran an automated diagnostic script to verify IDE execution, network isolation, and USB port lockdown. All 60 stations passed pre-flight checks, and the university examination concluded with zero hardware or software interruptions.",
        "targetMetrics": {
            "score": 94,
            "verbalQuality": 92,
            "starAdherence": 96,
            "fillerCount": 0,
            "starBreakdown": {
                "situation": "Preparation of 60 workstations for high-stakes university practical exams",
                "task": "Ensure consistent runtime environment and zero software conflicts",
                "action": "PXE booted standardized master image, scripted IDE tests, enforced security lockdown",
                "result": "100% exam completion with zero interruptions or station downtime"
            },
            "hrRemark": "Exemplary lab administration skills showcasing automation, security compliance, and meticulous reliability."
        }
    }
]

def generate_dataset():
    """Generates expanded training dataset with synthetic variations."""
    count = 0
    with open(DATASET_PATH, "w", encoding="utf-8") as f:
        for sample in SAMPLES:
            f.write(json.dumps(sample, ensure_ascii=False) + "\n")
            count += 1
            
            # Generate acoustic & verbal variation pairs
            variation = {
                "domain": sample["domain"],
                "role": sample["role"],
                "question": sample["question"],
                "candidateAnswer": f"To address that situation, {sample['candidateAnswer']}",
                "targetMetrics": sample["targetMetrics"]
            }
            f.write(json.dumps(variation, ensure_ascii=False) + "\n")
            count += 1

    print(f"[Dataset Generator] Successfully generated {count} training instances at {DATASET_PATH}")
    return DATASET_PATH, count

if __name__ == "__main__":
    generate_dataset()
