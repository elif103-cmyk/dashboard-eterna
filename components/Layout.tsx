import React, { useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { Sidebar } from './Sidebar';
import { MobileHeader } from './MobileHeader';
import { Logo } from './Logo';
import { InfoModal } from './InfoModal';

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  const location = useLocation();
  const isLandingPage = location.pathname === '/';
  const [activeModal, setActiveModal] = useState<'about' | 'kvkk' | 'ethics' | null>(null);

  const scrollToSection = (e: React.MouseEvent, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  if (isLandingPage) {
    return (
      <div className="min-h-screen flex flex-col bg-[#f6f0ea]">
        <header className="fixed w-full top-0 bg-[#f6f0ea]/90 backdrop-blur-md z-50 border-b border-[#eaddcf]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
            <Logo />
            <nav className="hidden md:flex items-center gap-8">
              <a href="#nasil-calisir" onClick={(e) => scrollToSection(e, 'nasil-calisir')} className="text-[#366824] font-medium hover:text-[#bb8585] transition-colors">Nasıl Çalışır?</a>
              <a href="#paketler" onClick={(e) => scrollToSection(e, 'paketler')} className="text-[#366824] font-medium hover:text-[#bb8585] transition-colors">Paket Tercihleri</a>
              <a href="#ornekler" onClick={(e) => scrollToSection(e, 'ornekler')} className="text-[#366824] font-medium hover:text-[#bb8585] transition-colors">Örnek Analizler</a>
            </nav>
            <div className="flex items-center gap-4">
              <Link to="/dashboard" className="hidden md:block text-[#366824] font-medium hover:underline">Giriş Yap</Link>
              <Link to="/dashboard" className="bg-[#366824] text-white px-5 py-2 rounded-full font-medium hover:bg-[#1a3311] transition-all shadow-md transform hover:-translate-y-0.5 text-sm">
                Kullanıcı Profili
              </Link>
            </div>
          </div>
        </header>

        <main className="flex-grow pt-20">{children}</main>

        <footer className="bg-[#f6f0ea] border-t border-[#eaddcf] py-20 mt-auto">
          <div className="max-w-7xl mx-auto px-4">
            <div className="grid md:grid-cols-3 gap-16 mb-16 text-center md:text-left">
              <div>
                <h3 className="text-[#366824] font-serif font-bold text-xl mb-6">Hakkımızda</h3>
                <button onClick={() => setActiveModal('about')} className="text-gray-600 hover:text-[#366824] transition-colors">Bizi Tanıyın</button>
              </div>
              <div>
                <h3 className="text-[#366824] font-serif font-bold text-xl mb-6">Güvenlik</h3>
                <div className="flex flex-col gap-3">
                  <button onClick={() => setActiveModal('kvkk')} className="text-gray-600 hover:text-[#366824] transition-colors">KVKK Bilgilendirmesi</button>
                  <button onClick={() => setActiveModal('ethics')} className="text-gray-600 hover:text-[#366824] transition-colors">AI Etik İlkeleri</button>
                </div>
              </div>
              <div>
                <h3 className="text-[#366824] font-serif font-bold text-xl mb-6">İletişim</h3>
                <div className="flex flex-col gap-3">
                  <a href="mailto:eterna2025@gmail.com" className="text-gray-600 hover:text-[#366824] transition-colors">eterna2025@gmail.com</a>
                  <a href="https://instagram.com/eterna" target="_blank" rel="noreferrer" className="text-gray-600 hover:text-[#366824] transition-colors">Instagram - @eterna</a>
                </div>
              </div>
            </div>
            <div className="border-t border-[#eaddcf] pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
              <Logo className="h-6 opacity-50 grayscale" />
              <p className="text-sm text-gray-400 font-medium">© ETERNA 2025. Tüm hakları saklıdır.</p>
            </div>
          </div>
        </footer>

        <InfoModal isOpen={activeModal === 'about'} onClose={() => setActiveModal(null)} title="Hakkımızda">
          <div className="space-y-4">
            <p>Biz <strong>Bahar İlayda Sabuncu</strong>, <strong>Büşra Küçük</strong> ve <strong>Elif Eren</strong>; Yönetim Bilişim Sistemleri 3. sınıf öğrencileri olarak teknolojiyi insan yararına kullanmayı amaçlayan bir ekibiz.</p>
            <p>Eterna projesi, çocukların çizimlerine gizlenmiş duygu, düşünce ve ipuçlarını daha iyi anlamak için yola çıktığımız bir çalışmadır.</p>
            <p>Psikologların ve psikiyatristlerin bilimsel yaklaşımlarından, çocuk çizimleri üzerine yapılan akademik araştırmalardan yararlanarak; çizim analizini güvenilir hale getirmeyi hedefliyoruz.</p>
            <p className="italic font-medium text-[#366824]">Eterna, öğrenciyken başlayan bir hayalin; teknolojiyi toplumsal fayda ile birleştirme isteğimizin ilk adımıdır.</p>
          </div>
        </InfoModal>

        <InfoModal isOpen={activeModal === 'kvkk'} onClose={() => setActiveModal(null)} title="KVKK Aydınlatma Metni">
          <ul className="list-disc pl-5 space-y-3">
            <li>ETERNA kapsamında yüklenen çizimler yalnızca analiz amacıyla işlenmektedir.</li>
            <li>Kişisel kimlik bilgileri talep edilmez ve veriler üçüncü kişilerle paylaşılmaz.</li>
            <li>Veriler, 6698 sayılı KVKK kapsamında hassasiyetle korunur.</li>
            <li>Kullanıcı dilediği zaman verilerinin silinmesini talep edebilir.</li>
            <li className="font-bold text-[#bb8585]">Sunulan analizler tıbbi teşhis amacı taşımaz.</li>
          </ul>
        </InfoModal>

        <InfoModal isOpen={activeModal === 'ethics'} onClose={() => setActiveModal(null)} title="AI Etik İlkeleri">
          <ul className="list-disc pl-5 space-y-3">
            <li>Yapay zeka sistemimiz kesin tanı koymaz, farkındalık yaratmayı amaçlar.</li>
            <li>Bilimsel literatüre dayalı ihtimaller sunulur.</li>
            <li>Sistem, ayrımcı veya etiketleyici dilden tamamen arındırılmıştır.</li>
            <li>Çocuk verileri en yüksek gizlilik standartlarında işlenir.</li>
          </ul>
        </InfoModal>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f6f0ea]">
      <Sidebar />
      <MobileHeader />
      <main className="md:ml-64 pt-16 md:pt-0 min-h-screen transition-all duration-300">
        <div className="p-4 md:p-8 lg:p-12 max-w-6xl mx-auto animate-fadeIn">
          {children}
        </div>
      </main>
    </div>
  );
};