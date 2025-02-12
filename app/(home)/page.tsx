import MaxWidthContainer from "../components/MaxWidthContainer";
import Hero from "../components/pages/home/Hero";
import BorderedHeading from "../components/shared/headings/BorderedHeading";
import ProductsList from "../components/shared/productsList/ProductsList";

export default function Home() {
  return (
    <MaxWidthContainer>
      <Hero />
      <div className="pt-10 xl:pt-16">
        <BorderedHeading className="mb-10">New Arrivals</BorderedHeading>
        <ProductsList />
      </div>
    </MaxWidthContainer>
  );
}
