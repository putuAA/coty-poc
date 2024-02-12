import { SingleProdutPageProps } from "@/types";
import {
  formatPrice,
  getProductCode,
  getVariantKeys,
  getVariantValueByKey,
} from "@/utils/common";
import Image from "next/image";
import ImageGallery from "../../../components/ImageGallery";
import CartButton from "../../../components/CartButton";
import { getShopifyProduct } from "@/utils/shopify";
import { Breadcrumb } from "../../../components/Breadcrumb";
import { Variant } from "../../../components/Variant";
// src/app/product/[id]/page.tsx

const SingleProductPage = async ({ params }: SingleProdutPageProps) => {
  const result = await getShopifyProduct("product", params.id);
  const { product } = result.response.data;
  const variantData = product.variants.edges;
  const variantKeys = getVariantKeys(variantData);

  return (
    <div className="container mx-auto md:pb-10 m-3">
      <Breadcrumb name={product.title} />
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
            Product code: {getProductCode(product.metafields.edges)}
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
                return <Variant key={variant} values={varVal} />;
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
