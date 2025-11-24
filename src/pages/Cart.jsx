import React from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '@/context/CartContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Trash2, AlertCircle, ShoppingBag } from 'lucide-react';

// ✅ Currency Context
import { useCurrency } from '@/context/CurrencyContext';

const CartItem = ({ item, index }) => {
  const { updateCartQuantity, removeFromCart, validateCartQuantity } = useCart();
  const { currency, convertPrice } = useCurrency(); // 👈 use currency

  const unit = item.unit === 'pieces' ? 'pcs' : (item.unit === 'dozen' ? 'dz' : item.unit);

  const handleQuantityChange = (e) => {
    updateCartQuantity(item.id, e.target.value);
  };
  
  const handleBlur = () => {
    validateCartQuantity(item.id);
  }

  return (
    <motion.div
      layout
      initial={{ opacity: 0, x: -50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 50, transition: { duration: 0.2 } }}
      transition={{ delay: index * 0.1 }}
      className="bg-card p-4 rounded-lg flex flex-col sm:flex-row items-center gap-4 border shadow-sm"
    >
      <img
        className="w-24 h-24 object-cover rounded-md bg-secondary"
        alt={item.name}
        src={item.image || "https://images.unsplash.com/photo-1580728371486-c17d7e73f619"}
      />
      <div className="flex-grow w-full">
        <Link to={`/product/${item.id}`} className="font-bold text-card-foreground hover:text-primary">{item.name}</Link>
        <p className="text-sm text-muted-foreground mt-1">
          Min: {item.moq} {unit} | Step: {item.step_qty || 1} {unit}
        </p>
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mt-2">
          <div className="flex items-center gap-2">
            <Input
              type="number"
              value={item.quantity}
              onChange={handleQuantityChange}
              onBlur={handleBlur}
              min={item.moq}
              step={item.step_qty}
              className="w-24 text-center bg-background border-input text-base"
            />
            <span className="text-muted-foreground text-sm">
              x {convertPrice(item.price)} {currency}
            </span>
          </div>
          <p className="font-semibold text-primary text-lg mt-2 sm:mt-0">
            Total: {convertPrice(item.price * item.quantity)} {currency}
          </p>
        </div>
      </div>
      <Button variant="ghost" size="icon" onClick={() => removeFromCart(item.id)} className="text-destructive self-start sm:self-center">
        <Trash2 className="h-5 w-5" />
      </Button>
    </motion.div>
  );
};

const Cart = () => {
  const { cartItems, cartTotal } = useCart();
  const { currency, convertPrice } = useCurrency(); // 👈 use currency
  const navigate = useNavigate();

  // Seller ka pickup zone fix (aapke warehouse ka zone)
  const pickupZone = "NORTH1";

  // Total weight (1kg per item fallback)
  const totalWeight = cartItems.reduce((sum, item) => sum + (item.weight || 1) * item.quantity, 0);

  const estimatedShipping = 0;
  const grandTotal = cartTotal + estimatedShipping;

  return (
    <>
      <Helmet>
        <title>Your Bulk Cart - Reticulation</title>
        <meta name="description" content="View and manage items in your bulk shopping cart." />
      </Helmet>
      <div className="space-y-8">
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="text-4xl font-extrabold text-foreground">Your Bulk Cart</h1>
          <div className="bg-primary/10 border border-primary/20 p-3 rounded-lg text-sm text-primary-foreground flex items-center gap-3 mt-4">
            <AlertCircle className="h-5 w-5 text-primary" />
            <span className="text-foreground">Please note: All items have minimum order quantities and must be ordered in specified steps.</span>
          </div>
        </motion.div>

        {cartItems.length === 0 ? (
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }} 
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-16 bg-card border rounded-lg"
          >
            <ShoppingBag className="h-24 w-24 mx-auto text-muted-foreground mb-4" />
            <h2 className="text-2xl font-bold text-card-foreground">Your cart is empty</h2>
            <p className="text-muted-foreground mb-6">Looks like you haven't added any items to your bulk cart yet.</p>
            <Button onClick={() => navigate('/products')} size="lg">Start Shopping</Button>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-4">
              {cartItems.map((item, index) => (
                <CartItem item={item} index={index} key={item.id} />
              ))}
            </div>

            <div className="lg:col-span-1">
              <motion.div 
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                className="bg-card p-6 rounded-lg space-y-4 sticky top-24 border shadow-sm"
              >
                <h2 className="text-2xl font-bold text-card-foreground">Order Summary</h2>
                <div className="flex justify-between text-muted-foreground">
                  <span>Subtotal</span>
                  <span>{convertPrice(cartTotal)} {currency}</span>
                </div>
                <div className="flex justify-between text-muted-foreground">
                  <span>Shipping</span>
                  <span>{estimatedShipping === 0 ? "Calculated at checkout" : `${convertPrice(estimatedShipping)} ${currency}`}</span>
                </div>
                <div className="border-t my-2"></div>
                <div className="flex justify-between font-bold text-xl text-card-foreground">
                  <span>Total</span>
                  <span>{convertPrice(grandTotal)} {currency}</span>
                </div>
                <Button onClick={() => navigate('/checkout')} size="lg" className="w-full">
                  Proceed to Bulk Checkout
                </Button>
              </motion.div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Cart;
