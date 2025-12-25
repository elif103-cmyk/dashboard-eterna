import React from 'react';
import { 
  Users, 
  FileText, 
  Activity, 
  LifeBuoy, 
  ArrowUp, 
  ArrowDown, 
  AlertCircle, 
  CheckCircle2, 
  Sparkles,
  TrendingUp,
  BarChart3,
  Calendar,
  MousePointer2,
  Globe,
  Smartphone,
  Mail,
  Zap,
  Clock,
  ChevronRight,
  Heart,
  MessageCircle,
  ShieldCheck
} from 'lucide-react';
import { getDashboardStats, getAllAnalyses } from '../../services/crmService';
import { Link } from 'react-router-dom';

export const CRMDashboard: React.FC = () => {
  const stats = getDashboardStats();
  const recentAnalyses = getAllAnalyses().slice(0, 6);

  // Mock data for Monthly User Growth (Bar Chart)
  const monthlyGrowthData = [
    { month: 'Mar', count: 1200 },
    { month: 'Nis', count: 2450 },
    { month: 'May', count: 4100 },
    { month: 'Haz', count: 5800 },
    { month: 'Tem', count: 7200 },
    { month: 'Ağu', count: 8425 },
  ];
  const maxGrowth = Math.max(...monthlyGrowthData.map(d => d.count));

  // Mock data for Daily Analysis Frequency (Line Chart)
  const frequencyData = [145, 182, 168, 225, 198, 240, 215]; 
  const maxFreq = Math.max(...frequencyData);
  
  // Bezier Curve Calculation for smooth line
  const chartWidth = 400;
  const chartHeight = 100;
  const getX = (i: number) => (i / (frequencyData.length - 1)) * chartWidth;
  const getY = (val: number) => chartHeight - (val / maxFreq) * chartHeight;

  let linePath = `M ${getX(0)},${getY(frequencyData[0])}`;
  for (let i = 0; i < frequencyData.length - 1; i++) {
    const x1 = getX(i);
    const y1 = getY(frequencyData[i]);
    const x2 = getX(i + 1);
    const y2 = getY(frequencyData[i + 1]);
    const cp1x = x1 + (x2 - x1) / 2;
    const cp2x = x1 + (x2 - x1) / 2;
    linePath += ` C ${cp1x},${y1} ${cp2x},${y2} ${x2},${y2}`;
  }

  const areaPath = `${linePath} L ${chartWidth},${chartHeight} L 0,${chartHeight} Z`;

  return (
    <div className="space-y-8 pb-16">
      {/* Enhanced Header */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 bg-white p-8 rounded-[2.5rem] border border-[#eaddcf] shadow-sm relative overflow-hidden group">
        <div className="absolute top-0 right-0 w-64 h-64 bg-eterna-primary/5 rounded-full -mr-32 -mt-32 blur-3xl transition-all group-hover:bg-eterna-primary/10"></div>
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-2">
            <span className="px-3 py-1 bg-eterna-primary/10 text-eterna-primary text-[10px] font-black uppercase tracking-[0.2em] rounded-full">Sistem Yönetimi</span>
            <span className="flex items-center gap-1.5 text-[10px] font-bold text-green-600 bg-green-50 px-2 py-1 rounded-full animate-pulse">
                <span className="w-1.5 h-1.5 bg-green-500 rounded-full"></span> Canlı İzleme Aktif
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-[#366824]">Dashboard</h1>
          <p className="text-gray-400 mt-2 font-medium">Eterna platformu genel sağlık durumu ve büyüme metrikleri.</p>
        </div>
        <div className="flex items-center gap-4 relative z-10">
          <button className="flex items-center gap-2 px-6 py-3 bg-[#fbf8f5] text-gray-600 rounded-2xl border border-gray-100 font-bold text-sm hover:bg-white hover:shadow-md transition-all">
            <Calendar size={18} /> Son 30 Gün
          </button>
          <button className="flex items-center gap-2 px-6 py-3 bg-eterna-primary text-white rounded-2xl font-bold text-sm hover:bg-eterna-dark shadow-lg shadow-eterna-primary/20 transition-all hover:-translate-y-1">
            <Zap size={18} /> Rapor Oluştur
          </button>
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: 'Toplam Kullanıcı', value: stats.totalUsers.toLocaleString(), icon: <Users />, color: 'emerald', trend: '+12%' },
          { label: 'Analiz Trafiği', value: stats.analysesToday.toLocaleString(), icon: <Activity />, color: 'blue', trend: '+28%' },
          { label: 'Arşivlenen Çizim', value: stats.totalAnalyses.toLocaleString(), icon: <FileText />, color: 'purple', trend: '+15%' },
          { label: 'Aktif Destek', value: stats.pendingTickets, icon: <LifeBuoy />, color: 'orange', trend: '-4%' },
        ].map((kpi, idx) => (
          <div key={idx} className="bg-white p-7 rounded-[2rem] border border-gray-100 shadow-sm relative overflow-hidden group hover:shadow-xl transition-all duration-500">
            <div className={`absolute -right-4 -bottom-4 p-8 opacity-[0.03] group-hover:scale-125 transition-transform duration-700 text-gray-900`}>
              {React.cloneElement(kpi.icon as React.ReactElement, { size: 100 })}
            </div>
            <div className="flex justify-between items-start mb-6">
              <div className={`p-4 rounded-2xl bg-${kpi.color}-50 text-${kpi.color}-600`}>
                {React.cloneElement(kpi.icon as React.ReactElement, { size: 24 })}
              </div>
              <div className={`text-[10px] font-black px-2 py-1 rounded-lg ${kpi.trend.startsWith('+') ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                {kpi.trend}
              </div>
            </div>
            <h3 className="text-3xl font-bold text-gray-800 tracking-tighter mb-1">{kpi.value}</h3>
            <p className="text-[11px] font-black text-gray-400 uppercase tracking-widest">{kpi.label}</p>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-12 gap-8">
        {/* Main Section */}
        <div className="lg:col-span-8 space-y-8">
          
          {/* Main Charts Row */}
          <div className="grid md:grid-cols-2 gap-8">
            {/* Analysis Frequency Chart */}
            <div className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm flex flex-col group">
              <div className="flex justify-between items-center mb-8">
                <div>
                  <h3 className="font-bold text-xl text-gray-800">Analiz Frekansı</h3>
                  <p className="text-xs text-gray-400 font-medium">Günlük işlem hacmi</p>
                </div>
                <div className="p-3 bg-[#f6f0ea] rounded-2xl text-[#366824] group-hover:rotate-12 transition-transform">
                  <TrendingUp size={20} />
                </div>
              </div>
              
              <div className="relative h-44 w-full mt-auto">
                <svg className="w-full h-full overflow-visible" viewBox={`0 0 ${chartWidth} ${chartHeight}`} preserveAspectRatio="none">
                  <defs>
                    <linearGradient id="freqGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#366824" stopOpacity="0.2" />
                      <stop offset="100%" stopColor="#366824" stopOpacity="0" />
                    </linearGradient>
                  </defs>
                  <path d={areaPath} fill="url(#freqGradient)" />
                  <path d={linePath} fill="none" stroke="#366824" strokeWidth="3" strokeLinecap="round" className="drop-shadow-lg" />
                  
                  {frequencyData.map((val, i) => (
                    <circle 
                        key={i} 
                        cx={getX(i)} 
                        cy={getY(val)} 
                        r="4" 
                        fill="white" 
                        stroke="#366824" 
                        strokeWidth="2.5"
                        className="transition-all hover:r-6 cursor-pointer"
                    />
                  ))}
                </svg>
              </div>
              <div className="flex justify-between mt-6 px-1">
                {['Pzt', 'Sal', 'Çar', 'Per', 'Cum', 'Cmt', 'Paz'].map((d, i) => (
                  <span key={i} className="text-[10px] text-gray-400 font-black uppercase tracking-tighter">{d}</span>
                ))}
              </div>
            </div>

            {/* Monthly Growth Bar Chart */}
            <div className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm flex flex-col group">
              <div className="flex justify-between items-center mb-8">
                <div>
                  <h3 className="font-bold text-xl text-gray-800">Büyüme İvmesi</h3>
                  <p className="text-xs text-gray-400 font-medium">Aylık yeni kullanıcı katılımı</p>
                </div>
                <div className="p-3 bg-[#f6f0ea] rounded-2xl text-[#bb8585] group-hover:-rotate-12 transition-transform">
                  <BarChart3 size={20} />
                </div>
              </div>
              
              <div className="h-44 w-full flex items-end justify-between gap-3 px-1 mt-auto">
                {monthlyGrowthData.map((data, i) => {
                  const h = (data.count / maxGrowth) * 100;
                  return (
                    <div key={i} className="flex-1 flex flex-col items-center gap-3 group/bar relative h-full justify-end">
                      <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-gray-900 text-white text-[9px] px-2 py-1.5 rounded-xl opacity-0 group-hover/bar:opacity-100 transition-all scale-75 group-hover/bar:scale-100 z-10 font-bold">
                        {data.count.toLocaleString()}
                      </div>
                      <div className="w-full bg-gray-50 rounded-2xl overflow-hidden h-full flex items-end">
                        <div 
                          className="w-full bg-[#bb8585]/20 group-hover/bar:bg-[#bb8585] transition-all duration-700 rounded-t-2xl" 
                          style={{ height: `${h}%` }}
                        />
                      </div>
                      <span className="text-[10px] text-gray-400 font-black uppercase">{data.month}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Acquisition & Performance Row */}
          <div className="grid md:grid-cols-3 gap-8">
            {/* Acquisition Channels */}
            <div className="md:col-span-2 bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm">
                <h3 className="font-bold text-lg text-gray-800 mb-6 flex items-center gap-2">
                    <Globe size={18} className="text-blue-500" /> Edinme Kanalları
                </h3>
                <div className="space-y-6">
                    {[
                        { label: 'Sosyal Medya', value: 45, icon: <Globe size={14} />, color: 'blue' },
                        { label: 'Mobil Uygulama', value: 32, icon: <Smartphone size={14} />, color: 'emerald' },
                        { label: 'E-Posta / Direct', value: 23, icon: <Mail size={14} />, color: 'purple' }
                    ].map((channel, idx) => (
                        <div key={idx} className="space-y-2">
                            <div className="flex justify-between text-xs font-bold">
                                <span className="text-gray-500 flex items-center gap-2">{channel.icon} {channel.label}</span>
                                <span className="text-gray-800">%{channel.value}</span>
                            </div>
                            <div className="h-2.5 bg-gray-50 rounded-full overflow-hidden">
                                <div 
                                    className={`h-full bg-${channel.color}-500 transition-all duration-1000`} 
                                    style={{ width: `${channel.value}%` }} 
                                />
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Live System Health */}
            <div className="bg-eterna-dark p-8 rounded-[2.5rem] text-white flex flex-col justify-between group">
                <div>
                    <h3 className="text-sm font-black uppercase tracking-widest text-white/40 mb-4">Sistem Sağlığı</h3>
                    <div className="space-y-4">
                        <div className="flex items-center justify-between">
                            <span className="text-xs font-bold text-white/60">Server Uptime</span>
                            <span className="text-xs font-black text-green-400">99.9%</span>
                        </div>
                        <div className="flex items-center justify-between">
                            <span className="text-xs font-bold text-white/60">API Latency</span>
                            <span className="text-xs font-black text-green-400">124ms</span>
                        </div>
                    </div>
                </div>
                <div className="mt-8">
                    <div className="flex items-end gap-1 mb-2">
                        {[4, 7, 5, 9, 6, 8, 4, 10, 6, 8].map((h, i) => (
                            <div 
                                key={i} 
                                className="flex-1 bg-green-500/30 rounded-full group-hover:bg-green-500 transition-all" 
                                style={{ height: h * 3, opacity: 0.3 + (i * 0.07) }}
                            />
                        ))}
                    </div>
                    <p className="text-[10px] font-bold text-white/30 uppercase tracking-widest text-center">Gerçek Zamanlı Yük</p>
                </div>
            </div>
          </div>

          {/* Recent Activity Section */}
          <div className="bg-white rounded-[2.5rem] border border-gray-100 shadow-sm overflow-hidden">
            <div className="p-8 border-b border-gray-50 flex justify-between items-center bg-[#fbf8f5]/50">
              <div className="flex items-center gap-3">
                <div className="p-2.5 bg-white rounded-xl text-[#366824] shadow-sm"><Clock size={20} /></div>
                <h3 className="font-bold text-xl text-gray-800">Canlı Analiz Akışı</h3>
              </div>
              <Link to="/crm/analyses" className="text-xs font-black text-[#bb8585] uppercase tracking-widest hover:underline flex items-center gap-2">
                Tümünü Gör <ChevronRight size={14} />
              </Link>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="bg-gray-50/50 text-[10px] text-gray-400 font-black uppercase tracking-widest">
                  <tr>
                    <th className="px-8 py-5">Kullanıcı</th>
                    <th className="px-8 py-5">Tür / Ruh Hali</th>
                    <th className="px-8 py-5">Platform</th>
                    <th className="px-8 py-5">İşlem</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {recentAnalyses.map(analysis => (
                    <tr key={analysis.id} className="hover:bg-gray-50/80 transition-all group">
                      <td className="px-8 py-5">
                        <div className="flex items-center gap-4">
                          <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-[#f6f0ea] to-white border border-[#eaddcf] flex items-center justify-center font-bold text-[#366824] text-xs shadow-sm group-hover:scale-110 transition-transform">
                            {analysis.childName?.charAt(0) || 'C'}
                          </div>
                          <div>
                            <div className="font-bold text-gray-800 text-sm">{analysis.childName}</div>
                            <div className="text-[10px] text-gray-400 font-bold uppercase tracking-tighter">{analysis.profile.age} Yaşında</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-8 py-5">
                         <div className="flex flex-col">
                            <span className="text-sm font-bold text-gray-700">{analysis.profile.mood}</span>
                            <span className="text-[10px] text-gray-400 font-medium">Psikolojik Analiz</span>
                         </div>
                      </td>
                      <td className="px-8 py-5">
                         <span className="text-xs font-bold text-gray-500 bg-gray-100 px-2 py-1 rounded-lg">Web Panel</span>
                      </td>
                      <td className="px-8 py-5">
                        <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-[10px] font-black bg-green-50 text-green-600 border border-green-100 uppercase tracking-tighter">
                          <CheckCircle2 size={12} /> Bitti
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Sidebar Widgets */}
        <div className="lg:col-span-4 space-y-8">
          
          {/* AI Insights Card */}
          <div className="bg-[#1a3311] rounded-[2.5rem] p-8 text-white shadow-2xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-12 opacity-5 group-hover:rotate-12 transition-transform duration-700">
              <Sparkles size={180} />
            </div>
            <div className="flex items-center gap-4 mb-10 relative z-10">
              <div className="p-4 bg-white/10 rounded-3xl backdrop-blur-xl border border-white/10">
                <Sparkles size={24} className="text-yellow-400 animate-pulse" />
              </div>
              <h3 className="font-serif font-bold text-2xl tracking-tight">Akıllı İçgörüler</h3>
            </div>
            <div className="space-y-6 relative z-10">
              <div className="bg-white/5 p-6 rounded-[2rem] border border-white/10 hover:bg-white/10 transition-all cursor-pointer group/item">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-2 h-2 rounded-full bg-yellow-400"></div>
                  <span className="text-[10px] font-black uppercase tracking-widest text-white/40">Anomali Tespiti</span>
                </div>
                <p className="text-sm font-medium leading-relaxed group-hover:text-yellow-100 transition-colors">
                  "Kaygılı" etiketli analizlerde son 24 saatte <span className="text-yellow-400 font-bold underline underline-offset-4">%22 anlık artış</span> görüldü.
                </p>
              </div>
              <div className="bg-white/5 p-6 rounded-[2rem] border border-white/10 hover:bg-white/10 transition-all cursor-pointer group/item">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-2 h-2 rounded-full bg-blue-400"></div>
                  <span className="text-[10px] font-black uppercase tracking-widest text-white/40">Kullanıcı Segmenti</span>
                </div>
                <p className="text-sm font-medium leading-relaxed group-hover:text-blue-100 transition-colors">
                  Premium üyeliklerin <span className="text-blue-300 font-bold underline underline-offset-4">%65'i</span> "Duo" paketi üzerinden gerçekleşiyor.
                </p>
              </div>
            </div>
            <button className="w-full mt-10 py-5 bg-white text-[#1a3311] font-black rounded-3xl hover:bg-yellow-400 transition-all shadow-xl hover:shadow-2xl hover:-translate-y-1 text-[11px] uppercase tracking-widest">
              Gelişmiş AI Raporu
            </button>
          </div>

          {/* Enhanced Memnuniyet Skoru (CSAT) Widget */}
          <div className="bg-white p-8 rounded-[3rem] border border-gray-100 shadow-sm relative group overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-eterna-primary/40 via-eterna-primary to-eterna-primary/40"></div>
            
            <div className="flex justify-between items-center mb-8">
              <h3 className="font-bold text-xl text-gray-800">Memnuniyet Skoru</h3>
              <div className="p-2.5 bg-eterna-primary/5 rounded-xl text-eterna-primary group-hover:bg-eterna-primary group-hover:text-white transition-all duration-300">
                <Heart size={20} fill="currentColor" />
              </div>
            </div>

            <div className="relative w-56 h-56 mx-auto mb-10 flex items-center justify-center">
              <div className="absolute inset-0 bg-eterna-primary/5 rounded-full blur-2xl group-hover:bg-eterna-primary/10 transition-all duration-700"></div>
              
              <svg className="w-full h-full -rotate-90 relative z-10 overflow-visible">
                <defs>
                  <linearGradient id="scoreGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#366824" />
                    <stop offset="100%" stopColor="#bb8585" />
                  </linearGradient>
                  <filter id="glow">
                    <feGaussianBlur stdDeviation="3" result="blur" />
                    <feComposite in="SourceGraphic" in2="blur" operator="over" />
                  </filter>
                </defs>
                
                {/* Background Ring */}
                <circle 
                  cx="112" cy="112" r="94" 
                  fill="none" stroke="#f6f0ea" 
                  strokeWidth="14" 
                />
                
                {/* Progress Ring */}
                <circle 
                  cx="112" cy="112" r="94" 
                  fill="none" 
                  stroke="url(#scoreGradient)" 
                  strokeWidth="14" 
                  strokeDasharray="590.6" 
                  strokeDashoffset="70" 
                  strokeLinecap="round"
                  style={{ filter: 'drop-shadow(0 0 4px rgba(54, 104, 36, 0.4))' }}
                  className="transition-all duration-1000 ease-out"
                />
              </svg>

              <div className="absolute inset-0 flex flex-col items-center justify-center z-20">
                <div className="flex items-baseline">
                   <span className="text-6xl font-serif font-bold text-gray-800 leading-none">4</span>
                   <span className="text-4xl font-serif font-bold text-gray-800">.8</span>
                </div>
                <div className="flex items-center gap-1 mt-2 text-[#bb8585]">
                  {[...Array(5)].map((_, i) => (
                    <Sparkles key={i} size={14} fill={i < 4 ? "currentColor" : "none"} className={i < 4 ? "text-[#bb8585]" : "text-gray-200"} />
                  ))}
                </div>
                <span className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mt-3">CSAT Skoru</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
                <div className="p-5 bg-[#fbf8f5] rounded-3xl border border-gray-50 flex flex-col items-center text-center group/card hover:bg-white hover:shadow-lg transition-all">
                    <div className="p-2 bg-blue-50 rounded-xl text-blue-500 mb-3 group-hover/card:scale-110 transition-transform">
                       <MessageCircle size={18} />
                    </div>
                    <div className="text-2xl font-bold text-gray-800">12.4K</div>
                    <div className="text-[10px] font-black text-gray-400 uppercase tracking-tighter">Geri Bildirim</div>
                </div>
                <div className="p-5 bg-[#fbf8f5] rounded-3xl border border-gray-50 flex flex-col items-center text-center group/card hover:bg-white hover:shadow-lg transition-all">
                    <div className="p-2 bg-green-50 rounded-xl text-green-500 mb-3 group-hover/card:scale-110 transition-transform">
                       <ShieldCheck size={18} />
                    </div>
                    <div className="text-2xl font-bold text-gray-800">92%</div>
                    <div className="text-[10px] font-black text-gray-400 uppercase tracking-tighter">Sadakat Oranı</div>
                </div>
            </div>
            
            <div className="mt-6 flex items-center justify-center gap-2">
                <div className="flex -space-x-2">
                    {[1, 2, 3, 4].map(i => (
                        <div key={i} className="w-6 h-6 rounded-full border-2 border-white bg-gray-100 flex items-center justify-center text-[8px] font-bold text-gray-400 overflow-hidden">
                            <img src={`https://i.pravatar.cc/100?u=${i}`} alt="user" />
                        </div>
                    ))}
                </div>
                <span className="text-[10px] font-bold text-gray-400">+1.2k yeni yorum</span>
            </div>
          </div>

          {/* Quick Support Widget */}
          <div className="bg-[#bb8585] p-8 rounded-[2.5rem] text-white shadow-xl flex flex-col items-center text-center relative overflow-hidden group">
             <div className="absolute top-0 left-0 w-full h-full bg-black/0 group-hover:bg-black/5 transition-colors duration-500"></div>
             <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mb-6 relative z-10 group-hover:scale-110 transition-transform">
                <LifeBuoy size={32} />
             </div>
             <h3 className="text-xl font-bold mb-2 relative z-10">Acil Destek Hattı</h3>
             <p className="text-sm text-white/80 mb-6 relative z-10">Çözümlenmemiş 4 yüksek öncelikli talep bekliyor.</p>
             <Link to="/crm/support" className="w-full py-4 bg-white text-[#bb8585] font-black rounded-2xl hover:bg-gray-100 transition-all text-[11px] uppercase tracking-widest relative z-10 shadow-lg active:scale-95">
                Talepleri Yönet
             </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
