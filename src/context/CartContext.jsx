import React, { createContext, useContext, useState, useEffect } from 'react';
import { useToast } from "@/components/ui/use-toast";
import { calculateShippingCharge } from "@/utils/shipping";

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const { toast } = useToast();

  // ✅ LocalStorage se safe load
  const [cartItems, setCartItems] = useState(() => {
    try {
      const saved = localStorage.getItem("reticulation-cart");
      return saved ? JSON.parse(saved) : [];
    } catch (err) {
      console.error("❌ Cart parse error:", err);
      return [];
    }
  });

  const [shippingState, setShippingState] = useState("");

  // ✅ Sync with localStorage
  useEffect(() => {
    localStorage.setItem("reticulation-cart", JSON.stringify(cartItems));
  }, [cartItems]);

  // ➕ Add to cart
  const addToCart = (product, quantity) => {
    const minQty = product.moq || 1;
    const stepQty = product.step_qty || 1;
    const numQuantity = Number(quantity);

    if (isNaN(numQuantity) || numQuantity < minQty) {
      toast({
        variant: "destructive",
        title: "Invalid Quantity",
        description: `Minimum order quantity for ${product.name} is ${minQty}.`,
      });
      return;
    }

    if ((numQuantity - minQty) % stepQty !== 0) {
      toast({
        variant: "destructive",
        title: "Invalid Quantity",
        description: `Quantity for ${product.name} must be in steps of ${stepQty} above the minimum of ${minQty}.`,
      });
      return;
    }

    setCartItems(prevItems => {
      const existingItem = prevItems.find(item => item.id === product.id);
      if (existingItem) {
        const newQuantity = existingItem.quantity + numQuantity;
        toast({
          title: "Cart Updated",
          description: `${product.name} quantity increased to ${newQuantity}.`
        });
        return prevItems.map(item =>
          item.id === product.id ? { ...item, quantity: newQuantity } : item
        );
      } else {
        toast({
          title: "Added to Cart!",
          description: `${numQuantity} x ${product.name} added to your bulk cart.`
        });
        return [...prevItems, { ...product, quantity: numQuantity }];
      }
    });
  };

  // 🔄 Update qty
  const updateCartQuantity = (productId, newQuantity) => {
    const numQuantity = Number(newQuantity);
    if (isNaN(numQuantity) || numQuantity <= 0) return;
    setCartItems(prevItems =>
      prevItems.map(item =>
        item.id === productId ? { ...item, quantity: numQuantity } : item
      )
    );
  };

  // ✅ Validate qty (MOQ + step)
  const validateCartQuantity = (productId) => {
    const item = cartItems.find(i => i.id === productId);
    if (!item) return;

    const minQty = item.moq || 1;
    const stepQty = item.step_qty || 1;

    if (item.quantity < minQty) {
      toast({
        variant: "destructive",
        title: "Minimum Quantity",
        description: `The minimum order for ${item.name} is ${minQty}. Quantity updated.`,
      });
      setCartItems(prev =>
        prev.map(i => i.id === productId ? { ...i, quantity: minQty } : i)
      );
    } else if ((item.quantity - minQty) % stepQty !== 0) {
      const newValidQuantity = minQty + Math.floor((item.quantity - minQty) / stepQty) * stepQty;
      toast({
        variant: "destructive",
        title: "Invalid Step Quantity",
        description: `Quantity for ${item.name} must be in steps of ${stepQty}. Adjusted.`,
      });
      setCartItems(prev =>
        prev.map(i => i.id === productId ? { ...i, quantity: newValidQuantity } : i)
      );
    }
  };

  // ❌ Remove
  const removeFromCart = (productId) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== productId));
    toast({ title: "Item Removed", description: "Item removed from cart." });
  };

  // 🗑 Clear
  const clearCart = () => {
    setCartItems([]);
    localStorage.removeItem("reticulation-cart"); // ✅ fix
  };

  // 🧮 Totals
  const cartTotal = cartItems.reduce((t, i) => t + i.price * i.quantity, 0);
  const itemCount = cartItems.reduce((t, i) => t + i.quantity, 0);
  const uniqueItemCount = cartItems.length;

  // 🚚 Shipping
  const pickupZone = "NORTH1";
  const totalWeight = cartItems.reduce((s, i) => s + (i.weight || 1) * i.quantity, 0);
  const shippingCharge = shippingState
    ? calculateShippingCharge(pickupZone, shippingState, totalWeight)
    : 0;
  const grandTotal = cartTotal + shippingCharge;

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        updateCartQuantity,
        validateCartQuantity,
        removeFromCart,
        clearCart,
        cartTotal,
        itemCount,
        uniqueItemCount,
        shippingState,
        setShippingState,
        shippingCharge,
        grandTotal,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
