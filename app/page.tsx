import StatusFilter from "../components/StatusFilter";
import { getShopifyProducts } from "@/utils/shopify";
import { ProductCard } from "@/components/ProductCard";

export default async function Home({ searchParams }: any) {
  const status = searchParams?.stat;
  const result = await getShopifyProducts(
    "products",
    status === undefined ? "status:*" : status
  );
  const json = result.response;
  return (
    <main className="container mx-auto">
      <div className="px-5">
        <h2 className="font-bold text-2xl mb-3">Our Products:</h2>
        <StatusFilter />

        <ul className="grid grid-cols-12 gap-4 pb-12">
          {json.data.products.nodes.map((product) => {
            return (
              <li
                key={product.id}
                className="border border-slate-200 rounded-md overflow-hidden col-span-full md:col-span-6 lg:col-span-4"
              >
                <ProductCard product={product} />
              </li>
            );
          })}
        </ul>
      </div>
    </main>
  );
}
