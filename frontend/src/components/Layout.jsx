import { Outlet } from 'react-router-dom';
import { Link } from 'react-router-dom';

export default function Layout() {
  return (
    <div className="min-h-screen bg-gray-50">
      <nav style={{width: '100%', height: '100%', position: 'relative'}}>
        <div style={{width: '100%', height: '120px', left: 0, top: 0, position: 'absolute', background: '#F3F4F6'}} />
        <div style={{left: '5%', top: '50%', transform: 'translateY(-50%)', position: 'absolute', color: 'black', fontSize: '2.5rem', fontFamily: 'Poppins', fontWeight: '700', wordWrap: 'break-word'}}>Resume Extractor</div>
        <Link to="/" style={{left: '50%', top: '50%', transform: 'translateY(-50%)', position: 'absolute', color: '#6B7280', fontSize: '1.5rem', fontFamily: 'Poppins', fontWeight: '600', wordWrap: 'break-word', textDecoration: 'none'}}>Home</Link>
        <div style={{left: '60%', top: '50%', transform: 'translateY(-50%)', position: 'absolute', color: '#6B7280', fontSize: '1.5rem', fontFamily: 'Poppins', fontWeight: '600', wordWrap: 'break-word'}}>How It Works</div>
        <div style={{left: '75%', top: '50%', transform: 'translateY(-50%)', position: 'absolute', color: '#6B7280', fontSize: '1.5rem', fontFamily: 'Poppins', fontWeight: '600', wordWrap: 'break-word'}}>Support</div>
        <div style={{left: '88%', top: '50%', transform: 'translateY(-50%)', position: 'absolute', color: '#6B7280', fontSize: '1.5rem', fontFamily: 'Poppins', fontWeight: '600', wordWrap: 'break-word'}}>Contact</div>
      </nav>

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <Outlet />
      </main>
    </div>
  );
} 
