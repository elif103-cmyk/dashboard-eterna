import React from 'react';

export const About: React.FC = () => {
  return (
    <div className="max-w-3xl mx-auto pb-20">
      <div className="bg-white p-8 md:p-12 rounded-2xl shadow-sm border border-[#eaddcf]">
        <h1 className="text-3xl md:text-4xl font-serif font-bold text-eterna-primary mb-8 text-center">Hakkımızda</h1>
        
        <div className="space-y-6 text-gray-700 leading-relaxed text-lg">
          <p>
            Biz <strong className="text-eterna-primary">Bahar İlayda Sabuncu</strong>, <strong className="text-eterna-primary">Büşra Küçük</strong> ve <strong className="text-eterna-primary">Elif Eren</strong>; Yönetim Bilişim Sistemleri 3. sınıf öğrencileri olarak teknolojiyi insan yararına kullanmayı amaçlayan bir ekibiz.
          </p>
          
          <p>
            Eterna projesi, çocukların çizimlerine gizlenmiş duygu, düşünce ve ipuçlarını daha iyi anlamak için yola çıktığımız bir çalışmadır.
          </p>
          
          <p>
            Psikologların ve psikiyatristlerin bilimsel yaklaşımlarından, çocuk çizimleri üzerine yapılan akademik araştırmalardan ve geniş veri setlerinden yararlanarak; çizim analizini kolay, anlaşılır ve güvenilir hale getirmeyi hedefliyoruz.
          </p>
          
          <p>
            Amacımız; ailelerin ve uzmanların çocukların iç dünyasına dair farkındalık kazanmasını sağlamak, bunu yaparken de süreci güvenilir, sade ve ulaşılabilir bir deneyime dönüştürmektir.
          </p>
          
          <p className="border-t border-[#eaddcf] pt-6 italic text-eterna-primary font-medium">
            Eterna, öğrenciyken başlayan bir hayalin; teknolojiyi toplumsal fayda ile birleştirme isteğimizin ilk adımıdır. Geliştirmeye ve yenilemeye devam ediyoruz.
          </p>
        </div>
      </div>
    </div>
  );
};