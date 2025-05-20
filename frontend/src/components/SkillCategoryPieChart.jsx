import React from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const COLORS = [
  '#8884d8', '#82ca9d', '#ffc658', '#ff7f50', '#8dd1e1', '#a4de6c', '#d0ed57', '#ffc0cb', '#b0e0e6', '#ffb347'
];

function getCategoryData(groupedSkills) {
  const entries = Object.entries(groupedSkills || {});
  const total = entries.reduce((sum, [_, skills]) => sum + skills.length, 0);
  return entries.map(([category, skills], idx) => ({
    name: category,
    value: skills.length,
    percent: total ? ((skills.length / total) * 100).toFixed(1) : 0,
    color: COLORS[idx % COLORS.length],
  }));
}

const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
  return null;
};

export default function SkillCategoryPieChart({ groupedSkills }) {
  const data = getCategoryData(groupedSkills);

  if (!data.length) {
    return <div style={{ textAlign: 'center', color: '#888', fontFamily: 'Poppins', margin: 24 }}>No skill data to display.</div>;
  }

  return (
    <div style={{ 
      width: '100%', 
      maxWidth: 480, 
      margin: '0 auto', 
      display: 'flex', 
      flexDirection: 'column', 
      alignItems: 'center',
      padding: '20px'
    }}>
      <div style={{ 
        width: '100%', 
        height: 260,
        maxWidth: 380,
        margin: '0 auto',
        position: 'relative'
      }}>
        <ResponsiveContainer width="100%" height="100%">
          <PieChart margin={{ top: 10, right: 10, bottom: 10, left: 10 }}>
            <Pie
              data={data}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              innerRadius={0}
              outerRadius={110}
            >
              {data.map((entry, idx) => (
                <Cell key={`cell-${idx}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip 
              formatter={(value, name, props) => [`${value} skills`, name]}
              contentStyle={{
                fontFamily: 'Poppins',
                fontSize: '12px',
                backgroundColor: 'rgba(255, 255, 255, 0.9)',
                border: 'none',
                borderRadius: '4px',
                boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
              }}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
      <div style={{ 
        width: '100%', 
        display: 'flex', 
        flexWrap: 'wrap', 
        justifyContent: 'center', 
        gap: '8px', 
        padding: '16px',
        marginTop: '10px'
      }}>
        {data.map((item, idx) => (
          <div 
            key={idx} 
            style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: '4px',
              margin: '4px 8px',
            }}
          >
            <div style={{ 
              width: '10px', 
              height: '10px', 
              borderRadius: '50%', 
              backgroundColor: item.color 
            }} />
            <span style={{ 
              color: '#22223B', 
              fontFamily: 'Poppins', 
              fontWeight: 600, 
              fontSize: '13px' 
            }}>
              {item.name} ({item.percent}%)
            </span>
          </div>
        ))}
      </div>
    </div>
  );
} 