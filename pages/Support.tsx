import React from 'react';
import { Mail, Instagram, Twitter } from 'lucide-react';

export const Support: React.FC = () => {
  return (
    <div className="max-w-2xl mx-auto">
       <h1 className="text-3xl font-serif font-bold text-eterna-primary mb-2">Destek</h1>
       <p className="text-gray-600 mb-8">Size nasıl yardımcı olabiliriz?</p>
       
       <div className="bg-white p-8 rounded-2xl shadow-sm border border-[#eaddcf] text-center">
            <h2 className="text-xl font-bold mb-6">Bize Ulaşın</h2>
            <div className="flex flex-col gap-4">
                <a href="mailto:destek@eterna.ai" className="flex items-center justify-center gap-3 p-4 bg-[#fbf8f5] rounded-xl hover:bg-eterna-primary/5 transition-colors text-eterna-dark font-medium">
                    <Mail size={20} /> destek@eterna.ai
                </a>
                <div className="grid grid-cols-2 gap-4">
                     <a href="#" className="flex items-center justify-center gap-2 p-4 bg-[#fbf8f5] rounded-xl hover:bg-eterna-primary/5 transition-colors text-eterna-dark">
                        <Instagram size={20} /> @eterna.ai
                    </a>
                     <a href="#" className="flex items-center justify-center gap-2 p-4 bg-[#fbf8f5] rounded-xl hover:bg-eterna-primary/5 transition-colors text-eterna-dark">
                        <Twitter size={20} /> @eterna_app
                    </a>
                </div>
            </div>
       </div>
    </div>
  );
};