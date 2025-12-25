import React from 'react';
import { ArrowRight, Upload, Brain, FileText, Star, Check, ShieldCheck } from 'lucide-react';
import { Link } from 'react-router-dom';

export const Home: React.FC = () => {
  const scrollToSection = (e: React.MouseEvent, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="space-y-32 pb-20">
      
      {/* Hero Section */}
      <section className="relative px-4 pt-16 pb-32 text-center overflow-hidden">
        <div className="max-w-4xl mx-auto relative z-10">
          <div className="inline-flex items-center gap-2 px-5 py-2 mb-8 rounded-full bg-[#bb8585]/10 text-[#bb8585] font-bold text-xs tracking-widest uppercase">
            <SparkleIcon /> Yeni Nesil Çocuk Gelişimi Takibi
          </div>
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif font-bold text-[#366824] mb-10 leading-[1.1] tracking-tight">
            Çocuğunuzun iç dünyasını <span className="italic text-[#bb8585]">keşfetmeye</span> hazır mısınız?
          </h1>
          <p className="text-xl md:text-2xl text-gray-500 mb-14 max-w-2xl mx-auto leading-relaxed font-sans">
            Bilinçli değerlendirme, duygusal ipuçları ve bilimsel literatüre dayalı derinlemesine analizler.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <Link to="/new-analysis" className="w-full sm:w-auto px-10 py-5 bg-[#366824] text-white rounded-full font-bold text-xl hover:bg-[#1a3311] transition-all shadow-2xl hover:shadow-green-900/20 hover:-translate-y-1.5 flex items-center justify-center gap-3">
              Hemen Analiz Et <ArrowRight size={24} />
            </Link>
            <a 
              href="#nasil-calisir" 
              onClick={(e) => scrollToSection(e, 'nasil-calisir')}
              className="w-full sm:w-auto px-10 py-5 bg-white text-[#366824] border-2 border-[#366824]/10 rounded-full font-bold text-xl hover:bg-[#f6f0ea] transition-all flex items-center justify-center"
            >
              Nasıl Çalışır?
            </a>
          </div>
        </div>
        
        {/* Abstract Shapes */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1200px] h-[1200px] bg-gradient-to-tr from-[#366824]/5 to-[#bb8585]/5 rounded-full blur-[120px] -z-10 animate-pulse" />
      </section>

      {/* How It Works - Minimalist Design */}
      <section id="nasil-calisir" className="max-w-7xl mx-auto px-4 scroll-mt-32">
        <div className="text-center mb-24">
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-[#366824] mb-6">Nasıl Çalışır?</h2>
          <div className="w-20 h-1.5 bg-[#bb8585] mx-auto rounded-full mb-6" />
          <p className="text-gray-400 font-bold uppercase tracking-widest text-sm">3 Adımda Çocuk Çizim Analizi</p>
        </div>

        <div className="grid md:grid-cols-3 gap-12">
          {/* Step 1 */}
          <div className="bg-white p-12 rounded-[3rem] shadow-sm hover:shadow-2xl transition-all duration-500 group border border-transparent hover:border-[#eaddcf]">
             <div className="w-24 h-24 rounded-[2rem] bg-[#f6f0ea] flex items-center justify-center text-[#366824] mb-10 group-hover:bg-[#366824] group-hover:text-white transition-all duration-500 group-hover:rotate-6">
                <Upload size={40} strokeWidth={1.5} />
              </div>
              <h3 className="text-2xl font-bold font-serif text-[#366824] mb-6 tracking-tight">1. Çizimi Yükle</h3>
              <p className="text-gray-500 font-medium leading-relaxed">
                Kullanıcı çocuğunun çizimini sisteme yükler. Çizim yüksek güvenlikli sunucularda işlenir ve analiz için hazırlanır.
              </p>
          </div>

          {/* Step 2 */}
          <div className="bg-white p-12 rounded-[3rem] shadow-sm hover:shadow-2xl transition-all duration-500 group border border-transparent hover:border-[#eaddcf]">
             <div className="w-24 h-24 rounded-[2rem] bg-[#f6f0ea] flex items-center justify-center text-[#366824] mb-10 group-hover:bg-[#366824] group-hover:text-white transition-all duration-500 group-hover:-rotate-6">
                <Brain size={40} strokeWidth={1.5} />
              </div>
              <h3 className="text-2xl font-bold font-serif text-[#366824] mb-6 tracking-tight">2. AI Analiz Eder</h3>
              <p className="text-gray-500 font-medium leading-relaxed">
                Gelişmiş AI modelimiz; renk, çizgi baskısı, semboller ve yerleşimi literatürdeki (Machover, Koppitz vb.) bilimsel parametrelere göre inceler.
              </p>
          </div>

          {/* Step 3 */}
          <div className="bg-white p-12 rounded-[3rem] shadow-sm hover:shadow-2xl transition-all duration-500 group border border-transparent hover:border-[#eaddcf]">
             <div className="w-24 h-24 rounded-[2rem] bg-[#f6f0ea] flex items-center justify-center text-[#366824] mb-10 group-hover:bg-[#366824] group-hover:text-white transition-all duration-500 group-hover:scale-110">
                <FileText size={40} strokeWidth={1.5} />
              </div>
              <h3 className="text-2xl font-bold font-serif text-[#366824] mb-6 tracking-tight">3. Raporu İncele</h3>
              <p className="text-gray-500 font-medium leading-relaxed">
                Sade, ebeveyn dostu ve farkındalık yaratan analiz raporu anında sunulur. Tüm raporlar geçmiş bölümünde arşivlenir.
              </p>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="ornekler" className="bg-white py-32 border-y border-[#eaddcf]">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-24">
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-[#366824] mb-6">Kullanıcı Deneyimleri</h2>
            <p className="text-gray-400 font-bold uppercase tracking-widest text-sm">Fark Yaratan Hikayeler</p>
          </div>
          <div className="grid md:grid-cols-3 gap-10">
            {[
              { text: "Çocuğumun çizimlerindeki detayları bu kadar derin yorumlayan bir sistem beklemiyordum. Gerçekten farkındalık yarattı.", author: "Ebrar", role: "6 Yaş Ebeveyni" },
              { text: "Öğrencimin çizim analizi sonucunda sosyal kaygıya işaret eden davranışları erken fark ettim.", author: "Ayşe", role: "Rehber Öğretmen" },
              { text: "Çocuğumun duygusal durumunu takip etmek için mükemmel bir kaynak oldu.", author: "Mehmet", role: "7 Yaş Ebeveyni" },
            ].map((t, i) => (
              <div key={i} className="bg-[#fbf8f5] p-10 rounded-[2.5rem] relative border border-[#eaddcf] shadow-sm hover:shadow-lg transition-all">
                <div className="flex gap-1 text-yellow-500 mb-6">
                  {[...Array(5)].map((_, si) => <Star key={si} size={20} fill="currentColor" />)}
                </div>
                <p className="text-gray-700 italic mb-8 leading-relaxed font-serif text-lg">"{t.text}"</p>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-[#366824] rounded-full flex items-center justify-center text-white font-bold">{t.author.charAt(0)}</div>
                  <div>
                    <div className="font-bold text-[#366824]">{t.author}</div>
                    <div className="text-xs text-[#bb8585] font-bold uppercase tracking-widest">{t.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing - Compact */}
      <section id="paketler" className="max-w-6xl mx-auto px-4 scroll-mt-24">
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-[#366824] mb-6">Plan Seçenekleri</h2>
          <p className="text-gray-500 font-medium">İhtiyacınıza uygun olanı seçerek hemen başlayın.</p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8 items-stretch">
          {/* Free */}
          <div className="bg-white p-10 rounded-[3rem] border border-[#eaddcf] shadow-sm flex flex-col group hover:-translate-y-2 transition-all">
            <h3 className="text-xl font-bold text-gray-800 mb-2">Başlangıç</h3>
            <div className="text-4xl font-serif font-bold text-[#366824] mb-8">0₺ <span className="text-sm font-sans font-normal text-gray-400">/ay</span></div>
            <ul className="space-y-4 mb-10 text-gray-600 font-medium flex-1">
              <li className="flex items-center gap-3"><Check size={20} className="text-green-500"/> 25 Analiz Hakkı</li>
              <li className="flex items-center gap-3"><Check size={20} className="text-green-500"/> Standart Rapor</li>
              <li className="flex items-center gap-3 text-gray-300"><span>✖</span> Reklamsız Deneyim</li>
            </ul>
            <button className="w-full py-4 rounded-2xl bg-gray-100 text-[#366824] font-bold hover:bg-[#366824] hover:text-white transition-all">Ücretsiz Başlat</button>
          </div>

          {/* Premium */}
          <div className="bg-[#366824] p-10 rounded-[3rem] shadow-2xl flex flex-col relative transform md:-translate-y-4">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-yellow-400 text-[#1a3311] px-5 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest shadow-xl">En Popüler</div>
            <h3 className="text-xl font-bold text-white/70 mb-2">Premium</h3>
            <div className="text-4xl font-serif font-bold text-white mb-8">25₺ <span className="text-sm font-sans font-normal text-white/50">/ay</span></div>
            <ul className="space-y-4 mb-10 text-white/80 font-medium flex-1">
              <li className="flex items-center gap-3"><Check size={20} className="text-yellow-400"/> 50 Analiz Hakkı</li>
              <li className="flex items-center gap-3"><Check size={20} className="text-yellow-400"/> Gelişmiş AI Raporu</li>
              <li className="flex items-center gap-3"><Check size={20} className="text-yellow-400"/> Tamamen Reklamsız</li>
            </ul>
            <button className="w-full py-4 rounded-2xl bg-white text-[#366824] font-bold hover:bg-yellow-400 transition-all shadow-xl">Hemen Premium Ol</button>
          </div>

          {/* Duo */}
          <div className="bg-white p-10 rounded-[3rem] border border-[#eaddcf] shadow-sm flex flex-col group hover:-translate-y-2 transition-all">
            <h3 className="text-xl font-bold text-gray-800 mb-2">Duo (Aile/Eğitmen)</h3>
            <div className="text-4xl font-serif font-bold text-[#366824] mb-8">50₺ <span className="text-sm font-sans font-normal text-gray-400">/ay</span></div>
            <ul className="space-y-4 mb-10 text-gray-600 font-medium flex-1">
              <li className="flex items-center gap-3"><Check size={20} className="text-green-500"/> Sınırsız Analiz</li>
              <li className="flex items-center gap-3"><Check size={20} className="text-green-500"/> 2 Ayrı Kullanıcı</li>
              <li className="flex items-center gap-3"><Check size={20} className="text-green-500"/> Uzman Paylaşım Modu</li>
            </ul>
            <button className="w-full py-4 rounded-2xl bg-[#366824] text-white font-bold hover:bg-[#1a3311] transition-all">Duo Paketini Al</button>
          </div>
        </div>
      </section>

      {/* Safety Banner */}
      <section className="max-w-4xl mx-auto px-4">
        <div className="bg-[#1a3311] rounded-[3rem] p-12 text-center text-white relative overflow-hidden">
          <ShieldCheck className="mx-auto mb-6 text-yellow-400" size={64} />
          <h2 className="text-3xl font-serif font-bold mb-4 italic">Güvenliğiniz Önceliğimizdir</h2>
          <p className="text-white/70 max-w-xl mx-auto mb-8 font-medium">Yüklediğiniz hiçbir çizim tıbbi tanı yerine geçmez ve verileriniz üçüncü taraflarla kesinlikle paylaşılmaz.</p>
          <div className="flex justify-center gap-8 opacity-50">
            <span className="font-bold tracking-widest text-[10px] uppercase">End-to-End Encrypted</span>
            <span className="font-bold tracking-widest text-[10px] uppercase">GDPR Compliant</span>
            <span className="font-bold tracking-widest text-[10px] uppercase">AI Ethics Verified</span>
          </div>
        </div>
      </section>

    </div>
  );
};

const SparkleIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/></svg>
);