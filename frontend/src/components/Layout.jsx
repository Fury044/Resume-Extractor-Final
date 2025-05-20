import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { useCallback } from 'react';

// 
const navMobileStyle = `
@media (max-width: 600px) {
  .nav-right-buttons { display: none !important; }
  .nav-center-title { margin: 0 auto !important; left: 0; right: 0; position: relative; text-align: center !important; width: 100%; justify-content: center; display: flex; }
  .footer-content {
    flex-direction: column !important;
    gap: 12px !important;
    padding: 0 8px !important;
    font-size: 12px !important;
    align-items: center !important;
    justify-content: center !important;
    text-align: center !important;
  }
  .footer-sep { display: none !important; }
  .footer-link { margin: 0 0 2px 0 !important; }
}
`;

export default function Layout() {
  const navigate = useNavigate();
  const location = useLocation();

  const handleHowItWorks = useCallback(() => {
    if (location.pathname !== '/') {
      navigate('/');
      setTimeout(() => {
        const element = document.getElementById('how-it-works');
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    } else {
      const element = document.getElementById('how-it-works');
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, [navigate, location.pathname]);

  return (
    <div style={{width: '100%', minHeight: '100vh', display: 'flex', flexDirection: 'column', position: 'relative', background: 'linear-gradient(134deg, #91C7E8 0%, #DEE6FA 50%, #C3B2F4 100%)'}}>
      <style>{navMobileStyle}</style>
      <nav style={{width: '100%', height: '70px', background: '#F3F4F6', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 12vw', boxSizing: 'border-box'}}>
        <div className="nav-center-title" onClick={() => navigate('/')} style={{color: 'black', fontSize: '1.5rem', fontFamily: 'Poppins', fontWeight: 700, wordWrap: 'break-word', whiteSpace: 'nowrap', cursor: 'pointer'}} title="Go to Home">
          Resume Analyzer
        </div>
        <div className="nav-right-buttons" style={{display: 'flex', gap: '2.5vw', alignItems: 'center'}}>
          <Link to="/" style={{color: '#6B7280', fontSize: '1.2rem', fontFamily: 'Poppins', fontWeight: 600, textDecoration: 'none', whiteSpace: 'nowrap'}}>Home</Link>
          <span onClick={handleHowItWorks} style={{color: '#6B7280', fontSize: '1.2rem', fontFamily: 'Poppins', fontWeight: 600, whiteSpace: 'nowrap', textDecoration: 'none', cursor: 'pointer'}}>How It Works</span>
          <a href="https://forms.gle/4SELrSr1mTJ85ue48" target="_blank" rel="noopener noreferrer" style={{color: '#6B7280', fontSize: '1.2rem', fontFamily: 'Poppins', fontWeight: 600, whiteSpace: 'nowrap', textDecoration: 'none'}}>Support</a>
        </div>
      </nav>
      <main style={{flex: 1}} className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <Outlet />
      </main>
      <footer style={{width: '100%', background: '#F3F4F6', height: 'auto', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 100, marginTop: 40, borderTop: '1px solid #E5E7EB', paddingTop: 12, paddingBottom: 12}}>
        <div className="footer-content" style={{width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 18, fontSize: 14, overflowX: 'auto', whiteSpace: 'nowrap', minWidth: 0, flexWrap: 'nowrap', padding: '0 32px'}}>
          <span style={{color: '#6B7280', fontFamily: 'Poppins', fontWeight: 600, textAlign: 'center', flexShrink: 1, marginBottom: 8, display: 'block'}}>
            © 2025 Resume Skill Extractor. All rights reserved.
          </span>
          <span className="footer-sep" style={{color: '#6B7280', fontWeight: 600}}>|</span>
          <span className="footer-link" style={{color: '#6B7280', fontFamily: 'Poppins', fontWeight: 600, cursor: 'pointer', flexShrink: 1}}>Privacy Policy</span>
          <span className="footer-sep" style={{color: '#6B7280', fontWeight: 600}}>|</span>
          <span className="footer-link" style={{color: '#6B7280', fontFamily: 'Poppins', fontWeight: 600, cursor: 'pointer', flexShrink: 1}}>Terms of Service</span>
          <span className="footer-sep" style={{color: '#6B7280', fontWeight: 600}}>|</span>
          <a className="footer-link" href="mailto:divyanshusharma3darts@email.com" style={{color: '#6B7280', fontFamily: 'Poppins', fontWeight: 600, cursor: 'pointer', flexShrink: 1, textDecoration: 'none'}}>Contact Us</a>
          <span className="footer-sep" style={{color: '#6B7280', fontWeight: 600}}>|</span>
          <a className="footer-link" href="https://forms.gle/4SELrSr1mTJ85ue48" target="_blank" rel="noopener noreferrer" style={{color: '#6B7280', fontFamily: 'Poppins', fontWeight: 600, cursor: 'pointer', flexShrink: 1, textDecoration: 'none'}}>Support</a>
        </div>
      </footer>
    </div>
  );
} 