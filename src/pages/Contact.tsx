
import { useState, FormEvent } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Container } from "@/components/ui/Container";
import { PrimaryButton } from "@/components/ui/PrimaryButton";
import { toast } from "sonner";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      console.log("Form submitted:", formData);
      toast.success("Message sent successfully! We'll get back to you soon.");
      
      // Reset form
      setFormData({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
      });
      
      setIsSubmitting(false);
    }, 1500);
  };
  
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      
      <main className="flex-grow pt-24 lg:pt-28">
        {/* Hero Section */}
        <section className="bg-gradient-to-b from-alam-50/50 to-white py-16">
          <Container>
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-gray-900 mb-6 animate-fade-in opacity-0">
                Contact Us
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground mb-8 animate-fade-in opacity-0 leading-relaxed">
                Have questions or need assistance? We're here to help. Reach out to our team for personalized support.
              </p>
            </div>
          </Container>
        </section>
        
        {/* Contact Form and Info */}
        <section className="py-16">
          <Container>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Contact Form */}
             {/* Contact Form */}
<div className="animate-fade-in-left opacity-0 bg-white p-8 rounded-xl shadow-lg border border-gray-100">
  <h2 className="text-2xl font-bold text-gray-900 mb-6 relative pb-2">
    Send Us a Message
    <span className="absolute bottom-0 left-0 w-16 h-1 bg-alam-500 rounded-full"></span>
  </h2>
  
  <form onSubmit={handleSubmit} className="space-y-6">
    <div className="relative">
      <input
        id="name"
        name="name"
        type="text"
        required
        value={formData.name}
        onChange={handleChange}
        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-alam-500 focus:ring-2 focus:ring-alam-200 transition-all duration-200 peer"
        placeholder=" "
      />
      <label 
        htmlFor="name" 
        className="absolute left-4 top-3 text-gray-500 pointer-events-none transition-all duration-200 peer-placeholder-shown:text-base peer-placeholder-shown:top-3 peer-focus:-top-2 peer-focus:text-sm peer-focus:text-alam-600 bg-white px-1 -top-2 text-sm text-gray-700"
      >
        Full Name *
      </label>
    </div>
    
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
      <div className="relative">
        <input
          id="email"
          name="email"
          type="email"
          required
          value={formData.email}
          onChange={handleChange}
          className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-alam-500 focus:ring-2 focus:ring-alam-200 transition-all duration-200 peer"
          placeholder=" "
        />
        <label 
          htmlFor="email" 
          className="absolute left-4 top-3 text-gray-500 pointer-events-none transition-all duration-200 peer-placeholder-shown:text-base peer-placeholder-shown:top-3 peer-focus:-top-2 peer-focus:text-sm peer-focus:text-alam-600 bg-white px-1 -top-2 text-sm text-gray-700"
        >
          Email Address *
        </label>
      </div>
      
      <div className="relative">
        <input
          id="phone"
          name="phone"
          type="tel"
          value={formData.phone}
          onChange={handleChange}
          className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-alam-500 focus:ring-2 focus:ring-alam-200 transition-all duration-200 peer"
          placeholder=" "
        />
        <label 
          htmlFor="phone" 
          className="absolute left-4 top-3 text-gray-500 pointer-events-none transition-all duration-200 peer-placeholder-shown:text-base peer-placeholder-shown:top-3 peer-focus:-top-2 peer-focus:text-sm peer-focus:text-alam-600 bg-white px-1 -top-2 text-sm text-gray-700"
        >
          Phone Number
        </label>
      </div>
    </div>
    
    <div className="relative">
      <select
        id="subject"
        name="subject"
        required
        value={formData.subject}
        onChange={handleChange}
        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-alam-500 focus:ring-2 focus:ring-alam-200 transition-all duration-200 appearance-none bg-white"
      >
        <option value="">Select a subject</option>
        <option value="Sales Inquiry">Sales Inquiry</option>
        <option value="Product Support">Product Support</option>
        <option value="Warranty Claim">Warranty Claim</option>
        <option value="Business Partnership">Business Partnership</option>
        <option value="Other">Other</option>
      </select>
      <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
        <svg className="w-5 h-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
        </svg>
      </div>
      <label 
        htmlFor="subject" 
        className="absolute left-4 -top-2 text-sm text-gray-700 bg-white px-1"
      >
        Subject *
      </label>
    </div>
    
    <div className="relative">
      <textarea
        id="message"
        name="message"
        rows={5}
        required
        value={formData.message}
        onChange={handleChange}
        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-alam-500 focus:ring-2 focus:ring-alam-200 transition-all duration-200 peer"
        placeholder=" "
      />
      <label 
        htmlFor="message" 
        className="absolute left-4 top-3 text-gray-500 pointer-events-none transition-all duration-200 peer-placeholder-shown:text-base peer-placeholder-shown:top-3 peer-focus:-top-2 peer-focus:text-sm peer-focus:text-alam-600 bg-white px-1 -top-2 text-sm text-gray-700"
      >
        Message *
      </label>
    </div>
    
    <div className="pt-2">
      <PrimaryButton
        type="submit"
        disabled={isSubmitting}
        className="w-full py-3 px-6 flex items-center justify-center gap-2 transition-all duration-300 hover:shadow-lg"
      >
        {isSubmitting ? (
          <>
            <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Sending...
          </>
        ) : (
          <>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
            </svg>
            Send Message
          </>
        )}
      </PrimaryButton>
    </div>
  </form>
