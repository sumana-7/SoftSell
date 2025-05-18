export interface Testimonial {
  name: string;
  role: string;
  company: string;
  message?: string;
  quote?: string;
  image?: string;
}

export interface Feature {
  title: string;
  description: string;
  icon: string;
}

export interface SoftwareListing {
  id: number;
  name: string;
  description: string;
  originalPrice: number;
  discountedPrice: number;
  seller: string;
  category: string;
  licenseType: string;
  validUntil: string;
}

// Component Props
export interface NavbarProps {
  onSearch: (query: string) => Promise<void>;
}

export interface HeroProps {
  onSearch: (query: string) => Promise<void>;
}

export interface HowItWorksProps {
  features: Feature[];
}

export interface WhyChooseUsProps {
  softwareListings: SoftwareListing[];
  onCategorySelect: (category: string) => Promise<void>;
}

export interface TestimonialsProps {
  testimonials: Testimonial[];
}

export interface ContactFormProps {
  onSubmit: (data: { name: string; email: string; message: string }) => Promise<{ success: boolean; message: string }>;
  onSubscribe: (email: string) => Promise<{ success: boolean; message: string }>;
}

export interface FooterProps {}

export interface BackToTopProps {}

export interface ChatBotProps {} 