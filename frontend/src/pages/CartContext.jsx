import React, { createContext, useContext, useState, useEffect } from "react";
import toast from "react-hot-toast";

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [cartCount, setCartCount] = useState(0);
  const [cartTotal, setCartTotal] = useState(0);

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem("cart");
    if (savedCart) {
      try {
        const parsed = JSON.parse(savedCart);
        setCartItems(parsed);
      } catch (error) {
        console.error("Error loading cart:", error);
      }
    }
  }, []);

  // Save to localStorage and update totals whenever cart changes
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartItems));

    const count = cartItems.reduce(
      (sum, item) => sum + (item.quantity || 1),
      0,
    );
    setCartCount(count);

    const total = cartItems.reduce(
      (sum, item) => sum + item.price * (item.quantity || 1),
      0,
    );
    setCartTotal(total);
  }, [cartItems]);

  const addToCart = (item, quantity = 1) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((i) => i.id === item.id);

      if (existingItem) {
        toast.success(`Added another ${item.name} to cart`);
        return prevItems.map((i) =>
          i.id === item.id
            ? { ...i, quantity: (i.quantity || 1) + quantity }
            : i,
        );
      }

      toast.success(`${item.name} added to cart`);
      return [...prevItems, { ...item, quantity: quantity }];
    });
  };

  const removeFromCart = (id) => {
    setCartItems((prevItems) => {
      const item = prevItems.find((i) => i.id === id);
      if (item) {
        toast.success(`${item.name} removed from cart`);
      }
      return prevItems.filter((item) => item.id !== id);
    });
  };

  const updateQuantity = (id, quantity) => {
    if (quantity <= 0) {
      removeFromCart(id);
      return;
    }

    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, quantity: quantity } : item,
      ),
    );
  };

  const clearCart = () => {
    setCartItems([]);
    toast.success("Cart cleared");
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        cartCount,
        cartTotal,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
