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
    <div className="max-w-2xl mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900">Extracted Skills</h2>
        <p className="mt-2 text-gray-600">
          {skillCount} skill{skillCount === 1 ? '' : 's'} found in your resume
        </p>
      </div>

      <div className="bg-white shadow rounded-lg p-6">
        {skills.length > 0 ? (
          <GroupedSkillTags groupedSkills={groupedSkills} />
        ) : (
          <p className="text-center text-gray-500">No skills found</p>
        )}

        <div className="mt-8 text-center">
          <button
            onClick={handleNewUpload}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700"
          >
            <ArrowPathIcon className="h-5 w-5 mr-2" />
            Upload Another Resume
          </button>
        </div>
      </div>
    </div>
  );
} 