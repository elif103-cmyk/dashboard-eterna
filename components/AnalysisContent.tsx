import React from 'react';
import ReactMarkdown from 'react-markdown';

interface AnalysisContentProps {
  rawAnalysis: string;
}

export const AnalysisContent: React.FC<AnalysisContentProps> = ({ rawAnalysis }) => {
  const renderContent = (text: string) => {
    // 1. Try to parse as JSON first (New Format)
    try {
      const json = JSON.parse(text);
      if (json.sections && Array.isArray(json.sections)) {
        return (
          <div className="space-y-6">
            {json.sections.map((section: { title: string; content: string[] }, idx: number) => (
              <div key={idx} className="bg-white rounded-xl border border-[#eaddcf] shadow-sm overflow-hidden hover:shadow-md transition-shadow">
                <div className="bg-[#fbf8f5] px-6 py-4 border-b border-[#eaddcf] flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-eterna-primary text-white flex items-center justify-center font-serif font-bold text-lg flex-shrink-0 shadow-sm">
                    {idx + 1}
                  </div>
                  <h3 className="text-lg font-bold text-eterna-primary font-serif">{section.title}</h3>
                </div>
                <div className="p-6 text-gray-600 leading-relaxed space-y-4">
                  {section.content.map((paragraph, pIdx) => (
                    <p key={pIdx}>{paragraph}</p>
                  ))}
                </div>
              </div>
            ))}
          </div>
        );
      }
    } catch (e) {
      // Not JSON, fall through to Markdown parsing
    }

    // 2. Fallback to Markdown regex parsing (Old Format)
    const sections = text.split(/(?:^|\n)(?=\d+\.\s)/).filter(s => s.trim().length > 0);

    if (sections.length > 0) {
      return (
        <div className="space-y-6">
            {sections.map((section, idx) => {
                const match = section.match(/^(\d+)\.\s+(.+?)(?:\n|$)/);
                if (match) {
                    const number = match[1];
                    const rawTitle = match[2];
                    const cleanTitle = rawTitle.replace(/\*\*/g, '').trim();
                    const content = section.substring(match[0].length).trim();

                    return (
                        <div key={idx} className="bg-white rounded-xl border border-[#eaddcf] shadow-sm overflow-hidden hover:shadow-md transition-shadow">
                             <div className="bg-[#fbf8f5] px-6 py-4 border-b border-[#eaddcf] flex items-center gap-3">
                                 <div className="w-8 h-8 rounded-full bg-eterna-primary text-white flex items-center justify-center font-serif font-bold text-lg flex-shrink-0 shadow-sm">
                                    {number}
                                 </div>
                                 <h3 className="text-lg font-bold text-eterna-primary font-serif">{cleanTitle}</h3>
                            </div>
                            <div className="p-6 prose prose-lg max-w-none prose-p:text-gray-600 prose-p:leading-relaxed prose-li:text-gray-600 prose-strong:text-eterna-dark">
                                <ReactMarkdown>{content}</ReactMarkdown>
                            </div>
                        </div>
                    );
                } else {
                    return (
                        <div key={idx} className="bg-white p-6 rounded-xl border border-[#eaddcf] shadow-sm">
                            <div className="prose prose-lg max-w-none prose-p:text-gray-600 prose-p:leading-relaxed prose-strong:text-eterna-dark">
                                <ReactMarkdown>{section}</ReactMarkdown>
                            </div>
                        </div>
                    );
                }
            })}
        </div>
      );
    }
    
    // 3. Last resort fallback
    return (
        <div className="bg-white p-6 rounded-xl border border-[#eaddcf] shadow-sm">
            <p className="text-gray-600">{text}</p>
        </div>
    );
  };

  return <>{renderContent(rawAnalysis)}</>;
};