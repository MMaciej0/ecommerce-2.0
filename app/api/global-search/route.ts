import { NextRequest } from "next/server";
import { getPaginatedProducts } from "@/app/lib/actions/product.actions";
import { globalSearchSchema } from "@/app/lib/validators/searchParams";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const parsedSearch = Object.fromEntries(searchParams.entries());

  const validatedSearch = globalSearchSchema.safeParse(parsedSearch);

  if (!validatedSearch.success) {
    return new Response(
      JSON.stringify({
        error: {
          message: "Invalid search parameters",
          details: validatedSearch.error.format(),
          code: "VALIDATION_ERROR",
        },
      }),
      {
        status: 400,
        headers: { "Content-Type": "application/json" },
      },
    );
  }

  const { search, limit, page } = validatedSearch.data;

  try {
    const products = await getPaginatedProducts({ search, limit, page });

    return new Response(JSON.stringify(products), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error fetching products:", error);

    return new Response(
      JSON.stringify({
        error: {
          message: "Something went wrong while fetching products",
          code: "INTERNAL_SERVER_ERROR",
        },
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      },
    );
  }
}
