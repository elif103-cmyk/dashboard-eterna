import { Parent, Child, AnalysisResult } from '../types';
import { getHistory } from './storageService';

// Mock Data - Significantly increased for a populated look
const MOCK_PARENTS: Parent[] = [
  { id: 'p1', email: 'ayse.yilmaz@example.com', created_at: '2023-11-15T10:00:00Z', status: 'active', plan: 'premium' },
  { id: 'p2', email: 'mehmet.demir@example.com', created_at: '2024-01-20T14:30:00Z', status: 'active', plan: 'free' },
  { id: 'p3', email: 'zeynep.kaya@example.com', created_at: '2024-02-10T09:15:00Z', status: 'passive', plan: 'duo' },
  { id: 'p4', email: 'ali.vural@example.com', created_at: '2024-03-05T11:20:00Z', status: 'active', plan: 'premium' },
  { id: 'p5', email: 'seda.nur@example.com', created_at: '2024-03-12T16:45:00Z', status: 'active', plan: 'free' },
  { id: 'p6', email: 'canan.tan@example.com', created_at: '2024-04-01T10:00:00Z', status: 'active', plan: 'premium' },
  { id: 'p7', email: 'kerem.aksoy@example.com', created_at: '2024-04-15T12:30:00Z', status: 'active', plan: 'duo' },
  { id: 'p8', email: 'deniz.ay@example.com', created_at: '2024-05-02T09:15:00Z', status: 'active', plan: 'free' },
  { id: 'p9', email: 'murat.oz@example.com', created_at: '2024-05-20T14:45:00Z', status: 'active', plan: 'premium' },
  { id: 'p10', email: 'asli.mert@example.com', created_at: '2024-06-05T11:20:00Z', status: 'active', plan: 'duo' },
  { id: 'p11', email: 'burak.yil@example.com', created_at: '2024-06-15T16:45:00Z', status: 'active', plan: 'free' },
  { id: 'p12', email: 'selin.gok@example.com', created_at: '2024-07-01T10:00:00Z', status: 'active', plan: 'premium' },
  { id: 'p13', email: 'hakan.can@example.com', created_at: '2024-07-05T10:00:00Z', status: 'active', plan: 'premium' },
  { id: 'p14', email: 'emel.su@example.com', created_at: '2024-07-10T12:30:00Z', status: 'active', plan: 'free' },
  { id: 'p15', email: 'ozan.mert@example.com', created_at: '2024-07-15T09:15:00Z', status: 'active', plan: 'premium' },
];

const MOCK_CHILDREN: Child[] = [
  { id: 'c1', parent_id: 'p1', age: 6, gender: 'Kız', created_at: '2023-11-15T10:05:00Z', name: 'Elif' },
  { id: 'c2', parent_id: 'p1', age: 8, gender: 'Erkek', created_at: '2023-11-15T10:05:00Z', name: 'Can' },
  { id: 'c3', parent_id: 'p2', age: 5, gender: 'Erkek', created_at: '2024-01-20T14:35:00Z', name: 'Mert' },
  { id: 'c4', parent_id: 'p3', age: 7, gender: 'Kız', created_at: '2024-02-10T09:20:00Z', name: 'Selin' },
  { id: 'c5', parent_id: 'p4', age: 9, gender: 'Erkek', created_at: '2024-03-05T11:25:00Z', name: 'Kerem' },
  { id: 'c6', parent_id: 'p6', age: 4, gender: 'Kız', created_at: '2024-04-01T10:05:00Z', name: 'Ada' },
  { id: 'c7', parent_id: 'p7', age: 10, gender: 'Erkek', created_at: '2024-04-15T12:35:00Z', name: 'Umut' },
  { id: 'c8', parent_id: 'p10', age: 6, gender: 'Kız', created_at: '2024-06-05T11:25:00Z', name: 'Derin' },
];

