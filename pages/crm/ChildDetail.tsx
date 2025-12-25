import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Palette, Calendar, User } from 'lucide-react';
import { getChildById, getAnalysesByChildId } from '../../services/crmService';

export const ChildDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const child = id ? getChildById(id) : undefined;
  const analyses = id ? getAnalysesByChildId(id) : [];

  if (!child) {
    return <div className="p-8 text-center text-gray-500">Çocuk profili bulunamadı.</div>;
  }

  return (
    <div className="max-w-5xl mx-auto pb-10">
      <Link to={`/crm/parents/${child.parent_id}`} className="inline-flex items-center gap-2 text-gray-500 hover:text-eterna-primary mb-6 transition-colors">
        <ArrowLeft size={20} /> Ebeveyn Profiline Dön
      </Link>

      <div className="bg-white rounded-2xl border border-[#eaddcf] shadow-sm p-8 mb-8 flex items-center justify-between">
        <div className="flex items-center gap-6">
          <div className="w-20 h-20 bg-eterna-primary text-white rounded-full flex items-center justify-center text-3xl font-serif font-bold shadow-lg">
             {child.name ? child.name.charAt(0) : 'Ç'}
          </div>
          <div>
            <h1 className="text-3xl font-serif font-bold text-eterna-primary mb-2">{child.name || 'İsimsiz'}</h1>
            <div className="flex gap-4 text-sm text-gray-600">
               <span className="flex items-center gap-1"><User size={16} /> {child.age} Yaş</span>
               <span className="flex items-center gap-1"><Calendar size={16} /> Kayıt: {new Date(child.created_at).toLocaleDateString('tr-TR')}</span>
            </div>
          </div>
        </div>
        <div className="text-right hidden sm:block">
           <div className="text-3xl font-bold text-eterna-secondary">{analyses.length}</div>
           <div className="text-gray-500 text-sm">Toplam Analiz</div>
        </div>
      </div>

      <div className="flex items-center gap-2 mb-6">
        <Palette className="text-eterna-primary" size={24} />
        <h2 className="text-2xl font-serif font-bold text-eterna-primary">Analiz Geçmişi</h2>
      </div>

      {analyses.length === 0 ? (
        <div className="bg-white p-12 rounded-2xl border border-dashed border-gray-300 text-center text-gray-500">
          Bu çocuğa ait henüz bir analiz bulunmuyor.
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {analyses.map(item => (
            <Link key={item.id} to={`/crm/analyses/${item.id}`} className="bg-white rounded-xl border border-[#eaddcf] overflow-hidden hover:shadow-lg hover:border-eterna-primary transition-all group flex flex-col">
               <div className="h-48 overflow-hidden bg-gray-100 relative">
                   <img src={item.imageBase64} alt="Drawing" className="w-full h-full object-cover transition-transform group-hover:scale-105" />
                   <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-eterna-primary">
                       {new Date(item.date).toLocaleDateString('tr-TR')}
                   </div>
               </div>
               <div className="p-5 flex-1 flex flex-col">
                   <h3 className="font-bold text-gray-800 text-lg mb-1">Analiz Raporu</h3>
                   <p className="text-sm text-gray-500 mb-4">Ruh Hali: {item.profile.mood}</p>
                   <div className="mt-auto pt-4 border-t border-gray-100 text-center text-eterna-primary font-medium text-sm">
                       Raporu İncele
                   </div>
               </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};