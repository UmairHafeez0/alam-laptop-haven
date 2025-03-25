import React, { useState } from 'react';
import { 
  MessageCircle, 
  X, 
  MessageSquare,
  HelpCircle,
  PhoneCall,
  Mail
} from 'lucide-react';
import { 
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { PrimaryButton } from '@/components/ui/PrimaryButton';

interface SupportQuestion {
  id: string;
  question: string;
  answer: React.ReactNode;
}

const supportQuestions: SupportQuestion[] = [
  {
    id: "laptops-available",
    question: "What laptops are available?",
    answer: (
      <div>
        <p>We offer a wide range of laptops including:</p>
        <ul className="list-disc pl-5 mt-2 space-y-1">
          <li>MacBook Pro and Air</li>
          <li>Dell XPS series</li>
          <li>HP Spectre and Envy</li>
          <li>Lenovo ThinkPad</li>
          <li>ASUS ROG and ZenBook</li>
          <li>Acer Predator and Swift</li>
        </ul>
        <p className="mt-2">Visit our products page to see all available models.</p>
      </div>
    )
  },
  {
    id: "how-to-buy",
    question: "How to buy a laptop?",
    answer: (
      <div>
        <p>Purchasing a laptop is simple:</p>
        <ol className="list-decimal pl-5 mt-2 space-y-1">
          <li>Browse our products and select a laptop</li>
          <li>Add it to your cart</li>
          <li>Proceed to checkout</li>
          <li>Enter your delivery and payment information</li>
          <li>Confirm your order</li>
        </ol>
        <p className="mt-2">We offer secure checkout and multiple payment options.</p>
      </div>
    )
  },
  {
    id: "refund-policy",
    question: "What is your refund policy?",
    answer: (
      <div>
        <p>Our refund policy includes:</p>
        <ul className="list-disc pl-5 mt-2 space-y-1">
          <li>30-day money-back guarantee</li>
          <li>Full refund for defective products</li>
          <li>Exchange options available</li>
          <li>Return shipping is free for defective items</li>
        </ul>
        <p className="mt-2">Contact our support team for assistance with returns and refunds.</p>
      </div>
    )
  },
  {
    id: "delivery-time",
    question: "How long does delivery take?",
    answer: (
      <div>
        <p>Delivery timeframes:</p>
        <ul className="list-disc pl-5 mt-2 space-y-1">
          <li>Major cities: 1-3 business days</li>
          <li>Other urban areas: 3-5 business days</li>
          <li>Remote locations: 5-7 business days</li>
        </ul>
        <p className="mt-2">Express shipping options are available at checkout for an additional fee.</p>
      </div>
    )
  },
  {
    id: "warranty-info",
    question: "What warranty do you provide?",
    answer: (
      <div>
        <p>Our warranty coverage:</p>
        <ul className="list-disc pl-5 mt-2 space-y-1">
          <li>All laptops come with a standard 1-year manufacturer warranty</li>
          <li>Extended warranty options available at purchase</li>
          <li>Warranty covers hardware defects and failures</li>
          <li>Software issues assisted through our technical support</li>
        </ul>
        <p className="mt-2">Warranty details are provided with each product.</p>
      </div>
    )
  }
];

const SupportWidget: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedQuestion, setSelectedQuestion] = useState<SupportQuestion | null>(null);

  const handleSelectQuestion = (question: SupportQuestion) => {
    setSelectedQuestion(question);
  };

  const handleBack = () => {
    setSelectedQuestion(null);
  };

  const handleWhatsAppRedirect = () => {
    // Replace with your actual WhatsApp business number
    window.open('https://wa.me/923001234567', '_blank');
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetTrigger asChild>
          <Button 
            className="h-14 w-14 rounded-full bg-primary shadow-lg hover:bg-primary/90 flex items-center justify-center"
            onClick={() => setIsOpen(true)}
          >
            <MessageCircle className="h-6 w-6" />
          </Button>
        </SheetTrigger>
        <SheetContent className="rounded-t-lg w-full sm:max-w-md">
          <SheetHeader className="border-b pb-4">
            <SheetTitle className="flex items-center gap-2">
              <HelpCircle className="h-5 w-5" />
              {selectedQuestion ? 'Support Answer' : 'Support Chat'}
            </SheetTitle>
          </SheetHeader>
          
          <div className="py-4 overflow-y-auto">
            {selectedQuestion ? (
              <div className="space-y-4">
                <button
                  onClick={handleBack}
                  className="text-sm text-blue-600 flex items-center gap-1 hover:underline"
                >
                  ← Back to questions
                </button>
                <h3 className="font-semibold text-lg">{selectedQuestion.question}</h3>
                <div className="text-gray-700">{selectedQuestion.answer}</div>
              </div>
            ) : (
              <div className="space-y-4">
                <p className="text-gray-600">
                  Select one of these common questions or contact us directly:
                </p>
                
                <div className="space-y-2">
                  {supportQuestions.map((q) => (
                    <button
                      key={q.id}
                      onClick={() => handleSelectQuestion(q)}
                      className="w-full text-left p-3 border rounded-lg hover:bg-gray-50 transition-colors flex items-start gap-2"
                    >
                      <MessageSquare className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                      <span>{q.question}</span>
                    </button>
                  ))}
                </div>
                
                <div className="border-t pt-4 mt-6">
                  <p className="text-sm text-gray-600 mb-3">
                    Need more help? Contact us directly:
                  </p>
                  
                  <div className="flex flex-col gap-2">
                    <PrimaryButton 
                      onClick={handleWhatsAppRedirect}
                      className="flex items-center justify-center gap-2"
                    >
                      <PhoneCall className="h-4 w-4" />
                      Chat with us on WhatsApp
                    </PrimaryButton>
                    
                    <Button
                      variant="outline"
                      className="flex items-center justify-center gap-2"
                      onClick={() => window.location.href = '/contact'}
                    >
                      <Mail className="h-4 w-4" />
                      Contact Form
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default SupportWidget;
