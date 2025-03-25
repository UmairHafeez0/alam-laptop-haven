// Sample reviews data
export interface Review {
    id: string;
    productId: string;
    userName: string;
    rating: number;
    date: string;
    title: string;
    content: string;
    isVerified: boolean;
  }
  
  // Simulating a server fetch with sample data
  export const fetchReviews = async (productId: string): Promise<Review[]> => {
    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 500));
    
    return [
      {
        id: "1",
        productId,
        userName: "Alex Thompson",
        rating: 5,
        date: "2023-11-15",
        title: "Incredible performance and value",
        content: "I've been using this laptop for about a month now for both work and gaming. The performance is outstanding with the latest processor. Battery life exceeds expectations and the build quality is premium. Highly recommend for anyone looking for a powerful machine.",
        isVerified: true,
      },
      {
        id: "2",
        productId,
        userName: "Sarah Chen",
        rating: 4,
        date: "2023-10-28",
        title: "Great laptop with minor issues",
        content: "This laptop has exceptional speed and the display is stunning. I'm taking off one star because the fan can get a bit loud during intensive tasks, but otherwise it's perfect for my needs. The keyboard is comfortable for long typing sessions.",
        isVerified: true,
      }
    ];
  };
  