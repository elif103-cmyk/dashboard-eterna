import React from 'react';
import { Link } from 'react-router-dom';
import { Users, Eye } from 'lucide-react';
import { getParents } from '../../services/crmService';

export const ParentsList: React.FC = () => {
  const parents = getParents();

  return (
    <div className="max-w-6xl mx-auto pb-10">
      <div className="flex items-center gap-3 mb-8">
        <div className="p-3 bg-eterna-primary/10 rounded-xl text-eterna-primary">
          <Users size={24} />
        </div>
        <div>
          <h1 className="text-3xl font-serif font-bold text-eterna-primary">Ebeveyn Yönetimi</h1>
          <p className="text-gray-600">Sisteme kayıtlı tüm ebeveynleri görüntüleyin.</p>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-[#eaddcf] shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[#fbf8f5] border-b border-[#eaddcf] text-gray-600 text-sm uppercase tracking-wider">
                <th className="p-6 font-bold">Email</th>
                <th className="p-6 font-bold">Üyelik Planı</th>
                <th className="p-6 font-bold">Durum</th>
                <th className="p-6 font-bold">Kayıt Tarihi</th>
                <th className="p-6 font-bold text-right">İşlemler</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {parents.map((parent) => (
                <tr key={parent.id} className="hover:bg-gray-50 transition-colors group">
                  <td className="p-6 font-medium text-gray-800">{parent.email}</td>
                  <td className="p-6">
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-bold capitalize
                      ${parent.plan === 'premium' ? 'bg-purple-100 text-purple-700' : 
                        parent.plan === 'duo' ? 'bg-blue-100 text-blue-700' : 
                        'bg-gray-100 text-gray-600'}`}>
                      {parent.plan}
                    </span>
                  </td>
                  <td className="p-6">
                    <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium
                      ${parent.status === 'active' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                      <span className={`w-1.5 h-1.5 rounded-full ${parent.status === 'active' ? 'bg-green-500' : 'bg-red-500'}`}></span>
                      {parent.status === 'active' ? 'Aktif' : 'Pasif'}
                    </span>
                  </td>
                  <td className="p-6 text-gray-500 text-sm">
                    {new Date(parent.created_at).toLocaleDateString('tr-TR')}
                  </td>
                  <td className="p-6 text-right">
                    <Link 
                      to={`/crm/parents/${parent.id}`}
                      className="inline-flex items-center gap-2 px-4 py-2 bg-eterna-primary text-white rounded-lg hover:bg-eterna-dark transition-colors text-sm font-medium shadow-sm hover:shadow"
                    >
                      <Eye size={16} /> Detay
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