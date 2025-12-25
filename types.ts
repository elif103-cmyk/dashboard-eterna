import React from 'react';

export enum Mood {
  Happy = 'Mutlu',
  Anxious = 'Kaygılı',
  Angry = 'Öfkeli',
  Undecided = 'Kararsız',
  Sad = 'Üzgün',
  Unknown = 'Bilinmiyor'
}

export interface ChildProfile {
  age: number;
  gender?: string;
  mood: Mood;
  additionalInfo?: string;
}

export interface AnalysisRequest {
  profile: ChildProfile;
  imageBase64: string;
}

export interface AnalysisResult {
  id: string;
  date: string;
  profile: ChildProfile;
  imageBase64: string; // Storing base64 for history display (in a real app, use cloud storage URL)
  rawAnalysis: string; // The markdown response from AI
}

export interface NavItem {
  label: string;
  path: string;
  icon?: React.ReactNode;
}

// CRM Types
export interface Parent {
  id: string;
  email: string;
  created_at: string;
  status: 'active' | 'passive';
  plan: 'free' | 'premium' | 'duo';
}

export interface Child {
  id: string;
  parent_id: string;
  age: number;
  gender?: string;
  created_at: string;
  name?: string; // Optional identifier
}

export interface Subscription {
  parent_id: string;
  plan: 'free' | 'premium' | 'duo';
  status: 'active' | 'expired' | 'cancelled';
  renewal_date: string;
}