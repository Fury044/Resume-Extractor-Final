import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';

const COLORS = [
  '#8884d8', '#82ca9d', '#ffc658', '#ff7f50', '#8dd1e1',
  '#a4de6c', '#d0ed57', '#ffc0cb', '#b0e0e6', '#ffb347'
];

// This function get the count of imporant skills
function getImportantSkillCountsByCategory(groupedSkills, importantSkills) {
  if (!groupedSkills || !importantSkills) return [];
  return Object.entries(groupedSkills)
    .map(([category, skills], idx) => ({
      category,
      count: skills.filter(skill => importantSkills.includes(skill)).length,
      color: COLORS[idx % COLORS.length]
    }))
    .filter(item => item.count > 0) // Only show categories with at least one important skill
    .sort((a, b) => b.count - a.count) // Sort by count descending
    .slice(0, 5); // Top 5 categories
}

export default function SkillDashboard({ groupedSkills, importantSkills }) {
  const topCategories = getImportantSkillCountsByCategory(groupedSkills, importantSkills);

  return (
    <div className="w-full max-w-4xl mx-auto p-4 flex flex-col gap-8">
      {/* Bar Chart */}
      <div
        className="bg-white shadow rounded-lg p-6"
        style={{
          width: '100%',
          height: '100%',
          opacity: 0.70,
          background: 'linear-gradient(90deg, white 0%, #DCDCDC 100%)',
          boxShadow: '0px 4px 40px rgba(0, 0, 0, 0.25)',
          borderRadius: 40,
          border: '1px white solid',
          marginTop: 0,
        }}
      >
        <div className="font-semibold text-lg mb-2 text-gray-800">Top Skill In Each Categories</div>
        <div className="w-full" style={{ height: 300 }}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={topCategories} layout="vertical" margin={{ left: 24, right: 24 }}>
              <XAxis type="number" allowDecimals={false} />
              <YAxis type="category" dataKey="category" width={180} tick={{ fontFamily: 'Poppins', fontWeight: 600, fontSize: 14 }} />
              <Tooltip />
              <Bar dataKey="count" radius={[8, 8, 8, 8]} barSize={24}>
                {topCategories.map((entry, idx) => (
                  <Cell key={`cell-${idx}`} fill={entry.color} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}