// Helper to get dummy analysis content
const getDummyAnalysisJSON = (mood: string) => JSON.stringify({
  sections: [
    { title: "Genel Duygusal Değerlendirme", content: [`Çocuğun ruh hali ${mood.toLowerCase()} görünüyor.`] },
    { title: "Renk Kullanımının Yorumu", content: ["Renkler duygusal yoğunluğu yansıtıyor."] },
    { title: "Çizgi Baskısı", content: ["Orta baskı seviyesi, normal enerji düzeyine işaret ediyor."] },
    { title: "Figürler", content: ["Figür detayları yaş grubuna uygun."] },
    { title: "Alan Kullanımı", content: ["Kağıdın merkezi kullanılmış."] },
    { title: "Gelişimsel Uygunluk", content: ["Yaşıyla uyumlu motor beceriler."] },
    { title: "Bilimsel Yaklaşım", content: ["Machover testine göre standart bulgular."] },
    { title: "Sonuç", content: ["Endişe verici bir durum gözlenmedi."] }
  ]
});

const MOCK_ANALYSES: AnalysisResult[] = [
  { id: 'a1', date: '2023-12-01T10:00:00Z', profile: { age: 6, gender: 'Kız', mood: 'Mutlu' as any }, imageBase64: 'https://placehold.co/400x400/png?text=Elif+Drawing', rawAnalysis: getDummyAnalysisJSON('Mutlu') },
  { id: 'a2', date: '2024-02-01T15:00:00Z', profile: { age: 8, gender: 'Erkek', mood: 'Kaygılı' as any }, imageBase64: 'https://placehold.co/400x400/png?text=Can+Drawing', rawAnalysis: getDummyAnalysisJSON('Kaygılı') },
  { id: 'a3', date: '2024-03-10T09:30:00Z', profile: { age: 5, gender: 'Erkek', mood: 'Öfkeli' as any }, imageBase64: 'https://placehold.co/400x400/png?text=Mert+Drawing', rawAnalysis: getDummyAnalysisJSON('Öfkeli') },
  { id: 'a4', date: '2024-03-14T14:15:00Z', profile: { age: 7, gender: 'Kız', mood: 'Mutlu' as any }, imageBase64: 'https://placehold.co/400x400/png?text=Selin+Drawing', rawAnalysis: getDummyAnalysisJSON('Mutlu') },
  { id: 'a5', date: '2024-03-15T11:00:00Z', profile: { age: 9, gender: 'Erkek', mood: 'Kararsız' as any }, imageBase64: 'https://placehold.co/400x400/png?text=Kerem+Drawing', rawAnalysis: getDummyAnalysisJSON('Kararsız') },
  { id: 'a6', date: '2024-04-10T11:00:00Z', profile: { age: 4, gender: 'Kız', mood: 'Mutlu' as any }, imageBase64: 'https://placehold.co/400x400/png?text=Ada+Drawing', rawAnalysis: getDummyAnalysisJSON('Mutlu') },
  { id: 'a7', date: '2024-05-15T11:00:00Z', profile: { age: 10, gender: 'Erkek', mood: 'Kaygılı' as any }, imageBase64: 'https://placehold.co/400x400/png?text=Umut+Drawing', rawAnalysis: getDummyAnalysisJSON('Kaygılı') },
  { id: 'a8', date: '2024-06-20T11:00:00Z', profile: { age: 6, gender: 'Kız', mood: 'Mutlu' as any }, imageBase64: 'https://placehold.co/400x400/png?text=Derin+Drawing', rawAnalysis: getDummyAnalysisJSON('Mutlu') },
  { id: 'a9', date: new Date().toISOString(), profile: { age: 7, gender: 'Kız', mood: 'Mutlu' as any }, imageBase64: 'https://placehold.co/400x400/png?text=Today+1', rawAnalysis: getDummyAnalysisJSON('Mutlu') },
  { id: 'a10', date: new Date().toISOString(), profile: { age: 5, gender: 'Erkek', mood: 'Öfkeli' as any }, imageBase64: 'https://placehold.co/400x400/png?text=Today+2', rawAnalysis: getDummyAnalysisJSON('Öfkeli') },
];

const ANALYSIS_CHILD_MAP: Record<string, string> = {
  'a1': 'c1', 'a2': 'c2', 'a3': 'c3', 'a4': 'c4', 'a5': 'c5', 'a6': 'c6', 'a7': 'c7', 'a8': 'c8'
};

