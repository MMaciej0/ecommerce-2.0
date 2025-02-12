import MaxWidthContainer from "@/app/components/MaxWidthContainer";
import AddToCartPanel from "@/app/components/pages/product/AddToCartPanel";
import DefaultBreadCrumbs from "@/app/components/shared/defaultBreadcrumbs/DefaultBreadCrumbs";
import BorderedHeading from "@/app/components/shared/headings/BorderedHeading";
import { Card } from "@/app/components/ui/Card";
import { getProduct } from "@/app/lib/actions/product.actions";
import React from "react";

const ProductPage = async ({
  params,
}: {
  params: Promise<{ slug: string }>;
}) => {
  const { slug } = await params;
  const product = await getProduct(slug);

  if (!product) throw new Error("Product not found.");

  return (
    <MaxWidthContainer>
      <DefaultBreadCrumbs />
      <div className="flex flex-col space-y-4 pt-10">
        <BorderedHeading>{product.name}</BorderedHeading>
        <div className="flex flex-col space-y-4 md:flex-row md:space-x-12 md:space-y-0">
          <Card className="w-full">
            <Card.Content className="space-y-3">
              <h4 className="text-sm font-semibold text-muted-foreground">
                Description:
              </h4>
              <p className="text-medium">{product.description}</p>
            </Card.Content>
          </Card>
          <Card className="h-max w-full md:max-w-96">
            <Card.Content>
              <AddToCartPanel product={product} />
            </Card.Content>
          </Card>
        </div>
      </div>
    </MaxWidthContainer>
  );
};

export default ProductPage;
