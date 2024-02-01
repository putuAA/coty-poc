import { ShopifyExtension, ShopifyProduct } from "@/types";
import { gql } from "@/utils/gql";
import Image from "next/image";
import { formatPrice } from "@/utils/formatPrice";
import ImageGallery from "../../../components/ImageGallery";
import CartButton from "../../../components/CartButton";

// src/app/product/[id]/page.tsx

type GraphQLResponse = {
  data: {
    product: ShopifyProduct;
  };
  extensions: ShopifyExtension;
};

const getProduct = async (id: string): Promise<GraphQLResponse> => {
  const res = await fetch(process.env.GRAPHQL_API_URL!, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Shopify-Access-Token": process.env.ADMIN_API_ACCESS_TOKEN!,
    },
    body: JSON.stringify({
      query: gql`
        query SingleProductQuery($id: ID!) {
          product(id: $id) {
            description
            hasOnlyDefaultVariant
            featuredImage {
              altText
              height
              id
              url
              width
            }
            images(first: 10) {
              edges {
                node {
                  id
                  altText
                  height
                  url
                  width
                }
              }
            }
            id
            priceRangeV2 {
              minVariantPrice {
                amount
                currencyCode
              }
            }
            tags
            title
            variants(first: 10) {
              edges {
                node {
                  selectedOptions {
                    name
                    value
                  }
                }
              }
            }
            metafields(first: 10) {
              edges {
                node {
                  key
                  value
                }
              }
            }
            vendor
          }
        }
      `,
      variables: {
        id: `gid://shopify/Product/${id}`,
      },
    }),
  });

  if (!res.ok) {
    const text = await res.text(); // get the response body for more information

    throw new Error(`
      Failed to fetch data
      Status: ${res.status}
      Response: ${text}
    `);
  }

  return res.json();
};

type SingleProdutPageProps = {
  params: {
    id: string;
  };
};

const getVariantKeys = (variantList: [] | {}): any[] => {
  const variantKeys: any[] = [];
  variantList.forEach(
    (item: { node: { selectedOptions: { name: any }[] } }): any => {
      item.node.selectedOptions.forEach((a: { name: any }) => {
        if (variantKeys.indexOf(a.name) === -1) variantKeys.push(a.name);
      });
    }
  );

  return variantKeys;
};

const getVariantValueByKey = (variantList: any[], key: string) => {
  const variantValues: any[] = [];
  variantList.forEach((item) => {
    item.node.selectedOptions.forEach((a: { name: any; value: any }) => {
      if (a.name === key) {
        if (variantValues.indexOf(a.value) === -1) variantValues.push(a.value);
      }
    });
  });

  return variantValues;
};

const showVariant = (key: string, values: any[]) => {
  return (
    // <div className="mx-auto md:pb-10 flex-row">
    <>
      <div className="clear-both m-2 p-2">{key}: </div>
      <div className="grid w-[40rem] grid-cols-4 gap-2 rounded-xl p-2">
        {values.map((a, b) => (
          <div key={b}>
            <input
              className="peer hidden"
              type="radio"
              value={a}
              id={`variant-${key}-${b}`}
              name={`variant-${key} `}
            />{" "}
            <label
              htmlFor={`variant-${key}-${b}`}
              className="block cursor-pointer border-2 select-none rounded-xl p-2 text-center peer-checked:bg-blue-500 peer-checked:font-bold peer-checked:text-white"
            >
              {a}
            </label>
          </div>
        ))}
      </div>
    </>
  );
};

const getProductCode = (data: any[]) => {
  const fields = data.map((a, b) => {
    if (a.node.key === "product_code") {
      return <div key={b}>Product Code: {a.node.value}</div>;
    }
  });
  return fields;
};

const SingleProductPage = async ({ params }: SingleProdutPageProps) => {
  const json = await getProduct(params.id);
  const { product } = json.data;
  const variantData = product.variants.edges;
  const variantKeys = getVariantKeys(variantData);

  return (
    <div className="container mx-auto md:pb-10 m-3">
      <div className="flex flex-col md:flex-row md:items-center md:align-top">
        <div className="md:basis-1/2">
          <Image
            src={product.featuredImage.url}
            alt={product.featuredImage.altText}
            width={product.featuredImage.width}
            height={product.featuredImage.height}
            placeholder="blur"
            blurDataURL={product.featuredImage.url}
          />
          {/* <div className="mb-4 flex flex-row p-3 md:basis-1/2"> */}

          {/* </div> */}
          <ImageGallery imageColl={product.images.edges} />
        </div>
        <div className="pl-5 md:basis-1/2">
          {product.tags.map((tag) => (
            <span
              key={tag}
              className="bg-yellow-400 m-1 font-bold py-1 px-3 rounded-full text-xs"
            >
              {tag}
            </span>
          ))}

          <h3 className="font-medium mt-3 text-3xl">{product.title}</h3>

          <h4>
            {formatPrice(product.priceRangeV2.minVariantPrice.amount)}{" "}
            {product.priceRangeV2.minVariantPrice.currencyCode}
          </h4>

          <div className="mt-2 mb-4">{product.description}</div>
          <div className="mt-2 mb-4 font-bold">
            {getProductCode(product.metafields.edges)}
          </div>
          <div className="mt-2 mb-4">
            <div className="font-bold">
              Vendor: <span>{product.vendor}</span>
            </div>
          </div>
          {product.hasOnlyDefaultVariant === true ? (
            ""
          ) : (
            <div className="mt-2 mb-4">
              <div className="font-bold">Variant:</div>
              {variantKeys.map((variant, i) => {
                const varVal = getVariantValueByKey(variantData, variant);
                return showVariant(variant, varVal);
              })}
            </div>
          )}
          <input
            type="number"
            className="px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300"
            placeholder="Enter qty to buy"
            min="1"
          />

          <CartButton />
        </div>
      </div>
    </div>
  );
};

export default SingleProductPage;
