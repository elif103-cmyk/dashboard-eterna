import { GoogleGenAI, Type } from "@google/genai";
import { AnalysisRequest } from "../types";
import { ETERNA_SYSTEM_PROMPT } from "../constants";

export const analyzeDrawing = async (request: AnalysisRequest): Promise<string> => {
  // Fix: Initializing GoogleGenAI directly with process.env.API_KEY as per coding guidelines
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

  // Prepare the prompt content
  const profileText = `
    Çocuk Profili:
    - Yaş: ${request.profile.age}
    - Cinsiyet: ${request.profile.gender || 'Belirtilmedi'}
    - Ruh Hali: ${request.profile.mood}
    - Ek Bilgiler: ${request.profile.additionalInfo || 'Yok'}
    
    Lütfen ekteki çizimi bu bağlamda analiz et.
  `;

  try {
    const response = await ai.models.generateContent({
      // Fix: Using gemini-3-pro-preview for complex reasoning and multimodal analysis tasks
      model: 'gemini-3-pro-preview',
      config: {
        systemInstruction: ETERNA_SYSTEM_PROMPT,
        responseMimeType: 'application/json',
        // Fix: Added responseSchema to ensure reliable JSON structured output as recommended
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            sections: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  title: {
                    type: Type.STRING,
                    description: 'Analysis section title'
                  },
                  content: {
                    type: Type.ARRAY,
                    items: {
                      type: Type.STRING
                    },
                    description: 'Paragraphs of the section content'
                  }
                },
                required: ['title', 'content'],
                propertyOrdering: ['title', 'content']
              }
            }
          },
          required: ['sections']
        }
      },
      contents: {
        parts: [
            {
                text: profileText
            },
            {
                inlineData: {
                    mimeType: 'image/jpeg', 
                    data: request.imageBase64.split(',')[1] // Remove data:image/jpeg;base64, prefix
                }
            }
        ]
      }
    });

    // Fix: Directly access the .text property from the GenerateContentResponse object
    return response.text || "Analiz oluşturulamadı. Lütfen tekrar deneyin.";
  } catch (error: any) {
    console.error("Gemini API Error:", error);
    // User-friendly error mapping
    if (error.message?.includes('API_KEY')) {
        throw new Error("API Anahtarı geçersiz veya eksik.");
    }
    throw new Error("Analiz sırasında bir hata oluştu. Lütfen görseli ve internet bağlantınızı kontrol edin.");
  }
};