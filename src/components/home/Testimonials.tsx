
import { Container } from "@/components/ui/Container";

const testimonials = [
  {
    quote: "Buying a laptop from Alam was the best decision. Their expert advice helped me find the perfect machine for my design work. The service was exceptional!",
    author: "Sara Ahmed",
    role: "Graphic Designer",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=256&h=256&q=80",
  },
  {
    quote: "As a gamer, I needed something powerful but within my budget. Alam Laptop had exactly what I wanted. Fast delivery and great after-sales support!",
    author: "Faizan Khan",
    role: "Software Engineer",
    image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=256&h=256&q=80",
  },
  {
    quote: "I've been buying laptops from Alam for my company for years. Their business laptops are reliable, and their service is always professional and prompt.",
    author: "Ayesha Malik",
    role: "Business Owner",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=256&h=256&q=80",
  },
];

export function Testimonials() {
  return (
    <section className="py-20">
      <Container>
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold sm:text-4xl text-gray-900 text-balance">
            What Our Customers Say
          </h2>
          <p className="mt-4 text-lg text-muted-foreground text-balance">
            Don't just take our word for it — hear from some of our satisfied customers.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 stagger-animate">
          {testimonials.map((testimonial, index) => (
            <div 
              key={index} 
              className="flex h-full flex-col justify-between rounded-2xl bg-white p-8 shadow-sm border border-border hover:border-alam-200 hover:shadow-md transition-all duration-300"
            >
              <div>
                <div className="mb-4 text-alam-600">
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M13 14.725c0-5.141 3.892-10.519 10-11.725l.984 2.126c-2.215.835-4.163 3.742-4.38 5.746 2.491.392 4.396 2.547 4.396 5.149 0 3.182-2.584 4.979-5.199 4.979-3.015 0-5.801-2.305-5.801-6.275zm-13 0c0-5.141 3.892-10.519 10-11.725l.984 2.126c-2.215.835-4.163 3.742-4.38 5.746 2.491.392 4.396 2.547 4.396 5.149 0 3.182-2.584 4.979-5.199 4.979-3.015 0-5.801-2.305-5.801-6.275z" />
                  </svg>
                </div>
                <p className="text-gray-700 mb-8">{testimonial.quote}</p>
              </div>
              
              <div className="flex items-center gap-4">
                <img 
                  src={testimonial.image} 
                  alt={testimonial.author}
                  className="h-12 w-12 rounded-full object-cover"
                />
                <div>
                  <h4 className="font-medium text-gray-900">{testimonial.author}</h4>
                  <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
