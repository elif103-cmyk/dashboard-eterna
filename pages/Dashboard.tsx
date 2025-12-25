import React from 'react';
import { Link } from 'react-router-dom';
import { Plus, Clock, TrendingUp } from 'lucide-react';
import { getHistory } from '../services/storageService';

export const Dashboard: React.FC = () => {
  const history = getHistory();
  const lastAnalysis = history.length > 0 ? history[0] : null;

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-serif font-bold text-eterna-primary">Hoşgeldiniz</h1>
          <p className="text-gray-600 mt-1">Bugün çocuğunuzun çizimlerinde neler keşfedeceğiz?</p>
        </div>
        <Link to="/new-analysis" className="hidden sm:flex items-center gap-2 bg-eterna-primary text-white px-6 py-3 rounded-full hover:bg-eterna-dark transition-colors shadow-lg">
          <Plus size={20} />
          <span>Yeni Analiz</span>
        </Link>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-2xl border border-[#eaddcf] shadow-sm">
            <div className="flex items-center gap-3 mb-4 text-eterna-secondary">
                <div className="p-2 bg-eterna-bg rounded-lg"><Clock size={24} /></div>
                <h3 className="font-bold">Son Analiz</h3>
            </div>
            {lastAnalysis ? (
                <div>
                    <p className="text-sm text-gray-500 mb-2">{new Date(lastAnalysis.date).toLocaleDateString('tr-TR')}</p>
                    <p className="font-medium text-eterna-primary truncate">
                        {lastAnalysis.profile.age} Yaş, {lastAnalysis.profile.mood}
                    </p>
                    <Link to={`/analysis/${lastAnalysis.id}`} className="text-sm underline mt-2 block text-gray-600">Raporu Gör</Link>
                </div>
            ) : (
                <p className="text-gray-400 text-sm">Henüz analiz yapılmadı.</p>
            )}
        </div>

        <div className="bg-white p-6 rounded-2xl border border-[#eaddcf] shadow-sm">
            <div className="flex items-center gap-3 mb-4 text-eterna-primary">
                <div className="p-2 bg-eterna-bg rounded-lg"><TrendingUp size={24} /></div>
                <h3 className="font-bold">Toplam Analiz</h3>
            </div>
            <p className="text-4xl font-serif font-bold text-eterna-primary">{history.length}</p>
            <p className="text-sm text-gray-500 mt-1">Adet çizim arşivlendi.</p>
        </div>

        <Link to="/new-analysis" className="bg-gradient-to-br from-eterna-primary to-eterna-dark text-white p-6 rounded-2xl shadow-lg flex flex-col justify-between hover:scale-[1.02] transition-transform">
            <div>
                <h3 className="font-bold text-lg mb-2">Hemen Başlayın</h3>
                <p className="text-white/80 text-sm">Yeni bir çizim yükleyerek detaylı analizi anında alın.</p>
            </div>
            <div className="self-end p-2 bg-white/20 rounded-full mt-4">
                <Plus size={24} />
            </div>
        </Link>
      </div>

      {/* Recent Activity List - Simplified for Dashboard */}
      <div className="mt-8">
        <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold text-eterna-primary">Son Aktiviteler</h2>
            <Link to="/history" className="text-sm text-eterna-secondary hover:underline">Tümünü Gör</Link>
        </div>
        
        {history.length === 0 ? (
            <div className="text-center py-12 bg-white rounded-2xl border border-dashed border-gray-300">
                <p className="text-gray-500">Henüz kaydedilmiş bir analiz yok.</p>
            </div>
        ) : (
            <div className="space-y-4">
                {history.slice(0, 3).map((item) => (
                    <Link key={item.id} to={`/analysis/${item.id}`} className="block bg-white p-4 rounded-xl border border-[#eaddcf] hover:border-eterna-primary transition-colors">
                        <div className="flex items-center gap-4">
                            <div className="w-16 h-16 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0">
                                <img src={item.imageBase64} alt="Drawing" className="w-full h-full object-cover" />
                            </div>
                            <div>
                                <h4 className="font-bold text-gray-800">Çizim Analizi</h4>
                                <p className="text-sm text-gray-500">{item.profile.age} Yaş • {item.profile.mood} • {new Date(item.date).toLocaleDateString('tr-TR')}</p>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        )}
      </div>
    </div>
  );
};