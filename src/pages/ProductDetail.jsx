import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { useParams, Link, Navigate } from 'react-router-dom';
import { Star, ShoppingCart, Heart, Share2, ArrowRight, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/components/ui/use-toast';
import { useCart } from '@/context/CartContext';
import { products } from '@/data/products';

// 👇 Currency context import
import { useCurrency } from '@/context/CurrencyContext';

const ProductDetail = () => {
  const { id } = useParams();
  const { toast } = useToast();
  const { addToCart } = useCart();

  const product = products.find(p => p.id === parseInt(id));

  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(10);

  // 👇 Currency hook
  const { currency, convertPrice } = useCurrency();

  useEffect(() => {
    if (product) {
      setQuantity(product.moq || 10);
    }
  }, [product]);

  if (!product) {
    return <Navigate to="/404" />;
  }

  const minQty = product.moq || 10;
  const stepQty = product.step_qty || 5;

  const handleQuantityChange = (e) => {
    let value = parseInt(e.target.value, 10);
    if (isNaN(value) || value < minQty) {
      value = minQty;
    }
    setQuantity(value);
  };

  const handleAddToCart = () => {
    addToCart(product, quantity);
  };

  const handleAddToWishlist = () => {
    toast({
      title: "Added to Wishlist!",
      description: `${product.name} has been added to your wishlist.`
    });
  };
  
  const handleShare = () => {
    toast({
      title: "Share Product",
      description: "🚧 Share functionality isn't implemented yet—but don't worry! You can request it in your next prompt! 🚀"
    });
  };

  const productImages = product.image ? [product.image] : (product.images || [
    "https://images.unsplash.com/photo-1595872018818-97555653a011",
    "https://images.unsplash.com/photo-1646193186132-7976c1670e81",
    "https://images.unsplash.com/photo-1587598134828-5c12042769f2",
    "https://images.unsplash.com/photo-1587598134828-5c12042769f2"
  ]);

  return (
    <>
      <Helmet>
        <title>{product.name} - Reticulation International</title>
        <meta name="description" content={product.shortDescription} />
      </Helmet>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Image Gallery */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="aspect-square bg-gray-100 rounded-lg mb-4 overflow-hidden">
              <img  
                className="w-full h-full object-contain transition-transform duration-300 ease-in-out"
                alt={product.name}
                src={productImages[selectedImageIndex]} />
            </div>
            <div className="grid grid-cols-4 gap-4">
              {productImages.length > 1 && productImages.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImageIndex(index)}
                  className={`aspect-square bg-gray-100 rounded-md overflow-hidden border-2 transition-all ${
                    selectedImageIndex === index ? 'border-primary scale-105' : 'border-transparent opacity-60 hover:opacity-100'
                  }`}
                >
                  <img  
                    className="w-full h-full object-cover"
                    alt={`${product.name} thumbnail ${index + 1}`}
                    src={image} />
                </button>
              ))}
            </div>
          </motion.div>

          {/* Product Info */}
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex flex-col"
          >
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">{product.name}</h1>
            <p className="text-sm text-primary mb-4">{product.category}</p>
            
            <div className="flex items-center space-x-4 mb-4">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-5 w-5 ${
                      i < Math.floor(product.rating) 
                        ? 'text-yellow-400 fill-current' 
                        : 'text-muted-foreground'
                    }`}
                  />
                ))}
                <span className="ml-2 text-sm text-muted-foreground">
                  {product.rating} ({product.reviews || 0} reviews)
                </span>
              </div>
              <Button variant="ghost" size="sm" onClick={handleShare} className="text-muted-foreground hover:text-primary">
                <Share2 className="h-4 w-4 mr-2" /> Share
              </Button>
            </div>

            <p className="text-muted-foreground leading-relaxed mb-6">{product.shortDescription}</p>

            {/* 👇 Updated Price with Currency */}
            <div className="flex items-baseline space-x-3 mb-6">
              <span className="text-3xl font-bold text-primary">
                {convertPrice(product.price)} {currency}
              </span>
              {product.originalPrice && (
                <span className="text-xl text-muted-foreground line-through">
                  {convertPrice(product.originalPrice)} {currency}
                </span>
              )}
            </div>
            
            <div className="bg-blue-50 border border-blue-200 p-3 rounded-lg text-sm text-blue-800 flex items-center gap-3 mb-6">
              <AlertCircle className="h-5 w-5" />
              <span>Minimum order: {minQty} units. Order in steps of {stepQty}.</span>
            </div>

            <div className="flex items-center space-x-4 mb-6">
              <div className="w-28">
                <Input
                  type="number"
                  value={quantity}
                  onChange={handleQuantityChange}
                  min={minQty}
                  step={stepQty}
                  className="text-center"
                />
              </div>
              <Button onClick={handleAddToCart} size="lg" className="flex-1">
                <ShoppingCart className="mr-2 h-5 w-5" /> Add to Bulk Cart
              </Button>
              <Button onClick={handleAddToWishlist} size="lg" variant="outline">
                <Heart className="h-5 w-5" />
              </Button>
            </div>

            <div className="mt-auto pt-6 border-t">
              <h2 className="text-xl font-bold text-foreground mb-4">Product Description</h2>
              <p className="text-muted-foreground leading-relaxed">
                {product.fullDescription || product.shortDescription}
              </p>
              <div className="mt-6 space-y-2">
                <p className="text-muted-foreground">Looking for official documents?</p>
                <div className="flex flex-col sm:flex-row sm:space-x-4 space-y-2 sm:space-y-0">
                  {(product.certificates && product.certificates.length > 0) &&
                      <Button asChild variant="link" className="text-primary px-0 justify-start">
                          <Link to="/certificates">View Product Certificates <ArrowRight className="ml-2 h-4 w-4" /></Link>
                      </Button>
                  }
                  {(product.documents && product.documents.length > 0) &&
                      <Button asChild variant="link" className="text-primary px-0 justify-start">
                          <Link to="/documents">View Product Documents <ArrowRight className="ml-2 h-4 w-4" /></Link>
                      </Button>
                  }
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </>
  );
};

export default ProductDetail;
