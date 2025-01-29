import MaxWidthContainer from "../components/MaxWidthContainer";
import { Badge } from "../components/ui/Badge";
import { Card } from "../components/ui/Card";
import { getProducts } from "../lib/actions/product.actions";

export default async function Home() {
  const products = await getProducts();
  console.log(products);
  return (
    <MaxWidthContainer className="py-8">
      <div className="grid grid-cols-3 gap-4">
        {products.map((product) => (
          <Card key={product._id}>
            <Card.Header className="border-b">{product.name}</Card.Header>
            <Card.Content>{product.description}</Card.Content>
            <Card.Footer className="text-end pt-0">
              <Badge>${product.price}</Badge>
            </Card.Footer>
          </Card>
        ))}
      </div>
    </MaxWidthContainer>
  );
}
