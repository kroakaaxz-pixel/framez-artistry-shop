import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { ProductCard } from "@/components/ProductCard";
import { ArrowRight } from "lucide-react";
import { getProducts, ShopifyProduct } from "@/lib/shopify";
import heroImage from "@/assets/hero-image.jpg";

const Index = () => {
  const [products, setProducts] = useState<ShopifyProduct[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getProducts(6);
        setProducts(data);
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative h-[70vh] flex items-center justify-center overflow-hidden">
          <div 
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${heroImage})` }}
          >
            <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-background/40 to-background" />
          </div>
          
          <div className="container relative z-10 text-center animate-fade-in">
            <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
              FRAMEZDECOR
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-muted-foreground max-w-2xl mx-auto">
              Make it yourself
            </p>
            <p className="text-lg mb-8 text-muted-foreground max-w-2xl mx-auto">
              Transform your space with premium wall art, paintings, and décor
            </p>
            <Link to="/shop">
              <Button size="lg" className="group">
                Shop Collection
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </div>
        </section>

        {/* Featured Products */}
        <section className="py-16 md:py-24">
          <div className="container">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Featured Collection</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Discover our curated selection of premium wall art and décor
              </p>
            </div>

            {loading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="h-96 bg-muted animate-pulse rounded-lg" />
                ))}
              </div>
            ) : products.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 animate-fade-in">
                {products.map((product) => (
                  <ProductCard key={product.node.id} product={product} />
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <p className="text-xl text-muted-foreground mb-6">No products found</p>
                <p className="text-muted-foreground">
                  Create your first product by telling me what you'd like to add to your store!
                </p>
              </div>
            )}

            {products.length > 0 && (
              <div className="text-center mt-12">
                <Link to="/shop">
                  <Button variant="outline" size="lg">
                    View All Products
                  </Button>
                </Link>
              </div>
            )}
          </div>
        </section>

        {/* About Preview */}
        <section className="py-16 md:py-24 bg-muted/30">
          <div className="container">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Our Story</h2>
              <p className="text-lg text-muted-foreground mb-8">
                At FRAMEZDECOR, we believe that art transforms spaces and enriches lives. 
                Each piece in our collection is carefully curated to bring beauty, inspiration, 
                and personal expression to your home.
              </p>
              <Link to="/about">
                <Button variant="outline">
                  Learn More About Us
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Index;
