import { handleError } from "@/utils/common";
import { queryProducts, queryProduct } from "@/utils/graphql";
import { GraphQLResponse } from "@/types";

export const getProducts = async (stat: string | null): Promise<GraphQLResponse> => {
    const res = await fetch(process.env.GRAPHQL_API_URL!, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "X-Shopify-Access-Token": process.env.ADMIN_API_ACCESS_TOKEN!,
        },
        body: JSON.stringify({
            query: queryProducts(stat),
        }),
    });

    handleError(res);

    return res.json();
};

export const getProduct = async (id: string | null): Promise<GraphQLResponse> => {
    const res = await fetch(process.env.GRAPHQL_API_URL!, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "X-Shopify-Access-Token": process.env.ADMIN_API_ACCESS_TOKEN!,
        },
        body: JSON.stringify(queryProduct(id)),
    });

    handleError(res);

    return res.json();
};
