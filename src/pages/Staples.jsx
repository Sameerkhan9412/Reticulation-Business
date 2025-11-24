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
import { Slider } from '@/components/ui/slider';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { products, priceRanges, weightRanges } from '@/data/products';
import { useCart } from '@/context/CartContext';

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(product.moq || 1);
  const [selectedPackage, setSelectedPackage] = useState(product.packagingSizes[0]);

  const handleAddToCart = () => {
    addToCart(product, quantity);
  };

  return (
    <Card className="bg-card text-card-foreground h-full flex flex-col overflow-hidden hover:border-primary transition-all duration-300 transform hover:-translate-y-1 group shadow-sm">
      <Link to={`/product/${product.id}`} className="block">
        <div className="aspect-square overflow-hidden bg-secondary/50">
          <img 
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" 
            alt={product.name} 
            src={product.image || "https://images.unsplash.com/photo-1559223669-e0065fa7f142"} 
          />
        </div>
      </Link>
      <CardContent className="p-4 flex-grow flex flex-col">
        <h3 className="text-lg font-bold mb-2 flex-grow">{product.name}</h3>
        <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{product.shortDescription}</p>
        
        <div className="flex justify-between items-center mb-4">
          <p className="text-xl font-bold text-primary">₹{product.price.toLocaleString()}</p>
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
            <div className="flex items-center gap-2">
              <Button variant="outline" size="icon" className="h-8 w-8" onClick={() => setQuantity(q => Math.max(product.moq, q - 1))}>
                <Minus className="h-4 w-4" />
              </Button>
              <Input
                type="number"
                value={quantity}
                onChange={(e) => setQuantity(Math.max(product.moq, parseInt(e.target.value) || product.moq))}
                className="w-16 h-8 text-center"
                min={product.moq}
              />
              <Button variant="outline" size="icon" className="h-8 w-8" onClick={() => setQuantity(q => q + 1)}>
                <Plus className="h-4 w-4" />
              </Button>
            </div>
            <Button onClick={handleAddToCart} className="h-8 px-3">
              <ShoppingCart className="h-4 w-4" />
            </Button>
          </div>
          <p className="text-xs text-center text-muted-foreground">MOQ: {product.moq}</p>
        </div>
      </CardContent>
    </Card>
  );
};

const Staples = () => {
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [priceRange, setPriceRange] = useState([0, 5000]);
  const [weightRange, setWeightRange] = useState([0, 50000]);
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const stapleCategories = ["Indian Rice", "Pulses", "Indian Spices"];

  const handleCategoryChange = (category) => {
    setSelectedCategories(prev =>
      prev.includes(category)
        ? prev.filter(c => c !== category)
        : [...prev, category]
    );
  };

  const filteredProducts = useMemo(() => {
    let baseProducts = products.filter(p => stapleCategories.includes(p.category));

    return baseProducts.filter(product => {
      const categoryMatch = selectedCategories.length === 0 || selectedCategories.includes(product.category);
      const priceMatch = product.price >= priceRange[0] && product.price <= priceRange[1];
      const weightMatch = product.weight >= weightRange[0] && product.weight <= weightRange[1];
      return categoryMatch && priceMatch && weightMatch;
    });
  }, [selectedCategories, priceRange, weightRange]);

  const productsByCategory = useMemo(() => {
    return stapleCategories.reduce((acc, category) => {
      acc[category] = filteredProducts.filter(p => p.category === category);
      return acc;
    }, {});
  }, [filteredProducts]);

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
        <div className="space-y-2">
          {stapleCategories.map(category => (
            <div key={category} className="flex items-center space-x-2">
              <Checkbox
                id={category}
                checked={selectedCategories.includes(category)}
                onCheckedChange={() => handleCategoryChange(category)}
              />
              <Label htmlFor={category} className="text-muted-foreground">{category}</Label>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h3 className="font-semibold mb-3 text-foreground">Price Range</h3>
        <Slider
          defaultValue={[priceRange[1]]}
          max={5000}
          step={50}
          onValueChange={(value) => setPriceRange([0, value[0]])}
        />
        <div className="flex justify-between text-sm text-muted-foreground mt-2">
          <span>₹0</span>
          <span>₹{priceRange[1].toLocaleString()}</span>
        </div>
      </div>

      <div>
        <h3 className="font-semibold mb-3 text-foreground">Weight Range</h3>
        <Slider
          defaultValue={[weightRange[1]]}
          max={50000}
          step={100}
          onValueChange={(value) => setWeightRange([0, value[0]])}
        />
        <div className="flex justify-between text-sm text-muted-foreground mt-2">
          <span>0g</span>
          <span>{weightRange[1] >= 1000 ? `${(weightRange[1]/1000).toFixed(1)}kg` : `${weightRange[1]}g`}</span>
        </div>
      </div>
      
      <Button onClick={() => {setSelectedCategories([]); setPriceRange([0, 5000]); setWeightRange([0, 50000])}} variant="outline" className="w-full">
        Clear All Filters
      </Button>
    </motion.aside>
  );

  return (
    <>
      <Helmet>
        <title>Staples: Rice, Pulses, & Spices - Reticulation Business</title>
        <meta name="description" content="Browse our collection of high-quality Indian rice, pulses, and spices. Perfect for bulk orders." />
      </Helmet>
      <div className="space-y-8">
        <section className="text-center">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-4xl md:text-5xl font-extrabold text-foreground mb-4"
          >
            Our Staples Collection
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-lg text-muted-foreground max-w-2xl mx-auto"
          >
            High-quality Indian Rice, Pulses, and Spices for all your needs.
          </motion.p>
        </section>

        <div className="lg:grid lg:grid-cols-4 lg:gap-8">
          <div className="hidden lg:block">
            <FilterSidebar />
          </div>
          
          <main className="lg:col-span-3 space-y-12">
            <div className="flex justify-between items-center mb-4 lg:hidden">
              <p className="text-muted-foreground">{filteredProducts.length} products found</p>
              <Button variant="outline" onClick={() => setIsFilterOpen(true)}>
                <Filter className="mr-2 h-4 w-4" />
                Filters
              </Button>
            </div>
            
            <AnimatePresence>
              {isFilterOpen && <FilterSidebar />}
            </AnimatePresence>
            
            {stapleCategories.map(category => (
              productsByCategory[category].length > 0 && (
                <section key={category}>
                  <h2 className="text-3xl font-bold text-foreground mb-6 border-b-2 border-primary pb-2">{category}</h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                    <AnimatePresence>
                      {productsByCategory[category].map((product, index) => (
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
                </section>
              )
            ))}

            {filteredProducts.length === 0 && (
              <div className="text-center py-16 bg-card rounded-lg mt-6 border">
                <h2 className="text-2xl font-bold text-foreground">No Products Found</h2>
                <p className="text-muted-foreground mb-6">Try adjusting your filters to find what you're looking for.</p>
                <Button onClick={() => {setSelectedCategories([]); setPriceRange([0, 5000]); setWeightRange([0, 50000]);}} variant="outline">
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

export default Staples;