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
    <div style={{position: 'relative', width: '100%', minHeight: '100vh', overflow: 'hidden'}}>
      {/* Main content */}
      <div style={{
        width: '100%',
        height: '100%',
        position: 'relative',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: 'calc(100vh - 250px)',
        marginTop: '0px',
        padding: '20px'
      }}>
        <div style={{
          width: '100%',
          maxWidth: '573px',
          minHeight: '496px',
          position: 'relative',
          opacity: 0.87,
          background: 'linear-gradient(90deg, white 0%, rgba(228, 225, 225, 0.45) 100%)',
          boxShadow: '0px 4px 40px rgba(0, 0, 0, 0.25)',
          borderRadius: 32,
          border: '1.6px white solid',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-start',
          alignItems: 'center',
          padding: '20px',
          boxSizing: 'border-box'
        }}>
          <div style={{
            color: 'black',
            fontSize: 'clamp(24px, 5vw, 38px)',
            fontFamily: 'Poppins',
            fontWeight: '600',
            wordWrap: 'break-word',
            textAlign: 'center',
            marginBottom: '20px'
          }}>Upload Your Resume</div>
          <div style={{
            color: 'black',
            fontSize: 'clamp(16px, 3vw, 24px)',
            fontFamily: 'Poppins',
            fontWeight: '400',
            wordWrap: 'break-word',
            textAlign: 'center',
            marginBottom: '20px'
          }}>Upload your PDF resume to extract skills</div>
          <div style={{
            width: '100%',
            height: '209px',
            background: 'white',
            borderRadius: 16,
            border: isDragging ? '1.6px dashed #3B82F6' : 'none',
            boxShadow: isDragging ? '0 0 0 3.2px #3B82F633' : undefined,
            cursor: 'pointer',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 8,
            marginBottom: '20px'
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
            <div style={{color: '#3B82F6', fontSize: 'clamp(14px, 2vw, 18px)', fontFamily: 'Poppins', fontWeight: '600', marginBottom: 2}}>Upload a file</div>
            <div style={{color: '#6B7280', fontSize: 'clamp(12px, 1.5vw, 13px)', fontFamily: 'Poppins', fontWeight: '600', marginBottom: 2}}>or drag and drop</div>
            <div style={{color: '#9CA3AF', fontSize: 'clamp(12px, 1.5vw, 13px)', fontFamily: 'Poppins', fontWeight: '600'}}>PDF files only</div>
          </div>
          {file && (
            <div style={{
              margin: '20px 0',
              color: '#2563EB',
              fontSize: 'clamp(14px, 2vw, 18px)',
              fontFamily: 'Poppins',
              fontWeight: 500,
              textAlign: 'center',
              wordBreak: 'break-word'
            }}>
              Selected file: {file.name}
            </div>
          )}
          <form onSubmit={handleSubmit} style={{width: '100%', display: 'flex', justifyContent: 'center', marginTop: 'auto'}}>
            <button
              type="submit"
              disabled={!file || isLoading}
              style={{
                width: '100%',
                maxWidth: '400px',
                height: 56,
                background: file && !isLoading ? '#2563EB' : '#9CA3AF',
                borderRadius: 16,
                border: 'none',
                cursor: file && !isLoading ? 'pointer' : 'not-allowed',
                color: 'white',
                fontSize: 'clamp(16px, 2.5vw, 24px)',
                fontFamily: 'Poppins',
                fontWeight: 600
              }}
            >
              {isLoading ? 'Uploading...' : 'Analyze Resume'}
            </button>
          </form>
        </div>
      </div>
      {/* Error message */}
      {error && (
        <div style={{
          width: '90%',
          maxWidth: '400px',
          margin: '24px auto 0 auto',
          color: '#B91C1C',
          background: '#FEE2E2',
          borderRadius: 8,
          padding: 8,
          fontSize: 'clamp(14px, 1.5vw, 16px)',
          fontFamily: 'Poppins',
          fontWeight: 500,
          textAlign: 'center'
        }}>
          {error}
        </div>
      )}
      {/* How it works section */}
      <div id="how-it-works" style={{
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        margin: '10px 0 40px 0',
        padding: '0 20px'
      }}>
        <div style={{
          color: 'black',
          fontSize: 'clamp(32px, 5vw, 48px)',
          fontFamily: 'Poppins',
          fontWeight: 700,
          marginBottom: 40,
          textAlign: 'center'
        }}>How it works?</div>
        <div style={{
          display: 'flex',
          flexDirection: 'row',
          flexWrap: 'wrap',
          justifyContent: 'center',
          gap: '20px',
          width: '100%',
          maxWidth: '1200px'
        }}>
          {/* Step 1 */}
          <div style={{
            width: '100%',
            maxWidth: '300px',
            minHeight: '250px',
            background: 'white',
            borderRadius: 20,
            border: '1px solid #eee',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            padding: '24px',
            boxSizing: 'border-box',
            boxShadow: '0 2px 12px #0001'
          }}>
            <div style={{color: '#2563EB', fontSize: 'clamp(36px, 4vw, 48px)', fontFamily: 'Poppins', fontWeight: 600, marginBottom: 16}}>1</div>
            <div style={{color: '#0D3A9C', fontSize: 'clamp(24px, 3vw, 32px)', fontFamily: 'Poppins', fontWeight: 700, marginBottom: 16}}>Upload</div>
            <div style={{color: '#9CA3AF', fontSize: 'clamp(14px, 1.5vw, 18px)', fontFamily: 'Poppins', fontWeight: 600, textAlign: 'center'}}>Upload your PDF resume.</div>
          </div>
          {/* Step 2 */}
          <div style={{
            width: '100%',
            maxWidth: '300px',
            minHeight: '250px',
            background: 'white',
            borderRadius: 20,
            border: '1px solid #eee',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            padding: '24px',
            boxSizing: 'border-box',
            boxShadow: '0 2px 12px #0001'
          }}>
            <div style={{color: '#2563EB', fontSize: 'clamp(36px, 4vw, 48px)', fontFamily: 'Poppins', fontWeight: 600, marginBottom: 16}}>2</div>
            <div style={{color: '#0D3A9C', fontSize: 'clamp(24px, 3vw, 32px)', fontFamily: 'Poppins', fontWeight: 700, marginBottom: 16}}>Analyze</div>
            <div style={{color: '#9CA3AF', fontSize: 'clamp(14px, 1.5vw, 18px)', fontFamily: 'Poppins', fontWeight: 600, textAlign: 'center'}}>Click "Analyze Resume" to analyze it.</div>
          </div>
          {/* Step 3 */}
          <div style={{
            width: '100%',
            maxWidth: '300px',
            minHeight: '250px',
            background: 'white',
            borderRadius: 20,
            border: '1px solid #eee',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            padding: '24px',
            boxSizing: 'border-box',
            boxShadow: '0 2px 12px #0001'
          }}>
            <div style={{color: '#2563EB', fontSize: 'clamp(36px, 4vw, 48px)', fontFamily: 'Poppins', fontWeight: 600, marginBottom: 16}}>3</div>
            <div style={{color: '#0D3A9C', fontSize: 'clamp(24px, 3vw, 32px)', fontFamily: 'Poppins', fontWeight: 700, marginBottom: 16}}>View skills</div>
            <div style={{color: '#9CA3AF', fontSize: 'clamp(14px, 1.5vw, 18px)', fontFamily: 'Poppins', fontWeight: 600, textAlign: 'center'}}>View and use your extracted skills.</div>
          </div>
        </div>
      </div>
    </div>
  );
} 