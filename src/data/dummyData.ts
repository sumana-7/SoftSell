export interface Testimonial {
  id: number;
  name: string;
  role: string;
  company: string;
  content: string;
  image: string;
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

export interface FAQ {
  id: number;
  question: string;
  answer: string;
}

export const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "John Smith",
    role: "CTO",
    company: "TechCorp",
    content: "SoftSell helped us save 60% on our software licenses. The process was smooth and secure.",
    image: "/avatars/john-smith.jpg"
  },
  {
    id: 2,
    name: "Sarah Johnson",
    role: "IT Director",
    company: "InnovateNow",
    content: "Outstanding platform for buying and selling software licenses. Highly recommended!",
    image: "/avatars/sarah-johnson.jpg"
  },
  {
    id: 3,
    name: "Mike Chen",
    role: "Startup Founder",
    company: "FutureTech",
    content: "Found exactly what we needed at a fraction of the cost. Great customer service too!",
    image: "/avatars/mike-chen.jpg"
  }
];

export const softwareListings: SoftwareListing[] = [
  {
    id: 1,
    name: "Adobe Creative Cloud",
    description: "Full suite of creative tools including Photoshop, Illustrator, and more",
    originalPrice: 599.99,
    discountedPrice: 299.99,
    seller: "LicenseHub",
    category: "Creative",
    licenseType: "Annual",
    validUntil: "2025-12-31"
  },
  {
    id: 2,
    name: "Microsoft Office 365",
    description: "Complete office suite with Word, Excel, PowerPoint, and Teams",
    originalPrice: 299.99,
    discountedPrice: 149.99,
    seller: "SoftwareDeals",
    category: "Productivity",
    licenseType: "Annual",
    validUntil: "2025-12-31"
  },
  {
    id: 3,
    name: "AutoCAD 2024",
    description: "Professional CAD software for 2D and 3D design",
    originalPrice: 1799.99,
    discountedPrice: 899.99,
    seller: "CADReseller",
    category: "Engineering",
    licenseType: "Perpetual",
    validUntil: "Lifetime"
  }
];

export const faqs: FAQ[] = [
  {
    id: 1,
    question: "How does SoftSell verify software licenses?",
    answer: "We use a comprehensive verification system that checks the authenticity and validity of each license before listing. Our team works directly with software vendors to ensure compliance."
  },
  {
    id: 2,
    question: "What happens if a license doesn't work?",
    answer: "We offer a 30-day money-back guarantee on all purchases. If you encounter any issues, our support team will assist you or provide a full refund."
  },
  {
    id: 3,
    question: "Can I sell my unused software licenses?",
    answer: "Yes! You can list your unused or transferable software licenses on our platform. We'll help you verify the license and connect you with potential buyers."
  }
]; 