export const verifyOrder = async (orderId: string, productId: string) => {
    try {
      // Simulate an API request
      await new Promise((resolve) => setTimeout(resolve, 1000));
      
      // Mock response
      if (orderId === "valid-order-123") {
        return { valid: true };
      } else {
        return { valid: false, message: "Invalid order ID." };
      }
    } catch (error) {
      console.error("Error verifying order:", error);
      return { valid: false, message: "Error verifying order." };
    }
  };