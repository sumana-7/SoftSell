import { useState } from 'react';
import { Button } from './ui/button';
import { Check, Info } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import type { ContactFormProps } from '@/types';

const licenseTypes = [
  "Enterprise Software",
  "Creative Tools",
  "Development Tools",
  "Security Software",
  "Database Solutions",
  "Operating Systems",
  "Cloud Services",
  "Other"
];

const ContactForm: React.FC<ContactFormProps> = ({ onSubmit, onSubscribe }) => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    licenseType: '',
    message: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [formStatus, setFormStatus] = useState<{ success?: boolean; message?: string }>({});
  const [newsletterStatus, setNewsletterStatus] = useState<{ success?: boolean; message?: string }>({});

  const validate = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }
    
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }
    
    if (!formData.company.trim()) {
      newErrors.company = "Company name is required";
    }
    
    if (!formData.licenseType) {
      newErrors.licenseType = "Please select a license type";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error when field is updated
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await onSubmit(formData);
      setFormStatus({ success: true, message: response.message });
      setFormData({ name: '', email: '', company: '', licenseType: '', message: '' });
    } catch (error) {
      setFormStatus({ success: false, message: (error as Error).message });
    }
  };

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await onSubscribe(newsletterEmail);
      setNewsletterStatus({ success: true, message: response.message });
      setNewsletterEmail('');
    } catch (error) {
      setNewsletterStatus({ success: false, message: (error as Error).message });
    }
  };

  return (
    <section id="contact" className="py-20 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 left-0 w-full h-24 bg-gradient-to-b from-softsell-dark to-transparent"></div>
        <div className="absolute -bottom-32 -left-32 w-80 h-80 bg-softsell-purple/5 rounded-full blur-3xl"></div>
      </div>

      <div className="container-tight">
        <div className="grid md:grid-cols-2 gap-12 md:gap-20 items-center">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to <span className="gradient-text">Convert</span> Your Licenses?
            </h2>
            <p className="text-white/70 text-lg mb-8">
              Fill out the form and one of our software license valuation experts will get back to you within 24 hours with a no-obligation quote.
            </p>
            
            <div className="space-y-6">
              <div className="flex items-start">
                <Check className="h-6 w-6 text-softsell-purple mr-3 flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-bold mb-1">No-Obligation Valuation</h3>
                  <p className="text-white/70">Get a free assessment without any commitment to sell.</p>
                </div>
              </div>
              <div className="flex items-start">
                <Check className="h-6 w-6 text-softsell-purple mr-3 flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-bold mb-1">Competitive Rates</h3>
                  <p className="text-white/70">We guarantee the highest payouts in the industry for your licenses.</p>
                </div>
              </div>
              <div className="flex items-start">
                <Check className="h-6 w-6 text-softsell-purple mr-3 flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-bold mb-1">Secure Process</h3>
                  <p className="text-white/70">End-to-end encryption and compliant license transfer protocols.</p>
                </div>
              </div>
            </div>
          </div>
          
          <div>
            <form 
              onSubmit={handleFormSubmit} 
              className="bg-softsell-charcoal rounded-xl p-8 border border-white/10 shadow-xl"
            >
              <div className="space-y-5">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-white/80 mb-1">Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className={`w-full bg-softsell-dark border ${errors.name ? 'border-red-500' : 'border-white/20'} rounded-lg p-3 text-white focus:outline-none focus:ring-2 focus:ring-softsell-purple/50`}
                    placeholder="Your full name"
                  />
                  {errors.name && <p className="text-red-500 text-sm mt-1 flex items-center"><Info className="h-3 w-3 mr-1" /> {errors.name}</p>}
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-white/80 mb-1">Email</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={`w-full bg-softsell-dark border ${errors.email ? 'border-red-500' : 'border-white/20'} rounded-lg p-3 text-white focus:outline-none focus:ring-2 focus:ring-softsell-purple/50`}
                    placeholder="your.email@company.com"
                  />
                  {errors.email && <p className="text-red-500 text-sm mt-1 flex items-center"><Info className="h-3 w-3 mr-1" /> {errors.email}</p>}
                </div>
                
                <div>
                  <label htmlFor="company" className="block text-sm font-medium text-white/80 mb-1">Company</label>
                  <input
                    type="text"
                    id="company"
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                    className={`w-full bg-softsell-dark border ${errors.company ? 'border-red-500' : 'border-white/20'} rounded-lg p-3 text-white focus:outline-none focus:ring-2 focus:ring-softsell-purple/50`}
                    placeholder="Your company name"
                  />
                  {errors.company && <p className="text-red-500 text-sm mt-1 flex items-center"><Info className="h-3 w-3 mr-1" /> {errors.company}</p>}
                </div>
                
                <div>
                  <label htmlFor="licenseType" className="block text-sm font-medium text-white/80 mb-1">License Type</label>
                  <select
                    id="licenseType"
                    name="licenseType"
                    value={formData.licenseType}
                    onChange={handleChange}
                    className={`w-full bg-softsell-dark border ${errors.licenseType ? 'border-red-500' : 'border-white/20'} rounded-lg p-3 text-white focus:outline-none focus:ring-2 focus:ring-softsell-purple/50 appearance-none`}
                  >
                    <option value="" disabled>Select license type</option>
                    {licenseTypes.map((type) => (
                      <option key={type} value={type}>{type}</option>
                    ))}
                  </select>
                  {errors.licenseType && <p className="text-red-500 text-sm mt-1 flex items-center"><Info className="h-3 w-3 mr-1" /> {errors.licenseType}</p>}
                </div>
                
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-white/80 mb-1">Message (Optional)</label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={4}
                    className="w-full bg-softsell-dark border border-white/20 rounded-lg p-3 text-white focus:outline-none focus:ring-2 focus:ring-softsell-purple/50"
                    placeholder="Tell us about the licenses you want to sell..."
                  />
                </div>
                
                <Button 
                  type="submit" 
                  className="w-full bg-softsell-purple hover:bg-softsell-lightPurple text-white py-3"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Sending...' : 'Get My Valuation'}
                </Button>
                
                <p className="text-white/60 text-xs text-center">
                  By submitting this form, you agree to our <a href="#" className="text-softsell-purple hover:underline">Privacy Policy</a> and <a href="#" className="text-softsell-purple hover:underline">Terms of Service</a>.
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactForm;
