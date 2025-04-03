export interface CartItem {
    id: string;
    name: string;
    price: number;
    image: string;
    quantity: number;
  }
  
  export interface CustomerInfo {
    fullName: string;
    whatsappNumber: string;
    address: string;
    instructions?: string;
  }
  export interface Product {
    id: string;
    name: string;
    slug: string;
    brand: string;
    category: string;
    image: string;
    images: string[];
    price: number;
    originalPrice?: number;
    status: "In Stock" | "Out of Stock" | "Coming Soon";
    processor: string;
    ram: string;
    storage: string;
    display: string;
    graphics: string;
    battery: string;
    weight: string;
    ports: string;
    os: string;
    warranty: string;
    isNew?: boolean;
    isFeatured?: boolean;
    description: string;
    features: string[];
    created_at: string; // ISO date string
    updated_at: string; // ISO date strings
  }