import type { TestimonialsProps } from '@/types';

const Testimonials: React.FC<TestimonialsProps> = ({ testimonials }) => {
  return (
    <section id="testimonials" className="py-16 bg-softsell-darkPurple">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
            What Our Customers Say
          </h2>
          <p className="mt-4 text-lg text-white/70">
            Don't just take our word for it - hear from some of our satisfied customers
          </p>
        </div>
        
        <div className="mt-16 grid gap-8 lg:grid-cols-3 lg:gap-x-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-softsell-charcoal rounded-lg border border-white/10 overflow-hidden p-6 hover:border-softsell-purple/50 transition-colors"
            >
              {testimonial.image && (
                <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="w-16 h-16 rounded-full mx-auto mb-4 object-cover"
                />
              )}
              <blockquote>
                <p className="text-lg text-white/70 mb-4">
                  {testimonial.quote || testimonial.message}
                </p>
              </blockquote>
              <div className="text-center">
                <div className="font-medium text-white">{testimonial.name}</div>
                <div className="text-white/70">{testimonial.role}</div>
                <div className="text-white/70">{testimonial.company}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
