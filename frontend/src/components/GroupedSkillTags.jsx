import React from "react";

export default function GroupedSkillTags({ groupedSkills }) {
  if (!groupedSkills || typeof groupedSkills !== "object") return null;

  return (
    <div>
      {Object.entries(groupedSkills).map(([category, skills]) =>
        skills && skills.length > 0 ? (
          <div key={category} className="mb-6">
            <h3 className="font-bold text-lg mb-2 text-gray-800">{category}</h3>
            <div className="flex flex-wrap gap-2">
              {skills.map((skill, idx) => (
                <span
                  key={idx}
                  className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium mr-2 mb-2"
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