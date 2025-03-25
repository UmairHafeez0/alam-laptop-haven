
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
}

// Sample products data
const products: Product[] = [
  {
    id: "1",
    name: "Dell XPS 13",
    slug: "dell-xps-13",
    brand: "Dell",
    category: "ultrabook",
    image: "https://images.unsplash.com/photo-1593642702821-c8da6771f0c6?auto=format&fit=crop&w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1593642702821-c8da6771f0c6?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1603302576837-37561b2e2302?auto=format&fit=crop&w=800&q=80",
    ],
    price: 189999,
    originalPrice: 209999,
    status: "In Stock",
    processor: "Intel Core i7-1165G7",
    ram: "16GB LPDDR4X",
    storage: "512GB PCIe NVMe SSD",
    display: "13.4\" FHD+ (1920 x 1200) InfinityEdge",
    graphics: "Intel Iris Xe Graphics",
    battery: "Up to 12 hours",
    weight: "1.2 kg",
    ports: "2x Thunderbolt 4, microSD card reader, 3.5mm headphone jack",
    os: "Windows 11 Home",
    warranty: "1 Year Premium Support",
    isNew: true,
    isFeatured: true,
    description: "The XPS 13 is the ultimate ultraportable laptop. With a stunning InfinityEdge display that virtually eliminates borders, this compact laptop packs powerful performance into a thin and light design perfect for professionals on the go.",
    features: [
      "13.4-inch InfinityEdge display with virtually no borders",
      "Premium machined aluminum chassis with carbon fiber palm rest",
      "Advanced thermal design for better heat dissipation",
      "Precision touchpad with seamless glass integration",
      "Backlit keyboard with comfortable, quiet typing experience",
      "Studio-quality microphones for clear voice calls",
    ],
  },
  {
    id: "2",
    name: "MacBook Pro 14",
    slug: "macbook-pro-14",
    brand: "Apple",
    category: "ultrabook",
    image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1541807084-5c52b6b3adef?auto=format&fit=crop&w=800&q=80",
    ],
    price: 329999,
    status: "In Stock",
    processor: "Apple M1 Pro (8-core CPU)",
    ram: "16GB Unified Memory",
    storage: "512GB SSD",
    display: "14.2\" Liquid Retina XDR display",
    graphics: "14-core GPU",
    battery: "Up to 17 hours",
    weight: "1.6 kg",
    ports: "3x Thunderbolt 4, HDMI, SDXC card slot, 3.5mm headphone jack, MagSafe 3",
    os: "macOS",
    warranty: "1 Year Limited Warranty",
    isFeatured: true,
    description: "The MacBook Pro 14 delivers game-changing performance for pro users. With the powerful M1 Pro chip, stunning Liquid Retina XDR display, and all-day battery life, it's designed for developers, photographers, filmmakers, and researchers who push the limits of what a laptop can do.",
    features: [
      "Liquid Retina XDR display with extreme dynamic range and contrast ratio",
      "M1 Pro chip delivers exceptional performance with industry-leading power efficiency",
      "Advanced thermal systems move 50 percent more air even at lower fan speeds",
      "Studio-quality three-mic array captures professional-level audio",
      "Six-speaker sound system with force-cancelling woofers",
      "ProMotion technology for adaptive refresh rates up to 120Hz",
    ],
  },
  {
    id: "3",
    name: "Lenovo ThinkPad X1 Carbon",
    slug: "lenovo-thinkpad-x1-carbon",
    brand: "Lenovo",
    category: "business",
    image: "https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?auto=format&fit=crop&w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1593642702821-c8da6771f0c6?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1572572113306-19a5b5e12600?auto=format&fit=crop&w=800&q=80",
    ],
    price: 219999,
    originalPrice: 249999,
    status: "In Stock",
    processor: "Intel Core i7-1165G7",
    ram: "16GB LPDDR4X",
    storage: "1TB PCIe SSD",
    display: "14\" WQUXGA (3840 x 2400) IPS",
    graphics: "Intel Iris Xe Graphics",
    battery: "Up to 15 hours",
    weight: "1.13 kg",
    ports: "2x Thunderbolt 4, 2x USB-A, HDMI 2.0, 3.5mm headphone jack",
    os: "Windows 11 Pro",
    warranty: "3 Year Premier Support",
    isFeatured: true,
    description: "The ThinkPad X1 Carbon is a premium business laptop designed for professionals who need reliable performance, security features, and durability. With its lightweight carbon fiber construction and long battery life, it's the perfect business companion for working anywhere.",
    features: [
      "MIL-STD-810H tested for durability against extreme conditions",
      "ThinkShield security suite with fingerprint reader and IR camera",
      "Spill-resistant backlit keyboard with legendary ThinkPad precision",
      "Rapid Charge technology gives you 80% battery in just 60 minutes",
      "Dolby Atmos® speaker system for immersive sound",
      "WiFi 6E for ultra-fast, stable connections",
    ],
  },
  {
    id: "4",
    name: "HP Spectre x360",
    slug: "hp-spectre-x360",
    brand: "HP",
    category: "ultrabook",
    image: "https://images.unsplash.com/photo-1544731612-de7f96afe55f?auto=format&fit=crop&w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1544731612-de7f96afe55f?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1552668693-d0738e00eca8?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1588702547923-7093a6c3ba33?auto=format&fit=crop&w=800&q=80",
    ],
    price: 199999,
    originalPrice: 219999,
    status: "In Stock",
    processor: "Intel Core i7-1165G7",
    ram: "16GB LPDDR4X",
    storage: "1TB PCIe NVMe SSD",
    display: "13.5\" WUXGA (1920 x 1280) OLED Touch",
    graphics: "Intel Iris Xe Graphics",
    battery: "Up to 15 hours",
    weight: "1.37 kg",
    ports: "2x Thunderbolt 4, 1x USB-A, 3.5mm headphone jack",
    os: "Windows 11 Home",
    warranty: "1 Year Limited Warranty",
    description: "The HP Spectre x360 is a premium convertible laptop that combines power, beauty, and versatility. With its gem-cut design and 360-degree hinge, it transitions effortlessly from laptop to tablet, making it perfect for creative professionals and multitaskers.",
    features: [
      "360° convertible design with four usage modes: laptop, tablet, tent, and stand",
      "Precision-crafted CNC aluminum chassis with gem-cut design",
      "HP Sure View privacy screen prevents visual hacking",
      "Quad Bang & Olufsen speakers for premium sound quality",
      "Rechargeable MPP2.0 Tilt Pen included for natural drawing and note-taking",
      "HP Command Center for performance optimization and thermal management",
    ],
  },
  {
    id: "5",
    name: "ASUS ROG Zephyrus G14",
    slug: "asus-rog-zephyrus-g14",
    brand: "ASUS",
    category: "gaming",
    image: "https://images.unsplash.com/photo-1603302576837-37561b2e2302?auto=format&fit=crop&w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1603302576837-37561b2e2302?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1554415707-6e8cfc93fe23?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1605134513573-384dcf99a44c?auto=format&fit=crop&w=800&q=80",
    ],
    price: 249999,
    originalPrice: 269999,
    status: "In Stock",
    processor: "AMD Ryzen 9 5900HS",
    ram: "16GB DDR4",
    storage: "1TB NVMe SSD",
    display: "14\" QHD (2560 x 1440) 120Hz",
    graphics: "NVIDIA GeForce RTX 3060 6GB GDDR6",
    battery: "Up to 10 hours",
    weight: "1.7 kg",
    ports: "1x USB-C, 2x USB-A, HDMI 2.0b, 3.5mm combo jack",
    os: "Windows 11 Home",
    warranty: "1 Year Global Warranty",
    isNew: true,
    isFeatured: true,
    description: "The ROG Zephyrus G14 is a powerful gaming laptop that doesn't compromise on portability. Equipped with an AMD Ryzen processor and NVIDIA RTX graphics, it delivers high-performance gaming in a compact 14-inch design that you can take anywhere.",
    features: [
      "AniMe Matrix™ LED display on lid for customizable animations",
      "Precision-cut CNC aluminum chassis with magnesium alloy reinforcement",
      "ROG Intelligent Cooling with liquid metal compound",
      "Dual-channel cooling with self-cleaning thermal module",
      "Dolby Atmos spatial sound with Smart Amp technology",
      "Customizable RGB keyboard with per-key illumination",
    ],
  },
  {
    id: "6",
    name: "Microsoft Surface Laptop 4",
    slug: "microsoft-surface-laptop-4",
    brand: "Microsoft",
    category: "ultrabook",
    image: "https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?auto=format&fit=crop&w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1593642532744-d377ab507dc8?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&w=800&q=80",
    ],
    price: 179999,
    status: "In Stock",
    processor: "AMD Ryzen 7 4980U",
    ram: "16GB LPDDR4X",
    storage: "512GB SSD",
    display: "13.5\" PixelSense Touch (2256 x 1504)",
    graphics: "AMD Radeon Graphics",
    battery: "Up to 19 hours",
    weight: "1.3 kg",
    ports: "1x USB-C, 1x USB-A, 3.5mm headphone jack, Surface Connect",
    os: "Windows 11 Home",
    warranty: "1 Year Limited Hardware Warranty",
    description: "The Surface Laptop 4 combines performance, elegance, and comfort in a sleek design. With its vibrant PixelSense touchscreen display and choice of premium Alcantara or metal finishes, it's designed to impress while delivering the power and battery life you need for all-day productivity.",
    features: [
      "Signature PixelSense™ touchscreen display with 3:2 aspect ratio",
      "Choice of premium Alcantara® material or metal palm rest",
      "Omnisonic Speakers with Dolby Atmos® for immersive sound",
      "Enhanced dual far-field Studio Mics for clear video calls",
      "Windows Hello face authentication camera",
      "Fast Charging technology provides up to 80% charge in about an hour",
    ],
  },
  {
    id: "7",
    name: "Acer Predator Helios 300",
    slug: "acer-predator-helios-300",
    brand: "Acer",
    category: "gaming",
    image: "https://images.unsplash.com/photo-1593642632823-8f785ba67e45?auto=format&fit=crop&w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1593642632823-8f785ba67e45?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1593642532973-d31b6557fa68?auto=format&fit=crop&w=800&q=80",
    ],
    price: 199999,
    originalPrice: 219999,
    status: "In Stock",
    processor: "Intel Core i7-11800H",
    ram: "16GB DDR4",
    storage: "1TB NVMe SSD",
    display: "15.6\" FHD (1920 x 1080) IPS 144Hz",
    graphics: "NVIDIA GeForce RTX 3070 8GB GDDR6",
    battery: "Up to the 6 hours",
    weight: "2.3 kg",
    ports: "1x Thunderbolt 4, 3x USB-A, HDMI 2.1, 3.5mm combo jack, RJ-45",
    os: "Windows 11 Home",
    warranty: "1 Year International Warranty",
    description: "The Predator Helios 300 is a powerhouse gaming laptop that delivers impressive frame rates at an affordable price. With its high-refresh-rate display, advanced cooling system, and customizable RGB keyboard, it's designed to give gamers a competitive edge without breaking the bank.",
    features: [
      "4-zone RGB keyboard with dedicated Turbo button",
      "5th Gen AeroBlade 3D Fan Technology for enhanced cooling",
      "PredatorSense software for real-time system monitoring and customization",
      "DTS:X Ultra audio for realistic spatial sound",
      "Killer DoubleShot Pro for prioritized gaming network traffic",
      "Overclockable GPU for additional performance",
    ],
  },
  {
    id: "8",
    name: "Razer Blade 15",
    slug: "razer-blade-15",
    brand: "Razer",
    category: "gaming",
    image: "https://images.unsplash.com/photo-1605134513573-384dcf99a44c?auto=format&fit=crop&w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1605134513573-384dcf99a44c?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1555680202-c86f0e12f086?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1484788984921-03950022c9ef?auto=format&fit=crop&w=800&q=80",
    ],
    price: 299999,
    status: "In Stock",
    processor: "Intel Core i7-12800H",
    ram: "16GB DDR5",
    storage: "1TB PCIe Gen4 SSD",
    display: "15.6\" QHD (2560 x 1440) 240Hz",
    graphics: "NVIDIA GeForce RTX 3080 Ti 16GB GDDR6",
    battery: "Up to 6 hours",
    weight: "2.01 kg",
    ports: "2x Thunderbolt 4, 3x USB-A, HDMI 2.1, SD card reader, 3.5mm combo jack",
    os: "Windows 11 Home",
    warranty: "1 Year Limited Warranty",
    isNew: true,
    description: "The Razer Blade 15 is the ultimate gaming laptop, combining cutting-edge performance with a premium, precision-crafted design. Featuring the latest Intel processors and NVIDIA RTX graphics, it delivers desktop-class gaming performance in a sleek, portable form factor with uncompromising build quality.",
    features: [
      "CNC-milled aluminum unibody chassis for maximum durability",
      "Per-key RGB Razer Chroma keyboard with customizable lighting",
      "Advanced vapor chamber cooling system for optimal thermal performance",
      "Customizable performance modes via Razer Synapse 3 software",
      "THX Spatial Audio for immersive 360° sound",
      "Ultra-thin bezels for an immersive visual experience",
    ],
  },
  {
    id: "9",
    name: "LG Gram 17",
    slug: "lg-gram-17",
    brand: "LG",
    category: "ultrabook",
    image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1484788984921-03950022c9ef?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1585076800588-77e0884c3888?auto=format&fit=crop&w=800&q=80",
    ],
    price: 189999,
    originalPrice: 209999,
    status: "In Stock",
    processor: "Intel Core i7-1165G7",
    ram: "16GB LPDDR4X",
    storage: "1TB NVMe SSD",
    display: "17\" WQXGA (2560 x 1600) IPS",
    graphics: "Intel Iris Xe Graphics",
    battery: "Up to 19.5 hours",
    weight: "1.35 kg",
    ports: "2x Thunderbolt 4, 2x USB-A, HDMI, microSD card reader, 3.5mm headphone jack",
    os: "Windows 11 Home",
    warranty: "1 Year International Warranty",
    description: "The LG Gram 17 defies expectations with its incredibly lightweight design despite its large 17-inch display. Perfect for professionals who need a big screen without sacrificing portability, it combines long battery life, powerful performance, and military-grade durability in an impossibly light package.",
    features: [
      "Incredibly light at just 1.35kg despite the large 17-inch screen",
      "MIL-STD-810G certified for durability and reliability",
      "99% DCI-P3 color gamut for accurate color reproduction",
      "Fingerprint reader integrated into power button for secure login",
      "Mega Slim Power Adapter for maximum portability",
      "DTS:X Ultra for immersive 3D audio",
    ],
  },
  {
    id: "10",
    name: "Alienware m15 R7",
    slug: "alienware-m15-r7",
    brand: "Alienware",
    category: "gaming",
    image: "https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?auto=format&fit=crop&w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1593642632823-8f785ba67e45?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1661961111184-11317b40adb2?auto=format&fit=crop&w=800&q=80",
    ],
    price: 329999,
    originalPrice: 349999,
    status: "In Stock",
    processor: "AMD Ryzen 9 6900HX",
    ram: "32GB DDR5",
    storage: "2TB PCIe SSD (2x 1TB in RAID0)",
    display: "15.6\" QHD (2560 x 1440) 240Hz",
    graphics: "NVIDIA GeForce RTX 3080 Ti 16GB GDDR6",
    battery: "Up to 7 hours",
    weight: "2.5 kg",
    ports: "3x USB-A, 1x USB-C with DisplayPort, HDMI 2.1, 3.5mm combo jack, RJ-45",
    os: "Windows 11 Home",
    warranty: "2 Year Premium Support",
    isNew: true,
    description: "The Alienware m15 R7 is a gaming powerhouse with an otherworldly design. Built for gamers who demand the absolute highest performance, it features cutting-edge components, an advanced cooling system, and AlienFX RGB lighting that creates an immersive gaming experience wherever you play.",
    features: [
      "Legendary Alienware Cryo-Tech cooling with quad fans and vapor chamber",
      "AlienFX RGB lighting system with 16.8 million colors",
      "Alienware Command Center for system monitoring and performance customization",
      "Mechanical keyboard with per-key RGB lighting and 1.8mm travel",
      "Advanced Optimus technology for optimized graphics performance and battery life",
      "360Hz display option available for competitive gaming",
    ],
  },
  {
    id: "11",
    name: "Lenovo Yoga 9i",
    slug: "lenovo-yoga-9i",
    brand: "Lenovo",
    category: "ultrabook",
    image: "https://images.unsplash.com/photo-1544731612-de7f96afe55f?auto=format&fit=crop&w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1544731612-de7f96afe55f?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1590387737862-704394124581?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1542393545-10f5cde2c810?auto=format&fit=crop&w=800&q=80",
    ],
    price: 179999,
    status: "In Stock",
    processor: "Intel Core i7-1260P",
    ram: "16GB LPDDR5",
    storage: "1TB PCIe SSD",
    display: "14\" 4K (3840 x 2160) OLED Touch",
    graphics: "Intel Iris Xe Graphics",
    battery: "Up to 12 hours",
    weight: "1.4 kg",
    ports: "2x Thunderbolt 4, 1x USB-A, 3.5mm headphone jack",
    os: "Windows 11 Home",
    warranty: "1 Year Depot or Carry-in Warranty",
    description: "The Yoga 9i is a premium 2-in-1 laptop designed for creatives and professionals who need versatility without compromising on performance or display quality. With its stunning 4K OLED display, innovative rotating soundbar, and elegant design, it delivers an exceptional experience for both work and entertainment.",
    features: [
      "360° hinge with rotating Bowers & Wilkins soundbar",
      "Precision-machined all-metal chassis with comfort-edge design",
      "4K OLED display with VESA DisplayHDR 500 True Black",
      "Smart Sense technology adapts performance based on usage patterns",
      "Integrated stylus with garage for storage and charging",
      "Intelligent cooling with AI optimization",
    ],
  },
  {
    id: "12",
    name: "MSI Creator Z16",
    slug: "msi-creator-z16",
    brand: "MSI",
    category: "business",
    image: "https://images.unsplash.com/photo-1588702547919-26089e690ecc?auto=format&fit=crop&w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1588702547919-26089e690ecc?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1588702547923-7093a6c3ba33?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1495465798138-718f86d1a4bc?auto=format&fit=crop&w=800&q=80",
    ],
    price: 259999,
    originalPrice: 289999,
    status: "In Stock",
    processor: "Intel Core i7-12700H",
    ram: "32GB DDR5",
    storage: "1TB NVMe SSD",
    display: "16\" QHD+ (2560 x 1600) 120Hz Touch",
    graphics: "NVIDIA GeForce RTX 3060 6GB GDDR6",
    battery: "Up to 8 hours",
    weight: "2.2 kg",
    ports: "2x Thunderbolt 4, 2x USB-A, HDMI, SD card reader, 3.5mm headphone jack",
    os: "Windows 11 Pro",
    warranty: "2 Year Limited Warranty",
    description: "The MSI Creator Z16 is a premium laptop designed specifically for content creators. With its color-accurate QHD+ display, powerful Intel and NVIDIA hardware, and sophisticated cooling system, it's optimized for creative workflows in applications like Adobe Creative Cloud, Blender, and DaVinci Resolve.",
    features: [
      "True Pixel display with 100% DCI-P3 color gamut and factory calibration",
      "CNC-milled aluminum chassis with premium Lunar Gray finish",
      "MSI Center for Creator with AI-assisted optimization for creative apps",
      "Cooler Boost Trinity+ technology with dedicated cooling for CPU and GPU",
      "Per-key RGB keyboard designed by SteelSeries",
      "Nahimic audio enhancement with 3D surround sound",
    ],
  },
];

