import React from 'react';
import { Link } from 'react-router-dom';
import { FileText, Filter, Eye, Search } from 'lucide-react';
import { getAllAnalyses } from '../../services/crmService';

export const CRMAnalysesList: React.FC = () => {
  const analyses = getAllAnalyses();

  return (
    <div className="space-y-6 pb-10">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
           <h1 className="text-3xl font-serif font-bold text-eterna-primary">Analiz Yönetimi</h1>
           <p className="text-gray-600">Tüm çizim analizlerini görüntüleyin ve detaylandırın.</p>
        </div>
        <div className="flex gap-2">
            <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-lg text-gray-600 hover:bg-gray-50 text-sm">
                <Filter size={16} /> Filtrele
            </button>
            <button className="px-4 py-2 bg-eterna-primary text-white rounded-lg hover:bg-eterna-dark text-sm font-medium">
                Excel İndir
            </button>
        </div>
      </div>

      {/* Search Bar */}
      <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
          <input 
            type="text" 
            placeholder="Analiz ID, Çocuk ismi veya ruh hali ara..." 
            className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 focus:border-eterna-primary focus:ring-1 focus:ring-eterna-primary outline-none"
          />
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-gray-50 text-xs text-gray-500 uppercase border-b border-gray-100">
              <tr>
                <th className="px-6 py-4 font-semibold">Görsel</th>
                <th className="px-6 py-4 font-semibold">Çocuk Bilgisi</th>
                <th className="px-6 py-4 font-semibold">Tespit Edilen Ruh Hali</th>
                <th className="px-6 py-4 font-semibold">Risk Seviyesi</th>
                <th className="px-6 py-4 font-semibold">Tarih</th>
                <th className="px-6 py-4 font-semibold text-right">İşlem</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {analyses.map(analysis => (
                <tr key={analysis.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4">
                     <div className="w-12 h-12 rounded-lg bg-gray-100 overflow-hidden border border-gray-200">
                         <img src={analysis.imageBase64} alt="Thumb" className="w-full h-full object-cover" />
                     </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="font-bold text-gray-800">{analysis.childName || 'Bilinmiyor'}</div>
                    <div className="text-xs text-gray-500">{analysis.profile.age} Yaş, {analysis.profile.gender}</div>
                  </td>
                  <td className="px-6 py-4">
                     <span className={`inline-block px-2 py-1 rounded text-xs font-medium 
                        ${['Mutlu', 'Heyecanlı'].includes(analysis.profile.mood) ? 'bg-green-100 text-green-700' :
                          ['Kaygılı', 'Korkmuş'].includes(analysis.profile.mood) ? 'bg-orange-100 text-orange-700' :
                          'bg-gray-100 text-gray-600'}`}>
                        {analysis.profile.mood}
                     </span>
                  </td>
                  <td className="px-6 py-4">
                      {/* Mock Logic for Risk */}
                      {['Kaygılı', 'Öfkeli'].includes(analysis.profile.mood) ? (
                          <span className="flex items-center gap-1 text-orange-600 text-sm font-medium">
                              <span className="w-2 h-2 rounded-full bg-orange-500"></span> Orta
                          </span>
                      ) : (
                          <span className="flex items-center gap-1 text-green-600 text-sm font-medium">
                              <span className="w-2 h-2 rounded-full bg-green-500"></span> Düşük
                          </span>
                      )}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">
                    {new Date(analysis.date).toLocaleDateString('tr-TR')}
                    <div className="text-xs text-gray-400">{new Date(analysis.date).toLocaleTimeString('tr-TR', {hour: '2-digit', minute:'2-digit'})}</div>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <Link 
                      to={`/crm/analyses/${analysis.id}`}
                      className="inline-flex items-center gap-1 px-3 py-1.5 bg-eterna-primary/10 text-eterna-primary hover:bg-eterna-primary hover:text-white rounded-lg transition-colors text-sm font-medium"
                    >
                      <Eye size={16} /> İncele
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};