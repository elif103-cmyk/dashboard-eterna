import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Share2, Download, Calendar, User, Info } from 'lucide-react';
import { getAnalysisById } from '../services/storageService';
import { AnalysisResult } from '../types';
import { AnalysisContent } from '../components/AnalysisContent';

export const AnalysisDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [analysis, setAnalysis] = useState<AnalysisResult | null>(null);

  useEffect(() => {
    if (id) {
      const data = getAnalysisById(id);
      setAnalysis(data || null);
    }
  }, [id]);

  if (!analysis) {
    return (
        <div className="text-center py-20">
            <h2 className="text-xl font-bold text-gray-800">Analiz Bulunamadı</h2>
            <Link to="/history" className="text-eterna-primary hover:underline mt-4 block">Geçmişe Dön</Link>
        </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto pb-20">
      <div className="flex items-center justify-between mb-8">
        <Link to="/history" className="flex items-center gap-2 text-gray-500 hover:text-eterna-primary transition-colors">
            <ArrowLeft size={20} />
            <span className="font-medium">Geçmişe Dön</span>
        </Link>
        <div className="flex gap-3">
            <button className="p-2 text-gray-500 hover:bg-gray-100 rounded-full" title="Paylaş">
                <Share2 size={20} />
            </button>
            <button className="p-2 text-gray-500 hover:bg-gray-100 rounded-full" title="PDF İndir">
                <Download size={20} />
            </button>
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

        {/* Dynamic Analysis Cards */}
        <div className="pb-6">
             <AnalysisContent rawAnalysis={analysis.rawAnalysis} />
        </div>
        
        {/* Disclaimer Card */}
        <div className="bg-yellow-50 p-6 rounded-xl border border-yellow-100 text-sm text-yellow-800 text-center shadow-sm">
            <strong>Yasal Uyarı:</strong> Bu rapor tıbbi bir teşhis değildir. Çıktılar ön değerlendirme niteliğindedir. Eterna AI, klinik bir uzman yerine geçmez.
        </div>
      </div>
    </div>
  );
};