from fastapi import APIRouter, UploadFile, File, HTTPException, Form
import fitz

router = APIRouter()

# List of skills to check in resumes
SKILLS = {
    "Programming Languages": [
        "python", "javascript", "java", "c++", "c#", "ruby", "php", "swift", "kotlin",
        "typescript", "rust", "scala", "perl", "matlab"
    ],
    "Web Technologies": [
        "html", "css", "react", "angular", "vue", "node.js", "express", "django", "flask",
        "fastapi", "spring", "asp.net", "laravel", "bootstrap", "tailwind", "sass", "less"
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

@router.post("/extract-skills")
async def extract_skills(file: UploadFile = File(...), user_id: str = Form(...)):
    if not file.filename.endswith('.pdf'):
        raise HTTPException(status_code=400, detail="Only PDF files are allowed")
    try:
        contents = await file.read()
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
            "Programming Languages": {"python", "java", "c++", "c#", "javascript", "sql", "typescript", "ruby", "kotlin", "php", "matlab", "scala", "perl", "swift"},
            "Frameworks & Libraries": {"react", "angular", "django", "flask", "spring", "vue", "express", "fastapi", "bootstrap", "tailwind", "laravel", "pytorch", "tensorflow", "scikit-learn", "pandas", "numpy"},
            "Tools & Platforms": {"docker", "aws", "git", "kubernetes", "jenkins", "azure", "gcp", "github", "gitlab", "ansible", "terraform", "linux", "nginx", "apache", "tableau", "power bi"},
            "Soft Skills": {"communication", "teamwork", "leadership", "problem solving", "adaptability", "creativity", "critical thinking", "time management", "collaboration", "organization"},
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
        result = {
            "skills": sorted(list(found)),
            "skill_count": len(found),
            "grouped_skills": grouped,
            "userId": user_id
        }
        return result
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error processing PDF: {str(e)}")
    finally:
        if 'pdf' in locals():
            pdf.close()
