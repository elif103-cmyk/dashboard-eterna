import React from 'react';
import { NavLink, useLocation, Link } from 'react-router-dom';
import { 
  LayoutDashboard, 
  PlusCircle, 
  History, 
  LifeBuoy, 
  Settings, 
  ShieldCheck, 
  Users, 
  FileText, 
  PieChart, 
  LogOut,
  ArrowLeftRight
} from 'lucide-react';
import { Logo } from './Logo';

export const Sidebar: React.FC = () => {
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
    { label: 'Destek Talepleri', path: '/crm/support', icon: <LifeBuoy size={20} /> },
    { label: 'Raporlar', path: '/crm/reports', icon: <PieChart size={20} /> },
    { label: 'Ayarlar', path: '/crm/settings', icon: <Settings size={20} /> },
  ];

  const activeItems = isCRM ? crmItems : userItems;
  const bgColor = isCRM ? 'bg-[#f0f4ef]' : 'bg-[#fbf8f5]';
  const headerText = isCRM ? 'YÖNETİCİ PANELİ' : '';

  return (
    <aside className={`hidden md:flex flex-col w-64 h-screen fixed left-0 top-0 border-r border-[#eaddcf] p-6 z-20 transition-colors ${bgColor}`}>
      <div className="mb-8">
        <NavLink to="/">
            <Logo />
        </NavLink>
        {isCRM && (
             <div className="mt-2 text-xs font-bold text-eterna-primary/70 tracking-widest px-1">
                {headerText}
             </div>
        )}
      </div>
      
      <nav className="flex-1 space-y-2">
        {activeItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group ${
                isActive 
                  ? 'bg-eterna-primary text-white shadow-lg shadow-eterna-primary/20' 
                  : 'text-gray-600 hover:bg-eterna-primary/5 hover:text-eterna-primary'
              }`
            }
          >
            {item.icon}
            <span className="font-medium">{item.label}</span>
          </NavLink>
        ))}
      </nav>

      <div className="pt-6 border-t border-[#eaddcf] space-y-4">
        {/* Switcher for Demo Purposes */}
        <Link 
            to={isCRM ? "/dashboard" : "/crm/dashboard"}
            className="flex items-center gap-3 px-4 py-3 rounded-xl text-gray-500 hover:bg-black/5 hover:text-gray-900 transition-colors text-sm"
        >
            <ArrowLeftRight size={18} />
            <span className="font-medium">{isCRM ? 'Kullanıcı Modu' : 'Yönetici Modu'}</span>
        </Link>

        {isCRM ? (
            <div className="flex items-center gap-3 p-3 rounded-lg bg-white border border-[#eaddcf]">
                <div className="w-10 h-10 rounded-full bg-eterna-dark flex items-center justify-center text-white font-serif font-bold">
                    A
                </div>
                <div className="flex-1 overflow-hidden">
                    <p className="text-sm font-bold text-gray-800 truncate">Admin</p>
                    <p className="text-xs text-gray-500 truncate">Süper Yönetici</p>
                </div>
            </div>
        ) : (
            <Link to="/settings" className="flex items-center gap-3 p-3 rounded-lg bg-eterna-primary/5 hover:bg-eterna-primary/10 transition-colors">
                <div className="w-10 h-10 rounded-full bg-eterna-secondary flex items-center justify-center text-white font-serif font-bold">
                    E
                </div>
                <div className="flex-1 overflow-hidden">
                    <p className="text-sm font-bold text-eterna-primary truncate">Ebeveyn</p>
                    <p className="text-xs text-gray-500 truncate">Premium Üye</p>
                </div>
            </Link>
        )}
      </div>
    </aside>
  );
};