</div>
              
              {/* Contact Information */}
              <div className="animate-fade-in-right opacity-0">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Contact Information</h2>
                
                <div className="space-y-8">
                  <div>
                    <h3 className="text-lg font-medium text-gray-900 mb-2">Head Office</h3>
                    <div className="space-y-2 text-gray-700">
                      <p>123 Tech Street, Blue Area</p>
                      <p>Islamabad, 44000</p>
                      <p>Pakistan</p>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-medium text-gray-900 mb-2">Contact Details</h3>
                    <div className="space-y-2">
                      <p>
                        <span className="text-gray-500">Email:</span>{" "}
                        <a href="mailto:info@alamlaptop.pk" className="text-alam-600 hover:text-alam-700">
                          info@alamlaptop.pk
                        </a>
                      </p>
                      <p>
                        <span className="text-gray-500">Phone:</span>{" "}
                        <a href="tel:+92512345678" className="text-alam-600 hover:text-alam-700">
                          +92 51 234 5678
                        </a>
                      </p>
                      <p>
                        <span className="text-gray-500">Customer Support:</span>{" "}
                        <a href="tel:+92512345679" className="text-alam-600 hover:text-alam-700">
                          +92 51 234 5679
                        </a>
                      </p>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-medium text-gray-900 mb-2">Business Hours</h3>
                    <div className="space-y-2 text-gray-700">
                      <p>Monday - Saturday: 10:00 AM - 8:00 PM</p>
                      <p>Sunday: 12:00 PM - 6:00 PM</p>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-medium text-gray-900 mb-2">Follow Us</h3>
                    <div className="flex gap-4">
                      <a 
                        href="#" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-700 hover:bg-alam-100 hover:text-alam-600 transition-colors"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                        </svg>
                      </a>
                      <a 
                        href="#" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-700 hover:bg-alam-100 hover:text-alam-600 transition-colors"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                        </svg>
                      </a>
                      <a 
                        href="#" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-700 hover:bg-alam-100 hover:text-alam-600 transition-colors"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                        </svg>
                      </a>
                      <a 
                        href="#" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-700 hover:bg-alam-100 hover:text-alam-600 transition-colors"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                        </svg>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Container>
        </section>
        
        {/* Map */}
        <section className="py-16 bg-gray-50">
          <Container>
            <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">Visit Our Store</h2>
            <div className="h-96 rounded-xl overflow-hidden shadow-md border border-gray-200">
              {/* Replace with actual Google Maps embed */}
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3318.430613707069!2d73.08346999999999!3d33.7294!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x38dfbfd84fc2af8d%3A0xbfa56a2174d81faa!2sBlue%20Area%2C%20Islamabad%2C%20Islamabad%20Capital%20Territory%2C%20Pakistan!5e0!3m2!1sen!2sus!4v1626881827396!5m2!1sen!2sus" 
                width="100%" 
                height="100%" 
                style={{ border: 0 }} 
                allowFullScreen 
                loading="lazy"
                title="Alam Laptop Store Location"
              ></iframe>
            </div>
          </Container>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Contact;
