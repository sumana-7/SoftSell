import { useState } from 'react';
import type { HeroProps } from '@/types';
import { Button } from './ui/button';
import { ArrowDown } from 'lucide-react';

const Hero: React.FC<HeroProps> = ({ onSearch }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(searchQuery);
  };

  return (
    <section className="relative min-h-screen flex items-center pt-16 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/4 -left-20 w-72 h-72 bg-softsell-purple/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-softsell-purple/10 rounded-full blur-3xl"></div>
      </div>

      <div className="container-tight relative z-10">
        <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
          <div className="flex flex-col space-y-8 animate-fade-in" style={{ animationDelay: '0.2s' }}>
            <div className="space-y-6">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-balance">
                Turn Unused Software Licenses Into <span className="gradient-text">Instant Revenue</span>
              </h1>
              <p className="text-lg text-white/80 md:pr-12 text-balance">
                SoftSell helps businesses quickly convert their surplus software licenses into cash, with secure transactions and the industry's highest payouts.
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="bg-softsell-purple hover:bg-softsell-lightPurple text-white">
                Sell My Licenses
              </Button>
              <Button size="lg" variant="outline" className="border-softsell-purple text-white hover:bg-softsell-purple/10">
                Get a Valuation
              </Button>
            </div>
            
            <div className="text-white/60 text-sm flex items-center gap-2">
              <div className="flex">
                <div className="w-8 h-8 rounded-full border-2 border-white overflow-hidden">
                  <img src="https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&auto=format&fit=crop&w=334&q=80" alt="User" className="w-full h-full object-cover" />
                </div>
                <div className="-ml-2 w-8 h-8 rounded-full border-2 border-white overflow-hidden">
                  <img src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-1.2.1&auto=format&fit=crop&w=334&q=80" alt="User" className="w-full h-full object-cover" />
                </div>
                <div className="-ml-2 w-8 h-8 rounded-full border-2 border-white overflow-hidden">
                  <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-1.2.1&auto=format&fit=crop&w=334&q=80" alt="User" className="w-full h-full object-cover" />
                </div>
              </div>
              <span>Join 2,500+ companies already selling with us</span>
            </div>
          </div>
          
          <div className="relative animate-fade-in" style={{ animationDelay: '0.4s' }}>
            <div className="relative bg-softsell-charcoal p-6 rounded-xl border border-white/10 shadow-xl animate-float">
              <div className="absolute -top-3 -right-3 bg-softsell-purple text-white text-xs font-bold py-1 px-3 rounded-full">
                New
              </div>
              <div className="space-y-5">
                <div>
                  <div className="text-sm text-white/60">License Value</div>
                  <div className="text-3xl font-bold gradient-text">$17,483.50</div>
                </div>
                <div className="flex justify-between items-center">
                  <div>
                    <div className="text-sm text-white/60">License Type</div>
                    <div className="font-medium">Enterprise Suite</div>
                  </div>
                  <div>
                    <div className="text-sm text-white/60">Quantity</div>
                    <div className="font-medium">25</div>
                  </div>
                  <div>
                    <div className="text-sm text-white/60">Sale Time</div>
                    <div className="font-medium">3 days</div>
                  </div>
                </div>
                <div className="pt-2 border-t border-white/10">
                  <div className="flex justify-between items-center">
                    <div className="text-sm text-white/60">Client</div>
                    <div className="font-medium">Acme Corporation</div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="absolute -bottom-6 -left-6 bg-[#2A2F40] p-4 rounded-lg border border-white/10 shadow-lg">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-green-500/20 rounded-full flex items-center justify-center text-green-500">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div>
                  <div className="text-sm text-white/60">Payment Received</div>
                  <div className="font-bold">$15,735.15</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Scroll indicator */}
        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex flex-col items-center animate-bounce">
          <span className="text-white/60 text-sm mb-2">Scroll to learn more</span>
          <ArrowDown className="h-5 w-5 text-softsell-purple" />
        </div>
      </div>
    </section>
  );
};

export default Hero;
