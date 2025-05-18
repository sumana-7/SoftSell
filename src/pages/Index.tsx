import { useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import HowItWorks from '@/components/HowItWorks';
import WhyChooseUs from '@/components/WhyChooseUs';
import Testimonials from '@/components/Testimonials';
import ContactForm from '@/components/ContactForm';
import Footer from '@/components/Footer';
import BackToTop from '@/components/BackToTop';
import ChatBot from '@/components/ChatBot';
import { useAppData } from '@/hooks/useAppData';
import type { 
  NavbarProps, 
  HeroProps, 
  HowItWorksProps, 
  WhyChooseUsProps, 
  TestimonialsProps, 
  ContactFormProps 
} from '@/types';

const Index = () => {
  const {
    testimonials,
    features,
    softwareListings,
    loading,
    error,
    searchSoftware,
    filterByCategory,
    submitContactForm,
    subscribeNewsletter
  } = useAppData();

  useEffect(() => {
    // Update document title
    document.title = "SoftSell - The #1 Software License Resale Marketplace";
    // Add dark theme class to body
    document.body.classList.add('bg-softsell-darkPurple');
    return () => {
      document.body.classList.remove('bg-softsell-darkPurple');
    };
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-softsell-darkPurple">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-softsell-purple"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-softsell-darkPurple">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-red-400 mb-4">Oops! Something went wrong</h2>
          <p className="text-gray-300">{error}</p>
        </div>
      </div>
    );
  }

  const navbarProps: NavbarProps = { onSearch: searchSoftware };
  const heroProps: HeroProps = { onSearch: searchSoftware };
  const howItWorksProps: HowItWorksProps = { features };
  const whyChooseUsProps: WhyChooseUsProps = { softwareListings, onCategorySelect: filterByCategory };
  const testimonialsProps: TestimonialsProps = { testimonials };
  const contactFormProps: ContactFormProps = { onSubmit: submitContactForm, onSubscribe: subscribeNewsletter };

  return (
    <div className="flex flex-col min-h-screen bg-softsell-darkPurple text-white">
      <Navbar {...navbarProps} />
      <main className="flex-grow">
        <Hero {...heroProps} />
        <HowItWorks {...howItWorksProps} />
        <WhyChooseUs {...whyChooseUsProps} />
        <Testimonials {...testimonialsProps} />
        <ContactForm {...contactFormProps} />
      </main>
      <Footer />
      <BackToTop />
      <ChatBot />
    </div>
  );
};

export default Index;