// Get all products
export const getAllProducts = () => {
  return products;
};

// Get featured products
export const getFeaturedProducts = (limit?: number) => {
  const featuredProducts = products.filter((product) => product.isFeatured);
  if (limit) {
    return featuredProducts.slice(0, limit);
  }
  return featuredProducts;
};

// Get new products
export const getNewProducts = (limit?: number) => {
  const newProducts = products.filter((product) => product.isNew);
  if (limit) {
    return newProducts.slice(0, limit);
  }
  return newProducts;
};

// Get product by ID
export const getProductById = (id: string) => {
  return products.find((product) => product.id === id);
};

// Get product by slug
export const getProductBySlug = (slug: string) => {
  return products.find((product) => product.slug === slug);
};

// Get related products
export const getRelatedProducts = (productId: string, limit = 4) => {
  const currentProduct = getProductById(productId);
  if (!currentProduct) return [];
  
  return products
    .filter((product) => 
      product.id !== productId && 
      (product.category === currentProduct.category || product.brand === currentProduct.brand)
    )
    .slice(0, limit);
};

// Filter data for product filters
export const getFilterCategories = () => {
  return [
    {
      id: "brand",
      name: "Brand",
      options: Array.from(new Set(products.map((product) => product.brand)))
        .map((brand) => ({
          id: brand.toLowerCase(),
          name: brand,
        })),
    },
    {
      id: "category",
      name: "Category",
      options: [
        { id: "ultrabook", name: "Ultrabooks" },
        { id: "gaming", name: "Gaming" },
        { id: "business", name: "Business" },
      ],
    },
    {
      id: "price",
      name: "Price Range",
      options: [
        { id: "under-150000", name: "Under Rs. 150,000" },
        { id: "150000-200000", name: "Rs. 150,000 - Rs. 200,000" },
        { id: "200000-250000", name: "Rs. 200,000 - Rs. 250,000" },
        { id: "above-250000", name: "Above Rs. 250,000" },
      ],
    },
    {
      id: "processor",
      name: "Processor",
      options: [
        { id: "intel-i7", name: "Intel Core i7" },
        { id: "intel-i5", name: "Intel Core i5" },
        { id: "amd-ryzen", name: "AMD Ryzen" },
        { id: "apple-m1", name: "Apple M1" },
      ],
    },
  ];
};

// Filter products based on selected filters
export const filterProducts = (filters: Record<string, string[]>) => {
  return products.filter((product) => {
    // Check if product matches all filter categories
    return Object.entries(filters).every(([category, values]) => {
      if (values.length === 0) return true;
      
      switch (category) {
        case "brand":
          return values.includes(product.brand.toLowerCase());
        
        case "category":
          return values.includes(product.category);
        
        case "price":
          return values.some((range) => {
            if (range === "under-150000") return product.price < 150000;
            if (range === "150000-200000") return product.price >= 150000 && product.price < 200000;
            if (range === "200000-250000") return product.price >= 200000 && product.price < 250000;
            if (range === "above-250000") return product.price >= 250000;
            return false;
          });
        
        case "processor":
          return values.some((procType) => {
            if (procType === "intel-i7") return product.processor.includes("i7");
            if (procType === "intel-i5") return product.processor.includes("i5");
            if (procType === "amd-ryzen") return product.processor.includes("Ryzen");
            if (procType === "apple-m1") return product.processor.includes("M1");
            return false;
          });
        
        default:
          return true;
      }
    });
  });
};
