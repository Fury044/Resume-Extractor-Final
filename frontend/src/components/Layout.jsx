import { Outlet } from 'react-router-dom';
import { Link } from 'react-router-dom';

export default function Layout() {
  return (
    <div className="min-h-screen bg-gray-50">
      <nav style={{width: '100%', height: '100%', background: '#F3F4F6'}}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex">
              <div className="flex-shrink-0 flex items-center">
                <div style={{color: 'black', fontSize: 50, fontFamily: 'Poppins', fontWeight: '700', wordWrap: 'break-word'}}>Resume Extractor</div>
              </div>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <Outlet />
      </main>
    </div>
  );
} 