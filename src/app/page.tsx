import { Navbar } from "@/components/site/navbar";
import { Hero } from "@/components/site/hero";
import { TrustedBy } from "@/components/site/trusted-by";
import { Services } from "@/components/site/services";
import { RagDemo } from "@/components/site/rag-demo";
import { Process } from "@/components/site/process";
import { Stats } from "@/components/site/stats";
import { Solutions } from "@/components/site/solutions";
import { Testimonials } from "@/components/site/testimonials";
import { Faq } from "@/components/site/faq";
import { ContactCTA } from "@/components/site/contact-cta";
import { Footer } from "@/components/site/footer";

export default function Home() {
  return (
    <div className="relative flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">
        <Hero />
        <TrustedBy />
        <Services />
        <RagDemo />
        <Process />
        <Stats />
        <Solutions />
        <Testimonials />
        <Faq />
        <ContactCTA />
      </main>
      <Footer />
    </div>
  );
}
