import React, { useMemo } from 'react';
import { Helmet } from 'react-helmet';
import { useSearchParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { products } from '@/data/products';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Star, ShoppingCart, SearchX } from 'lucide-react';
import { useCart } from '@/context/CartContext';

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();

  return (
    <Card className="bg-card text-card-foreground h-full flex flex-col overflow-hidden hover:border-primary transition-all duration-300 transform hover:-translate-y-1 group shadow-sm">
      <Link to={`/product/${product.id}`} className="block">
        <div className="aspect-w-1 aspect-h-1 w-full overflow-hidden bg-secondary/50">
          <img 
            className="w-full h-full object-cover object-center transition-transform duration-300 group-hover:scale-105"
            alt={product.name}
            src={product.image || "https://images.unsplash.com/photo-1646193186132-7976c1670e81"} />
        </div>
      </Link>
      <CardContent className="p-4 flex-grow flex flex-col">
        <p className="text-xs text-primary mb-1">{product.category}</p>
        <h3 className="text-base font-bold mb-2 flex-grow">{product.name}</h3>
        <p className="text-sm text-muted-foreground mb-4 line-clamp-2 h-10">{product.shortDescription}</p>
        
        <div className="flex justify-between items-center mb-4 mt-auto">
          <p className="text-lg font-bold text-primary">₹{product.price.toLocaleString()}<span className="text-xs font-normal text-muted-foreground">/{product.unit === 'dozen' ? 'dz' : product.unit}</span></p>
          <div className="flex items-center">
            <Star className="h-4 w-4 text-yellow-400 fill-current" />
            <span className="text-sm text-muted-foreground ml-1">{product.rating}</span>
          </div>
        </div>
        <Button onClick={() => addToCart(product, product.moq || 1)} className="w-full">
          <ShoppingCart className="mr-2 h-4 w-4" /> Add to Cart
        </Button>
      </CardContent>
    </Card>
  );
};

const SearchResults = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q')?.toLowerCase() || '';

  const filteredProducts = useMemo(() => {
    if (!query) return [];
    return products.filter(product => 
      product.name.toLowerCase().includes(query) ||
      product.category.toLowerCase().includes(query) ||
      product.shortDescription.toLowerCase().includes(query)
    );
  }, [query]);

  return (
    <>
      <Helmet>
        <title>Search Results for "{query}" - Reticulation Business</title>
        <meta name="description" content={`Find products matching your search for ${query}.`} />
      </Helmet>
      <div className="space-y-8">
        <section>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-4xl md:text-5xl font-extrabold text-foreground mb-4"
          >
            Search Results
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-lg text-muted-foreground"
          >
            {filteredProducts.length > 0 
              ? `Found ${filteredProducts.length} products for "${query}"`
              : `No products found for "${query}"`
            }
          </motion.p>
        </section>

        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredProducts.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
              >
                <ProductCard product={product} />
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-card rounded-lg mt-6 border">
            <SearchX className="h-24 w-24 mx-auto text-muted-foreground mb-4" />
            <h2 className="text-2xl font-bold text-foreground">No Results Found</h2>
            <p className="text-muted-foreground mb-6">We couldn't find any products matching your search. Try a different keyword.</p>
            <Button asChild>
              <Link to="/products">Browse All Products</Link>
            </Button>
          </div>
        )}
      </div>
    </>
  );
};

export default SearchResults;