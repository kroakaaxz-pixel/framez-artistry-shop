import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { ShoppingCart } from "lucide-react";
import { getProducts, ShopifyProduct } from "@/lib/shopify";
import { useCartStore } from "@/stores/cartStore";
import { toast } from "sonner";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const ProductDetail = () => {
  const { handle } = useParams();
  const [product, setProduct] = useState<ShopifyProduct | null>(null);
  const [selectedVariant, setSelectedVariant] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const addItem = useCartStore(state => state.addItem);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const products = await getProducts(100);
        const found = products.find(p => p.node.handle === handle);
        if (found) {
          setProduct(found);
          setSelectedVariant(found.node.variants.edges[0]?.node);
        }
      } catch (error) {
        console.error('Error fetching product:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [handle]);

  const handleAddToCart = () => {
    if (!product || !selectedVariant) return;

    const cartItem = {
      product,
      variantId: selectedVariant.id,
      variantTitle: selectedVariant.title,
      price: selectedVariant.price,
      quantity: 1,
      selectedOptions: selectedVariant.selectedOptions || []
    };
    
    addItem(cartItem);
    toast.success("Added to cart", {
      description: `${product.node.title} has been added to your cart`,
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <div className="animate-pulse text-muted-foreground">Loading...</div>
        </main>
        <Footer />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Product not found</h1>
            <p className="text-muted-foreground">The product you're looking for doesn't exist.</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const { node } = product;
  const mainImage = node.images.edges[0]?.node.url;

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 py-12 md:py-16">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 animate-fade-in">
            {/* Product Images */}
            <div className="space-y-4">
              <div className="aspect-square overflow-hidden rounded-lg bg-secondary/20">
                {mainImage ? (
                  <img
                    src={mainImage}
                    alt={node.title}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-muted">
                    <span className="text-muted-foreground">No image available</span>
                  </div>
                )}
              </div>
              
              {node.images.edges.length > 1 && (
                <div className="grid grid-cols-4 gap-4">
                  {node.images.edges.slice(1, 5).map((image, idx) => (
                    <div key={idx} className="aspect-square overflow-hidden rounded-lg bg-secondary/20">
                      <img
                        src={image.node.url}
                        alt={`${node.title} ${idx + 2}`}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Product Info */}
            <div className="space-y-6">
              <div>
                <h1 className="text-3xl md:text-4xl font-bold mb-2">{node.title}</h1>
                <p className="text-3xl font-bold text-primary">
                  {node.priceRange.minVariantPrice.currencyCode} {parseFloat(node.priceRange.minVariantPrice.amount).toFixed(2)}
                </p>
              </div>

              {node.description && (
                <div className="prose prose-sm max-w-none">
                  <p className="text-muted-foreground">{node.description}</p>
                </div>
              )}

              {/* Variant Selector */}
              {node.variants.edges.length > 1 && (
                <div className="space-y-2">
                  <label className="text-sm font-medium">Select Option</label>
                  <Select
                    value={selectedVariant?.id}
                    onValueChange={(value) => {
                      const variant = node.variants.edges.find(v => v.node.id === value)?.node;
                      setSelectedVariant(variant);
                    }}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Choose an option" />
                    </SelectTrigger>
                    <SelectContent>
                      {node.variants.edges.map((variant) => (
                        <SelectItem key={variant.node.id} value={variant.node.id}>
                          {variant.node.title} - {variant.node.price.currencyCode} {parseFloat(variant.node.price.amount).toFixed(2)}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              )}

              <Button 
                size="lg" 
                className="w-full md:w-auto"
                onClick={handleAddToCart}
                disabled={!selectedVariant?.availableForSale}
              >
                <ShoppingCart className="w-5 h-5 mr-2" />
                {selectedVariant?.availableForSale ? 'Add to Cart' : 'Out of Stock'}
              </Button>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ProductDetail;
