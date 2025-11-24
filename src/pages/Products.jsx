import React, { useState, useMemo } from 'react';
import { Helmet } from 'react-helmet';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Star, Plus, Minus, ShoppingCart, Filter, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { products, categories, priceRanges } from '@/data/products';
import { useCart } from '@/context/CartContext';
import { useToast } from '@/components/ui/use-toast';

// 👇 Currency Context import
import { useCurrency } from '@/context/CurrencyContext';

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(product.moq || 1);
  const { toast } = useToast();
  const [selectedPackage, setSelectedPackage] = useState(product.packagingSizes[0]);

  // 👇 Currency hook
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
        
        {/* 👇 Price with Currency */}
        <div className="flex justify-between items-center mb-4">
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
              <Button variant="outline" size="icon" className="h-8 w-8" onClick={() => handleQuantityChange(Math.max(product.moq, quantity - 100))}>
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
              <Button variant="outline" size="icon" className="h-8 w-8" onClick={() => handleQuantityChange(quantity + 100)}>
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

const Products = () => {
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [priceRange, setPriceRange] = useState([0, 5000]);
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const handleCategoryChange = (category) => {
    setSelectedCategories(prev =>
      prev.includes(category)
        ? prev.filter(c => c !== category)
        : [...prev, category]
    );
  };
  
  const handlePriceFilterChange = (value) => {
    const selectedRange = priceRanges.find(r => r.label === value)?.value || [0, 5000];
    setPriceRange(selectedRange);
  }

  const filteredProducts = useMemo(() => {
    return products.filter(product => {
      const categoryMatch = selectedCategories.length === 0 || selectedCategories.includes(product.category);
      const priceMatch = product.price >= priceRange[0] && product.price <= priceRange[1];
      return categoryMatch && priceMatch;
    });
  }, [selectedCategories, priceRange]);

  const FilterSidebar = () => (
    <motion.aside 
      initial={{ x: '-100%' }}
      animate={{ x: 0 }}
      exit={{ x: '-100%' }}
      transition={{ duration: 0.3, ease: 'easeInOut' }}
      className="fixed top-0 left-0 h-full w-full max-w-xs bg-background/95 backdrop-blur-sm z-50 p-6 space-y-6 overflow-y-auto lg:sticky lg:top-24 lg:h-auto lg:max-w-none lg:bg-card lg:rounded-lg lg:z-10 border-r"
    >
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-foreground">Filters</h2>
        <Button variant="ghost" size="icon" className="lg:hidden" onClick={() => setIsFilterOpen(false)}>
          <X className="h-6 w-6" />
        </Button>
      </div>
      
      <div>
        <h3 className="font-semibold mb-3 text-foreground">Categories</h3>
        <div className="space-y-2 max-h-60 overflow-y-auto pr-2">
          {categories.map(category => (
            <div key={category} className="flex items-center space-x-2">
              <Checkbox
                id={category}
                checked={selectedCategories.includes(category)}
                onCheckedChange={() => handleCategoryChange(category)}
              />
              <Label htmlFor={category} className="text-muted-foreground text-sm font-normal">{category}</Label>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h3 className="font-semibold mb-3 text-foreground">Price Range</h3>
        <div className="space-y-2">
            {priceRanges.slice(1).map(range => (
                 <div key={range.label} className="flex items-center space-x-2">
                    <Checkbox
                        id={range.label}
                        checked={priceRange[0] === range.value[0] && priceRange[1] === range.value[1]}
                        onCheckedChange={() => handlePriceFilterChange(range.label)}
                    />
                    <Label htmlFor={range.label} className="text-muted-foreground text-sm font-normal">{range.label}</Label>
                </div>
            ))}
        </div>
      </div>
      
      <Button onClick={() => {setSelectedCategories([]); setPriceRange([0, 5000])}} variant="outline" className="w-full">
        Clear All Filters
      </Button>
    </motion.aside>
  );

  return (
    <>
      <Helmet>
        <title>Our Products - Reticulation Business</title>
        <meta name="description" content="Explore our wide range of high-quality products." />
      </Helmet>
      <div className="space-y-8">
        <section className="text-center">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-4xl md:text-5xl font-extrabold text-foreground mb-4"
          >
            Our Products
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-lg text-muted-foreground max-w-2xl mx-auto"
          >
            Browse our extensive catalog. Use the filters to find exactly what you need.
          </motion.p>
        </section>

        <div className="lg:grid lg:grid-cols-4 lg:gap-8">
          <div className="hidden lg:block">
            <FilterSidebar />
          </div>
          
          <main className="lg:col-span-3">
            <div className="flex justify-between items-center mb-4">
              <p className="text-muted-foreground">{filteredProducts.length} products found</p>
              <Button variant="outline" className="lg:hidden" onClick={() => setIsFilterOpen(true)}>
                <Filter className="mr-2 h-4 w-4" />
                Filters
              </Button>
            </div>
            
            <AnimatePresence>
              {isFilterOpen && <FilterSidebar />}
            </AnimatePresence>

            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-6">
              <AnimatePresence>
                {filteredProducts.map((product, index) => (
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
            {filteredProducts.length === 0 && (
              <div className="text-center py-16 bg-card rounded-lg mt-6 border">
                <h2 className="text-2xl font-bold text-foreground">No Products Found</h2>
                <p className="text-muted-foreground mb-6">Try adjusting your filters to find what you're looking for.</p>
                <Button onClick={() => {setSelectedCategories([]); setPriceRange([0, 5000])}} variant="outline">
                  Clear All Filters
                </Button>
              </div>
            )}
          </main>
        </div>
      </div>
    </>
  );
};

export default Products;
