import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

const About = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 py-12 md:py-16">
        <div className="container max-w-4xl">
          <div className="animate-fade-in space-y-12">
            <div className="text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">About FRAMEZDECOR</h1>
              <p className="text-xl text-muted-foreground">Make it yourself</p>
            </div>

            <section className="prose prose-lg max-w-none">
              <h2 className="text-2xl font-bold mb-4">Our Story</h2>
              <p className="text-muted-foreground mb-6">
                FRAMEZDECOR was born from a simple belief: that art has the power to transform 
                spaces and enrich lives. We understand that your home is your sanctuary, and 
                every wall is an opportunity to express your unique style and personality.
              </p>
              <p className="text-muted-foreground mb-6">
                Our journey began with a passion for bringing premium-quality wall art and décor 
                to modern homes. We carefully curate each piece in our collection, ensuring that 
                it meets our high standards for craftsmanship, design, and artistic merit.
              </p>
            </section>

            <section className="prose prose-lg max-w-none">
              <h2 className="text-2xl font-bold mb-4">Our Mission</h2>
              <p className="text-muted-foreground mb-6">
                We're dedicated to making premium wall art accessible to everyone. Whether you're 
                looking for a statement piece for your living room, a serene landscape for your 
                bedroom, or inspiring art for your workspace, we have something special for you.
              </p>
            </section>

            <section className="prose prose-lg max-w-none">
              <h2 className="text-2xl font-bold mb-4">Quality & Craftsmanship</h2>
              <p className="text-muted-foreground mb-6">
                Every product at FRAMEZDECOR is selected with care. We work with talented artists 
                and use premium materials to ensure that each piece not only looks beautiful but 
                stands the test of time. From the quality of our prints to the craftsmanship of 
                our frames, we never compromise on excellence.
              </p>
            </section>

            <section className="prose prose-lg max-w-none">
              <h2 className="text-2xl font-bold mb-4">Customer Trust</h2>
              <p className="text-muted-foreground mb-6">
                Your satisfaction is our priority. We're committed to providing exceptional 
                customer service, from helping you choose the perfect piece to ensuring it 
                arrives safely at your doorstep. Join thousands of satisfied customers who 
                have transformed their spaces with FRAMEZDECOR.
              </p>
            </section>

            <div className="bg-muted/30 p-8 rounded-lg text-center">
              <h3 className="text-2xl font-bold mb-4">Ready to Transform Your Space?</h3>
              <p className="text-muted-foreground mb-6">
                Explore our collection and find the perfect piece to elevate your home décor.
              </p>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default About;
