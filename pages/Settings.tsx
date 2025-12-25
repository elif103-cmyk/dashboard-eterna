import React from 'react';
import { User, Mail, CreditCard, Baby, Plus, Edit2, LogOut } from 'lucide-react';
import { getCurrentUser } from '../services/crmService';

export const Settings: React.FC = () => {
    const { parent, children } = getCurrentUser();

    return (
        <div className="max-w-4xl mx-auto space-y-8 pb-20">
            <h1 className="text-3xl font-serif font-bold text-eterna-primary">Profil ve Ayarlar</h1>

            {/* Account Info */}
            <div className="bg-white rounded-2xl border border-[#eaddcf] shadow-sm overflow-hidden">
                <div className="bg-[#fbf8f5] px-6 py-4 border-b border-[#eaddcf] flex justify-between items-center">
                    <h2 className="font-bold text-lg text-gray-800 flex items-center gap-2">
                        <User size={20} className="text-eterna-primary"/> Hesap Bilgileri
                    </h2>
                    <button className="text-sm text-eterna-primary hover:underline flex items-center gap-1">
                        <Edit2 size={14}/> Düzenle
                    </button>
                </div>
                <div className="p-6 grid md:grid-cols-2 gap-6">
                    <div>
                         <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">E-posta</label>
                         <div className="flex items-center gap-3 text-gray-800 font-medium">
                             <div className="p-2 bg-gray-100 rounded-lg"><Mail size={18} /></div>
                             {parent.email}
                         </div>
                    </div>
                     <div>
                         <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Üyelik Planı</label>
                         <div className="flex items-center gap-3 text-gray-800 font-medium">
                             <div className="p-2 bg-purple-100 text-purple-600 rounded-lg"><CreditCard size={18} /></div>
                             <span className="capitalize">{parent.plan} Plan</span>
                             <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full">Aktif</span>
                         </div>
                    </div>
                </div>
            </div>

            {/* Children Management */}
            <div className="bg-white rounded-2xl border border-[#eaddcf] shadow-sm overflow-hidden">
                 <div className="bg-[#fbf8f5] px-6 py-4 border-b border-[#eaddcf] flex justify-between items-center">
                    <h2 className="font-bold text-lg text-gray-800 flex items-center gap-2">
                        <Baby size={20} className="text-eterna-primary"/> Çocuk Profilleri
                    </h2>
                    <button className="text-sm bg-eterna-primary text-white px-3 py-1.5 rounded-lg hover:bg-eterna-dark transition-colors flex items-center gap-1">
                        <Plus size={14}/> Yeni Ekle
                    </button>
                </div>
                <div className="p-6">
                    <div className="grid sm:grid-cols-2 gap-4">
                        {children.map(child => (
                            <div key={child.id} className="border border-gray-200 rounded-xl p-4 hover:border-eterna-primary transition-colors cursor-pointer group relative">
                                <div className="flex items-center gap-4">
                                     <div className="w-12 h-12 bg-eterna-bg rounded-full flex items-center justify-center text-eterna-primary font-bold text-lg">
                                        {child.name?.charAt(0) || 'Ç'}
                                     </div>
                                     <div>
                                         <h3 className="font-bold text-gray-800">{child.name}</h3>
                                         <p className="text-sm text-gray-500">{child.age} Yaş • {child.gender}</p>
                                     </div>
                                </div>
                                <button className="absolute top-4 right-4 text-gray-300 group-hover:text-eterna-primary">
                                    <Edit2 size={16} />
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            
            <div className="flex justify-center mt-8">
                 <button className="flex items-center gap-2 text-red-500 hover:text-red-700 font-medium px-6 py-3 rounded-xl hover:bg-red-50 transition-colors">
                    <LogOut size={20} /> Çıkış Yap
                 </button>
            </div>
        </div>
    );
};