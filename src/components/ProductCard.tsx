import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { ShoppingCart } from "lucide-react";
import { ShopifyProduct } from "@/lib/shopify";
import { useCartStore } from "@/stores/cartStore";
import { toast } from "sonner";

interface ProductCardProps {
  product: ShopifyProduct;
}

export const ProductCard = ({ product }: ProductCardProps) => {
  const addItem = useCartStore(state => state.addItem);
  const { node } = product;
  
  const defaultVariant = node.variants.edges[0]?.node;
  const imageUrl = node.images.edges[0]?.node.url;

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    if (!defaultVariant) return;

    const cartItem = {
      product,
      variantId: defaultVariant.id,
      variantTitle: defaultVariant.title,
      price: defaultVariant.price,
      quantity: 1,
      selectedOptions: defaultVariant.selectedOptions || []
    };
    
    addItem(cartItem);
    toast.success("Added to cart", {
      description: `${node.title} has been added to your cart`,
    });
  };

  return (
    <Link to={`/product/${node.handle}`}>
      <Card className="group overflow-hidden border-border hover:shadow-lg transition-all duration-300 h-full flex flex-col">
        <div className="aspect-square overflow-hidden bg-secondary/20">
          {imageUrl ? (
            <img
              src={imageUrl}
              alt={node.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-muted">
              <span className="text-muted-foreground">No image</span>
            </div>
          )}
        </div>
        
        <CardContent className="p-4 flex-1 flex flex-col">
          <h3 className="font-semibold text-lg mb-2 line-clamp-2">{node.title}</h3>
          {node.description && (
            <p className="text-sm text-muted-foreground line-clamp-2 mb-2">
              {node.description}
            </p>
          )}
          <div className="mt-auto">
            <p className="text-xl font-bold text-primary">
              {node.priceRange.minVariantPrice.currencyCode} {parseFloat(node.priceRange.minVariantPrice.amount).toFixed(2)}
            </p>
          </div>
        </CardContent>
        
        <CardFooter className="p-4 pt-0">
          <Button 
            className="w-full"
            onClick={handleAddToCart}
            disabled={!defaultVariant?.availableForSale}
          >
            <ShoppingCart className="w-4 h-4 mr-2" />
            {defaultVariant?.availableForSale ? 'Add to Cart' : 'Out of Stock'}
          </Button>
        </CardFooter>
      </Card>
    </Link>
  );
};
