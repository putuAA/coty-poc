"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { formatPrice } from "@/utils/formatPrice";
import { gql } from "@/utils/gql";

import { ShopifyExtension, ShopifyProduct } from "@/types";

type GraphQLResponse = {
  data: {
    products: {
      nodes: ShopifyProduct[];
    };
  };
  extensions: ShopifyExtension;
};

export const ProductList = () => {
  const [status, setStatus] = useState("status:*");
  //   const [json, setJson] = useState(null);

  //   useEffect(() => {
  //     console.log(status);
  //     getProducts(status);
  //   });

  const product = getProducts(status);
  //   setJson(product);
  console.log(status);
  return (
      );
};
