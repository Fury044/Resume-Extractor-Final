import React from "react";

export default function GroupedSkillTags({ groupedSkills }) {
  if (!groupedSkills || typeof groupedSkills !== "object") return null;

  return (
    <div>
      {Object.entries(groupedSkills).map(([category, skills]) =>
        skills && skills.length > 0 ? (
          <div key={category} className="mb-6">
            <h3 style={{color: 'black', fontSize: 40, fontFamily: 'Poppins', fontWeight: '600', wordWrap: 'break-word', marginBottom: 8}}>{category}</h3>
            <div className="flex flex-wrap gap-2">
              {skills.map((skill, idx) => (
                <span
                  key={idx}
                  style={{width: '100%', height: '100%', background: 'linear-gradient(90deg, #CDC2EB 0%, #82A2E9 100%)', borderRadius: 40, display: 'inline-block', padding: '8px 18px', color: '#22223B', fontSize: '1rem', fontWeight: 500, marginRight: 8, marginBottom: 8}}
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        ) : null
      )}
    </div>
  );
} 
