import React, { useState } from 'react';
import { NavLink, useLocation, Link } from 'react-router-dom';
import { Menu, X, LayoutDashboard, PlusCircle, History, LifeBuoy, Settings, Users, FileText, PieChart, ArrowLeftRight } from 'lucide-react';
import { Logo } from './Logo';

export const MobileHeader: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const isCRM = location.pathname.startsWith('/crm');

  const userItems = [
    { label: 'Panel', path: '/dashboard', icon: <LayoutDashboard size={20} /> },
    { label: 'Yeni Analiz', path: '/new-analysis', icon: <PlusCircle size={20} /> },
    { label: 'Geçmiş', path: '/history', icon: <History size={20} /> },
    { label: 'Destek', path: '/support', icon: <LifeBuoy size={20} /> },
    { label: 'Ayarlar', path: '/settings', icon: <Settings size={20} /> },
  ];

  const crmItems = [
    { label: 'Dashboard', path: '/crm/dashboard', icon: <LayoutDashboard size={20} /> },
    { label: 'Kullanıcılar', path: '/crm/parents', icon: <Users size={20} /> },
    { label: 'Analizler', path: '/crm/analyses', icon: <FileText size={20} /> },
    { label: 'Destek', path: '/crm/support', icon: <LifeBuoy size={20} /> },
    { label: 'Raporlar', path: '/crm/reports', icon: <PieChart size={20} /> },
  ];

  const activeItems = isCRM ? crmItems : userItems;

  return (
    <>
      <header className={`md:hidden fixed top-0 left-0 right-0 h-16 border-b border-[#eaddcf] z-40 px-4 flex items-center justify-between ${isCRM ? 'bg-[#f0f4ef]' : 'bg-[#fbf8f5]'}`}>
        <NavLink to="/">
            <Logo className="h-6" />
        </NavLink>
        <div className="flex items-center gap-2">
            {isCRM && <span className="text-xs font-bold text-eterna-primary bg-eterna-primary/10 px-2 py-1 rounded">ADMIN</span>}
            <button 
            onClick={() => setIsOpen(true)}
            className="p-2 text-eterna-primary hover:bg-eterna-primary/5 rounded-lg"
            >
            <Menu size={24} />
            </button>
        </div>
      </header>

      {/* Mobile Drawer */}
      {isOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          <div className="absolute inset-0 bg-black/20 backdrop-blur-sm" onClick={() => setIsOpen(false)} />
          <div className={`absolute top-0 right-0 bottom-0 w-64 shadow-2xl p-6 flex flex-col ${isCRM ? 'bg-[#f0f4ef]' : 'bg-[#fbf8f5]'}`}>
            <div className="flex justify-between items-center mb-8">
              <span className="font-serif text-lg font-bold text-eterna-primary">Menü</span>
              <button 
                onClick={() => setIsOpen(false)}
                className="p-2 text-gray-500 hover:text-red-500"
              >
                <X size={24} />
              </button>
            </div>
            
            <nav className="space-y-2 flex-1">
              {activeItems.map((item) => (
                <NavLink
                  key={item.path}
                  to={item.path}
                  onClick={() => setIsOpen(false)}
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                      isActive 
                        ? 'bg-eterna-primary text-white' 
                        : 'text-gray-600 hover:bg-eterna-primary/5'
                    }`
                  }
                >
                  {item.icon}
                  <span className="font-medium">{item.label}</span>
                </NavLink>
              ))}

              <div className="my-4 border-t border-[#eaddcf]"></div>

              <Link
                to={isCRM ? "/dashboard" : "/crm/dashboard"}
                onClick={() => setIsOpen(false)}
                className="flex items-center gap-3 px-4 py-3 rounded-xl text-gray-600 hover:bg-black/5"
              >
                 <ArrowLeftRight size={20} />
                 <span className="font-medium">{isCRM ? 'Kullanıcı Moduna Geç' : 'Yönetici Paneli'}</span>
              </Link>
            </nav>
          </div>
        </div>
      )}
    </>
  );
};