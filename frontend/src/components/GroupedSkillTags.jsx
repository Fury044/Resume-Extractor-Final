export default function GroupedSkillTags({ groupedSkills }) {
  if (!groupedSkills || typeof groupedSkills !== "object") return null;

  // Mobile view Tag and Category Size Setup here 
  const tagsMobileStyle = `
    @media (max-width: 600px) {
      .tag-category-title { font-size: 18px !important; }
      .tag-skill { font-size: 0.75rem !important; padding: 5px 12px !important; }
    }
  `;

  return (
    <div>
      <style>{tagsMobileStyle}</style>
      {Object.entries(groupedSkills).map(([category, skills]) =>
        skills && skills.length > 0 ? (
          <div key={category} className="mb-6">
            <h3 className="tag-category-title" style={{color: 'black', fontSize: 28, fontFamily: 'Poppins', fontWeight: '600', wordWrap: 'break-word', marginBottom: 8}}>{category}</h3>
            <div className="flex flex-wrap gap-2">
              {skills.map((skill, idx) => (
                <span
                  key={idx}
                  className="tag-skill"
                  style={{background: 'linear-gradient(90deg, #CDC2EB 0%, #82A2E9 100%)', borderRadius: 40, display: 'inline-block', padding: '8px 18px', color: '#000000', fontSize: '1rem', fontWeight: 500, marginRight: 8, marginBottom: 8}}
                >
                  {skill.charAt(0).toUpperCase() + skill.slice(1)}
                </span>
              ))}
            </div>
          </div>
        ) : null
      )}
    </div>
  );
} 