import React from 'react';
import { Link } from 'react-router-dom';
import { getHistory } from '../services/storageService';
import { Calendar, ArrowRight } from 'lucide-react';

export const History: React.FC = () => {
  const history = getHistory();

  return (
    <div>
      <h1 className="text-3xl font-serif font-bold text-eterna-primary mb-2">Geçmiş Analizler</h1>
      <p className="text-gray-600 mb-8">Daha önce yapılan tüm değerlendirmelerin arşivi.</p>

      {history.length === 0 ? (
        <div className="bg-white rounded-2xl border border-dashed border-gray-300 p-12 text-center">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4 text-gray-400">
                <Calendar size={32} />
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">Henüz Analiz Yok</h3>
            <p className="text-gray-500 mb-6">İlk analizinizi oluşturarak arşivinizi başlatın.</p>
            <Link to="/new-analysis" className="inline-block bg-eterna-primary text-white px-6 py-3 rounded-full font-bold hover:bg-eterna-dark transition-colors">
                Yeni Analiz Oluştur
            </Link>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {history.map((item) => (
                <Link key={item.id} to={`/analysis/${item.id}`} className="bg-white rounded-xl border border-[#eaddcf] overflow-hidden hover:shadow-lg hover:border-eterna-primary transition-all group">
                    <div className="h-48 overflow-hidden bg-gray-100 relative">
                        <img src={item.imageBase64} alt="Drawing" className="w-full h-full object-cover transition-transform group-hover:scale-105" />
                        <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-eterna-primary">
                            {new Date(item.date).toLocaleDateString('tr-TR')}
                        </div>
                    </div>
                    <div className="p-5">
                        <div className="flex justify-between items-start mb-2">
                            <h3 className="font-bold text-gray-800 text-lg">Analiz Raporu</h3>
                            <ArrowRight size={18} className="text-gray-400 group-hover:text-eterna-primary group-hover:translate-x-1 transition-all" />
                        </div>
                        <p className="text-sm text-gray-500 mb-4">
                            {item.profile.age} Yaş • {item.profile.mood}
                        </p>
                        <div className="w-full h-1 bg-eterna-bg rounded-full overflow-hidden">
                            <div className="h-full bg-eterna-secondary w-full"></div>
                        </div>
                        <p className="text-xs text-eterna-secondary mt-2 font-medium">Analiz Tamamlandı</p>
                    </div>
                </Link>
            ))}
        </div>
      )}
    </div>
  );
};