// --- SUPPORT TICKETS ---
export interface SupportTicket {
    id: string;
    userId: string;
    subject: string;
    status: 'Yeni' | 'İnceleniyor' | 'Çözüldü';
    priority: 'Düşük' | 'Orta' | 'Yüksek';
    date: string;
}

const MOCK_TICKETS: SupportTicket[] = [
    { id: 't1', userId: 'p2', subject: 'Analiz raporum açılmıyor', status: 'Yeni', priority: 'Yüksek', date: '2024-03-15T08:30:00Z' },
    { id: 't2', userId: 'p1', subject: 'Üyelik yükseltme sorunu', status: 'İnceleniyor', priority: 'Orta', date: '2024-03-14T15:45:00Z' },
    { id: 't3', userId: 'p3', subject: 'Geçmiş analizlerimi göremiyorum', status: 'Çözüldü', priority: 'Düşük', date: '2024-03-10T11:20:00Z' },
    { id: 't4', userId: 'p6', subject: 'Ödeme başarılı ama plan değişmedi', status: 'Yeni', priority: 'Yüksek', date: '2024-04-05T09:00:00Z' },
];

// --- HELPER TO MERGE LOCAL DATA ---
const getCombinedAnalyses = (): AnalysisResult[] => {
  const localData = getHistory();
  return [...MOCK_ANALYSES, ...localData];
};

// --- SERVICE METHODS ---

export const getParents = (): Parent[] => MOCK_PARENTS;
export const getParentById = (id: string): Parent | undefined => MOCK_PARENTS.find(p => p.id === id);
export const getChildrenByParentId = (parentId: string): Child[] => MOCK_CHILDREN.filter(c => c.parent_id === parentId);
export const getChildById = (id: string): Child | undefined => MOCK_CHILDREN.find(c => c.id === id);

// Simulates the currently logged in user (Mock Parent 1)
export const getCurrentUser = () => {
    const parent = MOCK_PARENTS[0];
    const children = MOCK_CHILDREN.filter(c => c.parent_id === parent.id);
    return { parent, children };
};

export const getAnalysesByChildId = (childId: string): AnalysisResult[] => {
  // Only returns mock analyses for mock children
  return MOCK_ANALYSES.filter(a => ANALYSIS_CHILD_MAP[a.id] === childId);
};

export const getCRMAnalysisById = (id: string): AnalysisResult | undefined => {
  return getCombinedAnalyses().find(a => a.id === id);
};

// CRM Dashboard specific
export const getAllAnalyses = (): (AnalysisResult & { childName?: string })[] => {
    const combined = getCombinedAnalyses();
    
    return combined.map(a => {
        const childId = ANALYSIS_CHILD_MAP[a.id];
        let childName = 'Misafir Kullanıcı';
        
        if (childId) {
            const child = MOCK_CHILDREN.find(c => c.id === childId);
            if (child) childName = child.name || 'İsimsiz';
        } else {
            childName = `Çocuk (${a.profile.age} Yaş)`;
        }

        return { ...a, childName };
    }).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
};

export const getSupportTickets = (): SupportTicket[] => MOCK_TICKETS;

export const getDashboardStats = () => {
    return {
        totalUsers: 8425, 
        analysesToday: 156, 
        totalAnalyses: 42180, 
        pendingTickets: MOCK_TICKETS.filter(t => t.status !== 'Çözüldü').length + 4
    };
};

export const getReportData = () => {
  return {
    ageDistribution: [
      { age: '3-4', count: 120 },
      { age: '5-6', count: 450 },
      { age: '7-8', count: 320 },
      { age: '9-10', count: 180 },
      { age: '11+', count: 75 }
    ],
    moodTrends: [
      { month: 'Ocak', happy: 65, anxious: 20, angry: 15 },
      { month: 'Şubat', happy: 62, anxious: 25, angry: 13 },
      { month: 'Mart', happy: 70, anxious: 18, angry: 12 },
      { month: 'Nisan', happy: 55, anxious: 30, angry: 15 },
      { month: 'Mayıs', happy: 68, anxious: 22, angry: 10 }
    ],
    revenueInsights: {
      free: 65,
      premium: 25,
      duo: 10
    }
  };
};
