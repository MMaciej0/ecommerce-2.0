import MaxWidthContainer from "../components/MaxWidthContainer";
import ProductsList from "../components/shared/productsList/ProductsList";

export default function Home() {
  return (
    <MaxWidthContainer className="py-8">
      <ProductsList />
    </MaxWidthContainer>
  );
}
