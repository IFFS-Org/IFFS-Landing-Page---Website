export interface Project {
  id: string;
  title: string;
  description: string;
  category: 'web-apps' | 'e-commerce' | 'brand-sites' | 'ai-integrations';
  tags: string[];
  techStack: string[];
  results: string;
  featured: boolean;
}

export interface Service {
  id: string;
  title: string;
  description: string;
  baselinePrice: number;
  iconName: string;
  features: string[];
}

export interface CalculatorOption {
  id: string;
  name: string;
  description: string;
  price: number;
  category: 'platform' | 'feature' | 'speed' | 'design';
}

export interface Inquiry {
  id: string;
  name: string;
  email: string;
  company: string;
  projectType: string;
  estimatedBudget: number;
  deliveryTimeline: string;
  details: string;
  status: 'Received' | 'Consultation Scheduled' | 'Under Review';
  createdAt: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  rating: number;
  text: string;
  avatarSeed: string; // for letter avatars or stylized icons
}
