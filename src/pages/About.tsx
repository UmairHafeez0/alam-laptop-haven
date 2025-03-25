
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Container } from "@/components/ui/Container";
import { PrimaryButton } from "@/components/ui/PrimaryButton";
import { Link } from "react-router-dom";

const About = () => {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      
      <main className="flex-grow pt-24 lg:pt-28">
        {/* Hero Section */}
        <section className="bg-gradient-to-b from-alam-50/50 to-white py-16">
          <Container>
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-gray-900 mb-6 animate-fade-in opacity-0">
                About Alam Laptop
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground mb-8 animate-fade-in opacity-0 leading-relaxed">
                Pakistan's premier destination for quality laptops and exceptional customer service.
              </p>
            </div>
          </Container>
        </section>
        
        {/* Our Story */}
        <section className="py-16">
          <Container>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-6 animate-fade-in-left opacity-0">
                <h2 className="text-3xl font-bold text-gray-900">Our Story</h2>
                <p className="text-gray-700 leading-relaxed">
                  Founded in 2010, Alam Laptop began with a simple mission: to provide Pakistani customers with high-quality laptops at fair prices, backed by exceptional service and technical expertise.
                </p>
                <p className="text-gray-700 leading-relaxed">
                  What started as a small shop in Islamabad has grown into one of Pakistan's most trusted technology retailers, with a reputation for reliability, expertise, and customer satisfaction. Our journey has been driven by a passion for technology and a commitment to helping our customers find the perfect computing solutions for their needs.
                </p>
                <p className="text-gray-700 leading-relaxed">
                  Today, we continue to uphold these values while expanding our product offerings and service capabilities to meet the evolving needs of our customers across Pakistan.
                </p>
              </div>
              
              <div className="animate-fade-in-right opacity-0">
                <img 
                  src="https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?auto=format&fit=crop&w=1200&q=80" 
                  alt="Person using laptop" 
                  className="rounded-xl shadow-xl w-full h-auto object-cover"
                />
              </div>
            </div>
          </Container>
        </section>
        
        {/* Our Values */}
        <section className="py-16 bg-gray-50">
          <Container>
            <div className="text-center max-w-3xl mx-auto mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Values</h2>
              <p className="text-lg text-muted-foreground">
                The principles that guide our business and define our approach to serving our customers.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 stagger-animate">
              <div className="bg-white p-8 rounded-xl shadow-sm border border-border">
                <div className="w-12 h-12 rounded-lg bg-alam-50 flex items-center justify-center text-alam-600 mb-6">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="m8 3 4 8 5-5 5 15H2L8 3z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Quality First</h3>
                <p className="text-gray-700">
                  We only source products from reputable manufacturers and perform thorough quality checks before offering them to our customers.
                </p>
              </div>
              
              <div className="bg-white p-8 rounded-xl shadow-sm border border-border">
                <div className="w-12 h-12 rounded-lg bg-alam-50 flex items-center justify-center text-alam-600 mb-6">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M14 9a2 2 0 0 1-2 2H6l-4 4V4c0-1.1.9-2 2-2h8a2 2 0 0 1 2 2v5Z" />
                    <path d="M18 9h2a2 2 0 0 1 2 2v11l-4-4h-6a2 2 0 0 1-2-2v-1" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Customer-Centric</h3>
                <p className="text-gray-700">
                  We prioritize our customers' needs and satisfaction in every interaction, from pre-purchase advice to after-sales support.
                </p>
              </div>
              
              <div className="bg-white p-8 rounded-xl shadow-sm border border-border">
                <div className="w-12 h-12 rounded-lg bg-alam-50 flex items-center justify-center text-alam-600 mb-6">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="18" cy="15" r="3" />
                    <circle cx="9" cy="7" r="4" />
                    <path d="M10 15H6a4 4 0 0 0-4 4v2" />
                    <path d="m21.7 16.4-.9-.3" />
                    <path d="m15.2 13.9-.9-.3" />
                    <path d="m16.6 18.7.3-.9" />
                    <path d="m19.1 12.2.3-.9" />
                    <path d="m19.6 18.7-.4-1" />
                    <path d="m16.8 12.3-.4-1" />
                    <path d="m14.3 16.6 1-.4" />
                    <path d="m20.7 13.8 1-.4" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Technical Expertise</h3>
                <p className="text-gray-700">
                  Our team stays at the forefront of technology trends to provide informed recommendations and technical support.
                </p>
              </div>
            </div>
          </Container>
        </section>
        
        {/* Team Section */}
        <section className="py-16">
          <Container>
            <div className="text-center max-w-3xl mx-auto mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Team</h2>
              <p className="text-lg text-muted-foreground">
                Meet the dedicated professionals who make Alam Laptop the trusted name in laptop retail.
              </p>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 stagger-animate">
              <div className="text-center">
                <div className="relative mx-auto w-40 h-40 rounded-full overflow-hidden mb-4">
                  <img 
                    src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&h=300&q=80" 
                    alt="Hassan Alam" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="text-lg font-bold text-gray-900">Hassan Alam</h3>
                <p className="text-sm text-muted-foreground mb-2">Founder & CEO</p>
                <p className="text-sm text-gray-700">
                  Tech enthusiast with 15+ years of experience in the industry.
                </p>
              </div>
              
              <div className="text-center">
                <div className="relative mx-auto w-40 h-40 rounded-full overflow-hidden mb-4">
                  <img 
                    src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=300&h=300&q=80" 
                    alt="Sana Khan" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="text-lg font-bold text-gray-900">Sana Khan</h3>
                <p className="text-sm text-muted-foreground mb-2">Operations Manager</p>
                <p className="text-sm text-gray-700">
                  Ensures smooth day-to-day operations and excellent customer experience.
                </p>
              </div>
              
              <div className="text-center">
                <div className="relative mx-auto w-40 h-40 rounded-full overflow-hidden mb-4">
                  <img 
                    src="https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=300&h=300&q=80" 
                    alt="Ali Raza" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="text-lg font-bold text-gray-900">Ali Raza</h3>
                <p className="text-sm text-muted-foreground mb-2">Technical Director</p>
                <p className="text-sm text-gray-700">
                  Expert in laptop hardware and software troubleshooting.
                </p>
              </div>
              
              <div className="text-center">
                <div className="relative mx-auto w-40 h-40 rounded-full overflow-hidden mb-4">
                  <img 
                    src="https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&w=300&h=300&q=80" 
                    alt="Ayesha Malik" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="text-lg font-bold text-gray-900">Ayesha Malik</h3>
                <p className="text-sm text-muted-foreground mb-2">Customer Relations</p>
                <p className="text-sm text-gray-700">
                  Dedicated to ensuring customer satisfaction and resolving concerns.
                </p>
              </div>
            </div>
          </Container>
        </section>
        
        {/* CTA */}
        <section className="py-16 bg-alam-600">
          <Container>
            <div className="text-center max-w-3xl mx-auto">
              <h2 className="text-3xl font-bold text-white mb-6">
                Ready to Experience the Alam Laptop Difference?
              </h2>
              <p className="text-lg text-alam-100 mb-8 leading-relaxed">
                Visit our product catalog to explore our premium laptop selection, or contact us directly for personalized assistance.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/products">
                  <PrimaryButton 
                    className="bg-white text-alam-600 hover:bg-alam-50 active:bg-alam-100"
                    size="lg"
                  >
                    Explore Products
                  </PrimaryButton>
                </Link>
                <Link to="/contact">
                  <PrimaryButton 
                    variant="outline" 
                    className="border-white text-white hover:bg-white/10 active:bg-white/20"
                    size="lg"
                  >
                    Contact Us
                  </PrimaryButton>
                </Link>
              </div>
            </div>
          </Container>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default About;
