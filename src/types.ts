import React from 'react';

export type Language = 'es' | 'en';

export interface StatItem {
  value: string;
  label: string;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  longDescription: string;
  features: string[];
  challenges: string[];
  techStack: string[];
  brandColor?: string; // Gradient color class (e.g. "from-blue-500/20")
  imageUrl: string;
  videoUrl?: string; // New property for modal video
  liveUrl?: string;
  repoUrl?: string;
}

export interface ProjectWithStyle extends Project {
  className?: string;
}

export interface TechItem {
  name: string;
  icon: React.ElementType;
}