import MaxWidthContainer from "../components/MaxWidthContainer";
import Hero from "../components/pages/home/Hero";
import ProductsList from "../components/shared/productsList/ProductsList";

export default function Home() {
  return (
    <MaxWidthContainer>
      <Hero />
      <div className="pt-10 xl:pt-16">
        <h3 className="mb-10 rounded-xl border-[2px] border-accent/50 py-6 text-center text-2xl font-black shadow-xl">
          New Arrivals
        </h3>
        <ProductsList />
      </div>
    </MaxWidthContainer>
  );
}
