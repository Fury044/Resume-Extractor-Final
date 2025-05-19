import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Loading() {
  const navigate = useNavigate();

  useEffect(() => {
    // Simulate API call delay
    const timer = setTimeout(() => {
      // For now, navigate to results with dummy data
      navigate('/results', {
        state: {
          skills: ['Python', 'JavaScript', 'React', 'Node.js', 'SQL']
        }
      });
    }, 2000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh]">
      <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500"></div>
      <h2 className="mt-4 text-xl font-semibold text-gray-700">Extracting Skills...</h2>
      <p className="mt-2 text-gray-500">This may take a few moments</p>
    </div>
  );
} 