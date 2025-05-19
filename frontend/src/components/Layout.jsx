import { Outlet } from 'react-router-dom';
import { Link } from 'react-router-dom';

export default function Layout() {
  return (
    <div style={{width: '100%', height: '100%', position: 'relative', background: 'linear-gradient(134deg, #91C7E8 0%, #DEE6FA 50%, #C3B2F4 100%)'}}>
      <nav style={{width: '100%', height: '110px', background: '#F3F4F6', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 4vw', boxSizing: 'border-box'}}>
        <div style={{color: 'black', fontSize: '2.5rem', fontFamily: 'Poppins', fontWeight: 700, wordWrap: 'break-word', whiteSpace: 'nowrap'}}>
          Resume Extractor
        </div>
        <div style={{display: 'flex', gap: '2.5vw', alignItems: 'center'}}>
          <Link to="/" style={{color: '#6B7280', fontSize: '1.5rem', fontFamily: 'Poppins', fontWeight: 600, textDecoration: 'none', whiteSpace: 'nowrap'}}>Home</Link>
          <div style={{color: '#6B7280', fontSize: '1.5rem', fontFamily: 'Poppins', fontWeight: 600, whiteSpace: 'nowrap'}}>How It Works</div>
          <div style={{color: '#6B7280', fontSize: '1.5rem', fontFamily: 'Poppins', fontWeight: 600, whiteSpace: 'nowrap'}}>Support</div>
          <div style={{color: '#6B7280', fontSize: '1.5rem', fontFamily: 'Poppins', fontWeight: 600, whiteSpace: 'nowrap'}}>Contact</div>
        </div>
      </nav>
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <Outlet />
      </main>
    </div>
  );
} 
