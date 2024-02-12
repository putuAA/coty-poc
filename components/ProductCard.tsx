"use client";
import Image from "next/image";
import Link from "next/link";
import { formatPrice } from "../utils/common";
import { shopifyProduct } from "@/utils/types";

export const ProductCard = ({ product }: shopifyProduct) => {
  const prodId = product.id.split("/").pop();
  return (
    <div>
      <div>
        <Image
          src={product.featuredImage.url}
          alt={product.featuredImage.altText}
          width={product.featuredImage.width}
          height={product.featuredImage.height}
          className="h-96 w-full object-cover"
          placeholder="blur"
          blurDataURL={product.featuredImage.url}
        />
      </div>

      <div className="p-5">
        {product.tags.map((tag: string) => (
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

        <p className="mt-2 mb-4">{product.description}</p>

        <Link
          href={`/product/${prodId}`}
          className="border border-blue-600 inline-block p-2 rounded-md text-blue-600 hover:bg-blue-600 hover:text-white ease-in-out duration-150"
        >
          View Product
        </Link>
      </div>
    </div>
  );
};
