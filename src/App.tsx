import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Products from "./pages/Products";
import ProductDetail from "./pages/ProductDetail";
import About from "./pages/About";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";
import Cart from "./pages/Cart";
import { CartProvider } from "@/context/CartContext";
import Checkout from "./pages/Checkout"
const queryClient = new QueryClient();
import AdminLogin from "./pages/admin/AdminLogin";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminProductManagement from "./pages/admin/AdminProductManagement";
import AdminReviewManagement from "./pages/admin/AdminReviewManagement";
import AdminLayout from "./components/admin/AdminLayout";
import { AdminAuthProvider } from "./context/AdminAuthContext";
import AdminOrderManagement from "./pages/admin/AdminOrderManagement";
import SupportWidget from "./components/SupportWidget";
const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <CartProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/products" element={<Products />} />
            <Route path="/products/:id" element={<ProductDetail />} />
            <Route path="/about" element={<About />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/checkout" element={<Checkout />} />
            
            {/* Admin routes */}
            <Route path="/admin/login" element={
              <AdminAuthProvider>
                <AdminLogin />
              </AdminAuthProvider>
            } />
            
            <Route path="/admin" element={
              <AdminAuthProvider>
                <AdminLayout />
              </AdminAuthProvider>
            }>
              <Route index element={<AdminDashboard />} />
              <Route path="products" element={<AdminProductManagement />} />
              <Route path="reviews" element={<AdminReviewManagement />} />
              <Route path="orders" element={<AdminOrderManagement />} />
            </Route>
            
            <Route path="*" element={<NotFound />} />
          </Routes>
          <SupportWidget />
        </BrowserRouter>
      </CartProvider>
    </TooltipProvider>
  </QueryClientProvider>
);
export default App;