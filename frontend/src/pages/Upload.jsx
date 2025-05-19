import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import downico from '../img/downico.png';

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
    <>
      <div style={{width: '100%', height: '100%', position: 'relative', display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: 'calc(100vh - 110px)'}}>
        <div style={{width: 717, height: 620, left: 0, top: 0, position: 'relative', opacity: 0.87, background: 'linear-gradient(90deg, white 0%, rgba(228, 225, 225, 0.45) 100%)', boxShadow: '0px 4px 40px rgba(0, 0, 0, 0.25)', borderRadius: 40, border: '2px white solid'}}>
          <div style={{left: 104, top: 49, position: 'absolute', color: 'black', fontSize: 48, fontFamily: 'Poppins', fontWeight: '600', wordWrap: 'break-word'}}>Upload Your Resume</div>
          <div style={{left: 62, top: 144, position: 'absolute', color: 'black', fontSize: 30, fontFamily: 'Poppins', fontWeight: '400', wordWrap: 'break-word'}}>Upload your PDF resume to extract skills</div>
          <div style={{width: 627, height: 261, left: 45, top: 212, position: 'absolute', background: 'white', borderRadius: 20,
            border: isDragging ? '2px dashed #3B82F6' : 'none',
            boxShadow: isDragging ? '0 0 0 4px #3B82F633' : undefined,
            cursor: 'pointer',
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
                position: 'absolute',
                left: '50%',
                top: 60,
                transform: 'translateX(-50%)',
                width: '60px',
                height: '60px',
                objectFit: 'contain',
                aspectRatio: '1/1',
                userSelect: 'none'
              }}
            />
            <div style={{width: 140, height: 99, left: 244, top: 120, position: 'absolute'}}>
              <div style={{width: 140, height: 60, left: 0, top: 0, position: 'absolute'}}>
                <div style={{left: 0, top: 0, position: 'absolute', color: '#3B82F6', fontSize: 22, fontFamily: 'Poppins', fontWeight: '600', wordWrap: 'break-word'}}>Upload a file</div>
                <div style={{left: 1, top: 36, position: 'absolute', color: '#6B7280', fontSize: 16, fontFamily: 'Poppins', fontWeight: '600', wordWrap: 'break-word'}}>or drag and drop</div>
              </div>
              <div style={{left: 17, top: 75, position: 'absolute', color: '#9CA3AF', fontSize: 16, fontFamily: 'Poppins', fontWeight: '600', wordWrap: 'break-word'}}>PDF files only</div>
            </div>
          </div>
          {file && (
            <div style={{margin: '20px 0 0 0', color: '#2563EB', fontSize: 18, fontFamily: 'Poppins', fontWeight: 500, textAlign: 'center'}}>
              Selected file: {file.name}
            </div>
          )}
          <form onSubmit={handleSubmit} style={{width: 389, height: 79, left: 163, top: 506, position: 'absolute'}}>
            <button
              type="submit"
              disabled={!file || isLoading}
              style={{width: 389, height: 79, background: file && !isLoading ? '#2563EB' : '#9CA3AF', borderRadius: 20, border: 'none', cursor: file && !isLoading ? 'pointer' : 'not-allowed'}}
            >
              <span style={{left: 107, top: 17, position: 'absolute', color: 'white', fontSize: 30, fontFamily: 'Poppins', fontWeight: '600', wordWrap: 'break-word'}}>
                {isLoading ? 'Uploading...' : 'Extract files'}
              </span>
            </button>
          </form>
          {error && (
            <div style={{position: 'absolute', left: 45, top: 590, width: 627, color: '#B91C1C', background: '#FEE2E2', borderRadius: 8, padding: 8, fontSize: 16, fontFamily: 'Poppins', fontWeight: 500}}>
              {error}
            </div>
          )}
        </div>
      </div>
      <footer style={{width: '100%', background: '#F3F4F6', height: '70px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: 40}}>
        <div style={{width: '95%', maxWidth: 1400, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 18, fontSize: 18, overflowX: 'auto', whiteSpace: 'nowrap', minWidth: 0, flexWrap: 'nowrap'}}>
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
