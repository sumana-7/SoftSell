// Types based on existing dummy data
interface Testimonial {
  name: string;
  role: string;
  company: string;
  message?: string;
  quote?: string;
  image?: string;
}

interface Feature {
  title: string;
  description: string;
  icon: string;
}

interface SoftwareListing {
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

// Import existing dummy data
import { testimonials, features, softwareListings } from '../data/dummyData.js';

// Simulate API delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const api = {
  // Testimonials
  async getTestimonials(): Promise<Testimonial[]> {
    await delay(500);
    return testimonials;
  },

  // Features
  async getFeatures(): Promise<Feature[]> {
    await delay(500);
    return features;
  },

  // Software Listings
  async getSoftwareListings(): Promise<SoftwareListing[]> {
    await delay(500);
    return softwareListings;
  },

  async searchSoftware(query: string): Promise<SoftwareListing[]> {
    await delay(500);
    return softwareListings.filter(listing => 
      listing.name.toLowerCase().includes(query.toLowerCase()) ||
      listing.description.toLowerCase().includes(query.toLowerCase())
    );
  },

  async getSoftwareByCategory(category: string): Promise<SoftwareListing[]> {
    await delay(500);
    return softwareListings.filter(listing => 
      listing.category.toLowerCase() === category.toLowerCase()
    );
  },

  // Contact Form
  async submitContactForm(data: {
    name: string;
    email: string;
    message: string;
  }): Promise<{ success: boolean; message: string }> {
    await delay(1000);
    // Simulate form submission
    console.log('Contact form submitted:', data);
    return {
      success: true,
      message: 'Thank you for your message. We will get back to you soon!'
    };
  },

  // Newsletter Subscription
  async subscribeNewsletter(email: string): Promise<{ success: boolean; message: string }> {
    await delay(800);
    // Simulate newsletter subscription
    console.log('Newsletter subscription:', email);
    return {
      success: true,
      message: 'Successfully subscribed to our newsletter!'
    };
  }
}; 