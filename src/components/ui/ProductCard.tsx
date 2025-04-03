
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";

export interface ProductProps {
  id: string;
  name: string;
  image: string;
  price: number;
  originalPrice?: number;
  processor?: string;
  ram?: string;
  storage?: string;
  display?: string;
  isNew?: boolean;
  isFeatured?: boolean;
}

interface ProductCardProps {
  product: ProductProps;
  className?: string;
}

export function ProductCard({ product, className }: ProductCardProps) {
  const { id, name, image, price, originalPrice, processor, ram, storage, display, isNew, isFeatured } = product;
  
  const discount = originalPrice ? Math.round(((originalPrice - price) / originalPrice) * 100) : 0;

  return (
    <Link 
      to={`/products/${id}`}
      className={cn(
        "group relative flex flex-col overflow-hidden rounded-xl bg-white border border-border hover:border-alam-200 transition-all duration-300",
        "hover:shadow-lg hover:shadow-alam-200/20 hover:-translate-y-1",
        className
      )}
    >
      {/* Image Container */}
      
      <div className="relative aspect-square overflow-hidden bg-gray-50 p-4">
        <img
          src={image}
          alt={name}
          className="h-full w-full object-contain transition-transform duration-500 ease-out group-hover:scale-[1.04]"
        />
        
        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1">
          {isNew && (
            <span className="inline-flex items-center rounded-full bg-alam-500 px-2.5 py-1 text-xs font-medium text-white">
              New
            </span>
          )}
          
          {discount > 0 && (
            <span className="inline-flex items-center rounded-full bg-red-500 px-2.5 py-1 text-xs font-medium text-white">
              {discount}% Off
            </span>
          )}
        </div>
      </div>
      
      {/* Content */}
      <div className="flex flex-1 flex-col p-4">
        <h3 className="text-lg font-medium text-gray-900 group-hover:text-alam-600 transition-colors">
          {name}
        </h3>
        
        {/* Specs */}
        <div className="mt-2 flex-1">
          <ul className="space-y-1 text-sm text-muted-foreground">
            {processor && <li className="truncate">{processor}</li>}
            {ram && <li className="truncate">{ram}</li>}
            {storage && <li className="truncate">{storage}</li>}
            {display && <li className="truncate">{display}</li>}
          </ul>
        </div>
        
        {/* Price */}
        <div className="mt-3 flex items-end justify-between">
          <div>
            <p className="text-lg font-medium text-gray-900">
              Rs. {price.toLocaleString()}
            </p>
            {originalPrice && (
              <p className="text-sm text-muted-foreground line-through">
                Rs. {originalPrice.toLocaleString()}
              </p>
            )}
          </div>
          
          <div className="rounded-full bg-alam-50 p-2 text-alam-600 opacity-0 transition-opacity group-hover:opacity-100">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="m9 18 6-6-6-6"/>
            </svg>
          </div>
        </div>
      </div>
    </Link>
  );
}
