import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import downico from '../img/downico.png';
import vector1 from '../img/Vector.png';
import vector2 from '../img/Vector2.png';
import vector3 from '../img/Vector3.png';

export default function Upload() {
  const [isDragging, setIsDragging] = useState(false);
  const [file, setFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const [userId] = useState(() => {
    let id = localStorage.getItem('user_id');
    if (!id) {
      id = Math.random().toString(36).substring(2, 15);
      localStorage.setItem('user_id', id);
    }
    return id;
  });

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile && droppedFile.type === 'application/pdf') {
      setFile(droppedFile);
    }
  };

  const handleFileSelect = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile && selectedFile.type === 'application/pdf') {
      setFile(selectedFile);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) return;
    setIsLoading(true);
    setError('');
    const formData = new FormData();
    formData.append('file', file);
    formData.append('user_id', userId);
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/skills/extract-skills`, {
        method: 'POST',
        body: formData,
      });
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.detail || `HTTP error! status: ${response.status}`);
      }
      const result = await response.json();
      setIsLoading(false);
      navigate('/results', { state: { result } });
    } catch (error) {
      setIsLoading(false);
      setError(error.message || 'Failed to upload file.');
    }
  };

  return (
    <div style={{position: 'relative', width: '100%', minHeight: '100vh', overflow: 'hidden'}}>
      {/* Vector backgrounds */}
      <img 
        src={vector1} 
        alt="Background vector 1"
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          zIndex: 0
        }}
      />
      <img 
        src={vector2} 
        alt="Background vector 2"
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          zIndex: 1,
          opacity: 0.7
        }}
      />
      <img 
        src={vector3} 
        alt="Background vector 3"
        style={{
          position: 'absolute',
          top: '-20%',
          left: '-20%',
          width: '140%',
          height: '60%',
          objectFit: 'cover',
          transform: 'rotate(62deg)',
          transformOrigin: 'top left',
          opacity: 0.4,
          zIndex: 2
        }}
      />
      {/* Main content */}
      <div style={{width: '100%', height: '100%', position: 'relative', display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: 'calc(100vh - 250px)', marginTop: '0px'}}>
        <div style={{width: 573, height: 496, left: 0, top: 0, position: 'relative', opacity: 0.87, background: 'linear-gradient(90deg, white 0%, rgba(228, 225, 225, 0.45) 100%)', boxShadow: '0px 4px 40px rgba(0, 0, 0, 0.25)', borderRadius: 32, border: '1.6px white solid', display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'center', padding: '0 0 32px 0'}}>
          <div style={{left: 83, top: 39, position: 'absolute', color: 'black', fontSize: 38, fontFamily: 'Poppins', fontWeight: '600', wordWrap: 'break-word'}}>Upload Your Resume</div>
          <div style={{left: 50, top: 115, position: 'absolute', color: 'black', fontSize: 24, fontFamily: 'Poppins', fontWeight: '400', wordWrap: 'break-word'}}>Upload your PDF resume to extract skills</div>
          <div style={{width: 502, height: 209, left: 36, top: 170, position: 'absolute', background: 'white', borderRadius: 16,
            border: isDragging ? '1.6px dashed #3B82F6' : 'none',
            boxShadow: isDragging ? '0 0 0 3.2px #3B82F633' : undefined,
            cursor: 'pointer',
            display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 8
          }}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            onClick={() => document.getElementById('file-upload').click()}
          >
            <input
              id="file-upload"
              name="file-upload"
              type="file"
              className="sr-only"
              accept=".pdf"
              onChange={handleFileSelect}
              style={{display: 'none'}}
            />
            <img 
              src={downico} 
              alt="Upload icon"
              draggable={false}
              style={{
                width: '48px',
                height: '48px',
                objectFit: 'contain',
                aspectRatio: '1/1',
                userSelect: 'none',
                marginBottom: 8
              }}
            />
            <div style={{color: '#3B82F6', fontSize: 18, fontFamily: 'Poppins', fontWeight: '600', marginBottom: 2}}>Upload a file</div>
            <div style={{color: '#6B7280', fontSize: 13, fontFamily: 'Poppins', fontWeight: '600', marginBottom: 2}}>or drag and drop</div>
            <div style={{color: '#9CA3AF', fontSize: 13, fontFamily: 'Poppins', fontWeight: '600'}}>PDF files only</div>
          </div>
          {file && (
            <div style={{margin: '20px 0 0 0', color: '#2563EB', fontSize: 18, fontFamily: 'Poppins', fontWeight: 500, textAlign: 'center'}}>
              Selected file: {file.name}
            </div>
          )}
          <form onSubmit={handleSubmit} style={{width: '100%', display: 'flex', justifyContent: 'center', marginTop: 'auto'}}>
            <button
              type="submit"
              disabled={!file || isLoading}
              style={{width: '80%', height: 56, background: file && !isLoading ? '#2563EB' : '#9CA3AF', borderRadius: 16, border: 'none', cursor: file && !isLoading ? 'pointer' : 'not-allowed', color: 'white', fontSize: 24, fontFamily: 'Poppins', fontWeight: 600}}
            >
              {isLoading ? 'Uploading...' : 'Extract Skills'}
            </button>
          </form>
        </div>
      </div>
      {/* Error message just above How it works */}
      {error && (
        <div style={{width: 400, margin: '24px auto 0 auto', color: '#B91C1C', background: '#FEE2E2', borderRadius: 8, padding: 8, fontSize: 16, fontFamily: 'Poppins', fontWeight: 500, textAlign: 'center'}}>
          {error}
        </div>
      )}
      {/* How it works section */}
      <div id="how-it-works" style={{width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', margin: '10px 0 40px 0'}}>
        <div style={{color: 'black', fontSize: 48, fontFamily: 'Poppins', fontWeight: 700, marginBottom: 40}}>How it works?</div>
        <div style={{display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 64}}>
          {/* Step 1 */}
          <div style={{width: 300, minHeight: 300, background: 'white', borderRadius: 20, border: '1px solid #eee', display: 'flex', flexDirection: 'column', alignItems: 'center', padding: 32, boxSizing: 'border-box', boxShadow: '0 2px 12px #0001'}}>
            <div style={{color: '#2563EB', fontSize: 48, fontFamily: 'Poppins', fontWeight: 600, marginBottom: 16}}>1</div>
            <div style={{color: '#0D3A9C', fontSize: 32, fontFamily: 'Poppins', fontWeight: 700, marginBottom: 16}}>Upload</div>
            <div style={{color: '#9CA3AF', fontSize: 18, fontFamily: 'Poppins', fontWeight: 600, textAlign: 'center'}}>Upload your PDF resume.</div>
          </div>
          {/* Step 2 */}
          <div style={{width: 300, minHeight: 300, background: 'white', borderRadius: 20, border: '1px solid #eee', display: 'flex', flexDirection: 'column', alignItems: 'center', padding: 32, boxSizing: 'border-box', boxShadow: '0 2px 12px #0001'}}>
            <div style={{color: '#2563EB', fontSize: 48, fontFamily: 'Poppins', fontWeight: 600, marginBottom: 16}}>2</div>
            <div style={{color: '#0D3A9C', fontSize: 32, fontFamily: 'Poppins', fontWeight: 700, marginBottom: 16}}>Extract</div>
            <div style={{color: '#9CA3AF', fontSize: 18, fontFamily: 'Poppins', fontWeight: 600, textAlign: 'center'}}>Click "Extract Skills" to analyze it.</div>
          </div>
          {/* Step 3 */}
          <div style={{width: 300, minHeight: 300, background: 'white', borderRadius: 20, border: '1px solid #eee', display: 'flex', flexDirection: 'column', alignItems: 'center', padding: 32, boxSizing: 'border-box', boxShadow: '0 2px 12px #0001'}}>
            <div style={{color: '#2563EB', fontSize: 48, fontFamily: 'Poppins', fontWeight: 600, marginBottom: 16}}>3</div>
            <div style={{color: '#0D3A9C', fontSize: 32, fontFamily: 'Poppins', fontWeight: 700, marginBottom: 16}}>View skills</div>
            <div style={{color: '#9CA3AF', fontSize: 18, fontFamily: 'Poppins', fontWeight: 600, textAlign: 'center'}}>View and use your extracted skills.</div>
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
          <a href="mailto:divyanshusharma3darts@email.com" style={{color: '#6B7280', fontFamily: 'Poppins', fontWeight: 600, cursor: 'pointer', flexShrink: 1, textDecoration: 'none'}}>Contact Us</a>
          <span style={{color: '#6B7280', fontWeight: 600}}>|</span>
          <a href="https://forms.gle/4SELrSr1mTJ85ue48" target="_blank" rel="noopener noreferrer" style={{color: '#6B7280', fontFamily: 'Poppins', fontWeight: 600, cursor: 'pointer', flexShrink: 1, textDecoration: 'none'}}>Support</a>
        </div>
      </footer>
    </div>
  );
} 
