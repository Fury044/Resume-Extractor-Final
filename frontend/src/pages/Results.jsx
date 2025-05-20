import { useLocation, useNavigate } from 'react-router-dom';
import { ArrowPathIcon } from '@heroicons/react/24/outline';
import GroupedSkillTags from '../components/GroupedSkillTags';
import SkillDashboard from '../components/SkillDashboard';
import SkillCategoryPieChart from '../components/SkillCategoryPieChart';

// Responsive size for mobile
const resultsMobileStyle = `
@media (max-width: 600px) {
  .results-card { padding: 12px !important; border-radius: 18px !important; }
  .results-title { font-size: 2rem !important; }
  .results-subtitle { font-size: 1rem !important; }
  .results-btn-wrap { width: 100% !important; }
  .results-btn-bg, .results-btn-content { width: 100% !important; min-width: 0 !important; }
  .results-btn-bg { border-radius: 12px !important; }
  .results-btn-content { font-size: 1rem !important; border-radius: 12px !important; }
}
`;

export default function Results() {
  const location = useLocation();
  const navigate = useNavigate();
  const result = location.state?.result;
  const skills = result?.skills || [];
  const groupedSkills = result?.grouped_skills || {};
  const importantSkills = result?.important_skills || [];
  const skillCount = result?.skill_count || 0;

  const handleNewUpload = () => {
    navigate('/');
  };

  // In case someone open /results directly
  if (!result) {
    return (
      <div className="max-w-2xl mx-auto text-center mt-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-4 results-title" style={{color: 'black', fontSize: 'clamp(1.5rem, 6vw, 2.6rem)', fontFamily: 'Poppins', fontWeight: '700', wordWrap: 'break-word', marginBottom: 12}}>No Result</h2>
        <p className="text-gray-600 mb-8 results-subtitle" style={{color: '#6B7280', fontSize: 'clamp(1rem, 4vw, 1.25rem)', fontFamily: 'Poppins', fontWeight: '400', wordWrap: 'break-word', marginTop: 0, marginBottom: 24}}>Please upload a resume first.</p>
        <button onClick={handleNewUpload}
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 results-btn-content" style={{position: 'relative', width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: 'clamp(1rem, 4vw, 1.125rem)', fontFamily: 'Poppins', fontWeight: '600', wordWrap: 'break-word'}}
        >
          <ArrowPathIcon className="h-5 w-5 mr-2" />
          Upload Resume
        </button>
      </div>
    );
  }

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <style>{resultsMobileStyle}</style>
      <div className="flex-1 max-w-2xl mx-auto w-full" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', width: '100%', padding: '0 8px', boxSizing: 'border-box' }}>
        <div className="text-center mb-8">
          <h2 className="results-title" style={{color: 'black', fontSize: 'clamp(1.5rem, 6vw, 2.6rem)', fontFamily: 'Poppins', fontWeight: '700', wordWrap: 'break-word', marginBottom: 12}}>Analyzed Skills</h2>
          <p className="results-subtitle" style={{color: '#6B7280', fontSize: 'clamp(1rem, 4vw, 1.25rem)', fontFamily: 'Poppins', fontWeight: '400', wordWrap: 'break-word', marginTop: 0, marginBottom: 24}}>
            {skillCount} skill{skillCount === 1 ? '' : 's'} found in your resume
          </p>
        </div>
        <SkillDashboard groupedSkills={groupedSkills} importantSkills={importantSkills} />
        <div className="results-card bg-white shadow rounded-lg p-6" style={{width: '100%', height: '100%', opacity: 0.70, background: 'linear-gradient(90deg, white 0%, #DCDCDC 100%)', boxShadow: '0px 4px 40px rgba(0, 0, 0, 0.25)', borderRadius: 40, border: '1px white solid', marginTop: 0, padding: 24}}>
          {skills.length > 0 ? (
            <GroupedSkillTags groupedSkills={groupedSkills} />
          ) : (
            <p className="text-center text-gray-500">No skills found</p>
          )}
          <div style={{margin: '32px 0'}}>
            <SkillCategoryPieChart groupedSkills={groupedSkills} />
          </div>
          <div className="mt-8 text-center results-btn-wrap" style={{width: 300, maxWidth: '100%', margin: '0 auto'}}>
            <div
              onClick={handleNewUpload}
              style={{width: '100%', height: 56, margin: '0 auto', position: 'relative', cursor: 'pointer', display: 'inline-block'}}>
              <div className="results-btn-bg" style={{width: '100%', height: 56, left: 0, top: 0, position: 'absolute', background: '#2563EB', borderRadius: 16}} />
              <div className="results-btn-content" style={{position: 'relative', width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: 18, fontFamily: 'Poppins', fontWeight: '600', wordWrap: 'break-word', borderRadius: 16}}>
                Upload another Resume
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 