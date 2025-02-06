import MaxWidthContainer from "../components/MaxWidthContainer";
import Hero from "../components/pages/home/Hero";
import ProductsList from "../components/shared/productsList/ProductsList";

export default function Home() {
  return (
    <MaxWidthContainer>
      <Hero />
      <div className="pt-10">
        <ProductsList />
      </div>
    </MaxWidthContainer>
  );
}
