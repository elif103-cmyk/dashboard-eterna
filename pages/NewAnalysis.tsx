import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Upload, X, Loader2, Sparkles, AlertCircle } from 'lucide-react';
import { Mood } from '../types';
import { MOOD_OPTIONS } from '../constants';
import { analyzeDrawing } from '../services/geminiService';
import { saveAnalysis } from '../services/storageService';

export const NewAnalysis: React.FC = () => {
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [step, setStep] = useState<1 | 2>(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Form State
  const [image, setImage] = useState<string | null>(null);
  const [age, setAge] = useState<string>('');
  const [gender, setGender] = useState<string>('');
  const [mood, setMood] = useState<Mood>(Mood.Unknown);
  const [additionalInfo, setAdditionalInfo] = useState('');

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        setError("Dosya boyutu 5MB'dan küçük olmalıdır.");
        return;
      }
      
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result as string);
        setError(null);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveImage = () => {
    setImage(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleSubmit = async () => {
    if (!image || !age) {
      setError("Lütfen bir resim yükleyin ve çocuğun yaşını girin.");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const profile = {
        age: parseInt(age),
        gender,
        mood,
        additionalInfo
      };

      const resultText = await analyzeDrawing({
        profile,
        imageBase64: image
      });

      const newAnalysis = {
        id: crypto.randomUUID(),
        date: new Date().toISOString(),
        profile,
        imageBase64: image,
        rawAnalysis: resultText
      };

      saveAnalysis(newAnalysis);
      navigate(`/analysis/${newAnalysis.id}`);

    } catch (err: any) {
      setError(err.message || "Bir hata oluştu.");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
        <div className="relative">
            <div className="absolute inset-0 bg-eterna-secondary/20 rounded-full blur-xl animate-pulse"></div>
            <Loader2 size={64} className="text-eterna-primary animate-spin relative z-10" />
        </div>
        <h2 className="text-2xl font-serif font-bold text-eterna-primary mt-8 mb-2">Analiz Yapılıyor...</h2>
        <p className="text-gray-600 max-w-md">Eterna AI, çizimdeki renkleri, çizgileri ve sembolleri bilimsel parametrelere göre inceliyor. Lütfen bekleyin.</p>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-serif font-bold text-eterna-primary mb-2">Yeni Analiz</h1>
        <p className="text-gray-600">Çocuğunuzun çizimini yükleyin ve bağlam bilgilerini ekleyin.</p>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-[#eaddcf] overflow-hidden">
        {/* Progress Bar */}
        <div className="flex border-b border-[#eaddcf]">
            <button 
                onClick={() => setStep(1)}
                className={`flex-1 py-4 text-center font-medium transition-colors ${step === 1 ? 'bg-eterna-primary/5 text-eterna-primary border-b-2 border-eterna-primary' : 'text-gray-400'}`}
            >
                1. Görsel
            </button>
            <button 
                onClick={() => image && setStep(2)}
                disabled={!image}
                className={`flex-1 py-4 text-center font-medium transition-colors ${step === 2 ? 'bg-eterna-primary/5 text-eterna-primary border-b-2 border-eterna-primary' : 'text-gray-400'}`}
            >
                2. Profil
            </button>
        </div>

        <div className="p-6 md:p-8">
            {error && (
                <div className="bg-red-50 text-red-700 p-4 rounded-xl flex items-center gap-3 mb-6">
                    <AlertCircle size={20} />
                    {error}
                </div>
            )}

            {step === 1 ? (
                <div className="space-y-6">
                    <div 
                        className={`border-3 border-dashed rounded-2xl p-8 md:p-12 text-center transition-all ${
                            image ? 'border-eterna-primary/30 bg-eterna-primary/5' : 'border-gray-300 hover:border-eterna-primary hover:bg-gray-50'
                        }`}
                        onDragOver={(e) => e.preventDefault()}
                        onDrop={(e) => {
                            e.preventDefault();
                            const file = e.dataTransfer.files[0];
                            if (file) { /* Same logic as input */ }
                        }}
                    >
                        {image ? (
                            <div className="relative inline-block">
                                <img src={image} alt="Preview" className="max-h-80 rounded-lg shadow-md" />
                                <button 
                                    onClick={handleRemoveImage}
                                    className="absolute -top-3 -right-3 bg-red-500 text-white p-2 rounded-full hover:bg-red-600 shadow-sm"
                                >
                                    <X size={16} />
                                </button>
                            </div>
                        ) : (
                            <div onClick={() => fileInputRef.current?.click()} className="cursor-pointer">
                                <div className="w-20 h-20 bg-eterna-bg rounded-full flex items-center justify-center mx-auto mb-4 text-eterna-primary">
                                    <Upload size={32} />
                                </div>
                                <h3 className="text-xl font-bold text-gray-800 mb-2">Çizimi Yüklemek İçin Dokunun</h3>
                                <p className="text-gray-500 text-sm">veya dosyayı buraya sürükleyin (JPG, PNG)</p>
                            </div>
                        )}
                        <input 
                            type="file" 
                            ref={fileInputRef}
                            className="hidden" 
                            accept="image/*"
                            onChange={handleImageUpload}
                        />
                    </div>

                    <div className="flex justify-end">
                        <button 
                            onClick={() => setStep(2)}
                            disabled={!image}
                            className={`px-8 py-3 rounded-full font-bold flex items-center gap-2 transition-all ${
                                image 
                                    ? 'bg-eterna-primary text-white hover:bg-eterna-dark shadow-lg' 
                                    : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                            }`}
                        >
                            Devam Et <Sparkles size={18} />
                        </button>
                    </div>
                </div>
            ) : (
                <div className="space-y-6 animate-fadeIn">
                    <div className="grid md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-2">Çocuğun Yaşı *</label>
                            <input 
                                type="number" 
                                value={age}
                                onChange={(e) => setAge(e.target.value)}
                                className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-eterna-primary focus:ring-2 focus:ring-eterna-primary/20 outline-none transition-all bg-white text-black"
                                placeholder="Örn: 5"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-2">Cinsiyet (Opsiyonel)</label>
                            <select 
                                value={gender}
                                onChange={(e) => setGender(e.target.value)}
                                className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-eterna-primary focus:ring-2 focus:ring-eterna-primary/20 outline-none transition-all bg-white text-black"
                            >
                                <option value="">Seçiniz</option>
                                <option value="Kız">Kız</option>
                                <option value="Erkek">Erkek</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-2">Ruh Hali *</label>
                            <select 
                                value={mood}
                                onChange={(e) => setMood(e.target.value as Mood)}
                                className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-eterna-primary focus:ring-2 focus:ring-eterna-primary/20 outline-none transition-all bg-white text-black"
                            >
                                {MOOD_OPTIONS.map(opt => (
                                    <option key={opt.value} value={opt.value}>{opt.label}</option>
                                ))}
                            </select>
                        </div>
                        <div className="md:col-span-2">
                            <label className="block text-sm font-bold text-gray-700 mb-2">Ek Bilgi (İsteğe Bağlı)</label>
                            <textarea 
                                value={additionalInfo}
                                onChange={(e) => setAdditionalInfo(e.target.value)}
                                className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-eterna-primary focus:ring-2 focus:ring-eterna-primary/20 outline-none transition-all h-24 resize-none bg-white text-black"
                                placeholder="Aile durumu, okul hayatı, son yaşanan olaylar vb."
                            />
                        </div>
                    </div>

                    <div className="flex justify-between pt-4">
                        <button 
                            onClick={() => setStep(1)}
                            className="px-6 py-3 text-gray-600 font-medium hover:text-eterna-primary transition-colors"
                        >
                            Geri Dön
                        </button>
                        <button 
                            onClick={handleSubmit}
                            className="px-8 py-3 bg-eterna-primary text-white rounded-full font-bold shadow-xl hover:bg-eterna-dark hover:shadow-2xl hover:-translate-y-1 transition-all flex items-center gap-2"
                        >
                            Analizi Başlat <Sparkles size={18} />
                        </button>
                    </div>
                </div>
            )}
        </div>
      </div>
    </div>
  );
};