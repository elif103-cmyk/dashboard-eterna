import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Calendar, CreditCard, Baby, ChevronRight } from 'lucide-react';
import { getParentById, getChildrenByParentId } from '../../services/crmService';

export const ParentDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const parent = id ? getParentById(id) : undefined;
  const children = id ? getChildrenByParentId(id) : [];

  if (!parent) {
    return <div className="p-8 text-center text-gray-500">Ebeveyn bulunamadı.</div>;
  }

  return (
    <div className="max-w-5xl mx-auto pb-10">
      <Link to="/crm/parents" className="inline-flex items-center gap-2 text-gray-500 hover:text-eterna-primary mb-6 transition-colors">
        <ArrowLeft size={20} /> Listeye Dön
      </Link>

      <div className="grid md:grid-cols-3 gap-8">
        {/* Parent Info Card */}
        <div className="md:col-span-1 space-y-6">
          <div className="bg-white p-6 rounded-2xl border border-[#eaddcf] shadow-sm">
            <div className="w-16 h-16 bg-eterna-primary/10 text-eterna-primary rounded-full flex items-center justify-center text-xl font-bold font-serif mb-4">
              {parent.email.charAt(0).toUpperCase()}
            </div>
            <h2 className="text-xl font-bold text-gray-800 break-words mb-1">{parent.email}</h2>
            <p className="text-sm text-gray-500 mb-6">ID: {parent.id}</p>

            <div className="space-y-4">
              <div className="flex items-center gap-3 text-sm text-gray-600">
                <Calendar size={18} className="text-eterna-secondary" />
                <span>Kayıt: {new Date(parent.created_at).toLocaleDateString('tr-TR')}</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-gray-600">
                <CreditCard size={18} className="text-eterna-secondary" />
                <span className="capitalize">Plan: <strong>{parent.plan}</strong></span>
              </div>
              <div className="pt-4 border-t border-gray-100">
                <span className={`inline-block w-full text-center py-2 rounded-lg text-sm font-medium ${parent.status === 'active' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                  {parent.status === 'active' ? 'Hesap Aktif' : 'Hesap Pasif'}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Children List */}
        <div className="md:col-span-2">
          <div className="flex items-center gap-2 mb-6">
            <Baby className="text-eterna-primary" size={24} />
            <h2 className="text-2xl font-serif font-bold text-eterna-primary">Kayıtlı Çocuklar</h2>
          </div>

          {children.length === 0 ? (
            <div className="bg-white p-8 rounded-2xl border border-dashed border-gray-300 text-center text-gray-500">
              Kayıtlı çocuk bulunmuyor.
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 gap-4">
              {children.map(child => (
                <Link 
                  key={child.id}
                  to={`/crm/children/${child.id}`}
                  className="bg-white p-6 rounded-xl border border-[#eaddcf] hover:border-eterna-primary hover:shadow-md transition-all group"
                >
                  <div className="flex justify-between items-start mb-4">
                    <div className="w-12 h-12 bg-[#fbf8f5] rounded-full flex items-center justify-center text-eterna-primary font-bold text-lg">
                      {child.name ? child.name.charAt(0) : 'Ç'}
                    </div>
                    <ChevronRight className="text-gray-300 group-hover:text-eterna-primary transition-colors" size={20} />
                  </div>
                  <h3 className="font-bold text-lg text-gray-800 mb-1">{child.name || 'İsimsiz'}</h3>
                  <p className="text-sm text-gray-500">{child.age} Yaş • {child.gender || 'Belirtilmedi'}</p>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};