import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Star, Plus, Minus, ShoppingCart, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { products } from '@/data/products';
import { useCart } from '@/context/CartContext';
import { useToast } from '@/components/ui/use-toast';

// ✅ Currency Context
import { useCurrency } from '@/context/CurrencyContext';

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(product.moq || 1);
  const { toast } = useToast();
  const [selectedPackage, setSelectedPackage] = useState(product.packagingSizes[0]);

  // ✅ currency hook
  const { currency, convertPrice } = useCurrency();

  const handleAddToCart = () => {
    addToCart(product, quantity);
    toast({
      title: "Added to Cart!",
      description: `${quantity} x ${product.name} has been added.`,
    });
  };

  const handleQuantityChange = (newQuantity) => {
    const numQuantity = Number(newQuantity);
    if (isNaN(numQuantity) || numQuantity <= 0) {
      setQuantity(product.moq);
      return;
    }
    setQuantity(numQuantity);
  };

  const handleBlur = () => {
    if (quantity < product.moq) {
      toast({
        variant: "destructive",
        title: "Minimum Order Quantity",
        description: `The minimum order for ${product.name} is ${product.moq} ${product.unit}.`,
      });
      setQuantity(product.moq);
    }
  };

  return (
    <Card className="bg-card text-card-foreground h-full flex flex-col overflow-hidden hover:border-primary transition-all duration-300 transform hover:-translate-y-1 group shadow-sm">
      <Link to={`/product/${product.id}`} className="block">
        <div className="aspect-w-1 aspect-h-1 w-full overflow-hidden bg-secondary/50">
          <img 
            className="w-full h-full object-cover object-center transition-transform duration-300 group-hover:scale-105"
            alt={product.name}
            src={product.image || "https://images.unsplash.com/photo-1646193186132-7976c1670e81"} 
          />
        </div>
      </Link>
      <CardContent className="p-4 flex-grow flex flex-col">
        <p className="text-xs text-primary mb-1">{product.category}</p>
        <h3 className="text-base font-bold mb-2 flex-grow">{product.name}</h3>
        <p className="text-sm text-muted-foreground mb-4 line-clamp-2 h-10">{product.shortDescription}</p>
        
        <div className="flex justify-between items-center mb-4">
          {/* ✅ currency converter applied */}
          <p className="text-lg font-bold text-primary">
            {convertPrice(product.price)} {currency}
            <span className="text-xs font-normal text-muted-foreground">
              /{product.unit === 'dozen' ? 'dz' : product.unit}
            </span>
          </p>
          <div className="flex items-center">
            <Star className="h-4 w-4 text-yellow-400 fill-current" />
            <span className="text-sm text-muted-foreground ml-1">{product.rating}</span>
          </div>
        </div>

        <div className="space-y-3 mt-auto">
          <div>
            <Label htmlFor={`packaging-${product.id}`} className="text-xs text-muted-foreground">Packaging</Label>
            <Select value={selectedPackage} onValueChange={setSelectedPackage}>
              <SelectTrigger id={`packaging-${product.id}`} className="h-9">
                <SelectValue placeholder="Select size" />
              </SelectTrigger>
              <SelectContent>
                {product.packagingSizes.map(size => (
                  <SelectItem key={size} value={size}>{size}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1">
              <Button 
                variant="outline" 
                size="icon" 
                className="h-8 w-8" 
                onClick={() => handleQuantityChange(Math.max(product.moq, quantity - 100))}
              >
                <Minus className="h-4 w-4" />
              </Button>
              <Input
                type="number"
                value={quantity}
                onChange={(e) => handleQuantityChange(e.target.value)}
                onBlur={handleBlur}
                className="w-16 h-8 text-center"
                min={product.moq}
              />
              <Button 
                variant="outline" 
                size="icon" 
                className="h-8 w-8" 
                onClick={() => handleQuantityChange(quantity + 100)}
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>
            <Button onClick={handleAddToCart} className="h-8 px-2 text-xs sm:px-3 sm:text-sm">
              <ShoppingCart className="h-4 w-4 mr-1" />
              Add
            </Button>
          </div>
          <p className="text-xs text-center text-muted-foreground">MOQ: {product.moq} {product.unit}</p>
        </div>
      </CardContent>
    </Card>
  );
};

const FeaturedProducts = () => {
  const allowedCategories = ["Herbal Products", "Indian Spices", "Dry Fruits"];
  const featuredProducts = products
    .filter(p => allowedCategories.includes(p.category))
    .slice(0, 15);

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-bold text-foreground">Featured Products</h2>
        <Button asChild variant="outline">
          <Link to="/products">
            View All
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4 md:gap-6">
        <AnimatePresence>
          {featuredProducts.map((product, index) => (
            <motion.div
              key={product.id}
              layout
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
            >
              <ProductCard product={product} />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default FeaturedProducts;
