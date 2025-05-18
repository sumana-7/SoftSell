import type { HowItWorksProps } from '@/types';
import { Upload, DollarSign, CreditCard } from 'lucide-react';

const steps = [
  {
    title: 'Upload Your Licenses',
    description: 'Tell us what software licenses you want to sell. Our platform supports all major vendors and license types.',
    icon: Upload,
    color: 'bg-softsell-purple/20',
    textColor: 'text-softsell-purple'
  },
  {
    title: 'Get Instant Valuation',
    description: 'Our AI-powered system analyzes current market conditions to provide you with the highest possible valuation.',
    icon: DollarSign,
    color: 'bg-blue-500/20',
    textColor: 'text-blue-400'
  },
  {
    title: 'Get Paid Fast',
    description: 'Accept our offer and get paid within 48 hours. Choose from multiple payout methods for your convenience.',
    icon: CreditCard,
    color: 'bg-green-500/20',
    textColor: 'text-green-400'
  }
];

const HowItWorks: React.FC<HowItWorksProps> = ({ features }) => {
  return (
    <section className="py-20 bg-softsell-charcoal" id="how-it-works">
      <div className="container-tight">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            How <span className="gradient-text">SoftSell</span> Works
          </h2>
          <p className="text-white/70 text-lg">
            We've made buying and selling software licenses simple, secure, and efficient.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-softsell-darkPurple rounded-xl p-8 border border-white/10 hover:border-softsell-purple/50 transition-colors"
            >
              <div className="text-4xl mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold mb-3 text-white">
                {feature.title}
              </h3>
              <p className="text-white/70">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <p className="text-white/70 mb-8">
            Join thousands of satisfied customers who have saved money on software licenses
          </p>
          <button className="px-8 py-3 bg-softsell-purple text-white rounded-lg hover:bg-softsell-lightPurple transition-colors">
            Get Started Now
          </button>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
