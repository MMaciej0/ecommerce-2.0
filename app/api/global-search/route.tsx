import { NextRequest } from "next/server";
import { getProducts } from "@/app/lib/actions/product.actions";
import { globalSearchSchema } from "@/app/lib/validators/searchParams";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const search = Object.fromEntries(searchParams.entries());

  const validatedSearch = globalSearchSchema.safeParse(search);

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
      }
    );
  }

  try {
    const products = await getProducts({ search: validatedSearch.data.search });

    if (!products || products.length === 0) {
      return new Response(
        JSON.stringify({
          error: {
            message: "No products found",
            code: "NOT_FOUND",
          },
        }),
        {
          status: 404,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

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
      }
    );
  }
}
