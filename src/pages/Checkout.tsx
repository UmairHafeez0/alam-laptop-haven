import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Container } from "@/components/ui/Container";
import { PrimaryButton } from "@/components/ui/PrimaryButton";
import { useCart } from "@/context/CartContext";
import { CustomerInfo } from "@/lib/types";
import { ChevronRight, Minus, Plus, ShoppingCart, Trash2, ArrowLeft } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { toast } from "@/hooks/use-toast";

const SHIPPING_COST = 500; // Rs. 500 for shipping
const FREE_SHIPPING_THRESHOLD = 30000; // Free shipping for orders above Rs. 30,000

const Checkout = () => {
  const { cart, updateQuantity, removeFromCart, clearCart } = useCart();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  
  const form = useForm<CustomerInfo>({
    defaultValues: {
      fullName: "",
      whatsappNumber: "",
      address: "",
      instructions: ""
    }
  });

  // Calculate cart totals
  const subtotal = cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  const shippingCost = subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : SHIPPING_COST;
  const total = subtotal + shippingCost;

  // If cart is empty, show empty cart message
  if (cart.length === 0) {
    return (
      <div className="flex min-h-screen flex-col">
        <Navbar />
        <main className="flex-grow pt-24 pb-16">
          <Container>
            <div className="text-center py-12">
              <ShoppingCart className="mx-auto h-16 w-16 text-muted-foreground mb-4" />
              <h1 className="text-2xl font-bold text-gray-900 mb-4">Your Cart is Empty</h1>
              <p className="text-muted-foreground mb-6">
                Looks like you haven't added any products to your cart yet.
              </p>
              <Link to="/">
                <PrimaryButton>Continue Shopping</PrimaryButton>
              </Link>
            </div>
          </Container>
        </main>
        <Footer />
      </div>
    );
  }
  
  // Handle WhatsApp checkout
  const onSubmit = (data: CustomerInfo) => {
    setLoading(true);
    
    try {
      // Format cart items for WhatsApp message
      const itemsList = cart.map(item => 
        `*${item.name}*\nQuantity: ${item.quantity}\nPrice: Rs. ${item.price.toLocaleString()}\nSubtotal: Rs. ${(item.price * item.quantity).toLocaleString()}`
      ).join('\n\n');
      
      // Create the order summary
      const orderSummary = 
        `*ORDER SUMMARY*\n\n` +
        `${itemsList}\n\n` +
        `-------------------\n` +
        `Subtotal: Rs. ${subtotal.toLocaleString()}\n` +
        `Shipping: Rs. ${shippingCost.toLocaleString()}\n` +
        `*TOTAL: Rs. ${total.toLocaleString()}*\n\n` +
        `*CUSTOMER INFORMATION*\n` +
        `Name: ${data.fullName}\n` +
        `WhatsApp: ${data.whatsappNumber}\n` +
        `Address: ${data.address}\n` +
        `${data.instructions ? `Special Instructions: ${data.instructions}` : ''}`;
      
      // Encode the message for URL
      const encodedMessage = encodeURIComponent(orderSummary);
      
      // Replace with your WhatsApp business number
      const phoneNumber = "923001234567"; // Example: 92 for Pakistan
      
      // Open WhatsApp with the order details
      window.open(`https://wa.me/${phoneNumber}?text=${encodedMessage}`, '_blank');
      
      // Show success message
      toast({
        title: "Order Submitted",
        description: "Your order has been sent to WhatsApp. Please complete the checkout there.",
      });
      
      // Clear cart and redirect to homepage (optional)
      clearCart();
      navigate('/');
    } catch (error) {
      console.error("Error processing order:", error);
      toast({
        title: "Error",
        description: "There was a problem processing your order. Please try again.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      
      <main className="flex-grow pt-24 pb-16">
        <Container>
          {/* Breadcrumbs */}
          <nav className="flex mb-6 items-center text-sm">
            <Link to="/" className="text-muted-foreground hover:text-gray-900">
              Home
            </Link>
            <ChevronRight className="h-4 w-4 mx-2 text-muted-foreground" />
            <span className="text-gray-900 font-medium">Checkout</span>
          </nav>
          
          <div className="flex items-center mb-6">
            <Link to="/" className="inline-flex items-center text-primary hover:text-primary/80 transition-colors">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Continue Shopping
            </Link>
          </div>
          
          <h1 className="text-3xl font-bold text-gray-900 mb-8">Checkout</h1>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items & Summary - Left Column */}
            <div className="lg:col-span-2 space-y-6">
              <div className="bg-white rounded-lg border border-border overflow-hidden">
                <div className="p-6 border-b border-border">
                  <h2 className="text-xl font-semibold text-gray-900 flex items-center">
                    <ShoppingCart className="mr-2 h-5 w-5" />
                    Your Cart ({cart.length} {cart.length === 1 ? 'item' : 'items'})
                  </h2>
                </div>
                
                <div className="divide-y divide-border">
                  {cart.map((item) => (
                    <div key={item.id} className="p-6 flex flex-col sm:flex-row sm:items-center">
                      <div className="flex items-center flex-grow mb-4 sm:mb-0">
                        <div className="h-20 w-20 flex-shrink-0 overflow-hidden rounded-md border border-border bg-gray-50">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="h-full w-full object-contain p-1"
                          />
                        </div>
                        <div className="ml-4 flex-grow">
                          <Link 
                            to={`/products/${item.id}`}
                            className="text-lg font-medium text-gray-900 hover:text-primary line-clamp-1 mb-1"
                          >
                            {item.name}
                          </Link>
                          <p className="text-lg font-medium text-gray-900">
                            Rs. {item.price.toLocaleString()}
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center border rounded-md">
                          <button
                            type="button"
                            className="p-2 text-gray-600 hover:text-gray-900"
                            onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}
                            aria-label="Decrease quantity"
                          >
                            <Minus className="h-4 w-4" />
                          </button>
                          <span className="w-10 text-center">{item.quantity}</span>
                          <button
                            type="button"
                            className="p-2 text-gray-600 hover:text-gray-900"
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            aria-label="Increase quantity"
                          >
                            <Plus className="h-4 w-4" />
                          </button>
                        </div>
                        
                        <button
                          type="button"
                          className="ml-4 p-2 text-gray-500 hover:text-red-500"
                          onClick={() => removeFromCart(item.id)}
                          aria-label="Remove item"
                        >
                          <Trash2 className="h-5 w-5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="p-6 bg-gray-50 border-t border-border">
                  <div className="flex justify-between mb-2">
                    <span className="text-gray-600">Subtotal</span>
                    <span className="font-medium">Rs. {subtotal.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between mb-2">
                    <span className="text-gray-600">Shipping</span>
                    <span className="font-medium">
                      {shippingCost === 0 
                        ? 'Free' 
                        : `Rs. ${shippingCost.toLocaleString()}`
                      }
                    </span>
                  </div>
                  <div className="flex justify-between text-lg font-semibold mt-4 pt-4 border-t border-border">
                    <span>Total</span>
                    <span>Rs. {total.toLocaleString()}</span>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Customer Information & Order Form - Right Column */}
            <div className="lg:col-span-1">
              <Card>
                <CardContent className="pt-6">
                  <h2 className="text-xl font-semibold text-gray-900 mb-4">Customer Information</h2>
                  
                  <Form {...form}>
                    <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
                      <FormField
                        control={form.control}
                        name="fullName"
                        rules={{ required: "Name is required" }}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Full Name</FormLabel>
                            <FormControl>
                              <Input placeholder="Enter your full name" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="whatsappNumber"
                        rules={{ 
                          required: "WhatsApp number is required",
                          pattern: {
                            value: /^[0-9+]{10,15}$/,
                            message: "Please enter a valid phone number"
                          } 
                        }}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>WhatsApp Number</FormLabel>
                            <FormControl>
                              <Input placeholder="e.g. 03001234567" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="address"
                        rules={{ required: "Delivery address is required" }}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Delivery Address</FormLabel>
                            <FormControl>
                              <Textarea 
                                placeholder="Enter your full delivery address" 
                                className="min-h-[80px]"
                                {...field} 
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="instructions"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Special Instructions (Optional)</FormLabel>
                            <FormControl>
                              <Textarea 
                                placeholder="Any special delivery instructions?" 
                                className="min-h-[80px]"
                                {...field} 
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </form>
                  </Form>
                </CardContent>
                
                <CardFooter className="flex flex-col pt-0">
                  <div className="bg-gray-50 p-4 rounded-md mb-6 w-full">
                    <h3 className="font-semibold mb-2">Delivery Information</h3>
                    <p className="text-sm text-gray-600 mb-1">
                      • Estimated delivery: 2-4 business days
                    </p>
                    <p className="text-sm text-gray-600">
                      • Free shipping on orders above Rs. 30,000
                    </p>
                  </div>
                  
                  <PrimaryButton 
                    size="lg" 
                    className="w-full bg-green-600 hover:bg-green-700 text-white flex items-center justify-center gap-2"
                    disabled={loading || cart.length === 0}
                    onClick={form.handleSubmit(onSubmit)}
                  >
                    Complete Order via WhatsApp
                  </PrimaryButton>
                </CardFooter>
              </Card>
            </div>
          </div>
        </Container>
      </main>
      
      <Footer />
    </div>
  );
};

export default Checkout;
