from fastapi import APIRouter, UploadFile, File, HTTPException, Form
import fitz

router = APIRouter()

# List of skills to check in resumes
SKILLS = {
    "Soft Skills": [
        "communication", "written communication", "oral communication", "teamwork", "leadership", "problem solving", "problem-solving", "adaptability", "creativity", "critical thinking", "time management", "collaboration", "organization", "decision making", "conflict resolution", "empathy", "active listening", "attention to detail", "multitasking", "self motivation", "work ethic", "flexibility", "emotional intelligence", "stress management", "negotiation", "persuasion", "public speaking", "coaching", "mentoring", "goal setting", "patience", "open-mindedness", "responsibility", "dependability", "initiative", "team leadership", "customer service", "interpersonal skills", "decision-making", "analytical thinking"
    ],
    "Programming Languages": [
        "python", "javascript", "java", "c++", "c#", "ruby", "php", "swift", "kotlin",
        "typescript", "rust", "scala", "perl", "matlab"
    ],
    "Web Technologies": [
        "html", "css", "react", "angular", "vue", "node.js", "express", "django", "flask",
        "fastapi", "spring", "asp.net", "laravel", "bootstrap", "tailwind", "sass"
    ],
    "Databases": [
        "sql", "mysql", "postgresql", "mongodb", "redis", "oracle", "sqlite", "cassandra",
        "elasticsearch", "dynamodb", "neo4j"
    ],
    "Cloud & DevOps": [
        "aws", "azure", "gcp", "docker", "kubernetes", "jenkins", "gitlab", "github actions",
        "terraform", "ansible", "puppet", "chef", "linux", "nginx", "apache"
    ],
    "Data Science & ML": [
        "machine learning", "deep learning", "tensorflow", "pytorch", "scikit-learn",
        "pandas", "numpy", "data analysis", "data visualization", "tableau", "power bi"
    ]
}

# Define a set of important skills
IMPORTANT_SKILLS = {
    "python", "javascript", "aws", "react", "sql", "docker", "java", "azure", "machine learning", "leadership", "communication"
}

def get_important_skills(found_skills):
    # Return the intersection of found_skills and IMPORTANT_SKILLS, preserving order
    return [skill for skill in found_skills if skill.lower() in IMPORTANT_SKILLS]

@router.post("/extract-skills")
async def extract_skills(file: UploadFile = File(...), user_id: str = Form(...)):
    if not file.filename.endswith('.pdf'):
        raise HTTPException(status_code=400, detail="Only PDF files are allowed")
    contents = await file.read()
    max_size = 5 * 1024 * 1024  # 5 MB
    if len(contents) > max_size:
        raise HTTPException(status_code=413, detail="PDF file size exceeds 5 MB limit")
    try:
        pdf = fitz.open(stream=contents, filetype="pdf")
        text = ""
        for page in pdf:
            text += page.get_text()
        text = text.lower()
        found = set()
        for cat in SKILLS:
            for skill in SKILLS[cat]:
                if skill.lower() in text:
                    found.add(skill)
        # group skills
        categories = {
            "Soft Skills": {"communication", "teamwork", "leadership", "problem solving", "adaptability", "creativity", "critical thinking", "time management", "collaboration", "organization"},
            "Programming Languages": {"python", "java", "c++", "c#", "javascript", "sql", "typescript", "ruby", "kotlin", "php", "matlab", "scala", "perl", "swift"},
            "Frameworks & Libraries": {"react", "angular", "django", "flask", "spring", "vue", "express", "fastapi", "bootstrap", "tailwind", "laravel", "pytorch", "tensorflow", "scikit-learn", "pandas", "numpy"},
            "Tools & Platforms": {"docker", "aws", "git", "kubernetes", "jenkins", "azure", "gcp", "github", "gitlab", "ansible", "terraform", "linux", "nginx", "apache", "tableau", "power bi"},
        }
        grouped = {cat: [] for cat in categories}
        grouped["Others"] = []
        for skill in sorted(list(found)):
            skill_lower = skill.lower()
            put = False
            for cat in categories:
                if skill_lower in categories[cat]:
                    grouped[cat].append(skill)
                    put = True
                    break
            if not put:
                grouped["Others"].append(skill)
        found_sorted = sorted(list(found))
        important_skills = get_important_skills(found_sorted)
        result = {
            "skills": found_sorted,
            "skill_count": len(found),
            "grouped_skills": grouped,
            "important_skills": important_skills,
            "userId": user_id
        }
        return result
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error processing PDF: {str(e)}")
    finally:
        if 'pdf' in locals():
            pdf.close()