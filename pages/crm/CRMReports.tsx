import React from 'react';
import { 
  BarChart3, 
  PieChart as PieChartIcon, 
  TrendingUp, 
  Download, 
  Users, 
  Filter, 
  Calendar,
  Zap,
  ArrowUpRight,
  ShieldCheck,
  BrainCircuit,
  LayoutGrid
} from 'lucide-react';
import { getReportData, getDashboardStats } from '../../services/crmService';

export const CRMReports: React.FC = () => {
  const reportData = getReportData();
  const stats = getDashboardStats();

  return (
    <div className="space-y-8 pb-20">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="px-2 py-0.5 bg-eterna-primary/10 text-eterna-primary text-[10px] font-black uppercase tracking-widest rounded">Analitik</span>
            <span className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Veri Güncelleme: Bugün 14:30</span>
          </div>
          <h1 className="text-4xl font-serif font-bold text-[#366824]">Stratejik Raporlar</h1>
          <p className="text-gray-500 font-medium mt-1">Platform büyümesi ve kullanıcı psikolojisi derin dalış analizi.</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-5 py-3 bg-white border border-gray-100 rounded-2xl text-gray-600 font-bold text-sm hover:shadow-lg transition-all">
            <Filter size={18} /> Filtreler
          </button>
          <button className="flex items-center gap-2 px-5 py-3 bg-eterna-primary text-white rounded-2xl font-bold text-sm hover:bg-eterna-dark shadow-lg shadow-eterna-primary/20 transition-all">
            <Download size={18} /> PDF Raporu Al
          </button>
        </div>
      </div>

      {/* Top Insights Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm flex items-center justify-between group overflow-hidden relative">
          <div className="absolute -right-4 -bottom-4 opacity-5 text-eterna-primary group-hover:scale-125 transition-transform">
            <Users size={120} />
          </div>
          <div className="relative z-10">
            <h4 className="text-sm font-black text-gray-400 uppercase tracking-widest mb-1">Müşteri Sadakati</h4>
            <div className="flex items-baseline gap-2">
               <span className="text-4xl font-bold text-gray-800">92%</span>
               <span className="text-xs font-bold text-green-500">+4.1%</span>
            </div>
          </div>
          <div className="p-4 bg-emerald-50 rounded-3xl text-emerald-600 relative z-10">
            <ArrowUpRight size={24} />
          </div>
        </div>
        
        <div className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm flex items-center justify-between group overflow-hidden relative">
          <div className="absolute -right-4 -bottom-4 opacity-5 text-eterna-secondary group-hover:scale-125 transition-transform">
            <Zap size={120} />
          </div>
          <div className="relative z-10">
            <h4 className="text-sm font-black text-gray-400 uppercase tracking-widest mb-1">Dönüşüm Oranı</h4>
            <div className="flex items-baseline gap-2">
               <span className="text-4xl font-bold text-gray-800">18.4%</span>
               <span className="text-xs font-bold text-green-500">+1.2%</span>
            </div>
          </div>
          <div className="p-4 bg-orange-50 rounded-3xl text-orange-600 relative z-10">
            <Zap size={24} />
          </div>
        </div>

        <div className="bg-[#1a3311] p-8 rounded-[2.5rem] text-white shadow-xl flex items-center justify-between group overflow-hidden relative">
          <div className="absolute -right-4 -bottom-4 opacity-10 text-white group-hover:scale-125 transition-transform">
            <ShieldCheck size={120} />
          </div>
          <div className="relative z-10">
            <h4 className="text-sm font-black text-white/40 uppercase tracking-widest mb-1">AI Doğruluk Skoru</h4>
            <div className="flex items-baseline gap-2">
               <span className="text-4xl font-bold">98.2%</span>
               <span className="text-xs font-bold text-emerald-400">Sabit</span>
            </div>
          </div>
          <div className="p-4 bg-white/10 rounded-3xl text-emerald-400 backdrop-blur-md relative z-10">
            <ShieldCheck size={24} />
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-12 gap-8">
        {/* Psychological Trends Matrix */}
        <div className="lg:col-span-8 bg-white p-10 rounded-[3rem] border border-gray-100 shadow-sm relative group overflow-hidden">
          <div className="flex justify-between items-center mb-10">
             <div>
                <h3 className="text-2xl font-serif font-bold text-gray-800">Duygu Eğilim Matrisi</h3>
                <p className="text-sm text-gray-400 font-medium">Aylara göre saptanan baskın çocuk duyguları.</p>
             </div>
             <div className="flex gap-2">
               {['happy', 'anxious', 'angry'].map(m => (
                 <div key={m} className="flex items-center gap-1.5 text-[10px] font-black uppercase tracking-tighter">
                   <div className={`w-2.5 h-2.5 rounded-full ${m === 'happy' ? 'bg-[#366824]' : m === 'anxious' ? 'bg-[#bb8585]' : 'bg-orange-400'}`} />
                   {m}
                 </div>
               ))}
             </div>
          </div>

          <div className="h-64 flex items-end justify-between gap-6 px-4">
             {reportData.moodTrends.map((data, i) => (
                <div key={i} className="flex-1 flex flex-col justify-end gap-1 h-full group/stack relative">
                   {/* Stacked Bars */}
                   <div className="w-full bg-orange-400/20 group-hover/stack:bg-orange-400 rounded-full transition-all cursor-pointer" style={{ height: `${data.angry}%` }}></div>
                   <div className="w-full bg-[#bb8585]/40 group-hover/stack:bg-[#bb8585] rounded-full transition-all cursor-pointer" style={{ height: `${data.anxious}%` }}></div>
                   <div className="w-full bg-[#366824]/60 group-hover/stack:bg-[#366824] rounded-full transition-all cursor-pointer" style={{ height: `${data.happy}%` }}></div>
                   
                   <span className="mt-4 text-[10px] font-black text-gray-400 uppercase tracking-widest text-center whitespace-nowrap">{data.month}</span>
                </div>
             ))}
          </div>
          
          <div className="mt-12 p-6 bg-gray-50 rounded-[2rem] border border-gray-100 flex items-center gap-4">
             <div className="p-3 bg-white rounded-2xl shadow-sm text-eterna-primary">
                <BrainCircuit size={24} />
             </div>
             <p className="text-sm font-medium text-gray-600 leading-relaxed">
               <strong className="text-gray-800">AI Notu:</strong> Nisan ayında saptanan <span className="text-[#bb8585] font-bold">kaygı artışı</span>, platformdaki sınav hazırlığı temalı çizimlerin yoğunlaşmasıyla %85 korelasyon göstermektedir.
             </p>
          </div>
        </div>

        {/* Age Distribution Pie */}
        <div className="lg:col-span-4 bg-white p-10 rounded-[3rem] border border-gray-100 shadow-sm flex flex-col items-center">
           <h3 className="text-xl font-bold text-gray-800 mb-8 self-start">Yaş Dağılımı</h3>
           
           <div className="relative w-56 h-56 mb-10 group">
              <svg className="w-full h-full transform -rotate-90">
                 {/* This is a simplified illustrative pie chart using CSS/SVG segments */}
                 <circle cx="112" cy="112" r="100" fill="none" stroke="#f6f0ea" strokeWidth="24" />
                 <circle cx="112" cy="112" r="100" fill="none" stroke="#366824" strokeWidth="24" strokeDasharray="628" strokeDashoffset="251" strokeLinecap="round" />
                 <circle cx="112" cy="112" r="100" fill="none" stroke="#bb8585" strokeWidth="24" strokeDasharray="628" strokeDashoffset="480" strokeLinecap="round" />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                 <span className="text-4xl font-bold text-gray-800 tracking-tighter">8.4K</span>
                 <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Aktif Profil</span>
              </div>
           </div>

           <div className="w-full space-y-4">
              {reportData.ageDistribution.map((item, idx) => (
                 <div key={idx} className="flex justify-between items-center group cursor-default">
                    <div className="flex items-center gap-3">
                       <div className={`w-2.5 h-2.5 rounded-full ${idx === 0 ? 'bg-eterna-primary' : idx === 1 ? 'bg-eterna-secondary' : 'bg-gray-200'} transition-transform group-hover:scale-150`} />
                       <span className="text-sm font-bold text-gray-500 group-hover:text-gray-900">{item.age} Yaş</span>
                    </div>
                    <span className="text-xs font-black text-gray-800">{item.count}</span>
                 </div>
              ))}
           </div>
        </div>
      </div>

      {/* Subscription Breakdown & Strategic Notes */}
      <div className="grid md:grid-cols-2 gap-8">
         <div className="bg-white p-10 rounded-[3rem] border border-gray-100 shadow-sm">
            <div className="flex items-center gap-3 mb-8">
               <div className="p-3 bg-purple-50 rounded-2xl text-purple-600">
                  <PieChartIcon size={24} />
               </div>
               <h3 className="text-2xl font-serif font-bold text-gray-800">Gelir Dağılımı</h3>
            </div>
            
            <div className="space-y-8">
               {[
                  { label: 'Ücretsiz Üyeler', val: 65, color: 'gray' },
                  { label: 'Premium Üyeler', val: 25, color: 'purple' },
                  { label: 'Duo (Aile/Okul)', val: 10, color: 'blue' }
               ].map((plan, i) => (
                  <div key={i} className="space-y-2">
                     <div className="flex justify-between items-end">
                        <span className="text-sm font-bold text-gray-600">{plan.label}</span>
                        <span className="text-sm font-black text-gray-900">%{plan.val}</span>
                     </div>
                     <div className="h-3 bg-gray-50 rounded-full overflow-hidden border border-gray-100">
                        <div 
                           className={`h-full bg-${plan.color === 'gray' ? 'gray-300' : plan.color === 'purple' ? 'purple-500' : 'blue-500'} transition-all duration-1000`} 
                           style={{ width: `${plan.val}%` }} 
                        />
                     </div>
                  </div>
               ))}
            </div>
         </div>

         <div className="bg-[#bb8585] p-10 rounded-[3rem] text-white shadow-xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-12 opacity-5 group-hover:rotate-12 transition-transform duration-700">
               <LayoutGrid size={200} />
            </div>
            <div className="relative z-10">
               <h3 className="text-2xl font-serif font-bold mb-6">Kurumsal İçgörüler</h3>
               <div className="space-y-6">
                  <div className="p-6 bg-white/10 rounded-3xl border border-white/10 backdrop-blur-md">
                     <h4 className="text-xs font-black uppercase tracking-widest text-white/50 mb-2">Pazar Fırsatı</h4>
                     <p className="text-sm font-medium leading-relaxed">
                        Okul öncesi eğitim kurumları için <span className="font-bold underline underline-offset-4 text-white">"Eterna For Schools"</span> paketi için %15 daha fazla talep gözlendi.
                     </p>
                  </div>
                  <div className="p-6 bg-white/10 rounded-3xl border border-white/10 backdrop-blur-md">
                     <h4 className="text-xs font-black uppercase tracking-widest text-white/50 mb-2">Churn Riski</h4>
                     <p className="text-sm font-medium leading-relaxed">
                        Analiz sıklığı haftalık 1'in altına düşen Premium kullanıcılarda <span className="font-bold underline underline-offset-4 text-white">%22 abonelik iptali</span> riski saptandı.
                     </p>
                  </div>
               </div>
            </div>
         </div>
      </div>
    </div>
  );
};
