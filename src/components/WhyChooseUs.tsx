import { useState } from 'react';
import type { WhyChooseUsProps } from '@/types';

const WhyChooseUs: React.FC<WhyChooseUsProps> = ({ softwareListings, onCategorySelect }) => {
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = ['all', ...new Set(softwareListings.map(listing => listing.category))];

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    if (category === 'all') {
      onCategorySelect('');
    } else {
      onCategorySelect(category);
    }
  };

  const whyChooseUsReasons = [
    {
      title: "Verified Sellers",
      description: "All sellers are thoroughly vetted and verified to ensure legitimate license resale"
    },
    {
      title: "Secure Transactions",
      description: "End-to-end encrypted payments and escrow service for safe transactions"
    },
    {
      title: "Best Prices",
      description: "Save up to 70% on software licenses compared to retail prices"
    },
    {
      title: "Instant Delivery",
      description: "Get your software license keys delivered instantly after purchase"
    }
  ];

  return (
    <>
      <section className="py-20 bg-softsell-darkPurple" id="why-choose-us">
        <div className="container-tight">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Why Choose SoftSell?
            </h2>
            <p className="text-white/70 text-lg">
              The most trusted marketplace for software license resale
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
            {whyChooseUsReasons.map((reason, index) => (
              <div
                key={index}
                className="bg-softsell-charcoal rounded-xl p-6 border border-white/10 hover:border-softsell-purple/50 transition-all"
              >
                <h3 className="text-xl font-semibold mb-3 text-white">
                  {reason.title}
                </h3>
                <p className="text-white/70">
                  {reason.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-softsell-darkPurple">
        <div className="container-tight">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Featured Software Licenses
            </h2>
            <p className="text-white/70 text-lg">
              Browse our selection of verified software licenses at unbeatable prices
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => handleCategoryChange(category)}
                className={`px-6 py-2 rounded-full text-sm font-medium transition-colors ${
                  selectedCategory === category
                    ? 'bg-softsell-purple text-white'
                    : 'bg-softsell-charcoal text-white/70 hover:bg-softsell-charcoal/80 border border-white/10'
                }`}
              >
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {softwareListings.map((listing) => (
              <div
                key={listing.id}
                className="bg-softsell-charcoal rounded-xl border border-white/10 overflow-hidden hover:border-softsell-purple/50 transition-all"
              >
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2 text-white">
                    {listing.name}
                  </h3>
                  <p className="text-white/70 mb-4">{listing.description}</p>
                  <div className="flex items-center justify-between mb-4">
                    <div className="text-white/70">
                      <span className="line-through">${listing.originalPrice}</span>
                      <span className="ml-2 text-softsell-purple font-semibold">
                        ${listing.discountedPrice}
                      </span>
                    </div>
                    <span className="text-sm text-white/70">{listing.licenseType}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-white/70">Seller: {listing.seller}</span>
                    <button className="px-4 py-2 bg-softsell-purple text-white rounded-lg hover:bg-softsell-lightPurple transition-colors">
                      View Details
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default WhyChooseUs;
