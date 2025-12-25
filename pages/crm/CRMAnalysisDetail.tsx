import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Calendar, User, Info, AlertTriangle } from 'lucide-react';
import { getCRMAnalysisById, getAnalysesByChildId } from '../../services/crmService';
import { AnalysisContent } from '../../components/AnalysisContent';

export const CRMAnalysisDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const analysis = id ? getCRMAnalysisById(id) : undefined;
  
  // Try to reverse lookup child for navigation back (Simulated)
  let childId = '';
  if (analysis) {
     // Naive search in mock data to find parent child
     const allChildrenIds = ['c1', 'c2', 'c3', 'c4']; 
     for(const cId of allChildrenIds) {
        const childAnalyses = getAnalysesByChildId(cId);
        if(childAnalyses.find(a => a.id === id)) {
            childId = cId;
            break;
        }
     }
  }

  if (!analysis) {
    return <div className="p-8 text-center text-gray-500">Analiz bulunamadı.</div>;
  }

  return (
    <div className="max-w-4xl mx-auto pb-20">
      <div className="flex items-center justify-between mb-8">
        <Link to={childId ? `/crm/children/${childId}` : '/crm/parents'} className="flex items-center gap-2 text-gray-500 hover:text-eterna-primary transition-colors">
            <ArrowLeft size={20} />
            <span className="font-medium">Çocuk Profiline Dön</span>
        </Link>
        <div className="px-3 py-1 bg-eterna-primary text-white text-xs font-bold rounded uppercase tracking-wider">
            Admin View
        </div>
      </div>

      <div className="space-y-6">
        {/* Header Card */}
        <div className="bg-white rounded-2xl shadow-sm border border-[#eaddcf] overflow-hidden">
            <div className="bg-[#fbf8f5] border-b border-[#eaddcf] p-6 md:p-8">
                <div className="flex flex-col md:flex-row gap-8 items-start">
                    <div className="w-full md:w-1/3">
                        <img 
                            src={analysis.imageBase64} 
                            alt="Analyzed Drawing" 
                            className="w-full rounded-xl shadow-md border border-gray-200"
                        />
                    </div>
                    <div className="flex-1">
                        <h1 className="text-2xl md:text-3xl font-serif font-bold text-eterna-primary mb-4">Çizim Analiz Raporu</h1>
                        
                        <div className="grid grid-cols-2 gap-4 mb-6">
                            <div className="flex items-center gap-2 text-gray-600">
                                <Calendar size={18} className="text-eterna-secondary" />
                                <span className="text-sm">{new Date(analysis.date).toLocaleDateString('tr-TR')}</span>
                            </div>
                            <div className="flex items-center gap-2 text-gray-600">
                                <User size={18} className="text-eterna-secondary" />
                                <span className="text-sm">{analysis.profile.age} Yaş, {analysis.profile.gender || 'Belirtilmedi'}</span>
                            </div>
                            <div className="flex items-center gap-2 text-gray-600 col-span-2">
                                <Info size={18} className="text-eterna-secondary" />
                                <span className="text-sm">Ruh Hali: {analysis.profile.mood}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        {/* Safety Notice - MANDATORY */}
        <div className="bg-red-50 border border-red-100 p-4 rounded-xl flex items-start gap-3">
            <AlertTriangle className="text-red-600 flex-shrink-0" size={20} />
            <div className="text-sm text-red-800">
                <strong>Yasal Uyarı:</strong> Bu sistem tıbbi teşhis sağlamaz. Tüm çıktılar ön gözlem niteliğindedir. Gerekli durumlarda profesyonel psikolojik destek önerilir.
            </div>
        </div>

        {/* Analysis Content using shared component */}
        <div className="pb-6">
             <AnalysisContent rawAnalysis={analysis.rawAnalysis} />
        </div>
      </div>
    </div>
  );
};