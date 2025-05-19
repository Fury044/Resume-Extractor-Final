import { useLocation, useNavigate } from 'react-router-dom';
import { ArrowPathIcon } from '@heroicons/react/24/outline';
import GroupedSkillTags from '../components/GroupedSkillTags';

export default function Results() {
  const location = useLocation();
  const navigate = useNavigate();
  const result = location.state?.result;
  const skills = result?.skills || [];
  const groupedSkills = result?.grouped_skills || {};
  const skillCount = result?.skill_count || 0;

  const handleNewUpload = () => {
    navigate('/');
  };

  // If user visits directly, show a message
  if (!result) {
    return (
      <div className="max-w-2xl mx-auto text-center mt-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">No Results</h2>
        <p className="text-gray-600 mb-8">Please upload a resume first.</p>
        <button
          onClick={handleNewUpload}
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700"
        >
          <ArrowPathIcon className="h-5 w-5 mr-2" />
          Upload Resume
        </button>
      </div>
    );
  }

  return (
    <>
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900" style={{color: 'black', fontSize: 48, fontFamily: 'Poppins', fontWeight: '700', wordWrap: 'break-word', marginBottom: 12}}>Extracted  Skills</h2>
          <p style={{color: '#6B7280', fontSize: 26, fontFamily: 'Poppins', fontWeight: '400', wordWrap: 'break-word', marginTop: 0, marginBottom: 24}}>
            {skillCount} skill{skillCount === 1 ? '' : 's'} found in your resume
          </p>
        </div>

        <div className="bg-white shadow rounded-lg p-6" style={{width: '100%', height: '100%', opacity: 0.70, background: 'linear-gradient(90deg, white 0%, #DCDCDC 100%)', boxShadow: '0px 4px 40px rgba(0, 0, 0, 0.25)', borderRadius: 40, border: '1px white solid'}}>
          {skills.length > 0 ? (
            <GroupedSkillTags groupedSkills={groupedSkills} />
          ) : (
            <p className="text-center text-gray-500">No skills found</p>
          )}

          <div className="mt-8 text-center">
            <div
              onClick={handleNewUpload}
              style={{width: 260, height: 56, margin: '0 auto', position: 'relative', cursor: 'pointer', display: 'inline-block'}}>
              <div style={{width: 260, height: 56, left: 0, top: 0, position: 'absolute', background: '#2563EB', borderRadius: 16}} />
              <div style={{left: 20, top: 14, position: 'absolute', color: 'white', fontSize: 20, fontFamily: 'Poppins', fontWeight: '600', wordWrap: 'break-word'}}>
                Upload another Resume
              </div>
            </div>
          </div>
        </div>
      </div>
      <footer style={{width: '100%', background: '#F3F4F6', height: '70px', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 100, marginTop: 40}}>
        <div style={{width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 18, fontSize: 18, overflowX: 'auto', whiteSpace: 'nowrap', minWidth: 0, flexWrap: 'nowrap', padding: '0 32px'}}>
          <span style={{color: '#6B7280', fontFamily: 'Poppins', fontWeight: 600, textAlign: 'center', flexShrink: 1}}>
            © 2025 Resume Skill Extractor. All rights reserved.
          </span>
          <span style={{color: '#6B7280', fontWeight: 600}}>|</span>
          <span style={{color: '#6B7280', fontFamily: 'Poppins', fontWeight: 600, cursor: 'pointer', flexShrink: 1}}>Privacy Policy</span>
          <span style={{color: '#6B7280', fontWeight: 600}}>|</span>
          <span style={{color: '#6B7280', fontFamily: 'Poppins', fontWeight: 600, cursor: 'pointer', flexShrink: 1}}>Terms of Service</span>
          <span style={{color: '#6B7280', fontWeight: 600}}>|</span>
          <span style={{color: '#6B7280', fontFamily: 'Poppins', fontWeight: 600, cursor: 'pointer', flexShrink: 1}}>Contact Us</span>
          <span style={{color: '#6B7280', fontWeight: 600}}>|</span>
          <span style={{color: '#6B7280', fontFamily: 'Poppins', fontWeight: 600, cursor: 'pointer', flexShrink: 1}}>Support</span>
        </div>
      </footer>
    </>
  );
} 
