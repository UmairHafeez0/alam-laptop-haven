import { Container } from "@/components/ui/Container";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Link } from "react-router-dom";
import { ShoppingCart, ArrowLeft } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { PrimaryButton} from "@/components/ui/PrimaryButton";
import { useNavigate } from "react-router-dom";
export default function Cart() {
  const { 
    cart, 
    removeFromCart, 
    updateQuantity, 
    clearCart, 
    totalItems, 
    totalPrice 
  } = useCart();
  
  const navigate = useNavigate();
  const handleProceedToCheckout = () => {
    if (cart.length > 0) {
      navigate("/checkout");
    }
  };

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-grow pt-20">
        <Container className="py-8 md:py-12">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center justify-between mb-8">
              <h1 className="text-2xl md:text-3xl font-bold">Shopping Cart</h1>
              <Link 
                to="/products" 
                className="flex items-center text-alam-600 hover:text-alam-700 font-medium"
              >
                <ArrowLeft className="h-4 w-4 mr-1" />
                Continue Shopping
              </Link>
            </div>

            {cart.length === 0 ? (
              /* Empty cart state */
              <div className="text-center py-16 border rounded-lg bg-gray-50">
                <div className="mx-auto w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                  <ShoppingCart className="h-8 w-8 text-gray-400" />
                </div>
                <h2 className="text-xl font-medium text-gray-900 mb-2">Your cart is empty</h2>
                <p className="text-gray-500 mb-6">Looks like you haven't added anything to your cart yet.</p>
                <Link 
                  to="/products" 
                  className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-alam-600 hover:bg-alam-700"
                >
                  Browse Products
                </Link>
              </div>
            ) : (
              /* Cart with items */
              <div className="space-y-8">
                <div className="space-y-4">
                  {cart.map((item) => (
                    <div key={item.id} className="flex flex-col sm:flex-row gap-6 p-4 border rounded-lg">
                      <div className="w-full sm:w-32 h-32 bg-gray-50 rounded-md overflow-hidden">
                        <img 
                          src={item.image} 
                          alt={item.name}
                          className="w-full h-full object-contain"
                        />
                      </div>
                      <div className="flex-1">
                        <div className="flex justify-between">
                          <h3 className="text-lg font-medium">{item.name}</h3>
                          <button 
                            onClick={() => removeFromCart(item.id)}
                            className="text-gray-400 hover:text-gray-600"
                          >
                            ×
                          </button>
                        </div>
                        <p className="text-gray-600">Rs. {item.price.toLocaleString()}</p>
                        <div className="flex items-center mt-4">
                          <button 
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="w-8 h-8 border rounded-md flex items-center justify-center"
                          >
                            -
                          </button>
                          <span className="mx-4">{item.quantity}</span>
                          <button 
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="w-8 h-8 border rounded-md flex items-center justify-center"
                          >
                            +
                          </button>
                        </div>
                      </div>
                      <div className="sm:w-32 text-right">
                        <p className="font-medium">
                          Rs. {(item.price * item.quantity).toLocaleString()}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="border-t pt-6">
                  <div className="flex justify-between mb-4">
                    <span>Subtotal ({totalItems} items)</span>
                    <span className="font-medium">Rs. {totalPrice.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between mb-6">
                    <span>Shipping</span>
                    <span>Free</span>
                  </div>
                  <div className="flex justify-between text-lg font-bold mb-6">
                    <span>Total</span>
                    <span>Rs. {totalPrice.toLocaleString()}</span>
                  </div>
                  <div className="flex gap-4">
                    <PrimaryButton 
                      variant="outline" 
                      onClick={clearCart}
                      className="flex-1"
                    >
                      Clear Cart
                    </PrimaryButton>
                    <PrimaryButton 
                      className="flex-1"
                      onClick={handleProceedToCheckout}
                      disabled={cart.length === 0}
                    >
                      Proceed to Checkout
                    </PrimaryButton>
                  </div>
                </div>
              </div>
            )}
          </div>
        </Container>
      </main>
      <Footer />
    </div>
  );
}